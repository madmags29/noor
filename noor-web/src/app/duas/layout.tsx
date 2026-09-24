import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Islamic Duas & Adhkar — Authentic Hisn al-Muslim Supplications with Arabic & Translation',
  description:
    'Browse 200+ authentic duas and adhkar from Hisn al-Muslim (Fortress of the Muslim). Morning & evening adhkar, sleeping duas, travel supplications, Quran duas, and daily remembrances with Arabic text, transliteration, and 11 language translations.',
  keywords: [
    'Islamic duas',
    'Hisn al-Muslim duas',
    'morning adhkar',
    'evening adhkar',
    'dua before sleeping',
    'dua waking up',
    'travel dua',
    'dua for parents',
    'dua for anxiety',
    'dua for rizq',
    'Ayat al-Kursi',
    'Surah Al-Ikhlas dua',
    'authentic Islamic supplications',
    'daily adhkar',
    'dhikr after prayer',
    'dua in Arabic with English',
    'dua for protection',
    'dua for forgiveness',
    'dua for marriage',
    'dua for exams',
    'Islamic prayer words',
    'dua hadith',
    'verified duas',
  ],
  alternates: {
    canonical: 'https://www.nooreilahi.com/duas',
    languages: {
      'x-default': 'https://www.nooreilahi.com/duas',
      en: 'https://www.nooreilahi.com/duas?lang=en',
      ar: 'https://www.nooreilahi.com/duas?lang=ar',
      ur: 'https://www.nooreilahi.com/duas?lang=ur',
      hi: 'https://www.nooreilahi.com/duas?lang=hi',
    },
  },
  openGraph: {
    title: 'Islamic Duas & Adhkar — Hisn al-Muslim Collection | Noor-e-ilahi',
    description:
      '200+ authentic duas with Arabic, transliteration & 11-language translations. Morning/evening adhkar, travel, sleep, and situational supplications.',
    url: 'https://www.nooreilahi.com/duas',
    siteName: 'Noor-e-ilahi Islamic Ecosystem',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Islamic Duas & Adhkar | Noor-e-ilahi',
    description: '200+ authentic Hisn al-Muslim supplications. Arabic, transliteration & 11 translations.',
  },
};

export default function DuasLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
