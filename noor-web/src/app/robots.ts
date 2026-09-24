import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: [
          '/',
          '/prayer-times',
          '/quran',
          '/ziyarat',
          '/duas',
          '/qibla',
          '/calendar',
          '/media',
          '/app-preview',
          '/llms.txt',
          '/llms-full.txt',
          '/.well-known/*',
        ],
        disallow: [
          '/dashboard',
          '/api/admin/*',
          '/api/auth/*',
          '/_next/*',
        ],
      },
      // Answer Engine Optimization (AEO) & Generative Engine Optimization (GEO) Bots
      {
        userAgent: [
          'GPTBot',
          'OAI-SearchBot',
          'ChatGPT-User',
          'ClaudeBot',
          'Claude-Web',
          'PerplexityBot',
          'Google-Extended',
          'Applebot-Extended',
          'Amazonbot',
          'cohere-ai',
          'Meta-ExternalAgent',
          'Bytespider',
          'Diffbot',
        ],
        allow: [
          '/',
          '/prayer-times',
          '/quran',
          '/ziyarat',
          '/duas',
          '/qibla',
          '/calendar',
          '/media',
          '/app-preview',
          '/llms.txt',
          '/llms-full.txt',
        ],
        disallow: ['/dashboard'],
      },
    ],
    sitemap: [
      'https://www.nooreilahi.com/sitemap.xml',
      'https://www.nooreilahi.com/sitemap-noor.xml'
    ],
    host: 'https://www.nooreilahi.com',
  };
}

