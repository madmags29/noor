// ============================================================
// NOOR — Remote App Configuration & Force Update Service
// Connects with Super Admin API /api/app-config
// ============================================================

import 'dart:convert';
import 'dart:io';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';
import 'package:url_launcher/url_launcher.dart';

const String _appConfigEndpoint = 'https://www.nooreilahi.com/api/app-config';
const int kCurrentBuildNumber = 6;
const String kCurrentVersionName = '1.0.0';

class ForceUpdateInfo {
  final bool enabled;
  final int minRequiredBuildNumber;
  final int latestBuildNumber;
  final String minRequiredVersion;
  final String latestVersion;
  final String title;
  final String message;
  final List<String> releaseNotes;
  final String playStoreUrl;
  final String appStoreUrl;

  ForceUpdateInfo({
    required this.enabled,
    required this.minRequiredBuildNumber,
    required this.latestBuildNumber,
    required this.minRequiredVersion,
    required this.latestVersion,
    required this.title,
    required this.message,
    required this.releaseNotes,
    required this.playStoreUrl,
    required this.appStoreUrl,
  });

  factory ForceUpdateInfo.fromJson(Map<String, dynamic> json) {
    return ForceUpdateInfo(
      enabled: json['enabled'] ?? true,
      minRequiredBuildNumber: json['minRequiredBuildNumber'] ?? 1,
      latestBuildNumber: json['latestBuildNumber'] ?? 6,
      minRequiredVersion: json['minRequiredVersion'] ?? '1.0.0',
      latestVersion: json['latestVersion'] ?? '1.0.0',
      title: json['title'] ?? 'Important Update Required',
      message: json['message'] ?? 'A new version of Noor-e-ilahi is available.',
      releaseNotes: (json['releaseNotes'] as List<dynamic>?)
              ?.map((e) => e.toString())
              .toList() ??
          [],
      playStoreUrl: json['playStoreUrl'] ??
          'https://play.google.com/store/apps/details?id=com.nooreilahi.noor',
      appStoreUrl: json['appStoreUrl'] ??
          'https://apps.apple.com/app/noor-e-ilahi/id6739000000',
    );
  }
}

class MaintenanceInfo {
  final bool enabled;
  final String title;
  final String message;

  MaintenanceInfo({
    required this.enabled,
    required this.title,
    required this.message,
  });

  factory MaintenanceInfo.fromJson(Map<String, dynamic> json) {
    return MaintenanceInfo(
      enabled: json['enabled'] ?? false,
      title: json['title'] ?? 'System Maintenance Underway',
      message: json['message'] ?? 'We are upgrading our servers.',
    );
  }
}

class AnnouncementInfo {
  final bool enabled;
  final String title;
  final String message;
  final String type;

  AnnouncementInfo({
    required this.enabled,
    required this.title,
    required this.message,
    required this.type,
  });

  factory AnnouncementInfo.fromJson(Map<String, dynamic> json) {
    return AnnouncementInfo(
      enabled: json['enabled'] ?? false,
      title: json['title'] ?? '',
      message: json['message'] ?? '',
      type: json['type'] ?? 'info',
    );
  }
}

class RemoteConfigService {
  ForceUpdateInfo? _forceUpdate;
  MaintenanceInfo? _maintenance;
  AnnouncementInfo? _announcement;
  Map<String, bool> _features = {};
  bool _isLoaded = false;

  ForceUpdateInfo? get forceUpdate => _forceUpdate;
  MaintenanceInfo? get maintenance => _maintenance;
  AnnouncementInfo? get announcement => _announcement;
  Map<String, bool> get features => _features;
  bool get isLoaded => _isLoaded;

  /// Check if a specific remote feature switch is enabled
  bool isFeatureEnabled(String featureKey, {bool defaultValue = true}) {
    return _features[featureKey] ?? defaultValue;
  }

  /// Checks if current installed version requires a mandatory (forced) update
  bool get isForceUpdateRequired {
    if (_forceUpdate == null || !_forceUpdate!.enabled) return false;
    return kCurrentBuildNumber < _forceUpdate!.minRequiredBuildNumber;
  }

  /// Checks if a newer soft/recommended update is available
  bool get isOptionalUpdateAvailable {
    if (_forceUpdate == null) return false;
    return kCurrentBuildNumber < _forceUpdate!.latestBuildNumber;
  }

  /// Fetch remote configuration from Super-Admin server
  Future<void> fetchConfig() async {
    try {
      final response = await http
          .get(Uri.parse(_appConfigEndpoint))
          .timeout(const Duration(seconds: 4));

      if (response.statusCode == 200) {
        final Map<String, dynamic> body = jsonDecode(response.body);
        if (body['success'] == true && body['data'] != null) {
          final data = body['data'];

          if (data['forceUpdate'] != null) {
            _forceUpdate = ForceUpdateInfo.fromJson(data['forceUpdate']);
          }
          if (data['maintenance'] != null) {
            _maintenance = MaintenanceInfo.fromJson(data['maintenance']);
          }
          if (data['announcement'] != null) {
            _announcement = AnnouncementInfo.fromJson(data['announcement']);
          }
          if (data['features'] != null) {
            final feats = data['features'] as Map<String, dynamic>;
            _features = feats.map((k, v) => MapEntry(k, v == true));
          }

          _isLoaded = true;

          // Cache locally for offline tolerance
          final prefs = await SharedPreferences.getInstance();
          await prefs.setString('@noor_cached_remote_config', response.body);
        }
      }
    } catch (_) {
      // Load cached remote config if network fails
      await _loadCachedConfig();
    }
  }

  Future<void> _loadCachedConfig() async {
    try {
      final prefs = await SharedPreferences.getInstance();
      final cached = prefs.getString('@noor_cached_remote_config');
      if (cached != null) {
        final Map<String, dynamic> body = jsonDecode(cached);
        if (body['success'] == true && body['data'] != null) {
          final data = body['data'];
          if (data['forceUpdate'] != null) {
            _forceUpdate = ForceUpdateInfo.fromJson(data['forceUpdate']);
          }
          if (data['maintenance'] != null) {
            _maintenance = MaintenanceInfo.fromJson(data['maintenance']);
          }
          if (data['announcement'] != null) {
            _announcement = AnnouncementInfo.fromJson(data['announcement']);
          }
          if (data['features'] != null) {
            final feats = data['features'] as Map<String, dynamic>;
            _features = feats.map((k, v) => MapEntry(k, v == true));
          }
          _isLoaded = true;
        }
      }
    } catch (_) {}
  }

  /// Launch appropriate store page for update
  Future<void> openStore() async {
    final urlStr = Platform.isIOS
        ? (_forceUpdate?.appStoreUrl ??
            'https://apps.apple.com/app/noor-e-ilahi/id6739000000')
        : (_forceUpdate?.playStoreUrl ??
            'https://play.google.com/store/apps/details?id=com.nooreilahi.noor');

    final uri = Uri.parse(urlStr);
    if (await canLaunchUrl(uri)) {
      await launchUrl(uri, mode: LaunchMode.externalApplication);
    }
  }
}

// Global Singleton Instance
final remoteConfig = RemoteConfigService();
