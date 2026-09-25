'use client';

// ============================================================
// NOOR Web — Dedicated Holy Quran Platform (All 114 Surahs)
// Professional Switch: "Read in One Go" (Mushaf Tilawat) & "Verse by Verse"
// Complete Ayahs, Cloudflare Audio Engine & Zero-Popup In-Page Reader
// ============================================================

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  BookOpen,
  ArrowLeft,
  Search,
  Volume2,
  VolumeX,
  Play,
  Pause,
  Bookmark,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Share2,
  Check,
  CheckCircle2,
  RotateCcw,
  Type,
  Headphones,
  Sliders,
  AlignJustify,
  List,
  Eye,
  Settings2,
  Compass
} from 'lucide-react';
import {
  SURAHS_LIST,
  RECITERS_LIST,
  SurahItem,
  AyahItem,
  getSurahAudioUrl,
  getAyahAudioUrl,
  fetchSurahVerses
} from '../../lib/quranData';
import { GlobalNavbar } from '../../components/GlobalNavbar';
import { Footer } from '../../components/Footer';
import { useLanguage } from '../../context/LanguageContext';

function toEasternArabicNumerals(num: number): string {
  const digits = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
  return num.toString().split('').map(d => digits[parseInt(d, 10)]).join('');
}

export default function QuranPage() {
  const { t, language } = useLanguage();

  // Search & Filter
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRev, setSelectedRev] = useState<'All' | 'Meccan' | 'Medinan'>('All');

  // Active Reading State
  const [activeSurah, setActiveSurah] = useState<SurahItem | null>(null);
  const [verses, setVerses] = useState<AyahItem[]>([]);
  const [loadingVerses, setLoadingVerses] = useState(false);
  const [selectedReciter, setSelectedReciter] = useState(RECITERS_LIST[0].id);

  // Professional Reading Mode Switch: 'continuous' (Read in One Go) vs 'verseByVerse'
  const [readingMode, setReadingMode] = useState<'continuous' | 'verseByVerse'>('continuous');
  const [hoveredAyah, setHoveredAyah] = useState<number | null>(null);
  const [showContinuousTranslation, setShowContinuousTranslation] = useState(true);

  // Audio Player State (Full Surah)
  const [isPlayingSurah, setIsPlayingSurah] = useState(false);
  const [surahAudioProgress, setSurahAudioProgress] = useState(0);
  const [surahCurrentTime, setSurahCurrentTime] = useState('00:00');
  const [surahDuration, setSurahDuration] = useState('00:00');
  const surahAudioRef = useRef<HTMLAudioElement | null>(null);

  // Ayah Audio State
  const [playingAyahNumber, setPlayingAyahNumber] = useState<number | null>(null);
  const ayahAudioRef = useRef<HTMLAudioElement | null>(null);

  // UI Settings
  const [fontSize, setFontSize] = useState<'sm' | 'md' | 'lg' | 'xl'>('lg');
  const [showUrdu, setShowUrdu] = useState(false);
  const [copiedAyah, setCopiedAyah] = useState<number | null>(null);

  // Last-Read Position State
  const [lastRead, setLastRead] = useState<{ surahNumber: number; surahName: string; ayah: number } | null>(null);

  // Load saved last-read and check URL params on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('@noor_quran_last_read');
      if (saved) setLastRead(JSON.parse(saved));
      const savedMode = localStorage.getItem('@noor_quran_reading_mode') as 'continuous' | 'verseByVerse';
      if (savedMode) setReadingMode(savedMode);
    } catch {}

    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const surahParam = params.get('surah');
      if (surahParam) {
        const num = parseInt(surahParam, 10);
        const found = SURAHS_LIST.find(s => s.number === num);
        if (found) {
          openSurah(found, 1, false);
        }
      }
    }
  }, []);

  // Cleanup audio on unmount
  useEffect(() => {
    return () => {
      stopAllAudio();
    };
  }, []);

  const setAndSaveReadingMode = (mode: 'continuous' | 'verseByVerse') => {
    setReadingMode(mode);
    try {
      localStorage.setItem('@noor_quran_reading_mode', mode);
    } catch {}
  };

  const stopAllAudio = () => {
    if (surahAudioRef.current) {
      surahAudioRef.current.pause();
      surahAudioRef.current = null;
    }
    if (ayahAudioRef.current) {
      ayahAudioRef.current.pause();
      ayahAudioRef.current = null;
    }
    setIsPlayingSurah(false);
    setPlayingAyahNumber(null);
    setSurahAudioProgress(0);
  };

  const formatTime = (secs: number) => {
    if (isNaN(secs) || secs === 0) return '00:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const openSurah = async (surah: SurahItem, ayah = 1, updateUrl = true) => {
    stopAllAudio();
    setActiveSurah(surah);
    setLoadingVerses(true);
    setHoveredAyah(null);

    if (updateUrl && typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set('surah', surah.number.toString());
      window.history.pushState(null, '', url.toString());
    }

    const readPos = { surahNumber: surah.number, surahName: surah.englishName, ayah };
    setLastRead(readPos);
    try {
      localStorage.setItem('@noor_quran_last_read', JSON.stringify(readPos));
    } catch {}

    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    try {
      const ayahsList = await fetchSurahVerses(surah.number);
      setVerses(ayahsList);
    } catch (err) {
      console.error('Error loading surah verses:', err);
    } finally {
      setLoadingVerses(false);
    }
  };

  const closeReader = () => {
    stopAllAudio();
    setActiveSurah(null);
    setVerses([]);
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.delete('surah');
      window.history.pushState(null, '', url.toString());
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const navigateSurah = (direction: 'next' | 'prev') => {
    if (!activeSurah) return;
    const targetNum = direction === 'next' ? activeSurah.number + 1 : activeSurah.number - 1;
    const nextS = SURAHS_LIST.find(s => s.number === targetNum);
    if (nextS) {
      openSurah(nextS, 1);
    }
  };

  // Toggle Full Surah Audio
  const toggleSurahAudio = () => {
    if (!activeSurah) return;

    if (ayahAudioRef.current) {
      ayahAudioRef.current.pause();
      setPlayingAyahNumber(null);
    }

    if (isPlayingSurah && surahAudioRef.current) {
      surahAudioRef.current.pause();
      setIsPlayingSurah(false);
      return;
    }

    if (surahAudioRef.current) {
      surahAudioRef.current.play().catch(e => console.log('Audio resume error', e));
      setIsPlayingSurah(true);
      return;
    }

    const audioUrl = getSurahAudioUrl(activeSurah.number, selectedReciter);
    const audio = new Audio(audioUrl);
    surahAudioRef.current = audio;

    audio.onloadedmetadata = () => {
      setSurahDuration(formatTime(audio.duration));
    };

    audio.ontimeupdate = () => {
      if (audio.duration) {
        const pct = (audio.currentTime / audio.duration) * 100;
        setSurahAudioProgress(pct);
        setSurahCurrentTime(formatTime(audio.currentTime));
      }
    };

    audio.onended = () => {
      setIsPlayingSurah(false);
      setSurahAudioProgress(0);
      setSurahCurrentTime('00:00');
      // Auto-advance to next Surah in continuous mode
      if (activeSurah && activeSurah.number < 114) {
        navigateSurah('next');
      }
    };

    audio.onerror = () => {
      setIsPlayingSurah(false);
      console.warn('Audio streaming encountered an error');
    };

    audio.play().catch(e => {
      console.log('Audio playback prevented or error', e);
      setIsPlayingSurah(false);
    });
    setIsPlayingSurah(true);
  };

  const handleSeekSurah = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!surahAudioRef.current || !surahAudioRef.current.duration) return;
    const val = parseFloat(e.target.value);
    const seekTime = (val / 100) * surahAudioRef.current.duration;
    surahAudioRef.current.currentTime = seekTime;
    setSurahAudioProgress(val);
  };

  // Toggle Individual Ayah Audio
  const toggleAyahAudio = (ayahNumber: number) => {
    if (!activeSurah) return;

    if (surahAudioRef.current) {
      surahAudioRef.current.pause();
      setIsPlayingSurah(false);
    }

    if (playingAyahNumber === ayahNumber && ayahAudioRef.current) {
      ayahAudioRef.current.pause();
      setPlayingAyahNumber(null);
      return;
    }

    if (ayahAudioRef.current) {
      ayahAudioRef.current.pause();
    }

    const url = getAyahAudioUrl(activeSurah.number, ayahNumber);
    const audio = new Audio(url);
    ayahAudioRef.current = audio;

    audio.onended = () => {
      setPlayingAyahNumber(null);
    };

    audio.onerror = () => {
      setPlayingAyahNumber(null);
    };

    audio.play().catch(e => {
      console.log('Ayah audio error', e);
      setPlayingAyahNumber(null);
    });
    setPlayingAyahNumber(ayahNumber);
  };

  const handleCopyAyah = (ayah: AyahItem) => {
    if (!activeSurah) return;
    const trans = getVerseTranslation(ayah);
    const text = `${ayah.arabic}\n\n"${trans}"\n\n— Surah ${activeSurah.englishName} (${activeSurah.number}:${ayah.number}) [via NOOR]`;
    navigator.clipboard.writeText(text);
    setCopiedAyah(ayah.number);
    setTimeout(() => setCopiedAyah(null), 2000);
  };

  const getVerseTranslation = (ayah: AyahItem) => {
    if (showUrdu) return ayah.translationUr || ayah.translation;
    if (language === 'hi' && ayah.translationHi) return ayah.translationHi;
    if (language === 'ur' && ayah.translationUr) return ayah.translationUr;
    return ayah.translation;
  };

  const filteredSurahs = SURAHS_LIST.filter(s => {
    const clean = searchTerm.trim().toLowerCase();
    const matchQ =
      !clean ||
      s.englishName.toLowerCase().includes(clean) ||
      s.englishNameTranslation.toLowerCase().includes(clean) ||
      s.name.includes(clean) ||
      s.number.toString() === clean;
    const matchR = selectedRev === 'All' || s.revelationType === selectedRev;
    return matchQ && matchR;
  });

  const fontSizeClasses = {
    sm: 'text-xl sm:text-2xl leading-[2.2]',
    md: 'text-2xl sm:text-3xl leading-[2.5]',
    lg: 'text-3xl sm:text-4xl leading-[2.8]',
    xl: 'text-4xl sm:text-5xl leading-[3.1]'
  };

  const currentHoveredAyahItem = hoveredAyah ? verses.find(v => v.number === hoveredAyah) : null;

  return (
    <div className="min-h-screen bg-[#02120d] text-white flex flex-col selection:bg-amber-500 selection:text-black relative overflow-hidden">
      {/* Background Atmosphere */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=1920&q=80"
          alt="Noble Quran Manuscript Illumination"
          className="w-full h-full object-cover object-top opacity-[0.07] mix-blend-luminosity filter saturate-150"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#02120d]/90 via-[#02120d]/85 to-[#02120d]" />
      </div>

      {/* Universal Global Navigation Dock */}
      <GlobalNavbar />

      {/* ============================================================ */}
      {/* VIEW A: DEDICATED IN-PAGE QURAN READER (NO POPUP MODAL!)      */}
      {/* ============================================================ */}
      {activeSurah ? (
        <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 py-6 sm:py-8 space-y-6">
          {/* Top Sticky Reader Header & Professional Switch Toolbar */}
          <div className="sticky top-20 z-30 liquid-glass rounded-3xl p-4 sm:p-5 border border-white/15 shadow-2xl backdrop-blur-2xl">
            <div className="flex flex-wrap items-center justify-between gap-3">
              {/* Left: Back Button & Instant 114 Surahs Dropdown Switcher */}
              <div className="flex items-center gap-3">
                <button
                  onClick={closeReader}
                  className="px-3.5 py-2 rounded-2xl bg-white/10 hover:bg-white/20 text-emerald-200 hover:text-white transition-all text-xs font-bold flex items-center gap-1.5 shadow-sm"
                  title="Return to 114 Surahs catalog"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>{t('filterAll')} (114)</span>
                </button>

                {/* Professional Instant Surah Switcher Dropdown */}
                <div className="relative">
                  <select
                    value={activeSurah.number}
                    onChange={(e) => {
                      const num = parseInt(e.target.value, 10);
                      const target = SURAHS_LIST.find(s => s.number === num);
                      if (target) openSurah(target);
                    }}
                    className="bg-[#031d16] border border-amber-400/40 rounded-2xl px-3.5 py-2 text-xs sm:text-sm font-black text-white hover:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400 cursor-pointer shadow-md pr-8"
                  >
                    {SURAHS_LIST.map(s => (
                      <option key={s.number} value={s.number} className="bg-[#02120d] text-white">
                        {s.number}. {s.englishName} ({s.name}) — {s.numberOfAyahs} v.
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Center/Right: THE PROFESSIONAL MODE SWITCH (Read in One Go vs Verse by Verse) */}
              <div className="flex items-center bg-black/60 p-1 rounded-2xl border border-amber-400/40 shadow-inner">
                <button
                  type="button"
                  onClick={() => setAndSaveReadingMode('continuous')}
                  className={`px-3 sm:px-4 py-1.5 rounded-xl text-xs font-black flex items-center gap-1.5 transition-all ${
                    readingMode === 'continuous'
                      ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-black shadow-lg shadow-amber-400/20'
                      : 'text-emerald-200 hover:text-white'
                  }`}
                  title="Read complete Surah in one continuous flowing Mushaf view"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">एक साथ पढ़ें</span>
                  <span>(Read in One Go)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setAndSaveReadingMode('verseByVerse')}
                  className={`px-3 sm:px-4 py-1.5 rounded-xl text-xs font-black flex items-center gap-1.5 transition-all ${
                    readingMode === 'verseByVerse'
                      ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-black shadow-lg shadow-amber-400/20'
                      : 'text-emerald-200 hover:text-white'
                  }`}
                  title="Study verse by verse with individual cards"
                >
                  <List className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">आयत दर आयत</span>
                  <span>(Verse by Verse)</span>
                </button>
              </div>

              {/* Surah Prev / Next Navigator */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => navigateSurah('prev')}
                  disabled={activeSurah.number <= 1}
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-emerald-200 disabled:opacity-30 disabled:pointer-events-none"
                  title="Previous Surah"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => navigateSurah('next')}
                  disabled={activeSurah.number >= 114}
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-emerald-200 disabled:opacity-30 disabled:pointer-events-none"
                  title="Next Surah"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Audio Dock & Preferences Bar */}
            <div className="mt-4 pt-3.5 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
              {/* Audio Controls */}
              <div className="flex flex-wrap items-center gap-2.5 flex-1 min-w-[280px]">
                <button
                  onClick={toggleSurahAudio}
                  className={`px-4 py-2 rounded-2xl text-xs font-black flex items-center gap-2 transition-all shadow-lg ${
                    isPlayingSurah
                      ? 'bg-amber-400 text-black border border-amber-300 animate-pulse'
                      : 'bg-amber-500 hover:bg-amber-400 text-black border border-amber-400/50'
                  }`}
                >
                  {isPlayingSurah ? <Pause className="w-4 h-4 fill-black" /> : <Play className="w-4 h-4 fill-black" />}
                  <span>{isPlayingSurah ? t('pauseRecitation') : t('listenRecitation')}</span>
                </button>

                {/* Reciter Selector */}
                <select
                  value={selectedReciter}
                  onChange={(e) => {
                    setSelectedReciter(e.target.value);
                    if (isPlayingSurah) {
                      stopAllAudio();
                    }
                  }}
                  className="bg-black/50 border border-white/15 rounded-xl px-2.5 py-1.5 text-xs text-amber-300 font-bold focus:outline-none"
                >
                  {RECITERS_LIST.map(r => (
                    <option key={r.id} value={r.id} className="bg-[#02120d] text-white">
                      {r.name}
                    </option>
                  ))}
                </select>

                {/* Audio Progress Scrubber */}
                <div className="flex items-center gap-2 flex-1 min-w-[140px]">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={surahAudioProgress}
                    onChange={handleSeekSurah}
                    className="w-full accent-amber-400 h-1.5 rounded-lg bg-black/40 cursor-pointer"
                  />
                  <span className="text-[10px] font-mono text-emerald-300/80 whitespace-nowrap">
                    {surahCurrentTime} / {surahDuration}
                  </span>
                </div>
              </div>

              {/* Text Size & Translation Toggles */}
              <div className="flex items-center gap-2">
                {/* Font Size Pills */}
                <div className="flex items-center bg-black/40 rounded-xl p-1 border border-white/10 text-[11px] font-bold">
                  {(['sm', 'md', 'lg', 'xl'] as const).map(sz => (
                    <button
                      key={sz}
                      onClick={() => setFontSize(sz)}
                      className={`px-2 py-0.5 rounded-lg transition-all ${
                        fontSize === sz ? 'bg-amber-400 text-black' : 'text-emerald-300 hover:text-white'
                      }`}
                    >
                      {sz.toUpperCase()}
                    </button>
                  ))}
                </div>

                {/* Urdu Translation Toggle */}
                <button
                  onClick={() => setShowUrdu(!showUrdu)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                    showUrdu
                      ? 'bg-emerald-500 text-black border-emerald-400'
                      : 'bg-white/5 border-white/10 text-emerald-200 hover:text-amber-300'
                  }`}
                >
                  {showUrdu ? (language === 'hi' ? 'हिंदी अनुवाद' : 'English') : 'اردو'}
                </button>

                {/* In One Go: Toggle Translation Visibility */}
                {readingMode === 'continuous' && (
                  <button
                    onClick={() => setShowContinuousTranslation(!showContinuousTranslation)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                      showContinuousTranslation
                        ? 'bg-amber-500/20 text-amber-300 border-amber-400/40'
                        : 'bg-white/5 border-white/10 text-emerald-300/70 hover:text-white'
                    }`}
                    title="Toggle translation display in One-Go view"
                  >
                    <Eye className="w-3.5 h-3.5 inline mr-1" />
                    <span>{showContinuousTranslation ? 'Hide Translation' : 'Show Translation'}</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Surah Header Information Card */}
          <div className="text-center py-6 px-4 rounded-3xl bg-gradient-to-b from-[#03241b]/60 via-[#03241b]/30 to-transparent border border-white/10 relative overflow-hidden">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono mb-2">
              <span>Surah #{activeSurah.number}</span>
              <span>•</span>
              <span>Juz {activeSurah.juz}</span>
              <span>•</span>
              <span>{activeSurah.numberOfAyahs} Verses</span>
              <span>•</span>
              <span>{activeSurah.revelationType === 'Meccan' ? 'Meccan (مكية)' : 'Medinan (مدنية)'}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-white flex items-center justify-center gap-3">
              <span>{activeSurah.englishName}</span>
              <span className="arabic-text text-3xl sm:text-4xl text-amber-300 font-normal">({activeSurah.name})</span>
            </h1>
            <p className="text-xs sm:text-sm text-emerald-200/80 mt-1 max-w-md mx-auto">
              "{activeSurah.englishNameTranslation}"
            </p>

            {/* Bismillah Calligraphy (Except Surah 9 At-Tawbah) */}
            {activeSurah.number !== 9 && (
              <div className="pt-6 mt-4 border-t border-white/10">
                <p className="arabic-text text-3xl sm:text-4xl text-amber-200 font-semibold tracking-wide">
                  بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
                </p>
                <p className="text-xs text-emerald-300/70 mt-1.5 font-sans">
                  {t('bismillahTranslation')}
                </p>
              </div>
            )}
          </div>

          {/* Loading Indicator */}
          {loadingVerses ? (
            <div className="py-24 text-center space-y-4">
              <div className="w-8 h-8 border-2 border-amber-400 border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="text-xs text-amber-300 font-bold tracking-wider uppercase">
                Loading Surah {activeSurah.englishName}...
              </p>
            </div>
          ) : readingMode === 'continuous' ? (
            /* ============================================================ */
            /* OPTION 1: "READ IN ONE GO" (MUSHAF TILAWAT CONTINUOUS FLOW)  */
            /* ============================================================ */
            <div className="space-y-6">
              {/* Continuous Mushaf Flow Container */}
              <div className="liquid-glass rounded-[2.5rem] p-6 sm:p-10 md:p-12 border-2 border-amber-400/30 bg-gradient-to-b from-[#031d16] via-[#021811] to-[#031d16] shadow-2xl relative">
                {/* Ornate Inner Frame Accents */}
                <div className="absolute top-3 left-3 text-amber-500/20 text-xl font-serif select-none pointer-events-none">۞</div>
                <div className="absolute top-3 right-3 text-amber-500/20 text-xl font-serif select-none pointer-events-none">۞</div>
                <div className="absolute bottom-3 left-3 text-amber-500/20 text-xl font-serif select-none pointer-events-none">۞</div>
                <div className="absolute bottom-3 right-3 text-amber-500/20 text-xl font-serif select-none pointer-events-none">۞</div>

                {/* Notice Pill */}
                <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6 text-xs text-amber-300/80">
                  <span className="flex items-center gap-1.5 font-bold">
                    <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                    <span>पवित्र मुस़हफ़ प्रवाह (Recite continuous flowing Arabic in one breath)</span>
                  </span>
                  <span className="text-[10px] text-emerald-300/70 hidden sm:inline">
                    Click any Ayah to listen to verse recitation
                  </span>
                </div>

                {/* Complete Continuous Flowing Arabic Text */}
                <div className="text-right leading-[2.6] sm:leading-[3] tracking-wide space-x-reverse font-arabic select-text text-justify" dir="rtl">
                  {verses.map((ayah) => {
                    const isHovered = hoveredAyah === ayah.number;
                    const isPlaying = playingAyahNumber === ayah.number;
                    return (
                      <span
                        key={ayah.number}
                        onMouseEnter={() => setHoveredAyah(ayah.number)}
                        onClick={() => toggleAyahAudio(ayah.number)}
                        className={`inline cursor-pointer px-1.5 py-1 rounded-xl transition-all group ${
                          isPlaying
                            ? 'bg-amber-400/30 text-amber-200 underline decoration-amber-400 shadow-md'
                            : isHovered
                            ? 'bg-emerald-800/40 text-amber-100'
                            : 'text-amber-50 hover:text-amber-200'
                        } ${fontSizeClasses[fontSize]}`}
                        title={`Ayah ${activeSurah.number}:${ayah.number} — Click to listen`}
                      >
                        <span className="leading-relaxed">{ayah.arabic}</span>
                        {/* Authentic Eastern Arabic End-of-Ayah Ornament */}
                        <span
                          className={`inline-flex items-center justify-center mx-2 w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-amber-400/50 text-amber-300 font-mono text-[11px] sm:text-xs font-bold align-middle select-none transition-transform group-hover:scale-110 ${
                            isPlaying ? 'bg-amber-400 text-black' : 'bg-amber-500/10'
                          }`}
                        >
                          {toEasternArabicNumerals(ayah.number)}
                        </span>
                      </span>
                    );
                  })}
                </div>
              </div>

              {/* Hovered / Playing Ayah Live Reader Card */}
              {currentHoveredAyahItem && (
                <div className="liquid-glass rounded-2xl p-4 sm:p-5 border border-amber-400/50 bg-[#032b1f] animate-in fade-in duration-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-black text-amber-300 bg-amber-500/20 px-2.5 py-0.5 rounded-full border border-amber-500/40">
                        Verse {activeSurah.number}:{currentHoveredAyahItem.number}
                      </span>
                      {playingAyahNumber === currentHoveredAyahItem.number && (
                        <span className="text-[10px] font-bold text-emerald-300 flex items-center gap-1 animate-pulse">
                          <Headphones className="w-3 h-3 text-amber-400" />
                          <span>Playing Audio</span>
                        </span>
                      )}
                    </div>
                    <p className="text-xs sm:text-sm text-emerald-100/90 font-sans leading-relaxed">
                      {getVerseTranslation(currentHoveredAyahItem)}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => toggleAyahAudio(currentHoveredAyahItem.number)}
                      className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold flex items-center gap-1.5 transition-colors"
                    >
                      {playingAyahNumber === currentHoveredAyahItem.number ? <Pause className="w-3.5 h-3.5 fill-black" /> : <Play className="w-3.5 h-3.5 fill-black" />}
                      <span>{playingAyahNumber === currentHoveredAyahItem.number ? 'Pause' : 'Listen'}</span>
                    </button>
                    <button
                      onClick={() => handleCopyAyah(currentHoveredAyahItem)}
                      className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-emerald-200"
                      title="Copy Ayah"
                    >
                      {copiedAyah === currentHoveredAyahItem.number ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Share2 className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              )}

              {/* Complete Continuous Translation Below (If enabled) */}
              {showContinuousTranslation && (
                <div className="liquid-glass rounded-3xl p-6 sm:p-8 border border-white/10 space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-white/10">
                    <span className="text-xs font-bold text-amber-400 uppercase tracking-widest flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{language === 'hi' ? 'सम्पूर्ण सूरह अनुवाद (Complete Surah Translation)' : 'Complete Surah Translation in One Flow'}</span>
                    </span>
                    <span className="text-[10px] text-emerald-300/70 font-mono">
                      {showUrdu ? 'Urdu Translation' : (language === 'hi' ? 'Hindi Translation' : 'English Sahih International')}
                    </span>
                  </div>

                  <div className="space-y-4 divide-y divide-white/5">
                    {verses.map(ayah => (
                      <div key={ayah.number} className="pt-3 first:pt-0 flex items-start gap-3">
                        <span className="text-[11px] font-mono font-bold text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded-lg shrink-0 mt-0.5">
                          {ayah.number}
                        </span>
                        <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed font-sans">
                          {getVerseTranslation(ayah)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* ============================================================ */
            /* OPTION 2: "VERSE BY VERSE" STUDY CARDS VIEW                  */
            /* ============================================================ */
            <div className="space-y-4">
              {verses.map((ayah) => {
                const isAyahPlaying = playingAyahNumber === ayah.number;
                return (
                  <div
                    key={ayah.number}
                    id={`ayah-${ayah.number}`}
                    className={`liquid-glass rounded-3xl p-6 sm:p-7 border transition-all duration-200 space-y-4 ${
                      isAyahPlaying
                        ? 'border-amber-400 shadow-xl shadow-amber-500/10 ring-1 ring-amber-400/40 bg-[#03281e]'
                        : 'border-white/10 hover:border-white/20'
                    }`}
                  >
                    {/* Verse Header Row */}
                    <div className="flex items-center justify-between border-b border-white/10 pb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-black text-amber-300 bg-amber-500/15 px-3 py-1 rounded-full border border-amber-500/30">
                          {activeSurah.number}:{ayah.number}
                        </span>
                        {isAyahPlaying && (
                          <span className="text-[10px] font-bold text-emerald-300 flex items-center gap-1 animate-pulse">
                            <Headphones className="w-3 h-3 text-amber-400" />
                            <span>Playing Verse Audio</span>
                          </span>
                        )}
                      </div>

                      {/* Verse Actions: Play Ayah Audio, Copy, Bookmark */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => toggleAyahAudio(ayah.number)}
                          className={`p-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all border ${
                            isAyahPlaying
                              ? 'bg-amber-400 text-black border-amber-300 shadow-md'
                              : 'bg-white/5 hover:bg-white/10 text-emerald-200 border-white/10'
                          }`}
                          title="Listen to Verse Recitation"
                        >
                          {isAyahPlaying ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                          <span className="text-[11px] hidden sm:inline">{isAyahPlaying ? 'Pause' : 'Play Ayah'}</span>
                        </button>

                        <button
                          onClick={() => handleCopyAyah(ayah)}
                          className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-emerald-200 hover:text-amber-300 border border-white/10 transition-colors"
                          title="Copy Ayah text & translation"
                        >
                          {copiedAyah === ayah.number ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Share2 className="w-3.5 h-3.5" />}
                        </button>

                        <button
                          onClick={() => {
                            const readPos = { surahNumber: activeSurah.number, surahName: activeSurah.englishName, ayah: ayah.number };
                            setLastRead(readPos);
                            try {
                              localStorage.setItem('@noor_quran_last_read', JSON.stringify(readPos));
                            } catch {}
                          }}
                          className={`p-2 rounded-xl border transition-colors ${
                            lastRead?.surahNumber === activeSurah.number && lastRead?.ayah === ayah.number
                              ? 'bg-amber-500/20 border-amber-400/50 text-amber-300 font-bold'
                              : 'bg-white/5 hover:bg-white/10 text-emerald-200 border-white/10'
                          }`}
                          title="Bookmark this verse"
                        >
                          <Bookmark className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Arabic Calligraphy Verse Text */}
                    <div className="text-right py-2">
                      <p className={`arabic-text text-amber-100 font-medium ${fontSizeClasses[fontSize]}`}>
                        {ayah.arabic}
                        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-amber-500/40 text-amber-300 text-xs font-mono font-bold mr-2 align-middle">
                          ۝{ayah.number}
                        </span>
                      </p>
                    </div>

                    {/* Translation */}
                    <div className="pt-3 border-t border-white/10">
                      <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed font-sans">
                        {getVerseTranslation(ayah)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Bottom Surah Navigation Bar */}
          <div className="pt-8 pb-12 flex flex-wrap items-center justify-between gap-4 border-t border-white/10">
            <button
              onClick={() => navigateSurah('prev')}
              disabled={activeSurah.number <= 1}
              className="px-5 py-3 rounded-2xl liquid-glass border border-white/15 text-xs font-bold text-emerald-200 hover:text-white flex items-center gap-2 disabled:opacity-30 disabled:pointer-events-none"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous Surah</span>
            </button>

            <button
              onClick={closeReader}
              className="px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-black shadow-lg shadow-amber-500/20"
            >
              Back to All 114 Surahs
            </button>

            <button
              onClick={() => navigateSurah('next')}
              disabled={activeSurah.number >= 114}
              className="px-5 py-3 rounded-2xl liquid-glass border border-white/15 text-xs font-bold text-emerald-200 hover:text-white flex items-center gap-2 disabled:opacity-30 disabled:pointer-events-none"
            >
              <span>Next Surah</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </main>
      ) : (
        /* ============================================================ */
        /* VIEW B: ALL 114 SURAHS CATALOG GRID (ZERO POPUP MODALS!)     */
        /* ============================================================ */
        <>
          {/* Sub-Header Breadcrumb & Search */}
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
                  <h1 className="text-lg sm:text-xl font-black text-white">{t('browseHolyQuran')}</h1>
                  <p className="text-[10px] text-emerald-300/70">
                    114 Surahs • Mishary Alafasy, Abdul Basit, Sudais & Ghamdi Recitations
                  </p>
                </div>
              </div>

              {/* Search Box */}
              <div className="relative">
                <Search className="w-4 h-4 text-emerald-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder={t('searchSurahPlaceholder')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 pr-4 py-2 bg-black/40 border border-white/15 rounded-full text-xs text-white placeholder-emerald-400/50 focus:outline-none focus:border-amber-400 w-64"
                />
              </div>
            </div>
          </div>

          <main className="flex-1 max-w-7xl mx-auto w-full p-6 sm:p-10 space-y-6">
            {/* Continue Reading Banner */}
            {lastRead && (
              <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#03281d] via-[#043d2b] to-[#03281d] border border-amber-500/40 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
                <div className="flex items-center gap-3.5">
                  <span className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-300 flex items-center justify-center border border-amber-500/30">
                    <Bookmark className="w-5 h-5" />
                  </span>
                  <div>
                    <span className="text-[10px] text-amber-400 font-bold uppercase tracking-widest font-mono">
                      Resume Reading Position
                    </span>
                    <h3 className="text-sm font-bold text-white">
                      Continue Surah {lastRead.surahName} (Surah #{lastRead.surahNumber}, Ayah {lastRead.ayah})
                    </h3>
                  </div>
                </div>

                <button
                  onClick={() => {
                    const s = SURAHS_LIST.find(x => x.number === lastRead.surahNumber);
                    if (s) openSurah(s, lastRead.ayah);
                  }}
                  className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs flex items-center gap-2 transition-colors shadow-lg shadow-amber-500/20"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Continue Reading</span>
                </button>
              </div>
            )}

            {/* Filter Pills & Status */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center bg-black/30 p-1.5 rounded-full border border-white/10 text-xs font-semibold">
                {(['All', 'Meccan', 'Medinan'] as const).map(tab => (
                  <button
                    key={tab}
                    onClick={() => setSelectedRev(tab)}
                    className={`px-4 py-1.5 rounded-full transition-all ${
                      selectedRev === tab
                        ? 'bg-amber-500 text-emerald-950 font-black shadow-md'
                        : 'text-emerald-200 hover:text-white'
                    }`}
                  >
                    {tab === 'All' ? t('filterAll') : tab === 'Meccan' ? t('filterMeccan') : t('filterMedinan')}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-3">
                <span className="px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-[11px] text-emerald-300 font-mono">
                  ✓ All 114 Surahs Complete
                </span>
                <span className="text-xs text-emerald-300/70 font-mono">
                  Showing {filteredSurahs.length} of 114 Surahs
                </span>
              </div>
            </div>

            {/* All 114 Surahs Grid (Click opens in-page reader with NO popup modal!) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredSurahs.map((surah) => (
                <button
                  key={surah.number}
                  onClick={() => openSurah(surah)}
                  className="text-left liquid-glass rounded-3xl p-5 border border-white/10 hover:border-amber-400/50 transition-all group flex items-center justify-between hover:scale-[1.02]"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-2xl bg-black/40 border border-white/15 group-hover:border-amber-400 flex items-center justify-center font-black text-xs text-amber-300">
                      {surah.number}
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors">
                        {surah.englishName}
                      </h3>
                      <span className="text-[11px] text-emerald-300/70 block">
                        {surah.englishNameTranslation} • {surah.numberOfAyahs} {t('ayahsCount')}
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="arabic-text text-xl font-bold text-emerald-200 group-hover:text-amber-200">
                      {surah.name}
                    </span>
                    <span className="text-[9px] text-emerald-400/60 block mt-0.5">
                      {surah.revelationType === 'Meccan' ? t('filterMeccan') : t('filterMedinan')}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </main>
        </>
      )}

      {/* Universal Footer */}
      <Footer />
    </div>
  );
}
