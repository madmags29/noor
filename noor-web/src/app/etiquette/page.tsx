'use client';

// ============================================================
// NOOR Web — Islamic Etiquette (Adab) Searchable Library
// Prophetic Manners for Every Dimension of Daily Believer Life
// ============================================================

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Search,
  Sparkles,
  BookOpen,
  Award,
  CheckCircle2,
  Filter
} from 'lucide-react';
import { GlobalNavbar } from '../../components/GlobalNavbar';
import { Footer } from '../../components/Footer';
import { ISLAMIC_ADAB_LIBRARY, AdabCategory } from '../../data/islamicCoreData';

export default function EtiquettePage() {
  const [search, setSearch] = useState('');
  const [selectedCat, setSelectedCat] = useState<string>('all');

  const filteredAdab = useMemo(() => {
    const q = search.trim().toLowerCase();
    return ISLAMIC_ADAB_LIBRARY.filter(cat => {
      const matchesCat = selectedCat === 'all' || cat.id === selectedCat;
      if (!matchesCat) return false;
      if (!q) return true;

      return (
        cat.title.toLowerCase().includes(q) ||
        cat.rules.some(r => r.toLowerCase().includes(q))
      );
    });
  }, [search, selectedCat]);

  return (
    <div className="min-h-screen bg-[#02120d] text-white flex flex-col selection:bg-amber-500 selection:text-black relative overflow-hidden">
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-20 right-10 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[140px]" />
      </div>

      <GlobalNavbar />

      {/* Header Breadcrumb */}
      <div className="border-b border-white/10 bg-[#031c15]/70 backdrop-blur-md px-4 sm:px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-emerald-200 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold font-serif text-white tracking-wide">
                  Islamic Etiquette & Adab Library
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                  Prophetic Character
                </span>
              </div>
              <p className="text-xs text-emerald-300/70 mt-0.5 font-mono">
                Manners of Eating, Sleeping, Mosque, Greeting, Parents, Neighbors, Guests & Business
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 py-8 flex-1 space-y-8">
        {/* Search & Category Filter Bar */}
        <div className="bg-[#031c15] border border-emerald-500/20 rounded-2xl p-6 space-y-4 shadow-xl">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-amber-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search manners, rules, or hadith..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/40 border border-white/10 focus:border-amber-400 text-white text-xs outline-none"
              />
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 flex-wrap pt-1">
            <button
              onClick={() => setSelectedCat('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedCat === 'all'
                  ? 'bg-amber-500 text-black shadow'
                  : 'bg-white/5 hover:bg-white/10 text-zinc-300'
              }`}
            >
              All Categories
            </button>
            {ISLAMIC_ADAB_LIBRARY.map(cat => {
              const isSelected = selectedCat === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCat(cat.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-amber-500 text-black shadow'
                      : 'bg-white/5 hover:bg-white/10 text-zinc-300'
                  }`}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.title.replace('Etiquette of ', '')}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Adab Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredAdab.map(cat => (
            <div
              key={cat.id}
              className="bg-[#031c15] border border-emerald-500/20 rounded-3xl p-6 sm:p-8 space-y-5 hover:border-amber-500/40 transition-colors shadow-lg"
            >
              <div className="flex items-start justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  <span className="text-3xl p-2.5 rounded-2xl bg-white/5 border border-white/10">
                    {cat.icon}
                  </span>
                  <div>
                    <h3 className="text-lg font-bold text-white font-serif">{cat.title}</h3>
                    <p className="text-xs font-serif text-amber-400/90">{cat.arabicTitle}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2.5">
                {cat.rules.map((rule, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-black/30 border border-white/5 flex items-start gap-2.5 text-xs text-zinc-200 leading-relaxed"
                  >
                    <span className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-300 font-mono text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                      ✓
                    </span>
                    <span>{rule}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
