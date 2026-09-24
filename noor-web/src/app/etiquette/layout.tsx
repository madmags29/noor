import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Islamic Etiquette (Adab) — Sunnah Manners for Daily Life',
  description:
    'Learn authentic Islamic etiquette (Adab) from the Sunnah: etiquette of eating and drinking, entering the home, visiting the mosque, greeting with Salam, caring for parents, dealing with neighbours, speech conduct, personal hygiene, and social manners based on Prophetic traditions.',
  keywords: [
    'Islamic etiquette',
    'Adab Islam',
    'Islamic manners',
    'Sunnah etiquette',
    'etiquette of eating Islam',
    'Islamic greeting Salam',
    'mosque etiquette',
    'Islamic personal hygiene',
    'honouring parents Islam',
    'Islamic social manners',
    'Sunnah daily life',
    'Muslim manners guide',
    'etiquette entering home Islam',
    'Islamic neighbour rights',
    'Islamic speech conduct',
    'Adab al-Akl eating manners',
    'Adab al-Masjid mosque',
    'Islamic conduct guide',
    'Prophet manners hadith',
    'Islamic lifestyle guide',
  ],
  alternates: {
    canonical: 'https://www.nooreilahi.com/etiquette',
    languages: {
      'x-default': 'https://www.nooreilahi.com/etiquette',
      en: 'https://www.nooreilahi.com/etiquette?lang=en',
      ar: 'https://www.nooreilahi.com/etiquette?lang=ar',
      ur: 'https://www.nooreilahi.com/etiquette?lang=ur',
    },
  },
  openGraph: {
    title: 'Islamic Etiquette & Adab — Sunnah Manners for Daily Life | Noor-e-ilahi',
    description:
      'Authentic Islamic etiquette from the Sunnah: eating, greeting, mosque, parents, neighbours, and daily life conduct.',
    url: 'https://www.nooreilahi.com/etiquette',
    siteName: 'Noor-e-ilahi Islamic Ecosystem',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Islamic Etiquette & Adab | Noor-e-ilahi',
    description: 'Authentic Sunnah manners and Islamic etiquette for every aspect of daily life.',
  },
};

export default function EtiquetteLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
