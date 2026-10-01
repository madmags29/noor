// ============================================================
// NOOR — Analytics Service (Dart)
// Exact port of noor-mobile/src/services/analyticsService.ts
// Google Analytics Measurement Protocol
// ============================================================

import 'dart:convert';
import 'dart:io';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';
import 'package:uuid/uuid.dart';

const String _gaMeasurementId = 'G-6VEVYV7DX2';
const String _gaApiSecret = 'noor_mobile_app';
const String _storageKeyClientId = '@noor_analytics_client_id';
const String _storageKeySessionId = '@noor_analytics_session_id';
const String _appVersion = '1.0.0';

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
