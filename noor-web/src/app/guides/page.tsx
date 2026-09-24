'use client';

// ============================================================
// NOOR Web — Complete Prayer & Purification Master Guide
// Sourced from Classical Sunni Fiqh (Hanafi, Shafi'i, Maliki, Hanbali)
// ============================================================

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Compass,
  ArrowLeft,
  Sparkles,
  Droplets,
  BookOpen,
  CheckCircle2,
  Calendar,
  Layers,
  Award,
  Clock,
  Plus,
  Minus,
  RotateCcw,
  Volume2,
  Info
} from 'lucide-react';
import { GlobalNavbar } from '../../components/GlobalNavbar';
import { Footer } from '../../components/Footer';
import {
  WUDU_STEPS,
  POST_WUDU_DUA,
  GHUSL_STEPS,
  SALAH_STEPS,
  SUNNAH_PRAYERS
} from '../../data/islamicCoreData';

type ActiveTab = 'salah' | 'wudu' | 'ghusl' | 'sunnah' | 'qada' | 'calculation';

interface QadaCounts {
  fajr: number;
  dhuhr: number;
  asr: number;
  maghrib: number;
  isha: number;
  witr: number;
}

export default function GuidesPage() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('salah');
  const [activeSalahStep, setActiveSalahStep] = useState<number>(1);
  const [activeWuduStep, setActiveWuduStep] = useState<number>(1);

  // Missed-prayer journal (Qada Tracker) stored in localStorage
  const [qadaCounts, setQadaCounts] = useState<QadaCounts>({
    fajr: 0,
    dhuhr: 0,
    asr: 0,
    maghrib: 0,
    isha: 0,
    witr: 0
  });

  useEffect(() => {
    try {
      const saved = localStorage.getItem('@noor_qada_journal');
      if (saved) {
        setQadaCounts(JSON.parse(saved));
      }
    } catch {}
  }, []);

  const updateQada = (prayer: keyof QadaCounts, delta: number) => {
    setQadaCounts(prev => {
      const updated = {
        ...prev,
        [prayer]: Math.max(0, prev[prayer] + delta)
      };
      try {
        localStorage.setItem('@noor_qada_journal', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const resetQadaPrayer = (prayer: keyof QadaCounts) => {
    updateQada(prayer, -qadaCounts[prayer]);
  };

  const totalMissed = Object.values(qadaCounts).reduce((a, b) => a + b, 0);

  return (
    <div className="min-h-screen bg-[#02120d] text-white flex flex-col selection:bg-amber-500 selection:text-black relative overflow-hidden">
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-600/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[120px]" />
      </div>

      <GlobalNavbar />

      {/* Header Banner */}
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
                  Prayer & Purification Guide
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  Scholarly Verified
                </span>
              </div>
              <p className="text-xs text-emerald-300/70 mt-0.5 font-mono">
                Method of the Messenger ﷺ • Wudu • Ghusl • Sunnah Prayers • Qada Journal
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/prayer-times"
              className="px-3.5 py-1.5 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/30 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Clock className="w-3.5 h-3.5" />
              <span>Prayer Times</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation Segmented Controls */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 pt-6">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-white/10">
          {[
            { id: 'salah', label: 'Salah Step-by-Step', icon: BookOpen },
            { id: 'wudu', label: 'Wudu (Ablution)', icon: Droplets },
            { id: 'ghusl', label: 'Ghusl (Major Bath)', icon: Sparkles },
            { id: 'sunnah', label: 'Sunnah Prayers', icon: Award },
            { id: 'qada', label: 'Missed-Prayer Journal', icon: RotateCcw, badge: totalMissed > 0 ? `${totalMissed}` : undefined },
            { id: 'calculation', label: 'Calculation & Madhabs', icon: Layers }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as ActiveTab)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20'
                    : 'bg-white/5 hover:bg-white/10 text-emerald-200/80 hover:text-white border border-white/5'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
                {tab.badge && (
                  <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-red-500 text-white font-mono">
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 py-8 flex-1">
        {/* ============================================================ */}
        {/* 1. SALAH STEP-BY-STEP */}
        {/* ============================================================ */}
        {activeTab === 'salah' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div className="bg-gradient-to-r from-[#03231a] to-[#042d22] p-6 rounded-2xl border border-emerald-500/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <span className="text-[11px] font-bold text-amber-400 uppercase tracking-widest">
                  Authentic Prophetic Methodology
                </span>
                <h2 className="text-2xl font-serif font-bold text-white mt-1">
                  How the Prophet Muhammad ﷺ Prayed
                </h2>
                <p className="text-sm text-emerald-200/70 mt-1 max-w-2xl">
                  "Pray as you have seen me praying." (Sahih al-Bukhari 631). Step-by-step guidance through each posture, internal presence, required recitations, and concluding salutations.
                </p>
              </div>
              <div className="text-right">
                <span className="text-3xl font-serif text-amber-300 font-bold">٨</span>
                <span className="text-xs text-emerald-300/70 block">Essential Postures</span>
              </div>
            </div>

            {/* Steps Timeline Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Step Navigation Column */}
              <div className="space-y-2">
                {SALAH_STEPS.map(s => {
                  const isCurrent = activeSalahStep === s.step;
                  return (
                    <button
                      key={s.step}
                      onClick={() => setActiveSalahStep(s.step)}
                      className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center justify-between ${
                        isCurrent
                          ? 'bg-emerald-950/80 border-amber-500 text-white shadow-md'
                          : 'bg-[#031c15]/60 hover:bg-[#031c15] border-white/5 text-emerald-200/80 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold font-mono ${
                          isCurrent ? 'bg-amber-500 text-black' : 'bg-white/10 text-emerald-300'
                        }`}>
                          {s.step}
                        </span>
                        <div>
                          <p className="text-xs font-bold leading-tight">{s.name}</p>
                          <p className="text-[11px] font-serif text-amber-400/80 mt-0.5">{s.arabicName}</p>
                        </div>
                      </div>
                      <span className="text-xs text-zinc-500">›</span>
                    </button>
                  );
                })}
              </div>

              {/* Step Detail Card */}
              {(() => {
                const current = SALAH_STEPS.find(s => s.step === activeSalahStep) || SALAH_STEPS[0];
                return (
                  <div className="lg:col-span-2 bg-[#031c15] border border-emerald-500/20 rounded-2xl p-6 sm:p-8 flex flex-col justify-between space-y-6">
                    <div>
                      <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                        <div>
                          <span className="text-xs font-mono font-bold text-amber-400">
                            STEP {current.step} OF {SALAH_STEPS.length}
                          </span>
                          <h3 className="text-xl sm:text-2xl font-bold font-serif text-white mt-1">
                            {current.name}
                          </h3>
                        </div>
                        <span className="text-2xl font-serif text-amber-300 px-3 py-1 rounded-xl bg-amber-500/10 border border-amber-500/30">
                          {current.arabicName}
                        </span>
                      </div>

                      {/* Posture Description */}
                      <div className="space-y-4">
                        <div className="p-4 rounded-xl bg-black/30 border border-white/5">
                          <p className="text-xs text-emerald-300 uppercase tracking-wider font-bold mb-1">
                            Physical Posture & Alignment
                          </p>
                          <p className="text-sm text-zinc-200 leading-relaxed">
                            {current.posture}
                          </p>
                        </div>

                        {/* Arabic Utterance Box */}
                        <div className="p-5 rounded-xl bg-gradient-to-b from-[#063024] to-[#042018] border border-amber-500/30 text-center">
                          <p className="text-xs text-amber-300/80 uppercase tracking-widest font-mono mb-2">
                            What to Recite in this Position
                          </p>
                          <p className="text-2xl sm:text-3xl font-serif text-amber-200 leading-loose py-2">
                            {current.arabicUtterance}
                          </p>
                          <p className="text-xs text-emerald-300 font-mono italic mt-1">
                            "{current.transliteration}"
                          </p>
                          <p className="text-sm text-white/90 font-medium mt-3 border-t border-white/10 pt-3">
                            Meaning: {current.englishMeaning}
                          </p>
                        </div>

                        {/* Essential Rules */}
                        <div className="flex items-start gap-3 p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/20">
                          <Info className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                          <p className="text-xs text-emerald-100/90 leading-relaxed">
                            <strong className="text-amber-300">Essential Fiqh Rule: </strong>
                            {current.vitalRules}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Step Navigation Controls */}
                    <div className="flex items-center justify-between border-t border-white/10 pt-4">
                      <button
                        disabled={activeSalahStep <= 1}
                        onClick={() => setActiveSalahStep(k => Math.max(1, k - 1))}
                        className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:pointer-events-none text-xs font-bold transition-colors"
                      >
                        ← Previous Posture
                      </button>
                      <button
                        disabled={activeSalahStep >= SALAH_STEPS.length}
                        onClick={() => setActiveSalahStep(k => Math.min(SALAH_STEPS.length, k + 1))}
                        className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black disabled:opacity-30 disabled:pointer-events-none text-xs font-bold transition-colors"
                      >
                        Next Posture →
                      </button>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* 2. WUDU GUIDE */}
        {/* ============================================================ */}
        {activeTab === 'wudu' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div className="bg-[#031c15] p-6 rounded-2xl border border-emerald-500/20 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-widest">
                  Quranic Foundation (Surah Al-Ma'idah 5:6)
                </span>
                <h2 className="text-2xl font-serif font-bold text-white mt-1">
                  Step-by-Step Wudu (Ablution) Guide
                </h2>
                <p className="text-sm text-emerald-200/70 mt-1 max-w-2xl">
                  Purification is half of faith. Learn the exact 8 steps with clear differentiation between Fard (obligatory pillars) and confirmed Sunnahs.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-bold">
                  ٤ Fard Pillars
                </span>
                <span className="px-3 py-1 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold">
                  ٤ Sunnah Acts
                </span>
              </div>
            </div>

            {/* Wudu Steps Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {WUDU_STEPS.map(step => (
                <div
                  key={step.step}
                  className={`p-5 rounded-2xl border transition-all flex flex-col justify-between ${
                    step.isFard
                      ? 'bg-[#03231a] border-amber-500/40'
                      : 'bg-[#031c15] border-emerald-500/20'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center font-mono font-bold text-xs text-amber-300">
                        {step.step}
                      </span>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        step.isFard
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                          : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      }`}>
                        {step.isFard ? 'FARD (Obligatory)' : 'SUNNAH'}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-white leading-snug">
                      {step.title}
                    </h4>
                    <p className="text-xs font-serif text-amber-400 mt-1">
                      {step.arabicName} ({step.times}x)
                    </p>
                    <p className="text-xs text-zinc-300/80 leading-relaxed mt-3">
                      {step.instruction}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/5">
                    <p className="text-[10px] text-emerald-400/80 italic">
                      {step.hadithNote}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Post-Wudu Dua Banner */}
            <div className="bg-gradient-to-r from-[#03231a] via-[#043325] to-[#03231a] p-6 sm:p-8 rounded-2xl border border-amber-500/40 text-center">
              <span className="text-[11px] font-bold text-amber-400 uppercase tracking-widest font-mono">
                Prophetic Supplication After Completing Wudu
              </span>
              <p className="text-2xl sm:text-3xl font-serif text-amber-200 leading-loose my-3">
                {POST_WUDU_DUA.arabic}
              </p>
              <p className="text-xs text-emerald-300 font-mono italic max-w-3xl mx-auto">
                "{POST_WUDU_DUA.transliteration}"
              </p>
              <p className="text-sm text-white/90 max-w-3xl mx-auto mt-2">
                {POST_WUDU_DUA.translation}
              </p>
              <div className="inline-block mt-4 px-4 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-300 font-semibold">
                ✨ {POST_WUDU_DUA.virtue}
              </div>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* 3. GHUSL GUIDE */}
        {/* ============================================================ */}
        {activeTab === 'ghusl' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div className="bg-[#031c15] p-6 rounded-2xl border border-emerald-500/20">
              <h2 className="text-2xl font-serif font-bold text-white">
                Ghusl (Major Ritual Purification) Guide
              </h2>
              <p className="text-sm text-emerald-200/70 mt-1 max-w-3xl">
                Ghusl is required after intimacy (Janabah), nocturnal emission, cessation of menstruation (Hayd), or post-natal bleeding (Nifas). It is also Sunnah for Friday prayer, Eid, and entering Ihram.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {GHUSL_STEPS.map(step => (
                <div
                  key={step.step}
                  className="bg-[#031c15] border border-emerald-500/20 rounded-2xl p-6 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center font-mono font-bold text-sm text-amber-400">
                        {step.step}
                      </span>
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        step.type === 'Fard'
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                          : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      }`}>
                        {step.type}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-white">{step.title}</h3>
                    <p className="text-xs font-serif text-amber-400/80 mt-0.5">{step.arabicName}</p>
                    <p className="text-xs text-zinc-300 leading-relaxed mt-3">
                      {step.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* 4. SUNNAH PRAYERS */}
        {/* ============================================================ */}
        {activeTab === 'sunnah' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="bg-[#031c15] p-6 rounded-2xl border border-emerald-500/20">
              <h2 className="text-2xl font-serif font-bold text-white">
                Sunnah & Nafl Voluntary Prayers
              </h2>
              <p className="text-sm text-emerald-200/70 mt-1 max-w-3xl">
                Supererogatory prayers that draw the believer closer to Allah, compensate for omissions in obligatory prayers, and secure high mansions in Jannah.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {SUNNAH_PRAYERS.map(p => (
                <div
                  key={p.id}
                  className="bg-[#031c15] border border-emerald-500/20 rounded-2xl p-6 space-y-4 hover:border-amber-500/30 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-white">{p.name}</h3>
                      <p className="text-xs font-serif text-amber-400">{p.arabicName}</p>
                    </div>
                    <span className="px-2.5 py-1 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 font-mono text-xs font-bold">
                      {p.rakahs}
                    </span>
                  </div>

                  <p className="text-xs text-zinc-300 leading-relaxed">
                    {p.description}
                  </p>

                  <div className="p-3.5 rounded-xl bg-black/30 border border-white/5 space-y-1">
                    <p className="text-[11px] text-emerald-400 font-bold uppercase tracking-wider">
                      Timing: <span className="text-white font-normal">{p.timing}</span>
                    </p>
                    <p className="text-[11px] text-amber-300/90 italic pt-1 border-t border-white/5">
                      "{p.virtue}"
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* 5. MISSED-PRAYER JOURNAL (QADA TRACKER) */}
        {/* ============================================================ */}
        {activeTab === 'qada' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="bg-[#031c15] p-6 rounded-2xl border border-emerald-500/20 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <span className="text-[11px] font-bold text-amber-400 uppercase tracking-widest font-mono">
                  Obligatory Debt to Allah (Dayn Allah)
                </span>
                <h2 className="text-2xl font-serif font-bold text-white mt-1">
                  Missed-Prayer Journal (Qada Tracker)
                </h2>
                <p className="text-sm text-emerald-200/70 mt-1 max-w-2xl">
                  "A debt owed to Allah has more right to be paid." (Sahih al-Bukhari 1953). Track and fulfill your missed prayers systematically with automated local storage.
                </p>
              </div>

              <div className="px-5 py-3 rounded-2xl bg-black/40 border border-amber-500/30 text-center">
                <span className="text-xs text-zinc-400 uppercase tracking-widest font-mono block">Total Remaining</span>
                <span className="text-3xl font-mono font-bold text-amber-400">{totalMissed}</span>
                <span className="text-[11px] text-emerald-300 block">Prayers to Complete</span>
              </div>
            </div>

            {/* Qada Counter Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { key: 'fajr', name: 'Fajr (Dawn)', arabic: 'الفجر', rakahs: 2 },
                { key: 'dhuhr', name: 'Dhuhr (Midday)', arabic: 'الظهر', rakahs: 4 },
                { key: 'asr', name: 'Asr (Afternoon)', arabic: 'العصر', rakahs: 4 },
                { key: 'maghrib', name: 'Maghrib (Sunset)', arabic: 'المغرب', rakahs: 3 },
                { key: 'isha', name: 'Isha (Night)', arabic: 'العشاء', rakahs: 4 },
                { key: 'witr', name: 'Witr (Hanafi Wajib)', arabic: 'الوتر', rakahs: 3 },
              ].map(item => {
                const k = item.key as keyof QadaCounts;
                const count = qadaCounts[k];
                return (
                  <div
                    key={item.key}
                    className="p-5 rounded-2xl bg-[#031c15] border border-emerald-500/20 flex flex-col justify-between"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-base font-bold text-white">{item.name}</h3>
                        <p className="text-xs font-serif text-amber-400">{item.arabic} • {item.rakahs} Rak'ahs</p>
                      </div>
                      <span className="text-2xl font-mono font-bold text-emerald-300">
                        {count}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 mt-6">
                      <button
                        onClick={() => updateQada(k, -1)}
                        className="flex-1 py-2 rounded-xl bg-white/5 hover:bg-emerald-500/20 text-emerald-300 font-bold text-xs flex items-center justify-center gap-1 transition-colors border border-white/5"
                        title="Mark one prayer prayed"
                      >
                        <Minus className="w-3.5 h-3.5" />
                        <span>Prayed -1</span>
                      </button>
                      <button
                        onClick={() => updateQada(k, 1)}
                        className="flex-1 py-2 rounded-xl bg-white/5 hover:bg-amber-500/20 text-amber-300 font-bold text-xs flex items-center justify-center gap-1 transition-colors border border-white/5"
                        title="Add a missed prayer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Missed +1</span>
                      </button>
                      <button
                        onClick={() => resetQadaPrayer(k)}
                        className="p-2 rounded-xl bg-white/5 hover:bg-red-500/20 text-zinc-400 hover:text-red-300 text-xs transition-colors"
                        title="Reset to 0"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* 6. CALCULATION METHODS & MADHABS */}
        {/* ============================================================ */}
        {activeTab === 'calculation' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="bg-[#031c15] p-6 rounded-2xl border border-emerald-500/20">
              <h2 className="text-2xl font-serif font-bold text-white">
                Astronomical Prayer Calculation & Madhab Jurisprudence
              </h2>
              <p className="text-sm text-emerald-200/70 mt-1 max-w-3xl">
                Prayer times are calculated from solar angles. Understand the scholarly conventions adopted worldwide.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Madhab Differences Card */}
              <div className="bg-[#031c15] border border-emerald-500/20 rounded-2xl p-6 space-y-4">
                <div className="flex items-center gap-2 text-amber-400">
                  <Layers className="w-5 h-5" />
                  <h3 className="text-lg font-bold text-white">Asr Shadow Jurisprudence</h3>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="p-3.5 rounded-xl bg-black/30 border border-white/5">
                    <p className="font-bold text-emerald-300">Standard / Shafi'i, Maliki & Hanbali:</p>
                    <p className="text-zinc-300 mt-1">
                      Asr starts when the shadow of an upright object equals its own length (1x) plus its midday shadow.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-black/30 border border-white/5">
                    <p className="font-bold text-amber-300">Hanafi School (Imam Abu Hanifa):</p>
                    <p className="text-zinc-300 mt-1">
                      Asr starts when the shadow of an upright object becomes twice its own length (2x) plus its midday shadow. This delays Asr by approximately 45–60 minutes.
                    </p>
                  </div>
                </div>
              </div>

              {/* Major Global Calculation Conventions */}
              <div className="bg-[#031c15] border border-emerald-500/20 rounded-2xl p-6 space-y-4">
                <div className="flex items-center gap-2 text-emerald-400">
                  <Compass className="w-5 h-5" />
                  <h3 className="text-lg font-bold text-white">Recognized Global Authorities</h3>
                </div>

                <ul className="space-y-2 text-xs text-zinc-300">
                  <li className="p-2.5 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between">
                    <span className="font-semibold text-white">Muslim World League (MWL)</span>
                    <span className="text-emerald-400 font-mono">Fajr 18° • Isha 17°</span>
                  </li>
                  <li className="p-2.5 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between">
                    <span className="font-semibold text-white">Umm al-Qura (Makkah, Saudi Arabia)</span>
                    <span className="text-emerald-400 font-mono">Fajr 18.5° • Isha 90min</span>
                  </li>
                  <li className="p-2.5 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between">
                    <span className="font-semibold text-white">Egyptian General Authority of Survey</span>
                    <span className="text-emerald-400 font-mono">Fajr 19.5° • Isha 17.5°</span>
                  </li>
                  <li className="p-2.5 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between">
                    <span className="font-semibold text-white">ISNA (North America)</span>
                    <span className="text-emerald-400 font-mono">Fajr 15° • Isha 15°</span>
                  </li>
                  <li className="p-2.5 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between">
                    <span className="font-semibold text-white">Univ. of Islamic Sciences (Karachi)</span>
                    <span className="text-emerald-400 font-mono">Fajr 18° • Isha 18°</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
