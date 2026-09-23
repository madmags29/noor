'use client';

// ============================================================
// NOOR Web — Interactive Qibla Compass & Kaaba Direction Section
// ============================================================

import React from 'react';
import { Compass, Navigation, MapPin } from 'lucide-react';
import { CityLocation } from '../lib/locationService';
import { calculateQiblaBearing } from '../lib/prayerService';
import { useLanguage } from '../context/LanguageContext';

interface QiblaSectionProps {
  currentLocation: CityLocation;
}

export const QiblaSection: React.FC<QiblaSectionProps> = ({ currentLocation }) => {
  const { t } = useLanguage();
  const { bearing, distanceKm } = calculateQiblaBearing(currentLocation.lat, currentLocation.lng);

  return (
    <section id="qibla" className="w-full py-16 px-4 lg:px-8 max-w-7xl mx-auto">
      <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-emerald-700/40 relative overflow-hidden">
        {/* Celestial Starfield Atmosphere Backdrop */}
        <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1519817650390-64a93db51149?w=1920&q=85"
            alt="Celestial Night Sky and Crescent"
            className="w-full h-full object-cover object-center opacity-15 filter saturate-150"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#031d16]/95 via-[#031d16]/80 to-[#031d16]/95" />
        </div>

        {/* Background Radial Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Heading, Info, Details */}
          <div className="lg:col-span-7 space-y-5">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-widest">
              <Compass className="w-3.5 h-3.5" />
              <span>{t('sacredDirection')}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              {t('interactiveQibla')}
            </h2>

            <p className="text-sm text-emerald-100/80 leading-relaxed max-w-xl">
              {t('qiblaDesc')}
            </p>

            {/* Coordinates & Heading Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              <div className="bg-[#031c15] p-4 rounded-2xl border border-emerald-800/40">
                <span className="text-[11px] text-emerald-400/80 block font-medium">{t('qiblaHeadingLabel')}</span>
                <span className="text-2xl font-black text-amber-300 font-mono">{bearing}°</span>
                <span className="text-[10px] text-emerald-300/60 block mt-0.5">{t('fromNorth')}</span>
              </div>

              <div className="bg-[#031c15] p-4 rounded-2xl border border-emerald-800/40">
                <span className="text-[11px] text-emerald-400/80 block font-medium">{t('distanceToKaaba')}</span>
                <span className="text-2xl font-black text-white font-mono">{distanceKm.toLocaleString()}</span>
                <span className="text-[10px] text-emerald-300/60 block mt-0.5">{t('kilometers')}</span>
              </div>

              <div className="bg-[#031c15] p-4 rounded-2xl border border-emerald-800/40 col-span-2 sm:col-span-1">
                <span className="text-[11px] text-emerald-400/80 block font-medium">{t('currentOrigin')}</span>
                <span className="text-sm font-bold text-emerald-100 truncate block mt-1">{currentLocation.city}</span>
                <span className="text-[10px] text-emerald-400/60 block">{currentLocation.country}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Compass Rose with Dynamic Needle */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-72 h-72 sm:w-80 sm:h-80 rounded-full border-2 border-emerald-700/50 bg-gradient-to-b from-[#062c21] to-[#021812] flex items-center justify-center shadow-2xl shadow-emerald-950/60 p-4">
              {/* Cardinal Markers */}
              <span className="absolute top-3 font-black text-xs text-amber-400 font-mono">N</span>
              <span className="absolute bottom-3 font-black text-xs text-emerald-400/70 font-mono">S</span>
              <span className="absolute right-3 font-black text-xs text-emerald-400/70 font-mono">E</span>
              <span className="absolute left-3 font-black text-xs text-emerald-400/70 font-mono">W</span>

              {/* Dial Ring Marks */}
              <div className="absolute inset-4 rounded-full border border-dashed border-emerald-600/30 pointer-events-none" />

              {/* Rotating Compass Needle Pointer */}
              <div
                className="relative w-full h-full flex items-center justify-center transition-transform duration-700 ease-out"
                style={{ transform: `rotate(${bearing}deg)` }}
              >
                {/* Pointer Tip towards Kaaba */}
                <div className="absolute top-4 flex flex-col items-center">
                  <div className="w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-b-[28px] border-b-amber-400 filter drop-shadow-[0_0_8px_rgba(245,158,11,0.6)]" />
                  <span className="text-[9px] font-black text-amber-300 mt-1 uppercase tracking-wider bg-black/60 px-1.5 py-0.5 rounded border border-amber-400/40">
                    {t('kaabaMarker')}
                  </span>
                </div>

                {/* Needle Tail */}
                <div className="absolute bottom-6 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[20px] border-t-emerald-800/80" />
              </div>

              {/* Compass Center Pivot */}
              <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-amber-500 to-amber-300 border-2 border-emerald-950 flex items-center justify-center shadow-md z-10">
                <Navigation className="w-5 h-5 text-emerald-950 fill-emerald-950" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
