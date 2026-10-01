// ============================================================
// NOOR — Complete Noble Quran Catalog (All 114 Surahs)
// Full Ayahs, Reciters, Audio Engine & Multi-Lingual API Client
// ============================================================

import 'dart:convert';
import 'package:http/http.dart' as http;

class SurahItem {
  final int number;
  final String name;
  final String englishName;
  final String englishNameTranslation;
  final int numberOfAyahs;
  final String revelationType;
  final int juz;

  const SurahItem({
    required this.number,
    required this.name,
    required this.englishName,
    required this.englishNameTranslation,
    required this.numberOfAyahs,
    required this.revelationType,
    required this.juz,
  });
}

class AyahItem {
  final int number;
  final String arabic;
  final String translation;
  final String? translationUr;
  final String? translationHi;
  final String? translationBn;
  final String? translationTr;
  final String? translationId;
  final String? audioUrl;

  const AyahItem({
    required this.number,
    required this.arabic,
    required this.translation,
    this.translationUr,
    this.translationHi,
    this.translationBn,
    this.translationTr,
    this.translationId,
    this.audioUrl,
  });

  String getTranslation(String langCode) {
    switch (langCode) {
      case 'hi':
        return (translationHi != null && translationHi!.trim().isNotEmpty) ? translationHi! : translation;
      case 'ur':
        return (translationUr != null && translationUr!.trim().isNotEmpty) ? translationUr! : translation;
      case 'bn':
        return (translationBn != null && translationBn!.trim().isNotEmpty) ? translationBn! : translation;
      case 'tr':
        return (translationTr != null && translationTr!.trim().isNotEmpty) ? translationTr! : translation;
      case 'id':
        return (translationId != null && translationId!.trim().isNotEmpty) ? translationId! : translation;
      case 'ar':
        return arabic;
      case 'en':
      default:
        return translation;
    }
  }
}

class DailyAyahItem {
  final String arabic;
  final String? transliteration;
  final String translationEn;
  final String? translationUr;
  final String? translationHi;
  final String? translationBn;
  final String? translationTr;
  final String? translationId;
  final String surahName;
  final String reference;
  final int surahNumber;
  final int ayahNumber;
  final String? audioUrl;

  const DailyAyahItem({
    required this.arabic,
    this.transliteration,
    required this.translationEn,
    this.translationUr,
    this.translationHi,
    this.translationBn,
    this.translationTr,
    this.translationId,
    required this.surahName,
    required this.reference,
    required this.surahNumber,
    required this.ayahNumber,
    this.audioUrl,
  });

  String getTranslation(String langCode) {
    switch (langCode) {
      case 'hi':
        return (translationHi != null && translationHi!.isNotEmpty) ? translationHi! : translationEn;
      case 'ur':
        return (translationUr != null && translationUr!.isNotEmpty) ? translationUr! : translationEn;
      case 'bn':
        return (translationBn != null && translationBn!.isNotEmpty) ? translationBn! : translationEn;
      case 'tr':
        return (translationTr != null && translationTr!.isNotEmpty) ? translationTr! : translationEn;
      case 'id':
        return (translationId != null && translationId!.isNotEmpty) ? translationId! : translationEn;
      default:
        return translationEn;
    }
  }
}

class ReciterItem {
  final String id;
  final String name;
  final String style;
  final String country;
  final String serverUrl;

  const ReciterItem({
    required this.id,
    required this.name,
    required this.style,
    required this.country,
    required this.serverUrl,
  });
}

const List<ReciterItem> kRecitersList = [
  ReciterItem(id: 'alafasy', name: 'Mishary Rashid Alafasy', style: 'Hafs', country: 'Kuwait', serverUrl: 'https://server8.mp3quran.net/afs'),
  ReciterItem(id: 'abdulbasit', name: 'Abdul Basit Abdus Samad', style: 'Murattal', country: 'Egypt', serverUrl: 'https://server7.mp3quran.net/basit'),
  ReciterItem(id: 'sudais', name: 'Abdur-Rahman As-Sudais', style: 'Hafs', country: 'Saudi Arabia', serverUrl: 'https://server11.mp3quran.net/sds'),
  ReciterItem(id: 'ghamdi', name: 'Saad Al-Ghamdi', style: 'Hafs', country: 'Saudi Arabia', serverUrl: 'https://server7.mp3quran.net/s_gmd'),
];

String getSurahAudioUrl(int surahNumber, [String reciterId = 'alafasy']) {
  final padded = surahNumber.toString().padLeft(3, '0');
  final reciter = kRecitersList.firstWhere((r) => r.id == reciterId, orElse: () => kRecitersList[0]);
  return '${reciter.serverUrl}/$padded.mp3';
}

String getAyahAudioUrl(int surahNumber, int ayahNumber) {
  final s = surahNumber.toString().padLeft(3, '0');
  final a = ayahNumber.toString().padLeft(3, '0');
  return 'https://everyayah.com/data/Alafasy_128kbps/$s$a.mp3';
}

