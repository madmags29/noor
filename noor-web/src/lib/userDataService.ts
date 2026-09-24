// ============================================================
// NOOR Web — User Data & Settings Persistence Service
// Manages User Profiles, Settings, Spiritual Tracking & Admin Directory
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

export interface RegisteredUser {
  id: string;
  name: string;
  email: string;
  picture?: string;
  provider: 'google' | 'email';
  role: 'super_admin' | 'user';
  status: 'active' | 'verified' | 'suspended';
  joinedDate: string;
  lastActive: string;
  locationCity?: string;
  locationCountry?: string;
  settings: UserSettings;
  activity: SpiritualActivityData;
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
    fajr: true,
    dhuhr: true,
    asr: false,
    maghrib: false,
    isha: false,
  },
  todayDateKey: new Date().toISOString().split('T')[0],
  totalPrayersCompleted: 42,
  prayerStreakDays: 7,
  tasbihCount: 99,
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

// Seed initial registered users for Super Admin directory
export const SEED_REGISTERED_USERS: RegisteredUser[] = [
  {
    id: 'usr_super_admin_01',
    name: 'Majid Khan (Owner)',
    email: 'admin@nooreilahi.com',
    picture: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop&crop=faces&q=80',
    provider: 'google',
    role: 'super_admin',
    status: 'verified',
    joinedDate: '2026-01-01',
    lastActive: 'Just now',
    locationCity: 'Makkah',
    locationCountry: 'Saudi Arabia',
    settings: { ...DEFAULT_USER_SETTINGS, calculationMethod: 'Makkah', asrFactor: 1 },
    activity: { ...DEFAULT_ACTIVITY_DATA, prayerStreakDays: 30, totalPrayersCompleted: 150 },
  },
  {
    id: 'usr_reg_02',
    name: 'Dr. Tariq Mansoor',
    email: 'tariq.mansoor@gmail.com',
    picture: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=faces&q=80',
    provider: 'google',
    role: 'user',
    status: 'verified',
    joinedDate: '2026-03-12',
    lastActive: '12 mins ago',
    locationCity: 'London',
    locationCountry: 'United Kingdom',
    settings: { ...DEFAULT_USER_SETTINGS, calculationMethod: 'ISNA', asrFactor: 1 },
    activity: {
      ...DEFAULT_ACTIVITY_DATA,
      todayPrayers: { fajr: true, dhuhr: true, asr: true, maghrib: false, isha: false },
      prayerStreakDays: 14,
      totalPrayersCompleted: 68,
    },
  },
  {
    id: 'usr_reg_03',
    name: 'Amina Al-Zahra',
    email: 'amina.zahra@gmail.com',
    picture: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&h=120&fit=crop&crop=faces&q=80',
    provider: 'google',
    role: 'user',
    status: 'verified',
    joinedDate: '2026-04-05',
    lastActive: '1 hour ago',
    locationCity: 'Istanbul',
    locationCountry: 'Turkey',
    settings: { ...DEFAULT_USER_SETTINGS, quranTranslation: 'tr', adhanVoice: 'alaqsa' },
    activity: {
      ...DEFAULT_ACTIVITY_DATA,
      todayPrayers: { fajr: true, dhuhr: true, asr: true, maghrib: true, isha: false },
      prayerStreakDays: 21,
      totalPrayersCompleted: 104,
    },
  },
  {
    id: 'usr_reg_04',
    name: 'Zubair Farooqi',
    email: 'zubair.farooqi@gmail.com',
    picture: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop&crop=faces&q=80',
    provider: 'google',
    role: 'user',
    status: 'verified',
    joinedDate: '2026-05-18',
    lastActive: '3 hours ago',
    locationCity: 'New Delhi',
    locationCountry: 'India',
    settings: { ...DEFAULT_USER_SETTINGS, calculationMethod: 'Karachi', asrFactor: 2, quranScript: 'indopak' },
    activity: {
      ...DEFAULT_ACTIVITY_DATA,
      todayPrayers: { fajr: true, dhuhr: true, asr: true, maghrib: false, isha: false },
      prayerStreakDays: 19,
      totalPrayersCompleted: 92,
    },
  },
  {
    id: 'usr_reg_05',
    name: 'Nurul Hidayah',
    email: 'nurul.hidayah@gmail.com',
    picture: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop&crop=faces&q=80',
    provider: 'google',
    role: 'user',
    status: 'verified',
    joinedDate: '2026-06-22',
    lastActive: 'Yesterday',
    locationCity: 'Jakarta',
    locationCountry: 'Indonesia',
    settings: { ...DEFAULT_USER_SETTINGS, quranTranslation: 'id', adhanVoice: 'madinah' },
    activity: {
      ...DEFAULT_ACTIVITY_DATA,
      todayPrayers: { fajr: true, dhuhr: false, asr: false, maghrib: false, isha: false },
      prayerStreakDays: 5,
      totalPrayersCompleted: 24,
    },
  },
];

const USER_STORAGE_KEY = 'noor_user';
const SETTINGS_STORAGE_KEY = 'noor_user_settings';
const ACTIVITY_STORAGE_KEY = 'noor_user_activity';
const REGISTERED_USERS_KEY = 'noor_registered_users';

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

