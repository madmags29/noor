'use client';

// ============================================================
// NOOR Web — User Login & Signup Modal with Google Auth
// ============================================================

import React, { useState } from 'react';
import { X, Mail, Lock, User as UserIcon, CheckCircle, ShieldCheck } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: { name: string; email: string }) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  const [tab, setTab] = useState<'signin' | 'signup'>('signin');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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
      onLoginSuccess({ name: displayName, email });
      onClose();
    }, 600);
  };

  const handleGoogleSignIn = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLoginSuccess({ name: 'Zubair Ahmad', email: 'zubair.ahmad@gmail.com' });
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in">
      <div className="bg-[#031c15] border border-amber-500/30 rounded-3xl w-full max-w-md p-6 sm:p-8 shadow-2xl relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-emerald-400 hover:text-white p-1 rounded-lg"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-emerald-700 flex items-center justify-center mx-auto mb-3 shadow-lg shadow-amber-500/20">
            <UserIcon className="w-6 h-6 text-emerald-950" />
          </div>
          <h3 className="text-xl font-bold text-white">
            {tab === 'signin' ? 'Welcome Back to NOOR' : 'Join the NOOR Community'}
          </h3>
          <p className="text-xs text-emerald-200/70 mt-1">
            Sync prayer progress, favorite verses, and personal adhkar across all devices
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex bg-[#06241b] rounded-xl p-1 mb-6 border border-emerald-800/40">
          <button
            onClick={() => { setTab('signin'); setError(''); }}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              tab === 'signin'
                ? 'bg-amber-500 text-emerald-950 font-bold shadow'
                : 'text-emerald-300 hover:text-white'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => { setTab('signup'); setError(''); }}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              tab === 'signup'
                ? 'bg-amber-500 text-emerald-950 font-bold shadow'
                : 'text-emerald-300 hover:text-white'
            }`}
          >
            Create Account
          </button>
        </div>

        {/* Continue with Google */}
        <button
          onClick={handleGoogleSignIn}
          disabled={loading}
          className="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-gray-100 text-gray-800 font-bold text-xs flex items-center justify-center gap-2.5 shadow-md transition-all hover:scale-[1.01] mb-4"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
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
          <span>Continue with Google</span>
        </button>

        <div className="flex items-center my-4">
          <div className="flex-grow border-t border-emerald-800/60" />
          <span className="px-3 text-[11px] text-emerald-400/60 uppercase tracking-widest font-semibold">or email</span>
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
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-emerald-950 font-bold text-xs shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2 mt-4"
          >
            {loading ? (
              <span>Authenticating...</span>
            ) : (
              <span>{tab === 'signin' ? 'Sign In to NOOR' : 'Create Account'}</span>
            )}
          </button>
        </form>

        <div className="mt-4 text-center">
          <button
            onClick={() => {
              onLoginSuccess({ name: 'Guest Brother/Sister', email: 'guest@noor.app' });
              onClose();
            }}
            className="text-[11px] text-emerald-400/80 hover:text-amber-300 transition-colors underline"
          >
            Continue as Guest
          </button>
        </div>
      </div>
    </div>
  );
};
