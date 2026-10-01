// ============================================================
// NOOR — Classical Islamic Knowledge & Practice Engine (Dart)
// Scholarly verified, copyright-safe classical Islamic data
// Sourced from the Holy Qur'an, Sahih Bukhari, Sahih Muslim,
// Hisn al-Muslim, and classical fiqh manuals.
// ============================================================

class NameOfAllah {
  final int number;
  final String arabic;
  final String transliteration;
  final String meaningEn;
  final String meaningUr;
  final String meaningHi;
  final String explanation;
  final String quranRef;
  final String spiritualBenefit;

  const NameOfAllah({
    required this.number,
    required this.arabic,
    required this.transliteration,
    required this.meaningEn,
    required this.meaningUr,
    required this.meaningHi,
    required this.explanation,
    required this.quranRef,
    required this.spiritualBenefit,
  });
}

class WuduStepItem {
  final int step;
  final String title;
  final String arabicName;
  final String instruction;
  final bool isFard;
  final int times;
  final String hadithNote;

  const WuduStepItem({
    required this.step,
    required this.title,
    required this.arabicName,
    required this.instruction,
    required this.isFard,
    required this.times,
    required this.hadithNote,
  });
}

class UmrahStepItem {
  final int step;
  final String title;
  final String arabicTitle;
  final String location;
  final String description;
  final List<String> actions;
  final String dua;
  final String duaTranslation;

  const UmrahStepItem({
    required this.step,
    required this.title,
    required this.arabicTitle,
    required this.location,
    required this.description,
    required this.actions,
    required this.dua,
    required this.duaTranslation,
  });
}

class JanazahStepItem {
  final int takbeerNumber;
  final String title;
  final String arabicTitle;
  final String action;
  final String arabicRecitation;
  final String transliteration;
  final String englishTranslation;
  final String urduTranslation;

  const JanazahStepItem({
    required this.takbeerNumber,
    required this.title,
    required this.arabicTitle,
    required this.action,
    required this.arabicRecitation,
    required this.transliteration,
    required this.englishTranslation,
    required this.urduTranslation,
  });
}

class AdabCategoryItem {
  final String id;
  final String title;
  final String icon;
  final String description;
  final List<AdabRuleItem> rules;

  const AdabCategoryItem({
    required this.id,
    required this.title,
    required this.icon,
    required this.description,
    required this.rules,
  });
}

class AdabRuleItem {
  final String title;
  final String instruction;
  final String arabicDua;
  final String duaTranslation;
  final String hadithReference;

  const AdabRuleItem({
    required this.title,
    required this.instruction,
    required this.arabicDua,
    required this.duaTranslation,
    required this.hadithReference,
  });
}

class KidStoryItem {
  final String id;
  final String prophetName;
  final String title;
  final String summary;
  final String fullStory;
  final String moralLesson;
  final String keyAyah;
  final String ayahRef;

  const KidStoryItem({
    required this.id,
    required this.prophetName,
    required this.title,
    required this.summary,
    required this.fullStory,
    required this.moralLesson,
    required this.keyAyah,
    required this.ayahRef,
  });
}

class KidQuizItem {
  final String question;
  final List<String> options;
  final int correctIndex;
  final String explanation;

  const KidQuizItem({
    required this.question,
    required this.options,
    required this.correctIndex,
    required this.explanation,
  });
}

