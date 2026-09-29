'use client';

// ============================================================
// NOOR Web — Luxury Islamic Ecosystem Footer
// Perfectly synchronized with Header Primary & Explore Navigation
// ============================================================

import React from 'react';
import Link from 'next/link';
import { Apple, Play, ShieldCheck } from 'lucide-react';

import { MuslimLogo } from './MuslimLogo';
import { useLanguage } from '../context/LanguageContext';

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="w-full bg-[#010e0a] border-t border-white/10 pt-16 pb-12 px-4 lg:px-8 mt-16 text-xs text-emerald-300/70">
      <h2 className="sr-only">Footer Navigation</h2>
      {/* Brand Header Banner */}
      <div className="max-w-7xl mx-auto pb-10 mb-10 border-b border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <MuslimLogo size="lg" showText={true} />
          <p className="text-sm font-bold text-amber-300 tracking-wide">
            Your Deen. Your Daily Companion.
          </p>
          <p className="text-xs text-emerald-200/75 max-w-xl leading-relaxed">
            A global Islamic platform for prayer, Qur'an, duas, Islamic knowledge, Ziyarat, heritage and everyday Muslim life.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <Link
            href="/app-preview"
            className="liquid-pill px-4 py-2 rounded-full text-xs text-white flex items-center gap-2 font-bold hover:border-amber-400 transition-colors"
          >
            <Apple className="w-4 h-4" />
            <span>iOS App</span>
          </Link>
          <Link
            href="/app-preview"
            className="liquid-pill px-4 py-2 rounded-full text-xs text-white flex items-center gap-2 font-bold hover:border-amber-400 transition-colors"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>Android App</span>
          </Link>
          <div className="flex items-center gap-2 text-[11px] text-emerald-400/80 font-mono sm:pl-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Source-Referenced • Ad-Free</span>
          </div>
        </div>
      </div>

      {/* 5-Column Navigation Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 pb-12 border-b border-white/10">
        
        {/* Column 1: Worship */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-widest mb-3.5 text-amber-400 flex items-center gap-1.5">
            <span>🕌</span>
            <span>Worship</span>
          </h3>
          <ul className="space-y-2.5">
            <li>
              <Link href="/prayer-times" className="hover:text-amber-300 transition-colors">
                Prayer Times
              </Link>
            </li>
            <li>
              <Link href="/quran" className="hover:text-amber-300 transition-colors">
                Qur'an (114 Surahs)
              </Link>
            </li>
            <li>
              <Link href="/duas" className="hover:text-amber-300 transition-colors">
                Duas & Adhkar
              </Link>
            </li>
            <li>
              <Link href="/qibla" className="hover:text-amber-300 transition-colors">
                Qibla Direction
              </Link>
            </li>
            <li>
              <Link href="/duas" className="hover:text-amber-300 transition-colors">
                Digital Tasbeeh
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 2: Learn */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-widest mb-3.5 text-amber-400 flex items-center gap-1.5">
            <span>📖</span>
            <span>Learn</span>
          </h3>
          <ul className="space-y-2.5">
            <li>
              <Link href="/duas" className="hover:text-amber-300 transition-colors">
                Hadith & Sunnah
              </Link>
            </li>
            <li>
              <Link href="/guides" className="hover:text-amber-300 transition-colors">
                Wudu, Ghusl & Salah
              </Link>
            </li>
            <li>
              <Link href="/quran" className="hover:text-amber-300 transition-colors">
                Tafsir & Translations
              </Link>
            </li>
            <li>
              <Link href="/kids" className="hover:text-amber-300 transition-colors">
                Prophetic Stories & Seerah
              </Link>
            </li>
            <li>
              <Link href="/sources" className="hover:text-amber-300 transition-colors">
                Islamic Knowledge Base
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Discover */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-widest mb-3.5 text-amber-400 flex items-center gap-1.5">
            <span>🏛️</span>
            <span>Discover</span>
          </h3>
          <ul className="space-y-2.5">
            <li>
              <Link href="/ziyarat" className="hover:text-amber-300 transition-colors">
                Dargahs & Ziyarat
              </Link>
            </li>
            <li>
              <Link href="/qibla" className="hover:text-amber-300 transition-colors">
                Mosques & Qibla
              </Link>
            </li>
            <li>
              <Link href="/ziyarat" className="hover:text-amber-300 transition-colors">
                Islamic Heritage Sites
              </Link>
            </li>
            <li>
              <Link href="/watch" className="hover:text-amber-300 transition-colors">
                Makkah & Madinah 24/7
              </Link>
            </li>
            <li>
              <Link href="/calendar" className="hover:text-amber-300 transition-colors">
                Islamic Calendar & Events
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 4: Life */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-widest mb-3.5 text-amber-400 flex items-center gap-1.5">
            <span>🌿</span>
            <span>Life</span>
          </h3>
          <ul className="space-y-2.5">
            <li>
              <Link href="/zakat" className="hover:text-amber-300 transition-colors">
                Zakat Calculator & Nisab
              </Link>
            </li>
            <li>
              <Link href="/hajj-umrah" className="hover:text-amber-300 transition-colors">
                Hajj & Umrah Guide
              </Link>
            </li>
            <li>
              <Link href="/nikah" className="hover:text-amber-300 transition-colors">
                5 Pillars of Nikah
              </Link>
            </li>
            <li>
              <Link href="/janazah" className="hover:text-amber-300 transition-colors">
                Salatul Janazah Guide
              </Link>
            </li>
            <li>
              <Link href="/etiquette" className="hover:text-amber-300 transition-colors">
                Islamic Adab & Manners
              </Link>
            </li>
            <li>
              <Link href="/travel" className="hover:text-amber-300 transition-colors">
                Travel Mode & Qasr
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 5: NOOR Platform */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-widest mb-3.5 text-amber-400 flex items-center gap-1.5">
            <span>🛡️</span>
            <span>NOOR</span>
          </h3>
          <ul className="space-y-2.5">
            <li>
              <Link href="/sources" className="hover:text-amber-300 transition-colors text-amber-300 font-semibold">
                Sources & Methodology
              </Link>
            </li>
            <li>
              <Link href="/app-preview" className="hover:text-amber-300 transition-colors">
                About NOOR
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-amber-300 transition-colors">
                Contact & Inquiries
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-amber-300 transition-colors text-emerald-300">
                Report an Issue / Correction
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="hover:text-amber-300 transition-colors">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-amber-300 transition-colors">
                Terms & Conditions
              </Link>
            </li>
          </ul>
        </div>

      </div>

      {/* Bottom Bar: Copyright notice, Legal Links & Official Contact */}
      <div className="max-w-7xl mx-auto pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-[11px] text-emerald-400/60 text-center md:text-left">
          © 2026 Noor-e-ilahi. Your Deen. Your Daily Companion. Sourced with Amanah. Ad-Free.
        </p>

        <div className="flex items-center gap-4 text-[11px] text-emerald-300/75 font-medium">
          <Link href="/sources" className="hover:text-amber-300 transition-colors">
            Methodology
          </Link>
          <span className="text-white/20">•</span>
          <Link href="/privacy" className="hover:text-amber-300 transition-colors">
            Privacy Policy
          </Link>
          <span className="text-white/20">•</span>
          <Link href="/terms" className="hover:text-amber-300 transition-colors">
            Terms & Conditions
          </Link>
        </div>

        <Link href="/contact" className="text-[11px] text-amber-300/80 hover:text-amber-300 font-mono transition-colors flex items-center gap-1.5">
          <span>Official Inbox:</span>
          <span className="underline underline-offset-2">salam@nooreilahi.com</span>
        </Link>
      </div>
    </footer>
  );
};
