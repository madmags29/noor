import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Islamic Travel Mode — Qasr Prayer, Jam Prayer & Traveller Rules',
  description:
    'Islamic travel guide for Muslim travellers: Qasr (shortened) prayer rules, Jam\'atul prayer (combining prayers), minimum Safar travel distance (77 km), Khuffayn (wiping over socks) duration, fasting rulings during travel, and duas for journey.',
  keywords: [
    'Qasr prayer travel',
    'shortened prayer travel Islam',
    'Islamic travel prayer rules',
    'Jam prayer combining Islam',
    'Safar travel distance Islam',
    'Muslim travel guide',
    'prayer rules for travellers',
    'wiping over socks Islam Khuffayn',
    'fasting while travelling Islam',
    'travel dua Islam',
    'Muslim traveller prayer',
    'travel prayer rules Hanafi',
    'Islamic journey rules',
    'prayer shortening distance',
    '77 km travel distance Islam',
    'Jam and Qasr prayer',
    'travelling Muslim prayer guide',
    'halal travel tips',
    'Islamic etiquette travel',
    'dua for journey',
  ],
  alternates: {
    canonical: 'https://www.nooreilahi.com/travel',
    languages: {
      'x-default': 'https://www.nooreilahi.com/travel',
      en: 'https://www.nooreilahi.com/travel?lang=en',
      ar: 'https://www.nooreilahi.com/travel?lang=ar',
      ur: 'https://www.nooreilahi.com/travel?lang=ur',
    },
  },
  openGraph: {
    title: 'Islamic Travel Mode — Qasr & Jam Prayer Rules | Noor-e-ilahi',
    description:
      'Complete guide for Muslim travellers: Qasr prayer, combining prayers, Safar distance, fasting rules & journey duas.',
    url: 'https://www.nooreilahi.com/travel',
    siteName: 'Noor-e-ilahi Islamic Ecosystem',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Islamic Travel Mode — Qasr & Jam Prayer | Noor-e-ilahi',
    description: 'Qasr prayer rules, travel distance, combining prayers & journey duas for Muslim travellers.',
  },
};

export default function TravelLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
