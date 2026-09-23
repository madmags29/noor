export interface MediaItem {
  id: number;
  title: string;
  category: 'Makkah' | 'Madinah' | 'Holy Quran' | 'Architecture' | 'Calligraphy' | 'Twilight';
  tags: string;
  previewUrl: string;
  hdUrl: string;
  likes: number;
  views: number;
  source: string;
  location: string;
}

export interface VideoItem {
  id: number;
  title: string;
  category: 'Makkah' | 'Madinah' | 'Holy Quran' | 'Architecture' | 'Twilight';
  duration: string;
  videoUrl: string;
  thumbnail: string;
  views: number;
  likes: number;
  description: string;
  location: string;
}

export const MEDIA_GALLERY: MediaItem[] = [
  {
    id: 101,
    title: 'The Holy Kaaba • Makkah Al-Mukarramah',
    category: 'Makkah',
    tags: 'makkah, kaaba, masjid al haram, pilgrimage, hajj',
    previewUrl: 'https://images.unsplash.com/photo-1565552645632-d725f8bfc19a?w=600&q=80',
    hdUrl: 'https://images.unsplash.com/photo-1565552645632-d725f8bfc19a?w=1600&q=90',
    likes: 9820,
    views: 124000,
    source: 'Noor Islamic Media',
    location: 'Masjid al-Haram, Makkah'
  },
  {
    id: 102,
    title: 'Tawaf Around the Sacred Kaaba • Pilgrims in Ihram',
    category: 'Makkah',
    tags: 'makkah, kaaba, tawaf, umrah, pilgrims',
    previewUrl: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=600&q=80',
    hdUrl: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=1600&q=90',
    likes: 8450,
    views: 98000,
    source: 'Noor Islamic Media',
    location: 'Makkah, Saudi Arabia'
  },
  {
    id: 103,
    title: 'Prophet\'s Mosque • Madinah Munawwarah Arches',
    category: 'Madinah',
    tags: 'madinah, green dome, masjid nabawi, arches, sunnah',
    previewUrl: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?w=600&q=80',
    hdUrl: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?w=1600&q=90',
    likes: 7950,
    views: 89000,
    source: 'Noor Islamic Media',
    location: 'Al-Madinah Al-Munawwarah'
  },
  {
    id: 104,
    title: 'Madinah Minarets & Marble Courtyard Umbrellas',
    category: 'Madinah',
    tags: 'madinah, mosque, minarets, masjid an nabawi',
    previewUrl: 'https://images.unsplash.com/photo-1580418827493-f2b22c0a76cb?w=600&q=80',
    hdUrl: 'https://images.unsplash.com/photo-1580418827493-f2b22c0a76cb?w=1600&q=90',
    likes: 6420,
    views: 74200,
    source: 'Noor Islamic Media',
    location: 'Al-Masjid An-Nabawi'
  },
  {
    id: 105,
    title: 'The Noble Qur\'an • Gold Gilding & Sacred Calligraphy',
    category: 'Holy Quran',
    tags: 'holy quran, calligraphy, scripture, ayat, arabic art',
    previewUrl: 'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=600&q=80',
    hdUrl: 'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=1600&q=90',
    likes: 8120,
    views: 91000,
    source: 'Noor Islamic Media',
    location: 'Sacred Scripture'
  },
  {
    id: 106,
    title: 'Illuminated Islamic Manuscript & Ayahs',
    category: 'Calligraphy',
    tags: 'holy quran, calligraphy, manuscript, arabic lettering',
    previewUrl: 'https://images.unsplash.com/photo-1585036156171-384164a8c675?w=600&q=80',
    hdUrl: 'https://images.unsplash.com/photo-1585036156171-384164a8c675?w=1600&q=90',
    likes: 5690,
    views: 63500,
    source: 'Noor Islamic Media',
    location: 'Islamic Calligraphy Archive'
  },
  {
    id: 107,
    title: 'Sheikh Zayed Grand Mosque • Pure White Marble Domes',
    category: 'Architecture',
    tags: 'mosque, architecture, abu dhabi, domes, reflection',
    previewUrl: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?w=600&q=80',
    hdUrl: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?w=1600&q=90',
    likes: 7200,
    views: 82000,
    source: 'Noor Islamic Media',
    location: 'Abu Dhabi, UAE'
  },
  {
    id: 108,
    title: 'Ottoman Grand Mosque Minarets • Sultanahmet',
    category: 'Architecture',
    tags: 'mosque, istanbul, ottoman, minarets, sultanahmet',
    previewUrl: 'https://images.unsplash.com/photo-1564769625905-50e93615e769?w=600&q=80',
    hdUrl: 'https://images.unsplash.com/photo-1564769625905-50e93615e769?w=1600&q=90',
    likes: 6830,
    views: 79400,
    source: 'Noor Islamic Media',
    location: 'Istanbul, Turkey'
  },
  {
    id: 109,
    title: 'Historic Blue Mosque at Golden Hour Sunset',
    category: 'Twilight',
    tags: 'mosque, sunset, twilight, istanbul, architecture',
    previewUrl: 'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=600&q=80',
    hdUrl: 'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=1600&q=90',
    likes: 5940,
    views: 68100,
    source: 'Noor Islamic Media',
    location: 'Bosphorus, Istanbul'
  },
  {
    id: 110,
    title: 'Historic Moroccan Medina & Ancient Minarets',
    category: 'Architecture',
    tags: 'morocco, marrakech, medina, minaret, islamic architecture',
    previewUrl: 'https://images.unsplash.com/photo-1587974928442-77dc3e0dba72?w=600&q=80',
    hdUrl: 'https://images.unsplash.com/photo-1587974928442-77dc3e0dba72?w=1600&q=90',
    likes: 4890,
    views: 54000,
    source: 'Noor Islamic Media',
    location: 'Fez & Marrakech, Morocco'
  },
  {
    id: 111,
    title: 'Ramadan Crescent Moon & Celestial Twilight Sky',
    category: 'Twilight',
    tags: 'crescent, moon, night sky, celestial, ramadan, hilal',
    previewUrl: 'https://images.unsplash.com/photo-1519817650390-64a93db51149?w=600&q=80',
    hdUrl: 'https://images.unsplash.com/photo-1519817650390-64a93db51149?w=1600&q=90',
    likes: 8900,
    views: 112000,
    source: 'Noor Islamic Media',
    location: 'Desert Celestial Sky'
  },
  {
    id: 112,
    title: 'Sacred Kaaba Kiswah • Gilded Quranic Inscriptions',
    category: 'Calligraphy',
    tags: 'makkah, kaaba, kiswah, calligraphy, gold embroidery, haram',
    previewUrl: 'https://images.unsplash.com/photo-1565552645632-d725f8bfc19a?w=600&q=80',
    hdUrl: 'https://images.unsplash.com/photo-1565552645632-d725f8bfc19a?w=1600&q=90',
    likes: 9150,
    views: 104000,
    source: 'Noor Islamic Media',
    location: 'The Holy Kaaba, Makkah'
  }
];

