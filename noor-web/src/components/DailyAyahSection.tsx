'use client';

// ============================================================
// NOOR Web — Verse of the Day (Ayat al-Yawm)
// Automatically updates daily with authentic rotating Ayahs & audio
// ============================================================

import React, { useState, useEffect } from 'react';
import { BookOpen, Volume2, VolumeX, Share2, Bookmark, Check, Info, ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { getDailyAyah } from '../lib/quranData';
import { useLanguage } from '../context/LanguageContext';

export const DailyAyahSection: React.FC = () => {
  const { t, language } = useLanguage();
  const [dayOffset, setDayOffset] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [showUrdu, setShowUrdu] = useState<boolean>(false);
  const [bookmarked, setBookmarked] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [showTafsir, setShowTafsir] = useState<boolean>(false);

  // Compute displayed date based on dayOffset
  const displayedDate = new Date();
  displayedDate.setDate(displayedDate.getDate() + dayOffset);
  const currentAyah = getDailyAyah(displayedDate);

  // Stop audio whenever date changes
  const handleDateChange = (newOffset: number) => {
    if (audio) {
      audio.pause();
      setIsPlaying(false);
    }
    setDayOffset(newOffset);
  };

  useEffect(() => {
    return () => {
      if (audio) {
        audio.pause();
      }
    };
  }, [audio]);

  const toggleAudio = () => {
    if (isPlaying && audio) {
      audio.pause();
      setIsPlaying(false);
    } else {
      if (audio) audio.pause();
      const a = new Audio(currentAyah.audioUrl);
      a.play().catch(e => console.log('Audio playback error', e));
      a.onended = () => setIsPlaying(false);
      setAudio(a);
      setIsPlaying(true);
    }
  };

  const currentTranslation = showUrdu
    ? (currentAyah.translationUr || currentAyah.translationEn)
    : (language === 'hi' ? (currentAyah.translationHi || currentAyah.translationEn) : currentAyah.translationEn);

  const handleCopy = () => {
    const text = `${currentAyah.arabic}\n\n${currentTranslation}\n\n— ${currentAyah.reference} (via NOOR)`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Format date label
  const formattedDateLabel = dayOffset === 0
    ? 'Today'
    : dayOffset === -1
    ? 'Yesterday'
    : dayOffset === 1
    ? 'Tomorrow'
    : displayedDate.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });

  return (
    <section className="w-full py-10 sm:py-12 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="glass-panel-gold rounded-2xl sm:rounded-3xl p-4 sm:p-10 border border-amber-500/30 relative overflow-hidden shadow-2xl">
        {/* Authentic Quran Manuscript Illumination Background */}
        <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=800&q=60"
            alt="Noble Quran Manuscript Illumination"
            width={800}
            height={400}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover object-center opacity-10 mix-blend-luminosity filter saturate-150"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#031e15]/95 via-[#031e15]/85 to-[#031e15]/95" />
        </div>

        {/* Glow & Watermark */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-400/5 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-amber-500/20 pb-5 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-300">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">{t('verseOfTheDay')}</span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-[10px] font-mono text-amber-300 font-bold">
                  <Calendar className="w-2.5 h-2.5" />
                  {formattedDateLabel}
                </span>
              </div>
              <h3 className="text-xl font-bold text-white mt-0.5">
                {currentAyah.surahName} <span className="text-sm text-emerald-300/80 font-normal">({currentAyah.reference})</span>
              </h3>
            </div>
          </div>

          {/* Action Buttons & Day Navigation */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Day Cycler */}
            <div className="flex items-center bg-[#06241b] rounded-xl border border-emerald-700/50 p-0.5 mr-1">
              <button
                onClick={() => handleDateChange(dayOffset - 1)}
                className="p-1.5 text-emerald-300 hover:text-white rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
                title="Previous Day's Verse"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              {dayOffset !== 0 ? (
                <button
                  onClick={() => handleDateChange(0)}
                  className="px-2 py-1 text-[11px] font-bold text-amber-300 hover:text-amber-200 transition-colors cursor-pointer"
                  title="Return to Today"
                >
                  Today
                </button>
              ) : (
                <span className="px-2 py-1 text-[11px] font-bold text-emerald-400">
                  Daily
                </span>
              )}
              <button
                onClick={() => handleDateChange(dayOffset + 1)}
                className="p-1.5 text-emerald-300 hover:text-white rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
                title="Next Day's Verse"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={() => setShowUrdu(!showUrdu)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                showUrdu
                  ? 'bg-amber-500 text-emerald-950 border-amber-400 font-bold'
                  : 'bg-emerald-950/60 border-emerald-700/40 text-emerald-200 hover:text-amber-300'
              }`}
            >
              {showUrdu ? (language === 'hi' ? t('showHindi') : t('showEnglish')) : 'اردو ترجمہ'}
            </button>

            <button
              onClick={toggleAudio}
              className={`p-2 rounded-xl border transition-all cursor-pointer ${
                isPlaying
                  ? 'bg-amber-500 text-emerald-950 border-amber-400 animate-pulse'
                  : 'bg-emerald-950/60 border-emerald-700/40 text-emerald-300 hover:text-amber-300'
              }`}
              title={isPlaying ? t('pauseRecitation') : t('listenRecitation')}
            >
              {isPlaying ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>

            <button
              onClick={handleCopy}
              className="p-2 rounded-xl bg-emerald-950/60 border border-emerald-700/40 text-emerald-300 hover:text-amber-300 transition-all cursor-pointer"
              title={t('copyVerse')}
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
            </button>

            <button
              onClick={() => setBookmarked(!bookmarked)}
              className={`p-2 rounded-xl border transition-all cursor-pointer ${
                bookmarked
                  ? 'bg-amber-500 text-emerald-950 border-amber-400'
                  : 'bg-emerald-950/60 border-emerald-700/40 text-emerald-300 hover:text-amber-300'
              }`}
              title={t('bookmarkVerse')}
            >
              <Bookmark className="w-4 h-4" />
            </button>

            <button
              onClick={() => setShowTafsir(!showTafsir)}
              className="p-2 rounded-xl bg-emerald-950/60 border border-emerald-700/40 text-emerald-300 hover:text-amber-300 transition-all cursor-pointer"
              title={t('readTafsir')}
            >
              <Info className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Arabic Verse */}
        <div className="my-8 text-center px-2 sm:px-8">
          <p className="arabic-text text-2xl sm:text-3xl lg:text-4xl text-amber-200 font-bold leading-[2.2] tracking-wide drop-shadow-sm">
            {currentAyah.arabic}
          </p>
        </div>

        {/* Transliteration */}
        <div className="text-center text-xs text-emerald-300/70 italic font-sans max-w-3xl mx-auto mb-4">
          "{currentAyah.transliteration}"
        </div>

        {/* Translation */}
        <div className="bg-[#031c15]/80 rounded-2xl p-6 border border-emerald-800/40 max-w-4xl mx-auto text-center">
          <p className={`text-base sm:text-lg text-emerald-50 leading-relaxed ${showUrdu ? 'arabic-text text-xl font-medium text-emerald-200' : ''}`}>
            {currentTranslation}
          </p>
        </div>

        {/* Tafsir Ibn Kathir Accordion */}
        {showTafsir && (
          <div className="mt-6 p-5 rounded-2xl bg-[#06241b] border border-amber-500/30 text-xs text-emerald-100/90 leading-relaxed max-w-4xl mx-auto">
            <h4 className="font-bold text-amber-300 mb-2 flex items-center gap-1.5 text-sm">
              <Info className="w-4 h-4" />
              {t('tafsirTitle')}
            </h4>
            <p>
              {t('tafsirBody')}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};