const List<DailyAyahItem> kDailyAyahs = [
  DailyAyahItem(
    arabic: 'وَلَقَدْ يَسَّرْنَا الْقُرْآنَ لِلذِّكْرِ فَهَلْ مِن مُّدَّكِرٍ',
    transliteration: "Wa laqad yassarnal-Qur'ana lil-dhikri fahal min muddakir",
    translationEn: 'And We have certainly made the Quran easy for remembrance, so is there any who will remember?',
    translationUr: 'اور ہم نے قرآن کو نصیحت کے لیے آسان کردیا، تو کوئی ہے نصیحت حاصل کرنے والا؟',
    translationHi: 'और हमने वास्तव में क़ुरआन को याद के लिए आसान किया, तो क्या कोई है याद करने वाला?',
    surahName: 'Al-Qamar',
    reference: 'Surah Al-Qamar 54:17',
    surahNumber: 54,
    ayahNumber: 17,
    audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/3897.mp3',
  ),
  DailyAyahItem(
    arabic: 'إِنَّ مَعَ الْعُسْرِ يُسْرًا',
    transliteration: "Inna ma'al-'usri yusra",
    translationEn: 'Indeed, with hardship will be ease.',
    translationUr: 'بے شک مشکل کے ساتھ آسانی ہے۔',
    translationHi: 'निश्चित रूप से, कठिनाई के साथ आसानी है।',
    surahName: 'Ash-Sharh',
    reference: 'Surah Ash-Sharh 94:6',
    surahNumber: 94,
    ayahNumber: 6,
    audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/4776.mp3',
  ),
  DailyAyahItem(
    arabic: 'وَقُل رَّبِّ زِدْنِي عِلْمًا',
    transliteration: "Wa qul Rabbi zidnee 'ilma",
    translationEn: 'And say: My Lord, increase me in knowledge.',
    translationUr: 'اور کہو: اے میرے رب! میرے علم میں اضافہ فرما۔',
    translationHi: 'और कहो: ऐ मेरे रब! मेरे ज्ञान में वृद्धि कर।',
    surahName: 'Ta-Ha',
    reference: 'Surah Ta-Ha 20:114',
    surahNumber: 20,
    ayahNumber: 114,
    audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/2462.mp3',
  ),
];

DailyAyahItem getDailyAyah(DateTime date) {
  final dayOfYear = date.difference(DateTime(date.year)).inDays;
  return kDailyAyahs[dayOfYear % kDailyAyahs.length];
}

