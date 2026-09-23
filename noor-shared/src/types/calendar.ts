// ============================================================
// NOOR Shared Types — Calendar, Community, Search, AI
// ============================================================

import type { Timestamps, Coordinates } from './common';

// ---- Islamic Calendar ----

export interface HijriDate {
  day: number;
  month: number;
  monthName: string;
  monthNameArabic: string;
  year: number;
  designation: string;
}

export interface IslamicEvent {
  id: string;
  name: string;
  nameArabic: string;
  hijriMonth: number;
  hijriDay: number;
  description?: string;
  type: 'fasting' | 'celebration' | 'pilgrimage' | 'remembrance' | 'other';
}

// ---- Community ----

export interface Mosque extends Timestamps {
  id: string;
  name: string;
  nameArabic?: string;
  address: string;
  coordinates: Coordinates;
  phone?: string;
  website?: string;
  facilities: string[];
  jumuahTimes: string[];
  fajrTime?: string;
  capacity?: number;
  accessible: boolean;
  verified: boolean;
}

export interface CommunityEvent extends Timestamps {
  id: string;
  title: string;
  description?: string;
  organizerName: string;
  organizerType: 'mosque' | 'organization' | 'individual';
  date: string;
  time: string;
  endDate?: string;
  location: string;
  coordinates?: Coordinates;
  registrationUrl?: string;
  imageUrl?: string;
  category: string;
  maxAttendees?: number;
}

// ---- Search ----

export type SearchContentType =
  | 'quran' | 'hadith' | 'dua' | 'article' | 'news'
  | 'video' | 'podcast' | 'course' | 'scholar'
  | 'mosque' | 'event';

export interface SearchQuery {
  q: string;
  types?: SearchContentType[];
  language?: string;
  page?: number;
  pageSize?: number;
}

export interface SearchResult {
  id: string;
  type: SearchContentType;
  title: string;
  snippet: string;
  url: string;
  imageUrl?: string;
  relevanceScore: number;
  metadata?: Record<string, unknown>;
}

export interface SearchSuggestion {
  text: string;
  type: 'recent' | 'trending' | 'autocomplete';
}

// ---- AI Assistant ----

export type AIMessageRole = 'user' | 'assistant' | 'system';

export interface AIConversation extends Timestamps {
  id: string;
  userId: string;
  title?: string;
  messageCount: number;
}

export interface AIMessage extends Timestamps {
  id: string;
  conversationId: string;
  role: AIMessageRole;
  content: string;
  sources: AISource[];
}

export interface AISource {
  type: SearchContentType;
  reference: string;
  title: string;
  snippet: string;
  url?: string;
  confidence: number;
}
