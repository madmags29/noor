'use client';

// ============================================================
// NOOR Web — Global Ziyarat, Dargahs & Islamic Heritage Directory
// Comprehensive Verified Database Across 12+ Nations • Overhauled UX
// ============================================================

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import {
  Landmark,
  ArrowRight,
  Search,
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
  VolumeX,
  Play,
  Pause,
  Filter,
  Building2,
  Globe2,
  PlusCircle,
  X,
  Sparkles,
  Info,
  ChevronDown,
  ChevronUp,
  LayoutGrid,
  List,
  Check,
  Maximize2,
  Minimize2
} from 'lucide-react';

import { DargahItem, SpiritualLineage, CommunitySubmissionPayload } from '../../lib/ziyaratTypes';
import { VERIFIED_DARGAHS_DATABASE } from '../../lib/ziyaratData';
import {
  calculateHaversineDistance,
  getGoogleMapsNavigationUrl,
  getAppleMapsNavigationUrl,
  submitDargahForReview
} from '../../lib/ziyaratService';
import { getSavedUserLocation, CityLocation, detectUserLocation } from '../../lib/locationService';
import { GlobalNavbar } from '../../components/GlobalNavbar';
import { Footer } from '../../components/Footer';

// Represented countries with emoji flags
const COUNTRY_FLAGS: Record<string, string> = {
  'All': '🌍',
  'India': '🇮🇳',
  'Pakistan': '🇵🇰',
  'Iraq': '🇮🇶',
  'Iran': '🇮🇷',
  'Turkey': '🇹🇷',
  'Egypt': '🇪🇬',
  'Morocco': '🇲🇦',
  'Uzbekistan': '🇺🇿',
  'Syria': '🇸🇾',
  'Palestine': '🇵🇸',
  'Indonesia': '🇮🇩',
  'Bangladesh': '🇧🇩',
  'Jordan': '🇯🇴'
};

const LINEAGES: ('All' | SpiritualLineage)[] = [
  'All',
  'Chishti',
  'Qadiri',
  'Naqshbandi',
  'Suhrawardi',
  'Shadhili',
  'Tijaniyya',
  'Mevlevi',
  'Wali Sanga',
  'Ahl al-Bayt',
  'Sahabah',
  'General Islamic Heritage'
];

