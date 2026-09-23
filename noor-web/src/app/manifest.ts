import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Noor-e-ilahi: Global Islamic Platform',
    short_name: 'NOOR',
    description: 'Precision astronomical prayer times, Noble Quran recitation, authentic Hisn al-Muslim duas, 3D Qibla compass, and global Ziyarat shrines.',
    start_url: '/',
    display: 'standalone',
    background_color: '#02120d',
    theme_color: '#031712',
    icons: [
      {
        src: '/globe.svg',
        sizes: '192x192',
        type: 'image/svg+xml',
      },
      {
        src: '/globe.svg',
        sizes: '512x512',
        type: 'image/svg+xml',
      },
    ],
    categories: ['lifestyle', 'education', 'utilities', 'books'],
    lang: 'en',
    dir: 'ltr',
    orientation: 'portrait',
  };
}