// Save Current User Profile and sync with Super Admin directory
export function saveCurrentUser(user: AuthUser | null): void {
  if (typeof window === 'undefined') return;
  try {
    if (user) {
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
      // Sync into registered users database
      syncUserIntoRegisteredList(user);
    } else {
      localStorage.removeItem(USER_STORAGE_KEY);
    }
    window.dispatchEvent(new CustomEvent('noor_user_updated', { detail: user }));
  } catch (e) {
    console.error('Failed to save current user:', e);
  }
}

// Super Admin: Load All Registered Users
export function loadAllRegisteredUsers(): RegisteredUser[] {
  if (typeof window === 'undefined') return SEED_REGISTERED_USERS;
  try {
    const raw = localStorage.getItem(REGISTERED_USERS_KEY);
    if (!raw) {
      localStorage.setItem(REGISTERED_USERS_KEY, JSON.stringify(SEED_REGISTERED_USERS));
      return SEED_REGISTERED_USERS;
    }
    return JSON.parse(raw);
  } catch {
    return SEED_REGISTERED_USERS;
  }
}

// Super Admin: Save All Registered Users
export function saveAllRegisteredUsers(users: RegisteredUser[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(REGISTERED_USERS_KEY, JSON.stringify(users));
    window.dispatchEvent(new CustomEvent('noor_registered_users_updated', { detail: users }));
  } catch (e) {
    console.error('Failed to save registered users:', e);
  }
}

// Helper: Sync current user into registered list
function syncUserIntoRegisteredList(user: AuthUser): void {
  const allUsers = loadAllRegisteredUsers();
  const existingIdx = allUsers.findIndex(u => u.email.toLowerCase() === user.email.toLowerCase());
  const currentSettings = loadUserSettings();
  const currentActivity = loadUserActivity();

  if (existingIdx >= 0) {
    allUsers[existingIdx] = {
      ...allUsers[existingIdx],
      name: user.name || allUsers[existingIdx].name,
      picture: user.picture || allUsers[existingIdx].picture,
      lastActive: 'Just now',
      settings: currentSettings,
      activity: currentActivity,
    };
  } else {
    const isOwner = user.email.toLowerCase().includes('majid') || user.email.toLowerCase() === 'admin@nooreilahi.com';
    const newUser: RegisteredUser = {
      id: `usr_${Date.now()}`,
      name: user.name || 'Noor Pilgrim',
      email: user.email,
      picture: user.picture,
      provider: user.provider || 'google',
      role: isOwner ? 'super_admin' : 'user',
      status: 'verified',
      joinedDate: new Date().toISOString().split('T')[0],
      lastActive: 'Just now',
      settings: currentSettings,
      activity: currentActivity,
    };
    allUsers.unshift(newUser);
  }
  saveAllRegisteredUsers(allUsers);
}

// Super Admin: Update a user's profile and settings directly
export function updateUserByAdmin(userId: string, updates: Partial<RegisteredUser>): void {
  const users = loadAllRegisteredUsers();
  const idx = users.findIndex(u => u.id === userId);
  if (idx >= 0) {
    users[idx] = {
      ...users[idx],
      ...updates,
      settings: updates.settings ? { ...users[idx].settings, ...updates.settings } : users[idx].settings,
      activity: updates.activity ? { ...users[idx].activity, ...updates.activity } : users[idx].activity,
    };
    saveAllRegisteredUsers(users);

    // If the admin is updating the currently active user, update active settings as well!
    const active = loadCurrentUser();
    if (active && active.email.toLowerCase() === users[idx].email.toLowerCase()) {
      if (updates.settings) saveUserSettings(users[idx].settings);
      if (updates.activity) saveUserActivity(users[idx].activity);
    }
  }
}

// Super Admin: Delete a user
export function deleteUserByAdmin(userId: string): void {
  const users = loadAllRegisteredUsers();
  const filtered = users.filter(u => u.id !== userId);
  saveAllRegisteredUsers(filtered);
}

// Export All Registered Users as CSV
export function exportAllUsersAsCSV(): void {
  if (typeof window === 'undefined') return;
  const users = loadAllRegisteredUsers();
  let csv = 'ID,Name,Email,Role,Status,JoinedDate,LastActive,CalculationMethod,AsrSchool,AdhanVoice,PrayerStreak,TotalPrayers\n';

  users.forEach(u => {
    csv += `"${u.id}","${u.name}","${u.email}","${u.role}","${u.status}","${u.joinedDate}","${u.lastActive}","${u.settings.calculationMethod}","${u.settings.asrFactor === 1 ? 'Standard' : 'Hanafi'}","${u.settings.adhanVoice}",${u.activity.prayerStreakDays},${u.activity.totalPrayersCompleted}\n`;
  });

  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `noor-registered-users-${new Date().toISOString().split('T')[0]}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

// Export All Registered Users & System Data as JSON
export function exportAllUsersAsJSON(): void {
  if (typeof window === 'undefined') return;
  const data = {
    exportedAt: new Date().toISOString(),
    platform: 'Noor-e-ilahi Global Islamic Ecosystem',
    superAdmin: 'Majid Khan',
    totalRegisteredUsers: loadAllRegisteredUsers().length,
    users: loadAllRegisteredUsers(),
  };
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `noor-super-admin-users-backup-${new Date().toISOString().split('T')[0]}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

// Export Current User's Personal Data
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
