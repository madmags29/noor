'use client';

// ============================================================
// NOOR Web — Zakat Calculator, Sadaqah, Ramadan & Eid Suite
// Dynamic Multi-Country Currency Engine with Live Bullion Nisab Valuation
// ============================================================

import React, { useState, useEffect, useMemo } from 'react';
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
  Info,
  Globe,
  Coins,
  RotateCcw,
  Search,
  Check,
  ChevronDown
} from 'lucide-react';
import { GlobalNavbar } from '../../components/GlobalNavbar';
import { Footer } from '../../components/Footer';
import {
  NISAB_STANDARDS,
  SADAQAH_CATEGORIES,
  SadaqahCategory
} from '../../data/islamicCoreData';
import {
  ZAKAT_CURRENCIES,
  ZakatCurrency,
  DEFAULT_CURRENCY,
  detectUserCurrency,
  saveUserCurrency,
  formatCurrencyAmount
} from '../../lib/zakatCurrencies';

export default function ZakatPage() {
  // Current Country Currency state
  const [currency, setCurrency] = useState<ZakatCurrency>(DEFAULT_CURRENCY);
  const [isAutoDetected, setIsAutoDetected] = useState<boolean>(true);
  const [showCurrencyModal, setShowCurrencyModal] = useState<boolean>(false);
  const [currencySearch, setCurrencySearch] = useState<string>('');

  // Nisab standard choice
  const [nisabStandard, setNisabStandard] = useState<'gold' | 'silver'>('silver');
  const [goldPricePerGram, setGoldPricePerGram] = useState<number>(DEFAULT_CURRENCY.goldGramPrice);
  const [silverPricePerGram, setSilverPricePerGram] = useState<number>(DEFAULT_CURRENCY.silverGramPrice);
  const [isCustomRates, setIsCustomRates] = useState<boolean>(false);

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

  // Auto-detect user currency on mount
  useEffect(() => {
    const detected = detectUserCurrency();
    setCurrency(detected);
    setGoldPricePerGram(detected.goldGramPrice);
    setSilverPricePerGram(detected.silverGramPrice);
  }, []);

  // Handle user selecting a different country / currency
  const handleSelectCurrency = (selected: ZakatCurrency) => {
    setCurrency(selected);
    setIsAutoDetected(false);
    saveUserCurrency(selected.code);
    setGoldPricePerGram(selected.goldGramPrice);
    setSilverPricePerGram(selected.silverGramPrice);
    setIsCustomRates(false);
    setShowCurrencyModal(false);
  };

  // Reset bullion prices to standard market rates for active currency
  const handleResetRates = () => {
    setGoldPricePerGram(currency.goldGramPrice);
    setSilverPricePerGram(currency.silverGramPrice);
    setIsCustomRates(false);
  };

  // Filtered currencies for modal search
  const filteredCurrencies = useMemo(() => {
    const q = currencySearch.toLowerCase().trim();
    if (!q) return ZAKAT_CURRENCIES;
    return ZAKAT_CURRENCIES.filter(
      c =>
        c.country.toLowerCase().includes(q) ||
        c.code.toLowerCase().includes(q) ||
        c.name.toLowerCase().includes(q) ||
        c.symbol.toLowerCase().includes(q)
    );
  }, [currencySearch]);

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
                Live Country Currency Nisab Engine • 9 Sadaqah Channels • Laylat al-Qadr & Taraweeh Guide
              </p>
            </div>
          </div>

          {/* Quick Country Currency Switcher Button */}
          <button
            onClick={() => setShowCurrencyModal(true)}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-950/80 hover:bg-emerald-900/80 border border-amber-500/40 text-amber-300 transition-all shadow-md group"
          >
            <span className="text-xl">{currency.flag}</span>
            <div className="text-left font-mono">
              <span className="text-[10px] uppercase text-zinc-400 block leading-none">Currency</span>
              <span className="text-xs font-bold text-white group-hover:text-amber-300 transition-colors">
                {currency.code} ({currency.symbol}) — {currency.country}
              </span>
            </div>
            <ChevronDown className="w-4 h-4 text-amber-400/80 ml-1 group-hover:translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 py-8 flex-1 space-y-8">
        
        {/* ============================================================ */}
        {/* COUNTRY CURRENCY & LIVE SPOT BULLION BAR */}
        {/* ============================================================ */}
        <div className="bg-gradient-to-r from-[#032018] via-[#04281f] to-[#032018] border border-amber-500/30 rounded-2xl p-5 shadow-lg">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
            {/* Country Info & Switcher Trigger */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-black/40 border border-amber-500/30 flex items-center justify-center text-3xl shadow-inner shrink-0">
                {currency.flag}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-base font-bold text-white">
                    {currency.country} ({currency.name})
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    {currency.code} • {currency.symbol}
                  </span>
                  {isAutoDetected && (
                    <span className="hidden sm:inline-block px-2 py-0.5 rounded-full text-[10px] font-mono text-emerald-300 bg-emerald-500/10 border border-emerald-500/30">
                      Auto-Detected
                    </span>
                  )}
                </div>
                <p className="text-xs text-emerald-200/70 mt-1">
                  Nisab values and Zakat calculations are dynamically priced in <strong>{currency.name} ({currency.symbol})</strong>.
                </p>
              </div>
            </div>

            {/* Change Currency Button */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowCurrencyModal(true)}
                className="px-4 py-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold font-mono flex items-center gap-2 transition-colors"
              >
                <Globe className="w-4 h-4" />
                <span>Switch Country Currency</span>
              </button>
            </div>
          </div>

          {/* Spot Rates Row */}
          <div className="mt-4 pt-4 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-mono">
            {/* Gold Spot Gram Rate */}
            <div className="bg-black/30 border border-white/10 rounded-xl p-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-zinc-400">Gold / Gram (24K):</span>
                <span className="text-[10px] text-amber-400/80">Market Rate</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-amber-300 font-bold text-sm">{currency.symbol}</span>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={goldPricePerGram || ''}
                  onChange={e => {
                    setGoldPricePerGram(Number(e.target.value));
                    setIsCustomRates(true);
                  }}
                  className="w-full bg-transparent border-b border-amber-500/30 focus:border-amber-400 text-white font-bold text-sm outline-none px-1"
                />
              </div>
            </div>

            {/* Silver Spot Gram Rate */}
            <div className="bg-black/30 border border-white/10 rounded-xl p-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-zinc-400">Silver / Gram (Fine):</span>
                <span className="text-[10px] text-zinc-300/80">Market Rate</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-emerald-300 font-bold text-sm">{currency.symbol}</span>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={silverPricePerGram || ''}
                  onChange={e => {
                    setSilverPricePerGram(Number(e.target.value));
                    setIsCustomRates(true);
                  }}
                  className="w-full bg-transparent border-b border-emerald-500/30 focus:border-emerald-400 text-white font-bold text-sm outline-none px-1"
                />
              </div>
            </div>

            {/* Silver Nisab (612.36g) */}
            <div className={`p-3 rounded-xl border ${
              nisabStandard === 'silver'
                ? 'bg-amber-500/10 border-amber-500/40 text-amber-300'
                : 'bg-black/30 border-white/10 text-zinc-300'
            }`}>
              <div className="flex items-center justify-between mb-1 text-[11px]">
                <span>Silver Nisab ({NISAB_STANDARDS.silverGrams}g):</span>
                {nisabStandard === 'silver' && <span className="text-[10px] font-bold text-amber-400">ACTIVE</span>}
              </div>
              <p className="text-sm font-bold text-white">
                {formatCurrencyAmount(silverNisabValue, currency)}
              </p>
            </div>

            {/* Gold Nisab (87.48g) */}
            <div className={`p-3 rounded-xl border ${
              nisabStandard === 'gold'
                ? 'bg-amber-500/10 border-amber-500/40 text-amber-300'
                : 'bg-black/30 border-white/10 text-zinc-300'
            }`}>
              <div className="flex items-center justify-between mb-1 text-[11px]">
                <span>Gold Nisab ({NISAB_STANDARDS.goldGrams}g):</span>
                {nisabStandard === 'gold' && <span className="text-[10px] font-bold text-amber-400">ACTIVE</span>}
              </div>
              <p className="text-sm font-bold text-white">
                {formatCurrencyAmount(goldNisabValue, currency)}
              </p>
            </div>
          </div>

          {isCustomRates && (
            <div className="mt-3 flex items-center justify-end">
              <button
                onClick={handleResetRates}
                className="flex items-center gap-1.5 text-[11px] text-amber-400 hover:text-amber-300 font-mono"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset to Standard Market Rates</span>
              </button>
            </div>
          )}
        </div>

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
                    Enter your qualifying wealth held for a full lunar year (Hawl) in {currency.code} ({currency.symbol}).
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
                  1. Qualifying Zakat Assets ({currency.symbol} {currency.code})
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block text-zinc-300 mb-1 font-medium">Cash in Hand & Bank Accounts ({currency.symbol})</label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-mono text-zinc-400 font-bold">
                        {currency.symbol}
                      </span>
                      <input
                        type="number"
                        min="0"
                        value={cash || ''}
                        onChange={e => setCash(Number(e.target.value))}
                        placeholder="0.00"
                        className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-black/30 border border-white/10 focus:border-amber-500 text-white font-mono outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-zinc-300 mb-1 font-medium">Gold Value (Jewelry & Bars) ({currency.symbol})</label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-mono text-zinc-400 font-bold">
                        {currency.symbol}
                      </span>
                      <input
                        type="number"
                        min="0"
                        value={goldValue || ''}
                        onChange={e => setGoldValue(Number(e.target.value))}
                        placeholder="0.00"
                        className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-black/30 border border-white/10 focus:border-amber-500 text-white font-mono outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-zinc-300 mb-1 font-medium">Silver Value (Coins & Utensils) ({currency.symbol})</label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-mono text-zinc-400 font-bold">
                        {currency.symbol}
                      </span>
                      <input
                        type="number"
                        min="0"
                        value={silverValue || ''}
                        onChange={e => setSilverValue(Number(e.target.value))}
                        placeholder="0.00"
                        className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-black/30 border border-white/10 focus:border-amber-500 text-white font-mono outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-zinc-300 mb-1 font-medium">Business Merchandise & Stock ({currency.symbol})</label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-mono text-zinc-400 font-bold">
                        {currency.symbol}
                      </span>
                      <input
                        type="number"
                        min="0"
                        value={businessStock || ''}
                        onChange={e => setBusinessStock(Number(e.target.value))}
                        placeholder="0.00"
                        className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-black/30 border border-white/10 focus:border-amber-500 text-white font-mono outline-none"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-zinc-300 mb-1 font-medium">Money Owed to You (Recoverable Debts) ({currency.symbol})</label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-mono text-zinc-400 font-bold">
                        {currency.symbol}
                      </span>
                      <input
                        type="number"
                        min="0"
                        value={moneyOwedToYou || ''}
                        onChange={e => setMoneyOwedToYou(Number(e.target.value))}
                        placeholder="0.00"
                        className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-black/30 border border-white/10 focus:border-amber-500 text-white font-mono outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Deductible Liabilities */}
              <div className="space-y-4 pt-2 border-t border-white/10">
                <h3 className="text-xs font-bold text-red-400 uppercase tracking-widest font-mono">
                  2. Deductible Immediate Liabilities ({currency.symbol} {currency.code})
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block text-zinc-300 mb-1 font-medium">Immediate Debts Due Now ({currency.symbol})</label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-mono text-zinc-400 font-bold">
                        {currency.symbol}
                      </span>
                      <input
                        type="number"
                        min="0"
                        value={debtsDue || ''}
                        onChange={e => setDebtsDue(Number(e.target.value))}
                        placeholder="0.00"
                        className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-black/30 border border-white/10 focus:border-red-500 text-white font-mono outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-zinc-300 mb-1 font-medium">Upcoming Bills / Rent Due ({currency.symbol})</label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-mono text-zinc-400 font-bold">
                        {currency.symbol}
                      </span>
                      <input
                        type="number"
                        min="0"
                        value={billsDue || ''}
                        onChange={e => setBillsDue(Number(e.target.value))}
                        placeholder="0.00"
                        className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-black/30 border border-white/10 focus:border-red-500 text-white font-mono outline-none"
                      />
                    </div>
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
                  Live Assessment • {currency.code}
                </span>
                <h3 className="text-xl font-bold font-serif text-white mt-1">
                  Zakat Payable
                </h3>
              </div>

              <div className="p-4 rounded-xl bg-black/40 border border-amber-500/30 text-center">
                <span className="text-xs text-zinc-400 font-mono uppercase block">Total Obligatory Zakat Due</span>
                <span className="text-3xl sm:text-4xl font-bold font-mono text-amber-300 my-2 block">
                  {formatCurrencyAmount(zakatDue, currency)}
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
                  <span className="font-mono text-white">{formatCurrencyAmount(totalAssets, currency)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Less Liabilities:</span>
                  <span className="font-mono text-red-400">-{formatCurrencyAmount(totalLiabilities, currency)}</span>
                </div>
                <div className="flex justify-between font-bold text-white border-t border-white/5 pt-2">
                  <span>Net Zakatable Wealth:</span>
                  <span className="font-mono text-amber-400">{formatCurrencyAmount(netZakatWealth, currency)}</span>
                </div>
                <div className="flex justify-between text-[11px] text-zinc-400">
                  <span>Nisab Standard ({nisabStandard}):</span>
                  <span className="font-mono">{formatCurrencyAmount(activeNisabThreshold, currency)}</span>
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
                "Charity does not decrease wealth." (Sahih Muslim 2588). Support verified, transparent humanitarian projects worldwide in <strong>{currency.code} ({currency.symbol})</strong>.
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

      {/* ============================================================ */}
      {/* COUNTRY CURRENCY SELECTION MODAL */}
      {/* ============================================================ */}
      {showCurrencyModal && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-[#032018] border border-amber-500/40 rounded-2xl max-w-xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
            {/* Modal Header */}
            <div className="p-5 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Globe className="w-5 h-5 text-amber-400" />
                <div>
                  <h3 className="text-base font-bold text-white">Select Country Currency</h3>
                  <p className="text-xs text-emerald-300/70">Zakat & Nisab will be automatically valued in this currency</p>
                </div>
              </div>
              <button
                onClick={() => setShowCurrencyModal(false)}
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white flex items-center justify-center"
              >
                ✕
              </button>
            </div>

            {/* Search Input */}
            <div className="p-4 border-b border-white/10 bg-black/20">
              <div className="relative">
                <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={currencySearch}
                  onChange={e => setCurrencySearch(e.target.value)}
                  placeholder="Search by country (e.g. India, Saudi, UAE, Pakistan) or currency code..."
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-black/40 border border-white/10 focus:border-amber-500 text-sm text-white placeholder:text-zinc-500 outline-none"
                  autoFocus
                />
              </div>
            </div>

            {/* Currency List */}
            <div className="flex-1 overflow-y-auto p-3 space-y-1.5 divide-y divide-white/5">
              {filteredCurrencies.map(c => {
                const isSelected = c.code === currency.code;
                return (
                  <button
                    key={c.code}
                    onClick={() => handleSelectCurrency(c)}
                    className={`w-full p-3 rounded-xl flex items-center justify-between text-left transition-colors ${
                      isSelected
                        ? 'bg-amber-500/20 border border-amber-500/40 text-white'
                        : 'hover:bg-white/5 text-zinc-200'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{c.flag}</span>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-white">{c.country}</span>
                          <span className="text-xs px-2 py-0.5 rounded bg-black/40 font-mono text-amber-300">
                            {c.code} ({c.symbol})
                          </span>
                        </div>
                        <p className="text-xs text-zinc-400 mt-0.5">{c.name}</p>
                      </div>
                    </div>

                    <div className="text-right font-mono text-xs">
                      <div className="text-emerald-300">
                        Gold: {c.symbol} {c.goldGramPrice.toLocaleString()}/g
                      </div>
                      <div className="text-zinc-400 text-[11px]">
                        Silver: {c.symbol} {c.silverGramPrice.toLocaleString()}/g
                      </div>
                    </div>
                  </button>
                );
              })}

              {filteredCurrencies.length === 0 && (
                <div className="py-8 text-center text-zinc-400 text-xs">
                  No matching countries or currencies found.
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-white/10 bg-black/30 flex justify-between items-center text-xs">
              <span className="text-zinc-400 font-mono">
                {ZAKAT_CURRENCIES.length} Global Currencies Available
              </span>
              <button
                onClick={() => setShowCurrencyModal(false)}
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white font-medium transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

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
              <p className="text-emerald-400 font-bold">100% Shariah Verified Relief in {currency.code}</p>
              <p className="text-zinc-300 mt-1">
                Contributions for {selectedChannel.name} are routed directly to trusted verified Islamic relief partners in {currency.code} ({currency.symbol}) with zero administrative deduction.
              </p>
            </div>

            <div className="space-y-2">
              <Link
                href={`/contact?topic=sadaqah&currency=${currency.code}`}
                className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs flex items-center justify-center gap-2 transition-colors"
              >
                <span>Initiate Sadaqah Transfer ({currency.code} • {currency.symbol})</span>
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
