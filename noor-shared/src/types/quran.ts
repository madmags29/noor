// ============================================================
// NOOR Shared Types — Quran
// ============================================================

import type { Timestamps, LanguageCode } from './common';

/** Revelation type */
export type RevelationType = 'meccan' | 'medinan';

/** Quran Surah metadata */
export interface Surah {
  number: number;           // 1–114
  nameArabic: string;
  nameSimple: string;       // Transliterated
  nameTranslation: string;  // English meaning
  revelationType: RevelationType;
  versesCount: number;
  pages: [number, number];  // Start and end page
  juz: number[];            // Juz numbers this surah spans
}

/** Individual Quran verse */
export interface Ayah extends Timestamps {
  id: string;
  surahNumber: number;
  ayahNumber: number;
  ayahNumberInSurah: number;
  textArabic: string;
  textUthmani: string;      // Uthmani script
  page: number;
  juz: number;
  hizbQuarter: number;
  sajdah: boolean;
}

/** Quran translation of a verse */
export interface AyahTranslation {
  id: string;
  ayahId: string;
  surahNumber: number;
  ayahNumber: number;
  language: LanguageCode;
  translatorId: string;
  translatorName: string;
  text: string;
}

/** Quran reciter */
export interface Reciter {
  id: string;
  name: string;
  nameArabic: string;
  style: string;            // e.g., "Murattal", "Mujawwad"
  country: string;
  audioBaseUrl: string;
  availableSurahs: number[];
}

/** Quran audio for a verse or surah */
export interface QuranAudio {
  reciterId: string;
  surahNumber: number;
  ayahNumber?: number;      // null for full surah
  audioUrl: string;
  duration: number;         // seconds
  format: 'mp3' | 'ogg';
}

/** Juz (part) metadata */
export interface Juz {
  number: number;
  startSurah: number;
  startAyah: number;
  endSurah: number;
  endAyah: number;
}

/** Tafsir (Quran commentary) */
export interface Tafsir extends Timestamps {
  id: string;
  ayahId: string;
  surahNumber: number;
  ayahNumber: number;
  language: LanguageCode;
  scholarName: string;
  tafsirName: string;
  text: string;
  source: string;
}

/** Quran reading/listening progress */
export interface QuranProgress {
  userId: string;
  lastSurahNumber: number;
  lastAyahNumber: number;
  lastPage: number;
  totalAyahsRead: number;
  totalPagesRead: number;
  lastReadAt: string;
}

/** Quran bookmark */
export interface QuranBookmark extends Timestamps {
  id: string;
  userId: string;
  surahNumber: number;
  ayahNumber: number;
  note?: string;
  color?: string;
}