const List<SurahItem> kSurahsList = [
  SurahItem(
    number: 1,
    name: 'سُورَةُ ٱلْفَاتِحَةِ',
    englishName: 'Al-Faatiha',
    englishNameTranslation: 'The Opening',
    numberOfAyahs: 7,
    revelationType: 'Meccan',
    juz: 1,
  ),
  SurahItem(
    number: 2,
    name: 'سُورَةُ البَقَرَةِ',
    englishName: 'Al-Baqara',
    englishNameTranslation: 'The Cow',
    numberOfAyahs: 286,
    revelationType: 'Medinan',
    juz: 3,
  ),
  SurahItem(
    number: 3,
    name: 'سُورَةُ آلِ عِمۡرَانَ',
    englishName: 'Aal-i-Imraan',
    englishNameTranslation: 'The Family of Imraan',
    numberOfAyahs: 200,
    revelationType: 'Medinan',
    juz: 4,
  ),
  SurahItem(
    number: 4,
    name: 'سُورَةُ النِّسَاءِ',
    englishName: 'An-Nisaa',
    englishNameTranslation: 'The Women',
    numberOfAyahs: 176,
    revelationType: 'Medinan',
    juz: 6,
  ),
  SurahItem(
    number: 5,
    name: 'سُورَةُ المَائـِدَةِ',
    englishName: 'Al-Maaida',
    englishNameTranslation: 'The Table',
    numberOfAyahs: 120,
    revelationType: 'Medinan',
    juz: 7,
  ),
  SurahItem(
    number: 6,
    name: 'سُورَةُ الأَنۡعَامِ',
    englishName: 'Al-An\'aam',
    englishNameTranslation: 'The Cattle',
    numberOfAyahs: 165,
    revelationType: 'Meccan',
    juz: 8,
  ),
  SurahItem(
    number: 7,
    name: 'سُورَةُ الأَعۡرَافِ',
    englishName: 'Al-A\'raaf',
    englishNameTranslation: 'The Heights',
    numberOfAyahs: 206,
    revelationType: 'Meccan',
    juz: 9,
  ),
  SurahItem(
    number: 8,
    name: 'سُورَةُ الأَنفَالِ',
    englishName: 'Al-Anfaal',
    englishNameTranslation: 'The Spoils of War',
    numberOfAyahs: 75,
    revelationType: 'Medinan',
    juz: 10,
  ),
  SurahItem(
    number: 9,
    name: 'سُورَةُ التَّوۡبَةِ',
    englishName: 'At-Tawba',
    englishNameTranslation: 'The Repentance',
    numberOfAyahs: 129,
    revelationType: 'Medinan',
    juz: 11,
  ),
  SurahItem(
    number: 10,
    name: 'سُورَةُ يُونُسَ',
    englishName: 'Yunus',
    englishNameTranslation: 'Jonas',
    numberOfAyahs: 109,
    revelationType: 'Meccan',
    juz: 11,
  ),
  SurahItem(
    number: 11,
    name: 'سُورَةُ هُودٍ',
    englishName: 'Hud',
    englishNameTranslation: 'Hud',
    numberOfAyahs: 123,
    revelationType: 'Meccan',
    juz: 12,
  ),
  SurahItem(
    number: 12,
    name: 'سُورَةُ يُوسُفَ',
    englishName: 'Yusuf',
    englishNameTranslation: 'Joseph',
    numberOfAyahs: 111,
    revelationType: 'Meccan',
    juz: 13,
  ),
  SurahItem(
    number: 13,
    name: 'سُورَةُ الرَّعۡدِ',
    englishName: 'Ar-Ra\'d',
    englishNameTranslation: 'The Thunder',
    numberOfAyahs: 43,
    revelationType: 'Medinan',
    juz: 13,
  ),
  SurahItem(
    number: 14,
    name: 'سُورَةُ إِبۡرَاهِيمَ',
    englishName: 'Ibrahim',
    englishNameTranslation: 'Abraham',
    numberOfAyahs: 52,
    revelationType: 'Meccan',
    juz: 13,
  ),
  SurahItem(
    number: 15,
    name: 'سُورَةُ الحِجۡرِ',
    englishName: 'Al-Hijr',
    englishNameTranslation: 'The Rock',
    numberOfAyahs: 99,
    revelationType: 'Meccan',
    juz: 14,
  ),
  SurahItem(
    number: 16,
    name: 'سُورَةُ النَّحۡلِ',
    englishName: 'An-Nahl',
    englishNameTranslation: 'The Bee',
    numberOfAyahs: 128,
    revelationType: 'Meccan',
    juz: 14,
  ),
  SurahItem(
    number: 17,
    name: 'سُورَةُ الإِسۡرَاءِ',
    englishName: 'Al-Israa',
    englishNameTranslation: 'The Night Journey',
    numberOfAyahs: 111,
    revelationType: 'Meccan',
    juz: 15,
  ),
  SurahItem(
    number: 18,
    name: 'سُورَةُ الكَهۡفِ',
    englishName: 'Al-Kahf',
    englishNameTranslation: 'The Cave',
    numberOfAyahs: 110,
    revelationType: 'Meccan',
    juz: 16,
  ),
  SurahItem(
    number: 19,
    name: 'سُورَةُ مَرۡيَمَ',
    englishName: 'Maryam',
    englishNameTranslation: 'Mary',
    numberOfAyahs: 98,
    revelationType: 'Meccan',
    juz: 16,
  ),
  SurahItem(
    number: 20,
    name: 'سُورَةُ طه',
    englishName: 'Taa-Haa',
    englishNameTranslation: 'Taa-Haa',
    numberOfAyahs: 135,
    revelationType: 'Meccan',
    juz: 16,
  ),
  SurahItem(
    number: 21,
    name: 'سُورَةُ الأَنبِيَاءِ',
    englishName: 'Al-Anbiyaa',
    englishNameTranslation: 'The Prophets',
    numberOfAyahs: 112,
    revelationType: 'Meccan',
    juz: 17,
  ),
  SurahItem(
    number: 22,
    name: 'سُورَةُ الحَجِّ',
    englishName: 'Al-Hajj',
    englishNameTranslation: 'The Pilgrimage',
    numberOfAyahs: 78,
    revelationType: 'Medinan',
    juz: 17,
  ),
  SurahItem(
    number: 23,
    name: 'سُورَةُ المُؤۡمِنُونَ',
    englishName: 'Al-Muminoon',
    englishNameTranslation: 'The Believers',
    numberOfAyahs: 118,
    revelationType: 'Meccan',
    juz: 18,
  ),
  SurahItem(
    number: 24,
    name: 'سُورَةُ النُّورِ',
    englishName: 'An-Noor',
    englishNameTranslation: 'The Light',
    numberOfAyahs: 64,
    revelationType: 'Medinan',
    juz: 18,
  ),
  SurahItem(
    number: 25,
    name: 'سُورَةُ الفُرۡقَانِ',
    englishName: 'Al-Furqaan',
    englishNameTranslation: 'The Criterion',
    numberOfAyahs: 77,
    revelationType: 'Meccan',
    juz: 19,
  ),
  SurahItem(
    number: 26,
    name: 'سُورَةُ الشُّعَرَاءِ',
    englishName: 'Ash-Shu\'araa',
    englishNameTranslation: 'The Poets',
    numberOfAyahs: 227,
    revelationType: 'Meccan',
    juz: 19,
  ),
  SurahItem(
    number: 27,
    name: 'سُورَةُ النَّمۡلِ',
    englishName: 'An-Naml',
    englishNameTranslation: 'The Ant',
    numberOfAyahs: 93,
    revelationType: 'Meccan',
    juz: 20,
  ),
  SurahItem(
    number: 28,
    name: 'سُورَةُ القَصَصِ',
    englishName: 'Al-Qasas',
    englishNameTranslation: 'The Stories',
    numberOfAyahs: 88,
    revelationType: 'Meccan',
    juz: 20,
  ),
  SurahItem(
    number: 29,
    name: 'سُورَةُ العَنكَبُوتِ',
    englishName: 'Al-Ankaboot',
    englishNameTranslation: 'The Spider',
    numberOfAyahs: 69,
    revelationType: 'Meccan',
    juz: 21,
  ),
  SurahItem(
    number: 30,
    name: 'سُورَةُ الرُّومِ',
    englishName: 'Ar-Room',
    englishNameTranslation: 'The Romans',
    numberOfAyahs: 60,
    revelationType: 'Meccan',
    juz: 21,
  ),
  SurahItem(
    number: 31,
    name: 'سُورَةُ لُقۡمَانَ',
    englishName: 'Luqman',
    englishNameTranslation: 'Luqman',
    numberOfAyahs: 34,
    revelationType: 'Meccan',
    juz: 21,
  ),
  SurahItem(
    number: 32,
    name: 'سُورَةُ السَّجۡدَةِ',
    englishName: 'As-Sajda',
    englishNameTranslation: 'The Prostration',
    numberOfAyahs: 30,
    revelationType: 'Meccan',
    juz: 21,
  ),
  SurahItem(
    number: 33,
    name: 'سُورَةُ الأَحۡزَابِ',
    englishName: 'Al-Ahzaab',
    englishNameTranslation: 'The Clans',
    numberOfAyahs: 73,
    revelationType: 'Medinan',
    juz: 22,
  ),
  SurahItem(
    number: 34,
    name: 'سُورَةُ سَبَإٍ',
    englishName: 'Saba',
    englishNameTranslation: 'Sheba',
    numberOfAyahs: 54,
    revelationType: 'Meccan',
    juz: 22,
  ),
  SurahItem(
    number: 35,
    name: 'سُورَةُ فَاطِرٍ',
    englishName: 'Faatir',
    englishNameTranslation: 'The Originator',
    numberOfAyahs: 45,
    revelationType: 'Meccan',
    juz: 22,
  ),
  SurahItem(
    number: 36,
    name: 'سُورَةُ يسٓ',
    englishName: 'Yaseen',
    englishNameTranslation: 'Yaseen',
    numberOfAyahs: 83,
    revelationType: 'Meccan',
    juz: 23,
  ),
  SurahItem(
    number: 37,
    name: 'سُورَةُ الصَّافَّاتِ',
    englishName: 'As-Saaffaat',
    englishNameTranslation: 'Those drawn up in Ranks',
    numberOfAyahs: 182,
    revelationType: 'Meccan',
    juz: 23,
  ),
  SurahItem(
    number: 38,
    name: 'سُورَةُ صٓ',
    englishName: 'Saad',
    englishNameTranslation: 'The letter Saad',
    numberOfAyahs: 88,
    revelationType: 'Meccan',
    juz: 23,
  ),
  SurahItem(
    number: 39,
    name: 'سُورَةُ الزُّمَرِ',
    englishName: 'Az-Zumar',
    englishNameTranslation: 'The Groups',
    numberOfAyahs: 75,
    revelationType: 'Meccan',
    juz: 24,
  ),
  SurahItem(
    number: 40,
    name: 'سُورَةُ غَافِرٍ',
    englishName: 'Ghafir',
    englishNameTranslation: 'The Forgiver',
    numberOfAyahs: 85,
    revelationType: 'Meccan',
    juz: 24,
  ),
  SurahItem(
    number: 41,
    name: 'سُورَةُ فُصِّلَتۡ',
    englishName: 'Fussilat',
    englishNameTranslation: 'Explained in detail',
    numberOfAyahs: 54,
    revelationType: 'Meccan',
    juz: 25,
  ),
  SurahItem(
    number: 42,
    name: 'سُورَةُ الشُّورَىٰ',
    englishName: 'Ash-Shura',
    englishNameTranslation: 'Consultation',
    numberOfAyahs: 53,
    revelationType: 'Meccan',
    juz: 25,
  ),
  SurahItem(
    number: 43,
    name: 'سُورَةُ الزُّخۡرُفِ',
    englishName: 'Az-Zukhruf',
    englishNameTranslation: 'Ornaments of gold',
    numberOfAyahs: 89,
    revelationType: 'Meccan',
    juz: 25,
  ),
  SurahItem(
    number: 44,
    name: 'سُورَةُ الدُّخَانِ',
    englishName: 'Ad-Dukhaan',
    englishNameTranslation: 'The Smoke',
    numberOfAyahs: 59,
    revelationType: 'Meccan',
    juz: 25,
  ),
  SurahItem(
    number: 45,
    name: 'سُورَةُ الجَاثِيَةِ',
    englishName: 'Al-Jaathiya',
    englishNameTranslation: 'Crouching',
    numberOfAyahs: 37,
    revelationType: 'Meccan',
    juz: 25,
  ),
  SurahItem(
    number: 46,
    name: 'سُورَةُ الأَحۡقَافِ',
    englishName: 'Al-Ahqaf',
    englishNameTranslation: 'The Dunes',
    numberOfAyahs: 35,
    revelationType: 'Meccan',
    juz: 26,
  ),
  SurahItem(
    number: 47,
    name: 'سُورَةُ مُحَمَّدٍ',
    englishName: 'Muhammad',
    englishNameTranslation: 'Muhammad',
    numberOfAyahs: 38,
    revelationType: 'Medinan',
    juz: 26,
  ),
  SurahItem(
    number: 48,
    name: 'سُورَةُ الفَتۡحِ',
    englishName: 'Al-Fath',
    englishNameTranslation: 'The Victory',
    numberOfAyahs: 29,
    revelationType: 'Medinan',
    juz: 26,
  ),
  SurahItem(
    number: 49,
    name: 'سُورَةُ الحُجُرَاتِ',
    englishName: 'Al-Hujuraat',
    englishNameTranslation: 'The Inner Apartments',
    numberOfAyahs: 18,
    revelationType: 'Medinan',
    juz: 26,
  ),
  SurahItem(
    number: 50,
    name: 'سُورَةُ قٓ',
    englishName: 'Qaaf',
    englishNameTranslation: 'The letter Qaaf',
    numberOfAyahs: 45,
    revelationType: 'Meccan',
    juz: 26,
  ),
  SurahItem(
    number: 51,
    name: 'سُورَةُ الذَّارِيَاتِ',
    englishName: 'Adh-Dhaariyat',
    englishNameTranslation: 'The Winnowing Winds',
    numberOfAyahs: 60,
    revelationType: 'Meccan',
    juz: 27,
  ),
  SurahItem(
    number: 52,
    name: 'سُورَةُ الطُّورِ',
    englishName: 'At-Tur',
    englishNameTranslation: 'The Mount',
    numberOfAyahs: 49,
    revelationType: 'Meccan',
    juz: 27,
  ),
  SurahItem(
    number: 53,
    name: 'سُورَةُ النَّجۡمِ',
    englishName: 'An-Najm',
    englishNameTranslation: 'The Star',
    numberOfAyahs: 62,
    revelationType: 'Meccan',
    juz: 27,
  ),
  SurahItem(
    number: 54,
    name: 'سُورَةُ القَمَرِ',
    englishName: 'Al-Qamar',
    englishNameTranslation: 'The Moon',
    numberOfAyahs: 55,
    revelationType: 'Meccan',
    juz: 27,
  ),
  SurahItem(
    number: 55,
    name: 'سُورَةُ الرَّحۡمَٰن',
    englishName: 'Ar-Rahmaan',
    englishNameTranslation: 'The Beneficent',
    numberOfAyahs: 78,
    revelationType: 'Medinan',
    juz: 27,
  ),
  SurahItem(
    number: 56,
    name: 'سُورَةُ الوَاقِعَةِ',
    englishName: 'Al-Waaqia',
    englishNameTranslation: 'The Inevitable',
    numberOfAyahs: 96,
    revelationType: 'Meccan',
    juz: 27,
  ),
  SurahItem(
    number: 57,
    name: 'سُورَةُ الحَدِيدِ',
    englishName: 'Al-Hadid',
    englishNameTranslation: 'The Iron',
    numberOfAyahs: 29,
    revelationType: 'Medinan',
    juz: 27,
  ),
  SurahItem(
    number: 58,
    name: 'سُورَةُ المُجَادلَةِ',
    englishName: 'Al-Mujaadila',
    englishNameTranslation: 'The Pleading Woman',
    numberOfAyahs: 22,
    revelationType: 'Medinan',
    juz: 28,
  ),
  SurahItem(
    number: 59,
    name: 'سُورَةُ الحَشۡرِ',
    englishName: 'Al-Hashr',
    englishNameTranslation: 'The Exile',
    numberOfAyahs: 24,
    revelationType: 'Medinan',
    juz: 28,
  ),
  SurahItem(
    number: 60,
    name: 'سُورَةُ المُمۡتَحنَةِ',
    englishName: 'Al-Mumtahana',
    englishNameTranslation: 'She that is to be examined',
    numberOfAyahs: 13,
    revelationType: 'Medinan',
    juz: 28,
  ),
  SurahItem(
    number: 61,
    name: 'سُورَةُ الصَّفِّ',
    englishName: 'As-Saff',
    englishNameTranslation: 'The Ranks',
    numberOfAyahs: 14,
    revelationType: 'Medinan',
    juz: 28,
  ),
  SurahItem(
    number: 62,
    name: 'سُورَةُ الجُمُعَةِ',
    englishName: 'Al-Jumu\'a',
    englishNameTranslation: 'Friday',
    numberOfAyahs: 11,
    revelationType: 'Medinan',
    juz: 28,
  ),
  SurahItem(
    number: 63,
    name: 'سُورَةُ المُنَافِقُونَ',
    englishName: 'Al-Munaafiqoon',
    englishNameTranslation: 'The Hypocrites',
    numberOfAyahs: 11,
    revelationType: 'Medinan',
    juz: 28,
  ),
  SurahItem(
    number: 64,
    name: 'سُورَةُ التَّغَابُنِ',
    englishName: 'At-Taghaabun',
    englishNameTranslation: 'Mutual Disillusion',
    numberOfAyahs: 18,
    revelationType: 'Medinan',
    juz: 28,
  ),
  SurahItem(
    number: 65,
    name: 'سُورَةُ الطَّلَاقِ',
    englishName: 'At-Talaaq',
    englishNameTranslation: 'Divorce',
    numberOfAyahs: 12,
    revelationType: 'Medinan',
    juz: 28,
  ),
  SurahItem(
    number: 66,
    name: 'سُورَةُ التَّحۡرِيمِ',
    englishName: 'At-Tahrim',
    englishNameTranslation: 'The Prohibition',
    numberOfAyahs: 12,
    revelationType: 'Medinan',
    juz: 28,
  ),
  SurahItem(
    number: 67,
    name: 'سُورَةُ المُلۡكِ',
    englishName: 'Al-Mulk',
    englishNameTranslation: 'The Sovereignty',
    numberOfAyahs: 30,
    revelationType: 'Meccan',
    juz: 29,
  ),
  SurahItem(
    number: 68,
    name: 'سُورَةُ القَلَمِ',
    englishName: 'Al-Qalam',
    englishNameTranslation: 'The Pen',
    numberOfAyahs: 52,
    revelationType: 'Meccan',
    juz: 29,
  ),
  SurahItem(
    number: 69,
    name: 'سُورَةُ الحَاقَّةِ',
    englishName: 'Al-Haaqqa',
    englishNameTranslation: 'The Reality',
    numberOfAyahs: 52,
    revelationType: 'Meccan',
    juz: 29,
  ),
  SurahItem(
    number: 70,
    name: 'سُورَةُ المَعَارِجِ',
    englishName: 'Al-Ma\'aarij',
    englishNameTranslation: 'The Ascending Stairways',
    numberOfAyahs: 44,
    revelationType: 'Meccan',
    juz: 29,
  ),
  SurahItem(
    number: 71,
    name: 'سُورَةُ نُوحٍ',
    englishName: 'Nooh',
    englishNameTranslation: 'Noah',
    numberOfAyahs: 28,
    revelationType: 'Meccan',
    juz: 29,
  ),
  SurahItem(
    number: 72,
    name: 'سُورَةُ الجِنِّ',
    englishName: 'Al-Jinn',
    englishNameTranslation: 'The Jinn',
    numberOfAyahs: 28,
    revelationType: 'Meccan',
    juz: 29,
  ),
  SurahItem(
    number: 73,
    name: 'سُورَةُ المُزَّمِّلِ',
    englishName: 'Al-Muzzammil',
    englishNameTranslation: 'The Enshrouded One',
    numberOfAyahs: 20,
    revelationType: 'Meccan',
    juz: 29,
  ),
  SurahItem(
    number: 74,
    name: 'سُورَةُ المُدَّثِّرِ',
    englishName: 'Al-Muddaththir',
    englishNameTranslation: 'The Cloaked One',
    numberOfAyahs: 56,
    revelationType: 'Meccan',
    juz: 29,
  ),
  SurahItem(
    number: 75,
    name: 'سُورَةُ القِيَامَةِ',
    englishName: 'Al-Qiyaama',
    englishNameTranslation: 'The Resurrection',
    numberOfAyahs: 40,
    revelationType: 'Meccan',
    juz: 29,
  ),
  SurahItem(
    number: 76,
    name: 'سُورَةُ الإِنسَانِ',
    englishName: 'Al-Insaan',
    englishNameTranslation: 'Man',
    numberOfAyahs: 31,
    revelationType: 'Medinan',
    juz: 29,
  ),
  SurahItem(
    number: 77,
    name: 'سُورَةُ المُرۡسَلَاتِ',
    englishName: 'Al-Mursalaat',
    englishNameTranslation: 'The Emissaries',
    numberOfAyahs: 50,
    revelationType: 'Meccan',
    juz: 29,
  ),
  SurahItem(
    number: 78,
    name: 'سُورَةُ النَّبَإِ',
    englishName: 'An-Naba',
    englishNameTranslation: 'The Announcement',
    numberOfAyahs: 40,
    revelationType: 'Meccan',
    juz: 30,
  ),
  SurahItem(
    number: 79,
    name: 'سُورَةُ النَّازِعَاتِ',
    englishName: 'An-Naazi\'aat',
    englishNameTranslation: 'Those who drag forth',
    numberOfAyahs: 46,
    revelationType: 'Meccan',
    juz: 30,
  ),
  SurahItem(
    number: 80,
    name: 'سُورَةُ عَبَسَ',
    englishName: 'Abasa',
    englishNameTranslation: 'He frowned',
    numberOfAyahs: 42,
    revelationType: 'Meccan',
    juz: 30,
  ),
  SurahItem(
    number: 81,
    name: 'سُورَةُ التَّكۡوِيرِ',
    englishName: 'At-Takwir',
    englishNameTranslation: 'The Overthrowing',
    numberOfAyahs: 29,
    revelationType: 'Meccan',
    juz: 30,
  ),
  SurahItem(
    number: 82,
    name: 'سُورَةُ الانفِطَارِ',
    englishName: 'Al-Infitaar',
    englishNameTranslation: 'The Cleaving',
    numberOfAyahs: 19,
    revelationType: 'Meccan',
    juz: 30,
  ),
  SurahItem(
    number: 83,
    name: 'سُورَةُ المُطَفِّفِينَ',
    englishName: 'Al-Mutaffifin',
    englishNameTranslation: 'Defrauding',
    numberOfAyahs: 36,
    revelationType: 'Meccan',
    juz: 30,
  ),
  SurahItem(
    number: 84,
    name: 'سُورَةُ الانشِقَاقِ',
    englishName: 'Al-Inshiqaaq',
    englishNameTranslation: 'The Splitting Open',
    numberOfAyahs: 25,
    revelationType: 'Meccan',
    juz: 30,
  ),
  SurahItem(
    number: 85,
    name: 'سُورَةُ البُرُوجِ',
    englishName: 'Al-Burooj',
    englishNameTranslation: 'The Constellations',
    numberOfAyahs: 22,
    revelationType: 'Meccan',
    juz: 30,
  ),
  SurahItem(
    number: 86,
    name: 'سُورَةُ الطَّارِقِ',
    englishName: 'At-Taariq',
    englishNameTranslation: 'The Morning Star',
    numberOfAyahs: 17,
    revelationType: 'Meccan',
    juz: 30,
  ),
  SurahItem(
    number: 87,
    name: 'سُورَةُ الأَعۡلَىٰ',
    englishName: 'Al-A\'laa',
    englishNameTranslation: 'The Most High',
    numberOfAyahs: 19,
    revelationType: 'Meccan',
    juz: 30,
  ),
  SurahItem(
    number: 88,
    name: 'سُورَةُ الغَاشِيَةِ',
    englishName: 'Al-Ghaashiya',
    englishNameTranslation: 'The Overwhelming',
    numberOfAyahs: 26,
    revelationType: 'Meccan',
    juz: 30,
  ),
  SurahItem(
    number: 89,
    name: 'سُورَةُ الفَجۡرِ',
    englishName: 'Al-Fajr',
    englishNameTranslation: 'The Dawn',
    numberOfAyahs: 30,
    revelationType: 'Meccan',
    juz: 30,
  ),
  SurahItem(
    number: 90,
    name: 'سُورَةُ البَلَدِ',
    englishName: 'Al-Balad',
    englishNameTranslation: 'The City',
    numberOfAyahs: 20,
    revelationType: 'Meccan',
    juz: 30,
  ),
  SurahItem(
    number: 91,
    name: 'سُورَةُ الشَّمۡسِ',
    englishName: 'Ash-Shams',
    englishNameTranslation: 'The Sun',
    numberOfAyahs: 15,
    revelationType: 'Meccan',
    juz: 30,
  ),
  SurahItem(
    number: 92,
    name: 'سُورَةُ اللَّيۡلِ',
    englishName: 'Al-Lail',
    englishNameTranslation: 'The Night',
    numberOfAyahs: 21,
    revelationType: 'Meccan',
    juz: 30,
  ),
  SurahItem(
    number: 93,
    name: 'سُورَةُ الضُّحَىٰ',
    englishName: 'Ad-Dhuhaa',
    englishNameTranslation: 'The Morning Hours',
    numberOfAyahs: 11,
    revelationType: 'Meccan',
    juz: 30,
  ),
  SurahItem(
    number: 94,
    name: 'سُورَةُ الشَّرۡحِ',
    englishName: 'Ash-Sharh',
    englishNameTranslation: 'The Consolation',
    numberOfAyahs: 8,
    revelationType: 'Meccan',
    juz: 30,
  ),
  SurahItem(
    number: 95,
    name: 'سُورَةُ التِّينِ',
    englishName: 'At-Tin',
    englishNameTranslation: 'The Fig',
    numberOfAyahs: 8,
    revelationType: 'Meccan',
    juz: 30,
  ),
  SurahItem(
    number: 96,
    name: 'سُورَةُ العَلَقِ',
    englishName: 'Al-Alaq',
    englishNameTranslation: 'The Clot',
    numberOfAyahs: 19,
    revelationType: 'Meccan',
    juz: 30,
  ),
  SurahItem(
    number: 97,
    name: 'سُورَةُ القَدۡرِ',
    englishName: 'Al-Qadr',
    englishNameTranslation: 'The Power, Fate',
    numberOfAyahs: 5,
    revelationType: 'Meccan',
    juz: 30,
  ),
  SurahItem(
    number: 98,
    name: 'سُورَةُ البَيِّنَةِ',
    englishName: 'Al-Bayyina',
    englishNameTranslation: 'The Evidence',
    numberOfAyahs: 8,
    revelationType: 'Medinan',
    juz: 30,
  ),
  SurahItem(
    number: 99,
    name: 'سُورَةُ الزَّلۡزَلَةِ',
    englishName: 'Az-Zalzala',
    englishNameTranslation: 'The Earthquake',
    numberOfAyahs: 8,
    revelationType: 'Medinan',
    juz: 30,
  ),
  SurahItem(
    number: 100,
    name: 'سُورَةُ العَادِيَاتِ',
    englishName: 'Al-Aadiyaat',
    englishNameTranslation: 'The Chargers',
    numberOfAyahs: 11,
    revelationType: 'Meccan',
    juz: 30,
  ),
  SurahItem(
    number: 101,
    name: 'سُورَةُ القَارِعَةِ',
    englishName: 'Al-Qaari\'a',
    englishNameTranslation: 'The Calamity',
    numberOfAyahs: 11,
    revelationType: 'Meccan',
    juz: 30,
  ),
  SurahItem(
    number: 102,
    name: 'سُورَةُ التَّكَاثُرِ',
    englishName: 'At-Takaathur',
    englishNameTranslation: 'Competition',
    numberOfAyahs: 8,
    revelationType: 'Meccan',
    juz: 30,
  ),
  SurahItem(
    number: 103,
    name: 'سُورَةُ العَصۡرِ',
    englishName: 'Al-Asr',
    englishNameTranslation: 'The Declining Day, Epoch',
    numberOfAyahs: 3,
    revelationType: 'Meccan',
    juz: 30,
  ),
  SurahItem(
    number: 104,
    name: 'سُورَةُ الهُمَزَةِ',
    englishName: 'Al-Humaza',
    englishNameTranslation: 'The Traducer',
    numberOfAyahs: 9,
    revelationType: 'Meccan',
    juz: 30,
  ),
  SurahItem(
    number: 105,
    name: 'سُورَةُ الفِيلِ',
    englishName: 'Al-Fil',
    englishNameTranslation: 'The Elephant',
    numberOfAyahs: 5,
    revelationType: 'Meccan',
    juz: 30,
  ),
  SurahItem(
    number: 106,
    name: 'سُورَةُ قُرَيۡشٍ',
    englishName: 'Quraish',
    englishNameTranslation: 'Quraysh',
    numberOfAyahs: 4,
    revelationType: 'Meccan',
    juz: 30,
  ),
  SurahItem(
    number: 107,
    name: 'سُورَةُ المَاعُونِ',
    englishName: 'Al-Maa\'un',
    englishNameTranslation: 'Almsgiving',
    numberOfAyahs: 7,
    revelationType: 'Meccan',
    juz: 30,
  ),
  SurahItem(
    number: 108,
    name: 'سُورَةُ الكَوۡثَرِ',
    englishName: 'Al-Kawthar',
    englishNameTranslation: 'Abundance',
    numberOfAyahs: 3,
    revelationType: 'Meccan',
    juz: 30,
  ),
  SurahItem(
    number: 109,
    name: 'سُورَةُ الكَافِرُونَ',
    englishName: 'Al-Kaafiroon',
    englishNameTranslation: 'The Disbelievers',
    numberOfAyahs: 6,
    revelationType: 'Meccan',
    juz: 30,
  ),
  SurahItem(
    number: 110,
    name: 'سُورَةُ النَّصۡرِ',
    englishName: 'An-Nasr',
    englishNameTranslation: 'Divine Support',
    numberOfAyahs: 3,
    revelationType: 'Medinan',
    juz: 30,
  ),
  SurahItem(
    number: 111,
    name: 'سُورَةُ المَسَدِ',
    englishName: 'Al-Masad',
    englishNameTranslation: 'The Palm Fibre',
    numberOfAyahs: 5,
    revelationType: 'Meccan',
    juz: 30,
  ),
  SurahItem(
    number: 112,
    name: 'سُورَةُ الإِخۡلَاصِ',
    englishName: 'Al-Ikhlaas',
    englishNameTranslation: 'Sincerity',
    numberOfAyahs: 4,
    revelationType: 'Meccan',
    juz: 30,
  ),
  SurahItem(
    number: 113,
    name: 'سُورَةُ الفَلَقِ',
    englishName: 'Al-Falaq',
    englishNameTranslation: 'The Dawn',
    numberOfAyahs: 5,
    revelationType: 'Meccan',
    juz: 30,
  ),
  SurahItem(
    number: 114,
    name: 'سُورَةُ النَّاسِ',
    englishName: 'An-Naas',
    englishNameTranslation: 'Mankind',
    numberOfAyahs: 6,
    revelationType: 'Meccan',
    juz: 30,
  ),
];

