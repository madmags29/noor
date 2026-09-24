'use client';

// ============================================================
// NOOR Web — Nikah & Family Islamic Guidance Hub
// Sourced from Quran & Sunnah with Authentic Jurisprudence
// ============================================================

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Heart,
  BookOpen,
  ShieldCheck,
  CheckCircle2,
  HelpCircle,
  Users,
  Award
} from 'lucide-react';
import { GlobalNavbar } from '../../components/GlobalNavbar';
import { Footer } from '../../components/Footer';
import { NIKAH_FAMILY_GUIDE } from '../../data/islamicCoreData';

export default function NikahPage() {
  const [activeTab, setActiveTab] = useState<'pillars' | 'premarital' | 'rights' | 'duas'>('pillars');

  return (
    <div className="min-h-screen bg-[#02120d] text-white flex flex-col selection:bg-amber-500 selection:text-black relative overflow-hidden">
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-10 left-10 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[140px]" />
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
                  Nikah & Family Islamic Hub
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                  Sacred Covenant
                </span>
              </div>
              <p className="text-xs text-emerald-300/70 mt-0.5 font-mono">
                Pillars of Nikah • Pre-Marital Counseling Questions • Mutual Rights • Duas
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <main className="max-w-5xl mx-auto w-full px-4 sm:px-6 py-8 flex-1 space-y-8">
        {/* Quranic Harmony Banner */}
        <div className="bg-gradient-to-r from-[#04281f] via-[#05382b] to-[#04281f] p-6 sm:p-8 rounded-3xl border border-amber-500/40 space-y-3 shadow-xl">
          <span className="text-[11px] font-bold text-amber-400 uppercase tracking-widest font-mono">
            Surah Ar-Rum 30:21
          </span>
          <p className="text-xl sm:text-2xl font-serif text-amber-200 leading-loose">
            وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً
          </p>
          <p className="text-xs sm:text-sm text-white/90 leading-relaxed pt-2 border-t border-white/10">
            "And of His signs is that He created for you from yourselves mates that you may find tranquility in them; and He placed between you affection and mercy. Indeed in that are signs for a people who give thought."
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 border-b border-white/10 pb-2">
          {[
            { id: 'pillars', label: 'Pillars of Nikah' },
            { id: 'premarital', label: '20 Pre-Marital Questions' },
            { id: 'rights', label: 'Mutual Rights & Duties' },
            { id: 'duas', label: 'Wedding & Family Duas' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === tab.id
                  ? 'bg-amber-500 text-black shadow'
                  : 'bg-white/5 hover:bg-white/10 text-zinc-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Pillars Tab */}
        {activeTab === 'pillars' && (
          <div className="bg-[#031c15] border border-emerald-500/20 rounded-3xl p-6 sm:p-8 space-y-6 animate-in fade-in">
            <h3 className="text-xl font-bold font-serif text-white">
              The 5 Mandatory Pillars of an Islamic Marriage
            </h3>
            <p className="text-xs text-zinc-300">
              For a marriage contract to be valid under classical Islamic law (Shariah), all five conditions must be fulfilled.
            </p>

            <div className="space-y-3">
              {NIKAH_FAMILY_GUIDE[0].points.map((p, i) => (
                <div key={i} className="p-4 rounded-xl bg-black/30 border border-white/5 text-xs text-zinc-200 leading-relaxed flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-amber-500 text-black font-bold font-mono text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <span>{p}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Pre-Marital Questions Tab */}
        {activeTab === 'premarital' && (
          <div className="bg-[#031c15] border border-emerald-500/20 rounded-3xl p-6 sm:p-8 space-y-6 animate-in fade-in">
            <h3 className="text-xl font-bold font-serif text-white">
              Essential Topics to Discuss Before Marriage
            </h3>
            <p className="text-xs text-zinc-300">
              Scholars emphasize clear, honest communication prior to finalizing marriage to ensure mutual compatibility and understanding.
            </p>

            <div className="space-y-3">
              {NIKAH_FAMILY_GUIDE[1].points.map((p, i) => (
                <div key={i} className="p-4 rounded-xl bg-black/30 border border-white/5 text-xs text-zinc-200 leading-relaxed flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold font-mono text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <span>{p}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Rights & Responsibilities */}
        {activeTab === 'rights' && (
          <div className="bg-[#031c15] border border-emerald-500/20 rounded-3xl p-6 sm:p-8 space-y-6 animate-in fade-in">
            <h3 className="text-xl font-bold font-serif text-white">
              Rights and Responsibilities in Marriage
            </h3>

            <div className="space-y-3">
              {NIKAH_FAMILY_GUIDE[2].points.map((p, i) => (
                <div key={i} className="p-4 rounded-xl bg-black/30 border border-white/5 text-xs text-zinc-200 leading-relaxed flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-300 font-bold font-mono text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                    ✓
                  </span>
                  <span>{p}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Duas */}
        {activeTab === 'duas' && (
          <div className="bg-[#031c15] border border-emerald-500/20 rounded-3xl p-6 sm:p-8 space-y-6 animate-in fade-in">
            <h3 className="text-xl font-bold font-serif text-white">
              Prophetic Wedding Congratulation Supplication
            </h3>

            <div className="p-6 rounded-2xl bg-gradient-to-b from-[#063024] to-[#042018] border border-amber-500/40 text-center space-y-2">
              <p className="text-2xl sm:text-3xl font-serif text-amber-200 py-2">
                بَارَكَ اللَّهُ لَكَ، وَبَارَكَ عَلَيْكَ، وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ
              </p>
              <p className="text-xs text-emerald-300 font-mono italic">
                "BarakAllahu laka, wa baraka 'alayka, wa jama'a baynakuma fee khayr."
              </p>
              <p className="text-xs sm:text-sm text-white/90 pt-2 border-t border-white/10">
                "May Allah bless you, and bestow His blessings upon you, and unite both of you in goodness." (Abu Dawud 2130 & Tirmidhi 1091)
              </p>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
