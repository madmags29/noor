// ============================================================
// NOOR Shared Types — Hadith
// ============================================================

import type { Timestamps, LanguageCode, ContentStatus } from './common';

/** Hadith authenticity grade */
export type HadithGrade = 'sahih' | 'hasan' | 'daif' | 'mawdu' | 'unknown';

/** Major Hadith collection */
export interface HadithCollection extends Timestamps {
  id: string;
  name: string;
  nameArabic: string;
  authorName: string;
  authorNameArabic: string;
  totalHadiths: number;
  totalBooks: number;
  description?: string;
}

/** Book within a Hadith collection */
export interface HadithBook {
  id: string;
  collectionId: string;
  bookNumber: number;
  nameArabic: string;
  nameEnglish: string;
  totalHadiths: number;
}

/** Chapter within a Hadith book */
export interface HadithChapter {
  id: string;
  bookId: string;
  chapterNumber: number;
  title: string;
  titleArabic: string;
}

/** Individual Hadith */
export interface Hadith extends Timestamps {
  id: string;
  collectionId: string;
  bookId: string;
  chapterId?: string;
  hadithNumber: number;
  textArabic: string;
  narratorChain?: string;  // Isnad
  grade?: HadithGrade;
  gradeSource?: string;
  reference: string;       // e.g., "Sahih al-Bukhari 1"
  status: ContentStatus;
}

/** Hadith translation */
export interface HadithTranslation {
  id: string;
  hadithId: string;
  language: LanguageCode;
  text: string;
  translatorName: string;
}
