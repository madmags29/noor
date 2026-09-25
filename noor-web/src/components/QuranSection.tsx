'use client';

// ============================================================
// NOOR Web — Quran Catalog (All 114 Surahs) & Seamless Direct Reader
// Zero-Popup Design: Seamless navigation to full reader
// ============================================================

import React, { useState } from 'react';
import Link from 'next/link';
import { BookOpen, Search, ArrowRight, Play } from 'lucide-react';
import { SURAHS_LIST } from '../lib/quranData';
import { useLanguage } from '../context/LanguageContext';

export const QuranSection: React.FC = () => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRevelation, setSelectedRevelation] = useState<'All' | 'Meccan' | 'Medinan'>('All');

  const filteredSurahs = SURAHS_LIST.filter(surah => {
    const clean = searchTerm.trim().toLowerCase();
    const matchSearch =
      !clean ||
      surah.englishName.toLowerCase().includes(clean) ||
      surah.englishNameTranslation.toLowerCase().includes(clean) ||
      surah.name.includes(clean) ||
      surah.number.toString() === clean;

    const matchRev = selectedRevelation === 'All' || surah.revelationType === selectedRevelation;
    return matchSearch && matchRev;
  });

  return (
    <section id="quran" className="relative w-full py-16 px-4 lg:px-8 max-w-7xl mx-auto">
      {/* Subtle Illuminated Quran Background Texture */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden rounded-[3rem]">
        <img
          src="https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=1920&q=80"
          alt="Noble Quran Calligraphy"
          className="w-full h-full object-cover object-top opacity-[0.06] mix-blend-luminosity filter saturate-150"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#02120d] via-[#02120d]/85 to-[#02120d]" />
      </div>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-widest mb-1">
            <BookOpen className="w-3.5 h-3.5" />
            <span>{t('nobleScripture')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            {t('browseHolyQuran')}
          </h2>
          <p className="text-sm text-emerald-200/70 mt-1">
            {t('quranDesc')}
          </p>
        </div>

        {/* Search, Filter & Full Reader CTA */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Search Box */}
          <div className="relative">
            <Search className="w-4 h-4 text-emerald-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={t('searchSurahPlaceholder')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-2 bg-[#06241b] border border-emerald-800/60 rounded-xl text-xs text-white placeholder-emerald-400/50 focus:outline-none focus:border-amber-400 w-52 sm:w-60"
            />
          </div>

          {/* Filter Pills */}
          <div className="flex items-center bg-[#06241b] rounded-xl border border-emerald-800/50 p-1">
            {(['All', 'Meccan', 'Medinan'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setSelectedRevelation(tab)}
                className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                  selectedRevelation === tab
                    ? 'bg-amber-500 text-emerald-950 font-bold'
                    : 'text-emerald-300 hover:text-white'
                }`}
              >
                {tab === 'All' ? t('filterAll') : tab === 'Meccan' ? t('filterMeccan') : t('filterMedinan')}
              </button>
            ))}
          </div>

          {/* Direct Link to Dedicated Platform */}
          <Link
            href="/quran"
            className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-emerald-950 text-xs font-bold transition-all shadow-md flex items-center gap-1.5 whitespace-nowrap"
          >
            <span>{t('readQuranCta')}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* 114 Surahs Grid — Direct In-Page Reader Navigation (Zero Popup Modals!) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredSurahs.slice(0, 24).map((surah) => (
          <Link
            key={surah.number}
            href={`/quran?surah=${surah.number}`}
            className="text-left glass-panel rounded-2xl p-4 border border-emerald-800/30 hover:border-amber-400/50 hover:bg-emerald-900/40 transition-all group flex items-center justify-between hover:scale-[1.02]"
          >
            <div className="flex items-center gap-3.5">
              {/* Surah Number Hexagon */}
              <div className="w-10 h-10 rounded-xl bg-emerald-950/80 border border-emerald-700/50 group-hover:border-amber-400 flex items-center justify-center font-bold text-xs text-amber-300 group-hover:scale-105 transition-transform">
                {surah.number}
              </div>

              <div>
                <h4 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors">
                  {surah.englishName}
                </h4>
                <p className="text-[11px] text-emerald-300/70">
                  {surah.englishNameTranslation} • {surah.numberOfAyahs} {t('ayahsCount')}
                </p>
              </div>
            </div>

            {/* Arabic Name */}
            <div className="text-right">
              <span className="arabic-text text-xl font-bold text-emerald-200 group-hover:text-amber-200">
                {surah.name}
              </span>
              <div className="text-[10px] text-emerald-400/60 mt-0.5">
                {surah.revelationType === 'Meccan' ? t('filterMeccan') : t('filterMedinan')}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Bottom Link to View Remaining Surahs */}
      <div className="mt-8 text-center">
        <Link
          href="/quran"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl liquid-glass border border-amber-500/30 text-amber-300 hover:text-white font-bold text-xs hover:border-amber-400 transition-all"
        >
          <span>Explore All 114 Surahs with Full Audio & Translations</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
};
