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

  // ── APP EXIT / ENGAGEMENT EVENTS ─────────────────────────────
  Future<void> trackAppExitPrompt() async {
    await trackEvent('app_exit_prompt', {
      'screen': 'home',
      'action': 'exit_bottom_sheet_shown',
    });
    await trackBehavior(
      eventType: 'app_exit_prompt',
      screen: 'home',
      featureName: 'Exit Confirmation Prompt Shown',
    );
  }

  Future<void> trackAppExitConfirmed() async {
    await trackEvent('app_exit_confirmed', {
      'screen': 'home',
      'action': 'user_exited_app',
    });
    await trackBehavior(
      eventType: 'app_exit_confirmed',
      screen: 'home',
      featureName: 'User Confirmed App Exit',
    );
  }

  Future<void> trackAppExitCancelled() async {
    await trackEvent('app_exit_cancelled', {
      'screen': 'home',
      'action': 'user_stayed_in_app',
    });
    await trackBehavior(
      eventType: 'app_exit_cancelled',
      screen: 'home',
      featureName: 'User Dismissed Exit / Stayed in App',
    );
  }

  // ── SALAWAT PULSE EVENT ──────────────────────────────────────
  Future<void> trackSalawatContributed({
    int totalCount = 0,
    int userContribution = 1,
  }) async {
    await trackEvent('salawat_contributed', {
      'user_contribution': userContribution,
      'total_count': totalCount,
    });
    await trackBehavior(
      eventType: 'feature_click',
      screen: 'home',
      featureName: 'Salawat Pulse Contribution (+1)',
      metadata: {'totalCount': totalCount, 'userContribution': userContribution},
    );
  }

  // ── MOSQUE / MAP DIRECTIONS EVENT ───────────────────────────
  Future<void> trackMosqueNavigation({
    required String mosqueName,
    required double distanceKm,
  }) async {
    await trackEvent('mosque_navigation_click', {
      'mosque_name': mosqueName,
      'distance_km': distanceKm,
    });
    await trackBehavior(
      eventType: 'feature_click',
      screen: 'home',
      featureName: 'Nearest Mosque Navigation: $mosqueName',
      metadata: {'mosqueName': mosqueName, 'distanceKm': distanceKm},
    );
  }

  // ── PRAYER CHECK & METHOD EVENT ──────────────────────────────
  Future<void> trackPrayerCheck({
    required String prayerName,
    String? city,
  }) async {
    await trackEvent('prayer_check', {
      'prayer_name': prayerName,
      'city': city ?? 'Current Location',
    });
    await trackBehavior(
      eventType: 'prayer_alarm',
      screen: 'prayer_times',
      featureName: 'Prayer Checked: $prayerName',
      city: city,
      metadata: {'prayer': prayerName},
    );
  }

  // ── QURAN SURAH & AYAH EVENTS ────────────────────────────────
  Future<void> trackQuranSurahOpen({
    required int surahNumber,
    required String surahName,
  }) async {
    await trackEvent('quran_surah_open', {
      'surah_number': surahNumber,
      'surah_name': surahName,
    });
    await trackBehavior(
      eventType: 'quran_recite',
      screen: 'quran_surah_$surahNumber',
      featureName: 'Surah $surahName (#$surahNumber)',
      metadata: {'surahNumber': surahNumber, 'surahName': surahName},
    );
  }

  Future<void> trackAyahAudioPlay({
    required int surahNumber,
    required int ayahNumber,
    String? reciter,
  }) async {
    await trackEvent('quran_audio_play', {
      'surah_number': surahNumber,
      'ayah_number': ayahNumber,
      'reciter': reciter ?? 'Alafasy',
    });
    await trackBehavior(
      eventType: 'quran_recite',
      screen: 'quran_surah_$surahNumber',
      featureName: 'Tilawat Play: Surah $surahNumber Ayah $ayahNumber ($reciter)',
      metadata: {
        'surahNumber': surahNumber,
        'ayahNumber': ayahNumber,
        'reciter': reciter,
      },
    );
  }

  // ── ZIYARAT VIEW EVENT ───────────────────────────────────────
  Future<void> trackZiyaratView({
    required String sanctuaryName,
    required String city,
    required String country,
  }) async {
    await trackEvent('ziyarat_view', {
      'sanctuary': sanctuaryName,
      'city': city,
      'country': country,
    });
    await trackBehavior(
      eventType: 'ziyarat_view',
      screen: 'ziyarat_detail',
      featureName: 'Ziyarat: $sanctuaryName ($city, $country)',
      city: city,
      country: country,
      metadata: {'sanctuary': sanctuaryName},
    );
  }

  // ── KIDS STORY READ EVENT ────────────────────────────────────
  Future<void> trackKidsStoryRead({
    required String storyId,
    required String storyTitle,
  }) async {
    await trackEvent('kids_story_read', {
      'story_id': storyId,
      'story_title': storyTitle,
    });
    await trackBehavior(
      eventType: 'feature_click',
      screen: 'kids_stories',
      featureName: 'Kids Story: $storyTitle',
      metadata: {'storyId': storyId, 'storyTitle': storyTitle},
    );
  }

  // ── TASBIH COUNTER EVENT ─────────────────────────────────────
  Future<void> trackTasbihTap({
    required int count,
    String? dhikr,
  }) async {
    await trackEvent('tasbih_tap', {
      'count': count,
      'dhikr': dhikr ?? 'SubhanAllah',
    });
    await trackBehavior(
      eventType: 'feature_click',
      screen: 'duas_tasbih',
      featureName: 'Tasbih Count: $count ($dhikr)',
      metadata: {'count': count, 'dhikr': dhikr},
    );
  }

  // ── DUA READ EVENT ───────────────────────────────────────────
  Future<void> trackDuaRead({
    required String duaTitle,
    String? category,
  }) async {
    await trackEvent('dua_read', {
      'dua_title': duaTitle,
      'category': category ?? 'Daily',
    });
    await trackBehavior(
      eventType: 'dua_read',
      screen: 'duas_screen',
      featureName: 'Dua Read: $duaTitle',
      metadata: {'duaTitle': duaTitle, 'category': category},
    );
  }

  // ── FESTIVAL VIEW EVENT ──────────────────────────────────────
  Future<void> trackFestivalView({required String festivalTitle}) async {
    await trackEvent('festival_view', {
      'festival_title': festivalTitle,
    });
    await trackBehavior(
      eventType: 'feature_click',
      screen: 'home_festivals',
      featureName: 'Festival Viewed: $festivalTitle',
    );
  }

  // ── GENERIC FEATURE CLICK EVENT ──────────────────────────────
  Future<void> trackFeatureClick({
    required String featureName,
    String? screen,
    Map<String, dynamic>? metadata,
  }) async {
    await trackEvent('feature_click', {
      'feature_name': featureName,
      'screen': screen ?? 'app',
      ...?metadata,
    });
    await trackBehavior(
      eventType: 'feature_click',
      screen: screen ?? 'app',
      featureName: featureName,
      metadata: metadata,
    );
  }
}

// Singleton
final analytics = AnalyticsService();
