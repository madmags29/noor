// ============================================================
// NOOR — Global Islamic Map Points Database (Dart)
// ============================================================

class IslamicMapPoint {
  final String id;
  final String name;
  final String arabicName;
  final String type; // 'mosque', 'holy_site', 'halal_center'
  final String city;
  final String country;
  final double latitude;
  final double longitude;
  final String description;
  final String architecturalStyle;

  const IslamicMapPoint({
    required this.id,
    required this.name,
    required this.arabicName,
    required this.type,
    required this.city,
    required this.country,
    required this.latitude,
    required this.longitude,
    required this.description,
    required this.architecturalStyle,
  });
}

const List<IslamicMapPoint> kIslamicMapPoints = [
  IslamicMapPoint(
    id: 'point-makkah',
    name: 'Masjid al-Haram (The Holy Ka\'bah)',
    arabicName: 'المسجد الحرام • مكة المكرمة',
    type: 'holy_site',
    city: 'Makkah',
    country: 'Saudi Arabia',
    latitude: 21.4225,
    longitude: 39.8262,
    description: 'The supreme sanctuary in Islam, encircling the Holy Ka\'bah and Zamzam well.',
    architecturalStyle: 'Grand Islamic Multi-Tier White Marble & 9 Minarets',
  ),
  IslamicMapPoint(
    id: 'point-madinah',
    name: 'Masjid an-Nabawi (The Prophet\'s Mosque)',
    arabicName: 'المسجد النبوي الشريف • المدينة المنورة',
    type: 'holy_site',
    city: 'Madinah',
    country: 'Saudi Arabia',
    latitude: 24.4672,
    longitude: 39.6109,
    description: 'Second holiest sanctuary, encompassing the Sacred Rawdah and the Green Dome.',
    architecturalStyle: 'Green Dome, Retractable Umbrellas & Ottoman Courtyards',
  ),
  IslamicMapPoint(
    id: 'point-alaqsa',
    name: 'Al-Masjid al-Aqsa & Dome of the Rock',
    arabicName: 'المسجد الأقصى المبارك • القدس الشريف',
    type: 'holy_site',
    city: 'Jerusalem (Al-Quds)',
    country: 'Palestine',
    latitude: 31.7761,
    longitude: 35.2358,
    description: 'First Qibla of Islam and destination of Al-Isra wal-Mi\'raj.',
    architecturalStyle: 'Golden Dome, Umayyad & Ottoman Mosaic Tilework',
  ),
  IslamicMapPoint(
    id: 'point-sultanahmet',
    name: 'Sultan Ahmed Mosque (Blue Mosque)',
    arabicName: 'جامع السلطان أحمد • إسطنبول',
    type: 'mosque',
    city: 'Istanbul',
    country: 'Turkey',
    latitude: 41.0054,
    longitude: 28.9768,
    description: 'Iconic Ottoman imperial mosque famous for its hand-painted blue Iznik tiles and 6 minarets.',
    architecturalStyle: 'Classical Ottoman Architecture with Central Cascading Domes',
  ),
  IslamicMapPoint(
    id: 'point-sheikh-zayed',
    name: 'Sheikh Zayed Grand Mosque',
    arabicName: 'جامع الشيخ زايد الكبير • أبوظبي',
    type: 'mosque',
    city: 'Abu Dhabi',
    country: 'United Arab Emirates',
    latitude: 24.4128,
    longitude: 54.4749,
    description: 'Marvel of contemporary Islamic architecture with 82 white marble domes and pure crystal chandeliers.',
    architecturalStyle: 'Modern Islamic Sivec White Marble with Reflecting Pools',
  ),
  IslamicMapPoint(
    id: 'point-jama-masjid-delhi',
    name: 'Jama Masjid Delhi (Masjid-i-Jahan-Numa)',
    arabicName: 'جامع مسجد دلهي • الهند',
    type: 'mosque',
    city: 'New Delhi',
    country: 'India',
    latitude: 28.6507,
    longitude: 77.2334,
    description: 'One of the largest Mughal mosques built by Emperor Shah Jahan in 1656 CE.',
    architecturalStyle: 'Red Sandstone & White Marble with Striped Domes',
  ),
  IslamicMapPoint(
    id: 'point-hassan-ii',
    name: 'Hassan II Mosque',
    arabicName: 'مسجد الحسن الثاني • الدار البيضاء',
    type: 'mosque',
    city: 'Casablanca',
    country: 'Morocco',
    latitude: 33.6086,
    longitude: -7.6326,
    description: 'Stands dramatically on the Atlantic Ocean featuring the world\'s second tallest minaret (210m).',
    architecturalStyle: 'Moorish & Andalusian Architecture with Handcrafted Zellij Tilework',
  ),
  IslamicMapPoint(
    id: 'point-badshahi',
    name: 'Badshahi Mosque',
    arabicName: 'بادشاہی مسجد • لاہور',
    type: 'mosque',
    city: 'Lahore',
    country: 'Pakistan',
    latitude: 31.5881,
    longitude: 74.3096,
    description: 'Grand monumental Mughal mosque built in 1673 CE with red sandstone and marble inlays.',
    architecturalStyle: 'Imperial Mughal Architecture with Expansive Courtyard',
  ),
];
