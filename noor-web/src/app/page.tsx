'use client';

// ============================================================
// NOOR Web — Main Platform Homepage (Liquid Glass UI/UX)
// ============================================================

import React, { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { HeroSection } from '../components/HeroSection';
import { PrayerTimesSection } from '../components/PrayerTimesSection';
import { DailyAyahSection } from '../components/DailyAyahSection';
import { QuranSection } from '../components/QuranSection';
import { DuasSection } from '../components/DuasSection';
import { QiblaSection } from '../components/QiblaSection';
import { PixabayMediaSection } from '../components/PixabayMediaSection';
import { CalendarSection } from '../components/CalendarSection';
import { MonetizationSection } from '../components/MonetizationSection';
import { AuthModal, AuthUser } from '../components/AuthModal';
import { AiAssistantModal } from '../components/AiAssistantModal';
import { SearchModal } from '../components/SearchModal';
import { DashboardModal } from '../components/DashboardModal';
import { Footer } from '../components/Footer';

import { DEFAULT_LOCATION, CityLocation, detectUserLocation, saveUserLocation } from '../lib/locationService';
import { calculateDayPrayerTimes, PrayerTimeItem } from '../lib/prayerService';
import { useLanguage } from '../context/LanguageContext';
import { loadCurrentUser, saveCurrentUser, loadUserSettings } from '../lib/userDataService';

export default function Home() {
  const { t } = useLanguage();
  const [currentLocation, setCurrentLocation] = useState<CityLocation>(DEFAULT_LOCATION);
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [selectedMethod, setSelectedMethod] = useState<string>('MWL');
  const [asrFactor, setAsrFactor] = useState<number>(1);
  const [prayerTimes, setPrayerTimes] = useState<PrayerTimeItem[]>([]);

  // Modals state
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showAiModal, setShowAiModal] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [showDashboardModal, setShowDashboardModal] = useState(false);
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);

  const handleSignOut = () => {
    saveCurrentUser(null);
    setCurrentUser(null);
  };

  // Load saved user & settings on startup, and check for ?profile=true query
  useEffect(() => {
    const u = loadCurrentUser();
    if (u) setCurrentUser(u);
    const s = loadUserSettings();
    if (s?.calculationMethod) setSelectedMethod(s.calculationMethod);
    if (s?.asrFactor) setAsrFactor(s.asrFactor);

    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('profile') === 'true') {
        setShowDashboardModal(true);
      }
    }
  }, []);

  // Auto-detect user's location on startup (instant IP + browser GPS)
  useEffect(() => {
    let isMounted = true;
    detectUserLocation().then((loc) => {
      if (isMounted && loc) {
        setCurrentLocation(loc);
      }
    }).catch(() => {});
    return () => { isMounted = false; };
  }, []);

  // Recalculate prayer times whenever location, date, method, or asr factor changes
  useEffect(() => {
    const times = calculateDayPrayerTimes(
      currentLocation.lat,
      currentLocation.lng,
      currentDate,
      selectedMethod,
      asrFactor
    );
    setPrayerTimes(times);
  }, [currentLocation, currentDate, selectedMethod, asrFactor]);

  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden">
      {/* Top Floating Liquid Glass Navbar */}
      <Navbar
        currentLocation={currentLocation}
        onLocationChange={(loc) => {
          setCurrentLocation(loc);
          saveUserLocation(loc);
        }}
        onOpenAuth={() => setShowAuthModal(true)}
        onOpenAi={() => setShowAiModal(true)}
        onOpenSearch={() => setShowSearchModal(true)}
        onOpenDashboard={() => setShowDashboardModal(true)}
        user={currentUser}
        onSignOut={handleSignOut}
      />

      {/* Main Content Sections */}
      <main className="flex-1 w-full">
        {/* 1. Liquid Glass Hero Section */}
        <HeroSection
          currentLocation={currentLocation}
          prayerTimes={prayerTimes}
          onOpenAi={() => setShowAiModal(true)}
          onOpenDashboard={() => setShowDashboardModal(true)}
        />

        {/* 2. Liquid Glass Prayer Times Dashboard */}
        <PrayerTimesSection
          prayerTimes={prayerTimes}
          selectedMethod={selectedMethod}
          onMethodChange={setSelectedMethod}
          asrFactor={asrFactor}
          onAsrFactorChange={setAsrFactor}
          currentLocation={currentLocation}
          currentDate={currentDate}
          onDateChange={setCurrentDate}
        />

        {/* 3. Verse of the Day with Calligraphy */}
        <DailyAyahSection />

        {/* 4. Quran Explorer & Reader */}
        <QuranSection />

        {/* 5. Duas, Adhkar & Digital Tasbih */}
        <DuasSection />

        {/* 6. Spherical Qibla Compass */}
        <QiblaSection currentLocation={currentLocation} />

        {/* 7. Pixabay Islamic Media Gallery */}
        <PixabayMediaSection />

        {/* 8. Hijri Calendar & Holy Events */}
        <CalendarSection />

        {/* 9. Ethical Monetization & Mobile App Stores Showcase */}
        <MonetizationSection />
      </main>

      {/* Luxury Ecosystem Footer */}
      <Footer />

      {/* Floating 'Ask AI' Bubble in Bottom-Right Corner */}
      <div className="fixed bottom-20 right-4 md:bottom-8 md:right-8 z-50 animate-in fade-in slide-in-from-bottom-4">
        <button
          onClick={() => setShowAiModal(true)}
          className="group relative flex items-center gap-2.5 px-4 py-3 sm:px-5 sm:py-3.5 rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-emerald-950 font-black text-xs sm:text-sm shadow-2xl shadow-amber-500/40 hover:shadow-amber-500/70 hover:scale-105 active:scale-95 transition-all border-2 border-white/40 ring-4 ring-amber-400/20 cursor-pointer"
          aria-label="Ask NOOR Islamic AI Assistant"
        >
          {/* Animated Glow Aura */}
          <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-amber-400 via-emerald-400 to-amber-400 opacity-70 blur-sm group-hover:opacity-100 transition-opacity -z-10 animate-pulse" />

          {/* Sparkle Icon */}
          <div className="w-6 h-6 rounded-full bg-emerald-950 text-amber-400 flex items-center justify-center shrink-0 shadow-inner">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
          </div>

          <span className="tracking-wide whitespace-nowrap">{t('askAi')}</span>

          {/* Live Indicator Dot */}
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-700 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-900" />
          </span>
        </button>
      </div>

      {/* Interactive Liquid Modals */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onLoginSuccess={(u) => {
          setCurrentUser(u);
          saveCurrentUser(u);
        }}
      />

      <AiAssistantModal
        isOpen={showAiModal}
        onClose={() => setShowAiModal(false)}
      />

      <SearchModal
        isOpen={showSearchModal}
        onClose={() => setShowSearchModal(false)}
      />

      {/* Complete Customization, Traffic Analytics & CMS Dashboard */}
      <DashboardModal
        isOpen={showDashboardModal}
        onClose={() => setShowDashboardModal(false)}
        selectedMethod={selectedMethod}
        onMethodChange={setSelectedMethod}
        asrFactor={asrFactor}
        onAsrFactorChange={setAsrFactor}
        user={currentUser}
        onSignOut={handleSignOut}
        onOpenAuth={() => {
          setShowDashboardModal(false);
          setShowAuthModal(true);
        }}
      />
    </div>
  );
}
