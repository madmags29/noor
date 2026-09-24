'use client';

// ============================================================
// NOOR Web — Complete Hajj & Umrah Pilgrimage Master Guide
// Completely Offline-Friendly with Interactive Checklists
// ============================================================

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Compass,
  ArrowLeft,
  MapPin,
  CheckSquare,
  Square,
  BookOpen,
  Calendar,
  Layers,
  Sparkles,
  Luggage,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { GlobalNavbar } from '../../components/GlobalNavbar';
import { Footer } from '../../components/Footer';
import {
  HAJJ_UMRAH_GUIDE,
  HAJJ_PACKING_CHECKLIST,
  PilgrimageStep
} from '../../data/islamicCoreData';

export default function HajjUmrahPage() {
  const [selectedPhase, setSelectedPhase] = useState<number>(0);
  const [packedItems, setPackedItems] = useState<Record<string, boolean>>({});

  useEffect(() => {
    try {
      const saved = localStorage.getItem('@noor_hajj_packing');
      if (saved) setPackedItems(JSON.parse(saved));
    } catch {}
  }, []);

  const togglePacked = (item: string) => {
    setPackedItems(prev => {
      const updated = { ...prev, [item]: !prev[item] };
      try {
        localStorage.setItem('@noor_hajj_packing', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const totalPacked = Object.values(packedItems).filter(Boolean).length;
  const currentStep = HAJJ_UMRAH_GUIDE[selectedPhase];

  return (
    <div className="min-h-screen bg-[#02120d] text-white flex flex-col selection:bg-amber-500 selection:text-black relative overflow-hidden">
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1565552645632-d725f8bfc19a?w=1920&q=80"
          alt="The Holy Kaaba"
          className="w-full h-full object-cover object-center opacity-10 filter saturate-150"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#02120d]/85 via-[#02120d]/90 to-[#02120d]" />
      </div>

      <GlobalNavbar />

      {/* Header Breadcrumb */}
      <div className="border-b border-white/10 bg-[#031c15]/70 backdrop-blur-md px-4 sm:px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
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
                  Hajj & Umrah Master Pilgrimage Guide
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  Offline-Ready
                </span>
              </div>
              <p className="text-xs text-emerald-300/70 mt-0.5 font-mono">
                Ihram • Miqat • Tawaf • Sa'i • Arafat • Mina • Muzdalifah • Jamarat • Checklist
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-amber-300 bg-amber-500/10 border border-amber-500/30 px-3 py-1.5 rounded-xl">
              Packed: {totalPacked}/{HAJJ_PACKING_CHECKLIST.length}
            </span>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 py-8 flex-1 space-y-8">
        {/* Hero Introduction */}
        <div className="bg-gradient-to-r from-[#03241b] via-[#043326] to-[#03241b] p-6 sm:p-8 rounded-2xl border border-emerald-500/30 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="text-[11px] font-bold text-amber-400 uppercase tracking-widest font-mono">
              The 5th Pillar of Islam • Al-Hajj
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">
              The Journey of a Lifetime to the Sacred House
            </h2>
            <p className="text-sm text-emerald-200/80 max-w-2xl leading-relaxed">
              "And proclaim to the people the Hajj; they will come to you on foot and on every lean camel; they will come from every distant pass." (Surah Al-Hajj 22:27)
            </p>
          </div>

          {/* Talbiyah Callout */}
          <div className="p-4 rounded-xl bg-black/40 border border-amber-500/30 text-center max-w-xs">
            <p className="text-[10px] text-amber-400 font-bold uppercase tracking-wider mb-1">Universal Talbiyah Chant</p>
            <p className="text-sm font-serif text-amber-200 leading-snug">
              لَبَّيْكَ اللّٰهُمَّ لَبَّيْكَ، لَبَّيْكَ لَا شَرِيكَ لَكَ لَبَّيْكَ
            </p>
            <p className="text-[10px] text-emerald-300 font-mono italic mt-1">
              "Here I am at Your service, O Allah, here I am..."
            </p>
          </div>
        </div>

        {/* 5 Miqat Locations Card */}
        <div className="bg-[#031c15] border border-emerald-500/20 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-4 text-amber-400">
            <MapPin className="w-5 h-5" />
            <h3 className="text-lg font-bold text-white font-serif">The 5 Canonical Miqat Boundaries</h3>
          </div>
          <p className="text-xs text-zinc-300 mb-4">
            Pilgrims must enter the state of Ihram before crossing these geographic boundaries established by the Prophet ﷺ (Bukhari 1524).
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-xs">
            {[
              { name: 'Dhul Hulayfah (Abyar Ali)', forWhom: 'Pilgrims from Madinah & North', dist: '450 km from Makkah' },
              { name: 'Al-Juhfah (Rabigh)', forWhom: 'Egypt, Levant, Europe, North Africa', dist: '187 km NW of Makkah' },
              { name: 'Qarn al-Manazil (Al-Sayl)', forWhom: 'Najd, Riyadh, Gulf, East Arabia', dist: '94 km East of Makkah' },
              { name: 'Yalamlam (Al-Sadiah)', forWhom: 'Yemen, South, India, Far East (sea/air)', dist: '54 km South of Makkah' },
              { name: 'Dhat \'Irq', forWhom: 'Iraq, Central Asia & NE travelers', dist: '94 km NE of Makkah' }
            ].map(m => (
              <div key={m.name} className="p-3.5 rounded-xl bg-black/30 border border-white/5 space-y-1">
                <p className="font-bold text-emerald-300">{m.name}</p>
                <p className="text-[11px] text-zinc-400">{m.forWhom}</p>
                <span className="text-[10px] font-mono text-amber-400 block pt-1">{m.dist}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Step-by-Step Chronology Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Phase Selector Column */}
          <div className="space-y-2">
            <p className="text-xs font-bold text-emerald-400 uppercase tracking-widest px-2 mb-1">
              Select Ritual Phase
            </p>
            {HAJJ_UMRAH_GUIDE.map((step, idx) => {
              const isSelected = selectedPhase === idx;
              return (
                <button
                  key={step.dayOrPhase}
                  onClick={() => setSelectedPhase(idx)}
                  className={`w-full text-left p-4 rounded-xl border transition-all flex items-center justify-between ${
                    isSelected
                      ? 'bg-emerald-950/80 border-amber-500 text-white shadow-md'
                      : 'bg-[#031c15]/60 hover:bg-[#031c15] border-white/5 text-emerald-200/80 hover:text-white'
                  }`}
                >
                  <div>
                    <span className="text-[10px] font-mono font-bold text-amber-400 block uppercase">
                      {step.dayOrPhase}
                    </span>
                    <span className="text-sm font-bold text-white mt-0.5 block">{step.title}</span>
                    <span className="text-xs font-serif text-emerald-400/80 mt-0.5 block">{step.arabicTitle}</span>
                  </div>
                  <span className="text-xs text-zinc-500">›</span>
                </button>
              );
            })}
          </div>

          {/* Phase Detail Card */}
          <div className="lg:col-span-2 bg-[#031c15] border border-emerald-500/20 rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="flex items-start justify-between border-b border-white/10 pb-4">
              <div>
                <span className="text-xs font-mono font-bold text-amber-400 uppercase">
                  {currentStep.dayOrPhase}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold font-serif text-white mt-1">
                  {currentStep.title}
                </h3>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xs text-emerald-300 flex items-center gap-1 font-mono">
                    <MapPin className="w-3.5 h-3.5 text-amber-400" />
                    {currentStep.location}
                  </span>
                  {currentStep.isRukn && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                      RUKN (Obligatory Pillar)
                    </span>
                  )}
                </div>
              </div>
              <span className="text-2xl font-serif text-amber-300 px-3 py-1 rounded-xl bg-amber-500/10 border border-amber-500/30">
                {currentStep.arabicTitle}
              </span>
            </div>

            {/* Step Actions */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-widest">
                Prescribed Ritual Actions
              </h4>
              <ul className="space-y-2">
                {currentStep.actions.map((act, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs text-zinc-200 leading-relaxed">
                    <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <span>{act}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Recommended Dua */}
            <div className="p-4 rounded-xl bg-gradient-to-b from-[#063024] to-[#042018] border border-amber-500/30">
              <p className="text-[11px] font-bold text-amber-400 uppercase tracking-wider mb-1 font-mono">
                Key Prophetic Supplication
              </p>
              <p className="text-lg sm:text-xl font-serif text-amber-200 leading-relaxed py-1">
                {currentStep.duas}
              </p>
            </div>

            {/* Prohibitions */}
            {currentStep.prohibitions.length > 0 && (
              <div className="p-4 rounded-xl bg-red-950/30 border border-red-500/30 space-y-1.5">
                <div className="flex items-center gap-1.5 text-xs font-bold text-red-300">
                  <AlertCircle className="w-4 h-4" />
                  <span>Important Prohibitions & Mistakes to Avoid</span>
                </div>
                <ul className="list-disc list-inside text-xs text-zinc-300 space-y-1">
                  {currentStep.prohibitions.map((p, i) => (
                    <li key={i}>{p}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Interactive Offline Packing Checklist */}
        <div className="bg-[#031c15] border border-emerald-500/20 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-2">
              <Luggage className="w-5 h-5 text-amber-400" />
              <div>
                <h3 className="text-lg font-bold text-white font-serif">
                  Interactive Hajj & Umrah Packing Checklist
                </h3>
                <p className="text-xs text-emerald-300/70">
                  Tap to check off items. Stored locally on your device for completely offline access in Makkah and Mina.
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                setPackedItems({});
                localStorage.removeItem('@noor_hajj_packing');
              }}
              className="text-xs text-zinc-400 hover:text-white transition-colors"
            >
              Reset Checklist
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {HAJJ_PACKING_CHECKLIST.map(item => {
              const isChecked = !!packedItems[item.item];
              return (
                <button
                  key={item.item}
                  onClick={() => togglePacked(item.item)}
                  className={`p-3 rounded-xl border text-left flex items-start gap-3 transition-colors ${
                    isChecked
                      ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200'
                      : 'bg-white/5 hover:bg-white/10 border-white/5 text-zinc-200'
                  }`}
                >
                  {isChecked ? (
                    <CheckSquare className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  ) : (
                    <Square className="w-4 h-4 text-zinc-500 shrink-0 mt-0.5" />
                  )}
                  <span className={`text-xs ${isChecked ? 'line-through opacity-70' : ''}`}>
                    {item.item}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
