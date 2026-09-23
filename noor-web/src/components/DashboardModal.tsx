'use client';

// ============================================================
// NOOR Web — Complete Analytics, Customization & CMS Dashboard
// ============================================================

import React, { useState } from 'react';
import {
  X,
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
  ShieldCheck
} from 'lucide-react';

interface DashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedMethod: string;
  onMethodChange: (method: string) => void;
  asrFactor: number;
  onAsrFactorChange: (factor: number) => void;
}

export const DashboardModal: React.FC<DashboardModalProps> = ({
  isOpen,
  onClose,
  selectedMethod,
  onMethodChange,
  asrFactor,
  onAsrFactorChange,
}) => {
  const [activeTab, setActiveTab] = useState<'analytics' | 'customization' | 'cms'>('analytics');
  const [timeRange, setTimeRange] = useState<'today' | '7d' | '30d' | '1y'>('7d');

  // Customization state
  const [themeHue, setThemeHue] = useState<'emerald' | 'gold' | 'sapphire' | 'obsidian'>('emerald');
  const [blurAmount, setBlurAmount] = useState(28);
  const [glassOpacity, setGlassOpacity] = useState(55);
  const [adhanVoice, setAdhanVoice] = useState('makkah');
  const [enablePixabay, setEnablePixabay] = useState(true);
  const [enableAi, setEnableAi] = useState(true);
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

  if (!isOpen) return null;

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
      date: new Date().toISOString().split('T')[0]
    };

    setArticles([newArt, ...articles]);
    setArtTitle('');
    setShowAddArticle(false);
  };

  const handleDeleteArticle = (id: string) => {
    setArticles(articles.filter(a => a.id !== id));
  };

  const handleSaveCustomization = () => {
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-2xl p-3 sm:p-6 animate-in fade-in">
      <div className="liquid-glass rounded-[2.5rem] w-full max-w-6xl h-[90vh] flex flex-col shadow-2xl overflow-hidden border border-white/20">
        {/* Header with Navigation Pills */}
        <div className="px-6 py-4 border-b border-white/10 flex flex-wrap items-center justify-between gap-4 bg-black/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-400 to-emerald-600 flex items-center justify-center font-black text-emerald-950 shadow-md">
              <BarChart3 className="w-5 h-5 text-emerald-950" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-black text-white">NOOR Control Center</h3>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-bold border border-amber-500/40">
                  ENTERPRISE
                </span>
              </div>
              <p className="text-xs text-emerald-300/70">
                Complete Real-Time Traffic Analytics, Customization Engine & CMS
              </p>
            </div>
          </div>

          {/* Tab Switcher Pills */}
          <div className="flex items-center bg-black/40 p-1.5 rounded-full border border-white/10 text-xs font-semibold">
            <button
              onClick={() => setActiveTab('analytics')}
              className={`px-4 py-1.5 rounded-full flex items-center gap-1.5 transition-all ${
                activeTab === 'analytics'
                  ? 'bg-amber-500 text-emerald-950 font-black shadow-md'
                  : 'text-emerald-200 hover:text-white'
              }`}
            >
              <Activity className="w-3.5 h-3.5" />
              <span>Traffic & Analytics</span>
            </button>

            <button
              onClick={() => setActiveTab('customization')}
              className={`px-4 py-1.5 rounded-full flex items-center gap-1.5 transition-all ${
                activeTab === 'customization'
                  ? 'bg-amber-500 text-emerald-950 font-black shadow-md'
                  : 'text-emerald-200 hover:text-white'
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Customization</span>
            </button>

            <button
              onClick={() => setActiveTab('cms')}
              className={`px-4 py-1.5 rounded-full flex items-center gap-1.5 transition-all ${
                activeTab === 'cms'
                  ? 'bg-amber-500 text-emerald-950 font-black shadow-md'
                  : 'text-emerald-200 hover:text-white'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>CMS & Articles</span>
            </button>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-emerald-200 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* ====================================================
              1. COMPLETE TRAFFIC & ANALYTICS TAB
             ==================================================== */}
          {activeTab === 'analytics' && (
            <div className="space-y-6">
              {/* Top Live Stats Bar */}
              <div className="flex flex-wrap items-center justify-between gap-4 bg-[#031c15]/90 p-4 rounded-3xl border border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
                  <div>
                    <span className="text-xs text-emerald-300/70 font-semibold block">Active Online Pilgrims</span>
                    <span className="text-2xl font-black text-white font-mono">1,842 Muslims Online</span>
                  </div>
                </div>

                <div className="flex items-center gap-1 bg-black/40 p-1 rounded-2xl border border-white/10 text-xs">
                  {(['today', '7d', '30d', '1y'] as const).map(t => (
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

              {/* KPI Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { title: 'Total Visits', val: '2,481,920', trend: '+24.6%', desc: 'Unique IPs this period' },
                  { title: 'Prayer Calculations', val: '14,892,100', trend: '+31.2%', desc: 'Astronomical API calls' },
                  { title: 'Quran Streaming', val: '942,600 hrs', trend: '+18.4%', desc: 'Alafasy, Sudais, Basit' },
                  { title: 'Avg. Daily Session', val: '18m 42s', trend: '+8.1%', desc: 'High spiritual engagement' },
                ].map((kpi, idx) => (
                  <div key={idx} className="liquid-glass rounded-3xl p-5 border border-white/10">
                    <span className="text-xs font-semibold text-emerald-300/70">{kpi.title}</span>
                    <div className="text-2xl sm:text-3xl font-black text-white font-mono my-1 tracking-tight">
                      {kpi.val}
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-emerald-400/90 font-semibold">
                      <span className="flex items-center gap-0.5 text-amber-400">
                        <TrendingUp className="w-3 h-3" /> {kpi.trend}
                      </span>
                      <span className="text-emerald-300/50">{kpi.desc}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Traffic Chart Visualization (SVG Interactive Liquid Mesh Chart) */}
              <div className="liquid-glass rounded-3xl p-6 border border-white/10">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="text-sm font-black text-white flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-amber-400" />
                      Global Traffic & Daily Worship Activity Trends
                    </h4>
                    <p className="text-xs text-emerald-300/60 mt-0.5">Page views and prayer time requests (thousands)</p>
                  </div>
                  <span className="text-xs font-mono font-bold text-amber-300 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/30">
                    Live Telemetry
                  </span>
                </div>

                {/* SVG Visual Smooth Liquid Wave Graph */}
                <div className="h-44 w-full relative pt-2">
                  <svg className="w-full h-full overflow-visible" viewBox="0 0 700 140" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#059669" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>
                    {/* Area */}
                    <path
                      d="M0,110 Q100,50 200,80 T400,40 T550,70 T700,20 L700,140 L0,140 Z"
                      fill="url(#chartGrad)"
                    />
                    {/* Line */}
                    <path
                      d="M0,110 Q100,50 200,80 T400,40 T550,70 T700,20"
                      fill="none"
                      stroke="#f59e0b"
                      strokeWidth="3"
                    />
                    {/* Data Points */}
                    {[
                      { cx: 0, cy: 110 },
                      { cx: 100, cy: 65 },
                      { cx: 200, cy: 80 },
                      { cx: 300, cy: 55 },
                      { cx: 400, cy: 40 },
                      { cx: 550, cy: 70 },
                      { cx: 700, cy: 20 },
                    ].map((pt, i) => (
                      <circle key={i} cx={pt.cx} cy={pt.cy} r="4.5" fill="#fde68a" stroke="#02140f" strokeWidth="2" />
                    ))}
                  </svg>
                  <div className="flex justify-between text-[11px] text-emerald-300/60 font-mono mt-2 pt-2 border-t border-white/10">
                    <span>Mon</span>
                    <span>Tue</span>
                    <span>Wed</span>
                    <span>Thu</span>
                    <span>Fri (Jummah Peak)</span>
                    <span>Sat</span>
                    <span>Sun</span>
                  </div>
                </div>
              </div>

              {/* Geographical & Feature Breakdown Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Geographic Ummah Traffic */}
                <div className="liquid-glass rounded-3xl p-6 border border-white/10">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2 mb-4">
                    <Globe2 className="w-4 h-4 text-emerald-400" />
                    Top Geographical Ummah Visitors
                  </h4>
                  <div className="space-y-3 text-xs">
                    {[
                      { country: 'Indonesia', pct: '28%', flag: '🇮🇩' },
                      { country: 'Pakistan', pct: '19%', flag: '🇵🇰' },
                      { country: 'Egypt', pct: '14%', flag: '🇪🇬' },
                      { country: 'Saudi Arabia', pct: '12%', flag: '🇸🇦' },
                      { country: 'United Kingdom', pct: '8%', flag: '🇬🇧' },
                      { country: 'United States', pct: '7%', flag: '🇺🇸' },
                      { country: 'India & Malaysia', pct: '12%', flag: '🌐' },
                    ].map((geo, idx) => (
                      <div key={idx} className="space-y-1">
                        <div className="flex justify-between font-semibold text-emerald-100">
                          <span>{geo.flag} {geo.country}</span>
                          <span className="font-mono text-amber-300">{geo.pct}</span>
                        </div>
                        <div className="w-full h-1.5 rounded-full bg-black/40 overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-emerald-500 to-amber-400 rounded-full"
                            style={{ width: geo.pct }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Platform & Feature Usage */}
                <div className="liquid-glass rounded-3xl p-6 border border-white/10 flex flex-col justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-white flex items-center gap-2 mb-4">
                      <Layers className="w-4 h-4 text-amber-400" />
                      Feature Usage Breakdown
                    </h4>
                    <div className="space-y-3 text-xs">
                      {[
                        { feature: 'Astronomical Prayer Times & Azan', val: '44%' },
                        { feature: 'Quran Browsing & Audio Recitations', val: '28%' },
                        { feature: 'Duas & Interactive Digital Tasbih', val: '14%' },
                        { feature: 'Qibla Spherical Compass', val: '8%' },
                        { feature: 'Noor AI & Media Gallery', val: '6%' },
                      ].map((item, idx) => (
                        <div key={idx} className="space-y-1">
                          <div className="flex justify-between font-semibold text-emerald-100">
                            <span>{item.feature}</span>
                            <span className="font-mono text-emerald-300">{item.val}</span>
                          </div>
                          <div className="w-full h-1.5 rounded-full bg-black/40 overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-amber-400 to-emerald-400 rounded-full"
                              style={{ width: item.val }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/10 mt-4 flex justify-between text-xs text-emerald-300/70">
                    <span>Mobile: 68%</span>
                    <span>Desktop: 24%</span>
                    <span>Tablet: 8%</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ====================================================
              2. COMPLETE CUSTOMIZATION ENGINE TAB
             ==================================================== */}
          {activeTab === 'customization' && (
            <div className="space-y-6 max-w-4xl mx-auto">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-lg font-black text-white">Visual & Engine Customization</h4>
                  <p className="text-xs text-emerald-300/70">Tailor liquid glass styling, prayer calculation rules, and audio sounds</p>
                </div>

                <button
                  onClick={handleSaveCustomization}
                  className="px-5 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-emerald-950 font-black text-xs shadow-lg flex items-center gap-1.5 transition-all"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{saveSuccess ? 'Changes Applied!' : 'Save Preferences'}</span>
                </button>
              </div>

              {/* Visual Theme Liquid Accent */}
              <div className="liquid-glass rounded-3xl p-6 border border-white/10 space-y-4">
                <label className="block text-xs font-bold text-amber-300 uppercase tracking-wider">
                  Liquid Glass Accent Palette
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { id: 'emerald', name: 'Emerald Oasis', color: 'from-emerald-500 to-teal-800' },
                    { id: 'gold', name: 'Imperial Gold', color: 'from-amber-400 to-amber-700' },
                    { id: 'sapphire', name: 'Deep Sapphire', color: 'from-blue-500 to-cyan-800' },
                    { id: 'obsidian', name: 'Midnight Obsidian', color: 'from-zinc-400 to-zinc-800' },
                  ].map(theme => (
                    <button
                      key={theme.id}
                      onClick={() => setThemeHue(theme.id as any)}
                      className={`p-3 rounded-2xl border text-left transition-all ${
                        themeHue === theme.id
                          ? 'border-amber-400 bg-white/10 ring-2 ring-amber-400/40 font-bold'
                          : 'border-white/10 bg-black/30 text-emerald-100 hover:bg-white/5'
                      }`}
                    >
                      <div className={`w-full h-8 rounded-xl bg-gradient-to-r ${theme.color} mb-2`} />
                      <span className="text-xs font-bold block text-white">{theme.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Sliders: Blur & Opacity */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="liquid-glass rounded-3xl p-6 border border-white/10">
                  <div className="flex justify-between text-xs font-bold mb-2">
                    <span className="text-emerald-200">Backdrop Blur Strength</span>
                    <span className="text-amber-400 font-mono">{blurAmount}px</span>
                  </div>
                  <input
                    type="range"
                    min="12"
                    max="48"
                    value={blurAmount}
                    onChange={(e) => setBlurAmount(Number(e.target.value))}
                    className="w-full accent-amber-400"
                  />
                  <span className="text-[10px] text-emerald-300/60 mt-1 block">Fluid multi-layered refraction</span>
                </div>

                <div className="liquid-glass rounded-3xl p-6 border border-white/10">
                  <div className="flex justify-between text-xs font-bold mb-2">
                    <span className="text-emerald-200">Liquid Surface Opacity</span>
                    <span className="text-amber-400 font-mono">{glassOpacity}%</span>
                  </div>
                  <input
                    type="range"
                    min="20"
                    max="85"
                    value={glassOpacity}
                    onChange={(e) => setGlassOpacity(Number(e.target.value))}
                    className="w-full accent-amber-400"
                  />
                  <span className="text-[10px] text-emerald-300/60 mt-1 block">Translucency depth level</span>
                </div>
              </div>

              {/* Engine Overrides: Calculation Method & Asr Madhab */}
              <div className="liquid-glass rounded-3xl p-6 border border-white/10 space-y-4">
                <h5 className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                  Global Astronomical Calculation Settings
                </h5>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-emerald-200 mb-1">Calculation Method</label>
                    <select
                      value={selectedMethod}
                      onChange={(e) => onMethodChange(e.target.value)}
                      className="w-full bg-[#031712] border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                    >
                      <option value="MWL">Muslim World League (Fajr 18°, Isha 17°)</option>
                      <option value="ISNA">Islamic Society of North America (15°/15°)</option>
                      <option value="Makkah">Umm Al-Qura, Makkah (18.5° / 90 min)</option>
                      <option value="Egypt">Egyptian General Authority (19.5° / 17.5°)</option>
                      <option value="Karachi">Univ. of Islamic Sciences, Karachi (18° / 18°)</option>
                      <option value="Dubai">Dubai Unified Prayer Times (18.2° / 18.2°)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-emerald-200 mb-1">Asr School (Shadow Ratio)</label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => onAsrFactorChange(1)}
                        className={`py-2 rounded-xl text-xs font-semibold border transition-all ${
                          asrFactor === 1
                            ? 'bg-amber-500 text-emerald-950 font-bold border-amber-400'
                            : 'bg-black/30 border-white/10 text-emerald-200'
                        }`}
                      >
                        Standard (1x)
                      </button>
                      <button
                        type="button"
                        onClick={() => onAsrFactorChange(2)}
                        className={`py-2 rounded-xl text-xs font-semibold border transition-all ${
                          asrFactor === 2
                            ? 'bg-amber-500 text-emerald-950 font-bold border-amber-400'
                            : 'bg-black/30 border-white/10 text-emerald-200'
                        }`}
                      >
                        Hanafi (2x)
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Audio Adhan Preference */}
              <div className="liquid-glass rounded-3xl p-6 border border-white/10 space-y-3">
                <label className="block text-xs font-bold text-amber-300 uppercase tracking-wider">
                  Adhan Audio & Reciter Voice
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { id: 'makkah', title: 'Makkah Al-Mukarramah', sub: 'Masjid Al-Haram Muazzin' },
                    { id: 'madinah', title: 'Madinah Al-Munawwarah', sub: 'Masjid An-Nabawi Muazzin' },
                    { id: 'alafasy', title: 'Mishary Rashid Alafasy', sub: 'Renowned Kuwaiti Reciter' },
                  ].map(voice => (
                    <button
                      key={voice.id}
                      onClick={() => setAdhanVoice(voice.id)}
                      className={`p-3 rounded-2xl border text-left transition-all ${
                        adhanVoice === voice.id
                          ? 'bg-amber-500/20 border-amber-400 text-amber-300 font-bold'
                          : 'bg-black/30 border-white/10 text-emerald-100 hover:bg-white/5'
                      }`}
                    >
                      <span className="text-xs font-bold block">{voice.title}</span>
                      <span className="text-[10px] text-emerald-300/60 block mt-0.5">{voice.sub}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Feature Toggles */}
              <div className="liquid-glass rounded-3xl p-6 border border-white/10 space-y-3">
                <h5 className="text-xs font-bold text-amber-300 uppercase tracking-wider mb-2">
                  Ummah Experience Toggles
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="flex items-center justify-between p-3 rounded-2xl bg-black/30 border border-white/10">
                    <div>
                      <span className="font-bold text-white block">Pixabay Media Gateway</span>
                      <span className="text-[10px] text-emerald-300/60">Live curated Islamic photos & 4K videos</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={enablePixabay}
                      onChange={(e) => setEnablePixabay(e.target.checked)}
                      className="w-4 h-4 accent-amber-400"
                    />
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-2xl bg-black/30 border border-white/10">
                    <div>
                      <span className="font-bold text-white block">Noor AI Assistant</span>
                      <span className="text-[10px] text-emerald-300/60">24/7 authentic Quran & Sunnah guidance</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={enableAi}
                      onChange={(e) => setEnableAi(e.target.checked)}
                      className="w-4 h-4 accent-amber-400"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ====================================================
              3. COMPLETE CMS & CONTENT MANAGEMENT TAB
             ==================================================== */}
          {activeTab === 'cms' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-lg font-black text-white">Islamic CMS & Content Repository</h4>
                  <p className="text-xs text-emerald-300/70">Publish articles, tafsir commentaries, and verified du'as</p>
                </div>

                <button
                  onClick={() => setShowAddArticle(true)}
                  className="px-4 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-emerald-950 font-black text-xs flex items-center gap-1.5 shadow-md"
                >
                  <Plus className="w-4 h-4" />
                  <span>Publish Article</span>
                </button>
              </div>

              {/* Articles Table */}
              <div className="liquid-glass rounded-3xl border border-white/15 overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-black/40 text-emerald-300/80 uppercase text-[10px] tracking-wider border-b border-white/10">
                    <tr>
                      <th className="p-4">Title</th>
                      <th className="p-4">Category</th>
                      <th className="p-4">Author</th>
                      <th className="p-4">Status</th>
                      <th className="p-4">Reads</th>
                      <th className="p-4">Date</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10">
                    {articles.map((art) => (
                      <tr key={art.id} className="hover:bg-white/5 transition-colors">
                        <td className="p-4 font-bold text-white max-w-xs truncate">{art.title}</td>
                        <td className="p-4 text-emerald-200">{art.category}</td>
                        <td className="p-4 text-emerald-300/80">{art.author}</td>
                        <td className="p-4">
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                            art.status === 'Published'
                              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                              : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                          }`}>
                            {art.status}
                          </span>
                        </td>
                        <td className="p-4 font-mono text-amber-300">{art.views}</td>
                        <td className="p-4 font-mono text-emerald-400/70">{art.date}</td>
                        <td className="p-4 text-right">
                          <button
                            onClick={() => handleDeleteArticle(art.id)}
                            className="p-1.5 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
                            title="Delete Article"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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
                          className="px-4 py-2 rounded-xl text-xs font-semibold text-emerald-300 hover:text-white"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-emerald-950 font-bold text-xs"
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