// ── 99 NAMES OF ALLAH ─────────────────────────────────────────
const List<NameOfAllah> kNamesOfAllah = [
  NameOfAllah(
    number: 1,
    arabic: 'الرَّحْمَنُ',
    transliteration: 'Ar-Rahman',
    meaningEn: 'The Entirely Merciful',
    meaningUr: 'بہت زیادہ رحم فرمانے والا',
    meaningHi: 'अत्यंत दयालु',
    explanation: 'He who wills goodness and mercy for all His creation in this world.',
    quranRef: 'Surah Al-Fatihah 1:3',
    spiritualBenefit: 'Reciting 100 times daily enhances compassion and cleanses the heart from negligence.',
  ),
  NameOfAllah(
    number: 2,
    arabic: 'الرَّحِيمُ',
    transliteration: 'Ar-Raheem',
    meaningEn: 'The Especially Merciful',
    meaningUr: 'نہایت مہربان',
    meaningHi: 'विशेष रूप से दया करने वाला',
    explanation: 'He who bestows specialized mercy and reward upon the believers in this world and the Hereafter.',
    quranRef: 'Surah Al-Baqarah 2:143',
    spiritualBenefit: 'Brings divine protection and salvation from all spiritual anxieties.',
  ),
  NameOfAllah(
    number: 3,
    arabic: 'الْمَلِكُ',
    transliteration: 'Al-Malik',
    meaningEn: 'The Sovereign King',
    meaningUr: 'حقیقی بادشاہ',
    meaningHi: 'वास्तविक संप्रभु राजा',
    explanation: 'The absolute ruler and owner of the entire dominion, without partners.',
    quranRef: 'Surah Al-Hashr 59:23',
    spiritualBenefit: 'Grant of spiritual authority and self-sufficiency from worldly dependence.',
  ),
  NameOfAllah(
    number: 4,
    arabic: 'الْقُدُّوسُ',
    transliteration: 'Al-Quddus',
    meaningEn: 'The Pure & Holy',
    meaningUr: 'تمام عیوب سے پاک',
    meaningHi: 'अति पवित्र, हर कमी से पाक',
    explanation: 'Pure from all flaws, deficiencies, and any concept of human imperfection.',
    quranRef: 'Surah Al-Jumu\'ah 62:1',
    spiritualBenefit: 'Purification of heart from pride, hatred, and spiritual diseases.',
  ),
  NameOfAllah(
    number: 5,
    arabic: 'السَّلَامُ',
    transliteration: 'As-Salam',
    meaningEn: 'The Source of Peace',
    meaningUr: 'سلامتی دینے والا',
    meaningHi: 'शांति का स्रोत',
    explanation: 'The Giver of peace and safety to His servants, and Free from all defects.',
    quranRef: 'Surah Al-Hashr 59:23',
    spiritualBenefit: 'Instills tranquility in troubled souls and grants safety from tribulations.',
  ),
  NameOfAllah(
    number: 6,
    arabic: 'الْمُؤْمِنُ',
    transliteration: 'Al-Mu\'min',
    meaningEn: 'The Granter of Security',
    meaningUr: 'امن و امان بخشنے والا',
    meaningHi: 'सुरक्षा और ईमान देने वाला',
    explanation: 'He who affirms the truth of His prophets and grants peace of mind to the believers.',
    quranRef: 'Surah Al-Hashr 59:23',
    spiritualBenefit: 'Protects from fear of enemies, anxiety, and harmful thoughts.',
  ),
  NameOfAllah(
    number: 7,
    arabic: 'الْمُهَيْمِنُ',
    transliteration: 'Al-Muhaymin',
    meaningEn: 'The Guardian & Protector',
    meaningUr: 'نگہبان اور محافظ',
    meaningHi: 'सबका रक्षक व संरक्षक',
    explanation: 'The Overseer who witnesses all things, preserves the universe, and controls all destiny.',
    quranRef: 'Surah Al-Hashr 59:23',
    spiritualBenefit: 'Bestows inner illumination and spiritual perception.',
  ),
  NameOfAllah(
    number: 8,
    arabic: 'الْعَزِيزُ',
    transliteration: 'Al-Aziz',
    meaningEn: 'The All-Mighty',
    meaningUr: 'سب پر غالب و زبردست',
    meaningHi: 'सर्वशक्तिमान, सब पर विजयी',
    explanation: 'The Invincible who can never be overcome, yet wise in all His decisions.',
    quranRef: 'Surah Al-Imran 3:62',
    spiritualBenefit: 'Reciting after Fajr prayer grants honor, self-respect, and victory over oppression.',
  ),
  NameOfAllah(
    number: 9,
    arabic: 'الْجَبَّارُ',
    transliteration: 'Al-Jabbar',
    meaningEn: 'The Compeller & Restorer',
    meaningUr: 'زبردست اور بگڑے کام سنوارنے والا',
    meaningHi: 'टूटे दिलों को जोड़ने वाला, सर्वशक्तिशाली',
    explanation: 'The One who mends broken hearts, reforms conditions, and compels all matters by His Will.',
    quranRef: 'Surah Al-Hashr 59:23',
    spiritualBenefit: 'Restores broken spirits and safeguards against tyranny.',
  ),
  NameOfAllah(
    number: 10,
    arabic: 'الْمُتَكَبِّرُ',
    transliteration: 'Al-Mutakabbir',
    meaningEn: 'The Supreme in Majesty',
    meaningUr: 'بزرگی اور عظمت والا',
    meaningHi: 'महानता और बड़ाई का वास्तविक मालिक',
    explanation: 'The One who possesses all true greatness and transcends any human arrogance.',
    quranRef: 'Surah Al-Hashr 59:23',
    spiritualBenefit: 'Bestows dignity and removes feelings of helplessness.',
  ),
  NameOfAllah(
    number: 11,
    arabic: 'الْخَالِقُ',
    transliteration: 'Al-Khaliq',
    meaningEn: 'The Creator',
    meaningUr: 'پیدا فرمانے والا',
    meaningHi: 'सृष्टिकर्ता',
    explanation: 'The One who brings everything from non-existence into existence according to His preordained decree.',
    quranRef: 'Surah Ar-Ra\'d 13:16',
    spiritualBenefit: 'Inspires creative wisdom and strengthens trust in Allah\'s creation.',
  ),
  NameOfAllah(
    number: 12,
    arabic: 'الْبَارِئُ',
    transliteration: 'Al-Bari',
    meaningEn: 'The Originator',
    meaningUr: 'ٹھیک ٹھیک بنانے والا',
    meaningHi: 'सटीक रूप से रचने वाला',
    explanation: 'The One who creates things distinct from one another and in harmonious proportions.',
    quranRef: 'Surah Al-Hashr 59:24',
    spiritualBenefit: 'Assists in overcoming spiritual desolation and grief.',
  ),
  NameOfAllah(
    number: 13,
    arabic: 'الْمُصَوِّرُ',
    transliteration: 'Al-Musawwir',
    meaningEn: 'The Fashioner of Forms',
    meaningUr: 'صورتیں بنانے والا',
    meaningHi: 'रूप व स्वरूप प्रदान करने वाला',
    explanation: 'He who shapes every entity with distinct features, beauty, and purpose.',
    quranRef: 'Surah Al-Hashr 59:24',
    spiritualBenefit: 'Brings harmony, blessed offspring, and aesthetic appreciation of nature.',
  ),
  NameOfAllah(
    number: 14,
    arabic: 'الْغَفَّارُ',
    transliteration: 'Al-Ghaffar',
    meaningEn: 'The Constant Forgiver',
    meaningUr: 'بار بار بخشنے والا',
    meaningHi: 'निरंतर क्षमा करने वाला',
    explanation: 'He who repeatedly pardons the sins of His repentant servants and conceals their faults.',
    quranRef: 'Surah Nuh 71:10',
    spiritualBenefit: 'Guarantees forgiveness of past errors when recited with sincere repentance.',
  ),
  NameOfAllah(
    number: 15,
    arabic: 'الْقَهَّارُ',
    transliteration: 'Al-Qahhar',
    meaningEn: 'The All-Subduing',
    meaningUr: 'سب کو اپنے قابو میں رکھنے والا',
    meaningHi: 'सब पर पूर्ण नियंत्रण रखने वाला',
    explanation: 'The One who dominates all creatures, before whom all mighty tyrants become humbled.',
    quranRef: 'Surah Ibrahim 14:48',
    spiritualBenefit: 'Helps overcome base desires and negative addictions.',
  ),
  NameOfAllah(
    number: 16,
    arabic: 'الْوَهَّابُ',
    transliteration: 'Al-Wahhab',
    meaningEn: 'The Bestower of Gifts',
    meaningUr: 'بے حساب عطا فرمانے والا',
    meaningHi: 'बिना स्वार्थ सब कुछ देने वाला',
    explanation: 'He who gives generously to all without expecting any return or condition.',
    quranRef: 'Surah Al-Imran 3:8',
    spiritualBenefit: 'Relief from financial hardship and opening of unexpected sustenance.',
  ),
  NameOfAllah(
    number: 17,
    arabic: 'الرَّزَّاقُ',
    transliteration: 'Ar-Razzaq',
    meaningEn: 'The Provider',
    meaningUr: 'روزی رساں',
    meaningHi: 'आजीविका और अन्नदाता',
    explanation: 'The One who provides all sustenance, both physical and spiritual, for every living soul.',
    quranRef: 'Surah Adh-Dhariyat 51:58',
    spiritualBenefit: 'Reciting 10 times in every corner of the house before Fajr brings blessing in wealth.',
  ),
  NameOfAllah(
    number: 18,
    arabic: 'الْفَتَّاحُ',
    transliteration: 'Al-Fattah',
    meaningEn: 'The Opener of All Doors',
    meaningUr: 'راستے کھولنے والا',
    meaningHi: 'समस्त बंद द्वार खोलने वाला',
    explanation: 'He who opens all gates of mercy, knowledge, victory, and solutions to human distress.',
    quranRef: 'Surah Saba 34:26',
    spiritualBenefit: 'Placed hands over chest and reciting 70 times after Fajr cleanses heart and opens insight.',
  ),
  NameOfAllah(
    number: 19,
    arabic: 'الْعَلِيمُ',
    transliteration: 'Al-Alim',
    meaningEn: 'The All-Knowing',
    meaningUr: 'ہر بات جاننے والا',
    meaningHi: 'सर्वज्ञ, सब कुछ जानने वाला',
    explanation: 'The One whose knowledge encompasses the hidden and apparent, the past, present, and future.',
    quranRef: 'Surah Al-Baqarah 2:29',
    spiritualBenefit: 'Illuminates the mind with sacred knowledge and sharpens memory.',
  ),
  NameOfAllah(
    number: 20,
    arabic: 'الْقَابِضُ',
    transliteration: 'Al-Qabid',
    meaningEn: 'The Restrainer',
    meaningUr: 'تنگ کرنے والا',
    meaningHi: 'सीमित करने वाला',
    explanation: 'He who withholds or constricts sustenance and souls according to His divine wisdom.',
    quranRef: 'Surah Al-Baqarah 2:245',
    spiritualBenefit: 'Provides protection from harm and tyranny.',
  ),
  NameOfAllah(
    number: 21,
    arabic: 'الْبَاسِطُ',
    transliteration: 'Al-Basit',
    meaningEn: 'The Extender of Bounty',
    meaningUr: 'فراخی دینے والا',
    meaningHi: 'प्रचुरता और विस्तार देने वाला',
    explanation: 'The One who expands wealth, mercy, and life for whomever He wills.',
    quranRef: 'Surah Al-Baqarah 2:245',
    spiritualBenefit: 'Reciting 10 times with hands raised after Duha prayer grants independence of spirit.',
  ),
  NameOfAllah(
    number: 22,
    arabic: 'الْخَافِضُ',
    transliteration: 'Al-Khafid',
    meaningEn: 'The Abaser',
    meaningUr: 'پست کرنے والا',
    meaningHi: 'अहंकारियों को नीचा करने वाला',
    explanation: 'The One who humbles the arrogant, disobedient, and oppressors.',
    quranRef: 'Surah Al-Waqi\'ah 56:3',
    spiritualBenefit: 'Safeguards against oppression and subjugation by enemies.',
  ),
  NameOfAllah(
    number: 23,
    arabic: 'الرَّافِعُ',
    transliteration: 'Ar-Rafi\'',
    meaningEn: 'The Exalter',
    meaningUr: 'بلند فرمانے والا',
    meaningHi: 'मान-सम्मान में वृद्धि करने वाला',
    explanation: 'The One who elevates the righteous in honor, knowledge, and stations in Paradise.',
    quranRef: 'Surah Al-An\'am 6:83',
    spiritualBenefit: 'Bestows spiritual rank, wisdom, and virtuous status among people.',
  ),
  NameOfAllah(
    number: 24,
    arabic: 'الْمُعِزُّ',
    transliteration: 'Al-Mu\'izz',
    meaningEn: 'The Giver of Honor',
    meaningUr: 'عزت بخشنے والا',
    meaningHi: 'सम्मान देने वाला',
    explanation: 'He who bestows true glory and strength upon whomever obeys Him.',
    quranRef: 'Surah Al-Imran 3:26',
    spiritualBenefit: 'Protects from humiliation and degradation.',
  ),
  NameOfAllah(
    number: 25,
    arabic: 'الْمُذِلُّ',
    transliteration: 'Al-Mudhill',
    meaningEn: 'The Humiliator of Tyrants',
    meaningUr: 'ذلیل کرنے والا',
    meaningHi: 'अधर्मियों को लज्जित करने वाला',
    explanation: 'He who deprives the arrogant of honor and abandons them to their ruin.',
    quranRef: 'Surah Al-Imran 3:26',
    spiritualBenefit: 'Shields from deceitful and corrupt adversaries.',
  ),
  NameOfAllah(
    number: 26,
    arabic: 'السَّمِيعُ',
    transliteration: 'As-Sami\'',
    meaningEn: 'The All-Hearing',
    meaningUr: 'سب کچھ سننے والا',
    meaningHi: 'सब कुछ सुनने वाला',
    explanation: 'The One whose hearing encompasses all sounds, silent prayers, and whispers in hearts.',
    quranRef: 'Surah Al-Baqarah 2:137',
    spiritualBenefit: 'Reciting on Thursdays after Dhuhr ensures acceptance of secret supplications.',
  ),
  NameOfAllah(
    number: 27,
    arabic: 'الْبَصِيرُ',
    transliteration: 'Al-Baseer',
    meaningEn: 'The All-Seeing',
    meaningUr: 'سب کچھ دیکھنے والا',
    meaningHi: 'सब कुछ देखने वाला',
    explanation: 'He who sees all actions, secrets, and minute movements in the depths of creation.',
    quranRef: 'Surah Al-Hujurat 49:18',
    spiritualBenefit: 'Sharpens inner spiritual sight and protects from misguidance.',
  ),
  NameOfAllah(
    number: 28,
    arabic: 'الْحَكَمُ',
    transliteration: 'Al-Hakam',
    meaningEn: 'The Supreme Judge',
    meaningUr: 'فیصلہ فرمانے والا',
    meaningHi: 'न्यायाधीश, निष्पक्ष फैसला करने वाला',
    explanation: 'The absolute Arbiter whose judgment is just and can never be repealed.',
    quranRef: 'Surah Al-An\'am 6:114',
    spiritualBenefit: 'Brings wisdom in decision-making and justice in disputes.',
  ),
  NameOfAllah(
    number: 29,
    arabic: 'الْعَدْلُ',
    transliteration: 'Al-Adl',
    meaningEn: 'The Utterly Just',
    meaningUr: 'سراپا انصاف',
    meaningHi: 'परम न्यायी',
    explanation: 'The One who embodies pure justice, free from any bias, cruelty, or unfairness.',
    quranRef: 'Surah Al-An\'am 6:115',
    spiritualBenefit: 'Inculcates fairness and righteousness in one\'s character.',
  ),
  NameOfAllah(
    number: 30,
    arabic: 'اللَّطِيفُ',
    transliteration: 'Al-Lateef',
    meaningEn: 'The Subtly Kind',
    meaningUr: 'باریک بین اور مہربان',
    meaningHi: 'सूक्ष्म, कृपा और सौम्यता का सागर',
    explanation: 'He who knows the finest details of all affairs and treats His servants with hidden grace.',
    quranRef: 'Surah Ash-Shura 42:19',
    spiritualBenefit: 'Reciting 129 times in moments of hardship brings sudden relief and sweet ease.',
  ),
  NameOfAllah(
    number: 31,
    arabic: 'الْخَبِيرُ',
    transliteration: 'Al-Khabeer',
    meaningEn: 'The All-Aware',
    meaningUr: 'باخبر',
    meaningHi: 'सर्वज्ञाता, अंदरूनी भेदों को जानने वाला',
    explanation: 'The One who knows the true reality, inner essence, and secrets of everything.',
    quranRef: 'Surah Al-Mulk 67:14',
    spiritualBenefit: 'Reveals the truth of confusing situations and clears deception.',
  ),
  NameOfAllah(
    number: 32,
    arabic: 'الْحَلِيمُ',
    transliteration: 'Al-Haleem',
    meaningEn: 'The Most Forbearing',
    meaningUr: 'بردبار اور حلیم',
    meaningHi: 'अति सहनशील व धैर्यवान',
    explanation: 'He who does not hasten to punish sinners, giving them ample time to turn back.',
    quranRef: 'Surah Al-Baqarah 2:225',
    spiritualBenefit: 'Subdues anger and grants composure during intense trials.',
  ),
  NameOfAllah(
    number: 33,
    arabic: 'الْعَظِيمُ',
    transliteration: 'Al-Azeem',
    meaningEn: 'The Magnificent',
    meaningUr: 'عظمت والا',
    meaningHi: 'महानता का स्वामी',
    explanation: 'The One whose greatness exceeds all human comprehension and intellect.',
    quranRef: 'Surah Al-Baqarah 2:255',
    spiritualBenefit: 'Reciting continuously in Ruku elevates one\'s reverence of Allah.',
  ),
  NameOfAllah(
    number: 34,
    arabic: 'الْغَفُورُ',
    transliteration: 'Al-Ghafoor',
    meaningEn: 'The All-Forgiving',
    meaningUr: 'بخشنے والا',
    meaningHi: 'पापों को क्षमा करने वाला',
    explanation: 'The One who veils sins completely and erases their consequence in this life and the next.',
    quranRef: 'Surah Al-Baqarah 2:173',
    spiritualBenefit: 'Alleviates the heavy burden of past sins and guilt.',
  ),
  NameOfAllah(
    number: 35,
    arabic: 'الشَّكُورُ',
    transliteration: 'Ash-Shakoor',
    meaningEn: 'The Most Appreciative',
    meaningUr: 'قدر دان',
    meaningHi: 'सद्कर्मों की अत्यंत कद्र करने वाला',
    explanation: 'The One who rewards abundant bliss for small good deeds done sincerely.',
    quranRef: 'Surah Fatir 35:30',
    spiritualBenefit: 'Increases blessings in physical strength and clears heavy financial difficulties.',
  ),
];

