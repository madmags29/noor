import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/dashboard'], // Protect admin & CMS dashboard from public indexing
      },
      {
        userAgent: ['GPTBot', 'ChatGPT-User', 'ClaudeBot', 'PerplexityBot', 'Google-Extended'],
        allow: ['/', '/prayer-times', '/quran', '/duas', '/qibla', '/calendar'], // Allow AI Answer Engines (AEO)
      },
    ],
    sitemap: 'https://noor.app/sitemap.xml',
  };
}
