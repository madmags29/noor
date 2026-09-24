import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hajj & Umrah Complete Guide 2026 — Rituals, Checklist, Maps & Duas',
  description:
    'Complete step-by-step Hajj & Umrah guide 2026. Covers Ihram, Miqat, Tawaf, Sa\'i, Arafat, Muzdalifah, Mina, Jamarat, Wuquf. Includes Hajj packing checklist, 2026 dates, important duas, maps of Makkah & Madinah holy sites. Available offline.',
  keywords: [
    'Hajj guide 2026',
    'Umrah guide 2026',
    'Hajj rituals step by step',
    'how to perform Hajj',
    'how to perform Umrah',
    'Ihram rules Hajj',
    'Miqat stations Hajj',
    'Tawaf steps',
    'Sa\'i Al-Safa and Al-Marwa',
    'Arafat Day Hajj',
    'Muzdalifah night Hajj',
    'Jamarat stoning ritual',
    'Hajj packing checklist',
    'Hajj duas Arabic',
    'Umrah step by step guide',
    'Hajj 2026 dates',
    'Dhul Hijjah 2026',
    'Hajj travel preparation',
    'offline Hajj guide',
    'Makkah holy sites',
    'Madinah ziyarat Hajj',
    'Hajj acceptance dua',
    'Umrah etiquette',
    'first time Hajj guide',
  ],
  alternates: {
    canonical: 'https://www.nooreilahi.com/hajj-umrah',
    languages: {
      'x-default': 'https://www.nooreilahi.com/hajj-umrah',
      en: 'https://www.nooreilahi.com/hajj-umrah?lang=en',
      ar: 'https://www.nooreilahi.com/hajj-umrah?lang=ar',
      ur: 'https://www.nooreilahi.com/hajj-umrah?lang=ur',
    },
  },
  openGraph: {
    title: 'Hajj & Umrah Complete Guide 2026 — Rituals, Checklist & Duas | Noor-e-ilahi',
    description:
      'Step-by-step Hajj & Umrah guide with Ihram rules, Tawaf, Sa\'i, Arafat, Jamarat, packing checklist, and authentic duas. Offline-ready.',
    url: 'https://www.nooreilahi.com/hajj-umrah',
    siteName: 'Noor-e-ilahi Islamic Ecosystem',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hajj & Umrah Complete Guide 2026 | Noor-e-ilahi',
    description: 'Complete Hajj/Umrah step-by-step with checklist, maps, duas & offline guide.',
  },
};

export default function HajjUmrahLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
