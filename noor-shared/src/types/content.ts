// ============================================================
// NOOR Shared Types — Content (Articles, News, Videos, etc.)
// ============================================================

import type { Timestamps, LanguageCode, ContentStatus, BaseContent } from './common';

/** Article */
export interface Article extends BaseContent {
  body: string;
  bodyFormat: 'markdown' | 'html';
  readTimeMinutes: number;
  imageUrl?: string;
  featured: boolean;
}

/** News item */
export interface NewsItem extends BaseContent {
  body: string;
  imageUrl?: string;
  externalUrl?: string;
  category: string;
  featured: boolean;
}

/** Video content */
export interface Video extends BaseContent {
  videoUrl: string;
  thumbnailUrl: string;
  duration: number;         // seconds
  captionsAvailable: LanguageCode[];
  transcriptUrl?: string;
  views: number;
  category: string;
  featured: boolean;
}

/** Podcast */
export interface Podcast extends BaseContent {
  feedUrl?: string;
  imageUrl?: string;
  totalEpisodes: number;
}

/** Podcast episode */
export interface PodcastEpisode extends Timestamps {
  id: string;
  podcastId: string;
  title: string;
  description?: string;
  audioUrl: string;
  duration: number;
  episodeNumber: number;
  seasonNumber?: number;
  publishedAt: string;
}

/** Scholar profile */
export interface Scholar extends Timestamps {
  id: string;
  name: string;
  nameArabic: string;
  title?: string;
  bio?: string;
  imageUrl?: string;
  country?: string;
  specializations: string[];
  verified: boolean;
}

/** Learning course */
export interface Course extends BaseContent {
  imageUrl?: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  totalLessons: number;
  totalDurationMinutes: number;
  scholarId?: string;
  category: string;
}

/** Course lesson */
export interface Lesson extends Timestamps {
  id: string;
  courseId: string;
  title: string;
  description?: string;
  contentType: 'text' | 'video' | 'audio' | 'quiz';
  contentUrl?: string;
  body?: string;
  duration?: number;
  sortOrder: number;
  status: ContentStatus;
}

/** User bookmark (polymorphic) */
export interface Bookmark extends Timestamps {
  id: string;
  userId: string;
  contentType: 'quran' | 'hadith' | 'dua' | 'article' | 'video' | 'course' | 'podcast';
  contentId: string;
  note?: string;
  metadata?: Record<string, unknown>;
}
