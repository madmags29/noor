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
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-16 pb-12 border-b border-white/10">
        
        {/* Column 1: Brand & Mobile Apps */}
        <div className="space-y-4">
          <MuslimLogo size="lg" showText={true} />

          <p className="text-xs text-emerald-200/75 leading-relaxed max-w-sm">
            {t('footerAbout')}
          </p>

          <div className="flex items-center gap-3 pt-2">
            <Link
              href="/app-preview"
              className="liquid-pill px-3 py-1.5 rounded-full text-[11px] text-white flex items-center gap-1.5 font-bold hover:border-amber-400 whitespace-nowrap transition-colors"
            >
              <Apple className="w-3.5 h-3.5" />
              <span>{t('iosApp')}</span>
            </Link>
            <Link
              href="/app-preview"
              className="liquid-pill px-3 py-1.5 rounded-full text-[11px] text-white flex items-center gap-1.5 font-bold hover:border-amber-400 whitespace-nowrap transition-colors"
            >
              <Play className="w-3.5 h-3.5 fill-white" />
              <span>{t('androidApp')}</span>
            </Link>
          </div>

          <div className="flex items-center gap-2 pt-2 text-[10px] text-emerald-400/80 font-mono">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>100% Shariah Compliant • Zero Obscene Ads</span>
          </div>
        </div>

        {/* Column 2: Core Islamic Pillars (Matches Header Primary Nav) */}
        <div>
          <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-3.5 text-amber-400 flex items-center gap-1.5">
            <span>🕌</span>
            <span>{t('colIslamicFeatures')}</span>
          </h4>
          <ul className="space-y-2.5">
            <li>
              <Link href="/prayer-times" className="hover:text-amber-300 transition-colors flex items-center gap-2">
                <span>🕌</span>
                <span>{t('prayers')} ({t('prayerTimetable')})</span>
              </Link>
            </li>
            <li>
              <Link href="/quran" className="hover:text-amber-300 transition-colors flex items-center gap-2">
                <span>📖</span>
                <span>{t('quran')} (114 Surahs)</span>
              </Link>
            </li>
            <li>
              <Link href="/duas" className="hover:text-amber-300 transition-colors flex items-center gap-2">
                <span>🤲</span>
                <span>{t('duas')} (Hisn al-Muslim)</span>
              </Link>
            </li>
            <li>
              <Link href="/ziyarat" className="hover:text-amber-300 transition-colors flex items-center gap-2 text-amber-300 font-medium">
                <span>🏛️</span>
                <span>{t('ziyarat')} ({t('sanctuariesDirectory')})</span>
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Spiritual Tools & Explore (Matches Header Explore Menu) */}
        <div>
          <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-3.5 text-amber-400 flex items-center gap-1.5">
            <span>🧭</span>
            <span>{t('explore')} & Tools</span>
          </h4>
          <ul className="space-y-2.5">
            <li>
              <Link href="/qibla" className="hover:text-amber-300 transition-colors flex items-center gap-2">
                <span>🧭</span>
                <span>{t('qibla')} (3D Kaaba Azimuth)</span>
              </Link>
            </li>
            <li>
              <Link href="/media" className="hover:text-amber-300 transition-colors flex items-center gap-2">
                <span>📻</span>
                <span>{t('media')} (Live Makkah & Adhan)</span>
              </Link>
            </li>
            <li>
              <Link href="/calendar" className="hover:text-amber-300 transition-colors flex items-center gap-2">
                <span>🌙</span>
                <span>{t('calendar')} (Hijri 1448 AH)</span>
              </Link>
            </li>
            <li>
              <Link href="/?profile=true" className="hover:text-amber-300 transition-colors flex items-center gap-2">
                <span>📊</span>
                <span>{t('dashboard')} (Salah Tracker)</span>
              </Link>
            </li>
            <li>
              <Link href="/app-preview" className="hover:text-amber-300 transition-colors flex items-center gap-2">
                <span>📱</span>
                <span>{t('app')} (Mobile Companion)</span>
              </Link>
            </li>
          </ul>
        </div>

      </div>

      {/* Bottom Bar: Copyright notice */}
      <div className="max-w-7xl mx-auto pt-8 flex items-center justify-between">
        <p className="text-[11px] text-emerald-400/60">
          {t('footerCopyright')}
        </p>
      </div>
    </footer>
  );
};
