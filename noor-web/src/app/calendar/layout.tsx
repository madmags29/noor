import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hijri Islamic Calendar 2026 — Moon Phases, Islamic Dates & Events',
  description:
    'View the complete Hijri Islamic calendar 2026 with accurate Gregorian date conversion, lunar moon phases, Islamic months (Muharram to Dhul Hijjah), Ramadan dates, Laylat al-Qadr, Eid al-Fitr, Eid al-Adha, Day of Arafat, and all major Islamic events.',
  keywords: [
    'Hijri calendar 2026',
    'Islamic calendar 2026',
    'Ramadan 2026 dates',
    'Eid al-Fitr 2026',
    'Eid al-Adha 2026',
    'Day of Arafat 2026',
    'Laylat al-Qadr 2026',
    'Muharram 2026',
    'Dhul Hijjah 2026',
    'Islamic months',
    'Hijri to Gregorian converter',
    'Islamic date today',
    'moon phase calendar Islamic',
    'Ramadan start date 2026',
    'Ashura 2026',
    'Mawlid al-Nabi 2026',
    'Islamic new year 2026',
    'Rabi al-Awwal 2026',
    'Shaban 2026',
    'Rajab 2026',
  ],
  alternates: {
    canonical: 'https://www.nooreilahi.com/calendar',
    languages: {
      'x-default': 'https://www.nooreilahi.com/calendar',
      en: 'https://www.nooreilahi.com/calendar?lang=en',
      ar: 'https://www.nooreilahi.com/calendar?lang=ar',
      ur: 'https://www.nooreilahi.com/calendar?lang=ur',
    },
  },
  openGraph: {
    title: 'Hijri Islamic Calendar 2026 — Ramadan, Eid & Islamic Dates | Noor-e-ilahi',
    description:
      'Complete Hijri calendar 2026 with Ramadan dates, Eid al-Fitr, Eid al-Adha, Laylat al-Qadr, and moon phases.',
    url: 'https://www.nooreilahi.com/calendar',
    siteName: 'Noor-e-ilahi Islamic Ecosystem',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hijri Islamic Calendar 2026 | Noor-e-ilahi',
    description: 'Ramadan dates, Eid, Laylat al-Qadr & all Islamic events for 2026.',
  },
};

export default function CalendarLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
