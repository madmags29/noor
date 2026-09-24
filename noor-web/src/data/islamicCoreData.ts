/**
 * NOOR-E-ILAHI CLASSICAL ISLAMIC KNOWLEDGE & PRACTICE ENGINE
 * Comprehensive, scholarly verified, copyright-safe classical Islamic data
 * Sourced from the Holy Qur'an, Sahih Bukhari, Sahih Muslim, Sunan collections,
 * Hisn al-Muslim, and classical fiqh manuals of the 4 Ahl al-Sunnah Madhabs.
 */

// ==========================================
// 1. PRAYER METHOD & PURIFICATION SUITE
// ==========================================

export interface WuduStep {
  step: number;
  title: string;
  arabicName: string;
  instruction: string;
  isFard: boolean;
  times: number;
  hadithNote: string;
}

export const WUDU_STEPS: WuduStep[] = [
  {
    step: 1,
    title: 'Intention (Niyyah) & Bismillah',
    arabicName: 'النِّيَّةُ وَالتَّسْمِيَة',
    instruction: 'Form the sincere intention in your heart to purify yourself for the sake of Allah, then say: "Bismillah" (In the Name of Allah).',
    isFard: true,
    times: 1,
    hadithNote: 'The Prophet ﷺ said: "Actions are but by intentions." (Sahih al-Bukhari 1)'
  },
  {
    step: 2,
    title: 'Washing Hands to Wrists',
    arabicName: 'غَسْلُ الْيَدَيْنِ إِلَى الرُّسْغَيْن',
    instruction: 'Wash both hands thoroughly up to the wrists three times, making sure water runs between the fingers (Takhlil).',
    isFard: false,
    times: 3,
    hadithNote: 'Sunnah Mu\'akkadah demonstrated in canonical hadiths of Uthman ibn Affan (Bukhari 159).'
  },
  {
    step: 3,
    title: 'Rinsing the Mouth (Madmadah)',
    arabicName: 'الْمَضْمَضَة',
    instruction: 'Take water with your right hand and rinse your mouth thoroughly three times, swirling the water to cleanse the teeth and gums.',
    isFard: false,
    times: 3,
    hadithNote: 'Using the Miswak prior to or during rinsing is highly recommended (Sahih Muslim 252).'
  },
  {
    step: 4,
    title: 'Sniffing Water into the Nose (Istinshaq)',
    arabicName: 'الِاسْتِنْشَاقُ وَالِاسْتِنْثَار',
    instruction: 'Gently sniff water into your nostrils with your right hand and blow it out with your left hand, repeating three times.',
    isFard: false,
    times: 3,
    hadithNote: 'Purifies nasal passages as practiced by the Messenger of Allah ﷺ (Sahih Muslim 226).'
  },
  {
    step: 5,
    title: 'Washing the Entire Face',
    arabicName: 'غَسْلُ الْوَجْهِ',
    instruction: 'Wash the entire face three times, from the normal hairline at the top of the forehead down to the chin, and from ear to ear.',
    isFard: true,
    times: 3,
    hadithNote: 'Explicit Quranic commandment: "O you who believe! When you rise to prayer, wash your faces..." (Surah Al-Ma\'idah 5:6).'
  },
  {
    step: 6,
    title: 'Washing Forearms Including Elbows',
    arabicName: 'غَسْلُ الْيَدَيْنِ إِلَى الْمِرْفَقَيْن',
    instruction: 'Wash your right arm from fingertips to just past the elbow three times. Then repeat the exact process for the left arm.',
    isFard: true,
    times: 3,
    hadithNote: 'Quran 5:6. The Prophet ﷺ extended the wash slightly beyond the elbow to shine on the Day of Resurrection.'
  },
  {
    step: 7,
    title: 'Wiping the Head & Ears (Masah)',
    arabicName: 'مَسْحُ الرَّأْسِ وَالأُذُنَيْن',
    instruction: 'Moisten your hands with fresh water and wipe from the front of your hair to the back and return forward once. With index fingers, wipe inside ears, and thumbs behind ears.',
    isFard: true,
    times: 1,
    hadithNote: 'Wiping the head is Fard (Quran 5:6); wiping ears is Sunnah according to the majority of scholars.'
  },
  {
    step: 8,
    title: 'Washing Feet to the Ankles',
    arabicName: 'غَسْلُ الرِّجْلَيْنِ إِلَى الْكَعْبَيْن',
    instruction: 'Thoroughly wash your right foot up to and including the ankle three times, passing little fingers between toes. Repeat for the left foot.',
    isFard: true,
    times: 3,
    hadithNote: 'Quran 5:6. "Woe to the dry heels from the Hellfire" (Sahih Muslim 241).'
  }
];

export const POST_WUDU_DUA = {
  arabic: "أَشْهَدُ أَنْ لَا إِلٰهَ إِلَّا اللهُ وَحْدَهُ لَا شَرِيكَ لَهُ، وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ. اللّٰهُمَّ اجْعَلْنِي مِنَ التَّوَّابِينَ وَاجْعَلْنِي مِنَ الْمُتَطَهِّرِينَ",
  transliteration: "Ash-hadu an la ilaha illAllahu wahdahu la shareeka lah, wa ash-hadu anna Muhammadan 'abduhu wa Rasooluh. Allahummaj-'alnee minat-tawwabeena waj-'alnee minal-mutatahhireen.",
  translation: "I bear witness that there is no deity worthy of worship except Allah alone without partner, and I bear witness that Muhammad is His servant and messenger. O Allah, make me among those who repent constantly and make me among those who purify themselves.",
  virtue: "Whoever recites this after performing wudu perfectly, the eight gates of Jannah are opened for him to enter through whichever he wills. (Sahih Muslim 234 & Jami at-Tirmidhi 55)"
};

export interface GhuslStep {
  step: number;
  type: 'Fard' | 'Sunnah';
  title: string;
  arabicName: string;
  detail: string;
}

export const GHUSL_STEPS: GhuslStep[] = [
  {
    step: 1,
    type: 'Sunnah',
    title: 'Intention & Washing Hands',
    arabicName: 'النية وغسل الكفين',
    detail: 'Form intention in your heart to lift major ritual impurity (Janabah/Hayd/Nifas). Say Bismillah and wash hands three times.'
  },
  {
    step: 2,
    type: 'Sunnah',
    title: 'Washing Private Parts',
    arabicName: 'إزالة النجاسة وتطهير الفرج',
    detail: 'Wash away any physical impurities from the private parts using the left hand.'
  },
  {
    step: 3,
    type: 'Sunnah',
    title: 'Perform Complete Wudu',
    arabicName: 'الوضوء الكامل',
    detail: 'Perform a complete wudu as for prayer. You may defer washing feet until the end of the bath.'
  },
  {
    step: 4,
    type: 'Fard',
    title: 'Rinsing Mouth and Nose',
    arabicName: 'المضمضة والاستنشاق',
    detail: 'Gargle and rinse mouth thoroughly, and sniff water into the nose to clean nostrils (obligatory in Hanafi & Hanbali madhabs; emphasized Sunnah in Shafi\'i & Maliki).'
  },
  {
    step: 5,
    type: 'Sunnah',
    title: 'Pouring Water on Head 3 Times',
    arabicName: 'إفاضة الماء على الرأس ثلاثاً',
    detail: 'Pour water over head three times, rubbing hair down to the roots and scalp thoroughly.'
  },
  {
    step: 6,
    type: 'Fard',
    title: 'Washing the Entire Body',
    arabicName: 'تعميم الجسد بالماء',
    detail: 'Pour water over the entire body, beginning with the right side, then the left side, ensuring no spot the size of a pinhead remains dry, including navel, ears, and underarms.'
  }
];

export interface SalahStep {
  step: number;
  name: string;
  arabicName: string;
  posture: string;
  arabicUtterance: string;
  transliteration: string;
  englishMeaning: string;
  vitalRules: string;
}

