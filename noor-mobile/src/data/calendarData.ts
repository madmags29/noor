export interface HijriMonth {
  index: number;
  nameEn: string;
  nameAr: string;
  sacred: boolean;
  holy?: boolean;
  desc: string;
  keyEvents: string[];
}

export interface HolyEvent {
  title: string;
  hijriDate: string;
  gregorianDate: string;
  description: string;
  badge: string;
  virtues: string;
  category: 'Fasting' | 'Eid' | 'Hajj' | 'Historical' | 'Night of Worship';
}

export const HIJRI_MONTHS: HijriMonth[] = [
  {
    index: 1,
    nameEn: 'Muharram',
    nameAr: 'المُحَرَّم',
    sacred: true,
    desc: 'The opening sacred month of the Islamic year; contains the Day of Ashura.',
    keyEvents: ['Islamic New Year (1st)', 'Day of Ashura (10th) - Fasting of Prophet Musa']
  },
  {
    index: 2,
    nameEn: 'Safar',
    nameAr: 'صَفَر',
    sacred: false,
    desc: 'Second lunar month of the Islamic calendar.',
    keyEvents: ['Migration of Prophet Muhammad ﷺ towards Madinah commenced']
  },
  {
    index: 3,
    nameEn: 'Rabi al-Awwal',
    nameAr: 'رَبِيع الأَوَّل',
    sacred: false,
    desc: 'Blessed month marking the arrival and birth of the Final Messenger of Allah ﷺ.',
    keyEvents: ['Mawlid an-Nabi (12th)', 'Prophet arrives at Quba & builds first masjid']
  },
  {
    index: 4,
    nameEn: 'Rabi al-Thani',
    nameAr: 'رَبِيع الآخِر',
    sacred: false,
    desc: 'Fourth month in the Hijri calendar, also known as Rabi al-Akhir.',
    keyEvents: ['Commemoration of prominent Awliya and scholars']
  },
  {
    index: 5,
    nameEn: 'Jumada al-Awwal',
    nameAr: 'جُمَادَى الأُولَى',
    sacred: false,
    desc: 'Fifth lunar month of the sacred calendar.',
    keyEvents: ['Battle of Mu\'tah']
  },
  {
    index: 6,
    nameEn: 'Jumada al-Thani',
    nameAr: 'جُمَادَى الآخِرَة',
    sacred: false,
    desc: 'Sixth lunar month; passing of Sayyidna Abu Bakr as-Siddiq (RA).',
    keyEvents: ['Passing of Abu Bakr as-Siddiq (22nd)']
  },
  {
    index: 7,
    nameEn: 'Rajab',
    nameAr: 'رَجَب',
    sacred: true,
    desc: 'Sacred solitary month; marks the miraculous journey of Al-Isra wal-Mi\'raj.',
    keyEvents: ['Al-Isra wal-Mi\'raj (27th) - Divine Ascension & gift of 5 daily prayers']
  },
  {
    index: 8,
    nameEn: 'Shaban',
    nameAr: 'شَعْبَان',
    sacred: false,
    desc: 'Month of voluntary fasting and divine preparation for the arrival of Ramadan.',
    keyEvents: ['Nisf Shaban / Shab-e-Barat (15th) - Night of Divine Mercy & Qibla Change']
  },
  {
    index: 9,
    nameEn: 'Ramadan',
    nameAr: 'رَمَضَان',
    sacred: false,
    holy: true,
    desc: 'The Holiest Month of Fasting, Taraweeh, Night of Decree (Laylat al-Qadr), and Quran revelation.',
    keyEvents: ['First revelation of Quran', 'Battle of Badr (17th)', 'Laylat al-Qadr (Odd nights of last 10)']
  },
  {
    index: 10,
    nameEn: 'Shawwal',
    nameAr: 'شَوَّال',
    sacred: false,
    desc: 'First day is the blessed Eid al-Fitr; followed by 6 days of Sunnah fasting.',
    keyEvents: ['Eid al-Fitr (1st)', 'Six days of Shawwal fasting (equals a year of fasting)']
  },
  {
    index: 11,
    nameEn: 'Dhu al-Qadah',
    nameAr: 'ذُو القَعْدَة',
    sacred: true,
    desc: 'Sacred month preceding Hajj; months of peace and spiritual preparation.',
    keyEvents: ['Treaty of Hudaybiyyah', 'Pledge of Ridhwan']
  },
  {
    index: 12,
    nameEn: 'Dhu al-Hijjah',
    nameAr: 'ذُو الحِجَّة',
    sacred: true,
    holy: true,
    desc: 'Culmination of the Islamic year; contains the best 10 days of the year, Hajj pilgrimage, Day of Arafah, and Eid al-Adha.',
    keyEvents: ['The Blessed First 10 Days', 'Day of Arafah (9th)', 'Eid al-Adha (10th-12th)']
  }
];

