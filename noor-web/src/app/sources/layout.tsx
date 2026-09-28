import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sources & Methodology — Transparency in Sacred Knowledge',
  description:
    'Learn how Noor-e-ilahi sources, verifies, and calculates prayer times, Qur\'an scriptures, authentic Hadith, Zakat nisab, and Islamic heritage records.',
  keywords: [
    'Noor-e-ilahi sources',
    'Islamic app methodology',
    'prayer times calculation method',
    'Quran Uthmani script sources',
    'Hisn al-Muslim verification',
    'Zakat nisab calculation standards',
    'Ziyarat shrine documentation methodology',
    'Islamic content transparency',
  ],
  alternates: {
    canonical: 'https://www.nooreilahi.com/sources',
    languages: {
      'x-default': 'https://www.nooreilahi.com/sources',
      en: 'https://www.nooreilahi.com/sources?lang=en',
      ur: 'https://www.nooreilahi.com/sources?lang=ur',
      ar: 'https://www.nooreilahi.com/sources?lang=ar',
    },
  },
  openGraph: {
    title: 'Sources & Methodology | Noor-e-ilahi',
    description:
      'Our sacred trust (Amanah) in Islamic digital utility: transparent sources for Qur\'an, Hadith, solar prayer calculation, and historical heritage.',
    url: 'https://www.nooreilahi.com/sources',
    siteName: 'Noor-e-ilahi Islamic Ecosystem',
    type: 'article',
  },
  twitter: {
    card: 'summary',
    title: 'Sources & Methodology | Noor-e-ilahi',
    description: 'Transparent sources and methodology for Noor-e-ilahi Islamic platform.',
  },
};

export default function SourcesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