export const SALAH_STEPS: SalahStep[] = [
  {
    step: 1,
    name: 'Takbeerat al-Ihram (Opening Takbeer)',
    arabicName: 'تَكْبِيرَةُ الإِحْرَام',
    posture: 'Standing upright facing the Qibla (Qiyam). Raise both hands to earlobes or shoulders with open palms facing the Qibla.',
    arabicUtterance: 'اللَّهُ أَكْبَرُ',
    transliteration: 'Allahu Akbar',
    englishMeaning: 'Allah is the Greatest.',
    vitalRules: 'Obligatory opening pillar (Rukn). All worldly speech, food, and movement become prohibited upon uttering this.'
  },
  {
    step: 2,
    name: 'Qiyam (Standing & Recitation)',
    arabicName: 'الْقِيَامُ وَالْقِرَاءَة',
    posture: 'Place right hand over left hand on the chest or below navel (according to madhab). Gaze fixed on place of prostration.',
    arabicUtterance: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ • الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ...',
    transliteration: 'Bismillahir-Rahmanir-Raheem. Alhamdu lillahi Rabbil \'Alameen...',
    englishMeaning: 'In the name of Allah, the Entirely Merciful, the Especially Merciful. All praise is due to Allah, Lord of the worlds...',
    vitalRules: 'Recitation of Surah Al-Fatiha in every single Rak\'ah is an indispensable pillar (Bukhari 756). Followed by another Surah in the first two Rak\'ahs.'
  },
  {
    step: 3,
    name: 'Ruku (The Bowing)',
    arabicName: 'الرُّكُوع',
    posture: 'Say Allahu Akbar and bow until back is straight and horizontal. Clasp knees with fingers spread, elbows slightly outward.',
    arabicUtterance: 'سُبْحَانَ رَبِّيَ الْعَظِيمِ (٣ مرات)',
    transliteration: 'Subhana Rabbiyal-\'Azeem (3 times)',
    englishMeaning: 'Glory be to my Lord, the Almighty.',
    vitalRules: 'Must achieve tranquility (Tuma\'neenah) where all joints settle into place before rising.'
  },
  {
    step: 4,
    name: 'Qawmah / I\'tidal (Rising from Bowing)',
    arabicName: 'الاعْتِدَالُ بَعْدَ الرُّكُوع',
    posture: 'Rise back to a completely upright standing position while raising hands to ears/shoulders.',
    arabicUtterance: 'سَمِعَ اللَّهُ لِمَنْ حَمِدَهُ • رَبَّنَا وَلَكَ الْحَمْدُ',
    transliteration: 'Sami\'Allahu liman hamidah. Rabbana wa lakal-hamd.',
    englishMeaning: 'Allah hears whoever praises Him. Our Lord, and to You belongs all praise.',
    vitalRules: 'Standing fully upright with tranquility is an essential pillar (Bukhari 793).'
  },
  {
    step: 5,
    name: 'Sujud (Prostration)',
    arabicName: 'السُّجُود',
    posture: 'Say Allahu Akbar and prostrate onto 7 body parts: forehead & nose, palms, knees, and the balls of the toes facing Qibla.',
    arabicUtterance: 'سُبْحَانَ رَبِّيَ الأَعْلَى (٣ مرات)',
    transliteration: 'Subhana Rabbiyal-A\'la (3 times)',
    englishMeaning: 'Glory be to my Lord, the Most High.',
    vitalRules: 'The closest a servant is to his Lord is while in prostration (Sahih Muslim 482). Make plenty of sincere Dua here.'
  },
  {
    step: 6,
    name: 'Jalsah (Sitting between Two Prostrations)',
    arabicName: 'الْجَلْسَةُ بَيْنَ السَّجْدَتَيْن',
    posture: 'Say Allahu Akbar, rise from Sujud, sit upright resting on left foot with right foot upright. Hands placed on thighs.',
    arabicUtterance: 'رَبِّ اغْفِرْ لِي، رَبِّ اغْفِرْ لِي',
    transliteration: 'Rabbigh-fir lee, Rabbigh-fir lee.',
    englishMeaning: 'My Lord, forgive me; my Lord, forgive me.',
    vitalRules: 'Pause with complete calm and tranquility before descending into the second prostration.'
  },
  {
    step: 7,
    name: 'Tashahhud (The Testimony of Faith)',
    arabicName: 'التَّشَهُّدُ وَالصَّلَاةُ عَلَى النَّبِيّ',
    posture: 'Sit at end of 2nd or final Rak\'ah. Right hand on right thigh with index finger raised when reciting the Shahadah.',
    arabicUtterance: 'التَّحِيَّاتُ لِلَّهِ وَالصَّلَوَاتُ وَالطَّيِّبَاتُ، السَّلَامُ عَلَيْكَ أَيُّهَا النَّبِيُّ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ...',
    transliteration: 'At-tahiyyatu lillahi was-salawatu wat-tayyibat. As-salamu \'alayka ayyuhan-Nabiyyu wa rahmatullahi wa barakatuh...',
    englishMeaning: 'All compliments, prayers and pure words are due to Allah. Peace be upon you, O Prophet, and the mercy of Allah and His blessings...',
    vitalRules: 'Followed by Durood Ibrahim (Allahumma Salli \'ala Muhammad...) and seeking refuge from the punishments of the grave and Hellfire.'
  },
  {
    step: 8,
    name: 'Taslim (The Concluding Salutations)',
    arabicName: 'التَّسْلِيم',
    posture: 'Turn face fully to the right over shoulder, then turn face fully to the left.',
    arabicUtterance: 'السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللَّهِ (يميناً وشمالاً)',
    transliteration: 'As-salamu \'alaykum wa rahmatullah (Right then Left)',
    englishMeaning: 'May the peace and mercy of Allah be upon you.',
    vitalRules: 'The first Taslim to the right officially concludes the Salah and releases the worshipper from the sacred state of prayer.'
  }
];

export interface SunnahPrayer {
  id: string;
  name: string;
  arabicName: string;
  rakahs: string;
  timing: string;
  virtue: string;
  description: string;
}

export const SUNNAH_PRAYERS: SunnahPrayer[] = [
  {
    id: 'tahajjud',
    name: 'Tahajjud (Qiyam al-Layl)',
    arabicName: 'صَلَاةُ التَّهَجُّد',
    rakahs: '2 to 8+ Rak\'ahs (prayed in pairs of 2)',
    timing: 'Last third of the night before Fajr Adhan',
    virtue: 'The best prayer after the obligatory prayers is the night prayer. (Sahih Muslim 1163)',
    description: 'The voluntary night prayer performed after waking from sleep in the sacred hours before dawn.'
  },
  {
    id: 'witr',
    name: 'Salat al-Witr',
    arabicName: 'صَلَاةُ الْوِتْر',
    rakahs: '1, 3, or 5 Rak\'ahs (Odd numbered)',
    timing: 'Between Isha prayer and the break of true dawn (Fajr)',
    virtue: 'Allah is Witr (One) and loves the Witr. (Abu Dawud 1416)',
    description: 'An emphasized Sunnah / Wajib prayer that seals the day\'s prayers. Includes the Qunoot supplication.'
  },
  {
    id: 'duha',
    name: 'Salat al-Duha (Ishraq / Chasht)',
    arabicName: 'صَلَاةُ الضُّحَى',
    rakahs: '2, 4, or up to 8 Rak\'ahs',
    timing: '15-20 minutes after sunrise until midday zenith',
    virtue: 'It fulfills the charity owed on behalf of all 360 joints of the human body every single day. (Sahih Muslim 720)',
    description: 'The prayer of the penitent (Salat al-Awwabeen), bringing extensive barakah and divine sustenance.'
  },
  {
    id: 'rawatib',
    name: 'Sunan al-Rawatib (Daily Confirmed Sunnahs)',
    arabicName: 'السُّنَنُ الرَّوَاتِب',
    rakahs: '12 Rak\'ahs daily (2 before Fajr, 4 before & 2 after Dhuhr, 2 after Maghrib, 2 after Isha)',
    timing: 'Attached to daily obligatory prayers',
    virtue: 'Whoever prays 12 Rak\'ahs daily, a palace is built for him in Jannah. (Sahih Muslim 728)',
    description: 'The regular, established prayers that protect, beautify, and compensate for deficiencies in obligatory Salah.'
  },
  {
    id: 'istikhara',
    name: 'Salat al-Istikhara (Divine Guidance)',
    arabicName: 'صَلَاةُ الاسْتِخَارَة',
    rakahs: '2 Rak\'ahs followed by the prophetic Istikhara Dua',
    timing: 'Any non-prohibited time before making major life choices',
    virtue: 'The Prophet ﷺ taught it to companions as he would teach a Surah from the Quran. (Bukhari 1162)',
    description: 'A prayer seeking Allah\'s wisdom, decree, and barakah when deciding upon marriage, career, travel, or investments.'
  },
  {
    id: 'hajat',
    name: 'Salat al-Hajat (Prayer of Need)',
    arabicName: 'صَلَاةُ الْحَاجَة',
    rakahs: '2 Rak\'ahs followed by praise of Allah and Dua',
    timing: 'Any time of pressing worldly or spiritual difficulty',
    virtue: 'Whoever has a need from Allah should perform wudu thoroughly, pray 2 rak\'ahs, and supplicate. (Jami at-Tirmidhi 479)',
    description: 'Humbling oneself before Allah when facing hardship or seeking a permissible relief from adversity.'
  },
  {
    id: 'tasbih',
    name: 'Salat al-Tasbih (Prayer of Glorification)',
    arabicName: 'صَلَاةُ التَّسْبِيح',
    rakahs: '4 Rak\'ahs containing 300 Tasbeehat',
    timing: 'Daily, weekly on Friday, monthly, or at least once in a lifetime',
    virtue: 'Allah forgives your sins: first and last, old and new, intentional and unintentional. (Abu Dawud 1297)',
    description: 'A deeply transformative prayer reciting "SubhanAllahi wal-hamdu lillahi wa la ilaha illAllahu wallahu Akbar" 75 times per rak\'ah.'
  }
];

// ==========================================
// 2. 14 LIFE DUAS (AUTHENTIC HISN AL-MUSLIM)
// ==========================================

export interface LifeDua {
  id: string;
  category: 'travel' | 'food' | 'rain' | 'home' | 'work' | 'study' | 'marriage' | 'children' | 'parents' | 'difficulties' | 'forgiveness' | 'protection' | 'gratitude' | 'rizq';
  categoryLabel: string;
  title: string;
  arabic: string;
  transliteration: string;
  translation: string;
  hadithSource: string;
}

