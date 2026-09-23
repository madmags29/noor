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

  // Live Gyroscope & Device Heading States
  const [deviceHeading, setDeviceHeading] = useState<number>(0);
  const [isGyroActive, setIsGyroActive] = useState<boolean>(false);
  const [isSimulatingGyro, setIsSimulatingGyro] = useState<boolean>(false);

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

  // Real-world Device Orientation Event Listener
  useEffect(() => {
    const handleOrientation = (e: DeviceOrientationEvent) => {
      // @ts-ignore iOS webkitCompassHeading
      const compass = e.webkitCompassHeading;
      if (typeof compass === 'number' && !isNaN(compass)) {
        setDeviceHeading(Math.round(compass));
        setIsGyroActive(true);
      } else if (e.alpha !== null && !isNaN(e.alpha)) {
        setDeviceHeading(Math.round((360 - e.alpha) % 360));
        setIsGyroActive(true);
      }
    };

    if (typeof window !== 'undefined' && window.DeviceOrientationEvent) {
      window.addEventListener('deviceorientation', handleOrientation, true);
    }
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('deviceorientation', handleOrientation, true);
      }
    };
  }, []);

  const requestGyroPermission = async () => {
    // @ts-ignore iOS 13+ permission request
    if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
      try {
        // @ts-ignore
        const perm = await DeviceOrientationEvent.requestPermission();
        if (perm === 'granted') {
          setIsGyroActive(true);
        }
      } catch (_) {}
    }
  };

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
  const relativeAngle = ((bearing - deviceHeading + 360) % 360);
  const isAligned = relativeAngle <= 4 || relativeAngle >= 356;

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

        {/* Right Side: Interactive Compass Rose with Real-Time Gyroscope */}
        <div className="lg:col-span-5 flex flex-col items-center gap-4">
          {/* Gyroscope Mode Status Pill */}
          <div className="flex items-center gap-2">
            <div className={`px-3 py-1 rounded-full text-xs font-bold border flex items-center gap-1.5 ${
              isGyroActive
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400 animate-pulse'
                : 'bg-black/40 text-amber-300 border-amber-500/30'
            }`}>
              <Compass className={`w-3.5 h-3.5 ${isGyroActive ? 'animate-spin' : ''}`} />
              <span>{isGyroActive ? `Hardware Gyroscope Active (${deviceHeading}°)` : `Simulator Mode (${deviceHeading}°)`}</span>
            </div>

            <button
              onClick={requestGyroPermission}
              className="px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/15 text-[10px] text-white font-bold transition-colors"
            >
              Calibrate 🧭
            </button>
          </div>

          {/* Alignment Banner */}
          {isAligned ? (
            <div className="w-full text-center py-2 px-3 rounded-2xl bg-emerald-500/20 border-2 border-emerald-400 text-emerald-300 font-black text-xs animate-pulse shadow-lg shadow-emerald-500/30">
              🕋 ALIGNED WITH THE HOLY KAABA 🕋
              <div className="text-[10px] font-normal text-emerald-200">Facing Makkah Al-Mukarramah directly</div>
            </div>
          ) : (
            <div className="text-xs text-amber-300/80 font-medium">
              Turn device {relativeAngle < 180 ? `right by ${Math.round(relativeAngle)}°` : `left by ${Math.round(360 - relativeAngle)}°`} to face Kaaba
            </div>
          )}

          {/* Live Compass Rose */}
          <div className={`relative w-72 h-72 sm:w-88 sm:h-88 rounded-full border-4 bg-gradient-to-b from-[#062c21] to-[#021812] flex items-center justify-center shadow-2xl p-6 transition-all duration-300 ${
            isAligned
              ? 'border-emerald-400 shadow-[0_0_40px_rgba(16,185,129,0.5)] ring-4 ring-emerald-500/20'
              : 'border-amber-400/40 shadow-emerald-950/80'
          }`}>
            {/* Cardinal Marks rotating counter-heading */}
            <div
              className="absolute inset-0 transition-transform duration-200 ease-out"
              style={{ transform: `rotate(${-deviceHeading}deg)` }}
            >
              <span className="absolute top-3 left-1/2 -translate-x-1/2 font-black text-sm text-red-500 font-mono">N (0°)</span>
              <span className="absolute bottom-3 left-1/2 -translate-x-1/2 font-black text-sm text-emerald-400/70 font-mono">S (180°)</span>
              <span className="absolute right-3 top-1/2 -translate-y-1/2 font-black text-sm text-emerald-400/70 font-mono">E (90°)</span>
              <span className="absolute left-3 top-1/2 -translate-y-1/2 font-black text-sm text-emerald-400/70 font-mono">W (270°)</span>
              <div className="absolute inset-6 rounded-full border border-dashed border-white/10" />
            </div>

            {/* Needle pointing to Kaaba relative bearing */}
            <div
              className="relative w-full h-full flex items-center justify-center transition-transform duration-200 ease-out pointer-events-none"
              style={{ transform: `rotate(${bearing - deviceHeading}deg)` }}
            >
              <div className="absolute top-4 flex flex-col items-center">
                <span className="text-2xl filter drop-shadow-[0_0_10px_rgba(245,158,11,0.9)]">🕋</span>
                <div className="w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[28px] border-t-amber-400 mt-1 filter drop-shadow-[0_0_12px_rgba(245,158,11,0.8)]" />
                <span className="text-[10px] font-black text-amber-300 mt-1 uppercase bg-black/80 px-2 py-0.5 rounded border border-amber-400/50">
                  Kaaba ({bearing}°)
                </span>
              </div>

              <div className="absolute bottom-6 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[20px] border-t-emerald-800/80" />
            </div>

            {/* Pivot */}
            <div className={`w-14 h-14 rounded-full border-2 flex flex-col items-center justify-center shadow-lg z-10 transition-colors ${
              isAligned ? 'bg-[#04281e] border-emerald-400' : 'bg-gradient-to-tr from-amber-500 to-amber-300 border-emerald-950'
            }`}>
              <Navigation className={`w-6 h-6 ${isAligned ? 'text-emerald-400 fill-emerald-400' : 'text-emerald-950 fill-emerald-950'}`} />
            </div>
          </div>

          {/* Gyroscope Simulator Slider */}
          <div className="w-full max-w-xs liquid-glass rounded-2xl p-3 border border-white/10 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-amber-400 font-bold">Gyroscope Angle Slider:</span>
              <span className="font-mono font-bold text-white">{deviceHeading}°</span>
            </div>
            <input
              type="range"
              min="0"
              max="360"
              value={deviceHeading}
              onChange={(e) => setDeviceHeading(Number(e.target.value))}
              className="w-full accent-amber-400 h-2 bg-zinc-800 rounded-lg cursor-pointer"
            />
            <div className="flex items-center justify-between gap-1 text-[10px]">
              <button
                onClick={() => setDeviceHeading(prev => (prev - 15 + 360) % 360)}
                className="flex-1 py-1 rounded bg-white/5 hover:bg-white/10 text-white font-bold"
              >
                -15°
              </button>
              <button
                onClick={() => setDeviceHeading(Math.round(bearing))}
                className="flex-2 py-1 px-2 rounded bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 font-black border border-amber-400/40"
              >
                🕋 Snap to Kaaba
              </button>
              <button
                onClick={() => setDeviceHeading(prev => (prev + 15) % 360)}
                className="flex-1 py-1 rounded bg-white/5 hover:bg-white/10 text-white font-bold"
              >
                +15°
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Universal Footer */}
      <Footer />
    </div>
  );
}
