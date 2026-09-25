// ============================================================
// NOOR Web — Complete Noble Quran Catalog (All 114 Surahs)
// Full Ayahs, Reciters, Cloudflare Audio Engine & Multi-Lingual Editions
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
  translationUr?: string;
  translationHi?: string;
  transliteration?: string;
  audioUrl?: string;
}

export interface ReciterItem {
  id: string;
  name: string;
  style: string;
  country: string;
  serverUrl: string;
}

export const RECITERS_LIST: ReciterItem[] = [
  { id: 'alafasy', name: 'Mishary Rashid Alafasy', style: 'Hafs', country: 'Kuwait', serverUrl: 'https://server8.mp3quran.net/afs' },
  { id: 'abdulbasit', name: 'Abdul Basit Abdus Samad', style: 'Murattal', country: 'Egypt', serverUrl: 'https://server7.mp3quran.net/basit' },
  { id: 'sudais', name: 'Abdur-Rahman As-Sudais', style: 'Hafs', country: 'Saudi Arabia', serverUrl: 'https://server11.mp3quran.net/sds' },
  { id: 'ghamdi', name: 'Saad Al-Ghamdi', style: 'Hafs', country: 'Saudi Arabia', serverUrl: 'https://server7.mp3quran.net/s_gmd' }
];

export function getSurahAudioUrl(surahNumber: number, reciterId = 'alafasy'): string {
  const pad = String(surahNumber).padStart(3, '0');
  const reciter = RECITERS_LIST.find(r => r.id === reciterId) || RECITERS_LIST[0];
  return `${reciter.serverUrl}/${pad}.mp3`;
}

export function getAyahAudioUrl(surahNumber: number, ayahNumber: number): string {
  const s = String(surahNumber).padStart(3, '0');
  const a = String(ayahNumber).padStart(3, '0');
  return `https://everyayah.com/data/Alafasy_128kbps/${s}${a}.mp3`;
}

// Complete 114 Surahs of the Noble Quran
export const SURAHS_LIST: SurahItem[] = [
  {
    "number": 1,
    "name": "سُورَةُ ٱلْفَاتِحَةِ",
    "englishName": "Al-Faatiha",
    "englishNameTranslation": "The Opening",
    "numberOfAyahs": 7,
    "revelationType": "Meccan",
    "juz": 1
  },
  {
    "number": 2,
    "name": "سُورَةُ البَقَرَةِ",
    "englishName": "Al-Baqara",
    "englishNameTranslation": "The Cow",
    "numberOfAyahs": 286,
    "revelationType": "Medinan",
    "juz": 3
  },
  {
    "number": 3,
    "name": "سُورَةُ آلِ عِمۡرَانَ",
    "englishName": "Aal-i-Imraan",
    "englishNameTranslation": "The Family of Imraan",
    "numberOfAyahs": 200,
    "revelationType": "Medinan",
    "juz": 4
  },
  {
    "number": 4,
    "name": "سُورَةُ النِّسَاءِ",
    "englishName": "An-Nisaa",
    "englishNameTranslation": "The Women",
    "numberOfAyahs": 176,
    "revelationType": "Medinan",
    "juz": 6
  },
  {
    "number": 5,
    "name": "سُورَةُ المَائـِدَةِ",
    "englishName": "Al-Maaida",
    "englishNameTranslation": "The Table",
    "numberOfAyahs": 120,
    "revelationType": "Medinan",
    "juz": 7
  },
  {
    "number": 6,
    "name": "سُورَةُ الأَنۡعَامِ",
    "englishName": "Al-An'aam",
    "englishNameTranslation": "The Cattle",
    "numberOfAyahs": 165,
    "revelationType": "Meccan",
    "juz": 8
  },
  {
    "number": 7,
    "name": "سُورَةُ الأَعۡرَافِ",
    "englishName": "Al-A'raaf",
    "englishNameTranslation": "The Heights",
    "numberOfAyahs": 206,
    "revelationType": "Meccan",
    "juz": 9
  },
  {
    "number": 8,
    "name": "سُورَةُ الأَنفَالِ",
    "englishName": "Al-Anfaal",
    "englishNameTranslation": "The Spoils of War",
    "numberOfAyahs": 75,
    "revelationType": "Medinan",
    "juz": 10
  },
  {
    "number": 9,
    "name": "سُورَةُ التَّوۡبَةِ",
    "englishName": "At-Tawba",
    "englishNameTranslation": "The Repentance",
    "numberOfAyahs": 129,
    "revelationType": "Medinan",
    "juz": 11
  },
  {
    "number": 10,
    "name": "سُورَةُ يُونُسَ",
    "englishName": "Yunus",
    "englishNameTranslation": "Jonas",
    "numberOfAyahs": 109,
    "revelationType": "Meccan",
    "juz": 11
  },
  {
    "number": 11,
    "name": "سُورَةُ هُودٍ",
    "englishName": "Hud",
    "englishNameTranslation": "Hud",
    "numberOfAyahs": 123,
    "revelationType": "Meccan",
    "juz": 12
  },
  {
    "number": 12,
    "name": "سُورَةُ يُوسُفَ",
    "englishName": "Yusuf",
    "englishNameTranslation": "Joseph",
    "numberOfAyahs": 111,
    "revelationType": "Meccan",
    "juz": 13
  },
  {
    "number": 13,
    "name": "سُورَةُ الرَّعۡدِ",
    "englishName": "Ar-Ra'd",
    "englishNameTranslation": "The Thunder",
    "numberOfAyahs": 43,
    "revelationType": "Medinan",
    "juz": 13
  },
  {
    "number": 14,
    "name": "سُورَةُ إِبۡرَاهِيمَ",
    "englishName": "Ibrahim",
    "englishNameTranslation": "Abraham",
    "numberOfAyahs": 52,
    "revelationType": "Meccan",
    "juz": 13
  },
  {
    "number": 15,
    "name": "سُورَةُ الحِجۡرِ",
    "englishName": "Al-Hijr",
    "englishNameTranslation": "The Rock",
    "numberOfAyahs": 99,
    "revelationType": "Meccan",
    "juz": 14
  },
  {
    "number": 16,
    "name": "سُورَةُ النَّحۡلِ",
    "englishName": "An-Nahl",
    "englishNameTranslation": "The Bee",
    "numberOfAyahs": 128,
    "revelationType": "Meccan",
    "juz": 14
  },
  {
    "number": 17,
    "name": "سُورَةُ الإِسۡرَاءِ",
    "englishName": "Al-Israa",
    "englishNameTranslation": "The Night Journey",
    "numberOfAyahs": 111,
    "revelationType": "Meccan",
    "juz": 15
  },
  {
    "number": 18,
    "name": "سُورَةُ الكَهۡفِ",
    "englishName": "Al-Kahf",
    "englishNameTranslation": "The Cave",
    "numberOfAyahs": 110,
    "revelationType": "Meccan",
    "juz": 16
  },
  {
    "number": 19,
    "name": "سُورَةُ مَرۡيَمَ",
    "englishName": "Maryam",
    "englishNameTranslation": "Mary",
    "numberOfAyahs": 98,
    "revelationType": "Meccan",
    "juz": 16
  },
  {
    "number": 20,
    "name": "سُورَةُ طه",
    "englishName": "Taa-Haa",
    "englishNameTranslation": "Taa-Haa",
    "numberOfAyahs": 135,
    "revelationType": "Meccan",
    "juz": 16
  },
  {
    "number": 21,
    "name": "سُورَةُ الأَنبِيَاءِ",
    "englishName": "Al-Anbiyaa",
    "englishNameTranslation": "The Prophets",
    "numberOfAyahs": 112,
    "revelationType": "Meccan",
    "juz": 17
  },
  {
    "number": 22,
    "name": "سُورَةُ الحَجِّ",
    "englishName": "Al-Hajj",
    "englishNameTranslation": "The Pilgrimage",
    "numberOfAyahs": 78,
    "revelationType": "Medinan",
    "juz": 17
  },
  {
    "number": 23,
    "name": "سُورَةُ المُؤۡمِنُونَ",
    "englishName": "Al-Muminoon",
    "englishNameTranslation": "The Believers",
    "numberOfAyahs": 118,
    "revelationType": "Meccan",
    "juz": 18
  },
  {
    "number": 24,
    "name": "سُورَةُ النُّورِ",
    "englishName": "An-Noor",
    "englishNameTranslation": "The Light",
    "numberOfAyahs": 64,
    "revelationType": "Medinan",
    "juz": 18
  },
  {
    "number": 25,
    "name": "سُورَةُ الفُرۡقَانِ",
    "englishName": "Al-Furqaan",
    "englishNameTranslation": "The Criterion",
    "numberOfAyahs": 77,
    "revelationType": "Meccan",
    "juz": 19
  },
  {
    "number": 26,
    "name": "سُورَةُ الشُّعَرَاءِ",
    "englishName": "Ash-Shu'araa",
    "englishNameTranslation": "The Poets",
    "numberOfAyahs": 227,
    "revelationType": "Meccan",
    "juz": 19
  },
  {
    "number": 27,
    "name": "سُورَةُ النَّمۡلِ",
    "englishName": "An-Naml",
    "englishNameTranslation": "The Ant",
    "numberOfAyahs": 93,
    "revelationType": "Meccan",
    "juz": 20
  },
  {
    "number": 28,
    "name": "سُورَةُ القَصَصِ",
    "englishName": "Al-Qasas",
    "englishNameTranslation": "The Stories",
    "numberOfAyahs": 88,
    "revelationType": "Meccan",
    "juz": 20
  },
  {
    "number": 29,
    "name": "سُورَةُ العَنكَبُوتِ",
    "englishName": "Al-Ankaboot",
    "englishNameTranslation": "The Spider",
    "numberOfAyahs": 69,
    "revelationType": "Meccan",
    "juz": 21
  },
  {
    "number": 30,
    "name": "سُورَةُ الرُّومِ",
    "englishName": "Ar-Room",
    "englishNameTranslation": "The Romans",
    "numberOfAyahs": 60,
    "revelationType": "Meccan",
    "juz": 21
  },
  {
    "number": 31,
    "name": "سُورَةُ لُقۡمَانَ",
    "englishName": "Luqman",
    "englishNameTranslation": "Luqman",
    "numberOfAyahs": 34,
    "revelationType": "Meccan",
    "juz": 21
  },
  {
    "number": 32,
    "name": "سُورَةُ السَّجۡدَةِ",
    "englishName": "As-Sajda",
    "englishNameTranslation": "The Prostration",
    "numberOfAyahs": 30,
    "revelationType": "Meccan",
    "juz": 21
  },
  {
    "number": 33,
    "name": "سُورَةُ الأَحۡزَابِ",
    "englishName": "Al-Ahzaab",
    "englishNameTranslation": "The Clans",
    "numberOfAyahs": 73,
    "revelationType": "Medinan",
    "juz": 22
  },
  {
    "number": 34,
    "name": "سُورَةُ سَبَإٍ",
    "englishName": "Saba",
    "englishNameTranslation": "Sheba",
    "numberOfAyahs": 54,
    "revelationType": "Meccan",
    "juz": 22
  },
  {
    "number": 35,
    "name": "سُورَةُ فَاطِرٍ",
    "englishName": "Faatir",
    "englishNameTranslation": "The Originator",
    "numberOfAyahs": 45,
    "revelationType": "Meccan",
    "juz": 22
  },
  {
    "number": 36,
    "name": "سُورَةُ يسٓ",
    "englishName": "Yaseen",
    "englishNameTranslation": "Yaseen",
    "numberOfAyahs": 83,
    "revelationType": "Meccan",
    "juz": 23
  },
  {
    "number": 37,
    "name": "سُورَةُ الصَّافَّاتِ",
    "englishName": "As-Saaffaat",
    "englishNameTranslation": "Those drawn up in Ranks",
    "numberOfAyahs": 182,
    "revelationType": "Meccan",
    "juz": 23
  },
  {
    "number": 38,
    "name": "سُورَةُ صٓ",
    "englishName": "Saad",
    "englishNameTranslation": "The letter Saad",
    "numberOfAyahs": 88,
    "revelationType": "Meccan",
    "juz": 23
  },
  {
    "number": 39,
    "name": "سُورَةُ الزُّمَرِ",
    "englishName": "Az-Zumar",
    "englishNameTranslation": "The Groups",
    "numberOfAyahs": 75,
    "revelationType": "Meccan",
    "juz": 24
  },
  {
    "number": 40,
    "name": "سُورَةُ غَافِرٍ",
    "englishName": "Ghafir",
    "englishNameTranslation": "The Forgiver",
    "numberOfAyahs": 85,
    "revelationType": "Meccan",
    "juz": 24
  },
  {
    "number": 41,
    "name": "سُورَةُ فُصِّلَتۡ",
    "englishName": "Fussilat",
    "englishNameTranslation": "Explained in detail",
    "numberOfAyahs": 54,
    "revelationType": "Meccan",
    "juz": 25
  },
  {
    "number": 42,
    "name": "سُورَةُ الشُّورَىٰ",
    "englishName": "Ash-Shura",
    "englishNameTranslation": "Consultation",
    "numberOfAyahs": 53,
    "revelationType": "Meccan",
    "juz": 25
  },
  {
    "number": 43,
    "name": "سُورَةُ الزُّخۡرُفِ",
    "englishName": "Az-Zukhruf",
    "englishNameTranslation": "Ornaments of gold",
    "numberOfAyahs": 89,
    "revelationType": "Meccan",
    "juz": 25
  },
  {
    "number": 44,
    "name": "سُورَةُ الدُّخَانِ",
    "englishName": "Ad-Dukhaan",
    "englishNameTranslation": "The Smoke",
    "numberOfAyahs": 59,
    "revelationType": "Meccan",
    "juz": 25
  },
  {
    "number": 45,
    "name": "سُورَةُ الجَاثِيَةِ",
    "englishName": "Al-Jaathiya",
    "englishNameTranslation": "Crouching",
    "numberOfAyahs": 37,
    "revelationType": "Meccan",
    "juz": 25
  },
  {
    "number": 46,
    "name": "سُورَةُ الأَحۡقَافِ",
    "englishName": "Al-Ahqaf",
    "englishNameTranslation": "The Dunes",
    "numberOfAyahs": 35,
    "revelationType": "Meccan",
    "juz": 26
  },
  {
    "number": 47,
    "name": "سُورَةُ مُحَمَّدٍ",
    "englishName": "Muhammad",
    "englishNameTranslation": "Muhammad",
    "numberOfAyahs": 38,
    "revelationType": "Medinan",
    "juz": 26
  },
  {
    "number": 48,
    "name": "سُورَةُ الفَتۡحِ",
    "englishName": "Al-Fath",
    "englishNameTranslation": "The Victory",
    "numberOfAyahs": 29,
    "revelationType": "Medinan",
    "juz": 26
  },
  {
    "number": 49,
    "name": "سُورَةُ الحُجُرَاتِ",
    "englishName": "Al-Hujuraat",
    "englishNameTranslation": "The Inner Apartments",
    "numberOfAyahs": 18,
    "revelationType": "Medinan",
    "juz": 26
  },
  {
    "number": 50,
    "name": "سُورَةُ قٓ",
    "englishName": "Qaaf",
    "englishNameTranslation": "The letter Qaaf",
    "numberOfAyahs": 45,
    "revelationType": "Meccan",
    "juz": 26
  },
  {
    "number": 51,
    "name": "سُورَةُ الذَّارِيَاتِ",
    "englishName": "Adh-Dhaariyat",
    "englishNameTranslation": "The Winnowing Winds",
    "numberOfAyahs": 60,
    "revelationType": "Meccan",
    "juz": 27
  },
  {
    "number": 52,
    "name": "سُورَةُ الطُّورِ",
    "englishName": "At-Tur",
    "englishNameTranslation": "The Mount",
    "numberOfAyahs": 49,
    "revelationType": "Meccan",
    "juz": 27
  },
  {
    "number": 53,
    "name": "سُورَةُ النَّجۡمِ",
    "englishName": "An-Najm",
    "englishNameTranslation": "The Star",
    "numberOfAyahs": 62,
    "revelationType": "Meccan",
    "juz": 27
  },
  {
    "number": 54,
    "name": "سُورَةُ القَمَرِ",
    "englishName": "Al-Qamar",
    "englishNameTranslation": "The Moon",
    "numberOfAyahs": 55,
    "revelationType": "Meccan",
    "juz": 27
  },
  {
    "number": 55,
    "name": "سُورَةُ الرَّحۡمَٰن",
    "englishName": "Ar-Rahmaan",
    "englishNameTranslation": "The Beneficent",
    "numberOfAyahs": 78,
    "revelationType": "Medinan",
    "juz": 27
  },
  {
    "number": 56,
    "name": "سُورَةُ الوَاقِعَةِ",
    "englishName": "Al-Waaqia",
    "englishNameTranslation": "The Inevitable",
    "numberOfAyahs": 96,
    "revelationType": "Meccan",
    "juz": 27
  },
  {
    "number": 57,
    "name": "سُورَةُ الحَدِيدِ",
    "englishName": "Al-Hadid",
    "englishNameTranslation": "The Iron",
    "numberOfAyahs": 29,
    "revelationType": "Medinan",
    "juz": 27
  },
  {
    "number": 58,
    "name": "سُورَةُ المُجَادلَةِ",
    "englishName": "Al-Mujaadila",
    "englishNameTranslation": "The Pleading Woman",
    "numberOfAyahs": 22,
    "revelationType": "Medinan",
    "juz": 28
  },
  {
    "number": 59,
    "name": "سُورَةُ الحَشۡرِ",
    "englishName": "Al-Hashr",
    "englishNameTranslation": "The Exile",
    "numberOfAyahs": 24,
    "revelationType": "Medinan",
    "juz": 28
  },
  {
    "number": 60,
    "name": "سُورَةُ المُمۡتَحنَةِ",
    "englishName": "Al-Mumtahana",
    "englishNameTranslation": "She that is to be examined",
    "numberOfAyahs": 13,
    "revelationType": "Medinan",
    "juz": 28
  },
  {
    "number": 61,
    "name": "سُورَةُ الصَّفِّ",
    "englishName": "As-Saff",
    "englishNameTranslation": "The Ranks",
    "numberOfAyahs": 14,
    "revelationType": "Medinan",
    "juz": 28
  },
  {
    "number": 62,
    "name": "سُورَةُ الجُمُعَةِ",
    "englishName": "Al-Jumu'a",
    "englishNameTranslation": "Friday",
    "numberOfAyahs": 11,
    "revelationType": "Medinan",
    "juz": 28
  },
  {
    "number": 63,
    "name": "سُورَةُ المُنَافِقُونَ",
    "englishName": "Al-Munaafiqoon",
    "englishNameTranslation": "The Hypocrites",
    "numberOfAyahs": 11,
    "revelationType": "Medinan",
    "juz": 28
  },
  {
    "number": 64,
    "name": "سُورَةُ التَّغَابُنِ",
    "englishName": "At-Taghaabun",
    "englishNameTranslation": "Mutual Disillusion",
    "numberOfAyahs": 18,
    "revelationType": "Medinan",
    "juz": 28
  },
  {
    "number": 65,
    "name": "سُورَةُ الطَّلَاقِ",
    "englishName": "At-Talaaq",
    "englishNameTranslation": "Divorce",
    "numberOfAyahs": 12,
    "revelationType": "Medinan",
    "juz": 28
  },
  {
    "number": 66,
    "name": "سُورَةُ التَّحۡرِيمِ",
    "englishName": "At-Tahrim",
    "englishNameTranslation": "The Prohibition",
    "numberOfAyahs": 12,
    "revelationType": "Medinan",
    "juz": 28
  },
  {
    "number": 67,
    "name": "سُورَةُ المُلۡكِ",
    "englishName": "Al-Mulk",
    "englishNameTranslation": "The Sovereignty",
    "numberOfAyahs": 30,
    "revelationType": "Meccan",
    "juz": 29
  },
  {
    "number": 68,
    "name": "سُورَةُ القَلَمِ",
    "englishName": "Al-Qalam",
    "englishNameTranslation": "The Pen",
    "numberOfAyahs": 52,
    "revelationType": "Meccan",
    "juz": 29
  },
  {
    "number": 69,
    "name": "سُورَةُ الحَاقَّةِ",
    "englishName": "Al-Haaqqa",
    "englishNameTranslation": "The Reality",
    "numberOfAyahs": 52,
    "revelationType": "Meccan",
    "juz": 29
  },
  {
    "number": 70,
    "name": "سُورَةُ المَعَارِجِ",
    "englishName": "Al-Ma'aarij",
    "englishNameTranslation": "The Ascending Stairways",
    "numberOfAyahs": 44,
    "revelationType": "Meccan",
    "juz": 29
  },
  {
    "number": 71,
    "name": "سُورَةُ نُوحٍ",
    "englishName": "Nooh",
    "englishNameTranslation": "Noah",
    "numberOfAyahs": 28,
    "revelationType": "Meccan",
    "juz": 29
  },
  {
    "number": 72,
    "name": "سُورَةُ الجِنِّ",
    "englishName": "Al-Jinn",
    "englishNameTranslation": "The Jinn",
    "numberOfAyahs": 28,
    "revelationType": "Meccan",
    "juz": 29
  },
  {
    "number": 73,
    "name": "سُورَةُ المُزَّمِّلِ",
    "englishName": "Al-Muzzammil",
    "englishNameTranslation": "The Enshrouded One",
    "numberOfAyahs": 20,
    "revelationType": "Meccan",
    "juz": 29
  },
  {
    "number": 74,
    "name": "سُورَةُ المُدَّثِّرِ",
    "englishName": "Al-Muddaththir",
    "englishNameTranslation": "The Cloaked One",
    "numberOfAyahs": 56,
    "revelationType": "Meccan",
    "juz": 29
  },
  {
    "number": 75,
    "name": "سُورَةُ القِيَامَةِ",
    "englishName": "Al-Qiyaama",
    "englishNameTranslation": "The Resurrection",
    "numberOfAyahs": 40,
    "revelationType": "Meccan",
    "juz": 29
  },
  {
    "number": 76,
    "name": "سُورَةُ الإِنسَانِ",
    "englishName": "Al-Insaan",
    "englishNameTranslation": "Man",
    "numberOfAyahs": 31,
    "revelationType": "Medinan",
    "juz": 29
  },
  {
    "number": 77,
    "name": "سُورَةُ المُرۡسَلَاتِ",
    "englishName": "Al-Mursalaat",
    "englishNameTranslation": "The Emissaries",
    "numberOfAyahs": 50,
    "revelationType": "Meccan",
    "juz": 29
  },
  {
    "number": 78,
    "name": "سُورَةُ النَّبَإِ",
    "englishName": "An-Naba",
    "englishNameTranslation": "The Announcement",
    "numberOfAyahs": 40,
    "revelationType": "Meccan",
    "juz": 30
  },
  {
    "number": 79,
    "name": "سُورَةُ النَّازِعَاتِ",
    "englishName": "An-Naazi'aat",
    "englishNameTranslation": "Those who drag forth",
    "numberOfAyahs": 46,
    "revelationType": "Meccan",
    "juz": 30
  },
  {
    "number": 80,
    "name": "سُورَةُ عَبَسَ",
    "englishName": "Abasa",
    "englishNameTranslation": "He frowned",
    "numberOfAyahs": 42,
    "revelationType": "Meccan",
    "juz": 30
  },
  {
    "number": 81,
    "name": "سُورَةُ التَّكۡوِيرِ",
    "englishName": "At-Takwir",
    "englishNameTranslation": "The Overthrowing",
    "numberOfAyahs": 29,
    "revelationType": "Meccan",
    "juz": 30
  },
  {
    "number": 82,
    "name": "سُورَةُ الانفِطَارِ",
    "englishName": "Al-Infitaar",
    "englishNameTranslation": "The Cleaving",
    "numberOfAyahs": 19,
    "revelationType": "Meccan",
    "juz": 30
  },
  {
    "number": 83,
    "name": "سُورَةُ المُطَفِّفِينَ",
    "englishName": "Al-Mutaffifin",
    "englishNameTranslation": "Defrauding",
    "numberOfAyahs": 36,
    "revelationType": "Meccan",
    "juz": 30
  },
  {
    "number": 84,
    "name": "سُورَةُ الانشِقَاقِ",
    "englishName": "Al-Inshiqaaq",
    "englishNameTranslation": "The Splitting Open",
    "numberOfAyahs": 25,
    "revelationType": "Meccan",
    "juz": 30
  },
  {
    "number": 85,
    "name": "سُورَةُ البُرُوجِ",
    "englishName": "Al-Burooj",
    "englishNameTranslation": "The Constellations",
    "numberOfAyahs": 22,
    "revelationType": "Meccan",
    "juz": 30
  },
  {
    "number": 86,
    "name": "سُورَةُ الطَّارِقِ",
    "englishName": "At-Taariq",
    "englishNameTranslation": "The Morning Star",
    "numberOfAyahs": 17,
    "revelationType": "Meccan",
    "juz": 30
  },
  {
    "number": 87,
    "name": "سُورَةُ الأَعۡلَىٰ",
    "englishName": "Al-A'laa",
    "englishNameTranslation": "The Most High",
    "numberOfAyahs": 19,
    "revelationType": "Meccan",
    "juz": 30
  },
  {
    "number": 88,
    "name": "سُورَةُ الغَاشِيَةِ",
    "englishName": "Al-Ghaashiya",
    "englishNameTranslation": "The Overwhelming",
    "numberOfAyahs": 26,
    "revelationType": "Meccan",
    "juz": 30
  },
  {
    "number": 89,
    "name": "سُورَةُ الفَجۡرِ",
    "englishName": "Al-Fajr",
    "englishNameTranslation": "The Dawn",
    "numberOfAyahs": 30,
    "revelationType": "Meccan",
    "juz": 30
  },
  {
    "number": 90,
    "name": "سُورَةُ البَلَدِ",
    "englishName": "Al-Balad",
    "englishNameTranslation": "The City",
    "numberOfAyahs": 20,
    "revelationType": "Meccan",
    "juz": 30
  },
  {
    "number": 91,
    "name": "سُورَةُ الشَّمۡسِ",
    "englishName": "Ash-Shams",
    "englishNameTranslation": "The Sun",
    "numberOfAyahs": 15,
    "revelationType": "Meccan",
    "juz": 30
  },
  {
    "number": 92,
    "name": "سُورَةُ اللَّيۡلِ",
    "englishName": "Al-Lail",
    "englishNameTranslation": "The Night",
    "numberOfAyahs": 21,
    "revelationType": "Meccan",
    "juz": 30
  },
  {
    "number": 93,
    "name": "سُورَةُ الضُّحَىٰ",
    "englishName": "Ad-Dhuhaa",
    "englishNameTranslation": "The Morning Hours",
    "numberOfAyahs": 11,
    "revelationType": "Meccan",
    "juz": 30
  },
  {
    "number": 94,
    "name": "سُورَةُ الشَّرۡحِ",
    "englishName": "Ash-Sharh",
    "englishNameTranslation": "The Consolation",
    "numberOfAyahs": 8,
    "revelationType": "Meccan",
    "juz": 30
  },
  {
    "number": 95,
    "name": "سُورَةُ التِّينِ",
    "englishName": "At-Tin",
    "englishNameTranslation": "The Fig",
    "numberOfAyahs": 8,
    "revelationType": "Meccan",
    "juz": 30
  },
  {
    "number": 96,
    "name": "سُورَةُ العَلَقِ",
    "englishName": "Al-Alaq",
    "englishNameTranslation": "The Clot",
    "numberOfAyahs": 19,
    "revelationType": "Meccan",
    "juz": 30
  },
  {
    "number": 97,
    "name": "سُورَةُ القَدۡرِ",
    "englishName": "Al-Qadr",
    "englishNameTranslation": "The Power, Fate",
    "numberOfAyahs": 5,
    "revelationType": "Meccan",
    "juz": 30
  },
  {
    "number": 98,
    "name": "سُورَةُ البَيِّنَةِ",
    "englishName": "Al-Bayyina",
    "englishNameTranslation": "The Evidence",
    "numberOfAyahs": 8,
    "revelationType": "Medinan",
    "juz": 30
  },
  {
    "number": 99,
    "name": "سُورَةُ الزَّلۡزَلَةِ",
    "englishName": "Az-Zalzala",
    "englishNameTranslation": "The Earthquake",
    "numberOfAyahs": 8,
    "revelationType": "Medinan",
    "juz": 30
  },
  {
    "number": 100,
    "name": "سُورَةُ العَادِيَاتِ",
    "englishName": "Al-Aadiyaat",
    "englishNameTranslation": "The Chargers",
    "numberOfAyahs": 11,
    "revelationType": "Meccan",
    "juz": 30
  },
  {
    "number": 101,
    "name": "سُورَةُ القَارِعَةِ",
    "englishName": "Al-Qaari'a",
    "englishNameTranslation": "The Calamity",
    "numberOfAyahs": 11,
    "revelationType": "Meccan",
    "juz": 30
  },
  {
    "number": 102,
    "name": "سُورَةُ التَّكَاثُرِ",
    "englishName": "At-Takaathur",
    "englishNameTranslation": "Competition",
    "numberOfAyahs": 8,
    "revelationType": "Meccan",
    "juz": 30
  },
  {
    "number": 103,
    "name": "سُورَةُ العَصۡرِ",
    "englishName": "Al-Asr",
    "englishNameTranslation": "The Declining Day, Epoch",
    "numberOfAyahs": 3,
    "revelationType": "Meccan",
    "juz": 30
  },
  {
    "number": 104,
    "name": "سُورَةُ الهُمَزَةِ",
    "englishName": "Al-Humaza",
    "englishNameTranslation": "The Traducer",
    "numberOfAyahs": 9,
    "revelationType": "Meccan",
    "juz": 30
  },
  {
    "number": 105,
    "name": "سُورَةُ الفِيلِ",
    "englishName": "Al-Fil",
    "englishNameTranslation": "The Elephant",
    "numberOfAyahs": 5,
    "revelationType": "Meccan",
    "juz": 30
  },
  {
    "number": 106,
    "name": "سُورَةُ قُرَيۡشٍ",
    "englishName": "Quraish",
    "englishNameTranslation": "Quraysh",
    "numberOfAyahs": 4,
    "revelationType": "Meccan",
    "juz": 30
  },
  {
    "number": 107,
    "name": "سُورَةُ المَاعُونِ",
    "englishName": "Al-Maa'un",
    "englishNameTranslation": "Almsgiving",
    "numberOfAyahs": 7,
    "revelationType": "Meccan",
    "juz": 30
  },
  {
    "number": 108,
    "name": "سُورَةُ الكَوۡثَرِ",
    "englishName": "Al-Kawthar",
    "englishNameTranslation": "Abundance",
    "numberOfAyahs": 3,
    "revelationType": "Meccan",
    "juz": 30
  },
  {
    "number": 109,
    "name": "سُورَةُ الكَافِرُونَ",
    "englishName": "Al-Kaafiroon",
    "englishNameTranslation": "The Disbelievers",
    "numberOfAyahs": 6,
    "revelationType": "Meccan",
    "juz": 30
  },
  {
    "number": 110,
    "name": "سُورَةُ النَّصۡرِ",
    "englishName": "An-Nasr",
    "englishNameTranslation": "Divine Support",
    "numberOfAyahs": 3,
    "revelationType": "Medinan",
    "juz": 30
  },
  {
    "number": 111,
    "name": "سُورَةُ المَسَدِ",
    "englishName": "Al-Masad",
    "englishNameTranslation": "The Palm Fibre",
    "numberOfAyahs": 5,
    "revelationType": "Meccan",
    "juz": 30
  },
  {
    "number": 112,
    "name": "سُورَةُ الإِخۡلَاصِ",
    "englishName": "Al-Ikhlaas",
    "englishNameTranslation": "Sincerity",
    "numberOfAyahs": 4,
    "revelationType": "Meccan",
    "juz": 30
  },
  {
    "number": 113,
    "name": "سُورَةُ الفَلَقِ",
    "englishName": "Al-Falaq",
    "englishNameTranslation": "The Dawn",
    "numberOfAyahs": 5,
    "revelationType": "Meccan",
    "juz": 30
  },
  {
    "number": 114,
    "name": "سُورَةُ النَّاسِ",
    "englishName": "An-Naas",
    "englishNameTranslation": "Mankind",
    "numberOfAyahs": 6,
    "revelationType": "Meccan",
    "juz": 30
  }
];

