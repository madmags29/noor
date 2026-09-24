import { MetadataRoute } from 'next';
import { VERIFIED_DARGAHS_DATABASE } from '../lib/ziyaratData';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.nooreilahi.com';
  const currentDate = new Date().toISOString();

  // All 11 supported languages for SEO hreflang alternates
  const languageCodes = ['en', 'hi', 'ur', 'ar', 'bn', 'tr', 'id', 'ta', 'ml', 'mr', 'gu'];

  const createLocalizedAlternates = (path: string) => {
    const languages: Record<string, string> = {
      'x-default': `${baseUrl}${path}`,
    };
    languageCodes.forEach((code) => {
      languages[code] = `${baseUrl}${path}${path.includes('?') ? '&' : '?'}lang=${code}`;
    });
    return { languages };
  };

  const routes: Array<{
    path: string;
    changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
    priority: number;
  }> = [
    { path: '', changeFrequency: 'daily', priority: 1.0 },
    { path: '/prayer-times', changeFrequency: 'always', priority: 0.98 },
    { path: '/quran', changeFrequency: 'daily', priority: 0.98 },
    { path: '/guides', changeFrequency: 'daily', priority: 0.96 },
    { path: '/hajj-umrah', changeFrequency: 'weekly', priority: 0.95 },
    { path: '/zakat', changeFrequency: 'daily', priority: 0.95 },
    { path: '/janazah', changeFrequency: 'weekly', priority: 0.94 },
    { path: '/duas', changeFrequency: 'daily', priority: 0.93 },
    { path: '/ziyarat', changeFrequency: 'daily', priority: 0.93 },
    { path: '/search', changeFrequency: 'daily', priority: 0.92 },
    { path: '/travel', changeFrequency: 'weekly', priority: 0.91 },
    { path: '/etiquette', changeFrequency: 'weekly', priority: 0.90 },
    { path: '/nikah', changeFrequency: 'weekly', priority: 0.90 },
    { path: '/kids', changeFrequency: 'weekly', priority: 0.90 },
    { path: '/qibla', changeFrequency: 'weekly', priority: 0.90 },
    { path: '/watch', changeFrequency: 'daily', priority: 0.88 },
    { path: '/calendar', changeFrequency: 'daily', priority: 0.88 },
    { path: '/media', changeFrequency: 'daily', priority: 0.85 },
    { path: '/app-preview', changeFrequency: 'monthly', priority: 0.85 },
    { path: '/contact', changeFrequency: 'monthly', priority: 0.85 },
  ];

  const mainPages: MetadataRoute.Sitemap = routes.map((r) => ({
    url: `${baseUrl}${r.path}`,
    lastModified: currentDate,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
    alternates: createLocalizedAlternates(r.path),
  }));

  // Add all 31 verified Ziyarat shrine detail pages
  const ziyaratPages: MetadataRoute.Sitemap = VERIFIED_DARGAHS_DATABASE.map((dargah) => ({
    url: `${baseUrl}/ziyarat/${dargah.slug}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.85,
    alternates: createLocalizedAlternates(`/ziyarat/${dargah.slug}`),
  }));

  return [...mainPages, ...ziyaratPages];
}
