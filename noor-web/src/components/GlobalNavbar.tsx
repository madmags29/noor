'use client';

// ============================================================
// NOOR Web — Ultra-Clean, Lightweight, Luxury Universal Navigation
// Minimalist layout with tactile 3D icon badges & refined aesthetics
// ============================================================

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  MapPin,
  Search,
  User,
  Sparkles,
  LocateFixed,
  ChevronDown,
  Menu,
  X,
  LogOut,
  CheckCircle2
} from 'lucide-react';

import {
  CityLocation,
  POPULAR_CITIES,
  DEFAULT_LOCATION,
  getSavedUserLocation,
  saveUserLocation,
  detectUserLocation
} from '../lib/locationService';
import { MuslimLogo } from './MuslimLogo';
import { SearchModal } from './SearchModal';
import { AuthModal, GoogleLogo, AuthUser } from './AuthModal';
import { AiAssistantModal } from './AiAssistantModal';
import { useLanguage } from '../context/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';
import { loadCurrentUser, saveCurrentUser } from '../lib/userDataService';

interface GlobalNavbarProps {
  currentLocation?: CityLocation;
  onLocationChange?: (loc: CityLocation) => void;
}

export const GlobalNavbar: React.FC<GlobalNavbarProps> = ({
  currentLocation: propLocation,
  onLocationChange
}) => {
  const pathname = usePathname();
  const [internalLocation, setInternalLocation] = useState<CityLocation>(DEFAULT_LOCATION);
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [showExploreDropdown, setShowExploreDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [detecting, setDetecting] = useState(false);
  const [citySearch, setCitySearch] = useState('');

  // Modals state
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showAiModal, setShowAiModal] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  const locationRef = useRef<HTMLDivElement>(null);
  const exploreRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);
  const exploreTimerRef = useRef<NodeJS.Timeout | null>(null);
  const { t } = useLanguage();

  const handleExploreEnter = () => {
    if (exploreTimerRef.current) clearTimeout(exploreTimerRef.current);
    setShowExploreDropdown(true);
  };

  const handleExploreLeave = () => {
    if (exploreTimerRef.current) clearTimeout(exploreTimerRef.current);
    exploreTimerRef.current = setTimeout(() => {
      setShowExploreDropdown(false);
    }, 150);
  };

  // Load saved location on mount
  useEffect(() => {
    const saved = getSavedUserLocation();
    if (saved) {
      setInternalLocation(saved);
    } else {
      detectUserLocation().then((loc) => {
        if (loc) setInternalLocation(loc);
      }).catch(() => {});
    }

    try {
      const savedUser = localStorage.getItem('noor_user');
      if (savedUser) setCurrentUser(JSON.parse(savedUser));
    } catch {}
  }, []);

  // Keyboard shortcut Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setShowSearchModal((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (locationRef.current && !locationRef.current.contains(event.target as Node)) {
        setShowLocationDropdown(false);
      }
      if (exploreRef.current && !exploreRef.current.contains(event.target as Node)) {
        setShowExploreDropdown(false);
      }
      if (userRef.current && !userRef.current.contains(event.target as Node)) {
        setShowUserDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile drawer and dropdown on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setShowExploreDropdown(false);
    setShowUserDropdown(false);
  }, [pathname]);

  const handleSignOut = () => {
    saveCurrentUser(null);
    setCurrentUser(null);
    setShowUserDropdown(false);
  };

  const activeLocation = propLocation || internalLocation;

  const handleLocationSelect = (loc: CityLocation) => {
    setInternalLocation(loc);
    saveUserLocation(loc);
    if (onLocationChange) onLocationChange(loc);
    setShowLocationDropdown(false);
  };

  const handleAutoDetect = async () => {
    setDetecting(true);
    try {
      const loc = await detectUserLocation(true);
      handleLocationSelect(loc);
    } finally {
      setDetecting(false);
    }
  };

  // 1. Primary Pillars (Clean, Focused, with 3D Icons)
  const primaryNavLinks = [
    { label: t('prayers'), href: '/prayer-times', icon3d: '🕌' },
    { label: t('quran'), href: '/quran', icon3d: '📖' },
    { label: t('duas'), href: '/duas', icon3d: '🤲' },
    { label: t('ziyarat'), href: '/ziyarat', icon3d: '🏛️' },
  ];

  // 2. Secondary Spiritual Tools (Inside sleek "Explore ▾" flyout with 3D Icons)
  const secondaryNavLinks = [
    {
      label: t('islamicMap') || 'Global Islamic Map',
      href: '/map',
      desc: 'Interactive world map of dargahs, ziyarat points & mosques',
      icon3d: '🗺️'
    },
    {
      label: t('guides') || 'Prayer & Purification Guides',
      href: '/guides',
      desc: t('guidesDesc') || 'Wudu, Ghusl, Salah step-by-step & Qada journal',
      icon3d: '✨'
    },
    {
      label: t('hajjUmrah') || 'Hajj & Umrah Pilgrimage',
      href: '/hajj-umrah',
      desc: t('hajjUmrahDesc') || 'Miqat, Tawaf, Sa\'i, Arafat & checklist',
      icon3d: '🕋'
    },
    {
      label: t('zakatHub') || 'Zakat & Sadaqah Hub',
      href: '/zakat',
      desc: t('zakatHubDesc') || 'Nisab calculator, 9 charity channels & Taraweeh',
      icon3d: '🪙'
    },
    {
      label: t('search'),
      href: '/search',
      desc: t('searchPlaceholderFull') || 'Unified Quran, Hadith, Duas, Mosques & Scholars',
      icon3d: '🔍'
    },
    {
      label: t('kids') || 'NOOR Kids & Family',
      href: '/kids',
      desc: t('kidsDesc') || 'Arabic alphabet, Prophet stories & quizzes',
      icon3d: '🧒'
    },
    {
      label: t('janazah') || 'Janazah & Bereavement',
      href: '/janazah',
      desc: t('janazahDesc') || '4 Takbeers guide, Ghusl, Kafan & burial rules',
      icon3d: '🕊️'
    },
    {
      label: t('etiquette') || 'Islamic Etiquette (Adab)',
      href: '/etiquette',
      desc: t('etiquetteDesc') || 'Prophetic manners across 13 life domains',
      icon3d: '📜'
    },
    {
      label: t('nikah') || 'Nikah & Family Education',
      href: '/nikah',
      desc: t('nikahDesc') || '5 pillars, 20 pre-marital questions & rights',
      icon3d: '💍'
    },
    {
      label: t('travelMode') || 'NOOR Travel Mode',
      href: '/travel',
      desc: t('travelModeDesc') || 'Safar distance, Qasr prayer & strict Halal policy',
      icon3d: '✈️'
    },
    {
      label: t('media') || 'NOOR Watch Media',
      href: '/watch',
      desc: t('pillarMediaDesc') || '24/7 Makkah/Madinah feeds & Islamic learning',
      icon3d: '📺'
    },
    {
      label: t('qibla'),
      href: '/qibla',
      desc: t('qiblaSub') || 'Kaaba direction & live compass',
      icon3d: '🧭'
    },
    {
      label: t('calendar'),
      href: '/calendar',
      desc: t('pillarCalendarDesc') || 'Islamic lunar dates & sacred events',
      icon3d: '🌙'
    },
    {
      label: t('dashboard'),
      href: '/dashboard',
      desc: t('spiritualDeenTracker') || 'Daily habits, prayer logs & tracker',
      icon3d: '📊'
    },
    {
      label: t('app'),
      href: '/app-preview',
      desc: t('carryLightDesc') || 'Download iOS & Android companion',
      icon3d: '📱'
    },
    {
      label: t('contact') || 'Contact & Support',
      href: '/contact',
      desc: t('contactDesc') || 'salam@nooreilahi.com & business queries',
      icon3d: '✉️'
    },
  ];

  const isSecondaryActive = secondaryNavLinks.some(
    (link) => pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href))
  );

  return (
    <>
      {/* Sleek, Featherlight Edge-to-Edge Sticky Navigation Bar */}
      <header className="sticky top-0 z-50 w-full h-[52px] bg-[#02120d]/85 backdrop-blur-xl border-b border-emerald-900/25 transition-all overflow-visible">
        <div className="max-w-7xl mx-auto h-full px-3 sm:px-6 lg:px-8 flex items-center justify-between gap-3 sm:gap-4">
          
          {/* 1. Left: Single-Line Luxury Logo */}
          <div className="flex items-center shrink-0">
            <Link href="/" className="flex items-center group transition-transform hover:opacity-90">
              <MuslimLogo size={30} showText={true} showSubtitle={false} />
            </Link>
          </div>

          {/* 2. Center: Clean Navigation with 3D Icons (4 Staples + Explore) */}
          <nav className="hidden lg:flex items-center gap-4 xl:gap-6">
            {primaryNavLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`group flex items-center gap-1.5 text-xs xl:text-[13px] tracking-wide transition-all py-1 whitespace-nowrap relative ${
                    isActive
                      ? 'text-amber-400 font-semibold'
                      : 'text-emerald-100/80 hover:text-white'
                  }`}
                >
                  {/* 3D Icon Badge */}
                  <span className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-sm xl:text-base transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-br from-amber-400/30 to-amber-600/20 border border-amber-400/50 shadow-[0_2px_8px_rgba(245,158,11,0.25),inset_0_1px_1px_rgba(255,255,255,0.4)] scale-105'
                      : 'bg-gradient-to-br from-white/10 via-emerald-950/40 to-black/60 border border-white/15 shadow-[0_2px_4px_rgba(0,0,0,0.3),inset_0_1px_1px_rgba(255,255,255,0.2)] group-hover:scale-110 group-hover:border-amber-400/40 group-hover:shadow-[0_2px_8px_rgba(245,158,11,0.2)]'
                  }`}>
                    <span className="filter drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)] select-none">
                      {link.icon3d}
                    </span>
                  </span>

                  <span className="whitespace-nowrap">{link.label}</span>

                  {isActive && (
                    <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-amber-400 to-amber-300 rounded-full shadow-sm shadow-amber-400/50" />
                  )}
                </Link>
              );
            })}

            {/* Clean "Explore ▾" Flyout Dropdown with 3D Sparkle */}
            <div
              className="relative py-1 group"
              ref={exploreRef}
              onMouseEnter={handleExploreEnter}
              onMouseLeave={handleExploreLeave}
            >
              <button
                onClick={() => setShowExploreDropdown(!showExploreDropdown)}
                className={`flex items-center gap-1.5 text-xs xl:text-[13px] tracking-wide transition-all whitespace-nowrap ${
                  isSecondaryActive || showExploreDropdown
                    ? 'text-amber-400 font-semibold'
                    : 'text-emerald-100/80 hover:text-white'
                }`}
              >
                {/* 3D Explore Sparkle Badge */}
                <span className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-sm xl:text-base transition-all duration-200 ${
                  isSecondaryActive || showExploreDropdown
                    ? 'bg-gradient-to-br from-amber-400/30 to-amber-600/20 border border-amber-400/50 shadow-[0_2px_8px_rgba(245,158,11,0.25),inset_0_1px_1px_rgba(255,255,255,0.4)] scale-105'
                    : 'bg-gradient-to-br from-white/10 via-emerald-950/40 to-black/60 border border-white/15 shadow-[0_2px_4px_rgba(0,0,0,0.3),inset_0_1px_1px_rgba(255,255,255,0.2)] group-hover:scale-110 group-hover:border-amber-400/40'
                }`}>
                  <span className="filter drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)] select-none">
                    ✨
                  </span>
                </span>

                <span className="whitespace-nowrap">{t('explore') || 'Explore'}</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    showExploreDropdown ? 'rotate-180 text-amber-400' : 'text-emerald-400/70'
                  }`}
                />
                {isSecondaryActive && (
                  <span className="absolute -bottom-1 left-0 right-3 h-[2px] bg-gradient-to-r from-amber-400 to-amber-300 rounded-full shadow-sm shadow-amber-400/50" />
                )}
              </button>

              {/* Flyout Card — Split in 2 Parts like Homepage */}
              {showExploreDropdown && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-1.5 w-80 sm:w-[520px] md:w-[560px] z-[100] animate-in fade-in zoom-in-95 duration-150 before:absolute before:-top-3 before:left-0 before:right-0 before:h-3">
                  <div className="rounded-2xl bg-[#021711]/98 border border-white/15 backdrop-blur-2xl shadow-2xl p-3">
                    <div className="flex items-center justify-between px-2.5 py-1 text-[10px] font-semibold text-amber-400/80 uppercase tracking-wider border-b border-white/5 mb-2">
                      <span>{t('spiritualTools') || 'Spiritual Guides & Tools'}</span>
                      <span className="font-mono text-[9px] text-emerald-400">{t('verifiedPillars') || 'Verified Pillars'}</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 max-h-[65vh] overflow-y-auto custom-scrollbar p-0.5">
                      {secondaryNavLinks.map((item) => {
                        const isActive = pathname === item.href || (linkIsActive(pathname, item.href));

                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setShowExploreDropdown(false)}
                            className={`group flex items-start gap-2.5 p-2 rounded-xl transition-all ${
                              isActive
                                ? 'bg-amber-400/15 text-amber-300'
                                : 'hover:bg-white/5 text-emerald-100/90 hover:text-white'
                            }`}
                          >
                            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-white/10 via-emerald-950/60 to-black/80 border border-white/15 shadow-[0_2px_6px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.3)] flex items-center justify-center shrink-0 text-base group-hover:scale-110 group-hover:border-amber-400/40 group-hover:shadow-[0_2px_10px_rgba(245,158,11,0.25)] transition-all">
                              <span className="filter drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)] select-none">
                                {item.icon3d}
                              </span>
                            </div>
                            <div className="flex flex-col min-w-0">
                              <div className="flex items-center gap-1.5">
                                <span className="text-xs font-semibold leading-tight group-hover:text-amber-300 transition-colors">
                                  {item.label}
                                </span>
                                {item.href === '/map' && (
                                  <span className="px-1.5 py-0.2 rounded text-[8px] font-bold bg-amber-400/25 text-amber-300 border border-amber-400/40 uppercase tracking-wider">
                                    MAP
                                  </span>
                                )}
                              </div>
                              <span className="text-[10px] text-emerald-300/60 leading-tight mt-0.5 line-clamp-1">
                                {item.desc}
                              </span>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* 3. Right: Sleek, Minimalist Utilities */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            {/* Quick Search Trigger */}
            <button
              onClick={() => setShowSearchModal(true)}
              className="p-1.5 rounded-lg text-emerald-300/70 hover:text-amber-300 hover:bg-white/5 transition-colors flex items-center gap-1.5"
              title="Search (⌘K)"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
              <span className="hidden xl:inline text-xs text-emerald-200/60 font-mono">⌘K</span>
            </button>

            {/* Native Language Switcher */}
            <LanguageSwitcher compact={true} />

            {/* Clean Location Selector */}
            <div className="relative" ref={locationRef}>
              <button
                onClick={() => setShowLocationDropdown(!showLocationDropdown)}
                className="flex items-center gap-1 py-1 px-2 rounded-lg text-xs text-emerald-200/80 hover:text-white hover:bg-white/5 transition-colors whitespace-nowrap"
                title="Change Location"
                aria-label={`Change Location: current is ${activeLocation.city}`}
              >
                <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span className="max-w-[70px] sm:max-w-[85px] truncate text-[11px] font-medium hidden sm:inline">
                  {activeLocation.city}
                </span>
                <ChevronDown className="w-3 h-3 text-emerald-400/60" />
              </button>

              {showLocationDropdown && (
                <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-[#031d16]/98 border border-white/15 backdrop-blur-2xl shadow-2xl p-2.5 z-[100] text-xs animate-in fade-in zoom-in-95">
                  <div className="flex items-center justify-between pb-2 border-b border-white/10 mb-1.5">
                    <span className="font-bold text-white flex items-center gap-1.5 text-[11px]">
                      <MapPin className="w-3 h-3 text-amber-400" />
                      <span>{t('selectCountryCity')}</span>
                    </span>
                    <button
                      onClick={handleAutoDetect}
                      disabled={detecting}
                      className="flex items-center gap-1 text-[10px] text-amber-400 hover:text-amber-300 font-bold disabled:opacity-50"
                    >
                      <LocateFixed className={`w-3 h-3 ${detecting ? 'animate-spin' : ''}`} />
                      <span>{detecting ? t('detecting') : t('autoDetect')}</span>
                    </button>
                  </div>

                  {/* Instant Search Bar */}
                  <div className="mb-2">
                    <input
                      type="text"
                      value={citySearch}
                      onChange={(e) => setCitySearch(e.target.value)}
                      placeholder="Search city or country (e.g. Makkah, Delhi)..."
                      className="w-full px-2.5 py-1.5 rounded-lg bg-black/40 border border-white/10 text-white placeholder:text-zinc-500 text-[11px] outline-none focus:border-amber-400/60"
                    />
                  </div>

                  <div className="max-h-56 overflow-y-auto space-y-0.5 custom-scrollbar">
                    {POPULAR_CITIES.filter(
                      loc =>
                        !citySearch ||
                        loc.city.toLowerCase().includes(citySearch.toLowerCase()) ||
                        loc.country.toLowerCase().includes(citySearch.toLowerCase()) ||
                        loc.region.toLowerCase().includes(citySearch.toLowerCase())
                    ).map((loc) => {
                      const isSelected = loc.city === activeLocation.city;
                      return (
                        <button
                          key={`${loc.city}-${loc.country}`}
                          onClick={() => {
                            handleLocationSelect(loc);
                            setCitySearch('');
                          }}
                          className={`w-full text-left px-2.5 py-1.5 rounded-lg flex items-center justify-between transition-colors ${
                            isSelected
                              ? 'bg-amber-400/20 text-amber-300 font-bold border border-amber-400/30'
                              : 'text-emerald-100 hover:bg-white/5'
                          }`}
                        >
                          <span className="text-[11px]">
                            {loc.city}, <span className="opacity-60 text-[10px]">{loc.country}</span>
                          </span>
                          <span className="text-[9px] text-emerald-400/60 font-mono">{loc.region}</span>
                        </button>
                      );
                    })}
                    {POPULAR_CITIES.filter(
                      loc =>
                        !citySearch ||
                        loc.city.toLowerCase().includes(citySearch.toLowerCase()) ||
                        loc.country.toLowerCase().includes(citySearch.toLowerCase())
                    ).length === 0 && (
                      <div className="py-4 text-center text-zinc-400 text-[11px]">
                        No matching cities found.
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* User Profile or Sign In */}
            {currentUser ? (
              <div className="relative" ref={userRef}>
                <button
                  onClick={() => setShowUserDropdown(!showUserDropdown)}
                  aria-label="User Account Menu"
                  className="flex items-center gap-1.5 py-1 px-2 sm:px-2.5 rounded-full text-xs text-white bg-white/5 hover:bg-white/10 border border-white/15 transition-colors cursor-pointer"
                >
                  {currentUser.picture ? (
                    <img
                      src={currentUser.picture}
                      alt={currentUser.name}
                      width={20}
                      height={20}
                      className="w-5 h-5 rounded-full object-cover border border-amber-400/40"
                    />
                  ) : (
                    <div className="w-5 h-5 rounded-full bg-amber-500 text-emerald-950 font-black flex items-center justify-center text-[10px]">
                      {currentUser.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <span className="max-w-[70px] truncate text-[11px] font-semibold hidden sm:inline">
                    {currentUser.name.split(' ')[0]}
                  </span>
                  <ChevronDown className="w-3 h-3 text-emerald-400/70 hidden sm:inline" />
                </button>

                {/* Profile Dropdown */}
                {showUserDropdown && (
                  <div className="absolute right-0 top-full mt-2 w-64 bg-[#031d16] border border-emerald-700/50 rounded-2xl shadow-2xl p-3 z-50 animate-in fade-in">
                    <div className="flex items-center gap-2.5 pb-2.5 border-b border-white/10 mb-2">
                      {currentUser.picture ? (
                        <img
                          src={currentUser.picture}
                          alt={currentUser.name}
                          width={36}
                          height={36}
                          className="w-9 h-9 rounded-full object-cover border border-amber-400"
                        />
                      ) : (
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-400 to-emerald-700 text-emerald-950 font-bold flex items-center justify-center text-sm shadow">
                          {currentUser.name.charAt(0).toUpperCase()}
                        </div>
                      )}
                      <div className="min-w-0 flex-1 text-left">
                        <div className="text-xs font-bold text-white truncate">{currentUser.name}</div>
                        <div className="text-[10px] text-emerald-300/70 truncate">{currentUser.email}</div>
                      </div>
                    </div>

                    {currentUser.provider === 'google' && (
                      <div className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg bg-emerald-950/60 border border-emerald-700/30 text-[10px] text-emerald-300 mb-2">
                        <GoogleLogo className="w-3.5 h-3.5 shrink-0" />
                        <span className="font-semibold">Google Account Verified</span>
                      </div>
                    )}

                    <Link
                      href="/dashboard"
                      onClick={() => setShowUserDropdown(false)}
                      className="w-full py-1.5 px-2.5 rounded-lg hover:bg-white/10 text-emerald-100 hover:text-white text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer text-left mb-1"
                    >
                      <User className="w-3.5 h-3.5 text-amber-400" />
                      <span>{t('profileSettings') || 'Dashboard & Profile'}</span>
                    </Link>

                    <button
                      onClick={handleSignOut}
                      className="w-full py-1.5 px-2.5 rounded-lg hover:bg-red-500/15 text-red-300 hover:text-red-200 text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer text-left"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => setShowAuthModal(true)}
                aria-label="Sign in"
                className="px-2.5 sm:px-3 py-1 rounded-full text-[11px] sm:text-xs font-bold text-amber-300 bg-amber-500/10 border border-amber-400/40 hover:bg-amber-400/20 hover:border-amber-400 transition-colors flex items-center gap-1.5 whitespace-nowrap cursor-pointer shadow-sm"
              >
                <User className="w-3.5 h-3.5 text-amber-400" />
                <span>{t('login') || 'Sign In'}</span>
              </button>
            )}

            {/* Mobile / Tablet Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 rounded-lg text-emerald-200 hover:text-white hover:bg-white/5 transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-amber-400" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Clean, Organized Mobile Drawer with 3D Icons & Dedicated Login Card */}
        {mobileMenuOpen && (
          <div className="lg:hidden absolute top-[52px] left-0 right-0 bg-[#021711]/98 border-b border-white/10 p-4 shadow-2xl backdrop-blur-2xl z-[100] max-h-[calc(100dvh-54px)] overflow-y-auto custom-scrollbar animate-in fade-in slide-in-from-top-2">
            
            {/* Header Info */}
            <div className="flex items-center justify-between pb-2 mb-3 border-b border-white/10 text-xs">
              <span className="text-amber-300 font-bold flex items-center gap-1.5">
                <MuslimLogo size={22} showText={false} />
                <span>NOOR Navigation</span>
              </span>
              <span className="text-[11px] text-emerald-300/80">
                📍 {activeLocation.city}
              </span>
            </div>

            {/* Dedicated Mobile User Account Hero Card */}
            {currentUser ? (
              <div className="mb-3.5 p-3 rounded-2xl bg-gradient-to-br from-emerald-900/40 via-emerald-950/70 to-black/90 border border-emerald-500/35 shadow-lg">
                <div className="flex items-center justify-between gap-2.5">
                  <div className="flex items-center gap-2.5 min-w-0">
                    {currentUser.picture ? (
                      <img
                        src={currentUser.picture}
                        alt={currentUser.name}
                        width={34}
                        height={34}
                        className="w-8.5 h-8.5 rounded-full object-cover border border-amber-400/60 shrink-0"
                      />
                    ) : (
                      <div className="w-8.5 h-8.5 rounded-full bg-gradient-to-br from-amber-400 to-emerald-700 text-emerald-950 font-bold flex items-center justify-center text-xs shrink-0 shadow">
                        {currentUser.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-white truncate flex items-center gap-1.5">
                        <span>{currentUser.name}</span>
                        {currentUser.provider === 'google' && <GoogleLogo className="w-3 h-3 shrink-0" />}
                      </div>
                      <div className="text-[10px] text-emerald-300/70 truncate">{currentUser.email}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <Link
                      href="/dashboard"
                      onClick={() => setMobileMenuOpen(false)}
                      className="px-2.5 py-1.5 rounded-xl bg-amber-400/20 text-amber-300 border border-amber-400/30 text-[11px] font-semibold flex items-center gap-1 cursor-pointer"
                    >
                      <span>Dashboard</span>
                    </Link>
                    <button
                      onClick={() => {
                        handleSignOut();
                        setMobileMenuOpen(false);
                      }}
                      className="p-1.5 rounded-xl bg-red-500/15 text-red-300 border border-red-500/30 hover:bg-red-500/25 transition-colors cursor-pointer"
                      title="Sign Out"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="mb-3.5 p-3 rounded-2xl bg-gradient-to-br from-amber-500/15 via-emerald-950/60 to-black/90 border border-amber-400/30 shadow-lg">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center shadow-md shrink-0">
                      <GoogleLogo className="w-4.5 h-4.5" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-white">{t('login') || 'Sign In'} with Google</div>
                      <div className="text-[10px] text-emerald-300/70 truncate">Sync prayers, bookmarks & habits</div>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setShowAuthModal(true);
                    }}
                    className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 text-emerald-950 font-black text-xs shadow-md shadow-amber-500/20 active:scale-95 transition-all flex items-center gap-1.5 shrink-0 cursor-pointer"
                  >
                    <User className="w-3.5 h-3.5" />
                    <span>{t('login') || 'Sign In'}</span>
                  </button>
                </div>
              </div>
            )}

            {/* Section 1: Core Staples with 3D Icons */}
            <div className="mb-3">
              <div className="text-[10px] font-bold text-amber-400/70 uppercase tracking-widest px-1 mb-1.5">
                {t('explorePillars')}
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                {primaryNavLinks.map((link) => {
                  const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`p-2 rounded-xl flex items-center gap-2 text-xs transition-colors ${
                        isActive
                          ? 'bg-amber-400/15 text-amber-300 font-bold border border-amber-400/30'
                          : 'bg-white/5 hover:bg-white/10 text-emerald-100/90'
                      }`}
                    >
                      <span className="text-base select-none filter drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]">
                        {link.icon3d}
                      </span>
                      <span className="truncate">{link.label}</span>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Section 2: Features & Tools with 3D Icons */}
            <div className="mb-3">
              <div className="text-[10px] font-bold text-emerald-400/70 uppercase tracking-widest px-1 mb-1.5">
                {t('toolsAndMedia')}
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                {secondaryNavLinks.map((link) => {
                  const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`p-2 rounded-xl flex items-center gap-2 text-xs transition-colors ${
                        isActive
                          ? 'bg-amber-400/15 text-amber-300 font-bold border border-amber-400/30'
                          : 'bg-white/5 hover:bg-white/10 text-emerald-100/90'
                      }`}
                    >
                      <span className="text-base select-none filter drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]">
                        {link.icon3d}
                      </span>
                      <span className="truncate">{link.label}</span>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Quick Search in Mobile Drawer */}
            <div className="pt-2 border-t border-white/10">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setShowSearchModal(true);
                }}
                className="w-full py-2.5 px-3 rounded-xl bg-white/5 hover:bg-white/10 text-emerald-200 border border-white/10 text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer"
              >
                <Search className="w-3.5 h-3.5 text-amber-400" />
                <span>{t('search')} (Quran, Hadith, Mosques...)</span>
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Floating 'Ask AI' Bubble in Bottom-Right Corner (Clean & Unobtrusive) */}
      <div className="fixed bottom-6 right-4 md:bottom-8 md:right-8 z-50 animate-in fade-in slide-in-from-bottom-4">
        <button
          onClick={() => setShowAiModal(true)}
          className="group relative flex items-center gap-2 px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-emerald-950 font-black text-xs shadow-xl shadow-amber-500/30 hover:scale-105 active:scale-95 transition-all border border-amber-300/50 cursor-pointer"
          aria-label="Ask NOOR Islamic AI Assistant"
        >
          <div className="w-5 h-5 rounded-full bg-emerald-950 text-amber-400 flex items-center justify-center shrink-0">
            <Sparkles className="w-3 h-3" />
          </div>
          <span className="tracking-wide">Ask AI</span>
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-700 opacity-75" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-900" />
          </span>
        </button>
      </div>

      {/* Universally Mounted Modals */}
      <SearchModal isOpen={showSearchModal} onClose={() => setShowSearchModal(false)} />
      <AiAssistantModal isOpen={showAiModal} onClose={() => setShowAiModal(false)} />
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onLoginSuccess={(user) => {
          setCurrentUser(user);
          saveCurrentUser(user);
        }}
      />
    </>
  );
};

// Helper for active matching
function linkIsActive(pathname: string, href: string) {
  if (href === '/') return pathname === '/';
  return pathname.startsWith(href);
}