export const LIFE_DUAS: LifeDua[] = [
  {
    id: 'travel-1',
    category: 'travel',
    categoryLabel: 'Travel & Safar',
    title: 'Dua for Embarking on a Journey',
    arabic: 'سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَٰذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ وَإِنَّا إِلَىٰ رَبِّنَا لَمُنقَلِبُونَ',
    transliteration: 'Subhanal-ladhee sakh-khara lana hadha wa ma kunna lahu muqrineen, wa inna ila Rabbina lamunqaliboon.',
    translation: 'Glory be to Him Who has subjected this to us, whereas we were unable to conquer it by ourselves. And indeed, to our Lord we shall return.',
    hadithSource: 'Sahih Muslim 1342 (Quran 43:13-14)'
  },
  {
    id: 'food-1',
    category: 'food',
    categoryLabel: 'Food & Sustenance',
    title: 'Dua Before Eating',
    arabic: 'بِسْمِ اللَّهِ وَعَلَىٰ بَرَكَةِ اللَّهِ',
    transliteration: 'Bismillahi wa \'ala barakatillah.',
    translation: 'In the Name of Allah and with the blessings of Allah.',
    hadithSource: 'Abu Dawud 3767 & Al-Hakim'
  },
  {
    id: 'food-2',
    category: 'food',
    categoryLabel: 'Food & Sustenance',
    title: 'Dua After Finishing a Meal',
    arabic: 'الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنَا وَسَقَانَا وَجَعَلَنَا مُسْلِمِينَ',
    transliteration: 'Alhamdu lillahil-ladhee at\'amana wa saqana wa ja\'alana muslimeen.',
    translation: 'All praise is due to Allah Who gave us food and drink, and made us Muslims.',
    hadithSource: 'Jami at-Tirmidhi 3457'
  },
  {
    id: 'rain-1',
    category: 'rain',
    categoryLabel: 'Rain & Nature',
    title: 'Dua When Rain Falls',
    arabic: 'اللّٰهُمَّ صَيِّبًا نَافِعًا',
    transliteration: 'Allahumma sayyiban naafi\'aa.',
    translation: 'O Allah, make it a beneficial downpour.',
    hadithSource: 'Sahih al-Bukhari 1032'
  },
  {
    id: 'home-1',
    category: 'home',
    categoryLabel: 'Home & Dwellings',
    title: 'Dua When Leaving the House',
    arabic: 'بِسْمِ اللَّهِ تَوَكَّلْتُ عَلَى اللَّهِ، لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ',
    transliteration: 'Bismillahi tawakkaltu \'alAllahi, la hawla wa la quwwata illa billah.',
    translation: 'In the name of Allah, I place my trust in Allah; there is no power nor strength except with Allah.',
    hadithSource: 'Abu Dawud 5095 (Angels reply: You are guided, defended, and protected)'
  },
  {
    id: 'work-1',
    category: 'work',
    categoryLabel: 'Work & Enterprise',
    title: 'Dua for Halal Earnings and Protection from Debt',
    arabic: 'اللّٰهُمَّ اكْفِنِي بِحَلَالِكَ عَنْ حَرَامِكَ، وَأَغْنِنِي بِفَضْلِكَ عَمَّنْ سِوَاكَ',
    transliteration: 'Allahummak-finee bi halalika \'an haramika, wa aghninee bi fadlika \'amman siwaak.',
    translation: 'O Allah, suffice me with what is lawful so that I have no need of what is unlawful, and enrich me by Your grace so that I have no need of anyone besides You.',
    hadithSource: 'Jami at-Tirmidhi 3563 (Hasana Hadith)'
  },
  {
    id: 'study-1',
    category: 'study',
    categoryLabel: 'Study & Memory',
    title: 'Dua for Increase in Sacred & Beneficial Knowledge',
    arabic: 'رَبِّ زِدْنِي عِلْمًا • اللَّهُمَّ انْفَعْنِي بِمَا عَلَّمْتَنِي وَعَلِّمْنِي مَا يَنفَعُنِي',
    transliteration: 'Rabbi zidnee \'ilma. Allahumman-fa\'nee bima \'allamtanee wa \'allimnee ma yanfa\'unee.',
    translation: 'My Lord, increase me in knowledge. O Allah, benefit me with what You have taught me, and teach me that which will benefit me.',
    hadithSource: 'Surah Taha 20:114 & Sunan Ibn Majah 251'
  },
  {
    id: 'marriage-1',
    category: 'marriage',
    categoryLabel: 'Marriage & Spouses',
    title: 'Dua for Marital Love & Peace',
    arabic: 'رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ وَاجْعَلْنَا لِلْمُتَّقِينَ إِمَامًا',
    transliteration: 'Rabbana hab lana min azwajina wa dhurriyyatina qurrata a\'yuniw-waj\'alna lil-muttaqeena imama.',
    translation: 'Our Lord, grant us from among our spouses and offspring comfort to our eyes and make us a leader for the righteous.',
    hadithSource: 'Surah Al-Furqan 25:74'
  },
  {
    id: 'children-1',
    category: 'children',
    categoryLabel: 'Children & Family',
    title: 'Prophetic Protection for Children',
    arabic: 'أُعِيذُكُمَا بِكَلِمَاتِ اللَّهِ التَّامَّةِ مِنْ كُلِّ شَيْطَانٍ وَهَامَّةٍ وَمِنْ كُلِّ عَيْنٍ لَامَّةٍ',
    transliteration: 'U\'eedhukuma bi kalimatil-lahit-tammah, min kulli shaytanin wa hammah, wa min kulli \'aynin lammah.',
    translation: 'I seek refuge for you in the perfect words of Allah from every devil and poisonous reptile, and from every envious evil eye.',
    hadithSource: 'Sahih al-Bukhari 3371 (Recited by the Prophet ﷺ over Hasan & Husayn)'
  },
  {
    id: 'parents-1',
    category: 'parents',
    categoryLabel: 'Parents (Birr al-Walidayn)',
    title: 'Quranic Supplication for Parents',
    arabic: 'رَّبِّ ارْحَمْهُمَا كَمَا رَبَّيَانِي صَغِيرًا',
    transliteration: 'Rabbir-hamhuma kama rabbayanee sagheera.',
    translation: 'My Lord, have mercy upon them both as they brought me up when I was small.',
    hadithSource: 'Surah Al-Isra 17:24'
  },
  {
    id: 'difficulties-1',
    category: 'difficulties',
    categoryLabel: 'Difficulties & Relief',
    title: 'Dua of Prophet Yunus (In Affliction)',
    arabic: 'لَا إِلٰهَ إِلَّا أَنتَ سُبْحَانَكَ إِنِّي كُنتُ مِنَ الظَّالِمِينَ',
    transliteration: 'La ilaha illa Anta subhanaka innee kuntu minaz-zalimeen.',
    translation: 'There is no deity worthy of worship except You; exalted are You. Indeed, I have been of the wrongdoers.',
    hadithSource: 'Surah Al-Anbiya 21:87 & Tirmidhi 3505'
  },
  {
    id: 'forgiveness-1',
    category: 'forgiveness',
    categoryLabel: 'Forgiveness & Tawbah',
    title: 'Sayyidul Istighfar (Master Supplication for Forgiveness)',
    arabic: 'اللّٰهُمَّ أَنْتَ رَبِّي لَا إِلٰهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَىٰ عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ، وَأَبُوءُ بِذَنْبِي فَاغْفِرْ لِي فَإِنَّهُ لَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ',
    transliteration: 'Allahumma Anta Rabbee la ilaha illa Ant, khalaqtanee wa ana \'abduk, wa ana \'ala \'ahdika wa wa\'dika mastata\'t, a\'oodhu bika min sharri ma sana\'t, aboo-u laka bini\'matika \'alayya, wa aboo-u bidhanbee faghfir lee fa-innahu la yaghfirudh-dhunooba illa Ant.',
    translation: 'O Allah, You are my Lord. There is no deity except You. You created me and I am Your slave. I abide by Your covenant and promise as best I can. I seek refuge in You from the evil of what I have done. I acknowledge Your favor upon me, and I acknowledge my sin, so forgive me, for none forgives sins except You.',
    hadithSource: 'Sahih al-Bukhari 6306 (Whoever says it in evening/morning and dies enters Jannah)'
  },
  {
    id: 'protection-1',
    category: 'protection',
    categoryLabel: 'Protection & Safety',
    title: 'Daily Morning & Evening Shield Against All Harm',
    arabic: 'بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ',
    transliteration: 'Bismillahil-ladhee la yadurru ma\'as-mihi shay-un fil-ardi wa la fis-samaa-i wa Huwas-Samee\'ul-\'Aleem.',
    translation: 'In the Name of Allah, with Whose Name nothing can cause harm in the earth nor in the heavens, and He is the All-Hearing, the All-Knowing.',
    hadithSource: 'Abu Dawud 5088 & Tirmidhi 3388 (Recited 3 times; no sudden affliction will strike)'
  },
  {
    id: 'gratitude-1',
    category: 'gratitude',
    categoryLabel: 'Gratitude & Shukr',
    title: 'Prophetic Dua for Remembrance and Gratitude',
    arabic: 'اللّٰهُمَّ أَعِنِّي عَلَىٰ ذِكْرِكَ، وَشُكْرِكَ، وَحُسْنِ عِبَادَتِكَ',
    transliteration: 'Allahumma a\'innee \'ala dhikrika, wa shukrika, wa husni \'ibadatik.',
    translation: 'O Allah, assist me in remembering You, expressing gratitude to You, and worshipping You in the best manner.',
    hadithSource: 'Abu Dawud 1522 (Advised by the Prophet ﷺ to Mu\'adh ibn Jabal)'
  },
  {
    id: 'rizq-1',
    category: 'rizq',
    categoryLabel: 'Rizq & Wealth',
    title: 'Morning Supplication for Beneficial Knowledge & Pure Provision',
    arabic: 'اللّٰهُمَّ إِنِّي أَسْأَلُكَ عِلْمًا نَافِعًا، وَرِزْقًا طَيِّبًا، وَعَمَلًا مُتَقَبَّلًا',
    transliteration: 'Allahumma innee as-aluka \'ilman naafi\'an, wa rizqan tayyiban, wa \'amalan mutaqabbala.',
    translation: 'O Allah, I ask You for beneficial knowledge, pure and lawful provision, and deeds that are accepted.',
    hadithSource: 'Sunan Ibn Majah 925'
  }
];

