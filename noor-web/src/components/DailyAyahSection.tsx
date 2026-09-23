'use client';

// ============================================================
// NOOR Web — Verse of the Day (Ayat al-Yawm)
// ============================================================

import React, { useState } from 'react';
import { BookOpen, Volume2, VolumeX, Share2, Bookmark, Check, Info } from 'lucide-react';
import { FEATURED_AYAH } from '../lib/quranData';
import { useLanguage } from '../context/LanguageContext';

export const DailyAyahSection: React.FC = () => {
  const { t, language } = useLanguage();
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [showUrdu, setShowUrdu] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showTafsir, setShowTafsir] = useState(false);

  const toggleAudio = () => {
    if (isPlaying && audio) {
      audio.pause();
      setIsPlaying(false);
    } else {
      const a = new Audio(FEATURED_AYAH.audioUrl);
      a.play().catch(e => console.log('Audio playback error', e));
      a.onended = () => setIsPlaying(false);
      setAudio(a);
      setIsPlaying(true);
    }
  };

  const currentTranslation = showUrdu
    ? FEATURED_AYAH.translationUr
    : (language === 'hi' ? ((FEATURED_AYAH as any).translationHi || FEATURED_AYAH.translationEn) : FEATURED_AYAH.translationEn);

  const handleCopy = () => {
    const text = `${FEATURED_AYAH.arabic}\n\n${currentTranslation}\n\n— ${FEATURED_AYAH.reference} (via NOOR)`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="w-full py-12 px-4 lg:px-8 max-w-7xl mx-auto">
      <div className="glass-panel-gold rounded-3xl p-6 sm:p-10 border border-amber-500/30 relative overflow-hidden shadow-2xl">
        {/* Authentic Quran Manuscript Illumination Background */}
        <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=1600&q=80"
            alt="Noble Quran Manuscript Illumination"
            className="w-full h-full object-cover object-center opacity-10 mix-blend-luminosity filter saturate-150"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#031e15]/95 via-[#031e15]/85 to-[#031e15]/95" />
        </div>

        {/* Glow & Watermark */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-400/5 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-amber-500/20 pb-5 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-300">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">{t('verseOfTheDay')}</span>
              <h3 className="text-xl font-bold text-white">
                {FEATURED_AYAH.surahName} <span className="text-sm text-emerald-300/80 font-normal">({FEATURED_AYAH.reference})</span>
              </h3>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowUrdu(!showUrdu)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                showUrdu
                  ? 'bg-amber-500 text-emerald-950 border-amber-400'
                  : 'bg-emerald-950/60 border-emerald-700/40 text-emerald-200 hover:text-amber-300'
              }`}
            >
              {showUrdu ? (language === 'hi' ? t('showHindi') : t('showEnglish')) : 'اردو ترجمہ'}
            </button>

            <button
              onClick={toggleAudio}
              className={`p-2 rounded-xl border transition-all ${
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
              className="p-2 rounded-xl bg-emerald-950/60 border border-emerald-700/40 text-emerald-300 hover:text-amber-300 transition-all"
              title={t('copyVerse')}
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
            </button>

            <button
              onClick={() => setBookmarked(!bookmarked)}
              className={`p-2 rounded-xl border transition-all ${
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
              className="p-2 rounded-xl bg-emerald-950/60 border border-emerald-700/40 text-emerald-300 hover:text-amber-300 transition-all"
              title={t('readTafsir')}
            >
              <Info className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Arabic Verse */}
        <div className="my-8 text-center px-2 sm:px-8">
          <p className="arabic-text text-2xl sm:text-3xl lg:text-4xl text-amber-200 font-bold leading-[2.2] tracking-wide drop-shadow-sm">
            {FEATURED_AYAH.arabic}
          </p>
        </div>

        {/* Transliteration */}
        <div className="text-center text-xs text-emerald-300/70 italic font-sans max-w-3xl mx-auto mb-4">
          "{FEATURED_AYAH.transliteration}"
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
