'use client';

// ============================================================
// NOOR Web — Dedicated Spiritual Deen Dashboard & Habit Hub
// Real-time Salah Tracker, Qada Journal, Quran Goal & Fiqh Settings
// ============================================================

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  CheckCircle2,
  Clock,
  Sparkles,
  BookOpen,
  Heart,
  TrendingUp,
  RotateCcw,
  Sliders,
  Settings,
  ShieldCheck,
  Check,
  Plus,
  Minus,
  Calendar,
  Compass,
  Bookmark,
  Award,
  Flame,
  Volume2,
  ChevronRight,
  LogOut,
  Moon,
  Coins
} from 'lucide-react';
import { GlobalNavbar } from '../../components/GlobalNavbar';
import { Footer } from '../../components/Footer';
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
} from '../../lib/userDataService';
import { GoogleLogo, AuthUser } from '../../components/AuthModal';
import { useLanguage } from '../../context/LanguageContext';

export default function DashboardPage() {
  const { t } = useLanguage();
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);
  const [userSettings, setUserSettings] = useState<UserSettings>(DEFAULT_USER_SETTINGS);
  const [userActivity, setUserActivity] = useState<SpiritualActivityData>(DEFAULT_ACTIVITY_DATA);
  const [saveNotice, setSaveNotice] = useState<string>('');

  // Missed Prayer Qada State (stored in localStorage)
  const [qadaPrayers, setQadaPrayers] = useState({
    fajr: 12,
    dhuhr: 8,
    asr: 15,
    maghrib: 4,
    isha: 18,
    witr: 14
  });

  // Fasting Tracker State
  const [fastingDaysThisMonth, setFastingDaysThisMonth] = useState<number>(4);
  const [quranPagesToday, setQuranPagesToday] = useState<number>(6);

  useEffect(() => {
    const user = loadCurrentUser();
    if (user) setCurrentUser(user);

    const s = loadUserSettings();
    if (s) setUserSettings(s);

    const a = loadUserActivity();
    if (a) setUserActivity(a);

    // Load Qada journal from localStorage if saved
    try {
      const savedQada = localStorage.getItem('noor_user_qada');
      if (savedQada) setQadaPrayers(JSON.parse(savedQada));
    } catch {}
  }, []);

  const triggerSaveNotice = (msg: string) => {
    setSaveNotice(msg);
    setTimeout(() => setSaveNotice(''), 2500);
  };

  // Toggle today's prayer checkmark
  const toggleTodayPrayer = (prayerKey: keyof SpiritualActivityData['todayPrayers']) => {
    const currentVal = userActivity.todayPrayers[prayerKey];
    const updatedPrayers = {
      ...userActivity.todayPrayers,
      [prayerKey]: !currentVal
    };

    const newCompletedCount = userActivity.totalPrayersCompleted + (!currentVal ? 1 : -1);
    const updatedActivity: SpiritualActivityData = {
      ...userActivity,
      todayPrayers: updatedPrayers,
      totalPrayersCompleted: Math.max(0, newCompletedCount)
    };

    setUserActivity(updatedActivity);
    saveUserActivity(updatedActivity);
    triggerSaveNotice(`${prayerKey.toUpperCase()} logged in Deen Record!`);
  };

  // Adjust Qada prayers
  const adjustQada = (prayer: keyof typeof qadaPrayers, delta: number) => {
    setQadaPrayers(prev => {
      const updated = {
        ...prev,
        [prayer]: Math.max(0, prev[prayer] + delta)
      };
      try {
        localStorage.setItem('noor_user_qada', JSON.stringify(updated));
      } catch {}
      return updated;
    });
    triggerSaveNotice(`Qada count updated.`);
  };

  // Quick settings update
  const updateSetting = <K extends keyof UserSettings>(key: K, value: UserSettings[K]) => {
    const updated = { ...userSettings, [key]: value };
    setUserSettings(updated);
    saveUserSettings(updated);
    triggerSaveNotice(`Settings updated.`);
  };

  const totalMissedQada = Object.values(qadaPrayers).reduce((a, b) => a + b, 0);
  const completedTodayCount = Object.values(userActivity.todayPrayers).filter(Boolean).length;

  return (
    <div className="min-h-screen bg-[#02120d] text-white flex flex-col selection:bg-amber-500 selection:text-black relative overflow-hidden">
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-[120px]" />
      </div>

      <GlobalNavbar />

      {/* Header Breadcrumb */}
      <div className="border-b border-white/10 bg-[#031c15]/70 backdrop-blur-md px-4 sm:px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-emerald-200 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold font-serif text-white tracking-wide">
                  Deen Tracker & Spiritual Dashboard
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Live Sync
                </span>
              </div>
              <p className="text-xs text-emerald-300/70 mt-0.5 font-mono">
                Daily 5 Salah Checklist • Missed Prayer (Qada) Journal • Habit Streaks • Fiqh Tuning
              </p>
            </div>
          </div>

          {/* Save feedback indicator */}
          {saveNotice && (
            <div className="px-3.5 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-bold flex items-center gap-2 animate-in fade-in">
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span>{saveNotice}</span>
            </div>
          )}
        </div>
      </div>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 py-8 flex-1 space-y-8">
        
        {/* ============================================================ */}
        {/* USER PROFILE & STREAK OVERVIEW BANNER */}
        {/* ============================================================ */}
        <div className="bg-gradient-to-r from-[#032018] via-[#04281f] to-[#032018] border border-amber-500/30 rounded-3xl p-6 shadow-xl relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            {/* User Info */}
            <div className="flex items-center gap-4">
              {currentUser?.picture ? (
                <img
                  src={currentUser.picture}
                  alt={currentUser.name}
                  className="w-16 h-16 rounded-2xl object-cover border-2 border-amber-400/60 shadow-lg"
                />
              ) : (
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 text-emerald-950 font-black text-2xl flex items-center justify-center border-2 border-amber-300 shadow-lg">
                  {currentUser?.name ? currentUser.name.charAt(0).toUpperCase() : 'P'}
                </div>
              )}

              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-bold font-serif text-white">
                    {currentUser?.name || 'Spiritual Pilgrim'}
                  </h2>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    Active Believer
                  </span>
                </div>
                <p className="text-xs text-zinc-300 font-mono mt-0.5">
                  {currentUser?.email || 'Guest Session (Locally Synced)'}
                </p>
                <p className="text-[11px] text-emerald-300/80 mt-1">
                  Calculation Method: <strong>{userSettings.calculationMethod}</strong> • Juristic Rule: <strong>{userSettings.asrFactor === 2 ? 'Hanafi' : 'Standard (Shafi\'i/Maliki/Hanbali)'}</strong>
                </p>
              </div>
            </div>

            {/* Quick Metrics Badges */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-black/40 border border-white/10 rounded-2xl p-3 text-center min-w-[90px]">
                <div className="flex items-center justify-center gap-1 text-amber-400 mb-0.5">
                  <Flame className="w-4 h-4 fill-amber-400" />
                  <span className="text-lg font-black font-mono text-white">{userActivity.prayerStreakDays}</span>
                </div>
                <span className="text-[10px] text-zinc-400 uppercase tracking-wider block">Day Streak</span>
              </div>

              <div className="bg-black/40 border border-white/10 rounded-2xl p-3 text-center min-w-[90px]">
                <div className="flex items-center justify-center gap-1 text-emerald-400 mb-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                  <span className="text-lg font-black font-mono text-white">{completedTodayCount}/5</span>
                </div>
                <span className="text-[10px] text-zinc-400 uppercase tracking-wider block">Today Salah</span>
              </div>

              <div className="bg-black/40 border border-white/10 rounded-2xl p-3 text-center min-w-[90px]">
                <div className="flex items-center justify-center gap-1 text-amber-400 mb-0.5">
                  <Award className="w-4 h-4" />
                  <span className="text-lg font-black font-mono text-white">{userActivity.totalPrayersCompleted}</span>
                </div>
                <span className="text-[10px] text-zinc-400 uppercase tracking-wider block">Total Logged</span>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* 1. DAILY 5 SALAH INTERACTIVE CHECKLIST */}
        {/* ============================================================ */}
        <div className="bg-[#031c15] border border-emerald-500/20 rounded-3xl p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
            <div>
              <span className="text-[11px] font-mono font-bold text-amber-400 uppercase tracking-widest">
                Daily Fard Assessment
              </span>
              <h3 className="text-lg font-bold font-serif text-white mt-0.5">
                Today&apos;s 5 Obligatory Prayers
              </h3>
            </div>
            <span className="text-xs text-emerald-300 font-mono">
              Completed {completedTodayCount} of 5 Obligatory Salah
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 pt-2">
            {[
              { id: 'fajr', label: 'Fajr', rakats: '2 Fard', time: 'Dawn' },
              { id: 'dhuhr', label: 'Dhuhr', rakats: '4 Fard', time: 'Noon' },
              { id: 'asr', label: 'Asr', rakats: '4 Fard', time: 'Afternoon' },
              { id: 'maghrib', label: 'Maghrib', rakats: '3 Fard', time: 'Sunset' },
              { id: 'isha', label: 'Isha', rakats: '4 Fard', time: 'Night' },
            ].map(prayer => {
              const isChecked = userActivity.todayPrayers[prayer.id as keyof SpiritualActivityData['todayPrayers']];
              return (
                <button
                  key={prayer.id}
                  onClick={() => toggleTodayPrayer(prayer.id as keyof SpiritualActivityData['todayPrayers'])}
                  className={`p-4 rounded-2xl flex flex-col justify-between text-left transition-all border cursor-pointer ${
                    isChecked
                      ? 'bg-emerald-500/20 border-emerald-500/50 shadow-lg shadow-emerald-950/40 scale-[1.02]'
                      : 'bg-black/30 border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono font-bold text-zinc-400">{prayer.time}</span>
                    <div className={`w-6 h-6 rounded-lg flex items-center justify-center transition-colors ${
                      isChecked ? 'bg-emerald-500 text-black' : 'border border-zinc-600 bg-white/5'
                    }`}>
                      {isChecked && <Check className="w-4 h-4 stroke-[3]" />}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-base font-bold text-white">{prayer.label}</h4>
                    <p className="text-[11px] text-amber-300/80 font-mono mt-0.5">{prayer.rakats}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* ============================================================ */}
        {/* 2. MISSED PRAYER (QADA) JOURNAL */}
        {/* ============================================================ */}
        <div className="bg-[#031c15] border border-emerald-500/20 rounded-3xl p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
            <div>
              <span className="text-[11px] font-mono font-bold text-amber-400 uppercase tracking-widest">
                Fiqh Accountability
              </span>
              <h3 className="text-lg font-bold font-serif text-white mt-0.5">
                Missed Prayers (Qada Umri) Journal
              </h3>
            </div>
            <div className="text-right">
              <span className="text-xs font-mono text-zinc-400 block">Total Missed Remaining:</span>
              <span className="text-lg font-black font-mono text-red-400">{totalMissedQada} Prayers</span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-2">
            {[
              { id: 'fajr', label: 'Fajr Qada', rakats: '2 Rak\'ah' },
              { id: 'dhuhr', label: 'Dhuhr Qada', rakats: '4 Rak\'ah' },
              { id: 'asr', label: 'Asr Qada', rakats: '4 Rak\'ah' },
              { id: 'maghrib', label: 'Maghrib Qada', rakats: '3 Rak\'ah' },
              { id: 'isha', label: 'Isha Qada', rakats: '4 Rak\'ah' },
              { id: 'witr', label: 'Witr Qada', rakats: '3 Wajib' },
            ].map(item => {
              const count = qadaPrayers[item.id as keyof typeof qadaPrayers];
              return (
                <div key={item.id} className="bg-black/30 border border-white/10 rounded-2xl p-3.5 flex flex-col justify-between text-center">
                  <div>
                    <span className="text-xs font-bold text-white block">{item.label}</span>
                    <span className="text-[10px] text-zinc-400 font-mono">{item.rakats}</span>
                    <span className="text-2xl font-black font-mono text-amber-300 my-2 block">
                      {count}
                    </span>
                  </div>

                  <div className="flex items-center justify-center gap-2 pt-2 border-t border-white/5">
                    <button
                      onClick={() => adjustQada(item.id as keyof typeof qadaPrayers, -1)}
                      className="w-7 h-7 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 flex items-center justify-center text-xs font-bold transition-colors cursor-pointer"
                      title="Completed 1 Qada Prayer"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => adjustQada(item.id as keyof typeof qadaPrayers, 1)}
                      className="w-7 h-7 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-300 flex items-center justify-center text-xs font-bold transition-colors cursor-pointer"
                      title="Add 1 Missed Prayer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ============================================================ */}
        {/* 3. SPIRITUAL HABITS, QURAN & FASTING */}
        {/* ============================================================ */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Quran Reading Tracker */}
          <div className="bg-[#031c15] border border-emerald-500/20 rounded-3xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-amber-400">
                <BookOpen className="w-5 h-5" />
                <h4 className="font-bold text-sm text-white">Daily Quran Goal</h4>
              </div>
              <Link href="/quran" className="text-xs text-amber-400 hover:text-amber-300 font-mono">
                Read Quran →
              </Link>
            </div>

            <div className="p-4 rounded-2xl bg-black/40 border border-white/10 flex items-center justify-between">
              <div>
                <span className="text-xs text-zinc-400 block font-mono">Pages Recited Today</span>
                <span className="text-2xl font-bold font-mono text-white mt-1 block">
                  {quranPagesToday} / 10 Pages
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setQuranPagesToday(prev => Math.max(0, prev - 1))}
                  className="w-8 h-8 rounded-xl bg-white/5 hover:bg-white/10 text-white flex items-center justify-center font-bold"
                >
                  -
                </button>
                <button
                  onClick={() => setQuranPagesToday(prev => prev + 1)}
                  className="w-8 h-8 rounded-xl bg-amber-500 hover:bg-amber-400 text-black flex items-center justify-center font-bold"
                >
                  +
                </button>
              </div>
            </div>

            <div className="space-y-2 text-xs text-zinc-300">
              <span className="text-[11px] text-zinc-400 font-mono block">Bookmarked Verses:</span>
              {userActivity.bookmarkedAyahs.slice(0, 2).map((b, i) => (
                <div key={i} className="p-2 rounded-xl bg-white/5 flex items-center justify-between">
                  <span className="font-semibold text-emerald-300">{b.surahName} : {b.ayahNumber}</span>
                  <Link href="/quran" className="text-[10px] text-zinc-400 hover:text-white">
                    Open Ayah
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Fasting & Voluntary Deeds */}
          <div className="bg-[#031c15] border border-emerald-500/20 rounded-3xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-emerald-400">
                <Moon className="w-5 h-5" />
                <h4 className="font-bold text-sm text-white">Fasting Record</h4>
              </div>
              <Link href="/calendar" className="text-xs text-emerald-400 hover:text-emerald-300 font-mono">
                Hijri Dates →
              </Link>
            </div>

            <div className="p-4 rounded-2xl bg-black/40 border border-white/10 flex items-center justify-between">
              <div>
                <span className="text-xs text-zinc-400 block font-mono">Fasts Logged This Month</span>
                <span className="text-2xl font-bold font-mono text-white mt-1 block">
                  {fastingDaysThisMonth} Days
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setFastingDaysThisMonth(prev => Math.max(0, prev - 1))}
                  className="w-8 h-8 rounded-xl bg-white/5 hover:bg-white/10 text-white flex items-center justify-center font-bold"
                >
                  -
                </button>
                <button
                  onClick={() => setFastingDaysThisMonth(prev => prev + 1)}
                  className="w-8 h-8 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black flex items-center justify-center font-bold"
                >
                  +
                </button>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-white/5 text-xs text-zinc-300 space-y-1">
              <span className="font-bold text-amber-300 block">Sunnah Fasting Days:</span>
              <p>• Mondays & Thursdays</p>
              <p>• Ayyam al-Beed (13th, 14th, 15th of Hijri month)</p>
            </div>
          </div>

          {/* Fiqh Calculation Settings */}
          <div className="bg-[#031c15] border border-emerald-500/20 rounded-3xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-amber-400">
                <Sliders className="w-5 h-5" />
                <h4 className="font-bold text-sm text-white">Fiqh & Madhab Settings</h4>
              </div>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-zinc-400 mb-1 font-mono">Calculation Convention</label>
                <select
                  value={userSettings.calculationMethod}
                  onChange={e => updateSetting('calculationMethod', e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-xl p-2.5 text-white font-mono outline-none focus:border-amber-400"
                >
                  <option value="MWL">Muslim World League (MWL)</option>
                  <option value="ISNA">ISNA (North America)</option>
                  <option value="Makkah">Umm Al-Qura, Makkah</option>
                  <option value="Karachi">Univ of Karachi</option>
                  <option value="Egypt">Egyptian Authority</option>
                  <option value="Tehran">University of Tehran</option>
                  <option value="Jafari">Shia Ithna-Ashari</option>
                </select>
              </div>

              <div>
                <label className="block text-zinc-400 mb-1 font-mono">Asr Juristic Rule (Madhab)</label>
                <select
                  value={userSettings.asrFactor}
                  onChange={e => updateSetting('asrFactor', Number(e.target.value))}
                  className="w-full bg-black/40 border border-white/10 rounded-xl p-2.5 text-white font-mono outline-none focus:border-amber-400"
                >
                  <option value={1}>Standard (Shafi&apos;i / Maliki / Hanbali)</option>
                  <option value={2}>Hanafi (Shadow x2)</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
