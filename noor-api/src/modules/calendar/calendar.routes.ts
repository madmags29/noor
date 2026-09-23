// ============================================================
// NOOR API — Calendar Module Routes
// ============================================================

import { Router, Request, Response } from 'express';

export const calendarRouter = Router();

const ISLAMIC_MONTHS = [
  { index: 1, nameEn: 'Muharram', nameAr: 'المُحَرَّم', sacred: true },
  { index: 2, nameEn: 'Safar', nameAr: 'صَفَر', sacred: false },
  { index: 3, nameEn: 'Rabi al-Awwal', nameAr: 'رَبِيع الأَوَّل', sacred: false },
  { index: 4, nameEn: 'Rabi al-Thani', nameAr: 'رَبِيع الآخِر', sacred: false },
  { index: 5, nameEn: 'Jumada al-Awwal', nameAr: 'جُمَادَى الأُولَى', sacred: false },
  { index: 6, nameEn: 'Jumada al-Thani', nameAr: 'جُمَادَى الآخِرَة', sacred: false },
  { index: 7, nameEn: 'Rajab', nameAr: 'رَجَب', sacred: true },
  { index: 8, nameEn: 'Shaban', nameAr: 'شَعْبَان', sacred: false },
  { index: 9, nameEn: 'Ramadan', nameAr: 'رَمَضَان', sacred: false, holyMonth: true },
  { index: 10, nameEn: 'Shawwal', nameAr: 'شَوَّال', sacred: false },
  { index: 11, nameEn: 'Dhu al-Qadah', nameAr: 'ذُو القَعْدَة', sacred: true },
  { index: 12, nameEn: 'Dhu al-Hijjah', nameAr: 'ذُو الحِجَّة', sacred: true }
];

const UPCOMING_EVENTS = [
  {
    title: 'Start of Holy Ramadan',
    hijriDate: '1 Ramadan 1448 AH',
    description: 'The month of fasting, intense Quran recitation, and spiritual purification.',
    type: 'fasting'
  },
  {
    title: 'Laylat al-Qadr (Night of Power)',
    hijriDate: '27 Ramadan 1448 AH',
    description: 'Better than a thousand months; night of divine peace and forgiveness.',
    type: 'holy-night'
  },
  {
    title: 'Eid al-Fitr',
    hijriDate: '1 Shawwal 1448 AH',
    description: 'Joyful celebration marking the completion of the blessed month of fasting.',
    type: 'eid'
  },
  {
    title: 'Day of Arafah',
    hijriDate: '9 Dhu al-Hijjah 1448 AH',
    description: 'The pinnacle of Hajj; recommended fasting for non-pilgrims expiates two years of sins.',
    type: 'hajj'
  },
  {
    title: 'Eid al-Adha',
    hijriDate: '10 Dhu al-Hijjah 1448 AH',
    description: 'The Festival of Sacrifice honoring the devotion of Prophet Ibrahim (AS).',
    type: 'eid'
  },
  {
    title: 'Day of Ashura',
    hijriDate: '10 Muharram 1448 AH',
    description: 'Day Allah saved Prophet Musa (AS) and Bani Israel; fasting expiates preceding year.',
    type: 'fasting'
  }
];

/**
 * Approximate Hijri date converter
 */
function getHijriDate(date: Date = new Date()) {
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();

  let m = month + 1;
  let y = year;
  if (m < 3) {
    y -= 1;
    m += 12;
  }

  const a = Math.floor(y / 100);
  const b = 2 - a + Math.floor(a / 4);
  const jd = Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + day + b - 1524.5;

  const l = jd - 1948440 + 10632;
  const n = Math.floor((l - 1) / 10631);
  const l2 = l - 10631 * n + 354;
  const j = (Math.floor((10985 - l2) / 5316)) * (Math.floor((50 * l2) / 17719)) + (Math.floor(l2 / 5670)) * (Math.floor((43 * l2) / 15238));
  const l3 = l2 - (Math.floor((30 - j) / 15)) * (Math.floor((17719 * j) / 50)) - (Math.floor(j / 16)) * (Math.floor((15238 * j) / 43)) + 29;
  const hijriMonth = Math.floor((24 * l3) / 709);
  const hijriDay = l3 - Math.floor((709 * hijriMonth) / 24);
  const hijriYear = 30 * n + j - 30;

  const monthObj = ISLAMIC_MONTHS[(hijriMonth - 1 + 12) % 12];

  return {
    day: hijriDay,
    month: hijriMonth,
    monthNameEn: monthObj?.nameEn || 'Ramadan',
    monthNameAr: monthObj?.nameAr || 'رَمَضَان',
    year: hijriYear,
    formatted: `${hijriDay} ${monthObj?.nameEn || 'Ramadan'} ${hijriYear} AH`,
    formattedAr: `${hijriDay} ${monthObj?.nameAr || 'رَمَضَان'} ${hijriYear} هـ`
  };
}

/**
 * GET /api/v1/calendar/today
 */
calendarRouter.get('/today', (req: Request, res: Response) => {
  const dateStr = req.query.date as string;
  const date = dateStr ? new Date(dateStr) : new Date();
  const hijri = getHijriDate(date);

  res.json({
    success: true,
    data: {
      gregorian: date.toISOString().split('T')[0],
      hijri,
    }
  });
});

/**
 * GET /api/v1/calendar/months
 */
calendarRouter.get('/months', (_req: Request, res: Response) => {
  res.json({
    success: true,
    data: ISLAMIC_MONTHS
  });
});

/**
 * GET /api/v1/calendar/events
 */
calendarRouter.get('/events', (_req: Request, res: Response) => {
  res.json({
    success: true,
    data: UPCOMING_EVENTS
  });
});
