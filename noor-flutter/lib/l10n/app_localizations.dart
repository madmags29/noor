// ============================================================
// NOOR — Complete App Localizations Engine (Dart)
// Supports 11 languages with 350+ master translation keys:
// English, Hindi, Urdu, Arabic, Turkish, Indonesian, Bengali,
// Marathi, Gujarati, Tamil, Malayalam
// ============================================================

import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'translations_data.dart';

abstract class AppLocalizations {
  static AppLocalizations? of(BuildContext context) {
    return Localizations.of<AppLocalizations>(context, AppLocalizations);
  }

  static const LocalizationsDelegate<AppLocalizations> delegate =
      _AppLocalizationsDelegate();

  /// Generic translation helper by key with fallback
  String t(String key, [String? fallback]);

  // ── Navigation & Main Tabs ─────────────────────────────────
  String get home;
  String get prayers;
  String get quran;
  String get duas;
  String get ziyarat;
  String get settings;
  String get calendar;
  String get more;
  String get hajjUmrah;
  String get zakat;
  String get janazah;
  String get adab;
  String get nikah;
  String get kids;
  String get travel;
  String get watch;
  String get contact;
  String get privacyPolicy;
  String get termsOfService;
  String get map;
  String get guides;

  // ── Home Screen & Branding ─────────────────────────────────
  String get appName;
  String get appSubtitle;
  String get quickEssentials;
  String get upcomingSalaah;
  String get remainingUntilAdhan;
  String get dailyVerse;
  String get dailyHadith;
  String get hadithQuote;
  String get readQuranCta;
  String get ctaPrayerTimes;
  String get qibla;
  String get adhanVoice;
  String get listenAdhan;

  // ── Prayer Calculation & Status ────────────────────────────
  String get fajr;
  String get sunrise;
  String get dhuhr;
  String get asr;
  String get maghrib;
  String get isha;
  String get nextPrayer;
  String get dailyPrayerTimes;
  String get precisionCalculationFor;
  String get calculationMethod;
  String get qadaTracker;
  String get logMissedPrayers;
  String get standardAsrMethod;
  String get elapsed;
  String get currentBadge;

  // ── Quran, Duas & Pillars ──────────────────────────────────
  String get surahsCatalog;
  String get prayerTimetable;
  String get sacredLunarMonths;
  String get sanctuariesDirectory;
  String get interactiveTasbih;
  String get visualTreasures;
  String get spiritualDeenTracker;
  String get namesOfAllah;
  String get asmaDesc;
  String get sacredDirection;
  String get sadaqahJariyah;
  String get giving;
  String get media;
  String get dashboard;

  // ── Language & Common ──────────────────────────────────────
  String get selectLanguage;
  String get autoDetectedNotice;
  String get language;
  String get askAi;
  String get search;
  String get login;
  String get continueGoogle;
  String get close;
  String get back;
}

class _AppLocalizationsImpl extends AppLocalizations {
  final String localeName;
  final Map<String, String> _dict;
  final Map<String, String> _enFallback;

  _AppLocalizationsImpl(this.localeName)
      : _dict = kMasterTranslations[localeName] ?? kMasterTranslations['en'] ?? {},
        _enFallback = kMasterTranslations['en'] ?? {};

  @override
  String t(String key, [String? fallback]) {
    return _dict[key] ?? _enFallback[key] ?? fallback ?? key;
  }

  // ── Navigation ─────────────────────────────────────────────
  @override String get home => t('home', 'Home');
  @override String get prayers => t('prayers', 'Prayers');
  @override String get quran => t('quran', 'Noble Quran');
  @override String get duas => t('duas', 'Duas & Dhikr');
  @override String get ziyarat => t('ziyarat', 'Ziyarat & Dargahs');
  @override String get settings => t('profileSettings', 'Settings');
  @override String get calendar => t('calendar', 'Hijri Calendar');
  @override String get more => t('more', 'More');
  @override String get hajjUmrah => t('hajjUmrah', 'Hajj & Umrah');
  @override String get zakat => t('zakatHub', 'Zakat Calculator');
  @override String get janazah => t('janazah', 'Janazah Guide');
  @override String get adab => t('etiquette', 'Daily Etiquette (Adab)');
  @override String get nikah => t('nikah', 'Nikah & Family');
  @override String get kids => t('kids', 'Kids Corner');
  @override String get travel => t('travelMode', 'Traveler\'s Prayer');
  @override String get watch => t('watch', 'Makkah & Madinah Live');
  @override String get contact => t('contact', 'Contact & Support');
  @override String get privacyPolicy => t('privacy', 'Privacy Policy');
  @override String get termsOfService => t('terms', 'Terms of Service');
  @override String get map => t('islamicMap', 'Mosques & Halal Map');
  @override String get guides => t('guides', 'Living Guides');

