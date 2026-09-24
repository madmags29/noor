'use client';

// ============================================================
// NOOR Web — Luxury Islamic Ecosystem Footer
// ============================================================

import React from 'react';
import Link from 'next/link';
import { Apple, Play } from 'lucide-react';

import { MuslimLogo } from './MuslimLogo';
import { useLanguage } from '../context/LanguageContext';

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="w-full bg-[#010e0a] border-t border-white/10 pt-16 pb-12 px-4 lg:px-8 mt-16 text-xs text-emerald-300/70">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">
        {/* Brand Col */}
        <div className="lg:col-span-2 space-y-4">
          <MuslimLogo size="lg" showText={true} />

          <p className="text-xs text-emerald-200/75 leading-relaxed max-w-sm">
            {t('footerAbout')}
          </p>

          <div className="flex items-center gap-3 pt-2">
            <Link
              href="/app-preview"
              className="liquid-pill px-3 py-1.5 rounded-full text-[11px] text-white flex items-center gap-1.5 font-bold hover:border-amber-400 whitespace-nowrap"
            >
              <Apple className="w-3.5 h-3.5" />
              <span>{t('iosApp')}</span>
            </Link>
            <Link
              href="/app-preview"
              className="liquid-pill px-3 py-1.5 rounded-full text-[11px] text-white flex items-center gap-1.5 font-bold hover:border-amber-400 whitespace-nowrap"
            >
              <Play className="w-3.5 h-3.5 fill-white" />
              <span>{t('androidApp')}</span>
            </Link>
          </div>
        </div>

        {/* Dedicated Pages Column */}
        <div>
          <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-3 text-amber-400">
            {t('colIslamicFeatures')}
          </h4>
          <ul className="space-y-2">
            <li><Link href="/prayer-times" className="hover:text-amber-300 transition-colors">{t('prayerTimetable')}</Link></li>
            <li><Link href="/quran" className="hover:text-amber-300 transition-colors">{t('quran')}</Link></li>
            <li><Link href="/duas" className="hover:text-amber-300 transition-colors">{t('duas')}</Link></li>
            <li><Link href="/qibla" className="hover:text-amber-300 transition-colors">{t('qibla')}</Link></li>
            <li><Link href="/media" className="hover:text-amber-300 transition-colors">{t('media')}</Link></li>
            <li><Link href="/calendar" className="hover:text-amber-300 transition-colors">{t('calendar')}</Link></li>
            <li><Link href="/ziyarat" className="hover:text-amber-300 text-amber-400/90 font-medium transition-colors">{t('sanctuariesDirectory')}</Link></li>
          </ul>
        </div>

        {/* Ethical Monetization & Ummah */}
        <div>
          <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-3 text-amber-400">
            {t('colHalalEcosystem')}
          </h4>
          <ul className="space-y-2">
            <li><Link href="/dashboard" className="hover:text-amber-300 transition-colors">{t('proMembershipTitle')}</Link></li>
            <li><Link href="/dashboard" className="hover:text-amber-300 transition-colors">{t('verifiedDirectoryTitle')}</Link></li>
            <li><Link href="/dashboard" className="hover:text-amber-300 transition-colors">{t('digitalWaqfTitle')}</Link></li>
            <li><Link href="/giving" className="hover:text-amber-300 transition-colors">{t('giving')}</Link></li>
            <li><Link href="/super-admin" className="text-amber-300 font-bold hover:text-amber-200 transition-colors flex items-center gap-1">🛡️ Super Admin Portal</Link></li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-[11px] text-emerald-400/60 text-center sm:text-left">
          {t('footerCopyright')}
        </p>

        <div className="flex items-center gap-4 text-[11px] text-emerald-300/60">
          <Link href="/sitemap.xml" className="hover:text-amber-300 transition-colors">{t('sitemapXml')}</Link>
          <span>•</span>
          <Link href="/dashboard" className="hover:text-amber-300 transition-colors">{t('adminPortal')}</Link>
        </div>
      </div>
    </footer>
  );
};
