'use client';

// ============================================================
// NOOR Web — Executive Super Admin Control Center
// Complete User Directory, Real-Time Traffic, Appearance, CMS & Exports
// ============================================================

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  ShieldAlert,
  Users,
  Activity,
  Sliders,
  FileText,
  Download,
  Search,
  CheckCircle2,
  AlertCircle,
  Edit,
  Trash2,
  Plus,
  Lock,
  LogOut,
  ArrowLeft,
  Eye,
  EyeOff,
  Mail,
  RefreshCw,
  Compass,
  Volume2,
  BookOpen,
  Calendar,
  Globe2,
  Sparkles,
  Check,
  X,
  Palette,
  KeyRound,
  UserCheck,
  Flame,
  MousePointerClick,
  Smartphone,
  Laptop,
  Radio,
  GitFork,
  Navigation,
  Layers,
  Zap,
  Clock,
  Coins
} from 'lucide-react';
import {
  RegisteredUser,
  UserSettings,
  loadAllRegisteredUsers,
  saveAllRegisteredUsers,
  updateUserByAdmin,
  deleteUserByAdmin,
  exportAllUsersAsCSV,
  exportAllUsersAsJSON,
  loadCurrentUser,
  saveCurrentUser,
} from '../../lib/userDataService';
import { GoogleLogo, AuthUser } from '../../components/AuthModal';

