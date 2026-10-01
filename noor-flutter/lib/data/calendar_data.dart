// ============================================================
// NOOR — Sacred Islamic Lunar Calendar & Events Engine (Dart)
// ============================================================

class IslamicMonthItem {
  final int number;
  final String nameEn;
  final String nameAr;
  final String nameUr;
  final bool isSacred;
  final String virtue;

  const IslamicMonthItem({
    required this.number,
    required this.nameEn,
    required this.nameAr,
    required this.nameUr,
    required this.isSacred,
    required this.virtue,
  });
}

class HijriDate {
  final int year;
  final int month;
  final int day;
  final String monthNameEn;
  final String monthNameAr;

  const HijriDate({
    required this.year,
    required this.month,
    required this.day,
    required this.monthNameEn,
    required this.monthNameAr,
  });

  String get formatted => '$day $monthNameEn $year AH';
}

HijriDate getHijriDate(DateTime date) {
  int day = date.day;
  int month = date.month;
  int year = date.year;

  int m = month;
  int y = year;
  if (m < 3) {
    y -= 1;
    m += 12;
  }

  int a = (y / 100).floor();
  int b = 2 - a + (a / 4).floor();
  int jd = (365.25 * (y + 4716)).floor() + (30.6001 * (m + 1)).floor() + day + b - 1524;

  double z = jd - 1948440 + 10632;
  double n = ((z - 1) / 10631).floorToDouble();
  z = z - 10631 * n + 354;

  double j = ((10985 - z) / 5316).floorToDouble() * ((50 * z + 17719) / 985).floorToDouble() +
      (z / 10985).floorToDouble() * ((30 * z - 17719) / 595).floorToDouble();

  z = z - ((30 - j) / 15).floorToDouble() * ((17719 * j) / 50).floorToDouble() -
      (j / 16).floorToDouble() * ((595 * j) / 30).floorToDouble() + 29;

  int hMonth = ((24 * z) / 709).floor();
  int hDay = (z - ((709 * hMonth) / 24).floor()).toInt();
  int hYear = (30 * n + j - 30).toInt();

  if (hMonth < 1) hMonth = 1;
  if (hMonth > 12) hMonth = 12;

  final monthItem = kIslamicMonths[hMonth - 1];

  return HijriDate(
    year: hYear,
    month: hMonth,
    day: hDay,
    monthNameEn: monthItem.nameEn,
    monthNameAr: monthItem.nameAr,
  );
}

class IslamicEventItem {
  final String title;
  final String titleAr;
  final int hijriMonth;
  final int hijriDay;
  final String description;
  final String recommendedActions;

  const IslamicEventItem({
    required this.title,
    required this.titleAr,
    required this.hijriMonth,
    required this.hijriDay,
    required this.description,
    required this.recommendedActions,
  });
}

const List<IslamicMonthItem> kIslamicMonths = [
  IslamicMonthItem(
    number: 1,
    nameEn: 'Muharram',
    nameAr: 'المُحَرَّم',
    nameUr: 'محرم الحرام',
    isSacred: true,
    virtue: 'Sacred month of Allah. Fasting on Ashura (10th) expiates the sins of the previous year.',
  ),
  IslamicMonthItem(
    number: 2,
    nameEn: 'Safar',
    nameAr: 'صَفَر',
    nameUr: 'صفر المظفر',
    isSacred: false,
    virtue: 'Second month of the calendar. A time of ongoing devotion and seeking divine protection.',
  ),
  IslamicMonthItem(
    number: 3,
    nameEn: 'Rabi\' al-Awwal',
    nameAr: 'رَبِيع الأَوَّل',
    nameUr: 'ربیع الاول',
    isSacred: false,
    virtue: 'Month of the birth and legacy of the Beloved Prophet Muhammad ﷺ (Mawlid).',
  ),
  IslamicMonthItem(
    number: 4,
    nameEn: 'Rabi\' al-Thani',
    nameAr: 'رَبِيع الآخِر',
    nameUr: 'ربیع الثانی',
    isSacred: false,
    virtue: 'Fourth month, celebrated for reflection on the righteous companions and saints.',
  ),
  IslamicMonthItem(
    number: 5,
    nameEn: 'Jumada al-Ula',
    nameAr: 'جُمَادَى الأُولَى',
    nameUr: 'جمادی الاولی',
    isSacred: false,
    virtue: 'Fifth lunar month, signifying steadfastness and prayer.',
  ),
  IslamicMonthItem(
    number: 6,
    nameEn: 'Jumada al-Akhirah',
    nameAr: 'جُمَادَى الآخِرَة',
    nameUr: 'جمادی الاخری',
    isSacred: false,
    virtue: 'Sixth month, leading into the spiritual preparation for the holy trio of Rajab, Sha\'ban, and Ramadan.',
  ),
  IslamicMonthItem(
    number: 7,
    nameEn: 'Rajab',
    nameAr: 'رَجَب',
    nameUr: 'رجب المرجب',
    isSacred: true,
    virtue: 'One of the four sacred months. Commemorates the Night Journey (Al-Isra wal-Mi\'raj).',
  ),
  IslamicMonthItem(
    number: 8,
    nameEn: 'Sha\'ban',
    nameAr: 'شَعْبَان',
    nameUr: 'شعبان المعظم',
    isSacred: false,
    virtue: 'Month of heightened fasting and forgiveness (Mid-Sha\'ban Night). Gateway to Ramadan.',
  ),
  IslamicMonthItem(
    number: 9,
    nameEn: 'Ramadan',
    nameAr: 'رَمَضَان',
    nameUr: 'رمضان المبارک',
    isSacred: false,
    virtue: 'The holy month of fasting, Qur\'an revelation, and Laylat al-Qadr (better than 1,000 months).',
  ),
  IslamicMonthItem(
    number: 10,
    nameEn: 'Shawwal',
    nameAr: 'شَوَّال',
    nameUr: 'شوال المکرم',
    isSacred: false,
    virtue: 'First day is Eid al-Fitr. Fasting 6 days in Shawwal carries the reward of fasting the whole year.',
  ),
  IslamicMonthItem(
    number: 11,
    nameEn: 'Dhul-Qi\'dah',
    nameAr: 'ذُو القَعْدَة',
    nameUr: 'ذوالقعدہ',
    isSacred: true,
    virtue: 'Sacred month of peace and preparation for the great pilgrimage of Hajj.',
  ),
  IslamicMonthItem(
    number: 12,
    nameEn: 'Dhul-Hijjah',
    nameAr: 'ذُو الحِجَّة',
    nameUr: 'ذوالحجہ',
    isSacred: true,
    virtue: 'Peak sacred month. First 10 days are the most beloved to Allah. Contains Day of Arafah and Eid al-Adha.',
  ),
];