// Embedded High-Speed Offline Databank for Key & Frequently Recited Surahs
export const AYAH_DATABANK: Record<number, AyahItem[]> = {
  "1": [
    {
      "number": 1,
      "arabic": "﻿بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ",
      "translation": "In the name of Allah, the Entirely Merciful, the Especially Merciful.",
      "translationUr": "شروع الله کا نام لے کر جو بڑا مہربان نہایت رحم والا ہے",
      "translationHi": "अल्लाह के नाम से जो बड़ा कृपालु और अत्यन्त दयावान हैं।"
    },
    {
      "number": 2,
      "arabic": "ٱلْحَمْدُ لِلَّهِ رَبِّ ٱلْعَٰلَمِينَ",
      "translation": "[All] praise is [due] to Allah, Lord of the worlds -",
      "translationUr": "سب طرح کی تعریف خدا ہی کو (سزاوار) ہے جو تمام مخلوقات کا پروردگار ہے",
      "translationHi": "प्रशंसा अल्लाह ही के लिए हैं जो सारे संसार का रब हैं"
    },
    {
      "number": 3,
      "arabic": "ٱلرَّحْمَٰنِ ٱلرَّحِيمِ",
      "translation": "The Entirely Merciful, the Especially Merciful,",
      "translationUr": "بڑا مہربان نہایت رحم والا",
      "translationHi": "बड़ा कृपालु, अत्यन्त दयावान हैं"
    },
    {
      "number": 4,
      "arabic": "مَٰلِكِ يَوْمِ ٱلدِّينِ",
      "translation": "Sovereign of the Day of Recompense.",
      "translationUr": "انصاف کے دن کا حاکم",
      "translationHi": "बदला दिए जाने के दिन का मालिक हैं"
    },
    {
      "number": 5,
      "arabic": "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ",
      "translation": "It is You we worship and You we ask for help.",
      "translationUr": "(اے پروردگار) ہم تیری ہی عبادت کرتے ہیں اور تجھ ہی سے مدد مانگتے ہیں",
      "translationHi": "हम तेरी बन्दगी करते हैं और तुझी से मदद माँगते हैं"
    },
    {
      "number": 6,
      "arabic": "ٱهْدِنَا ٱلصِّرَٰطَ ٱلْمُسْتَقِيمَ",
      "translation": "Guide us to the straight path -",
      "translationUr": "ہم کو سیدھے رستے چلا",
      "translationHi": "हमें सीधे मार्ग पर चला"
    },
    {
      "number": 7,
      "arabic": "صِرَٰطَ ٱلَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ ٱلْمَغْضُوبِ عَلَيْهِمْ وَلَا ٱلضَّآلِّينَ",
      "translation": "The path of those upon whom You have bestowed favor, not of those who have evoked [Your] anger or of those who are astray.",
      "translationUr": "ان لوگوں کے رستے جن پر تو اپنا فضل وکرم کرتا رہا نہ ان کے جن پر غصے ہوتا رہا اور نہ گمراہوں کے",
      "translationHi": "उन लोगों के मार्ग पर जो तेरे कृपापात्र हुए, जो न प्रकोप के भागी हुए और न पथभ्रष्ट"
    }
  ],
  "36": [
    {
      "number": 1,
      "arabic": "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ يسٓ",
      "translation": "Ya, Seen.",
      "translationUr": "یٰسٓ",
      "translationHi": "या॰ सीन॰"
    },
    {
      "number": 2,
      "arabic": "وَٱلْقُرْءَانِ ٱلْحَكِيمِ",
      "translation": "By the wise Qur'an.",
      "translationUr": "قسم ہے قرآن کی جو حکمت سے بھرا ہوا ہے",
      "translationHi": "गवाह है हिकमतवाला क़ुरआन"
    },
    {
      "number": 3,
      "arabic": "إِنَّكَ لَمِنَ ٱلْمُرْسَلِينَ",
      "translation": "Indeed you, [O Muhammad], are from among the messengers,",
      "translationUr": "اے محمدﷺ) بےشک تم پیغمبروں میں سے ہو",
      "translationHi": "- कि तुम निश्चय ही रसूलों में से हो"
    },
    {
      "number": 4,
      "arabic": "عَلَىٰ صِرَٰطٍۢ مُّسْتَقِيمٍۢ",
      "translation": "On a straight path.",
      "translationUr": "سیدھے رستے پر",
      "translationHi": "एक सीधे मार्ग पर"
    },
    {
      "number": 5,
      "arabic": "تَنزِيلَ ٱلْعَزِيزِ ٱلرَّحِيمِ",
      "translation": "[This is] a revelation of the Exalted in Might, the Merciful,",
      "translationUr": "یہ خدائے) غالب (اور) مہربان نے نازل کیا ہے",
      "translationHi": "- क्या ही ख़ूब है, प्रभुत्वशाली, अत्यन्त दयावाल का इसको अवतरित करना!"
    },
    {
      "number": 6,
      "arabic": "لِتُنذِرَ قَوْمًۭا مَّآ أُنذِرَ ءَابَآؤُهُمْ فَهُمْ غَٰفِلُونَ",
      "translation": "That you may warn a people whose forefathers were not warned, so they are unaware.",
      "translationUr": "تاکہ تم ان لوگوں کو جن کے باپ دادا کو متنبہ نہیں کیا گیا تھا متنبہ کردو وہ غفلت میں پڑے ہوئے ہیں",
      "translationHi": "ताकि तुम ऐसे लोगों को सावधान करो, जिनके बाप-दादा को सावधान नहीं किया गया; इस कारण वे गफ़लत में पड़े हुए है"
    },
    {
      "number": 7,
      "arabic": "لَقَدْ حَقَّ ٱلْقَوْلُ عَلَىٰٓ أَكْثَرِهِمْ فَهُمْ لَا يُؤْمِنُونَ",
      "translation": "Already the word has come into effect upon most of them, so they do not believe.",
      "translationUr": "ان میں سے اکثر پر (خدا کی) بات پوری ہوچکی ہے سو وہ ایمان نہیں لائیں گے",
      "translationHi": "उनमें से अधिकतर लोगों पर बात सत्यापित हो चुकी है। अतः वे ईमान नहीं लाएँगे।"
    },
    {
      "number": 8,
      "arabic": "إِنَّا جَعَلْنَا فِىٓ أَعْنَٰقِهِمْ أَغْلَٰلًۭا فَهِىَ إِلَى ٱلْأَذْقَانِ فَهُم مُّقْمَحُونَ",
      "translation": "Indeed, We have put shackles on their necks, and they are to their chins, so they are with heads [kept] aloft.",
      "translationUr": "ہم نے ان کی گردنوں میں طوق ڈال رکھے ہیں اور وہ ٹھوڑیوں تک (پھنسے ہوئے ہیں) تو ان کے سر اُلل رہے ہیں",
      "translationHi": "हमने उनकी गर्दनों में तौक़ डाल दिए है जो उनकी ठोड़ियों से लगे है। अतः उनके सिर ऊपर को उचके हुए है"
    },
    {
      "number": 9,
      "arabic": "وَجَعَلْنَا مِنۢ بَيْنِ أَيْدِيهِمْ سَدًّۭا وَمِنْ خَلْفِهِمْ سَدًّۭا فَأَغْشَيْنَٰهُمْ فَهُمْ لَا يُبْصِرُونَ",
      "translation": "And We have put before them a barrier and behind them a barrier and covered them, so they do not see.",
      "translationUr": "اور ہم نے ان کے آگے بھی دیوار بنا دی اور ان کے پیچھے بھی۔ پھر ان پر پردہ ڈال دیا تو یہ دیکھ نہیں سکتے",
      "translationHi": "और हमने उनके आगे एक दीवार खड़ी कर दी है और एक दीवार उनके पीछे भी। इस तरह हमने उन्हें ढाँक दिया है। अतः उन्हें कुछ सुझाई नहीं देता"
    },
    {
      "number": 10,
      "arabic": "وَسَوَآءٌ عَلَيْهِمْ ءَأَنذَرْتَهُمْ أَمْ لَمْ تُنذِرْهُمْ لَا يُؤْمِنُونَ",
      "translation": "And it is all the same for them whether you warn them or do not warn them - they will not believe.",
      "translationUr": "اور تم ان کو نصیحت کرو یا نہ کرو ان کے لئے برابر ہے وہ ایمان نہیں لانے کے",
      "translationHi": "उनके लिए बराबर है तुमने सचेत किया या उन्हें सचेत नहीं किया, वे ईमान नहीं लाएँगे"
    },
    {
      "number": 11,
      "arabic": "إِنَّمَا تُنذِرُ مَنِ ٱتَّبَعَ ٱلذِّكْرَ وَخَشِىَ ٱلرَّحْمَٰنَ بِٱلْغَيْبِ ۖ فَبَشِّرْهُ بِمَغْفِرَةٍۢ وَأَجْرٍۢ كَرِيمٍ",
      "translation": "You can only warn one who follows the message and fears the Most Merciful unseen. So give him good tidings of forgiveness and noble reward.",
      "translationUr": "تم تو صرف اس شخص کو نصیحت کرسکتے ہو جو نصیحت کی پیروی کرے اور خدا سے غائبانہ ڈرے سو اس کو مغفرت اور بڑے ثواب کی بشارت سنا دو",
      "translationHi": "तुम तो बस सावधान कर रहे हो। जो कोई अनुस्मृति का अनुसरण करे और परोक्ष में रहते हुए रहमान से डरे, अतः क्षमा और प्रतिष्ठामय बदले की शुभ सूचना दे दो"
    },
    {
      "number": 12,
      "arabic": "إِنَّا نَحْنُ نُحْىِ ٱلْمَوْتَىٰ وَنَكْتُبُ مَا قَدَّمُوا۟ وَءَاثَٰرَهُمْ ۚ وَكُلَّ شَىْءٍ أَحْصَيْنَٰهُ فِىٓ إِمَامٍۢ مُّبِينٍۢ",
      "translation": "Indeed, it is We who bring the dead to life and record what they have put forth and what they left behind, and all things We have enumerated in a clear register.",
      "translationUr": "بےشک ہم مردوں کو زندہ کریں گے اور جو کچھ وہ آگے بھیج چکے اور (جو) ان کے نشان پیچھے رہ گئے ہم ان کو قلمبند کرلیتے ہیں۔ اور ہر چیز کو ہم نے کتاب روشن (یعنی لوح محفوظ) میں لکھ رکھا ہے۔",
      "translationHi": "निस्संदेह हम मुर्दों को जीवित करेंगे और हम लिखेंगे जो कुछ उन्होंने आगे के लिए भेजा और उनके चिन्हों को (जो पीछे रहा) । हर चीज़ हमने एक स्पष्ट किताब में गिन रखी है"
    },
    {
      "number": 13,
      "arabic": "وَٱضْرِبْ لَهُم مَّثَلًا أَصْحَٰبَ ٱلْقَرْيَةِ إِذْ جَآءَهَا ٱلْمُرْسَلُونَ",
      "translation": "And present to them an example: the people of the city, when the messengers came to it -",
      "translationUr": "اور ان سے گاؤں والوں کا قصہ بیان کرو جب ان کے پاس پیغمبر آئے",
      "translationHi": "उनके लिए बस्तीवालों की एक मिसाल पेश करो, जबकि वहाँ भेजे हुए दूत आए"
    },
    {
      "number": 14,
      "arabic": "إِذْ أَرْسَلْنَآ إِلَيْهِمُ ٱثْنَيْنِ فَكَذَّبُوهُمَا فَعَزَّزْنَا بِثَالِثٍۢ فَقَالُوٓا۟ إِنَّآ إِلَيْكُم مُّرْسَلُونَ",
      "translation": "When We sent to them two but they denied them, so We strengthened them with a third, and they said, \"Indeed, we are messengers to you.\"",
      "translationUr": "(یعنی) جب ہم نے ان کی طرف دو (پیغمبر) بھیجے تو انہوں نے ان کو جھٹلایا۔ پھر ہم نے تیسرے سے تقویت دی تو انہوں نے کہا کہ ہم تمہاری طرف پیغمبر ہو کر آئے ہیں",
      "translationHi": "जबकि हमने उनकी ओर दो दूत भेजे, तो उन्होंने झुठला दिया। तब हमने तीसरे के द्वारा शक्ति पहुँचाई, तो उन्होंने कहा, \"हम तुम्हारी ओर भेजे गए हैं।\""
    },
    {
      "number": 15,
      "arabic": "قَالُوا۟ مَآ أَنتُمْ إِلَّا بَشَرٌۭ مِّثْلُنَا وَمَآ أَنزَلَ ٱلرَّحْمَٰنُ مِن شَىْءٍ إِنْ أَنتُمْ إِلَّا تَكْذِبُونَ",
      "translation": "They said, \"You are not but human beings like us, and the Most Merciful has not revealed a thing. You are only telling lies.\"",
      "translationUr": "وہ بولے کہ تم (اور کچھ) نہیں مگر ہماری طرح کے آدمی (ہو) اور خدا نے کوئی چیز نازل نہیں کی تم محض جھوٹ بولتے ہو",
      "translationHi": "वे बोले, \"तुम तो बस हमारे ही जैसे मनुष्य हो। रहमान ने तो कोई भी चीज़ अवतरित नहीं की है। तुम केवल झूठ बोलते हो।\""
    },
    {
      "number": 16,
      "arabic": "قَالُوا۟ رَبُّنَا يَعْلَمُ إِنَّآ إِلَيْكُمْ لَمُرْسَلُونَ",
      "translation": "They said, \"Our Lord knows that we are messengers to you,",
      "translationUr": "انہوں نے کہا کہ ہمارا پروردگار جانتا ہے کہ ہم تمہاری طرف (پیغام دے کر) بھیجے گئے ہیں",
      "translationHi": "उन्होंने कहा, \"हमारा रब जानता है कि हम निश्चय ही तुम्हारी ओर भेजे गए है"
    },
    {
      "number": 17,
      "arabic": "وَمَا عَلَيْنَآ إِلَّا ٱلْبَلَٰغُ ٱلْمُبِينُ",
      "translation": "And we are not responsible except for clear notification.\"",
      "translationUr": "اور ہمارے ذمے تو صاف صاف پہنچا دینا ہے اور بس",
      "translationHi": "औऱ हमारी ज़िम्मेदारी तो केवल स्पष्ट रूप से संदेश पहुँचा देने की हैं।\""
    },
    {
      "number": 18,
      "arabic": "قَالُوٓا۟ إِنَّا تَطَيَّرْنَا بِكُمْ ۖ لَئِن لَّمْ تَنتَهُوا۟ لَنَرْجُمَنَّكُمْ وَلَيَمَسَّنَّكُم مِّنَّا عَذَابٌ أَلِيمٌۭ",
      "translation": "They said, \"Indeed, we consider you a bad omen. If you do not desist, we will surely stone you, and there will surely touch you, from us, a painful punishment.\"",
      "translationUr": "وہ بولے کہ ہم تم کو نامبارک سمجھتے ہیں۔ اگر تم باز نہ آؤ گے تو ہم تمہیں سنگسار کردیں گے اور تم کو ہم سے دکھ دینے والا عذاب پہنچے گا",
      "translationHi": "वे बोले, \"हम तो तुम्हें अपशकुन समझते है, यदि तुम बाज न आए तो हम तुम्हें पथराव करके मार डालेंगे और तुम्हें अवश्य हमारी ओर से दुखद यातना पहुँचेगी।\""
    },
    {
      "number": 19,
      "arabic": "قَالُوا۟ طَٰٓئِرُكُم مَّعَكُمْ ۚ أَئِن ذُكِّرْتُم ۚ بَلْ أَنتُمْ قَوْمٌۭ مُّسْرِفُونَ",
      "translation": "They said, \"Your omen is with yourselves. Is it because you were reminded? Rather, you are a transgressing people.\"",
      "translationUr": "انہوں نے کہا کہ تمہاری نحوست تمہارے ساتھ ہے۔ کیا اس لئے کہ تم کو نصیحت کی گئی۔ بلکہ تم ایسے لوگ ہو جو حد سے تجاوز کر گئے ہو",
      "translationHi": "उन्होंने कहा, \"तुम्हारा अवशकुन तो तुम्हारे अपने ही साथ है। क्या यदि तुम्हें याददिहानी कराई जाए (तो यह कोई क्रुद्ध होने की बात है)? नहीं, बल्कि तुम मर्यादाहीन लोग हो।\""
    },
    {
      "number": 20,
      "arabic": "وَجَآءَ مِنْ أَقْصَا ٱلْمَدِينَةِ رَجُلٌۭ يَسْعَىٰ قَالَ يَٰقَوْمِ ٱتَّبِعُوا۟ ٱلْمُرْسَلِينَ",
      "translation": "And there came from the farthest end of the city a man, running. He said, \"O my people, follow the messengers.",
      "translationUr": "اور شہر کے پرلے کنارے سے ایک آدمی دوڑتا ہوا آیا کہنے لگا کہ اے میری قوم پیغمبروں کے پیچھے چلو",
      "translationHi": "इतने में नगर के दूरवर्ती सिरे से एक व्यक्ति दौड़ता हुआ आया। उसने कहा, \"ऐ मेरी क़ौम के लोगो! उनका अनुवर्तन करो, जो भेजे गए है।"
    },
    {
      "number": 21,
      "arabic": "ٱتَّبِعُوا۟ مَن لَّا يَسْـَٔلُكُمْ أَجْرًۭا وَهُم مُّهْتَدُونَ",
      "translation": "Follow those who do not ask of you [any] payment, and they are [rightly] guided.",
      "translationUr": "ایسوں کے جو تم سے صلہ نہیں مانگتے اور وہ سیدھے رستے پر ہیں",
      "translationHi": "उसका अनुवर्तन करो जो तुमसे कोई बदला नहीं माँगते और वे सीधे मार्ग पर है"
    },
    {
      "number": 22,
      "arabic": "وَمَا لِىَ لَآ أَعْبُدُ ٱلَّذِى فَطَرَنِى وَإِلَيْهِ تُرْجَعُونَ",
      "translation": "And why should I not worship He who created me and to whom you will be returned?",
      "translationUr": "اور مجھے کیا ہے میں اس کی پرستش نہ کروں جس نے مجھے پیدا کیا اور اسی کی طرف تم کو لوٹ کر جانا ہے",
      "translationHi": "\"और मुझे क्या हुआ है कि मैं उसकी बन्दगी न करूँ, जिसने मुझे पैदा किया और उसी की ओर तुम्हें लौटकर जाना है?"
    },
    {
      "number": 23,
      "arabic": "ءَأَتَّخِذُ مِن دُونِهِۦٓ ءَالِهَةً إِن يُرِدْنِ ٱلرَّحْمَٰنُ بِضُرٍّۢ لَّا تُغْنِ عَنِّى شَفَٰعَتُهُمْ شَيْـًۭٔا وَلَا يُنقِذُونِ",
      "translation": "Should I take other than Him [false] deities [while], if the Most Merciful intends for me some adversity, their intercession will not avail me at all, nor can they save me?",
      "translationUr": "کیا میں ان کو چھوڑ کر اوروں کو معبود بناؤں؟ اگر خدا میرے حق میں نقصان کرنا چاہے تو ان کی سفارش مجھے کچھ بھی فائدہ نہ دے سکے اور نہ وہ مجھ کو چھڑا ہی سکیں",
      "translationHi": "\"क्या मैं उससे इतर दूसरे उपास्य बना लूँ? यदि रहमान मुझे कोई तकलीफ़ पहुँचाना चाहे तो उनकी सिफ़ारिश मेरे कुछ काम नहीं आ सकती और न वे मुझे छुडा ही सकते है"
    },
    {
      "number": 24,
      "arabic": "إِنِّىٓ إِذًۭا لَّفِى ضَلَٰلٍۢ مُّبِينٍ",
      "translation": "Indeed, I would then be in manifest error.",
      "translationUr": "تب تو میں صریح گمراہی میں مبتلا ہوگیا",
      "translationHi": "\"तब तो मैं अवश्य स्पष्ट गुमराही में पड़ जाऊँगा"
    },
    {
      "number": 25,
      "arabic": "إِنِّىٓ ءَامَنتُ بِرَبِّكُمْ فَٱسْمَعُونِ",
      "translation": "Indeed, I have believed in your Lord, so listen to me.\"",
      "translationUr": "میں تمہارے پروردگار پر ایمان لایا ہوں سو میری بات سن رکھو",
      "translationHi": "\"मैं तो तुम्हारे रब पर ईमान ले आया, अतः मेरी सुनो!\""
    },
    {
      "number": 26,
      "arabic": "قِيلَ ٱدْخُلِ ٱلْجَنَّةَ ۖ قَالَ يَٰلَيْتَ قَوْمِى يَعْلَمُونَ",
      "translation": "It was said, \"Enter Paradise.\" He said, \"I wish my people could know",
      "translationUr": "حکم ہوا کہ بہشت میں داخل ہوجا۔ بولا کاش! میری قوم کو خبر ہو",
      "translationHi": "कहा गया, \"प्रवेश करो जन्नत में!\" उसने कहा, \"ऐ काश! मेरी क़ौम के लोग जानते"
    },
    {
      "number": 27,
      "arabic": "بِمَا غَفَرَ لِى رَبِّى وَجَعَلَنِى مِنَ ٱلْمُكْرَمِينَ",
      "translation": "Of how my Lord has forgiven me and placed me among the honored.\"",
      "translationUr": "کہ خدا نے مجھے بخش دیا اور عزت والوں میں کیا",
      "translationHi": "कि मेरे रब ने मुझे क्षमा कर दिया और मुझे प्रतिष्ठित लोगों में सम्मिलित कर दिया।\""
    },
    {
      "number": 28,
      "arabic": "۞ وَمَآ أَنزَلْنَا عَلَىٰ قَوْمِهِۦ مِنۢ بَعْدِهِۦ مِن جُندٍۢ مِّنَ ٱلسَّمَآءِ وَمَا كُنَّا مُنزِلِينَ",
      "translation": "And We did not send down upon his people after him any soldiers from the heaven, nor would We have done so.",
      "translationUr": "اور ہم نے اس کے بعد اس کی قوم پر کوئی لشکر نہیں اُتارا اور نہ ہم اُتارنے والے تھے ہی",
      "translationHi": "उसके पश्चात उसकी क़ौम पर हमने आकाश से कोई सेना नहीं उतारी और हम इस तरह उतारा नहीं करते"
    },
    {
      "number": 29,
      "arabic": "إِن كَانَتْ إِلَّا صَيْحَةًۭ وَٰحِدَةًۭ فَإِذَا هُمْ خَٰمِدُونَ",
      "translation": "It was not but one shout, and immediately they were extinguished.",
      "translationUr": "وہ تو صرف ایک چنگھاڑ تھی (آتشین) سو وہ (اس سے) ناگہاں بجھ کر رہ گئ��",
      "translationHi": "वह तो केवल एक प्रचंड चीत्कार थी। तो सहसा क्या देखते है कि वे बुझकर रह गए"
    },
    {
      "number": 30,
      "arabic": "يَٰحَسْرَةً عَلَى ٱلْعِبَادِ ۚ مَا يَأْتِيهِم مِّن رَّسُولٍ إِلَّا كَانُوا۟ بِهِۦ يَسْتَهْزِءُونَ",
      "translation": "How regretful for the servants. There did not come to them any messenger except that they used to ridicule him.",
      "translationUr": "بندوں پر افسوس ہے کہ ان کے پاس کوئی پیغمبر نہیں آتا مگر اس سے تمسخر کرتے ہیں",
      "translationHi": "ऐ अफ़सोस बन्दो पर! जो रसूल भी उनके पास आया, वे उसका परिहास ही करते रहे"
    },
    {
      "number": 31,
      "arabic": "أَلَمْ يَرَوْا۟ كَمْ أَهْلَكْنَا قَبْلَهُم مِّنَ ٱلْقُرُونِ أَنَّهُمْ إِلَيْهِمْ لَا يَرْجِعُونَ",
      "translation": "Have they not considered how many generations We destroyed before them - that they to them will not return?",
      "translationUr": "کیا انہوں نے نہیں دیکھا کہ ہم نے ان سے پہلے بہت سے لوگوں کو ہلاک کردیا تھا اب وہ ان کی طرف لوٹ کر نہیں آئیں گے",
      "translationHi": "क्या उन्होंने नहीं देखा कि उनसे पहले कितनी ही नस्लों को हमने विनष्ट किया कि वे उनकी ओर पलटकर नहीं आएँगे?"
    },
    {
      "number": 32,
      "arabic": "وَإِن كُلٌّۭ لَّمَّا جَمِيعٌۭ لَّدَيْنَا مُحْضَرُونَ",
      "translation": "And indeed, all of them will yet be brought present before Us.",
      "translationUr": "اور سب کے سب ہمارے روبرو حاضر کيے جائیں گے",
      "translationHi": "और जितने भी है, सबके सब हमारे ही सामने उपस्थित किए जाएँगे"
    },
    {
      "number": 33,
      "arabic": "وَءَايَةٌۭ لَّهُمُ ٱلْأَرْضُ ٱلْمَيْتَةُ أَحْيَيْنَٰهَا وَأَخْرَجْنَا مِنْهَا حَبًّۭا فَمِنْهُ يَأْكُلُونَ",
      "translation": "And a sign for them is the dead earth. We have brought it to life and brought forth from it grain, and from it they eat.",
      "translationUr": "اور ایک نشانی ان کے لئے زمین مردہ ہے کہ ہم نے اس کو زندہ کیا اور اس میں سے اناج اُگایا۔ پھر یہ اس میں سے کھاتے ہیں",
      "translationHi": "और एक निशान�� उनके लिए मृत भूमि है। हमने उसे जीवित किया और उससे अनाज निकाला, तो वे खाते है"
    },
    {
      "number": 34,
      "arabic": "وَجَعَلْنَا فِيهَا جَنَّٰتٍۢ مِّن نَّخِيلٍۢ وَأَعْنَٰبٍۢ وَفَجَّرْنَا فِيهَا مِنَ ٱلْعُيُونِ",
      "translation": "And We placed therein gardens of palm trees and grapevines and caused to burst forth therefrom some springs -",
      "translationUr": "اور اس میں کھجوروں اور انگوروں کے باغ پیدا کیے اور اس میں چشمے جاری کردیئے",
      "translationHi": "और हमने उसमें खजूरों और अंगूरों के बाग लगाए और उसमें स्रोत प्रवाहित किए;"
    },
    {
      "number": 35,
      "arabic": "لِيَأْكُلُوا۟ مِن ثَمَرِهِۦ وَمَا عَمِلَتْهُ أَيْدِيهِمْ ۖ أَفَلَا يَشْكُرُونَ",
      "translation": "That they may eat of His fruit. And their hands have not produced it, so will they not be grateful?",
      "translationUr": "تاکہ یہ ان کے پھل کھائیں اور ان کے ہاتھوں نے تو ان کو نہیں بنایا تو پھر یہ شکر کیوں نہیں کرتے؟",
      "translationHi": "ताकि वे उसके फल खाएँ - हालाँकि यह सब कुछ उनके हाथों का बनाया हुआ नहीं है। - तो क्या वे आभार नहीं प्रकट करते?"
    },
    {
      "number": 36,
      "arabic": "سُبْحَٰنَ ٱلَّذِى خَلَقَ ٱلْأَزْوَٰجَ كُلَّهَا مِمَّا تُنۢبِتُ ٱلْأَرْضُ وَمِنْ أَنفُسِهِمْ وَمِمَّا لَا يَعْلَمُونَ",
      "translation": "Exalted is He who created all pairs - from what the earth grows and from themselves and from that which they do not know.",
      "translationUr": "وہ خدا پاک ہے جس نے زمین کی نباتات کے اور خود ان کے اور جن چیزوں کی ان کو خبر نہیں سب کے جوڑے بنائے",
      "translationHi": "महिमावान है वह जिसने सबके जोड़े पैदा किए धरती जो चीजें उगाती है उनमें से भी और स्वयं उनकी अपनी जाति में से भी और उन चीज़ो में से भी जिनको वे नहीं जानते"
    },
    {
      "number": 37,
      "arabic": "وَءَايَةٌۭ لَّهُمُ ٱلَّيْلُ نَسْلَخُ مِنْهُ ٱلنَّهَارَ فَإِذَا هُم مُّظْلِمُونَ",
      "translation": "And a sign for them is the night. We remove from it [the light of] day, so they are [left] in darkness.",
      "translationUr": "اور ایک نشانی ان کے لئے رات ہے کہ اس میں سے ہم دن کو کھینچ لیتے ہیں تو اس وقت ان پر اندھیرا چھا جاتا ہے",
      "translationHi": "और एक निशानी उनके लिए रात है। हम उसपर से दिन को खींच लेते है। फिर क्या देखते है कि वे अँधेरे में रह गए"
    },
    {
      "number": 38,
      "arabic": "وَٱلشَّمْسُ تَجْرِى لِمُسْتَقَرٍّۢ لَّهَا ۚ ذَٰلِكَ تَقْدِيرُ ٱلْعَزِيزِ ٱلْعَلِيمِ",
      "translation": "And the sun runs [on course] toward its stopping point. That is the determination of the Exalted in Might, the Knowing.",
      "translationUr": "اور سورج اپنے مقرر رستے پر چلتا رہتا ہے۔ یہ (خدائے) غالب اور دانا کا (مقرر کیا ہوا) اندازہ ہے",
      "translationHi": "और सूर्य अपने नियत ठिकाने के लिए चला जा रहा है। यह बाँधा हुआ हिसाब है प्रभुत्वशाली, ज्ञानवान का"
    },
    {
      "number": 39,
      "arabic": "وَٱلْقَمَرَ قَدَّرْنَٰهُ مَنَازِلَ حَتَّىٰ عَادَ كَٱلْعُرْجُونِ ٱلْقَدِيمِ",
      "translation": "And the moon - We have determined for it phases, until it returns [appearing] like the old date stalk.",
      "translationUr": "اور چاند کی بھی ہم نے منزلیں مقرر کردیں یہاں تک کہ (گھٹتے گھٹتے) کھجور کی پرانی شاخ کی طرح ہو جاتا ہے",
      "translationHi": "और रहा चन्द्रमा, तो उसकी नियति हमने मंज़िलों के क्रम में रखी, यहाँ तक कि वह फिर खजूर की पूरानी टेढ़ी टहनी के सदृश हो जाता है"
    },
    {
      "number": 40,
      "arabic": "لَا ٱلشَّمْسُ يَنۢبَغِى لَهَآ أَن تُدْرِكَ ٱلْقَمَرَ وَلَا ٱلَّيْلُ سَابِقُ ٱلنَّهَارِ ۚ وَكُلٌّۭ فِى فَلَكٍۢ يَسْبَحُونَ",
      "translation": "It is not allowable for the sun to reach the moon, nor does the night overtake the day, but each, in an orbit, is swimming.",
      "translationUr": "نہ تو سورج ہی سے ہوسکتا ہے کہ چاند کو جا پکڑے اور نہ رات ہی دن سے پہلے آسکتی ہے۔ اور سب اپنے اپنے دائرے میں تیر رہے ہیں",
      "translationHi": "न सूर्य ही से हो सकता है कि चाँद को जा पकड़े और न रात दिन से आगे बढ़ सकती है। सब एक-एक कक्षा में तैर रहे हैं"
    },
    {
      "number": 41,
      "arabic": "وَءَايَةٌۭ لَّهُمْ أَنَّا حَمَلْنَا ذُرِّيَّتَهُمْ فِى ٱلْفُلْكِ ٱلْمَشْحُونِ",
      "translation": "And a sign for them is that We carried their forefathers in a laden ship.",
      "translationUr": "اور ایک نشانی ان کے لئے یہ ہے کہ ہم نے ان کی اولاد کو بھری ہوئی کشتی میں سوار کیا",
      "translationHi": "और एक निशानी उनके लिए यह है कि हमने उनके अनुवर्तियों को भरी हुई नौका में सवार किया"
    },
    {
      "number": 42,
      "arabic": "وَخَلَقْنَا لَهُم مِّن مِّثْلِهِۦ مَا يَرْكَبُونَ",
      "translation": "And We created for them from the likes of it that which they ride.",
      "translationUr": "اور ان کے لئے ویسی ہی اور چیزیں پیدا کیں جن پر وہ سوار ہوتے ہیں",
      "translationHi": "और उनके लिए उसी के सदृश और भी ऐसी चीज़े पैदा की, जिनपर वे सवार होते है"
    },
    {
      "number": 43,
      "arabic": "وَإِن نَّشَأْ نُغْرِقْهُمْ فَلَا صَرِيخَ لَهُمْ وَلَا هُمْ يُنقَذُونَ",
      "translation": "And if We should will, We could drown them; then no one responding to a cry would there be for them, nor would they be saved",
      "translationUr": "اور اگر ہم چاہیں تو ان کو غرق کردیں۔ پھر نہ تو ان کا کوئی فریاد رس ہوا اور نہ ان کو رہائی ملے",
      "translationHi": "और यदि हम चाहें तो उन्हें डूबो दें। फिर न तो उनकी कोई चीख-पुकार हो और न उन्हें बचाया जा सके"
    },
    {
      "number": 44,
      "arabic": "إِلَّا رَحْمَةًۭ مِّنَّا وَمَتَٰعًا إِلَىٰ حِينٍۢ",
      "translation": "Except as a mercy from Us and provision for a time.",
      "translationUr": "مگر یہ ہماری رحمت اور ایک مدت تک کے فائدے ہیں",
      "translationHi": "यह तो बस हमारी दयालुता और एक नियत समय तक की सुख-सामग्री है"
    },
    {
      "number": 45,
      "arabic": "وَإِذَا قِيلَ لَهُمُ ٱتَّقُوا۟ مَا بَيْنَ أَيْدِيكُمْ وَمَا خَلْفَكُمْ لَعَلَّكُمْ تُرْحَمُونَ",
      "translation": "But when it is said to them, \"Beware of what is before you and what is behind you; perhaps you will receive mercy... \"",
      "translationUr": "اور جب ان سے کہا جاتا ہے کہ جو تمہارے آگے اور جو تمہارے پیچھے ہے اس سے ڈرو تاکہ تم پر رحم کیا جائے",
      "translationHi": "और जब उनसे कहा जाता है कि उस चीज़ का डर रखो, जो तुम्हारे आगे है और जो तुम्हारे पीछे है, ताकि तुमपर दया कि जाए! (तो चुप्पी साझ लेते है)"
    },
    {
      "number": 46,
      "arabic": "وَمَا تَأْتِيهِم مِّنْ ءَايَةٍۢ مِّنْ ءَايَٰتِ رَبِّهِمْ إِلَّا كَانُوا۟ عَنْهَا مُعْرِضِينَ",
      "translation": "And no sign comes to them from the signs of their Lord except that they are from it turning away.",
      "translationUr": "اور ان کے پاس ان کے پروردگار کی کوئی نشانی نہیں آتی مگر اس سے منہ پھیر لیتے ہیں",
      "translationHi": "उनके पास उनके रब की आयतों में से जो आयत भी आती है, वे उससे कतराते ही है"
    },
    {
      "number": 47,
      "arabic": "وَإِذَا قِيلَ لَهُمْ أَنفِقُوا۟ مِمَّا رَزَقَكُمُ ٱللَّهُ قَالَ ٱلَّذِينَ كَفَرُوا۟ لِلَّذِينَ ءَامَنُوٓا۟ أَنُطْعِمُ مَن لَّوْ يَشَآءُ ٱللَّهُ أَطْعَمَهُۥٓ إِنْ أَنتُمْ إِلَّا فِى ضَلَٰلٍۢ مُّبِينٍۢ",
      "translation": "And when it is said to them, \"Spend from that which Allah has provided for you,\" those who disbelieve say to those who believe, \"Should we feed one whom, if Allah had willed, He would have fed? You are not but in clear error.\"",
      "translationUr": "اور جب ان سے کہا جاتا ہے کہ جو رزق خدا نے تم کو دیا ہے اس میں سے خرچ کرو۔ تو کافر مومنوں سے کہتے ہیں کہ بھلا ہم ان لوگوں کو کھانا کھلائیں جن کو اگر خدا چاہتا تو خود کھلا دیتا۔ تم تو صریح غلطی میں ہو",
      "translationHi": "और जब उनसे कहा जाता है कि \"अल्लाह ने जो कुछ रोज़ी तुम्हें दी है उनमें से ख़र्च करो।\" तो जिन लोगों ने इनकार किया है, वे उन लोगों से, जो ईमान लाए है, कहते है, \"क्या हम उसको खाना खिलाएँ जिसे .दि अल्लाह चाहता तो स्वयं खिला देता? तुम तो बस खुली गुमराही में पड़े हो।\""
    },
    {
      "number": 48,
      "arabic": "وَيَقُولُونَ مَتَىٰ هَٰذَا ٱلْوَعْدُ إِن كُنتُمْ صَٰدِقِينَ",
      "translation": "And they say, \"When is this promise, if you should be truthful?\"",
      "translationUr": "اور کہتے ہیں اگر تم سچ کہتے ہو تو یہ وعدہ کب (پورا) ہوگا؟",
      "translationHi": "और वे कहते है कि \"यह वादा कब पूरा होगा, यदि तुम सच्चे हो?\""
    },
    {
      "number": 49,
      "arabic": "مَا يَنظُرُونَ إِلَّا صَيْحَةًۭ وَٰحِدَةًۭ تَأْخُذُهُمْ وَهُمْ يَخِصِّمُونَ",
      "translation": "They do not await except one blast which will seize them while they are disputing.",
      "translationUr": "یہ تو ایک چنگھاڑ کے منتظر ہیں جو ان کو اس حال میں کہ باہم جھگڑ رہے ہوں گے آپکڑے گی",
      "translationHi": "वे तो बस एक प्रचंड चीत्कार की प्रतीक्षा में है, जो उन्हें आ पकड़ेगी, जबकि वे झगड़ते होंगे"
    },
    {
      "number": 50,
      "arabic": "فَلَا يَسْتَطِيعُونَ تَوْصِيَةًۭ وَلَآ إِلَىٰٓ أَهْلِهِمْ يَرْجِعُونَ",
      "translation": "And they will not be able [to give] any instruction, nor to their people can they return.",
      "translationUr": "پھر نہ وصیت کرسکیں گے اور نہ اپنے گھر والوں میں واپس جاسکیں گے",
      "translationHi": "फिर न तो वे कोई वसीयत कर पाएँगे और न ��पने घरवालों की ओर लौट ही सकेंगे"
    },
    {
      "number": 51,
      "arabic": "وَنُفِخَ فِى ٱلصُّورِ فَإِذَا هُم مِّنَ ٱلْأَجْدَاثِ إِلَىٰ رَبِّهِمْ يَنسِلُونَ",
      "translation": "And the Horn will be blown; and at once from the graves to their Lord they will hasten.",
      "translationUr": "اور (جس وقت) صور پھونکا جائے گا یہ قبروں سے (نکل کر) اپنے پروردگار کی طرف دوڑ پڑیں گے",
      "translationHi": "और नरसिंघा में फूँक मारी जाएगी। फिर क्या देखेंगे कि वे क़ब्रों से निकलकर अपने रब की ओर चल पड़े हैं"
    },
    {
      "number": 52,
      "arabic": "قَالُوا۟ يَٰوَيْلَنَا مَنۢ بَعَثَنَا مِن مَّرْقَدِنَا ۜ ۗ هَٰذَا مَا وَعَدَ ٱلرَّحْمَٰنُ وَصَدَقَ ٱلْمُرْسَلُونَ",
      "translation": "They will say, \"O woe to us! Who has raised us up from our sleeping place?\" [The reply will be], \"This is what the Most Merciful had promised, and the messengers told the truth.\"",
      "translationUr": "کہیں گے اے ہے ہمیں ہماری خوابگاہوں سے کس نے (جگا) اُٹھایا؟ یہ وہی تو ہے جس کا خدا نے وعدہ کیا تھا اور پیغمبروں نے سچ کہا تھا",
      "translationHi": "कहेंगे, \"ऐ अफ़सोस हम पर! किसने हमें सोते से जगा दिया? यह वही चीज़ है जिसका रहमान ने वादा किया था और रसूलों ने सच कहा था।\""
    },
    {
      "number": 53,
      "arabic": "إِن كَانَتْ إِلَّا صَيْحَةًۭ وَٰحِدَةًۭ فَإِذَا هُمْ جَمِيعٌۭ لَّدَيْنَ�� مُحْضَرُونَ",
      "translation": "It will not be but one blast, and at once they are all brought present before Us.",
      "translationUr": "صرف ایک زور کی آواز کا ہونا ہوگا کہ سب کے سب ہمارے روبرو آحاضر ہوں گے",
      "translationHi": "बस एक ज़ोर की चिंघाड़ होगी। फिर क्या देखेंगे कि वे सबके-सब हमारे सामने उपस्थित कर दिए गए"
    },
    {
      "number": 54,
      "arabic": "فَٱلْيَوْمَ لَا تُظْلَمُ نَفْسٌۭ شَيْـًۭٔا وَلَا تُجْزَوْنَ إِلَّا مَا كُنتُمْ تَعْمَلُونَ",
      "translation": "So today no soul will be wronged at all, and you will not be recompensed except for what you used to do.",
      "translationUr": "اس روز کسی شخص پر کچھ ظلم نہیں کیا جائے گا اور تم کو بدلہ ویسا ہی ملے گا جیسے تم کام کرتے تھے",
      "translationHi": "अब आज किसी जीव पर कुछ भी ज़ुल्म न होगा और तुम्हें बदले में वही मिलेगा जो कुछ तुम करते रहे हो"
    },
    {
      "number": 55,
      "arabic": "إِنَّ أَصْحَٰبَ ٱلْجَنَّةِ ٱلْيَوْمَ فِى شُغُلٍۢ فَٰكِهُونَ",
      "translation": "Indeed the companions of Paradise, that Day, will be amused in [joyful] occupation -",
      "translationUr": "اہل جنت اس روز عیش ونشاط کے مشغلے میں ہوں گے",
      "translationHi": "निश्चय ही जन्नतवाले आज किसी न किसी काम नें व्यस्त आनन्द ले रहे है"
    },
    {
      "number": 56,
      "arabic": "هُمْ وَأَزْوَٰجُهُمْ فِى ظِلَٰلٍ عَلَى ٱلْأَرَآئِكِ مُتَّكِـُٔونَ",
      "translation": "They and their spouses - in shade, reclining on adorned couches.",
      "translationUr": "وہ بھی اور ان کی بیویاں بھی سایوں میں تختوں پر تکیے لگائے بیٹھے ہوں گے",
      "translationHi": "वे और उनकी पत्नियों छायों में मसहरियों पर तकिया लगाए हुए है,"
    },
    {
      "number": 57,
      "arabic": "لَهُمْ فِيهَا فَٰكِهَةٌۭ وَلَهُم مَّا يَدَّعُونَ",
      "translation": "For them therein is fruit, and for them is whatever they request [or wish]",
      "translationUr": "وہاں ان کے لئے میوے اور جو چاہیں گے (موجود ہوگا)",
      "translationHi": "उनके लिए वहाँ मेवे है। औऱ उनके लिए वह सब कुछ मौजूद है, जिसकी वे माँग करें"
    },
    {
      "number": 58,
      "arabic": "سَلَٰمٌۭ قَو��لًۭا مِّن رَّبٍّۢ رَّحِيمٍۢ",
      "translation": "[And] \"Peace,\" a word from a Merciful Lord.",
      "translationUr": "پروردگار مہربان کی طرف سے سلام (کہا جائے گا)",
      "translationHi": "(उनपर) सलाम है, दयामय रब का उच्चारित किया हुआ"
    },
    {
      "number": 59,
      "arabic": "وَٱمْتَٰزُوا۟ ٱلْيَوْمَ أَيُّهَا ٱلْمُجْرِمُونَ",
      "translation": "[Then He will say], \"But stand apart today, you criminals.",
      "translationUr": "اور گنہگارو! آج الگ ہوجاؤ",
      "translationHi": "\"और ऐ अपराधियों! आज तुम छँटकर अलग हो जाओ"
    },
    {
      "number": 60,
      "arabic": "۞ أَلَمْ أَعْهَدْ إِلَيْكُمْ يَٰبَنِىٓ ءَادَمَ أَن لَّا تَعْبُدُوا۟ ٱلشَّيْطَٰنَ ۖ إِنَّهُۥ لَكُمْ عَدُوٌّۭ مُّبِينٌۭ",
      "translation": "Did I not enjoin upon you, O children of Adam, that you not worship Satan - [for] indeed, he is to you a clear enemy -",
      "translationUr": "اے آدم کی اولاد ہم نے تم سے کہہ نہیں دیا تھا کہ شیطان کو نہ پوجنا وہ تمہارا کھلا دشمن ہے",
      "translationHi": "क्या मैंने तुम्हें ताकीद नहीं की थी, ऐ आदम के बेटो! कि शैतान की बन्दगी न करे। वास्तव में वह तुम्हारा खुला शत्रु है"
    },
    {
      "number": 61,
      "arabic": "وَأَنِ ٱعْبُدُونِى ۚ هَٰذَا صِرَٰطٌۭ مُّسْتَقِيمٌۭ",
      "translation": "And that you worship [only] Me? This is a straight path.",
      "translationUr": "اور یہ کہ میری ہی عبادت کرنا۔ یہی سیدھا رستہ ہے",
      "translationHi": "और यह कि मेरी बन्दगी करो? यही सीधा मार्ग है"
    },
    {
      "number": 62,
      "arabic": "وَلَقَدْ أَضَلَّ مِنكُمْ جِبِلًّۭا كَثِيرًا ۖ أَفَلَمْ تَكُونُوا۟ تَعْقِلُونَ",
      "translation": "And he had already led astray from among you much of creation, so did you not use reason?",
      "translationUr": "اور اس نے تم میں سے بہت سی خلقت کو گمراہ کردیا تھا۔ تو کیا تم سمجھتے نہیں تھے؟",
      "translationHi": "उसने तो तुममें से बहुत-से गिरोहों को पथभ्रष्ट कर दिया। तो क्या तुम बुद्धि नहीं रखते थे?"
    },
    {
      "number": 63,
      "arabic": "هَٰذِهِۦ جَهَنَّمُ ٱلَّتِى كُنتُمْ تُوعَدُونَ",
      "translation": "This is the Hellfire which you were promised.",
      "translationUr": "یہی وہ جہنم ہے جس کی تمہیں خبر دی جاتی ہے",
      "translationHi": "यह वही जहन्नम है जिसकी तुम्हें धमकी दी जाती रही है"
    },
    {
      "number": 64,
      "arabic": "ٱصْلَوْهَا ٱلْيَوْمَ بِمَا كُنتُمْ تَكْفُرُونَ",
      "translation": "[Enter to] burn therein today for what you used to deny.\"",
      "translationUr": "(سو) جو تم کفر کرتے رہے ہو اس کے بدلے آج اس میں داخل ہوجاؤ",
      "translationHi": "जो इनकार तुम करते रहे हो, उसके बदले में आज इसमें प्रविष्ट हो जाओ।\""
    },
    {
      "number": 65,
      "arabic": "ٱلْيَوْمَ نَخْتِمُ عَلَىٰٓ أَفْوَٰهِهِمْ وَتُكَلِّمُنَآ أَيْدِيهِمْ وَتَشْهَدُ أَرْجُلُهُم بِمَا كَانُوا۟ يَكْسِبُونَ",
      "translation": "That Day, We will seal over their mouths, and their hands will speak to Us, and their feet will testify about what they used to earn.",
      "translationUr": "آج ہم ان کے مونہوں پر مہر لگا دیں گے اور جو کچھ یہ کرتے رہے تھے ان کے ہاتھ ہم سے بیان کردیں گے اور ان کے پاؤں (اس کی) گواہی دیں گے",
      "translationHi": "आज हम उनके मुँह पर मुहर लगा देंगे और उनके हाथ हमसे बोलेंगे और जो कुछ वे कमाते रहे है, उनके पाँव उसकी गवाही देंगे"
    },
    {
      "number": 66,
      "arabic": "وَلَوْ نَشَآءُ لَطَمَسْنَا عَلَىٰٓ أَعْيُنِهِمْ فَٱسْتَبَقُوا۟ ٱلصِّرَٰطَ فَأَنَّىٰ يُبْصِرُونَ",
      "translation": "And if We willed, We could have obliterated their eyes, and they would race to [find] the path, and how could they see?",
      "translationUr": "اور اگر ہم چاہیں تو ان کی آنکھوں کو مٹا کر (اندھا کر) دیں۔ پھر یہ رستے کو دوڑیں تو کہاں دیکھ سکیں گے",
      "translationHi": "यदि हम चाहें तो उनकी आँखें मेट दें क्योंकि वे (अपने रूढ़) मार्ग की और लपके हुए है। फिर उन्हें सुझाई कहाँ से देगा?"
    },
    {
      "number": 67,
      "arabic": "وَلَوْ نَشَآءُ لَمَسَخْنَٰهُمْ عَلَىٰ مَكَانَتِهِمْ فَمَا ٱسْتَطَٰعُوا۟ مُضِيًّۭا وَلَا يَرْجِعُونَ",
      "translation": "And if We willed, We could have deformed them, [paralyzing them] in their places so they would not be able to proceed, nor could they return.",
      "translationUr": "اور اگر ہم چاہیں تو ان کی جگہ پر ان کی صورتیں بدل دیں پھر وہاں سے نہ آگے جاسکیں اور نہ (پیچھے) لوٹ سکیں",
      "translationHi": "यदि हम चाहें तो उनकी जगह पर ही उनके रूप बिगाड़कर रख दें क्योंकि वे सत्य की ओर न चल सके और वे (गुमराही से) बाज़ नहीं आते।"
    },
    {
      "number": 68,
      "arabic": "وَمَن نُّعَمِّرْهُ نُنَكِّسْهُ فِى ٱلْخَلْقِ ۖ أَفَلَا يَعْقِلُونَ",
      "translation": "And he to whom We grant long life We reverse in creation; so will they not understand?",
      "translationUr": "اور جس کو ہم بڑی عمر دیتے ہیں تو اسے خلقت میں اوندھا کردیتے ہیں تو کیا یہ سمجھتے نہیں؟",
      "translationHi": "जिसको हम दीर्धायु देते है, उसको उसकी संरचना में उल्टा फेर देते है। तो क्या वे बुद्धि से काम नहीं लेते?"
    },
    {
      "number": 69,
      "arabic": "وَمَا عَلَّمْنَٰهُ ٱلشِّعْرَ وَمَا يَنۢبَغِى لَهُۥٓ ۚ إِنْ هُوَ إِلَّا ذِكْرٌۭ وَقُرْءَانٌۭ مُّبِينٌۭ",
      "translation": "And We did not give Prophet Muhammad, knowledge of poetry, nor is it befitting for him. It is not but a message and a clear Qur'an",
      "translationUr": "اور ہم نے ان (پیغمبر) کو شعر گوئی نہیں سکھائی اور نہ وہ ان کو شایاں ہے۔ یہ تو محض نصیحت اور صاف صاف قرآن (پُرازحکمت) ہے",
      "translationHi": "हमने उस (नबी) को कविता नहीं सिखाई और न वह उसके लिए शोभनीय है। वह तो केवल अनुस्मृति और स्पष्ट क़ुरआन है;"
    },
    {
      "number": 70,
      "arabic": "لِّيُنذِرَ مَن كَانَ حَيًّۭا وَيَحِقَّ ٱلْقَوْلُ عَلَى ٱلْكَٰفِرِينَ",
      "translation": "To warn whoever is alive and justify the word against the disbelievers.",
      "translationUr": "تاکہ اس شخص کو جو زندہ ہو ہدایت کا رستہ دکھائے اور کافروں پر بات پوری ہوجائے",
      "translationHi": "ताकि वह उसे सचेत कर दे जो जीवन्त हो और इनकार करनेवालों पर (यातना की) बात स्थापित हो जाए"
    },
    {
      "number": 71,
      "arabic": "أَوَلَمْ يَرَوْا۟ أَنَّا خَلَقْنَا لَهُم مِّمَّا عَمِلَتْ أَيْدِينَآ أَنْعَٰمًۭا فَهُمْ لَهَا مَٰلِكُونَ",
      "translation": "Do they not see that We have created for them from what Our hands have made, grazing livestock, and [then] they are their owners?",
      "translationUr": "کیا انہوں نے نہیں دیکھا کہ جو چیزیں ہم نے اپنے ہاتھوں سے بنائیں ان میں سے ہم نے ان کے لئے چارپائے پیدا کر دیئے اور یہ ان کے مالک ہیں",
      "translationHi": "क्या उन्होंने देखा नहीं कि हमने उनके लिए अपने हाथों की बनाई हुई चीज़ों में से चौपाए पैदा किए और अब वे उनके मालिक है?"
    },
    {
      "number": 72,
      "arabic": "وَذَلَّلْنَٰهَا لَهُمْ فَمِنْهَا رَكُوبُهُمْ وَمِنْهَا يَأْكُلُونَ",
      "translation": "And We have tamed them for them, so some of them they ride, and some of them they eat.",
      "translationUr": "اور ان کو ان کے قابو میں کردیا تو کوئی تو ان میں سے ان کی سواری ہے اور کسی کو یہ کھاتے ہیں",
      "translationHi": "और उन्हें उनके बस में कर दिया कि उनमें से कुछ तो उनकी सवारियाँ हैं और उनमें से कुछ को खाते है।"
    },
    {
      "number": 73,
      "arabic": "وَلَهُمْ فِيهَا مَنَٰفِعُ وَمَشَارِبُ ۖ أَفَلَا يَشْكُرُونَ",
      "translation": "And for them therein are [other] benefits and drinks, so will they not be grateful?",
      "translationUr": "اور ان میں ان کے لئے (اور) فائدے اور پینے کی چیزیں ہیں۔ تو یہ شکر کیوں نہیں کرتے؟",
      "translationHi": "और उनके लिए उनमें कितने ही लाभ है और पेय भी है। तो क्या वे कृतज्ञता नहीं दिखलाते?"
    },
    {
      "number": 74,
      "arabic": "وَٱتَّخَذُوا۟ مِن دُونِ ٱللَّهِ ءَالِهَةًۭ لَّعَلَّهُمْ يُنصَرُونَ",
      "translation": "But they have taken besides Allah [false] deities that perhaps they would be helped.",
      "translationUr": "اور انہوں نے خدا کے سوا (اور) معبود بنا لیے ہیں کہ شاید (ان سے) ان کو مدد پہنچے",
      "translationHi": "उन्होंने अल्लाह से इतर कितने ही उपास्य बना लिए है कि शायद उन्हें मदद पहुँचे।"
    },
    {
      "number": 75,
      "arabic": "لَا يَسْتَطِيعُونَ نَصْرَهُمْ وَهُمْ لَهُمْ جُندٌۭ مُّحْضَرُونَ",
      "translation": "They are not able to help them, and they [themselves] are for them soldiers in attendance.",
      "translationUr": "(مگر) وہ ان کی مدد کی (ہرگز) طاقت نہیں رکھتے۔ اور وہ ان کی فوج ہو کر حاضر کیے جائیں گے",
      "translationHi": "वे उनकी सहायता करने की सामर्थ्य नहीं रखते, हालाँकि वे (बहुदेववादियों की अपनी स्पष्ट में) उनके लिए उपस्थित सेनाएँ हैं"
    },
    {
      "number": 76,
      "arabic": "فَلَا يَحْزُنكَ قَوْلُهُمْ ۘ إِنَّا نَعْلَمُ مَا يُسِرُّونَ وَمَا يُعْلِنُونَ",
      "translation": "So let not their speech grieve you. Indeed, We know what they conceal and what they declare.",
      "translationUr": "تو ان کی باتیں تمہیں غمناک نہ کردیں۔ یہ جو کچھ چھپاتے اور جو کچھ ظاہر کرتے ہیں ہمیں سب معلوم ہے",
      "translationHi": "अतः उनकी बात तुम्हें शोकाकुल न करे। हम जानते है जो कुछ वे छिपाते और जो कुछ व्यक्त करते है"
    },
    {
      "number": 77,
      "arabic": "أَوَلَمْ يَرَ ٱلْإِنسَٰنُ أَنَّا خَلَقْنَٰهُ مِن نُّطْفَةٍۢ فَإِذَا هُوَ خَصِيمٌۭ مُّبِينٌۭ",
      "translation": "Does man not consider that We created him from a [mere] sperm-drop - then at once he is a clear adversary?",
      "translationUr": "کیا انسان نے نہیں دیکھا کہ ہم نے اس کو نطفے سے پیدا کیا۔ پھر وہ تڑاق پڑاق جھگڑنے لگا",
      "translationHi": "क्या (इनकार करनेवाले) मनुष्य को नहीं देखा कि हमने उसे वीर्य से पैदा किया? फिर क्या देखते है कि वह प्रत्क्षय विरोधी झगड़ालू बन गया"
    },
    {
      "number": 78,
      "arabic": "وَضَرَبَ لَنَا مَثَلًۭا وَنَسِىَ خَلْقَهُۥ ۖ قَالَ مَن يُحْىِ ٱلْعِظَٰمَ وَهِىَ رَمِيمٌۭ",
      "translation": "And he presents for Us an example and forgets his [own] creation. He says, \"Who will give life to bones while they are disintegrated?\"",
      "translationUr": "اور ہمارے بارے میں مثالیں بیان کرنے لگا اور اپنی پیدائش کو بھول گیا۔ کہنے لگا کہ (جب) ہڈیاں بوسیدہ ہوجائیں گی تو ان کو کون زندہ کرے گا؟",
      "translationHi": "और उसने हमपर फबती कसी और अपनी पैदाइश को भूल गया। कहता है, \"कौन हड्डियों में जान डालेगा, जबकि वे जीर्ण-शीर्ण हो चुकी होंगी?\""
    },
    {
      "number": 79,
      "arabic": "قُلْ يُحْيِيهَا ٱلَّذِىٓ أَنشَأَهَآ أَوَّلَ مَرَّةٍۢ ۖ وَهُوَ بِكُلِّ خَلْقٍ عَلِيمٌ",
      "translation": "Say, \"He will give them life who produced them the first time; and He is, of all creation, Knowing.\"",
      "translationUr": "کہہ دو کہ ان کو وہ زندہ کرے گا جس نے ان کو پہلی بار پیدا کیا تھا۔ اور وہ سب قسم کا پیدا کرنا جانتا ہے",
      "translationHi": "कह दो, \"उनमें वही जाल डालेगा जिसने उनको पहली बार पैदा किया। वह तो प्रत्येक संसृति को भली-भाँति जानता है"
    },
    {
      "number": 80,
      "arabic": "ٱلَّذِى جَعَلَ لَكُم مِّنَ ٱلشَّجَرِ ٱلْأَخْضَرِ نَارًۭا فَإِذَآ أَنتُم مِّنْهُ تُوقِدُونَ",
      "translation": "[It is] He who made for you from the green tree, fire, and then from it you ignite.",
      "translationUr": "جس نے تمہارے لئے سبز درخت سے آگ پیدا کی پھر تم اس (کی ٹہنیوں کو رگڑ کر ان) سے آگ نکالتے ہو",
      "translationHi": "वही है जिसने तुम्हारे लिए हरे-भरे वृक्ष से आग पैदा कर दी। तो लगे हो तुम उससे जलाने।\""
    },
    {
      "number": 81,
      "arabic": "أَوَلَيْسَ ٱلَّذِى خَلَقَ ٱلسَّمَٰوَٰتِ وَٱلْأَرْضَ بِقَٰدِرٍ عَلَىٰٓ أَن يَخْلُقَ مِثْلَهُم ۚ بَلَىٰ وَهُوَ ٱلْخَلَّٰقُ ٱلْعَلِيمُ",
      "translation": "Is not He who created the heavens and the earth Able to create the likes of them? Yes, [it is so]; and He is the Knowing Creator.",
      "translationUr": "بھلا جس نے آسمانوں اور زمین کو پیدا کیا، کیا وہ اس بات پر قادر نہیں کہ (ان کو پھر) ویسے ہی پیدا کر دے۔ کیوں نہیں۔ اور وہ تو بڑا پیدا کرنے والا اور علم والا ہے",
      "translationHi": "क्या जिसने आकाशों और धरती को पैदा किया उसे इसकी सामर्थ्य नहीं कि उन जैसों को पैदा कर दे? क्यों नहीं, जबकि वह महान स्रष्टा , अत्यन्त ज्ञानवान है"
    },
    {
      "number": 82,
      "arabic": "إِنَّمَآ أَمْرُهُۥٓ إِذَآ أَرَادَ شَيْـًٔا أَن يَقُولَ لَهُۥ كُن فَيَكُونُ",
      "translation": "His command is only when He intends a thing that He says to it, \"Be,\" and it is.",
      "translationUr": "اس کی شان یہ ہے کہ جب وہ کسی چیز کا ارادہ کرتا ہے تو اس سے فرما دیتا ہے کہ ہوجا تو وہ ہوجاتی ہے",
      "translationHi": "उसका मामला तो बस यह है कि जब वह किसी चीज़ (के पैदा करने) का इरादा करता है तो उससे कहता है, \"हो जा!\" और वह हो जाती है"
    },
    {
      "number": 83,
      "arabic": "فَسُبْحَٰنَ ٱلَّذِى بِيَدِهِۦ مَلَكُوتُ كُلِّ شَىْءٍۢ وَإِلَيْهِ تُرْجَعُونَ",
      "translation": "So exalted is He in whose hand is the realm of all things, and to Him you will be returned.",
      "translationUr": "وہ (ذات) پاک ہے جس کے ہاتھ میں ہر چیز کی بادشاہت ہے اور اسی کی طرف تم کو لوٹ کر جانا ہے",
      "translationHi": "अतः महिमा है उसकी, जिसके हाथ में हर चीज़ का पूरा अधिकार है। और उसी की ओर तुम लौटकर जाओगे"
    }
  ],
  "55": [
    {
      "number": 1,
      "arabic": "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ ٱلرَّحْمَٰنُ",
      "translation": "The Most Merciful",
      "translationUr": "(خدا جو) نہایت مہربان",
      "translationHi": "रहमान ने"
    },
    {
      "number": 2,
      "arabic": "عَلَّمَ ٱلْقُرْءَانَ",
      "translation": "Taught the Qur'an,",
      "translationUr": "اسی نے قرآن کی تعلیم فرمائی",
      "translationHi": "क़ुरआन सिखाया;"
    },
    {
      "number": 3,
      "arabic": "خَلَقَ ٱلْإِنسَٰنَ",
      "translation": "Created man,",
      "translationUr": "اسی نے انسان کو پیدا کیا",
      "translationHi": "उसी ने मनुष्य को पैदा किया;"
    },
    {
      "number": 4,
      "arabic": "عَلَّمَهُ ٱلْبَيَانَ",
      "translation": "[And] taught him eloquence.",
      "translationUr": "اسی نے اس کو بولنا سکھایا",
      "translationHi": "उसे बोलना सिखाया;"
    },
    {
      "number": 5,
      "arabic": "ٱلشَّمْسُ وَٱلْقَمَرُ بِحُسْبَانٍۢ",
      "translation": "The sun and the moon [move] by precise calculation,",
      "translationUr": "سورج اور چاند ایک حساب مقرر سے چل رہے ہیں",
      "translationHi": "सूर्य और चन्द्रमा एक हिसाब के पाबन्द है;"
    },
    {
      "number": 6,
      "arabic": "وَٱلنَّجْمُ وَٱلشَّجَرُ يَسْجُدَانِ",
      "translation": "And the stars and trees prostrate.",
      "translationUr": "اور بوٹیاں اور درخت سجدہ کر رہے ہیں",
      "translationHi": "और तारे और वृक्ष सजदा ���रते है;"
    },
    {
      "number": 7,
      "arabic": "وَٱلسَّمَآءَ رَفَعَهَا وَوَضَعَ ٱلْمِيزَانَ",
      "translation": "And the heaven He raised and imposed the balance",
      "translationUr": "اور اسی نے آسمان کو بلند کیا اور ترازو قائم کی",
      "translationHi": "उसने आकाश को ऊँचा किया और संतुलन स्थापित किया -"
    },
    {
      "number": 8,
      "arabic": "أَلَّا تَطْغَوْا۟ فِى ٱلْمِيزَانِ",
      "translation": "That you not transgress within the balance.",
      "translationUr": "کہ ترازو (سے تولنے) میں حد سے تجاوز نہ کرو",
      "translationHi": "कि तुम भी तुला में सीमा का उल्लंघन न करो"
    },
    {
      "number": 9,
      "arabic": "وَأَقِيمُوا۟ ٱلْوَزْنَ بِٱلْقِسْطِ وَلَا تُخْسِرُوا۟ ٱلْمِيزَانَ",
      "translation": "And establish weight in justice and do not make deficient the balance.",
      "translationUr": "اور انصاف کے ساتھ ٹھیک تولو۔ اور تول کم مت کرو",
      "translationHi": "न्याय के साथ ठीक-ठीक तौलो और तौल में कमी न करो। -"
    },
    {
      "number": 10,
      "arabic": "وَٱلْأَرْضَ وَضَعَهَا لِلْأَنَامِ",
      "translation": "And the earth He laid [out] for the creatures.",
      "translationUr": "اور اسی نے خلقت کے لئے زمین بچھائی",
      "translationHi": "और धरती को उसने सृष्टल प्राणियों के लिए बनाया;"
    },
    {
      "number": 11,
      "arabic": "فِيهَا فَٰكِهَةٌۭ وَٱلنَّخْلُ ذَاتُ ٱلْأَكْمَامِ",
      "translation": "Therein is fruit and palm trees having sheaths [of dates]",
      "translationUr": "اس میں میوے اور کھجور کے درخت ہیں جن کے خوشوں پر غلاف ہوتے ہیں",
      "translationHi": "उसमें स्वादिष्ट फल है और खजूर के वृक्ष है, जिनके फल आवरणों में लिपटे हुए है,"
    },
    {
      "number": 12,
      "arabic": "وَٱلْحَبُّ ذُو ٱلْعَصْفِ وَٱلرَّيْحَانُ",
      "translation": "And grain having husks and scented plants.",
      "translationUr": "اور اناج جس کے ساتھ بھس ہوتا ہے اور خوشبودار پھول",
      "translationHi": "और भुसवाले अनाज भी और सुगंधित बेल-बूटा भी"
    },
    {
      "number": 13,
      "arabic": "فَبِأَىِّ ءَالَآءِ رَبِّكُمَا تُكَذِّبَانِ",
      "translation": "So which of the favors of your Lord would you deny?",
      "translationUr": "تو (اے گروہ جن وانس) تم اپنے پروردگار کی کون کون سی نعمت کو جھٹلاؤ گے؟",
      "translationHi": "तो तुम दोनों अपने रब की अनुकम्पाओं में से किस-किस को झुठलाओगे?"
    },
    {
      "number": 14,
      "arabic": "خَلَقَ ٱلْإِنسَٰنَ مِن صَلْصَٰلٍۢ كَٱلْفَخَّارِ",
      "translation": "He created man from clay like [that of] pottery.",
      "translationUr": "اسی نے انسان کو ٹھیکرے کی طرح کھنکھناتی مٹی سے بنایا",
      "translationHi": "उसने मनुष्य को ठीकरी जैसी खनखनाती हुए मिट्टी से पैदा किया;"
    },
    {
      "number": 15,
      "arabic": "وَخَلَقَ ٱلْجَآنَّ مِن مَّارِجٍۢ مِّن نَّارٍۢ",
      "translation": "And He created the jinn from a smokeless flame of fire.",
      "translationUr": "اور جنات کو آگ کے شعلے سے پیدا کیا",
      "translationHi": "और जिन्न को उसने आग की लपट से पैदा किया"
    },
    {
      "number": 16,
      "arabic": "فَبِأَىِّ ءَالَآءِ رَبِّكُمَا تُكَذِّبَانِ",
      "translation": "So which of the favors of your Lord would you deny?",
      "translationUr": "تو تم اپنے پروردگار کی کون کون سی نعمت کو جھٹلاؤ گے؟",
      "translationHi": "फिर तुम दोनों अपने रब की सामर्थ्यों में से किस-किस को झुठलाओगे?"
    },
    {
      "number": 17,
      "arabic": "رَبُّ ٱلْمَشْرِقَيْنِ وَرَبُّ ٱلْمَغْرِبَيْنِ",
      "translation": "[He is] Lord of the two sunrises and Lord of the two sunsets.",
      "translationUr": "وہی دونوں مشرقوں اور دونوں مغربوں کا مالک (ہے)",
      "translationHi": "वह दो पूर्व का रब है और दो पश्चिम का रब भी।"
    },
    {
      "number": 18,
      "arabic": "فَبِأَىِّ ءَالَآءِ رَبِّكُمَا تُكَذِّبَانِ",
      "translation": "So which of the favors of your Lord would you deny?",
      "translationUr": "تو تم اپنے پروردگار کی کون کون سی نعمت کو جھٹلاؤ گے؟",
      "translationHi": "फिर तुम दोनों अपने रब की महानताओं में से किस-किस को झुठलाओगे?"
    },
    {
      "number": 19,
      "arabic": "مَرَجَ ٱلْبَحْرَيْنِ يَلْتَقِيَانِ",
      "translation": "He released the two seas, meeting [side by side];",
      "translationUr": "اسی نے دو دریا رواں کئے جو آپس میں ملتے ہیں",
      "translationHi": "उसने दो समुद्रो को प्रवाहित कर दिया, जो आपस में मिल रहे होते है।"
    },
    {
      "number": 20,
      "arabic": "بَيْنَهُمَا بَرْزَخٌۭ لَّا يَبْغِيَانِ",
      "translation": "Between them is a barrier [so] neither of them transgresses.",
      "translationUr": "دونوں میں ایک آڑ ہے کہ (اس سے) تجاوز نہیں کرسکتے",
      "translationHi": "उन दोनों के बीच एक परदा बाधक होता है, जिसका वे अतिक्रमण नहीं करते"
    },
    {
      "number": 21,
      "arabic": "فَبِأَىِّ ءَالَآءِ رَبِّكُمَا تُكَذِّبَانِ",
      "translation": "So which of the favors of your Lord would you deny?",
      "translationUr": "تو تم اپنے پروردگار کی کون کون سی نعمت کو جھٹلاؤ گے؟",
      "translationHi": "तो तुम दोनों अपने रब के चमत्कारों में से किस-किस को झुठलाओगे?"
    },
    {
      "number": 22,
      "arabic": "يَخْرُجُ مِنْهُمَا ٱللُّؤْلُؤُ وَٱلْمَرْجَانُ",
      "translation": "From both of them emerge pearl and coral.",
      "translationUr": "دونوں دریاؤں سے موتی اور مونگے نکلتے ہیں",
      "translationHi": "उन (समुद्रों) से मोती और मूँगा निकलता है।"
    },
    {
      "number": 23,
      "arabic": "فَبِأَىِّ ءَالَآءِ رَبِّكُمَا تُكَذِّبَانِ",
      "translation": "So which of the favors of your Lord would you deny?",
      "translationUr": "تو تم اپنے پروردگار کی کون کون سی نعمت کو جھٹلاؤ گے؟",
      "translationHi": "अतः तुम दोनों अपने रब के चमत्कारों में से किस-किस को झुठलाओगे?"
    },
    {
      "number": 24,
      "arabic": "وَلَهُ ٱلْجَوَارِ ٱلْمُنشَـَٔاتُ فِى ٱلْبَحْرِ كَٱلْأَعْلَٰمِ",
      "translation": "And to Him belong the ships [with sails] elevated in the sea like mountains.",
      "translationUr": "اور جہاز بھی اسی کے ہیں جو دریا میں پہاڑوں کی طرح اونچے کھڑے ہوتے ہیں",
      "translationHi": "उसी के बस में है समुद्र में पहाड़ो की तरह उठे हुए जहाज़"
    },
    {
      "number": 25,
      "arabic": "فَبِأَىِّ ءَالَآءِ رَبِّكُمَا تُكَذِّبَانِ",
      "translation": "So which of the favors of your Lord would you deny?",
      "translationUr": "تو تم اپنے پروردگار کی کون کون سی نعمت کو جھٹلاؤ گے؟",
      "translationHi": "तो तुम दोनों अपने रब की अनुकम्पाओं में से किस-किस को झुठलाओग?"
    },
    {
      "number": 26,
      "arabic": "كُلُّ مَنْ عَلَيْهَا فَانٍۢ",
      "translation": "Everyone upon the earth will perish,",
      "translationUr": "جو (مخلوق) زمین پر ہے سب کو فنا ہونا ہے",
      "translationHi": "प्रत्येक जो भी इस (���रती) पर है, नाशवान है"
    },
    {
      "number": 27,
      "arabic": "وَيَبْقَىٰ وَجْهُ رَبِّكَ ذُو ٱلْجَلَٰلِ وَٱلْإِكْرَامِ",
      "translation": "And there will remain the Face of your Lord, Owner of Majesty and Honor.",
      "translationUr": "اور تمہارے پروردگار ہی کی ذات (بابرکات) جو صاحب جلال وعظمت ہے باقی رہے گی",
      "translationHi": "किन्तु तुम्हारे रब का प्रतापवान और उदार स्वरूप शेष रहनेवाला है"
    },
    {
      "number": 28,
      "arabic": "فَبِأَىِّ ءَالَآءِ رَبِّكُمَا تُكَذِّبَانِ",
      "translation": "So which of the favors of your Lord would you deny?",
      "translationUr": "تو تم اپنے پروردگار کی کون کون سی نعمت کو جھٹلاؤ گے؟",
      "translationHi": "अतः तुम दोनों अपने रब के चमत्कारों में से किस-किस को झुठलाओगं?"
    },
    {
      "number": 29,
      "arabic": "يَسْـَٔلُهُۥ مَن فِى ٱلسَّمَٰوَٰتِ وَٱلْأَرْضِ ۚ كُلَّ يَوْمٍ هُوَ فِى شَأْنٍۢ",
      "translation": "Whoever is within the heavens and earth asks Him; every day He is bringing about a matter.",
      "translationUr": "آسمان اور زمین میں جتنے لوگ ہیں سب اسی سے مانگتے ہیں۔ وہ ہر روز کام میں مصروف رہتا ہے",
      "translationHi": "आकाशों और धरती में जो भी है उसी से माँगता है। उसकी नित्य नई शान है"
    },
    {
      "number": 30,
      "arabic": "فَبِأَىِّ ءَالَآءِ رَبِّكُمَا تُكَذِّبَانِ",
      "translation": "So which of the favors of your Lord would you deny?",
      "translationUr": "تو تم اپنے پروردگار کی کون کون سی نعمت کو جھٹلاؤ گے؟",
      "translationHi": "अतः तुम दोनों अपने रब की अनुकम्पाओं में से किस-किस को झुठलाओगे?"
    },
    {
      "number": 31,
      "arabic": "سَنَفْرُغُ لَكُمْ أَيُّهَ ٱلثَّقَلَانِ",
      "translation": "We will attend to you, O prominent beings.",
      "translationUr": "اے دونوں جماعتو! ہم عنقریب تمہاری طرف متوجہ ہوتے ہیں",
      "translationHi": "ऐ दोनों बोझों! शीघ्र ही हम तुम्हारे लिए निवृत हुए जाते है"
    },
    {
      "number": 32,
      "arabic": "فَبِأَىِّ ءَالَآءِ رَبِّكُمَا تُكَذِّبَانِ",
      "translation": "So which of the favors of your Lord would you deny?",
      "translationUr": "تو تم اپنے پروردگار کی کون کون سی نعمت کو جھٹلاؤ گے؟",
      "translationHi": "तो तुम दोनों अपने रब की अनुकम्पाओं में से किस-किस को झुठलाओगे?"
    },
    {
      "number": 33,
      "arabic": "يَٰمَعْشَرَ ٱلْجِنِّ وَٱلْإِنسِ إِنِ ٱسْتَطَعْتُمْ أَن تَنفُذُوا۟ مِنْ أَقْطَارِ ٱلسَّمَٰوَٰتِ وَٱلْأَرْضِ فَٱنفُذُوا۟ ۚ لَا تَنفُذُونَ إِلَّا بِسُلْطَٰنٍۢ",
      "translation": "O company of jinn and mankind, if you are able to pass beyond the regions of the heavens and the earth, then pass. You will not pass except by authority [from Allah].",
      "translationUr": "اے گروہِ جن وانس اگر تمہیں قدرت ہو کہ آسمان اور زمین کے کناروں سے نکل جاؤ تو نکل جاؤ۔ اور زور کے سوا تم نکل سکنے ہی کے نہیں",
      "translationHi": "ऐ जिन्नों और मनुष्यों के गिरोह! यदि तुममें हो सके कि आकाशों और धरती की सीमाओं को पार कर सको, तो पार कर जाओ; तुम कदापि पार नहीं कर सकते बिना अधिकार-शक्ति के"
    },
    {
      "number": 34,
      "arabic": "فَبِأَىِّ ءَالَآءِ رَبِّكُمَا تُكَذِّبَانِ",
      "translation": "So which of the favors of your Lord would you deny?",
      "translationUr": "تو تم اپنے پروردگار کی کون کون سی نعمت کو جھٹلاؤ گے؟",
      "translationHi": "अतः तुम दोनों अपने रब की सामर्थ्यों में से किस-किस को झुठलाओगे?"
    },
    {
      "number": 35,
      "arabic": "يُرْسَلُ عَلَيْكُمَا شُوَاظٌۭ مِّن نَّارٍۢ وَنُحَاسٌۭ فَلَا تَنتَصِرَانِ",
      "translation": "There will be sent upon you a flame of fire and smoke, and you will not defend yourselves.",
      "translationUr": "تم پر آگ کے شعلے اور دھواں چھوڑ دیا جائے گا تو پھر تم مقابلہ نہ کرسکو گے",
      "translationHi": "अतः तुम दोनों पर अग्नि-ज्वाला और धुएँवाला अंगारा (पिघला ताँबा) छोड़ दिया जाएगा, फिर तुम मुक़ाबला न कर सकोगे।"
    },
    {
      "number": 36,
      "arabic": "فَبِأَىِّ ءَالَآءِ رَبِّكُمَا تُكَذِّبَانِ",
      "translation": "So which of the favors of your Lord would you deny?",
      "translationUr": "تو تم اپنے پروردگار کی کون کون سی نعمت کو جھٹلاؤ گے؟",
      "translationHi": "अतः तुम दोनों अपने रब की सामर्थ्यों में से किस-किस को झुठलाओगे?"
    },
    {
      "number": 37,
      "arabic": "فَإِذَا ٱنشَقَّتِ ٱلسَّمَآءُ فَكَانَتْ وَرْدَةًۭ كَٱلدِّهَانِ",
      "translation": "And when the heaven is split open and becomes rose-colored like oil -",
      "translationUr": "پھر جب آسمان پھٹ کر تیل کی تلچھٹ کی طرح گلابی ہوجائے گا (تو) وہ کیسا ہولناک دن ہوگا",
      "translationHi": "फिर जब आकाश फट जाएगा और लाल चमड़े की तरह लाल हो जाएगा।"
    },
    {
      "number": 38,
      "arabic": "فَبِأَىِّ ءَالَآءِ رَبِّكُمَا تُكَذِّبَانِ",
      "translation": "So which of the favors of your Lord would you deny? -",
      "translationUr": "تو تم اپنے پروردگار کی کون کون سی نعمت کو جھٹلاؤ گے؟",
      "translationHi": "- अतः तुम दोनों अपने रब के चमत्कारों में से किस-किस को झुठलाओगे?"
    },
    {
      "number": 39,
      "arabic": "فَيَوْمَئِذٍۢ لَّا يُسْـَٔلُ عَن ذَنۢبِهِۦٓ إِنسٌۭ وَلَا جَآنٌّۭ",
      "translation": "Then on that Day none will be asked about his sin among men or jinn.",
      "translationUr": "اس روز نہ تو کسی انسان سے اس کے گناہوں کے بارے میں پرسش کی جائے گی اور نہ کسی جن سے",
      "translationHi": "फिर उस दिन न किसी मनुष्य से उसके गुनाह के विषय में पूछा जाएगा न किसी जिन्न से"
    },
    {
      "number": 40,
      "arabic": "فَبِأَىِّ ءَالَآءِ رَبِّكُمَا تُكَذِّبَانِ",
      "translation": "So which of the favors of your Lord would you deny?",
      "translationUr": "تو تم اپنے پروردگار کی کون کون سی نعمت کو جھٹلاؤ گے؟",
      "translationHi": "अतः तुम दोनों अपने रब के चमत्कारों में से किस-किस को झुठलाओगे?"
    },
    {
      "number": 41,
      "arabic": "يُعْرَفُ ٱلْمُجْرِمُونَ بِسِيمَٰهُمْ فَيُؤْخَذُ بِٱلنَّوَٰصِى وَٱلْأَقْدَامِ",
      "translation": "The criminals will be known by their marks, and they will be seized by the forelocks and the feet.",
      "translationUr": "گنہگار اپنے چہرے ہی سے پہچان لئے جائیں گے تو پیشانی کے بالوں اور پاؤں سے پکڑ لئے جائیں گے",
      "translationHi": "अपराधी अपने चहरों से पहचान लिए जाएँगे और उनके माथे के बालों और टाँगों द्वारा पकड़ लिया जाएगा"
    },
    {
      "number": 42,
      "arabic": "فَبِأَىِّ ءَالَآءِ رَبِّكُمَا تُكَذِّبَانِ",
      "translation": "So which of the favors of your Lord would you deny?",
      "translationUr": "تو تم اپنے پروردگار کی کون کون سی نعمت کو جھٹلاؤ گے؟",
      "translationHi": "अतः तुम दोनों अपने रब की सामर्थ्यों में से किस-किस को झुठलाओगे?"
    },
    {
      "number": 43,
      "arabic": "هَٰذِهِۦ جَهَنَّمُ ٱلَّتِى يُكَذِّبُ بِهَا ٱلْمُجْرِمُونَ",
      "translation": "This is Hell, which the criminals deny.",
      "translationUr": "یہی وہ جہنم ہے جسے گنہگار لوگ جھٹلاتے تھے",
      "translationHi": "यही वह जहन्नम है जिसे अपराधी लोग झूठ ठहराते रहे है"
    },
    {
      "number": 44,
      "arabic": "يَطُوفُونَ بَيْنَهَا وَبَيْنَ حَمِيمٍ ءَانٍۢ",
      "translation": "They will go around between it and scalding water, heated [to the utmost degree].",
      "translationUr": "وہ دوزخ اور کھولتے ہوئے گرم پانی کے درمیان گھومتے پھریں گے",
      "translationHi": "वे उनके और खौलते हुए पानी के बीच चक्कर लगा रहें होंगे"
    },
    {
      "number": 45,
      "arabic": "فَبِأَىِّ ءَالَآءِ رَبِّكُمَا تُكَذِّبَانِ",
      "translation": "So which of the favors of your Lord would you deny?",
      "translationUr": "تو تم اپنے پروردگار کی کون کون سی نعمت کو جھٹلاؤ گے؟",
      "translationHi": "फिर तुम दोनों अपने रब के सामर्थ्यों में से किस-किस को झुठलाओगे?"
    },
    {
      "number": 46,
      "arabic": "وَلِمَنْ خَافَ مَقَامَ رَبِّهِۦ جَنَّتَانِ",
      "translation": "But for he who has feared the position of his Lord are two gardens -",
      "translationUr": "اور جو شخص اپنے پروردگار کے سامنے کھڑے ہونے سے ڈرا اس کے لئے دو باغ ہیں",
      "translationHi": "किन्तु जो अपने रब के सामने खड़े होने का डर रखता होगा, उसके लिए दो बाग़ है। -"
    },
    {
      "number": 47,
      "arabic": "فَبِأَىِّ ءَالَآءِ رَبِّكُمَا تُكَذِّبَانِ",
      "translation": "So which of the favors of your Lord would you deny? -",
      "translationUr": "تو تم اپنے پروردگار کی کون کون سی نعمت کو جھٹلاؤ گے؟",
      "translationHi": "तो तुम दोनों अपने रब की अनुकम्पाओं में से किस-किस को झुठलाओगे?"
    },
    {
      "number": 48,
      "arabic": "ذَوَاتَآ أَفْنَانٍۢ",
      "translation": "Having [spreading] branches.",
      "translationUr": "ان دونوں میں بہت سی شاخیں (یعنی قسم قسم کے میووں کے درخت ہیں)",
      "translationHi": "घनी डालियोंवाले;"
    },
    {
      "number": 49,
      "arabic": "فَبِأَىِّ ءَالَآءِ رَبِّكُمَا تُكَذِّبَانِ",
      "translation": "So which of the favors of your Lord would you deny?",
      "translationUr": "تو تم اپنے پروردگار کی کون کون سی نعمت کو جھٹلاؤ گے؟",
      "translationHi": "अतः तुम दोनों अपने रब के उपकारों में से किस-किस को झुठलाओगे?"
    },
    {
      "number": 50,
      "arabic": "فِيهِمَا عَيْنَانِ تَجْرِيَانِ",
      "translation": "In both of them are two springs, flowing.",
      "translationUr": "ان میں دو چشمے بہہ رہے ہیں",
      "translationHi": "उन दोनो (बाग़ो) में दो प्रवाहित स्रोत है।"
    },
    {
      "number": 51,
      "arabic": "فَبِأَىِّ ءَالَآءِ رَبِّكُمَا تُكَذِّبَانِ",
      "translation": "So which of the favors of your Lord would you deny?",
      "translationUr": "تو تم اپنے پروردگار کی کون کون سی نعمت کو جھٹلاؤ گے؟",
      "translationHi": "अतः तुम दोनों अपने रब की अनुकम्पाओं में से किस-किस को झुठलाओगे?"
    },
    {
      "number": 52,
      "arabic": "فِيهِمَا مِن كُلِّ فَٰكِهَةٍۢ زَوْجَانِ",
      "translation": "In both of them are of every fruit, two kinds.",
      "translationUr": "ان میں سب میوے دو دو قسم کے ہیں",
      "translationHi": "उन दोनों (बाग़ो) मे हर स्वादिष्ट फल की दो-दो किस्में हैं;"
    },
    {
      "number": 53,
      "arabic": "فَبِأَىِّ ءَالَآءِ رَبِّكُمَا تُكَذِّبَانِ",
      "translation": "So which of the favors of your Lord would you deny?",
      "translationUr": "تو تم اپنے پروردگار کی کون کون سی نعمت کو جھٹلاؤ گے؟",
      "translationHi": "अतः तुम दोनो रब के चमत्कारों में से किस-किस को झुठलाओगे?"
    },
    {
      "number": 54,
      "arabic": "مُتَّكِـِٔينَ عَلَىٰ فُرُشٍۭ بَطَآئِنُهَا مِنْ إِسْتَبْرَقٍۢ ۚ وَجَنَى ٱلْجَنَّتَيْنِ دَانٍۢ",
      "translation": "[They are] reclining on beds whose linings are of silk brocade, and the fruit of the two gardens is hanging low.",
      "translationUr": "(اہل جنت) ایسے بچھونوں پر جن کے استرا طلس کے ہیں تکیہ لگائے ہوئے ہوں گے۔ اور دونوں باغوں کے میوے قریب (جھک رہے) ہیں",
      "translationHi": "वे ऐसे बिछौनो पर तकिया लगाए हुए होंगे जिनके अस्तर गाढे रेशम के होंगे, और दोनों बाग़ो के फल झुके हुए निकट ही होंगे।"
    },
    {
      "number": 55,
      "arabic": "فَبِأَىِّ ءَالَآءِ رَبِّكُمَا تُكَذِّبَانِ",
      "translation": "So which of the favors of your Lord would you deny?",
      "translationUr": "تو تم اپنے پروردگار کی کون کون سی نعمت کو جھٹلاؤ گے؟",
      "translationHi": "अतः तुम अपने रब के चमत्कारों में से किस-किस को झुठलाओगे?"
    },
    {
      "number": 56,
      "arabic": "فِيهِنَّ قَٰصِرَٰتُ ٱلطَّرْفِ لَمْ يَطْمِثْهُنَّ إِنسٌۭ قَبْلَهُمْ وَلَا جَآنٌّۭ",
      "translation": "In them are women limiting [their] glances, untouched before them by man or jinni -",
      "translationUr": "ان میں نیچی نگاہ والی عورتیں ہیں جن کو اہل جنت سے پہلے نہ کسی انسان نے ہاتھ لگایا اور نہ کسی جن نے",
      "translationHi": "उन (अनुकम्पाओं) में निगाह बचाए रखनेवाली (सुन्दर) स्त्रियाँ होंगी, जिन्हें उनसे पहले न किसी मनुष्य ने हाथ लगाया और न किसी जिन्न ने"
    },
    {
      "number": 57,
      "arabic": "فَبِأَىِّ ءَالَآءِ رَبِّكُمَا تُكَذِّبَانِ",
      "translation": "So which of the favors of your Lord would you deny? -",
      "translationUr": "تو تم اپنے پروردگار کی کون کون سی نعمت کو جھٹلاؤ گے؟",
      "translationHi": "फिर तुम दोनों अपने रब की अनुकम्पाओं में से किस-किस को झुठलाओगे?"
    },
    {
      "number": 58,
      "arabic": "كَأَنَّهُنَّ ٱلْيَاقُوتُ وَٱلْمَرْجَانُ",
      "translation": "As if they were rubies and coral.",
      "translationUr": "گویا وہ یاقوت اور مرجان ہیں",
      "translationHi": "मानो वे लाल (याकूत) और प्रवाल (मूँगा) है।"
    },
    {
      "number": 59,
      "arabic": "فَبِأَىِّ ءَالَآءِ رَبِّكُمَا تُكَذِّبَانِ",
      "translation": "So which of the favors of your Lord would you deny?",
      "translationUr": "تو تم اپنے پروردگار کی کون کون سی نعمت کو جھٹلاؤ گے؟",
      "translationHi": "अतः तुम दोनों अपने रब की अनुकम्पाओं में से किस-किस को झुठलाओगे?"
    },
    {
      "number": 60,
      "arabic": "هَلْ جَزَآءُ ٱلْإِحْسَٰنِ إِلَّا ٱلْإِحْسَٰنُ",
      "translation": "Is the reward for good [anything] but good?",
      "translationUr": "نیکی کا بدلہ نیکی کے سوا کچھ نہیں ہے",
      "translationHi": "अच्छाई का बदला अच्छाई के सिवा और क्या हो सकता है?"
    },
    {
      "number": 61,
      "arabic": "فَبِأَىِّ ءَالَآءِ رَبِّكُمَا تُكَذِّبَانِ",
      "translation": "So which of the favors of your Lord would you deny?",
      "translationUr": "تو تم اپنے پروردگار کی کون کون سی نعمت کو جھٹلاؤ گے؟",
      "translationHi": "अतः तुम दोनों अपने रब की अनुकम्पाओं में से किस-किस को झुठलाओगे?"
    },
    {
      "number": 62,
      "arabic": "وَمِن دُونِهِمَا جَنَّتَانِ",
      "translation": "And below them both [in excellence] are two [other] gardens -",
      "translationUr": "اور ان باغوں کے علاوہ دو باغ اور ہیں",
      "translationHi": "उन दोनों से हटकर दो और बाग़ है।"
    },
    {
      "number": 63,
      "arabic": "فَبِأَىِّ ءَالَآءِ رَبِّكُمَا تُكَذِّبَانِ",
      "translation": "So which of the favors of your Lord would you deny? -",
      "translationUr": "تو تم اپنے پروردگار کی کون کون سی نعمت کو جھٹلاؤ گے؟",
      "translationHi": "फिर तुम दोनों अपने रब की अनुकम्पाओं में से किस-किस को झुठलाओगे?"
    },
    {
      "number": 64,
      "arabic": "مُدْهَآمَّتَانِ",
      "translation": "Dark green [in color].",
      "translationUr": "دونوں خوب گہرے سبز",
      "translationHi": "गहरे हरित;"
    },
    {
      "number": 65,
      "arabic": "فَبِأَىِّ ءَالَآءِ رَبِّكُمَا تُكَذِّبَانِ",
      "translation": "So which of the favors of your Lord would you deny?",
      "translationUr": "تو تم اپنے پروردگار کی کون کون سی نعمت کو جھٹلاؤ گے؟",
      "translationHi": "अतः तुम दोनों अपने रब की अनुकम्पाओं में से किस-किस को झुठलाओगे?"
    },
    {
      "number": 66,
      "arabic": "فِيهِمَا عَيْنَانِ نَضَّاخَتَانِ",
      "translation": "In both of them are two springs, spouting.",
      "translationUr": "ان میں دو چشمے ابل رہے ہیں",
      "translationHi": "उन दोनों (बाग़ो) में दो स्रोत है जोश मारते हुए"
    },
    {
      "number": 67,
      "arabic": "فَبِأَىِّ ءَالَآءِ رَبِّكُمَا تُكَذِّبَانِ",
      "translation": "So which of the favors of your Lord would you deny?",
      "translationUr": "تو تم اپنے پروردگار کی کون کون سی نعمت کو جھٹلاؤ گے؟",
      "translationHi": "अतः तुम दोनों अपने रब के चमत्कारों में से किस-किस को झुठलाओगे?"
    },
    {
      "number": 68,
      "arabic": "فِيهِمَا فَٰكِهَةٌۭ وَنَخْلٌۭ وَرُمَّانٌۭ",
      "translation": "In both of them are fruit and palm trees and pomegranates.",
      "translationUr": "ان میں میوے اور کھجوریں اور انار ہیں",
      "translationHi": "उनमें है स्वादिष्ट फल और खजूर और अनार;"
    },
    {
      "number": 69,
      "arabic": "فَبِأَىِّ ءَالَآءِ رَبِّكُمَا تُكَذِّبَانِ",
      "translation": "So which of the favors of your Lord would you deny?",
      "translationUr": "تو تم اپنے پروردگار کی کون کون سی نعمت کو جھٹلاؤ گے؟",
      "translationHi": "अतः तुम दोनों अपने रब की अनुकम्पाओं में से किस-किस को झुठलाओगे?"
    },
    {
      "number": 70,
      "arabic": "فِيهِنَّ خَيْرَٰتٌ حِسَانٌۭ",
      "translation": "In them are good and beautiful women -",
      "translationUr": "ان میں نیک سیرت (اور) خوبصورت عورتیں ہیں",
      "translationHi": "उनमें भली और सुन्दर स्त्रियाँ होंगी।"
    },
    {
      "number": 71,
      "arabic": "فَبِأَىِّ ءَالَآءِ رَبِّكُمَا تُكَذِّبَانِ",
      "translation": "So which of the favors of your Lord would you deny? -",
      "translationUr": "تو تم اپنے پروردگار کی کون کون سی نعمت کو جھٹلاؤ گے؟",
      "translationHi": "तो तुम दोनों अपने रब की अनुकम्पाओं में से किस-किस को झुठलाओगे?"
    },
    {
      "number": 72,
      "arabic": "حُورٌۭ مَّقْصُورَٰتٌۭ فِى ٱلْخِيَامِ",
      "translation": "Fair ones reserved in pavilions -",
      "translationUr": "(وہ) حوریں (ہیں جو) خیموں میں مستور (ہیں)",
      "translationHi": "हूरें (परम रूपवती स्त्रियाँ) ख़ेमों में रहनेवाली;"
    },
    {
      "number": 73,
      "arabic": "فَبِأَىِّ ءَالَآءِ رَبِّكُمَا تُكَذِّبَانِ",
      "translation": "So which of the favors of your Lord would you deny? -",
      "translationUr": "تو تم اپنے پروردگار کی کون کون سی نعمت کو جھٹلاؤ گے؟",
      "translationHi": "अतः तुम दोनों अपने रब के चमत्कारों में से किस-किस को झुठलाओगे?"
    },
    {
      "number": 74,
      "arabic": "لَمْ يَطْمِثْهُنَّ إِنسٌۭ قَبْلَهُمْ وَلَا جَآنٌّۭ",
      "translation": "Untouched before them by man or jinni -",
      "translationUr": "ان کو اہل جنت سے پہلے نہ کسی انسان نے ہاتھ لگایا اور نہ کسی جن نے",
      "translationHi": "जिन्हें उससे पहले न किसी मनुष्य ने हाथ लगाया होगा और न किसी जिन्न ने।"
    },
    {
      "number": 75,
      "arabic": "فَبِأَىِّ ءَالَآءِ رَبِّكُمَا تُكَذِّبَانِ",
      "translation": "So which of the favors of your Lord would you deny? -",
      "translationUr": "تو تم اپنے پروردگار کی کون کون سی نعمت کو جھٹلاؤ گے؟",
      "translationHi": "अतः तुम दोनों अपने रब की अनुकम्पाओं में से किस-किस को झुठलाओगे?"
    },
    {
      "number": 76,
      "arabic": "مُتَّكِـِٔينَ عَلَىٰ رَفْرَفٍ خُضْرٍۢ وَعَبْقَرِىٍّ حِسَانٍۢ",
      "translation": "Reclining on green cushions and beautiful fine carpets.",
      "translationUr": "سبز قالینوں اور نفیس مسندوں پر تکیہ لگائے بیٹھے ہوں گے",
      "translationHi": "वे हरे रेशमी गद्दो और उत्कृष्ट् और असाधारण क़ालीनों पर तकिया लगाए होंगे;"
    },
    {
      "number": 77,
      "arabic": "فَبِأَىِّ ءَالَآءِ رَبِّكُمَا تُكَذِّبَانِ",
      "translation": "So which of the favors of your Lord would you deny?",
      "translationUr": "تو تم اپنے پروردگار کی کون کون سی نعمت کو جھٹلاؤ گے؟",
      "translationHi": "अतः तुम दोनों अपने रब की अनुकम्पाओं में से किस-किस को झुठला���गे?"
    },
    {
      "number": 78,
      "arabic": "تَبَٰرَكَ ٱسْمُ رَبِّكَ ذِى ٱلْجَلَٰلِ وَٱلْإِكْرَامِ",
      "translation": "Blessed is the name of your Lord, Owner of Majesty and Honor.",
      "translationUr": "(اے محمدﷺ) تمہارا پروردگار جو صاحب جلال وعظمت ہے اس کا نام بڑا بابرکت ہے",
      "translationHi": "बड़ा ही बरकतवाला नाम है तुम्हारे प्रतापवान और उदार रब का"
    }
  ],
  "67": [
    {
      "number": 1,
      "arabic": "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ تَبَٰرَكَ ٱلَّذِى بِيَدِهِ ٱلْمُلْكُ وَهُوَ عَلَىٰ كُلِّ شَىْءٍۢ قَدِيرٌ",
      "translation": "Blessed is He in whose hand is dominion, and He is over all things competent -",
      "translationUr": "وہ (خدا) جس کے ہاتھ میں بادشاہی ہے بڑی برکت والا ہے۔ اور وہ ہر چیز پر قادر ہے",
      "translationHi": "बड़ा बरकतवाला है वह जिसके हाथ में सारी बादशाही है और वह हर चीज़ की सामर्थ्य रखता है। -"
    },
    {
      "number": 2,
      "arabic": "ٱلَّذِى خَلَقَ ٱلْمَوْتَ وَٱلْحَيَوٰةَ لِيَبْلُوَكُمْ أَيُّكُمْ أَحْسَنُ عَمَلًۭا ۚ وَهُوَ ٱلْعَزِيزُ ٱلْغَفُورُ",
      "translation": "[He] who created death and life to test you [as to] which of you is best in deed - and He is the Exalted in Might, the Forgiving -",
      "translationUr": "اسی نے موت اور زندگی کو پیدا کیا تاکہ تمہاری آزمائش کرے کہ تم میں کون اچھے عمل کرتا ہے۔ اور وہ زبردست (اور) بخشنے والا ہے",
      "translationHi": "जिसने पैदा किया मृत्यु और जीवन को, ताकि तुम्हारी परीक्षा करे कि तुममें कर्म की दृष्टि से कौन सबसे अच्छा है। वह प्रभुत्वशाली, बड़ा क्षमाशील है। -"
    },
    {
      "number": 3,
      "arabic": "ٱلَّذِى خَلَقَ سَبْعَ سَمَٰوَٰتٍۢ طِبَاقًۭا ۖ مَّا تَرَىٰ فِى خَلْقِ ٱلرَّحْمَٰنِ مِن تَفَٰوُتٍۢ ۖ فَٱرْجِعِ ٱلْبَصَرَ هَلْ تَرَىٰ مِن فُطُورٍۢ",
      "translation": "[And] who created seven heavens in layers. You do not see in the creation of the Most Merciful any inconsistency. So return [your] vision [to the sky]; do you see any breaks?",
      "translationUr": "اس نے سات آسمان اوپر تلے بنائے۔ (اے دیکھنے والے) کیا تو (خدا) رحمٰن کی آفرینش میں کچھ نقص دیکھتا ہے؟ ذرا آنکھ اٹھا کر دیکھ بھلا تجھ کو (آسمان میں) کوئی شگاف نظر آتا ہے؟",
      "translationHi": "जिसने ऊपर-तले सात आकाश बनाए। तुम रहमान की रचना में कोई असंगति और विषमता न देखोगे। फिर नज़र डालो, \"क्या तुम्हें कोई बिगाड़ दिखाई देता है?\""
    },
    {
      "number": 4,
      "arabic": "ثُمَّ ٱرْجِعِ ٱلْبَصَرَ كَرَّتَيْنِ يَنقَلِبْ إِلَيْكَ ٱلْبَصَرُ خَاسِئًۭا وَهُوَ حَسِيرٌۭ",
      "translation": "Then return [your] vision twice again. [Your] vision will return to you humbled while it is fatigued.",
      "translationUr": "پھر دو بارہ (سہ بارہ) نظر کر، تو نظر (ہر بار) تیرے پاس ناکام اور تھک کر لوٹ آئے گی",
      "translationHi": "फिर दोबारा नज़र डालो। निगाह रद्द होकर और थक-हारकर तुम्हारी ओर पलट आएगी"
    },
    {
      "number": 5,
      "arabic": "وَلَقَدْ زَيَّنَّا ٱلسَّمَآءَ ٱلدُّنْيَا بِمَصَٰبِيحَ وَجَعَلْنَٰهَا رُجُومًۭا لِّلشَّيَٰطِينِ ۖ وَأَعْتَدْنَا لَهُمْ عَذَابَ ٱلسَّعِيرِ",
      "translation": "And We have certainly beautified the nearest heaven with stars and have made [from] them what is thrown at the devils and have prepared for them the punishment of the Blaze.",
      "translationUr": "اور ہم نے قریب کے آسمان کو (تاروں کے) چراغوں سے زینت دی۔ اور ان کو شیطان کے مارنے کا آلہ بنایا اور ان کے لئے دہکتی آگ کا عذاب تیار کر رکھا ہے",
      "translationHi": "हमने निकटवर्ती आकाश को दीपों से सजाया और उन्हें शैतानों के मार भगाने का साधन बनाया और उनके लिए हमने भड़कती आग की यातना तैयार कर रखी है"
    },
    {
      "number": 6,
      "arabic": "وَلِلَّذِينَ كَفَرُوا۟ بِرَبِّهِمْ عَذَابُ جَهَنَّمَ ۖ وَبِئْسَ ٱلْمَصِيرُ",
      "translation": "And for those who disbelieved in their Lord is the punishment of Hell, and wretched is the destination.",
      "translationUr": "اور جن لوگوں نے اپنے پروردگار سے انکار کیا ان کے لئے جہنم کا عذاب ہے۔ اور وہ برا ٹھکانہ ہے",
      "translationHi": "जिन लोगों ने अपने रब के साथ कुफ़्र किया उनके लिए जहन्नम की यातना है और वह बहुत ही बुरा ठिकाना है"
    },
    {
      "number": 7,
      "arabic": "إِذَآ أُلْقُوا۟ فِيهَا سَمِعُوا۟ لَهَا شَهِيقًۭا وَهِىَ تَفُورُ",
      "translation": "When they are thrown into it, they hear from it a [dreadful] inhaling while it boils up.",
      "translationUr": "جب وہ اس میں ڈالے جائیں گے تو اس کا چیخنا چلانا سنیں گے اور وہ جوش مار رہی ہوگی",
      "translationHi": "जब वे उसमें डाले जाएँगे तो उसकी दहाड़ने की भयानक आवाज़ सुनेंगे और वह प्रकोप से बिफर रही होगी।"
    },
    {
      "number": 8,
      "arabic": "تَكَادُ تَمَيَّزُ مِنَ ٱلْغَيْظِ ۖ كُلَّمَآ أُلْقِىَ فِيهَا فَوْجٌۭ سَأَلَهُمْ خَزَنَتُهَآ أَلَمْ يَأْتِكُمْ نَذِيرٌۭ",
      "translation": "It almost bursts with rage. Every time a company is thrown into it, its keepers ask them, \"Did there not come to you a warner?\"",
      "translationUr": "گویا مارے جوش کے پھٹ پڑے گی۔ جب اس میں ان کی کوئی جماعت ڈالی جائے گی تو دوزخ کے داروغہ ان سے پوچھیں گے کہ تمہارے پاس کوئی ہدایت کرنے والا نہیں آیا تھا؟",
      "translationHi": "ऐसा प्रतीत होगा कि प्रकोप के कारण अभी फट पड़ेगी। हर बार जब भी कोई समूह उसमें डाला जाएगा तो उसके कार्यकर्ता उनसे पूछेंगे, \"क्या तुम्हारे पास कोई सावधान करनेवाला नहीं आया?\""
    },
    {
      "number": 9,
      "arabic": "قَالُوا۟ بَلَىٰ قَدْ جَآءَنَا نَذِيرٌۭ فَكَذَّبْنَا وَقُلْنَا مَا نَزَّلَ ٱللَّهُ مِن شَىْءٍ إِنْ أَنتُمْ إِلَّا فِى ضَلَٰلٍۢ كَبِيرٍۢ",
      "translation": "They will say,\" Yes, a warner had come to us, but we denied and said, 'Allah has not sent down anything. You are not but in great error.'\"",
      "translationUr": "وہ کہیں گے کیوں نہیں ضرور ہدایت کرنے والا آیا تھا لیکن ہم نے اس کو جھٹلا دیا اور کہا کہ خدا نے تو کوئی چیز نازل ہی نہیں کی۔ تم تو بڑی غلطی میں (پڑے ہوئے) ہو",
      "translationHi": "वे कहेंगे, \"क्यों नहीं, अवश्य हमारे पास आया था, किन्तु हमने झुठला दिया और कहा कि अल्लाह ने कुछ भी नहीं अवतरित किया। तुम तो बस एक बड़ी गुमराही में पड़े हुए हो।\""
    },
    {
      "number": 10,
      "arabic": "وَقَالُوا۟ لَوْ كُنَّا نَسْمَعُ أَوْ نَعْقِلُ مَا كُنَّا فِىٓ أَصْحَٰبِ ٱلسَّعِيرِ",
      "translation": "And they will say, \"If only we had been listening or reasoning, we would not be among the companions of the Blaze.\"",
      "translationUr": "اور کہیں گے اگر ہم سنتے یا سمجھتے ہوتے تو دوزخیوں میں نہ ہوتے",
      "translationHi": "और वे कहेंगे, \"यदि हम सुनते या बुद्धि से काम लेते तो हम दहकती आग में पड़नेवालों में सम्मिलित न होते।\""
    },
    {
      "number": 11,
      "arabic": "فَٱعْتَرَفُوا۟ بِذَنۢبِهِمْ فَسُحْقًۭا لِّأَصْحَٰبِ ٱلسَّعِيرِ",
      "translation": "And they will admit their sin, so [it is] alienation for the companions of the Blaze.",
      "translationUr": "پس وہ اپنے گناہ کا اقرار کرلیں گے۔ سو دوزخیوں کے لئے (رحمت خدا سے) دور ہی ہے",
      "translationHi": "इस प्रकार वे अपने गुनाहों को स्वीकार करेंगे, तो धिक्कार हो दहकती आगवालों पर!"
    },
    {
      "number": 12,
      "arabic": "إِنَّ ٱلَّذِينَ يَخْشَوْنَ رَبَّهُم بِٱلْغَيْبِ لَهُم مَّغْفِرَةٌۭ وَأَجْرٌۭ كَبِيرٌۭ",
      "translation": "Indeed, those who fear their Lord unseen will have forgiveness and great reward.",
      "translationUr": "(اور) جو لوگ بن دیکھے اپنے پروردگار سے ڈرتے ہیں ان کے لئے بخشش اور اجر عظیم ہے",
      "translationHi": "जो लोग परोक्ष में रहते हुए अपने रब से डरते है, उनके लिए क्षमा और बड़ा बदला है"
    },
    {
      "number": 13,
      "arabic": "وَأَسِرُّوا۟ قَوْلَكُمْ أَوِ ٱجْهَرُوا۟ بِهِۦٓ ۖ إِنَّهُۥ عَلِيمٌۢ بِذَاتِ ٱلصُّدُورِ",
      "translation": "And conceal your speech or publicize it; indeed, He is Knowing of that within the breasts.",
      "translationUr": "اور تم (لوگ) بات پوشیدہ کہو یا ظاہر۔ وہ دل کے بھیدوں تک سے واقف ہے",
      "translationHi": "तुम अपनी बात छिपाओ या उसे व्यक्त करो, वह तो सीनों में छिपी बातों तक को जानता है"
    },
    {
      "number": 14,
      "arabic": "أَلَا يَعْلَمُ مَنْ خَلَقَ وَهُوَ ٱللَّطِيفُ ٱلْخَبِيرُ",
      "translation": "Does He who created not know, while He is the Subtle, the Acquainted?",
      "translationUr": "بھلا جس نے پیدا کیا وہ بےخبر ہے؟ وہ تو پوشیدہ باتوں کا جاننے والا اور (ہر چیز سے) آگاہ ہے",
      "translationHi": "क्या वह नहीं ज��नेगा जिसने पैदा किया? वह सूक्ष्मदर्शी, ख़बर रखनेवाला है"
    },
    {
      "number": 15,
      "arabic": "هُوَ ٱلَّذِى جَعَلَ لَكُمُ ٱلْأَرْضَ ذَلُولًۭا فَٱمْشُوا۟ فِى مَنَاكِبِهَا وَكُلُوا۟ مِن رِّزْقِهِۦ ۖ وَإِلَيْهِ ٱلنُّشُورُ",
      "translation": "It is He who made the earth tame for you - so walk among its slopes and eat of His provision - and to Him is the resurrection.",
      "translationUr": "وہی تو ہے جس نے تمہارے لئے زمین کو نرم کیا تو اس کی راہوں میں چلو پھرو اور خدا کا (دیا ہو) رزق کھاؤ اور تم کو اسی کے پاس (قبروں سے) نکل کر جانا ہے",
      "translationHi": "वही तो है जिसने तुम्हारे लिए धरती को वशीभूत किया। अतः तुम उसके (धरती के) कन्धों पर चलो और उसकी रोज़ी में से खाओ, उसी की ओर दोबारा उठकर (जीवित होकर) जाना है"
    },
    {
      "number": 16,
      "arabic": "ءَأَمِنتُم مَّن فِى ٱلسَّمَآءِ أَن يَخْسِفَ بِكُمُ ٱلْأَرْضَ فَإِذَا هِىَ تَمُورُ",
      "translation": "Do you feel secure that He who [holds authority] in the heaven would not cause the earth to swallow you and suddenly it would sway?",
      "translationUr": "کیا تم اس سے جو آسمان میں ہے بےخوف ہو کہ تم کو زمین میں دھنسا دے اور وہ اس وقت حرکت کرنے لگے",
      "translationHi": "क्या तुम उससे निश्चिन्त हो जो आकाश में है कि तुम्हें धरती में धँसा दे, फिर क्या देखोगे कि वह डाँवाडोल हो रही है?"
    },
    {
      "number": 17,
      "arabic": "أَمْ أَمِنتُم مَّن فِى ٱلسَّمَآءِ أَن يُرْسِلَ عَلَيْكُمْ حَاصِبًۭا ۖ فَسَتَعْلَمُونَ كَيْفَ نَذِيرِ",
      "translation": "Or do you feel secure that He who [holds authority] in the heaven would not send against you a storm of stones? Then you would know how [severe] was My warning.",
      "translationUr": "کیا تم اس سے جو آسمان میں ہے نڈر ہو کہ تم پر کنکر بھری ہوا چھوڑ دے۔ سو تم عنقریب جان لو گے کہ میرا ڈرانا کیسا ہے",
      "translationHi": "या तुम उससे निश्चिन्त हो जो आकाश में है कि वह तुमपर पथराव करनेवाली वायु भेज दे? फिर तुम जान लोगे कि मेरी चेतावनी कैसी होती है"
    },
    {
      "number": 18,
      "arabic": "وَلَقَدْ كَذَّبَ ٱلَّذِينَ مِن قَبْلِهِمْ فَكَيْفَ كَانَ نَكِيرِ",
      "translation": "And already had those before them denied, and how [terrible] was My reproach.",
      "translationUr": "اور جو لوگ ان سے پہلے تھے انہوں نے بھی جھٹلایا تھا سو (دیکھ لو کہ) میرا کیسا عذاب ہوا",
      "translationHi": "उन लोगों ने भी झुठलाया जो उनसे पहले थे, फिर कैसा रहा मेरा इनकार!"
    },
    {
      "number": 19,
      "arabic": "أَوَلَمْ يَرَوْا۟ إِلَى ٱلطَّيْرِ فَوْقَهُمْ صَٰٓفَّٰتٍۢ وَيَقْبِضْنَ ۚ مَا يُمْسِكُهُنَّ إِلَّا ٱلرَّحْمَٰنُ ۚ إِنَّهُۥ بِكُلِّ شَىْءٍۭ بَصِيرٌ",
      "translation": "Do they not see the birds above them with wings outspread and [sometimes] folded in? None holds them [aloft] except the Most Merciful. Indeed He is, of all things, Seeing.",
      "translationUr": "کیا انہوں نے اپنے سروں پر اڑتے ہوئے جانوروں کو نہیں دیکھا جو پروں کو پھیلائے رہتے ہیں اور ان کو سکیڑ بھی لیتے ہیں۔ خدا کے سوا انہیں کوئی تھام نہیں سکتا۔ بےشک وہ ہر چیز کو دیکھ رہا ہے",
      "translationHi": "क्या उन्होंने अपने ऊपर पक्षियों को पंक्तबन्द्ध पंख फैलाए और उन्हें समेटते नहीं देखा? उन्हें रहमान के सिवा कोई और नहीं थामें रहता। निश्चय ही वह हर चीज़ को देखता है"
    },
    {
      "number": 20,
      "arabic": "أَمَّنْ هَٰذَا ٱلَّذِى هُوَ جُندٌۭ لَّكُمْ يَنصُرُكُم مِّن دُونِ ٱلرَّحْمَٰنِ ۚ إِنِ ٱلْكَٰفِرُونَ إِلَّا فِى غُرُورٍ",
      "translation": "Or who is it that could be an army for you to aid you other than the Most Merciful? The disbelievers are not but in delusion.",
      "translationUr": "بھلا ایسا کون ہے جو تمہاری فوج ہو کر خدا کے سوا تمہاری مدد کرسکے۔ کافر تو دھوکے میں ہیں",
      "translationHi": "या वह कौन है जो तुम्हारी सेना बनकर रहमान के मुक़ाबले में तुम्हारी सहायता करे। इनकार करनेवाले तो बस धोखे में पड़े हुए है"
    },
    {
      "number": 21,
      "arabic": "أَمَّنْ هَٰذَا ٱلَّذِى يَرْزُقُكُمْ إِنْ أَمْسَكَ رِزْقَهُۥ ۚ بَل لَّجُّوا۟ فِى عُتُوٍّۢ وَنُفُورٍ",
      "translation": "Or who is it that could provide for you if He withheld His provision? But they have persisted in insolence and aversion.",
      "translationUr": "بھلا اگر وہ اپنا رزق بند کرلے تو کون ہے جو تم کو رزق دے؟ لیکن یہ سرکشی اور نفرت میں پھنسے ہوئے ہیں",
      "translationHi": "या वह कौन है जो तुम्हें रोज़ी दे, यदि वह अपनी रोज़ी रोक ले? नहीं, बल्कि वे तो सरकशी और नफ़रत ही पर अड़े हुए है"
    },
    {
      "number": 22,
      "arabic": "أَفَمَن يَمْشِى مُكِبًّا عَلَىٰ وَجْهِهِۦٓ أَهْدَىٰٓ أَمَّن يَمْشِى سَوِيًّا عَلَىٰ صِرَٰطٍۢ مُّسْتَقِيمٍۢ",
      "translation": "Then is one who walks fallen on his face better guided or one who walks erect on a straight path?",
      "translationUr": "بھلا جو شخص چلتا ہوا منہ کے بل گر پڑتا ہے وہ سیدھے رستے پر ہے یا وہ جو سیدھے رستے پر برابر چل رہا ہو؟",
      "translationHi": "तो क्या वह व्यक्ति जो अपने मुँह के बल औंधा चलता हो वह अधिक सीधे मार्ग पर ह या वह जो सीधा होकर सीधे मार्ग पर चल रहा है?"
    },
    {
      "number": 23,
      "arabic": "قُلْ هُوَ ٱلَّذِىٓ أَنشَأَكُمْ وَجَعَلَ لَكُمُ ٱلسَّمْعَ وَٱلْأَبْصَٰرَ وَٱلْأَفْـِٔدَةَ ۖ قَلِيلًۭا مَّا تَشْكُرُونَ",
      "translation": "Say, \"It is He who has produced you and made for you hearing and vision and hearts; little are you grateful.\"",
      "translationUr": "کہو وہ خدا ہی تو ہے جس نے تم کو پیدا کیا۔ اور تمہارے کان اور آنکھیں اور دل بنائے (مگر) تم کم احسان مانتے ہو",
      "translationHi": "कह दो, \"वही है जिसने तुम्हें पैदा किया और तुम्हारे लिए कान और आँखे और दिल बनाए। तुम कृतज्ञता थोड़े ही दिखाते हो।\""
    },
    {
      "number": 24,
      "arabic": "قُلْ هُوَ ٱلَّذِى ذَرَأَكُمْ فِى ٱلْأَرْضِ وَإِلَيْهِ تُحْشَرُونَ",
      "translation": "Say, \"It is He who has multiplied you throughout the earth, and to Him you will be gathered.\"",
      "translationUr": "کہہ دو کہ وہی ہے جس نے تم کو زمین میں پھیلایا اور اسی کے روبرو تم جمع کئے جاؤ گے",
      "translationHi": "कह दो, \"वही है जिसने तुम्हें धरती में फैलाया और उसी की ओर तुम एकत्र किए जा रहे हो।\""
    },
    {
      "number": 25,
      "arabic": "وَيَقُولُونَ مَتَىٰ هَٰذَا ٱلْوَعْدُ إِن كُنتُمْ صَٰدِقِينَ",
      "translation": "And they say, \"When is this promise, if you should be truthful?\"",
      "translationUr": "اور کافر کہتے ہیں کہ اگر تم سچے ہو تو یہ وعید کب (پورا) ہوگا؟",
      "translationHi": "वे कहते है, \"यदि तुम सच्चे हो तो यह वादा कब पूरा होगा?\""
    },
    {
      "number": 26,
      "arabic": "قُلْ إِنَّمَا ٱلْعِلْمُ عِندَ ٱللَّهِ وَإِنَّمَآ أَنَا۠ نَذِيرٌۭ مُّبِينٌۭ",
      "translation": "Say, \"The knowledge is only with Allah, and I am only a clear warner.\"",
      "translationUr": "کہہ دو اس کا علم خدا ہی کو ہے۔ اور میں تو کھول کھول کر ڈر سنانے دینے والا ہوں",
      "translationHi": "कह दो, \"इसका ज्ञान तो बस अल्लाह ही के पास है और मैं तो एक स्पष्ट॥ सचेत करनेवाला हूँ।\""
    },
    {
      "number": 27,
      "arabic": "فَلَمَّا رَأَوْهُ زُلْفَةًۭ سِيٓـَٔتْ وُجُوهُ ٱلَّذِينَ كَفَرُوا۟ وَقِيلَ هَٰذَا ٱلَّذِى كُنتُم بِهِۦ تَدَّعُونَ",
      "translation": "But when they see it approaching, the faces of those who disbelieve will be distressed, and it will be said, \"This is that for which you used to call.\"",
      "translationUr": "سو جب وہ دیکھ لیں گے کہ وہ (وعدہ) قریب آگیا تو کافروں کے منہ برے ہوجائیں گے اور (ان سے) کہا جائے گا کہ یہ وہی ہے جس کے تم خواستگار تھے",
      "translationHi": "फिर जब वे उसे निकट देखेंगे तो उन लो��ों के चेहरे बिगड़ जाएँगे जिन्होंने इनकार की नीति अपनाई; और कहा जाएगा, \"यही है वह चीज़ जिसकी तुम माँग कर रहे थे।\""
    },
    {
      "number": 28,
      "arabic": "قُلْ أَرَءَيْتُمْ إِنْ أَهْلَكَنِىَ ٱللَّهُ وَمَن مَّعِىَ أَوْ رَحِمَنَا فَمَن يُجِيرُ ٱلْكَٰفِرِينَ مِنْ عَذَابٍ أَلِيمٍۢ",
      "translation": "Say, [O Muhammad], \"Have you considered: whether Allah should cause my death and those with me or have mercy upon us, who can protect the disbelievers from a painful punishment?\"",
      "translationUr": "کہو کہ بھلا دیکھو تو اگر خدا مجھ کو اور میرے ساتھیوں کو ہلاک کردے یا ہم پر مہربانی کرے۔ تو کون ہے کافروں کو دکھ دینے والے عذاب سے پناہ دے؟",
      "translationHi": "कहो, \"क्या तुमने यह भी सोचा कि यदि अल्लाह मुझे और उन्हें भी, जो मेरे साथ है, विनष्ट ही कर दे या वह हम पर दया करे, आख़िर इनकार करनेवालों को दुखद यातना से कौन पनाह देगा?\""
    },
    {
      "number": 29,
      "arabic": "قُلْ هُوَ ٱلرَّحْمَٰنُ ءَامَنَّا بِهِۦ وَعَلَيْهِ تَوَكَّلْنَا ۖ فَسَتَعْلَمُونَ مَنْ هُوَ فِى ضَلَٰلٍۢ مُّبِينٍۢ",
      "translation": "Say, \"He is the Most Merciful; we have believed in Him, and upon Him we have relied. And you will [come to] know who it is that is in clear error.\"",
      "translationUr": "کہہ دو کہ وہ جو (خدائے) رحمٰن (ہے) ہم اسی پر ایمان لائے اور اسی پر بھروسا رکھتے ہیں۔ تم کو جلد معلوم ہوجائے گا کہ صریح گمراہی میں کون پڑ رہا تھا",
      "translationHi": "कह दो, \"वह रहमान है। उसी पर हम ईमान लाए है और उसी पर हमने भरोसा किया। तो शीघ्र ही तुम्हें मालूम हो जाएगा कि खुली गुमराही में कौन पड़ा हुआ है।\""
    },
    {
      "number": 30,
      "arabic": "قُلْ أَرَءَيْتُمْ إِنْ أَصْبَحَ مَآؤُكُمْ غَوْرًۭا فَمَن يَأْتِيكُم بِمَآءٍۢ مَّعِينٍۭ",
      "translation": "Say, \"Have you considered: if your water was to become sunken [into the earth], then who could bring you flowing water?\"",
      "translationUr": "کہو کہ بھلا دیکھو تو اگر تمہارا پانی (جو تم پیتے ہو اور برتے ہو) خشک ہوجائے تو (خدا کے) سوا کون ہے جو تمہارے لئے شیریں پانی کا چشمہ بہا لائے",
      "translationHi": "कहो, \"क्या तुमने यह भी सोचा कि यदि तुम्हारा पानी (धरती में) नीचे उतर जाए तो फिर कौन तुम्हें लाकर देगा निर्मल प्रवाहित जल?\""
    }
  ],
  "108": [
    {
      "number": 1,
      "arabic": "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ إِنَّآ أَعْطَيْنَٰكَ ٱلْكَوْثَرَ",
      "translation": "Indeed, We have granted you, [O Muhammad], al-Kawthar.",
      "translationUr": "(اے محمدﷺ) ہم نے تم کو کوثر عطا فرمائی ہے",
      "translationHi": "निश्चय ही हमने तुम्हें कौसर प्रदान किया,"
    },
    {
      "number": 2,
      "arabic": "فَصَلِّ لِرَبِّكَ وَٱنْحَرْ",
      "translation": "So pray to your Lord and sacrifice [to Him alone].",
      "translationUr": "تو اپنے پروردگار کے لیے نماز پڑھا کرو اور قربانی دیا کرو",
      "translationHi": "अतः तुम अपने रब ही के लिए नमाज़ पढ़ो और (उसी के दिन) क़़ुरबानी करो"
    },
    {
      "number": 3,
      "arabic": "إِنَّ شَانِئَكَ هُوَ ٱلْأَبْتَرُ",
      "translation": "Indeed, your enemy is the one cut off.",
      "translationUr": "کچھ شک نہیں کہ تمہارا دشمن ہی بےاولاد رہے گا",
      "translationHi": "निस्संदेह तुम्हारा जो वैरी है वही जड़कटा है"
    }
  ],
  "110": [
    {
      "number": 1,
      "arabic": "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ إِذَا جَآءَ نَصْرُ ٱللَّهِ وَٱلْفَتْحُ",
      "translation": "When the victory of Allah has come and the conquest,",
      "translationUr": "جب خدا کی مدد آ پہنچی اور فتح (حاصل ہو گئی)",
      "translationHi": "जब अल्लाह की सहायता आ जाए और विजय प्राप्त हो,"
    },
    {
      "number": 2,
      "arabic": "وَرَأَيْتَ ٱلنَّاسَ يَدْخُلُونَ فِى دِينِ ٱللَّهِ أَفْوَاجًۭا",
      "translation": "And you see the people entering into the religion of Allah in multitudes,",
      "translationUr": "اور تم نے دیکھ لیا کہ لوگ غول کے غول خدا کے دین میں داخل ہو رہے ہیں",
      "translationHi": "और तुम लोगों को देखो कि वे अल्लाह के दीन (धर्म) में गिरोह के गिरोह प्रवेश कर रहे है,"
    },
    {
      "number": 3,
      "arabic": "فَسَبِّحْ بِحَمْدِ رَبِّكَ وَٱسْتَغْفِرْهُ ۚ إِنَّهُۥ كَانَ تَوَّابًۢا",
      "translation": "Then exalt [Him] with praise of your Lord and ask forgiveness of Him. Indeed, He is ever Accepting of repentance.",
      "translationUr": "تو اپنے پروردگار کی تعریف کے ساتھ تسبیح کرو اور اس سے مغفرت مانگو، بے شک وہ معاف کرنے والا ہے",
      "translationHi": "तो अपने रब की प्रशंसा करो और उससे क्षमा चाहो। निस्संदेह वह बड़ा तौबा क़बूल करनेवाला है"
    }
  ],
  "112": [
    {
      "number": 1,
      "arabic": "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ قُلْ هُوَ ٱللَّهُ أَحَدٌ",
      "translation": "Say, \"He is Allah, [who is] One,",
      "translationUr": "کہو کہ وہ (ذات پاک جس کا نام) الله (ہے) ایک ہے",
      "translationHi": "कहो, \"वह अल्लाह यकता है,"
    },
    {
      "number": 2,
      "arabic": "ٱللَّهُ ٱلصَّمَدُ",
      "translation": "Allah, the Eternal Refuge.",
      "translationUr": "معبود برحق جو بےنیاز ہے",
      "translationHi": "अल्लाह निरपेक्ष (और सर्वाधार) है,"
    },
    {
      "number": 3,
      "arabic": "لَمْ يَلِدْ وَلَمْ يُولَدْ",
      "translation": "He neither begets nor is born,",
      "translationUr": "نہ کسی کا باپ ہے اور نہ کسی کا بیٹا",
      "translationHi": "न वह जनिता है और न जन्य,"
    },
    {
      "number": 4,
      "arabic": "وَلَمْ يَكُن لَّهُۥ كُفُوًا أَحَدٌۢ",
      "translation": "Nor is there to Him any equivalent.\"",
      "translationUr": "اور کوئی اس کا ہمسر نہیں",
      "translationHi": "और न कोई उसका समकक्ष है।\""
    }
  ],
  "113": [
    {
      "number": 1,
      "arabic": "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ قُلْ أَعُوذُ بِرَبِّ ٱلْفَلَقِ",
      "translation": "Say, \"I seek refuge in the Lord of daybreak",
      "translationUr": "کہو کہ میں صبح کے پروردگار کی پناہ مانگتا ہوں",
      "translationHi": "कहो, \"मैं शरण लेता हूँ, प्रकट करनेवाले रब की,"
    },
    {
      "number": 2,
      "arabic": "مِن شَرِّ مَا خَلَقَ",
      "translation": "From the evil of that which He created",
      "translationUr": "ہر چیز کی بدی سے جو اس نے پیدا کی",
      "translationHi": "जो कुछ भी उसने पैदा किया उसकी बुराई से,"
    },
    {
      "number": 3,
      "arabic": "وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ",
      "translation": "And from the evil of darkness when it settles",
      "translationUr": "اور شب تاریکی کی برائی سے جب اس کااندھیرا چھا جائے",
      "translationHi": "और अँधेरे की बुराई से जबकि वह घुस आए,"
    },
    {
      "number": 4,
      "arabic": "وَمِن شَرِّ ٱلنَّف��َٰثَٰتِ فِى ٱلْعُقَدِ",
      "translation": "And from the evil of the blowers in knots",
      "translationUr": "اور گنڈوں پر (پڑھ پڑھ کر) پھونکنے والیوں کی برائی سے",
      "translationHi": "और गाँठो में फूँक मारने-वालों की बुराई से,"
    },
    {
      "number": 5,
      "arabic": "وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ",
      "translation": "And from the evil of an envier when he envies.\"",
      "translationUr": "اور حسد کرنے والے کی برائی سے جب حسد کرنے لگے",
      "translationHi": "और ईर्ष्यालु की बुराई से, जब वह ईर्ष्या करे।\""
    }
  ],
  "114": [
    {
      "number": 1,
      "arabic": "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ قُلْ أَعُوذُ بِرَبِّ ٱلنَّاسِ",
      "translation": "Say, \"I seek refuge in the Lord of mankind,",
      "translationUr": "کہو کہ میں لوگوں کے پروردگار کی پناہ مانگتا ہوں",
      "translationHi": "कहो, \"मैं शरण लेता हूँ मनुष्यों के रब की"
    },
    {
      "number": 2,
      "arabic": "مَلِكِ ٱلنَّاسِ",
      "translation": "The Sovereign of mankind.",
      "translationUr": "(یعنی) لوگوں کے حقیقی بادشاہ کی",
      "translationHi": "मनुष्यों के सम्राट की"
    },
    {
      "number": 3,
      "arabic": "إِلَٰهِ ٱلنَّاسِ",
      "translation": "The God of mankind,",
      "translationUr": "لوگوں کے معبود برحق کی",
      "translationHi": "मनुष्यों के उपास्य की"
    },
    {
      "number": 4,
      "arabic": "مِن شَرِّ ٱلْوَسْوَاسِ ٱلْخَنَّاسِ",
      "translation": "From the evil of the retreating whisperer -",
      "translationUr": "(شیطان) وسوسہ انداز کی برائی سے جو (خدا کا نام سن کر) پیچھے ہٹ جاتا ہے",
      "translationHi": "वसवसा डालनेवाले, खिसक जानेवाले की बुराई से"
    },
    {
      "number": 5,
      "arabic": "ٱلَّذِى يُوَسْوِسُ فِى صُدُورِ ٱلنَّاسِ",
      "translation": "Who whispers [evil] into the breasts of mankind -",
      "translationUr": "جو لوگوں کے دلوں میں وسوسے ڈالتا ہے",
      "translationHi": "जो मनुष्यों के सीनों में वसवसा डालता हैं"
    },
    {
      "number": 6,
      "arabic": "مِنَ ٱلْجِنَّةِ وَٱلنَّاسِ",
      "translation": "From among the jinn and mankind.\"",
      "translationUr": "وہ جنّات میں سے (ہو) یا انسانوں میں سے",
      "translationHi": "जो जिन्नों में से भी होता हैं और मनुष्यों में से भी"
    }
  ]
};

