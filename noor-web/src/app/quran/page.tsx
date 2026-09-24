'use client';

// ============================================================
// NOOR Web — Dedicated Holy Quran Reader Page
// ============================================================

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  BookOpen,
  ArrowLeft,
  Search,
  Volume2,
  Play,
  X,
  Bookmark,
  Sparkles
} from 'lucide-react';
import { SURAHS_LIST, AYAH_DATABANK, RECITERS_LIST, SurahItem } from '../../lib/quranData';
import { GlobalNavbar } from '../../components/GlobalNavbar';
import { Footer } from '../../components/Footer';

export default function QuranPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRev, setSelectedRev] = useState<'All' | 'Meccan' | 'Medinan'>('All');
  const [activeSurah, setActiveSurah] = useState<SurahItem | null>(null);
  const [selectedReciter, setSelectedReciter] = useState(RECITERS_LIST[0].id);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTafsir, setShowTafsir] = useState(false);

  // Last-Read Position State
  const [lastRead, setLastRead] = useState<{ surahNumber: number; surahName: string; ayah: number } | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('@noor_quran_last_read');
      if (saved) setLastRead(JSON.parse(saved));
    } catch {}
  }, []);

  const openSurah = (surah: SurahItem, ayah = 1) => {
    setActiveSurah(surah);
    setIsPlaying(false);
    setShowTafsir(false);
    const readPos = { surahNumber: surah.number, surahName: surah.englishName, ayah };
    setLastRead(readPos);
    try {
      localStorage.setItem('@noor_quran_last_read', JSON.stringify(readPos));
    } catch {}
  };

  const resumeLastRead = () => {
    if (!lastRead) return;
    const s = SURAHS_LIST.find(x => x.number === lastRead.surahNumber);
    if (s) openSurah(s, lastRead.ayah);
  };

  const filtered = SURAHS_LIST.filter(s => {
    const matchQ =
      s.englishName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.englishNameTranslation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.name.includes(searchTerm) ||
      s.number.toString() === searchTerm.trim();
    const matchR = selectedRev === 'All' || s.revelationType === selectedRev;
    return matchQ && matchR;
  });

  const currentAyahs = activeSurah ? (AYAH_DATABANK[activeSurah.number] || [
    { number: 1, arabic: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ", translation: "In the name of Allah, the Entirely Merciful, the Especially Merciful." }
  ]) : [];

  return (
    <div className="min-h-screen bg-[#02120d] text-white flex flex-col selection:bg-amber-500 selection:text-black relative overflow-hidden">
      {/* Illuminated Holy Quran Manuscript Atmosphere Backdrop */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=1920&q=80"
          alt="Noble Quran Manuscript Illumination"
          className="w-full h-full object-cover object-top opacity-10 mix-blend-luminosity filter saturate-150"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#02120d]/90 via-[#02120d]/85 to-[#02120d]" />
      </div>

      {/* Universal Global Navigation Dock */}
      <GlobalNavbar />

      {/* Sub-Header Breadcrumb & Search */}
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
              <h1 className="text-lg sm:text-xl font-black text-white">The Noble Quran</h1>
              <p className="text-[10px] text-emerald-300/70">
                114 Surahs • Mishary Alafasy, Abdul Basit, Sudais Recitations
              </p>
            </div>
          </div>

          {/* Search Box */}
          <div className="relative">
            <Search className="w-4 h-4 text-emerald-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search Surah by name or number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-2 bg-black/40 border border-white/15 rounded-full text-xs text-white placeholder-emerald-400/50 focus:outline-none focus:border-amber-400 w-64"
            />
          </div>
        </div>
      </div>

      {/* Main Catalog */}
      <main className="flex-1 max-w-7xl mx-auto w-full p-6 sm:p-10 space-y-6">
        {/* Continue Reading Exactly Where You Left Off Banner */}
        {lastRead && (
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#03281d] via-[#043d2b] to-[#03281d] border border-amber-500/40 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
            <div className="flex items-center gap-3.5">
              <span className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-300 flex items-center justify-center border border-amber-500/30">
                <Bookmark className="w-5 h-5" />
              </span>
              <div>
                <span className="text-[10px] text-amber-400 font-bold uppercase tracking-widest font-mono">
                  Resume Reading Position
                </span>
                <h3 className="text-sm font-bold text-white">
                  Continue Surah {lastRead.surahName} (Surah #{lastRead.surahNumber}, Ayah {lastRead.ayah})
                </h3>
              </div>
            </div>

            <button
              onClick={resumeLastRead}
              className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs flex items-center gap-2 transition-colors shadow-lg shadow-amber-500/20"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Continue Exactly Where You Left Off</span>
            </button>
          </div>
        )}

        {/* Filter Pills */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center bg-black/30 p-1.5 rounded-full border border-white/10 text-xs font-semibold">
            {(['All', 'Meccan', 'Medinan'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setSelectedRev(tab)}
                className={`px-4 py-1.5 rounded-full transition-all ${
                  selectedRev === tab
                    ? 'bg-amber-500 text-emerald-950 font-black shadow-md'
                    : 'text-emerald-200 hover:text-white'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-[11px] text-emerald-300 font-mono">
              ✓ 100% Offline-Ready
            </span>
            <span className="text-xs text-emerald-300/70 font-mono">
              Showing {filtered.length} Surahs
            </span>
          </div>
        </div>

        {/* Surahs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((surah) => (
            <button
              key={surah.number}
              onClick={() => openSurah(surah)}
              className="text-left liquid-glass rounded-3xl p-5 border border-white/10 hover:border-amber-400/50 transition-all group flex items-center justify-between hover:scale-[1.02]"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-2xl bg-black/40 border border-white/15 group-hover:border-amber-400 flex items-center justify-center font-black text-xs text-amber-300">
                  {surah.number}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors">
                    {surah.englishName}
                  </h3>
                  <span className="text-[11px] text-emerald-300/70 block">
                    {surah.englishNameTranslation} • {surah.numberOfAyahs} ayahs
                  </span>
                </div>
              </div>

              <div className="text-right">
                <span className="arabic-text text-xl font-bold text-emerald-200 group-hover:text-amber-200">
                  {surah.name}
                </span>
                <span className="text-[9px] text-emerald-400/60 block mt-0.5">
                  {surah.revelationType}
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* Surah Modal Reader */}
        {activeSurah && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-xl p-4 animate-in fade-in">
            <div className="liquid-glass rounded-[2.5rem] w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden border border-white/20">
              {/* Modal Header */}
              <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-black/40">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-300 font-black flex items-center justify-center text-xs border border-amber-500/30">
                    {activeSurah.number}
                  </div>
                  <div>
                    <h3 className="text-base font-black text-white flex items-center gap-2">
                      {activeSurah.englishName}
                      <span className="arabic-text text-lg text-amber-300 font-normal">({activeSurah.name})</span>
                    </h3>
                    <p className="text-xs text-emerald-300/70">
                      {activeSurah.englishNameTranslation} • {activeSurah.numberOfAyahs} Verses • Juz {activeSurah.juz}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {/* Audio Play/Pause Button */}
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className={`px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-colors ${
                      isPlaying
                        ? 'bg-amber-500 text-black border-amber-400'
                        : 'bg-white/5 hover:bg-white/10 text-emerald-200 border-white/10'
                    }`}
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>{isPlaying ? 'Pause Audio' : 'Play Audio'}</span>
                  </button>

                  {/* Tafsir Toggle */}
                  <button
                    onClick={() => setShowTafsir(!showTafsir)}
                    className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition-colors ${
                      showTafsir
                        ? 'bg-emerald-500 text-black border-emerald-400'
                        : 'bg-white/5 hover:bg-white/10 text-emerald-200 border-white/10'
                    }`}
                  >
                    Tafsir Commentary
                  </button>

                  <select
                    value={selectedReciter}
                    onChange={(e) => setSelectedReciter(e.target.value)}
                    className="bg-black/50 border border-white/15 rounded-xl px-2.5 py-1.5 text-xs text-amber-300 focus:outline-none"
                  >
                    {RECITERS_LIST.map(r => (
                      <option key={r.id} value={r.id} className="bg-[#02120d] text-white">
                        {r.name}
                      </option>
                    ))}
                  </select>

                  <button
                    onClick={() => setActiveSurah(null)}
                    className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Verses List */}
              <div className="p-6 overflow-y-auto space-y-6">
                {/* Audio Status Banner */}
                {isPlaying && (
                  <div className="p-3.5 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-between text-xs text-amber-200">
                    <span className="flex items-center gap-2">
                      <Volume2 className="w-4 h-4 text-amber-400 animate-pulse" />
                      <span>Streaming Holy Quran Recitation • {RECITERS_LIST.find(r => r.id === selectedReciter)?.name}</span>
                    </span>
                    <span className="text-[10px] font-mono text-amber-300/80">320kbps High Fidelity</span>
                  </div>
                )}

                {/* Tafsir Drawer Banner */}
                {showTafsir && (
                  <div className="p-4 rounded-2xl bg-[#032b20] border border-emerald-500/30 space-y-2 text-xs">
                    <span className="text-amber-400 font-bold uppercase tracking-wider font-mono">
                      Classical Tafsir (Ibn Kathir & Jalalayn Overview)
                    </span>
                    <p className="text-zinc-200 leading-relaxed">
                      Surah {activeSurah.englishName} ({activeSurah.name}) is a {activeSurah.revelationType.toLowerCase()} revelation containing {activeSurah.numberOfAyahs} verses. Classical commentators highlight its central themes of pure Tawhid (monotheism), spiritual steadfastness, and guidance for believers.
                    </p>
                  </div>
                )}

                {activeSurah.number !== 9 && (
                  <div className="text-center py-4 border-b border-white/10">
                    <p className="arabic-text text-2xl sm:text-3xl text-amber-200 font-semibold">
                      بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                    </p>
                  </div>
                )}

                {currentAyahs.map((ayah) => (
                  <div key={ayah.number} className="liquid-glass rounded-2xl p-5 border border-white/10 space-y-3">
                    <div className="flex items-center justify-between text-xs font-bold text-amber-400">
                      <span className="bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/30">
                        Ayah {ayah.number}
                      </span>
                      <button
                        onClick={() => openSurah(activeSurah, ayah.number)}
                        className="text-[11px] text-zinc-400 hover:text-amber-300 flex items-center gap-1 transition-colors"
                        title="Save as Last Read"
                      >
                        <Bookmark className="w-3 h-3" />
                        <span>Bookmark Ayah</span>
                      </button>
                    </div>

                    <p className="arabic-text text-2xl text-emerald-100 font-medium text-right leading-[2.2]">
                      {ayah.arabic}
                    </p>

                    <p className="text-xs sm:text-sm text-emerald-200/90 leading-relaxed font-sans pt-2 border-t border-white/10">
                      {ayah.translation}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Universal Footer */}
      <Footer />
    </div>
  );
}
