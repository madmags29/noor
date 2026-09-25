import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Islamic Ziyarat Directory — 31 Sacred Shrines & Dargahs',
  description:
    'Explore 31 verified Islamic shrines, Sufi dargahs, and sacred heritage sites across 12 countries with GPS locations, history, and Adab etiquette.',
  keywords: [
    'Islamic shrines',
    'dargah directory',
    'Ziyarat guide',
    'Sufi dargahs',
    'Ajmer Sharif dargah',
    'Hazrat Nizamuddin Auliya',
    'Mevlana Rumi Konya',
    'Imam Ali shrine Najaf',
    'Imam Husayn shrine Karbala',
    'Data Ganj Bakhsh Lahore',
    'Lal Shahbaz Qalandar',
    'Haji Ali Mumbai',
    'Islamic heritage sites',
    'Ahl al-Bayt shrines',
    'Sufi saints India',
    'Islamic travel guide',
    'mazar sharif',
    'dargah etiquette Islam',
    'Adab al-Ziyarat',
    'Islamic sanctuaries worldwide',
    'Khwaja Moinuddin Chishti',
    'ziyarat adab',
    'Al-Baqi cemetery Madinah',
  ],
  alternates: {
    canonical: 'https://www.nooreilahi.com/ziyarat',
    languages: {
      'x-default': 'https://www.nooreilahi.com/ziyarat',
      en: 'https://www.nooreilahi.com/ziyarat?lang=en',
      ar: 'https://www.nooreilahi.com/ziyarat?lang=ar',
      ur: 'https://www.nooreilahi.com/ziyarat?lang=ur',
    },
  },
  openGraph: {
    title: 'Global Islamic Ziyarat & Dargahs — 31 Verified Sanctuaries | Noor-e-ilahi',
    description:
      '31 academically audited Islamic shrines across 12 nations. GPS, history, and authentic Adab al-Ziyarat etiquette.',
    url: 'https://www.nooreilahi.com/ziyarat',
    siteName: 'Noor-e-ilahi Islamic Ecosystem',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Global Islamic Ziyarat & Dargahs | Noor-e-ilahi',
    description: '31 verified Islamic shrines worldwide with GPS, history & ziyarat etiquette.',
  },
};

export default function ZiyaratLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
