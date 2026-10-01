// ============================================================
// NOOR — Duas & Adhkar Library (Dart)
// Complete authentic daily supplications, target counts & virtues
// ============================================================

class DuaItem {
  final String id;
  final String category;
  final String title;
  final String? titleHi;
  final String? titleUr;
  final String arabic;
  final String transliteration;
  final String translation;
  final String? translationHi;
  final String? translationUr;
  final String source;
  final int targetCount;
  final String virtue;

  const DuaItem({
    required this.id,
    required this.category,
    required this.title,
    this.titleHi,
    this.titleUr,
    required this.arabic,
    required this.transliteration,
    required this.translation,
    this.translationHi,
    this.translationUr,
    required this.source,
    required this.targetCount,
    required this.virtue,
  });
}

class DuaCategory {
  final String id;
  final String name;
  final String icon;

  const DuaCategory({required this.id, required this.name, required this.icon});
}

const List<DuaCategory> kDuaCategories = [
  DuaCategory(id: 'all', name: 'All Duas', icon: '🤲'),
  DuaCategory(id: 'morning', name: 'Morning Adhkar', icon: '🌅'),
  DuaCategory(id: 'evening', name: 'Evening Adhkar', icon: '🌇'),
  DuaCategory(id: 'sleep', name: 'Before Sleep', icon: '🌙'),
  DuaCategory(id: 'protection', name: 'Protection', icon: '⚡'),
  DuaCategory(id: 'forgiveness', name: 'Forgiveness', icon: '📿'),
  DuaCategory(id: 'travel', name: 'Travel & Safar', icon: '✈️'),
  DuaCategory(id: 'rizq', name: 'Rizq & Wealth', icon: '💰'),
  DuaCategory(id: 'hardship', name: 'Hardship & Relief', icon: '🛡️'),
  DuaCategory(id: 'parents', name: 'Parents & Family', icon: '🤍'),
  DuaCategory(id: 'gratitude', name: 'Gratitude (Shukr)', icon: '✨'),
];

