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
    { path: '/prayer-times', changeFrequency: 'always', priority: 0.95 },
    { path: '/quran', changeFrequency: 'weekly', priority: 0.95 },
    { path: '/ziyarat', changeFrequency: 'daily', priority: 0.95 },
    { path: '/duas', changeFrequency: 'weekly', priority: 0.90 },
    { path: '/qibla', changeFrequency: 'monthly', priority: 0.90 },
    { path: '/calendar', changeFrequency: 'daily', priority: 0.85 },
    { path: '/media', changeFrequency: 'daily', priority: 0.80 },
    { path: '/app-preview', changeFrequency: 'monthly', priority: 0.80 },
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