// In-memory runtime cache for dynamically loaded surahs
const memoryCache: Record<number, AyahItem[]> = {};

/**
 * Fetch full verses for any of the 114 Surahs with Arabic, English, Urdu, and Hindi.
 * Falls back to offline embedded databank, localStorage, or reliable Quran CDN.
 */
export async function fetchSurahVerses(surahNumber: number): Promise<AyahItem[]> {
  // 1. Check in-memory cache
  if (memoryCache[surahNumber] && memoryCache[surahNumber].length > 0) {
    return memoryCache[surahNumber];
  }

  // 2. Check embedded offline databank
  if (AYAH_DATABANK[surahNumber] && AYAH_DATABANK[surahNumber].length > 0) {
    memoryCache[surahNumber] = AYAH_DATABANK[surahNumber];
    return AYAH_DATABANK[surahNumber];
  }

  // 3. Check browser localStorage
  if (typeof window !== 'undefined') {
    try {
      const cached = localStorage.getItem(`@noor_surah_v2_${surahNumber}`);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0) {
          memoryCache[surahNumber] = parsed;
          return parsed;
        }
      }
    } catch {}
  }

  // 4. Fetch complete multi-edition data from API
  try {
    const res = await fetch(
      `https://api.alquran.cloud/v1/surah/${surahNumber}/editions/quran-uthmani,en.sahih,ur.jalandhry,hi.farooq`
    );
    if (!res.ok) throw new Error('API returned non-200');
    const json = await res.json();
    if (json.code === 200 && Array.isArray(json.data) && json.data[0]?.ayahs) {
      const uthmani = json.data[0].ayahs;
      const en = json.data[1]?.ayahs || [];
      const ur = json.data[2]?.ayahs || [];
      const hi = json.data[3]?.ayahs || [];

      const combined: AyahItem[] = uthmani.map((a: any, i: number) => ({
        number: a.numberInSurah,
        arabic: a.text,
        translation: en[i]?.text || '',
        translationUr: ur[i]?.text || '',
        translationHi: hi[i]?.text || ''
      }));

      memoryCache[surahNumber] = combined;
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem(`@noor_surah_v2_${surahNumber}`, JSON.stringify(combined));
        } catch {}
      }
      return combined;
    }
  } catch (err) {
    console.warn(`Failed fetching Surah ${surahNumber} from remote CDN:`, err);
  }

  // 5. Safe fallback if completely offline and not prefetched
  const sInfo = SURAHS_LIST.find(s => s.number === surahNumber);
  const fallbackList: AyahItem[] = Array.from({ length: sInfo?.numberOfAyahs || 1 }).map((_, idx) => ({
    number: idx + 1,
    arabic: idx === 0 ? 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ' : `آية ${idx + 1}`,
    translation: idx === 0 ? 'In the name of Allah, the Entirely Merciful, the Especially Merciful.' : `Verse ${idx + 1}`,
    translationUr: idx === 0 ? 'اللہ کے نام سے جو رحمان و رحیم ہے۔' : `آیت ${idx + 1}`,
    translationHi: idx === 0 ? 'अल्लाह के नाम से जो बड़ा कृपालु, अत्यंत दयावान है।' : `आयत ${idx + 1}`
  }));
  return fallbackList;
}