const List<DuaItem> kDuasList = [
  DuaItem(
    id: 'dua-morning-1',
    category: 'morning',
    title: 'Morning Adhkar: Praise of Allah upon Waking',
    titleUr: 'صبح کے اذکار: بیدار ہونے پر اللہ کی حمد',
    titleHi: 'सुबह के अज़कार: जागने पर अल्लाह की हम्द',
    arabic: 'أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ',
    transliteration: 'Asbahna wa-asbahal-mulku lillah, wal-hamdu lillah, la ilaha illallahu wahdahu la shareeka lah, lahul-mulku wa lahul-hamdu wa huwa \'ala kulli shay\'in qadeer.',
    translation: 'We have entered the morning and the dominion belongs to Allah, all praise is due to Allah. None has the right to be worshipped except Allah alone, without partner. To Him belongs the dominion and to Him belongs all praise, and He is over all things competent.',
    translationUr: 'ہم نے صبح کی اور اللہ کے ملک نے صبح کی، اور تمام تعریفیں اللہ ہی کے لیے ہیں۔ اللہ کے سوا کوئی معبود نہیں، وہ اکیلا ہے، اس کا کوئی شریک نہیں۔',
    source: 'Sahih Muslim 2723, Hisn al-Muslim',
    targetCount: 1,
    virtue: 'Recited upon dawn for spiritual protection and divine presence throughout the day.',
  ),
  DuaItem(
    id: 'dua-sayyidul-istighfar',
    category: 'forgiveness',
    title: 'Sayyidul Istighfar (Chief of Prayers for Forgiveness)',
    titleUr: 'سید الاستغفار: توبہ کی سب سے افضل ترین دعا',
    titleHi: 'सय्यिदुल इस्तिग़फ़ार: क्षमा की सर्वश्रेष्ठ प्रार्थना',
    arabic: 'اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ، وَأَبُوءُ بِذَنْبِي فَاغْفِرْ لِي فَإِنَّهُ لَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ',
    transliteration: 'Allahumma Anta Rabbi la ilaha illa Anta, khalaqtani wa ana \'abduka, wa ana \'ala \'ahdika wa wa\'dika mastata\'tu, a\'oodhu bika min sharri ma sana\'tu, aboo\'u laka bini\'matika \'alayya, wa aboo\'u bidhanbi faghfir li fa\'innahu la yaghfirudh-dhunooba illa Ant.',
    translation: 'O Allah, You are my Lord, none has the right to be worshipped except You. You created me and I am Your servant, and I abide by Your covenant and promise as best as I am able. I seek refuge in You from the evil of what I have done. I acknowledge before You Your favor upon me, and I confess my sins, so forgive me, for none forgives sins except You.',
    translationUr: 'اے اللہ! تو ہی میرا رب ہے، تیرے سوا کوئی معبود نہیں، تو نے ہی مجھے پیدا کیا اور میں تیرا بندہ ہوں، اور اپنی طاقت کے مطابق تیرے عہد اور وعدے پر قائم ہوں۔',
    source: 'Sahih al-Bukhari 6306',
    targetCount: 1,
    virtue: '"Whoever recites it during the day with conviction and dies before evening will be among the people of Paradise." (Bukhari)',
  ),
  DuaItem(
    id: 'dua-protection-1',
    category: 'protection',
    title: 'Protection from Harm & Evil Eye (3 Times)',
    titleUr: 'ہر قسم کے شر اور نقصان سے حفاظت کی دعا',
    titleHi: 'हर बुराई और नुक्सान से हिफ़ाज़त की दुआ',
    arabic: 'بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ',
    transliteration: 'Bismillahil-ladhi la yadurru ma\'as-mihi shay\'un fil-ardi wa la fis-sama\'i wa Huwas-Sami\'ul-\'Alim.',
    translation: 'In the name of Allah, with whose name nothing on earth or in heaven can cause harm, and He is the All-Hearing, the All-Knowing.',
    translationUr: 'اللہ کے نام سے، جس کے نام کی برکت سے زمین اور آسمان کی کوئی چیز نقصان نہیں پہنچا سکتی، اور وہی خوب سننے والا، خوب جاننے والا ہے۔',
    source: 'Sunan Abi Dawud 5088, Jami` at-Tirmidhi 3388',
    targetCount: 3,
    virtue: 'Recited 3 times in morning and evening grants complete immunity from unexpected sudden harm.',
  ),
  DuaItem(
    id: 'dua-evening-1',
    category: 'evening',
    title: 'Evening Adhkar: Seeking Complete Wellbeing',
    titleUr: 'شام کے اذکار: عافیت اور سلامتی کی دعا',
    titleHi: 'शाम के अज़कार: स्वास्थ्य व सुरक्षा की प्रार्थना',
    arabic: 'أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ',
    transliteration: 'Amsayna wa-amsal-mulku lillah, wal-hamdu lillah, la ilaha illallahu wahdahu la shareeka lah, lahul-mulku wa lahul-hamdu wa huwa \'ala kulli shay\'in qadeer.',
    translation: 'We have reached the evening and the dominion belongs to Allah, all praise is due to Allah. None has the right to be worshipped except Allah alone, without partner.',
    translationUr: 'ہم نے شام کی اور اللہ کے ملک نے شام کی، اور تمام تعریفیں اللہ ہی کے لیے ہیں۔',
    source: 'Sahih Muslim 2723',
    targetCount: 1,
    virtue: 'Shields the believer and their home throughout the night until morning.',
  ),
  DuaItem(
    id: 'dua-sleep-1',
    category: 'sleep',
    title: 'Before Sleep: Protection & Surrender',
    titleUr: 'سونے کی دعا: رب کے حضور مکمل خودسپردگی',
    titleHi: 'सोने से पूर्व की दुआ',
    arabic: 'بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا',
    transliteration: 'Bismika Allahumma amootu wa ahya.',
    translation: 'In Your Name, O Allah, I die and I live.',
    translationUr: 'اے اللہ! میں تیرے نام کے ساتھ مرتا ہوں اور جیتا ہوں۔',
    source: 'Sahih al-Bukhari 6324',
    targetCount: 1,
    virtue: 'Affirms that sleep is a minor death and places the soul in the trust of the Almighty.',
  ),
  DuaItem(
    id: 'dua-hardship-yunus',
    category: 'hardship',
    title: 'Du\'a of Prophet Yunus (Dhun-Noon) in Distress',
    titleUr: 'دعائے یونس (علیہ السلام): شدید غم اور پریشانی سے نجات',
    titleHi: 'हज़रत यूनुस (अ.स.) की दुआ: संकट से मुक्ति',
    arabic: 'لَا إِلَهَ إِلَّا أَنْتَ سُبْحَانَكَ إِنِّي كُنْتُ مِنَ الظَّالِمِينَ',
    transliteration: 'La ilaha illa Anta subhanaka innee kuntu minaz-zalimeen.',
    translation: 'There is no deity except You; exalted are You. Indeed, I have been of the wrongdoers.',
    translationUr: 'تیرے سوا کوئی معبود نہیں، تو پاک ہے، بے شک میں ہی قصورواروں میں سے ہوں۔',
    source: 'Surah Al-Anbiya 21:87, Jami` at-Tirmidhi 3505',
    targetCount: 33,
    virtue: '"No Muslim supplicates with it for anything but that Allah answers him." (Tirmidhi)',
  ),
  DuaItem(
    id: 'dua-rizq-debt',
    category: 'rizq',
    title: 'Du\'a for Debt Relief & Abundant Sustenance',
    titleUr: 'ادائے قرض اور کشائش رزق کی مسنون دعا',
    titleHi: 'ऋण मुक्ति और बरकत की दुआ',
    arabic: 'اللَّهُمَّ اكْفِنِي بِحَلَالِكَ عَنْ حَرَامِكَ، وَأَغْنِنِي بِفَضْلِكَ عَمَّنْ سِوَاكَ',
    transliteration: 'Allahummak-finee bi halalika \'an haramika, wa aghninee bi fadlika \'amman siwaka.',
    translation: 'O Allah, suffice me with what You have allowed instead of what You have forbidden, and enrich me with Your bounty from having need of anyone besides You.',
    translationUr: 'اے اللہ! مجھے اپنے حلال کے ذریعے اپنے حرام سے بے پرواہ کر دے، اور اپنے فضل سے اپنے سوا ہر ایک سے بے نیاز کر دے۔',
    source: 'Jami` at-Tirmidhi 3563',
    targetCount: 33,
    virtue: '"Even if you have debts as huge as Mount Thabeer, Allah will settle it for you." (Tirmidhi)',
  ),
  DuaItem(
    id: 'dua-parents',
    category: 'parents',
    title: 'Quranic Du\'a for Parents',
    titleUr: 'والدین کے لیے قرآنی دعا',
    titleHi: 'माता-पिता के लिए कुरआन की दुआ',
    arabic: 'رَّبِّ ارْحَمْهُمَا كَمَا رَبَّيَانِي صَغِيرًا',
    transliteration: 'Rabbi irhamhuma kama rabbayanee sagheera.',
    translation: 'My Lord, have mercy upon them as they brought me up when I was small.',
    translationUr: 'اے میرے رب! ان دونوں پر رحم فرما جس طرح انہوں نے مجھے بچپن میں پالا۔',
    source: 'Surah Al-Isra 17:24',
    targetCount: 10,
    virtue: 'Brings immense barakah in family life and elevates the stations of parents in the Akhirah.',
  ),
  DuaItem(
    id: 'dua-travel',
    category: 'travel',
    title: 'Supplication when Mounting Transport / Traveling',
    titleUr: 'سفر اور سواری کی دعا',
    titleHi: 'सफ़र और सवारी की दुआ',
    arabic: 'سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَٰذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ وَإِنَّا إِلَىٰ رَبِّنَا لَمُنقَلِبُونَ',
    transliteration: 'Subhanal-ladhee sakh-khara lana hadha wa ma kunna lahu muqrineen, wa inna ila Rabbina lamunqaliboon.',
    translation: 'Glory to Him who has subjected this to us, and we could never have achieved it by ourselves, and to our Lord we shall surely return.',
    translationUr: 'پاک ہے وہ ذات جس نے اس کو ہمارے تابع کر دیا حالانکہ ہم اسے قابو میں لانے والے نہ تھے، اور ہم اپنے رب ہی کی طرف لوٹنے والے ہیں۔',
    source: 'Surah Az-Zukhruf 43:13-14, Sahih Muslim 1342',
    targetCount: 1,
    virtue: 'Preserves the traveler under angelic protection throughout the journey.',
  ),
  DuaItem(
    id: 'dua-tasbih-subhanallah',
    category: 'gratitude',
    title: 'Tasbih: SubhanAllah wa Bihamdihi (100 Times)',
    titleUr: 'تسبیح: سبحان اللہ وبحمدہ (100 بار)',
    titleHi: 'तसबीह: सुब्हानल्लाहि व बिहम्दिही (100 बार)',
    arabic: 'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ',
    transliteration: 'SubhanAllahi wa bihamdihi.',
    translation: 'Glory be to Allah and His is the praise.',
    translationUr: 'اللہ پاک ہے اور اسی کے لیے تمام تعریفیں ہیں۔',
    source: 'Sahih al-Bukhari 6405',
    targetCount: 100,
    virtue: '"Whoever says it 100 times a day, his sins will be forgiven even if they were like the foam of the sea." (Bukhari)',
  ),
];