export const ISLAMIC_VIDEOS: VideoItem[] = [
  {
    id: 201,
    title: 'The Sacred Kaaba & Pilgrims at Tawaf',
    category: 'Makkah',
    duration: '0:32',
    videoUrl: 'https://cdn.pixabay.com/video/2024/01/25/198048-906522343_medium.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1565552645632-d725f8bfc19a?w=800&q=80',
    views: 45200,
    likes: 3820,
    description: 'Pilgrims circumambulating the Holy Kaaba in profound devotion and submission during Tawaf.',
    location: 'Masjid al-Haram, Makkah'
  },
  {
    id: 202,
    title: 'Sheikh Zayed Grand Mosque • Reflection Pools',
    category: 'Architecture',
    duration: '0:24',
    videoUrl: 'https://cdn.pixabay.com/video/2020/08/14/47170-450995627_medium.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?w=800&q=80',
    views: 38900,
    likes: 2950,
    description: 'Twilight reflection pools illuminating pure white marble domes and minarets in Abu Dhabi.',
    location: 'Abu Dhabi, UAE'
  },
  {
    id: 203,
    title: 'Spiritual Mosque Interior & Grand Chandelier',
    category: 'Architecture',
    duration: '0:18',
    videoUrl: 'https://cdn.pixabay.com/video/2020/03/25/34260-400974076_medium.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1564769625905-50e93615e769?w=800&q=80',
    views: 29800,
    likes: 2410,
    description: 'Sacred architectural geometry and spiritual serenity within the grand prayer hall.',
    location: 'Istanbul, Turkey'
  },
  {
    id: 204,
    title: 'Prophet\'s Mosque • Madinah Munawwarah Umbrellas',
    category: 'Madinah',
    duration: '0:30',
    videoUrl: 'https://cdn.pixabay.com/video/2024/01/25/198048-906522343_medium.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1580418827493-f2b22c0a76cb?w=800&q=80',
    views: 52100,
    likes: 4120,
    description: 'Hydraulic giant umbrellas shading millions of worshipers in the blessed courtyard of the Prophet ﷺ.',
    location: 'Al-Masjid An-Nabawi'
  },
  {
    id: 205,
    title: 'Recitation of the Noble Quran with Tajweed',
    category: 'Holy Quran',
    duration: '0:22',
    videoUrl: 'https://cdn.pixabay.com/video/2020/08/14/47170-450995627_medium.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=800&q=80',
    views: 34500,
    likes: 3180,
    description: 'Mesmerizing gilded Mushaf verses recited with pristine tajweed rules and spiritual contemplation.',
    location: 'Quranic Heritage Center'
  }
];
