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
  ArrowUpRight
} from 'lucide-react';
import { AppRemoteConfig } from '../../app/api/app-config/route';

export const AppControlModule: React.FC = () => {
  const [config, setConfig] = useState<AppRemoteConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

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
        setSuccessMsg('Remote App Configuration updated and synchronized instantly!');
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
              <h2 className="text-lg font-black text-white tracking-tight">Mobile App Feature Control & Force Update</h2>
              <p className="text-xs text-emerald-300/70">
                Remotely control Play Store builds, force updates, feature flags, and emergency maintenance in real-time.
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
            <span>{saving ? 'Publishing...' : 'Save & Publish Live'}</span>
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
              <h3 className="text-sm font-black text-white">Google Play & App Store Force Update</h3>
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
                Minimum Required Build Number (Version Code)
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
                App versions below this code MUST update before opening.
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
                Update Dialog Title
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
                Update Message / Prompt to User
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
                placeholder="Add release note item (e.g. New offline audio mode)..."
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
                <h3 className="text-sm font-black text-white">Emergency Maintenance</h3>
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

            <p className="text-[11px] text-emerald-300/70">
              When active, the app displays a full-screen maintenance message and temporarily halts API requests.
            </p>

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
                <h3 className="text-sm font-black text-white">In-App Broadcast Banner</h3>
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
                  <option value="alert">Important Advisory / Sighting Update</option>
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
        </div>
      </div>

      {/* Section 2: Remote Feature Flag Toggles */}
      <div className="bg-[#021812] p-6 rounded-3xl border border-white/10 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2.5">
            <Sliders className="w-5 h-5 text-amber-400" />
            <div>
              <h3 className="text-sm font-black text-white">Dynamic Remote Feature Flags (Kill Switches)</h3>
              <p className="text-[11px] text-emerald-300/70">
                Instant toggles to enable or disable specific features across iOS, Android, and Web without waiting for App Store reviews.
              </p>
            </div>
          </div>

          <span className="text-[11px] px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-mono border border-emerald-400/30">
            {Object.values(config.features).filter(Boolean).length} / {Object.keys(config.features).length} Active
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-2">
          {[
            { key: 'enableQuranAudio', label: 'Noble Quran Audio Recitations', desc: 'Sheikh Alafasy, Sudais & Ghamdi audio streams', icon: Volume2 },
            { key: 'enableAiAssistant', label: 'Islamic AI Guidance Assistant', desc: 'GPT-powered Quranic and Hadith answers', icon: Sparkles },
            { key: 'enablePushNotifications', label: 'Push Notifications & Adhan Alerts', desc: 'Firebase FCM prayer time reminders', icon: Bell },
            { key: 'enableZiyaratAudioGuides', label: 'Ziyarat GPS & Shrine Audio Guides', desc: 'Interactive shrine coordinates and audio', icon: Compass },
            { key: 'enableDonations', label: 'Zakat & Sadaqah Donation Channels', desc: 'Verified charity links and Nisab calculator', icon: Heart },
            { key: 'enableLiveMedia', label: '24/7 Makkah & Madinah Live Broadcasts', desc: 'Live Islamic video feeds and broadcasts', icon: Play },
            { key: 'enableFatwaSearch', label: 'Fatwa & Unified Islamic Search', desc: 'Cross-catalog search across Quran and Hadith', icon: BookOpen },
            { key: 'enableAdhanAlarms', label: 'Local Adhan Alarm System', desc: 'Device-level background alarm scheduling', icon: Bell },
            { key: 'enableCommunityDuas', label: 'Community Duas & Prayer Requests', desc: 'Collective Ameen wall and supplications', icon: Heart },
            { key: 'enableTravelMode', label: 'NOOR Travel Mode & Qasr Calculations', desc: '77km Safar limit & Halal navigation', icon: Globe2 },
          ].map(({ key, label, desc, icon: Icon }) => {
            const isEnabled = (config.features as any)[key] ?? true;
            return (
              <div
                key={key}
                onClick={() => handleToggleFeature(key as any)}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-start justify-between gap-3 ${
                  isEnabled
                    ? 'bg-emerald-950/40 border-emerald-500/40 hover:border-emerald-400/60'
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

                <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-[10px] font-bold ${
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
