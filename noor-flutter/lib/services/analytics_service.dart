// ============================================================
// NOOR — Analytics & Real-Time Telemetry Service (Dart)
// Google Analytics Measurement Protocol + NOOR Super-Admin Telemetry Engine
// ============================================================

import 'dart:convert';
import 'dart:io';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';
import 'package:uuid/uuid.dart';

const String _gaMeasurementId = 'G-6VEVYV7DX2';
const String _gaApiSecret = 'noor_mobile_app';
const String _noorTelemetryEndpoint = 'https://www.nooreilahi.com/api/analytics';
const String _storageKeyClientId = '@noor_analytics_client_id';
const String _storageKeySessionId = '@noor_analytics_session_id';
const String _appVersion = '1.0.0';
const int _buildNumber = 6;

class AnalyticsService {
  String? _clientId;
  String? _sessionId;
  bool _isInitialized = false;

  Future<void> init() async {
    if (_isInitialized) return;
    try {
      final prefs = await SharedPreferences.getInstance();
      var savedClientId = prefs.getString(_storageKeyClientId);
      if (savedClientId == null) {
        savedClientId = const Uuid().v4();
        await prefs.setString(_storageKeyClientId, savedClientId);
      }
      _clientId = savedClientId;
      _sessionId = (DateTime.now().millisecondsSinceEpoch ~/ 1000).toString();
      await prefs.setString(_storageKeySessionId, _sessionId!);
      _isInitialized = true;

      // Log App Launch Event automatically
      await trackBehavior(
        eventType: 'app_launch',
        screen: 'splash_launch',
        featureName: 'App Open Session',
      );
    } catch (_) {
      _clientId = const Uuid().v4();
      _sessionId = (DateTime.now().millisecondsSinceEpoch ~/ 1000).toString();
      _isInitialized = true;
    }
  }

  Future<void> trackScreenView(
    String screenName, [
    String screenClass = 'Screen',
  ]) async {
    await trackEvent('screen_view', {
      'screen_name': screenName,
      'screen_class': screenClass,
      'app_platform': Platform.operatingSystem,
      'app_version': _appVersion,
    });

    // Ingest to NOOR Super Admin
    await trackBehavior(
      eventType: 'screen_view',
      screen: screenName,
      featureName: screenName,
    );
  }

  /// Track specific user behavior (Surah recitation, prayer alarm, Ziyarat, AI prompt)
  Future<void> trackBehavior({
    required String eventType,
    String? screen,
    String? featureName,
    Map<String, dynamic>? metadata,
    String? userEmail,
    String? city,
    String? country,
  }) async {
    if (!_isInitialized) await init();

    // Async push to NOOR telemetry
    try {
      final payload = {
        'userId': _clientId,
        'userEmail': userEmail,
        'eventType': eventType,
        'screen': screen ?? 'app_main',
        'featureName': featureName ?? eventType,
        'platform': Platform.isIOS ? 'ios' : 'android',
        'appVersion': '$_appVersion+b$_buildNumber',
        'city': city ?? 'Mobile Edge',
        'country': country ?? 'Global',
        'metadata': metadata ?? {},
      };

      await http
          .post(
            Uri.parse(_noorTelemetryEndpoint),
            headers: {'Content-Type': 'application/json'},
            body: jsonEncode(payload),
          )
          .timeout(const Duration(seconds: 4));
    } catch (_) {
      // Fail silently
    }
  }

  Future<void> trackEvent(
    String eventName,
    Map<String, dynamic> params,
  ) async {
    if (!_isInitialized) await init();

    try {
      final payload = {
        'client_id': _clientId,
        'events': [
          {
            'name': eventName,
            'params': {
              ...params,
              'session_id': _sessionId,
              'engagement_time_msec': 100,
              'platform': Platform.operatingSystem,
              'app_name': 'Noor-e-ilahi',
              'app_version': _appVersion,
            },
          },
        ],
      };

      await http
          .post(
            Uri.parse(
              'https://www.google-analytics.com/mp/collect'
              '?measurement_id=$_gaMeasurementId&api_secret=$_gaApiSecret',
            ),
            headers: {'Content-Type': 'application/json'},
            body: jsonEncode(payload),
          )
          .timeout(const Duration(seconds: 5));
    } catch (_) {
      // Fail silently without disrupting user experience
    }
  }
}

// Singleton
final analytics = AnalyticsService();