// ==========================================
// 3. ZAKAT & RAMADAN DATA (OFFLINE-FRIENDLY)
// ==========================================

export const NISAB_STANDARDS = {
  goldGrams: 87.48, // 7.5 Tola or 20 Mithqals
  silverGrams: 612.36, // 52.5 Tola or 200 Dirhams
  zakatRatePercent: 2.5,
  lunarYearHawlMonths: 12,
  description: 'Zakat is due upon net wealth surpassing the Nisab threshold held for a full lunar year (Hawl).'
};

export interface SadaqahCategory {
  id: string;
  name: string;
  arabicName: string;
  icon: string;
  description: string;
  impactMetric: string;
}

export const SADAQAH_CATEGORIES: SadaqahCategory[] = [
  {
    id: 'food',
    name: 'Food & Nutrition',
    arabicName: 'إطعام الطعام',
    icon: '🍲',
    description: 'Providing nourishing food packages and hot meals to destitute families, widows, and fasting souls.',
    impactMetric: 'Provides nutritious meals for vulnerable households'
  },
  {
    id: 'water',
    name: 'Clean Water & Wells',
    arabicName: 'سقيا الماء',
    icon: '💧',
    description: 'Constructing solar-powered tube wells and filtration plants. The best ongoing charity (Sadaqah Jariyah).',
    impactMetric: 'Provides safe drinking water for entire drought-stricken villages'
  },
  {
    id: 'education',
    name: 'Education & Hifz Sponsorship',
    arabicName: 'تعليم القرآن والعلوم',
    icon: '📚',
    description: 'Sponsoring orphan students memorizing the Holy Quran and studying classical sciences, medicine, and engineering.',
    impactMetric: 'Covers full tuition, books, and boarding for underprivileged students'
  },
  {
    id: 'orphans',
    name: 'Orphan Care & Support',
    arabicName: 'كفالة الأيتام',
    icon: '🤲',
    description: '"I and the caretaker of an orphan will be in Jannah like these two" — holding index and middle fingers together.',
    impactMetric: 'Comprehensive monthly living, medical, and educational stipends'
  },
  {
    id: 'medical',
    name: 'Medical Aid & Surgeries',
    arabicName: 'العلاج والدواء',
    icon: '🏥',
    description: 'Funding cataract eye surgeries, dialysis treatments, and emergency medications for those unable to afford hospital care.',
    impactMetric: 'Restores eyesight and covers life-saving operations'
  },
  {
    id: 'emergency',
    name: 'Emergency & Disaster Relief',
    arabicName: 'الإغاثة العاجلة',
    icon: '🚨',
    description: 'Immediate first-response tents, blankets, and essential sustenance to victims of earthquakes, floods, and armed conflicts.',
    impactMetric: 'Immediate emergency rescue packets within 24 hours of crises'
  },
  {
    id: 'refugees',
    name: 'Refugee Camps & Shelter',
    arabicName: 'إيواء اللاجئين',
    icon: '⛺',
    description: 'Supplying winter heating fuel, weatherproof shelters, and sanitary stations in displaced persons camps.',
    impactMetric: 'Provides winterized shelter against freezing conditions'
  },
  {
    id: 'mosque',
    name: 'Mosque Construction',
    arabicName: 'بناء المساجد',
    icon: '🕌',
    description: '"Whoever builds a mosque for Allah, Allah will build for him a house in Jannah." (Sahih al-Bukhari 450).',
    impactMetric: 'Erects prayer halls, ablution areas, and Quran study rooms'
  },
  {
    id: 'community',
    name: 'Community Empowerment',
    arabicName: 'التمكين المجتمعي',
    icon: '🌱',
    description: 'Micro-grants and vocational sewing/farming equipment enabling impoverished families to achieve financial self-reliance.',
    impactMetric: 'Permanently lifts families out of poverty into self-sufficiency'
  }
];

// ==========================================
// 4. HAJJ & UMRAH PILGRIMAGE ENGINE
// ==========================================

export interface PilgrimageStep {
  dayOrPhase: string;
  title: string;
  arabicTitle: string;
  location: string;
  isRukn: boolean;
  actions: string[];
  duas: string;
  prohibitions: string[];
}

