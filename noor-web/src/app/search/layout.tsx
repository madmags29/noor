import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Islamic Search Engine — Quran, Hadith & Knowledge',
  description:
    'Search the Noor-e-ilahi encyclopedia: Quran Ayahs, authentic Hadith, Fiqh rulings, Islamic terms glossary, and prophet stories powered by AI.',
  keywords: [
    'Islamic search engine',
    'Islam encyclopedia',
    'search Quran',
    'search Hadith',
    'Islamic knowledge base',
    'Islamic Q&A',
    'Islamic glossary',
    'Fiqh rulings search',
    'Islamic terms dictionary',
    'search duas',
    'Hadith search engine',
    'Islamic information search',
    'Quran verse search',
    'Muslim knowledge platform',
    'AI Islamic assistant',
    'Islamic encyclopedia online',
    'search Islamic topics',
    'Islamic education platform',
    'Muslim study platform',
    'Islamic reference guide',
  ],
  alternates: {
    canonical: 'https://www.nooreilahi.com/search',
    languages: {
      'x-default': 'https://www.nooreilahi.com/search',
      en: 'https://www.nooreilahi.com/search?lang=en',
      ar: 'https://www.nooreilahi.com/search?lang=ar',
    },
  },
  openGraph: {
    title: 'Islam Encyclopedia Search — Quran, Hadith & Fiqh | Noor-e-ilahi',
    description: 'Search Quran verses, authentic Hadith, Fiqh rulings, duas, and Islamic knowledge. Powered by Noor AI.',
    url: 'https://www.nooreilahi.com/search',
    siteName: 'Noor-e-ilahi Islamic Ecosystem',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Islam Encyclopedia Search | Noor-e-ilahi',
    description: 'Search Quran, Hadith, Fiqh, and Islamic knowledge. Powered by Noor AI.',
  },
};

export default function SearchLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
