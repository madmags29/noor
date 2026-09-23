'use client';

// ============================================================
// NOOR Web — Hijri Calendar & Holy Events Section
// ============================================================

import React from 'react';
import { Calendar, Moon, Sparkles, Star } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const CalendarSection: React.FC = () => {
  const { t } = useLanguage();

  const holyEvents = [
    {
      title: t('eventRamadanTitle'),
      hijriDate: '1 Ramadan 1448 AH',
      description: t('eventRamadanDesc'),
      badge: t('eventRamadanBadge')
    },
    {
      title: t('eventQadrTitle'),
      hijriDate: '27 Ramadan 1448 AH',
      description: t('eventQadrDesc'),
      badge: t('eventQadrBadge')
    },
    {
      title: t('eventFitrTitle'),
      hijriDate: '1 Shawwal 1448 AH',
      description: t('eventFitrDesc'),
      badge: t('eventFitrBadge')
    },
    {
      title: t('eventArafahTitle'),
      hijriDate: '9 Dhu al-Hijjah 1448 AH',
      description: t('eventArafahDesc'),
      badge: t('eventArafahBadge')
    },
    {
      title: t('eventAdhaTitle'),
      hijriDate: '10 Dhu al-Hijjah 1448 AH',
      description: t('eventAdhaDesc'),
      badge: t('eventAdhaBadge')
    },
    {
      title: t('eventAshuraTitle'),
      hijriDate: '10 Muharram 1448 AH',
      description: t('eventAshuraDesc'),
      badge: t('eventAshuraBadge')
    }
  ];

  return (
    <section id="calendar" className="relative w-full py-16 px-4 lg:px-8 max-w-7xl mx-auto">
      {/* Lunar Crescent & Celestial Atmosphere Backdrop */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden rounded-[3rem]">
        <img
          src="https://images.unsplash.com/photo-1519817650390-64a93db51149?w=1920&q=85"
          alt="Lunar Crescent and Night Sky"
          className="w-full h-full object-cover object-bottom opacity-10 filter saturate-150"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#02120d] via-[#02120d]/85 to-[#02120d]" />
      </div>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-widest mb-1">
            <Calendar className="w-3.5 h-3.5" />
            <span>{t('sacredTimeline')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            {t('hijriCalendarHeading')}
          </h2>
          <p className="text-sm text-emerald-200/70 mt-1">
            {t('hijriCalendarDesc')}
          </p>
        </div>

        {/* Current Hijri Month Banner */}
        <div className="flex items-center gap-2 bg-[#06241b] border border-amber-500/30 px-4 py-2 rounded-2xl whitespace-nowrap">
          <Moon className="w-4 h-4 text-amber-400" />
          <span className="text-xs font-bold text-white">{t('currentHijriMonth')}</span>
        </div>
      </div>

      {/* Holy Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {holyEvents.map((event, i) => (
          <div
            key={i}
            className="glass-panel rounded-2xl p-6 border border-emerald-800/30 hover:border-amber-400/40 hover:bg-emerald-900/30 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-[10px] font-bold text-amber-300 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/20 whitespace-nowrap">
                  {event.badge}
                </span>
                <span className="text-xs font-mono font-semibold text-emerald-400/80">
                  {event.hijriDate}
                </span>
              </div>

              <h4 className="text-lg font-bold text-white mb-2">
                {event.title}
              </h4>

              <p className="text-xs text-emerald-100/80 leading-relaxed font-sans">
                {event.description}
              </p>
            </div>

            <div className="pt-4 border-t border-emerald-800/30 mt-4 flex items-center justify-between text-[11px] text-amber-300/80 font-medium">
              <span className="flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-400" />
                {t('specialBlessings')}
              </span>
              <span>1448 AH</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
