'use client';

// ============================================================
// NOOR Web — Interactive Mobile App Preview & Store Deployment Suite
// ============================================================

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Smartphone,
  Apple,
  Play,
  ArrowLeft,
  CheckCircle2,
  Download,
  Share2,
  Layers,
  Sparkles,
  RotateCcw,
  Check,
  Terminal,
  ExternalLink,
  Shield,
  EyeOff,
  BookOpen,
  Compass,
  Calendar,
  Image as ImageIcon,
  Heart,
  Flame,
  CheckSquare,
  Square,
  MessageSquare,
  X,
  Film,
  Menu,
  Volume2,
  VolumeX,
  User,
  LogIn
} from 'lucide-react';
import { MuslimLogo } from '../../components/MuslimLogo';
import { useLanguage, SUPPORTED_LANGUAGES, SupportedLanguage } from '../../context/LanguageContext';

const SIMULATED_PHOTOS = [
  { id: 101, title: 'The Holy Kaaba • Makkah Al-Mukarramah', cat: 'Makkah', loc: 'Masjid al-Haram, Makkah', img: 'https://images.unsplash.com/photo-1565552645632-d725f8bfc19a?w=600&q=80', likes: 9820 },
  { id: 102, title: 'Tawaf Around the Sacred Kaaba • Pilgrims in Ihram', cat: 'Makkah', loc: 'Makkah, Saudi Arabia', img: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=600&q=80', likes: 8450 },
  { id: 103, title: "Prophet's Mosque • Madinah Munawwarah Arches", cat: 'Madinah', loc: 'Al-Madinah Al-Munawwarah', img: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?w=600&q=80', likes: 7950 },
  { id: 104, title: 'Madinah Minarets & Marble Courtyard Umbrellas', cat: 'Madinah', loc: 'Al-Masjid An-Nabawi', img: 'https://images.unsplash.com/photo-1580418827493-f2b22c0a76cb?w=600&q=80', likes: 6420 },
  { id: 105, title: "The Noble Qur'an • Gold Gilding & Sacred Calligraphy", cat: 'Holy Quran', loc: 'Sacred Scripture', img: 'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=600&q=80', likes: 8120 },
  { id: 106, title: 'Illuminated Islamic Manuscript & Ayahs', cat: 'Calligraphy', loc: 'Islamic Calligraphy Archive', img: 'https://images.unsplash.com/photo-1585036156171-384164a8c675?w=600&q=80', likes: 5690 },
  { id: 107, title: 'Sheikh Zayed Grand Mosque • Pure White Marble Domes', cat: 'Architecture', loc: 'Abu Dhabi, UAE', img: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?w=600&q=80', likes: 7200 },
  { id: 108, title: 'Ottoman Grand Mosque Minarets • Sultanahmet', cat: 'Architecture', loc: 'Istanbul, Turkey', img: 'https://images.unsplash.com/photo-1564769625905-50e93615e769?w=600&q=80', likes: 6830 },
  { id: 109, title: 'Historic Blue Mosque at Golden Hour Sunset', cat: 'Twilight', loc: 'Bosphorus, Istanbul', img: 'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=600&q=80', likes: 5940 },
  { id: 110, title: 'Historic Moroccan Medina & Ancient Minarets', cat: 'Architecture', loc: 'Fez & Marrakech, Morocco', img: 'https://images.unsplash.com/photo-1587974928442-77dc3e0dba72?w=600&q=80', likes: 4890 },
  { id: 111, title: 'Ramadan Crescent Moon & Celestial Twilight Sky', cat: 'Twilight', loc: 'Desert Celestial Sky', img: 'https://images.unsplash.com/photo-1519817650390-64a93db51149?w=600&q=80', likes: 8900 },
  { id: 112, title: 'Sacred Kaaba Kiswah • Gilded Quranic Inscriptions', cat: 'Calligraphy', loc: 'The Holy Kaaba, Makkah', img: 'https://images.unsplash.com/photo-1565552645632-d725f8bfc19a?w=600&q=80', likes: 9150 }
];

const SIMULATED_VIDEOS = [
  {
    id: 201,
    title: 'The Sacred Kaaba & Pilgrims at Tawaf',
    cat: 'Makkah',
    duration: '0:32',
    url: 'https://cdn.pixabay.com/video/2024/01/25/198048-906522343_medium.mp4',
    thumb: 'https://images.unsplash.com/photo-1565552645632-d725f8bfc19a?w=800&q=80',
    views: '45.2K',
    loc: 'Masjid al-Haram, Makkah',
    desc: 'Pilgrims circumambulating the Holy Kaaba in profound devotion and submission during Tawaf.'
  },
  {
    id: 202,
    title: 'Sheikh Zayed Grand Mosque • Reflection Pools',
    cat: 'Architecture',
    duration: '0:24',
    url: 'https://cdn.pixabay.com/video/2020/08/14/47170-450995627_medium.mp4',
    thumb: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?w=800&q=80',
    views: '38.9K',
    loc: 'Abu Dhabi, UAE',
    desc: 'Twilight reflection pools illuminating pure white marble domes and minarets in Abu Dhabi.'
  },
  {
    id: 203,
    title: 'Spiritual Mosque Interior & Grand Chandelier',
    cat: 'Architecture',
    duration: '0:18',
    url: 'https://cdn.pixabay.com/video/2020/03/25/34260-400974076_medium.mp4',
    thumb: 'https://images.unsplash.com/photo-1564769625905-50e93615e769?w=800&q=80',
    views: '29.8K',
    loc: 'Istanbul, Turkey',
    desc: 'Sacred architectural geometry and spiritual serenity within the grand prayer hall.'
  },
  {
    id: 204,
    title: "Prophet's Mosque • Madinah Munawwarah Umbrellas",
    cat: 'Madinah',
    duration: '0:30',
    url: 'https://cdn.pixabay.com/video/2024/01/25/198048-906522343_medium.mp4',
    thumb: 'https://images.unsplash.com/photo-1580418827493-f2b22c0a76cb?w=800&q=80',
    views: '52.1K',
    loc: 'Al-Masjid An-Nabawi',
    desc: 'Hydraulic giant umbrellas shading millions of worshipers in the blessed courtyard of the Prophet ﷺ.'
  },
  {
    id: 205,
    title: 'Recitation of the Noble Quran with Tajweed',
    cat: 'Holy Quran',
    duration: '0:22',
    url: 'https://cdn.pixabay.com/video/2020/08/14/47170-450995627_medium.mp4',
    thumb: 'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=800&q=80',
    views: '34.5K',
    loc: 'Quranic Heritage Center',
    desc: 'Mesmerizing gilded Mushaf verses recited with pristine tajweed rules and spiritual contemplation.'
  }
];

type ScreenType =
  | 'home'
  | 'prayers'
  | 'quran'
  | 'ziyarat'
  | 'tasbih'
  | 'calendar'
  | 'media'
  | 'dashboard'
  | 'names'
  | 'giving'
  | 'qibla'
  | 'contact'
  | 'splash';

export default function AppPreviewPage() {
  const [activeScreen, setActiveScreen] = useState<ScreenType>('home');
  const [mobileCount, setMobileCount] = useState(18);
  const [tasbihTarget, setTasbihTarget] = useState(33);
  const [copiedEas, setCopiedEas] = useState(false);
  const [bannerDismissed, setBannerDismissed] = useState(false);
  const [selectedZiyaratCountry, setSelectedZiyaratCountry] = useState('All');
  const [showAiModal, setShowAiModal] = useState(false);
  const [qadaCounts, setQadaCounts] = useState({ Fajr: 0, Dhuhr: 0, Asr: 1, Maghrib: 0, Isha: 2 });
  const [prayerChecks, setPrayerChecks] = useState({ Fajr: true, Dhuhr: true, Asr: true, Maghrib: false, Isha: false });

  // Animated Splash Screen Simulation States
  const [splashKey, setSplashKey] = useState<number>(0);
  const [splashLoop, setSplashLoop] = useState<boolean>(true);
  const [splashAutoDismiss, setSplashAutoDismiss] = useState<boolean>(false);

  // Auto-dismiss splash screen after entrance if auto-dismiss enabled
  useEffect(() => {
    if (activeScreen === 'splash' && splashAutoDismiss) {
      const timer = setTimeout(() => {
        setActiveScreen('home');
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [activeScreen, splashKey, splashAutoDismiss]);

  // Interactive In-Simulator OpenAI Chat
  const [simulatedAiInput, setSimulatedAiInput] = useState('');
  const [simulatedAiLoading, setSimulatedAiLoading] = useState(false);
  const [simulatedMediaTab, setSimulatedMediaTab] = useState<'photos' | 'videos'>('photos');
  const [simulatedPhotoCategory, setSimulatedPhotoCategory] = useState('All');
  const [simulatedPreviewPhoto, setSimulatedPreviewPhoto] = useState<{ id: number; title: string; img: string; loc: string; cat: string; likes: number } | null>(null);
  const [simulatedActiveVideo, setSimulatedActiveVideo] = useState<{ title: string; url: string; duration: string; loc: string } | null>(null);

  // Simulator Navigation Drawer, Auth, Language & Adhan Voice States
  const { t, language, setLanguage, currentLanguageInfo, detectedLocation } = useLanguage();
  const [simulatedLangModalOpen, setSimulatedLangModalOpen] = useState(false);
  const [simulatedMenuOpen, setSimulatedMenuOpen] = useState(false);
  const [simulatedAuthOpen, setSimulatedAuthOpen] = useState(false);
  const [simulatedUser, setSimulatedUser] = useState<{ name: string; email: string; streak: number } | null>({
    name: 'Zubair Ahmad',
    email: 'zubair.ahmad@gmail.com',
    streak: 14,
  });
  const [simulatedAdhanOpen, setSimulatedAdhanOpen] = useState(false);
  const [simulatedActiveAdhan, setSimulatedActiveAdhan] = useState({
    name: 'Sheikh Ali Ahmed Mulla',
    city: 'Makkah Al-Mukarramah 🕋',
    url: 'https://cdn.aladhan.com/audio/adhans/a1.mp3',
  });
  const [simulatedAdhanPlaying, setSimulatedAdhanPlaying] = useState(false);

  // Live Gyroscope & Compass Orientation States
  const [simulatedHeading, setSimulatedHeading] = useState<number>(45);
  const [isGyroActive, setIsGyroActive] = useState<boolean>(false);
  const [isAutoSpinning, setIsAutoSpinning] = useState<boolean>(false);
  const qiblaTargetBearing = 118.4; // Degrees from True North towards Holy Kaaba

  // Real-world Device Orientation Event Listener
  useEffect(() => {
    const handleDeviceOrientation = (e: DeviceOrientationEvent) => {
      // @ts-ignore iOS webkitCompassHeading
      const compass = e.webkitCompassHeading;
      if (typeof compass === 'number' && !isNaN(compass)) {
        setSimulatedHeading(Math.round(compass));
        setIsGyroActive(true);
      } else if (e.alpha !== null && !isNaN(e.alpha)) {
        // Standard Web orientation (alpha rotates counter-clockwise)
        const heading = (360 - e.alpha) % 360;
        setSimulatedHeading(Math.round(heading));
        setIsGyroActive(true);
      }
    };

    if (typeof window !== 'undefined' && window.DeviceOrientationEvent) {
      window.addEventListener('deviceorientation', handleDeviceOrientation, true);
    }
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('deviceorientation', handleDeviceOrientation, true);
      }
    };
  }, []);

  // Auto-Spinning Gyroscope Demo Test
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isAutoSpinning) {
      interval = setInterval(() => {
        setSimulatedHeading(prev => (prev + 3) % 360);
      }, 50);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isAutoSpinning]);
  const [simulatedAiMessages, setSimulatedAiMessages] = useState<{ sender: 'user' | 'ai'; text: string; ref?: string }[]>([
    {
      sender: 'ai',
      text: 'Salam! I am Noor AI powered by OpenAI. Ask me anything about Quranic ayahs, Sunnah, or Islamic jurisprudence.',
      ref: 'OpenAI GPT-4o-mini'
    }
  ]);

  const handleSimulatedAiSend = async (queryText?: string) => {
    const textToSend = queryText || simulatedAiInput.trim();
    if (!textToSend) return;

    setSimulatedAiMessages(prev => [...prev, { sender: 'user', text: textToSend }]);
    if (!queryText) setSimulatedAiInput('');
    setSimulatedAiLoading(true);

    try {
      const res = await fetch('/api/ai/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: textToSend })
      });
      const data = await res.json();
      setSimulatedAiMessages(prev => [
        ...prev,
        {
          sender: 'ai',
          text: data.answer || 'Allah knows best.',
          ref: data.reference || 'Quran & Sunnah'
        }
      ]);
    } catch (e) {
      setSimulatedAiMessages(prev => [
        ...prev,
        {
          sender: 'ai',
          text: 'Turn to Allah in heartfelt prayer. "And when My servants ask you concerning Me - indeed I am near." (2:186).',
          ref: 'Surah Al-Baqarah 2:186'
        }
      ]);
    } finally {
      setSimulatedAiLoading(false);
    }
  };

  const copyEasCommand = () => {
    navigator.clipboard.writeText('npx eas build --platform all --auto-submit');
    setCopiedEas(true);
    setTimeout(() => setCopiedEas(false), 2000);
  };

  const togglePrayerCheck = (p: keyof typeof prayerChecks) => {
    setPrayerChecks(prev => ({ ...prev, [p]: !prev[p] }));
  };

  const incrementQada = (p: keyof typeof qadaCounts) => {
    setQadaCounts(prev => ({ ...prev, [p]: prev[p] + 1 }));
  };

  const decrementQada = (p: keyof typeof qadaCounts) => {
    setQadaCounts(prev => ({ ...prev, [p]: Math.max(0, prev[p] - 1) }));
  };

  return (
    <div className="min-h-screen bg-[#02120d] text-white flex flex-col selection:bg-amber-500 selection:text-black">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 bg-[#031712]/90 backdrop-blur-xl border-b border-white/10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-emerald-200 hover:text-white transition-colors"
              title="Return to Public Website"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-black tracking-wide text-white">Noor-e-ilahi</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-bold border border-amber-500/40">
                  MOBILE LAB & APP STORE DEPLOYMENT
                </span>
              </div>
              <p className="text-[10px] text-emerald-300/70">
                Interactive iPhone 16 Pro Simulator • Updated with Ziyarat, Calendar, Media, 99 Names, Deen Tracker & AI Companion
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/dashboard"
              className="text-xs text-amber-300 hover:text-amber-200 font-bold liquid-pill px-3.5 py-1.5 rounded-full"
            >
              Control Center
            </Link>
          </div>
        </div>
      </header>

      {/* Production Notice Banner */}
      {!bannerDismissed && (
        <div className="bg-gradient-to-r from-amber-500/20 via-emerald-600/20 to-teal-800/20 border-b border-amber-500/30 px-6 py-2.5 text-xs text-center flex items-center justify-center gap-3">
          <span className="text-amber-300 font-semibold">
            ✨ Mobile App Updated: Full 114 Surahs, 35+ Ziyarat sanctuaries, Hijri calendar, 4K media, 99 Names, and Ask AI bubble are live in this simulator!
          </span>
          <button
            onClick={() => setBannerDismissed(true)}
            className="text-[10px] text-emerald-300/70 hover:text-white underline flex items-center gap-1"
          >
            <EyeOff className="w-3 h-3" /> Dismiss Notice
          </button>
        </div>
      )}

      {/* Main Container */}
      <main className="flex-1 max-w-7xl mx-auto w-full p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Store Links & Deployment Checklist */}
        <div className="lg:col-span-7 space-y-8">
          <div>
            <div className="inline-flex items-center gap-2 liquid-pill px-3.5 py-1 rounded-full text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">
              <Smartphone className="w-3.5 h-3.5" />
              <span>Native iOS & Android Applications</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Noor-e-ilahi Mobile App Simulation & Store Readiness
            </h1>
            <p className="text-sm text-emerald-100/80 mt-2 leading-relaxed max-w-xl">
              Engineered with React Native, Expo 52, and Expo Router. Test all 10 native mobile screens in real-time inside the interactive iPhone sandbox, then build production binaries for Apple App Store and Google Play.
            </p>
          </div>

          {/* Screen Quick Launcher Matrix */}
          <div className="liquid-glass rounded-3xl p-5 border border-white/15 space-y-3">
            <span className="text-xs font-bold text-amber-300 uppercase tracking-wider block">
              Quick Screen Switcher (Test Any Mobile Feature):
            </span>
            <div className="flex flex-wrap gap-2 text-xs">
              {[
                { id: 'splash', label: '🎬 Splash Cinema', color: 'bg-amber-500/20 text-amber-300' },
                { id: 'home', label: '🕌 Home', color: 'bg-emerald-500/20' },
                { id: 'prayers', label: '⏱️ Prayers', color: 'bg-emerald-500/20' },
                { id: 'quran', label: '📖 Quran (114)', color: 'bg-emerald-500/20' },
                { id: 'ziyarat', label: '🏛️ Ziyarat (35+)', color: 'bg-amber-500/20 text-amber-300' },
                { id: 'tasbih', label: '📿 Tasbih & Duas', color: 'bg-emerald-500/20' },
                { id: 'calendar', label: '📅 Hijri Calendar', color: 'bg-emerald-500/20' },
                { id: 'media', label: '🖼️ 4K Media', color: 'bg-emerald-500/20' },
                { id: 'dashboard', label: '📊 Deen Tracker', color: 'bg-emerald-500/20' },
                { id: 'names', label: '✨ 99 Names', color: 'bg-amber-500/20 text-amber-300' },
                { id: 'giving', label: '💚 Sadaqah', color: 'bg-emerald-500/20' },
                { id: 'qibla', label: '🧭 Qibla', color: 'bg-emerald-500/20' },
                { id: 'contact', label: '✉️ Contact', color: 'bg-amber-500/20 text-amber-300' },
              ].map(s => (
                <button
                  key={s.id}
                  onClick={() => {
                    setActiveScreen(s.id as ScreenType);
                    if (s.id === 'splash') setSplashKey(k => k + 1);
                  }}
                  className={`px-3 py-1.5 rounded-xl font-bold transition-all border ${
                    activeScreen === s.id
                      ? 'bg-amber-500 text-emerald-950 border-amber-400 font-black shadow-lg scale-105'
                      : 'bg-[#04281e] text-emerald-200 border-white/10 hover:border-amber-400/40'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Official Store Badges */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            {/* Apple Store Badge */}
            <div className="liquid-glass rounded-2xl p-4 border border-white/20 flex items-center gap-3.5 shadow-xl">
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-white">
                <Apple className="w-7 h-7" />
              </div>
              <div>
                <span className="text-[10px] text-emerald-300/70 uppercase font-semibold block">Available on</span>
                <span className="text-base font-black text-white">Apple App Store</span>
                <span className="text-[10px] text-amber-300 font-mono block mt-0.5">Bundle: com.noor.app</span>
              </div>
            </div>

            {/* Google Play Badge */}
            <div className="liquid-glass rounded-2xl p-4 border border-white/20 flex items-center gap-3.5 shadow-xl">
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-emerald-400">
                <Play className="w-6 h-6 fill-emerald-400" />
              </div>
              <div>
                <span className="text-[10px] text-emerald-300/70 uppercase font-semibold block">Get it on</span>
                <span className="text-base font-black text-white">Google Play Store</span>
                <span className="text-[10px] text-amber-300 font-mono block mt-0.5">Package: com.noor.app</span>
              </div>
            </div>
          </div>

          {/* One-Click Expo EAS Build Command Terminal */}
          <div className="liquid-glass rounded-3xl p-6 border border-white/15 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                <Terminal className="w-4 h-4 text-amber-400" />
                Store Build & Auto-Submission Command
              </span>
              <button
                onClick={copyEasCommand}
                className="text-xs text-amber-300 hover:text-white flex items-center gap-1 bg-white/10 px-2.5 py-1 rounded-lg transition-colors font-bold"
              >
                {copiedEas ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : 'Copy Command'}
              </button>
            </div>
            <div className="bg-black/60 p-4 rounded-2xl font-mono text-xs text-emerald-300 border border-white/10 overflow-x-auto">
              <code>cd noor-mobile && npx eas build --platform all --auto-submit</code>
            </div>
            <p className="text-[11px] text-emerald-400/70 leading-relaxed">
              Generates signed production <span className="text-white font-semibold">.ipa</span> for TestFlight & App Store, and signed <span className="text-white font-semibold">.aab</span> for Google Play Console.
            </p>
          </div>

          {/* Store Metadata Checklist */}
          <div className="liquid-glass rounded-3xl p-6 border border-white/15 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider text-amber-300">
              Apple & Google Store Metadata Package
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 rounded-2xl bg-black/30 border border-white/10 space-y-1">
                <span className="text-[10px] text-emerald-400/80 uppercase font-bold block">App Title</span>
                <div className="font-bold text-white">Noor-e-ilahi: Prayer Times & Quran</div>
                <span className="text-[10px] text-emerald-300/60 block">30 char limit approved</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-black/30 border border-white/10 space-y-1">
                <span className="text-[10px] text-emerald-400/80 uppercase font-bold block">Subtitle / Tagline</span>
                <div className="font-bold text-white">Your Deen. Your Daily Companion.</div>
                <span className="text-[10px] text-emerald-300/60 block">High ASO keyword density</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-black/30 border border-white/10 space-y-1">
                <span className="text-[10px] text-emerald-400/80 uppercase font-bold block">Primary Category</span>
                <div className="font-bold text-white">Lifestyle & Spirituality</div>
                <span className="text-[10px] text-emerald-300/60 block">Secondary: Reference / Books</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-black/30 border border-white/10 space-y-1">
                <span className="text-[10px] text-emerald-400/80 uppercase font-bold block">Age Rating & Shariah</span>
                <div className="font-bold text-white">4+ (All Ages) • 100% Halal</div>
                <span className="text-[10px] text-emerald-300/60 block">Zero objectionable content</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: iPhone 16 Pro Interactive Hardware Frame */}
        <div className="lg:col-span-5 flex flex-col items-center sticky top-24">
          <div className="flex items-center justify-between w-[340px] sm:w-[370px] mb-3 px-1">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Live Device Sandbox
            </span>
            <button
              onClick={() => {
                setActiveScreen('splash');
                setSplashKey(k => k + 1);
              }}
              className="text-[10px] text-amber-300 hover:text-white bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 px-2.5 py-1 rounded-full font-bold flex items-center gap-1 transition-all shadow-sm"
              title="Play Animated Splash Cinema Screen"
            >
              <span>🎬 Splash Cinema</span>
            </button>
          </div>

          {/* iPhone 16 Pro Bezel */}
          <div className="relative w-[340px] sm:w-[370px] h-[740px] rounded-[3.5rem] bg-gradient-to-b from-zinc-800 via-zinc-900 to-black p-3.5 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] border-4 border-zinc-700/60 ring-1 ring-white/20">
            {/* Dynamic Island Pill */}
            <div className="absolute top-6 left-1/2 -translate-x-1/2 w-28 h-6 rounded-full bg-black z-30 flex items-center justify-between px-2.5">
              <div className="w-2.5 h-2.5 rounded-full bg-zinc-900" />
              <div className="w-2 h-2 rounded-full bg-emerald-500/60 animate-pulse" />
            </div>

            {/* Screen Content Container */}
            <div className={`w-full h-full rounded-[2.8rem] bg-[#02130e] overflow-hidden flex flex-col justify-between relative ${activeScreen === 'splash' ? 'p-0' : 'pt-10 pb-3 px-3.5'}`}>
              {/* 0. ANIMATED SPLASH SCREEN (AUTHENTIC NOOR-E-ILAHI APP DESIGN) */}
              {activeScreen === 'splash' ? (
                <div key={splashKey} className="w-full h-full bg-gradient-to-b from-[#02130e] via-[#031c15] to-[#010b08] overflow-hidden flex flex-col justify-between select-none relative p-6 animate-in fade-in duration-500">
                  {/* Subtle Background Arabesque Watermarks */}
                  <div className="absolute -top-6 -left-6 text-emerald-500/[0.03] text-8xl pointer-events-none font-serif select-none">
                    ۞
                  </div>
                  <div className="absolute -bottom-6 -right-6 text-amber-500/[0.03] text-8xl pointer-events-none font-serif select-none">
                    ۞
                  </div>

                  {/* Ambient Golden & Emerald Radial Glow */}
                  <div className="absolute top-[28%] left-1/2 -translate-x-1/2 w-64 h-64 rounded-full bg-gradient-to-br from-amber-500/20 via-emerald-500/15 to-transparent blur-3xl animate-soft-glow pointer-events-none" />

                  {/* Top Status Bar & Controls */}
                  <div className="relative z-10 pt-4 flex items-center justify-between">
                    <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/25">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-[7.5px] font-black tracking-wider text-emerald-300 uppercase">NOOR ECOSYSTEM</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => setSplashLoop(!splashLoop)}
                        className={`px-2 py-0.5 rounded-full border text-[7.5px] font-bold tracking-wider uppercase transition-all backdrop-blur-md ${
                          splashLoop
                            ? 'bg-amber-500 text-emerald-950 border-amber-400 font-black'
                            : 'bg-black/40 text-white/70 border-white/20 hover:text-white'
                        }`}
                        title="Toggle Loop Mode"
                      >
                        {splashLoop ? 'Loop: ON' : 'Loop: OFF'}
                      </button>
                      <button
                        onClick={() => setActiveScreen('home')}
                        className="px-2 py-0.5 rounded-full bg-black/40 hover:bg-black/60 text-white/80 hover:text-white border border-white/20 text-[7.5px] font-bold tracking-widest uppercase transition-all backdrop-blur-md"
                      >
                        Skip ✕
                      </button>
                    </div>
                  </div>

                  {/* Center Content: Bismillah + Sacred Noor Emblem + Brand Typography */}
                  <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center my-auto">
                    {/* Bismillah Calligraphy */}
                    <div className="mb-4 animate-in fade-in slide-in-from-top-2 duration-700">
                      <div className="text-amber-200 font-serif text-lg font-bold tracking-wide drop-shadow-[0_2px_8px_rgba(245,158,11,0.4)]">
                        بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                      </div>
                      <div className="text-[8px] text-emerald-300/70 tracking-wider mt-0.5 font-medium">
                        In the Name of Allah, the Most Gracious, the Most Merciful
                      </div>
                    </div>

                    {/* Official Sacred Noor Emblem */}
                    <div className="relative my-2 transform transition-transform hover:scale-105 duration-300 animate-in zoom-in-90 duration-700">
                      <MuslimLogo size={84} showText={false} animate={true} />
                    </div>

                    {/* Brand Title Row */}
                    <div className="mt-4 flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2 duration-700">
                      <span className="text-xl font-black tracking-wide text-white drop-shadow-md">
                        Noor-e-ilahi
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-bold">
                        نُورِ اِلٰہی
                      </span>
                    </div>

                    {/* Slogan */}
                    <p className="text-[10px] font-semibold text-emerald-300/90 mt-1 tracking-wider">
                      Your Deen. Your Daily Companion.
                    </p>

                    {/* Feature Pillars Bar */}
                    <div className="mt-4 flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-950/40 border border-emerald-500/20 text-[7.5px] text-emerald-200/80 font-bold tracking-wider">
                      <span>🕌 SALAAH</span>
                      <span className="text-amber-400">•</span>
                      <span>📖 QURAN</span>
                      <span className="text-amber-400">•</span>
                      <span>🏛️ ZIYARAT</span>
                      <span className="text-amber-400">•</span>
                      <span>🧭 QIBLA</span>
                    </div>
                  </div>

                  {/* Bottom Section: Progress Bar, Status & Action Buttons */}
                  <div className="relative z-10 flex flex-col items-center text-center pb-2">
                    {/* Animated Progress Track */}
                    <div className="w-48 h-1 rounded-full bg-white/10 overflow-hidden mb-2">
                      <div className="h-full bg-gradient-to-r from-amber-400 to-emerald-400 rounded-full animate-pulse transition-all duration-300" style={{ width: '85%' }} />
                    </div>

                    <div className="text-[7.5px] text-emerald-300/80 font-bold tracking-widest uppercase">
                      SYNCHRONIZING PRAYER TIMES & MECCA AZIMUTH...
                    </div>
                    <div className="text-[7px] text-white/40 tracking-wider mt-0.5">
                      NOOR-E-ILAHI v1.0.0 • GLOBAL ISLAMIC ECOSYSTEM
                    </div>

                    {/* Control Buttons */}
                    <div className="mt-3 flex items-center gap-2">
                      <button
                        onClick={() => setSplashKey(k => k + 1)}
                        className="px-2.5 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-[8.5px] font-bold flex items-center gap-1 backdrop-blur-md transition-all shadow"
                        title="Replay Entrance Animation"
                      >
                        <span>▶ Replay</span>
                      </button>
                      <button
                        onClick={() => setActiveScreen('home')}
                        className="px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white border border-white/20 text-[8.5px] font-bold flex items-center gap-1 backdrop-blur-md transition-all shadow"
                      >
                        <span>Enter App ➔</span>
                      </button>
                    </div>
                  </div>

                  {/* iOS Home Indicator Bar */}
                  <div className="relative z-10 w-24 h-1 bg-white/40 rounded-full mx-auto" />
                </div>
              ) : (
                <>
                  {/* Inside Screen: Dynamic View based on activeScreen */}
                  <div className="flex-1 overflow-y-auto pt-2 space-y-3.5 text-xs no-scrollbar">
                {/* 1. HOME SCREEN */}
                {activeScreen === 'home' && (
                  <div className="space-y-3.5 animate-in fade-in">
                    {/* Phone Header with Website Muslim Logo, Profile & Hamburger Menu */}
                    <div className="flex items-center justify-between pb-1.5 border-b border-white/5">
                      <button
                        onClick={() => setSimulatedMenuOpen(true)}
                        className="text-left hover:opacity-90 transition-opacity"
                        title="Open Mobile Navigation Menu"
                      >
                        <MuslimLogo size={30} showText />
                      </button>

                      <div className="flex items-center gap-1">
                        {/* Native Language Selector Pill */}
                        <button
                          onClick={() => setSimulatedLangModalOpen(true)}
                          className="h-6 px-1.5 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1 hover:bg-amber-500/30 transition-colors"
                          title="Change Native Language • मातृभाषा / زبان"
                        >
                          <span className="text-[10px]">{currentLanguageInfo.flag}</span>
                          <span className="text-[8px] font-bold">{currentLanguageInfo.nativeName}</span>
                        </button>

                        {/* Profile / Auth Button */}
                        <button
                          onClick={() => setSimulatedAuthOpen(true)}
                          className="w-6 h-6 rounded-full bg-amber-500 text-emerald-950 font-black text-[10px] flex items-center justify-center border border-amber-400/50 shadow-sm hover:scale-105 transition-transform"
                          title="Account & Google Sign-In"
                        >
                          {simulatedUser ? simulatedUser.name.charAt(0) : <User className="w-3 h-3" />}
                        </button>

                        {/* Hamburger Menu Button */}
                        <button
                          onClick={() => setSimulatedMenuOpen(true)}
                          className="w-6 h-6 rounded-lg bg-white/10 hover:bg-white/15 text-white flex items-center justify-center border border-white/10 transition-colors"
                          title="Open Menu Drawer"
                        >
                          <Menu className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Next Prayer Mobile Card with Adhan Voice Player */}
                    <div className="liquid-glass-gold rounded-2xl p-3 border border-amber-500/40 space-y-2">
                      <div className="flex items-baseline justify-between">
                        <div>
                          <span className="text-[8px] font-black text-amber-400 uppercase tracking-widest">{t('upcomingSalaah') || 'NEXT SALAAH'}</span>
                          <div className="text-sm font-bold text-white">{t('asr')} • صلاة العصر</div>
                        </div>
                        <span className="text-base font-black font-mono text-amber-300">04:18 PM</span>
                      </div>

                      <div className="text-center bg-black/40 py-1 rounded-lg text-amber-300 font-mono font-bold text-[9px]">
                        00h 42m {t('remainingUntilAdhan') || 'remaining until Adhan'}
                      </div>

                      {/* Adhan Voice Controller Bar */}
                      <div className="flex items-center justify-between bg-black/40 p-1.5 rounded-xl border border-amber-400/20 text-[9px]">
                        <button
                          onClick={() => setSimulatedAdhanOpen(true)}
                          className="flex items-center gap-1 text-left flex-1 truncate pr-1"
                        >
                          <Volume2 className="w-3 h-3 text-amber-400 shrink-0" />
                          <span className="text-white truncate font-medium">{t('adhanVoice') || 'Adhan'}: {simulatedActiveAdhan.name}</span>
                        </button>
                        <button
                          onClick={() => setSimulatedAdhanOpen(true)}
                          className="px-1.5 py-0.5 rounded bg-amber-500 text-emerald-950 font-black text-[8px] shrink-0"
                        >
                          {t('adhanVoice') || 'Voices'} 🔊
                        </button>
                      </div>
                    </div>

                    {/* 10-Item Quick Essentials Grid */}
                    <div>
                      <div className="text-[10px] font-bold text-emerald-300/80 uppercase tracking-wider mb-2">
                        {t('quickEssentials') || 'Sacred Deen Essentials'}
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => setActiveScreen('prayers')}
                          className="p-2.5 rounded-xl bg-[#04281e] border border-emerald-800/40 text-left hover:border-amber-400/40 transition-colors"
                        >
                          <span className="text-sm">⏱️</span>
                          <div className="font-bold text-white text-[11px] mt-0.5">{t('prayers') || 'Prayer Times'}</div>
                          <span className="text-[9px] text-emerald-300/60">{t('prayerTimetable') || 'Fajr - Isha'}</span>
                        </button>

                        <button
                          onClick={() => setActiveScreen('quran')}
                          className="p-2.5 rounded-xl bg-[#04281e] border border-emerald-800/40 text-left hover:border-amber-400/40 transition-colors"
                        >
                          <span className="text-sm">📖</span>
                          <div className="font-bold text-white text-[11px] mt-0.5">{t('quran') || 'Noble Quran'}</div>
                          <span className="text-[9px] text-emerald-300/60">114 {t('surahsCatalog') || 'Surahs'}</span>
                        </button>

                        <button
                          onClick={() => setActiveScreen('ziyarat')}
                          className="p-2.5 rounded-xl bg-[#04281e] border border-amber-500/40 text-left hover:border-amber-400 transition-colors"
                        >
                          <span className="text-sm">🏛️</span>
                          <div className="font-bold text-amber-300 text-[11px] mt-0.5">{t('ziyarat') || 'Ziyarat & Dargahs'}</div>
                          <span className="text-[9px] text-emerald-300/60">35+ {t('searchSanctuaries') || 'Sanctuaries'}</span>
                        </button>

                        <button
                          onClick={() => setActiveScreen('tasbih')}
                          className="p-2.5 rounded-xl bg-[#04281e] border border-emerald-800/40 text-left hover:border-amber-400/40 transition-colors"
                        >
                          <span className="text-sm">📿</span>
                          <div className="font-bold text-white text-[11px] mt-0.5">{t('duas') || 'Digital Tasbih'}</div>
                          <span className="text-[9px] text-emerald-300/60">Haptic Dhikr</span>
                        </button>

                        <button
                          onClick={() => setActiveScreen('calendar')}
                          className="p-2.5 rounded-xl bg-[#04281e] border border-emerald-800/40 text-left hover:border-amber-400/40 transition-colors"
                        >
                          <span className="text-sm">📅</span>
                          <div className="font-bold text-white text-[11px] mt-0.5">{t('calendar') || 'Hijri Calendar'}</div>
                          <span className="text-[9px] text-emerald-300/60">{t('sacredLunarMonths') || '12 Lunar Months'}</span>
                        </button>

                        <button
                          onClick={() => setActiveScreen('media')}
                          className="p-2.5 rounded-xl bg-[#04281e] border border-emerald-800/40 text-left hover:border-amber-400/40 transition-colors"
                        >
                          <span className="text-sm">🖼️</span>
                          <div className="font-bold text-white text-[11px] mt-0.5">{t('mediaGallery') || 'Islamic Media'}</div>
                          <span className="text-[9px] text-emerald-300/60">4K Wallpapers</span>
                        </button>

                        <button
                          onClick={() => setActiveScreen('dashboard')}
                          className="p-2.5 rounded-xl bg-[#04281e] border border-emerald-800/40 text-left hover:border-amber-400/40 transition-colors"
                        >
                          <span className="text-sm">📊</span>
                          <div className="font-bold text-white text-[11px] mt-0.5">{t('spiritualDeenTracker') || 'Deen Tracker'}</div>
                          <span className="text-[9px] text-emerald-300/60">{t('dailySalaahChecklist') || 'Daily Worship Log'}</span>
                        </button>

                        <button
                          onClick={() => setActiveScreen('names')}
                          className="p-2.5 rounded-xl bg-[#04281e] border border-emerald-800/40 text-left hover:border-amber-400/40 transition-colors"
                        >
                          <span className="text-sm">✨</span>
                          <div className="font-bold text-white text-[11px] mt-0.5">{t('asmaUlHusna') || '99 Names'}</div>
                          <span className="text-[9px] text-emerald-300/60">Asma-ul-Husna</span>
                        </button>
                      </div>
                    </div>

                    {/* Daily Ayah Mobile Card */}
                    <div className="p-3 rounded-2xl bg-[#031a14] border border-white/10">
                      <span className="text-[9px] text-amber-400 font-bold uppercase">Verse of the Day • Ayat al-Kursi</span>
                      <p className="arabic-text text-sm font-bold text-amber-200 mt-1">
                        اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ
                      </p>
                      <p className="text-[10px] text-emerald-100/80 mt-1 line-clamp-2">
                        "Allah! There is no deity except Him, the Ever-Living, the Sustainer of existence..."
                      </p>
                    </div>
                  </div>
                )}

                {/* 2. PRAYERS SCREEN */}
                {activeScreen === 'prayers' && (
                  <div className="space-y-2.5 animate-in fade-in">
                    <div className="flex items-center justify-between">
                      <div className="font-bold text-white text-sm">{t('prayerTimetable') || 'Prayer Times Timetable'}</div>
                      <span className="text-[10px] text-amber-300 font-mono font-bold">MWL • Standard</span>
                    </div>
                    {[
                      { id: 'fajr', name: t('fajr') || 'Fajr', time: '05:08 AM', ar: 'الفجر' },
                      { id: 'sunrise', name: t('sunrise') || 'Sunrise', time: '06:32 AM', ar: 'الشروق' },
                      { id: 'dhuhr', name: t('dhuhr') || 'Dhuhr', time: '12:28 PM', ar: 'الظهر' },
                      { id: 'asr', name: t('asr') || 'Asr', time: '03:49 PM', ar: 'العصر', active: true },
                      { id: 'maghrib', name: t('maghrib') || 'Maghrib', time: '06:19 PM', ar: 'المغرب' },
                      { id: 'isha', name: t('isha') || 'Isha', time: '07:34 PM', ar: 'العشاء' },
                    ].map((p, idx) => (
                      <div
                        key={idx}
                        className={`p-2 rounded-xl flex items-center justify-between ${
                          p.active ? 'bg-amber-500/20 border border-amber-400/60' : 'bg-[#031a14] border border-white/5'
                        }`}
                      >
                        <div>
                          <span className="font-bold text-white block text-xs">{p.name}</span>
                          <span className="text-[9px] text-emerald-300/70">{p.ar}</span>
                        </div>
                        <span className="font-mono font-bold text-amber-300 text-xs">{p.time}</span>
                      </div>
                    ))}

                    {/* Qada Counter Mini Box */}
                    <div className="p-2.5 rounded-xl bg-[#04281e] border border-emerald-800/40 mt-2">
                      <span className="text-[9px] font-bold text-amber-300 block mb-1">{t('dailyQadaLogger') || 'Qada Missed Prayers Log'}:</span>
                      <div className="flex items-center justify-between text-[10px]">
                        {(['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'] as const).map(pr => (
                          <div key={pr} className="flex flex-col items-center">
                            <span className="text-white font-bold">{t(pr.toLowerCase()) || pr}</span>
                            <div className="flex items-center gap-1 mt-0.5">
                              <button onClick={() => decrementQada(pr)} className="text-emerald-400 text-xs">-</button>
                              <span className="font-mono text-amber-300 font-bold">{qadaCounts[pr]}</span>
                              <button onClick={() => incrementQada(pr)} className="text-emerald-400 text-xs">+</button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* 3. QURAN SCREEN */}
                {activeScreen === 'quran' && (
                  <div className="space-y-2 animate-in fade-in">
                    <div className="flex items-center justify-between">
                      <div className="font-bold text-white text-sm">{t('holyQuran') || 'The Noble Qur\'an'} (114 {t('surahsCatalog') || 'Surahs'})</div>
                      <span className="text-[9px] text-amber-300 font-bold bg-amber-500/20 px-2 py-0.5 rounded">Alafasy</span>
                    </div>
                    {[
                      { no: 1, name: 'Al-Fatihah', ar: 'الفاتحة', ayahs: 7, type: 'Meccan' },
                      { no: 2, name: 'Al-Baqarah', ar: 'البقرة', ayahs: 286, type: 'Medinan' },
                      { no: 3, name: "Ali 'Imran", ar: 'آل عمران', ayahs: 200, type: 'Medinan' },
                      { no: 18, name: 'Al-Kahf', ar: 'الكهف', ayahs: 110, type: 'Meccan' },
                      { no: 36, name: 'Ya-Sin', ar: 'يس', ayahs: 83, type: 'Meccan' },
                      { no: 55, name: 'Ar-Rahman', ar: 'الرحمن', ayahs: 78, type: 'Medinan' },
                      { no: 67, name: 'Al-Mulk', ar: 'الملك', ayahs: 30, type: 'Meccan' },
                      { no: 112, name: 'Al-Ikhlas', ar: 'الإخلاص', ayahs: 4, type: 'Meccan' },
                    ].map(s => (
                      <div key={s.no} className="p-2 rounded-xl bg-[#031a14] border border-white/5 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-5 h-5 rounded bg-black/40 text-[9px] font-bold text-amber-400 flex items-center justify-center">
                            {s.no}
                          </span>
                          <div>
                            <span className="font-bold text-white block text-xs">{s.name}</span>
                            <span className="text-[8px] text-emerald-300/60">{s.type} • {s.ayahs} {t('verses') || 'Ayahs'}</span>
                          </div>
                        </div>
                        <span className="arabic-text text-sm text-amber-200">{s.ar}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* 4. ZIYARAT SCREEN */}
                {activeScreen === 'ziyarat' && (
                  <div className="space-y-2.5 animate-in fade-in">
                    <div className="flex items-center justify-between">
                      <div className="font-bold text-white text-sm">{t('ziyarat') || 'Ziyarat & Dargahs Directory'}</div>
                      <span className="text-[9px] text-amber-300 font-bold bg-amber-500/20 px-2 py-0.5 rounded">35+ {t('searchSanctuaries') || 'Sanctuaries'}</span>
                    </div>

                    {/* Country Filter Bar */}
                    <div className="flex items-center gap-1 overflow-x-auto pb-1 no-scrollbar text-[9px]">
                      {['All', 'Morocco 🇲🇦', 'Iraq 🇮🇶', 'Egypt 🇪🇬', 'Turkey 🇹🇷', 'India 🇮🇳', 'Pakistan 🇵🇰'].map(c => (
                        <button
                          key={c}
                          onClick={() => setSelectedZiyaratCountry(c)}
                          className={`px-2 py-1 rounded-lg font-bold whitespace-nowrap ${
                            selectedZiyaratCountry === c ? 'bg-amber-500 text-emerald-950 font-black' : 'bg-[#04281e] text-emerald-200'
                          }`}
                        >
                          {c}
                        </button>
                      ))}
                    </div>

                    {/* Sanctuary Cards */}
                    {[
                      {
                        title: 'Zawiya of Moulay Idris II',
                        city: 'Fez, Morocco 🇲🇦',
                        silsila: 'Idrisiyya',
                        img: 'https://images.unsplash.com/photo-1587974928442-77dc3e0dba72?w=600&q=80'
                      },
                      {
                        title: 'Holy Shrine of Imam Ali ibn Abi Talib',
                        city: 'Najaf al-Ashraf, Iraq 🇮🇶',
                        silsila: 'Ahl al-Bayt',
                        img: 'https://images.unsplash.com/photo-1564769625905-50e93615e769?w=600&q=80'
                      },
                      {
                        title: 'Mazar of Sheikh Abdul Qadir Gilani',
                        city: 'Baghdad, Iraq 🇮🇶',
                        silsila: 'Qadiri',
                        img: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?w=600&q=80'
                      },
                      {
                        title: 'Dargah Ajmer Sharif (Khwaja Garib Nawaz)',
                        city: 'Ajmer, Rajasthan, India 🇮🇳',
                        silsila: 'Chishti',
                        img: 'https://images.unsplash.com/photo-1565552645632-d725f8bfc19a?w=600&q=80'
                      }
                    ].map((sanc, i) => (
                      <div key={i} className="rounded-xl overflow-hidden bg-[#031a14] border border-white/10">
                        <img src={sanc.img} alt={sanc.title} className="w-full h-16 object-cover" />
                        <div className="p-2">
                          <span className="text-[8px] bg-amber-500/20 text-amber-300 font-bold px-1.5 py-0.5 rounded">{sanc.silsila}</span>
                          <div className="font-bold text-white text-[11px] mt-1">{sanc.title}</div>
                          <span className="text-[9px] text-emerald-300/70">{sanc.city}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* 5. TASBIH & DUAS SCREEN */}
                {activeScreen === 'tasbih' && (
                  <div className="space-y-3 animate-in fade-in text-center">
                    <div className="font-bold text-white text-sm">{t('duas') || 'Digital Tasbih & Dhikr'}</div>
                    <p className="arabic-text text-xl font-bold text-amber-200">سُبْحَانَ اللَّهِ</p>
                    <span className="text-[10px] text-emerald-300/80">SubhanAllah • Glory be to Allah</span>

                    {/* Touch Arena */}
                    <button
                      onClick={() => setMobileCount(prev => prev + 1)}
                      className="w-32 h-32 rounded-full bg-gradient-to-br from-amber-500/30 to-emerald-800/40 border-2 border-amber-400 mx-auto flex flex-col items-center justify-center active:scale-95 transition-transform shadow-lg shadow-amber-500/20"
                    >
                      <span className="text-3xl font-black text-amber-300 font-mono">{mobileCount}</span>
                      <span className="text-[8px] text-emerald-200 font-bold mt-0.5">{t('counter') || 'TAP TO COUNT'}</span>
                    </button>

                    {/* Target Selector */}
                    <div className="flex items-center justify-center gap-2 text-[10px]">
                      {[33, 100, 1000].map(trg => (
                        <button
                          key={trg}
                          onClick={() => { setTasbihTarget(trg); setMobileCount(0); }}
                          className={`px-3 py-1 rounded-lg font-bold ${
                            tasbihTarget === trg ? 'bg-amber-500 text-emerald-950 font-black' : 'bg-[#031a14] text-emerald-300'
                          }`}
                        >
                          {trg}x {t('target') || 'Target'}
                        </button>
                      ))}
                      <button
                        onClick={() => setMobileCount(0)}
                        className="text-[10px] text-red-300 font-bold bg-red-500/10 px-2.5 py-1 rounded-lg"
                      >
                        {t('resetQada') || 'Reset'}
                      </button>
                    </div>

                    {/* Supplication Sample */}
                    <div className="p-2.5 rounded-xl bg-[#031a14] border border-white/5 text-left mt-2">
                      <span className="text-[8px] text-amber-400 font-bold uppercase">Sayyid al-Istighfar</span>
                      <p className="text-[9px] text-white font-serif mt-1">
                        "Allahumma Anta Rabbi la ilaha illa Anta..."
                      </p>
                    </div>
                  </div>
                )}

                {/* 6. CALENDAR SCREEN */}
                {activeScreen === 'calendar' && (
                  <div className="space-y-2 animate-in fade-in">
                    <div className="font-bold text-white text-sm">{t('calendar') || 'Islamic Hijri Months (1448 AH)'}</div>
                    {[
                      { idx: 1, en: 'Muharram', ar: 'المُحَرَّم', sacred: true },
                      { idx: 3, en: 'Rabi al-Awwal', ar: 'رَبِيع الأَوَّل', sacred: false },
                      { idx: 7, en: 'Rajab', ar: 'رَجَب', sacred: true },
                      { idx: 9, en: 'Ramadan', ar: 'رَمَضَان', holy: true },
                      { idx: 10, en: 'Shawwal', ar: 'شَوَّال', sacred: false },
                      { idx: 12, en: 'Dhu al-Hijjah', ar: 'ذُو الحِجَّة', sacred: true, holy: true },
                    ].map(m => (
                      <div
                        key={m.idx}
                        className={`p-2 rounded-xl flex items-center justify-between ${
                          m.holy ? 'bg-amber-500/20 border border-amber-400/50' : 'bg-[#031a14] border border-white/5'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="w-5 h-5 rounded bg-black/40 text-[9px] font-bold text-amber-400 flex items-center justify-center">
                            {m.idx}
                          </span>
                          <div>
                            <span className="font-bold text-white block text-xs">{m.en}</span>
                            {m.sacred && <span className="text-[7px] text-emerald-400 font-bold">{t('sacredLunarMonths') || 'Sacred Month'}</span>}
                            {m.holy && <span className="text-[7px] text-amber-400 font-bold">{t('holyObservances') || 'Holiest Month'}</span>}
                          </div>
                        </div>
                        <span className="arabic-text text-sm text-amber-200">{m.ar}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* 7. MEDIA GALLERY SCREEN (ENHANCED 4K PHOTOS & VIDEOS) */}
                {activeScreen === 'media' && (
                  <div className="space-y-2.5 animate-in fade-in">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-bold text-white text-sm">{t('mediaGallery') || 'Islamic Visual Gallery'}</div>
                        <span className="text-[9px] text-emerald-300/70">4K Cinematography & Sacred Photography</span>
                      </div>
                      <span className="text-[9px] text-amber-300 font-bold bg-amber-500/20 px-2 py-0.5 rounded border border-amber-500/30">
                        {simulatedMediaTab === 'photos' ? `${SIMULATED_PHOTOS.length} Photos` : `${SIMULATED_VIDEOS.length} Videos`}
                      </span>
                    </div>

                    {/* Media Type Switcher: Photos vs Videos */}
                    <div className="grid grid-cols-2 gap-1.5 p-1 bg-black/40 rounded-xl border border-white/5">
                      <button
                        onClick={() => { setSimulatedMediaTab('photos'); setSimulatedActiveVideo(null); }}
                        className={`py-1.5 px-2 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                          simulatedMediaTab === 'photos'
                            ? 'bg-amber-400 text-emerald-950 shadow-md shadow-amber-400/20'
                            : 'text-emerald-300 hover:text-white'
                        }`}
                      >
                        <ImageIcon className="w-3.5 h-3.5" />
                        <span>Sacred Photos ({SIMULATED_PHOTOS.length})</span>
                      </button>

                      <button
                        onClick={() => setSimulatedMediaTab('videos')}
                        className={`py-1.5 px-2 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                          simulatedMediaTab === 'videos'
                            ? 'bg-amber-400 text-emerald-950 shadow-md shadow-amber-400/20'
                            : 'text-emerald-300 hover:text-white'
                        }`}
                      >
                        <Play className="w-3.5 h-3.5 fill-current" />
                        <span>4K Videos ({SIMULATED_VIDEOS.length})</span>
                      </button>
                    </div>

                    {/* VIDEOS TAB */}
                    {simulatedMediaTab === 'videos' && (
                      <div className="space-y-2.5">
                        {/* Active Playable Video Player */}
                        {simulatedActiveVideo && (
                          <div className="p-2.5 rounded-xl bg-[#021812] border border-amber-400/40 space-y-2 shadow-xl animate-in zoom-in-95">
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-amber-300 font-bold flex items-center gap-1">
                                <Film className="w-3 h-3 text-amber-400" /> Now Playing in 4K
                              </span>
                              <button
                                onClick={() => setSimulatedActiveVideo(null)}
                                className="text-[10px] text-zinc-400 hover:text-white bg-black/40 px-2 py-0.5 rounded flex items-center gap-1"
                              >
                                <X className="w-3 h-3" /> Close Player
                              </button>
                            </div>
                            <video
                              src={simulatedActiveVideo.url}
                              controls
                              autoPlay
                              className="w-full h-40 rounded-lg object-cover bg-black shadow-inner border border-white/10"
                            />
                            <div>
                              <span className="text-white text-xs font-bold block">{simulatedActiveVideo.title}</span>
                              <div className="flex items-center justify-between text-[9px] text-emerald-300/70 mt-0.5">
                                <span>📍 {simulatedActiveVideo.loc}</span>
                                <span className="text-amber-300 font-mono">⏱️ {simulatedActiveVideo.duration}</span>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Video List */}
                        <div className="space-y-2">
                          {SIMULATED_VIDEOS.map(v => (
                            <div
                              key={v.id}
                              onClick={() => setSimulatedActiveVideo({ title: v.title, url: v.url, duration: v.duration, loc: v.loc })}
                              className="p-2 rounded-xl bg-[#031a14] border border-white/5 hover:border-amber-400/40 cursor-pointer transition-all flex gap-2.5 group"
                            >
                              <div className="relative w-24 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-black">
                                <img src={v.thumb} alt={v.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                                  <div className="w-6 h-6 rounded-full bg-amber-400 text-emerald-950 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                                    <Play className="w-3 h-3 fill-current ml-0.5" />
                                  </div>
                                </div>
                                <span className="absolute bottom-1 right-1 bg-black/80 px-1 py-0.2 text-[8px] font-mono text-amber-300 rounded">
                                  {v.duration}
                                </span>
                              </div>
                              <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                                <div>
                                  <div className="flex items-center gap-1.5">
                                    <span className="text-[8px] font-bold px-1.5 py-0.2 bg-emerald-500/20 text-emerald-300 rounded">
                                      {v.cat}
                                    </span>
                                    <span className="text-[8px] text-zinc-400">👁️ {v.views}</span>
                                  </div>
                                  <span className="text-xs font-bold text-white block truncate mt-0.5 group-hover:text-amber-300 transition-colors">
                                    {v.title}
                                  </span>
                                </div>
                                <span className="text-[9px] text-emerald-300/60 truncate">
                                  📍 {v.loc}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* PHOTOS TAB */}
                    {simulatedMediaTab === 'photos' && (
                      <div className="space-y-2">
                        {/* Category filter */}
                        <div className="flex items-center gap-1 overflow-x-auto pb-1 no-scrollbar text-[9px]">
                          {['All', 'Makkah', 'Madinah', 'Holy Quran', 'Architecture', 'Calligraphy'].map(cat => (
                            <button
                              key={cat}
                              onClick={() => setSimulatedPhotoCategory(cat)}
                              className={`px-2 py-0.5 rounded-lg font-bold whitespace-nowrap transition-all ${
                                simulatedPhotoCategory === cat
                                  ? 'bg-amber-400 text-emerald-950 font-black'
                                  : 'bg-[#04281e] text-emerald-200 hover:text-white'
                              }`}
                            >
                              {cat}
                            </button>
                          ))}
                        </div>

                        {/* Photo Grid */}
                        <div className="grid grid-cols-2 gap-2">
                          {SIMULATED_PHOTOS
                            .filter(p => simulatedPhotoCategory === 'All' || p.cat === simulatedPhotoCategory)
                            .map(p => (
                              <div
                                key={p.id}
                                onClick={() => setSimulatedPreviewPhoto(p)}
                                className="rounded-xl overflow-hidden bg-black/40 border border-white/10 relative group cursor-pointer hover:border-amber-400/40 transition-all"
                              >
                                <div className="relative h-24 overflow-hidden">
                                  <img
                                    src={p.img}
                                    alt={p.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                  />
                                  <span className="absolute top-1 left-1 text-[8px] font-bold px-1.5 py-0.2 bg-black/70 text-amber-300 rounded backdrop-blur-sm">
                                    {p.cat}
                                  </span>
                                  <span className="absolute bottom-1 right-1 text-[8px] px-1 py-0.2 bg-black/70 text-emerald-300 rounded flex items-center gap-0.5">
                                    <Heart className="w-2.5 h-2.5 text-red-400 fill-red-400" /> {(p.likes / 1000).toFixed(1)}k
                                  </span>
                                </div>
                                <div className="p-1.5 bg-[#031a14]">
                                  <span className="text-[9px] font-bold text-white truncate block">{p.title}</span>
                                  <span className="text-[8px] text-emerald-300/60 truncate block mt-0.5">📍 {p.loc}</span>
                                </div>
                              </div>
                            ))}
                        </div>

                        {/* Photo Zoom Modal */}
                        {simulatedPreviewPhoto && (
                          <div className="p-2.5 rounded-xl bg-[#021812] border border-amber-400/40 space-y-2 shadow-xl animate-in zoom-in-95">
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-amber-300 font-bold">{simulatedPreviewPhoto.cat} HD Preview</span>
                              <button
                                onClick={() => setSimulatedPreviewPhoto(null)}
                                className="text-[10px] text-zinc-400 hover:text-white bg-black/40 px-2 py-0.5 rounded flex items-center gap-1"
                              >
                                <X className="w-3 h-3" /> Close
                              </button>
                            </div>
                            <img src={simulatedPreviewPhoto.img} alt={simulatedPreviewPhoto.title} className="w-full h-44 rounded-lg object-cover" />
                            <div>
                              <span className="text-white text-xs font-bold block">{simulatedPreviewPhoto.title}</span>
                              <div className="flex items-center justify-between text-[9px] text-emerald-300/70 mt-1">
                                <span>📍 {simulatedPreviewPhoto.loc}</span>
                                <span className="text-amber-300">❤️ {simulatedPreviewPhoto.likes.toLocaleString()} favorites</span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {/* 8. DEEN TRACKER DASHBOARD */}
                {activeScreen === 'dashboard' && (
                  <div className="space-y-2.5 animate-in fade-in">
                    <div className="font-bold text-white text-sm">{t('spiritualDeenTracker') || 'Spiritual Deen Tracker'}</div>
                    {/* Score */}
                    <div className="p-3 rounded-xl bg-[#04281e] border border-amber-500/30 flex items-center justify-between">
                      <div>
                        <span className="text-white font-bold block text-xs">{t('dailySalaahChecklist') || 'Today\'s Prayer Score'}</span>
                        <span className="text-[9px] text-emerald-300/70">14-Day Worship Streak</span>
                      </div>
                      <span className="text-lg font-black text-amber-300 font-mono">60%</span>
                    </div>

                    {/* Daily Checklist */}
                    <div className="space-y-1">
                      {(['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'] as const).map(pr => (
                        <button
                          key={pr}
                          onClick={() => togglePrayerCheck(pr)}
                          className="w-full p-2 rounded-xl bg-[#031a14] border border-white/5 flex items-center justify-between text-left"
                        >
                          <div className="flex items-center gap-2">
                            {prayerChecks[pr] ? (
                              <CheckSquare className="w-4 h-4 text-emerald-400" />
                            ) : (
                              <Square className="w-4 h-4 text-emerald-400/40" />
                            )}
                            <span className={`text-xs font-bold ${prayerChecks[pr] ? 'text-emerald-300' : 'text-white'}`}>
                              {t(pr.toLowerCase()) || pr}
                            </span>
                          </div>
                          <span className="text-[9px] text-amber-300/80">Completed</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* 9. 99 NAMES OF ALLAH */}
                {activeScreen === 'names' && (
                  <div className="space-y-2 animate-in fade-in">
                    <div className="font-bold text-white text-sm">{t('asmaUlHusna') || 'Asma-ul-Husna (99 Divine Names)'}</div>
                    {[
                      { num: 1, ar: 'الرَّحْمَٰنُ', en: 'Ar-Rahman', meaning: 'The Entirely Merciful' },
                      { num: 2, ar: 'الرَّحِيمُ', en: 'Ar-Raheem', meaning: 'The Especially Merciful' },
                      { num: 3, ar: 'الْمَلِكُ', en: 'Al-Malik', meaning: 'The Absolute Sovereign' },
                      { num: 4, ar: 'الْقُدُّوسُ', en: 'Al-Quddus', meaning: 'The Pure & Holy' },
                      { num: 5, ar: 'السَّلَامُ', en: 'As-Salam', meaning: 'The Source of Peace' },
                      { num: 6, ar: 'الْمُؤْمِنُ', en: 'Al-Mu’min', meaning: 'The Inspirer of Faith' },
                    ].map(n => (
                      <div key={n.num} className="p-2 rounded-xl bg-[#031a14] border border-white/5 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-5 h-5 rounded bg-black/40 text-[9px] font-bold text-amber-400 flex items-center justify-center">
                            {n.num}
                          </span>
                          <div>
                            <span className="font-bold text-white block text-xs">{n.en}</span>
                            <span className="text-[8px] text-emerald-300/70">{n.meaning}</span>
                          </div>
                        </div>
                        <span className="arabic-text text-sm text-amber-200 font-bold">{n.ar}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* 10. SADAQAH GIVING */}
                {activeScreen === 'giving' && (
                  <div className="space-y-2.5 animate-in fade-in">
                    <div className="font-bold text-white text-sm">{t('sadaqahJariyah') || 'Sadaqah Jariyah'}</div>
                    <div className="p-2.5 rounded-xl bg-[#04281e] border border-amber-500/30 text-center">
                      <span className="text-[9px] text-amber-300 block font-italic">"Charity does not decrease wealth"</span>
                      <span className="text-[8px] text-emerald-300/60">— Sahih Muslim 2588</span>
                    </div>

                    {[
                      { title: 'Clean Water Wells (Saqia al-Maa)', target: '$15,000' },
                      { title: 'Noble Quran Printing & Distribution', target: '$10,000' },
                      { title: 'Orphan Care & Islamic Education', target: '$25,000' },
                    ].map((c, i) => (
                      <div key={i} className="p-2 rounded-xl bg-[#031a14] border border-white/5">
                        <span className="text-xs font-bold text-white block">{c.title}</span>
                        <div className="w-full h-1.5 bg-black/40 rounded-full mt-1.5 overflow-hidden">
                          <div className="h-full bg-emerald-400 rounded-full" style={{ width: '74%' }} />
                        </div>
                        <span className="text-[8px] text-emerald-300/70 mt-1 block">{t('target') || 'Goal'}: {c.target}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* 11. QIBLA SCREEN — DYNAMIC GYROSCOPE COMPASS */}
                {activeScreen === 'qibla' && (() => {
                  const relKaabaAngle = (qiblaTargetBearing - simulatedHeading + 360) % 360;
                  const isAligned = relKaabaAngle <= 4 || relKaabaAngle >= 356;

                  const getCardinalName = (deg: number) => {
                    const val = (deg + 360) % 360;
                    if (val >= 337.5 || val < 22.5) return 'N';
                    if (val >= 22.5 && val < 67.5) return 'NE';
                    if (val >= 67.5 && val < 112.5) return 'E';
                    if (val >= 112.5 && val < 157.5) return 'ESE';
                    if (val >= 157.5 && val < 202.5) return 'S';
                    if (val >= 202.5 && val < 247.5) return 'SW';
                    if (val >= 247.5 && val < 292.5) return 'W';
                    return 'NW';
                  };

                  return (
                    <div className="space-y-3 animate-in fade-in text-center">
                      <div className="flex items-center justify-between px-1">
                        <div className="text-left">
                          <div className="font-bold text-white text-xs">{t('qibla') || 'Spherical Qibla Compass'}</div>
                          <span className="text-[8px] text-emerald-300/70">{t('qiblaSub') || 'Direction towards Holy Kaaba'}</span>
                        </div>
                        <div className="flex items-center gap-1 bg-black/40 px-2 py-0.5 rounded-full border border-white/10 text-[8px]">
                          <span className={`w-1.5 h-1.5 rounded-full ${isGyroActive ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
                          <span className="text-white font-bold">{isGyroActive ? 'Live Gyro' : 'Simulator'}</span>
                        </div>
                      </div>

                      {/* Alignment Notification Banner */}
                      {isAligned ? (
                        <div className="p-2 rounded-xl bg-emerald-500/20 border border-emerald-400 text-emerald-300 font-black text-[10px] animate-pulse shadow-lg shadow-emerald-500/20">
                          <div>🕋 ALIGNED WITH THE HOLY KAABA 🕋</div>
                          <span className="text-[8px] text-emerald-200 font-medium">काबा के बिल्कुल सम्मुख • Facing Holy Kaaba</span>
                        </div>
                      ) : (
                        <div className="text-[9px] text-amber-300/90 font-medium bg-black/30 py-1 px-2 rounded-lg border border-amber-500/20">
                          Rotate device {relKaabaAngle < 180 ? `right by ${Math.round(relKaabaAngle)}°` : `left by ${Math.round(360 - relKaabaAngle)}°`} to face Kaaba
                        </div>
                      )}

                      {/* Interactive Rotating Compass Arena */}
                      <div className="relative w-44 h-44 mx-auto flex items-center justify-center my-1">
                        {/* Outer Compass Rose that rotates counter-heading */}
                        <div
                          className={`absolute inset-0 rounded-full border-2 bg-gradient-to-b from-[#04281e] to-[#02130e] transition-transform duration-200 ease-out flex items-center justify-center shadow-inner ${
                            isAligned ? 'border-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.5)]' : 'border-amber-400/50'
                          }`}
                          style={{ transform: `rotate(${-simulatedHeading}deg)` }}
                        >
                          <span className="absolute top-1.5 font-black text-xs text-red-500">N</span>
                          <span className="absolute right-2 font-bold text-[9px] text-white">E</span>
                          <span className="absolute bottom-1.5 font-bold text-[9px] text-white">S</span>
                          <span className="absolute left-2 font-bold text-[9px] text-white">W</span>
                          <div className="w-32 h-32 rounded-full border border-dashed border-white/10" />
                        </div>

                        {/* Kaaba Target Needle pointing to relative bearing */}
                        <div
                          className="absolute inset-0 flex items-center justify-center transition-transform duration-200 ease-out pointer-events-none"
                          style={{ transform: `rotate(${qiblaTargetBearing - simulatedHeading}deg)` }}
                        >
                          <div className="absolute top-2 flex flex-col items-center">
                            <span className="text-xl filter drop-shadow-[0_0_8px_rgba(245,158,11,0.9)]">🕋</span>
                            <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[10px] border-t-amber-400 mt-0.5" />
                          </div>
                        </div>

                        {/* Center Hub with Current Heading Angle */}
                        <div
                          className={`w-14 h-14 rounded-full border-2 flex flex-col items-center justify-center z-10 transition-colors shadow-md ${
                            isAligned ? 'bg-[#04281e] border-emerald-400' : 'bg-[#021812] border-amber-400'
                          }`}
                        >
                          <span className="text-xs font-black font-mono text-white">{simulatedHeading}°</span>
                          <span className="text-[7px] font-bold text-amber-300">{getCardinalName(simulatedHeading)}</span>
                        </div>
                      </div>

                      {/* Stat Tiles: Bearing, Heading, Distance */}
                      <div className="grid grid-cols-3 gap-1 text-[9px]">
                        <div className="p-1.5 rounded-lg bg-black/40 border border-white/10">
                          <span className="text-[7px] text-amber-400 font-bold block uppercase">Qibla</span>
                          <span className="font-bold text-white font-mono text-[10px]">{qiblaTargetBearing}°</span>
                        </div>
                        <div className={`p-1.5 rounded-lg bg-black/40 border ${isAligned ? 'border-emerald-400 text-emerald-300' : 'border-white/10'}`}>
                          <span className="text-[7px] text-emerald-400 font-bold block uppercase">Heading</span>
                          <span className="font-bold text-white font-mono text-[10px]">{simulatedHeading}°</span>
                        </div>
                        <div className="p-1.5 rounded-lg bg-black/40 border border-white/10">
                          <span className="text-[7px] text-emerald-400/80 font-bold block uppercase">Distance</span>
                          <span className="font-bold text-white font-mono text-[10px]">4,215 km</span>
                        </div>
                      </div>

                      {/* Gyroscope Simulator & Rotation Control Deck */}
                      <div className="p-2 rounded-xl bg-black/40 border border-white/10 text-left space-y-1.5">
                        <div className="flex items-center justify-between text-[8px]">
                          <span className="font-bold text-amber-300 flex items-center gap-1">
                            <span>🧭</span>
                            <span>Gyroscope Device Angle Slider:</span>
                          </span>
                          <span className="font-mono text-white font-bold">{simulatedHeading}° ({getCardinalName(simulatedHeading)})</span>
                        </div>

                        {/* Interactive Range Slider */}
                        <input
                          type="range"
                          min="0"
                          max="360"
                          value={simulatedHeading}
                          onChange={(e) => setSimulatedHeading(Number(e.target.value))}
                          className="w-full accent-amber-400 h-1.5 bg-zinc-800 rounded-lg cursor-pointer"
                        />

                        {/* Quick Turn & Align Buttons */}
                        <div className="grid grid-cols-4 gap-1 text-[8px] pt-0.5">
                          <button
                            onClick={() => setSimulatedHeading(prev => (prev - 30 + 360) % 360)}
                            className="py-1 rounded bg-white/5 hover:bg-white/10 text-white font-bold border border-white/10"
                          >
                            ↺ -30°
                          </button>
                          <button
                            onClick={() => setSimulatedHeading(Math.round(qiblaTargetBearing))}
                            className="py-1 rounded bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 font-black border border-amber-400/40 col-span-2"
                          >
                            🕋 Face Kaaba
                          </button>
                          <button
                            onClick={() => setSimulatedHeading(prev => (prev + 30) % 360)}
                            className="py-1 rounded bg-white/5 hover:bg-white/10 text-white font-bold border border-white/10"
                          >
                            +30° ↻
                          </button>
                        </div>

                        {/* Auto-Spin Gyroscope Demo Test Button */}
                        <button
                          onClick={() => setIsAutoSpinning(prev => !prev)}
                          className={`w-full py-1 rounded text-[8px] font-bold flex items-center justify-center gap-1 border transition-colors ${
                            isAutoSpinning
                              ? 'bg-red-500/20 text-red-300 border-red-500/40'
                              : 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30 hover:bg-emerald-500/20'
                          }`}
                        >
                          <span>{isAutoSpinning ? '⏸ Stop Auto-Spin' : '▶ Auto 360° Gyroscope Sweep Test'}</span>
                        </button>
                      </div>
                    </div>
                  );
                })()}

                {/* 12. CONTACT SCREEN — OFFICIAL CORRESPONDENCE & SUPPORT */}
                {activeScreen === 'contact' && (
                  <div className="space-y-2.5 animate-in fade-in text-left">
                    <div className="flex items-center justify-between px-1">
                      <div>
                        <div className="font-bold text-white text-xs">✉️ Contact & Support</div>
                        <span className="text-[8px] text-emerald-300/70">salam@nooreilahi.com • 24h Response</span>
                      </div>
                      <span className="text-[8px] px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 font-mono font-bold">
                        Official
                      </span>
                    </div>

                    {/* Official Inbox Card */}
                    <div className="p-2.5 rounded-xl bg-[#031c15] border border-amber-400/40 space-y-1.5 shadow-md">
                      <div className="flex items-center justify-between">
                        <span className="text-[8px] font-bold text-amber-400 uppercase tracking-wider">OFFICIAL INBOX</span>
                        <span className="text-[8px] text-emerald-400 font-mono">24/7 Monitored</span>
                      </div>
                      <div className="text-sm font-mono font-bold text-white">salam@nooreilahi.com</div>
                      <p className="text-[8px] text-emerald-200/70 leading-tight">
                        Partnerships, feedback, bug reports & general Islamic inquiries.
                      </p>
                      <div className="flex gap-1.5 pt-1">
                        <a
                          href="mailto:salam@nooreilahi.com"
                          className="flex-1 py-1 rounded-lg bg-amber-400 text-[#02120d] text-[8px] font-black text-center shadow"
                        >
                          ✉️ Open Mail App
                        </a>
                      </div>
                    </div>

                    {/* Interactive Inquiry Type Pills */}
                    <div className="space-y-1">
                      <span className="text-[8px] font-bold text-emerald-300/60 uppercase">Inquiry Categories</span>
                      <div className="grid grid-cols-2 gap-1 text-[8px]">
                        <div className="p-1.5 rounded-lg bg-[#031712] border border-white/10 text-white font-medium">
                          💼 Business & B2B
                        </div>
                        <div className="p-1.5 rounded-lg bg-[#031712] border border-white/10 text-white font-medium">
                          💡 App Feedback
                        </div>
                        <div className="p-1.5 rounded-lg bg-[#031712] border border-white/10 text-white font-medium">
                          ⚠️ Report Issue
                        </div>
                        <div className="p-1.5 rounded-lg bg-[#031712] border border-white/10 text-white font-medium">
                          🤲 General Deen
                        </div>
                      </div>
                    </div>

                    {/* Direct Contact Button */}
                    <Link
                      href="/contact"
                      className="block w-full py-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-[#02120d] font-bold text-[9px] text-center shadow hover:scale-[1.01] transition-transform"
                    >
                      Open Full Web Form →
                    </Link>
                  </div>
                )}
              </div>

              {/* Floating Ask AI Bubble Inside Device */}
              <div className="relative">
                <button
                  onClick={() => setShowAiModal(!showAiModal)}
                  className="absolute bottom-12 right-1 z-20 flex items-center gap-1 bg-gradient-to-r from-emerald-600 to-amber-500 p-2 rounded-full shadow-lg border border-amber-400/60 active:scale-95 transition-transform"
                  title="Ask Noor AI"
                >
                  <Sparkles className="w-3.5 h-3.5 text-black" />
                  <span className="text-[9px] font-black text-black pr-1">Ask AI</span>
                </button>

                {/* Mini AI Modal Preview (Live OpenAI Connected) */}
                {showAiModal && (
                  <div className="absolute bottom-16 right-0 left-0 z-30 bg-[#031a14] border border-amber-400/50 rounded-2xl p-3 shadow-2xl animate-in slide-in-from-bottom max-h-[300px] flex flex-col justify-between">
                    <div className="flex items-center justify-between pb-1.5 border-b border-white/10">
                      <span className="text-[10px] font-bold text-amber-300 flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-amber-400" /> Noor AI (Live OpenAI)
                      </span>
                      <button onClick={() => setShowAiModal(false)} className="text-white/60 hover:text-white p-0.5">
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Chat Messages */}
                    <div className="overflow-y-auto my-2 space-y-2 max-h-[160px] text-[9px] no-scrollbar">
                      {simulatedAiMessages.map((m, idx) => (
                        <div
                          key={idx}
                          className={`p-2 rounded-xl ${
                            m.sender === 'user'
                              ? 'bg-amber-500/20 text-white ml-4 border border-amber-500/30'
                              : 'bg-[#04281e] text-emerald-100 mr-2 border border-emerald-800/40'
                          }`}
                        >
                          <p className="leading-relaxed">{m.text}</p>
                          {m.ref && (
                            <span className="text-[8px] text-amber-300/80 block mt-1 font-mono">
                              Ref: {m.ref}
                            </span>
                          )}
                        </div>
                      ))}
                      {simulatedAiLoading && (
                        <div className="text-[9px] text-amber-300 flex items-center gap-1 italic">
                          <span className="animate-spin">✨</span> Pondering from Quran & Sunnah...
                        </div>
                      )}
                    </div>

                    {/* Quick Question Chips */}
                    <div className="flex items-center gap-1 overflow-x-auto pb-1 text-[8px] no-scrollbar">
                      {['Tahajjud virtue?', 'Ayat al-Kursi?', 'Relief dua?'].map(q => (
                        <button
                          key={q}
                          onClick={() => handleSimulatedAiSend(q)}
                          className="px-2 py-0.5 rounded-full bg-black/40 text-emerald-300 border border-white/10 hover:border-amber-400 whitespace-nowrap"
                        >
                          {q}
                        </button>
                      ))}
                    </div>

                    {/* Input bar */}
                    <div className="flex items-center gap-1 pt-1.5 border-t border-white/10 mt-1">
                      <input
                        type="text"
                        placeholder="Ask Noor AI anything..."
                        value={simulatedAiInput}
                        onChange={(e) => setSimulatedAiInput(e.target.value)}
                        onKeyDown={(e) => { if (e.key === 'Enter') handleSimulatedAiSend(); }}
                        className="flex-1 bg-black/50 text-[9px] text-white px-2 py-1 rounded-lg border border-white/10 focus:border-amber-400 focus:outline-none"
                      />
                      <button
                        onClick={() => handleSimulatedAiSend()}
                        disabled={simulatedAiLoading}
                        className="px-2 py-1 bg-amber-500 text-emerald-950 font-bold rounded-lg text-[9px]"
                      >
                        Ask
                      </button>
                    </div>
                  </div>
                )}

                {/* 1. SIMULATED MENU DRAWER OVERLAY */}
                {simulatedMenuOpen && (
                  <div className="absolute inset-0 z-40 bg-[#02130e]/95 backdrop-blur-md p-3.5 flex flex-col justify-between animate-in slide-in-from-left">
                    <div className="space-y-3 overflow-y-auto no-scrollbar">
                      {/* Top Bar */}
                      <div className="flex items-center justify-between pb-2 border-b border-white/10">
                        <MuslimLogo size={28} showText />
                        <button
                          onClick={() => setSimulatedMenuOpen(false)}
                          className="w-6 h-6 rounded-lg bg-white/10 text-white flex items-center justify-center"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* User Account / Google Sign-In Banner */}
                      <button
                        onClick={() => { setSimulatedMenuOpen(false); setSimulatedAuthOpen(true); }}
                        className="w-full p-2.5 rounded-xl bg-[#031c15] border border-amber-400/30 flex items-center gap-2.5 text-left shadow-sm"
                      >
                        <div className="w-8 h-8 rounded-full bg-amber-500 text-emerald-950 font-black flex items-center justify-center text-xs">
                          {simulatedUser ? simulatedUser.name.charAt(0) : 'G'}
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="text-xs font-bold text-white block truncate">
                            {simulatedUser ? simulatedUser.name : 'Sign In with Google'}
                          </span>
                          <span className="text-[8px] text-emerald-300/70 block truncate">
                            {simulatedUser ? `🔥 ${simulatedUser.streak}-Day Streak` : 'Sync prayers & favorites'}
                          </span>
                        </div>
                        <span className="text-[9px] text-amber-400 font-bold">Profile →</span>
                      </button>

                      {/* Language Selection Row */}
                      <button
                        onClick={() => { setSimulatedMenuOpen(false); setSimulatedLangModalOpen(true); }}
                        className="w-full p-2.5 rounded-xl bg-amber-500/10 border border-amber-400/20 text-amber-300 flex items-center justify-between text-xs transition-colors"
                      >
                        <span className="flex items-center gap-2 font-semibold">
                          <span>🌐</span>
                          <span>Native Language</span>
                        </span>
                        <span className="text-[10px] font-bold bg-amber-500/20 px-2 py-0.5 rounded text-amber-300">
                          {currentLanguageInfo.flag} {currentLanguageInfo.nativeName}
                        </span>
                      </button>

                      {/* Menu Links */}
                      <div className="space-y-1 text-left">
                        {[
                          { id: 'splash', label: 'Animated Splash Screen (Cinema Intro)', emoji: '🎬' },
                          { id: 'home', label: t('home') || 'Home Dashboard', emoji: '🕌' },
                          { id: 'prayers', label: t('prayers') || 'Prayer Times & Timetable', emoji: '⏱️' },
                          { id: 'adhan_action', label: t('adhanVoice') || 'Adhan Voices (Audio)', emoji: '🔊' },
                          { id: 'quran', label: t('quran') || 'Holy Quran (114 Surahs)', emoji: '📖' },
                          { id: 'ziyarat', label: t('ziyarat') || 'Ziyarat & Dargahs (35+)', emoji: '🏛️' },
                          { id: 'tasbih', label: t('duas') || 'Digital Tasbih & Adhkar', emoji: '📿' },
                          { id: 'media', label: t('mediaGallery') || '4K Sacred Media & Videos', emoji: '🖼️' },
                          { id: 'calendar', label: t('calendar') || 'Hijri Calendar (1448 AH)', emoji: '📅' },
                          { id: 'dashboard', label: t('spiritualDeenTracker') || 'Spiritual Deen Tracker', emoji: '📊' },
                          { id: 'names', label: t('asmaUlHusna') || '99 Names of Allah', emoji: '✨' },
                          { id: 'giving', label: t('sadaqahJariyah') || 'Sadaqah & Giving', emoji: '💚' },
                          { id: 'qibla', label: t('qibla') || 'Qibla Compass Bearing', emoji: '🧭' },
                        ].map(item => (
                          <button
                            key={item.id}
                            onClick={() => {
                              setSimulatedMenuOpen(false);
                              if (item.id === 'adhan_action') {
                                setSimulatedAdhanOpen(true);
                              } else {
                                setActiveScreen(item.id as ScreenType);
                              }
                            }}
                            className="w-full p-2 rounded-xl bg-white/5 hover:bg-amber-500/20 text-white flex items-center justify-between text-xs transition-colors"
                          >
                            <span className="flex items-center gap-2">
                              <span>{item.emoji}</span>
                              <span className="font-semibold text-[11px]">{item.label}</span>
                            </span>
                            <span className="text-[10px] text-zinc-500">›</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="pt-2 text-center border-t border-white/5 text-[9px] text-emerald-300/50">
                      NOOR-E-ILAHI • Global Islamic Companion
                    </div>
                  </div>
                )}

                {/* 2. SIMULATED GOOGLE AUTH MODAL OVERLAY */}
                {simulatedAuthOpen && (
                  <div className="absolute inset-0 z-40 bg-black/90 backdrop-blur-md p-3.5 flex flex-col justify-center animate-in zoom-in-95">
                    <div className="bg-[#031c15] border border-amber-400/40 rounded-2xl p-3.5 space-y-3 relative shadow-2xl">
                      <button
                        onClick={() => setSimulatedAuthOpen(false)}
                        className="absolute top-2.5 right-2.5 w-6 h-6 rounded-full bg-black/40 text-white flex items-center justify-center"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>

                      <div className="text-center space-y-1">
                        <div className="w-8 h-8 rounded-xl bg-amber-500 text-emerald-950 font-bold flex items-center justify-center mx-auto text-sm">
                          👤
                        </div>
                        <div className="text-xs font-bold text-white">Join NOOR Community</div>
                        <p className="text-[9px] text-emerald-300/70">Sync prayer progress & favorites across all devices</p>
                      </div>

                      {/* Google Sign-In Button */}
                      <button
                        onClick={() => {
                          setSimulatedUser({ name: 'Zubair Ahmad', email: 'zubair.ahmad@gmail.com', streak: 21 });
                          setSimulatedAuthOpen(false);
                        }}
                        className="w-full py-2 bg-white text-zinc-900 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow hover:bg-zinc-100 transition-colors"
                      >
                        <span className="font-black text-blue-600">G</span>
                        <span>Continue with Google</span>
                      </button>

                      <div className="text-center text-[9px] text-zinc-500">or continue with email</div>

                      <div className="space-y-1.5">
                        <input
                          type="email"
                          placeholder="pilgrim@noor.app"
                          defaultValue={simulatedUser ? simulatedUser.email : ''}
                          className="w-full p-2 rounded-lg bg-black/40 border border-white/10 text-white text-[10px] focus:outline-none focus:border-amber-400"
                        />
                        <input
                          type="password"
                          placeholder="••••••••"
                          defaultValue="password123"
                          className="w-full p-2 rounded-lg bg-black/40 border border-white/10 text-white text-[10px] focus:outline-none focus:border-amber-400"
                        />
                        <button
                          onClick={() => {
                            setSimulatedUser({ name: 'Zubair Ahmad', email: 'zubair.ahmad@gmail.com', streak: 14 });
                            setSimulatedAuthOpen(false);
                          }}
                          className="w-full py-2 bg-amber-500 text-emerald-950 font-black rounded-lg text-xs"
                        >
                          Sign In
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* 3. SIMULATED ADHAN VOICE SELECTOR OVERLAY */}
                {simulatedAdhanOpen && (
                  <div className="absolute inset-0 z-40 bg-[#02130e]/95 backdrop-blur-md p-3.5 flex flex-col justify-between animate-in slide-in-from-bottom">
                    <div className="space-y-2 overflow-y-auto no-scrollbar flex-1">
                      {/* Top Bar */}
                      <div className="flex items-center justify-between pb-2 border-b border-white/10">
                        <div>
                          <span className="text-xs font-bold text-white block">Adhan Voices (Call to Prayer)</span>
                          <span className="text-[8px] text-emerald-300/70">Authentic Mu'adhin Reciters</span>
                        </div>
                        <button
                          onClick={() => {
                            setSimulatedAdhanOpen(false);
                            setSimulatedAdhanPlaying(false);
                          }}
                          className="w-6 h-6 rounded-lg bg-white/10 text-white flex items-center justify-center"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Active Audio Player element */}
                      {simulatedAdhanPlaying && (
                        <div className="p-2 rounded-xl bg-black/50 border border-amber-400/40 text-[9px] space-y-1 animate-pulse">
                          <div className="flex items-center justify-between text-amber-300 font-bold">
                            <span>🔊 Playing: {simulatedActiveAdhan.name}</span>
                            <button
                              onClick={() => setSimulatedAdhanPlaying(false)}
                              className="text-red-400 text-[8px]"
                            >
                              Stop
                            </button>
                          </div>
                          <audio src={simulatedActiveAdhan.url} autoPlay onEnded={() => setSimulatedAdhanPlaying(false)} className="w-full h-6" />
                        </div>
                      )}

                      {/* Reciters List */}
                      <div className="space-y-1.5">
                        {[
                          { name: 'Sheikh Ali Ahmed Mulla', city: 'Makkah Al-Mukarramah 🕋', url: 'https://cdn.aladhan.com/audio/adhans/a1.mp3' },
                          { name: 'Sheikh Essam Bukhari', city: 'Madinah Al-Munawwarah 🕌', url: 'https://cdn.aladhan.com/audio/adhans/a2.mp3' },
                          { name: 'Al-Aqsa Mosque Sanctuary', city: 'Jerusalem / Al-Quds 🇵🇸', url: 'https://cdn.aladhan.com/audio/adhans/a3.mp3' },
                          { name: 'Sheikh Mustafa Ismail', city: 'Cairo, Egypt 🇪🇬', url: 'https://cdn.aladhan.com/audio/adhans/a4.mp3' },
                          { name: 'Mishary Rashid Alafasy', city: 'Kuwait 🇰🇼', url: 'https://cdn.aladhan.com/audio/adhans/a5.mp3' },
                          { name: 'Sacred Fajr Adhan (Dawn)', city: 'Makkah Al-Mukarramah 🌅', url: 'https://cdn.aladhan.com/audio/adhans/a6.mp3' },
                        ].map(a => (
                          <div
                            key={a.name}
                            className={`p-2 rounded-xl border text-left flex items-center justify-between text-[10px] ${
                              simulatedActiveAdhan.name === a.name
                                ? 'bg-[#04281e] border-amber-400/60'
                                : 'bg-[#031a14] border-white/5'
                            }`}
                          >
                            <div className="flex-1 min-w-0 pr-2">
                              <span className="font-bold text-white block truncate">{a.name}</span>
                              <span className="text-[8px] text-emerald-300/70 block truncate">{a.city}</span>
                            </div>
                            <div className="flex items-center gap-1 shrink-0">
                              <button
                                onClick={() => {
                                  setSimulatedActiveAdhan(a);
                                  setSimulatedAdhanPlaying(true);
                                }}
                                className="px-2 py-1 rounded bg-amber-500 text-emerald-950 font-bold text-[9px]"
                              >
                                {simulatedActiveAdhan.name === a.name && simulatedAdhanPlaying ? 'Playing' : '▶ Play'}
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={() => setSimulatedAdhanOpen(false)}
                      className="w-full py-1.5 bg-amber-500 text-emerald-950 font-black rounded-lg text-xs mt-2"
                    >
                      Done
                    </button>
                  </div>
                )}

                {/* 11. Simulated Native Language Modal Sheet */}
                {simulatedLangModalOpen && (
                  <div className="absolute inset-x-0 bottom-0 bg-[#031712] border-t border-emerald-500/30 rounded-t-3xl p-3 z-40 animate-in slide-in-from-bottom max-h-[85%] flex flex-col shadow-2xl">
                    <div className="flex items-center justify-between pb-1.5 border-b border-white/10">
                      <div>
                        <span className="text-xs font-black text-white block">Native Language • मातृभाषा</span>
                        <span className="text-[8px] text-emerald-300/70">Auto-detected based on state & country</span>
                      </div>
                      <button
                        onClick={() => setSimulatedLangModalOpen(false)}
                        className="w-5 h-5 rounded-full bg-white/10 text-white flex items-center justify-center text-xs hover:bg-white/20"
                      >
                        ✕
                      </button>
                    </div>

                    {detectedLocation && (
                      <div className="p-1.5 my-1.5 rounded-xl bg-amber-500/10 border border-amber-400/30 text-[8px] text-amber-300 flex items-center gap-1.5">
                        <span className="text-amber-400 font-bold">📍</span>
                        <span>Detected: <strong>{detectedLocation.region || detectedLocation.country}</strong> • Auto-set: <strong>{currentLanguageInfo.nativeName}</strong></span>
                      </div>
                    )}

                    <div className="flex-1 overflow-y-auto space-y-2 text-left pr-0.5 no-scrollbar py-1">
                      <div className="text-[8px] font-black text-amber-400/80 uppercase tracking-wider px-1">
                        India & Core Languages
                      </div>
                      <div className="grid grid-cols-2 gap-1">
                        {SUPPORTED_LANGUAGES.slice(0, 4).map(lang => (
                          <button
                            key={lang.code}
                            onClick={() => {
                              setLanguage(lang.code as SupportedLanguage);
                              setSimulatedLangModalOpen(false);
                            }}
                            className={`p-1.5 rounded-xl border text-left flex items-center gap-1.5 transition-colors ${
                              language === lang.code
                                ? 'bg-amber-500/20 border-amber-400 text-amber-300 font-bold'
                                : 'bg-white/5 border-white/5 text-white hover:bg-white/10'
                            }`}
                          >
                            <span className="text-sm">{lang.flag}</span>
                            <div className="min-w-0 flex-1">
                              <span className="text-[9px] font-bold block truncate">{lang.nativeName}</span>
                              <span className="text-[7px] opacity-70 block truncate">{lang.name}</span>
                            </div>
                          </button>
                        ))}
                      </div>

                      <div className="text-[8px] font-black text-amber-400/80 uppercase tracking-wider px-1 pt-1 border-t border-white/5">
                        Indian State Languages
                      </div>
                      <div className="grid grid-cols-2 gap-1">
                        {SUPPORTED_LANGUAGES.slice(4, 9).map(lang => (
                          <button
                            key={lang.code}
                            onClick={() => {
                              setLanguage(lang.code as SupportedLanguage);
                              setSimulatedLangModalOpen(false);
                            }}
                            className={`p-1.5 rounded-xl border text-left flex items-center gap-1.5 transition-colors ${
                              language === lang.code
                                ? 'bg-amber-500/20 border-amber-400 text-amber-300 font-bold'
                                : 'bg-white/5 border-white/5 text-white hover:bg-white/10'
                            }`}
                          >
                            <span className="text-sm">{lang.flag}</span>
                            <div className="min-w-0 flex-1">
                              <span className="text-[9px] font-bold block truncate">{lang.nativeName}</span>
                              <span className="text-[7px] opacity-70 block truncate">{lang.name}</span>
                            </div>
                          </button>
                        ))}
                      </div>

                      <div className="text-[8px] font-black text-amber-400/80 uppercase tracking-wider px-1 pt-1 border-t border-white/5">
                        Global Languages
                      </div>
                      <div className="grid grid-cols-2 gap-1">
                        {SUPPORTED_LANGUAGES.slice(9).map(lang => (
                          <button
                            key={lang.code}
                            onClick={() => {
                              setLanguage(lang.code as SupportedLanguage);
                              setSimulatedLangModalOpen(false);
                            }}
                            className={`p-1.5 rounded-xl border text-left flex items-center gap-1.5 transition-colors ${
                              language === lang.code
                                ? 'bg-amber-500/20 border-amber-400 text-amber-300 font-bold'
                                : 'bg-white/5 border-white/5 text-white hover:bg-white/10'
                            }`}
                          >
                            <span className="text-sm">{lang.flag}</span>
                            <div className="min-w-0 flex-1">
                              <span className="text-[9px] font-bold block truncate">{lang.nativeName}</span>
                              <span className="text-[7px] opacity-70 block truncate">{lang.name}</span>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom 5-Pillar Navigation Bar Inside Device */}
              <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[8px] text-emerald-300/70 font-semibold px-1 bg-black/50 rounded-2xl py-1.5 mt-1">
                {[
                  { id: 'home', label: t('home') || 'Home', emoji: '🕌' },
                  { id: 'prayers', label: t('prayers') || 'Prayers', emoji: '⏱️' },
                  { id: 'quran', label: t('quran') || 'Quran', emoji: '📖' },
                  { id: 'ziyarat', label: t('ziyarat') || 'Ziyarat', emoji: '🏛️' },
                  { id: 'tasbih', label: t('duas') || 'Duas', emoji: '📿' },
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveScreen(tab.id as ScreenType)}
                    className={`flex flex-col items-center gap-0.5 px-2 py-0.5 rounded-lg transition-colors ${
                      activeScreen === tab.id ? 'text-amber-300 font-black' : 'text-emerald-200/60'
                    }`}
                  >
                    <span className="text-xs">{tab.emoji}</span>
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>

              {/* iOS Home Indicator Bar */}
              <div className="w-24 h-1 bg-white/40 rounded-full mx-auto mt-2" />
            </>
          )}
        </div>
          </div>
        </div>
      </main>
    </div>
  );
}