  // ── Home Screen ────────────────────────────────────────────
  @override String get appName => t('appName', 'Noor-e-ilahi');
  @override String get appSubtitle => t('appSubtitle', 'Your Deen. Your Daily Companion.');
  @override String get quickEssentials => t('quickEssentials', 'Quick Essentials');
  @override String get upcomingSalaah => t('upcomingSalaah', 'Upcoming Salaah');
  @override String get remainingUntilAdhan => t('remainingUntilAdhan', 'Remaining until Adhan');
  @override String get dailyVerse => t('dailyVerse', 'Verse of the Day');
  @override String get dailyHadith => t('dailyHadith', 'Daily Hadith');
  @override String get hadithQuote => t('hadithQuote', '"The best among you are those who learn the Quran and teach it." — Sahih al-Bukhari 5027');
  @override String get readQuranCta => t('readQuranCta', 'Read Quran →');
  @override String get ctaPrayerTimes => t('ctaPrayerTimes', 'Full Prayer Timetable');
  @override String get qibla => t('qibla', 'Qibla Compass');
  @override String get adhanVoice => t('adhanVoice', 'Adhan Voice');
  @override String get listenAdhan => t('listenAdhan', 'Listen to Adhan');

  // ── Prayer ─────────────────────────────────────────────────
  @override String get fajr => t('fajr', 'Fajr');
  @override String get sunrise => t('sunrise', 'Sunrise');
  @override String get dhuhr => t('dhuhr', 'Dhuhr');
  @override String get asr => t('asr', 'Asr');
  @override String get maghrib => t('maghrib', 'Maghrib');
  @override String get isha => t('isha', 'Isha');
  @override String get nextPrayer => t('nextPrayer', 'Next Prayer');
  @override String get dailyPrayerTimes => t('dailyPrayerTimes', 'Daily Prayer Times');
  @override String get precisionCalculationFor => t('precisionCalculationFor', 'Accurate daily prayer times for');
  @override String get calculationMethod => t('calculationMethod', 'Calculation Method');
  @override String get qadaTracker => t('qadaTracker', 'Daily Qada Tracker');
  @override String get logMissedPrayers => t('logMissedPrayers', 'Log missed prayers to keep your deen clean');
  @override String get standardAsrMethod => t('standardAsrMethod', 'MWL • Standard Asr');
  @override String get elapsed => t('elapsed', 'elapsed');
  @override String get currentBadge => t('currentBadge', 'Current');

  // ── Quran & Pillars ────────────────────────────────────────
  @override String get surahsCatalog => t('surahsCatalog', '114 Surahs of the Quran');
  @override String get prayerTimetable => t('prayerTimetable', 'Astronomical Prayer Timetable');
  @override String get sacredLunarMonths => t('sacredLunarMonths', '12 Sacred Lunar Months');
  @override String get sanctuariesDirectory => t('sanctuariesDirectory', 'Classical Sanctuaries & Holy Dargahs');
  @override String get interactiveTasbih => t('interactiveTasbih', 'Digital Tasbeeh');
  @override String get visualTreasures => t('visualTreasures', 'Islamic Visual Treasures');
  @override String get spiritualDeenTracker => t('spiritualDeenTracker', 'Spiritual Deen Tracker');
  @override String get namesOfAllah => t('namesOfAllah', '99 Names of Allah');
  @override String get asmaDesc => t('asmaDesc', 'Contemplate divine attributes & receive blessings');
  @override String get sacredDirection => t('sacredDirection', 'Sacred Direction');
  @override String get sadaqahJariyah => t('sadaqahJariyah', 'Sadaqah Jariyah & Giving');
  @override String get giving => t('giving', 'Sadaqah Jariyah');
  @override String get media => t('mediaGallery', 'Islamic Media Gallery');
  @override String get dashboard => t('dashboard', 'Deen Tracker');

  // ── Language & Common ──────────────────────────────────────
  @override String get selectLanguage => t('selectLanguage', 'Select Language');
  @override String get autoDetectedNotice => t('autoDetectedNotice', 'Auto-detected based on your location');
  @override String get language => t('language', 'Language');
  @override String get askAi => t('askAi', 'Ask Noor AI');
  @override String get search => t('search', 'Search platform...');
  @override String get login => t('login', 'Sign In');
  @override String get continueGoogle => t('continueGoogle', 'Continue with Google');
  @override String get close => t('close', 'Close');
  @override String get back => t('back', 'Back');
}

class _AppLocalizationsDelegate
    extends LocalizationsDelegate<AppLocalizations> {
  const _AppLocalizationsDelegate();

  @override
  bool isSupported(Locale locale) {
    return ['en', 'hi', 'ur', 'ar', 'bn', 'ta', 'ml', 'mr', 'gu', 'tr', 'id']
        .contains(locale.languageCode);
  }

  @override
  Future<AppLocalizations> load(Locale locale) {
    return SynchronousFuture<AppLocalizations>(
      _AppLocalizationsImpl(locale.languageCode),
    );
  }

  @override
  bool shouldReload(_AppLocalizationsDelegate old) => false;
}
