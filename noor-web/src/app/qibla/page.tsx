'use client';

// ============================================================
// NOOR Web — Dedicated Qibla Locator & Kaaba Direction Page
// ============================================================

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Compass,
  ArrowLeft,
  Navigation,
  MapPin,
  Sparkles,
  Info,
  CheckCircle2,
  LocateFixed
} from 'lucide-react';
import { POPULAR_CITIES, DEFAULT_LOCATION, CityLocation, detectUserLocation, saveUserLocation } from '../../lib/locationService';
import { calculateQiblaBearing } from '../../lib/prayerService';
import { GlobalNavbar } from '../../components/GlobalNavbar';
import { Footer } from '../../components/Footer';

export default function QiblaPage() {
  const [location, setLocation] = useState<CityLocation>(DEFAULT_LOCATION);
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

  const { bearing, distanceKm } = calculateQiblaBearing(location.lat, location.lng);

  return (
    <div className="min-h-screen bg-[#02120d] text-white flex flex-col selection:bg-amber-500 selection:text-black relative overflow-hidden">
      {/* Celestial Starfield & Astrolabe Atmosphere Backdrop */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1519817650390-64a93db51149?w=1920&q=85"
          alt="Celestial Starfield and Astrolabe"
          className="w-full h-full object-cover object-center opacity-15 filter saturate-150"
        ></img>
        <div className="absolute inset-0 bg-gradient-to-b from-[#02120d]/85 via-[#02120d]/90 to-[#02120d]" />
      </div>

      {/* Universal Global Navigation Dock */}
      <GlobalNavbar
        currentLocation={location}
        onLocationChange={(loc) => {
          setLocation(loc);
          saveUserLocation(loc);
        }}
      />

      {/* Sub-Header Breadcrumb & City Controls */}
      <div className="border-b border-white/10 bg-[#031c15]/70 backdrop-blur-md px-4 sm:px-6 py-3 mt-1 sm:mt-2">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-emerald-200 hover:text-white transition-colors"
              title="Return to Home"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg sm:text-xl font-black text-white">Qibla Direction & Kaaba Locator</h1>
                {location.isAutoDetected && (
                  <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    Auto-Detected
                  </span>
                )}
              </div>
              <p className="text-[10px] text-emerald-300/70">
                Spherical great-circle bearing to Holy Kaaba, Makkah Al-Mukarramah
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
              <span className="hidden sm:inline">{detecting ? 'Detecting...' : 'Auto Detect'}</span>
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

      {/* Main Container */}
      <main className="flex-1 max-w-7xl mx-auto w-full p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Left Side: Stats & Formula */}
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 liquid-pill px-3.5 py-1 rounded-full text-amber-400 text-xs font-bold uppercase tracking-wider">
            <Compass className="w-3.5 h-3.5" />
            <span>Sacred Direction</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Accurate Direction to Al-Kaaba Al-Musharrafa
          </h2>

          <p className="text-sm text-emerald-100/80 leading-relaxed max-w-xl">
            Calculated from latitude {location.lat.toFixed(4)}° and longitude {location.lng.toFixed(4)}° using the spherical forward azimuth equation towards the Kaaba (21.4225° N, 39.8262° E).
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
            <div className="liquid-glass-gold rounded-2xl p-4 border border-amber-500/30">
              <span className="text-[10px] text-amber-400 font-bold uppercase block">Qibla Heading</span>
              <span className="text-3xl font-black text-white font-mono">{bearing}°</span>
              <span className="text-[10px] text-emerald-300/60 block mt-0.5">Degrees from True North</span>
            </div>

            <div className="liquid-glass rounded-2xl p-4 border border-white/10">
              <span className="text-[10px] text-emerald-300 font-bold uppercase block">Direct Distance</span>
              <span className="text-3xl font-black text-amber-300 font-mono">{distanceKm.toLocaleString()}</span>
              <span className="text-[10px] text-emerald-300/60 block mt-0.5">Kilometers (Great Circle)</span>
            </div>

            <div className="liquid-glass rounded-2xl p-4 border border-white/10 col-span-2 sm:col-span-1">
              <span className="text-[10px] text-emerald-300 font-bold uppercase block">Origin City</span>
              <span className="text-base font-bold text-white block mt-1">{location.city}</span>
              <span className="text-[10px] text-emerald-400/60 block">{location.country}</span>
            </div>
          </div>

          {/* Calibration Tips */}
          <div className="liquid-glass rounded-3xl p-5 border border-white/10 space-y-2 text-xs text-emerald-200/80">
            <h4 className="font-bold text-amber-300 flex items-center gap-1.5 text-sm">
              <Info className="w-4 h-4" /> Calibration Instructions
            </h4>
            <p>1. Ensure your device is placed on a flat, horizontal surface away from strong magnetic interference (chargers, large metal objects).</p>
            <p>2. Align the top of your device so the Kaaba marker points directly straight ahead.</p>
            <p>3. Stand facing that exact bearing for an aligned, serene prayer experience.</p>
          </div>
        </div>

        {/* Right Side: Interactive Compass Rose */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="relative w-80 h-80 sm:w-96 sm:h-96 rounded-full border-4 border-amber-400/40 bg-gradient-to-b from-[#062c21] to-[#021812] flex items-center justify-center shadow-2xl shadow-emerald-950/80 p-6">
            {/* Cardinal Marks */}
            <span className="absolute top-4 font-black text-sm text-amber-400 font-mono">N (0°)</span>
            <span className="absolute bottom-4 font-black text-sm text-emerald-400/70 font-mono">S (180°)</span>
            <span className="absolute right-4 font-black text-sm text-emerald-400/70 font-mono">E (90°)</span>
            <span className="absolute left-4 font-black text-sm text-emerald-400/70 font-mono">W (270°)</span>

            {/* Needle */}
            <div
              className="relative w-full h-full flex items-center justify-center transition-transform duration-700 ease-out"
              style={{ transform: `rotate(${bearing}deg)` }}
            >
              <div className="absolute top-6 flex flex-col items-center">
                <div className="w-0 h-0 border-l-[14px] border-l-transparent border-r-[14px] border-r-transparent border-b-[36px] border-b-amber-400 filter drop-shadow-[0_0_12px_rgba(245,158,11,0.8)]" />
                <span className="text-[10px] font-black text-amber-300 mt-1 uppercase bg-black/80 px-2 py-0.5 rounded border border-amber-400/50">
                  Kaaba ({bearing}°)
                </span>
              </div>

              <div className="absolute bottom-8 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[28px] border-t-emerald-800/80" />
            </div>

            {/* Pivot */}
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-500 to-amber-300 border-2 border-emerald-950 flex items-center justify-center shadow-lg z-10">
              <Navigation className="w-7 h-7 text-emerald-950 fill-emerald-950" />
            </div>
          </div>
        </div>
      </main>

      {/* Universal Footer */}
      <Footer />
    </div>
  );
}
