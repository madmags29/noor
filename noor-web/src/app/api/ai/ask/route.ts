import { NextRequest, NextResponse } from 'next/server';

const OPENAI_API_KEY =
  process.env.OPENAI_API_KEY ||
  process.env.NEXT_PUBLIC_OPENAI_API_KEY ||
  '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';

const ISLAMIC_SYSTEM_PROMPT = `
You are Noor AI (نور إلهي), a scholarly, compassionate Islamic knowledge companion designed to guide believers in their daily Deen.
Adhere strictly to authentic Sunni Islamic scholarship, the Holy Quran, and the authentic Sunnah (Sahih al-Bukhari, Sahih Muslim, Sunan Abi Dawud, Jami\` at-Tirmidhi, Sunan an-Nasa'i, Sunan Ibn Majah, Muwatta Imam Malik, and classical Fiqh of the 4 major Madhahib).

Guidelines:
1. Begin politely with a brief Islamic greeting or invocation (e.g., "Bismillahir-Rahmanir-Rahim" or "As-salamu alaykum").
2. Provide concise, clear, and spiritually enriching guidance.
3. Always cite authentic references (Quran Surah:Ayah, Hadith collection and number).
4. If asked about Ziyarat or Sufi Awliya (saints), explain the Sunnah visiting etiquette (Adab al-Ziyarat), salams upon the righteous, and citing primary classical texts like Kashf al-Mahjub or Siyar al-Awliya.
5. Provide the main response in 2-3 structured paragraphs. At the end of your response, provide an explicit reference line starting with "Reference: [Citation]".
`;

export async function POST(req: NextRequest) {
  try {
    const { question, history } = await req.json();

    if (!question || typeof question !== 'string') {
      return NextResponse.json(
        { error: 'Question is required' },
        { status: 400 }
      );
    }

    const messages = [
      { role: 'system', content: ISLAMIC_SYSTEM_PROMPT },
      ...(Array.isArray(history) ? history.slice(-4) : []),
      { role: 'user', content: question.trim() }
    ];

    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: process.env.LLM_MODEL || 'gpt-4o-mini',
        messages,
        temperature: 0.5,
        max_tokens: 600
      })
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error('OpenAI API Error:', errText);
      // Fallback response if rate limit or network issue
      return NextResponse.json({
        answer: getFallbackAnswer(question),
        reference: 'Sahih al-Bukhari & Hisn al-Muslim (Verified Classical Archive)',
        source: 'fallback'
      });
    }

    const data = await res.json();
    const fullText = data.choices?.[0]?.message?.content || '';

    // Separate Reference if present
    let answer = fullText;
    let reference = 'The Noble Qur\'an & Authentic Sunnah';

    const refIndex = fullText.lastIndexOf('Reference:');
    if (refIndex !== -1) {
      answer = fullText.substring(0, refIndex).trim();
      reference = fullText.substring(refIndex + 'Reference:'.length).trim();
    }

    return NextResponse.json({
      answer,
      reference,
      model: data.model || 'gpt-4o-mini',
      source: 'openai'
    });
  } catch (error: any) {
    console.error('AI Route Exception:', error);
    return NextResponse.json({
      answer: 'Allah the Almighty says in the Quran: "So ask the people of the message if you do not know." (Surah An-Nahl 16:43). We are currently experiencing a brief connectivity moment, but our verified Islamic wisdom catalog remains active to guide your prayer, dhikr, and Quranic recitation.',
      reference: 'Surah An-Nahl 16:43',
      source: 'fallback'
    });
  }
}

function getFallbackAnswer(question: string): string {
  const q = question.toLowerCase();
  if (q.includes('mulk') || q.includes('sleep')) {
    return 'The Prophet Muhammad ﷺ said: "There is a Surah of the Quran containing thirty verses which will intercede for a person until he is forgiven: Surah Tabarakalladhi bi-yadihi al-Mulk (Surah Al-Mulk)." Reciting it every night before sleeping protects from the trials of the grave.';
  }
  if (q.includes('zakat')) {
    return 'Zakat is 2.5% on qualifying liquid savings, gold, and trade assets held for one lunar year above the Nisab threshold (~85g of pure gold). It purifies wealth and aids the poor.';
  }
  if (q.includes('friday') || q.includes('jummah')) {
    return 'Sunnahs of Friday include performing Ghusl, wearing clean attire, using miswak, reciting Surah Al-Kahf, sending abundant Salawat upon the Prophet ﷺ, and supplicating before sunset.';
  }
  return 'The Prophet ﷺ taught us: "The best among you are those who learn the Qur\'an and teach it." (Sahih al-Bukhari). Turn to Allah in sincere prayer, maintain daily dhikr, and seek beneficial knowledge.';
}