// ── WUDU STEPS ───────────────────────────────────────────────
const List<WuduStepItem> kWuduSteps = [
  WuduStepItem(
    step: 1,
    title: 'Intention (Niyyah) & Bismillah',
    arabicName: 'النِّيَّةُ وَالتَّسْمِيَة',
    instruction: 'Form the sincere intention in your heart to purify yourself for the sake of Allah, then say: "Bismillah" (In the Name of Allah).',
    isFard: true,
    times: 1,
    hadithNote: 'The Prophet ﷺ said: "Actions are but by intentions." (Sahih al-Bukhari 1)',
  ),
  WuduStepItem(
    step: 2,
    title: 'Washing Hands to Wrists',
    arabicName: 'غَسْلُ الْيَدَيْنِ إِلَى الرُّسْغَيْن',
    instruction: 'Wash both hands thoroughly up to the wrists three times, making sure water runs between the fingers (Takhlil).',
    isFard: false,
    times: 3,
    hadithNote: 'Sunnah Mu\'akkadah demonstrated in canonical hadiths of Uthman ibn Affan (Bukhari 159).',
  ),
  WuduStepItem(
    step: 3,
    title: 'Rinsing the Mouth (Madmadah)',
    arabicName: 'الْمَضْمَضَة',
    instruction: 'Take water with your right hand and rinse your mouth thoroughly three times, swirling the water to cleanse the teeth and gums.',
    isFard: false,
    times: 3,
    hadithNote: 'Using the Miswak prior to or during rinsing is highly recommended (Sahih Muslim 252).',
  ),
  WuduStepItem(
    step: 4,
    title: 'Sniffing Water into the Nose (Istinshaq)',
    arabicName: 'الِاسْتِنْشَاقُ وَالِاسْتِنْثَار',
    instruction: 'Gently sniff water into your nostrils with your right hand and blow it out with your left hand, repeating three times.',
    isFard: false,
    times: 3,
    hadithNote: 'Purifies nasal passages as practiced by the Messenger of Allah ﷺ (Sahih Muslim 226).',
  ),
  WuduStepItem(
    step: 5,
    title: 'Washing the Full Face',
    arabicName: 'غَسْلُ الْوَجْهِ',
    instruction: 'Wash the entire face three times, from the normal hairline to the bottom of the chin, and from earlobe to earlobe.',
    isFard: true,
    times: 3,
    hadithNote: 'Explicitly commanded in Surah Al-Ma\'idah (5:6).',
  ),
  WuduStepItem(
    step: 6,
    title: 'Washing Arms to the Elbows',
    arabicName: 'غَسْلُ الْيَدَيْنِ إِلَى الْمِرْفَقَيْن',
    instruction: 'Wash the right arm thoroughly from fingertips including the elbow three times, then repeat the same for the left arm.',
    isFard: true,
    times: 3,
    hadithNote: 'Elbows must be completely covered with water (Sahih Muslim 246).',
  ),
  WuduStepItem(
    step: 7,
    title: 'Wiping the Head (Masah)',
    arabicName: 'مَسْحُ الرَّأْس',
    instruction: 'Wet both hands and pass them from the front of the hairline back to the nape of the neck, and then bring them forward once.',
    isFard: true,
    times: 1,
    hadithNote: 'Wiping is done once according to majority of Sunni jurists (Bukhari 185).',
  ),
  WuduStepItem(
    step: 8,
    title: 'Wiping the Ears',
    arabicName: 'مَسْحُ الأُذُنَيْن',
    instruction: 'Using the index fingers, wipe the inside grooves of both ears, and use the thumbs to wipe the outer back surface.',
    isFard: false,
    times: 1,
    hadithNote: 'The Prophet ﷺ said: "The ears are part of the head." (Sunan Ibn Majah 443).',
  ),
  WuduStepItem(
    step: 9,
    title: 'Washing Feet to the Ankles',
    arabicName: 'غَسْلُ الرِّجْلَيْنِ إِلَى الْكَعْبَيْن',
    instruction: 'Wash the right foot including the ankle bone and between the toes using the left hand pinky, three times. Repeat for the left foot.',
    isFard: true,
    times: 3,
    hadithNote: '"Woe to the heels from the Fire" warning regarding unwashed heels (Bukhari 165).',
  ),
  WuduStepItem(
    step: 10,
    title: 'Shahadah & Concluding Supplication',
    arabicName: 'دُعَاءُ الْفَرَاغِ مِنَ الْوُضُوء',
    instruction: 'Recite the Shahadah looking towards the heavens: "Ash-hadu alla ilaha illallah wahdahu la shareeka lah, wa ash-hadu anna Muhammadan abduhu wa rasuluh."',
    isFard: false,
    times: 1,
    hadithNote: '"The 8 gates of Paradise are opened for him to enter from whichever he pleases." (Sahih Muslim 234).',
  ),
];

