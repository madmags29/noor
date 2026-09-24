'use client';

// ============================================================
// NOOR Web — Muslim Travel Mode (Safar Companion)
// Qasr Prayer Calculator • Qibla • Verified Mosques • Halal Verification Rules
// ============================================================

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Compass,
  ArrowLeft,
  MapPin,
  Clock,
  ShieldCheck,
  AlertTriangle,
  Layers,
  Utensils,
  Navigation,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import { GlobalNavbar } from '../../components/GlobalNavbar';
import { Footer } from '../../components/Footer';
import { TRAVEL_MODE_RULES } from '../../data/islamicCoreData';

export default function TravelModePage() {
  const [distanceKm, setDistanceKm] = useState<number>(120);

  const isSafar = distanceKm >= TRAVEL_MODE_RULES.minDistanceKm;

  return (
    <div className="min-h-screen bg-[#02120d] text-white flex flex-col selection:bg-amber-500 selection:text-black relative overflow-hidden">
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-10 right-10 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[140px]" />
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
                  NOOR Travel Mode (Safar Companion)
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                  Global Traveler
                </span>
              </div>
              <p className="text-xs text-emerald-300/70 mt-0.5 font-mono">
                Qasr Calculations • Qibla Compass • Verified Mosques & Musallas • Halal Food Standards
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 py-8 flex-1 space-y-8">
        {/* Safar Calculator Card */}
        <div className="bg-[#031c15] border border-emerald-500/30 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
            <div>
              <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest">
                Fiqh al-Safar Engine
              </span>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-white mt-1">
                Travel Distance & Qasr Prayer Eligibility
              </h2>
            </div>

            <div className={`px-4 py-2 rounded-xl text-xs font-bold border flex items-center gap-2 ${
              isSafar
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                : 'bg-zinc-500/20 text-zinc-400 border-white/10'
            }`}>
              <CheckCircle2 className="w-4 h-4" />
              <span>{isSafar ? 'Safar Rules Active (Qasr Permitted)' : 'Resident Status (Full Prayers)'}</span>
            </div>
          </div>

          <div className="space-y-4">
            <label className="block text-xs text-zinc-300 font-medium">
              One-Way Travel Distance from City Border ({distanceKm} km / {(distanceKm * 0.621371).toFixed(1)} miles)
            </label>
            <input
              type="range"
              min="10"
              max="1000"
              step="5"
              value={distanceKm}
              onChange={e => setDistanceKm(Number(e.target.value))}
              className="w-full accent-amber-500 h-2 bg-black/50 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[11px] font-mono text-zinc-500">
              <span>0 km</span>
              <span className="text-amber-400 font-bold">Minimum Safar Threshold: 77 km (48 miles)</span>
              <span>1000+ km</span>
            </div>
          </div>

          {/* Qasr Status Breakdown */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-black/30 border border-white/5 space-y-1">
              <span className="text-emerald-400 font-bold block">Fajr</span>
              <p className="text-white text-sm font-bold">2 Rak'ahs</p>
              <span className="text-[10px] text-zinc-400 block">No change in travel</span>
            </div>

            <div className="p-4 rounded-xl bg-black/30 border border-white/5 space-y-1">
              <span className="text-amber-400 font-bold block">Dhuhr (Qasr)</span>
              <p className="text-white text-sm font-bold">
                {isSafar ? 'Shortened to 2 Rak\'ahs' : '4 Rak\'ahs'}
              </p>
              <span className="text-[10px] text-zinc-400 block">
                {isSafar ? 'Sunnah Qasr active' : 'Normal residency'}
              </span>
            </div>

            <div className="p-4 rounded-xl bg-black/30 border border-white/5 space-y-1">
              <span className="text-amber-400 font-bold block">Asr (Qasr)</span>
              <p className="text-white text-sm font-bold">
                {isSafar ? 'Shortened to 2 Rak\'ahs' : '4 Rak\'ahs'}
              </p>
              <span className="text-[10px] text-zinc-400 block">
                {isSafar ? 'Sunnah Qasr active' : 'Normal residency'}
              </span>
            </div>

            <div className="p-4 rounded-xl bg-black/30 border border-white/5 space-y-1">
              <span className="text-emerald-400 font-bold block">Maghrib</span>
              <p className="text-white text-sm font-bold">3 Rak'ahs</p>
              <span className="text-[10px] text-zinc-400 block">No change in travel</span>
            </div>

            <div className="p-4 rounded-xl bg-black/30 border border-white/5 space-y-1">
              <span className="text-amber-400 font-bold block">Isha (Qasr)</span>
              <p className="text-white text-sm font-bold">
                {isSafar ? 'Shortened to 2 Rak\'ahs' : '4 Rak\'ahs'}
              </p>
              <span className="text-[10px] text-zinc-400 block">
                {isSafar ? 'Sunnah Qasr active' : 'Normal residency'}
              </span>
            </div>

            <div className="p-4 rounded-xl bg-black/30 border border-white/5 space-y-1">
              <span className="text-emerald-400 font-bold block">Wiping Socks (Masah)</span>
              <p className="text-white text-sm font-bold">
                {isSafar ? '3 Days & 3 Nights (72h)' : '1 Day & 1 Night (24h)'}
              </p>
              <span className="text-[10px] text-zinc-400 block">Over leather/thick socks</span>
            </div>

            <div className="p-4 rounded-xl bg-black/30 border border-white/5 space-y-1">
              <span className="text-emerald-400 font-bold block">Combining (Jam')</span>
              <p className="text-white text-sm font-bold">
                {isSafar ? 'Permitted in Transit' : 'Not Permitted'}
              </p>
              <span className="text-[10px] text-zinc-400 block">Dhuhr+Asr / Maghrib+Isha</span>
            </div>

            <div className="p-4 rounded-xl bg-black/30 border border-white/5 space-y-1">
              <span className="text-emerald-400 font-bold block">Ramadan Fasting</span>
              <p className="text-white text-sm font-bold">
                {isSafar ? 'Exemption with Qada' : 'Obligatory'}
              </p>
              <span className="text-[10px] text-zinc-400 block">Can be postponed</span>
            </div>
          </div>
        </div>

        {/* Halal Evidence Standards Disclaimer Card */}
        <div className="bg-[#031c15] border border-amber-500/30 rounded-3xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-2 text-amber-400">
            <AlertTriangle className="w-5 h-5" />
            <h3 className="text-lg font-bold text-white font-serif">
              Strict Halal Food Verification Policy
            </h3>
          </div>
          <p className="text-xs text-zinc-300 leading-relaxed">
            In compliance with Islamic scholarship and strict consumer trust: <strong className="text-amber-300">NOOR does not automatically declare a business Halal without verifiable supporting evidence.</strong>
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 text-xs">
            <div className="p-3.5 rounded-xl bg-black/30 border border-white/5 space-y-1">
              <span className="text-emerald-300 font-bold">1. Verified Halal Certification</span>
              <p className="text-zinc-400">Inspected by accredited Islamic food authorities (HMC, JAKIM, SANHA, IFANCA, Halal India).</p>
            </div>
            <div className="p-3.5 rounded-xl bg-black/30 border border-white/5 space-y-1">
              <span className="text-emerald-300 font-bold">2. Muslim-Owned Hand-Slaughtered</span>
              <p className="text-zinc-400">Establishments with verified Muslim ownership confirming 100% Zabiha sourcing without machine stunning.</p>
            </div>
            <div className="p-3.5 rounded-xl bg-black/30 border border-white/5 space-y-1">
              <span className="text-amber-300 font-bold">3. Cross-Contamination & Alcohol</span>
              <p className="text-zinc-400">Strict separation of cookware, zero pork products, and zero alcohol served or cooked into sauces.</p>
            </div>
          </div>
        </div>

        {/* Quick Travel Links */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <Link
            href="/qibla"
            className="p-6 rounded-2xl bg-[#031c15] border border-emerald-500/20 hover:border-amber-500/40 transition-colors flex items-center justify-between"
          >
            <div>
              <h4 className="text-base font-bold text-white">Qibla Compass</h4>
              <p className="text-xs text-zinc-400 mt-0.5">Find Kaaba direction anywhere on earth</p>
            </div>
            <Compass className="w-6 h-6 text-amber-400" />
          </Link>

          <Link
            href="/prayer-times"
            className="p-6 rounded-2xl bg-[#031c15] border border-emerald-500/20 hover:border-amber-500/40 transition-colors flex items-center justify-between"
          >
            <div>
              <h4 className="text-base font-bold text-white">Local Prayer Times</h4>
              <p className="text-xs text-zinc-400 mt-0.5">GPS location coordinates & Adhan</p>
            </div>
            <Clock className="w-6 h-6 text-emerald-400" />
          </Link>

          <Link
            href="/ziyarat"
            className="p-6 rounded-2xl bg-[#031c15] border border-emerald-500/20 hover:border-amber-500/40 transition-colors flex items-center justify-between"
          >
            <div>
              <h4 className="text-base font-bold text-white">Ziyarat Routes</h4>
              <p className="text-xs text-zinc-400 mt-0.5">35+ Holy Dargahs & Historical Mosques</p>
            </div>
            <MapPin className="w-6 h-6 text-amber-400" />
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
