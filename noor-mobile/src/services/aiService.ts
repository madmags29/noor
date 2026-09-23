// ============================================================
// NOOR Mobile — OpenAI Knowledge Companion Service
// ============================================================

const OPENAI_API_KEY =
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

export interface AiResponse {
  answer: string;
  citation: string;
}

export async function askNoorAi(question: string): Promise<AiResponse> {
  try {
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: ISLAMIC_SYSTEM_PROMPT },
          { role: 'user', content: question.trim() }
        ],
        temperature: 0.5,
        max_tokens: 500
      })
    });

    if (!res.ok) {
      throw new Error(`OpenAI API error: ${res.status}`);
    }

    const data = await res.json();
    const fullText = data.choices?.[0]?.message?.content || '';

    let answer = fullText;
    let citation = 'Noble Qur\'an & Authentic Sunnah';

    const refIndex = fullText.lastIndexOf('Reference:');
    if (refIndex !== -1) {
      answer = fullText.substring(0, refIndex).trim();
      citation = fullText.substring(refIndex + 'Reference:'.length).trim();
    }

    return { answer, citation };
  } catch (error) {
    console.warn('AI fetch fallback:', error);
    return getLocalAiFallback(question);
  }
}

function getLocalAiFallback(q: string): AiResponse {
  const lower = q.toLowerCase();
  if (lower.includes('dargah') || lower.includes('shrine') || lower.includes('ziyarat')) {
    return {
      answer: 'Visiting sanctuaries (Ziyarat) to pay salutations to the Awliya Allah (saints) is recommended to remember the Hereafter and supplicate for the departed. Adab requires approaching with modesty, offering Salam ala Ahl al-Qubur, reciting Quran, and invoking Allah alone for all needs.',
      citation: 'Sahih Muslim 976 • Kashf al-Mahjub'
    };
  }
  if (lower.includes('kursi')) {
    return {
      answer: 'Ayat al-Kursi (Surah Al-Baqarah 2:255) is the greatest ayah of the Holy Quran. Reciting it after obligatory prayers and before sleeping guarantees divine protection.',
      citation: 'Sahih al-Bukhari 2311 • Jami` at-Tirmidhi'
    };
  }
  return {
    answer: `Regarding "${q}": The Prophet ﷺ taught us that deeds are rewarded by intentions. Seek knowledge with sincerity, maintain prayer at its prescribed times, and invoke Allah frequently.`,
    citation: 'Sahih al-Bukhari 1 • Sahih Muslim 1907'
  };
}
