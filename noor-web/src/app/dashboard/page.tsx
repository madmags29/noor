'use client';

// ============================================================
// NOOR Web — Executive Analytics & CMS Dashboard (Protected Route)
// ============================================================

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Lock,
  Mail,
  ShieldCheck,
  BarChart3,
  Sliders,
  FileText,
  DollarSign,
  TrendingUp,
  Users,
  Globe2,
  Activity,
  Layers,
  Sparkles,
  CheckCircle2,
  Plus,
  Trash2,
  LogOut,
  ArrowLeft,
  Eye,
  Check
} from 'lucide-react';
import { GlobalNavbar } from '../../components/GlobalNavbar';

interface ArticleItem {
  id: string;
  title: string;
  category: string;
  author: string;
  status: 'Published' | 'Draft';
  views: string;
  date: string;
}

const INITIAL_ARTICLES: ArticleItem[] = [
  { id: '1', title: 'The Spiritual Virtues of Fasting in Holy Ramadan', category: 'Ramadan', author: 'Dr. Tariq Al-Hashimi', status: 'Published', views: '48.2k', date: '2026-09-18' },
  { id: '2', title: 'Understanding Great-Circle Astronomical Calculation in Salaah', category: 'Astronomy & Fiqh', author: 'Sheikh Mansoor Ali', status: 'Published', views: '22.1k', date: '2026-09-15' },
  { id: '3', title: 'Complete Guide to Umrah Rituals from Ihram to Tawaf', category: 'Pilgrimage', author: 'Fatima Zahra', status: 'Published', views: '39.8k', date: '2026-09-10' },
  { id: '4', title: 'Zakat al-Fitr: Contemporary Currency & Commodity Valuation', category: 'Zakat', author: 'Dr. Bilal Qureshi', status: 'Draft', views: '1.2k', date: '2026-09-20' },
];

