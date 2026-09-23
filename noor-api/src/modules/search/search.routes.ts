// ============================================================
// NOOR API — Global Search Module Routes
// ============================================================

import { Router, Request, Response } from 'express';

export const searchRouter = Router();

const SURAHS = [
  { number: 1, name: "الفاتحة", englishName: "Al-Fatihah", englishNameTranslation: "The Opening" },
  { number: 2, name: "البقرة", englishName: "Al-Baqarah", englishNameTranslation: "The Cow" },
  { number: 3, name: "آل عمران", englishName: "Ali 'Imran", englishNameTranslation: "Family of Imran" },
  { number: 18, name: "الكهف", englishName: "Al-Kahf", englishNameTranslation: "The Cave" },
  { number: 36, name: "يس", englishName: "Ya-Sin", englishNameTranslation: "Ya-Sin" },
  { number: 55, name: "الرحمن", englishName: "Ar-Rahman", englishNameTranslation: "The Beneficent" },
  { number: 67, name: "الملك", englishName: "Al-Mulk", englishNameTranslation: "The Sovereignty" },
  { number: 112, name: "الإخلاص", englishName: "Al-Ikhlas", englishNameTranslation: "The Sincerity" },
  { number: 114, name: "الناس", englishName: "An-Nas", englishNameTranslation: "Mankind" }
];

const DUAS = [
  { id: 'dua-morning-1', title: 'Morning Adhkar: Praise of Allah upon Waking', category: 'morning' },
  { id: 'dua-protection-1', title: 'Dua against Harm', category: 'protection' },
  { id: 'dua-hardship-1', title: 'Dua of Prophet Yunus (AS) in Distress', category: 'hardship' },
  { id: 'dua-travel-1', title: 'Dua for Riding a Vehicle & Travel', category: 'travel' },
  { id: 'dua-rizq-1', title: 'Dua for Relief from Debt and Worry', category: 'rizq' }
];

/**
 * GET /api/v1/search
 * Query: q (search term), type (optional filter)
 */
searchRouter.get('/', (req: Request, res: Response) => {
  const q = ((req.query.q as string) || '').trim().toLowerCase();
  const type = req.query.type as string;

  if (!q) {
    res.json({
      success: true,
      data: {
        query: '',
        results: {
          quran: [],
          duas: [],
          total: 0
        }
      }
    });
    return;
  }

  const matchingSurahs = SURAHS.filter(s =>
    s.englishName.toLowerCase().includes(q) ||
    s.englishNameTranslation.toLowerCase().includes(q) ||
    s.name.includes(q)
  );

  const matchingDuas = DUAS.filter(d =>
    d.title.toLowerCase().includes(q) ||
    d.category.toLowerCase().includes(q)
  );

  let total = 0;
  const results: Record<string, unknown[]> = {};

  if (!type || type === 'quran') {
    results.quran = matchingSurahs;
    total += matchingSurahs.length;
  }
  if (!type || type === 'duas') {
    results.duas = matchingDuas;
    total += matchingDuas.length;
  }

  res.json({
    success: true,
    data: {
      query: q,
      results,
      total
    }
  });
});
