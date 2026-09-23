'use client';

// ============================================================
// NOOR Web — Dedicated Sanctuary Page (/ziyarat/[slug])
// Separate, comprehensive scholarly page for each Dargah & Mazar
// ============================================================

import React, { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  Landmark,
  ArrowLeft,
  MapPin,
  Compass,
  Navigation,
  ExternalLink,
  Calendar,
  Clock,
  BookOpen,
  ShieldCheck,
  CheckCircle2,
  Share2,
  Volume2,
  Play,
  Pause,
  Building2,
  Globe2,
  FileText,
  HeartHandshake,
  Check
} from 'lucide-react';

import { DargahItem } from '../../../lib/ziyaratTypes';
import { VERIFIED_DARGAHS_DATABASE } from '../../../lib/ziyaratData';
import {
  calculateHaversineDistance,
  getGoogleMapsNavigationUrl,
  getAppleMapsNavigationUrl
} from '../../../lib/ziyaratService';
import { getSavedUserLocation, CityLocation } from '../../../lib/locationService';
import { GlobalNavbar } from '../../../components/GlobalNavbar';
import { Footer } from '../../../components/Footer';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function DedicatedDargahPage({ params }: PageProps) {
  const { slug } = use(params);

  // Lookup the dargah
  const dargah = VERIFIED_DARGAHS_DATABASE.find(
    (d) => d.slug === slug || d.id === slug
  );

  if (!dargah) {
    notFound();
  }

  const [selectedLanguage, setSelectedLanguage] = useState<'en' | 'ur' | 'ar'>('en');
  const [userLocation, setUserLocation] = useState<CityLocation | null>(null);
  const [copiedUrl, setCopiedUrl] = useState(false);

  // Audio Player State
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [currentAudioUrl, setCurrentAudioUrl] = useState<string | null>(null);
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    const loc = getSavedUserLocation();
    if (loc) setUserLocation(loc);
  }, []);

  // Compute distance from user
  const distanceKm = userLocation
    ? calculateHaversineDistance(
        userLocation.lat,
        userLocation.lng,
        dargah.coordinates.latitude,
        dargah.coordinates.longitude
      )
    : undefined;

  // Localized Name
  const displayName =
    selectedLanguage === 'ur'
      ? dargah.urduName
      : selectedLanguage === 'ar'
      ? dargah.arabicName
      : dargah.name;

  // Audio handler
  const handleToggleAudio = (url: string) => {
    if (currentAudioUrl === url && isPlayingAudio && audioElement) {
      audioElement.pause();
      setIsPlayingAudio(false);
      return;
    }

    if (audioElement) {
      audioElement.pause();
    }

    const audio = new Audio(url);
    audio.play();
    setAudioElement(audio);
    setCurrentAudioUrl(url);
    setIsPlayingAudio(true);

    audio.onended = () => {
      setIsPlayingAudio(false);
    };
  };

  const handleShare = () => {
    if (typeof navigator !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopiedUrl(true);
      setTimeout(() => setCopiedUrl(false), 2500);
    }
  };

  // Nearby / Related sanctuaries in same country or same lineage
  const relatedDargahs = VERIFIED_DARGAHS_DATABASE.filter(
    (d) =>
      d.id !== dargah.id &&
      (d.coordinates.country === dargah.coordinates.country ||
        d.spiritualLineage === dargah.spiritualLineage)
  ).slice(0, 3);

  const primaryPhoto =
    dargah.mediaAssets.find((m) => m.type === 'photo')?.url ||
    'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?w=1600&q=85';

  return (
    <div className="min-h-screen bg-[#02120d] text-white flex flex-col selection:bg-amber-500 selection:text-black relative overflow-x-hidden">
      {/* Background Atmosphere */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <img
          src={primaryPhoto}
          alt={dargah.name}
          className="w-full h-full object-cover object-center opacity-10 filter saturate-150 blur-sm"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#02120d]/85 via-[#02120d]/92 to-[#02120d]" />
      </div>

      {/* Universal Global Navigation Dock */}
      <GlobalNavbar
        currentLocation={userLocation || undefined}
        onLocationChange={(loc) => setUserLocation(loc)}
      />

      {/* Breadcrumb & Quick Action Sub-bar */}
      <div className="border-b border-white/10 bg-[#031c15]/70 backdrop-blur-md px-3 sm:px-6 py-2.5 mt-1 sm:mt-2">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2.5">
            <Link
              href="/ziyarat"
              className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-emerald-200 hover:text-white transition-colors"
              title="Return to Ziyarat Directory"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <nav className="flex items-center gap-1.5 text-xs text-emerald-300/80 font-medium">
              <Link href="/" className="hover:text-amber-300 transition-colors">Home</Link>
              <span className="text-white/30">/</span>
              <Link href="/ziyarat" className="hover:text-amber-300 transition-colors">Ziyarat & Dargahs</Link>
              <span className="text-white/30">/</span>
              <span className="text-amber-400 font-bold truncate max-w-[180px] sm:max-w-sm">{dargah.name}</span>
            </nav>
          </div>

          {/* Right Tools: Multilingual Toggle & Share */}
          <div className="flex items-center gap-2">
            {/* Language Switcher */}
            <div className="flex items-center bg-black/50 p-1 rounded-full border border-white/15 text-xs">
              <button
                onClick={() => setSelectedLanguage('en')}
                className={`px-2.5 py-0.5 rounded-full font-bold transition-all ${
                  selectedLanguage === 'en' ? 'bg-amber-400 text-emerald-950 shadow-sm' : 'text-emerald-200/80 hover:text-white'
                }`}
              >
                English
              </button>
              <button
                onClick={() => setSelectedLanguage('ur')}
                className={`px-2.5 py-0.5 rounded-full font-bold transition-all ${
                  selectedLanguage === 'ur' ? 'bg-amber-400 text-emerald-950 shadow-sm' : 'text-emerald-200/80 hover:text-white'
                }`}
              >
                اُردُو
              </button>
              <button
                onClick={() => setSelectedLanguage('ar')}
                className={`px-2.5 py-0.5 rounded-full font-bold transition-all ${
                  selectedLanguage === 'ar' ? 'bg-amber-400 text-emerald-950 shadow-sm' : 'text-emerald-200/80 hover:text-white'
                }`}
              >
                العربية
              </button>
            </div>

            {/* Share Button */}
            <button
              onClick={handleShare}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-emerald-200 hover:text-white border border-white/10 transition-colors flex items-center gap-1.5 text-xs font-semibold"
              title="Share Sanctuary Link"
            >
              {copiedUrl ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="hidden sm:inline text-emerald-300">Copied!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5 text-amber-400" />
                  <span className="hidden sm:inline">Share</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-1 space-y-8">
        {/* Dedicated Hero Banner */}
        <section className="liquid-card rounded-3xl border border-white/15 overflow-hidden relative shadow-2xl">
          <div className="relative h-80 sm:h-96 w-full overflow-hidden bg-emerald-950/60">
            <img
              src={primaryPhoto}
              alt={dargah.name}
              className="w-full h-full object-cover object-center filter saturate-110"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=1600&q=85';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#02140f] via-[#02140f]/60 to-black/30" />

            {/* Top Badges */}
            <div className="absolute top-4 left-4 flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-emerald-950/80 backdrop-blur-md text-amber-300 font-bold text-xs border border-amber-400/40">
                {dargah.spiritualLineage} Silsila
              </span>
              <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-white text-xs font-medium">
                Est. {dargah.yearEstablishedGregorian} CE ({dargah.historicalPeriodCentury})
              </span>
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 backdrop-blur-md text-emerald-300 text-xs font-bold border border-emerald-500/30 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>100% Scholarly Verified</span>
              </span>
            </div>

            {/* Distance Pill */}
            {typeof distanceKm === 'number' && (
              <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md text-white font-bold text-xs flex items-center gap-1.5 border border-white/20">
                <Compass className="w-3.5 h-3.5 text-amber-400" />
                <span>{distanceKm.toLocaleString()} km from you</span>
              </div>
            )}

            {/* Title & Calligraphy Overlay */}
            <div className="absolute bottom-6 left-6 right-6 space-y-2">
              <div className="text-sm font-arabic font-bold text-amber-300 drop-shadow-md">
                {dargah.arabicName} • {dargah.urduName}
              </div>
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
                {displayName}
              </h1>
              <p className="text-sm sm:text-base text-amber-400 font-medium">
                {dargah.primaryHonorific}
              </p>
            </div>
          </div>

          {/* Quick Nav Action Strip */}
          <div className="p-4 sm:p-5 bg-[#031c15] border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-200">
              <MapPin className="w-4 h-4 text-red-400 shrink-0" />
              <span>
                {dargah.coordinates.address}, {dargah.coordinates.city}, {dargah.coordinates.country}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={getGoogleMapsNavigationUrl(
                  dargah.coordinates.latitude,
                  dargah.coordinates.longitude,
                  dargah.name
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-md"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Google Maps GPS</span>
              </a>

              <a
                href={getAppleMapsNavigationUrl(
                  dargah.coordinates.latitude,
                  dargah.coordinates.longitude,
                  dargah.name
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center gap-1.5 transition-all border border-white/10"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Apple Maps</span>
              </a>
            </div>
          </div>
        </section>

        {/* 2-Column Main Layout: Deep Chronicle on Left, Logistics & Audio on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* LEFT COLUMN: Deep Chronicles, Architecture, Figures & Sources (8 cols) */}
          <div className="lg:col-span-8 space-y-8">
            {/* Overview Summary */}
            <section className="liquid-card rounded-3xl p-6 sm:p-8 border border-white/10 bg-black/40 space-y-3">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-amber-400" />
                <span>Historical Overview & Significance</span>
              </h2>
              <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
                {dargah.historicalSummary}
              </p>
            </section>

            {/* Deep Chronicle & Heritage */}
            <section className="liquid-card rounded-3xl p-6 sm:p-8 border border-white/10 bg-black/40 space-y-4">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Building2 className="w-4 h-4 text-amber-400" />
                <span>Detailed Historical Chronicle & Foundations</span>
              </h2>
              <div className="text-xs sm:text-sm text-emerald-200/80 leading-relaxed whitespace-pre-line space-y-3">
                {dargah.detailedChronicle}
              </div>

              <div className="pt-3 border-t border-white/10 text-xs text-amber-300">
                <strong>Architectural Style:</strong> {dargah.architecturalStyle}
              </div>
            </section>

            {/* Associated Saints & Scholars */}
            <section className="space-y-4">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Landmark className="w-4 h-4 text-amber-400" />
                <span>Associated Saints, Masters & Scholars</span>
              </h2>

              {dargah.associatedFigures.map((fig, idx) => (
                <div
                  key={idx}
                  className="liquid-card rounded-3xl p-6 border border-emerald-500/20 bg-emerald-950/30 space-y-3"
                >
                  <div className="flex flex-wrap items-start justify-between gap-2 border-b border-white/10 pb-3">
                    <div>
                      <h3 className="text-base font-bold text-white">{fig.name}</h3>
                      <p className="text-xs text-amber-300 font-arabic">{fig.arabicName} • {fig.urduName}</p>
                      <div className="flex flex-wrap gap-1.5 mt-1.5">
                        {fig.honorificTitles.map((t, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-semibold border border-amber-500/30"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="text-right text-xs text-emerald-300/80">
                      <div>Passed: {fig.deathYearHijri} AH ({fig.gregorianDeathYear} CE)</div>
                      {fig.spiritualMaster && (
                        <div className="text-[11px] text-emerald-400 mt-0.5">Master: {fig.spiritualMaster}</div>
                      )}
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
                    {fig.biographicalSummary}
                  </p>

                  {fig.seminalWorks && fig.seminalWorks.length > 0 && (
                    <div className="text-xs text-emerald-300/90 pt-1">
                      <strong>Seminal Works:</strong> {fig.seminalWorks.join(' • ')}
                    </div>
                  )}

                  {fig.distinguishedDisciples && fig.distinguishedDisciples.length > 0 && (
                    <div className="text-xs text-emerald-300/90">
                      <strong>Distinguished Disciples:</strong> {fig.distinguishedDisciples.join(' • ')}
                    </div>
                  )}
                </div>
              ))}
            </section>

            {/* Primary Classical Chronicles Citations Table */}
            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <FileText className="w-4 h-4 text-emerald-400" />
                  <span>Primary Classical Chronicles & Source Citations</span>
                </h2>
                <span className="text-[10px] text-emerald-400 font-bold bg-emerald-950 px-2.5 py-0.5 rounded-full border border-emerald-700/40">
                  Zero Inventions
                </span>
              </div>

              <div className="liquid-card rounded-3xl border border-white/10 overflow-hidden bg-black/40">
                <table className="w-full text-left text-xs text-emerald-200/80">
                  <thead className="bg-[#021711] text-white font-bold border-b border-white/10">
                    <tr>
                      <th className="p-4">Classical Work</th>
                      <th className="p-4">Author / Compiler</th>
                      <th className="p-4">Language</th>
                      <th className="p-4">Verification Standard</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {dargah.sourceCitations.map((citation) => (
                      <tr key={citation.id} className="hover:bg-white/5">
                        <td className="p-4 font-semibold text-white">
                          {citation.workTitle}
                          {citation.pageOrVolumeReference && (
                            <span className="block text-[10px] text-emerald-400/70 font-mono">
                              {citation.pageOrVolumeReference}
                            </span>
                          )}
                        </td>
                        <td className="p-4">{citation.author}</td>
                        <td className="p-4">{citation.primaryLanguage}</td>
                        <td className="p-4">
                          <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 text-[10px] font-semibold border border-emerald-500/20">
                            {citation.verificationLevel}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </div>

          {/* RIGHT COLUMN: Urs Mubarak, Adab, Audio & Logistics (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Annual Urs Mubarak Card */}
            <div className="liquid-card rounded-3xl p-6 border border-amber-400/30 bg-black/40 space-y-3">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 font-bold text-sm text-white">
                  <Calendar className="w-4 h-4 text-amber-400" />
                  <span>Annual Urs Mubarak</span>
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-bold text-xs border border-amber-500/30">
                  {dargah.ursEvent.hijriDayStart}-{dargah.ursEvent.hijriDayEnd} {dargah.ursEvent.hijriMonthName}
                </span>
              </div>

              <h4 className="text-sm font-bold text-white">{dargah.ursEvent.title}</h4>
              <p className="text-xs text-emerald-200/80 leading-relaxed">
                {dargah.ursEvent.ritualsDescription}
              </p>

              <div className="pt-2 border-t border-white/10 text-xs text-emerald-300/80 space-y-1">
                <div><strong>Season:</strong> {dargah.ursEvent.gregorianApproximateSeason}</div>
                {dargah.ursEvent.estimatedAnnualAttendance && (
                  <div><strong>Annual Attendance:</strong> {dargah.ursEvent.estimatedAnnualAttendance}</div>
                )}
              </div>
            </div>

            {/* Sacred Visiting Adab & Guidelines */}
            <div className="liquid-card rounded-3xl p-6 border border-white/10 bg-black/40 space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-400" />
                <span>Visiting Guidelines & Adab</span>
              </h3>

              <div className="space-y-2 text-xs">
                <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                  <strong className="text-white block mb-0.5">Visiting Hours</strong>
                  <span className="text-emerald-200/80">{dargah.visitingInfo.visitingHours}</span>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                  <strong className="text-white block mb-0.5">Best Time to Visit</strong>
                  <span className="text-emerald-200/80">{dargah.visitingInfo.bestTimeToVisit}</span>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                  <strong className="text-white block mb-0.5">Dress Code Requirements</strong>
                  <span className="text-emerald-200/80">{dargah.visitingInfo.dressCodeRequirements}</span>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                  <strong className="text-white block mb-0.5">Langar & Niaz (Free Food)</strong>
                  <span className="text-emerald-200/80">{dargah.visitingInfo.langarNiazDetails}</span>
                </div>
              </div>

              {/* Etiquette Checklist */}
              <div className="pt-2">
                <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider mb-2">
                  Sacred Etiquette:
                </h4>
                <ul className="space-y-2 text-xs text-emerald-200/80">
                  {dargah.visitingInfo.etiquetteAndAdab.map((adab, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{adab}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Audio Recitation & Qawwali Player */}
            {dargah.mediaAssets.filter((m) => m.type === 'audio').length > 0 && (
              <div className="liquid-card rounded-3xl p-6 border border-white/10 bg-black/40 space-y-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Volume2 className="w-4 h-4 text-amber-400" />
                  <span>Devotional Audio Heritage</span>
                </h3>

                <div className="space-y-2">
                  {dargah.mediaAssets
                    .filter((m) => m.type === 'audio')
                    .map((media) => {
                      const isThisPlaying = isPlayingAudio && currentAudioUrl === media.url;
                      return (
                        <div
                          key={media.id}
                          className="p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between gap-3"
                        >
                          <div className="space-y-0.5 truncate">
                            <div className="text-xs font-bold text-white truncate">{media.title}</div>
                            <div className="text-[10px] text-emerald-300/70 truncate">
                              {media.authorAttribution} • {media.license}
                            </div>
                          </div>
                          <button
                            onClick={() => handleToggleAudio(media.url)}
                            className="p-2.5 rounded-full bg-amber-500 hover:bg-amber-400 text-emerald-950 font-bold shrink-0 shadow-md shadow-amber-500/20"
                            title={isThisPlaying ? 'Pause Audio' : 'Play Audio'}
                          >
                            {isThisPlaying ? (
                              <Pause className="w-3.5 h-3.5 fill-current" />
                            ) : (
                              <Play className="w-3.5 h-3.5 fill-current" />
                            )}
                          </button>
                        </div>
                      );
                    })}
                </div>
              </div>
            )}

            {/* Coordinates & Transport Spec */}
            <div className="liquid-card rounded-3xl p-6 border border-white/10 bg-black/40 space-y-3 text-xs">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Compass className="w-4 h-4 text-amber-400" />
                <span>Geographic Specifications</span>
              </h3>
              <div className="space-y-1.5 text-emerald-200/80">
                <div><strong>Latitude:</strong> {dargah.coordinates.latitude.toFixed(4)}°N</div>
                <div><strong>Longitude:</strong> {dargah.coordinates.longitude.toFixed(4)}°E</div>
                {dargah.coordinates.altitudeMeters && (
                  <div><strong>Altitude:</strong> {dargah.coordinates.altitudeMeters} meters ASL</div>
                )}
                {dargah.coordinates.nearestAirport && (
                  <div><strong>Airport:</strong> {dargah.coordinates.nearestAirport}</div>
                )}
                {dargah.coordinates.nearestRailwayStation && (
                  <div><strong>Railway:</strong> {dargah.coordinates.nearestRailwayStation}</div>
                )}
              </div>
            </div>

            {/* Related / Nearby Sanctuaries */}
            {relatedDargahs.length > 0 && (
              <div className="liquid-card rounded-3xl p-6 border border-white/10 bg-black/40 space-y-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Globe2 className="w-4 h-4 text-amber-400" />
                  <span>Related Sanctuaries</span>
                </h3>

                <div className="space-y-2">
                  {relatedDargahs.map((rel) => (
                    <Link
                      key={rel.id}
                      href={`/ziyarat/${rel.slug}`}
                      className="p-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 flex items-center justify-between gap-2 transition-all block group"
                    >
                      <div>
                        <div className="text-xs font-bold text-white group-hover:text-amber-300 transition-colors">
                          {rel.name}
                        </div>
                        <div className="text-[10px] text-emerald-300/70">
                          {rel.coordinates.city}, {rel.coordinates.country} • {rel.spiritualLineage}
                        </div>
                      </div>
                      <ExternalLink className="w-3.5 h-3.5 text-emerald-400 group-hover:text-amber-300" />
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Universal Footer */}
      <Footer />
    </div>
  );
}
