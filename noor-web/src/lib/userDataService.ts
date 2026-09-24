// ============================================================
// NOOR Web — User Data & Settings Persistence Service
// ============================================================

import { AuthUser } from '../components/AuthModal';

export interface UserSettings {
  // Prayer & Fiqh Calculation Settings
  calculationMethod: string; // 'MWL' | 'ISNA' | 'Egypt' | 'Makkah' | 'Karachi' | 'Tehran' | 'Jafari'
  asrFactor: number; // 1 = Standard (Shafi/Hanbali/Maliki), 2 = Hanafi
  highLatitudeRule: 'angle-based' | 'midnight' | 'one-seventh';
  fajrOffset: number; // in minutes
  maghribOffset: number; // in minutes
  
  // Adhan & Audio Notifications
  adhanVoice: 'makkah' | 'madinah' | 'alaqsa' | 'cairo';
  adhanVolume: number; // 0 - 100
  notifications: {
    fajr: boolean;
    dhuhr: boolean;
    asr: boolean;
    maghrib: boolean;
    isha: boolean;
  };

  // Quran & Reading Preferences
  quranScript: 'uthmani' | 'indopak';
  quranTranslation: string; // 'en' | 'ur' | 'hi' | 'ar' | 'tr' | 'id'
  reciterId: string; // 'alafasy' | 'abdulbasit' | 'sudais' | 'shuraim'
  showTransliteration: boolean;

  // Qibla & Sensors
  autoDetectLocation: boolean;
  qiblaVibration: boolean;
}

export interface SpiritualActivityData {
  todayPrayers: {
    fajr: boolean;
    dhuhr: boolean;
    asr: boolean;
    maghrib: boolean;
    isha: boolean;
  };
  todayDateKey: string; // YYYY-MM-DD
  totalPrayersCompleted: number;
  prayerStreakDays: number;
  tasbihCount: number;
  bookmarkedAyahs: Array<{
    surahNumber: number;
    ayahNumber: number;
    surahName: string;
    text: string;
    savedAt: string;
  }>;
  bookmarkedDuas: Array<{
    id: string;
    title: string;
    category: string;
    savedAt: string;
  }>;
}

export interface UserProfileData {
  user: AuthUser;
  settings: UserSettings;
  activity: SpiritualActivityData;
  updatedAt: string;
}

export const DEFAULT_USER_SETTINGS: UserSettings = {
  calculationMethod: 'MWL',
  asrFactor: 1,
  highLatitudeRule: 'angle-based',
  fajrOffset: 0,
  maghribOffset: 0,
  adhanVoice: 'makkah',
  adhanVolume: 80,
  notifications: {
    fajr: true,
    dhuhr: true,
    asr: true,
    maghrib: true,
    isha: true,
  },
  quranScript: 'uthmani',
  quranTranslation: 'en',
  reciterId: 'alafasy',
  showTransliteration: true,
  autoDetectLocation: true,
  qiblaVibration: true,
};

export const DEFAULT_ACTIVITY_DATA: SpiritualActivityData = {
  todayPrayers: {
    fajr: false,
    dhuhr: false,
    asr: false,
    maghrib: false,
    isha: false,
  },
  todayDateKey: new Date().toISOString().split('T')[0],
  totalPrayersCompleted: 0,
  prayerStreakDays: 1,
  tasbihCount: 33,
  bookmarkedAyahs: [
    {
      surahNumber: 1,
      ayahNumber: 1,
      surahName: 'Al-Fatihah',
      text: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
      savedAt: new Date().toISOString(),
    },
    {
      surahNumber: 2,
      ayahNumber: 255,
      surahName: 'Al-Baqarah',
      text: 'اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ...',
      savedAt: new Date().toISOString(),
    },
  ],
  bookmarkedDuas: [
    {
      id: 'dua-morning-1',
      title: 'Morning Adhkar: Praise of Allah upon Waking',
      category: 'morning',
      savedAt: new Date().toISOString(),
    },
    {
      id: 'dua-protection-1',
      title: 'Ayat al-Kursi (Throne Verse)',
      category: 'protection',
      savedAt: new Date().toISOString(),
    },
  ],
};

const USER_STORAGE_KEY = 'noor_user';
const SETTINGS_STORAGE_KEY = 'noor_user_settings';
const ACTIVITY_STORAGE_KEY = 'noor_user_activity';

// Load User Settings
export function loadUserSettings(): UserSettings {
  if (typeof window === 'undefined') return DEFAULT_USER_SETTINGS;
  try {
    const raw = localStorage.getItem(SETTINGS_STORAGE_KEY);
    if (!raw) return DEFAULT_USER_SETTINGS;
    return { ...DEFAULT_USER_SETTINGS, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_USER_SETTINGS;
  }
}

// Save User Settings
export function saveUserSettings(settings: UserSettings): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
    window.dispatchEvent(new CustomEvent('noor_settings_updated', { detail: settings }));
  } catch (e) {
    console.error('Failed to save user settings:', e);
  }
}

// Load Spiritual Activity & Bookmarks
export function loadUserActivity(): SpiritualActivityData {
  if (typeof window === 'undefined') return DEFAULT_ACTIVITY_DATA;
  try {
    const raw = localStorage.getItem(ACTIVITY_STORAGE_KEY);
    if (!raw) return DEFAULT_ACTIVITY_DATA;
    const parsed: SpiritualActivityData = JSON.parse(raw);
    
    // Check if day changed to reset daily prayer checkmarks
    const today = new Date().toISOString().split('T')[0];
    if (parsed.todayDateKey !== today) {
      parsed.todayDateKey = today;
      parsed.todayPrayers = { fajr: false, dhuhr: false, asr: false, maghrib: false, isha: false };
    }
    return { ...DEFAULT_ACTIVITY_DATA, ...parsed };
  } catch {
    return DEFAULT_ACTIVITY_DATA;
  }
}

// Save Spiritual Activity & Bookmarks
export function saveUserActivity(activity: SpiritualActivityData): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(ACTIVITY_STORAGE_KEY, JSON.stringify(activity));
    window.dispatchEvent(new CustomEvent('noor_activity_updated', { detail: activity }));
  } catch (e) {
    console.error('Failed to save user activity:', e);
  }
}

// Load Current User Profile
export function loadCurrentUser(): AuthUser | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(USER_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

// Save Current User Profile
export function saveCurrentUser(user: AuthUser | null): void {
  if (typeof window === 'undefined') return;
  try {
    if (user) {
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(USER_STORAGE_KEY);
    }
    window.dispatchEvent(new CustomEvent('noor_user_updated', { detail: user }));
  } catch (e) {
    console.error('Failed to save current user:', e);
  }
}

// Export All User Data to JSON File
export function exportUserDataAsJSON(): void {
  if (typeof window === 'undefined') return;
  const data = {
    user: loadCurrentUser(),
    settings: loadUserSettings(),
    activity: loadUserActivity(),
    exportedAt: new Date().toISOString(),
    platform: 'Noor-e-ilahi Ecosystem',
  };
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `noor-user-backup-${new Date().toISOString().split('T')[0]}.json`;
  a.click();
  URL.revokeObjectURL(url);
}
