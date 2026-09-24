import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Prayer Times Today — Accurate Salah Times for Any City Worldwide',
  description:
    'Get precise astronomical Salah prayer times for Fajr, Dhuhr, Asr, Maghrib, and Isha for any city worldwide. Supports 6 Islamic calculation methods: MWL, ISNA, Umm Al-Qura Makkah, Egyptian, Karachi, and Jafari. Auto-detect your GPS location.',
  keywords: [
    'prayer times today',
    'Salah times',
    'Namaz vakitleri',
    'Fajr time',
    'Dhuhr time',
    'Asr time',
    'Maghrib time',
    'Isha time',
    'Islamic prayer schedule',
    'Muslim prayer times',
    'astronomical prayer calculation',
    'MWL prayer method',
    'ISNA prayer times',
    'Umm Al-Qura Makkah prayer',
    'Hanafi Asr prayer',
    'Qasr travel prayer',
    'prayer timetable 2026',
    'accurate Azan time',
    'prayer times London',
    'prayer times New York',
    'prayer times Dubai',
    'prayer times Karachi',
    'prayer times Delhi',
    'prayer times Jakarta',
  ],
  alternates: {
    canonical: 'https://www.nooreilahi.com/prayer-times',
    languages: {
      'x-default': 'https://www.nooreilahi.com/prayer-times',
      en: 'https://www.nooreilahi.com/prayer-times?lang=en',
      ar: 'https://www.nooreilahi.com/prayer-times?lang=ar',
      ur: 'https://www.nooreilahi.com/prayer-times?lang=ur',
      hi: 'https://www.nooreilahi.com/prayer-times?lang=hi',
      tr: 'https://www.nooreilahi.com/prayer-times?lang=tr',
      id: 'https://www.nooreilahi.com/prayer-times?lang=id',
      bn: 'https://www.nooreilahi.com/prayer-times?lang=bn',
    },
  },
  openGraph: {
    title: 'Prayer Times Today — Worldwide Salah Schedule | Noor-e-ilahi',
    description:
      'Precise astronomical Salah prayer times for any city globally. MWL, ISNA, Umm Al-Qura, Egyptian, Karachi & Jafari calculation methods. GPS auto-detect.',
    url: 'https://www.nooreilahi.com/prayer-times',
    siteName: 'Noor-e-ilahi Islamic Ecosystem',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Prayer Times Today — Worldwide Salah Schedule | Noor-e-ilahi',
    description:
      'Accurate Fajr, Dhuhr, Asr, Maghrib & Isha times for any location. 6 Islamic calculation methods supported.',
  },
};

export default function PrayerTimesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
