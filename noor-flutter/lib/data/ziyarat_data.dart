// ============================================================
// NOOR — Authenticated Global Ziyarat & Sanctuaries Database (Dart)
// Verified against classical chronicles and heritage records
// ============================================================

class SanctuaryItem {
  final String id;
  final String name;
  final String arabicName;
  final String urduName;
  final String region;
  final String city;
  final String country;
  final double latitude;
  final double longitude;
  final String honorific;
  final String architecturalStyle;
  final String summary;
  final String chronicle;
  final List<String> etiquettes;
  final String ziyaratDua;
  final String duaTranslation;

  const SanctuaryItem({
    required this.id,
    required this.name,
    required this.arabicName,
    required this.urduName,
    required this.region,
    required this.city,
    required this.country,
    required this.latitude,
    required this.longitude,
    required this.honorific,
    required this.architecturalStyle,
    required this.summary,
    required this.chronicle,
    required this.etiquettes,
    required this.ziyaratDua,
    required this.duaTranslation,
  });
}

const List<SanctuaryItem> kSanctuariesList = [
  SanctuaryItem(
    id: 'sanctuary-kaaba-makkah',
    name: 'Masjid al-Haram & The Holy Ka\'bah',
    arabicName: 'المسجد الحرام والكعبة المشرفة',
    urduName: 'مسجد الحرام اور بیت اللہ شریف',
    region: 'Saudi Arabia / Hijaz',
    city: 'Makkah al-Mukarramah',
    country: 'Saudi Arabia',
    latitude: 21.4225,
    longitude: 39.8262,
    honorific: 'Qiblat al-Muslimeen • Bayt Allah al-Haram',
    architecturalStyle: 'Grand Islamic Colonnades, Multi-Tier Mataf, White Marble & Golden Calligraphy',
    summary: 'The holiest sanctuary in Islam, the primordial house of monotheism built by Prophet Ibrahim and Ismail (AS).',
    chronicle: 'The first house appointed for humanity is that at Bakkah, full of blessing and of guidance for all realms (Qur\'an 3:96). Offering prayer here carries the reward of 100,000 regular prayers.',
    etiquettes: [
      'Enter with humility, reciting Tahiyyat al-Haram (Tawaf for visitors).',
      'Make abundant istighfar upon first viewing the Holy Ka\'bah.',
      'Maintain continuous respect, avoiding raising voice or pushing others.',
      'Drink Zamzam water with sincere prayers facing Qibla.',
    ],
    ziyaratDua: 'اللَّهُمَّ زِدْ هَذَا الْبَيْتَ تَشْرِيفًا وَتَعْظِيمًا وَتَكْرِيمًا وَمَهَابَةً، وَزِدْ مَنْ شَرَّفَهُ وَعَظَّمَهُ مِمَّنْ حَجَّهُ أَوِ اعْتَمَرَهُ تَشْرِيفًا وَتَكْرِيمًا وَتَعْظِيمًا وَبِرًّا',
    duaTranslation: 'O Allah, increase this House in honor, greatness, nobility, and awe; and increase those who honor and venerate it among those who perform Hajj or Umrah in honor, nobility, greatness, and piety.',
  ),
  SanctuaryItem(
    id: 'sanctuary-prophets-mosque-madinah',
    name: 'Al-Masjid an-Nabawi & The Sacred Rawdah',
    arabicName: 'المسجد النبوي الشريف والروضة المباركة',
    urduName: 'مسجد نبوی شریف اور روضہ اطہر',
    region: 'Saudi Arabia / Hijaz',
    city: 'Madinah al-Munawwarah',
    country: 'Saudi Arabia',
    latitude: 24.4672,
    longitude: 39.6109,
    honorific: 'Madinat ar-Rasool • Taybah al-Tayyibah',
    architecturalStyle: 'Green Dome (Al-Qubbah al-Khadra), Ottoman & Saudi Marble Architecture, Retractable Umbrellas',
    summary: 'The sacred resting place of the Prophet Muhammad ﷺ and the luminous heart of the early Islamic civilization.',
    chronicle: 'Established by Prophet Muhammad ﷺ upon the Hijrah in 622 CE. Within it lies the Rawdah ash-Sharifah, regarding which the Prophet ﷺ said: "Between my house and my pulpit is a garden from the gardens of Paradise." (Bukhari)',
    etiquettes: [
      'Walk with serene veneration and lowered gaze.',
      'Send abundant Salawat upon the Beloved Messenger ﷺ.',
      'Convey Salam quietly at the Muwajahah Sharifa to the Prophet ﷺ, Abu Bakr (RA), and Umar (RA).',
      'Offer two Rakats prayer in the Rawdah with deep gratitude.',
    ],
    ziyaratDua: 'السَّلَامُ عَلَيْكَ يَا رَسُولَ اللَّهِ، السَّلَامُ عَلَيْكَ يَا حَبِيبَ اللَّهِ، السَّلَامُ عَلَيْكَ يَا خَيْرَةَ خَلْقِ اللَّهِ، أَشْهَدُ أَنَّكَ بَلَّغْتَ الرِّسَالَةَ، وَأَدَّيْتَ الأَمَانَةَ، وَنَصَحْتَ الأُمَّةَ، وَجَاهَدْتَ فِي اللَّهِ حَقَّ جِهَادِهِ',
    duaTranslation: 'Peace be upon you, O Messenger of Allah. Peace be upon you, O Beloved of Allah. Peace be upon you, O Best of Allah\'s creation. I bear witness that you delivered the Message, fulfilled the Trust, counseled the Ummah, and strove for Allah with true devotion.',
  ),
  SanctuaryItem(
    id: 'sanctuary-alaqsa-jerusalem',
    name: 'Al-Masjid al-Aqsa & Dome of the Rock',
    arabicName: 'المسجد الأقصى وقبة الصخرة المشرفة',
    urduName: 'مسجد اقصی اور قبۃ الصخرہ',
    region: 'Levant / Palestine',
    city: 'Al-Quds (Jerusalem)',
    country: 'Palestine',
    latitude: 31.7761,
    longitude: 35.2358,
    honorific: 'Oula al-Qiblatayn • Third Sacred Sanctuary',
    architecturalStyle: 'Golden Dome, Umayyad & Ottoman Mosaic Tiles, Ancient Olive Groves, 144 Dunam Sacred Esplanade',
    summary: 'The first Qibla of Islam and the sacred destination of the Miraculous Night Journey (Al-Isra wal-Mi\'raj).',
    chronicle: 'Mentioned in Surah Al-Isra (17:1): "Glory be to Him Who took His servant for a journey by night from al-Masjid al-Haram to al-Masjid al-Aqsa whose surroundings We have blessed." Prayer here is multiplied 500-fold in reward.',
    etiquettes: [
      'Pray with reverence within both Al-Qibli and the Dome of the Rock.',
      'Reflect on the legacy of Prophets Ibrahim, Dawud, Sulayman, Isa, and Muhammad ﷺ.',
      'Supplicate for peace, steadfastness, and justice for the sacred land.',
    ],
    ziyaratDua: 'سُبْحَانَ الَّذِي أَسْرَىٰ بِعَبْدِهِ لَيْلًا مِّنَ الْمَسْجِدِ الْحَرَامِ إِلَى الْمَسْجِدِ الْأَقْصَى الَّذِي بَارَكْنَا حَوْلَهُ لِنُرِيَهُ مِنْ آيَاتِنَا ۚ إِنَّهُ هُوَ السَّمِيعُ الْبَصِيرُ',
    duaTranslation: 'Exalted is He who took His Servant by night from al-Masjid al-Haram to al-Masjid al-Aqsa, whose surroundings We have blessed, to show him of Our signs. Indeed, He is the Hearing, the Seeing.',
  ),
  SanctuaryItem(
    id: 'sanctuary-ajmer-sharif',
    name: 'Dargah Ajmer Sharif (Khwaja Garib Nawaz)',
    arabicName: 'مقام الشيخ معين الدين الجشتي',
    urduName: 'درگاہ اجمیر شریف خواجہ معین الدین چشتی',
    region: 'South Asia / India',
    city: 'Ajmer, Rajasthan',
    country: 'India',
    latitude: 26.4562,
    longitude: 74.6277,
    honorific: 'Sultan-ul-Hind • Khwaja Garib Nawaz',
    architecturalStyle: 'Indo-Islamic White Marble Dome, Silver Plated Gateways, Langar Courtyards',
    summary: 'The sacred resting place of Hazrat Khwaja Moinuddin Hasan Chishti (RA), renowned for universal love and feeding the destitute.',
    chronicle: 'Pioneer of the Chishti Sufi order in the subcontinent (c. 1142–1236 CE). Famous for his timeless maxim: "Have the affection of the sun, the generosity of the river, and the hospitality of the earth."',
    etiquettes: [
      'Maintain pristine Wudu and quiet decorum in the courtyard.',
      'Present Darood and Salawat upon the Prophet ﷺ.',
      'Participate in the continuous tradition of Langar (feeding the poor).',
    ],
    ziyaratDua: 'اللَّهُمَّ صَلِّ عَلَى سَيِّدِنَا مُحَمَّدٍ وَعَلَى آلِ سَيِّدِنَا مُحَمَّدٍ، وَارْحَمْ عِبَادَكَ الصَّالِحِينَ وَأَوْلِيَاءَكَ الْمُتَّقِينَ',
    duaTranslation: 'O Allah, send blessings upon our Master Muhammad and the family of our Master Muhammad, and have mercy upon Your righteous servants and pious friends.',
  ),
  SanctuaryItem(
    id: 'sanctuary-imam-ali-najaf',
    name: 'Holy Shrine of Imam Ali (AS)',
    arabicName: 'حرم الإمام علي بن أبي طالب عليه السلام',
    urduName: 'حرم امیر المومنین حضرت علی علیہ السلام',
    region: 'Iraq / Mesopotamia',
    city: 'Najaf al-Ashraf',
    country: 'Iraq',
    latitude: 31.9961,
    longitude: 44.3142,
    honorific: 'Amir al-Mu\'mineen • Bab Madinat al-Ilm',
    architecturalStyle: 'Golden Dome & Twin Minarets, Exquisite Persian Mirror Work, Intricate Lapis Calligraphy',
    summary: 'The sanctuary of the fourth Rightly Guided Caliph, cousin and son-in-law of Prophet Muhammad ﷺ.',
    chronicle: 'Regarding him the Prophet ﷺ stated: "I am the city of knowledge and Ali is its gate." (Tirmidhi). Najaf has flourished for centuries as a global citadel of Islamic scholarship (Hawza Ilmiyya).',
    etiquettes: [
      'Enter through Bab al-Qibla with serenity and reverence.',
      'Reflect on the justice, wisdom, and asceticism of Imam Ali (AS).',
      'Recite Ziyarat Aminullah and Dua Kumayl on Thursday nights.',
    ],
    ziyaratDua: 'السَّلَامُ عَلَيْكَ يَا أَمِيرَ الْمُؤْمِنِينَ، السَّلَامُ عَلَيْكَ يَا صَفْوَةَ اللَّهِ، السَّلَامُ عَلَيْكَ يَا وَصِيَّ رَسُولِ اللَّهِ',
    duaTranslation: 'Peace be upon you, O Commander of the Faithful. Peace be upon you, O chosen one of Allah. Peace be upon you, O trustee of the Messenger of Allah.',
  ),
  SanctuaryItem(
    id: 'sanctuary-imam-hussain-karbala',
    name: 'Holy Shrine of Imam Hussain (AS)',
    arabicName: 'حرم الإمام الحسين عليه السلام',
    urduName: 'حرم سید الشہداء حضرت امام حسین علیہ السلام',
    region: 'Iraq / Mesopotamia',
    city: 'Karbala al-Muqaddasa',
    country: 'Iraq',
    latitude: 32.6164,
    longitude: 44.0324,
    honorific: 'Sayyid ash-Shuhada • Rayhanat an-Nabi',
    architecturalStyle: 'Grand Golden Dome, Courtyards of Bayn al-Haramayn, Traditional Iraqi Kashi Tilework',
    summary: 'The resting place of the beloved grandson of the Prophet ﷺ and leader of the youth of Paradise.',
    chronicle: 'Site of the historic stand for truth and justice in Muharram 61 AH (680 CE). The Prophet ﷺ declared: "Hussain is from me and I am from Hussain; Allah loves whoever loves Hussain." (Tirmidhi 3775).',
    etiquettes: [
      'Approach with solemn contemplation of the sacrifices for Islamic values.',
      'Recite Ziyarat Warith with deep mindfulness.',
      'Offer sincere prayers for justice, truth, and relief of the oppressed.',
    ],
    ziyaratDua: 'السَّلَامُ عَلَيْكَ يَا أَبَا عَبْدِ اللَّهِ، السَّلَامُ عَلَيْكَ يَا ابْنَ رَسُولِ اللَّهِ، السَّلَامُ عَلَيْكَ يَا خِيَرَةَ اللَّهِ وَابْنَ خِيَرَتِهِ',
    duaTranslation: 'Peace be upon you, O Aba Abdillah. Peace be upon you, O son of the Messenger of Allah. Peace be upon you, O chosen one of Allah and son of His chosen one.',
  ),
];
