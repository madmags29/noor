// ============================================================
// NOOR — Language / Localization Provider (Dart)
// Exact port of noor-mobile/src/context/LanguageContext.tsx
// Supports 11 languages: en, hi, ur, ar, bn, ta, ml, mr, gu, tr, id
// ============================================================

import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:shared_preferences/shared_preferences.dart';

const String _storageKeyLanguage = '@noor_language';

// ── Supported Languages ─────────────────────────────────────
enum SupportedLanguage {
  en,
  hi,
  ur,
  ar,
  bn,
  ta,
  ml,
  mr,
  gu,
  tr,
  id,
}

extension SupportedLanguageExt on SupportedLanguage {
  String get code => name;

  bool get isRtl => this == SupportedLanguage.ur || this == SupportedLanguage.ar;

  Locale get locale => Locale(code);
}

class LanguageInfo {
  final SupportedLanguage code;
  final String name;
  final String nativeName;
  final String flag;
  final TextDirection direction;
  final String? region;

  const LanguageInfo({
    required this.code,
    required this.name,
    required this.nativeName,
    required this.flag,
    required this.direction,
    this.region,
  });
}

const List<LanguageInfo> kSupportedLanguages = [
  LanguageInfo(
    code: SupportedLanguage.hi,
    name: 'Hindi',
    nativeName: 'हिन्दी',
    flag: '🇮🇳',
    direction: TextDirection.ltr,
    region: 'India (National)',
  ),
  LanguageInfo(
    code: SupportedLanguage.ur,
    name: 'Urdu',
    nativeName: 'اردو',
    flag: '🇵🇰',
    direction: TextDirection.rtl,
    region: 'Pakistan & South Asia',
  ),
  LanguageInfo(
    code: SupportedLanguage.ar,
    name: 'Arabic',
    nativeName: 'العربية',
    flag: '🇸🇦',
    direction: TextDirection.rtl,
    region: 'Middle East & North Africa',
  ),
  LanguageInfo(
    code: SupportedLanguage.en,
    name: 'English',
    nativeName: 'English',
    flag: '🇬🇧',
    direction: TextDirection.ltr,
    region: 'Global',
  ),
  LanguageInfo(
    code: SupportedLanguage.bn,
    name: 'Bengali',
    nativeName: 'বাংলা',
    flag: '🇮🇳',
    direction: TextDirection.ltr,
    region: 'West Bengal & Bangladesh',
  ),
  LanguageInfo(
    code: SupportedLanguage.ta,
    name: 'Tamil',
    nativeName: 'தமிழ்',
    flag: '🇮🇳',
    direction: TextDirection.ltr,
    region: 'Tamil Nadu & Sri Lanka',
  ),
  LanguageInfo(
    code: SupportedLanguage.ml,
    name: 'Malayalam',
    nativeName: 'മലയാളം',
    flag: '🇮🇳',
    direction: TextDirection.ltr,
    region: 'Kerala',
  ),
  LanguageInfo(
    code: SupportedLanguage.mr,
    name: 'Marathi',
    nativeName: 'मराठी',
    flag: '🇮🇳',
    direction: TextDirection.ltr,
    region: 'Maharashtra',
  ),
  LanguageInfo(
    code: SupportedLanguage.gu,
    name: 'Gujarati',
    nativeName: 'ગુજરાતી',
    flag: '🇮🇳',
    direction: TextDirection.ltr,
    region: 'Gujarat',
  ),
  LanguageInfo(
    code: SupportedLanguage.tr,
    name: 'Turkish',
    nativeName: 'Türkçe',
    flag: '🇹🇷',
    direction: TextDirection.ltr,
    region: 'Turkey',
  ),
  LanguageInfo(
    code: SupportedLanguage.id,
    name: 'Indonesian',
    nativeName: 'Bahasa Indonesia',
    flag: '🇮🇩',
    direction: TextDirection.ltr,
    region: 'Indonesia',
  ),
];

// ── Language State ───────────────────────────────────────────
class LanguageState {
  final SupportedLanguage language;
  final bool isLoading;

  const LanguageState({
    this.language = SupportedLanguage.en,
    this.isLoading = true,
  });

  LanguageInfo get info =>
      kSupportedLanguages.firstWhere((l) => l.code == language);

  Locale get locale => language.locale;

  LanguageState copyWith({SupportedLanguage? language, bool? isLoading}) {
    return LanguageState(
      language: language ?? this.language,
      isLoading: isLoading ?? this.isLoading,
    );
  }
}

// ── Provider ─────────────────────────────────────────────────
class LanguageNotifier extends AsyncNotifier<LanguageState> {
  @override
  Future<LanguageState> build() async {
    final prefs = await SharedPreferences.getInstance();
    final saved = prefs.getString(_storageKeyLanguage);
    SupportedLanguage lang = SupportedLanguage.en;
    if (saved != null) {
      try {
        lang = SupportedLanguage.values.firstWhere((e) => e.code == saved);
      } catch (_) {}
    }
    return LanguageState(language: lang, isLoading: false);
  }

  Future<void> setLanguage(SupportedLanguage lang) async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString(_storageKeyLanguage, lang.code);
    state = AsyncData(
      state.value!.copyWith(language: lang),
    );
  }
}

final languageProvider =
    AsyncNotifierProvider<LanguageNotifier, LanguageState>(
  LanguageNotifier.new,
);
