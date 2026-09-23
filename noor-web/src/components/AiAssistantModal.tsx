'use client';

// ============================================================
// NOOR Web — Noor AI (Islamic Knowledge & Daily Companion Assistant)
// ============================================================

import React, { useState } from 'react';
import { X, Sparkles, Send, Bot, User, BookOpen } from 'lucide-react';

interface AiAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  reference?: string;
}

const PRESET_QUESTIONS = [
  'What is the virtue of reciting Surah Al-Mulk before sleeping?',
  'How do I calculate my annual Zakat obligation?',
  'What are the recommended Sunnahs on Friday (Jummah)?',
  'What dua should I recite during acute hardship or anxiety?'
];

const PRESET_ANSWERS: Record<string, { answer: string; ref: string }> = {
  'virtue': {
    answer: 'The Prophet Muhammad ﷺ said: "There is a Surah of the Quran containing thirty verses which will intercede for a person until he is forgiven: Surah Tabarakalladhi bi-yadihi al-Mulk (Surah Al-Mulk)." (Sunan Abi Dawud, Jami` at-Tirmidhi). Reciting it every night protects from the punishment of the grave.',
    ref: 'Jami` at-Tirmidhi 2891 (Hasan), Hisn al-Muslim'
  },
  'zakat': {
    answer: 'Zakat is obligatory (2.5%) on wealth held for one full lunar year (Hawl) above the Nisab threshold. Nisab is approximately 85 grams of pure gold or 595 grams of silver. Deduct immediate debts and living expenses, then multiply qualifying surplus savings, gold, and liquid investments by 0.025.',
    ref: 'Surah At-Tawbah 9:60, Fiqh az-Zakat'
  },
  'friday': {
    answer: 'The key Sunnahs of Jummah include: 1) Performing Ghusl (ritual bath) and wearing clean clothes, 2) Applying perfume/attar, 3) Using the Miswak, 4) Reciting Surah Al-Kahf, 5) Sending abundant Salawat upon the Prophet ﷺ, and 6) Making heartfelt Dua during the special hour of acceptance before Maghrib.',
    ref: 'Sahih al-Bukhari 883, Sahih Muslim 854'
  },
  'anxiety': {
    answer: 'Recite the Dua of Prophet Yunus (AS): "La ilaha illa Anta, subhanaka inni kuntu minaz-zalimeen" (There is no deity except You; exalted are You. Indeed, I have been of the wrongdoers). The Prophet ﷺ affirmed that no believer invokes Allah with these words in distress except that Allah relieves their burden.',
    ref: 'Surah Al-Anbiya 21:87, Jami` at-Tirmidhi 3505'
  }
};

export const AiAssistantModal: React.FC<AiAssistantModalProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text: 'As-salamu alaykum wa rahmatullahi wa barakatuh. I am Noor AI, your Islamic knowledge companion. How can I assist you with Quran, prayer times, duas, or Islamic jurisprudence today?'
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSend = async (queryText?: string) => {
    const textToSend = queryText || input;
    if (!textToSend.trim()) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: textToSend
    };

    setMessages(prev => [...prev, userMsg]);
    if (!queryText) setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/ai/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: textToSend,
          history: messages.slice(-4).map(m => ({
            role: m.sender === 'user' ? 'user' : 'assistant',
            content: m.text
          }))
        })
      });

      if (!response.ok) {
        throw new Error('Failed to fetch AI response');
      }

      const data = await response.json();

      const aiMsg: Message = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: data.answer || 'Allah knows best. Please refer to authentic sources of knowledge.',
        reference: data.reference || 'The Holy Qur\'an & Sunnah'
      };

      setMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      // Local fallback
      const lower = textToSend.toLowerCase();
      let matched = PRESET_ANSWERS.anxiety;

      if (lower.includes('mulk') || lower.includes('sleep') || lower.includes('virtue')) {
        matched = PRESET_ANSWERS.virtue;
      } else if (lower.includes('zakat') || lower.includes('wealth') || lower.includes('nisab')) {
        matched = PRESET_ANSWERS.zakat;
      } else if (lower.includes('friday') || lower.includes('jummah') || lower.includes('sunnah')) {
        matched = PRESET_ANSWERS.friday;
      }

      const aiMsg: Message = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: matched.answer,
        reference: matched.ref
      };

      setMessages(prev => [...prev, aiMsg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in">
      <div className="bg-[#031c15] border border-amber-500/40 rounded-3xl w-full max-w-2xl h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-emerald-800/50 flex items-center justify-between bg-[#021711]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="text-base font-bold text-white">Noor AI Assistant</h3>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-semibold border border-amber-500/30">
                  Verified Deen
                </span>
              </div>
              <p className="text-xs text-emerald-300/70">
                Grounding answers in the Noble Quran and authentic Sunnah
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-emerald-950 border border-emerald-700/40 text-emerald-300 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages List */}
        <div className="flex-1 p-6 overflow-y-auto space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'ai' && (
                <div className="w-7 h-7 rounded-lg bg-emerald-900 border border-amber-500/30 flex items-center justify-center text-amber-300 flex-shrink-0 mt-0.5">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-lg rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-amber-500 text-emerald-950 font-medium'
                    : 'bg-[#06241b] border border-emerald-800/60 text-emerald-50'
                }`}
              >
                <p>{msg.text}</p>
                {msg.reference && (
                  <div className="mt-2.5 pt-2 border-t border-emerald-700/40 text-[11px] text-amber-300/90 font-mono flex items-center gap-1">
                    <BookOpen className="w-3 h-3" />
                    <span>Reference: {msg.reference}</span>
                  </div>
                )}
              </div>

              {msg.sender === 'user' && (
                <div className="w-7 h-7 rounded-lg bg-amber-500 text-emerald-950 flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex gap-3 items-center text-amber-300 text-xs">
              <div className="w-7 h-7 rounded-lg bg-emerald-900 border border-amber-500/30 flex items-center justify-center text-amber-300">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-[#06241b] px-4 py-2.5 rounded-2xl border border-emerald-800/60 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-amber-400 animate-bounce" />
                <div className="w-2 h-2 rounded-full bg-amber-400 animate-bounce [animation-delay:0.2s]" />
                <div className="w-2 h-2 rounded-full bg-amber-400 animate-bounce [animation-delay:0.4s]" />
              </div>
            </div>
          )}
        </div>

        {/* Suggested Quick Questions */}
        <div className="px-6 py-2 border-t border-emerald-800/40 bg-[#021711] flex items-center gap-2 overflow-x-auto no-scrollbar">
          {PRESET_QUESTIONS.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(q)}
              className="px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-700/40 text-emerald-300 hover:text-amber-300 hover:border-amber-400/40 text-[11px] whitespace-nowrap transition-all"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-4 border-t border-emerald-800/50 bg-[#021711]">
          <form
            onSubmit={(e) => { e.preventDefault(); handleSend(); }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Ask anything about Quran, Hadith, Salah, or Islamic Fiqh..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-[#06241b] border border-emerald-800/60 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder-emerald-400/50 focus:outline-none focus:border-amber-400"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="p-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-40 text-emerald-950 font-bold transition-all"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
