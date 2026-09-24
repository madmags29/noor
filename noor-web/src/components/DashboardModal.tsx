'use client';

// ============================================================
// NOOR Web — Complete User Profile, Settings, Analytics & CMS Dashboard
// All User Data, Settings & Spiritual Tracking Saved in Real-Time
// ============================================================

import React, { useState, useEffect } from 'react';
import {
  X,
  User as UserIcon,
  BarChart3,
  Sliders,
  FileText,
  Users,
  Activity,
  Globe2,
  TrendingUp,
  Clock,
  Sparkles,
  Volume2,
  CheckCircle2,
  Plus,
  Trash2,
  Edit,
  Eye,
  RefreshCw,
  Layers,
  Palette,
  ShieldCheck,
  Compass,
  BookOpen,
  Heart,
  Download,
  RotateCcw,
  LogOut,
  Bell,
  Check,
  CheckSquare,
  Square,
  Bookmark
} from 'lucide-react';
import {
  UserSettings,
  SpiritualActivityData,
  DEFAULT_USER_SETTINGS,
  DEFAULT_ACTIVITY_DATA,
  loadUserSettings,
  saveUserSettings,
  loadUserActivity,
  saveUserActivity,
  loadCurrentUser,
  saveCurrentUser,
  exportUserDataAsJSON,
} from '../lib/userDataService';
import { GoogleLogo, AuthUser } from './AuthModal';

interface DashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedMethod: string;
  onMethodChange: (method: string) => void;
  asrFactor: number;
  onAsrFactorChange: (factor: number) => void;
  user?: AuthUser | null;
  onSignOut?: () => void;
  onOpenAuth?: () => void;
}