Future<List<AyahItem>> fetchSurahVerses(int surahNumber) async {
  try {
    final url = Uri.parse(
      'https://api.alquran.cloud/v1/surah/$surahNumber/editions/quran-uthmani,en.sahih,ur.jalandhry,hi.farooq,bn.bengali,tr.ates,id.indonesian',
    );
    final response = await http.get(url).timeout(const Duration(seconds: 15));
    if (response.statusCode == 200) {
      final data = jsonDecode(response.body);
      final editions = data['data'] as List;
      final arAyahs = editions.isNotEmpty ? (editions[0]['ayahs'] as List) : [];
      final enAyahs = editions.length > 1 ? (editions[1]['ayahs'] as List) : [];
      final urAyahs = editions.length > 2 ? (editions[2]['ayahs'] as List) : [];
      final hiAyahs = editions.length > 3 ? (editions[3]['ayahs'] as List) : [];
      final bnAyahs = editions.length > 4 ? (editions[4]['ayahs'] as List) : [];
      final trAyahs = editions.length > 5 ? (editions[5]['ayahs'] as List) : [];
      final idAyahs = editions.length > 6 ? (editions[6]['ayahs'] as List) : [];

      final List<AyahItem> result = [];
      for (var i = 0; i < arAyahs.length; i++) {
        final ayahNum = arAyahs[i]['numberInSurah'] as int;
        var arabicText = arAyahs[i]['text'] as String;
        if (surahNumber != 1 && surahNumber != 9 && i == 0) {
          arabicText = arabicText.replaceFirst('بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ', '').trim();
        }
        result.add(
          AyahItem(
            number: ayahNum,
            arabic: arabicText,
            translation: i < enAyahs.length ? (enAyahs[i]['text'] as String) : '',
            translationUr: i < urAyahs.length ? (urAyahs[i]['text'] as String) : null,
            translationHi: i < hiAyahs.length ? (hiAyahs[i]['text'] as String) : null,
            translationBn: i < bnAyahs.length ? (bnAyahs[i]['text'] as String) : null,
            translationTr: i < trAyahs.length ? (trAyahs[i]['text'] as String) : null,
            translationId: i < idAyahs.length ? (idAyahs[i]['text'] as String) : null,
            audioUrl: getAyahAudioUrl(surahNumber, ayahNum),
          ),
        );
      }
      return result;
    }
  } catch (e) {
    // Return empty list on error
  }
  return [];
}
