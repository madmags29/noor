'use client';

// ============================================================
// NOOR Web — Quran Catalog & Reader Section
// ============================================================

import React, { useState } from 'react';
import { BookOpen, Search, Play, Volume2, X, Bookmark, Share2 } from 'lucide-react';
import { SURAHS_LIST, AYAH_DATABANK, RECITERS_LIST, SurahItem } from '../lib/quranData';
import { useLanguage } from '../context/LanguageContext';

export const QuranSection: React.FC = () => {
  const { t, language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRevelation, setSelectedRevelation] = useState<'All' | 'Meccan' | 'Medinan'>('All');
  const [activeSurah, setActiveSurah] = useState<SurahItem | null>(null);
  const [selectedReciter, setSelectedReciter] = useState(RECITERS_LIST[0].id);

  const filteredSurahs = SURAHS_LIST.filter(surah => {
    const matchSearch =
      surah.englishName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      surah.englishNameTranslation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      surah.name.includes(searchTerm) ||
      surah.number.toString() === searchTerm.trim();

    const matchRev = selectedRevelation === 'All' || surah.revelationType === selectedRevelation;
    return matchSearch && matchRev;
  });

  const currentAyahs = activeSurah ? (AYAH_DATABANK[activeSurah.number] || [
    { number: 1, arabic: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ", translation: "In the name of Allah, the Entirely Merciful, the Especially Merciful." }
  ]) : [];

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

        {/* Search & Filter Bar */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Search Box */}
          <div className="relative">
            <Search className="w-4 h-4 text-emerald-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={t('searchSurahPlaceholder')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-2 bg-[#06241b] border border-emerald-800/60 rounded-xl text-xs text-white placeholder-emerald-400/50 focus:outline-none focus:border-amber-400 w-56 sm:w-64"
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
        </div>
      </div>

      {/* Surahs Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredSurahs.map((surah) => (
          <button
            key={surah.number}
            onClick={() => setActiveSurah(surah)}
            className="text-left glass-panel rounded-2xl p-4 border border-emerald-800/30 hover:border-amber-400/50 hover:bg-emerald-900/40 transition-all group flex items-center justify-between"
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
          </button>
        ))}
      </div>

      {/* Surah Reader Modal */}
      {activeSurah && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in">
          <div className="bg-[#031c15] border border-emerald-700/50 rounded-3xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-emerald-800/50 flex items-center justify-between bg-[#021711]">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300 font-bold flex items-center justify-center text-xs">
                  {activeSurah.number}
                </div>
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    {activeSurah.englishName}
                    <span className="arabic-text text-lg text-amber-300 font-normal">({activeSurah.name})</span>
                  </h3>
                  <p className="text-xs text-emerald-300/70">
                    {activeSurah.englishNameTranslation} • {activeSurah.numberOfAyahs} {t('versesCount')} • {t('juzLabel')} {activeSurah.juz}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {/* Reciter Selector */}
                <select
                  value={selectedReciter}
                  onChange={(e) => setSelectedReciter(e.target.value)}
                  className="bg-emerald-950/80 border border-emerald-700/40 rounded-xl px-2.5 py-1 text-xs text-emerald-200 focus:outline-none"
                >
                  {RECITERS_LIST.map(r => (
                    <option key={r.id} value={r.id} className="bg-[#021711]">
                      {r.name}
                    </option>
                  ))}
                </select>

                <button
                  onClick={() => setActiveSurah(null)}
                  className="p-1.5 rounded-xl bg-emerald-950 border border-emerald-700/40 text-emerald-300 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Ayahs Scrollable List */}
            <div className="p-6 overflow-y-auto space-y-6">
              {/* Bismillah Banner (except Surah 9) */}
              {activeSurah.number !== 9 && (
                <div className="text-center py-4 border-b border-emerald-900/40">
                  <p className="arabic-text text-2xl sm:text-3xl text-amber-200 font-semibold">
                    بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                  </p>
                  <p className="text-xs text-emerald-300/70 mt-1">
                    {t('bismillahTranslation')}
                  </p>
                </div>
              )}

              {currentAyahs.map((ayah) => (
                <div
                  key={ayah.number}
                  className="p-4 rounded-2xl bg-[#06241b]/50 border border-emerald-800/30 hover:border-amber-400/30 transition-colors"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/30">
                      {t('ayahNumber')} {ayah.number}
                    </span>
                    <div className="flex items-center gap-1.5 text-emerald-400">
                      <button className="p-1.5 hover:text-amber-300 transition-colors" title={t('playVerse')}>
                        <Play className="w-3.5 h-3.5" />
                      </button>
                      <button className="p-1.5 hover:text-amber-300 transition-colors" title={t('bookmarkVerse')}>
                        <Bookmark className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Arabic Text */}
                  <p className="arabic-text text-xl sm:text-2xl text-emerald-100 font-medium text-right mb-3 leading-[2.1]">
                    {ayah.arabic}
                  </p>

                  {/* Transliteration */}
                  {ayah.transliteration && (
                    <p className="text-xs text-emerald-300/60 italic mb-2">
                      "{ayah.transliteration}"
                    </p>
                  )}

                  {/* English Translation */}
                  <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed font-sans">
                    {ayah.translation}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
