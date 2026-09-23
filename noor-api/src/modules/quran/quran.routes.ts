// ============================================================
// NOOR API — Quran Module Routes
// ============================================================

import { Router, Request, Response } from 'express';

export const quranRouter = Router();

const SURAHS = [
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

const RECITERS = [
  { id: 'alafasy', name: 'Mishary Rashid Alafasy', style: 'Hafs', country: 'Kuwait', server: 'https://server8.mp3quran.net/afs/' },
  { id: 'abdulbasit', name: 'Abdul Basit Abdus Samad', style: 'Murattal', country: 'Egypt', server: 'https://server7.mp3quran.net/basit/' },
  { id: 'sudais', name: 'Abdur-Rahman As-Sudais', style: 'Hafs', country: 'Saudi Arabia', server: 'https://server11.mp3quran.net/sds/' },
  { id: 'ghamdi', name: 'Saad Al-Ghamdi', style: 'Hafs', country: 'Saudi Arabia', server: 'https://server7.mp3quran.net/ghamdi/' }
];

const AYAH_BANK: Record<number, Array<{ number: number; arabic: string; translation: string; audioUrl?: string }>> = {
  1: [
    { number: 1, arabic: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ", translation: "In the name of Allah, the Entirely Merciful, the Especially Merciful." },
    { number: 2, arabic: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ", translation: "[All] praise is [due] to Allah, Lord of the worlds -" },
    { number: 3, arabic: "الرَّحْمَٰنِ الرَّحِيمِ", translation: "The Entirely Merciful, the Especially Merciful," },
    { number: 4, arabic: "مَالِكِ يَوْمِ الدِّينِ", translation: "Sovereign of the Day of Recompense." },
    { number: 5, arabic: "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ", translation: "It is You we worship and You we ask for help." },
    { number: 6, arabic: "اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ", translation: "Guide us to the straight path -" },
    { number: 7, arabic: "صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ", translation: "The path of those upon whom You have bestowed favor, not of those who have evoked [Your] anger or of those who are astray." }
  ],
  112: [
    { number: 1, arabic: "قُلْ هُوَ اللَّهُ أَحَدٌ", translation: "Say, 'He is Allah, [who is] One,'" },
    { number: 2, arabic: "اللَّهُ الصَّمَدُ", translation: "Allah, the Eternal Refuge." },
    { number: 3, arabic: "لَمْ يَلِدْ وَلَمْ يُولَدْ", translation: "He neither begets nor is born," },
    { number: 4, arabic: "وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ", translation: "Nor is there to Him any equivalent." }
  ],
  113: [
    { number: 1, arabic: "قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ", translation: "Say, 'I seek refuge in the Lord of daybreak'" },
    { number: 2, arabic: "مِن شَرِّ مَا خَلَقَ", translation: "From the evil of that which He created" },
    { number: 3, arabic: "وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ", translation: "And from the evil of darkness when it settles" },
    { number: 4, arabic: "وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ", translation: "And from the evil of the blowers in knots" },
    { number: 5, arabic: "وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ", translation: "And from the evil of an envier when he envies." }
  ],
  114: [
    { number: 1, arabic: "قُلْ أَعُوذُ بِرَبِّ النَّاسِ", translation: "Say, 'I seek refuge in the Lord of mankind,'" },
    { number: 2, arabic: "مَلِكِ النَّاسِ", translation: "The Sovereign of mankind," },
    { number: 3, arabic: "إِلَٰهِ النَّاسِ", translation: "The God of mankind," },
    { number: 4, arabic: "مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ", translation: "From the evil of the retreating whisperer -" },
    { number: 5, arabic: "الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ", translation: "Who whispers [evil] into the breasts of mankind -" },
    { number: 6, arabic: "مِنَ الْجِنَّةِ وَالنَّاسِ", translation: "From among the jinn and mankind." }
  ]
};

/**
 * GET /api/v1/quran/surahs
 */
quranRouter.get('/surahs', (_req: Request, res: Response) => {
  res.json({
    success: true,
    data: SURAHS,
    total: SURAHS.length
  });
});

/**
 * GET /api/v1/quran/surahs/:id
 */
quranRouter.get('/surahs/:id', (req: Request, res: Response) => {
  const surahId = parseInt(req.params.id as string, 10);
  const surah = SURAHS.find(s => s.number === surahId);
  if (!surah) {
    res.status(404).json({ success: false, error: 'Surah not found' });
    return;
  }

  const ayahs = AYAH_BANK[surahId] || [
    { number: 1, arabic: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ", translation: "In the name of Allah, the Entirely Merciful, the Especially Merciful." }
  ];

  res.json({
    success: true,
    data: {
      ...surah,
      ayahs
    }
  });
});

/**
 * GET /api/v1/quran/verse-of-the-day
 */
quranRouter.get('/verse-of-the-day', (_req: Request, res: Response) => {
  res.json({
    success: true,
    data: {
      surahNumber: 2,
      ayahNumber: 255,
      surahName: "Al-Baqarah",
      arabicName: "البقرة",
      arabic: "اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ",
      transliteration: "Allahu la ilaha illa Huwa, Al-Hayyul-Qayyum. La ta'khudhuhu sinatuw-wa la nawm...",
      translationEn: "Allah! There is no deity except Him, the Ever-Living, the Sustainer of all existence. Neither drowsiness overtakes Him nor sleep.",
      reference: "Surah Al-Baqarah 2:255 (Ayat al-Kursi)"
    }
  });
});

/**
 * GET /api/v1/quran/reciters
 */
quranRouter.get('/reciters', (_req: Request, res: Response) => {
  res.json({
    success: true,
    data: RECITERS
  });
});
