import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'NOOR Kids — Islamic Learning, Arabic Alphabet & Stories',
  description:
    'Interactive Islamic education for Muslim children: Arabic alphabet learning, Quran for kids, Prophet stories, children\'s duas, and pillars of Islam.',
  keywords: [
    'Islamic education for kids',
    'Arabic alphabet for children',
    'Quran for kids',
    'Islamic stories children',
    'Muslim kids app',
    'pillars of Islam for kids',
    'learn Arabic kids',
    'Islamic cartoons halal',
    'Prophets stories children',
    'children duas',
    'Islamic learning children',
    'Muslim children education',
    'Quran for beginners kids',
    'Islamic worksheets children',
    'halal kids content',
    'Islamic activities children',
    'Bismillah for kids',
    'Islamic values children',
    'Muslim homeschool resources',
    'dua for children',
  ],
  alternates: {
    canonical: 'https://www.nooreilahi.com/kids',
    languages: {
      'x-default': 'https://www.nooreilahi.com/kids',
      en: 'https://www.nooreilahi.com/kids?lang=en',
      ar: 'https://www.nooreilahi.com/kids?lang=ar',
      ur: 'https://www.nooreilahi.com/kids?lang=ur',
    },
  },
  openGraph: {
    title: 'NOOR Kids — Islamic Education for Children | Noor-e-ilahi',
    description:
      'Arabic alphabet, Quran for kids, Prophet stories, children\'s duas, and halal Islamic learning for children.',
    url: 'https://www.nooreilahi.com/kids',
    siteName: 'Noor-e-ilahi Islamic Ecosystem',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NOOR Kids — Islamic Education for Children | Noor-e-ilahi',
    description: 'Arabic alphabet, Quran for kids, Prophet stories & children\'s duas. 100% halal.',
  },
};

export default function KidsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
