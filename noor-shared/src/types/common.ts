// ============================================================
// NOOR Shared Types — Common
// ============================================================

/** ISO 639-1 language code */
export type LanguageCode = string;

/** Content publication status */
export enum ContentStatus {
  Draft = 'draft',
  Review = 'review',
  Approved = 'approved',
  Published = 'published',
  Archived = 'archived',
}

/** Standard paginated response envelope */
export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

/** Cursor-based paginated response */
export interface CursorPaginatedResponse<T> {
  data: T[];
  cursor: {
    next: string | null;
    prev: string | null;
    hasMore: boolean;
  };
}

/** Standard API error response */
export interface APIError {
  statusCode: number;
  error: string;
  message: string;
  details?: Record<string, string[]>;
  requestId?: string;
}

/** Standard API success response */
export interface APIResponse<T> {
  success: true;
  data: T;
  meta?: Record<string, unknown>;
}

/** Locale direction */
export type TextDirection = 'ltr' | 'rtl';

/** Supported locale with metadata */
export interface SupportedLocale {
  code: LanguageCode;
  name: string;
  nativeName: string;
  direction: TextDirection;
  script: string;
  enabled: boolean;
}

/** Geographic coordinates */
export interface Coordinates {
  latitude: number;
  longitude: number;
}

/** Location with city/country metadata */
export interface Location extends Coordinates {
  city: string;
  country: string;
  countryCode: string;
  timezone: string;
  region?: string;
}

/** Timestamp fields for database records */
export interface Timestamps {
  createdAt: string;
  updatedAt: string;
}

/** Base content record with trust metadata */
export interface BaseContent extends Timestamps {
  id: string;
  title: string;
  slug: string;
  originalLanguage: LanguageCode;
  description?: string;
  authorId?: string;
  scholarId?: string;
  source?: string;
  categoryId?: string;
  tags: string[];
  country?: string;
  region?: string;
  publishedAt?: string;
  status: ContentStatus;
}
