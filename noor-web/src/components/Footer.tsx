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
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 pb-12 border-b border-white/10">
        
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

          <div className="pt-0.5 text-[11px] text-emerald-300/80 flex items-center gap-2">
            <span className="text-amber-400">✉️</span>
            <Link href="/contact" className="font-mono hover:text-amber-300 transition-colors">
              salam@nooreilahi.com
            </Link>
          </div>
        </div>

        {/* Column 2: Core Islamic Worship */}
        <div>
          <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-3.5 text-amber-400 flex items-center gap-1.5">
            <span>🕌</span>
            <span>Worship & Pillars</span>
          </h4>
          <ul className="space-y-2.5">
            <li>
              <Link href="/prayer-times" className="hover:text-amber-300 transition-colors flex items-center gap-2">
                <span>🕌</span>
                <span>{t('prayers')} ({t('prayerTimetable')})</span>
              </Link>
            </li>
            <li>
              <Link href="/guides" className="hover:text-amber-300 transition-colors flex items-center gap-2 text-amber-300">
                <span>✨</span>
                <span>Wudu, Ghusl & Salah Guides</span>
              </Link>
            </li>
            <li>
              <Link href="/quran" className="hover:text-amber-300 transition-colors flex items-center gap-2">
                <span>📖</span>
                <span>{t('quran')} (Offline & Tafsir)</span>
              </Link>
            </li>
            <li>
              <Link href="/duas" className="hover:text-amber-300 transition-colors flex items-center gap-2">
                <span>🤲</span>
                <span>14 Life Duas & Adhkar</span>
              </Link>
            </li>
            <li>
              <Link href="/hajj-umrah" className="hover:text-amber-300 transition-colors flex items-center gap-2">
                <span>🕋</span>
                <span>Hajj & Umrah Pilgrimage Guide</span>
              </Link>
            </li>
            <li>
              <Link href="/zakat" className="hover:text-amber-300 transition-colors flex items-center gap-2">
                <span>🪙</span>
                <span>Zakat Calculator & 9 Sadaqah</span>
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Daily Life & Family */}
        <div>
          <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-3.5 text-amber-400 flex items-center gap-1.5">
            <span>🌱</span>
            <span>Family & Life Guides</span>
          </h4>
          <ul className="space-y-2.5">
            <li>
              <Link href="/kids" className="hover:text-amber-300 transition-colors flex items-center gap-2">
                <span>🧒</span>
                <span>NOOR Kids & Arabic Letters</span>
              </Link>
            </li>
            <li>
              <Link href="/janazah" className="hover:text-amber-300 transition-colors flex items-center gap-2">
                <span>🕊️</span>
                <span>Janazah & Bereavement Guide</span>
              </Link>
            </li>
            <li>
              <Link href="/etiquette" className="hover:text-amber-300 transition-colors flex items-center gap-2">
                <span>📜</span>
                <span>Islamic Etiquette (Adab) Library</span>
              </Link>
            </li>
            <li>
              <Link href="/nikah" className="hover:text-amber-300 transition-colors flex items-center gap-2">
                <span>💍</span>
                <span>Nikah & Family Education</span>
              </Link>
            </li>
            <li>
              <Link href="/travel" className="hover:text-amber-300 transition-colors flex items-center gap-2">
                <span>✈️</span>
                <span>Travel Mode & Qasr Rules</span>
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 4: Explorer & Discovery */}
        <div>
          <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-3.5 text-amber-400 flex items-center gap-1.5">
            <span>🔍</span>
            <span>Search & Discovery</span>
          </h4>
          <ul className="space-y-2.5">
            <li>
              <Link href="/search" className="hover:text-amber-300 transition-colors flex items-center gap-2 text-amber-300 font-semibold">
                <span>🔍</span>
                <span>Search Islam Encyclopedia</span>
              </Link>
            </li>
            <li>
              <Link href="/ziyarat" className="hover:text-amber-300 transition-colors flex items-center gap-2">
                <span>🏛️</span>
                <span>Dargahs, Shrines & Ziyarat</span>
              </Link>
            </li>
            <li>
              <Link href="/watch" className="hover:text-amber-300 transition-colors flex items-center gap-2">
                <span>📺</span>
                <span>NOOR Watch (24/7 Haramain)</span>
              </Link>
            </li>
            <li>
              <Link href="/qibla" className="hover:text-amber-300 transition-colors flex items-center gap-2">
                <span>🧭</span>
                <span>Live Qibla Compass</span>
              </Link>
            </li>
            <li>
              <Link href="/calendar" className="hover:text-amber-300 transition-colors flex items-center gap-2">
                <span>🌙</span>
                <span>Hijri Calendar 1448 AH</span>
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-amber-300 transition-colors flex items-center gap-2 text-amber-300 font-medium">
                <span>✉️</span>
                <span>Contact & Inquiries</span>
              </Link>
            </li>
          </ul>
        </div>

      </div>

      {/* Bottom Bar: Copyright notice & Official Contact */}
      <div className="max-w-7xl mx-auto pt-8 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-[11px] text-emerald-400/60 text-center sm:text-left">
          {t('footerCopyright')}
        </p>
        <Link href="/contact" className="text-[11px] text-amber-300/80 hover:text-amber-300 font-mono transition-colors flex items-center gap-1.5">
          <span>Official Inbox:</span>
          <span className="underline underline-offset-2">salam@nooreilahi.com</span>
        </Link>
      </div>
    </footer>
  );
};