export const HAJJ_UMRAH_GUIDE: PilgrimageStep[] = [
  {
    dayOrPhase: 'Phase 1: Entering Ihram',
    title: 'Assumption of Ihram & Talbiyah',
    arabicTitle: 'الإِحْرَامُ وَالتَّلْبِيَة',
    location: 'At or before the Miqat boundary',
    isRukn: true,
    actions: [
      'Perform complete Ghusl (body purification) and trim nails/unwanted hair.',
      'Men don 2 unstitched white towels (Izar around waist, Rida over shoulders). Women wear modest loose clothing covering everything except face and hands.',
      'Pray 2 Rak\'ahs of Sunnah if not in a makrooh prayer time.',
      'Declare intention: "Labbayka Allahumma \'Umrah" (or Hajj).',
      'Begin chanting the Talbiyah aloud constantly.'
    ],
    duas: 'لَبَّيْكَ اللّٰهُمَّ لَبَّيْكَ، لَبَّيْكَ لَا شَرِيكَ لَكَ لَبَّيْكَ، إِنَّ الْحَمْدَ وَالنِّعْمَةَ لَكَ وَالْمُلْكَ، لَا شَرِيكَ لَكَ',
    prohibitions: [
      'Applying scented perfumes or soaps',
      'Cutting nails or clipping hair',
      'Covering head (men) or face/hands with niqab/gloves (women)',
      'Intimate relations or vulgar disputes'
    ]
  },
  {
    dayOrPhase: 'Phase 2: Makkah Arrival',
    title: 'Tawaf al-Qudum (Arrival Circumambulation)',
    arabicTitle: 'طَوَافُ الْقُدُوم',
    location: 'Al-Masjid al-Haram, Kaaba',
    isRukn: true,
    actions: [
      'Perform Idtiba (men expose right shoulder by passing Rida under right armpit).',
      'Start at the Black Stone (Hajar al-Aswad) corner. Raise right hand and declare: "Bismillahi Allahu Akbar".',
      'Complete 7 anti-clockwise circuits around the Kaaba.',
      'Perform Raml (quick, brisk footsteps) during the first 3 circuits (men only).',
      'Touch or salute the Yemeni Corner (Rukn al-Yamani) without kissing.',
      'Pray 2 Rak\'ahs behind Maqam Ibrahim, reciting Surahs Al-Kafirun and Al-Ikhlas.',
      'Drink deeply from the Well of Zamzam.'
    ],
    duas: 'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ (بين الركن اليماني والحجر الأسود)',
    prohibitions: ['Circumambulating inside the Hijr Ismail (Hateem) as it is part of Kaaba']
  },
  {
    dayOrPhase: 'Phase 3: Sa\'i',
    title: 'Sa\'i between Safa and Marwa',
    arabicTitle: 'السَّعْيُ بَيْنَ الصَّفَا وَالْمَرْوَة',
    location: 'Mas\'a gallery between Mount Safa and Mount Marwa',
    isRukn: true,
    actions: [
      'Ascend Mount Safa, face the Kaaba, raise hands, make Takbeer and sincere supplications.',
      'Walk toward Mount Marwa (1st lap). Men jog briskly between the two green light markers.',
      'Arrive at Marwa, face Kaaba, and make Dua. This completes lap 1.',
      'Repeat until 7 laps are completed (ending at Marwa).',
      'Umrah concludes with Halq (shaving head - best for men) or Taqsir (shortening hair). Women cut a fingertip length from the end of their braid.'
    ],
    duas: 'إِنَّ الصَّفَا وَالْمَرْوَةَ مِن شَعَائِرِ اللَّهِ... أَبْدَأُ بِمَا بَدَأَ اللَّهُ بِهِ • لَا إِلٰهَ إِلَّا اللهُ وَحْدَهُ أَنْجَزَ وَعْدَهُ وَنَصَرَ عَبْدَهُ وَهَزَمَ الأَحْزَابَ وَحْدَهُ',
    prohibitions: ['Leaving laps uncounted or reversing direction']
  },
  {
    dayOrPhase: 'Hajj Day 1: 8th Dhul Hijjah',
    title: 'Yawm al-Tarwiyah in Mina',
    arabicTitle: 'يَوْمُ التَّرْوِيَة بِمِنَى',
    location: 'Tented Valley of Mina',
    isRukn: false,
    actions: [
      'Enter state of Ihram for Hajj from your accommodation in Makkah if performing Tamattu\'.',
      'Proceed to Mina before midday.',
      'Pray Dhuhr, Asr, Maghrib, Isha, and Fajr of 9th Dhul Hijjah in Mina, shortening 4-rak\'ah prayers to 2 without combining (Qasr).'
    ],
    duas: 'Frequent recitation of Talbiyah, Takbeer, and remembrance of Allah.',
    prohibitions: ['Engaging in unneeded worldly business']
  },
  {
    dayOrPhase: 'Hajj Day 2: 9th Dhul Hijjah',
    title: 'Wuquf at Mount Arafat (The Greatest Pillar)',
    arabicTitle: 'الْوُقُوفُ بِعَرَفَة (الْحَجُّ عَرَفَة)',
    location: 'Plain of Arafat & Mount of Mercy (Jabal al-Rahmah)',
    isRukn: true,
    actions: [
      '"Hajj is Arafat" (Tirmidhi 889). If Arafat is missed, Hajj is void.',
      'Arrive in Arafat after sunrise. Listen to Khutbah at Masjid Namirah.',
      'Combine Dhuhr and Asr prayers at Dhuhr time with 1 Adhan and 2 Iqamahs (Jam\' Taqdim).',
      'Spend the afternoon until sunset in intense, tearful supplication, standing facing Qibla.',
      'Do NOT leave Arafat until the sun has completely set.'
    ],
    duas: 'خَيْرُ الدُّعَاءِ دُعَاءُ يَوْمِ عَرَفَةَ: لَا إِلٰهَ إِلَّا اللهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ',
    prohibitions: ['Fast on the day of Arafat (the pilgrim should remain physically strong for worship)']
  },
  {
    dayOrPhase: 'Hajj Night: 9th-10th Dhul Hijjah',
    title: 'Overnight Stay at Muzdalifah',
    arabicTitle: 'الْمَبِيتُ بِمُزْدَلِفَة',
    location: 'Open skies of Muzdalifah',
    isRukn: false,
    actions: [
      'Depart Arafat peacefully without rushing after sunset.',
      'Combine Maghrib (3 Rak\'ahs) and Isha (shortened to 2 Rak\'ahs) at Isha time in Muzdalifah.',
      'Sleep under the open sky until Fajr.',
      'Collect 49 to 70 small chickpea-sized pebbles for the Jamarat.',
      'Pray Fajr at earliest dawn, stand at Al-Mash\'ar al-Haram making Dua until sunrise approaches.'
    ],
    duas: 'فَإِذَا أَفَضْتُم مِّنْ عَرَفَاتٍ فَاذْكُرُوا اللَّهَ عِندَ الْمَشْعَرِ الْحَرَامِ (البقرة ۱۹۸)',
    prohibitions: ['Praying Maghrib on the road before reaching Muzdalifah']
  },
  {
    dayOrPhase: 'Hajj Day 3: 10th Dhul Hijjah (Eid)',
    title: 'Yawm al-Nahr: Stoning, Sacrifice, Halq & Tawaf',
    arabicTitle: 'يَوْمُ النَّحْرِ (يَوْمُ الْحَجِّ الأَكْبَر)',
    location: 'Mina & Makkah',
    isRukn: true,
    actions: [
      'Rami Jamarat al-Aqaba: Throw 7 pebbles at the Big Pillar saying "Allahu Akbar" with each throw.',
      'Qurbani (Hady): Sacrifice of livestock (usually executed via authorized voucher banks).',
      'Halq or Taqsir: Shave or trim hair. Now First Desacralization (Tahallul al-Asghar) is achieved—all prohibitions lifted except spousal relations.',
      'Proceed to Makkah to perform Tawaf al-Ifadah (obligatory pillar) and Sa\'i of Hajj.',
      'With Tawaf al-Ifadah completed, full Tahallul al-Akbar is achieved.'
    ],
    duas: 'بِسْمِ اللَّهِ، اللَّهُ أَكْبَرُ، رَغْمًا لِلشَّيْطَانِ وَرِضًا لِلرَّحْمَٰنِ',
    prohibitions: ['Throwing shoes, umbrellas, or large boulders at Jamarat']
  },
  {
    dayOrPhase: 'Hajj Days 4-5: 11th-13th Dhul Hijjah',
    title: 'Ayyam al-Tashreeq & Tawaf al-Wada',
    arabicTitle: 'أَيَّامُ التَّشْرِيقِ وَطَوَافُ الْوَدَاع',
    location: 'Mina & Makkah',
    isRukn: false,
    actions: [
      'Stay overnight in Mina on the nights of 11th and 12th Dhul Hijjah.',
      'Stone all 3 Jamarat each afternoon after Zawal: 7 at Sughra, 7 at Wusta, 7 at Aqaba (21 pebbles per day).',
      'Depart Mina before sunset on 12th (Nafr Awwal) or stay until 13th (Nafr Thani).',
      'Before departing Makkah permanently, perform Tawaf al-Wada (Farewell Circumambulation).'
    ],
    duas: 'Praise and gratitude for Allah\'s grace in completing the pilgrimage.',
    prohibitions: ['Leaving Makkah without Tawaf al-Wada (except menstruating women who are exempt)']
  }
];

export const HAJJ_PACKING_CHECKLIST = [
  { item: '2 Sets of White Ihram (Men)', essential: true },
  { item: 'Ihram Belt / Secure Waist Pouch for Passports & Cash', essential: true },
  { item: 'Unscented Soap, Shampoo & Deodorant', essential: true },
  { item: 'Comfortable Walking Sandals (Ankles & instep visible for men)', essential: true },
  { item: 'Small Pebble Pouch (For Jamarat gathering)', essential: true },
  { item: 'Sun Umbrella & UV Sunglasses', essential: true },
  { item: 'Pocket Quran & Authentic Duas Guide', essential: true },
  { item: 'Power Bank (10,000mAh+) & Universal Travel Adapter', essential: true },
  { item: 'Vaseline / Anti-Chafing Cream for Thighs', essential: true },
  { item: 'Personal Medications, Oral Rehydration Salts & Paracetamol', essential: true },
  { item: 'Lightweight Compact Sleeping Mat (For Muzdalifah)', essential: false }
];

// ==========================================
// 5. JANAZAH & BEREAVEMENT GUIDE
// ==========================================

export interface JanazahGuideSection {
  id: string;
  title: string;
  arabicTitle: string;
  summary: string;
  stepsOrRules: string[];
  keyDua?: {
    arabic: string;
    transliteration: string;
    translation: string;
  };
}

