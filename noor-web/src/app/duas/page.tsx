'use client';

// ============================================================
// NOOR Web — Dedicated Duas & Adhkar Library Page
// Zero-Popup Design: In-page Interactive Tasbih Station & Complete Duas
// ============================================================

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import {
  Heart,
  ArrowLeft,
  Search,
  Share2,
  Check,
  RotateCcw,
  Sparkles,
  CircleDot,
  X
} from 'lucide-react';
import { DUA_CATEGORIES as BASE_CATEGORIES, DUAS_LIST as BASE_DUAS, DuaItem } from '../../lib/duasData';
import { LIFE_DUAS } from '../../data/islamicCoreData';
import { GlobalNavbar } from '../../components/GlobalNavbar';
import { Footer } from '../../components/Footer';
import { useLanguage } from '../../context/LanguageContext';

// 18 Comprehensive Life Duas Categories
const ALL_CATEGORIES = [
  { id: 'all', name: 'All Duas & Adhkar' },
  { id: 'morning', name: '🌅 Morning' },
  { id: 'evening', name: '🌇 Evening' },
  { id: 'sleep', name: '🌙 Sleep' },
  { id: 'protection', name: '⚡ Protection' },
  { id: 'travel', name: '✈️ Travel' },
  { id: 'rizq', name: '💰 Rizq' },
  { id: 'hardship', name: '🛡️ Hardship' },
  { id: 'forgiveness', name: '🤲 Forgiveness' },
  { id: 'food', name: '🍽️ Food' },
  { id: 'rain', name: '🌧️ Rain' },
  { id: 'home', name: '🏡 Home' },
  { id: 'work', name: '💼 Work' },
  { id: 'study', name: '📚 Study' },
  { id: 'marriage', name: '💍 Marriage' },
  { id: 'children', name: '👶 Children' },
  { id: 'parents', name: '🤍 Parents' },
  { id: 'gratitude', name: '✨ Gratitude' }
];

// Convert LIFE_DUAS to DuaItem format
const CONVERTED_LIFE_DUAS: DuaItem[] = LIFE_DUAS.map(ld => ({
  id: ld.id,
  category: ld.category,
  title: ld.title,
  arabic: ld.arabic,
  transliteration: ld.transliteration,
  translation: ld.translation,
  source: ld.hadithSource,
  targetCount: ld.category === 'forgiveness' || ld.category === 'gratitude' ? 33 : 1,
  virtue: `Authentic supplication for ${ld.categoryLabel}.`
}));

// Combine without duplicate IDs
const COMBINED_DUAS: DuaItem[] = [
  ...BASE_DUAS,
  ...CONVERTED_LIFE_DUAS.filter(c => !BASE_DUAS.some(b => b.id === c.id || (b.category === c.category && b.title.toLowerCase() === c.title.toLowerCase())))
];