// ── UMRAH STEPS ──────────────────────────────────────────────
const List<UmrahStepItem> kUmrahSteps = [
  UmrahStepItem(
    step: 1,
    title: 'Entering Ihram & Niyyah',
    arabicTitle: 'الإِحْرَامُ وَالتَّلْبِيَة',
    location: 'Miqat Station',
    description: 'Purify body (Ghusl), don the seamless two white towels (for men), and declare the intention for Umrah, chanting Talbiyah.',
    actions: [
      'Perform Ghusl and apply perfume to body before entering Ihram.',
      'Men put on the Rida (upper sheet) and Izar (lower wrap). Women wear modest clothing.',
      'Recite Talbiyah: "Labbayk Allahumma Labbayk, Labbayka la shareeka laka labbayk..."',
    ],
    dua: 'لَبَّيْكَ عُمْرَةً. لَبَّيْكَ اللَّهُمَّ لَبَّيْكَ، لَبَّيْكَ لَا شَرِيكَ لَكَ لَبَّيْكَ، إِنَّ الْحَمْدَ وَالنِّعْمَةَ لَكَ وَالْمُلْكَ، لَا شَرِيكَ لَكَ',
    duaTranslation: 'Here I am for Umrah. Here I am, O Allah, here I am. Here I am, You have no partner, here I am. Verily all praise, grace, and dominion are Yours. You have no partner.',
  ),
  UmrahStepItem(
    step: 2,
    title: 'Tawaf al-Umrah (7 Circuits)',
    arabicTitle: 'طَوَافُ الْعُمْرَة',
    location: 'Ka\'bah, Masjid al-Haram',
    description: 'Perform 7 counter-clockwise circuits around the Holy Ka\'bah starting from the Black Stone (Hajar al-Aswad).',
    actions: [
      'Men practice Idtiba (uncovering the right shoulder) for all 7 circuits.',
      'Men practice Raml (quick paced brisk walking) for the first 3 circuits.',
      'Touch or gesture towards the Black Stone saying "Bismillahi Allahu Akbar" at the start of each circuit.',
      'Recite the Quranic dua between the Yemeni Corner and the Black Stone.',
    ],
    dua: 'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ',
    duaTranslation: 'Our Lord! Grant us good in this world and good in the Hereafter, and save us from the torment of the Fire. (Surah Al-Baqarah 2:201)',
  ),
  UmrahStepItem(
    step: 3,
    title: 'Prayer behind Maqam Ibrahim',
    arabicTitle: 'صَلَاةُ رَكْعَتَيِ الطَّوَاف',
    location: 'Maqam Ibrahim',
    description: 'Offer 2 light Rakats behind Maqam Ibrahim (or anywhere in the Haram), then drink from Zamzam water.',
    actions: [
      'Recite Surah Al-Kafirun in Rakat 1 and Surah Al-Ikhlas in Rakat 2.',
      'Drink Zamzam water facing the Ka\'bah and make sincere du\'a.',
    ],
    dua: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ عِلْمًا نَافِعًا، وَرِزْقًا وَاسِعًا، وَشِفَاءً مِنْ كُلِّ دَاءٍ',
    duaTranslation: 'O Allah, I ask You for beneficial knowledge, abundant provision, and cure from every disease.',
  ),
  UmrahStepItem(
    step: 4,
    title: 'Sa\'i between Safa & Marwah (7 Laps)',
    arabicTitle: 'السَّعْيُ بَيْنَ الصَّفَا وَالْمَرْوَة',
    location: 'Al-Mas\'a',
    description: 'Walk 7 times between Mount Safa and Mount Marwah, commemorating the devotion of Lady Hajar (AS).',
    actions: [
      'Begin at Safa facing the Ka\'bah with Takbeer and Tahleel.',
      'Walk to Marwah (Lap 1). Safa to Marwah is 1 lap, Marwah back to Safa is Lap 2. Finishes at Marwah on Lap 7.',
      'Men jog briskly between the two green light markers.',
    ],
    dua: 'إِنَّ الصَّفَا وَالْمَرْوَةَ مِن شَعَائِرِ اللَّهِ ۖ أَبْدَأُ بِمَا بَدَأَ اللَّهُ بِهِ',
    duaTranslation: 'Indeed, Safa and Marwah are among the symbols of Allah. I begin with that with which Allah began.',
  ),
  UmrahStepItem(
    step: 5,
    title: 'Halq (Shaving) or Taqsir (Trimming)',
    arabicTitle: 'الْحَلْقُ أَوِ التَّقْصِير',
    location: 'Barber Stations outside Marwah',
    description: 'Conclude the Umrah and release from Ihram restrictions by shaving or trimming the hair.',
    actions: [
      'Men: Halq (complete shaving) is threefold more rewarded; Taqsir (trimming evenly from all sides) is permissible.',
      'Women: Cut a fingertip\'s length (approx 1-2 cm) from the ends of their gathered hair.',
      'Upon hair cutting, all Ihram prohibitions are completely lifted. Umrah is complete!',
    ],
    dua: 'اللَّهُمَّ اغْفِرْ لِلْمُحَلِّقِينَ وَالْمُقَصِّرِينَ',
    duaTranslation: 'O Allah, forgive those who shave their heads and those who shorten their hair. (Sahih al-Bukhari 1727)',
  ),
];

