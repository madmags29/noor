'use client';

import React, { useState, useEffect } from 'react';
import {
  Smartphone,
  ShieldAlert,
  Sliders,
  CheckCircle2,
  RefreshCw,
  Zap,
  Save,
  Radio,
  Bell,
  AlertTriangle,
  Play,
  Volume2,
  Compass,
  BookOpen,
  Heart,
  Globe2,
  Lock,
  Sparkles,
  Plus,
  Trash2,
  Layers,
  ArrowUpRight,
  Search,
  Check,
  X,
  BatteryCharging,
  Wifi,
  MapPin,
  Flame,
  MessageSquare,
  HelpCircle,
  Clock,
  Palette,
  HardDrive,
  Users,
  Baby,
  Smile,
  ShieldCheck
} from 'lucide-react';
import { AppRemoteConfig } from '../../app/api/app-config/route';

export const AppControlModule: React.FC = () => {
  const [config, setConfig] = useState<AppRemoteConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [featureSearch, setFeatureSearch] = useState('');
  const [featureCategory, setFeatureCategory] = useState<'all' | 'core' | 'spiritual' | 'guidance' | 'community'>('all');

  // Local state for adding release notes
  const [newReleaseNote, setNewReleaseNote] = useState('');

  // Fetch remote config on load
  const fetchConfig = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/app-config');
      const data = await res.json();
      if (data.success) {
        setConfig(data.data);
      }
    } catch (err) {
      console.error('Failed to load remote config:', err);
      setErrorMsg('Failed to load remote config.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConfig();
  }, []);

  // Save updated config to API
  const handleSaveConfig = async (overrideConfig?: AppRemoteConfig) => {
    const payload = overrideConfig || config;
    if (!payload) return;

    setSaving(true);
    setSuccessMsg('');
    setErrorMsg('');

    try {
      const res = await fetch('/api/app-config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.success) {
        setConfig(data.data);
        setSuccessMsg('Remote App Configuration updated and synchronized with all mobile devices instantly!');
        setTimeout(() => setSuccessMsg(''), 4000);
      } else {
        setErrorMsg(data.error || 'Failed to update remote app config.');
      }
    } catch {
      setErrorMsg('Network error while saving config.');
    } finally {
      setSaving(false);
    }
  };

  const handleToggleFeature = (key: keyof AppRemoteConfig['features']) => {
    if (!config) return;
    const updated: AppRemoteConfig = {
      ...config,
      features: {
        ...config.features,
        [key]: !config.features[key],
      },
    };
    setConfig(updated);
  };

  const handleToggleDeviceSetting = (key: keyof AppRemoteConfig['deviceSettings']) => {
    if (!config) return;
    const updated: AppRemoteConfig = {
      ...config,
      deviceSettings: {
        ...config.deviceSettings,
        [key]: !config.deviceSettings[key],
      },
    };
    setConfig(updated);
  };

  const handleToggleAllFeatures = (enable: boolean) => {
    if (!config) return;
    const updatedFeatures = Object.keys(config.features).reduce((acc, key) => {
      acc[key as keyof AppRemoteConfig['features']] = enable;
      return acc;
    }, {} as AppRemoteConfig['features']);

    const updated: AppRemoteConfig = {
      ...config,
      features: updatedFeatures,
    };
    setConfig(updated);
  };

  const handleAddReleaseNote = () => {
    if (!newReleaseNote.trim() || !config) return;
    const updated: AppRemoteConfig = {
      ...config,
      forceUpdate: {
        ...config.forceUpdate,
        releaseNotes: [...config.forceUpdate.releaseNotes, newReleaseNote.trim()],
      },
    };
    setConfig(updated);
    setNewReleaseNote('');
  };

  const handleRemoveReleaseNote = (index: number) => {
    if (!config) return;
    const updated: AppRemoteConfig = {
      ...config,
      forceUpdate: {
        ...config.forceUpdate,
        releaseNotes: config.forceUpdate.releaseNotes.filter((_, i) => i !== index),
      },
    };
    setConfig(updated);
  };

  if (loading || !config) {
    return (
      <div className="p-12 text-center flex flex-col items-center justify-center space-y-3">
        <div className="w-8 h-8 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
        <span className="text-xs text-emerald-300/80">Loading Real-Time App Control Systems...</span>
      </div>
    );
  }

  // All 24 Comprehensive Mobile Features List
  const allFeaturesList = [
    // Core Pillars & Essentials
    { key: 'enableQuranAudio', category: 'core', label: 'Noble Quran Audio Reciters & Streams', desc: 'Sheikh Alafasy, Sudais & Ghamdi audio recitations', icon: Volume2 },
    { key: 'enableQuranTafsir', category: 'core', label: 'Quran Translations & Tafsir Engine', desc: '11 Global language translations and Ibn Kathir commentary', icon: BookOpen },
    { key: 'enablePrayerCalculations', category: 'core', label: 'Accurate Prayer Times Engine', desc: 'Great-Circle solar zenith angles & Hanafi/Shafi Asr rules', icon: Clock },
    { key: 'enableQiblaCompass', category: 'core', label: 'GPS Qibla Compass & Sensor Calibration', desc: 'Real-time magnetic sensor guidance to Holy Kaaba', icon: Compass },
    { key: 'enableAdhanAlarms', category: 'core', label: 'Background Local Adhan Alarms', desc: 'Device-level background alarm sound notifications', icon: Bell },
    { key: 'enablePushNotifications', category: 'core', label: 'Push Notifications & FCM Alerts', desc: 'Firebase Cloud Messaging broadcast reminders', icon: Radio },

    // Spiritual Knowledge & Guides
    { key: 'enableAiAssistant', category: 'spiritual', label: 'Islamic AI Guidance Assistant', desc: 'GPT-powered scholarly Q&A with Quran and Hadith citations', icon: Sparkles },
    { key: 'enableZiyaratAudioGuides', category: 'spiritual', label: 'Ziyarat GPS Coordinates & Audio Tours', desc: 'Interactive shrine maps in Makkah, Madinah, Karbala & Najaf', icon: MapPin },
    { key: 'enableLiveMedia', category: 'spiritual', label: '24/7 Live Makkah & Madinah HD Streams', desc: 'Official continuous live television satellite broadcasts', icon: Play },
    { key: 'enableNamesOfAllah', category: 'spiritual', label: '99 Blessed Names of Allah (Asma-ul-Husna)', desc: 'Arabic typography, meanings, benefits and audio recitations', icon: Heart },
    { key: 'enableHijriCalendar', category: 'spiritual', label: 'Islamic Hijri Calendar & Moon Sighting', desc: 'Lunar month tracker, holy event notices & sighting offsets', icon: Layers },
    { key: 'enableSunnahEtiquette', category: 'spiritual', label: 'Sunnah Etiquette & Daily Habit Tracker', desc: 'Prophetic lifestyle guides for sleep, eating, travel & greetings', icon: Smile },

    // Guidance & Life Rituals
    { key: 'enableJanazahGuide', category: 'guidance', label: 'Janazah Funeral Guide & 4 Takbeers', desc: 'Step-by-step funeral prayer, washing rites and authentic duas', icon: BookOpen },
    { key: 'enableNikahGuide', category: 'guidance', label: 'Nikah Marriage Contract & Procedures', desc: 'Khutbah Nikah, Mahr calculation, legal conditions and witnesses', icon: Heart },
    { key: 'enableTravelMode', category: 'guidance', label: 'NOOR Safar Travel Mode & Qasr Shortening', desc: '77km distance tracker, Jam & Qasr prayer rules on the go', icon: Globe2 },
    { key: 'enableScholarDesk', category: 'guidance', label: 'Scholar Helpdesk & Question Portal', desc: 'Submit questions to verified Islamic scholars and councils', icon: HelpCircle },
    { key: 'enableMediaLibrary', category: 'guidance', label: 'Islamic Documentary & Media Library', desc: 'Curated historical videos, lectures, and documentaries', icon: Play },
    { key: 'enableKidsCorner', category: 'guidance', label: 'Noor Kids Corner & Quiz Zone', desc: 'Interactive Islamic quizzes, prophet stories and gamified learning', icon: Baby },

    // Community & Giving
    { key: 'enableZakatCalculator', category: 'community', label: 'Zakat & Nisab Precious Metal Rates', desc: 'Real-time gold & silver spot pricing with Nisab valuations', icon: Zap },
    { key: 'enableDonations', category: 'community', label: 'Verified Sadaqah & Donation Channels', desc: 'Direct 100% donation distribution to verified global relief', icon: Heart },
    { key: 'enableCommunityDuas', category: 'community', label: 'Community Duas & Ameen Wall', desc: 'Collective prayer requests with live Ameen counter', icon: MessageSquare },
    { key: 'enableMultiLanguage', category: 'community', label: 'Multi-Language Localization Engine', desc: '11 languages (English, Urdu, Hindi, Arabic, Bengali, etc.)', icon: Globe2 },
    { key: 'enableSacredThemeCustomizer', category: 'community', label: 'Sacred Dark & Gold Theme Customizer', desc: 'Obsidian, Emerald, Sapphire and Pure Dark mode toggles', icon: Palette },
    { key: 'enableOfflineCaching', category: 'community', label: 'Offline Data Caching & Local Storage', desc: 'Zero-internet offline prayer calculations and saved Surahs', icon: HardDrive },
  ];

  const filteredFeatures = allFeaturesList.filter((f) => {
    if (featureCategory !== 'all' && f.category !== featureCategory) return false;
    if (featureSearch.trim()) {
      const q = featureSearch.toLowerCase();
      return f.label.toLowerCase().includes(q) || f.desc.toLowerCase().includes(q);
    }
    return true;
  });

  const activeCount = Object.values(config.features || {}).filter(Boolean).length;
  const totalCount = Object.keys(config.features || {}).length;

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Module Title & Quick Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#031d16] p-5 rounded-3xl border border-emerald-500/20 shadow-xl">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 text-emerald-950 flex items-center justify-center shadow-lg font-black">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-black text-white tracking-tight">Mobile App Feature Control & Force Update Suite</h2>
              <p className="text-xs text-emerald-300/70">
                Remotely control Play Store builds, force updates, 24 feature kill-switches, and broadcast announcements in real-time.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={fetchConfig}
            className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-emerald-200 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer border border-white/10"
            title="Refresh Config"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Refresh</span>
          </button>

          <button
            onClick={() => handleSaveConfig()}
            disabled={saving}
            className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-emerald-950 font-black text-xs shadow-lg shadow-amber-500/25 active:scale-95 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Publishing to Apps...' : 'Save & Publish Live'}</span>
          </button>
        </div>
      </div>

      {/* Success / Error Feedback Alert */}
      {successMsg && (
        <div className="p-3.5 rounded-2xl bg-emerald-500/20 border border-emerald-400 text-emerald-200 text-xs font-bold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}
      {errorMsg && (
        <div className="p-3.5 rounded-2xl bg-red-500/20 border border-red-500/40 text-red-200 text-xs font-bold flex items-center gap-2 animate-in fade-in">
          <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Section 1: Version Control & Force Update */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 7 Cols: Force Update Controller */}
        <div className="lg:col-span-7 bg-[#021812] p-5 sm:p-6 rounded-3xl border border-white/10 shadow-xl space-y-5">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-400" />
              <div>
                <h3 className="text-sm font-black text-white">Google Play & App Store Force Update</h3>
                <span className="text-[10px] text-zinc-400">Enforces version upgrades across all mobile users</span>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={config.forceUpdate.enabled}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    forceUpdate: { ...config.forceUpdate, enabled: e.target.checked },
                  })
                }
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-zinc-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
              <span className="ml-2 text-xs font-bold text-white">
                {config.forceUpdate.enabled ? 'FORCE ACTIVE' : 'OPTIONAL'}
              </span>
            </label>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Min Required Build Number */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-emerald-300 block">
                Minimum Required Build (Version Code)
              </label>
              <input
                type="number"
                value={config.forceUpdate.minRequiredBuildNumber}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    forceUpdate: {
                      ...config.forceUpdate,
                      minRequiredBuildNumber: parseInt(e.target.value, 10) || 1,
                    },
                  })
                }
                className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/15 text-white font-mono text-xs focus:border-amber-400 outline-none"
              />
              <span className="text-[10px] text-zinc-400 block">
                Apps with build code below this will be blocked until updated.
              </span>
            </div>

            {/* Latest Available Build Number */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-emerald-300 block">
                Latest Available Build Number
              </label>
              <input
                type="number"
                value={config.forceUpdate.latestBuildNumber}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    forceUpdate: {
                      ...config.forceUpdate,
                      latestBuildNumber: parseInt(e.target.value, 10) || 1,
                    },
                  })
                }
                className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/15 text-white font-mono text-xs focus:border-amber-400 outline-none"
              />
              <span className="text-[10px] text-zinc-400 block">
                Current release on Play Store (currently <strong>b{config.forceUpdate.latestBuildNumber}</strong>).
              </span>
            </div>

            {/* Min Version String */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-emerald-300 block">
                Minimum Version Name
              </label>
              <input
                type="text"
                value={config.forceUpdate.minRequiredVersion}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    forceUpdate: { ...config.forceUpdate, minRequiredVersion: e.target.value },
                  })
                }
                className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/15 text-white text-xs focus:border-amber-400 outline-none"
              />
            </div>

            {/* Latest Version String */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-emerald-300 block">
                Latest Version Name
              </label>
              <input
                type="text"
                value={config.forceUpdate.latestVersion}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    forceUpdate: { ...config.forceUpdate, latestVersion: e.target.value },
                  })
                }
                className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/15 text-white text-xs focus:border-amber-400 outline-none"
              />
            </div>
          </div>

          {/* Update Modal Title & Description */}
          <div className="space-y-3 pt-2">
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-emerald-300 block">
                Update Dialog Title (User View)
              </label>
              <input
                type="text"
                value={config.forceUpdate.title}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    forceUpdate: { ...config.forceUpdate, title: e.target.value },
                  })
                }
                className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/15 text-white text-xs focus:border-amber-400 outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-emerald-300 block">
                Update Prompt Message
              </label>
              <textarea
                rows={2}
                value={config.forceUpdate.message}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    forceUpdate: { ...config.forceUpdate, message: e.target.value },
                  })
                }
                className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/15 text-white text-xs focus:border-amber-400 outline-none resize-none"
              />
            </div>
          </div>

          {/* Release Notes List */}
          <div className="space-y-2 pt-2">
            <label className="text-[11px] font-bold text-emerald-300 block">
              What&apos;s New in this Version (Release Highlights)
            </label>
            <div className="space-y-1.5 max-h-36 overflow-y-auto custom-scrollbar">
              {config.forceUpdate.releaseNotes.map((note, idx) => (
                <div key={idx} className="flex items-center justify-between gap-2 p-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white">
                  <span className="truncate">• {note}</span>
                  <button
                    onClick={() => handleRemoveReleaseNote(idx)}
                    className="text-red-400 hover:text-red-300 p-1 rounded-lg hover:bg-white/10 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                value={newReleaseNote}
                onChange={(e) => setNewReleaseNote(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddReleaseNote()}
                placeholder="Add release highlight bullet point..."
                className="flex-1 px-3 py-1.5 rounded-xl bg-black/40 border border-white/15 text-white text-xs outline-none focus:border-amber-400"
              />
              <button
                onClick={handleAddReleaseNote}
                className="px-3 py-1.5 rounded-xl bg-amber-400/20 text-amber-300 hover:bg-amber-400/30 border border-amber-400/30 text-xs font-bold flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add</span>
              </button>
            </div>
          </div>

          {/* Store Redirect URLs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-emerald-300 block">Google Play Store URL</label>
              <input
                type="text"
                value={config.forceUpdate.playStoreUrl}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    forceUpdate: { ...config.forceUpdate, playStoreUrl: e.target.value },
                  })
                }
                className="w-full px-2.5 py-1.5 rounded-lg bg-black/40 border border-white/15 text-zinc-300 text-[11px] outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-emerald-300 block">Apple App Store URL</label>
              <input
                type="text"
                value={config.forceUpdate.appStoreUrl}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    forceUpdate: { ...config.forceUpdate, appStoreUrl: e.target.value },
                  })
                }
                className="w-full px-2.5 py-1.5 rounded-lg bg-black/40 border border-white/15 text-zinc-300 text-[11px] outline-none"
              />
            </div>
          </div>
        </div>

        {/* Right 5 Cols: Maintenance Mode & Live Broadcast Banner */}
        <div className="lg:col-span-5 space-y-6">
          {/* Maintenance Mode Controller */}
          <div className="bg-[#021812] p-5 rounded-3xl border border-white/10 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-red-400" />
                <div>
                  <h3 className="text-sm font-black text-white">Emergency Maintenance Mode</h3>
                  <span className="text-[10px] text-zinc-400">Halts app traffic during database upgrades</span>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={config.maintenance.enabled}
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      maintenance: { ...config.maintenance, enabled: e.target.checked },
                    })
                  }
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-zinc-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-500"></div>
                <span className="ml-2 text-xs font-bold text-white">
                  {config.maintenance.enabled ? 'ACTIVE' : 'OFF'}
                </span>
              </label>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-[10px] font-bold text-emerald-300 block mb-1">Maintenance Title</label>
                <input
                  type="text"
                  value={config.maintenance.title}
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      maintenance: { ...config.maintenance, title: e.target.value },
                    })
                  }
                  className="w-full px-3 py-1.5 rounded-xl bg-black/40 border border-white/15 text-white text-xs outline-none focus:border-red-400"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-emerald-300 block mb-1">Maintenance Message</label>
                <textarea
                  rows={2}
                  value={config.maintenance.message}
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      maintenance: { ...config.maintenance, message: e.target.value },
                    })
                  }
                  className="w-full px-3 py-1.5 rounded-xl bg-black/40 border border-white/15 text-white text-xs outline-none focus:border-red-400 resize-none"
                />
              </div>
            </div>
          </div>

          {/* Broadcast Announcement Banner */}
          <div className="bg-[#021812] p-5 rounded-3xl border border-white/10 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-amber-400" />
                <div>
                  <h3 className="text-sm font-black text-white">In-App Broadcast Banner</h3>
                  <span className="text-[10px] text-zinc-400">Push notices across all active app screens</span>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={config.announcement.enabled}
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      announcement: { ...config.announcement, enabled: e.target.checked },
                    })
                  }
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-zinc-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                <span className="ml-2 text-xs font-bold text-white">
                  {config.announcement.enabled ? 'LIVE' : 'OFF'}
                </span>
              </label>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-[10px] font-bold text-emerald-300 block mb-1">Banner Type</label>
                <select
                  value={config.announcement.type}
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      announcement: {
                        ...config.announcement,
                        type: e.target.value as any,
                      },
                    })
                  }
                  className="w-full px-3 py-1.5 rounded-xl bg-black/40 border border-white/15 text-white text-xs outline-none focus:border-amber-400"
                >
                  <option value="jummah">Jummah Mubarak Banner</option>
                  <option value="ramadan">Holy Ramadan Notification</option>
                  <option value="info">General Community Announcement</option>
                  <option value="alert">Important Advisory / Moon Sighting Update</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] font-bold text-emerald-300 block mb-1">Announcement Title</label>
                <input
                  type="text"
                  value={config.announcement.title}
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      announcement: { ...config.announcement, title: e.target.value },
                    })
                  }
                  className="w-full px-3 py-1.5 rounded-xl bg-black/40 border border-white/15 text-white text-xs outline-none"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-emerald-300 block mb-1">Message</label>
                <input
                  type="text"
                  value={config.announcement.message}
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      announcement: { ...config.announcement, message: e.target.value },
                    })
                  }
                  className="w-full px-3 py-1.5 rounded-xl bg-black/40 border border-white/15 text-white text-xs outline-none"
                />
              </div>
            </div>
          </div>

          {/* Section: Mobile Device Performance Switches */}
          {config.deviceSettings && (
            <div className="bg-[#021812] p-5 rounded-3xl border border-white/10 shadow-xl space-y-3">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <div className="flex items-center gap-2">
                  <Wifi className="w-4 h-4 text-teal-400" />
                  <h3 className="text-xs font-black text-white">Device Performance & Data Optimization</h3>
                </div>
              </div>

              <div className="space-y-2">
                {[
                  { key: 'enableLowDataMode', label: 'Low Data Bandwidth Mode', desc: 'Compresses streaming audio & reduces media resolution' },
                  { key: 'highAccuracyGPS', label: 'High-Precision GPS Positioning', desc: 'Enables sub-meter Qibla angle accuracy' },
                  { key: 'batterySaverPolling', label: 'Battery Saver Sensor Polling', desc: 'Halts continuous background sensor checks' },
                  { key: 'allowOfflineDownloads', label: 'Allow Offline Surah & Dua Downloads', desc: 'Permits users to save Quran audio for offline use' },
                ].map(({ key, label, desc }) => {
                  const isChecked = (config.deviceSettings as any)[key] ?? false;
                  return (
                    <div
                      key={key}
                      onClick={() => handleToggleDeviceSetting(key as any)}
                      className="flex items-center justify-between p-2 rounded-xl bg-white/5 hover:bg-white/10 cursor-pointer text-xs"
                    >
                      <div className="min-w-0 pr-2">
                        <span className="font-bold text-white block text-[11px]">{label}</span>
                        <span className="text-[10px] text-zinc-400 block">{desc}</span>
                      </div>
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => {}}
                        className="rounded border-white/20 text-amber-500 focus:ring-0"
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Section 2: Remote Feature Flag Kill-Switches (All 24 Features) */}
      <div className="bg-[#021812] p-6 rounded-3xl border border-white/10 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div className="flex items-center gap-2.5">
            <Sliders className="w-5 h-5 text-amber-400" />
            <div>
              <h3 className="text-sm font-black text-white">All 24 Mobile App Feature Switches (Remote Kill-Switches)</h3>
              <p className="text-[11px] text-emerald-300/70">
                Instant toggles to remotely enable, disable, or gate any feature across Android, iOS, and Web clients in real-time.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-mono border border-emerald-400/30">
              {activeCount} / {totalCount} Active
            </span>
            <button
              onClick={() => handleToggleAllFeatures(true)}
              className="px-2.5 py-1 rounded-xl bg-white/5 hover:bg-white/10 text-emerald-200 text-[10px] font-bold border border-white/10 cursor-pointer"
            >
              Enable All
            </button>
            <button
              onClick={() => handleToggleAllFeatures(false)}
              className="px-2.5 py-1 rounded-xl bg-white/5 hover:bg-white/10 text-red-300 text-[10px] font-bold border border-white/10 cursor-pointer"
            >
              Disable All
            </button>
          </div>
        </div>

        {/* Feature Filters & Search */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
            {[
              { id: 'all', label: 'All 24 Features' },
              { id: 'core', label: 'Core & Quran' },
              { id: 'spiritual', label: 'Spiritual & AI' },
              { id: 'guidance', label: 'Life Guides' },
              { id: 'community', label: 'Giving & Community' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setFeatureCategory(cat.id as any)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  featureCategory === cat.id
                    ? 'bg-amber-500 text-emerald-950 shadow'
                    : 'bg-black/40 text-emerald-300 hover:text-white border border-white/10'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search feature kill-switch..."
              value={featureSearch}
              onChange={(e) => setFeatureSearch(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-black/40 border border-white/15 text-white text-xs outline-none focus:border-amber-400"
            />
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-2">
          {filteredFeatures.map(({ key, label, desc, icon: Icon }) => {
            const isEnabled = (config.features as any)[key] ?? true;
            return (
              <div
                key={key}
                onClick={() => handleToggleFeature(key as any)}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-start justify-between gap-3 ${
                  isEnabled
                    ? 'bg-emerald-950/40 border-emerald-500/40 hover:border-emerald-400/60 shadow-lg'
                    : 'bg-black/40 border-white/10 opacity-60 hover:opacity-80'
                }`}
              >
                <div className="flex items-start gap-2.5 min-w-0">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                    isEnabled ? 'bg-amber-400/20 text-amber-300' : 'bg-white/5 text-zinc-400'
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-white truncate">{label}</div>
                    <div className="text-[10px] text-emerald-300/70 truncate mt-0.5">{desc}</div>
                  </div>
                </div>

                <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-[10px] font-bold transition-all ${
                  isEnabled ? 'bg-emerald-500 text-emerald-950' : 'bg-zinc-800 text-zinc-500'
                }`}>
                  {isEnabled ? '✓' : '✕'}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
