'use client';

// ============================================================
// NOOR Web — Duas, Daily Adhkar & Interactive Digital Tasbih
// ============================================================

import React, { useState } from 'react';
import { Heart, Sparkles, RotateCcw, Share2, Check, Bookmark, CircleDot } from 'lucide-react';
import { DUA_CATEGORIES, DUAS_LIST, DuaItem } from '../lib/duasData';
import { useLanguage } from '../context/LanguageContext';

export const DuasSection: React.FC = () => {
  const { t, language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeDua, setActiveDua] = useState<DuaItem | null>(null);
  const [tasbihCount, setTasbihCount] = useState(0);
  const [tasbihTarget, setTasbihTarget] = useState(33);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categoryTranslations: Record<string, string> = {
    all: t('catAll'),
    morning_evening: t('catMorning'),
    sleep_waking: t('catSleep'),
    protection: t('catProtection'),
    travel: t('catTravel'),
    daily_life: t('catDaily'),
    forgiveness: t('catForgiveness'),
    hardship: t('catHardship'),
  };

  const filteredDuas = selectedCategory === 'all'
    ? DUAS_LIST
    : DUAS_LIST.filter(d => d.category === selectedCategory);

  const handleCopyDua = (dua: DuaItem) => {
    const text = `${dua.title}\n\n${dua.arabic}\n\n"${dua.translation}"\n\n— ${dua.source} (via NOOR)`;
    navigator.clipboard.writeText(text);
    setCopiedId(dua.id);
    setTimeout(() => setCopiedId(null), 2000);
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
    <section id="duas" className="relative w-full py-16 px-4 lg:px-8 max-w-7xl mx-auto">
      {/* Serene Prophet's Mosque Madinah Atmosphere Backdrop */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden rounded-[3rem]">
        <img
          src="https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?w=1920&q=85"
          alt="Al-Masjid an-Nabawi Madinah Munawwarah"
          className="w-full h-full object-cover object-center opacity-[0.08] filter saturate-125"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#02120d] via-[#02120d]/80 to-[#02120d]" />
      </div>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-widest mb-1">
            <Heart className="w-3.5 h-3.5" />
            <span>{t('supplicationsTitle')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            {t('duasHeading')}
          </h2>
          <p className="text-sm text-emerald-200/70 mt-1">
            {t('duasDesc')}
          </p>
        </div>

        {/* Digital Tasbih Launch Button */}
        <button
          onClick={() => {
            setTasbihCount(0);
            setActiveDua(DUAS_LIST[0]);
          }}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-emerald-950 text-xs font-bold shadow-lg shadow-amber-500/20 flex items-center gap-2 transition-all self-start md:self-auto whitespace-nowrap"
        >
          <CircleDot className="w-4 h-4" />
          <span>{t('openDigitalTasbih')}</span>
        </button>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
        {DUA_CATEGORIES.map(cat => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              selectedCategory === cat.id
                ? 'bg-amber-500 text-emerald-950 font-bold shadow-md shadow-amber-500/20'
                : 'bg-[#06241b] border border-emerald-800/40 text-emerald-200 hover:text-white hover:bg-emerald-900/50'
            }`}
          >
            {categoryTranslations[cat.id] || cat.name}
          </button>
        ))}
      </div>

      {/* Duas Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredDuas.map(dua => (
          <div
            key={dua.id}
            className="glass-panel rounded-2xl p-6 border border-emerald-800/30 hover:border-amber-400/40 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-[10px] font-bold text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-full uppercase border border-amber-500/20">
                  {dua.category}
                </span>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleCopyDua(dua)}
                    className="p-1.5 text-emerald-400 hover:text-amber-300 transition-colors"
                    title="Copy Dua"
                  >
                    {copiedId === dua.id ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Share2 className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <h4 className="text-sm font-bold text-white mb-4 line-clamp-2">
                {dua.title}
              </h4>

              {/* Arabic */}
              <p className="arabic-text text-xl text-amber-200 font-bold mb-4 text-right leading-[2]">
                {dua.arabic}
              </p>

              {/* Translation */}
              <p className="text-xs text-emerald-100/90 leading-relaxed font-sans mb-3">
                "{dua.translation}"
              </p>
            </div>

            {/* Footer with Source & Tasbih Counter Link */}
            <div className="pt-4 border-t border-emerald-800/30 flex items-center justify-between text-[11px] text-emerald-300/70">
              <span className="truncate max-w-[170px]">{dua.source}</span>
              <button
                onClick={() => {
                  setActiveDua(dua);
                  setTasbihCount(0);
                  setTasbihTarget(dua.targetCount || 33);
                }}
                className="text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1"
              >
                <span>{t('countLabel')}</span>
                <span className="text-xs">({dua.targetCount}x)</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Digital Tasbih Modal */}
      {activeDua && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in">
          <div className="bg-[#031c15] border border-amber-500/40 rounded-3xl w-full max-w-md p-6 shadow-2xl relative text-center">
            {/* Close Button */}
            <button
              onClick={() => setActiveDua(null)}
              className="absolute top-4 right-4 text-emerald-400 hover:text-white p-2"
            >
              ✕
            </button>

            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
              {t('interactiveTasbih')}
            </span>
            <h3 className="text-base font-bold text-white mt-1 mb-3">
              {activeDua.title}
            </h3>

            {/* Arabic */}
            <p className="arabic-text text-xl text-amber-200 font-bold mb-6 leading-relaxed">
              {activeDua.arabic}
            </p>

            {/* Counter Circle Click Area */}
            <div className="flex justify-center mb-6">
              <button
                onClick={handleTasbihTap}
                className="w-44 h-44 rounded-full bg-gradient-to-br from-emerald-800 via-[#063326] to-emerald-950 border-4 border-amber-400/60 flex flex-col items-center justify-center shadow-xl shadow-amber-500/10 active:scale-95 transition-transform group cursor-pointer"
              >
                <span className="text-4xl sm:text-5xl font-black text-white font-mono gold-gradient-text">
                  {tasbihCount}
                </span>
                <span className="text-xs text-emerald-300/70 mt-1 font-semibold">
                  {t('targetLabel')}: {tasbihTarget}
                </span>
                <span className="text-[10px] text-amber-400/60 mt-0.5 group-hover:text-amber-300">
                  {t('tapToCount')}
                </span>
              </button>
            </div>

            {/* Quick Target Selectors & Reset */}
            <div className="flex items-center justify-center gap-3">
              {[33, 100, 313].map(count => (
                <button
                  key={count}
                  onClick={() => {
                    setTasbihTarget(count);
                    setTasbihCount(0);
                  }}
                  className={`px-3 py-1 rounded-xl text-xs font-semibold border transition-all ${
                    tasbihTarget === count
                      ? 'bg-amber-500 text-emerald-950 border-amber-400 font-bold'
                      : 'bg-emerald-950/60 border-emerald-800 text-emerald-200 hover:bg-emerald-900/50'
                  }`}
                >
                  {count}x
                </button>
              ))}

              <button
                onClick={() => setTasbihCount(0)}
                className="p-2 rounded-xl bg-emerald-950/60 border border-emerald-800 text-emerald-300 hover:text-white transition-colors"
                title={t('resetCounter')}
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