// ── JANAZAH STEPS ─────────────────────────────────────────────
const List<JanazahStepItem> kJanazahSteps = [
  JanazahStepItem(
    takbeerNumber: 1,
    title: '1st Takbeer: Surah Al-Fatihah',
    arabicTitle: 'التَّكْبِيرَةُ الأُولَى: قِرَاءَةُ الْفَاتِحَة',
    action: 'Raise hands to shoulders/ears, say "Allahu Akbar", fold hands over chest, and quietly recite Surah Al-Fatihah.',
    arabicRecitation: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ • الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ • الرَّحْمَٰنِ الرَّحِيمِ • مَالِكِ يَوْمِ الدِّينِ • إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ • اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ • صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ',
    transliteration: 'Bismillahir-Rahmanir-Raheem. Alhamdu lillahi Rabbil-alameen. Ar-Rahmanir-Raheem. Maliki yawmid-deen. Iyyaka na\'budu wa iyyaka nasta\'een. Ihdinas-siratal-mustaqeem. Siratalladheena an\'amta alayhim ghayril-maghdoobi alayhim wa lad-daalleen.',
    englishTranslation: 'In the name of Allah, Most Gracious, Most Merciful. Praise be to Allah, Lord of the worlds. Most Gracious, Most Merciful. Master of the Day of Judgment. You alone we worship, and You alone we ask for help. Guide us to the straight path...',
    urduTranslation: 'شروع اللہ کے نام سے جو بڑا مہربان نہایت رحم والا ہے۔ سب تعریفیں اللہ کے لیے ہیں جو تمام جہانوں کا پروردگار ہے۔ بڑا مہربان نہایت رحم فرمانے والا۔ جزا کے دن کا مالک...',
  ),
  JanazahStepItem(
    takbeerNumber: 2,
    title: '2nd Takbeer: Durood Ibrahim (Salawat)',
    arabicTitle: 'التَّكْبِيرَةُ الثَّانِيَة: الصَّلَاةُ عَلَى النَّبِيِّ ﷺ',
    action: 'Say "Allahu Akbar" (without bowing/prostrating) and send peace and blessings upon the Prophet Muhammad ﷺ.',
    arabicRecitation: 'اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ، كَمَا صَلَّيْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ، إِنَّكَ حَمِيدٌ مَجِيدٌ. اللَّهُمَّ بَارِكْ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ، كَمَا بَارَكْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ، إِنَّكَ حَمِيدٌ مَجِيدٌ',
    transliteration: 'Allahumma salli ala Muhammadin wa ala ali Muhammad, kama sallayta ala Ibraheema wa ala ali Ibraheem, innaka Hameedun Majeed. Allahumma barik ala Muhammadin wa ala ali Muhammad, kama barakta ala Ibraheema wa ala ali Ibraheem, innaka Hameedun Majeed.',
    englishTranslation: 'O Allah, bestow peace upon Muhammad and the family of Muhammad, as You bestowed peace upon Abraham and the family of Abraham. Indeed You are Praiseworthy and Glorious...',
    urduTranslation: 'اے اللہ! رحمت نازل فرما محمد ﷺ پر اور ان کی آل پر جیسا کہ تو نے رحمت نازل فرمائی ابراہیم علیہ السلام پر اور ان کی آل پر، بے شک تو قابل تعریف اور بڑی شان والا ہے۔',
  ),
  JanazahStepItem(
    takbeerNumber: 3,
    title: '3rd Takbeer: Supplication for Deceased',
    arabicTitle: 'التَّكْبِيرَةُ الثَّالِثَة: الدُّعَاءُ لِلْمَيِّت',
    action: 'Say "Allahu Akbar" and make sincere, fervent du\'a for the deceased soul, seeking divine pardon and expansive mercy.',
    arabicRecitation: 'اللَّهُمَّ اغْفِرْ لِحَيِّنَا وَمَيِّتِنَا، وَشَاهِدِنَا وَغَائِبِنَا، وَصَغِيرِنَا وَكَبِيرِنَا، وَذَكَرِنَا وَأُنْثَانَا. اللَّهُمَّ مَنْ أَحْيَيْتَهُ مِنَّا فَأَحْيِهِ عَلَى الإِسْلاَمِ، وَمَنْ تَوَفَّيْتَهُ مِنَّا فَتَوَفَّهُ عَلَى الإِيمَانِ. اللَّهُمَّ لاَ تَحْرِمْنَا أَجْرَهُ، وَلاَ تُضِلَّنَا بَعْدَهُ',
    transliteration: 'Allahummaghfir lihayyina wa mayyitina, wa shahidina wa gha\'ibina, wa sagheerina wa kabeerina, wa dhakarina wa unthana. Allahumma man ahyaytahu minna fa-ahyihi \'alal-Islam, wa man tawaffaytahu minna fa-tawaffahu \'alal-Iman. Allahumma la tahrimna ajrah, wa la tudillana ba\'dah.',
    englishTranslation: 'O Allah, forgive our living and our deceased, those present and those absent, our young and our elderly, our males and our females. O Allah, whomever You keep alive among us, let him live upon Islam, and whomever You take in death, let him die upon Faith. O Allah, do not deprive us of his reward and do not lead us astray after him.',
    urduTranslation: 'اے اللہ! ہمارے زندوں اور مردوں کو، ہمارے حاضرین اور غائبین کو، ہمارے چھوٹوں اور بڑوں کو، اور ہمارے مردوں اور عورتوں کو بخش دے۔ اے اللہ! ہم میں سے جس کو تو زندہ رکھے اسے اسلام پر زندہ رکھ اور جس کو موت دے اسے ایمان پر موت دے۔',
  ),
  JanazahStepItem(
    takbeerNumber: 4,
    title: '4th Takbeer: Closing Du\'a & Tasleem',
    arabicTitle: 'التَّكْبِيرَةُ الرَّابِعَة: التَّسْلِيم',
    action: 'Say "Allahu Akbar", pause briefly in silent prayer for all Muslims, then turn head to right saying "Assalamu alaykum wa rahmatullah" (and left optionally).',
    arabicRecitation: 'السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللَّهِ',
    transliteration: 'Assalamu alaykum wa rahmatullah.',
    englishTranslation: 'May peace and mercy of Allah be upon you.',
    urduTranslation: 'تم پر اللہ کی سلامتی اور اس کی رحمت ہو۔',
  ),
];

