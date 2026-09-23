'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useLanguage, SUPPORTED_LANGUAGES, SupportedLanguage } from '../context/LanguageContext';
import { Globe, Check, ChevronDown, Sparkles, MapPin } from 'lucide-react';

interface LanguageSwitcherProps {
  compact?: boolean;
  className?: string;
}

export default function LanguageSwitcher({ compact = false, className = '' }: LanguageSwitcherProps) {
  const { language, setLanguage, currentLanguageInfo, detectedLocation, showAutoNotice, dismissNotice } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* Switcher Button */}
      <button
        onClick={() => {
          setIsOpen(!isOpen);
          dismissNotice();
        }}
        className="flex items-center gap-1 px-2 py-1 rounded-full text-emerald-200/80 hover:text-white hover:bg-white/5 text-xs font-medium transition-all"
        title={`Language: ${currentLanguageInfo.nativeName} (${currentLanguageInfo.name}) • Click to change`}
      >
        <span className="text-xs">{currentLanguageInfo.flag}</span>
        <span className="text-[11px] font-semibold tracking-wide">
          {compact ? currentLanguageInfo.code.toUpperCase() : currentLanguageInfo.nativeName}
        </span>
        <ChevronDown className={`w-3 h-3 text-emerald-400/60 transition-transform ${isOpen ? 'rotate-180 text-amber-400' : ''}`} />
      </button>

      {/* Auto-detected small notice toast below the button on first arrival */}
      {showAutoNotice && !isOpen && detectedLocation && (
        <div className="absolute top-full right-0 mt-2 w-64 p-2.5 rounded-2xl bg-[#021c15]/95 border border-amber-400/50 shadow-2xl backdrop-blur-xl z-50 text-[11px] text-emerald-100 animate-in fade-in slide-in-from-top-1">
          <div className="flex items-start justify-between gap-1.5">
            <div className="flex items-center gap-1.5 text-amber-300 font-bold text-xs">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <span>Native Language Auto-Set</span>
            </div>
            <button onClick={dismissNotice} className="text-emerald-400 hover:text-white text-xs">✕</button>
          </div>
          <p className="mt-1 text-emerald-200/90 text-[10px] leading-relaxed">
            Detected: <strong>{detectedLocation.region || detectedLocation.country}</strong>. Language set to <strong>{currentLanguageInfo.nativeName}</strong>. Tap here to change anytime.
          </p>
        </div>
      )}

      {/* Language Selection Modal / Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 sm:w-72 rounded-3xl bg-[#031d16]/98 border border-emerald-500/30 backdrop-blur-2xl shadow-2xl shadow-black/90 p-2.5 z-50 animate-in fade-in zoom-in-95 duration-150">
          <div className="px-2.5 py-1.5 border-b border-white/10 mb-2 flex items-center justify-between">
            <span className="text-[11px] font-black uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5" /> Select Native Language
            </span>
            {detectedLocation?.isAutoDetected && (
              <span className="text-[9px] text-emerald-400/80 font-mono flex items-center gap-0.5">
                <Sparkles className="w-2.5 h-2.5 text-amber-400" /> Auto-detected
              </span>
            )}
          </div>

          <div className="max-h-72 overflow-y-auto px-0.5 space-y-1 custom-scrollbar">
            {/* National & Sacred Languages */}
            <div className="px-2 py-0.5 text-[9px] font-bold text-amber-400/70 uppercase tracking-widest">
              India & Core Languages
            </div>
            {SUPPORTED_LANGUAGES.slice(0, 4).map((lang) => {
              const isSelected = language === lang.code;
              return (
                <button
                  key={lang.code}
                  onClick={() => {
                    setLanguage(lang.code as SupportedLanguage);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl text-left transition-all ${
                    isSelected
                      ? 'bg-amber-500/20 text-amber-300 font-bold border border-amber-500/40 shadow-sm'
                      : 'text-emerald-100 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-base">{lang.flag}</span>
                    <div className="flex flex-col text-left">
                      <span className="text-xs font-bold leading-tight">{lang.nativeName}</span>
                      <span className="text-[10px] text-emerald-400/80">{lang.name} • {lang.region}</span>
                    </div>
                  </div>
                  {isSelected && <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />}
                </button>
              );
            })}

            {/* Indian State Languages */}
            <div className="px-2 pt-2 pb-0.5 text-[9px] font-bold text-amber-400/70 uppercase tracking-widest border-t border-white/5">
              Indian State Languages
            </div>
            {SUPPORTED_LANGUAGES.slice(4, 9).map((lang) => {
              const isSelected = language === lang.code;
              return (
                <button
                  key={lang.code}
                  onClick={() => {
                    setLanguage(lang.code as SupportedLanguage);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl text-left transition-all ${
                    isSelected
                      ? 'bg-amber-500/20 text-amber-300 font-bold border border-amber-500/40 shadow-sm'
                      : 'text-emerald-100 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-base">{lang.flag}</span>
                    <div className="flex flex-col text-left">
                      <span className="text-xs font-bold leading-tight">{lang.nativeName}</span>
                      <span className="text-[10px] text-emerald-400/80">{lang.name} • {lang.region}</span>
                    </div>
                  </div>
                  {isSelected && <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />}
                </button>
              );
            })}

            {/* Global Islamic Languages */}
            <div className="px-2 pt-2 pb-0.5 text-[9px] font-bold text-amber-400/70 uppercase tracking-widest border-t border-white/5">
              Global Languages
            </div>
            {SUPPORTED_LANGUAGES.slice(9).map((lang) => {
              const isSelected = language === lang.code;
              return (
                <button
                  key={lang.code}
                  onClick={() => {
                    setLanguage(lang.code as SupportedLanguage);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl text-left transition-all ${
                    isSelected
                      ? 'bg-amber-500/20 text-amber-300 font-bold border border-amber-500/40 shadow-sm'
                      : 'text-emerald-100 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-base">{lang.flag}</span>
                    <div className="flex flex-col text-left">
                      <span className="text-xs font-bold leading-tight">{lang.nativeName}</span>
                      <span className="text-[10px] text-emerald-400/80">{lang.name} • {lang.region}</span>
                    </div>
                  </div>
                  {isSelected && <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
