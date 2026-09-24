'use client';

// ============================================================
// NOOR Kids — Child-Friendly Interactive Islamic Learning Suite
// Arabic Alphabet • Prophet Stories • Kids Salah • Islamic Quizzes
// ==========================================

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Sparkles,
  BookOpen,
  Award,
  Volume2,
  CheckCircle2,
  Star,
  Smile,
  Shield,
  HelpCircle,
  RotateCcw
} from 'lucide-react';
import { GlobalNavbar } from '../../components/GlobalNavbar';
import { Footer } from '../../components/Footer';
import {
  ARABIC_ALPHABET,
  PROPHET_STORIES,
  ArabicLetter,
  ProphetStory
} from '../../data/islamicCoreData';

type KidsSection = 'alphabet' | 'stories' | 'salah' | 'quiz' | 'ramadan';

interface QuizQuestion {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

const KIDS_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    question: 'How many daily obligatory prayers (Salah) are there in Islam?',
    options: ['3', '4', '5', '7'],
    correct: 2,
    explanation: 'There are 5 daily obligatory prayers: Fajr, Dhuhr, Asr, Maghrib, and Isha.'
  },
  {
    question: 'What was the name of the first Prophet created by Allah?',
    options: ['Prophet Ibrahim', 'Prophet Adam', 'Prophet Nuh', 'Prophet Musa'],
    correct: 1,
    explanation: 'Prophet Adam (peace be upon him) was the very first human being and the first prophet created by Allah.'
  },
  {
    question: 'Which holy book was revealed to Prophet Muhammad ﷺ?',
    options: ['The Tawrat', 'The Zabur', 'The Injeel', 'The Holy Qur\'an'],
    correct: 3,
    explanation: 'The Holy Qur\'an was revealed to Prophet Muhammad ﷺ through Angel Jibril over 23 years.'
  },
  {
    question: 'What do we say before starting to eat or read the Quran?',
    options: ['Alhamdulillah', 'SubhanAllah', 'Bismillah', 'Allahu Akbar'],
    correct: 2,
    explanation: 'We say "Bismillah" (In the Name of Allah) before eating and before doing any good action.'
  },
  {
    question: 'In which holy month do Muslims fast from dawn until sunset?',
    options: ['Muharram', 'Ramadan', 'Shawwal', 'Rajab'],
    correct: 1,
    explanation: 'Ramadan is the blessed month of fasting, Taraweeh prayers, and Quran revelation.'
  }
];