export default function DuasPage() {
  const { t, language } = useLanguage();
  const [category, setCategory] = useState('all');
  const [search, setSearch] = useState('');
  const [activeDua, setActiveDua] = useState<DuaItem | null>(null);
  const [tasbihCount, setTasbihCount] = useState(0);
  const [tasbihTarget, setTasbihTarget] = useState(33);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const tasbihRef = useRef<HTMLDivElement | null>(null);

  const getDuaTitle = (d: DuaItem) => {
    if (language === 'hi' && d.titleHi) return d.titleHi;
    if (language === 'ur' && d.titleUr) return d.titleUr;
    return d.title;
  };

  const getDuaTranslation = (d: DuaItem) => {
    if (language === 'hi' && d.translationHi) return d.translationHi;
    if (language === 'ur' && d.translationUr) return d.translationUr;
    return d.translation;
  };

  const filtered = COMBINED_DUAS.filter(d => {
    const matchCat = category === 'all' || d.category === category;
    const clean = search.trim().toLowerCase();
    const matchQ =
      !clean ||
      d.title.toLowerCase().includes(clean) ||
      (d.titleHi && d.titleHi.toLowerCase().includes(clean)) ||
      (d.titleUr && d.titleUr.toLowerCase().includes(clean)) ||
      d.translation.toLowerCase().includes(clean) ||
      (d.translationHi && d.translationHi.toLowerCase().includes(clean)) ||
      d.category.toLowerCase().includes(clean);
    return matchCat && matchQ;
  });

  const handleCopy = (dua: DuaItem) => {
    const title = getDuaTitle(dua);
    const trans = getDuaTranslation(dua);
    navigator.clipboard.writeText(`${title}\n\n${dua.arabic}\n\n"${trans}"\n\n— ${dua.source} (via NOOR)`);
    setCopiedId(dua.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const startTasbih = (dua: DuaItem) => {
    setActiveDua(dua);
    setTasbihCount(0);
    setTasbihTarget(dua.targetCount || 33);
    setTimeout(() => {
      tasbihRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  };

  const handleTasbihTap = () => {
    setTasbihCount(prev => {
      const next = prev + 1;
      if (next === tasbihTarget) {
        if (typeof window !== 'undefined' && 'navigator' in window && navigator.vibrate) {
          navigator.vibrate(200);
        }
      }
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-[#02120d] text-white flex flex-col selection:bg-amber-500 selection:text-black relative overflow-hidden">
      {/* Al-Masjid an-Nabawi Madinah Atmosphere Backdrop */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?w=1920&q=85"
          alt="Al-Masjid an-Nabawi Madinah"
          className="w-full h-full object-cover object-center opacity-10 filter saturate-125"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#02120d]/85 via-[#02120d]/90 to-[#02120d]" />
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
              <h1 className="text-lg sm:text-xl font-black text-white">{t('supplicationsTitle')}</h1>
              <p className="text-[10px] text-emerald-300/70">
                Authentic Hisn al-Muslim Adhkar & Prophetic Supplications
              </p>
            </div>
          </div>

          {/* Search Box */}
          <div className="relative">
            <Search className="w-4 h-4 text-emerald-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={t('searchPlaceholderFull') || "Search Duas, Adhkar, topics..."}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 pr-4 py-2 bg-black/40 border border-white/15 rounded-full text-xs text-white placeholder-emerald-400/50 focus:outline-none focus:border-amber-400 w-64"
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full p-6 sm:p-10 space-y-8">
        {/* Categories Carousel */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
          {ALL_CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setCategory(cat.id)}
              className={`px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all ${
                category === cat.id
                  ? 'bg-amber-500 text-emerald-950 font-black shadow-lg shadow-amber-500/20'
                  : 'liquid-pill text-emerald-200 hover:text-white'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* IN-PAGE DEDICATED TASBIH STATION (ZERO POPUP MODAL!) */}
        {activeDua && (
          <div
            ref={tasbihRef}
            className="liquid-glass-gold rounded-[2.5rem] p-6 sm:p-8 text-center border border-amber-400/50 shadow-2xl relative animate-in fade-in zoom-in-95 duration-300"
          >
            <button
              onClick={() => setActiveDua(null)}
              className="absolute top-4 right-4 p-2 rounded-xl bg-white/10 hover:bg-white/20 text-emerald-200 hover:text-white flex items-center gap-1 text-xs font-bold"
              title="Close Counter"
            >
              <X className="w-4 h-4" />
              <span>Close</span>
            </button>

            <span className="text-xs font-black text-amber-300 uppercase tracking-widest block mb-1">
              {t('interactiveTasbih')}
            </span>
            <h3 className="text-base font-bold text-white mb-2 max-w-xl mx-auto">
              {getDuaTitle(activeDua)}
            </h3>

            <p className="arabic-text text-2xl sm:text-3xl font-bold text-amber-200 mb-6 leading-relaxed max-w-2xl mx-auto">
              {activeDua.arabic}
            </p>

            <div className="flex justify-center mb-6">
              <button
                onClick={handleTasbihTap}
                className="w-44 h-44 rounded-full bg-gradient-to-br from-amber-500/20 via-[#063326] to-emerald-950 border-4 border-amber-400 flex flex-col items-center justify-center shadow-2xl shadow-amber-500/20 active:scale-95 transition-transform cursor-pointer group"
              >
                <span className="text-5xl font-black font-mono text-amber-300 gold-gradient-text">
                  {tasbihCount}
                </span>
                <span className="text-xs text-emerald-200/80 font-bold mt-1">
                  Goal: {tasbihTarget}
                </span>
                <span className="text-[9px] text-amber-400 font-black mt-0.5 tracking-wider uppercase group-hover:scale-110 transition-transform">
                  TAP TO COUNT
                </span>
              </button>
            </div>

            <div className="flex items-center justify-center gap-3">
              {[33, 100, 313].map(c => (
                <button
                  key={c}
                  onClick={() => { setTasbihTarget(c); setTasbihCount(0); }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                    tasbihTarget === c
                      ? 'bg-amber-400 text-black border-amber-300 shadow-md'
                      : 'bg-black/30 border-white/10 text-emerald-200 hover:text-white'
                  }`}
                >
                  {c}x Goal
                </button>
              ))}
              <button
                onClick={() => setTasbihCount(0)}
                className="p-2 rounded-xl bg-black/40 border border-white/10 text-emerald-200 hover:text-white flex items-center gap-1 text-xs"
                title="Reset counter"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            </div>
          </div>
        )}

        {/* Duas Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(dua => (
            <div
              key={dua.id}
              className="liquid-glass rounded-3xl p-6 border border-white/10 hover:border-amber-400/40 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-black text-amber-400 uppercase bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/20">
                    {dua.category}
                  </span>
                  <button
                    onClick={() => handleCopy(dua)}
                    className="p-1.5 text-emerald-300 hover:text-amber-300 transition-colors"
                    title="Copy Dua"
                  >
                    {copiedId === dua.id ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
                  </button>
                </div>

                <h3 className="text-sm font-bold text-white mb-3">
                  {getDuaTitle(dua)}
                </h3>

                <p className="arabic-text text-xl font-bold text-amber-200 text-right mb-4 leading-[2]">
                  {dua.arabic}
                </p>

                <p className="text-xs text-emerald-100/90 leading-relaxed font-sans mb-3">
                  "{getDuaTranslation(dua)}"
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-[11px] text-emerald-300/70">
                <span className="truncate max-w-[180px]">{dua.source}</span>
                <button
                  onClick={() => startTasbih(dua)}
                  className="text-amber-300 hover:text-amber-200 font-bold flex items-center gap-1 bg-amber-500/10 px-2.5 py-1 rounded-xl border border-amber-500/30 transition-all active:scale-95"
                >
                  <CircleDot className="w-3.5 h-3.5" />
                  <span>{t('countLabel')} ({dua.targetCount}x)</span>
                </button>
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