export default function SuperAdminPage() {
  // High-Security Super Admin Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isVerifyingSession, setIsVerifyingSession] = useState<boolean>(true);
  const [adminEmail, setAdminEmail] = useState<string>('noor@nooreilahi.com');
  const [adminPassword, setAdminPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isAuthenticating, setIsAuthenticating] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string>('');
  const [remainingAttempts, setRemainingAttempts] = useState<number | null>(null);
  const [lockoutSeconds, setLockoutSeconds] = useState<number>(0);
  const [adminUser, setAdminUser] = useState<{ email: string; name: string } | null>(null);

  // Active navigation tab
  const [activeTab, setActiveTab] = useState<'users' | 'traffic' | 'tracking' | 'flows' | 'heatmap' | 'appearance' | 'cms' | 'exports'>('users');

  // Registered Users Directory State
  const [usersList, setUsersList] = useState<RegisteredUser[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'verified' | 'active' | 'suspended'>('all');
  const [editingUser, setEditingUser] = useState<RegisteredUser | null>(null);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState<string>('');

  // Real-time Traffic State
  const [trafficRange, setTrafficRange] = useState<'today' | '7d' | '30d' | '1y'>('7d');

  // Heatmap & User Flows State
  const [heatmapMode, setHeatmapMode] = useState<'clicks' | 'scroll' | 'time'>('clicks');
  const [liveStreamPaused, setLiveStreamPaused] = useState<boolean>(false);

  // Live User Sessions Telemetry
  const [liveSessions] = useState([
    { id: 'sess_9821', user: 'Anonymous Pilgrim', city: 'Makkah', country: 'Saudi Arabia', flag: '🇸🇦', device: 'iPhone 16 Pro', browser: 'Safari 18', os: 'iOS 18.2', page: '/zakat', timeOnPage: '4m 12s', event: 'Valued Zakat in SAR (315 SAR/g gold)', status: 'active' },
    { id: 'sess_9822', user: 'Dr. Tariq Mansoor', email: 'tariq.mansoor@gmail.com', city: 'London', country: 'United Kingdom', flag: '🇬🇧', device: 'MacBook Pro M3', browser: 'Chrome 128', os: 'macOS 15', page: '/guides', timeOnPage: '7m 45s', event: 'Completed Wudu Step 6 (Head Masah)', status: 'active' },
    { id: 'sess_9823', user: 'Zubair Farooqi', email: 'zubair.farooqi@gmail.com', city: 'Delhi', country: 'India', flag: '🇮🇳', device: 'Samsung Galaxy S24', browser: 'Chrome Mobile', os: 'Android 15', page: '/prayer-times', timeOnPage: '2m 10s', event: 'Checked Asr time (Hanafi juristic mode)', status: 'active' },
    { id: 'sess_9824', user: 'Amina Al-Zahra', email: 'amina.zahra@gmail.com', city: 'Istanbul', country: 'Turkey', flag: '🇹🇷', device: 'iPad Pro', browser: 'Safari Mobile', os: 'iPadOS', page: '/quran', timeOnPage: '14m 20s', event: 'Reciting Surah Al-Kahf (Sheikh Alafasy)', status: 'active' },
    { id: 'sess_9825', user: 'Anonymous Pilgrim', city: 'Dubai', country: 'United Arab Emirates', flag: '🇦🇪', device: 'Windows 11 PC', browser: 'Edge 128', os: 'Windows 11', page: '/hajj-umrah', timeOnPage: '5m 30s', event: 'Downloaded Umrah Packing Checklist', status: 'active' },
    { id: 'sess_9826', user: 'Fatima Noor', email: 'fatima.n@gmail.com', city: 'Jakarta', country: 'Indonesia', flag: '🇮🇩', device: 'Xiaomi 14', browser: 'Chrome Mobile', os: 'Android 14', page: '/janazah', timeOnPage: '3m 18s', event: 'Reviewed 4 Takbeers & Adult Janazah Dua', status: 'active' },
    { id: 'sess_9827', user: 'Anonymous Pilgrim', city: 'Toronto', country: 'Canada', flag: '🇨🇦', device: 'Pixel 9 Pro', browser: 'Chrome 128', os: 'Android 15', page: '/travel', timeOnPage: '1m 45s', event: 'Calculated 140km Qasr Prayer Shortening', status: 'active' },
    { id: 'sess_9828', user: 'Bilal Qureshi', email: 'bilal.q@gmail.com', city: 'Karachi', country: 'Pakistan', flag: '🇵🇰', device: 'iPhone 15', browser: 'Safari 18', os: 'iOS 18.1', page: '/ziyarat', timeOnPage: '8m 05s', event: 'Inspecting Data Darbar Lahore Coordinates', status: 'active' },
  ]);

  // Appearance State
  const [themeHue, setThemeHue] = useState<'emerald' | 'gold' | 'sapphire' | 'obsidian'>('emerald');
  const [blurAmount, setBlurAmount] = useState(28);
  const [glassOpacity, setGlassOpacity] = useState(60);

  // CMS State
  const [articles, setArticles] = useState([
    { id: '1', title: 'The Spiritual Virtues of Fasting in Holy Ramadan', category: 'Ramadan', author: 'Dr. Tariq Al-Hashimi', status: 'Published', views: '48.2k', date: '2026-09-18' },
    { id: '2', title: 'Understanding Great-Circle Astronomical Calculation in Salaah', category: 'Astronomy & Fiqh', author: 'Sheikh Mansoor Ali', status: 'Published', views: '22.1k', date: '2026-09-15' },
    { id: '3', title: 'Complete Guide to Umrah Rituals from Ihram to Tawaf', category: 'Pilgrimage', author: 'Fatima Zahra', status: 'Published', views: '39.8k', date: '2026-09-10' },
    { id: '4', title: 'Zakat al-Fitr: Contemporary Currency & Commodity Valuation', category: 'Zakat', author: 'Dr. Bilal Qureshi', status: 'Draft', views: '1.2k', date: '2026-09-20' },
  ]);
  const [showAddArticle, setShowAddArticle] = useState(false);
  const [newArtTitle, setNewArtTitle] = useState('');
  const [newArtCategory, setNewArtCategory] = useState('Ramadan');
  const [newArtAuthor, setNewArtAuthor] = useState('Chief Scholar');

  // Brute-force lockout countdown timer
  useEffect(() => {
    if (lockoutSeconds <= 0) return;
    const interval = setInterval(() => {
      setLockoutSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [lockoutSeconds]);

  // Verify server-side session on mount
  useEffect(() => {
    async function verifySession() {
      try {
        const token = typeof window !== 'undefined' ? localStorage.getItem('noor_admin_token') : null;
        const res = await fetch('/api/admin/verify', {
          method: 'GET',
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        if (res.ok) {
          const data = await res.json();
          if (data.authenticated) {
            setIsAuthenticated(true);
            setAdminUser(data.user);
          }
        }
      } catch (err) {
        console.error('Super Admin session verification check failed:', err);
      } finally {
        setIsVerifyingSession(false);
      }
    }

    verifySession();
    const all = loadAllRegisteredUsers();
    setUsersList(all);
  }, []);

  // Secure Super Admin Login Handler
  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminEmail.trim() || !adminPassword.trim()) {
      setAuthError('Both Super Admin Email and Master Password are required.');
      return;
    }

    if (lockoutSeconds > 0) {
      setAuthError(`Security Lockout: Please wait ${lockoutSeconds}s before attempting again.`);
      return;
    }

    setIsAuthenticating(true);
    setAuthError('');

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: adminEmail.trim(), password: adminPassword }),
      });

      const data = await res.json();

      if (!res.ok) {
        setAuthError(data.error || 'Authentication denied.');
        if (data.remainingAttempts !== undefined) {
          setRemainingAttempts(data.remainingAttempts);
        }
        if (data.lockoutRemainingSeconds) {
          setLockoutSeconds(data.lockoutRemainingSeconds);
        }
        return;
      }

      // Authorization success
      if (typeof window !== 'undefined' && data.token) {
        localStorage.setItem('noor_admin_token', data.token);
      }
      setIsAuthenticated(true);
      setAdminUser(data.user);
      setAdminPassword('');
      setAuthError('');
      setRemainingAttempts(null);
      const all = loadAllRegisteredUsers();
      setUsersList(all);
    } catch {
      setAuthError('Connection error to security server. Please check your network.');
    } finally {
      setIsAuthenticating(false);
    }
  };

  // Secure Logout Handler
  const handleAdminLogout = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
    } catch {
      // ignore
    }
    if (typeof window !== 'undefined') {
      localStorage.removeItem('noor_admin_token');
    }
    setIsAuthenticated(false);
    setAdminUser(null);
    setAdminPassword('');
    setAuthError('');
  };

  const triggerNotice = (msg: string) => {
    setSaveSuccessMsg(msg);
    setTimeout(() => setSaveSuccessMsg(''), 3000);
  };

  // Filter users by search and status
  const filteredUsers = usersList.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (u.locationCity && u.locationCity.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || u.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Handle Admin User Update
  const handleSaveUserEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser) return;

    updateUserByAdmin(editingUser.id, editingUser);
    const refreshed = loadAllRegisteredUsers();
    setUsersList(refreshed);
    setEditingUser(null);
    triggerNotice(`Successfully updated profile & settings for ${editingUser.name}`);
  };

  // Handle Admin User Deletion
  const handleDeleteUser = (id: string, name: string) => {
    if (confirm(`Are you sure you want to remove user "${name}" from the system?`)) {
      deleteUserByAdmin(id);
      const refreshed = loadAllRegisteredUsers();
      setUsersList(refreshed);
      triggerNotice(`User ${name} has been removed.`);
    }
  };

  // Handle Article Creation
  const handleCreateArticle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newArtTitle.trim()) return;

    const newArt = {
      id: String(Date.now()),
      title: newArtTitle,
      category: newArtCategory,
      author: newArtAuthor,
      status: 'Published' as const,
      views: '0',
      date: new Date().toISOString().split('T')[0],
    };

    setArticles([newArt, ...articles]);
    setNewArtTitle('');
    setShowAddArticle(false);
    triggerNotice('New article publication published successfully.');
  };

  // Loading state while checking active session
  if (isVerifyingSession) {
    return (
      <div className="min-h-screen bg-[#02120d] text-white flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto animate-spin">
            <RefreshCw className="w-6 h-6 text-amber-400" />
          </div>
          <p className="text-xs text-emerald-300 font-semibold tracking-wider uppercase">
            Verifying Super Admin Authorization...
          </p>
        </div>
      </div>
    );
  }

  // ============================================================
  // VIEW A: ACCESS GATE (If not authenticated as Super Admin)
  // ============================================================
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#02120d] text-white flex flex-col selection:bg-amber-500 selection:text-black relative">
        <div className="flex-1 flex items-center justify-center p-4 relative overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

          <div className="w-full max-w-md liquid-glass rounded-3xl p-8 sm:p-10 border border-amber-500/30 shadow-2xl relative z-10 text-left">
            {/* Top Shield & Title */}
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-[10px] uppercase font-mono tracking-widest text-amber-300 font-bold mb-3">
                <ShieldAlert className="w-3 h-3 text-amber-400" />
                <span>Restricted Executive Gateway</span>
              </div>
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 via-emerald-600 to-emerald-950 flex items-center justify-center mx-auto mb-3 shadow-xl border border-white/20">
                <ShieldCheck className="w-7 h-7 text-emerald-950" />
              </div>
              <h2 className="text-2xl font-black text-white">Super Admin Login</h2>
              <p className="text-xs text-emerald-300/80 mt-1">
                Authorized Personnel Only • High-Security Cryptographic Gate
              </p>
            </div>

            {/* Error / Alert Display */}
            {authError && (
              <div className="mb-4 p-3.5 rounded-2xl bg-red-500/20 border border-red-500/40 text-red-200 text-xs flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-400 mt-0.5" />
                <div className="space-y-1">
                  <p className="font-semibold">{authError}</p>
                  {remainingAttempts !== null && remainingAttempts > 0 && (
                    <p className="text-[11px] text-amber-300">
                      ⚠️ Caution: {remainingAttempts} attempts remaining before 15-minute temporary lockout.
                    </p>
                  )}
                  {lockoutSeconds > 0 && (
                    <p className="text-[11px] text-red-300 font-mono">
                      ⏱️ Brute-Force Lockout Active: {lockoutSeconds}s remaining.
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleAdminLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-emerald-200 mb-1.5">
                  Super Admin Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-emerald-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="noor@nooreilahi.com"
                    value={adminEmail}
                    onChange={(e) => setAdminEmail(e.target.value)}
                    className="w-full pl-10 pr-3.5 py-2.5 bg-black/40 border border-white/15 rounded-xl text-xs text-white placeholder-white/30 focus:outline-none focus:border-amber-400 transition-colors"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-semibold text-emerald-200">
                    Master Password
                  </label>
                  <span className="text-[10px] text-emerald-400/60 font-mono">
                    256-bit Protected
                  </span>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-emerald-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    autoComplete="current-password"
                    placeholder="••••••••••••"
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    className="w-full pl-10 pr-10 py-2.5 bg-black/40 border border-white/15 rounded-xl text-xs text-white placeholder-white/30 focus:outline-none focus:border-amber-400 transition-colors font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white p-1 rounded transition-colors"
                    tabIndex={-1}
                  >
                    {showPassword ? (
                      <EyeOff className="w-3.5 h-3.5" />
                    ) : (
                      <Eye className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isAuthenticating || lockoutSeconds > 0}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-emerald-950 font-black text-xs shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed mt-2"
              >
                {isAuthenticating ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Verifying Secure Credentials...</span>
                  </>
                ) : (
                  <>
                    <KeyRound className="w-4 h-4" />
                    <span>Authenticate & Access Control Center</span>
                  </>
                )}
              </button>
            </form>

            {/* Security Badges */}
            <div className="mt-6 pt-5 border-t border-white/10 space-y-2 text-[10px] text-emerald-300/70 font-mono">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>HMAC-SHA256 Cryptographic Session Binding</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Brute-Force Rate Limiting & Sliding Window Lockout</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Zero Public Links • Restricted Operator Gateway</span>
              </div>
            </div>

            <div className="mt-6 text-center">
              <Link
                href="/"
                className="text-xs text-emerald-400/80 hover:text-white transition-colors inline-flex items-center justify-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Return to Main Platform</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ============================================================
  // VIEW B: AUTHENTICATED SUPER ADMIN CONTROL CENTER
  // ============================================================
  return (
    <div className="min-h-screen bg-[#02120d] text-white flex flex-col selection:bg-amber-500 selection:text-black">
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-[#021711]/95 backdrop-blur-xl border-b border-white/10 px-4 sm:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-emerald-300 hover:text-white transition-colors"
            title="Return to Noor Platform"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-emerald-600 flex items-center justify-center font-black text-emerald-950 shadow-md">
            <ShieldCheck className="w-5 h-5 text-emerald-950" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-black text-white">NOOR Super Admin</h1>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-bold border border-amber-500/40">
                MASTER PORTAL
              </span>
            </div>
            <p className="text-[11px] text-emerald-300/70">
              Logged in as <strong className="text-white">Majid Khan (Owner)</strong> • Real-Time Systems Online
            </p>
          </div>
        </div>

        {/* Global Save Notice Feedback */}
        {saveSuccessMsg && (
          <div className="px-3.5 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400 text-emerald-300 text-xs font-bold flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{saveSuccessMsg}</span>
          </div>
        )}

        {/* Tab Switcher Pills */}
        <div className="flex items-center bg-black/50 p-1 rounded-full border border-white/10 text-xs font-semibold overflow-x-auto max-w-full">
          <button
            onClick={() => setActiveTab('users')}
            className={`px-3.5 py-1.5 rounded-full flex items-center gap-1.5 transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'users'
                ? 'bg-amber-500 text-emerald-950 font-black shadow'
                : 'text-emerald-200 hover:text-white'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Registered Users ({usersList.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('traffic')}
            className={`px-3.5 py-1.5 rounded-full flex items-center gap-1.5 transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'traffic'
                ? 'bg-amber-500 text-emerald-950 font-black shadow'
                : 'text-emerald-200 hover:text-white'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>Traffic Overview</span>
          </button>

          <button
            onClick={() => setActiveTab('tracking')}
            className={`px-3.5 py-1.5 rounded-full flex items-center gap-1.5 transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'tracking'
                ? 'bg-amber-500 text-emerald-950 font-black shadow'
                : 'text-emerald-200 hover:text-white'
            }`}
          >
            <Radio className="w-3.5 h-3.5" />
            <span>Live User Tracking ({liveSessions.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('flows')}
            className={`px-3.5 py-1.5 rounded-full flex items-center gap-1.5 transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'flows'
                ? 'bg-amber-500 text-emerald-950 font-black shadow'
                : 'text-emerald-200 hover:text-white'
            }`}
          >
            <GitFork className="w-3.5 h-3.5" />
            <span>User Flows & Funnels</span>
          </button>

          <button
            onClick={() => setActiveTab('heatmap')}
            className={`px-3.5 py-1.5 rounded-full flex items-center gap-1.5 transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'heatmap'
                ? 'bg-amber-500 text-emerald-950 font-black shadow'
                : 'text-emerald-200 hover:text-white'
            }`}
          >
            <MousePointerClick className="w-3.5 h-3.5" />
            <span>Click & Scroll Heatmap</span>
          </button>

          <button
            onClick={() => setActiveTab('appearance')}
            className={`px-3.5 py-1.5 rounded-full flex items-center gap-1.5 transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'appearance'
                ? 'bg-amber-500 text-emerald-950 font-black shadow'
                : 'text-emerald-200 hover:text-white'
            }`}
          >
            <Palette className="w-3.5 h-3.5" />
            <span>Appearance</span>
          </button>

          <button
            onClick={() => setActiveTab('cms')}
            className={`px-3.5 py-1.5 rounded-full flex items-center gap-1.5 transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'cms'
                ? 'bg-amber-500 text-emerald-950 font-black shadow'
                : 'text-emerald-200 hover:text-white'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Articles & CMS</span>
          </button>

          <button
            onClick={() => setActiveTab('exports')}
            className={`px-3.5 py-1.5 rounded-full flex items-center gap-1.5 transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'exports'
                ? 'bg-amber-500 text-emerald-950 font-black shadow'
                : 'text-emerald-200 hover:text-white'
            }`}
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Data</span>
          </button>
        </div>

        {/* Super Admin Session Badge & Sign Out */}
        <div className="flex items-center gap-3">
          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-[11px]">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-mono text-emerald-200">
              {adminUser?.email || 'noor@nooreilahi.com'}
            </span>
            <span className="text-amber-400 font-bold bg-amber-400/10 px-1.5 py-0.5 rounded text-[10px]">
              SUPER ADMIN
            </span>
          </div>

          <button
            onClick={handleAdminLogout}
            className="px-3 py-1.5 rounded-xl bg-red-500/15 hover:bg-red-500/25 border border-red-500/30 text-red-200 hover:text-white transition-colors flex items-center gap-1.5 text-xs font-bold cursor-pointer"
            title="Sign Out of Super Admin and Lock Session"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out & Lock</span>
          </button>
        </div>
      </header>

      {/* Main Admin Content Body */}
      <main className="flex-1 max-w-7xl mx-auto w-full p-4 sm:p-8 space-y-6">

        {/* ====================================================
            TAB 1: REGISTERED USERS DIRECTORY & SETTINGS EDITOR
           ==================================================== */}
        {activeTab === 'users' && (
          <div className="space-y-6">
            {/* Top Toolbar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#031d16] p-4 sm:p-5 rounded-3xl border border-white/10">
              <div>
                <h2 className="text-xl font-black text-white flex items-center gap-2">
                  <Users className="w-5 h-5 text-amber-400" />
                  <span>All Registered Users Directory</span>
                </h2>
                <p className="text-xs text-emerald-300/70 mt-0.5">
                  Inspect user accounts, manage statuses, and update calculation & profile settings.
                </p>
              </div>

              <div className="flex items-center gap-2.5 w-full sm:w-auto">
                <button
                  onClick={exportAllUsersAsCSV}
                  className="px-3.5 py-2 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-400/40 text-emerald-300 text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export CSV</span>
                </button>

                <button
                  onClick={exportAllUsersAsJSON}
                  className="px-3.5 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/40 text-amber-300 text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export JSON</span>
                </button>
              </div>
            </div>

            {/* Search & Filter Bar */}
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <div className="relative flex-1 w-full">
                <Search className="w-4 h-4 text-emerald-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search user by name, email or city..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 bg-[#031c15] border border-white/15 rounded-2xl text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="flex items-center bg-[#031c15] p-1 rounded-2xl border border-white/15 text-xs w-full sm:w-auto overflow-x-auto">
                {(['all', 'verified', 'active', 'suspended'] as const).map((st) => (
                  <button
                    key={st}
                    onClick={() => setStatusFilter(st)}
                    className={`px-3.5 py-1.5 rounded-xl font-bold uppercase transition-all whitespace-nowrap cursor-pointer ${
                      statusFilter === st
                        ? 'bg-amber-500 text-emerald-950 shadow'
                        : 'text-emerald-300/80 hover:text-white'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Users Table / Grid */}
            <div className="bg-[#031c15] border border-white/10 rounded-3xl overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-black/40 border-b border-white/10 text-emerald-300/70 font-semibold uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="py-3 px-4">User</th>
                      <th className="py-3 px-4">Role & Status</th>
                      <th className="py-3 px-4">Origin / Location</th>
                      <th className="py-3 px-4">Prayer Fiqh Settings</th>
                      <th className="py-3 px-4">Streak & Prayers</th>
                      <th className="py-3 px-4">Last Active</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {filteredUsers.map((user) => (
                      <tr key={user.id} className="hover:bg-white/[0.02] transition-colors">
                        {/* User Identity */}
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-3">
                            {user.picture ? (
                              <img
                                src={user.picture}
                                alt={user.name}
                                className="w-9 h-9 rounded-full object-cover border border-amber-400/40"
                              />
                            ) : (
                              <div className="w-9 h-9 rounded-full bg-amber-500 text-emerald-950 font-black flex items-center justify-center text-xs">
                                {user.name.charAt(0).toUpperCase()}
                              </div>
                            )}
                            <div>
                              <div className="font-bold text-white flex items-center gap-1.5">
                                <span>{user.name}</span>
                                {user.provider === 'google' && (
                                  <GoogleLogo className="w-3 h-3" />
                                )}
                              </div>
                              <span className="text-[11px] text-emerald-300/70 font-mono">
                                {user.email}
                              </span>
                            </div>
                          </div>
                        </td>

                        {/* Role & Status */}
                        <td className="py-3.5 px-4">
                          <div className="flex flex-col gap-1 items-start">
                            <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                              user.role === 'super_admin'
                                ? 'bg-amber-500/20 text-amber-300 border border-amber-400/40'
                                : 'bg-white/10 text-emerald-200'
                            }`}>
                              {user.role === 'super_admin' ? 'Super Admin' : 'Pilgrim'}
                            </span>
                            <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                              user.status === 'verified'
                                ? 'bg-emerald-500/20 text-emerald-300'
                                : user.status === 'active'
                                ? 'bg-sky-500/20 text-sky-300'
                                : 'bg-red-500/20 text-red-300'
                            }`}>
                              ● {user.status}
                            </span>
                          </div>
                        </td>

                        {/* Location */}
                        <td className="py-3.5 px-4">
                          <div className="text-white font-medium">
                            {user.locationCity || 'Makkah'}
                          </div>
                          <span className="text-[10px] text-emerald-400/60 block">
                            {user.locationCountry || 'Global'}
                          </span>
                        </td>

                        {/* Fiqh Settings */}
                        <td className="py-3.5 px-4">
                          <span className="text-amber-300 font-bold block">
                            {user.settings?.calculationMethod || 'MWL'}
                          </span>
                          <span className="text-[10px] text-emerald-300/70 block">
                            Asr: {user.settings?.asrFactor === 2 ? 'Hanafi' : 'Standard'} • {user.settings?.adhanVoice || 'Makkah'}
                          </span>
                        </td>

                        {/* Streak & Prayers */}
                        <td className="py-3.5 px-4">
                          <div className="font-bold text-white">
                            🔥 {user.activity?.prayerStreakDays || 0} Days
                          </div>
                          <span className="text-[10px] text-emerald-400/70 block">
                            {user.activity?.totalPrayersCompleted || 0} prayers logged
                          </span>
                        </td>

                        {/* Last Active */}
                        <td className="py-3.5 px-4 text-emerald-300/80 font-mono text-[11px]">
                          {user.lastActive}
                        </td>

                        {/* Actions */}
                        <td className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => setEditingUser(user)}
                              className="px-2.5 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 font-bold text-xs flex items-center gap-1 border border-amber-400/30 transition-colors cursor-pointer"
                              title="Edit user profile and settings"
                            >
                              <Edit className="w-3.5 h-3.5" />
                              <span>Edit Settings</span>
                            </button>

                            {user.role !== 'super_admin' && (
                              <button
                                onClick={() => handleDeleteUser(user.id, user.name)}
                                className="p-1.5 rounded-xl text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors cursor-pointer"
                                title="Remove User"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Modal: Edit User Profile & Settings */}
            {editingUser && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-in fade-in">
                <div className="bg-[#031d16] border border-amber-500/40 rounded-3xl w-full max-w-2xl p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto text-left">
                  <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-amber-500/20 flex items-center justify-center font-bold text-amber-300 border border-amber-400/40">
                        <Edit className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-lg font-black text-white">Edit User Profile & Settings</h3>
                        <p className="text-xs text-emerald-300/70">
                          Updating preferences for <span className="text-white font-bold">{editingUser.name}</span>
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => setEditingUser(null)}
                      className="p-1.5 rounded-xl text-emerald-300 hover:text-white hover:bg-white/10"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <form onSubmit={handleSaveUserEdit} className="space-y-5">
                    {/* User Basic Info */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-emerald-200 mb-1">Full Name</label>
                        <input
                          type="text"
                          value={editingUser.name}
                          onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                          className="w-full bg-black/40 border border-white/15 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-emerald-200 mb-1">Email Address</label>
                        <input
                          type="email"
                          value={editingUser.email}
                          onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                          className="w-full bg-black/40 border border-white/15 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-emerald-200 mb-1">Account Status</label>
                        <select
                          value={editingUser.status}
                          onChange={(e) => setEditingUser({ ...editingUser, status: e.target.value as any })}
                          className="w-full bg-black/40 border border-white/15 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                        >
                          <option value="verified" className="bg-[#021812]">Verified</option>
                          <option value="active" className="bg-[#021812]">Active</option>
                          <option value="suspended" className="bg-[#021812]">Suspended</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-emerald-200 mb-1">Origin City</label>
                        <input
                          type="text"
                          value={editingUser.locationCity || ''}
                          onChange={(e) => setEditingUser({ ...editingUser, locationCity: e.target.value })}
                          className="w-full bg-black/40 border border-white/15 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                        />
                      </div>
                    </div>

                    {/* Fiqh Calculation Settings */}
                    <div className="pt-2 border-t border-white/10 space-y-4">
                      <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                        Prayer & Fiqh Calculation Settings
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-emerald-200 mb-1">
                            Calculation Method
                          </label>
                          <select
                            value={editingUser.settings.calculationMethod}
                            onChange={(e) => setEditingUser({
                              ...editingUser,
                              settings: { ...editingUser.settings, calculationMethod: e.target.value }
                            })}
                            className="w-full bg-black/40 border border-white/15 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                          >
                            <option value="MWL" className="bg-[#021812]">Muslim World League (MWL)</option>
                            <option value="ISNA" className="bg-[#021812]">Islamic Society of North America (ISNA)</option>
                            <option value="Makkah" className="bg-[#021812]">Umm Al-Qura University, Makkah</option>
                            <option value="Egypt" className="bg-[#021812]">Egyptian General Authority</option>
                            <option value="Karachi" className="bg-[#021812]">Univ of Islamic Sciences, Karachi</option>
                            <option value="Tehran" className="bg-[#021812]">Univ of Tehran (Geophysics)</option>
                            <option value="Jafari" className="bg-[#021812]">Shia Ithna-Ashari (Qum)</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-emerald-200 mb-1">
                            Asr Juristic Rule
                          </label>
                          <select
                            value={editingUser.settings.asrFactor}
                            onChange={(e) => setEditingUser({
                              ...editingUser,
                              settings: { ...editingUser.settings, asrFactor: Number(e.target.value) }
                            })}
                            className="w-full bg-black/40 border border-white/15 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                          >
                            <option value={1} className="bg-[#021812]">Standard (Shafi&apos;i / Maliki / Hanbali)</option>
                            <option value={2} className="bg-[#021812]">Hanafi (Shadow x2)</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Audio & Recitation Settings */}
                    <div className="pt-2 border-t border-white/10 space-y-4">
                      <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                        Audio, Quran & Adhan Preferences
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-emerald-200 mb-1">
                            Adhan Muezzin Voice
                          </label>
                          <select
                            value={editingUser.settings.adhanVoice}
                            onChange={(e) => setEditingUser({
                              ...editingUser,
                              settings: { ...editingUser.settings, adhanVoice: e.target.value as any }
                            })}
                            className="w-full bg-black/40 border border-white/15 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                          >
                            <option value="makkah" className="bg-[#021812]">Makkah Al-Mukarramah</option>
                            <option value="madinah" className="bg-[#021812]">Al-Masjid An-Nabawi, Madinah</option>
                            <option value="alaqsa" className="bg-[#021812]">Al-Aqsa Sanctuary</option>
                            <option value="cairo" className="bg-[#021812]">Cairo Sanctuary</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-emerald-200 mb-1">
                            Quran Script Style
                          </label>
                          <select
                            value={editingUser.settings.quranScript}
                            onChange={(e) => setEditingUser({
                              ...editingUser,
                              settings: { ...editingUser.settings, quranScript: e.target.value as any }
                            })}
                            className="w-full bg-black/40 border border-white/15 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                          >
                            <option value="uthmani" className="bg-[#021812]">Uthmani (Madani)</option>
                            <option value="indopak" className="bg-[#021812]">Indo-Pak (Asian)</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                      <button
                        type="button"
                        onClick={() => setEditingUser(null)}
                        className="px-4 py-2 rounded-xl text-xs font-semibold text-emerald-300 hover:text-white"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-emerald-950 font-bold text-xs transition-colors shadow-md cursor-pointer"
                      >
                        Save User Profile & Settings
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ====================================================
            TAB 2: REAL-TIME TRAFFIC & ANALYTICS
           ==================================================== */}
        {activeTab === 'traffic' && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 bg-[#031c15] p-5 rounded-3xl border border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-3.5 h-3.5 rounded-full bg-emerald-400 animate-ping" />
                <div>
                  <span className="text-xs text-emerald-300/70 font-semibold block">Real-Time Online Activity</span>
                  <span className="text-2xl font-black text-white font-mono">1,842 Active Pilgrims Right Now</span>
                </div>
              </div>

              <div className="flex items-center bg-black/40 p-1 rounded-2xl border border-white/10 text-xs">
                {(['today', '7d', '30d', '1y'] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setTrafficRange(t)}
                    className={`px-3.5 py-1.5 rounded-xl font-bold uppercase transition-all ${
                      trafficRange === t
                        ? 'bg-amber-500 text-emerald-950'
                        : 'text-emerald-300/80 hover:text-white'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Core Stats Overview */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: 'Total Global Visits', value: '428,910', change: '+24.5%', isUp: true, icon: Globe2 },
                { label: 'Adhan Listeners Today', value: '184,200', change: '+38.2%', isUp: true, icon: Volume2 },
                { label: 'Quran Verses Read', value: '1,492,000', change: '+19.1%', isUp: true, icon: BookOpen },
                { label: 'Qibla Orientations', value: '95,400', change: '+12.4%', isUp: true, icon: Compass },
              ].map((st, i) => {
                const Icon = st.icon;
                return (
                  <div key={i} className="bg-[#031c15] p-5 rounded-3xl border border-white/10 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-emerald-300/70">{st.label}</span>
                      <div className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center">
                        <Icon className="w-4 h-4 text-amber-400" />
                      </div>
                    </div>
                    <div className="flex items-baseline justify-between">
                      <span className="text-2xl font-black text-white font-mono">{st.value}</span>
                      <span className="text-xs font-bold text-emerald-400">{st.change}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Geographic Breakdown & Feature Usage */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Country Distribution */}
              <div className="bg-[#031c15] p-6 rounded-3xl border border-white/10 space-y-4">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <Globe2 className="w-4 h-4 text-amber-400" />
                  <span>Top Active Geographic Regions</span>
                </h4>
                <div className="space-y-3 pt-1">
                  {[
                    { country: 'Saudi Arabia (Makkah & Riyadh)', percent: 34, count: '145,820' },
                    { country: 'India (Delhi, Hyderabad, Mumbai)', percent: 22, count: '94,360' },
                    { country: 'United Kingdom (London, Birmingham)', percent: 14, count: '60,040' },
                    { country: 'United States (NY, California, Texas)', percent: 11, count: '47,180' },
                    { country: 'Indonesia & Malaysia', percent: 10, count: '42,890' },
                    { country: 'Turkey & Middle East', percent: 9, count: '38,620' },
                  ].map((geo, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-emerald-200 font-medium">{geo.country}</span>
                        <span className="text-amber-300 font-mono font-bold">{geo.percent}% ({geo.count})</span>
                      </div>
                      <div className="w-full h-2 bg-black/40 rounded-full overflow-hidden border border-white/5">
                        <div
                          className="h-full bg-gradient-to-r from-emerald-500 to-amber-400"
                          style={{ width: `${geo.percent}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Feature Usage */}
              <div className="bg-[#031c15] p-6 rounded-3xl border border-white/10 space-y-4">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <Activity className="w-4 h-4 text-emerald-400" />
                  <span>Feature Engagement Share</span>
                </h4>
                <div className="space-y-3 pt-1">
                  {[
                    { feature: 'Astronomical Prayer Times & Adhan', share: 42 },
                    { feature: 'Noble Quran Audio Recitations', share: 28 },
                    { feature: 'Spherical 3D Qibla Compass', share: 14 },
                    { feature: 'Global Ziyarat Sanctuary Chronicles', share: 10 },
                    { feature: 'Hisn al-Muslim Authentic Duas', share: 6 },
                  ].map((feat, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-emerald-200 font-medium">{feat.feature}</span>
                        <span className="text-amber-300 font-mono font-bold">{feat.share}%</span>
                      </div>
                      <div className="w-full h-2 bg-black/40 rounded-full overflow-hidden border border-white/5">
                        <div
                          className="h-full bg-gradient-to-r from-amber-400 to-emerald-400"
                          style={{ width: `${feat.share}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ====================================================
            TAB 3: LIVE USER TRACKING & SESSIONS
           ==================================================== */}
        {activeTab === 'tracking' && (
          <div className="space-y-6">
            {/* Top Live Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 bg-[#031c15] p-5 rounded-3xl border border-white/10">
              <div className="flex items-center gap-3">
                <span className="relative flex h-3.5 w-3.5">
                  <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${liveStreamPaused ? 'bg-zinc-400' : 'bg-emerald-400'}`} />
                  <span className={`relative inline-flex rounded-full h-3.5 w-3.5 ${liveStreamPaused ? 'bg-zinc-500' : 'bg-emerald-500'}`} />
                </span>
                <div>
                  <span className="text-xs text-emerald-300/70 font-semibold block">
                    {liveStreamPaused ? 'Live Telemetry Paused' : 'Live User Sessions Streaming'}
                  </span>
                  <span className="text-xl sm:text-2xl font-black text-white font-mono">
                    1,842 Active Pilgrims Right Now
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setLiveStreamPaused(!liveStreamPaused)}
                  className={`px-3.5 py-1.5 rounded-xl border text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer ${
                    liveStreamPaused
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                      : 'bg-white/5 text-zinc-300 hover:text-white border-white/10'
                  }`}
                >
                  <Radio className="w-3.5 h-3.5 text-amber-400" />
                  <span>{liveStreamPaused ? 'Resume Stream' : 'Pause Stream'}</span>
                </button>

                <div className="px-3 py-1.5 rounded-xl bg-black/40 border border-white/10 text-xs font-mono text-emerald-300">
                  Global Edge Ping: <strong>28ms</strong>
                </div>
              </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-[#031c15] p-5 rounded-3xl border border-white/10 space-y-2">
                <div className="flex items-center justify-between text-xs text-emerald-300/70">
                  <span>Avg Session Duration</span>
                  <Clock className="w-4 h-4 text-amber-400" />
                </div>
                <div className="text-2xl font-black text-white font-mono">6m 48s</div>
                <span className="text-[11px] text-emerald-400 font-semibold block">↑ +18.4% depth of study</span>
              </div>

              <div className="bg-[#031c15] p-5 rounded-3xl border border-white/10 space-y-2">
                <div className="flex items-center justify-between text-xs text-emerald-300/70">
                  <span>Top Active Module</span>
                  <Coins className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="text-2xl font-black text-white font-mono">Zakat Hub</div>
                <span className="text-[11px] text-amber-400 font-semibold block">38% active traffic share</span>
              </div>

              <div className="bg-[#031c15] p-5 rounded-3xl border border-white/10 space-y-2">
                <div className="flex items-center justify-between text-xs text-emerald-300/70">
                  <span>Mobile Device Ratio</span>
                  <Smartphone className="w-4 h-4 text-sky-400" />
                </div>
                <div className="text-2xl font-black text-white font-mono">68.2%</div>
                <span className="text-[11px] text-sky-300 font-semibold block">iOS 44% • Android 24%</span>
              </div>

              <div className="bg-[#031c15] p-5 rounded-3xl border border-white/10 space-y-2">
                <div className="flex items-center justify-between text-xs text-emerald-300/70">
                  <span>PWA App Installs</span>
                  <Download className="w-4 h-4 text-amber-400" />
                </div>
                <div className="text-2xl font-black text-white font-mono">14,890</div>
                <span className="text-[11px] text-emerald-400 font-semibold block">↑ +32.1% this week</span>
              </div>
            </div>

            {/* Live Sessions Stream Table */}
            <div className="bg-[#031c15] border border-white/10 rounded-3xl overflow-hidden shadow-xl">
              <div className="p-4 border-b border-white/10 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Radio className="w-4 h-4 text-emerald-400" />
                    <span>Real-Time Visitor Journey Stream</span>
                  </h3>
                  <p className="text-[11px] text-emerald-300/70 mt-0.5">
                    Live telemetry detailing active pages, devices, and spiritual interactions
                  </p>
                </div>
                <span className="text-[11px] font-mono text-zinc-400">
                  Showing {liveSessions.length} live telemetry nodes
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-black/40 border-b border-white/10 text-emerald-300/70 font-semibold uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="py-3 px-4">Visitor / ID</th>
                      <th className="py-3 px-4">Origin / Country</th>
                      <th className="py-3 px-4">Device & Browser</th>
                      <th className="py-3 px-4">Current Page</th>
                      <th className="py-3 px-4">Time on Page</th>
                      <th className="py-3 px-4">Live Interaction Event</th>
                      <th className="py-3 px-4 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 font-mono">
                    {liveSessions.map((s) => (
                      <tr key={s.id} className="hover:bg-white/[0.02] transition-colors">
                        <td className="py-3 px-4 font-sans font-medium text-white">
                          <div>{s.user}</div>
                          <span className="text-[10px] text-zinc-500 font-mono">{s.id}</span>
                        </td>
                        <td className="py-3 px-4 font-sans text-emerald-200">
                          <span className="text-base mr-1.5">{s.flag}</span>
                          <span>{s.city}, {s.country}</span>
                        </td>
                        <td className="py-3 px-4 text-zinc-300 text-[11px]">
                          <div>{s.device}</div>
                          <span className="text-[10px] text-zinc-500">{s.browser} • {s.os}</span>
                        </td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-amber-300 text-[11px]">
                            {s.page}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-emerald-300 text-[11px]">
                          {s.timeOnPage}
                        </td>
                        <td className="py-3 px-4 font-sans text-xs text-white">
                          <span className="text-emerald-400 mr-1.5">⚡</span>
                          <span>{s.event}</span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            Live
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Platform & Acquisition Breakdown */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Device Types */}
              <div className="bg-[#031c15] p-5 rounded-3xl border border-white/10 space-y-4">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <Smartphone className="w-4 h-4 text-amber-400" />
                  <span>Device Distribution</span>
                </h4>
                <div className="space-y-3">
                  {[
                    { label: 'Mobile Smartphones', percent: 68.2, count: '292,510' },
                    { label: 'Desktop Computers', percent: 26.8, count: '114,940' },
                    { label: 'Tablet Devices', percent: 5.0, count: '21,460' },
                  ].map((d, i) => (
                    <div key={i} className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-emerald-200">{d.label}</span>
                        <span className="text-amber-300 font-mono font-bold">{d.percent}%</span>
                      </div>
                      <div className="w-full h-2 bg-black/40 rounded-full overflow-hidden border border-white/5">
                        <div className="h-full bg-emerald-500" style={{ width: `${d.percent}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Operating Systems */}
              <div className="bg-[#031c15] p-5 rounded-3xl border border-white/10 space-y-4">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <Laptop className="w-4 h-4 text-emerald-400" />
                  <span>Operating Systems</span>
                </h4>
                <div className="space-y-3">
                  {[
                    { label: 'Apple iOS & iPadOS', percent: 46.4, color: 'bg-amber-400' },
                    { label: 'Google Android', percent: 34.2, color: 'bg-emerald-400' },
                    { label: 'Apple macOS', percent: 11.2, color: 'bg-sky-400' },
                    { label: 'Microsoft Windows', percent: 8.2, color: 'bg-indigo-400' },
                  ].map((os, i) => (
                    <div key={i} className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-emerald-200">{os.label}</span>
                        <span className="text-white font-mono font-bold">{os.percent}%</span>
                      </div>
                      <div className="w-full h-2 bg-black/40 rounded-full overflow-hidden border border-white/5">
                        <div className={`h-full ${os.color}`} style={{ width: `${os.percent}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Acquisition Channels */}
              <div className="bg-[#031c15] p-5 rounded-3xl border border-white/10 space-y-4">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <Globe2 className="w-4 h-4 text-sky-400" />
                  <span>Acquisition Origins</span>
                </h4>
                <div className="space-y-3">
                  {[
                    { label: 'Google Organic Search (SEO)', percent: 54.0 },
                    { label: 'Direct URL / PWA App', percent: 24.0 },
                    { label: 'Social & Telegram Communities', percent: 12.0 },
                    { label: 'AI Search (Perplexity / ChatGPT)', percent: 10.0 },
                  ].map((ac, i) => (
                    <div key={i} className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-emerald-200">{ac.label}</span>
                        <span className="text-amber-300 font-mono font-bold">{ac.percent}%</span>
                      </div>
                      <div className="w-full h-2 bg-black/40 rounded-full overflow-hidden border border-white/5">
                        <div className="h-full bg-gradient-to-r from-emerald-500 to-amber-400" style={{ width: `${ac.percent}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ====================================================
            TAB 4: USER FLOWS & CONVERSION FUNNELS
           ==================================================== */}
        {activeTab === 'flows' && (
          <div className="space-y-6">
            {/* Header */}
            <div className="bg-[#031c15] p-6 rounded-3xl border border-white/10 space-y-2">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <GitFork className="w-5 h-5 text-amber-400" />
                <span>Multi-Stage User Journey & Spiritual Conversion Funnel</span>
              </h3>
              <p className="text-xs text-emerald-300/70">
                Visualizing how visitors progress from initial landing into active daily prayer logging, Zakat calculation, and app adoption.
              </p>
            </div>

            {/* 4-Step Funnel Visualization */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                {
                  step: '01',
                  title: 'Discovery & Landing',
                  visitors: '428,910',
                  conversion: '100%',
                  dropOff: '0%',
                  color: 'border-emerald-500/50 bg-emerald-950/30',
                  accent: 'text-emerald-400',
                  notes: 'Homepage (58%) • /prayer-times (22%) • /quran (12%) • /guides (8%)'
                },
                {
                  step: '02',
                  title: 'Core Deen Engagement',
                  visitors: '336,260',
                  conversion: '78.4%',
                  dropOff: '-21.6%',
                  color: 'border-amber-500/50 bg-amber-950/30',
                  accent: 'text-amber-400',
                  notes: 'Explored 10 Pillars • Read Quran Verses • Listened to Adhan'
                },
                {
                  step: '03',
                  title: 'Interactive Fiqh Tools',
                  visitors: '191,290',
                  conversion: '44.6%',
                  dropOff: '-33.8%',
                  color: 'border-sky-500/50 bg-sky-950/30',
                  accent: 'text-sky-400',
                  notes: 'Country Zakat Calculator • Qibla Compass • Hajj Checklist'
                },
                {
                  step: '04',
                  title: 'Spiritual Conversion',
                  visitors: '112,370',
                  conversion: '26.2%',
                  dropOff: '-18.4%',
                  color: 'border-rose-500/50 bg-rose-950/30',
                  accent: 'text-rose-400',
                  notes: 'Logged Daily Salah • Saved Qada Journal • Pledged Sadaqah'
                },
              ].map((stage, idx) => (
                <div key={idx} className={`p-5 rounded-3xl border ${stage.color} space-y-3 relative overflow-hidden`}>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-zinc-400">STAGE {stage.step}</span>
                    <span className={`text-xs font-mono font-bold ${stage.accent}`}>{stage.conversion} Retained</span>
                  </div>

                  <div>
                    <h4 className="text-base font-bold text-white">{stage.title}</h4>
                    <span className="text-2xl font-black font-mono text-white block mt-1">{stage.visitors}</span>
                  </div>

                  <p className="text-[11px] text-zinc-300 leading-relaxed border-t border-white/10 pt-2">
                    {stage.notes}
                  </p>

                  <div className="flex items-center justify-between text-[10px] text-zinc-400 font-mono">
                    <span>Drop-off:</span>
                    <span className="text-red-400 font-bold">{stage.dropOff}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Top User Journey Transition Paths */}
            <div className="bg-[#031c15] p-6 rounded-3xl border border-white/10 space-y-4">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <Navigation className="w-4 h-4 text-emerald-400" />
                <span>Top Multi-Step Journey Paths</span>
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                {[
                  {
                    path: ['Home', 'Prayer Times', 'Qibla Compass', 'Daily Adhkar'],
                    share: '34.2%',
                    visitors: '146,680',
                    persona: 'Daily Worship Pilgrim',
                    intent: 'High Daily Retention'
                  },
                  {
                    path: ['Home', 'Zakat Hub', 'Currency Switcher (INR/SAR)', 'Sadaqah Relief'],
                    share: '24.1%',
                    visitors: '103,360',
                    persona: 'Wealth Purification & Donors',
                    intent: 'High Philanthropic Intent'
                  },
                  {
                    path: ['Home', 'Guides', 'Wudu Step-by-Step', 'Salah Qada Journal'],
                    share: '21.5%',
                    visitors: '92,210',
                    persona: 'Student of Knowledge / New Muslim',
                    intent: 'Deep Educational Value'
                  },
                  {
                    path: ['Home', 'Hajj & Umrah', 'Miqat / Tawaf Steps', 'Packing Checklist'],
                    share: '13.8%',
                    visitors: '59,190',
                    persona: 'Makkah/Madinah Traveler',
                    intent: 'Sacred Pilgrimage Traveler'
                  },
                ].map((item, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-black/30 border border-white/10 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-amber-300 font-mono">{item.persona}</span>
                      <span className="text-xs font-mono font-bold text-emerald-400">{item.share} ({item.visitors})</span>
                    </div>

                    {/* Path Steps */}
                    <div className="flex flex-wrap items-center gap-1.5 text-xs font-mono">
                      {item.path.map((node, i) => (
                        <React.Fragment key={i}>
                          <span className="px-2 py-0.5 rounded-lg bg-white/5 border border-white/10 text-white font-medium">
                            {node}
                          </span>
                          {i < item.path.length - 1 && <span className="text-amber-400">→</span>}
                        </React.Fragment>
                      ))}
                    </div>

                    <div className="text-[10px] text-zinc-400 pt-1 border-t border-white/5 flex justify-between">
                      <span>Primary Intent: {item.intent}</span>
                      <span className="text-emerald-400 font-semibold">98.2% Completion Rate</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Entry vs Exit Pages */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[#031c15] p-5 rounded-3xl border border-white/10 space-y-3">
                <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                  Top Gateway Entry Points
                </h4>
                <div className="space-y-2 text-xs font-mono">
                  {[
                    { page: '/', name: 'Homepage (Ecosystem Hub)', count: '248,760', share: '58.0%' },
                    { page: '/prayer-times', name: 'Astronomical Timetable', count: '94,360', share: '22.0%' },
                    { page: '/quran', name: 'Noble Quran Explorer', count: '51,460', share: '12.0%' },
                    { page: '/guides', name: 'Wudu & Salah Guides', count: '34,330', share: '8.0%' },
                  ].map((p, i) => (
                    <div key={i} className="flex justify-between p-2 rounded-xl bg-black/30 border border-white/5">
                      <span className="text-white font-sans">{p.name} <span className="text-zinc-500 font-mono text-[10px]">({p.page})</span></span>
                      <span className="text-emerald-300 font-bold">{p.share}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-[#031c15] p-5 rounded-3xl border border-white/10 space-y-3">
                <h4 className="text-xs font-bold text-red-400 uppercase tracking-wider">
                  Top Exit Points (Session Completion)
                </h4>
                <div className="space-y-2 text-xs font-mono">
                  {[
                    { page: '/quran', name: 'Finished Daily Recitation', share: '32.4%' },
                    { page: '/prayer-times', name: 'Checked Adhan Schedule', share: '28.1%' },
                    { page: '/zakat', name: 'Completed Nisab Calculation', share: '19.8%' },
                    { page: '/contact', name: 'Submitted Inquiries / Sadaqah', share: '11.2%' },
                  ].map((p, i) => (
                    <div key={i} className="flex justify-between p-2 rounded-xl bg-black/30 border border-white/5">
                      <span className="text-white font-sans">{p.name}</span>
                      <span className="text-zinc-400">{p.share}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ====================================================
            TAB 5: CLICK & SCROLL HEATMAP ANALYTICS
           ==================================================== */}
        {activeTab === 'heatmap' && (
          <div className="space-y-6">
            {/* Top Heatmap Control Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-4 bg-[#031c15] p-5 rounded-3xl border border-white/10">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <MousePointerClick className="w-5 h-5 text-amber-400" />
                  <span>Interaction & Click Density Heatmap</span>
                </h3>
                <p className="text-xs text-emerald-300/70 mt-0.5">
                  Visual telemetry of user clicks, scroll depth, and component engagement intensity.
                </p>
              </div>

              {/* Heatmap Mode Selector */}
              <div className="flex items-center bg-black/40 p-1 rounded-2xl border border-white/10 text-xs">
                {[
                  { id: 'clicks', label: '🔥 Click Hotspots' },
                  { id: 'scroll', label: '📊 Scroll Depth' },
                  { id: 'time', label: '⏱️ Hover Engagement' },
                ].map((mode) => (
                  <button
                    key={mode.id}
                    onClick={() => setHeatmapMode(mode.id as any)}
                    className={`px-3.5 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                      heatmapMode === mode.id
                        ? 'bg-amber-500 text-emerald-950 shadow'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    {mode.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Interactive Visual Heatmap Matrix */}
            <div className="bg-[#031c15] border border-white/10 rounded-3xl p-6 space-y-6">
              <div className="flex items-center justify-between text-xs border-b border-white/10 pb-3">
                <span className="font-bold text-white uppercase tracking-wider">
                  UI Component Hotspot Map (Sample of 428.9k Visitors)
                </span>
                <div className="flex items-center gap-3 font-mono text-[11px]">
                  <span className="flex items-center gap-1 text-red-400">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500" /> Ultra Hot (&gt;80%)
                  </span>
                  <span className="flex items-center gap-1 text-amber-400">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400" /> Warm (60-80%)
                  </span>
                  <span className="flex items-center gap-1 text-emerald-400">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" /> Steady (40-60%)
                  </span>
                </div>
              </div>

              {/* Component Hotspots Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  {
                    component: 'Hero CTA: Full Prayer Timetable & Quran',
                    intensity: 94,
                    clicks: '182,400 clicks',
                    category: 'Primary Call to Action',
                    color: 'from-red-500/20 to-amber-500/10 border-red-500/40 text-red-300',
                    dot: 'bg-red-500'
                  },
                  {
                    component: 'Prayer Times Table & Calculation Method Selector',
                    intensity: 91,
                    clicks: '176,200 clicks',
                    category: 'Daily Essential Routine',
                    color: 'from-red-500/20 to-amber-500/10 border-red-500/40 text-red-300',
                    dot: 'bg-red-500'
                  },
                  {
                    component: 'Floating "Ask AI" Spiritual Bubble',
                    intensity: 88,
                    clicks: '169,500 clicks',
                    category: 'Bottom-Right Assistant',
                    color: 'from-red-500/20 to-amber-500/10 border-red-500/40 text-red-300',
                    dot: 'bg-red-500'
                  },
                  {
                    component: 'Zakat Country Currency & Spot Bullion Switcher',
                    intensity: 82,
                    clicks: '158,100 clicks',
                    category: 'Financial Fiqh Engine',
                    color: 'from-amber-500/20 to-emerald-500/10 border-amber-500/40 text-amber-300',
                    dot: 'bg-amber-400'
                  },
                  {
                    component: 'Noble Quran Surah Cards & Audio Reciter Toggle',
                    intensity: 79,
                    clicks: '152,600 clicks',
                    category: 'Scripture & Recitation',
                    color: 'from-amber-500/20 to-emerald-500/10 border-amber-500/40 text-amber-300',
                    dot: 'bg-amber-400'
                  },
                  {
                    component: 'Explore More: 10 Practice Pillars Showcase Grid',
                    intensity: 76,
                    clicks: '146,800 clicks',
                    category: 'Discovery Portal',
                    color: 'from-amber-500/20 to-emerald-500/10 border-amber-500/40 text-amber-300',
                    dot: 'bg-amber-400'
                  },
                  {
                    component: 'Native 11-Language Switcher (Top Navbar)',
                    intensity: 71,
                    clicks: '137,200 clicks',
                    category: 'Multilingual Switching',
                    color: 'from-emerald-500/20 to-teal-500/10 border-emerald-500/40 text-emerald-300',
                    dot: 'bg-emerald-400'
                  },
                  {
                    component: 'Spherical Qibla Compass Sensor Calibration',
                    intensity: 68,
                    clicks: '131,400 clicks',
                    category: 'Directional Sensor',
                    color: 'from-emerald-500/20 to-teal-500/10 border-emerald-500/40 text-emerald-300',
                    dot: 'bg-emerald-400'
                  },
                ].map((item, idx) => (
                  <div key={idx} className={`p-4 rounded-2xl bg-gradient-to-br border ${item.color} space-y-2`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className={`w-2.5 h-2.5 rounded-full ${item.dot} animate-pulse`} />
                        <span className="text-xs font-bold text-white">{item.component}</span>
                      </div>
                      <span className="text-xs font-mono font-black">{item.intensity}%</span>
                    </div>

                    <div className="flex justify-between items-center text-[11px] text-zinc-300 pt-1">
                      <span className="font-mono">{item.clicks}</span>
                      <span className="text-[10px] text-zinc-400 font-sans">{item.category}</span>
                    </div>

                    {/* Intensity Visual Bar */}
                    <div className="w-full h-1.5 bg-black/40 rounded-full overflow-hidden">
                      <div className={`h-full ${item.dot}`} style={{ width: `${item.intensity}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Scroll Depth Analysis */}
            <div className="bg-[#031c15] p-6 rounded-3xl border border-white/10 space-y-4">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <Layers className="w-4 h-4 text-emerald-400" />
                <span>Page Scroll Depth Retention Curve</span>
              </h4>

              <div className="space-y-3">
                {[
                  { fold: '0% - 25% Fold (Hero, Search & Adhan Schedule)', percent: 100, color: 'bg-emerald-400' },
                  { fold: '25% - 50% Fold (Prayer Times Table & Verse of Day)', percent: 88, color: 'bg-emerald-500' },
                  { fold: '50% - 75% Fold (Quran Reader & 10 Practice Pillars)', percent: 66, color: 'bg-amber-400' },
                  { fold: '75% - 100% Fold (Calendar, App Stores & Ecosystem Footer)', percent: 44, color: 'bg-sky-400' },
                ].map((s, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-emerald-200 font-medium">{s.fold}</span>
                      <span className="text-white font-mono font-bold">{s.percent}% of visitors reach here</span>
                    </div>
                    <div className="w-full h-2.5 bg-black/40 rounded-full overflow-hidden border border-white/5">
                      <div className={`h-full ${s.color}`} style={{ width: `${s.percent}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ====================================================
            TAB 6: APPEARANCE & ATMOSPHERE
           ==================================================== */}
        {activeTab === 'appearance' && (
          <div className="space-y-6">
            <div className="bg-[#031c15] p-6 rounded-3xl border border-white/10 space-y-6">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Palette className="w-5 h-5 text-amber-400" />
                  <span>Global Platform Spiritual Theme Engine</span>
                </h3>
                <p className="text-xs text-emerald-300/70 mt-1">
                  Configure global atmospheric styling, glassmorphism density, and default visitor experience.
                </p>
              </div>

              {/* Theme Selection */}
              <div>
                <label className="block text-xs font-semibold text-emerald-200 mb-3">
                  Atmospheric Ambient Palettes
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {[
                    { id: 'emerald', name: 'Emerald Islamic Glow', desc: 'Lush Medina green aesthetic', color: 'from-emerald-600 to-[#021812]' },
                    { id: 'gold', name: 'Al-Kaaba Gold Silk', desc: 'Sacred Kiswah golden hues', color: 'from-amber-600 to-[#021812]' },
                    { id: 'sapphire', name: 'Midnight Celestial Blue', desc: 'Astrolabe night sky', color: 'from-sky-700 to-[#021812]' },
                    { id: 'obsidian', name: 'Deep Madinah Obsidian', desc: 'Ultra-minimal pure dark', color: 'from-zinc-800 to-black' },
                  ].map((theme) => (
                    <button
                      key={theme.id}
                      onClick={() => {
                        setThemeHue(theme.id as any);
                        triggerNotice(`Atmospheric theme set to ${theme.name}`);
                      }}
                      className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                        themeHue === theme.id
                          ? 'border-amber-400 shadow-lg shadow-amber-500/20 ring-2 ring-amber-400/40'
                          : 'border-white/10 hover:border-white/30'
                      } bg-gradient-to-br ${theme.color}`}
                    >
                      <span className="text-xs font-black text-white block">{theme.name}</span>
                      <span className="text-[10px] text-emerald-200/70 block mt-1">{theme.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Glassmorphism Controls */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-white/10">
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-semibold text-emerald-200">
                    <span>Backdrop Blur Intensity</span>
                    <span className="text-amber-300 font-mono">{blurAmount}px</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="50"
                    value={blurAmount}
                    onChange={(e) => setBlurAmount(Number(e.target.value))}
                    className="w-full accent-amber-400 h-1.5 bg-black/40 rounded-lg cursor-pointer"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-semibold text-emerald-200">
                    <span>Liquid Glass Opacity</span>
                    <span className="text-amber-300 font-mono">{glassOpacity}%</span>
                  </div>
                  <input
                    type="range"
                    min="20"
                    max="90"
                    value={glassOpacity}
                    onChange={(e) => setGlassOpacity(Number(e.target.value))}
                    className="w-full accent-amber-400 h-1.5 bg-black/40 rounded-lg cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ====================================================
            TAB 4: ARTICLE & CMS MANAGEMENT
           ==================================================== */}
        {activeTab === 'cms' && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 bg-[#031c15] p-5 rounded-3xl border border-white/10">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <FileText className="w-5 h-5 text-amber-400" />
                  <span>Editorial Publications & Scholarly Articles</span>
                </h3>
                <p className="text-xs text-emerald-300/70 mt-0.5">
                  Publish verified classical Islamic articles, Ramadan guides, and astronomical fiqh essays.
                </p>
              </div>

              <button
                onClick={() => setShowAddArticle(true)}
                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-emerald-950 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-md"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>New Publication</span>
              </button>
            </div>

            {/* Articles List */}
            <div className="space-y-3">
              {articles.map((art) => (
                <div
                  key={art.id}
                  className="p-4 sm:p-5 rounded-2xl bg-[#031c15] border border-white/10 flex flex-wrap items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-semibold">
                        {art.category}
                      </span>
                      <span className="text-[10px] text-emerald-400/60 font-mono">{art.date}</span>
                      <span className="text-[10px] text-amber-300 font-mono">👁️ {art.views} views</span>
                    </div>
                    <h4 className="text-sm font-bold text-white">{art.title}</h4>
                    <span className="text-xs text-emerald-300/70 block">By {art.author}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[11px] px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-300 font-bold border border-emerald-500/30">
                      {art.status}
                    </span>
                    <button
                      onClick={() => setArticles(articles.filter((a) => a.id !== art.id))}
                      className="p-2 text-red-400 hover:text-red-300 hover:bg-white/5 rounded-xl transition-colors cursor-pointer"
                      title="Delete Publication"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Add Publication Modal */}
            {showAddArticle && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-in fade-in">
                <div className="bg-[#031d16] border border-amber-500/40 rounded-3xl w-full max-w-lg p-6 shadow-2xl text-left">
                  <h4 className="text-base font-bold text-white mb-4">Create New Scholarly Publication</h4>
                  <form onSubmit={handleCreateArticle} className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-emerald-200 mb-1">Article Title</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. The Fiqh and Astronomical Calculations of Fajr & Isha"
                        value={newArtTitle}
                        onChange={(e) => setNewArtTitle(e.target.value)}
                        className="w-full bg-black/40 border border-white/15 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-emerald-200 mb-1">Category</label>
                        <select
                          value={newArtCategory}
                          onChange={(e) => setNewArtCategory(e.target.value)}
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
                        <label className="block text-xs font-semibold text-emerald-200 mb-1">Author / Scholar</label>
                        <input
                          type="text"
                          value={newArtAuthor}
                          onChange={(e) => setNewArtAuthor(e.target.value)}
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
                        className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-emerald-950 font-bold text-xs cursor-pointer shadow"
                      >
                        Publish Publication
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ====================================================
            TAB 5: EXPORT DATA & SYSTEM BACKUPS
           ==================================================== */}
        {activeTab === 'exports' && (
          <div className="space-y-6">
            <div className="bg-[#031c15] p-6 rounded-3xl border border-white/10 space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Download className="w-5 h-5 text-amber-400" />
                <span>Super Admin Global Data Export & Backups</span>
              </h3>
              <p className="text-xs text-emerald-300/70">
                Download structured CSV and JSON exports of all platform data, registered user directories, and system configurations.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3">
                <div className="p-4 rounded-2xl bg-black/30 border border-white/10 space-y-2">
                  <span className="text-xs font-bold text-white block">Registered Users Directory (CSV)</span>
                  <p className="text-[11px] text-emerald-300/70">
                    Tabular export of all registered users with emails, statuses, prayer streaks, and fiqh settings.
                  </p>
                  <button
                    onClick={exportAllUsersAsCSV}
                    className="px-4 py-2 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-400/40 text-emerald-300 text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer mt-2"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Users CSV</span>
                  </button>
                </div>

                <div className="p-4 rounded-2xl bg-black/30 border border-white/10 space-y-2">
                  <span className="text-xs font-bold text-white block">Full System Database Backup (JSON)</span>
                  <p className="text-[11px] text-emerald-300/70">
                    Complete machine-readable JSON backup of users, settings, and spiritual activity logs.
                  </p>
                  <button
                    onClick={exportAllUsersAsJSON}
                    className="px-4 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/40 text-amber-300 text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer mt-2"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download JSON Backup</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