// ── DAILY ADAB (SUNNAH ETIQUETTE) ─────────────────────────────
const List<AdabCategoryItem> kDailyAdabCategories = [
  AdabCategoryItem(
    id: 'eating',
    title: 'Eating & Drinking',
    icon: 'restaurant',
    description: 'Prophetic guidelines for blessed, mindful nourishment.',
    rules: [
      AdabRuleItem(
        title: 'Say Bismillah & Use Right Hand',
        instruction: 'Always eat and drink with the right hand and commence with the name of Allah.',
        arabicDua: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
        duaTranslation: 'In the name of Allah, Most Gracious, Most Merciful.',
        hadithReference: '"O young boy, say Bismillah, eat with your right hand, and eat from what is in front of you." (Bukhari 5376)',
      ),
      AdabRuleItem(
        title: 'Rule of Thirds (Moderation)',
        instruction: 'Do not overfill stomach. Dedicate 1/3 for food, 1/3 for drink, and 1/3 for breath.',
        arabicDua: '',
        duaTranslation: '',
        hadithReference: 'Prophet Muhammad ﷺ said: "The son of Adam fills no vessel worse than his stomach." (Tirmidhi 2380)',
      ),
      AdabRuleItem(
        title: 'Concluding Gratitude',
        instruction: 'Praise Allah upon finishing your meal.',
        arabicDua: 'الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنَا وَسَقَانَا وَجَعَلَنَا مُسْلِمِينَ',
        duaTranslation: 'Praise be to Allah Who has fed us, given us drink, and made us Muslims.',
        hadithReference: 'Sunan Abi Dawud 3850',
      ),
    ],
  ),
  AdabCategoryItem(
    id: 'sleep',
    title: 'Sleeping & Waking',
    icon: 'bedtime',
    description: 'Transforming resting hours into continuous worship.',
    rules: [
      AdabRuleItem(
        title: 'Sleep in State of Wudu on Right Side',
        instruction: 'Perform Wudu before bed and lie on your right side facing Qibla with right hand under cheek.',
        arabicDua: 'بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا',
        duaTranslation: 'In Your Name, O Allah, I die and I live.',
        hadithReference: 'Sahih al-Bukhari 6312',
      ),
      AdabRuleItem(
        title: 'Recite Ayat al-Kursi & Mu\'awwidhat',
        instruction: 'Recite Ayat al-Kursi and Surahs Ikhlas, Falaq, and Nas into hands, blowing and wiping over whole body.',
        arabicDua: 'اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ...',
        duaTranslation: 'Allah! There is no deity except Him, the Ever-Living, the Sustainer of all existence...',
        hadithReference: 'Sahih al-Bukhari 5017',
      ),
      AdabRuleItem(
        title: 'Waking Supplication',
        instruction: 'Wipe sleep from face and express gratitude to the Giver of life.',
        arabicDua: 'الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ',
        duaTranslation: 'All praise is for Allah Who gave us life after having caused us to die, and to Him is the Resurrection.',
        hadithReference: 'Sahih al-Bukhari 6314',
      ),
    ],
  ),
  AdabCategoryItem(
    id: 'mosque',
    title: 'Entering & Mosque Manners',
    icon: 'mosque',
    description: 'Sanctity of the House of Allah and congregational presence.',
    rules: [
      AdabRuleItem(
        title: 'Entering with Right Foot & Dua',
        instruction: 'Step in with the right foot and invoke blessings upon the Prophet ﷺ.',
        arabicDua: 'اللَّهُمَّ افْتَحْ لِي أَبْوَابَ رَحْمَتِكَ',
        duaTranslation: 'O Allah! Open for me the doors of Your Mercy.',
        hadithReference: 'Sahih Muslim 713',
      ),
      AdabRuleItem(
        title: 'Tahiyyat al-Masjid',
        instruction: 'Offer two Rakats greeting prayer before sitting down.',
        arabicDua: '',
        duaTranslation: '',
        hadithReference: '"When one of you enters the mosque, let him not sit until he prays two rakats." (Bukhari 444)',
      ),
      AdabRuleItem(
        title: 'Exiting with Left Foot',
        instruction: 'Step out with the left foot and seek Allah\'s bounty.',
        arabicDua: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ مِنْ فَضْلِكَ',
        duaTranslation: 'O Allah, I ask You from Your Bounty.',
        hadithReference: 'Sahih Muslim 713',
      ),
    ],
  ),
  AdabCategoryItem(
    id: 'greetings',
    title: 'Greetings & Speech',
    icon: 'people',
    description: 'Spreading peace, authentic Salam, and guarding the tongue.',
    rules: [
      AdabRuleItem(
        title: 'Spread the Salam',
        instruction: 'Greet young and old with the full Islamic greeting.',
        arabicDua: 'السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ',
        duaTranslation: 'Peace be upon you, and the mercy of Allah and His blessings.',
        hadithReference: '"You will not enter Paradise until you believe, and you will not believe until you love one another. Shall I guide you to something? Spread Salam amongst you." (Muslim 54)',
      ),
      AdabRuleItem(
        title: 'Guard the Tongue',
        instruction: 'Speak only good or remain silent. Avoid backbiting (Gheebah) and falsehood.',
        arabicDua: '',
        duaTranslation: '',
        hadithReference: '"Whoever believes in Allah and the Last Day, let him speak good or remain silent." (Bukhari 6018)',
      ),
    ],
  ),
];