export const JANAZAH_GUIDE: JanazahGuideSection[] = [
  {
    id: 'at-death',
    title: 'Immediate Actions Upon Demise',
    arabicTitle: 'مَا يُفْعَلُ عِنْدَ الْمَوْت',
    summary: 'Clear, compassionate instructions for family members at the bedside of the deceased.',
    stepsOrRules: [
      'Gently close the eyes of the deceased and make Dua for them (as the Prophet ﷺ did for Abu Salamah, Muslim 920).',
      'Tie a soft cloth under the chin and around the top of the head so the mouth remains closed.',
      'Gently straighten the arms and legs before rigor mortis sets in.',
      'Remove jewelry, watches, and tight garments.',
      'Cover the entire body with a clean white sheet.',
      'Inform close family, scholars, and local funeral coordinators promptly.',
      'Settle immediate debts of the deceased from their estate without delay.'
    ],
    keyDua: {
      arabic: 'اللّٰهُمَّ اغْفِرْ لَهُ وَارْفَعْ دَرَجَتَهُ فِي الْمَهْدِيِّينَ، وَاخْلُفْهُ فِي عَقِبِهِ فِي الْغَابِرِينَ، وَاغْفِرْ لَنَا وَلَهُ يَا رَبَّ الْعَالَمِينَ، وَافْسَحْ لَهُ فِي قَبْرِهِ وَنَوِّرْ لَهُ فِيهِ',
      transliteration: 'Allahummagh-fir lahu war-fa\' darajatahu fil-mahdiyyeen, wakhlufhu fee \'aqibihi fil-ghaabireen, wagh-fir lana wa lahu ya Rabbal-\'Alameen, wafsah lahu fee qabrihi wa nawwir lahu feeh.',
      translation: 'O Allah, forgive him, raise his rank among the rightly guided, grant a successor to those he leaves behind, forgive us and him O Lord of the Worlds, make his grave spacious and illuminate it for him.'
    }
  },
  {
    id: 'ghusl-janazah',
    title: 'Ghusl of the Deceased (The Ritual Wash)',
    arabicTitle: 'غُسْلُ الْمَيِّت',
    summary: 'The washing must be performed by trustworthy individuals of the same gender (or spouse) who preserve dignity and confidentiality.',
    stepsOrRules: [
      'Cover the body from navel to knee with a dark sheet (Awrah must never be exposed).',
      'Press the abdomen very gently to expel waste, washing away any discharges.',
      'Wrap a cloth around the hand to cleanse private areas without directly viewing or touching bare skin.',
      'Perform wudu for the deceased (without inserting water directly into mouth or nose; use damp cloth for teeth and nostrils).',
      'Wash hair and beard with mild soap/sidr water.',
      'Wash right side of body, then left side, three times.',
      'Add camphor (Kafoor) to the final wash for pleasant fragrance and preservation.'
    ]
  },
  {
    id: 'kafan',
    title: 'The Kafan (Shrouding)',
    arabicTitle: 'تَكْفِينُ الْمَيِّت',
    summary: 'The shroud should be clean white cloth, dignified yet simple without ostentation.',
    stepsOrRules: [
      'For Men: 3 large white sheets (Lifafah, Izaar, Qamees/wrapper), perfumed with incense (Bakhur).',
      'For Women: 5 pieces (Izaar, Qamees/dress, Khimar/head covering, Lifafah/outer wrap, and chest wrap).',
      'Apply perfume (Hunut / non-alcoholic musk) to prostration points: forehead, nose, hands, knees, and feet.',
      'Fold left side over right side, then right over left, and tie with cloth strips at head, waist, and feet.'
    ]
  },
  {
    id: 'salat-janazah',
    title: 'Salatul Janazah (The Funeral Prayer)',
    arabicTitle: 'صَلَاةُ الْجَنَازَة (أَرْبَعُ تَكْبِيرَات)',
    summary: 'A communal obligation (Fard Kifayah) performed entirely standing upright with 4 Takbeers. There is no Ruku and no Sujud.',
    stepsOrRules: [
      'Imam stands at the chest of a deceased male, or at the middle/waist of a deceased female.',
      '1st Takbeer: Say "Allahu Akbar", fold hands, and recite Surah Al-Fatiha in a low voice.',
      '2nd Takbeer: Say "Allahu Akbar" and recite Durood Ibrahim (the same blessings upon the Prophet ﷺ as in regular prayer).',
      '3rd Takbeer: Say "Allahu Akbar" and make the comprehensive authentic Dua for the deceased.',
      '4th Takbeer: Say "Allahu Akbar", pause briefly making Dua for the living, then conclude with Taslim ("As-salamu \'alaykum wa rahmatullah") to the right.'
    ],
    keyDua: {
      arabic: 'اللّٰهُمَّ اغْفِرْ لِحَيِّنَا وَمَيِّتِنَا، وَشَاهِدِنَا وَغَائِبِنَا، وَصَغِيرِنَا وَكَبِيرِنَا، وَذَكَرِنَا وَأُنْثَانَا. اللّٰهُمَّ مَنْ أَحْيَيْتَهُ مِنَّا فَأَحْيِهِ عَلَى الإِسْلَامِ، وَمَنْ تَوَفَّيْتَهُ مِنَّا فَتَوَفَّهُ عَلَى الإِيمَانِ',
      transliteration: 'Allahummagh-fir lihayyina wa mayyitina, wa shahidina wa gha\'ibina, wa sagheerina wa kabeerina, wa dhakarina wa unthana. Allahumma man ahyaytahu minna fa-ahyihi \'alal-Islam, wa man tawaffaytahu minna fa-tawaffahu \'alal-Iman.',
      translation: 'O Allah, forgive our living and our dead, those present and those absent, our young and our old, our males and our females. O Allah, whomever You keep alive among us, keep him alive upon Islam; and whomever You cause to die among us, cause him to die upon faith.'
    }
  },
  {
    id: 'burial',
    title: 'Burial & Cemetery Sunnah Etiquette',
    arabicTitle: 'الدَّفْنُ وَآدَابُ الْمَقَابِر',
    summary: 'The dignified, silent interment and post-burial supplications.',
    stepsOrRules: [
      'Carry the bier respectfully with haste without running (Bukhari 1315).',
      'Place deceased into the grave on their right side facing towards the Qibla.',
      'Untie the head and feet knots of the shroud.',
      'Say upon placing in grave: "Bismillahi wa \'ala millati Rasoolillah" (In the Name of Allah and upon the faith of Allah\'s Messenger).',
      'Each attendee pours 3 handfuls of earth at the head of the grave.',
      'Raise grave only one hand-span above ground level in a modest mound.',
      'Remain at grave for a period asking steadfastness (Thabat) for the deceased during questioning by Munkar and Nakir.'
    ]
  }
];

// ==========================================
// 6. ISLAMIC ETIQUETTE (ADAB) LIBRARY
// ==========================================

export interface AdabCategory {
  id: string;
  title: string;
  arabicTitle: string;
  icon: string;
  rules: string[];
}

export const ISLAMIC_ADAB_LIBRARY: AdabCategory[] = [
  {
    id: 'eating',
    title: 'Etiquette of Eating & Drinking',
    arabicTitle: 'آدَابُ الأَكْلِ وَالشُّرْب',
    icon: '🍽️',
    rules: [
      'Wash hands before and after meals.',
      'Say "Bismillah" before eating and eat with the right hand.',
      'Eat from the side of the plate closest to you (Bukhari 5376).',
      'Never criticize food; if you like it eat, otherwise leave it respectfully.',
      'Do not breathe or blow into the drinking vessel.',
      'Praise Allah at the end with Alhamdulillah.'
    ]
  },
  {
    id: 'sleeping',
    title: 'Etiquette of Sleeping & Rest',
    arabicTitle: 'آدَابُ النَّوْم',
    icon: '🌙',
    rules: [
      'Perform wudu before going to bed (Bukhari 247).',
      'Dust the bedsheet three times before lying down.',
      'Lie on the right side with right hand beneath the right cheek.',
      'Recite Ayat al-Kursi and the Mu\'awwidhatayn (Surahs Al-Ikhlas, Al-Falaq, An-Nas) and blow into hands.',
      'Do not sleep on the stomach (Tirmidhi 2768).'
    ]
  },
  {
    id: 'mosque',
    title: 'Etiquette of the Mosque (Masjid)',
    arabicTitle: 'آدَابُ الْمَسْجِد',
    icon: '🕌',
    rules: [
      'Enter with the right foot saying the Dua for entering the mosque.',
      'Do not enter after eating raw garlic, onions, or carrying unpleasant odors (Muslim 564).',
      'Pray 2 Rak\'ahs Tahiyyat al-Masjid before sitting down.',
      'Keep your voice low; do not raise voice even when reciting Quran if it disturbs others.',
      'Never walk in front of someone actively praying.',
      'Exit with the left foot saying the Dua for seeking Allah\'s bounty.'
    ]
  },
  {
    id: 'greeting',
    title: 'Etiquette of Greeting (Salam)',
    arabicTitle: 'آدَابُ التَّسْلِيم',
    icon: '🤝',
    rules: [
      'Initiate with "As-Salamu \'Alaykum wa Rahmatullahi wa Barakatuh".',
      'Respond with equal or better: "Wa \'Alaykumu As-Salam wa Rahmatullahi wa Barakatuh".',
      'The rider greets the pedestrian; the walking person greets the seated one; the smaller group greets the larger (Bukhari 6232).',
      'Warm two-handed handshake between members of the same gender forgives minor sins before separating (Tirmidhi 2727).'
    ]
  },
  {
    id: 'parents',
    title: 'Etiquette with Parents (Birr al-Walidayn)',
    arabicTitle: 'بِرُّ الْوَالِدَيْن',
    icon: '🤍',
    rules: [
      'Never utter words of annoyance or say "Uff" to them (Quran 17:23).',
      'Lower the wing of humility and mercy before them.',
      'Do not call them by their first names or walk in front of them out of pride.',
      'Serve them eagerly, especially in old age.',
      'Continue making Dua and charity on their behalf even after their passing.'
    ]
  },
  {
    id: 'neighbors',
    title: 'Rights of Neighbors',
    arabicTitle: 'حُقُوقُ الْجَار',
    icon: '🏡',
    rules: [
      '"Jibril kept enjoining good treatment of the neighbor until I thought he would make him an heir" (Bukhari 6014).',
      'Never harm a neighbor through loud noise, rubbish, or intrusion.',
      'Share food; add extra broth to soup to send a portion to your neighbor.',
      'He is not a true believer who eats his fill while his neighbor goes hungry (Al-Adab al-Mufrad 112).'
    ]
  },
  {
    id: 'business',
    title: 'Commercial & Business Ethics',
    arabicTitle: 'آدَابُ التِّجَارَةِ وَالْبَيْع',
    icon: '⚖️',
    rules: [
      'Strict prohibition of Riba (interest/usury) in all contracts.',
      'Complete honesty in weights, measures, and disclosing defects in goods.',
      'Do not take false oaths to sell products.',
      'Give leeway and extension to indebted persons in difficulty.',
      'Pay employees and laborers their wages before their sweat dries (Ibn Majah 2443).'
    ]
  },
  {
    id: 'cleanliness',
    title: 'Personal Cleanliness & Fitrah',
    arabicTitle: 'خِصَالُ الْفِطْرَةِ وَالنَّظَافَة',
    icon: '✨',
    rules: [
      '"Purification is half of faith" (Sahih Muslim 223).',
      'Use the Miswak regularly before prayers and wudu.',
      'Clip finger and toe nails at least once every 40 days.',
      'Remove underarm and pubic hair within 40 days.',
      'Trim the mustache and let the beard grow with dignity.'
    ]
  }
];

// ==========================================
// 7. NIKAH & FAMILY HUB
// ==========================================

export interface NikahGuidance {
  section: string;
  title: string;
  points: string[];
}

