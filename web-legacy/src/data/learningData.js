// NOOR Islamic Learning Platform Courses
export const LEARNING_COURSES = [
  {
    id: 'course-islam-101',
    title: 'Islam 101: The Foundations of Faith',
    category: 'Foundations',
    level: 'Beginner',
    duration: '4 Hours (8 Lessons)',
    instructor: 'Dr. Umar Faruq Abd-Allah',
    enrolledCount: 14200,
    progress: 45,
    summary: 'A clear, authentic introduction to the 6 Articles of Faith (Iman) and 5 Pillars of Islam (Ibadah).',
    lessons: [
      { id: 1, title: 'What is Islam, Iman, and Ihsan? The Hadith of Jibril', duration: '22 min', completed: true },
      { id: 2, title: 'Tawheed: The Oneness of the Creator', duration: '28 min', completed: true },
      { id: 3, title: 'The Five Daily Prayers: Purpose and Spirit', duration: '35 min', completed: false },
      { id: 4, title: 'Zakat & Sadaqah: Purifying Wealth', duration: '24 min', completed: false }
    ]
  },
  {
    id: 'course-seerah',
    title: 'The Prophetic Biography: Makkan Era',
    category: 'Seerah',
    level: 'Beginner / Intermediate',
    duration: '6 Hours (12 Lessons)',
    instructor: 'Shaykh Yasir Qadhi',
    enrolledCount: 28900,
    progress: 15,
    summary: 'Examine the life and moral character of Prophet Muhammad ﷺ from early childhood to the Hijrah to Madinah.',
    lessons: [
      { id: 1, title: 'Arabia before the Dawn of Prophethood', duration: '30 min', completed: true },
      { id: 2, title: 'The First Revelation in Cave Hira', duration: '32 min', completed: false },
      { id: 3, title: 'The Early Companions and Open Preaching', duration: '40 min', completed: false }
    ]
  },
  {
    id: 'course-prophets',
    title: 'Stories of the Prophets in the Quran',
    category: 'Prophets',
    level: 'All Levels',
    duration: '5 Hours (10 Lessons)',
    instructor: 'Mufti Menk',
    enrolledCount: 31200,
    progress: 0,
    summary: 'Timeless lessons of resilience and conviction from Adam, Nuh, Ibrahim, Musa, and Isa (peace be upon them).',
    lessons: [
      { id: 1, title: 'Prophet Adam (AS): The Creation of Humankind', duration: '25 min', completed: false },
      { id: 2, title: 'Prophet Ibrahim (AS): Father of Pure Monotheism', duration: '35 min', completed: false }
    ]
  },
  {
    id: 'course-tajweed',
    title: 'Tajweed Made Easy: Makharij & Sifat',
    category: 'Quran',
    level: 'Intermediate',
    duration: '3.5 Hours (7 Lessons)',
    instructor: 'Qari Ziyaad Patel',
    enrolledCount: 19800,
    progress: 70,
    summary: 'Master accurate Arabic articulation points to recite the Noble Quran with beauty and precision.',
    lessons: [
      { id: 1, title: 'The Throat and Tongue Articulation Points', duration: '30 min', completed: true },
      { id: 2, title: 'Rules of Noon Saakinah and Tanween', duration: '28 min', completed: true }
    ]
  }
];