export const HOLY_EVENTS: HolyEvent[] = [
  {
    title: 'Blessed Ramadan',
    hijriDate: '1 Ramadan 1448 AH',
    gregorianDate: 'Feb / Mar 2027',
    description: 'The sacred month of fasting from dawn until dusk, nightly Taraweeh prayers, and Quran revelation.',
    badge: 'Fasting & Mercy',
    virtues: 'The gates of Paradise are opened, the gates of Hellfire closed, and devils are chained.',
    category: 'Fasting'
  },
  {
    title: 'Laylat al-Qadr (Night of Power)',
    hijriDate: '27 Ramadan 1448 AH',
    gregorianDate: 'March 2027',
    description: 'The night the Noble Quran was descended to the lowest heaven. Better than a thousand months (83+ years of continuous worship).',
    badge: 'Night of Power',
    virtues: 'Angels and the Spirit (Jibril) descend with peace until the break of dawn.',
    category: 'Night of Worship'
  },
  {
    title: 'Eid al-Fitr',
    hijriDate: '1 Shawwal 1448 AH',
    gregorianDate: 'March 2027',
    description: 'The global festival of breaking the fast celebrated with communal Eid Salah, Zakat al-Fitr, and family gatherings.',
    badge: 'Islamic Eid',
    virtues: 'A day of reward and gratitude bestowed by Allah upon the fasting believers.',
    category: 'Eid'
  },
  {
    title: 'Day of Arafah (Hajj Pinnacle)',
    hijriDate: '9 Dhu al-Hijjah 1448 AH',
    gregorianDate: 'May / June 2027',
    description: 'Millions of pilgrims gather on the plains of Mount Arafat beseeching divine forgiveness in the greatest assembly on Earth.',
    badge: 'Hajj Pinnacle',
    virtues: 'Fasting on this day expiates the sins of the previous year and the coming year (Sahih Muslim).',
    category: 'Hajj'
  },
  {
    title: 'Eid al-Adha (Feast of Sacrifice)',
    hijriDate: '10 Dhu al-Hijjah 1448 AH',
    gregorianDate: 'June 2027',
    description: 'The Major Eid commemorating the unyielding devotion of Prophet Ibrahim (AS) and Prophet Ismail (AS).',
    badge: 'Major Eid',
    virtues: 'Sacrifice (Qurbani) performed for Allah with charity distributed to the poor.',
    category: 'Eid'
  },
  {
    title: 'Day of Ashura',
    hijriDate: '10 Muharram 1448 AH',
    gregorianDate: 'July 2027',
    description: 'The momentous day Allah saved Prophet Musa (AS) and the Children of Israel from Pharaoh and parted the Red Sea.',
    badge: 'Sacred Day',
    virtues: 'Fasting on Ashura expiates the sins of the previous year (Sahih Muslim).',
    category: 'Fasting'
  },
  {
    title: 'Al-Isra wal-Mi\'raj',
    hijriDate: '27 Rajab 1448 AH',
    gregorianDate: 'January 2027',
    description: 'The miraculous night journey from Masjid al-Haram to Masjid al-Aqsa and ascension through the seven heavens.',
    badge: 'Divine Ascension',
    virtues: 'The five daily canonical prayers were gifted directly to the Ummah by Allah.',
    category: 'Historical'
  },
  {
    title: 'Nisf Shaban (Shab-e-Barat)',
    hijriDate: '15 Shaban 1448 AH',
    gregorianDate: 'February 2027',
    description: 'The 15th night of Shaban, a night of seeking divine pardon, salvation, and contemplation.',
    badge: 'Night of Forgiveness',
    virtues: 'Allah looks upon His creation and forgives all except those who associate partners with Him.',
    category: 'Night of Worship'
  }
];
