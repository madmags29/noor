'use client';

// ============================================================
// NOOR Web — Executive Super Admin Control Center
// Complete User Directory, Real-Time Traffic, Appearance, CMS & Exports
// ============================================================

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
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
  UserCheck
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
  // Super Admin Authentication Gate
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [adminPin, setAdminPin] = useState<string>('');
  const [authError, setAuthError] = useState<string>('');

  // Active navigation tab
  const [activeTab, setActiveTab] = useState<'users' | 'traffic' | 'appearance' | 'cms' | 'exports'>('users');

  // Registered Users Directory State
  const [usersList, setUsersList] = useState<RegisteredUser[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'verified' | 'active' | 'suspended'>('all');
  const [editingUser, setEditingUser] = useState<RegisteredUser | null>(null);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState<string>('');

  // Real-time Traffic State
  const [trafficRange, setTrafficRange] = useState<'today' | '7d' | '30d' | '1y'>('7d');

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

  // Load initial users on mount & check if current user is owner
  useEffect(() => {
    const current = loadCurrentUser();
    if (
      current &&
      (current.email.toLowerCase().includes('majid') ||
       current.email.toLowerCase() === 'admin@nooreilahi.com' ||
       current.name.toLowerCase().includes('majid'))
    ) {
      setIsAuthenticated(true);
    }
    const all = loadAllRegisteredUsers();
    setUsersList(all);
  }, []);

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminPin === 'noor-admin-2026' || adminPin === 'admin' || adminPin === 'majid' || adminPin === '786') {
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Incorrect Super Admin passcode. (Hint: Use owner quick access)');
    }
  };

  const handleOwnerQuickAccess = () => {
    setIsAuthenticated(true);
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

  // ============================================================
  // VIEW A: ACCESS GATE (If not authenticated as Super Admin)
  // ============================================================
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#02120d] text-white flex flex-col selection:bg-amber-500 selection:text-black relative">
        <div className="flex-1 flex items-center justify-center p-4 relative overflow-hidden">
          <div className="absolute top-1/3 left-1/3 w-96 h-96 rounded-full bg-emerald-500/15 blur-3xl pointer-events-none" />
          <div className="absolute bottom-1/3 right-1/3 w-96 h-96 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

          <div className="w-full max-w-md liquid-glass rounded-3xl p-8 sm:p-10 border border-amber-500/30 shadow-2xl relative z-10 text-left">
            <div className="text-center mb-6">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 via-emerald-600 to-emerald-950 flex items-center justify-center mx-auto mb-4 shadow-xl border border-white/20">
                <ShieldCheck className="w-7 h-7 text-emerald-950" />
              </div>
              <h2 className="text-2xl font-black text-white">Super Admin Portal</h2>
              <p className="text-xs text-emerald-300/80 mt-1">
                Executive Access to User Directory, Real-Time Traffic & Platform Controls
              </p>
            </div>

            {authError && (
              <div className="mb-4 p-3 rounded-xl bg-red-500/20 border border-red-500/40 text-red-200 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                <span>{authError}</span>
              </div>
            )}

            <form onSubmit={handleAdminLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-emerald-200 mb-1">
                  Super Admin Master Passcode
                </label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-emerald-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    placeholder="Enter passcode (e.g. noor-admin-2026)"
                    value={adminPin}
                    onChange={(e) => setAdminPin(e.target.value)}
                    className="w-full pl-10 pr-3.5 py-2.5 bg-black/40 border border-white/15 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-emerald-950 font-bold text-xs shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Lock className="w-4 h-4" />
                <span>Authorize & Enter Super Admin</span>
              </button>
            </form>

            <div className="relative my-5">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10" />
              </div>
              <div className="relative flex justify-center text-[10px] uppercase font-bold text-emerald-400/60 bg-[#031d16] px-2 w-max mx-auto">
                Owner Direct Access
              </div>
            </div>

            {/* Instant Owner Access */}
            <button
              type="button"
              onClick={handleOwnerQuickAccess}
              className="w-full py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs border border-white/15 flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md"
            >
              <UserCheck className="w-4 h-4 text-amber-400" />
              <span>Enter as Owner (Majid Khan)</span>
            </button>

            <div className="mt-6 text-center">
              <Link
                href="/"
                className="text-xs text-emerald-400/80 hover:text-white transition-colors flex items-center justify-center gap-1.5"
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
            <span>Real-Time Traffic</span>
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

        {/* Exit Admin */}
        <button
          onClick={() => setIsAuthenticated(false)}
          className="p-2 rounded-xl bg-white/10 hover:bg-red-500/20 text-emerald-200 hover:text-red-300 transition-colors flex items-center gap-1.5 text-xs font-bold cursor-pointer"
          title="Sign Out of Super Admin"
        >
          <LogOut className="w-4 h-4" />
          <span className="hidden sm:inline">Exit</span>
        </button>
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
            TAB 3: APPEARANCE & ATMOSPHERE
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
