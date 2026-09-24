import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Global Islamic Ziyarat & Dargahs Directory — 31 Verified Sacred Shrines Across 12 Nations',
  description:
    'Explore 31 academically audited Islamic shrines, Sufi dargahs, Ahl al-Bayt sanctuaries, and heritage sites across 12 countries. Features Ajmer Sharif, Hazrat Nizamuddin Auliya, Imam Ali Najaf, Imam Husayn Karbala, Mevlana Rumi Konya, Data Ganj Bakhsh, and more. GPS coordinates, historical chronicles, and visiting etiquette (Adab al-Ziyarat).',
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
