'use client';

// ============================================================
// NOOR Web — Dedicated Hijri Calendar & Holy Observances Page
// ============================================================

import React from 'react';
import Link from 'next/link';
import {
  Calendar,
  ArrowLeft,
  Moon,
  Sparkles,
  Star,
  Clock,
  ShieldCheck
} from 'lucide-react';
import { GlobalNavbar } from '../../components/GlobalNavbar';
import { Footer } from '../../components/Footer';

const MONTHS = [
  { index: 1, nameEn: 'Muharram', nameAr: 'المُحَرَّم', sacred: true, desc: 'Sacred month; contains the Day of Ashura (10th).' },
  { index: 2, nameEn: 'Safar', nameAr: 'صَفَر', sacred: false, desc: 'Second lunar month.' },
  { index: 3, nameEn: 'Rabi al-Awwal', nameAr: 'رَبِيع الأَوَّل', sacred: false, desc: 'Month of the blessed birth of Prophet Muhammad ﷺ.' },
  { index: 4, nameEn: 'Rabi al-Thani', nameAr: 'رَبِيع الآخِر', sacred: false, desc: 'Fourth month in the Hijri calendar.' },
  { index: 5, nameEn: 'Jumada al-Awwal', nameAr: 'جُمَادَى الأُولَى', sacred: false, desc: 'Fifth lunar month.' },
  { index: 6, nameEn: 'Jumada al-Thani', nameAr: 'جُمَادَى الآخِرَة', sacred: false, desc: 'Sixth lunar month.' },
  { index: 7, nameEn: 'Rajab', nameAr: 'رَجَب', sacred: true, desc: 'Sacred month; marks the journey of Al-Isra wal-Mi’raj.' },
  { index: 8, nameEn: 'Shaban', nameAr: 'شَعْبَان', sacred: false, desc: 'Month of voluntary fasting preparing for Ramadan.' },
  { index: 9, nameEn: 'Ramadan', nameAr: 'رَمَضَان', sacred: false, holy: true, desc: 'The Holiest Month of Fasting, Taraweeh, and Quran revelation.' },
  { index: 10, nameEn: 'Shawwal', nameAr: 'شَوَّال', sacred: false, desc: 'First day is Eid al-Fitr; 6 days of Sunnah fasting.' },
  { index: 11, nameEn: 'Dhu al-Qadah', nameAr: 'ذُو القَعْدَة', sacred: true, desc: 'Sacred month preceding Hajj.' },
  { index: 12, nameEn: 'Dhu al-Hijjah', nameAr: 'ذُو الحِجَّة', sacred: true, holy: true, desc: 'Hajj pilgrimage, Day of Arafah, and Eid al-Adha.' }
];

export default function CalendarPage() {
  return (
    <div className="min-h-screen bg-[#02120d] text-white flex flex-col selection:bg-amber-500 selection:text-black relative overflow-hidden">
      {/* Lunar Crescent & Celestial Atmosphere Backdrop */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1519817650390-64a93db51149?w=1920&q=85"
          alt="Lunar Crescent and Night Sky"
          className="w-full h-full object-cover object-bottom opacity-15 filter saturate-150"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#02120d]/85 via-[#02120d]/90 to-[#02120d]" />
      </div>

      {/* Universal Global Navigation Dock */}
      <GlobalNavbar />

      {/* Sub-Header Breadcrumb */}
      <div className="border-b border-white/10 bg-[#031c15]/70 backdrop-blur-md px-4 sm:px-6 py-3 mt-1 sm:mt-2">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-emerald-200 hover:text-white transition-colors"
              title="Return to Home"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div>
              <h1 className="text-lg sm:text-xl font-black text-white">Islamic Hijri Calendar</h1>
              <p className="text-[10px] text-emerald-300/70">
                12 Lunar Months & Holy Observances for 1448 AH
              </p>
            </div>
          </div>

          <span className="liquid-pill px-4 py-1.5 rounded-full text-xs font-bold text-amber-300">
            🌙 Current: 14 Ramadan 1448 AH
          </span>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full p-6 sm:p-10 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="inline-flex items-center gap-2 liquid-pill px-4 py-1 rounded-full text-amber-400 text-xs font-bold uppercase tracking-wider">
            <Moon className="w-3.5 h-3.5" />
            <span>Divine Lunar Order</span>
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            The 12 Sacred Months of the Islamic Year
          </h2>
          <p className="text-xs sm:text-sm text-emerald-200/80 leading-relaxed font-sans">
            "Indeed, the number of months with Allah is twelve [lunar] months in the register of Allah [from] the day He created the heavens and the earth; of these, four are sacred." — Surah At-Tawbah 9:36
          </p>
        </div>

        {/* 12 Months Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {MONTHS.map(m => (
            <div
              key={m.index}
              className={`rounded-3xl p-6 border transition-all flex flex-col justify-between ${
                m.holy
                  ? 'liquid-glass-gold border-amber-400/60 shadow-2xl scale-[1.02]'
                  : 'liquid-glass border-white/10 hover:border-white/20'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="w-8 h-8 rounded-xl bg-black/40 text-amber-300 font-black text-xs flex items-center justify-center border border-white/10">
                    {m.index}
                  </span>
                  {m.sacred && (
                    <span className="text-[10px] font-bold text-emerald-300 bg-emerald-500/20 px-2 py-0.5 rounded-full border border-emerald-500/30">
                      Sacred Month
                    </span>
                  )}
                  {m.holy && (
                    <span className="text-[10px] font-bold text-amber-300 bg-amber-500/20 px-2 py-0.5 rounded-full border border-amber-500/40">
                      Blessed Holy
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-bold text-white mb-0.5">{m.nameEn}</h3>
                <p className="arabic-text text-xl font-bold text-amber-200 mb-3">{m.nameAr}</p>
                <p className="text-xs text-emerald-100/80 leading-relaxed">{m.desc}</p>
              </div>

              <div className="pt-4 border-t border-white/10 mt-4 text-[11px] text-emerald-300/60 font-mono">
                1448 Hijri Era
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Universal Footer */}
      <Footer />
    </div>
  );
}