export const NIKAH_FAMILY_GUIDE: NikahGuidance[] = [
  {
    section: 'pillars',
    title: 'The 5 Essential Pillars of an Islamic Nikah',
    points: [
      '1. Mutual Consent: Free, voluntary consent from both the bride and the groom without compulsion.',
      '2. Wali (Guardian): Presence and agreement of the bride\'s righteous guardian according to Shariah.',
      '3. Two Upright Witnesses: Two sane, adult Muslim witnesses hearing the formal contract exchange.',
      '4. Mahr (Dower): Mandatory gift granted by the groom exclusively to the bride as her sole property.',
      '5. Ijab & Qabul: Clear, unambiguous spoken offer and acceptance in the presence of all parties.'
    ]
  },
  {
    section: 'pre-marital',
    title: 'Crucial Discussion Questions Before Marriage',
    points: [
      '1. Practice of Deen: Expectations regarding daily Salah, Halal sustenance, Islamic gatherings, and Quran study.',
      '2. Financial Management: Household budgeting, handling of debts, independent wealth rights, and charity.',
      '3. In-Laws & Boundaries: Living arrangements, frequency of visits, and respecting privacy.',
      '4. Children & Upbringing: When to have children, Islamic schooling, discipline, and emotional development.',
      '5. Conflict Resolution: How disagreements will be addressed constructively and with calm consultation (Shura).'
    ]
  },
  {
    section: 'rights',
    title: 'Mutual Rights & Responsibilities',
    points: [
      'Husband\'s Duty: Complete financial maintenance (housing, food, clothing), gentleness, physical protection, and spiritual leadership.',
      'Wife\'s Duty: Loyalty, safeguarding his home and honor, mutual cooperation, and emotional sanctuary.',
      'Prophetic Guideline: "The most complete believer in faith is the one with the best character, and the best of you are those who are best to their wives." (Tirmidhi 1162)'
    ]
  }
];

// ==========================================
// 8. NOOR KIDS & FAMILY SUITE
// ==========================================

export interface ArabicLetter {
  letter: string;
  name: string;
  transliteration: string;
  word: string;
  meaning: string;
  audioHint: string;
}

export const ARABIC_ALPHABET: ArabicLetter[] = [
  { letter: 'ا', name: 'Alif', transliteration: 'A', word: 'أَللّٰه', meaning: 'Allah (The Creator)', audioHint: 'Ah as in America' },
  { letter: 'ب', name: 'Baa', transliteration: 'B', word: 'بَيْت', meaning: 'Bayt (House of Allah)', audioHint: 'B as in Book' },
  { letter: 'ت', name: 'Taa', transliteration: 'T', word: 'تَمْر', meaning: 'Tamr (Date fruit)', audioHint: 'T as in Table' },
  { letter: 'ث', name: 'Thaa', transliteration: 'Th', word: 'ثَوَاب', meaning: 'Thawab (Divine Reward)', audioHint: 'Th as in Think' },
  { letter: 'ج', name: 'Jeem', transliteration: 'J', word: 'جَنَّة', meaning: 'Jannah (Paradise)', audioHint: 'J as in Joy' },
  { letter: 'ح', name: 'Haa', transliteration: 'H', word: 'حَجّ', meaning: 'Hajj (Pilgrimage)', audioHint: 'Throaty H as in Breath' },
  { letter: 'خ', name: 'Khaa', transliteration: 'Kh', word: 'خَيْر', meaning: 'Khayr (Goodness)', audioHint: 'Kh like Scottish loch' },
  { letter: 'د', name: 'Daal', transliteration: 'D', word: 'دُعَاء', meaning: 'Dua (Supplication)', audioHint: 'D as in Door' },
  { letter: 'ذ', name: 'Dhaal', transliteration: 'Dh', word: 'ذِكْر', meaning: 'Dhikr (Remembrance)', audioHint: 'Dh as in This' },
  { letter: 'ر', name: 'Raa', transliteration: 'R', word: 'رَحْمَة', meaning: 'Rahmah (Mercy)', audioHint: 'Rolled R as in Rain' },
  { letter: 'ز', name: 'Zaay', transliteration: 'Z', word: 'زَكَاة', meaning: 'Zakat (Purifying Charity)', audioHint: 'Z as in Zebra' },
  { letter: 'س', name: 'Seen', transliteration: 'S', word: 'سَلَام', meaning: 'Salam (Peace)', audioHint: 'S as in Sun' },
  { letter: 'ش', name: 'Sheen', transliteration: 'Sh', word: 'شُكْر', meaning: 'Shukr (Gratitude)', audioHint: 'Sh as in Shine' },
  { letter: 'ص', name: 'Saad', transliteration: 'S', word: 'صَلَاة', meaning: 'Salah (Prayer)', audioHint: 'Deep emphatic S' },
  { letter: 'ض', name: 'Daad', transliteration: 'D', word: 'ضِيَاء', meaning: 'Diyaa (Radiant Light)', audioHint: 'Unique emphatic D' },
  { letter: 'ط', name: 'Taa', transliteration: 'T', word: 'طَيِّب', meaning: 'Tayyib (Pure & Halal)', audioHint: 'Heavy emphatic T' },
  { letter: 'ظ', name: 'Dhaa', transliteration: 'Dh', word: 'ظِلّ', meaning: 'Zill (Shade on Day of Judgment)', audioHint: 'Heavy emphatic Dh' },
  { letter: 'ع', name: 'Ayn', transliteration: '\'', word: 'عِلْم', meaning: '\'Ilm (Knowledge)', audioHint: 'Deep throat vowel' },
  { letter: 'غ', name: 'Ghayn', transliteration: 'Gh', word: 'غَفُور', meaning: 'Ghafoor (All-Forgiving)', audioHint: 'Gargling Gh sound' },
  { letter: 'ف', name: 'Faa', transliteration: 'F', word: 'فَجْر', meaning: 'Fajr (Dawn Prayer)', audioHint: 'F as in Faith' },
  { letter: 'ق', name: 'Qaaf', transliteration: 'Q', word: 'قُرْآن', meaning: 'Qur\'an (The Holy Book)', audioHint: 'Deep uvular Q' },
  { letter: 'ك', name: 'Kaaf', transliteration: 'K', word: 'كَعْبَة', meaning: 'Ka\'bah (The Holy House)', audioHint: 'K as in King' },
  { letter: 'ل', name: 'Laam', transliteration: 'L', word: 'لَيْل', meaning: 'Layl (Night of Power)', audioHint: 'L as in Light' },
  { letter: 'م', name: 'Meem', transliteration: 'M', word: 'مَسْجِد', meaning: 'Masjid (Mosque)', audioHint: 'M as in Moon' },
  { letter: 'ن', name: 'Noon', transliteration: 'N', word: 'نُور', meaning: 'Noor (Divine Divine Light)', audioHint: 'N as in Noble' },
  { letter: 'هـ', name: 'Haa', transliteration: 'H', word: 'هِدَايَة', meaning: 'Hidayah (Guidance)', audioHint: 'Gentle H as in Heart' },
  { letter: 'و', name: 'Waaw', transliteration: 'W', word: 'وُضُوء', meaning: 'Wudu (Ablution)', audioHint: 'W as in Water' },
  { letter: 'ي', name: 'Yaa', transliteration: 'Y', word: 'يَقِين', meaning: 'Yaqeen (Certainty)', audioHint: 'Y as in Yes' }
];

export interface ProphetStory {
  id: string;
  name: string;
  arabicName: string;
  title: string;
  moralLesson: string;
  kidStory: string;
}

export const PROPHET_STORIES: ProphetStory[] = [
  {
    id: 'adam',
    name: 'Prophet Adam',
    arabicName: 'آدَم عَلَيْهِ السَّلَام',
    title: 'The Father of Humanity & The Power of Tawbah',
    moralLesson: 'Whenever we make a mistake, we should immediately ask Allah for forgiveness and never lose hope.',
    kidStory: 'Allah created Prophet Adam with great honor and taught him the names of everything in existence. When Adam forgot and ate from the tree in Paradise, he immediately admitted his fault and made sincere Dua: "Our Lord, we have wronged ourselves." Allah showed immense mercy, forgave him, and made him the first Prophet.'
  },
  {
    id: 'nuh',
    name: 'Prophet Nuh',
    arabicName: 'نُوح عَلَيْهِ السَّلَام',
    title: 'The Builder of the Ark & 950 Years of Patience',
    moralLesson: 'Never give up on doing good, even when others tease you or make fun of your faith.',
    kidStory: 'Prophet Nuh spoke to his people with kindness and wisdom for hundreds of years. Allah instructed him to build a giant wooden Ark far away from any water. People laughed at him, but when the great rain poured from the sky, the Ark carried believers and pairs of every animal to safety across the waters.'
  },
  {
    id: 'ibrahim',
    name: 'Prophet Ibrahim',
    arabicName: 'إِبْرَاهِيم عَلَيْهِ السَّلَام',
    title: 'Friend of Allah & The Builder of the Kaaba',
    moralLesson: 'True faith in Allah protects our hearts, and standing for truth is always rewarded.',
    kidStory: 'Prophet Ibrahim searched with his pure heart for the true Creator, realizing that the sun, moon, and stars are created beings. When the tyrant king cast him into a roaring fire, Allah commanded: "O fire, be cool and peaceful for Ibrahim!" The flames turned cool like a fragrant garden. Together with his son Ismail, he built the Holy Kaaba in Makkah.'
  },
  {
    id: 'yunus',
    name: 'Prophet Yunus',
    arabicName: 'يُونُس عَلَيْهِ السَّلَام',
    title: 'The Prophet Inside the Great Whale',
    moralLesson: 'No matter how dark or difficult things seem, calling upon Allah will always illuminate the way.',
    kidStory: 'Prophet Yunus found himself swallowed into the stomach of a great whale in the depths of the ocean. In the darkness of the sea, he called upon Allah: "There is no deity except You, Glory be to You, indeed I was of the wrongdoers." Allah heard his sincere prayer and commanded the gentle whale to safely place him on a soft, green shore.'
  },
  {
    id: 'muhammad',
    name: 'Prophet Muhammad ﷺ',
    arabicName: 'مُحَمَّدٌ رَسُولُ اللَّهِ ﷺ',
    title: 'The Mercy to All the Worlds',
    moralLesson: 'Kindness, honesty, and forgiveness are the most powerful ways to change the world.',
    kidStory: 'Prophet Muhammad ﷺ was known as Al-Ameen (The Trustworthy) even before receiving the Quran in Cave Hira through Angel Jibril. He loved children, smiled often, helped orphans, and fed the hungry. When he conquered Makkah peacefully, he forgave all who had wronged him, showing the entire world what true divine mercy looks like.'
  }
];

