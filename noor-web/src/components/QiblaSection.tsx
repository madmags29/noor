'use client';

// ============================================================
// NOOR Web — Interactive, Mathematically Precise Qibla Compass
// Accurate Great-Circle Bearing to Holy Kaaba (Makkah Al-Mukarramah)
// ============================================================

import React, { useState, useEffect, useRef } from 'react';
import { Compass, LocateFixed, Info, CheckCircle2, ChevronRight, Volume2 } from 'lucide-react';
import Link from 'next/link';
import { CityLocation, POPULAR_CITIES, saveUserLocation, detectUserLocation } from '../lib/locationService';
import { calculateQiblaBearing } from '../lib/prayerService';
import { useLanguage } from '../context/LanguageContext';

interface QiblaSectionProps {
  currentLocation: CityLocation;
}

export const QiblaSection: React.FC<QiblaSectionProps> = ({ currentLocation }) => {
  const { t } = useLanguage();
  const [deviceHeading, setDeviceHeading] = useState<number>(0);
  const [hasGyro, setHasGyro] = useState<boolean>(false);
  const [isCalibrating, setIsCalibrating] = useState<boolean>(false);

  // Exact Great-Circle Bearing & Distance to Kaaba
  const { bearing, distanceKm } = calculateQiblaBearing(currentLocation.lat, currentLocation.lng);

  // Relative angle to Kaaba from user's current device heading
  // When deviceHeading == bearing, relativeAngle == 0 (straight ahead!)
  const relativeAngle = (bearing - deviceHeading + 360) % 360;
  const isAligned = relativeAngle <= 4 || relativeAngle >= 356;

  // Listen to live device orientation (iOS & Android)
  useEffect(() => {
    let sensorTriggered = false;

    const handleOrientation = (e: any) => {
      // 1. iOS Safari webkitCompassHeading (True North compass heading)
      if (typeof e.webkitCompassHeading === 'number' && !isNaN(e.webkitCompassHeading)) {
        setDeviceHeading(Math.round(e.webkitCompassHeading));
        setHasGyro(true);
        sensorTriggered = true;
      }
      // 2. Android Chrome absolute orientation
      else if (e.absolute === true && typeof e.alpha === 'number' && !isNaN(e.alpha)) {
        setDeviceHeading(Math.round((360 - e.alpha) % 360));
        setHasGyro(true);
        sensorTriggered = true;
      }
      // 3. Fallback alpha
      else if (!sensorTriggered && typeof e.alpha === 'number' && !isNaN(e.alpha)) {
        setDeviceHeading(Math.round((360 - e.alpha) % 360));
        setHasGyro(true);
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('deviceorientationabsolute', handleOrientation, true);
      window.addEventListener('deviceorientation', handleOrientation, true);
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('deviceorientationabsolute', handleOrientation, true);
        window.removeEventListener('deviceorientation', handleOrientation, true);
      }
    };
  }, []);

  // Request Gyroscope Permission (iOS 13+)
  const requestGyroPermission = async () => {
    setIsCalibrating(true);
    try {
      if (
        typeof window !== 'undefined' &&
        typeof (window as any).DeviceOrientationEvent !== 'undefined' &&
        typeof (window as any).DeviceOrientationEvent.requestPermission === 'function'
      ) {
        const response = await (window as any).DeviceOrientationEvent.requestPermission();
        if (response === 'granted') {
          setHasGyro(true);
        }
      }
    } catch (e) {
      console.warn('Orientation permission not granted:', e);
    } finally {
      setIsCalibrating(false);
    }
  };

  // Cardinal direction text for bearing
  const getCardinalName = (deg: number) => {
    const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    const idx = Math.round(deg / 22.5) % 16;
    return directions[idx];
  };

  return (
    <section id="qibla" className="w-full py-16 px-4 lg:px-8 max-w-7xl mx-auto">
      <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-emerald-700/40 relative overflow-hidden">
        {/* Background Celestial Starfield Glow */}
        <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#031d16]/95 via-[#031d16]/85 to-[#031d16]/95" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Heading, Accuracy Info & Coordinates */}
          <div className="lg:col-span-7 space-y-5">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-widest">
              <Compass className="w-3.5 h-3.5" />
              <span>{t('sacredDirection') || 'Sacred Direction & Great-Circle Bearing'}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              {t('interactiveQibla')}
            </h2>

            <p className="text-sm text-emerald-100/80 leading-relaxed max-w-xl">
              {t('qiblaDesc')}
            </p>

            {/* Coordinates & Heading Stats Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              <div className="bg-[#031c15] p-4 rounded-2xl border border-emerald-800/40 shadow-inner">
                <span className="text-[11px] text-emerald-400/80 block font-medium">{t('qiblaHeadingLabel') || 'Qibla Bearing'}</span>
                <span className="text-2xl sm:text-3xl font-black text-amber-300 font-mono">
                  {bearing}° <span className="text-sm font-semibold text-amber-400/90">{getCardinalName(bearing)}</span>
                </span>
                <span className="text-[10px] text-emerald-300/60 block mt-0.5">{t('degreesFromNorth') || 'Degrees from True North'}</span>
              </div>

              <div className="bg-[#031c15] p-4 rounded-2xl border border-emerald-800/40 shadow-inner">
                <span className="text-[11px] text-emerald-400/80 block font-medium">{t('directDistance') || 'Direct Distance'}</span>
                <span className="text-2xl sm:text-3xl font-black text-white font-mono">
                  {distanceKm.toLocaleString()}
                </span>
                <span className="text-[10px] text-emerald-300/60 block mt-0.5">{t('kmToMakkah') || 'Kilometers to Makkah'}</span>
              </div>

              <div className="bg-[#031c15] p-4 rounded-2xl border border-emerald-800/40 col-span-2 sm:col-span-1 shadow-inner">
                <span className="text-[11px] text-emerald-400/80 block font-medium">{t('currentOrigin') || 'Current Location'}</span>
                <span className="text-sm font-bold text-emerald-100 truncate block mt-1">
                  {currentLocation.city}
                </span>
                <span className="text-[10px] text-emerald-400/60 block">{currentLocation.country}</span>
              </div>
            </div>

            {/* Alignment Status Notification */}
            <div className={`p-3 rounded-2xl border transition-all duration-300 ${
              isAligned
                ? 'bg-emerald-500/20 border-emerald-400 text-emerald-200 shadow-lg shadow-emerald-500/20 animate-pulse'
                : 'bg-black/30 border-white/10 text-emerald-300/80'
            }`}>
              <div className="flex items-center gap-2 text-xs font-bold">
                {isAligned ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className="text-emerald-300 font-black">
                      {t('alignedKaaba')}
                    </span>
                  </>
                ) : (
                  <>
                    <Compass className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>
                      {hasGyro ? (
                        <>Turn device {relativeAngle < 180 ? `right by ${Math.round(relativeAngle)}°` : `left by ${Math.round(360 - relativeAngle)}°`} to face the Holy Kaaba</>
                      ) : (
                        <>Face heading <strong className="text-amber-300">{bearing}° ({getCardinalName(bearing)})</strong> from True North for your prayer orientation</>
                      )}
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Links & Calibration Action */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                href="/qibla"
                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-emerald-950 font-black text-xs transition-all shadow-md flex items-center gap-1.5"
              >
                <span>{t('openFullScreenQibla') || 'Open Full-Screen Qibla Locator'}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>

              {!hasGyro && (
                <button
                  type="button"
                  onClick={requestGyroPermission}
                  disabled={isCalibrating}
                  className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Compass className="w-3.5 h-3.5 text-amber-400" />
                  <span>{isCalibrating ? (t('detecting') || 'Calibrating...') : (t('enableCompass') || 'Enable Phone Compass')}</span>
                </button>
              )}
            </div>
          </div>

          {/* Right Column: High-Precision Visual Compass Dial */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            {/* Compass Container */}
            <div
              className={`relative w-72 h-72 sm:w-84 sm:h-84 rounded-full border-4 bg-gradient-to-b from-[#062c21] via-[#031d16] to-[#01140e] flex items-center justify-center shadow-2xl p-4 transition-all duration-300 ${
                isAligned
                  ? 'border-emerald-400 shadow-[0_0_50px_rgba(16,185,129,0.5)] ring-4 ring-emerald-400/20'
                  : 'border-amber-400/50 shadow-emerald-950/80'
              }`}
            >
              {/* Outer Degree Dial (Ticks every 30 degrees) */}
              <div
                className="absolute inset-0 transition-transform duration-300 ease-out"
                style={{ transform: `rotate(${-deviceHeading}deg)` }}
              >
                {/* 0° True North Marker */}
                <div className="absolute top-2 left-1/2 -translate-x-1/2 flex flex-col items-center">
                  <span className="font-black text-xs text-red-500 font-mono tracking-wider">N</span>
                  <div className="w-0.5 h-2.5 bg-red-500 rounded-full" />
                </div>

                {/* 90° East Marker */}
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center">
                  <div className="w-2.5 h-0.5 bg-emerald-400/80 rounded-full" />
                  <span className="font-black text-xs text-emerald-400/80 font-mono ml-1">E</span>
                </div>

                {/* 180° South Marker */}
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex flex-col items-center">
                  <div className="w-0.5 h-2.5 bg-emerald-400/80 rounded-full" />
                  <span className="font-black text-xs text-emerald-400/80 font-mono">S</span>
                </div>

                {/* 270° West Marker */}
                <div className="absolute left-2 top-1/2 -translate-y-1/2 flex items-center">
                  <span className="font-black text-xs text-emerald-400/80 font-mono mr-1">W</span>
                  <div className="w-2.5 h-0.5 bg-emerald-400/80 rounded-full" />
                </div>

                {/* Concentric Ticks Ring */}
                <div className="absolute inset-7 rounded-full border border-dashed border-emerald-500/25 pointer-events-none" />
                <div className="absolute inset-14 rounded-full border border-emerald-600/15 pointer-events-none" />
              </div>

              {/* Rotating Qibla Pointer Needle */}
              {/* When no gyro: points directly at `bearing` relative to North */}
              {/* When gyro active: points at (bearing - deviceHeading) */}
              <div
                className="relative w-full h-full flex items-center justify-center transition-transform duration-300 ease-out pointer-events-none z-10"
                style={{
                  transform: `rotate(${hasGyro ? (bearing - deviceHeading) : bearing}deg)`,
                }}
              >
                {/* Kaaba Arrow Head pointing toward Kaaba */}
                <div className="absolute top-3 flex flex-col items-center">
                  <span className="text-xl filter drop-shadow-[0_0_8px_rgba(245,158,11,0.9)] mb-0.5">
                    🕋
                  </span>
                  {/* Upward pointing gold triangle */}
                  <svg className="w-6 h-7 text-amber-400 filter drop-shadow-[0_0_8px_rgba(245,158,11,0.8)]" viewBox="0 0 24 28">
                    <polygon points="12,0 24,28 12,20 0,28" fill="currentColor" />
                  </svg>
                  <span className="text-[9px] font-black text-amber-300 uppercase tracking-wider bg-black/80 px-2 py-0.5 rounded border border-amber-400/50 mt-0.5 whitespace-nowrap">
                    Kaaba {bearing}°
                  </span>
                </div>

                {/* Counter Tail Needle (Emerald) */}
                <div className="absolute bottom-4 flex flex-col items-center">
                  <svg className="w-4 h-6 text-emerald-700/80" viewBox="0 0 20 24">
                    <polygon points="10,24 0,0 10,6 20,0" fill="currentColor" />
                  </svg>
                </div>
              </div>

              {/* Central Pivot with Golden Dome Glow */}
              <div
                className={`w-12 h-12 rounded-full border-2 flex items-center justify-center shadow-xl z-20 transition-all ${
                  isAligned
                    ? 'bg-emerald-500 border-white text-emerald-950 shadow-[0_0_20px_rgba(16,185,129,0.8)]'
                    : 'bg-gradient-to-tr from-amber-500 to-amber-300 border-emerald-950 text-emerald-950'
                }`}
              >
                <div className="w-3 h-3 rounded-full bg-emerald-950" />
              </div>
            </div>

            {/* Desktop / Manual Rotation Angle Slider (if no gyro detected) */}
            {!hasGyro && (
              <div className="w-full max-w-xs mt-4 p-3 rounded-2xl bg-[#031c15] border border-emerald-800/40 text-center space-y-1.5">
                <div className="flex items-center justify-between text-[11px] font-semibold text-emerald-300/80">
                  <span>Interactive Heading:</span>
                  <span className="font-mono text-amber-300 font-bold">{deviceHeading}°</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="359"
                  value={deviceHeading}
                  onChange={(e) => setDeviceHeading(Number(e.target.value))}
                  className="w-full accent-amber-400 h-1.5 bg-black/40 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between items-center text-[10px] text-emerald-400/70 pt-0.5">
                  <button
                    type="button"
                    onClick={() => setDeviceHeading(0)}
                    className="hover:text-white transition-colors"
                  >
                    Reset North (0°)
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeviceHeading(Math.round(bearing))}
                    className="text-amber-300 font-bold hover:underline"
                  >
                    Snap to Kaaba ({bearing}°)
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
