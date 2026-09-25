'use client';

// ============================================================
// NOOR Web — Dedicated Prayer Times & Monthly Timetable Page
// ============================================================

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Clock,
  ArrowLeft,
  Calendar,
  Compass,
  MapPin,
  Volume2,
  Settings,
  ChevronLeft,
  ChevronRight,
  Printer,
  Sparkles,
  ShieldCheck,
  LocateFixed
} from 'lucide-react';
import { POPULAR_CITIES, DEFAULT_LOCATION, CityLocation, detectUserLocation, saveUserLocation } from '../../lib/locationService';
import { calculateDayPrayerTimes, CALCULATION_METHODS } from '../../lib/prayerService';
import { GlobalNavbar } from '../../components/GlobalNavbar';
import { Footer } from '../../components/Footer';
import { useLanguage } from '../../context/LanguageContext';

export default function PrayerTimesPage() {
  const { t, language } = useLanguage();
  const [location, setLocation] = useState<CityLocation>(DEFAULT_LOCATION);
  const [date, setDate] = useState(new Date());
  const [method, setMethod] = useState('MWL');
  const [asrFactor, setAsrFactor] = useState(1);
  const [detecting, setDetecting] = useState(false);

  // Auto-detect user location on mount
  useEffect(() => {
    let isMounted = true;
    detectUserLocation().then((loc) => {
      if (isMounted && loc) {
        setLocation(loc);
      }
    }).catch(() => {});
    return () => { isMounted = false; };
  }, []);

  const handleAutoDetect = async () => {
    setDetecting(true);
    try {
      const loc = await detectUserLocation(true);
      setLocation(loc);
      saveUserLocation(loc);
    } finally {
      setDetecting(false);
    }
  };

  const times = calculateDayPrayerTimes(location.lat, location.lng, date, method, asrFactor);

  const localeMap: Record<string, string> = {
    hi: 'hi-IN',
    ur: 'ur-PK',
    ar: 'ar-SA',
    bn: 'bn-BD',
    ta: 'ta-IN',
    ml: 'ml-IN',
    mr: 'mr-IN',
    gu: 'gu-IN',
    tr: 'tr-TR',
    id: 'id-ID',
    en: 'en-US'
  };
  const activeLocale = localeMap[language] || 'en-US';

  // Generate 7-day forecast timetable
  const weeklySchedule = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date(date);
    d.setDate(d.getDate() + i);
    const dayTimes = calculateDayPrayerTimes(location.lat, location.lng, d, method, asrFactor);
    return {
      date: d,
      dateFormatted: d.toLocaleDateString(activeLocale, { weekday: 'short', month: 'short', day: 'numeric' }),
      fajr: dayTimes.find(t => t.id === 'fajr')?.time,
      sunrise: dayTimes.find(t => t.id === 'sunrise')?.time,
      dhuhr: dayTimes.find(t => t.id === 'dhuhr')?.time,
      asr: dayTimes.find(t => t.id === 'asr')?.time,
      maghrib: dayTimes.find(t => t.id === 'maghrib')?.time,
      isha: dayTimes.find(t => t.id === 'isha')?.time,
    };
  });

  return (
    <div className="min-h-screen bg-[#02120d] text-white flex flex-col selection:bg-amber-500 selection:text-black relative overflow-hidden">
      {/* Ambient Mosque Twilight Video Background */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="https://images.unsplash.com/photo-1564769625905-50e93615e769?w=1920&q=85"
          className="w-full h-full object-cover object-center opacity-20 filter saturate-125"
        >
          <source src="https://cdn.pixabay.com/video/2020/08/14/47170-450995627_medium.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-[#02120d]/85 via-[#02120d]/92 to-[#02120d]" />
      </div>

      {/* Universal Global Navigation Dock */}
      <GlobalNavbar
        currentLocation={location}
        onLocationChange={(loc) => {
          setLocation(loc);
          saveUserLocation(loc);
        }}
      />

      {/* Sub-Header & Controls */}
      <div className="border-b border-white/10 bg-[#031c15]/70 backdrop-blur-md px-4 sm:px-6 py-3 mt-1 sm:mt-2">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-emerald-200 hover:text-white transition-colors"
              title={t('home') || "Home"}
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg sm:text-xl font-black text-white">{t('dailyPrayerTimes')} & {t('calendar')}</h1>
                {location.isAutoDetected && (
                  <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    {t('autoDetected')}
                  </span>
                )}
              </div>
              <p className="text-[10px] text-emerald-300/70">
                {t('precisionCalculationFor')} {location.city}, {location.country}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleAutoDetect}
              disabled={detecting}
              className="liquid-pill px-3 py-1.5 rounded-xl text-xs font-bold text-amber-300 flex items-center gap-1.5 hover:text-amber-200 disabled:opacity-50"
              title="Auto Detect Real-world Location"
            >
              <LocateFixed className={`w-3.5 h-3.5 ${detecting ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">{detecting ? t('detecting') : t('autoDetect')}</span>
            </button>

            <select
              value={location.city}
              onChange={(e) => {
                const found = POPULAR_CITIES.find(c => c.city === e.target.value);
                if (found) {
                  setLocation(found);
                  saveUserLocation(found);
                }
              }}
              className="bg-black/40 border border-white/15 rounded-xl px-3 py-1.5 text-xs text-amber-300 font-bold focus:outline-none"
            >
              {POPULAR_CITIES.map(c => (
                <option key={c.city} value={c.city} className="bg-[#031712] text-white">
                  {c.city}, {c.country}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Hero Schedule */}
      <main className="flex-1 max-w-7xl mx-auto w-full p-6 sm:p-10 space-y-10">
        {/* Today's Times Hero */}
        <div className="liquid-glass rounded-[2.5rem] p-6 sm:p-10 border border-white/15 relative overflow-hidden">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6 mb-8">
            <div>
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block">
                {t('upcomingSalaah')}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
                {date.toLocaleDateString(activeLocale, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => window.print()}
                className="liquid-pill px-4 py-2 rounded-xl text-xs font-bold text-emerald-200 flex items-center gap-1.5 hover:text-white"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>{t('printTimetable') || "Print Timetable"}</span>
              </button>
            </div>
          </div>

          {/* Times Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {times.map((p) => (
              <div
                key={p.id}
                className="liquid-glass-gold rounded-3xl p-5 border border-amber-500/30 text-center flex flex-col justify-between"
              >
                <div>
                  <span className="text-xs font-black text-amber-300 uppercase tracking-wider block mb-1">
                    {t(p.id) || p.name}
                  </span>
                  <span className="arabic-text text-xl font-bold text-emerald-200">
                    {p.arabicName}
                  </span>
                </div>

                <div className="mt-4 pt-3 border-t border-white/10">
                  <span className="text-xl font-black font-mono text-white block">
                    {p.time}
                  </span>
                  <span className="text-[10px] text-emerald-300/60 font-mono mt-0.5 block">
                    {p.time24}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 7-Day Ramadan & Weekly Timetable Table */}
        <div className="space-y-4">
          <h3 className="text-xl font-black text-white flex items-center gap-2">
            <Calendar className="w-5 h-5 text-amber-400" />
            <span>{t('weeklyForecast') || "Weekly & Ramadan Timetable Forecast"}</span>
          </h3>

          <div className="liquid-glass rounded-3xl border border-white/15 overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-black/40 text-emerald-300/80 uppercase text-[10px] tracking-wider border-b border-white/10">
                <tr>
                  <th className="p-4">{t('dayAndDate') || "Day & Date"}</th>
                  <th className="p-4">{t('fajr')}</th>
                  <th className="p-4">{t('sunrise')}</th>
                  <th className="p-4">{t('dhuhr')}</th>
                  <th className="p-4">{t('asr')}</th>
                  <th className="p-4 text-amber-400">{t('maghrib')}</th>
                  <th className="p-4">{t('isha')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10 font-mono">
                {weeklySchedule.map((day, idx) => (
                  <tr key={idx} className="hover:bg-white/5 transition-colors">
                    <td className="p-4 font-sans font-bold text-white">{day.dateFormatted}</td>
                    <td className="p-4 text-emerald-200">{day.fajr}</td>
                    <td className="p-4 text-emerald-400/60">{day.sunrise}</td>
                    <td className="p-4 text-emerald-200">{day.dhuhr}</td>
                    <td className="p-4 text-emerald-200">{day.asr}</td>
                    <td className="p-4 font-black text-amber-300 bg-amber-500/10">{day.maghrib}</td>
                    <td className="p-4 text-emerald-200">{day.isha}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Universal Footer */}
      <Footer />
    </div>
  );
}