export default function KidsPage() {
  const [activeTab, setActiveTab] = useState<KidsSection>('alphabet');
  const [selectedLetter, setSelectedLetter] = useState<ArabicLetter>(ARABIC_ALPHABET[0]);
  const [selectedStory, setSelectedStory] = useState<ProphetStory>(PROPHET_STORIES[0]);

  // Quiz state
  const [quizIndex, setQuizIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  // Ramadan Good Deeds Check
  const [deeds, setDeeds] = useState<Record<string, boolean>>({
    deed1: false,
    deed2: false,
    deed3: false,
    deed4: false,
    deed5: false
  });

  const handleAnswer = (optionIdx: number) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(optionIdx);
    if (optionIdx === KIDS_QUIZ_QUESTIONS[quizIndex].correct) {
      setScore(s => s + 1);
    }
  };

  const nextQuestion = () => {
    if (quizIndex + 1 < KIDS_QUIZ_QUESTIONS.length) {
      setQuizIndex(k => k + 1);
      setSelectedAnswer(null);
    } else {
      setQuizFinished(true);
    }
  };

  const resetQuiz = () => {
    setQuizIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setQuizFinished(false);
  };

  return (
    <div className="min-h-screen bg-[#02140e] text-white flex flex-col selection:bg-amber-500 selection:text-black relative overflow-hidden">
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-10 right-10 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-amber-500/10 rounded-full blur-[120px]" />
      </div>

      <GlobalNavbar />

      {/* Header Breadcrumb */}
      <div className="border-b border-white/10 bg-[#031c15]/70 backdrop-blur-md px-4 sm:px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-emerald-200 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold font-serif text-white tracking-wide">
                  NOOR Kids & Family
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                  Parental Verified
                </span>
              </div>
              <p className="text-xs text-emerald-300/70 mt-0.5 font-mono">
                Interactive Arabic Letters • Prophet Stories • Step-by-Step Salah • Quizzes
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-emerald-300 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-xl flex items-center gap-1.5 font-bold">
              <Shield className="w-3.5 h-3.5 text-amber-400" />
              <span>100% Ad-Free Safe Haven</span>
            </span>
          </div>
        </div>
      </div>

      {/* Kids Navigation Bar */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 pt-6">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-white/10">
          {[
            { id: 'alphabet', label: '🔤 Arabic Alphabet', emoji: '🔤' },
            { id: 'stories', label: '📖 Prophet Stories', emoji: '📖' },
            { id: 'salah', label: '🕌 Learn Salah for Kids', emoji: '🕌' },
            { id: 'quiz', label: '🧩 Islamic Quizzes', emoji: '🧩' },
            { id: 'ramadan', label: '🌙 Ramadan Deeds', emoji: '🌙' },
          ].map(tab => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as KidsSection)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20'
                    : 'bg-white/5 hover:bg-white/10 text-emerald-200/80 hover:text-white border border-white/5'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 py-8 flex-1">
        {/* ============================================================ */}
        {/* 1. ARABIC ALPHABET */}
        {/* ============================================================ */}
        {activeTab === 'alphabet' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* Active Letter Spotlight */}
            <div className="bg-gradient-to-r from-[#04281f] via-[#05382b] to-[#04281f] border border-amber-500/40 rounded-3xl p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
              <div className="text-center md:text-left space-y-2">
                <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest">
                  Letter Spotlight • الحرف
                </span>
                <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white">
                  Letter {selectedLetter.name} ({selectedLetter.transliteration})
                </h2>
                <p className="text-sm text-emerald-200/90 font-medium">
                  Pronunciation Guide: <span className="text-amber-300 font-bold">{selectedLetter.audioHint}</span>
                </p>
                <div className="pt-2">
                  <span className="inline-block px-4 py-2 rounded-2xl bg-black/40 border border-white/10 text-sm">
                    Example Word: <strong className="text-amber-300 font-serif text-lg mx-2">{selectedLetter.word}</strong> — {selectedLetter.meaning}
                  </span>
                </div>
              </div>

              {/* Giant Calligraphic Letter Card */}
              <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-3xl bg-black/50 border-2 border-amber-400 flex items-center justify-center shadow-xl shadow-amber-500/10">
                <span className="text-7xl sm:text-8xl font-serif text-amber-300 select-none">
                  {selectedLetter.letter}
                </span>
              </div>
            </div>

            {/* Complete 28 Letter Grid */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-widest px-1">
                Tap Any Letter to Learn (28 Sacred Letters)
              </h3>
              <div className="grid grid-cols-4 sm:grid-cols-7 gap-3">
                {ARABIC_ALPHABET.map(item => {
                  const isSelected = selectedLetter.name === item.name;
                  return (
                    <button
                      key={item.name}
                      onClick={() => setSelectedLetter(item)}
                      className={`p-4 rounded-2xl border transition-all flex flex-col items-center justify-center gap-1 group ${
                        isSelected
                          ? 'bg-amber-500 text-black border-amber-400 shadow-lg shadow-amber-500/30 scale-105'
                          : 'bg-[#031c15] hover:bg-[#04281f] border-emerald-500/20 text-white'
                      }`}
                    >
                      <span className={`text-3xl font-serif ${isSelected ? 'text-black' : 'text-amber-300 group-hover:scale-110 transition-transform'}`}>
                        {item.letter}
                      </span>
                      <span className={`text-[11px] font-bold ${isSelected ? 'text-black' : 'text-emerald-200/80'}`}>
                        {item.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* 2. PROPHET STORIES FOR KIDS */}
        {/* ============================================================ */}
        {activeTab === 'stories' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Stories List Column */}
              <div className="space-y-2">
                <p className="text-xs font-bold text-emerald-400 uppercase tracking-widest px-2 mb-1">
                  Select a Prophet's Story
                </p>
                {PROPHET_STORIES.map(story => {
                  const isSelected = selectedStory.id === story.id;
                  return (
                    <button
                      key={story.id}
                      onClick={() => setSelectedStory(story)}
                      className={`w-full text-left p-4 rounded-2xl border transition-all ${
                        isSelected
                          ? 'bg-emerald-950/80 border-amber-500 text-white shadow-md'
                          : 'bg-[#031c15]/60 hover:bg-[#031c15] border-white/5 text-emerald-200/80 hover:text-white'
                      }`}
                    >
                      <h4 className="text-sm font-bold text-white">{story.name}</h4>
                      <p className="text-xs font-serif text-amber-400/90">{story.arabicName}</p>
                      <p className="text-[11px] text-zinc-400 mt-1 line-clamp-1">{story.title}</p>
                    </button>
                  );
                })}
              </div>

              {/* Story Viewer Card */}
              <div className="md:col-span-2 bg-[#031c15] border border-emerald-500/20 rounded-3xl p-6 sm:p-8 space-y-6">
                <div className="border-b border-white/10 pb-4">
                  <span className="text-xs font-mono font-bold text-amber-400 uppercase">
                    Illustrated Islamic Story
                  </span>
                  <h3 className="text-2xl font-serif font-bold text-white mt-1">
                    {selectedStory.title}
                  </h3>
                  <p className="text-sm font-serif text-amber-300 mt-1">
                    {selectedStory.arabicName}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3">
                  <Star className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs text-amber-300 font-bold uppercase tracking-wider font-mono">
                      Moral Lesson for Kids
                    </p>
                    <p className="text-xs text-amber-100 mt-0.5 leading-relaxed">
                      {selectedStory.moralLesson}
                    </p>
                  </div>
                </div>

                <p className="text-sm sm:text-base text-zinc-200 leading-relaxed font-sans font-normal">
                  {selectedStory.kidStory}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* 3. LEARN SALAH FOR KIDS */}
        {/* ============================================================ */}
        {activeTab === 'salah' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="bg-[#031c15] p-6 rounded-2xl border border-emerald-500/20">
              <h2 className="text-2xl font-serif font-bold text-white">
                Learn Salah Step-by-Step for Young Believers
              </h2>
              <p className="text-xs text-emerald-200/70 mt-1">
                "Teach your children to pray when they are seven years old." (Abu Dawud 495). Gentle, encouraging visual steps.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { num: 1, title: 'Stand Upright (Qiyam)', ar: 'الْقِيَام', text: 'Stand facing the Holy Kaaba with a peaceful heart, thinking about Allah\'s love.' },
                { num: 2, title: 'Say Allahu Akbar', ar: 'تَكْبِيرَةُ الإِحْرَام', text: 'Raise your hands gently to your ears and say Allahu Akbar (Allah is the Greatest)!' },
                { num: 3, title: 'Bow Down (Ruku)', ar: 'الرُّكُوع', text: 'Bow with a flat back and hands on your knees, saying Subhana Rabbiyal-\'Azeem 3 times.' },
                { num: 4, title: 'Prostrate (Sujud)', ar: 'السُّجُود', text: 'Touch forehead and nose to the soft prayer mat, closest to Allah! Say Subhana Rabbiyal-A\'la.' },
              ].map(s => (
                <div key={s.num} className="p-5 rounded-2xl bg-[#031c15] border border-emerald-500/20 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="w-8 h-8 rounded-xl bg-amber-500 text-black font-bold font-mono text-sm flex items-center justify-center">
                      {s.num}
                    </span>
                    <span className="text-sm font-serif text-amber-400">{s.ar}</span>
                  </div>
                  <h4 className="text-sm font-bold text-white">{s.title}</h4>
                  <p className="text-xs text-zinc-300 leading-relaxed">{s.text}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* 4. ISLAMIC QUIZZES */}
        {/* ============================================================ */}
        {activeTab === 'quiz' && (
          <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in duration-300">
            <div className="bg-[#031c15] border border-emerald-500/20 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
              {!quizFinished ? (
                <>
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <span className="text-xs font-mono font-bold text-amber-400">
                      QUESTION {quizIndex + 1} OF {KIDS_QUIZ_QUESTIONS.length}
                    </span>
                    <span className="text-xs font-bold text-emerald-300 font-mono">
                      Current Score: {score}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-white">
                    {KIDS_QUIZ_QUESTIONS[quizIndex].question}
                  </h3>

                  <div className="space-y-3">
                    {KIDS_QUIZ_QUESTIONS[quizIndex].options.map((opt, i) => {
                      const isChosen = selectedAnswer === i;
                      const isCorrect = i === KIDS_QUIZ_QUESTIONS[quizIndex].correct;
                      let btnStyle = 'bg-white/5 hover:bg-white/10 border-white/10 text-white';

                      if (selectedAnswer !== null) {
                        if (isCorrect) {
                          btnStyle = 'bg-emerald-600/30 border-emerald-400 text-emerald-200';
                        } else if (isChosen) {
                          btnStyle = 'bg-red-600/30 border-red-400 text-red-200';
                        }
                      }

                      return (
                        <button
                          key={i}
                          disabled={selectedAnswer !== null}
                          onClick={() => handleAnswer(i)}
                          className={`w-full p-4 rounded-xl border text-left text-xs font-bold transition-all flex items-center justify-between ${btnStyle}`}
                        >
                          <span>{opt}</span>
                          {selectedAnswer !== null && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                        </button>
                      );
                    })}
                  </div>

                  {selectedAnswer !== null && (
                    <div className="space-y-4 pt-2">
                      <div className="p-3.5 rounded-xl bg-black/40 border border-white/10 text-xs text-emerald-300">
                        💡 <strong>Explanation:</strong> {KIDS_QUIZ_QUESTIONS[quizIndex].explanation}
                      </div>

                      <button
                        onClick={nextQuestion}
                        className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs transition-colors"
                      >
                        {quizIndex + 1 < KIDS_QUIZ_QUESTIONS.length ? 'Next Question →' : 'See Results'}
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-6 space-y-4">
                  <span className="text-5xl">🏆</span>
                  <h3 className="text-2xl font-serif font-bold text-white">MashaAllah! Quiz Completed!</h3>
                  <p className="text-sm text-emerald-200">
                    You scored <strong className="text-amber-400 font-bold">{score} out of {KIDS_QUIZ_QUESTIONS.length}</strong>!
                  </p>
                  <button
                    onClick={resetQuiz}
                    className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs inline-flex items-center gap-2 transition-colors"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Try Quiz Again</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* 5. RAMADAN DEEDS FOR KIDS */}
        {/* ============================================================ */}
        {activeTab === 'ramadan' && (
          <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in duration-300">
            <div className="bg-[#031c15] border border-emerald-500/20 rounded-3xl p-6 sm:p-8 space-y-5">
              <div>
                <span className="text-xs font-mono font-bold text-amber-400 uppercase">
                  Daily Good Deeds Tracker
                </span>
                <h3 className="text-xl font-bold font-serif text-white mt-1">
                  My Ramadan & Good Deeds Checklist
                </h3>
                <p className="text-xs text-emerald-300/70 mt-1">
                  Complete these acts of kindness to earn continuous blessings and barakah!
                </p>
              </div>

              <div className="space-y-3">
                {[
                  { id: 'deed1', text: 'Smile at your parents, siblings, or teachers (Smiling is Charity!)' },
                  { id: 'deed2', text: 'Help clean up the table after Iftar or dinner' },
                  { id: 'deed3', text: 'Recite at least 5 ayahs from the Holy Quran' },
                  { id: 'deed4', text: 'Put a coin in a charity (Sadaqah) box' },
                  { id: 'deed5', text: 'Make a secret Dua for all children and Muslims around the world' }
                ].map(item => {
                  const done = deeds[item.id];
                  return (
                    <button
                      key={item.id}
                      onClick={() => setDeeds(d => ({ ...d, [item.id]: !d[item.id] }))}
                      className={`w-full p-4 rounded-xl border text-left flex items-start gap-3 transition-colors ${
                        done
                          ? 'bg-emerald-950/50 border-emerald-500 text-emerald-200'
                          : 'bg-white/5 hover:bg-white/10 border-white/10 text-white'
                      }`}
                    >
                      <CheckCircle2 className={`w-5 h-5 shrink-0 mt-0.5 ${done ? 'text-emerald-400' : 'text-zinc-600'}`} />
                      <span className={`text-xs ${done ? 'line-through opacity-80' : ''}`}>
                        {item.text}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
