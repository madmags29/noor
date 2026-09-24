'use client';

// ============================================================
// NOOR Web — Search Islam (Universal Islamic Knowledge Engine)
// One powerful search box across Quran, Hadith, Duas, Mosques, Dargahs, Scholars & Topics
// ============================================================

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Search,
  ArrowLeft,
  BookOpen,
  Compass,
  Heart,
  Layers,
  Sparkles,
  MapPin,
  Award,
  ChevronRight,
  Filter
} from 'lucide-react';
import { GlobalNavbar } from '../../components/GlobalNavbar';
import { Footer } from '../../components/Footer';
import { UNIFIED_SEARCH_INDEX, SearchEntry } from '../../data/islamicCoreData';

type FilterCategory = 'All' | 'Quran' | 'Hadith' | 'Dua' | 'Prayer' | 'Ziyarat' | 'Scholar' | 'Knowledge' | 'Etiquette' | 'Hajj';

export default function SearchIslamPage() {
  const [query, setQuery] = useState('');
  const [selectedCat, setSelectedCat] = useState<FilterCategory>('All');

  const filteredResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    return UNIFIED_SEARCH_INDEX.filter(item => {
      const matchesCat = selectedCat === 'All' || item.category === selectedCat;
      if (!matchesCat) return false;
      if (!q) return true;

      return (
        item.title.toLowerCase().includes(q) ||
        item.subtitle.toLowerCase().includes(q) ||
        item.snippet.toLowerCase().includes(q) ||
        item.keywords.some(k => k.toLowerCase().includes(q))
      );
    });
  }, [query, selectedCat]);

  return (
    <div className="min-h-screen bg-[#02120d] text-white flex flex-col selection:bg-amber-500 selection:text-black relative overflow-hidden">
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-emerald-500/10 rounded-full blur-[160px]" />
      </div>

      <GlobalNavbar />

      {/* Header Breadcrumb */}
      <div className="border-b border-white/10 bg-[#031c15]/70 backdrop-blur-md px-4 sm:px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-emerald-200 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold font-serif text-white tracking-wide">
                Search Islam Engine
              </h1>
              <p className="text-xs text-emerald-300/70 mt-0.5 font-mono">
                Unified Search Across Quran, Hadith, Duas, Mosques, Dargahs & Classical Fiqh
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <main className="max-w-5xl mx-auto w-full px-4 sm:px-6 py-8 flex-1 space-y-8">
        {/* Search Hero Box */}
        <div className="bg-[#031c15] border border-emerald-500/30 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-[11px] font-bold text-amber-400 uppercase tracking-widest font-mono">
              Comprehensive Islamic Directory
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">
              Seek Knowledge with Clarity
            </h2>
            <p className="text-xs text-emerald-200/70">
              Search by ayah, prayer rule, authentic dua, historic shrine, or classical Islamic topic.
            </p>
          </div>

          {/* Input Box */}
          <div className="relative max-w-2xl mx-auto">
            <Search className="w-5 h-5 text-amber-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search Quran, Hadith, Dua, Mosque, Dargah, Scholar, Topic..."
              className="w-full pl-12 pr-10 py-4 rounded-2xl bg-black/50 border border-emerald-500/40 focus:border-amber-400 text-white placeholder:text-zinc-500 text-sm outline-none shadow-inner transition-colors"
            />
            {query.length > 0 && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white text-xs font-bold p-1"
              >
                ✕
              </button>
            )}
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center justify-center gap-1.5 flex-wrap pt-2">
            {[
              'All',
              'Prayer',
              'Dua',
              'Hajj',
              'Knowledge',
              'Etiquette',
              'Ziyarat'
            ].map(cat => {
              const isSelected = selectedCat === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCat(cat as FilterCategory)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                    isSelected
                      ? 'bg-amber-500 text-black shadow-md'
                      : 'bg-white/5 hover:bg-white/10 text-emerald-200/80 hover:text-white border border-white/5'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Results Stream */}
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-zinc-400 px-2">
            <span>Showing {filteredResults.length} Verified Entries</span>
            {query && <span>Filtering for "{query}"</span>}
          </div>

          <div className="grid grid-cols-1 gap-4">
            {filteredResults.map(item => (
              <Link
                key={item.id}
                href={item.url}
                className="p-5 rounded-2xl bg-[#031c15] border border-emerald-500/20 hover:border-amber-500/50 transition-all flex items-center justify-between group shadow-sm hover:shadow-lg"
              >
                <div className="space-y-1 pr-4">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      {item.category}
                    </span>
                    <h3 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors">
                      {item.title}
                    </h3>
                  </div>

                  <p className="text-xs text-amber-400/80 font-medium">
                    {item.subtitle}
                  </p>

                  <p className="text-xs text-zinc-300 leading-relaxed pt-1">
                    {item.snippet}
                  </p>
                </div>

                <div className="p-2 rounded-xl bg-white/5 group-hover:bg-amber-500 group-hover:text-black text-emerald-300 transition-colors shrink-0">
                  <ChevronRight className="w-5 h-5" />
                </div>
              </Link>
            ))}

            {filteredResults.length === 0 && (
              <div className="p-12 text-center bg-[#031c15] border border-white/5 rounded-2xl space-y-3">
                <Search className="w-8 h-8 text-zinc-600 mx-auto" />
                <p className="text-sm font-bold text-white">No Direct Matches Found</p>
                <p className="text-xs text-zinc-400 max-w-sm mx-auto">
                  Try searching for terms like "Salah", "Wudu", "Hajj", "Zakat", "Janazah", "Dua", or "Etiquette".
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
