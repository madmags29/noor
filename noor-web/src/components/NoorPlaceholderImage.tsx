'use client';

// ============================================================
// NOOR Web — Official Noor-e-Ilahi Sanctuary & Mosque Placeholder
// Rendered when external photos are missing or fail to load
// ============================================================

import React from 'react';

export const NOOR_FALLBACK_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400"><defs><linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%23021711"/><stop offset="50%" stop-color="%23042b1f"/><stop offset="100%" stop-color="%23010b08"/></linearGradient><linearGradient id="gold" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%23f59e0b"/><stop offset="100%" stop-color="%23fbbf24"/></linearGradient><radialGradient id="glow" cx="50%" cy="45%" r="40%"><stop offset="0%" stop-color="%23f59e0b" stop-opacity="0.3"/><stop offset="100%" stop-color="%23021711" stop-opacity="0"/></radialGradient><pattern id="pattern" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M20 0 L40 20 L20 40 L0 20 Z" fill="none" stroke="%2310b981" stroke-width="0.5" stroke-opacity="0.15"/><circle cx="20" cy="20" r="2" fill="%23f59e0b" fill-opacity="0.2"/></pattern></defs><rect width="600" height="400" fill="url(%23bg)"/><rect width="600" height="400" fill="url(%23pattern)"/><circle cx="300" cy="180" r="140" fill="url(%23glow)"/><g transform="translate(268, 120)"><circle cx="32" cy="32" r="30" fill="none" stroke="url(%23gold)" stroke-width="2" stroke-opacity="0.4"/><path d="M42 20 A 18 18 0 1 0 42 44 A 14 14 0 1 1 42 20 Z" fill="url(%23gold)"/><polygon points="36,18 38,23 43,23 39,26 41,31 36,28 32,31 34,26 30,23 35,23" fill="%23ffffff"/></g><text x="300" y="245" font-family="system-ui, -apple-system, sans-serif" font-size="20" font-weight="700" fill="%23fef3c7" text-anchor="middle" letter-spacing="2">NOOR-E-ILAHI</text><text x="300" y="270" font-family="Traditional Arabic, Amiri, serif" font-size="22" fill="%23fbbf24" text-anchor="middle">نُورِ اِلٰہی</text><text x="300" y="295" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="600" fill="%236ee7b7" text-anchor="middle" letter-spacing="3">HISTORICAL SANCTUARY ARCHIVE</text></svg>`;

interface NoorPlaceholderImageProps {
  title?: string;
  type?: 'mosque' | 'dargah' | 'holy_site';
  className?: string;
}

export const NoorPlaceholderImage: React.FC<NoorPlaceholderImageProps> = ({
  title,
  type = 'dargah',
  className = 'w-full h-full'
}) => {
  const iconEmoji = type === 'mosque' ? '🕌' : type === 'holy_site' ? '🕋' : '🏛️';
  const typeLabel =
    type === 'mosque'
      ? 'Historic Mosque'
      : type === 'holy_site'
      ? 'Holy Sanctuary'
      : 'Sacred Dargah & Ziyarat';

  return (
    <div
      className={`relative overflow-hidden flex flex-col items-center justify-center bg-gradient-to-br from-[#021711] via-[#042b1f] to-[#010b08] select-none text-center p-4 border border-emerald-900/40 ${className}`}
    >
      {/* Subtle Geometric Background */}
      <div
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 50%, rgba(245, 158, 11, 0.15) 0%, transparent 60%), radial-gradient(circle, rgba(16, 185, 129, 0.2) 1px, transparent 1px)`,
          backgroundSize: '100% 100%, 20px 20px'
        }}
      />

      {/* Decorative Aura */}
      <div className="absolute w-36 h-36 rounded-full bg-amber-400/10 blur-xl pointer-events-none" />

      {/* Emblem */}
      <div className="relative z-10 flex flex-col items-center gap-1.5">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-white/10 via-emerald-950/60 to-black/80 border border-amber-400/40 shadow-[0_4px_16px_rgba(245,158,11,0.2),inset_0_1px_1px_rgba(255,255,255,0.4)] flex items-center justify-center text-2xl">
          <span className="filter drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]">{iconEmoji}</span>
        </div>

        <div className="text-[10px] uppercase font-bold tracking-widest text-emerald-400/90 mt-1">
          {typeLabel}
        </div>

        {title && (
          <div className="text-xs font-semibold text-amber-200 line-clamp-1 max-w-[200px] px-2">
            {title}
          </div>
        )}

        <div className="flex items-center gap-1.5 text-[9px] text-emerald-200/60 font-mono tracking-wider mt-0.5">
          <span>NOOR-E-ILAHI</span>
          <span>•</span>
          <span className="font-arabic">نُورِ اِلٰہی</span>
        </div>
      </div>
    </div>
  );
};
