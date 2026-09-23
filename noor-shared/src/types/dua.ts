// ============================================================
// NOOR Shared Types — Duas & Adhkar
// ============================================================

import type { Timestamps, LanguageCode, ContentStatus } from './common';

/** Dua category identifiers */
export type DuaCategorySlug =
  | 'morning' | 'evening' | 'sleep' | 'waking'
  | 'travel' | 'protection' | 'rizq' | 'family'
  | 'marriage' | 'health' | 'hardship' | 'food'
  | 'prayer' | 'quran' | 'forgiveness' | 'rain'
  | 'entering-mosque' | 'leaving-mosque' | 'istikharah'
  | 'general';

/** Dua category */
export interface DuaCategory extends Timestamps {
  id: string;
  name: string;
  nameArabic: string;
  slug: DuaCategorySlug | string;
  description?: string;
  icon?: string;
  sortOrder: number;
  duaCount: number;
}

/** Individual Dua */
export interface Dua extends Timestamps {
  id: string;
  categoryId: string;
  textArabic: string;
  transliteration: string;
  source: string;          // e.g., "Sahih Muslim 2723"
  reference: string;
  scholarVerified: boolean;
  hasAudio: boolean;
  audioUrl?: string;
  sortOrder: number;
  status: ContentStatus;
}

/** Dua translation */
export interface DuaTranslation {
  id: string;
  duaId: string;
  language: LanguageCode;
  text: string;
  translatorName?: string;
}

/** Adhkar (remembrance) — similar to dua but with repeat counts */
export interface Adhkar extends Dua {
  repeatCount: number;     // Recommended repetitions
  timing: 'morning' | 'evening' | 'after_prayer' | 'anytime';
  virtue?: string;         // Reward/benefit description
}

/** Tasbih session record */
export interface TasbihSession extends Timestamps {
  id: string;
  userId: string;
  dhikr: string;
  dhikrArabic: string;
  count: number;
  target: number;
  completedAt?: string;
  duration?: number;       // seconds
}