// ── KIDS ISLAMIC STORIES & QUIZ ──────────────────────────────
const List<KidStoryItem> kKidsStories = [
  KidStoryItem(
    id: 'story-adam',
    prophetName: 'Prophet Adam (AS)',
    title: 'The First Human & The Garden of Peace',
    summary: 'How Allah created Prophet Adam (AS) from clay, taught him the names of all things, and granted him repentance.',
    fullStory: 'Long before humans roamed the earth, Allah announced to the angels: "I am placing a trustee on earth." Allah created Adam with His own power, fashioned him from clay, and breathed life into him. Allah taught Adam the names of every tree, star, and creature that angels did not know! When Iblis refused to respect Adam due to pride, he was cast out. Later, Adam and Hawwa made a mistake by eating from the forbidden tree, but unlike Iblis who was arrogant, Adam immediately felt regret, turned back to Allah in sincere prayer, and Allah warmly accepted his repentance and made him the first Prophet.',
    moralLesson: 'Always admit your mistakes quickly, say Astaghfirullah, and never let pride take over your heart.',
    keyAyah: 'قَالَا رَبَّنَا ظَلَمْنَا أَنفُسَنَا وَإِن لَّمْ تَغْفِرْ لَنَا وَتَرْحَمْنَا لَنَكُونَنَّ مِنَ الْخَاسِرِينَ',
    ayahRef: 'Surah Al-A\'raf 7:23',
  ),
  KidStoryItem(
    id: 'story-nuh',
    prophetName: 'Prophet Nuh (AS)',
    title: 'The Great Ark of Faith & Patience',
    summary: 'Prophet Nuh called his people to goodness for 950 years and built a massive ship on dry land with unshakable trust in Allah.',
    fullStory: 'Prophet Nuh (AS) was patient, kind, and devoted. Day and night, for nearly 950 years, he invited his community to worship the One Creator and care for the poor. But the leaders mocked him. Allah instructed Nuh to build a gigantic wooden Ark on dry mountain land. People laughed, asking: "Where is the sea?" Nuh calmly replied that Allah\'s promise is absolute truth. When torrential rains gushed from the sky and springs burst from the earth, Nuh welcomed pairs of animals and all faithful believers onto the Ark, sailing safely over stormy waves under Allah\'s divine care.',
    moralLesson: 'Trust Allah even when others doubt you. Patience and perseverance always lead to ultimate victory.',
    keyAyah: 'وَاصْنَعِ الْفُلْكَ بِأَعْيُنِنَا وَوَحْيِنَا',
    ayahRef: 'Surah Hud 11:37',
  ),
  KidStoryItem(
    id: 'story-ibrahim',
    prophetName: 'Prophet Ibrahim (AS)',
    title: 'The Friend of Allah & The Cool Fire',
    summary: 'Young Ibrahim discovered the Creator of the sun and stars, stood for truth, and fire became cool for him.',
    fullStory: 'Growing up in Babylon where people carved statues from stone, young Ibrahim looked at the night sky. He saw a shining star and thought: "Is this my Lord?" But it set. He saw the luminous moon and bright sun, but they also disappeared. Ibrahim realized: "I turn my face to the One who created the heavens and earth!" When the king threw Ibrahim into a roaring furnace for speaking truth, Allah commanded the fire: "O Fire! Be cool and peaceful for Ibrahim!" The flames did not harm a single hair of Ibrahim.',
    moralLesson: 'Use your mind to seek truth, stand brave for justice, and know that Allah protects those who love Him.',
    keyAyah: 'قُلْنَا يَا نَارُ كُونِي بَرْدًا وَسَلَامًا عَلَىٰ إِبْرَاهِيمَ',
    ayahRef: 'Surah Al-Anbiya 21:69',
  ),
  KidStoryItem(
    id: 'story-muhammad',
    prophetName: 'Prophet Muhammad ﷺ',
    title: 'The Truthful, The Trustworthy & The Mercy to All Worlds',
    summary: 'From an orphan boy known as Al-Amin to the greatest Messenger who changed humanity with kindness.',
    fullStory: 'Born in Makkah without a father, young Muhammad ﷺ grew up with unmatched honesty, kindness, and compassion. Even before becoming a Prophet, all Makkans called him "Al-Sadiq" (The Truthful) and "Al-Amin" (The Trustworthy). At age 40 in Cave Hira, Angel Jibril embraced him with the first revelation: "Iqra! (Read in the Name of your Lord)". Despite persecution, he never sought revenge. When he returned victorious to Makkah, he forgave all his former persecutors, declaring: "Go, for you are all free!"',
    moralLesson: 'Kindness, honesty, and forgiveness are the greatest superpowers of a true Muslim.',
    keyAyah: 'وَمَا أَرْسَلْنَاكَ إِلَّا رَحْمَةً لِّلْعَالَمِينَ',
    ayahRef: 'Surah Al-Anbiya 21:107',
  ),
];