export default function ZiyaratPage() {
  const [items, setItems] = useState<DargahItem[]>(VERIFIED_DARGAHS_DATABASE);
  const [selectedCountry, setSelectedCountry] = useState('All');
  const [selectedLineage, setSelectedLineage] = useState<'All' | SpiritualLineage>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortByDistance, setSortByDistance] = useState(true);
  const [userLocation, setUserLocation] = useState<CityLocation | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // In-Page Multi-Language Toggle (Applies across all cards on page)
  const [selectedLanguage, setSelectedLanguage] = useState<'en' | 'ur' | 'ar'>('en');

  // In-Page Inline Expander for quick previews
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({});

  // In-Page Community Submission Accordion
  const [isSubmitExpanded, setIsSubmitExpanded] = useState(false);
  const [submitSuccessMsg, setSubmitSuccessMsg] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);

  // Audio Player State for Visiting Salam
  const [isPlayingSalam, setIsPlayingSalam] = useState(false);
  const [salamAudioElement, setSalamAudioElement] = useState<HTMLAudioElement | null>(null);

  const [submitForm, setSubmitForm] = useState<CommunitySubmissionPayload>({
    name: '',
    city: '',
    country: 'India',
    latitude: 0,
    longitude: 0,
    spiritualLineage: 'Chishti',
    associatedSaintName: '',
    hijriUrsMonth: 7,
    hijriUrsDays: '1-6',
    visitingHours: '5:00 AM - 10:00 PM',
    historicalSummary: '',
    primarySourceReference: '',
    submitterName: '',
    submitterEmail: '',
    licenseConfirmation: false
  });

  // Hydrate user location from storage or auto-detect
  useEffect(() => {
    const loc = getSavedUserLocation();
    if (loc) {
      setUserLocation(loc);
    } else {
      detectUserLocation(false)
        .then((l) => setUserLocation(l))
        .catch(() => {});
    }
  }, []);

  // Compute list of countries with dynamic counts
  const countryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: items.length };
    items.forEach((item) => {
      const c = item.coordinates.country;
      counts[c] = (counts[c] || 0) + 1;
    });
    return counts;
  }, [items]);

  const uniqueCountries = useMemo(() => {
    const list = Object.keys(countryCounts).filter((c) => c !== 'All');
    list.sort();
    return ['All', ...list];
  }, [countryCounts]);

  // Compute distances dynamically based on user location
  const dargahsWithDistance = useMemo(() => {
    return items.map((item) => {
      if (!userLocation) return item;
      const distance = calculateHaversineDistance(
        userLocation.lat,
        userLocation.lng,
        item.coordinates.latitude,
        item.coordinates.longitude
      );
      return {
        ...item,
        distanceKm: Math.round(distance)
      };
    });
  }, [items, userLocation]);

  // Filter and Sort Dargahs
  const filteredDargahs = useMemo(() => {
    const cleanSearch = searchQuery.toLowerCase().trim();

    return dargahsWithDistance
      .filter((item) => {
        // Country filter
        if (selectedCountry !== 'All' && item.coordinates.country !== selectedCountry) {
          return false;
        }

        // Lineage filter
        if (selectedLineage !== 'All' && item.spiritualLineage !== selectedLineage) {
          return false;
        }

        // Search query
        if (cleanSearch) {
          const matchName = item.name.toLowerCase().includes(cleanSearch);
          const matchCity = item.coordinates.city.toLowerCase().includes(cleanSearch);
          const matchCountry = item.coordinates.country.toLowerCase().includes(cleanSearch);
          const matchHonorific = item.primaryHonorific.toLowerCase().includes(cleanSearch);
          const matchFigures = item.associatedFigures.some((f) =>
            f.name.toLowerCase().includes(cleanSearch) ||
            f.honorificTitles.some((h) => h.toLowerCase().includes(cleanSearch))
          );
          return matchName || matchCity || matchCountry || matchHonorific || matchFigures;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortByDistance) {
          const distA = a.distanceKm ?? 999999;
          const distB = b.distanceKm ?? 999999;
          return distA - distB;
        }
        return a.yearEstablishedGregorian - b.yearEstablishedGregorian;
      });
  }, [dargahsWithDistance, selectedCountry, selectedLineage, searchQuery, sortByDistance]);

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const toggleAllExpanded = () => {
    if (filteredDargahs.every((d) => expandedIds[d.id])) {
      setExpandedIds({});
    } else {
      const all: Record<string, boolean> = {};
      filteredDargahs.forEach((d) => {
        all[d.id] = true;
      });
      setExpandedIds(all);
    }
  };

  // Play Salam Audio
  const togglePlaySalam = () => {
    if (isPlayingSalam && salamAudioElement) {
      salamAudioElement.pause();
      setIsPlayingSalam(false);
      return;
    }

    if (salamAudioElement) {
      salamAudioElement.play().catch(() => {});
      setIsPlayingSalam(true);
      return;
    }

    // Audio asset for universal Islamic greeting
    const audio = new Audio('https://cdn.islamic.network/quran/audio/128/ar.alafasy/1.mp3');
    setSalamAudioElement(audio);
    audio.play().catch(() => {});
    setIsPlayingSalam(true);

    audio.onended = () => {
      setIsPlayingSalam(false);
    };
  };

  // Submit Community Form
  const handleSubmitDargah = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!submitForm.licenseConfirmation) {
      alert('Please confirm that the submitted information is verified from authentic classical sources.');
      return;
    }
    setIsSubmitting(true);
    const res = await submitDargahForReview(submitForm);
    setIsSubmitting(false);
    setSubmitSuccessMsg(res.message);
    setTimeout(() => {
      setSubmitSuccessMsg(null);
      setIsSubmitExpanded(false);
    }, 3500);
  };

  const handleShare = (dargah: DargahItem) => {
    const url = typeof window !== 'undefined' ? `${window.location.origin}/ziyarat/${dargah.slug}` : '';
    if (navigator.share) {
      navigator.share({
        title: dargah.name,
        text: `Explore ${dargah.name} on the NOOR Global Ziyarat & Dargah Platform:`,
        url
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(url);
      setCopiedSlug(dargah.slug);
      setTimeout(() => setCopiedSlug(null), 2500);
    }
  };

  const areAllExpanded = filteredDargahs.length > 0 && filteredDargahs.every((d) => expandedIds[d.id]);

  return (
    <div className="min-h-screen bg-[#02120d] text-white flex flex-col selection:bg-amber-500 selection:text-black relative overflow-x-hidden">
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?w=1920&q=85"
          alt="Islamic Heritage Ambient Architecture"
          className="w-full h-full object-cover object-center opacity-10 filter saturate-150"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#02120d]/85 via-[#02120d]/92 to-[#02120d]" />
      </div>

      {/* 1. Global Navigation Dock (Universal across all pages) */}
      <GlobalNavbar
        currentLocation={userLocation || undefined}
        onLocationChange={(loc) => setUserLocation(loc)}
      />

      {/* 2. Sub-Header & Breadcrumb Bar */}
      <div className="border-b border-white/10 bg-[#031c15]/60 backdrop-blur-md px-3 sm:px-6 py-2.5 mt-1 sm:mt-2">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
          {/* Breadcrumb Trail */}
          <nav className="flex items-center gap-1.5 text-emerald-300/80">
            <Link href="/" className="hover:text-amber-300 transition-colors flex items-center gap-1">
              <span>Home</span>
            </Link>
            <span className="text-white/30">/</span>
            <span className="text-amber-400 font-bold flex items-center gap-1.5">
              <Landmark className="w-3.5 h-3.5" />
              <span>Ziyarat & Dargahs</span>
            </span>
            <span className="text-white/30 hidden sm:inline">/</span>
            <span className="text-emerald-400 font-mono text-[11px] hidden sm:inline">
              {filteredDargahs.length} Sites
            </span>
          </nav>

          {/* Quick Tools in Sub-header */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Language Switcher */}
            <div className="flex items-center bg-black/40 p-0.5 rounded-full border border-white/15 text-[11px]">
              <button
                onClick={() => setSelectedLanguage('en')}
                className={`px-2 py-0.5 rounded-full font-bold transition-all ${
                  selectedLanguage === 'en' ? 'bg-amber-400 text-emerald-950 shadow-sm' : 'text-emerald-200/80 hover:text-white'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setSelectedLanguage('ur')}
                className={`px-2 py-0.5 rounded-full font-bold transition-all ${
                  selectedLanguage === 'ur' ? 'bg-amber-400 text-emerald-950 shadow-sm' : 'text-emerald-200/80 hover:text-white'
                }`}
              >
                اردو
              </button>
              <button
                onClick={() => setSelectedLanguage('ar')}
                className={`px-2 py-0.5 rounded-full font-bold transition-all ${
                  selectedLanguage === 'ar' ? 'bg-amber-400 text-emerald-950 shadow-sm' : 'text-emerald-200/80 hover:text-white'
                }`}
              >
                عربي
              </button>
            </div>

            {/* Contribute Dargah Button */}
            <button
              onClick={() => setIsSubmitExpanded(!isSubmitExpanded)}
              className="liquid-pill px-3 py-1 rounded-full text-xs font-bold text-white flex items-center gap-1.5 border border-amber-500/40 hover:bg-amber-500/20 shadow-sm transition-all"
            >
              <PlusCircle className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">{isSubmitExpanded ? 'Close Form' : 'Contribute Dargah'}</span>
              <span className="sm:hidden">Contribute</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-8 w-full flex-1 space-y-6 sm:space-y-8 pb-28 md:pb-16">
        {/* 3. Hero Showcase Banner */}
        <section className="liquid-card rounded-3xl p-6 sm:p-8 border border-white/15 bg-gradient-to-br from-emerald-950/70 via-[#032018]/80 to-black/90 relative overflow-hidden shadow-2xl">
          <div className="absolute -right-16 -top-16 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-4xl space-y-3.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold shadow-sm">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>100% Scholarly Verified • Zero Synthetic Inventions</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight">
              Global Ziyarat, Dargahs & Islamic Heritage
            </h1>

            <p className="text-xs sm:text-sm text-emerald-200/85 leading-relaxed">
              Explore authentic historical chronicles, exact GPS coordinates, annual Hijri Urs calendars,
              visiting etiquette (Adab), and directions to venerated Sufi shrines, Ahl al-Bayt sanctuaries, and Sahabah memorials across 12+ nations.
            </p>

            {/* Metrics Strip */}
            <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-6 text-xs text-emerald-300 font-medium">
              <div className="flex items-center gap-2 bg-black/40 px-3 py-1.5 rounded-xl border border-white/10">
                <Building2 className="w-4 h-4 text-amber-400" />
                <span><strong className="text-white font-black">{items.length}</strong> Audited Sanctuaries</span>
              </div>
              <div className="flex items-center gap-2 bg-black/40 px-3 py-1.5 rounded-xl border border-white/10">
                <Globe2 className="w-4 h-4 text-emerald-400" />
                <span><strong className="text-white font-black">{uniqueCountries.length - 1}</strong> Nations Worldwide</span>
              </div>
              <div className="flex items-center gap-2 bg-black/40 px-3 py-1.5 rounded-xl border border-white/10">
                <Compass className="w-4 h-4 text-amber-400" />
                <span>
                  {userLocation ? (
                    <>Sorted from <strong>{userLocation.city}</strong></>
                  ) : (
                    'Real-time Proximity Calculation'
                  )}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Interactive Visiting Salam Bar (Sunnah Etiquette) */}
        <section className="liquid-card rounded-2xl sm:rounded-3xl p-4 sm:p-5 border border-amber-500/30 bg-gradient-to-r from-emerald-950/80 via-[#04241b]/90 to-emerald-950/80 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1.5 flex-1">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
              <Volume2 className="w-4 h-4" />
              <span>Prophetic Ziyarat Greeting • سلام أهل القبور</span>
            </div>
            <p className="text-sm sm:text-base font-serif font-bold text-amber-200 tracking-wide dir-rtl" dir="rtl">
              السَّلَامُ عَلَيْكُمْ دَارَ قَوْمٍ مُؤْمِنِينَ، وَإِنَّا إِنْ شَاءَ اللَّهُ بِكُمْ لَاحِقُونَ
            </p>
            <p className="text-[11px] text-emerald-200/80 italic">
              "Peace be upon you, O dwellers of the abode of believers! Indeed, if Allah wills, we shall soon join you." (Sahih Muslim 249)
            </p>
          </div>

          <button
            onClick={togglePlaySalam}
            className={`px-4 py-2.5 rounded-2xl text-xs font-black transition-all flex items-center gap-2 shrink-0 border ${
              isPlayingSalam
                ? 'bg-amber-400 text-emerald-950 border-amber-300 shadow-md shadow-amber-400/30 animate-pulse'
                : 'bg-emerald-900/60 hover:bg-emerald-800/80 text-amber-300 border-amber-500/30'
            }`}
          >
            {isPlayingSalam ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 text-amber-400" />}
            <span>{isPlayingSalam ? 'Pause Audio' : 'Listen to Salam'}</span>
          </button>
        </section>

        {/* 5. Collapsible Community Submission Section */}
        {isSubmitExpanded && (
          <section className="liquid-card rounded-3xl p-6 sm:p-8 border border-amber-400/40 bg-[#031c15] shadow-2xl space-y-5 animate-in fade-in duration-300">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <PlusCircle className="w-5 h-5 text-amber-400" />
                <h3 className="text-lg font-bold text-white">Contribute a Dargah / Mazar to Global Directory</h3>
              </div>
              <button
                onClick={() => setIsSubmitExpanded(false)}
                className="p-1.5 rounded-full bg-white/5 hover:bg-white/10 text-white"
                title="Collapse Form"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {submitSuccessMsg ? (
              <div className="p-6 rounded-2xl bg-emerald-900/40 border border-emerald-500/40 text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                <h4 className="text-base font-bold text-white">Submission Recorded Successfully!</h4>
                <p className="text-xs text-emerald-200/80 leading-relaxed">{submitSuccessMsg}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmitDargah} className="space-y-4 text-xs">
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-[11px] leading-relaxed">
                  <ShieldCheck className="w-3.5 h-3.5 inline mr-1" />
                  <strong>Zero-Invention Standard:</strong> Submissions must include historically verified
                  chronicles (*Tazkirah*, *Waqf* registry, or published academic sources).
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-emerald-300 mb-1 font-semibold">Dargah / Shrine Name *</label>
                    <input
                      type="text"
                      required
                      value={submitForm.name}
                      onChange={(e) => setSubmitForm({ ...submitForm, name: e.target.value })}
                      placeholder="e.g. Dargah Hazrat Qutbuddin Bakhtiyar Kaki"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                  <div>
                    <label className="block text-emerald-300 mb-1 font-semibold">Associated Saint *</label>
                    <input
                      type="text"
                      required
                      value={submitForm.associatedSaintName}
                      onChange={(e) =>
                        setSubmitForm({ ...submitForm, associatedSaintName: e.target.value })
                      }
                      placeholder="e.g. Khwaja Qutbuddin Bakhtiyar Kaki (RA)"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-emerald-300 mb-1 font-semibold">City *</label>
                    <input
                      type="text"
                      required
                      value={submitForm.city}
                      onChange={(e) => setSubmitForm({ ...submitForm, city: e.target.value })}
                      placeholder="e.g. Mehrauli, Delhi"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                  <div>
                    <label className="block text-emerald-300 mb-1 font-semibold">Country *</label>
                    <input
                      type="text"
                      required
                      value={submitForm.country}
                      onChange={(e) => setSubmitForm({ ...submitForm, country: e.target.value })}
                      placeholder="e.g. India"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                  <div>
                    <label className="block text-emerald-300 mb-1 font-semibold">Spiritual Silsila *</label>
                    <select
                      value={submitForm.spiritualLineage}
                      onChange={(e) =>
                        setSubmitForm({
                          ...submitForm,
                          spiritualLineage: e.target.value as SpiritualLineage
                        })
                      }
                      className="w-full bg-[#031712] border border-white/10 rounded-xl px-2 py-2 text-white focus:outline-none focus:border-amber-400"
                    >
                      {LINEAGES.filter((l) => l !== 'All').map((l) => (
                        <option key={l} value={l}>
                          {l}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-emerald-300 mb-1 font-semibold">GPS Latitude</label>
                    <input
                      type="number"
                      step="any"
                      value={submitForm.latitude || ''}
                      onChange={(e) =>
                        setSubmitForm({ ...submitForm, latitude: parseFloat(e.target.value) || 0 })
                      }
                      placeholder="e.g. 28.5245"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                  <div>
                    <label className="block text-emerald-300 mb-1 font-semibold">GPS Longitude</label>
                    <input
                      type="number"
                      step="any"
                      value={submitForm.longitude || ''}
                      onChange={(e) =>
                        setSubmitForm({ ...submitForm, longitude: parseFloat(e.target.value) || 0 })
                      }
                      placeholder="e.g. 77.1855"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-emerald-300 mb-1 font-semibold">
                    Primary Source Chronicle Reference *
                  </label>
                  <textarea
                    required
                    rows={2}
                    value={submitForm.primarySourceReference}
                    onChange={(e) =>
                      setSubmitForm({ ...submitForm, primarySourceReference: e.target.value })
                    }
                    placeholder="Provide manuscript, classical title, or Waqf registration number (e.g. Siyar al-Awliya by Mir Khwurd, Chapter 3)"
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-2.5 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-emerald-300 mb-1 font-semibold">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      value={submitForm.submitterName}
                      onChange={(e) =>
                        setSubmitForm({ ...submitForm, submitterName: e.target.value })
                      }
                      placeholder="Researcher or Pilgrim Name"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                  <div>
                    <label className="block text-emerald-300 mb-1 font-semibold">Your Email *</label>
                    <input
                      type="email"
                      required
                      value={submitForm.submitterEmail}
                      onChange={(e) =>
                        setSubmitForm({ ...submitForm, submitterEmail: e.target.value })
                      }
                      placeholder="For scholarly confirmation"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <label className="flex items-start gap-2 pt-2 cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    checked={submitForm.licenseConfirmation}
                    onChange={(e) =>
                      setSubmitForm({ ...submitForm, licenseConfirmation: e.target.checked })
                    }
                    className="rounded text-amber-500 focus:ring-0 mt-0.5"
                  />
                  <span className="text-[11px] text-emerald-200/80">
                    I attest that the information supplied is historically verified and granted
                    under Creative Commons / Educational Public Domain for the global Muslim ummah.
                  </span>
                </label>

                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsSubmitExpanded(false)}
                    className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-emerald-950 font-bold shadow-md shadow-amber-500/20 disabled:opacity-50"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit for Scholarly Audit'}
                  </button>
                </div>
              </form>
            )}
          </section>
        )}

        {/* 6. Comprehensive Search, Country Badges & Filter Bar */}
        <section className="space-y-4">
          {/* Top Search Input & View Controls */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
            {/* Search Input */}
            <div className="md:col-span-7 relative">
              <Search className="w-4 h-4 text-emerald-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search shrine, saint (e.g. Imam Ali, Rumi, Garib Nawaz, Tijani), or city..."
                className="w-full bg-white/5 border border-white/15 rounded-2xl pl-10 pr-10 py-2.5 text-sm text-white placeholder-emerald-400/50 focus:outline-none focus:border-amber-400/70 focus:bg-white/10 transition-all shadow-inner"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/50 hover:text-white"
                  title="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* View Mode Toggle & Proximity Sort */}
            <div className="md:col-span-5 flex items-center gap-2">
              {/* Distance Sorter */}
              <button
                onClick={() => setSortByDistance(!sortByDistance)}
                className={`flex-1 py-2.5 px-3 rounded-2xl border text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                  sortByDistance
                    ? 'bg-amber-500/20 border-amber-400/60 text-amber-300 shadow-sm'
                    : 'bg-white/5 border-white/10 text-emerald-200/70 hover:bg-white/10'
                }`}
                title="Toggle distance sorting"
              >
                <Compass className="w-3.5 h-3.5 text-amber-400" />
                <span className="truncate">{sortByDistance ? 'Nearest First' : 'Chronological Era'}</span>
              </button>

              {/* Grid / List View Switcher */}
              <div className="flex items-center bg-black/40 p-1 rounded-2xl border border-white/10">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded-xl transition-all ${
                    viewMode === 'grid' ? 'bg-amber-400 text-emerald-950 font-bold shadow-sm' : 'text-emerald-200/70 hover:text-white'
                  }`}
                  title="Grid View"
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 rounded-xl transition-all ${
                    viewMode === 'list' ? 'bg-amber-400 text-emerald-950 font-bold shadow-sm' : 'text-emerald-200/70 hover:text-white'
                  }`}
                  title="List View"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>

              {/* Expand / Collapse All */}
              {viewMode === 'grid' && (
                <button
                  onClick={toggleAllExpanded}
                  className="py-2.5 px-3 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 text-emerald-200 text-xs font-bold transition-all flex items-center gap-1.5 shrink-0"
                  title={areAllExpanded ? 'Collapse all preview sections' : 'Expand all preview sections'}
                >
                  {areAllExpanded ? (
                    <>
                      <Minimize2 className="w-3.5 h-3.5 text-amber-400" />
                      <span className="hidden sm:inline">Collapse</span>
                    </>
                  ) : (
                    <>
                      <Maximize2 className="w-3.5 h-3.5 text-amber-400" />
                      <span className="hidden sm:inline">Expand</span>
                    </>
                  )}
                </button>
              )}
            </div>
          </div>

          {/* Dynamic Country Filter Badges with Flags & Live Counts */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none text-xs">
            <span className="text-emerald-400/80 font-bold flex items-center gap-1 shrink-0 pl-1">
              <Globe2 className="w-3.5 h-3.5 text-amber-400" />
              <span>Nations:</span>
            </span>
            {uniqueCountries.map((country) => {
              const active = selectedCountry === country;
              const flag = COUNTRY_FLAGS[country] || '🏛️';
              const count = countryCounts[country] || 0;

              return (
                <button
                  key={country}
                  onClick={() => setSelectedCountry(country)}
                  className={`px-3 py-1.5 rounded-full whitespace-nowrap font-bold transition-all flex items-center gap-1.5 ${
                    active
                      ? 'bg-amber-400 text-emerald-950 font-black shadow-md shadow-amber-400/25 scale-[1.02]'
                      : 'bg-white/5 text-emerald-200/85 hover:bg-white/10 hover:text-white border border-white/10'
                  }`}
                >
                  <span>{flag}</span>
                  <span>{country === 'All' ? 'All Nations' : country}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                      active ? 'bg-emerald-950 text-amber-300' : 'bg-black/40 text-emerald-400/70'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Spiritual Lineage (Silsila / Tariqa) Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none text-xs">
            <span className="text-emerald-400/80 font-bold flex items-center gap-1 shrink-0 pl-1">
              <Filter className="w-3.5 h-3.5 text-emerald-400" />
              <span>Lineage:</span>
            </span>
            {LINEAGES.map((lineage) => {
              const active = selectedLineage === lineage;
              return (
                <button
                  key={lineage}
                  onClick={() => setSelectedLineage(lineage)}
                  className={`px-3 py-1 rounded-full whitespace-nowrap font-medium transition-all ${
                    active
                      ? 'bg-emerald-500 text-black font-bold shadow-md shadow-emerald-500/20'
                      : 'bg-white/5 text-emerald-200/80 hover:bg-white/10 hover:text-white border border-white/10'
                  }`}
                >
                  {lineage === 'All' ? 'All Silsilas' : `${lineage}`}
                </button>
              );
            })}
          </div>

          {/* Active Filter Indicators & Reset */}
          {(selectedCountry !== 'All' || selectedLineage !== 'All' || searchQuery) && (
            <div className="flex items-center justify-between text-xs bg-amber-500/10 border border-amber-500/20 rounded-xl px-3 py-2">
              <span className="text-amber-300 font-medium">
                Filtering by:{' '}
                {selectedCountry !== 'All' && <strong>{selectedCountry} • </strong>}
                {selectedLineage !== 'All' && <strong>{selectedLineage} Order • </strong>}
                {searchQuery && <>"{searchQuery}" • </>}
                <span>({filteredDargahs.length} results)</span>
              </span>
              <button
                onClick={() => {
                  setSelectedCountry('All');
                  setSelectedLineage('All');
                  setSearchQuery('');
                }}
                className="text-amber-400 hover:text-amber-200 font-bold underline text-[11px]"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </section>

        {/* 7. Directory List / Grid Render */}
        {filteredDargahs.length === 0 ? (
          <div className="liquid-card rounded-3xl p-12 text-center space-y-4 border border-white/10 max-w-lg mx-auto">
            <Landmark className="w-12 h-12 text-amber-400/50 mx-auto animate-pulse" />
            <h3 className="text-lg font-bold text-white">No Sanctuaries Matched Your Search</h3>
            <p className="text-xs text-emerald-200/70 leading-relaxed">
              We couldn’t find any verified shrines matching your exact filters. Try adjusting the country,
              clearing the search term, or browsing all spiritual lineages.
            </p>
            <button
              onClick={() => {
                setSelectedCountry('All');
                setSelectedLineage('All');
                setSearchQuery('');
              }}
              className="px-4 py-2 rounded-xl bg-amber-500 text-emerald-950 font-bold text-xs shadow-md shadow-amber-500/20"
            >
              Show All Sanctuaries
            </button>
          </div>
        ) : viewMode === 'grid' ? (
          /* Grid View (2 Columns) */
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredDargahs.map((dargah) => {
              const isExpanded = expandedIds[dargah.id] || false;
              const gmapsUrl = getGoogleMapsNavigationUrl(
                dargah.coordinates.latitude,
                dargah.coordinates.longitude,
                dargah.name
              );
              const amapsUrl = getAppleMapsNavigationUrl(
                dargah.coordinates.latitude,
                dargah.coordinates.longitude,
                dargah.name
              );
              const primaryPhoto = dargah.mediaAssets[0];

              return (
                <article
                  key={dargah.id}
                  className="liquid-card rounded-3xl border border-white/15 overflow-hidden flex flex-col justify-between hover:border-amber-400/40 transition-all duration-300 shadow-xl bg-[#031d16]/90 group"
                >
                  <div>
                    {/* Visual Card Banner with Flag & Badges */}
                    <div className="relative h-56 sm:h-64 w-full overflow-hidden bg-black/40">
                      {primaryPhoto ? (
                        <img
                          src={primaryPhoto.url}
                          alt={dargah.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-95"
                          loading="lazy"
                          onError={(e) => {
                            (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=1200&q=85';
                          }}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-emerald-950 text-amber-400">
                          <Landmark className="w-12 h-12 opacity-50" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#02140e] via-[#02140e]/40 to-transparent" />

                      {/* Top Badges */}
                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                        {/* Lineage Badge */}
                        <span className="px-3 py-1 rounded-full bg-emerald-950/80 backdrop-blur-md border border-emerald-500/40 text-emerald-300 text-[11px] font-bold shadow-md">
                          {dargah.spiritualLineage}
                        </span>

                        {/* Country Tag with Flag */}
                        <span className="px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-white text-xs font-bold flex items-center gap-1.5 shadow-md">
                          <span>{COUNTRY_FLAGS[dargah.coordinates.country] || '🏛️'}</span>
                          <span>{dargah.coordinates.country}</span>
                        </span>
                      </div>

                      {/* Bottom Banner Title Overlay */}
                      <div className="absolute bottom-3 left-3 right-3">
                        <span className="text-[10px] uppercase font-bold tracking-widest text-amber-400/90 block mb-0.5">
                          {dargah.primaryHonorific}
                        </span>
                        <h2 className="text-lg sm:text-xl font-black text-white leading-tight">
                          <Link href={`/ziyarat/${dargah.slug}`} className="hover:text-amber-300 transition-colors">
                            {dargah.name}
                          </Link>
                        </h2>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-5 sm:p-6 space-y-4">
                      {/* Arabic and Urdu Typography */}
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
                        <div className="text-right flex-1">
                          <p className="text-sm font-serif text-amber-200/90 dir-rtl font-semibold" dir="rtl">
                            {dargah.arabicName}
                          </p>
                          <p className="text-xs font-serif text-emerald-300/80 dir-rtl" dir="rtl">
                            {dargah.urduName}
                          </p>
                        </div>
                      </div>

                      {/* Location & Proximity Indicators */}
                      <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                        <div className="flex items-center gap-1.5 text-emerald-300 font-medium">
                          <MapPin className="w-3.5 h-3.5 text-red-400 shrink-0" />
                          <span>
                            {dargah.coordinates.city}, {dargah.coordinates.stateProvince}
                          </span>
                        </div>

                        {dargah.distanceKm !== undefined && (
                          <div className="flex items-center gap-1 text-[11px] px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30 font-bold">
                            <Compass className="w-3 h-3 text-amber-400" />
                            <span>{dargah.distanceKm.toLocaleString()} km away</span>
                          </div>
                        )}
                      </div>

                      {/* Historical Brief */}
                      <p className="text-xs text-emerald-100/85 leading-relaxed">
                        {dargah.historicalSummary}
                      </p>

                      {/* Urs & Visiting Hours Pill Strip */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                        <div className="flex items-center gap-2 p-2 rounded-xl bg-white/5 border border-white/10 text-emerald-200">
                          <Calendar className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                          <span className="truncate">
                            <strong>Urs:</strong> {dargah.ursEvent.hijriDayStart}-{dargah.ursEvent.hijriDayEnd} {dargah.ursEvent.hijriMonthName}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 p-2 rounded-xl bg-white/5 border border-white/10 text-emerald-200">
                          <Clock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span className="truncate">
                            <strong>Open:</strong> {dargah.visitingInfo.visitingHours.split('(')[0]}
                          </span>
                        </div>
                      </div>

                      {/* Inline Collapsible Preview */}
                      {isExpanded && (
                        <div className="pt-3 border-t border-white/10 space-y-3 text-xs animate-in fade-in duration-300">
                          {/* Full Chronicle */}
                          <div className="space-y-1">
                            <h4 className="font-bold text-amber-300 flex items-center gap-1.5">
                              <BookOpen className="w-3.5 h-3.5" />
                              <span>Historical Chronicle</span>
                            </h4>
                            <p className="text-emerald-100/80 leading-relaxed text-[11px]">
                              {dargah.detailedChronicle}
                            </p>
                          </div>

                          {/* Visiting Adab */}
                          <div className="space-y-1">
                            <h4 className="font-bold text-emerald-300 flex items-center gap-1.5">
                              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                              <span>Visiting Adab & Etiquette</span>
                            </h4>
                            <ul className="space-y-1 text-[11px] text-emerald-200/80 pl-2">
                              {dargah.visitingInfo.etiquetteAndAdab.slice(0, 3).map((adab, idx) => (
                                <li key={idx} className="flex items-start gap-1.5">
                                  <span className="text-amber-400">•</span>
                                  <span>{adab}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Sources Attribution */}
                          <div className="p-2.5 rounded-xl bg-black/40 border border-white/10 text-[10px] text-emerald-300/80">
                            <strong>Primary Source:</strong> {dargah.sourceCitations[0]?.workTitle} by {dargah.sourceCitations[0]?.author} ({dargah.sourceCitations[0]?.originalPublicationYearHijriOrCe})
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Card Actions Footer */}
                  <div className="p-4 sm:p-5 bg-black/30 border-t border-white/10 flex flex-wrap items-center justify-between gap-2">
                    {/* Dedicated Page Link */}
                    <Link
                      href={`/ziyarat/${dargah.slug}`}
                      className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-emerald-950 text-xs font-black transition-all flex items-center gap-1.5 shadow-md shadow-amber-500/20 hover:scale-105"
                    >
                      <span>Explore Dedicated Sanctuary Page</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>

                    <div className="flex items-center gap-1.5">
                      {/* Inline Expand Toggle */}
                      <button
                        onClick={() => toggleExpand(dargah.id)}
                        className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-emerald-200 transition-colors"
                        title={isExpanded ? 'Collapse preview' : 'Expand preview'}
                      >
                        {isExpanded ? <ChevronUp className="w-4 h-4 text-amber-400" /> : <ChevronDown className="w-4 h-4" />}
                      </button>

                      {/* Direct Google Maps */}
                      <a
                        href={gmapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-emerald-200 hover:text-amber-300 transition-colors"
                        title="Open in Google Maps Navigation"
                      >
                        <Navigation className="w-4 h-4 text-emerald-400" />
                      </a>

                      {/* Share Button */}
                      <button
                        onClick={() => handleShare(dargah)}
                        className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-emerald-200 hover:text-amber-300 transition-colors"
                        title="Share Sanctuary Link"
                      >
                        {copiedSlug === dargah.slug ? (
                          <Check className="w-4 h-4 text-emerald-400" />
                        ) : (
                          <Share2 className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          /* List View (Table / Compact directory) */
          <div className="liquid-card rounded-3xl border border-white/15 overflow-hidden shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-black/60 border-b border-white/15 text-emerald-300 font-bold uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="p-4">Sanctuary & Saint</th>
                    <th className="p-4">Nation & City</th>
                    <th className="p-4">Spiritual Silsila</th>
                    <th className="p-4">Annual Urs</th>
                    <th className="p-4">Distance</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {filteredDargahs.map((dargah) => {
                    const gmapsUrl = getGoogleMapsNavigationUrl(
                      dargah.coordinates.latitude,
                      dargah.coordinates.longitude,
                      dargah.name
                    );

                    return (
                      <tr key={dargah.id} className="hover:bg-white/5 transition-colors">
                        <td className="p-4">
                          <Link
                            href={`/ziyarat/${dargah.slug}`}
                            className="font-bold text-white hover:text-amber-300 transition-colors block text-sm"
                          >
                            {dargah.name}
                          </Link>
                          <span className="text-[10px] text-amber-400/80 font-serif block">
                            {dargah.primaryHonorific}
                          </span>
                        </td>
                        <td className="p-4 text-emerald-100/90 whitespace-nowrap">
                          <span className="mr-1.5">{COUNTRY_FLAGS[dargah.coordinates.country] || '🏛️'}</span>
                          <span>{dargah.coordinates.city}, {dargah.coordinates.country}</span>
                        </td>
                        <td className="p-4">
                          <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-semibold text-[11px] whitespace-nowrap">
                            {dargah.spiritualLineage}
                          </span>
                        </td>
                        <td className="p-4 text-emerald-200/80 whitespace-nowrap text-[11px]">
                          {dargah.ursEvent.hijriDayStart}-{dargah.ursEvent.hijriDayEnd} {dargah.ursEvent.hijriMonthName}
                        </td>
                        <td className="p-4 whitespace-nowrap font-mono text-[11px] text-amber-300">
                          {dargah.distanceKm !== undefined ? `${dargah.distanceKm.toLocaleString()} km` : '—'}
                        </td>
                        <td className="p-4 text-right whitespace-nowrap">
                          <div className="flex items-center justify-end gap-2">
                            <a
                              href={gmapsUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-emerald-300 hover:text-white"
                              title="Navigate via Google Maps"
                            >
                              <Navigation className="w-3.5 h-3.5" />
                            </a>
                            <Link
                              href={`/ziyarat/${dargah.slug}`}
                              className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-emerald-950 font-black text-xs shadow-sm"
                            >
                              Details
                            </Link>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      {/* Universal Footer */}
      <Footer />
    </div>
  );
}
