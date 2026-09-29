'use client';

// ============================================================
// NOOR Web — Liquid Glass Hero Section with Real Islamic Imagery
// ============================================================

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Clock,
  Volume2,
  VolumeX,
  Compass,
  BookOpen,
  Heart,
  Sparkles,
  ChevronRight,
  Smartphone,
  Star,
  Quote,
  ShieldCheck,
  Check,
  Calendar
} from 'lucide-react';
import { CityLocation } from '../lib/locationService';
import { PrayerTimeItem } from '../lib/prayerService';
import { useLanguage } from '../context/LanguageContext';

interface HeroSectionProps {
  currentLocation: CityLocation;
  prayerTimes: PrayerTimeItem[];
  onOpenAi: () => void;
  onOpenDashboard: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  currentLocation,
  prayerTimes,
  onOpenAi,
  onOpenDashboard
}) => {
  const { t, language } = useLanguage();
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [nextPrayer, setNextPrayer] = useState<{
    id: string;
    name: string;
    arabicName: string;
    time: string;
    diffText: string;
    progressPct: number;
    prevPrayerId: string;
    prevPrayerName: string;
  } | null>(null);
  const [isPlayingAzan, setIsPlayingAzan] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now);

      if (!prayerTimes || prayerTimes.length === 0) return;

      const currentMinutes = now.getHours() * 60 + now.getMinutes();
      const currentSeconds = now.getSeconds();

      const validPrayers = prayerTimes.filter(p => p.id !== 'sunrise');
      let foundIndex = validPrayers.findIndex(p => p.minutes > currentMinutes);

      if (foundIndex === -1) {
        // Next prayer is Fajr tomorrow
        const found = validPrayers[0];
        const prev = validPrayers[validPrayers.length - 1];
        const minutesUntilFajr = (24 * 60 - currentMinutes) + found.minutes;
        const totalSecondsLeft = minutesUntilFajr * 60 - currentSeconds;
        const h = Math.floor(totalSecondsLeft / 3600);
        const m = Math.floor((totalSecondsLeft % 3600) / 60);
        const s = totalSecondsLeft % 60;
        setNextPrayer({
          id: found.id,
          name: found.name,
          arabicName: found.arabicName,
          time: found.time,
          diffText: `${String(h).padStart(2, '0')}h ${String(m).padStart(2, '0')}m ${String(s).padStart(2, '0')}s`,
          progressPct: 65,
          prevPrayerId: prev.id,
          prevPrayerName: prev.name
        });
      } else {
        const found = validPrayers[foundIndex];
        const prev = foundIndex > 0 ? validPrayers[foundIndex - 1] : validPrayers[validPrayers.length - 1];
        const minutesDiff = found.minutes - currentMinutes;
        const totalSecondsLeft = minutesDiff * 60 - currentSeconds;
        const h = Math.floor(totalSecondsLeft / 3600);
        const m = Math.floor((totalSecondsLeft % 3600) / 60);
        const s = totalSecondsLeft % 60;

        const totalInterval = Math.max(1, found.minutes - prev.minutes);
        const elapsed = currentMinutes - prev.minutes;
        const pct = Math.min(100, Math.max(0, Math.round((elapsed / totalInterval) * 100)));

        setNextPrayer({
          id: found.id,
          name: found.name,
          arabicName: found.arabicName,
          time: found.time,
          diffText: `${String(h).padStart(2, '0')}h ${String(m).padStart(2, '0')}m ${String(s).padStart(2, '0')}s`,
          progressPct: pct || 70,
          prevPrayerId: prev.id,
          prevPrayerName: prev.name
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [prayerTimes]);

  const toggleAzan = () => {
    if (isPlayingAzan && audio) {
      audio.pause();
      setIsPlayingAzan(false);
    } else {
      const adhanAudio = new Audio('/audio/adhan-makkah.mp3');
      adhanAudio.play().catch(e => {
        console.log('Local adhan error, trying fallback', e);
        const fallbackAudio = new Audio('https://www.islamcan.com/audio/adhan/azan1.mp3');
        fallbackAudio.play().catch(err => console.log('Audio playback error', err));
        fallbackAudio.onended = () => setIsPlayingAzan(false);
        setAudio(fallbackAudio);
      });
      adhanAudio.onended = () => setIsPlayingAzan(false);
      setAudio(adhanAudio);
      setIsPlayingAzan(true);
    }
  };

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
  const formattedDate = currentTime.toLocaleDateString(activeLocale, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  let hijriDate = '17 Rabi al-Thani 1448 AH';
  try {
    hijriDate = new Intl.DateTimeFormat('en-u-ca-islamic-umalqura', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(currentTime);
  } catch {
    hijriDate = '17 Rabi al-Thani 1448 AH';
  }

  return (
    <section className="relative w-full overflow-hidden pt-6 pb-16 sm:pb-20 px-3 sm:px-6 lg:px-8">
      {/* 1. Cinematic Ambient Background Video with Dark Emerald Fluid Mask */}
      <div className="absolute inset-0 -z-20 overflow-hidden pointer-events-none">
        {/* Responsive picture: lightweight optimized image on mobile for instant LCP, ambient video on desktop */}
        <picture className="w-full h-full">
          <source
            media="(min-width: 768px)"
            srcSet="https://images.unsplash.com/photo-1565552645632-d725f8bfc19a?w=1280&q=75&auto=format"
          />
          <img
            src="https://images.unsplash.com/photo-1565552645632-d725f8bfc19a?w=640&q=70&auto=format"
            alt="Islamic Sanctuary Atmosphere"
            className="w-full h-full object-cover object-center opacity-30 filter saturate-125 brightness-90 scale-105"
            fetchPriority="high"
          />
        </picture>
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="none"
          poster="https://images.unsplash.com/photo-1565552645632-d725f8bfc19a?w=1280&q=75&auto=format"
          className="hidden md:block absolute inset-0 w-full h-full object-cover object-center opacity-30 filter saturate-125 brightness-90 scale-105"
        >
          <source src="https://cdn.pixabay.com/video/2024/01/25/198048-906522343_medium.mp4" type="video/mp4" />
        </video>
        {/* Multi-layered radial gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#02120d]/75 via-[#02120d]/88 to-[#02120d]" />
      </div>

      {/* Floating Animated Liquid Glass Ambient Orbs */}
      <div className="absolute top-10 left-1/4 w-96 h-96 rounded-full bg-emerald-500/15 blur-3xl pointer-events-none -z-10 animate-float-fluid hidden sm:block" />
      <div className="absolute top-24 right-10 w-80 h-80 rounded-full bg-amber-500/12 blur-3xl pointer-events-none -z-10 animate-float-fluid-reverse hidden sm:block" />
      <div className="absolute bottom-10 left-1/3 w-72 h-72 rounded-full bg-teal-500/10 blur-3xl pointer-events-none -z-10 animate-float-fluid hidden sm:block" />

      <div className="max-w-7xl mx-auto">
        {/* Top Badges Row: Hijri Date, Rating Pill, Location */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 sm:mb-8">
          <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
            <span className="liquid-pill px-3.5 py-1.5 rounded-full text-xs font-bold text-amber-300 flex items-center gap-1.5 sm:gap-2 shadow-sm border border-amber-500/30" title="Dates may vary by one day depending on local moon sighting or calendar methodology">
              <Calendar className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>{hijriDate}</span>
              <span className="text-[10px] text-amber-400/80 font-normal hidden md:inline">(Local sighting may vary ±1d)</span>
            </span>
            <span className="text-xs text-emerald-300/60 hidden sm:inline">•</span>
            <span className="text-xs text-emerald-200/80 font-medium hidden sm:inline">{formattedDate}</span>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <div className="liquid-pill px-3 py-1.5 rounded-full text-xs text-amber-300 flex items-center gap-1 font-bold">
              <div className="flex text-amber-400 text-[10px]">
                ★★★★★
              </div>
              <span className="text-white ml-1">4.9</span>
              <span className="text-emerald-300/60 text-[10px] hidden sm:inline">{t('pilgrimsCount')}</span>
            </div>

            <span className="liquid-pill px-3.5 py-1.5 rounded-full text-xs text-emerald-100 font-semibold border border-white/15">
              📍 {currentLocation.city}, {currentLocation.country}
            </span>
          </div>
        </div>

        {/* Daily Prophetic Wisdom Banner */}
        <div className="liquid-glass rounded-2xl px-4 py-2.5 sm:px-5 mb-6 sm:mb-8 border border-white/10 flex items-center justify-between gap-3 sm:gap-4 max-w-3xl">
          <div className="flex items-center gap-2 sm:gap-2.5 text-xs min-w-0">
            <Quote className="w-4 h-4 text-amber-400 shrink-0" />
            <span className="text-emerald-200/90 font-medium truncate">
              {t('hadithQuote')}
            </span>
          </div>
          <Link href="/quran" className="text-[11px] text-amber-400 hover:text-white font-bold shrink-0 whitespace-nowrap">
            {t('readQuranCta')}
          </Link>
        </div>

        {/* Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Hero Statement */}
          <div className="lg:col-span-7 space-y-5 sm:space-y-6">
            <div className="inline-flex items-center gap-2 liquid-pill px-3.5 py-1.5 sm:px-4 rounded-full text-amber-300 text-[11px] sm:text-xs font-black uppercase tracking-wider border border-amber-400/40 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Pray • Read • Learn • Discover</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.14]">
              Your Deen.<br />
              <span className="gold-gradient-text">Your Daily Companion.</span>
            </h1>

            <p className="text-sm sm:text-lg text-emerald-100/85 max-w-xl font-normal leading-relaxed">
              A trusted Islamic companion for prayer, Qur'an, duas, Qibla, Islamic knowledge, Ziyarat and everyday Muslim life.
            </p>

            {/* Primary Action Buttons */}
            <div className="grid grid-cols-1 sm:flex sm:flex-wrap items-center gap-2.5 sm:gap-3 pt-2">
              <Link
                href="/prayer-times"
                className="w-full sm:w-auto justify-center px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-emerald-950 font-black text-xs shadow-xl shadow-amber-500/30 hover:scale-[1.02] transition-all flex items-center gap-2 border border-white/30 whitespace-nowrap text-center"
              >
                <Clock className="w-4 h-4 shrink-0" />
                <span>Explore NOOR</span>
              </Link>

              <Link
                href="/quran"
                className="w-full sm:w-auto justify-center liquid-pill px-6 py-3.5 rounded-2xl text-emerald-100 font-bold text-xs hover:border-amber-400/50 hover:text-amber-300 transition-all flex items-center gap-2 whitespace-nowrap text-center"
              >
                <BookOpen className="w-4 h-4 text-amber-400 shrink-0" />
                <span>The Noble Qur'an</span>
              </Link>

              <Link
                href="/app-preview"
                className="w-full sm:w-auto justify-center liquid-pill px-5 py-3.5 rounded-2xl text-amber-300 font-bold text-xs hover:border-amber-400/60 transition-all flex items-center gap-2 border border-amber-500/30 whitespace-nowrap text-center"
              >
                <Smartphone className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Download App</span>
                <ChevronRight className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              </Link>
            </div>

            {/* Factual Trust Badges */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-2 text-[11px] text-emerald-300/80 font-semibold">
              <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" /> Source-Referenced Content</span>
              <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-amber-400 shrink-0" /> Ad-Free Experience</span>
              <span className="flex items-center gap-1.5"><Sparkles className="w-4 h-4 text-emerald-400 shrink-0" /> Privacy-First (No Tracking)</span>
            </div>
          </div>

          {/* Right Hero: Liquid Glass Next Prayer Pebble Card with Real Image Texture */}
          <div className="lg:col-span-5">
            <div className="liquid-glass-gold rounded-3xl sm:rounded-[2.5rem] p-5 sm:p-8 relative overflow-hidden shadow-2xl border border-amber-400/40">
              {/* Subtle background photo texture of Madinah Green Dome */}
              <div className="absolute inset-0 -z-10 opacity-15 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?w=480&q=65"
                  alt="Madinah Munawwarah"
                  width={480}
                  height={320}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Specular Inner Glare */}
              <div className="absolute -top-10 -right-10 w-48 h-48 bg-amber-400/25 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-center justify-between border-b border-white/15 pb-4 mb-5 sm:mb-6 gap-2">
                <div className="min-w-0">
                  <span className="text-[10px] sm:text-[11px] font-black text-amber-400 uppercase tracking-widest block">
                    {t('upcomingSalaah')}
                  </span>
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-white flex items-center gap-2 mt-0.5 truncate">
                    {nextPrayer ? (t(nextPrayer.id) || nextPrayer.name) : t('maghrib')}
                    <span className="text-lg sm:text-xl text-amber-300 font-normal font-serif">
                      ({nextPrayer?.arabicName || 'المغرب'})
                    </span>
                  </h2>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-xl sm:text-2xl md:text-3xl font-black text-amber-300 font-mono tracking-tight block">
                    {nextPrayer?.time || '07:08 PM'}
                  </span>
                  <div className="text-[9px] sm:text-[10px] text-emerald-200/80 font-bold mt-0.5">
                    {t('standardAsrMethod')}
                  </div>
                </div>
              </div>

              {/* Countdown Liquid Bubble */}
              <div className="liquid-glass rounded-2xl p-4 sm:p-5 mb-4 sm:mb-5 text-center border border-white/15 shadow-inner">
                <span className="text-xs font-semibold text-emerald-200/80 block">{t('timeUntilAdhan')}</span>
                <div className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-wider font-mono my-1.5 gold-gradient-text">
                  {nextPrayer?.diffText || '01h 42m 15s'}
                </div>

                {/* Day Prayer Interval Progress Bar */}
                <div className="w-full bg-black/40 h-2 rounded-full mt-3 overflow-hidden border border-white/10">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-400 via-amber-400 to-amber-500 rounded-full transition-all duration-1000"
                    style={{ width: `${nextPrayer?.progressPct || 65}%` }}
                  />
                </div>
                <div className="flex justify-between text-[10px] text-emerald-300/70 mt-1 font-mono">
                  <span>{nextPrayer ? (t(nextPrayer.prevPrayerId) || nextPrayer.prevPrayerName) : t('asr')}</span>
                  <span>{nextPrayer?.progressPct || 65}% {t('elapsed')}</span>
                  <span>{nextPrayer ? (t(nextPrayer.id) || nextPrayer.name) : t('maghrib')}</span>
                </div>
              </div>

              {/* View Prayer Times & Quick Action */}
              <div className="flex items-center gap-2 mb-3">
                <Link
                  href="/prayer-times"
                  className="flex-1 py-3 px-4 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-bold text-center transition-all flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <Clock className="w-3.5 h-3.5" />
                  <span>View Prayer Times</span>
                </Link>
                <Link
                  href="/qibla"
                  className="py-3 px-4 rounded-xl liquid-pill text-emerald-200 text-xs font-semibold flex items-center gap-1.5 hover:border-amber-400 transition-colors"
                >
                  <Compass className="w-3.5 h-3.5 text-amber-400" />
                  <span>Qibla</span>
                </Link>
              </div>

              {/* Audio Azan Controller */}
              <div className="flex items-center gap-3">
                <button
                  onClick={toggleAzan}
                  aria-label={isPlayingAzan ? (t('stopAdhan') || 'Stop Adhan') : (t('listenAdhanMakkah') || 'Listen to Adhan from Makkah')}
                  className={`flex-1 py-3 px-5 rounded-xl flex items-center justify-center gap-2.5 font-bold text-xs transition-all border cursor-pointer ${
                    isPlayingAzan
                      ? 'bg-red-500/25 border-red-400/60 text-red-200 animate-pulse'
                      : 'bg-emerald-950/60 hover:bg-emerald-900/60 border-emerald-500/30 text-emerald-200 shadow-md'
                  }`}
                >
                  {isPlayingAzan ? (
                    <>
                      <VolumeX className="w-4 h-4" />
                      <span>{t('stopAdhan')}</span>
                    </>
                  ) : (
                    <>
                      <Volume2 className="w-4 h-4 text-amber-400" />
                      <span>{t('listenAdhanMakkah')}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 6 Core User-Focused Action Pillars */}
        <div className="mt-12 sm:mt-16 pt-8 sm:pt-10 border-t border-white/10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-3.5">
          {[
            {
              label: 'Prayer Times',
              desc: 'Accurate Daily Schedule',
              href: '/prayer-times',
              img: 'https://images.unsplash.com/photo-1564769625905-50e93615e769?w=360&q=75',
              badge: 'Prayer'
            },
            {
              label: 'The Noble Qur\'an',
              desc: '114 Surahs & Reciters',
              href: '/quran',
              img: 'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=360&q=75',
              badge: 'Qur\'an'
            },
            {
              label: 'Qibla Direction',
              desc: 'Accurate Kaaba Bearing',
              href: '/qibla',
              img: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=360&q=75',
              badge: 'Qibla'
            },
            {
              label: 'Duas & Adhkar',
              desc: 'Hisn al-Muslim Collection',
              href: '/duas',
              img: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?w=360&q=75',
              badge: 'Duas'
            },
            {
              label: 'Digital Tasbeeh',
              desc: 'Daily Dhikr Counter',
              href: '/duas',
              img: 'https://images.unsplash.com/photo-1585036156171-384164a8c675?w=360&q=75',
              badge: 'Tasbeeh'
            },
            {
              label: 'Islamic Calendar',
              desc: 'Hijri & Sacred Dates',
              href: '/calendar',
              img: 'https://images.unsplash.com/photo-1519817650390-64a93db51149?w=360&q=75',
              badge: 'Calendar'
            },
          ].map((item, i) => (
            <Link
              key={i}
              href={item.href}
              className="group relative rounded-2xl sm:rounded-3xl overflow-hidden aspect-[4/5] border border-white/15 hover:border-amber-400/60 transition-all hover:scale-[1.03] shadow-lg flex flex-col justify-end p-3 sm:p-4"
            >
              <img
                src={item.img}
                alt={item.label}
                width={360}
                height={450}
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=360&q=75';
                }}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#02140f] via-[#02140f]/60 to-black/20" />

              <div className="relative z-10">
                <span className="text-[9px] font-black uppercase tracking-wider text-amber-300 bg-amber-500/20 px-2 py-0.5 rounded-full border border-amber-500/30 inline-block mb-1">
                  {item.badge}
                </span>
                <h3 className="text-xs sm:text-sm font-black text-white group-hover:text-amber-300 transition-colors line-clamp-1">
                  {item.label}
                </h3>
                <p className="text-[9px] sm:text-[10px] text-emerald-200/80 font-medium line-clamp-1">
                  {item.desc}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
