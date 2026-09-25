// ============================================================
// NOOR Web — Duas & Adhkar Library
// ============================================================

export interface DuaItem {
  id: string;
  category: string;
  title: string;
  titleHi?: string;
  titleUr?: string;
  arabic: string;
  transliteration: string;
  translation: string;
  translationHi?: string;
  translationUr?: string;
  source: string;
  targetCount: number;
  virtue: string;
  virtueHi?: string;
  virtueUr?: string;
}

export const DUA_CATEGORIES = [
  { id: 'all', name: 'All Duas', key: 'catAll' },
  { id: 'morning', name: 'Morning Adhkar', key: 'catMorning' },
  { id: 'evening', name: 'Evening Adhkar', key: 'catEvening' },
  { id: 'sleep', name: 'Before Sleep', key: 'catSleep' },
  { id: 'protection', name: 'Protection & Evil Eye', key: 'catProtection' },
  { id: 'travel', name: 'Travel & Safar', key: 'catTravel' },
  { id: 'rizq', name: 'Rizq & Debt Relief', key: 'catRizq' },
  { id: 'hardship', name: 'Hardship & Relief', key: 'catHardship' },
];

export const DUAS_LIST: DuaItem[] = [
  {
    id: 'dua-morning-1',
    category: 'morning',
    title: 'Morning Adhkar: Praise of Allah upon Waking',
    titleHi: 'सुबह के अज़कार: जागने पर अल्लाह की हम्द व सना',
    titleUr: 'صبح کے اذکار: بیدار ہونے پر اللہ کی حمد',
    arabic: 'أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ',
    transliteration: "Asbahna wa-asbahal-mulku lillah, wal-hamdu lillah, la ilaha illallahu wahdahu la shareeka lah...",
    translation: 'We have entered the morning and the kingdom belongs to Allah, all praise is due to Allah. None has the right to be worshipped except Allah alone, without partner.',
    translationHi: 'हमने सुबह की और सारी बादशाही अल्लाह ही की है, और सब प्रशंसा अल्लाह के लिए है। अल्लाह के सिवा कोई पूज्य नहीं, वह अकेला है, उसका कोई साझीदार नहीं।',
    translationUr: 'ہم نے صبح کی اور اللہ کے ملک نے صبح کی، اور تمام تعریفیں اللہ ہی کے لیے ہیں۔ اللہ کے سوا کوئی معبود نہیں، وہ اکیلا ہے، اس کا کوئی شریک نہیں۔',
    source: 'Sahih Muslim 2723, Hisn al-Muslim',
    targetCount: 1,
    virtue: 'Recited upon dawn for spiritual protection and mindfulness throughout the day.'
  },
  {
    id: 'dua-protection-1',
    category: 'protection',
    title: 'Dua against Harm (Recited 3 times)',
    titleHi: 'हर बुराई और नुक्सान से हिफ़ाज़त की दुआ (3 बार)',
    titleUr: 'ہر قسم کے شر اور نقصان سے حفاظت کی دعا (3 بار)',
    arabic: 'بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ',
    transliteration: "Bismillahil-ladhi la yadurru ma'as-mihi shay'un fil-ardi wa la fis-sama'i wa Huwas-Sami'ul-'Alim.",
    translation: 'In the name of Allah, with whose name nothing on earth or in heaven can cause harm, and He is the All-Hearing, the All-Knowing.',
    translationHi: 'अल्लाह के नाम से, जिसके नाम की बरकत से ज़मीन और आसमान की कोई चीज़ नुक्सान नहीं पहुँचा सकती, और वही सब कुछ सुनने वाला और जानने वाला है।',
    translationUr: 'اللہ کے نام سے، جس کے نام کی برکت سے زمین اور آسمان کی کوئی چیز نقصان نہیں پہنچا سکتی، اور وہی خوب سننے والا، خوب جاننے والا ہے۔',
    source: 'Sunan Abi Dawud 5088, Jami` at-Tirmidhi 3388 (Sahih)',
    targetCount: 3,
    virtue: 'Whoever recites it thrice in the morning and evening will not be harmed by anything.'
  },
  {
    id: 'dua-hardship-1',
    category: 'hardship',
    title: 'Dua of Prophet Yunus (AS) in Distress',
    titleHi: 'संकट और कठिनाई में हज़रत यूनुस (अलैहिस्सलाम) की दुआ',
    titleUr: 'تکلیف و پریشانی میں حضرت یونس علیہ السلام کی دعا',
    arabic: 'لَّا إِلَٰهَ إِلَّا أَنتَ سُبْحَانَكَ إِنِّي كُنتُ مِنَ الظَّالِمِينَ',
    transliteration: "La ilaha illa Anta, subhanaka inni kuntu minaz-zalimeen.",
    translation: 'There is no deity except You; exalted are You. Indeed, I have been of the wrongdoers.',
    translationHi: 'तेरे सिवा कोई पूज्य नहीं, तू पाक और पवित्र है। बेशक मैं ही ज़ालिमों (गलती करने वालों) में से था।',
    translationUr: 'تیرے سوا کوئی معبود نہیں، تو پاک ہے، بے شک میں ہی ظالموں میں سے تھا۔',
    source: 'Surah Al-Anbiya 21:87, Jami` at-Tirmidhi 3505',
    targetCount: 1,
    virtue: 'The Prophet ﷺ said no Muslim supplicates with this Dua during adversity except that Allah answers him.'
  },
  {
    id: 'dua-travel-1',
    category: 'travel',
    title: 'Dua for Riding a Vehicle & Setting Out on Travel',
    titleHi: 'सफ़र और सवारी की मसनून दुआ',
    titleUr: 'سفر اور سواری کی مسنون دعا',
    arabic: 'سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَٰذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ وَإِنَّا إِلَىٰ رَبِّنَا لَمُنقَلِبُونَ',
    transliteration: "Subhanal-ladhi sakh-khara lana hadha wa ma kunna lahu muqrinin, wa inna ila Rabbina lamunqalibun.",
    translation: 'Glory unto Him who has subjected this to us, and we could never have had it by our own efforts. And verily, unto our Lord we shall return.',
    translationHi: 'पाक है वह ज़ात जिसने इसे हमारे वश में कर दिया, वरना हम इसे काबू में करने वाले न थे। और बेशक हमें अपने रब ही की तरफ लौटना है।',
    translationUr: 'پاک ہے وہ ذات جس نے اس کو ہمارے قابو میں کر دیا حالانکہ ہم اس پر قابو پانے والے نہ تھے، اور یقیناً ہم اپنے رب ہی کی طرف لوٹ کر جانے والے ہیں۔',
    source: 'Surah Az-Zukhruf 43:13-14, Sahih Muslim 1342',
    targetCount: 1,
    virtue: 'Guarantees serenity and divine guardianship during long journeys.'
  },
  {
    id: 'dua-rizq-1',
    category: 'rizq',
    title: 'Dua for Relief from Debt and Worry',
    titleHi: 'कर्ज़, चिंता और ग़म से नजात की दुआ',
    titleUr: 'قرض، فکر اور غم سے نجات کی دعا',
    arabic: 'اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ، وَأَعُوذُ بِكَ مِنَ الْعَجْزِ وَالْكَسَلِ، وَأَعُوذُ بِكَ مِنَ الْجُبْنِ وَالْبُخْلِ، وَأَعُوذُ بِكَ مِنْ غَلَبَةِ الدَّيْنِ وَقَهْرِ الرِّجَالِ',
    transliteration: "Allahumma inni a'udhu bika minal-hammi wal-hazan, wal-'ajzi wal-kasal, wal-jubni wal-bukhl, wa ghalabatid-dayni wa qahrir-rijal.",
    translation: 'O Allah, I seek refuge in You from anxiety and sorrow, from inability and laziness, from cowardice and stinginess, and from the burden of debt and subjugation by men.',
    translationHi: 'ऐ अल्लाह! मैं चिंता और ग़म से, लाचारी और सुस्ती से, कायरता और कंजूसी से, और कर्ज़ के बोझ और लोगों के दबाव से तेरी पनाह माँगता हूँ।',
    translationUr: 'اے اللہ! میں غم اور فکر سے، عاجزی اور سستی سے، بزدلی اور کنجوسی سے، اور قرض کے بوجھ اور لوگوں کے غلبے سے تیری پناہ مانگتا ہوں۔',
    source: 'Sahih al-Bukhari 2893',
    targetCount: 1,
    virtue: 'Taught by the Prophet ﷺ to alleviate heavy psychological distress and financial pressure.'
  },
  {
    id: 'dua-sleep-1',
    category: 'sleep',
    title: 'Before Sleeping: Seeking Rest in Allah’s Name',
    titleHi: 'सोने से पहले की दुआ: अल्लाह के नाम से आराम पाना',
    titleUr: 'سونے کی دعا: اللہ کے مبارک نام سے آرام',
    arabic: 'بِاسْمِكَ رَبِّي وَضَعْتُ جَنْبِي، وَبِكَ أَرْفَعُهُ، فَإِنْ أَمْسَكْتَ نَفْسِي فَارْحَمْهَا، وَإِنْ أَرْسَلْتَهَا فَاحْفَظْهَا بِمَا تَحْفَظُ بِهِ عِبَادَكَ الصَّالِحِينَ',
    transliteration: "Bismika Rabbi wada'tu janbi, wa bika arfa'uh, fa-in amsakta nafsi farhamha, wa in arsaltaha fahfazha bima tahfazu bihi 'ibadakas-salihin.",
    translation: 'In Your name my Lord, I lie down and in Your name I rise up. If You take my soul, have mercy upon it, and if You release it, protect it as You protect Your righteous slaves.',
    translationHi: 'ऐ मेरे रब! तेरे ही नाम से मैंने अपनी करवट रखी और तेरे ही नाम से मैं इसे उठाऊँगा। यदि तू मेरी जान रोक ले तो उस पर रहम फ़रमा, और यदि छोड़ दे तो उसकी वैसे ही रक्षा कर जैसे तू अपने नेक बंदों की करता है।',
    translationUr: 'اے میرے رب! تیرے نام کے ساتھ میں نے اپنا پہلو رکھا اور تیرے ہی نام سے اسے اٹھاؤں گا۔ اگر تو میری جان روک لے تو اس پر رحم فرما، اور اگر اسے بھیج دے تو اس کی حفاظت فرما جس طرح تو اپنے نیک بندوں کی حفاظت فرماتا ہے۔',
    source: 'Sahih al-Bukhari 6320, Sahih Muslim 2714',
    targetCount: 1,
    virtue: 'Provides peaceful sleep under the direct protection of the angels.'
  }
];
