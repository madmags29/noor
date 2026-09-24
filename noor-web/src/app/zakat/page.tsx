'use client';

// ============================================================
// NOOR Web — Zakat Calculator, Sadaqah, Ramadan & Eid Suite
// Completely Offline-Friendly with Live 2.5% Wealth Engine
// ============================================================

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Calculator,
  ArrowLeft,
  Moon,
  Sparkles,
  Heart,
  Gift,
  HelpCircle,
  ShieldCheck,
  CheckCircle2,
  DollarSign,
  Info
} from 'lucide-react';
import { GlobalNavbar } from '../../components/GlobalNavbar';
import { Footer } from '../../components/Footer';
import {
  NISAB_STANDARDS,
  SADAQAH_CATEGORIES,
  SadaqahCategory
} from '../../data/islamicCoreData';

export default function ZakatPage() {
  const [nisabStandard, setNisabStandard] = useState<'gold' | 'silver'>('silver');
  const [goldPricePerGram, setGoldPricePerGram] = useState<number>(85); // USD approx default
  const [silverPricePerGram, setSilverPricePerGram] = useState<number>(1.1); // USD approx default

  // Asset inputs
  const [cash, setCash] = useState<number>(0);
  const [goldValue, setGoldValue] = useState<number>(0);
  const [silverValue, setSilverValue] = useState<number>(0);
  const [businessStock, setBusinessStock] = useState<number>(0);
  const [moneyOwedToYou, setMoneyOwedToYou] = useState<number>(0);

  // Liabilities
  const [debtsDue, setDebtsDue] = useState<number>(0);
  const [billsDue, setBillsDue] = useState<number>(0);

  // Selected Sadaqah Channel Modal
  const [selectedChannel, setSelectedChannel] = useState<SadaqahCategory | null>(null);

  // Calculations
  const goldNisabValue = NISAB_STANDARDS.goldGrams * goldPricePerGram;
  const silverNisabValue = NISAB_STANDARDS.silverGrams * silverPricePerGram;
  const activeNisabThreshold = nisabStandard === 'gold' ? goldNisabValue : silverNisabValue;

  const totalAssets = (cash || 0) + (goldValue || 0) + (silverValue || 0) + (businessStock || 0) + (moneyOwedToYou || 0);
  const totalLiabilities = (debtsDue || 0) + (billsDue || 0);
  const netZakatWealth = Math.max(0, totalAssets - totalLiabilities);
  const isZakatEligible = netZakatWealth >= activeNisabThreshold;
  const zakatDue = isZakatEligible ? netZakatWealth * 0.025 : 0;

  return (
    <div className="min-h-screen bg-[#02120d] text-white flex flex-col selection:bg-amber-500 selection:text-black relative overflow-hidden">
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-[120px]" />
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
                  Zakat Calculator & Sadaqah Hub
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  2.5% Shariah Compliant
                </span>
              </div>
              <p className="text-xs text-emerald-300/70 mt-0.5 font-mono">
                Live Nisab Calculator • 9 Sadaqah Channels • Laylat al-Qadr & Taraweeh Guide
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 py-8 flex-1 space-y-10">
        {/* ============================================================ */}
        {/* 1. INTERACTIVE ZAKAT CALCULATOR */}
        {/* ============================================================ */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Inputs Column */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-[#031c15] border border-emerald-500/20 rounded-2xl p-6 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
                <div>
                  <h2 className="text-xl font-bold font-serif text-white">
                    Obligatory Zakat Assessment
                  </h2>
                  <p className="text-xs text-emerald-300/70 mt-0.5">
                    Enter your assets held for a full lunar year (Hawl).
                  </p>
                </div>

                {/* Nisab Selector */}
                <div className="flex items-center gap-1.5 p-1 rounded-xl bg-black/40 border border-white/10 text-xs">
                  <button
                    onClick={() => setNisabStandard('silver')}
                    className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                      nisabStandard === 'silver'
                        ? 'bg-amber-500 text-black shadow'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    Silver Nisab (Majority)
                  </button>
                  <button
                    onClick={() => setNisabStandard('gold')}
                    className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                      nisabStandard === 'gold'
                        ? 'bg-amber-500 text-black shadow'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    Gold Nisab
                  </button>
                </div>
              </div>

              {/* Asset Inputs Grid */}
              <div className="space-y-4">
                <h3 className="text-xs font-bold text-amber-400 uppercase tracking-widest font-mono">
                  1. Qualifying Zakat Assets ($)
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block text-zinc-300 mb-1 font-medium">Cash in Hand & Bank Accounts</label>
                    <input
                      type="number"
                      min="0"
                      value={cash || ''}
                      onChange={e => setCash(Number(e.target.value))}
                      placeholder="0.00"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/30 border border-white/10 focus:border-amber-500 text-white font-mono outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-zinc-300 mb-1 font-medium">Gold Value (Jewelry & Bars)</label>
                    <input
                      type="number"
                      min="0"
                      value={goldValue || ''}
                      onChange={e => setGoldValue(Number(e.target.value))}
                      placeholder="0.00"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/30 border border-white/10 focus:border-amber-500 text-white font-mono outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-zinc-300 mb-1 font-medium">Silver Value (Coins & Utensils)</label>
                    <input
                      type="number"
                      min="0"
                      value={silverValue || ''}
                      onChange={e => setSilverValue(Number(e.target.value))}
                      placeholder="0.00"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/30 border border-white/10 focus:border-amber-500 text-white font-mono outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-zinc-300 mb-1 font-medium">Business Merchandise & Stock</label>
                    <input
                      type="number"
                      min="0"
                      value={businessStock || ''}
                      onChange={e => setBusinessStock(Number(e.target.value))}
                      placeholder="0.00"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/30 border border-white/10 focus:border-amber-500 text-white font-mono outline-none"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-zinc-300 mb-1 font-medium">Money Owed to You (Recoverable Debts)</label>
                    <input
                      type="number"
                      min="0"
                      value={moneyOwedToYou || ''}
                      onChange={e => setMoneyOwedToYou(Number(e.target.value))}
                      placeholder="0.00"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/30 border border-white/10 focus:border-amber-500 text-white font-mono outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Deductible Liabilities */}
              <div className="space-y-4 pt-2 border-t border-white/10">
                <h3 className="text-xs font-bold text-red-400 uppercase tracking-widest font-mono">
                  2. Deductible Immediate Liabilities ($)
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block text-zinc-300 mb-1 font-medium">Immediate Debts Due Now</label>
                    <input
                      type="number"
                      min="0"
                      value={debtsDue || ''}
                      onChange={e => setDebtsDue(Number(e.target.value))}
                      placeholder="0.00"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/30 border border-white/10 focus:border-red-500 text-white font-mono outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-zinc-300 mb-1 font-medium">Upcoming Bills / Rent Due</label>
                    <input
                      type="number"
                      min="0"
                      value={billsDue || ''}
                      onChange={e => setBillsDue(Number(e.target.value))}
                      placeholder="0.00"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/30 border border-white/10 focus:border-red-500 text-white font-mono outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Results Summary Card */}
          <div className="space-y-6">
            <div className="bg-gradient-to-b from-[#04281f] to-[#021812] border border-amber-500/40 rounded-2xl p-6 space-y-6 shadow-xl">
              <div>
                <span className="text-[11px] font-mono font-bold text-amber-400 uppercase tracking-widest">
                  Live Assessment
                </span>
                <h3 className="text-xl font-bold font-serif text-white mt-1">
                  Zakat Payable
                </h3>
              </div>

              <div className="p-4 rounded-xl bg-black/40 border border-amber-500/30 text-center">
                <span className="text-xs text-zinc-400 font-mono uppercase block">Total Obligatory Zakat Due</span>
                <span className="text-4xl font-bold font-mono text-amber-300 my-2 block">
                  ${zakatDue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
                <span className={`text-[11px] px-2.5 py-0.5 rounded-full inline-block font-bold ${
                  isZakatEligible
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    : 'bg-zinc-500/20 text-zinc-400'
                }`}>
                  {isZakatEligible ? '✓ Nisab Threshold Reached' : 'Below Nisab (No Zakat Due)'}
                </span>
              </div>

              {/* Breakdown List */}
              <div className="space-y-2.5 text-xs text-zinc-300 border-t border-white/10 pt-4">
                <div className="flex justify-between">
                  <span>Gross Assets:</span>
                  <span className="font-mono text-white">${totalAssets.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Less Liabilities:</span>
                  <span className="font-mono text-red-400">-${totalLiabilities.toLocaleString()}</span>
                </div>
                <div className="flex justify-between font-bold text-white border-t border-white/5 pt-2">
                  <span>Net Zakatable Wealth:</span>
                  <span className="font-mono text-amber-400">${netZakatWealth.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-[11px] text-zinc-400">
                  <span>Nisab Standard ({nisabStandard}):</span>
                  <span className="font-mono">${activeNisabThreshold.toFixed(2)}</span>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href="#sadaqah-channels"
                  className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-lg shadow-amber-500/20"
                >
                  <Gift className="w-4 h-4" />
                  <span>Disburse Zakat & Sadaqah Below</span>
                </a>
              </div>
            </div>

            {/* Fiqh Explanation Note */}
            <div className="bg-[#031c15] border border-emerald-500/20 rounded-2xl p-5 text-xs text-emerald-200/80 space-y-2">
              <div className="flex items-center gap-1.5 text-amber-400 font-bold">
                <Info className="w-4 h-4" />
                <span>Scholarly Rule on Nisab Choice</span>
              </div>
              <p className="leading-relaxed">
                Classical scholars often recommend using the <strong>Silver Nisab</strong> ({NISAB_STANDARDS.silverGrams}g) because it sets a lower threshold, ensuring more vulnerable and impoverished souls receive support sooner.
              </p>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* 2. 9 SADAQAH & CHARITY CHANNELS */}
        {/* ============================================================ */}
        <div id="sadaqah-channels" className="space-y-6 pt-4">
          <div className="bg-[#031c15] p-6 rounded-2xl border border-emerald-500/20 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="text-[11px] font-bold text-amber-400 uppercase tracking-widest font-mono">
                Sadaqah Jariyah & Global Relief
              </span>
              <h2 className="text-2xl font-serif font-bold text-white mt-1">
                9 Essential Sadaqah & Giving Categories
              </h2>
              <p className="text-sm text-emerald-200/70 mt-1 max-w-3xl">
                "Charity does not decrease wealth." (Sahih Muslim 2588). Support verified, transparent humanitarian projects worldwide.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SADAQAH_CATEGORIES.map(cat => (
              <div
                key={cat.id}
                className="bg-[#031c15] border border-emerald-500/20 rounded-2xl p-6 flex flex-col justify-between hover:border-amber-500/40 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl p-3 rounded-2xl bg-white/5 border border-white/10">
                      {cat.icon}
                    </span>
                    <span className="text-xs font-serif text-amber-400/80">
                      {cat.arabicName}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white mb-2">{cat.name}</h3>
                  <p className="text-xs text-zinc-300 leading-relaxed mb-4">
                    {cat.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/5">
                  <div className="flex items-center justify-between text-xs text-emerald-300 font-mono">
                    <span className="truncate pr-2">Impact: {cat.impactMetric}</span>
                    <button
                      onClick={() => setSelectedChannel(cat)}
                      className="px-3 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-200 font-bold shrink-0 transition-colors"
                    >
                      Give Sadaqah
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ============================================================ */}
        {/* 3. LAYLAT AL-QADR, TARAWEEH & EID GUIDE */}
        {/* ============================================================ */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          {/* Laylat al-Qadr Card */}
          <div className="bg-[#031c15] border border-emerald-500/20 rounded-2xl p-6 space-y-4">
            <div className="flex items-center gap-2 text-amber-400">
              <Moon className="w-5 h-5" />
              <h3 className="text-lg font-bold text-white font-serif">Laylat al-Qadr (Night of Power)</h3>
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed">
              Better than a thousand months (Surah Al-Qadr 97:3). Seek it in the odd nights of the last ten days of Ramadan (21st, 23rd, 25th, 27th, 29th).
            </p>
            <div className="p-3.5 rounded-xl bg-black/40 border border-amber-500/30">
              <p className="text-[10px] text-amber-400 font-bold uppercase font-mono">Prescribed Supplication</p>
              <p className="text-base font-serif text-amber-200 leading-relaxed my-1">
                اللّٰهُمَّ إِنَّكَ عَفُوٌّ تُحِبُّ الْعَفْوَ فَاعْفُ عَنِّي
              </p>
              <p className="text-[10px] text-emerald-300 font-mono italic">
                "O Allah, You are Most Forgiving, and You love forgiveness; so forgive me." (Tirmidhi 3513)
              </p>
            </div>
          </div>

          {/* Taraweeh Guide */}
          <div className="bg-[#031c15] border border-emerald-500/20 rounded-2xl p-6 space-y-4">
            <div className="flex items-center gap-2 text-emerald-400">
              <Sparkles className="w-5 h-5" />
              <h3 className="text-lg font-bold text-white font-serif">Taraweeh Prayers</h3>
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed">
              "Whoever stands in prayer during Ramadan out of faith and seeking reward, his previous sins will be forgiven." (Bukhari 2009).
            </p>
            <div className="space-y-2 text-xs text-zinc-300">
              <p>• Prayed in units of 2 Rak'ahs after the obligatory Isha prayer.</p>
              <p>• Both 8 and 20 Rak'ahs are authentically grounded in classical Sunnah and practice of the Sahabah under Umar ibn al-Khattab.</p>
              <p>• Concluded with Salat al-Witr.</p>
            </div>
          </div>

          {/* Eid Preparation */}
          <div className="bg-[#031c15] border border-emerald-500/20 rounded-2xl p-6 space-y-4">
            <div className="flex items-center gap-2 text-amber-400">
              <Gift className="w-5 h-5" />
              <h3 className="text-lg font-bold text-white font-serif">Sunan of Eid Preparation</h3>
            </div>
            <ul className="space-y-1.5 text-xs text-zinc-300">
              <li>• Perform Ghusl before departing for Eid prayer.</li>
              <li>• Wear your best clean clothing and apply fragrance (men).</li>
              <li>• Eat odd number of dates before leaving for Eid al-Fitr.</li>
              <li>• Disburse Zakat al-Fitr before the Eid prayer begins.</li>
              <li>• Recite Takbeerat al-Eid aloud while walking: <em>Allahu Akbar, Allahu Akbar, La ilaha illAllah...</em></li>
              <li>• Take different routes when going to and returning from the prayer area.</li>
            </ul>
          </div>
        </div>
      </main>

      {/* Sadaqah Action Modal */}
      {selectedChannel && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-[#04281f] border border-amber-500/40 rounded-2xl p-6 max-w-md w-full space-y-5 shadow-2xl">
            <div className="flex items-start justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-3">
                <span className="text-2xl p-2 rounded-xl bg-white/5">{selectedChannel.icon}</span>
                <div>
                  <h3 className="text-lg font-bold text-white">{selectedChannel.name}</h3>
                  <p className="text-xs font-serif text-amber-400">{selectedChannel.arabicName}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedChannel(null)}
                className="text-zinc-400 hover:text-white p-1"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-zinc-200 leading-relaxed">
              {selectedChannel.description}
            </p>

            <div className="p-3.5 rounded-xl bg-black/30 border border-white/10 text-xs">
              <p className="text-emerald-400 font-bold">100% Shariah Verified Relief</p>
              <p className="text-zinc-300 mt-1">
                Transfers for {selectedChannel.name} are routed directly to trusted verified Islamic relief partners with zero administrative deduction.
              </p>
            </div>

            <div className="space-y-2">
              <Link
                href="/contact?topic=sadaqah"
                className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs flex items-center justify-center gap-2 transition-colors"
              >
                <span>Initiate Sadaqah Transfer via salam@nooreilahi.com</span>
              </Link>
              <button
                onClick={() => setSelectedChannel(null)}
                className="w-full py-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 text-xs font-semibold transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
