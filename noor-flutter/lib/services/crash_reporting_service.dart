// ============================================================
// NOOR Flutter — Crash Reporting & Exception Sentry Service
// Real-time Automated Exception Catching + Super Admin Sync
// ============================================================

import 'dart:async';
import 'dart:convert';
import 'dart:io';
import 'package:flutter/foundation.dart';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';
import 'package:uuid/uuid.dart';

const String _crashEndpoint = 'https://www.nooreilahi.com/api/app-crashes';
const String _storageKeyQueuedCrashes = '@noor_queued_crashes_v1';
const String _storageKeyCrashClientId = '@noor_crash_client_id';

class Breadcrumb {
  final String timestamp;
  final String category;
  final String message;
  final Map<String, dynamic>? data;

  Breadcrumb({
    required this.timestamp,
    required this.category,
    required this.message,
    this.data,
  });

  Map<String, dynamic> toJson() => {
        'timestamp': timestamp,
        'category': category,
        'message': message,
        if (data != null) 'data': data,
      };
}

class CrashReportingService {
  static final CrashReportingService instance = CrashReportingService._internal();
  factory CrashReportingService() => instance;
  CrashReportingService._internal();

  final List<Breadcrumb> _breadcrumbs = [];
  static const int _maxBreadcrumbs = 20;
  String? _clientId;
  bool _initialized = false;

  /// Initialize global crash hooks and flush any pending offline crash reports
  Future<void> initialize() async {
    if (_initialized) return;

    try {
      final prefs = await SharedPreferences.getInstance();
      var id = prefs.getString(_storageKeyCrashClientId);
      if (id == null) {
        id = const Uuid().v4();
        await prefs.setString(_storageKeyCrashClientId, id);
      }
      _clientId = id;

      // Add cold launch breadcrumb
      addBreadcrumb(
        category: 'lifecycle',
        message: 'NOOR Flutter engine started on ${Platform.operatingSystem} ${Platform.operatingSystemVersion}',
      );

      // Global Flutter framework error hook
      final originalOnError = FlutterError.onError;
      FlutterError.onError = (FlutterErrorDetails details) {
        recordError(
          details.exception,
          details.stack,
          fatal: false,
          reason: details.context?.toString() ?? 'Flutter Framework Error',
          library: details.library,
        );
        if (originalOnError != null) {
          originalOnError(details);
        }
      };

      // Global Dart async unhandled zone error hook
      PlatformDispatcher.instance.onError = (Object error, StackTrace stack) {
        recordError(
          error,
          stack,
          fatal: true,
          reason: 'PlatformDispatcher Unhandled Async Zone Error',
        );
        return true;
      };

      _initialized = true;

      // Flush any queued offline crashes
      unawaited(_flushQueuedCrashes());
    } catch (e) {
      if (kDebugMode) {
        print('[CrashReportingService] Init error: $e');
      }
    }
  }

  /// Add a navigational or user action breadcrumb
  void addBreadcrumb({
    required String category,
    required String message,
    Map<String, dynamic>? data,
  }) {
    final crumb = Breadcrumb(
      timestamp: DateTime.now().toIso8601String(),
      category: category,
      message: message,
      data: data,
    );

    _breadcrumbs.add(crumb);
    if (_breadcrumbs.length > _maxBreadcrumbs) {
      _breadcrumbs.removeAt(0);
    }
  }

  /// Explicitly capture and dispatch an error
  Future<void> recordError(
    dynamic error,
    StackTrace? stackTrace, {
    bool fatal = false,
    String? reason,
    String? library,
    String? userEmail,
  }) async {
    try {
      final errorName = error.runtimeType.toString();
      final errorMessage = error.toString();
      final stack = (stackTrace ?? StackTrace.current).toString();

      final payload = {
        'errorName': library != null ? '$errorName ($library)' : errorName,
        'errorMessage': reason != null ? '$reason: $errorMessage' : errorMessage,
        'errorType': fatal ? 'fatal' : 'non_fatal',
        'stackTrace': stack,
        'platform': Platform.isIOS ? 'ios' : 'android',
        'deviceModel': '${Platform.operatingSystem} Client',
        'osVersion': Platform.operatingSystemVersion,
        'appVersion': '2.1.0',
        'buildNumber': 6,
        'breadcrumbs': _breadcrumbs.map((b) => b.toJson()).toList(),
        'userId': _clientId,
        'userEmail': userEmail,
        'deviceMetrics': {
          'freeMemoryMb': 3100,
          'totalMemoryMb': 8192,
          'batteryLevel': 85,
          'isCharging': false,
          'orientation': 'portrait',
          'networkType': 'wifi'
        }
      };

      if (kDebugMode) {
        print('[CrashReportingService] Telemetry Dispatched: $errorName');
      }

      final response = await http
          .post(
            Uri.parse(_crashEndpoint),
            headers: {'Content-Type': 'application/json'},
            body: jsonEncode(payload),
          )
          .timeout(const Duration(seconds: 5));

      if (response.statusCode != 200 && response.statusCode != 201) {
        await _queueCrashLocally(payload);
      }
    } catch (_) {
      // Network failed or device offline: queue locally for next launch
      try {
        final payload = {
          'errorName': error.runtimeType.toString(),
          'errorMessage': error.toString(),
          'errorType': fatal ? 'fatal' : 'non_fatal',
          'stackTrace': (stackTrace ?? StackTrace.current).toString(),
          'platform': Platform.isIOS ? 'ios' : 'android',
          'deviceModel': '${Platform.operatingSystem} Client',
          'osVersion': Platform.operatingSystemVersion,
          'appVersion': '2.1.0',
          'buildNumber': 6,
          'breadcrumbs': _breadcrumbs.map((b) => b.toJson()).toList(),
          'userId': _clientId,
          'userEmail': userEmail,
        };
        await _queueCrashLocally(payload);
      } catch (_) {}
    }
  }

  /// Save un-dispatched crash reports to SharedPreferences for retry
  Future<void> _queueCrashLocally(Map<String, dynamic> payload) async {
    try {
      final prefs = await SharedPreferences.getInstance();
      final existing = prefs.getStringList(_storageKeyQueuedCrashes) ?? [];
      existing.add(jsonEncode(payload));
      if (existing.length > 20) existing.removeAt(0);
      await prefs.setStringList(_storageKeyQueuedCrashes, existing);
    } catch (_) {}
  }

  /// Flush offline queued crashes when connection is available
  Future<void> _flushQueuedCrashes() async {
    try {
      final prefs = await SharedPreferences.getInstance();
      final queued = prefs.getStringList(_storageKeyQueuedCrashes);
      if (queued == null || queued.isEmpty) return;

      final remaining = <String>[];
      for (final raw in queued) {
        try {
          final res = await http
              .post(
                Uri.parse(_crashEndpoint),
                headers: {'Content-Type': 'application/json'},
                body: raw,
              )
              .timeout(const Duration(seconds: 4));

          if (res.statusCode != 200 && res.statusCode != 201) {
            remaining.add(raw);
          }
        } catch (_) {
          remaining.add(raw);
        }
      }

      await prefs.setStringList(_storageKeyQueuedCrashes, remaining);
    } catch (_) {}
  }
}

final crashReportingService = CrashReportingService.instance;
