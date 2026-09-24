import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Read Quran Online — 114 Surahs with Arabic, Translation & Audio Recitation',
  description:
    'Read and listen to the Noble Quran online with word-by-word audio synchronisation, authentic translations in 11 languages (English, Arabic, Urdu, Hindi, Bengali, Turkish), and offline reading support. 114 Surahs, 6,236 Ayahs.',
  keywords: [
    'read Quran online',
    'Quran translation English',
    'Quran audio recitation',
    'Noble Quran online',
    'Surah Al-Fatiha',
    'Surah Al-Baqarah',
    'Surah Al-Kahf',
    'Quran word by word',
    'Quran Urdu translation',
    'Quran Hindi translation',
    'Quran Arabic text',
    'Mishary Rashid Alafasy recitation',
    'Abdul Basit recitation',
    'Uthmani script Quran',
    'offline Quran',
    'Quran with tajweed',
    'online Quran 2026',
    'Quran ayah verse',
    'Quran 30 Juz',
    'listen to Quran',
  ],
  alternates: {
    canonical: 'https://www.nooreilahi.com/quran',
    languages: {
      'x-default': 'https://www.nooreilahi.com/quran',
      en: 'https://www.nooreilahi.com/quran?lang=en',
      ar: 'https://www.nooreilahi.com/quran?lang=ar',
      ur: 'https://www.nooreilahi.com/quran?lang=ur',
      hi: 'https://www.nooreilahi.com/quran?lang=hi',
      tr: 'https://www.nooreilahi.com/quran?lang=tr',
      id: 'https://www.nooreilahi.com/quran?lang=id',
      bn: 'https://www.nooreilahi.com/quran?lang=bn',
    },
  },
  openGraph: {
    title: 'Read Quran Online — 114 Surahs with Audio & Translation | Noor-e-ilahi',
    description:
      '114 Surahs, word-by-word audio sync, translations in 11 languages, offline support. The most complete free Quran reader.',
    url: 'https://www.nooreilahi.com/quran',
    siteName: 'Noor-e-ilahi Islamic Ecosystem',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Read Quran Online — 114 Surahs | Noor-e-ilahi',
    description: 'Noble Quran with word-by-word audio, 11 translations, offline support. 100% free.',
  },
};

export default function QuranLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