export const FEATURED_AYAH = {
  surahNumber: 2,
  ayahNumber: 255,
  surahName: 'Al-Baqarah',
  arabicName: 'البقرة',
  arabic: 'اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ ۗ مَن ذَا الَّذِي يَشْفَعُ عِندَهُ إِلَّا بِإِذْنِهِ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۖ وَلَا يُحِيطُونَ بِشَيْءٍ مِّنْ عِلْمِهِ إِلَّا بِمَا شَاءَ ۚ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ ۖ وَلَا يَئُودُهُ حِفْظُهُمَا ۚ وَهُوَ الْعَلِيُّ الْعَظِيمُ',
  transliteration: 'Allahu la ilaha illa Huwa, Al-Hayyul-Qayyum. La ta\'khudhuhu sinatun wa la nawm. Lahu ma fis-samawati wa ma fil-ard. Man dhal-ladhi yashfa\'u \'indahu illa bi-idhnih. Ya\'lamu ma bayna aydihim wa ma khalfahum, wa la yuhituna bi-shay\'im-min \'ilmihi illa bima sha\'. Wasi\'a kursiyyuhus-samawati wal-ard, wa la ya\'uduhu hifzuhuma, wa Huwal-\'Aliyyul-\'Azeem.',
  translationEn: 'Allah! There is no deity except Him, the Ever-Living, the Sustainer of all existence. Neither drowsiness overtakes Him nor sleep. To Him belongs whatever is in the heavens and whatever is on the earth. Who is it that can intercede with Him except by His permission? He knows what is before them and what will be after them, and they encompass not a thing of His knowledge except for what He wills. His Kursi extends over the heavens and the earth, and their preservation tires Him not. And He is the Most High, the Most Great.',
  translationUr: 'اللہ، اس کے سوا کوئی عبادت کے لائق نہیں، وہ زندہ ہے سب کا تھامنے والا، نہ اس کو اونگھ آتی ہے نہ نیند، جو کچھ آسمانوں میں اور جو کچھ زمین میں ہے سب اسی کا ہے۔',
  translationHi: 'अल्लाह! उसके सिवा कोई पूज्य नहीं, वह सदैव जीवित और सब का थामने वाला है। न उसे ऊंघ आती है और न नींद। जो कुछ आकाशों में है और जो कुछ धरती में है, सब उसी का है। कौन है जो उसकी अनुमति के बिना उसके समक्ष सिफारिश कर सके? वह जानता है जो कुछ उनके सामने है और जो उनके पीछे है, और वे उसके ज्ञान में से किसी चीज़ को अपने नियंत्रण में नहीं ले सकते सिवाय इसके जो वह चाहे। उसकी बादशाही (कुर्सी) आकाशों और धरती को घेरे हुए है, और उन दोनों की सुरक्षा उसे थकाती नहीं। वह सर्वोच्च, महान है।',
  reference: 'Surah Al-Baqarah 2:255 (Ayat al-Kursi)',
  audioUrl: 'https://everyayah.com/data/Alafasy_128kbps/002255.mp3'
};