export const DashboardModal: React.FC<DashboardModalProps> = ({
  isOpen,
  onClose,
  selectedMethod,
  onMethodChange,
  asrFactor,
  onAsrFactorChange,
  user,
  onSignOut,
  onOpenAuth,
}) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'analytics' | 'customization' | 'cms'>('profile');
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(user || null);
  const [userSettings, setUserSettings] = useState<UserSettings>(DEFAULT_USER_SETTINGS);
  const [userActivity, setUserActivity] = useState<SpiritualActivityData>(DEFAULT_ACTIVITY_DATA);
  const [saveNotice, setSaveNotice] = useState(false);
  const [isPlayingAdhan, setIsPlayingAdhan] = useState(false);

  // Analytics & Customization state
  const [timeRange, setTimeRange] = useState<'today' | '7d' | '30d' | '1y'>('7d');
  const [themeHue, setThemeHue] = useState<'emerald' | 'gold' | 'sapphire' | 'obsidian'>('emerald');
  const [blurAmount, setBlurAmount] = useState(28);
  const [glassOpacity, setGlassOpacity] = useState(55);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // CMS state
  const [articles, setArticles] = useState([
    { id: '1', title: 'The Spiritual Virtues of Fasting in Holy Ramadan', category: 'Ramadan', author: 'Dr. Tariq Al-Hashimi', status: 'Published', views: '48.2k', date: '2026-09-18' },
    { id: '2', title: 'Understanding Great-Circle Astronomical Calculation in Salaah', category: 'Astronomy & Fiqh', author: 'Sheikh Mansoor Ali', status: 'Published', views: '22.1k', date: '2026-09-15' },
    { id: '3', title: 'Complete Guide to Umrah Rituals from Ihram to Tawaf', category: 'Pilgrimage', author: 'Fatima Zahra', status: 'Published', views: '39.8k', date: '2026-09-10' },
    { id: '4', title: 'Zakat al-Fitr: Contemporary Currency & Commodity Valuation', category: 'Zakat', author: 'Dr. Bilal Qureshi', status: 'Draft', views: '1.2k', date: '2026-09-20' },
  ]);
  const [showAddArticle, setShowAddArticle] = useState(false);
  const [artTitle, setArtTitle] = useState('');
  const [artCategory, setArtCategory] = useState('Ramadan');
  const [artAuthor, setArtAuthor] = useState('Editorial Board');

  // Load User Data & Settings when modal opens
  useEffect(() => {
    if (isOpen) {
      const activeUser = user || loadCurrentUser();
      setCurrentUser(activeUser);
      const loadedSettings = loadUserSettings();
      setUserSettings(loadedSettings);
      const loadedActivity = loadUserActivity();
      setUserActivity(loadedActivity);
    }
  }, [isOpen, user]);

  if (!isOpen) return null;

  const triggerSaveFeedback = () => {
    setSaveNotice(true);
    setTimeout(() => setSaveNotice(false), 2200);
  };

  // Helper to update any user setting
  const updateSetting = <K extends keyof UserSettings>(key: K, value: UserSettings[K]) => {
    const updated = { ...userSettings, [key]: value };
    setUserSettings(updated);
    saveUserSettings(updated);

    if (key === 'calculationMethod') {
      onMethodChange(value as string);
    }
    if (key === 'asrFactor') {
      onAsrFactorChange(value as number);
    }
    triggerSaveFeedback();
  };

  // Helper to toggle notification for a specific prayer
  const toggleNotification = (prayer: keyof UserSettings['notifications']) => {
    const nextNotifs = {
      ...userSettings.notifications,
      [prayer]: !userSettings.notifications[prayer],
    };
    updateSetting('notifications', nextNotifs);
  };

  // Toggle today's prayer checkbox
  const toggleTodayPrayer = (prayerKey: 'fajr' | 'dhuhr' | 'asr' | 'maghrib' | 'isha') => {
    const isNowChecked = !userActivity.todayPrayers[prayerKey];
    const nextPrayers = {
      ...userActivity.todayPrayers,
      [prayerKey]: isNowChecked,
    };
    const nextActivity = {
      ...userActivity,
      todayPrayers: nextPrayers,
      totalPrayersCompleted: Math.max(0, userActivity.totalPrayersCompleted + (isNowChecked ? 1 : -1)),
    };
    setUserActivity(nextActivity);
    saveUserActivity(nextActivity);
    triggerSaveFeedback();
  };

  // Remove an Ayah bookmark
  const removeAyahBookmark = (index: number) => {
    const nextAyahs = userActivity.bookmarkedAyahs.filter((_, i) => i !== index);
    const nextActivity = { ...userActivity, bookmarkedAyahs: nextAyahs };
    setUserActivity(nextActivity);
    saveUserActivity(nextActivity);
    triggerSaveFeedback();
  };

  // Remove a Dua bookmark
  const removeDuaBookmark = (id: string) => {
    const nextDuas = userActivity.bookmarkedDuas.filter((d) => d.id !== id);
    const nextActivity = { ...userActivity, bookmarkedDuas: nextDuas };
    setUserActivity(nextActivity);
    saveUserActivity(nextActivity);
    triggerSaveFeedback();
  };

  // Reset settings to defaults
  const handleResetSettings = () => {
    setUserSettings(DEFAULT_USER_SETTINGS);
    saveUserSettings(DEFAULT_USER_SETTINGS);
    onMethodChange(DEFAULT_USER_SETTINGS.calculationMethod);
    onAsrFactorChange(DEFAULT_USER_SETTINGS.asrFactor);
    triggerSaveFeedback();
  };

  // Audio preview for Adhan voice
  const handlePlayAdhanPreview = () => {
    if (isPlayingAdhan) {
      setIsPlayingAdhan(false);
      return;
    }
    try {
      setIsPlayingAdhan(true);
      const audio = new Audio('https://cdn.islamic.network/audio/adhan/alafasy.mp3');
      audio.volume = (userSettings.adhanVolume || 80) / 100;
      audio.play().catch(() => {});
      audio.onended = () => setIsPlayingAdhan(false);
      setTimeout(() => {
        audio.pause();
        setIsPlayingAdhan(false);
      }, 7000);
    } catch {
      setIsPlayingAdhan(false);
    }
  };

  const handleCreateArticle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!artTitle.trim()) return;

    const newArt = {
      id: String(Date.now()),
      title: artTitle,
      category: artCategory,
      author: artAuthor,
      status: 'Published',
      views: '0',
      date: new Date().toISOString().split('T')[0],
    };

    setArticles([newArt, ...articles]);
    setArtTitle('');
    setShowAddArticle(false);
  };

  const handleDeleteArticle = (id: string) => {
    setArticles(articles.filter((a) => a.id !== id));
  };

  // Calculate today's completed prayers count
  const completedPrayersCount = Object.values(userActivity.todayPrayers).filter(Boolean).length;
  const prayerPercentage = Math.round((completedPrayersCount / 5) * 100);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-2xl p-2 sm:p-6 animate-in fade-in">
      <div className="liquid-glass rounded-[2rem] sm:rounded-[2.5rem] w-full max-w-6xl h-[92vh] flex flex-col shadow-2xl overflow-hidden border border-white/20 bg-[#02150f]/95">
        
        {/* Header with Navigation Pills */}
        <div className="px-5 sm:px-8 py-4 border-b border-white/10 flex flex-wrap items-center justify-between gap-4 bg-black/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-400 to-emerald-600 flex items-center justify-center font-black text-emerald-950 shadow-md">
              <UserIcon className="w-5 h-5 text-emerald-950" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-black text-white">NOOR Control Center</h3>
                {saveNotice && (
                  <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-400/40 animate-pulse flex items-center gap-1">
                    <Check className="w-3 h-3 text-emerald-400" />
                    <span>Saved to Profile</span>
                  </span>
                )}
              </div>
              <p className="text-xs text-emerald-300/70">
                Personal Islamic Profile, Settings & Real-Time Sync Dashboard
              </p>
            </div>
          </div>

          {/* Tab Switcher Pills */}
          <div className="flex items-center bg-black/50 p-1 rounded-full border border-white/10 text-xs font-semibold overflow-x-auto max-w-full">
            <button
              onClick={() => setActiveTab('profile')}
              className={`px-4 py-1.5 rounded-full flex items-center gap-1.5 transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'profile'
                  ? 'bg-amber-500 text-emerald-950 font-black shadow-md'
                  : 'text-emerald-200 hover:text-white'
              }`}
            >
              <UserIcon className="w-3.5 h-3.5" />
              <span>User Profile & Settings</span>
            </button>

            <button
              onClick={() => setActiveTab('analytics')}
              className={`px-4 py-1.5 rounded-full flex items-center gap-1.5 transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'analytics'
                  ? 'bg-amber-500 text-emerald-950 font-black shadow-md'
                  : 'text-emerald-200 hover:text-white'
              }`}
            >
              <Activity className="w-3.5 h-3.5" />
              <span>Platform Traffic</span>
            </button>

            <button
              onClick={() => setActiveTab('customization')}
              className={`px-4 py-1.5 rounded-full flex items-center gap-1.5 transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'customization'
                  ? 'bg-amber-500 text-emerald-950 font-black shadow-md'
                  : 'text-emerald-200 hover:text-white'
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Appearance</span>
            </button>

            <button
              onClick={() => setActiveTab('cms')}
              className={`px-4 py-1.5 rounded-full flex items-center gap-1.5 transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'cms'
                  ? 'bg-amber-500 text-emerald-950 font-black shadow-md'
                  : 'text-emerald-200 hover:text-white'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Articles & CMS</span>
            </button>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-emerald-200 hover:text-white transition-colors cursor-pointer"
            aria-label="Close Dashboard"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 space-y-8">
          
          {/* ====================================================
              TAB 1: USER PROFILE & IMPORTANT SETTINGS
             ==================================================== */}
          {activeTab === 'profile' && (
            <div className="space-y-8">
              
              {/* Profile Card Banner */}
              <div className="bg-[#031d16] border border-amber-500/30 rounded-3xl p-5 sm:p-6 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
                
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 relative z-10">
                  <div className="flex items-center gap-4">
                    {currentUser?.picture ? (
                      <img
                        src={currentUser.picture}
                        alt={currentUser.name}
                        className="w-16 h-16 rounded-2xl object-cover border-2 border-amber-400 shadow-lg shadow-amber-500/20"
                      />
                    ) : (
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-emerald-700 text-emerald-950 font-black flex items-center justify-center text-2xl shadow-lg shadow-amber-500/20 border-2 border-amber-400">
                        {currentUser?.name ? currentUser.name.charAt(0).toUpperCase() : 'N'}
                      </div>
                    )}

                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="text-xl font-black text-white">
                          {currentUser?.name || 'Guest Pilgrim'}
                        </h4>
                        {currentUser?.provider === 'google' ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-[10px] text-emerald-300 font-bold">
                            <GoogleLogo className="w-3 h-3" />
                            <span>Google Account Verified</span>
                          </span>
                        ) : (
                          <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-white/10 text-emerald-300 font-semibold">
                            Local Storage Synced
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-emerald-300/80 mt-1">
                        {currentUser?.email || 'Sign in with Google to synchronize across devices'}
                      </p>

                      <div className="flex items-center gap-3 mt-2 text-[11px] text-emerald-400/90 font-medium">
                        <span className="flex items-center gap-1">
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                          <span>All Settings Auto-Saved</span>
                        </span>
                        <span>•</span>
                        <span className="text-amber-300">
                          {completedPrayersCount}/5 Prayers Completed Today ({prayerPercentage}%)
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Account Actions */}
                  <div className="flex items-center gap-2.5 self-stretch sm:self-center">
                    {currentUser ? (
                      <button
                        onClick={() => {
                          if (onSignOut) onSignOut();
                          setCurrentUser(null);
                        }}
                        className="px-4 py-2 rounded-xl bg-red-500/15 hover:bg-red-500/25 border border-red-500/30 text-red-200 text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Sign Out</span>
                      </button>
                    ) : (
                      <button
                        onClick={onOpenAuth}
                        className="px-4 py-2.5 rounded-xl bg-white hover:bg-gray-100 text-gray-900 font-bold text-xs transition-all shadow-md flex items-center gap-2 cursor-pointer"
                      >
                        <GoogleLogo className="w-4 h-4" />
                        <span>Connect Google Account</span>
                      </button>
                    )}

                    <button
                      onClick={exportUserDataAsJSON}
                      className="px-4 py-2 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-400/40 text-emerald-300 text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
                      title="Download complete JSON backup of your settings & bookmarks"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Export Data</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Today's Spiritual Salah Tracker Card */}
              <div className="bg-[#031c15] border border-white/10 rounded-3xl p-5 sm:p-6 shadow-lg">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                  <div>
                    <h4 className="text-base font-bold text-white flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-amber-400" />
                      <span>Today&apos;s Salah & Prayer Tracker</span>
                    </h4>
                    <p className="text-xs text-emerald-300/70 mt-0.5">
                      Check off your obligatory prayers today. Your progress is saved in real-time.
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <span className="text-xs font-bold text-white font-mono">{completedPrayersCount} of 5 Completed</span>
                      <div className="w-32 h-2 bg-black/40 rounded-full overflow-hidden mt-1 border border-white/10">
                        <div
                          className="h-full bg-gradient-to-r from-amber-400 to-emerald-400 transition-all duration-500"
                          style={{ width: `${prayerPercentage}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                  {(['fajr', 'dhuhr', 'asr', 'maghrib', 'isha'] as const).map((prayer) => {
                    const isChecked = userActivity.todayPrayers[prayer];
                    const prayerNames: Record<string, { en: string; ar: string }> = {
                      fajr: { en: 'Fajr', ar: 'الفجر' },
                      dhuhr: { en: 'Dhuhr', ar: 'الظهر' },
                      asr: { en: 'Asr', ar: 'العصر' },
                      maghrib: { en: 'Maghrib', ar: 'المغرب' },
                      isha: { en: 'Isha', ar: 'العشاء' },
                    };

                    return (
                      <button
                        key={prayer}
                        onClick={() => toggleTodayPrayer(prayer)}
                        className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between h-24 ${
                          isChecked
                            ? 'bg-emerald-500/20 border-emerald-400 shadow-md shadow-emerald-500/10'
                            : 'bg-black/30 border-white/10 hover:border-amber-400/40'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-bold text-emerald-300/80 uppercase">
                            {prayerNames[prayer].ar}
                          </span>
                          {isChecked ? (
                            <CheckSquare className="w-4 h-4 text-emerald-400" />
                          ) : (
                            <Square className="w-4 h-4 text-emerald-400/50" />
                          )}
                        </div>
                        <div>
                          <div className={`text-sm font-black ${isChecked ? 'text-emerald-200' : 'text-white'}`}>
                            {prayerNames[prayer].en}
                          </div>
                          <span className="text-[10px] text-emerald-400/70">
                            {isChecked ? '✓ Prayed' : 'Mark Done'}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Important User Settings Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* 1. Prayer Calculation & Fiqh Method */}
                <div className="bg-[#031c15] border border-white/10 rounded-3xl p-5 sm:p-6 space-y-4">
                  <div className="flex items-center gap-2.5 pb-2 border-b border-white/10">
                    <Compass className="w-4 h-4 text-amber-400" />
                    <div>
                      <h5 className="text-sm font-bold text-white">Prayer Calculation & Fiqh</h5>
                      <p className="text-[11px] text-emerald-300/70">Astronomical conventions & juristic rulings</p>
                    </div>
                  </div>

                  {/* Calculation Authority */}
                  <div>
                    <label className="block text-xs font-semibold text-emerald-200 mb-1.5">
                      Calculation Method Authority
                    </label>
                    <select
                      value={userSettings.calculationMethod}
                      onChange={(e) => updateSetting('calculationMethod', e.target.value)}
                      className="w-full bg-black/40 border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-amber-300 font-bold focus:outline-none focus:border-amber-400 cursor-pointer"
                    >
                      <option value="MWL" className="bg-[#021812] text-white">Muslim World League (MWL)</option>
                      <option value="ISNA" className="bg-[#021812] text-white">Islamic Society of North America (ISNA)</option>
                      <option value="Makkah" className="bg-[#021812] text-white">Umm Al-Qura University, Makkah</option>
                      <option value="Egypt" className="bg-[#021812] text-white">Egyptian General Authority of Survey</option>
                      <option value="Karachi" className="bg-[#021812] text-white">University of Islamic Sciences, Karachi</option>
                      <option value="Tehran" className="bg-[#021812] text-white">Institute of Geophysics, Univ of Tehran</option>
                      <option value="Jafari" className="bg-[#021812] text-white">Shia Ithna-Ashari (Leva Institute, Qum)</option>
                    </select>
                  </div>

                  {/* Asr Juristic Method */}
                  <div>
                    <label className="block text-xs font-semibold text-emerald-200 mb-1.5">
                      Asr Juristic Calculation
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => updateSetting('asrFactor', 1)}
                        className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                          userSettings.asrFactor === 1
                            ? 'bg-amber-500 text-emerald-950 border-amber-400 font-black shadow'
                            : 'bg-black/30 border-white/10 text-emerald-200 hover:border-white/20'
                        }`}
                      >
                        Standard (Shafi&apos;i / Maliki / Hanbali)
                      </button>
                      <button
                        type="button"
                        onClick={() => updateSetting('asrFactor', 2)}
                        className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                          userSettings.asrFactor === 2
                            ? 'bg-amber-500 text-emerald-950 border-amber-400 font-black shadow'
                            : 'bg-black/30 border-white/10 text-emerald-200 hover:border-white/20'
                        }`}
                      >
                        Hanafi (Shadow x2)
                      </button>
                    </div>
                  </div>

                  {/* High Latitude Adjustment */}
                  <div>
                    <label className="block text-xs font-semibold text-emerald-200 mb-1.5">
                      High Latitude Rule
                    </label>
                    <select
                      value={userSettings.highLatitudeRule}
                      onChange={(e) => updateSetting('highLatitudeRule', e.target.value as any)}
                      className="w-full bg-black/40 border border-white/15 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-400 cursor-pointer"
                    >
                      <option value="angle-based" className="bg-[#021812]">Angle-Based (Recommended for Europe & North)</option>
                      <option value="midnight" className="bg-[#021812]">Middle of the Night (Midnight Rule)</option>
                      <option value="one-seventh" className="bg-[#021812]">One-Seventh of the Night</option>
                    </select>
                  </div>
                </div>

                {/* 2. Adhan & Audio Notifications */}
                <div className="bg-[#031c15] border border-white/10 rounded-3xl p-5 sm:p-6 space-y-4">
                  <div className="flex items-center gap-2.5 pb-2 border-b border-white/10">
                    <Volume2 className="w-4 h-4 text-amber-400" />
                    <div>
                      <h5 className="text-sm font-bold text-white">Adhan & Audio Notifications</h5>
                      <p className="text-[11px] text-emerald-300/70">Muezzin voices, volume & alert toggles</p>
                    </div>
                  </div>

                  {/* Adhan Voice Choice & Audio Test */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-xs font-semibold text-emerald-200">Adhan Muezzin Voice</label>
                      <button
                        type="button"
                        onClick={handlePlayAdhanPreview}
                        className="text-[11px] text-amber-300 hover:text-amber-200 font-bold flex items-center gap-1 cursor-pointer"
                      >
                        <Volume2 className={`w-3 h-3 ${isPlayingAdhan ? 'animate-bounce' : ''}`} />
                        <span>{isPlayingAdhan ? 'Stop Playing' : 'Preview Adhan'}</span>
                      </button>
                    </div>
                    <select
                      value={userSettings.adhanVoice}
                      onChange={(e) => updateSetting('adhanVoice', e.target.value as any)}
                      className="w-full bg-black/40 border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-amber-300 font-bold focus:outline-none focus:border-amber-400 cursor-pointer"
                    >
                      <option value="makkah" className="bg-[#021812] text-white">Makkah Al-Mukarramah (Sheikh Ali Mulla)</option>
                      <option value="madinah" className="bg-[#021812] text-white">Al-Masjid An-Nabawi, Madinah</option>
                      <option value="alaqsa" className="bg-[#021812] text-white">Al-Aqsa Sanctuary, Jerusalem</option>
                      <option value="cairo" className="bg-[#021812] text-white">Historic Cairo Sanctuary</option>
                    </select>
                  </div>

                  {/* Individual Prayer Notification Checkboxes */}
                  <div>
                    <label className="block text-xs font-semibold text-emerald-200 mb-2">
                      Active Adhan Reminders
                    </label>
                    <div className="grid grid-cols-5 gap-2">
                      {(['fajr', 'dhuhr', 'asr', 'maghrib', 'isha'] as const).map((p) => {
                        const active = userSettings.notifications[p];
                        return (
                          <button
                            key={p}
                            type="button"
                            onClick={() => toggleNotification(p)}
                            className={`py-2 px-1 rounded-xl text-xs font-bold border transition-all cursor-pointer flex flex-col items-center gap-1 ${
                              active
                                ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300'
                                : 'bg-black/40 border-white/10 text-zinc-500'
                            }`}
                          >
                            <Bell className={`w-3.5 h-3.5 ${active ? 'text-emerald-400' : 'text-zinc-600'}`} />
                            <span className="capitalize text-[10px]">{p}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Volume Slider */}
                  <div>
                    <div className="flex items-center justify-between text-xs font-semibold text-emerald-200 mb-1">
                      <span>Adhan Volume</span>
                      <span className="text-amber-300 font-mono">{userSettings.adhanVolume}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={userSettings.adhanVolume}
                      onChange={(e) => updateSetting('adhanVolume', Number(e.target.value))}
                      className="w-full accent-amber-400 h-1.5 bg-black/50 rounded-lg cursor-pointer"
                    />
                  </div>
                </div>

                {/* 3. Quran & Reading Preferences */}
                <div className="bg-[#031c15] border border-white/10 rounded-3xl p-5 sm:p-6 space-y-4">
                  <div className="flex items-center gap-2.5 pb-2 border-b border-white/10">
                    <BookOpen className="w-4 h-4 text-amber-400" />
                    <div>
                      <h5 className="text-sm font-bold text-white">Quran & Recitation Preferences</h5>
                      <p className="text-[11px] text-emerald-300/70">Script style, translation & default reciter</p>
                    </div>
                  </div>

                  {/* Preferred Arabic Script */}
                  <div>
                    <label className="block text-xs font-semibold text-emerald-200 mb-1.5">
                      Arabic Script Style
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => updateSetting('quranScript', 'uthmani')}
                        className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                          userSettings.quranScript === 'uthmani'
                            ? 'bg-amber-500 text-emerald-950 border-amber-400 font-black shadow'
                            : 'bg-black/30 border-white/10 text-emerald-200 hover:border-white/20'
                        }`}
                      >
                        Uthmani (Madani)
                      </button>
                      <button
                        type="button"
                        onClick={() => updateSetting('quranScript', 'indopak')}
                        className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                          userSettings.quranScript === 'indopak'
                            ? 'bg-amber-500 text-emerald-950 border-amber-400 font-black shadow'
                            : 'bg-black/30 border-white/10 text-emerald-200 hover:border-white/20'
                        }`}
                      >
                        Indo-Pak (Asian)
                      </button>
                    </div>
                  </div>

                  {/* Reciter */}
                  <div>
                    <label className="block text-xs font-semibold text-emerald-200 mb-1.5">
                      Default Quran Reciter
                    </label>
                    <select
                      value={userSettings.reciterId}
                      onChange={(e) => updateSetting('reciterId', e.target.value)}
                      className="w-full bg-black/40 border border-white/15 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-400 cursor-pointer"
                    >
                      <option value="alafasy" className="bg-[#021812]">Mishary Rashid Alafasy</option>
                      <option value="abdulbasit" className="bg-[#021812]">Abdul Basit Abdul Samad (Murattal)</option>
                      <option value="sudais" className="bg-[#021812]">Abdur-Rahman As-Sudais (Makkah)</option>
                      <option value="shuraim" className="bg-[#021812]">Saud Ash-Shuraim</option>
                    </select>
                  </div>

                  {/* Translation Language */}
                  <div>
                    <label className="block text-xs font-semibold text-emerald-200 mb-1.5">
                      Quran Translation Language
                    </label>
                    <select
                      value={userSettings.quranTranslation}
                      onChange={(e) => updateSetting('quranTranslation', e.target.value)}
                      className="w-full bg-black/40 border border-white/15 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-400 cursor-pointer"
                    >
                      <option value="en" className="bg-[#021812]">English (Sahih International)</option>
                      <option value="ur" className="bg-[#021812]">Urdu (Fateh Muhammad Jalandhari)</option>
                      <option value="hi" className="bg-[#021812]">Hindi (Farooq Khan & Nadwi)</option>
                      <option value="ar" className="bg-[#021812]">Arabic (Tafsir Al-Jalalayn)</option>
                      <option value="tr" className="bg-[#021812]">Turkish (Diyanet Isleri)</option>
                      <option value="id" className="bg-[#021812]">Indonesian (Bahasa)</option>
                    </select>
                  </div>
                </div>

                {/* 4. Qibla Compass & Location Settings */}
                <div className="bg-[#031c15] border border-white/10 rounded-3xl p-5 sm:p-6 space-y-4">
                  <div className="flex items-center gap-2.5 pb-2 border-b border-white/10">
                    <Compass className="w-4 h-4 text-amber-400" />
                    <div>
                      <h5 className="text-sm font-bold text-white">Qibla Compass & Location</h5>
                      <p className="text-[11px] text-emerald-300/70">Sensor orientation & GPS calibration</p>
                    </div>
                  </div>

                  {/* Auto-detect Location Switch */}
                  <div className="flex items-center justify-between p-3 rounded-2xl bg-black/30 border border-white/10">
                    <div>
                      <span className="text-xs font-bold text-white block">Auto GPS Location Detection</span>
                      <span className="text-[10px] text-emerald-300/70">
                        Automatically update prayer times and Qibla based on real-time device coordinates
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => updateSetting('autoDetectLocation', !userSettings.autoDetectLocation)}
                      className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${
                        userSettings.autoDetectLocation ? 'bg-amber-500' : 'bg-zinc-700'
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-full bg-white transition-transform transform ${
                          userSettings.autoDetectLocation ? 'translate-x-6' : 'translate-x-0.5'
                        }`}
                      />
                    </button>
                  </div>

                  {/* Alignment Vibration Switch */}
                  <div className="flex items-center justify-between p-3 rounded-2xl bg-black/30 border border-white/10">
                    <div>
                      <span className="text-xs font-bold text-white block">Haptic Vibration on Alignment</span>
                      <span className="text-[10px] text-emerald-300/70">
                        Vibrate gently when phone is aligned within ±4° of the Holy Kaaba
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => updateSetting('qiblaVibration', !userSettings.qiblaVibration)}
                      className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${
                        userSettings.qiblaVibration ? 'bg-emerald-500' : 'bg-zinc-700'
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-full bg-white transition-transform transform ${
                          userSettings.qiblaVibration ? 'translate-x-6' : 'translate-x-0.5'
                        }`}
                      />
                    </button>
                  </div>

                  {/* Reset Defaults button */}
                  <div className="pt-2 text-right">
                    <button
                      type="button"
                      onClick={handleResetSettings}
                      className="text-xs text-amber-300/80 hover:text-amber-200 transition-colors flex items-center gap-1.5 ml-auto cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Reset Settings to Standard Defaults</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Saved Bookmarks & Duas Section */}
              <div className="bg-[#031c15] border border-white/10 rounded-3xl p-5 sm:p-6 space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <Bookmark className="w-4 h-4 text-amber-400" />
                    <h5 className="text-sm font-bold text-white">Saved Verses & Bookmarked Duas</h5>
                  </div>
                  <span className="text-xs text-emerald-300/70">
                    {userActivity.bookmarkedAyahs.length + userActivity.bookmarkedDuas.length} Items Saved
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Bookmarked Quran Verses */}
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
                      Quranic Ayahs
                    </span>
                    {userActivity.bookmarkedAyahs.length === 0 ? (
                      <p className="text-xs text-emerald-400/60 p-3 bg-black/20 rounded-xl">
                        No verses bookmarked yet. Tap the bookmark icon in the Quran reader to save verses here.
                      </p>
                    ) : (
                      userActivity.bookmarkedAyahs.map((ayah, idx) => (
                        <div
                          key={idx}
                          className="p-3 rounded-2xl bg-black/30 border border-white/10 flex items-center justify-between gap-3 group"
                        >
                          <div>
                            <span className="text-xs font-bold text-white block">
                              Surah {ayah.surahName} ({ayah.surahNumber}:{ayah.ayahNumber})
                            </span>
                            <span className="text-xs text-emerald-300/80 font-amiri line-clamp-1 mt-0.5">
                              {ayah.text}
                            </span>
                          </div>
                          <button
                            onClick={() => removeAyahBookmark(idx)}
                            className="p-1.5 text-red-400 hover:text-red-300 hover:bg-white/5 rounded-lg transition-colors cursor-pointer"
                            title="Remove Bookmark"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))
                    )}
                  </div>

                  {/* Bookmarked Duas */}
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
                      Favorite Duas & Adhkar
                    </span>
                    {userActivity.bookmarkedDuas.length === 0 ? (
                      <p className="text-xs text-emerald-400/60 p-3 bg-black/20 rounded-xl">
                        No supplications bookmarked yet.
                      </p>
                    ) : (
                      userActivity.bookmarkedDuas.map((dua) => (
                        <div
                          key={dua.id}
                          className="p-3 rounded-2xl bg-black/30 border border-white/10 flex items-center justify-between gap-3 group"
                        >
                          <div>
                            <span className="text-xs font-bold text-white block">{dua.title}</span>
                            <span className="text-[10px] text-amber-300/70 capitalize">{dua.category}</span>
                          </div>
                          <button
                            onClick={() => removeDuaBookmark(dua.id)}
                            className="p-1.5 text-red-400 hover:text-red-300 hover:bg-white/5 rounded-lg transition-colors cursor-pointer"
                            title="Remove Bookmark"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ====================================================
              TAB 2: TRAFFIC & ANALYTICS TAB
             ==================================================== */}
          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4 bg-[#031c15]/90 p-4 rounded-3xl border border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
                  <div>
                    <span className="text-xs text-emerald-300/70 font-semibold block">Active Online Pilgrims</span>
                    <span className="text-2xl font-black text-white font-mono">1,842 Muslims Online</span>
                  </div>
                </div>

                <div className="flex items-center gap-1 bg-black/40 p-1 rounded-2xl border border-white/10 text-xs">
                  {(['today', '7d', '30d', '1y'] as const).map((t) => (
                    <button
                      key={t}
                      onClick={() => setTimeRange(t)}
                      className={`px-3 py-1 rounded-xl font-bold uppercase transition-all ${
                        timeRange === t
                          ? 'bg-amber-500 text-emerald-950'
                          : 'text-emerald-300/80 hover:text-white'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: 'Total Visits', value: '428,910', change: '+24.5%', isUp: true, icon: Users },
                  { label: 'Adhan Listeners', value: '184,200', change: '+38.2%', isUp: true, icon: Volume2 },
                  { label: 'Quran Ayahs Read', value: '1,492,000', change: '+19.1%', isUp: true, icon: BookOpen },
                  { label: 'Qibla Orientations', value: '95,400', change: '+12.4%', isUp: true, icon: Compass },
                ].map((stat, i) => {
                  const Icon = stat.icon;
                  return (
                    <div key={i} className="bg-[#031c15] p-5 rounded-3xl border border-white/10 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-emerald-300/70">{stat.label}</span>
                        <div className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center">
                          <Icon className="w-4 h-4 text-amber-400" />
                        </div>
                      </div>
                      <div className="flex items-baseline justify-between">
                        <span className="text-2xl font-black text-white font-mono">{stat.value}</span>
                        <span className="text-xs font-bold text-emerald-400">{stat.change}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ====================================================
              TAB 3: CUSTOMIZATION TAB
             ==================================================== */}
          {activeTab === 'customization' && (
            <div className="space-y-6">
              <div className="bg-[#031c15] p-6 rounded-3xl border border-white/10 space-y-6">
                <div>
                  <h4 className="text-base font-bold text-white flex items-center gap-2">
                    <Palette className="w-4 h-4 text-amber-400" />
                    <span>Interface Theme & Luxury Atmosphere</span>
                  </h4>
                  <p className="text-xs text-emerald-300/70 mt-1">
                    Select your custom spiritual ambient hue and backdrop blur level.
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { id: 'emerald', name: 'Emerald Islamic Glow', color: 'from-emerald-600 to-[#021812]' },
                    { id: 'gold', name: 'Al-Kaaba Gold Silk', color: 'from-amber-600 to-[#021812]' },
                    { id: 'sapphire', name: 'Midnight Celestial Blue', color: 'from-sky-700 to-[#021812]' },
                    { id: 'obsidian', name: 'Deep Madinah Obsidian', color: 'from-zinc-800 to-black' },
                  ].map((theme) => (
                    <button
                      key={theme.id}
                      onClick={() => setThemeHue(theme.id as any)}
                      className={`p-4 rounded-2xl border text-left transition-all ${
                        themeHue === theme.id
                          ? 'border-amber-400 shadow-lg shadow-amber-500/20 ring-2 ring-amber-400/30'
                          : 'border-white/10 hover:border-white/30'
                      } bg-gradient-to-br ${theme.color}`}
                    >
                      <span className="text-xs font-bold text-white block">{theme.name}</span>
                      <span className="text-[10px] text-emerald-200/60 block mt-1">Active Hue</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ====================================================
              TAB 4: CMS & ARTICLES TAB
             ==================================================== */}
          {activeTab === 'cms' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-base font-bold text-white">Editorial Articles & Fiqh Publications</h4>
                  <p className="text-xs text-emerald-300/70">Verified scholarly Islamic articles and pilgrim guides</p>
                </div>
                <button
                  onClick={() => setShowAddArticle(true)}
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-emerald-950 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>New Publication</span>
                </button>
              </div>

              <div className="space-y-3">
                {articles.map((art) => (
                  <div
                    key={art.id}
                    className="p-4 rounded-2xl bg-[#031c15] border border-white/10 flex flex-wrap items-center justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-semibold">
                          {art.category}
                        </span>
                        <span className="text-[10px] text-emerald-400/60">{art.date}</span>
                      </div>
                      <h5 className="text-sm font-bold text-white mt-1">{art.title}</h5>
                      <span className="text-xs text-emerald-300/70 mt-0.5 block">By {art.author}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleDeleteArticle(art.id)}
                        className="p-2 text-red-400 hover:text-red-300 hover:bg-white/5 rounded-xl transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add Article Modal */}
              {showAddArticle && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in">
                  <div className="bg-[#031c15] border border-amber-500/40 rounded-3xl w-full max-w-lg p-6 shadow-2xl">
                    <h4 className="text-base font-bold text-white mb-4">Create New Publication</h4>
                    <form onSubmit={handleCreateArticle} className="space-y-4">
                      <div>
                        <label className="block text-xs font-semibold text-emerald-200 mb-1">Article Title</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. The Etiquettes of Night Prayer (Tahajjud)"
                          value={artTitle}
                          onChange={(e) => setArtTitle(e.target.value)}
                          className="w-full bg-black/40 border border-white/15 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-semibold text-emerald-200 mb-1">Category</label>
                          <select
                            value={artCategory}
                            onChange={(e) => setArtCategory(e.target.value)}
                            className="w-full bg-black/40 border border-white/15 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                          >
                            <option value="Ramadan">Ramadan</option>
                            <option value="Quranic Reflection">Quranic Reflection</option>
                            <option value="Seerah">Seerah</option>
                            <option value="Astronomy & Fiqh">Astronomy & Fiqh</option>
                            <option value="Zakat">Zakat</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-emerald-200 mb-1">Author</label>
                          <input
                            type="text"
                            value={artAuthor}
                            onChange={(e) => setArtAuthor(e.target.value)}
                            className="w-full bg-black/40 border border-white/15 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                          />
                        </div>
                      </div>

                      <div className="flex items-center justify-end gap-2 pt-2">
                        <button
                          type="button"
                          onClick={() => setShowAddArticle(false)}
                          className="px-4 py-2 rounded-xl text-xs font-semibold text-emerald-300 hover:text-white cursor-pointer"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-emerald-950 font-bold text-xs cursor-pointer"
                        >
                          Publish Now
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
