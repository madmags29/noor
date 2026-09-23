// NOOR Islamic Hijri Calendar & Holy Observances
export const ISLAMIC_MONTHS = [
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

export const UPCOMING_HOLY_EVENTS = [
  {
    title: 'Start of Holy Ramadan',
    hijriDate: '1 Ramadan 1448 AH',
    estimatedGregorian: 'February 2027',
    description: 'The month of fasting, intense Quran recitation, and spiritual purification.',
    type: 'fasting'
  },
  {
    title: 'Laylat al-Qadr (Night of Power)',
    hijriDate: '27 Ramadan 1448 AH',
    estimatedGregorian: 'March 2027',
    description: 'Better than a thousand months; night of divine peace and forgiveness.',
    type: 'holy-night'
  },
  {
    title: 'Eid al-Fitr',
    hijriDate: '1 Shawwal 1448 AH',
    estimatedGregorian: 'March 2027',
    description: 'Joyful celebration marking the completion of the blessed month of fasting.',
    type: 'eid'
  },
  {
    title: 'Day of Arafah',
    hijriDate: '9 Dhu al-Hijjah 1448 AH',
    estimatedGregorian: 'May 2027',
    description: 'The pinnacle of Hajj; recommended fasting for non-pilgrims expiates two years of sins.',
    type: 'hajj'
  },
  {
    title: 'Eid al-Adha',
    hijriDate: '10 Dhu al-Hijjah 1448 AH',
    estimatedGregorian: 'May 2027',
    description: 'The Festival of Sacrifice honoring the devotion of Prophet Ibrahim (AS).',
    type: 'eid'
  },
  {
    title: 'Day of Ashura',
    hijriDate: '10 Muharram 1448 AH',
    estimatedGregorian: 'July 2027',
    description: 'Day Allah saved Prophet Musa (AS) and Bani Israel; fasting expiates preceding year.',
    type: 'fasting'
  }
];
