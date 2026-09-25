import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Janazah & Funeral Prayer Guide — Ghusl, Kafan & Burial Rites',
  description:
    'Complete Islamic Janazah guide: Ghusl ritual washing, Kafan shrouding, 4-Takbeer funeral prayer with authentic duas, condolences, and burial rites.',
  keywords: [
    'Janazah guide',
    'Salatul Janazah',
    'Islamic funeral prayer',
    'how to pray Janazah',
    'Ghusl al-Mayyit',
    'washing the deceased Islam',
    'Kafan shrouding Islamic',
    'dua for deceased',
    'dua for dead person',
    'Janazah 4 Takbeer',
    'Islamic burial rites',
    'Fard Kifayah Janazah',
    'condolences dua Islam',
    'funeral prayer Arabic',
    'Allahummagh-fir lihayyina',
    'Muslim funeral etiquette',
    'prayer for dead Muslim',
    'Islamic death rites',
    'bereavement prayer',
    'Janazah dua Arabic English',
  ],
  alternates: {
    canonical: 'https://www.nooreilahi.com/janazah',
    languages: {
      'x-default': 'https://www.nooreilahi.com/janazah',
      en: 'https://www.nooreilahi.com/janazah?lang=en',
      ar: 'https://www.nooreilahi.com/janazah?lang=ar',
      ur: 'https://www.nooreilahi.com/janazah?lang=ur',
    },
  },
  openGraph: {
    title: 'Janazah & Funeral Prayer Guide — Islamic Burial Rites | Noor-e-ilahi',
    description:
      'Complete guide: Ghusl al-Mayyit, Kafan, Salatul Janazah with 4 Takbeers, authentic duas, and Islamic burial etiquette.',
    url: 'https://www.nooreilahi.com/janazah',
    siteName: 'Noor-e-ilahi Islamic Ecosystem',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Janazah & Funeral Prayer Guide | Noor-e-ilahi',
    description: 'Complete Islamic funeral guide with authentic duas and burial rites.',
  },
};

export default function JanazahLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
