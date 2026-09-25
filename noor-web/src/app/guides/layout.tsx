import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Islamic Prayer & Purification Guides — Wudu & Salah',
  description:
    'Complete Islamic prayer and purification guides: step-by-step Wudu ablution, Ghusl bath, Salah postures, and Sunnah prayers based on Sunnah.',
  keywords: [
    'how to perform Wudu',
    'Wudu step by step',
    'Wudu ablution guide',
    'how to perform Ghusl',
    'Ghusl ritual bath Islam',
    'how to pray Salah',
    'Salah step by step',
    'how to perform Namaz',
    'Salah postures guide',
    'Tayammum dry ablution',
    'Sunnah prayer guide',
    'Fajr Sunnah rak\'ah',
    'missed prayer Qada',
    'Qada Umri guide',
    'Islamic purification guide',
    'how to make wudu correctly',
    'prayer guide for beginners',
    'Salah in Arabic and English',
    'Fiqh prayer rules',
    'Hanafi prayer guide',
    'Islamic ritual purity Taharah',
    'conditions of Salah',
    'pillars of Salah Arkan',
  ],
  alternates: {
    canonical: 'https://www.nooreilahi.com/guides',
    languages: {
      'x-default': 'https://www.nooreilahi.com/guides',
      en: 'https://www.nooreilahi.com/guides?lang=en',
      ar: 'https://www.nooreilahi.com/guides?lang=ar',
      ur: 'https://www.nooreilahi.com/guides?lang=ur',
    },
  },
  openGraph: {
    title: 'Prayer & Purification Guides — Wudu, Ghusl, Salah | Noor-e-ilahi',
    description:
      'Step-by-step guides for Wudu, Ghusl, Salah, Tayammum, Sunnah prayers, and Qada journal based on authentic Sunnah.',
    url: 'https://www.nooreilahi.com/guides',
    siteName: 'Noor-e-ilahi Islamic Ecosystem',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Wudu, Ghusl & Salah Guides | Noor-e-ilahi',
    description: 'Step-by-step Wudu, Ghusl, and Salah guides based on authentic Sunnah.',
  },
};

export default function GuidesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
