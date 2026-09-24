'use client';

// ============================================================
// NOOR Web — Janazah & Bereavement Master Guide
// Sourced from Classical Sunni Fiqh manuals with complete dignity
// ============================================================

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Heart,
  BookOpen,
  ShieldCheck,
  Compass,
  AlertCircle,
  HelpCircle,
  Copy,
  Check
} from 'lucide-react';
import { GlobalNavbar } from '../../components/GlobalNavbar';
import { Footer } from '../../components/Footer';
import { JANAZAH_GUIDE, JanazahGuideSection } from '../../data/islamicCoreData';

export default function JanazahPage() {
  const [activeSection, setActiveSection] = useState<string>('salat-janazah');
  const [copied, setCopied] = useState<string | null>(null);

  const copyText = (txt: string, id: string) => {
    navigator.clipboard.writeText(txt);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const current = JANAZAH_GUIDE.find(s => s.id === activeSection) || JANAZAH_GUIDE[0];

  return (
    <div className="min-h-screen bg-[#02120d] text-white flex flex-col selection:bg-amber-500 selection:text-black relative overflow-hidden">
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-10 right-10 w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-[140px]" />
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
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold font-serif text-white tracking-wide">
                  Janazah & Bereavement Guide
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                  Dignified & Sourced
                </span>
              </div>
              <p className="text-xs text-emerald-300/70 mt-0.5 font-mono">
                Immediate Steps • Ghusl • Kafan • Salatul Janazah (4 Takbeers) • Burial Sunnah
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <main className="max-w-5xl mx-auto w-full px-4 sm:px-6 py-8 flex-1 space-y-8">
        {/* Solemn Hero Card */}
        <div className="bg-gradient-to-r from-[#03231a] via-[#043325] to-[#03231a] p-6 sm:p-8 rounded-3xl border border-emerald-500/30 space-y-2">
          <span className="text-[11px] font-bold text-amber-400 uppercase tracking-widest font-mono">
            Every Soul Shall Taste Death (Quran 3:185)
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">
            The Final Journey: Dignity, Purification & Prayer
          </h2>
          <p className="text-xs sm:text-sm text-emerald-200/80 max-w-2xl leading-relaxed">
            A practical, step-by-step classical guide for families, caregivers, and communities to honor departed souls according to the purest Sunnah of the Prophet Muhammad ﷺ.
          </p>
        </div>

        {/* Section Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-white/10">
          {JANAZAH_GUIDE.map(item => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20'
                    : 'bg-white/5 hover:bg-white/10 text-emerald-200/80 hover:text-white border border-white/5'
                }`}
              >
                {item.title}
              </button>
            );
          })}
        </div>

        {/* Selected Section Detail Card */}
        <div className="bg-[#031c15] border border-emerald-500/20 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
            <div>
              <span className="text-xs font-mono font-bold text-amber-400">
                CLASSICAL FIQH PROTOCOL
              </span>
              <h3 className="text-xl sm:text-2xl font-bold font-serif text-white mt-1">
                {current.title}
              </h3>
            </div>
            <span className="text-2xl font-serif text-amber-300 px-3.5 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30">
              {current.arabicTitle}
            </span>
          </div>

          <p className="text-sm text-zinc-300 leading-relaxed font-medium">
            {current.summary}
          </p>

          {/* Steps / Rules Checklist */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-widest">
              Prescribed Sunnah Guidelines
            </h4>
            <div className="space-y-2.5">
              {current.stepsOrRules.map((rule, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-black/30 border border-white/5 flex items-start gap-3 text-xs text-zinc-200 leading-relaxed"
                >
                  <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span>{rule}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Key Dua Box (if available) */}
          {current.keyDua && (
            <div className="p-6 rounded-2xl bg-gradient-to-b from-[#063024] to-[#042018] border border-amber-500/40 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-400 uppercase font-mono">
                  Authentic Prophetic Supplication
                </span>
                <button
                  onClick={() => copyText(current.keyDua?.arabic || '', current.id)}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-xs text-emerald-200 transition-colors"
                >
                  {copied === current.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied === current.id ? 'Copied' : 'Copy Arabic'}</span>
                </button>
              </div>

              <p className="text-2xl sm:text-3xl font-serif text-amber-200 leading-loose py-2 text-center">
                {current.keyDua.arabic}
              </p>

              <p className="text-xs text-emerald-300 font-mono italic text-center">
                "{current.keyDua.transliteration}"
              </p>

              <p className="text-xs sm:text-sm text-white/90 text-center border-t border-white/10 pt-3">
                {current.keyDua.translation}
              </p>
            </div>
          )}
        </div>

        {/* Condolence & Cemetery Visiting Etiquette Callout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-[#031c15] border border-emerald-500/20 space-y-3">
            <h4 className="text-base font-bold text-white font-serif flex items-center gap-2">
              <Heart className="w-4 h-4 text-amber-400" />
              <span>Condolence (Ta'ziyah) Manners</span>
            </h4>
            <ul className="text-xs text-zinc-300 space-y-2 leading-relaxed">
              <li>• Offer comforting condolences within 3 days without burdening the family.</li>
              <li>• Sunnah to prepare and deliver meals to the deceased's household ("Make food for the family of Ja'far, for there has come upon them that which occupies them").</li>
              <li>• Say: <em>"Inna lillahi wa inna ilayhi raji'un. A'zamAllahu ajrak, wa ahsana 'aza'ak, wa ghafara li-mayyitik."</em></li>
            </ul>
          </div>

          <div className="p-6 rounded-2xl bg-[#031c15] border border-emerald-500/20 space-y-3">
            <h4 className="text-base font-bold text-white font-serif flex items-center gap-2">
              <Compass className="w-4 h-4 text-emerald-400" />
              <span>Cemetery (Ziyarat al-Qubur) Sunnah</span>
            </h4>
            <ul className="text-xs text-zinc-300 space-y-2 leading-relaxed">
              <li>• Say upon entering graveyard: <em>"As-salamu 'alaykum ahlad-diyar minal-mu'mineena wal-muslimeen..."</em></li>
              <li>• Visiting graves is Sunnah as it softens the heart and reminds of the Hereafter (Muslim 976).</li>
              <li>• Strictly prohibited to sit on, step over, or build lavish structures directly atop graves.</li>
            </ul>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
