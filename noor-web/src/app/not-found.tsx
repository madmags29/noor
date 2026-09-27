import React from 'react';
import Link from 'next/link';
import { Compass, BookOpen, Clock, Heart, Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#02120d] text-[#f3f4f6] flex flex-col justify-between selection:bg-amber-500 selection:text-black">
      {/* Background Ambient Glow */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-amber-500/10 via-emerald-600/15 to-transparent rounded-full blur-3xl opacity-70" />
      </div>

      {/* Top Simple Brand Bar */}
      <header className="w-full max-w-7xl mx-auto px-4 py-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-300 p-0.5 shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-[#021811] rounded-[14px] flex items-center justify-center">
              <span className="text-amber-400 font-serif font-black text-lg">ن</span>
            </div>
          </div>
          <div>
            <span className="text-lg font-black tracking-tight text-white group-hover:text-amber-300 transition-colors">
              Noor-e-ilahi
            </span>
            <span className="block text-[10px] text-emerald-400/80 font-mono tracking-wider uppercase">
              Divine Light Platform
            </span>
          </div>
        </Link>

        <Link
          href="/"
          className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-emerald-200 hover:text-white border border-white/10 text-xs font-semibold flex items-center gap-1.5 transition-all"
        >
          <Home className="w-3.5 h-3.5" />
          <span>Home</span>
        </Link>
      </header>

      {/* Center 404 Hero */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="max-w-xl w-full text-center space-y-6">
          <div className="relative inline-block">
            <span className="text-7xl sm:text-9xl font-black tracking-tighter bg-gradient-to-b from-amber-300 via-amber-500 to-emerald-700 bg-clip-text text-transparent select-none">
              404
            </span>
            <span className="absolute -top-3 -right-3 text-2xl animate-pulse">✨</span>
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Page Not Found
            </h1>
            <p className="text-sm sm:text-base text-emerald-100/70 max-w-md mx-auto leading-relaxed">
              The page you are seeking does not exist or may have been relocated.
              Let us guide you back to your spiritual journey.
            </p>
          </div>

          {/* Quick Pillar Links */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4">
            <Link
              href="/prayer-times"
              className="p-3.5 rounded-2xl bg-white/[0.03] hover:bg-emerald-900/30 border border-white/10 hover:border-amber-400/40 transition-all flex flex-col items-center gap-2 group text-center"
            >
              <div className="w-9 h-9 rounded-xl bg-emerald-950 text-amber-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Clock className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold text-white group-hover:text-amber-300">Prayer Times</span>
            </Link>

            <Link
              href="/quran"
              className="p-3.5 rounded-2xl bg-white/[0.03] hover:bg-emerald-900/30 border border-white/10 hover:border-amber-400/40 transition-all flex flex-col items-center gap-2 group text-center"
            >
              <div className="w-9 h-9 rounded-xl bg-emerald-950 text-amber-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                <BookOpen className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold text-white group-hover:text-amber-300">Noble Quran</span>
            </Link>

            <Link
              href="/qibla"
              className="p-3.5 rounded-2xl bg-white/[0.03] hover:bg-emerald-900/30 border border-white/10 hover:border-amber-400/40 transition-all flex flex-col items-center gap-2 group text-center"
            >
              <div className="w-9 h-9 rounded-xl bg-emerald-950 text-amber-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Compass className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold text-white group-hover:text-amber-300">Qibla Compass</span>
            </Link>

            <Link
              href="/duas"
              className="p-3.5 rounded-2xl bg-white/[0.03] hover:bg-emerald-900/30 border border-white/10 hover:border-amber-400/40 transition-all flex flex-col items-center gap-2 group text-center"
            >
              <div className="w-9 h-9 rounded-xl bg-emerald-950 text-amber-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Heart className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold text-white group-hover:text-amber-300">Daily Duas</span>
            </Link>
          </div>

          <div className="pt-2">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-400 text-black font-black text-sm shadow-xl shadow-amber-500/20 hover:scale-105 active:scale-95 transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Return to Homepage</span>
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full max-w-7xl mx-auto px-4 py-6 text-center text-xs text-emerald-200/50 border-t border-white/5">
        © 2026 Noor-e-ilahi. Certified 100% Shariah Compliant & Ad-Free.
      </footer>
    </div>
  );
}
