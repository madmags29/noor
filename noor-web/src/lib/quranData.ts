// ============================================================
// NOOR Web — Quran Catalog, Surahs, Ayahs & Reciters
// ============================================================

export interface SurahItem {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: 'Meccan' | 'Medinan';
  juz: number;
}

export interface AyahItem {
  number: number;
  arabic: string;
  translation: string;
  transliteration?: string;
  audioUrl?: string;
}

export const SURAHS_LIST: SurahItem[] = [
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

export const AYAH_DATABANK: Record<number, AyahItem[]> = {
  1: [
    { number: 1, arabic: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ", transliteration: "Bismillahi-r-Rahmani-r-Rahim", translation: "In the name of Allah, the Entirely Merciful, the Especially Merciful." },
    { number: 2, arabic: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ", transliteration: "Al-hamdu lillahi Rabbi-l-'alamin", translation: "[All] praise is [due] to Allah, Lord of the worlds -" },
    { number: 3, arabic: "الرَّحْمَٰنِ الرَّحِيمِ", transliteration: "Ar-Rahmani-r-Rahim", translation: "The Entirely Merciful, the Especially Merciful," },
    { number: 4, arabic: "مَالِكِ يَوْمِ الدِّينِ", transliteration: "Maliki Yawmi-d-Din", translation: "Sovereign of the Day of Recompense." },
    { number: 5, arabic: "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ", transliteration: "Iyyaka na'budu wa iyyaka nasta'in", translation: "It is You we worship and You we ask for help." },
    { number: 6, arabic: "اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ", transliteration: "Ihdina-s-sirata-l-mustaqim", translation: "Guide us to the straight path -" },
    { number: 7, arabic: "صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ", transliteration: "Sirata-l-ladhina an'amta 'alayhim ghayri-l-maghdubi 'alayhim wa la-d-dallin", translation: "The path of those upon whom You have bestowed favor, not of those who have evoked [Your] anger or of those who are astray." }
  ],
  112: [
    { number: 1, arabic: "قُلْ هُوَ اللَّهُ أَحَدٌ", transliteration: "Qul Huwa-llahu Ahad", translation: "Say, 'He is Allah, [who is] One,'" },
    { number: 2, arabic: "اللَّهُ الصَّمَدُ", transliteration: "Allahu-s-Samad", translation: "Allah, the Eternal Refuge." },
    { number: 3, arabic: "لَمْ يَلِدْ وَلَمْ يُولَدْ", transliteration: "Lam yalid wa lam yulad", translation: "He neither begets nor is born," },
    { number: 4, arabic: "وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ", transliteration: "Wa lam yakul-lahu kufuwan ahad", translation: "Nor is there to Him any equivalent.'" }
  ],
  113: [
    { number: 1, arabic: "قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ", transliteration: "Qul a'udhu bi-Rabbi-l-falaq", translation: "Say, 'I seek refuge in the Lord of daybreak'" },
    { number: 2, arabic: "مِن شَرِّ مَا خَلَقَ", transliteration: "Min sharri ma khalaq", translation: "From the evil of that which He created" },
    { number: 3, arabic: "وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ", transliteration: "Wa min sharri ghasiqin idha waqab", translation: "And from the evil of darkness when it settles" },
    { number: 4, arabic: "وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ", transliteration: "Wa min sharri-n-naffathati fi-l-'uqad", translation: "And from the evil of the blowers in knots" },
    { number: 5, arabic: "وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ", transliteration: "Wa min sharri hasidin idha hasad", translation: "And from the evil of an envier when he envies.'" }
  ],
  114: [
    { number: 1, arabic: "قُلْ أَعُوذُ بِرَبِّ النَّاسِ", transliteration: "Qul a'udhu bi-Rabbi-n-nas", translation: "Say, 'I seek refuge in the Lord of mankind,'" },
    { number: 2, arabic: "مَلِكِ النَّاسِ", transliteration: "Maliki-n-nas", translation: "The Sovereign of mankind," },
    { number: 3, arabic: "إِلَٰهِ النَّاسِ", transliteration: "Ilahi-n-nas", translation: "The God of mankind," },
    { number: 4, arabic: "مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ", transliteration: "Min sharri-l-waswasi-l-khannas", translation: "From the evil of the retreating whisperer -" },
    { number: 5, arabic: "الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ", transliteration: "Al-ladhi yuwaswisu fi suduri-n-nas", translation: "Who whispers [evil] into the breasts of mankind -" },
    { number: 6, arabic: "مِنَ الْجِنَّةِ وَالنَّاسِ", transliteration: "Mina-l-jinnati wa-n-nas", translation: "From among the jinn and mankind.'" }
  ]
};

export const FEATURED_AYAH = {
  surahNumber: 2,
  ayahNumber: 255,
  surahName: "Al-Baqarah",
  arabicName: "البقرة",
  arabic: "اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ ۗ مَن ذَا الَّذِي يَشْفَعُ عِندَهُ إِلَّا بِإِذْنِهِ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۖ وَلَا يُحِيطُونَ بِشَيْءٍ مِّنْ عِلْمِهِ إِلَّا بِمَا شَاءَ ۚ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ ۖ وَلَا يَئُودُهُ حِفْظُهُمَا ۚ وَهُوَ الْعَلِيُّ الْعَظِيمُ",
  transliteration: "Allahu la ilaha illa Huwa, Al-Hayyul-Qayyum. La ta'khudhuhu sinatun wa la nawm. Lahu ma fis-samawati wa ma fil-ard. Man dhal-ladhi yashfa'u 'indahu illa bi-idhnih. Ya'lamu ma bayna aydihim wa ma khalfahum, wa la yuhituna bi-shay'im-min 'ilmihi illa bima sha'. Wasi'a kursiyyuhus-samawati wal-ard, wa la ya'uduhu hifzuhuma, wa Huwal-'Aliyyul-'Azeem.",
  translationEn: "Allah! There is no deity except Him, the Ever-Living, the Sustainer of all existence. Neither drowsiness overtakes Him nor sleep. To Him belongs whatever is in the heavens and whatever is on the earth. Who is it that can intercede with Him except by His permission? He knows what is before them and what will be after them, and they encompass not a thing of His knowledge except for what He wills. His Kursi extends over the heavens and the earth, and their preservation tires Him not. And He is the Most High, the Most Great.",
  translationUr: "اللہ، اس کے سوا کوئی عبادت کے لائق نہیں، وہ زندہ ہے سب کا تھامنے والا، نہ اس کو اونگھ آتی ہے نہ نیند، جو کچھ آسمانوں میں اور جو کچھ زمین میں ہے سب اسی کا ہے۔",
  translationHi: "अल्लाह! उसके सिवा कोई पूज्य नहीं, वह सदैव जीवित और सब का थामने वाला है। न उसे ऊंघ आती है और न नींद। जो कुछ आकाशों में है और जो कुछ धरती में है, सब उसी का है। कौन है जो उसकी अनुमति के बिना उसके समक्ष सिफारिश कर सके? वह जानता है जो कुछ उनके सामने है और जो उनके पीछे है, और वे उसके ज्ञान में से किसी चीज़ को अपने नियंत्रण में नहीं ले सकते सिवाय इसके जो वह चाहे। उसकी बादशाही (कुर्सी) आकाशों और धरती को घेरे हुए है, और उन दोनों की सुरक्षा उसे थकाती नहीं। वह सर्वोच्च, महान है।",
  reference: "Surah Al-Baqarah 2:255 (Ayat al-Kursi)",
  audioUrl: "https://server8.mp3quran.net/afs/002255.mp3"
};

export const RECITERS_LIST = [
  { id: 'alafasy', name: 'Mishary Rashid Alafasy', style: 'Hafs', country: 'Kuwait' },
  { id: 'abdulbasit', name: 'Abdul Basit Abdus Samad', style: 'Murattal', country: 'Egypt' },
  { id: 'sudais', name: 'Abdur-Rahman As-Sudais', style: 'Hafs', country: 'Saudi Arabia' },
  { id: 'ghamdi', name: 'Saad Al-Ghamdi', style: 'Hafs', country: 'Saudi Arabia' }
];
