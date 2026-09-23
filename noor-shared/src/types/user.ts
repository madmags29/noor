// ============================================================
// NOOR Shared Types — User & Authentication
// ============================================================

import type { Timestamps, LanguageCode, Location } from './common';

export type AuthProvider = 'email' | 'google' | 'apple' | 'phone';

export interface User extends Timestamps {
  id: string;
  email?: string;
  phone?: string;
  emailVerified: boolean;
  phoneVerified: boolean;
  authProvider: AuthProvider;
  isAnonymous: boolean;
  lastLoginAt?: string;
}

export interface UserProfile extends Timestamps {
  userId: string;
  displayName: string;
  avatarUrl?: string;
  bio?: string;
  language: LanguageCode;
  location?: Location;
  timezone?: string;
}

export interface UserPreferences {
  userId: string;
  theme: 'light' | 'dark' | 'system';
  fontSize: 'small' | 'medium' | 'large' | 'xlarge';
  arabicFont: string;
  translationLanguage: LanguageCode;
  quranReciter?: string;
  playbackSpeed: number;
  analyticsEnabled: boolean;
  personalizationEnabled: boolean;
}

export interface NotificationPreferences {
  userId: string;
  fajrEnabled: boolean;
  sunriseEnabled: boolean;
  dhuhrEnabled: boolean;
  asrEnabled: boolean;
  maghribEnabled: boolean;
  ishaEnabled: boolean;
  dailyAyahEnabled: boolean;
  dailyHadithEnabled: boolean;
  morningAdhkarEnabled: boolean;
  eveningAdhkarEnabled: boolean;
  fridayReminderEnabled: boolean;
  ramadanEnabled: boolean;
  newsEnabled: boolean;
  quietHoursStart?: string; // HH:mm
  quietHoursEnd?: string;
  soundEnabled: boolean;
  vibrationEnabled: boolean;
}

export interface AuthSession {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
  user: User;
  profile: UserProfile;
}

export interface LoginRequest {
  email?: string;
  phone?: string;
  password?: string;
  otp?: string;
  provider?: AuthProvider;
  idToken?: string; // For Google/Apple OAuth
}

export interface SignupRequest {
  email: string;
  password: string;
  displayName: string;
  language?: LanguageCode;
}
