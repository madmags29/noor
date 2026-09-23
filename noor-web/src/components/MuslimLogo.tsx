'use client';

// ============================================================
// NOOR Web — Cool Simple Animated Muslim Logo Component
// Sacred Islamic Geometry: Luminous Crescent (Hilal) & 8-Pointed Star (Rub el Hizb ۞)
// ============================================================

import React from 'react';

interface MuslimLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl' | number;
  showText?: boolean;
  showSubtitle?: boolean;
  textClassName?: string;
  className?: string;
  animate?: boolean;
}

export const MuslimLogo: React.FC<MuslimLogoProps> = ({
  size = 'md',
  showText = false,
  showSubtitle = true,
  textClassName = '',
  className = '',
  animate = true,
}) => {
  // Dimension mapping
  const pixelSize =
    typeof size === 'number'
      ? size
      : size === 'sm'
      ? 32
      : size === 'md'
      ? 42
      : size === 'lg'
      ? 56
      : 72; // 'xl'

  return (
    <div className={`inline-flex items-center gap-2.5 group select-none ${className}`}>
      {/* SVG Emblem */}
      <div
        className="relative flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-105"
        style={{ width: pixelSize, height: pixelSize }}
      >
        {/* Ambient Radial Glow Backdrop */}
        <div
          className="absolute inset-0 rounded-full bg-gradient-to-br from-amber-400/25 via-emerald-500/20 to-transparent blur-md pointer-events-none group-hover:from-amber-400/40 group-hover:via-emerald-400/30 transition-all duration-500"
          style={{ transform: 'scale(1.2)' }}
        />

        <svg
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full relative z-10 drop-shadow-[0_2px_10px_rgba(245,158,11,0.25)]"
        >
          <defs>
            {/* Liquid Gold Shimmer Gradient */}
            <linearGradient id="crescentGold" x1="8" y1="8" x2="56" y2="56" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FDE68A" />
              <stop offset="35%" stopColor="#F59E0B" />
              <stop offset="70%" stopColor="#D97706" />
              <stop offset="100%" stopColor="#B45309" />
            </linearGradient>

            {/* Sacred Emerald Jewel Gradient */}
            <linearGradient id="emeraldBase" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#059669" />
              <stop offset="50%" stopColor="#064e3b" />
              <stop offset="100%" stopColor="#022c22" />
            </linearGradient>

            {/* Radiant Star Core Gradient */}
            <radialGradient id="starShine" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="45%" stopColor="#FDE68A" />
              <stop offset="80%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#D97706" />
            </radialGradient>

            {/* Celestial Orbit Ring Gradient */}
            <linearGradient id="orbitStroke" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FDE68A" stopOpacity="0.7" />
              <stop offset="50%" stopColor="#34D399" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.8" />
            </linearGradient>
          </defs>

          <style>
            {`
              @keyframes noorOrbitSpin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
              @keyframes noorStarPulse {
                0%, 100% { transform: scale(1) rotate(0deg); opacity: 0.95; }
                50% { transform: scale(1.12) rotate(22.5deg); opacity: 1; filter: drop-shadow(0 0 6px rgba(253,230,138,0.8)); }
              }
              @keyframes noorCrescentBreathe {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.025) translateY(-0.8px); }
              }
              @keyframes noorSparkRevolve {
                0% { transform: rotate(0deg) translate(28px) rotate(0deg); }
                100% { transform: rotate(360deg) translate(28px) rotate(-360deg); }
              }
              .anim-orbit {
                transform-origin: 32px 32px;
                animation: ${animate ? 'noorOrbitSpin 20s linear infinite' : 'none'};
              }
              .anim-star {
                transform-origin: 0px 0px;
                animation: ${animate ? 'noorStarPulse 4s ease-in-out infinite' : 'none'};
              }
              .anim-crescent {
                transform-origin: 28px 32px;
                animation: ${animate ? 'noorCrescentBreathe 5s ease-in-out infinite' : 'none'};
              }
              .anim-spark {
                transform-origin: 32px 32px;
                animation: ${animate ? 'noorSparkRevolve 10s linear infinite' : 'none'};
              }
              .group:hover .anim-star {
                animation: noorStarPulse 1.8s ease-in-out infinite;
              }
            `}
          </style>

          {/* 1. Outer Protective Rounded Base with Sacred Emerald Fill */}
          <rect
            x="2"
            y="2"
            width="60"
            height="60"
            rx="18"
            fill="url(#emeraldBase)"
            stroke="rgba(255, 255, 255, 0.18)"
            strokeWidth="1.2"
          />

          {/* 2. Celestial Astrolabe / Orbit Ring with Rotating Dashes */}
          <circle
            cx="32"
            cy="32"
            r="26"
            stroke="url(#orbitStroke)"
            strokeWidth="1.2"
            strokeDasharray="4 6 12 6"
            fill="none"
            className="anim-orbit"
          />

          {/* 3. Orbiting Light Spark (Divine Light / Noor) */}
          <circle
            cx="32"
            cy="32"
            r="1.75"
            fill="#FEF3C7"
            className="anim-spark drop-shadow-[0_0_4px_#F59E0B]"
          />

          {/* 4. Authentic Sacred Crescent Moon (Hilal) — Pure Circular-Arc Intersection */}
          <path
            d="M 34.61 15.8 A 17.5 17.5 0 1 0 34.61 48.2 A 16.5 16.5 0 0 1 34.61 15.8 Z"
            fill="url(#crescentGold)"
            className="anim-crescent"
            style={{ filter: 'drop-shadow(0 2px 6px rgba(245,158,11,0.4))' }}
          />

          {/* Inner Crescent Shimmer Spine Highlight */}
          <path
            d="M 30 18 A 16 16 0 0 0 13 32 A 16 16 0 0 0 30 46 A 15.5 15.5 0 0 1 14.5 32 A 15.5 15.5 0 0 1 30 18 Z"
            fill="#FFFFFF"
            opacity="0.25"
            className="anim-crescent pointer-events-none"
          />

          {/* 5. Islamic Eight-Pointed Star (Rub el Hizb ۞) Nested in Crescent Cradle */}
          <g transform="translate(35, 32)">
            <g className="anim-star" style={{ transformOrigin: '0px 0px' }}>
              {/* Square 1 */}
              <rect
                x="-4.5"
                y="-4.5"
                width="9"
                height="9"
                rx="1"
                fill="url(#starShine)"
              />
              {/* Square 2 (Rotated 45 degrees) */}
              <rect
                x="-4.5"
                y="-4.5"
                width="9"
                height="9"
                rx="1"
                transform="rotate(45)"
                fill="url(#starShine)"
                opacity="0.95"
              />
              {/* Star Radiant Core Center */}
              <circle cx="0" cy="0" r="1.5" fill="#FFFFFF" />
              <circle cx="0" cy="0" r="0.6" fill="#B45309" />
            </g>
          </g>

          {/* Subtle Minaret Accents */}
          <circle cx="27" cy="46" r="1" fill="#FDE68A" opacity="0.6" />
          <circle cx="45" cy="42" r="1" fill="#FDE68A" opacity="0.5" />
        </svg>
      </div>

      {/* Optional Brand Typography */}
      {showText && (
        <div className={`flex flex-col leading-tight ${textClassName}`}>
          <div className="flex items-center gap-1.5">
            <span className="text-xl font-black tracking-wide text-white group-hover:text-amber-300 transition-colors">
              Noor-e-ilahi
            </span>
            <span className="text-[10px] font-arabic font-bold text-amber-300/90 tracking-normal px-1.5 py-0.2 rounded bg-amber-500/10 border border-amber-400/30">
              نُورِ اِلٰہی
            </span>
          </div>
          {showSubtitle && (
            <span className="text-[9.5px] text-emerald-300/70 font-medium tracking-tight">
              Your Deen. Your Daily Companion.
            </span>
          )}
        </div>
      )}
    </div>
  );
};
