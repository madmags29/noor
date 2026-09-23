// NOOR Hajj & Umrah Pilgrimage Guides, Ramadan Engine & Zakat Standards

export const UMRAH_STEPS = [
  { step: 1, name: 'Ihram & Niyyah', arabic: 'الإحرام والنية', location: 'Miqat', summary: 'Cleanse, put on the Ihram garments, make intention, and commence Talbiyah.' },
  { step: 2, name: 'Tawaf al-Umrah', arabic: 'طواف العمرة', location: 'Mataf (Kaaba)', summary: 'Perform 7 anti-clockwise circuits starting from the Black Stone (Hajar al-Aswad).' },
  { step: 3, name: 'Maqam Ibrahim Prayer', arabic: 'صلاة ركعتي الطواف', location: 'Behind Maqam Ibrahim', summary: 'Offer two units of prayer behind Maqam Ibrahim and drink Zamzam water.' },
  { step: 4, name: 'Sa‘i between Safa & Marwah', arabic: 'السعي بين الصفا والمروة', location: 'Masa‘a', summary: 'Walk 7 laps beginning on Mount Safa and ending on Mount Marwah.' },
  { step: 5, name: 'Halq or Taqsir (Shaving or Trimming)', arabic: 'الحلق أو التقصير', location: 'Barbers / Marwah exit', summary: 'Men shave head or trim hair equally; women trim a fingertip length to exit Ihram.' }
];

export const HAJJ_DAYS = [
  { day: 'Day 1 (8th Dhu al-Hijjah)', name: 'Yawm at-Tarwiyah', location: 'Mina', summary: 'Pilgrims put on Ihram, proceed to Mina, and offer Dhuhr, Asr, Maghrib, Isha, and Fajr.' },
  { day: 'Day 2 (9th Dhu al-Hijjah)', name: 'Yawm ‘Arafah', location: 'Plains of Arafat & Muzdalifah', summary: 'The supreme pillar of Hajj. Stand in dua from noon to sunset, then sleep under open skies in Muzdalifah.' },
  { day: 'Day 3 (10th Dhu al-Hijjah)', name: 'Yawm an-Nahr (Eid al-Adha)', location: 'Jamarat & Makkah', summary: 'Rami of Jamarat al-Aqaba, animal sacrifice, Halq/Taqsir, and Tawaf al-Ifadah in Makkah.' },
  { day: 'Days 4-5 (11th-12th Dhu al-Hijjah)', name: 'Ayyam at-Tashreeq', location: 'Mina & Jamarat', summary: 'Stone the three Jamarat daily after Dhuhr, remember Allah, and prepare for final Tawaf al-Wada.' }
];

export const ZAKAT_DEFAULTS = {
  goldPricePerGramUSD: 78.50,    // Current global benchmark
  silverPricePerGramUSD: 0.95,
  nisabGoldGrams: 85,           // Standard 85g gold threshold
  nisabSilverGrams: 595,        // Standard 595g silver threshold
  zakatRate: 0.025              // 2.5% on wealth held for one lunar year
};
