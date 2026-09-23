// NOOR Quran Catalog & Verse Databank
export const SURAHS_LIST = [
  { number: 1, name: "الفاتحة", englishName: "Al-Fatihah", englishNameTranslation: "The Opening", numberOfAyahs: 7, revelationType: "Meccan", juz: 1 },
  { number: 2, name: "البقرة", englishName: "Al-Baqarah", englishNameTranslation: "The Cow", numberOfAyahs: 286, revelationType: "Medinan", juz: 1 },
  { number: 3, name: "آل عمران", englishName: "Ali 'Imran", englishNameTranslation: "Family of Imran", numberOfAyahs: 200, revelationType: "Medinan", juz: 3 },
  { number: 4, name: "النساء", englishName: "An-Nisa", englishNameTranslation: "The Women", numberOfAyahs: 176, revelationType: "Medinan", juz: 4 },
  { number: 5, name: "المائدة", englishName: "Al-Ma'idah", englishNameTranslation: "The Table Spread", numberOfAyahs: 120, revelationType: "Medinan", juz: 6 },
  { number: 18, name: "الكهف", englishName: "Al-Kahf", englishNameTranslation: "The Cave", numberOfAyahs: 110, revelationType: "Meccan", juz: 15 },
  { number: 36, name: "يس", englishName: "Ya-Sin", englishNameTranslation: "Ya-Sin", numberOfAyahs: 83, revelationType: "Meccan", juz: 22 },
  { number: 55, name: "الرحمن", englishName: "Ar-Rahman", englishNameTranslation: "The Beneficent", numberOfAyahs: 78, revelationType: "Medinan", juz: 27 },
  { number: 67, name: "الملك", englishName: "Al-Mulk", englishNameTranslation: "The Sovereignty", numberOfAyahs: 30, revelationType: "Meccan", juz: 29 },
  { number: 112, name: "الإخلاص", englishName: "Al-Ikhlas", englishNameTranslation: "The Sincerity", numberOfAyahs: 4, revelationType: "Meccan", juz: 30 },
  { number: 113, name: "الفلق", englishName: "Al-Falaq", englishNameTranslation: "The Daybreak", numberOfAyahs: 5, revelationType: "Meccan", juz: 30 },
  { number: 114, name: "الناس", englishName: "An-Nas", englishNameTranslation: "Mankind", numberOfAyahs: 6, revelationType: "Meccan", juz: 30 }
];

export const FEATURED_VERSES = [
  {
    surahNumber: 2,
    ayahNumber: 255,
    surahName: "Al-Baqarah",
    arabicName: "البقرة",
    arabic: "اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ",
    transliteration: "Allahu la ilaha illa Huwa, Al-Hayyul-Qayyum. La ta'khudhuhu sinatuw-wa la nawm...",
    translationEn: "Allah! There is no deity except Him, the Ever-Living, the Sustainer of all existence. Neither drowsiness overtakes Him nor sleep. To Him belongs whatever is in the heavens and whatever is on the earth.",
    translationUr: "اللہ، اس کے سوا کوئی عبادت کے لائق نہیں، وہ زندہ ہے سب کا تھامنے والا، نہ اس کو اونگھ آتی ہے نہ نیند...",
    reference: "Surah Al-Baqarah 2:255 (Ayat al-Kursi)",
    tafsir: "The Verse of the Throne (Ayat al-Kursi) carries great virtue. Ibn Kathir explains it illustrates the Absolute Sovereignty and eternal life of the Creator of the heavens and earth."
  },
  {
    surahNumber: 94,
    ayahNumber: 5,
    surahName: "Ash-Sharh",
    arabicName: "الشرح",
    arabic: "فَإِنَّ مَعَ الْعُسْرِ يُسْرًا ﴿٥﴾ إِنَّ مَعَ الْعُسْرِ يُسْرًا ﴿٦﴾",
    transliteration: "Fa inna ma'al 'usri yusra. Inna ma'al 'usri yusra.",
    translationEn: "For indeed, with hardship [will be] ease. Indeed, with hardship [will be] ease.",
    translationUr: "پس یقیناً مشکل کے ساتھ آسانی ہے۔ بے شک مشکل کے ساتھ ہی آسانی ہے۔",
    reference: "Surah Ash-Sharh 94:5-6",
    tafsir: "The repetition of ease alongside hardship gives believers comforting reassurance that no affliction endures without divine relief."
  },
  {
    surahNumber: 1,
    ayahNumber: 1,
    surahName: "Al-Fatihah",
    arabicName: "الفاتحة",
    ayahs: [
      { number: 1, arabic: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ", translation: "In the name of Allah, the Entirely Merciful, the Especially Merciful." },
      { number: 2, arabic: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ", translation: "[All] praise is [due] to Allah, Lord of the worlds -" },
      { number: 3, arabic: "الرَّحْمَٰنِ الرَّحِيمِ", translation: "The Entirely Merciful, the Especially Merciful," },
      { number: 4, arabic: "مَالِكِ يَوْمِ الدِّينِ", translation: "Sovereign of the Day of Recompense." },
      { number: 5, arabic: "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ", translation: "It is You we worship and You we ask for help." },
      { number: 6, arabic: "اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ", translation: "Guide us to the straight path -" },
      { number: 7, arabic: "صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ", translation: "The path of those upon whom You have bestowed favor, not of those who have evoked [Your] anger or of those who are astray." }
    ]
  },
  {
    surahNumber: 112,
    ayahNumber: 1,
    surahName: "Al-Ikhlas",
    arabicName: "الإخلاص",
    ayahs: [
      { number: 1, arabic: "قُلْ هُوَ اللَّهُ أَحَدٌ", translation: "Say, 'He is Allah, [who is] One,'" },
      { number: 2, arabic: "اللَّهُ الصَّمَدُ", translation: "Allah, the Eternal Refuge." },
      { number: 3, arabic: "لَمْ يَلِدْ وَلَمْ يُولَدْ", translation: "He neither begets nor is born," },
      { number: 4, arabic: "وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ", translation: "Nor is there to Him any equivalent." }
    ]
  }
];

export const RECITERS = [
  { id: 'alafasy', name: 'Mishary Rashid Alafasy', style: 'Hafs', country: 'Kuwait' },
  { id: 'abdulbasit', name: 'Abdul Basit Abdus Samad', style: 'Murattal', country: 'Egypt' },
  { id: 'sudais', name: 'Abdur-Rahman As-Sudais', style: 'Hafs', country: 'Saudi Arabia' },
  { id: 'ghamdi', name: 'Saad Al-Ghamdi', style: 'Hafs', country: 'Saudi Arabia' }
];
