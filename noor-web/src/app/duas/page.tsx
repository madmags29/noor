'use client';

// ============================================================
// NOOR Web — Dedicated Duas & Adhkar Library Page
// ============================================================

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Heart,
  ArrowLeft,
  Search,
  Share2,
  Check,
  RotateCcw,
  Sparkles,
  CircleDot
} from 'lucide-react';
import { DUA_CATEGORIES as BASE_CATEGORIES, DUAS_LIST as BASE_DUAS, DuaItem } from '../../lib/duasData';
import { LIFE_DUAS } from '../../data/islamicCoreData';
import { GlobalNavbar } from '../../components/GlobalNavbar';
import { Footer } from '../../components/Footer';

// 14 Comprehensive Life Duas Categories requested by user
const ALL_CATEGORIES = [
  { id: 'all', name: 'All Duas & Adhkar' },
  { id: 'travel', name: '✈️ Travel' },
  { id: 'food', name: '🍽️ Food' },
  { id: 'rain', name: '🌧️ Rain' },
  { id: 'home', name: '🏡 Home' },
  { id: 'work', name: '💼 Work' },
  { id: 'study', name: '📚 Study' },
  { id: 'marriage', name: '💍 Marriage' },
  { id: 'children', name: '👶 Children' },
  { id: 'parents', name: '🤍 Parents' },
  { id: 'difficulties', name: '🛡️ Difficulties' },
  { id: 'forgiveness', name: '🤲 Forgiveness' },
  { id: 'protection', name: '⚡ Protection' },
  { id: 'gratitude', name: '✨ Gratitude' },
  { id: 'rizq', name: '💰 Rizq' },
  { id: 'morning', name: '🌅 Morning' },
  { id: 'evening', name: '🌇 Evening' },
  { id: 'sleep', name: '🌙 Sleep' }
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
  ...CONVERTED_LIFE_DUAS,
  ...BASE_DUAS.filter(b => !CONVERTED_LIFE_DUAS.some(c => c.id === b.id || (c.category === b.category && c.title.toLowerCase() === b.title.toLowerCase())))
];

export default function DuasPage() {
  const [category, setCategory] = useState('all');
  const [search, setSearch] = useState('');
  const [activeDua, setActiveDua] = useState<DuaItem | null>(null);
  const [tasbihCount, setTasbihCount] = useState(0);
  const [tasbihTarget, setTasbihTarget] = useState(33);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filtered = COMBINED_DUAS.filter(d => {
    const matchCat = category === 'all' || d.category === category;
    const matchQ =
      d.title.toLowerCase().includes(search.toLowerCase()) ||
      d.translation.toLowerCase().includes(search.toLowerCase()) ||
      d.category.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchQ;
  });

  const handleCopy = (dua: DuaItem) => {
    navigator.clipboard.writeText(`${dua.title}\n\n${dua.arabic}\n\n"${dua.translation}"\n\n— ${dua.source}`);
    setCopiedId(dua.id);
    setTimeout(() => setCopiedId(null), 2000);
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
              <h1 className="text-lg sm:text-xl font-black text-white">Duas & Daily Adhkar</h1>
              <p className="text-[10px] text-emerald-300/70">
                Hisn al-Muslim (Fortress of the Muslim) • Authentic Prophetic Supplications
              </p>
            </div>
          </div>

          <div className="relative">
            <Search className="w-4 h-4 text-emerald-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search supplications (e.g. morning, protection)..."
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
                  >
                    {copiedId === dua.id ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
                  </button>
                </div>

                <h3 className="text-sm font-bold text-white mb-3">
                  {dua.title}
                </h3>

                <p className="arabic-text text-xl font-bold text-amber-200 text-right mb-4 leading-[2]">
                  {dua.arabic}
                </p>

                <p className="text-xs text-emerald-100/90 leading-relaxed font-sans mb-3">
                  "{dua.translation}"
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-[11px] text-emerald-300/70">
                <span className="truncate max-w-[180px]">{dua.source}</span>
                <button
                  onClick={() => {
                    setActiveDua(dua);
                    setTasbihCount(0);
                    setTasbihTarget(dua.targetCount || 33);
                  }}
                  className="text-amber-300 hover:text-amber-200 font-bold flex items-center gap-1 bg-amber-500/10 px-2.5 py-1 rounded-xl border border-amber-500/30"
                >
                  <CircleDot className="w-3.5 h-3.5" />
                  <span>Tasbih ({dua.targetCount}x)</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Digital Tasbih Drawer Modal */}
        {activeDua && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-xl p-4 animate-in fade-in">
            <div className="liquid-glass rounded-[2.5rem] w-full max-w-md p-8 text-center border border-white/20 shadow-2xl relative">
              <button
                onClick={() => setActiveDua(null)}
                className="absolute top-5 right-5 text-emerald-300 hover:text-white p-2"
              >
                ✕
              </button>

              <span className="text-xs font-black text-amber-400 uppercase tracking-widest block mb-1">
                Digital Tasbih Counter
              </span>
              <h4 className="text-sm font-bold text-white mb-4">
                {activeDua.title}
              </h4>

              <p className="arabic-text text-2xl font-bold text-amber-200 mb-6">
                {activeDua.arabic}
              </p>

              <div className="flex justify-center mb-6">
                <button
                  onClick={() => setTasbihCount(prev => prev + 1)}
                  className="w-44 h-44 rounded-full bg-gradient-to-br from-amber-500/20 via-[#063326] to-emerald-950 border-4 border-amber-400 flex flex-col items-center justify-center shadow-2xl shadow-amber-500/20 active:scale-95 transition-transform cursor-pointer"
                >
                  <span className="text-5xl font-black font-mono text-amber-300 gold-gradient-text">
                    {tasbihCount}
                  </span>
                  <span className="text-xs text-emerald-200/80 font-bold mt-1">
                    Goal: {tasbihTarget}
                  </span>
                  <span className="text-[9px] text-amber-400 font-black mt-0.5 tracking-wider">
                    TAP TO COUNT
                  </span>
                </button>
              </div>

              <div className="flex items-center justify-center gap-3">
                {[33, 100, 313].map(c => (
                  <button
                    key={c}
                    onClick={() => { setTasbihTarget(c); setTasbihCount(0); }}
                    className={`px-3 py-1 rounded-xl text-xs font-bold border transition-all ${
                      tasbihTarget === c
                        ? 'bg-amber-500 text-emerald-950 border-amber-400'
                        : 'bg-black/30 border-white/10 text-emerald-200'
                    }`}
                  >
                    {c}x
                  </button>
                ))}
                <button
                  onClick={() => setTasbihCount(0)}
                  className="p-2 rounded-xl bg-black/40 border border-white/10 text-emerald-200 hover:text-white"
                  title="Reset"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
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