const List<IslamicEventItem> kIslamicEvents = [
  IslamicEventItem(
    title: 'Islamic New Year',
    titleAr: 'رأس السنة الهجرية',
    hijriMonth: 1,
    hijriDay: 1,
    description: 'Commemorates the Hijrah (migration) of the Prophet ﷺ from Makkah to Madinah.',
    recommendedActions: 'Reflect on spiritual renewal, make resolution for deen, and increase dhikr.',
  ),
  IslamicEventItem(
    title: 'Day of Ashura',
    titleAr: 'يوم عاشوراء',
    hijriMonth: 1,
    hijriDay: 10,
    description: 'The day Allah saved Prophet Musa (AS) from Pharaoh, and the martyrdom of Imam Hussain (AS).',
    recommendedActions: 'Sunnah fasting on 9th & 10th (or 10th & 11th) of Muharram.',
  ),
  IslamicEventItem(
    title: 'Mawlid an-Nabi ﷺ',
    titleAr: 'المولد النبوي الشريف',
    hijriMonth: 3,
    hijriDay: 12,
    description: 'The blessed birth of the final Messenger of Allah, Muhammad ﷺ.',
    recommendedActions: 'Send abundant Salawat and Darood, study Seerah, and feed the hungry.',
  ),
  IslamicEventItem(
    title: 'Al-Isra wal-Mi\'raj',
    titleAr: 'الإسراء والمعراج',
    hijriMonth: 7,
    hijriDay: 27,
    description: 'The miraculous Night Journey from Makkah to Jerusalem and Ascension to the Heavens.',
    recommendedActions: 'Offer night prayers (Tahajjud), reflect upon the gift of the 5 daily prayers.',
  ),
  IslamicEventItem(
    title: 'Laylat al-Bara\'ah (Mid-Sha\'ban)',
    titleAr: 'ليلة النصف من شعبان',
    hijriMonth: 8,
    hijriDay: 15,
    description: 'Night of records and divine forgiveness before the arrival of Ramadan.',
    recommendedActions: 'Supplication for forgiveness, long prostrations, and fasting the following day.',
  ),
  IslamicEventItem(
    title: 'First Day of Ramadan',
    titleAr: 'أول أيام شهر رمضان المبارك',
    hijriMonth: 9,
    hijriDay: 1,
    description: 'Commencement of the blessed month of mandatory fasting and Tarawih prayers.',
    recommendedActions: 'Fast with sincerity, set daily Quran recitation goals, and give charity.',
  ),
  IslamicEventItem(
    title: 'Laylat al-Qadr (Night of Power)',
    titleAr: 'ليلة القدر المباركة',
    hijriMonth: 9,
    hijriDay: 27,
    description: 'The night the Qur\'an was first sent down; worship in it is better than a thousand months (83+ years).',
    recommendedActions: 'Seek it throughout the odd nights (21, 23, 25, 27, 29). Recite: "Allahumma innaka \'afuwwun tuhibbul-\'afwa fa\'fu \'annee."',
  ),
  IslamicEventItem(
    title: 'Eid al-Fitr',
    titleAr: 'عيد الفطر المبارك',
    hijriMonth: 10,
    hijriDay: 1,
    description: 'The festival of gratitude concluding the holy month of Ramadan.',
    recommendedActions: 'Pay Zakat al-Fitr before prayer, attend Eid prayer in congregation, and embrace loved ones.',
  ),
  IslamicEventItem(
    title: 'Day of Arafah',
    titleAr: 'يوم عرفة',
    hijriMonth: 12,
    hijriDay: 9,
    description: 'The greatest day of Hajj on the plains of Mount Arafat.',
    recommendedActions: 'Fasting on this day expiates sins of previous and upcoming year for non-pilgrims.',
  ),
  IslamicEventItem(
    title: 'Eid al-Adha',
    titleAr: 'عيد الأضحى المبارك',
    hijriMonth: 12,
    hijriDay: 10,
    description: 'The feast of sacrifice honoring the devotion of Prophet Ibrahim and Ismail (AS).',
    recommendedActions: 'Offer Eid prayer, perform Qurbani (Udhiyah), and chant Takbeer Tashreeq.',
  ),
];
