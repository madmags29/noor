'use client';

// ============================================================
// NOOR Web — Liquid Glass Prayer Times Section
// ============================================================

import React, { useState } from 'react';
import { Clock, Settings, ChevronLeft, ChevronRight, CheckCircle2, Sun, Moon } from 'lucide-react';
import { PrayerTimeItem, CALCULATION_METHODS } from '../lib/prayerService';
import { CityLocation } from '../lib/locationService';
import { useLanguage } from '../context/LanguageContext';

interface PrayerTimesSectionProps {
  prayerTimes: PrayerTimeItem[];
  selectedMethod: string;
  onMethodChange: (method: string) => void;
  asrFactor: number;
  onAsrFactorChange: (factor: number) => void;
  currentLocation: CityLocation;
  currentDate: Date;
  onDateChange: (date: Date) => void;
}

export const PrayerTimesSection: React.FC<PrayerTimesSectionProps> = ({
  prayerTimes,
  selectedMethod,
  onMethodChange,
  asrFactor,
  onAsrFactorChange,
  currentLocation,
  currentDate,
  onDateChange
}) => {
  const { t, language } = useLanguage();
  const [showSettings, setShowSettings] = useState(false);

  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  let activePrayerId = 'isha';
  for (let i = 0; i < prayerTimes.length; i++) {
    if (prayerTimes[i].minutes <= currentMinutes) {
      activePrayerId = prayerTimes[i].id;
    }
  }

  const handlePrevDay = () => {
    const d = new Date(currentDate);
    d.setDate(d.getDate() - 1);
    onDateChange(d);
  };

  const handleNextDay = () => {
    const d = new Date(currentDate);
    d.setDate(d.getDate() + 1);
    onDateChange(d);
  };

  const handleToday = () => {
    onDateChange(new Date());
  };

  return (
    <section id="prayer-times" className="relative w-full py-16 px-4 lg:px-8 max-w-7xl mx-auto">
      {/* Subtle Islamic Architectural Atmosphere Backdrop */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden rounded-[3rem]">
        <img
          src="https://images.unsplash.com/photo-1564769625905-50e93615e769?w=1920&q=85"
          alt="Islamic Architecture Minarets"
          className="w-full h-full object-cover object-center opacity-10 filter saturate-125"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#02120d] via-[#02120d]/80 to-[#02120d]" />
      </div>

      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 liquid-pill px-3.5 py-1 rounded-full text-xs font-bold text-amber-400 uppercase tracking-widest mb-2">
            <Clock className="w-3.5 h-3.5" />
            <span>{t('salaahEngine')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            {t('dailyPrayerTimes')}
          </h2>
          <p className="text-sm text-emerald-200/80 mt-1">
            {t('precisionCalculationFor')}{' '}
            <span className="text-white font-bold">{currentLocation.city}, {currentLocation.country}</span>
          </p>
        </div>

        {/* Controls: Date Stepper & Settings Pill */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Day Stepper */}
          <div className="flex items-center liquid-glass rounded-full p-1 border border-white/10">
            <button
              onClick={handlePrevDay}
              className="p-2 rounded-full hover:bg-white/10 text-emerald-300 hover:text-white transition-colors"
              title={t('previousDay')}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleToday}
              className="px-3.5 py-1 text-xs font-bold text-emerald-100 hover:text-amber-300 transition-colors whitespace-nowrap"
            >
              {currentDate.toDateString() === new Date().toDateString()
                ? t('today')
                : currentDate.toLocaleDateString(language === 'hi' ? 'hi-IN' : 'en-US', { month: 'short', day: 'numeric' })}
            </button>
            <button
              onClick={handleNextDay}
              className="p-2 rounded-full hover:bg-white/10 text-emerald-300 hover:text-white transition-colors"
              title={t('nextDay')}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Settings Pill */}
          <button
            onClick={() => setShowSettings(!showSettings)}
            className={`liquid-pill px-4 py-2 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all whitespace-nowrap ${
              showSettings
                ? 'bg-amber-500 text-emerald-950 border-amber-400 font-black'
                : 'text-emerald-200 hover:text-amber-300'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>{t('methodMadhab')}</span>
          </button>
        </div>
      </div>

      {/* Settings Drawer */}
      {showSettings && (
        <div className="liquid-glass rounded-3xl p-6 mb-8 border border-white/20 grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in">
          <div>
            <label className="block text-xs font-bold text-amber-300 uppercase tracking-wider mb-2">
              {t('calculationMethod')}
            </label>
            <select
              value={selectedMethod}
              onChange={(e) => onMethodChange(e.target.value)}
              className="w-full bg-[#031712] border border-white/15 rounded-2xl px-3.5 py-2.5 text-xs text-emerald-100 focus:outline-none focus:border-amber-400"
            >
              {Object.entries(CALCULATION_METHODS).map(([key, val]) => (
                <option key={key} value={key} className="bg-[#031712] text-white">
                  {val.name} (Fajr: {val.fajrAngle}°, Isha: {val.ishaInterval ? `${val.ishaInterval}m` : `${val.ishaAngle}°`})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-amber-300 uppercase tracking-wider mb-2">
              {t('asrJurisprudence')}
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => onAsrFactorChange(1)}
                className={`py-2.5 px-3 rounded-2xl text-xs font-bold border transition-all ${
                  asrFactor === 1
                    ? 'bg-amber-500 text-emerald-950 border-amber-400'
                    : 'bg-black/30 border-white/10 text-emerald-300 hover:bg-white/5'
                }`}
              >
                {t('standardMadhab')}
              </button>
              <button
                type="button"
                onClick={() => onAsrFactorChange(2)}
                className={`py-2.5 px-3 rounded-2xl text-xs font-bold border transition-all ${
                  asrFactor === 2
                    ? 'bg-amber-500 text-emerald-950 border-amber-400'
                    : 'bg-black/30 border-white/10 text-emerald-300 hover:bg-white/5'
                }`}
              >
                {t('hanafiMadhab')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Prayer Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 sm:gap-4">
        {prayerTimes.map((p) => {
          const isActive = p.id === activePrayerId;
          const isSunrise = p.id === 'sunrise';

          return (
            <div
              key={p.id}
              className={`rounded-3xl p-5 relative overflow-hidden transition-all duration-300 flex flex-col justify-between ${
                isActive
                  ? 'liquid-glass-gold border-amber-400/80 shadow-2xl scale-[1.04] ring-1 ring-amber-400/40'
                  : 'liquid-glass border-white/10 hover:border-white/20'
              }`}
            >
              {isActive && (
                <div className="absolute top-2.5 right-2.5 flex items-center gap-1 bg-amber-500/25 text-amber-300 px-2 py-0.5 rounded-full text-[9px] font-black border border-amber-500/40">
                  <CheckCircle2 className="w-2.5 h-2.5" />
                  <span>{t('currentBadge')}</span>
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-xs font-black uppercase tracking-wider ${isActive ? 'text-amber-300' : 'text-emerald-300/80'}`}>
                    {t(p.id) || p.name}
                  </span>
                  {p.id === 'fajr' || p.id === 'isha' ? (
                    <Moon className="w-3.5 h-3.5 text-amber-300/70" />
                  ) : (
                    <Sun className="w-3.5 h-3.5 text-amber-400/70" />
                  )}
                </div>

                <div className="text-xl font-bold text-emerald-200/90 font-serif mb-3">
                  {p.arabicName}
                </div>
              </div>

              <div className="pt-2.5 border-t border-white/10">
                <div className={`text-xl sm:text-2xl font-black font-mono tracking-tight ${isActive ? 'gold-gradient-text' : 'text-white'}`}>
                  {p.time}
                </div>
                <div className="text-[10px] text-emerald-400/70 font-mono mt-0.5">
                  {p.time24} {isSunrise ? `(${t('sunriseLabel')})` : `(${t('salaahLabel')})`}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Ramadan Holy Fasting Tracker Bar */}
      <div className="mt-6 liquid-glass rounded-3xl p-5 border border-amber-500/30 flex flex-wrap items-center justify-between gap-4 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300 text-lg">
            🌙
          </div>
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-amber-400">
              {t('ramadanFastingTimes')}
            </span>
            <div className="text-sm font-bold text-white flex items-center gap-3 mt-0.5">
              <span>{t('sehriEnds')} <strong className="text-amber-300 font-mono">{prayerTimes.find(p => p.id === 'fajr')?.time || '07:25 AM'}</strong></span>
              <span className="text-white/30">•</span>
              <span>{t('iftarSunset')} <strong className="text-amber-300 font-mono">{prayerTimes.find(p => p.id === 'maghrib')?.time || '08:49 PM'}</strong></span>
            </div>
          </div>
        </div>

        <a
          href="/prayer-times"
          className="liquid-pill px-4 py-2 rounded-2xl text-xs font-bold text-amber-300 hover:border-amber-400/60 transition-all flex items-center gap-1.5 whitespace-nowrap"
        >
          <span>{t('viewRamadanSchedule')}</span>
          <ChevronRight className="w-3.5 h-3.5 text-amber-400" />
        </a>
      </div>
    </section>
  );
};
