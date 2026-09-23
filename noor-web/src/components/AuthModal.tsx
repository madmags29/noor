'use client';

// ============================================================
// NOOR Web — Google Mail Login & User Authentication Modal
// ============================================================

import React, { useState, useEffect } from 'react';
import { X, Mail, Lock, User as UserIcon, ShieldCheck, Check, Sparkles, ChevronRight, AlertCircle, Info } from 'lucide-react';

export interface AuthUser {
  name: string;
  email: string;
  picture?: string;
  provider?: 'google' | 'email';
  verified?: boolean;
}

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: AuthUser) => void;
}

// Google SVG Logo component
export const GoogleLogo: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24">
    <path
      fill="#4285F4"
      d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
    />
    <path
      fill="#34A853"
      d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
    />
    <path
      fill="#FBBC05"
      d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
    />
    <path
      fill="#EA4335"
      d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
    />
  </svg>
);

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  const [tab, setTab] = useState<'signin' | 'signup'>('signin');
  const [showGoogleFlow, setShowGoogleFlow] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [customGmail, setCustomGmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showDevInfo, setShowDevInfo] = useState(false);

  // Suggested Google Accounts
  const suggestedAccounts = [
    {
      name: 'Zubair Ahmad',
      email: 'zubair.ahmad@gmail.com',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop&crop=faces&q=80',
    },
    {
      name: 'Dr. Tariq Mansoor',
      email: 'tariq.mansoor@gmail.com',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=faces&q=80',
    },
  ];

  // Try to load Google Identity Services SDK
  useEffect(() => {
    if (!isOpen) return;

    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
    if (!clientId) return;

    // Check if script already loaded
    if (!document.getElementById('google-gsi-client')) {
      const script = document.createElement('script');
      script.id = 'google-gsi-client';
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      script.onload = () => {
        if ((window as any).google?.accounts?.id) {
          (window as any).google.accounts.id.initialize({
            client_id: clientId,
            callback: handleGoogleCredentialResponse,
          });
        }
      };
      document.body.appendChild(script);
    }
  }, [isOpen]);

  const handleGoogleCredentialResponse = (response: any) => {
    try {
      // Decode JWT payload
      const base64Url = response.credential.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      const data = JSON.parse(jsonPayload);

      const user: AuthUser = {
        name: data.name || data.given_name || 'Google User',
        email: data.email,
        picture: data.picture,
        provider: 'google',
        verified: true,
      };

      onLoginSuccess(user);
      onClose();
    } catch (err) {
      console.error('Failed to parse Google Credential:', err);
      setError('Google Sign In authentication failed. Please try again.');
    }
  };

  if (!isOpen) return null;

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all required fields.');
      return;
    }
    setLoading(true);
    setError('');

    setTimeout(() => {
      setLoading(false);
      const displayName = tab === 'signup' ? (name || 'Noor Pilgrim') : email.split('@')[0];
      const user: AuthUser = {
        name: displayName,
        email,
        provider: 'email',
        verified: false,
      };
      onLoginSuccess(user);
      onClose();
    }, 500);
  };

  const handleSelectGoogleAccount = (acc: { name: string; email: string; avatar?: string }) => {
    setLoading(true);
    setError('');
    setTimeout(() => {
      setLoading(false);
      const user: AuthUser = {
        name: acc.name,
        email: acc.email,
        picture: acc.avatar,
        provider: 'google',
        verified: true,
      };
      onLoginSuccess(user);
      onClose();
    }, 600);
  };

  const handleCustomGmailLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customGmail.trim() || !customGmail.includes('@')) {
      setError('Please enter a valid Gmail address (e.g. name@gmail.com)');
      return;
    }

    setLoading(true);
    setError('');
    setTimeout(() => {
      setLoading(false);
      const username = customGmail.split('@')[0];
      const formattedName = username
        .split(/[._-]/)
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(' ');

      const user: AuthUser = {
        name: formattedName || 'Google User',
        email: customGmail.trim(),
        provider: 'google',
        verified: true,
      };
      onLoginSuccess(user);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in">
      <div className="bg-[#031c15] border border-amber-500/30 rounded-3xl w-full max-w-md p-6 sm:p-8 shadow-2xl relative text-left">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-emerald-400 hover:text-white p-1 rounded-lg transition-colors cursor-pointer"
          aria-label="Close Auth Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* ------------------------------------------------------------- */}
        {/* VIEW A: GOOGLE MAIL SIGN-IN SELECTOR                         */}
        {/* ------------------------------------------------------------- */}
        {showGoogleFlow ? (
          <div>
            {/* Header */}
            <div className="text-center mb-6">
              <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center mx-auto mb-3 shadow-lg shadow-white/10">
                <GoogleLogo className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">Sign in with Google</h3>
              <p className="text-xs text-emerald-200/70 mt-1">
                Choose an account to continue to <span className="text-amber-300 font-semibold">Noor-e-ilahi</span>
              </p>
            </div>

            {error && (
              <div className="mb-4 p-2.5 rounded-xl bg-red-500/20 border border-red-500/40 text-red-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Google Accounts List */}
            <div className="space-y-2 mb-4">
              {suggestedAccounts.map((acc) => (
                <button
                  key={acc.email}
                  onClick={() => handleSelectGoogleAccount(acc)}
                  disabled={loading}
                  className="w-full p-3 rounded-2xl bg-black/30 hover:bg-white/10 border border-white/10 hover:border-amber-400/40 text-left transition-all flex items-center justify-between group cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={acc.avatar}
                      alt={acc.name}
                      className="w-9 h-9 rounded-full object-cover border border-amber-400/30"
                    />
                    <div>
                      <div className="text-xs font-bold text-white group-hover:text-amber-300 transition-colors">
                        {acc.name}
                      </div>
                      <div className="text-[11px] text-emerald-300/70">{acc.email}</div>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-emerald-400/50 group-hover:text-amber-300 transition-colors" />
                </button>
              ))}
            </div>

            {/* Custom Gmail Form */}
            <div className="border-t border-white/10 pt-4 mb-4">
              <div className="text-[11px] font-semibold text-emerald-300/80 mb-2">
                Use another Google Mail account:
              </div>
              <form onSubmit={handleCustomGmailLogin} className="flex gap-2">
                <div className="relative flex-1">
                  <Mail className="w-3.5 h-3.5 text-emerald-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    placeholder="your.email@gmail.com"
                    value={customGmail}
                    onChange={(e) => setCustomGmail(e.target.value)}
                    className="w-full pl-8 pr-2.5 py-2 bg-[#06241b] border border-emerald-800 rounded-xl text-xs text-white placeholder-emerald-500/50 focus:outline-none focus:border-amber-400"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-emerald-950 font-black text-xs transition-colors shrink-0 cursor-pointer shadow-md"
                >
                  {loading ? 'Signing in...' : 'Sign In'}
                </button>
              </form>
            </div>

            {/* Developer Setup Pill (Collapsible) */}
            <div className="mt-3 p-2.5 rounded-xl bg-black/40 border border-white/10 text-[11px] text-emerald-300/80">
              <button
                type="button"
                onClick={() => setShowDevInfo(!showDevInfo)}
                className="w-full flex items-center justify-between text-left text-amber-300 font-semibold cursor-pointer"
              >
                <span className="flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5" />
                  <span>Google Cloud OAuth Setup Info</span>
                </span>
                <span className="text-[10px] opacity-75">{showDevInfo ? 'Hide' : 'Show'}</span>
              </button>
              {showDevInfo && (
                <div className="mt-2 text-[10px] space-y-1 text-emerald-200/70 border-t border-white/5 pt-2">
                  <p>1. Go to <span className="text-white font-mono">console.cloud.google.com</span>.</p>
                  <p>2. Create OAuth 2.0 Client ID (Web Application).</p>
                  <p>3. Add Authorized Origins: <span className="text-white font-mono">http://localhost:3000</span> and your Vercel domain.</p>
                  <p>4. Add <span className="text-amber-300 font-mono">NEXT_PUBLIC_GOOGLE_CLIENT_ID</span> to <span className="text-white font-mono">.env.local</span>.</p>
                </div>
              )}
            </div>

            {/* Back Button */}
            <div className="mt-4 text-center">
              <button
                type="button"
                onClick={() => { setShowGoogleFlow(false); setError(''); }}
                className="text-xs text-emerald-400/80 hover:text-white transition-colors cursor-pointer"
              >
                ← Back to standard login
              </button>
            </div>
          </div>
        ) : (
          /* ------------------------------------------------------------- */
          /* VIEW B: STANDARD LOGIN & QUICK GOOGLE ENTRY                  */
          /* ------------------------------------------------------------- */
          <div>
            {/* Modal Header */}
            <div className="text-center mb-6">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-emerald-700 flex items-center justify-center mx-auto mb-3 shadow-lg shadow-amber-500/20">
                <UserIcon className="w-6 h-6 text-emerald-950" />
              </div>
              <h3 className="text-xl font-bold text-white">
                {tab === 'signin' ? 'Welcome Back to NOOR' : 'Join the NOOR Community'}
              </h3>
              <p className="text-xs text-emerald-200/70 mt-1">
                Sync prayer progress, favorite Quran verses, and personal adhkar
              </p>
            </div>

            {/* Tab Switcher */}
            <div className="flex bg-[#06241b] rounded-xl p-1 mb-5 border border-emerald-800/40">
              <button
                onClick={() => { setTab('signin'); setError(''); }}
                className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  tab === 'signin'
                    ? 'bg-amber-500 text-emerald-950 font-bold shadow'
                    : 'text-emerald-300 hover:text-white'
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => { setTab('signup'); setError(''); }}
                className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  tab === 'signup'
                    ? 'bg-amber-500 text-emerald-950 font-bold shadow'
                    : 'text-emerald-300 hover:text-white'
                }`}
              >
                Create Account
              </button>
            </div>

            {/* Continue with Google (Primary Button) */}
            <button
              type="button"
              onClick={() => setShowGoogleFlow(true)}
              disabled={loading}
              className="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-gray-100 text-gray-800 font-bold text-xs flex items-center justify-center gap-2.5 shadow-md transition-all hover:scale-[1.01] mb-4 cursor-pointer"
            >
              <GoogleLogo className="w-4 h-4" />
              <span>Continue with Google Mail</span>
            </button>

            <div className="flex items-center my-4">
              <div className="flex-grow border-t border-emerald-800/60" />
              <span className="px-3 text-[10px] text-emerald-400/60 uppercase tracking-widest font-semibold">
                or with email
              </span>
              <div className="flex-grow border-t border-emerald-800/60" />
            </div>

            {/* Error Notice */}
            {error && (
              <div className="mb-4 p-2.5 rounded-xl bg-red-500/20 border border-red-500/40 text-red-300 text-xs">
                {error}
              </div>
            )}

            {/* Email & Password Form */}
            <form onSubmit={handleEmailSubmit} className="space-y-3.5">
              {tab === 'signup' && (
                <div>
                  <label className="block text-xs font-semibold text-emerald-200 mb-1">Full Name</label>
                  <div className="relative">
                    <UserIcon className="w-4 h-4 text-emerald-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="e.g. Tariq Mansoor"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-10 pr-3 py-2 bg-[#06241b] border border-emerald-800 rounded-xl text-xs text-white placeholder-emerald-500/60 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-emerald-200 mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-emerald-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 bg-[#06241b] border border-emerald-800 rounded-xl text-xs text-white placeholder-emerald-500/60 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-emerald-200 mb-1">Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-emerald-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 bg-[#06241b] border border-emerald-800 rounded-xl text-xs text-white placeholder-emerald-500/60 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-emerald-950 font-bold text-xs shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2 mt-4 cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>{loading ? 'Authenticating...' : tab === 'signin' ? 'Sign In to NOOR' : 'Create Account'}</span>
              </button>
            </form>

            <div className="mt-4 text-center">
              <button
                onClick={() => {
                  onLoginSuccess({ name: 'Guest Brother/Sister', email: 'guest@noor.app', provider: 'email' });
                  onClose();
                }}
                className="text-[11px] text-emerald-400/80 hover:text-amber-300 transition-colors underline cursor-pointer"
              >
                Continue as Guest
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