const List<KidQuizItem> kKidsQuiz = [
  KidQuizItem(
    question: 'How many daily mandatory (Fard) prayers are there in Islam?',
    options: ['3', '5', '7', '10'],
    correctIndex: 1,
    explanation: 'There are 5 daily obligatory prayers: Fajr, Dhuhr, Asr, Maghrib, and Isha.',
  ),
  KidQuizItem(
    question: 'What was the first word revealed of the Holy Qur\'an?',
    options: ['Bismillah', 'Alhamdulillah', 'Iqra (Read)', 'Salam'],
    correctIndex: 2,
    explanation: 'Angel Jibril commanded Prophet Muhammad ﷺ in Cave Hira with the word "Iqra" (Read).',
  ),
  KidQuizItem(
    question: 'In which holy city was Prophet Muhammad ﷺ born?',
    options: ['Madinah', 'Jerusalem', 'Makkah', 'Cairo'],
    correctIndex: 2,
    explanation: 'Prophet Muhammad ﷺ was born in the sacred city of Makkah in the Year of the Elephant (570 CE).',
  ),
  KidQuizItem(
    question: 'Which sacred month do Muslims fast from dawn to dusk?',
    options: ['Rajab', 'Sha\'ban', 'Ramadan', 'Muharram'],
    correctIndex: 2,
    explanation: 'Ramadan is the 9th month of the Islamic calendar during which the Quran was first revealed.',
  ),
  KidQuizItem(
    question: 'What is the name of the holy well in Masjid al-Haram in Makkah?',
    options: ['Kawsar', 'Zamzam', 'Salsabil', 'Tasneem'],
    correctIndex: 1,
    explanation: 'Zamzam water miraculously gushed forth beneath infant Prophet Ismail (AS) and Lady Hajar.',
  ),
];
