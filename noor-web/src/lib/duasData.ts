// ============================================================
// NOOR Web — Duas & Adhkar Library
// ============================================================

export interface DuaItem {
  id: string;
  category: string;
  title: string;
  arabic: string;
  transliteration: string;
  translation: string;
  source: string;
  targetCount: number;
  virtue: string;
}

export const DUA_CATEGORIES = [
  { id: 'all', name: 'All Duas' },
  { id: 'morning', name: 'Morning Adhkar' },
  { id: 'evening', name: 'Evening Adhkar' },
  { id: 'sleep', name: 'Before Sleep' },
  { id: 'protection', name: 'Protection & Evil Eye' },
  { id: 'travel', name: 'Travel & Safar' },
  { id: 'rizq', name: 'Rizq & Debt Relief' },
  { id: 'hardship', name: 'Hardship & Relief' },
];

export const DUAS_LIST: DuaItem[] = [
  {
    id: 'dua-morning-1',
    category: 'morning',
    title: 'Morning Adhkar: Praise of Allah upon Waking',
    arabic: 'أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ',
    transliteration: "Asbahna wa-asbahal-mulku lillah, wal-hamdu lillah, la ilaha illallahu wahdahu la shareeka lah...",
    translation: 'We have entered the morning and the kingdom belongs to Allah, all praise is due to Allah. None has the right to be worshipped except Allah alone, without partner.',
    source: 'Sahih Muslim 2723, Hisn al-Muslim',
    targetCount: 1,
    virtue: 'Recited upon dawn for spiritual protection and mindfulness throughout the day.'
  },
  {
    id: 'dua-protection-1',
    category: 'protection',
    title: 'Dua against Harm (Recited 3 times)',
    arabic: 'بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ',
    transliteration: "Bismillahil-ladhi la yadurru ma'as-mihi shay'un fil-ardi wa la fis-sama'i wa Huwas-Sami'ul-'Alim.",
    translation: 'In the name of Allah, with whose name nothing on earth or in heaven can cause harm, and He is the All-Hearing, the All-Knowing.',
    source: 'Sunan Abi Dawud 5088, Jami` at-Tirmidhi 3388 (Sahih)',
    targetCount: 3,
    virtue: 'Whoever recites it thrice in the morning and evening will not be harmed by anything.'
  },
  {
    id: 'dua-hardship-1',
    category: 'hardship',
    title: 'Dua of Prophet Yunus (AS) in Distress',
    arabic: 'لَّا إِلَٰهَ إِلَّا أَنتَ سُبْحَانَكَ إِنِّي كُنتُ مِنَ الظَّالِمِينَ',
    transliteration: "La ilaha illa Anta, subhanaka inni kuntu minaz-zalimeen.",
    translation: 'There is no deity except You; exalted are You. Indeed, I have been of the wrongdoers.',
    source: 'Surah Al-Anbiya 21:87, Jami` at-Tirmidhi 3505',
    targetCount: 1,
    virtue: 'The Prophet ﷺ said no Muslim supplicates with this Dua during adversity except that Allah answers him.'
  },
  {
    id: 'dua-travel-1',
    category: 'travel',
    title: 'Dua for Riding a Vehicle & Setting Out on Travel',
    arabic: 'سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَٰذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ وَإِنَّا إِلَىٰ رَبِّنَا لَمُنقَلِبُونَ',
    transliteration: "Subhanal-ladhi sakh-khara lana hadha wa ma kunna lahu muqrinin, wa inna ila Rabbina lamunqalibun.",
    translation: 'Glory unto Him who has subjected this to us, and we could never have had it by our own efforts. And verily, unto our Lord we shall return.',
    source: 'Surah Az-Zukhruf 43:13-14, Sahih Muslim 1342',
    targetCount: 1,
    virtue: 'Guarantees serenity and divine guardianship during long journeys.'
  },
  {
    id: 'dua-rizq-1',
    category: 'rizq',
    title: 'Dua for Relief from Debt and Worry',
    arabic: 'اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ، وَأَعُوذُ بِكَ مِنَ الْعَجْزِ وَالْكَسَلِ، وَأَعُوذُ بِكَ مِنَ الْجُبْنِ وَالْبُخْلِ، وَأَعُوذُ بِكَ مِنْ غَلَبَةِ الدَّيْنِ وَقَهْرِ الرِّجَالِ',
    transliteration: "Allahumma inni a'udhu bika minal-hammi wal-hazan, wal-'ajzi wal-kasal, wal-jubni wal-bukhl, wa ghalabatid-dayni wa qahrir-rijal.",
    translation: 'O Allah, I seek refuge in You from anxiety and sorrow, from inability and laziness, from cowardice and stinginess, and from the burden of debt and subjugation by men.',
    source: 'Sahih al-Bukhari 2893',
    targetCount: 1,
    virtue: 'Taught by the Prophet ﷺ to alleviate heavy psychological distress and financial pressure.'
  },
  {
    id: 'dua-sleep-1',
    category: 'sleep',
    title: 'Before Sleeping: Seeking Rest in Allah’s Name',
    arabic: 'بِاسْمِكَ رَبِّي وَضَعْتُ جَنْبِي، وَبِكَ أَرْفَعُهُ، فَإِنْ أَمْسَكْتَ نَفْسِي فَارْحَمْهَا، وَإِنْ أَرْسَلْتَهَا فَاحْفَظْهَا بِمَا تَحْفَظُ بِهِ عِبَادَكَ الصَّالِحِينَ',
    transliteration: "Bismika Rabbi wada'tu janbi, wa bika arfa'uh, fa-in amsakta nafsi farhamha, wa in arsaltaha fahfazha bima tahfazu bihi 'ibadakas-salihin.",
    translation: 'In Your name my Lord, I lie down and in Your name I rise up. If You take my soul, have mercy upon it, and if You release it, protect it as You protect Your righteous slaves.',
    source: 'Sahih al-Bukhari 6320, Sahih Muslim 2714',
    targetCount: 1,
    virtue: 'Provides peaceful sleep under the direct protection of the angels.'
  }
];
