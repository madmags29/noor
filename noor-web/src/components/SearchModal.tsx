'use client';

// ============================================================
// NOOR Web — Global Islamic Search Modal
// ============================================================

import React, { useState } from 'react';
import { Search, X, BookOpen, Heart, ArrowRight } from 'lucide-react';
import { SURAHS_LIST } from '../lib/quranData';
import { DUAS_LIST } from '../lib/duasData';
import { useLanguage } from '../context/LanguageContext';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const { t, language } = useLanguage();
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const clean = query.trim().toLowerCase();

  const matchingSurahs = clean
    ? SURAHS_LIST.filter(s =>
        s.englishName.toLowerCase().includes(clean) ||
        s.englishNameTranslation.toLowerCase().includes(clean) ||
        s.name.includes(clean)
      )
    : [];

  const matchingDuas = clean
    ? DUAS_LIST.filter(d =>
        d.title.toLowerCase().includes(clean) ||
        (d.titleHi && d.titleHi.toLowerCase().includes(clean)) ||
        (d.titleUr && d.titleUr.toLowerCase().includes(clean)) ||
        d.category.toLowerCase().includes(clean) ||
        d.translation.toLowerCase().includes(clean) ||
        (d.translationHi && d.translationHi.toLowerCase().includes(clean))
      )
    : [];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/80 backdrop-blur-md p-4 pt-16 sm:pt-24 animate-in fade-in">
      <div className="bg-[#031c15] border border-emerald-700/50 rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden">
        {/* Search Input Box */}
        <div className="p-4 sm:p-5 border-b border-emerald-800/50 flex items-center gap-3">
          <Search className="w-5 h-5 text-amber-400" />
          <input
            type="text"
            autoFocus
            placeholder={t('searchPlaceholderFull') || "Search across Quran, Duas, Hadith, Topics..."}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-sm sm:text-base text-white placeholder-emerald-400/50 focus:outline-none"
          />
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-emerald-950 border border-emerald-700/40 text-emerald-300 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results Body */}
        <div className="max-h-[60vh] overflow-y-auto p-4 sm:p-6 space-y-5">
          {!clean ? (
            <div className="py-8 text-center text-xs text-emerald-300/60">
              {language === 'hi'
                ? 'कुरआन, दुआएं और विषय खोजने के लिए "फ़ातिहा", "सुबह", या "सब्र" जैसे शब्द लिखें।'
                : 'Type keywords like "Fatihah", "Morning", or "Patience" to discover content.'}
            </div>
          ) : matchingSurahs.length === 0 && matchingDuas.length === 0 ? (
            <div className="py-8 text-center text-xs text-emerald-300/60">
              {language === 'hi'
                ? `"${query}" के लिए कोई परिणाम नहीं मिला। कृपया दूसरा शब्द आज़माएं।`
                : `No results found for "${query}". Try a different keyword.`}
            </div>
          ) : (
            <>
              {/* Surahs Section */}
              {matchingSurahs.length > 0 && (
                <div>
                  <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider block mb-2">
                    {t('quran')} ({matchingSurahs.length})
                  </span>
                  <div className="space-y-2">
                    {matchingSurahs.map(s => (
                      <a
                        key={s.number}
                        href="#quran"
                        onClick={onClose}
                        className="p-3 rounded-xl bg-[#06241b] border border-emerald-800/40 hover:border-amber-400/40 flex items-center justify-between group transition-all"
                      >
                        <div className="flex items-center gap-3">
                          <BookOpen className="w-4 h-4 text-emerald-400" />
                          <div>
                            <span className="text-xs font-bold text-white group-hover:text-amber-300">
                              {s.englishName} ({s.englishNameTranslation})
                            </span>
                            <span className="text-[10px] text-emerald-400/60 block">
                              Surah #{s.number} • {s.numberOfAyahs} {t('ayahsCount')}
                            </span>
                          </div>
                        </div>
                        <span className="arabic-text text-lg text-emerald-200">{s.name}</span>
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Duas Section */}
              {matchingDuas.length > 0 && (
                <div>
                  <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider block mb-2">
                    {t('supplicationsTitle')} ({matchingDuas.length})
                  </span>
                  <div className="space-y-2">
                    {matchingDuas.map(d => (
                      <a
                        key={d.id}
                        href="#duas"
                        onClick={onClose}
                        className="p-3 rounded-xl bg-[#06241b] border border-emerald-800/40 hover:border-amber-400/40 flex items-center justify-between group transition-all"
                      >
                        <div className="flex items-center gap-3">
                          <Heart className="w-4 h-4 text-amber-400" />
                          <div>
                            <span className="text-xs font-bold text-white group-hover:text-amber-300">
                              {language === 'hi' && d.titleHi ? d.titleHi : (language === 'ur' && d.titleUr ? d.titleUr : d.title)}
                            </span>
                            <span className="text-[10px] text-emerald-400/60 block">
                              {d.source}
                            </span>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