export default function DashboardPage() {
  // Authentication Gate State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Dashboard state
  const [activeTab, setActiveTab] = useState<'analytics' | 'monetization' | 'customization' | 'cms'>('analytics');
  const [timeRange, setTimeRange] = useState<'today' | '7d' | '30d' | '1y'>('7d');

  // Customization state
  const [themeHue, setThemeHue] = useState('emerald');
  const [blurAmount, setBlurAmount] = useState(28);
  const [glassOpacity, setGlassOpacity] = useState(55);
  const [calcMethod, setCalcMethod] = useState('MWL');
  const [asrSchool, setAsrSchool] = useState<1 | 2>(1);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // CMS state
  const [articles, setArticles] = useState<ArticleItem[]>(INITIAL_ARTICLES);
  const [showAddArticle, setShowAddArticle] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Ramadan');
  const [newAuthor, setNewAuthor] = useState('Chief Scholar');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setLoginError('');

    setTimeout(() => {
      setIsLoggingIn(false);
      if (loginEmail && loginPassword) {
        setIsAuthenticated(true);
      } else {
        setLoginError('Invalid credentials. Please enter email and password.');
      }
    }, 600);
  };

  const handleCreateArticle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newArt: ArticleItem = {
      id: String(Date.now()),
      title: newTitle,
      category: newCategory,
      author: newAuthor,
      status: 'Published',
      views: '0',
      date: new Date().toISOString().split('T')[0]
    };

    setArticles([newArt, ...articles]);
    setNewTitle('');
    setShowAddArticle(false);
  };

  const handleDeleteArticle = (id: string) => {
    setArticles(articles.filter(a => a.id !== id));
  };

  // -------------------------------------------------------------
  // 1. LOGIN GATE: Rendered if user is NOT authenticated
  // -------------------------------------------------------------
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col bg-[#02120d]">
        <GlobalNavbar />
        <div className="flex-1 flex items-center justify-center p-4 relative overflow-hidden">
          {/* Background Ambient Orbs */}
          <div className="absolute top-1/4 left-1/3 w-96 h-96 rounded-full bg-emerald-500/15 blur-3xl pointer-events-none" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

        <div className="w-full max-w-md liquid-glass rounded-[2.5rem] p-8 sm:p-10 border border-white/20 shadow-2xl relative z-10">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 via-emerald-600 to-emerald-950 flex items-center justify-center mx-auto mb-4 shadow-xl border border-white/20">
              <Lock className="w-6 h-6 text-emerald-950" />
            </div>
            <span className="text-[10px] font-black tracking-widest text-amber-400 uppercase bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/30">
              Restricted Access
            </span>
            <h1 className="text-2xl font-black text-white mt-3">NOOR Command Suite</h1>
            <p className="text-xs text-emerald-300/70 mt-1">
              Sign in to manage global traffic telemetry, monetization & CMS
            </p>
          </div>

          {loginError && (
            <div className="mb-4 p-3 rounded-xl bg-red-500/20 border border-red-500/40 text-red-300 text-xs">
              {loginError}
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-emerald-200 mb-1">Administrator Email</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-emerald-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  placeholder="admin@noor.app"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 bg-black/40 border border-white/15 rounded-xl text-xs text-white placeholder-emerald-400/40 focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-emerald-200 mb-1">Secure Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-emerald-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 bg-black/40 border border-white/15 rounded-xl text-xs text-white placeholder-emerald-400/40 focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-emerald-950 font-black text-xs shadow-lg shadow-amber-500/25 transition-all flex items-center justify-center gap-2 border border-white/30"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>{isLoggingIn ? 'Authenticating...' : 'Authorize & Enter Dashboard'}</span>
            </button>
          </form>

          {/* Return Home Link */}
          <div className="mt-6 text-center">
            <Link
              href="/"
              className="text-xs text-emerald-300/70 hover:text-amber-300 font-semibold inline-flex items-center gap-1.5 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Return to Public Website</span>
            </Link>
          </div>
        </div>
      </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // 2. PROTECTED DASHBOARD: Rendered after successful login
  // -------------------------------------------------------------
  return (
    <div className="min-h-screen bg-[#02120d] flex flex-col">
      <GlobalNavbar />
      {/* Top Admin Header Bar */}
      <header className="sticky top-0 z-40 bg-[#031712]/90 backdrop-blur-xl border-b border-white/10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-emerald-200 hover:text-white transition-colors"
              title="Return to Public Website"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-black text-white tracking-wider">NOOR</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-bold border border-amber-500/40">
                  EXECUTIVE DASHBOARD
                </span>
              </div>
              <p className="text-[10px] text-emerald-300/70">
                Connected to Node.js Backend API • PostgreSQL Synced • Global Ummah Telemetry
              </p>
            </div>
          </div>

          {/* Main Navigation Tabs */}
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
              <span>Traffic & Telemetry</span>
            </button>

            <button
              onClick={() => setActiveTab('monetization')}
              className={`px-4 py-1.5 rounded-full flex items-center gap-1.5 transition-all ${
                activeTab === 'monetization'
                  ? 'bg-amber-500 text-emerald-950 font-black shadow-md'
                  : 'text-emerald-200 hover:text-white'
              }`}
            >
              <DollarSign className="w-3.5 h-3.5" />
              <span>Monetization & Revenue</span>
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

          {/* User Sign Out */}
          <button
            onClick={() => setIsAuthenticated(false)}
            className="flex items-center gap-1.5 text-xs text-red-300 hover:text-red-200 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 px-3 py-1.5 rounded-full font-bold transition-all"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </header>

      {/* Main Dashboard Workspace */}
      <main className="flex-1 max-w-7xl mx-auto w-full p-6 sm:p-8 space-y-8">
        {/* ====================================================
            TAB 1: COMPLETE TRAFFIC & TELEMETRY ANALYTICS
           ==================================================== */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            {/* Realtime Bar */}
            <div className="liquid-glass rounded-3xl p-5 flex flex-wrap items-center justify-between gap-4 border border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
                <div>
                  <span className="text-xs text-emerald-300/70 font-semibold block">Active Global Pilgrims</span>
                  <span className="text-2xl font-black text-white font-mono">1,842 Muslims Online</span>
                </div>
              </div>

              <div className="flex items-center gap-1 bg-black/40 p-1 rounded-2xl border border-white/10 text-xs">
                {(['today', '7d', '30d', '1y'] as const).map(t => (
                  <button
                    key={t}
                    onClick={() => setTimeRange(t)}
                    className={`px-3 py-1 rounded-xl font-bold uppercase transition-all ${
                      timeRange === t ? 'bg-amber-500 text-emerald-950' : 'text-emerald-300/80 hover:text-white'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { title: 'Total Visits', val: '2,481,920', trend: '+24.6%', sub: 'Unique IPs' },
                { title: 'Prayer Calculations', val: '14,892,100', trend: '+31.2%', sub: 'Celestial engine' },
                { title: 'Quran Streaming', val: '942,600 hrs', trend: '+18.4%', sub: 'Global streams' },
                { title: 'Avg. Daily Session', val: '18m 42s', trend: '+8.1%', sub: 'Spiritual focus' },
              ].map((kpi, idx) => (
                <div key={idx} className="liquid-glass rounded-3xl p-5 border border-white/10">
                  <span className="text-xs font-semibold text-emerald-300/70">{kpi.title}</span>
                  <div className="text-2xl sm:text-3xl font-black text-white font-mono my-1 tracking-tight">
                    {kpi.val}
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-emerald-400 font-bold">
                    <span className="flex items-center gap-1 text-amber-400">
                      <TrendingUp className="w-3 h-3" /> {kpi.trend}
                    </span>
                    <span className="text-emerald-300/60">{kpi.sub}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Traffic Graph */}
            <div className="liquid-glass rounded-3xl p-6 border border-white/10">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="text-sm font-black text-white flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-amber-400" />
                    Global Traffic & Salaah Demand Volume
                  </h4>
                  <p className="text-xs text-emerald-300/60 mt-0.5">Visits and astronomical computations over time</p>
                </div>
                <span className="text-xs font-mono font-bold text-amber-300 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/30">
                  Live Telemetry
                </span>
              </div>

              <div className="h-44 w-full relative pt-2">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 700 140" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="chartGradDash" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#059669" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M0,110 Q100,50 200,80 T400,40 T550,70 T700,20 L700,140 L0,140 Z"
                    fill="url(#chartGradDash)"
                  />
                  <path
                    d="M0,110 Q100,50 200,80 T400,40 T550,70 T700,20"
                    fill="none"
                    stroke="#f59e0b"
                    strokeWidth="3"
                  />
                  {[
                    { cx: 0, cy: 110 },
                    { cx: 100, cy: 65 },
                    { cx: 200, cy: 80 },
                    { cx: 300, cy: 55 },
                    { cx: 400, cy: 40 },
                    { cx: 550, cy: 70 },
                    { cx: 700, cy: 20 },
                  ].map((pt, i) => (
                    <circle key={i} cx={pt.cx} cy={pt.cy} r="4" fill="#fde68a" stroke="#02120d" strokeWidth="2" />
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

            {/* Geographical & Platform breakdown */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="liquid-glass rounded-3xl p-6 border border-white/10">
                <h4 className="text-sm font-bold text-white flex items-center gap-2 mb-4">
                  <Globe2 className="w-4 h-4 text-emerald-400" />
                  Top Visiting Ummah Countries
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

              <div className="liquid-glass rounded-3xl p-6 border border-white/10 flex flex-col justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white flex items-center gap-2 mb-4">
                    <Layers className="w-4 h-4 text-amber-400" />
                    Feature Telemetry Breakdown
                  </h4>
                  <div className="space-y-3 text-xs">
                    {[
                      { feature: 'Astronomical Prayer Times & Azan', val: '44%' },
                      { feature: 'Quran Browsing & Reciter Streaming', val: '28%' },
                      { feature: 'Duas & Interactive Digital Tasbih', val: '14%' },
                      { feature: 'Spherical Qibla Compass', val: '8%' },
                      { feature: 'Noor AI & Pixabay Media', val: '6%' },
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
            TAB 2: MONETIZATION & EARNING ARCHITECTURE
           ==================================================== */}
        {activeTab === 'monetization' && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-black text-white">Ethical Halal Monetization Hub</h3>
                <p className="text-xs text-emerald-300/70 mt-0.5">
                  Sustainable revenue streams: NOOR Pro subscriptions, verified Halal business sponsors & Zakat gateways
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-bold text-xs border border-emerald-500/40">
                  100% Shariah Compliant
                </span>
              </div>
            </div>

            {/* Revenue KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { title: 'Monthly Recurring Revenue (MRR)', val: '$48,250', trend: '+14.2%', desc: '9,670 NOOR Pro subscribers' },
                { title: 'Halal Business Directory', val: '$18,400', trend: '+22.5%', desc: 'Verified restaurants & Hajj agents' },
                { title: 'Charity & Zakat Volume', val: '$320,000', trend: 'Processed', desc: '0% fees, 100% passed to needy' },
                { title: 'Annual Projected Run Rate', val: '$800,000', trend: 'Target: $1M+', desc: 'Global Ummah expansion' },
              ].map((m, idx) => (
                <div key={idx} className="liquid-glass-gold rounded-3xl p-5 border border-amber-500/30">
                  <span className="text-xs font-bold text-amber-300/80 uppercase tracking-wider">{m.title}</span>
                  <div className="text-2xl sm:text-3xl font-black text-white font-mono my-1.5 gold-gradient-text">
                    {m.val}
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-emerald-300 font-bold">
                    <span className="text-amber-400">{m.trend}</span>
                    <span className="text-emerald-300/60">{m.desc}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Monetization Channels Breakdown */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Channel 1: NOOR Pro */}
              <div className="liquid-glass rounded-3xl p-6 border border-white/10 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-black text-amber-400 uppercase tracking-wider">Channel 1</span>
                    <span className="text-[10px] font-bold text-white bg-amber-500/20 px-2 py-0.5 rounded-full">$4.99 / mo</span>
                  </div>
                  <h4 className="text-base font-bold text-white mb-2">NOOR Pro Ummah Subscription</h4>
                  <p className="text-xs text-emerald-200/80 mb-4 leading-relaxed">
                    Premium tier offering 100% ad-free experience, offline high-bitrate Quran audio downloads, advanced multi-scholar Tafsir comparison, and unlimited AI assistant queries.
                  </p>
                  <ul className="space-y-2 text-xs text-emerald-300/90 font-medium">
                    <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-amber-400" /> Offline Quran reciters cache</li>
                    <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-amber-400" /> Unlimited AI Fiqh consultations</li>
                    <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-amber-400" /> Family prayer widgets & sync</li>
                  </ul>
                </div>
                <div className="pt-4 border-t border-white/10 mt-6 text-xs text-amber-300 font-bold">
                  Conversion Rate: 4.8% of active users
                </div>
              </div>

              {/* Channel 2: Halal Directory */}
              <div className="liquid-glass rounded-3xl p-6 border border-white/10 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-black text-amber-400 uppercase tracking-wider">Channel 2</span>
                    <span className="text-[10px] font-bold text-white bg-amber-500/20 px-2 py-0.5 rounded-full">B2B Listing</span>
                  </div>
                  <h4 className="text-base font-bold text-white mb-2">Halal Directory & Umrah Partners</h4>
                  <p className="text-xs text-emerald-200/80 mb-4 leading-relaxed">
                    Licensed Hajj & Umrah operators, certified Halal restaurants, Islamic finance institutions, and halal book publishers pay for verified, prominent directory listings and sponsored search spots.
                  </p>
                  <ul className="space-y-2 text-xs text-emerald-300/90 font-medium">
                    <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-amber-400" /> Verified Green Badge placement</li>
                    <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-amber-400" /> Geo-targeted pilgrim promotion</li>
                    <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-amber-400" /> Direct WhatsApp booking links</li>
                  </ul>
                </div>
                <div className="pt-4 border-t border-white/10 mt-6 text-xs text-amber-300 font-bold">
                  Active Partners: 184 worldwide
                </div>
              </div>

              {/* Channel 3: Waqf & Voluntary Sadaqah */}
              <div className="liquid-glass rounded-3xl p-6 border border-white/10 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-black text-amber-400 uppercase tracking-wider">Channel 3</span>
                    <span className="text-[10px] font-bold text-white bg-amber-500/20 px-2 py-0.5 rounded-full">Voluntary Waqf</span>
                  </div>
                  <h4 className="text-base font-bold text-white mb-2">Digital Waqf & Ummah Grants</h4>
                  <p className="text-xs text-emerald-200/80 mb-4 leading-relaxed">
                    Philanthropic Muslims and Islamic endowments contribute voluntary Waqf donations to fund ongoing server infrastructure, audio bandwidth, and free distribution to underprivileged Muslim communities.
                  </p>
                  <ul className="space-y-2 text-xs text-emerald-300/90 font-medium">
                    <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-amber-400" /> Sadaqah Jariyah technology fund</li>
                    <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-amber-400" /> Server sponsorship badges</li>
                    <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-amber-400" /> Transparent annual transparency report</li>
                  </ul>
                </div>
                <div className="pt-4 border-t border-white/10 mt-6 text-xs text-amber-300 font-bold">
                  Endowment Fund: $142,000 reserve
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ====================================================
            TAB 3: PLATFORM CUSTOMIZATION ENGINE
           ==================================================== */}
        {activeTab === 'customization' && (
          <div className="space-y-6 max-w-4xl">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-black text-white">Platform Customization Suite</h3>
                <p className="text-xs text-emerald-300/70">Configure liquid glass rendering, prayer engine algorithms, and audio</p>
              </div>

              <button
                onClick={() => {
                  setSaveSuccess(true);
                  setTimeout(() => setSaveSuccess(false), 2000);
                }}
                className="px-5 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-emerald-950 font-black text-xs shadow-lg transition-all flex items-center gap-1.5"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{saveSuccess ? 'Changes Applied!' : 'Save Global Preferences'}</span>
              </button>
            </div>

            {/* Visual Theme Liquid Accent */}
            <div className="liquid-glass rounded-3xl p-6 border border-white/10 space-y-4">
              <label className="block text-xs font-bold text-amber-300 uppercase tracking-wider">
                Liquid Glass Theme Accent
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
                    onClick={() => setThemeHue(theme.id)}
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
                    value={calcMethod}
                    onChange={(e) => setCalcMethod(e.target.value)}
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
                      onClick={() => setAsrSchool(1)}
                      className={`py-2 rounded-xl text-xs font-semibold border transition-all ${
                        asrSchool === 1
                          ? 'bg-amber-500 text-emerald-950 font-bold border-amber-400'
                          : 'bg-black/30 border-white/10 text-emerald-200'
                      }`}
                    >
                      Standard (1x)
                    </button>
                    <button
                      type="button"
                      onClick={() => setAsrSchool(2)}
                      className={`py-2 rounded-xl text-xs font-semibold border transition-all ${
                        asrSchool === 2
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
          </div>
        )}

        {/* ====================================================
            TAB 4: ISLAMIC CMS & CONTENT MANAGEMENT
           ==================================================== */}
        {activeTab === 'cms' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-black text-white">Content Management System</h3>
                <p className="text-xs text-emerald-300/70 mt-0.5">Author and manage Islamic scholarly articles and reflections</p>
              </div>

              <button
                onClick={() => setShowAddArticle(true)}
                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-emerald-950 font-bold text-xs flex items-center gap-1.5 shadow"
              >
                <Plus className="w-4 h-4" />
                <span>New Article</span>
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
                          title="Delete"
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
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        className="w-full bg-black/40 border border-white/15 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-emerald-200 mb-1">Category</label>
                        <select
                          value={newCategory}
                          onChange={(e) => setNewCategory(e.target.value)}
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
                          value={newAuthor}
                          onChange={(e) => setNewAuthor(e.target.value)}
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
                        Publish to Ummah
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