// ==========================================
// 9. MUSLIM TRAVEL (NOOR TRAVEL MODE)
// ==========================================

export const TRAVEL_MODE_RULES = {
  minDistanceKm: 77, // approx 48 miles (Masafah al-Qasr)
  shorteningPrayers: 'Dhuhr (4 -> 2), Asr (4 -> 2), Isha (4 -> 2). Fajr (2) and Maghrib (3) remain unchanged.',
  combiningAllowed: 'Combining Dhuhr with Asr, and Maghrib with Isha is permitted during active travel (Jam\').',
  wipingSocksDays: 'A traveler may wipe (Masah) over leather/thick socks for 3 days and 3 nights (72 hours).',
  fastingExemption: 'Travelers may postpone obligatory Ramadan fasts and make them up later.',
  halalEvidenceRule: 'Never declare an establishment Halal without verified proof, Muslim ownership, or recognized Halal authority certification.'
};

// ==========================================
// 10. NOOR WATCH (PERMITTED ISLAMIC VIDEOS)
// ==========================================

export interface PermittedVideo {
  id: string;
  category: 'Live' | 'Quran' | 'Seerah' | 'History' | 'Hajj';
  title: string;
  subtitle: string;
  duration: string;
  sourceUrl: string;
  thumbnail: string;
}

export const PERMITTED_VIDEOS: PermittedVideo[] = [
  {
    id: 'makkah-live',
    category: 'Live',
    title: 'Makkah Al-Mukarramah Live 24/7',
    subtitle: 'Live Holy Kaaba Tawaf & Adhan Broadcast',
    duration: 'LIVE STREAM',
    sourceUrl: 'https://www.youtube.com/embed/live_stream?channel=UC4R8DWoMoI7CAwX8_BQERKwf',
    thumbnail: 'https://images.unsplash.com/photo-1565552645632-d725f8bfc19a?w=800&q=80'
  },
  {
    id: 'madinah-live',
    category: 'Live',
    title: 'Al-Masjid An-Nabawi Live 24/7',
    subtitle: 'Live Madinah Munawwarah Rawdah & Prayers',
    duration: 'LIVE STREAM',
    sourceUrl: 'https://www.youtube.com/embed/live_stream?channel=UC4R8DWoMoI7CAwX8_BQERKwg',
    thumbnail: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?w=800&q=80'
  },
  {
    id: 'quran-mishary',
    category: 'Quran',
    title: 'Surah Al-Kahf • Full Heartfelt Recitation',
    subtitle: 'Sheikh Mishary Rashid Alafasy',
    duration: '28:14',
    sourceUrl: 'https://www.youtube-nocookie.com/embed/7xR3-79w8x8',
    thumbnail: 'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=800&q=80'
  },
  {
    id: 'seerah-documentary',
    category: 'Seerah',
    title: 'In the Footsteps of the Prophet ﷺ',
    subtitle: 'Sacred Makkah to Madinah Historical Walkthrough',
    duration: '42:50',
    sourceUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ',
    thumbnail: 'https://images.unsplash.com/photo-1519817650390-64a93db51149?w=800&q=80'
  }
];

// ==========================================
// 11. UNIFIED SEARCH ISLAM INDEX
// ==========================================

export interface SearchEntry {
  id: string;
  category: 'Quran' | 'Hadith' | 'Dua' | 'Prayer' | 'Ziyarat' | 'Scholar' | 'Knowledge' | 'Etiquette' | 'Hajj';
  title: string;
  subtitle: string;
  snippet: string;
  url: string;
  keywords: string[];
}

export const UNIFIED_SEARCH_INDEX: SearchEntry[] = [
  {
    id: 'search-1',
    category: 'Prayer',
    title: 'Salah Step-by-Step Prayer Method',
    subtitle: 'Complete guide to Takbeer, Ruku, Sujud, and Tashahhud',
    snippet: 'Learn how the Prophet ﷺ prayed with accurate postures, Arabic recitations, and translation.',
    url: '/guides#salah',
    keywords: ['prayer', 'salah', 'namaz', 'ruku', 'sujud', 'fatiha', 'tashahhud', 'steps', 'how to pray']
  },
  {
    id: 'search-2',
    category: 'Prayer',
    title: 'Wudu (Ablution) Complete Guide',
    subtitle: 'The 8 steps of sacred purification for Salah',
    snippet: 'Step-by-step instructions for washing hands, face, arms, head, and feet with Fard and Sunnah rules.',
    url: '/guides#wudu',
    keywords: ['wudu', 'ablution', 'cleanliness', 'taharah', 'wash', 'ghusl', 'purification']
  },
  {
    id: 'search-3',
    category: 'Prayer',
    title: 'Ghusl (Major Purification) Guide',
    subtitle: 'Fara\'id and Sunan of complete ritual bathing',
    snippet: 'How to perform Ghusl for Janabah, post-menstruation, or Friday Sunnah with classical fiqh details.',
    url: '/guides#ghusl',
    keywords: ['ghusl', 'bath', 'janabah', 'major purification', 'shower', 'fard']
  },
  {
    id: 'search-4',
    category: 'Hajj',
    title: 'Hajj & Umrah Pilgrimage Master Guide',
    subtitle: 'Ihram, Miqat, Tawaf, Sa\'i, Arafat, and Mina',
    snippet: 'Day-by-day complete roadmap for the pilgrimage to Makkah and Madinah with packing checklist and Duas.',
    url: '/hajj-umrah',
    keywords: ['hajj', 'umrah', 'makkah', 'kaaba', 'ihram', 'tawaf', 'sai', 'arafat', 'mina', 'muzdalifah', 'jamarat']
  },
  {
    id: 'search-5',
    category: 'Knowledge',
    title: 'Zakat Calculator & 2.5% Nisab Engine',
    subtitle: 'Calculate your obligatory Zakat on gold, silver, cash, and business assets',
    snippet: 'Accurate live formula calculation subtracting liabilities to determine your sacred Zakat dues.',
    url: '/zakat',
    keywords: ['zakat', 'calculator', 'nisab', 'gold', 'silver', 'charity', 'wealth', 'tax', 'sadaqah']
  },
  {
    id: 'search-6',
    category: 'Knowledge',
    title: 'Janazah & Bereavement Guide',
    subtitle: 'What to do when someone dies, funeral prayer, Kafan, and burial',
    snippet: 'Classical guidance on the 4 Takbeers of Janazah, shrouding, and condolences with verified Duas.',
    url: '/janazah',
    keywords: ['janazah', 'funeral', 'death', 'burial', 'kafan', 'grave', 'condolence', 'dua for dead', 'bereavement']
  },
  {
    id: 'search-7',
    category: 'Etiquette',
    title: 'Islamic Etiquette (Adab) Library',
    subtitle: 'Eating, sleeping, mosque, greeting, parents, business, and speech',
    snippet: 'Searchable treasury of prophetic manners and conduct for every aspect of daily life.',
    url: '/etiquette',
    keywords: ['adab', 'etiquette', 'manners', 'eating', 'sleeping', 'parents', 'neighbors', 'visiting', 'greeting', 'morals']
  },
  {
    id: 'search-8',
    category: 'Knowledge',
    title: 'Nikah & Family Life Hub',
    subtitle: 'The 5 pillars of Islamic marriage, rights, and pre-marital questions',
    snippet: 'Everything required to build a blessed, harmonious Islamic home on the sunnah of Rasulullah ﷺ.',
    url: '/nikah',
    keywords: ['nikah', 'marriage', 'wedding', 'spouse', 'husband', 'wife', 'mahr', 'wali', 'family', 'rights']
  },
  {
    id: 'search-9',
    category: 'Dua',
    title: 'Life Duas Collection (14 Life Categories)',
    subtitle: 'Supplications for Travel, Food, Work, Study, Children, Parents, and Rizq',
    snippet: 'Authentic Hisn al-Muslim supplications with Arabic, transliteration, English, and hadith citations.',
    url: '/duas',
    keywords: ['dua', 'duas', 'supplication', 'travel', 'food', 'rain', 'home', 'work', 'study', 'children', 'rizq']
  },
  {
    id: 'search-10',
    category: 'Ziyarat',
    title: 'Sacred Ziyarat & Dargahs Directory',
    subtitle: '35+ Scholarly verified holy shrines and monuments across 12 nations',
    snippet: 'GPS navigation, spiritual lineage, dress codes, historical chronicles, and visiting etiquette.',
    url: '/ziyarat',
    keywords: ['ziyarat', 'dargah', 'shrine', 'ajmer', 'nizamuddin', 'baghdad', 'rumi', 'grave', 'monument', 'saints']
  }
];
