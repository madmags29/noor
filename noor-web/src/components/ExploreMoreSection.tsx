'use client';

// ============================================================
// NOOR Web — Explore More Islamic Practice & Knowledge Pillars
// Liquid Glass UI/UX with Multi-Category Filtering & 10 Deen Pillars
// ============================================================

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Compass,
  BookOpen,
  Heart,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Coins,
  MapPin,
  Smile,
  Plane,
  Baby,
  BookmarkCheck
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

type PillarCategory = 'all' | 'worship' | 'journeys' | 'family';

interface PillarItem {
  id: string;
  category: 'worship' | 'journeys' | 'family';
  icon3d: string;
  titleKey: string;
  titleFallback: string;
  descKey: string;
  descFallback: string;
  href: string;
  badgeKeys: string[];
  badges: string[];
  gradient: string;
  accentBorder: string;
}

export const ExploreMoreSection: React.FC = () => {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<PillarCategory>('all');

  const pillars: PillarItem[] = [
    {
      id: 'guides',
      category: 'worship',
      icon3d: '🧎‍♂️',
      titleKey: 'guides',
      titleFallback: 'Prayer & Purification Guides',
      descKey: 'guidesDesc',
      descFallback: 'Step-by-step Wudu, Ghusl, Salah unit-by-unit with 4 Sunni Madhabs, Sunnah prayers & missed prayer journal.',
      href: '/guides',
      badgeKeys: ['stepByStepSalah', 'fourMadhabs', 'qadaJournal'],
      badges: ['Step-by-Step Salah', '4 Sunni Madhabs', 'Qada Journal'],
      gradient: 'from-emerald-500/10 via-emerald-600/5 to-transparent',
      accentBorder: 'hover:border-emerald-500/50'
    },
    {
      id: 'hajj-umrah',
      category: 'journeys',
      icon3d: '🕋',
      titleKey: 'hajjUmrah',
      titleFallback: 'Hajj & Umrah Pilgrimage Portal',
      descKey: 'hajjUmrahDesc',
      descFallback: 'Complete visual pilgrim rites from Miqat and Ihram to Tawaf, Sa\'i, Arafat, Jamarat, packing checklists & maps.',
      href: '/hajj-umrah',
      badgeKeys: ['miqatIhram', 'tawafSai', 'packingList'],
      badges: ['Miqat & Ihram', 'Tawaf & Sa\'i Steps', 'Offline Packing List'],
      gradient: 'from-amber-500/10 via-amber-600/5 to-transparent',
      accentBorder: 'hover:border-amber-500/50'
    },
    {
      id: 'zakat',
      category: 'worship',
      icon3d: '🪙',
      titleKey: 'zakatHub',
      titleFallback: 'Zakat & Sadaqah Hub',
      descKey: 'zakatHubDesc',
      descFallback: 'Dynamic 2.5% wealth calculation priced in your current country currency with live Gold/Silver Nisab and 9 charity channels.',
      href: '/zakat',
      badgeKeys: ['countryCurrency', 'liveNisab', 'nineSadaqah'],
      badges: ['Country Currency', 'Live Nisab Standard', '9 Sadaqah Channels'],
      gradient: 'from-amber-500/10 via-emerald-600/5 to-transparent',
      accentBorder: 'hover:border-amber-400/50'
    },
    {
      id: 'janazah',
      category: 'worship',
      icon3d: '🕊️',
      titleKey: 'janazah',
      titleFallback: 'Salatul Janazah & Bereavement',
      descKey: 'janazahDesc',
      descFallback: 'Dignified funeral prayer guide with 4 Takbeers, adult & child supplications, shrouding (Kafan), Ghusl & condolence fiqh.',
      href: '/janazah',
      badgeKeys: ['takbeerGuide', 'adultChildDuas', 'burialSunnah'],
      badges: ['4 Takbeers Guide', 'Adult & Child Duas', 'Burial Sunnahs'],
      gradient: 'from-teal-500/10 via-emerald-600/5 to-transparent',
      accentBorder: 'hover:border-teal-400/50'
    },
    {
      id: 'ziyarat',
      category: 'journeys',
      icon3d: '🏛️',
      titleKey: 'sanctuariesDirectory',
      titleFallback: 'Sacred Ziyarat & Dargahs',
      descKey: 'ziyaratDesc',
      descFallback: '31 revered historical sanctuaries across Makkah, Madinah, Jerusalem, Karbala, Najaf, Delhi, Ajmer, Istanbul with GPS & visitation etiquette.',
      href: '/ziyarat',
      badgeKeys: ['sanctuariesDirectory', 'visitingEtiquette', 'allNations'],
      badges: ['31 Holy Shrines', 'GPS & Visiting Adab', 'Classical Awliya'],
      gradient: 'from-emerald-500/10 via-amber-500/5 to-transparent',
      accentBorder: 'hover:border-emerald-400/50'
    },
    {
      id: 'travel',
      category: 'worship',
      icon3d: '✈️',
      titleKey: 'travelMode',
      titleFallback: 'Travel Mode & Qasr Guide',
      descKey: 'travelModeDesc',
      descFallback: 'Authoritative rules for traveling Muslims: 77km (48 miles) Safar distance, shortening 4-Rak\'ah prayers to 2 & traveler duas.',
      href: '/travel',
      badgeKeys: ['safarLimit', 'qasrRules', 'travelerDuas'],
      badges: ['77 km Safar Limit', 'Qasr Shortening', 'Traveler Duas'],
      gradient: 'from-sky-500/10 via-emerald-600/5 to-transparent',
      accentBorder: 'hover:border-sky-400/50'
    },
    {
      id: 'nikah',
      category: 'family',
      icon3d: '💍',
      titleKey: 'nikah',
      titleFallback: 'Islamic Nikah & Family Guide',
      descKey: 'nikahDesc',
      descFallback: 'Essential marital fiqh: 5 mandatory pillars, Mahr guidelines, Khutbat al-Hajah, valid consent & prophetic marital etiquette.',
      href: '/nikah',
      badgeKeys: ['nikahPillars', 'mahrGuide', 'propheticSunnah'],
      badges: ['5 Nikah Pillars', 'Mahr Guidelines', 'Prophetic Sunnahs'],
      gradient: 'from-rose-500/10 via-amber-500/5 to-transparent',
      accentBorder: 'hover:border-rose-400/50'
    },
    {
      id: 'etiquette',
      category: 'family',
      icon3d: '🌸',
      titleKey: 'etiquette',
      titleFallback: 'Daily Islamic Etiquette (Adab)',
      descKey: 'etiquetteDesc',
      descFallback: 'Prophetic manners across 13 domains of life: food, water, speech, sleep, parents, neighbors, gratitude & good character.',
      href: '/etiquette',
      badgeKeys: ['thirteenDomains', 'sunnahEating', 'nobleAkhlaq'],
      badges: ['13 Life Domains', 'Sunnah Eating/Drinking', 'Noble Akhlaq'],
      gradient: 'from-emerald-500/10 via-teal-500/5 to-transparent',
      accentBorder: 'hover:border-emerald-400/50'
    },
    {
      id: 'kids',
      category: 'family',
      icon3d: '🌟',
      titleKey: 'kids',
      titleFallback: 'NOOR Kids & Family Learning',
      descKey: 'kidsDesc',
      descFallback: 'Engaging Islamic learning for the next generation: 28 Arabic letters with audio, inspiring Prophet stories & interactive quizzes.',
      href: '/kids',
      badgeKeys: ['arabicLetters', 'prophetStories', 'interactiveQuizzes'],
      badges: ['Arabic Alphabet', 'Stories of Prophets', 'Family Quizzes'],
      gradient: 'from-amber-500/10 via-yellow-500/5 to-transparent',
      accentBorder: 'hover:border-amber-400/50'
    },
    {
      id: 'qibla',
      category: 'journeys',
      icon3d: '🧭',
      titleKey: 'qibla',
      titleFallback: 'Spherical Qibla Compass',
      descKey: 'qiblaDesc',
      descFallback: 'High-precision Great-Circle forward azimuth pointing directly towards the Holy Kaaba in Makkah with live sensor calibration.',
      href: '/qibla',
      badgeKeys: ['sphericalAzimuth', 'trueNorthCompass', 'globalGps'],
      badges: ['Spherical Azimuth', 'True North Compass', 'Global GPS'],
      gradient: 'from-emerald-500/10 via-amber-500/5 to-transparent',
      accentBorder: 'hover:border-emerald-400/50'
    }
  ];

  const filteredPillars = pillars.filter(p => {
    if (activeCategory === 'all') return true;
    return p.category === activeCategory;
  });

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full relative">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold tracking-wide shadow-sm">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{t('quickEssentials') || '10 Verified Deen Pillars'}</span>
        </div>
        
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
          {t('explorePillars') || 'Explore Islamic Knowledge & Practice'}
        </h2>

        <p className="text-sm sm:text-base text-emerald-200/70 leading-relaxed">
          {t('explorePillarsSubtitle') || 'Step-by-step fiqh guides, global ziyarat catalog, country currency zakat engine, and prophetic life companions.'}
        </p>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
          {[
            { id: 'all', label: t('pillarFilterAll') || 'All Pillars' },
            { id: 'worship', label: t('filterWorship') || 'Worship & Fiqh' },
            { id: 'journeys', label: t('filterJourneys') || 'Sacred Journeys' },
            { id: 'family', label: t('filterFamily') || 'Family & Daily Life' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveCategory(tab.id as PillarCategory)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeCategory === tab.id
                  ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20 scale-105'
                  : 'bg-[#031d16]/80 text-zinc-400 hover:text-white hover:bg-white/10 border border-white/10'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPillars.map(pillar => {
          const title = t(pillar.titleKey) !== pillar.titleKey ? t(pillar.titleKey) : pillar.titleFallback;
          const desc = t(pillar.descKey) !== pillar.descKey ? t(pillar.descKey) : pillar.descFallback;

          return (
            <Link
              key={pillar.id}
              href={pillar.href}
              className={`group flex flex-col justify-between p-6 rounded-2xl bg-[#031d16]/80 backdrop-blur-xl border border-white/10 ${pillar.accentBorder} transition-all duration-300 hover:shadow-2xl hover:shadow-black/60 hover:-translate-y-1 relative overflow-hidden`}
            >
              {/* Subtle Ambient Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${pillar.gradient} pointer-events-none opacity-60 group-hover:opacity-100 transition-opacity`} />

              <div className="relative z-10 space-y-4">
                {/* Header Icon & Badges */}
                <div className="flex items-start justify-between gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-black/40 border border-white/15 flex items-center justify-center text-2xl shadow-inner group-hover:scale-110 transition-transform">
                    {pillar.icon3d}
                  </div>
                  
                  <div className="flex flex-wrap justify-end gap-1.5">
                    {pillar.badges.slice(0, 2).map((badge, idx) => {
                      const badgeKey = pillar.badgeKeys ? pillar.badgeKeys[idx] : null;
                      const label = badgeKey && t(badgeKey) !== badgeKey ? t(badgeKey) : badge;
                      return (
                        <span
                          key={idx}
                          className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-white/5 border border-white/10 text-amber-300/90 tracking-wide"
                        >
                          {label}
                        </span>
                      );
                    })}
                  </div>
                </div>

                {/* Title & Description */}
                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors tracking-tight">
                    {title}
                  </h3>
                  <p className="text-xs text-zinc-300/80 leading-relaxed mt-1.5 line-clamp-3">
                    {desc}
                  </p>
                </div>
              </div>

              {/* Bottom Action Row */}
              <div className="relative z-10 pt-4 mt-4 border-t border-white/10 flex items-center justify-between text-xs">
                <span className="text-[11px] text-emerald-400 group-hover:text-amber-300 transition-colors font-medium tracking-wide">
                  {pillar.badgeKeys && pillar.badgeKeys[2] && t(pillar.badgeKeys[2]) !== pillar.badgeKeys[2]
                    ? t(pillar.badgeKeys[2])
                    : (pillar.badges[2] || t('verifiedFiqh') || 'Verified Fiqh')}
                </span>
                <span className="flex items-center gap-1 font-bold text-amber-400 group-hover:translate-x-1 transition-transform">
                  <span>{t('explore') || 'Explore'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};
