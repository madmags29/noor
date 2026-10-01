// ============================================================
// NOOR — AI Service (Dart)
// Exact port of noor-mobile/src/services/aiService.ts
// ============================================================

import 'dart:convert';
import 'dart:io';
import 'package:http/http.dart' as http;

const String _islamicSystemPrompt = '''
You are Noor AI (نور إلهي), a scholarly, compassionate Islamic knowledge companion designed to guide believers in their daily Deen.
Adhere strictly to authentic Sunni Islamic scholarship, the Holy Quran, and the authentic Sunnah (Sahih al-Bukhari, Sahih Muslim, Sunan Abi Dawud, Jami` at-Tirmidhi, Sunan an-Nasa\'i, Sunan Ibn Majah, Muwatta Imam Malik, and classical Fiqh of the 4 major Madhahib).

Guidelines:
1. Begin politely with a brief Islamic greeting or invocation (e.g., "Bismillahir-Rahmanir-Rahim" or "As-salamu alaykum").
2. Provide concise, clear, and spiritually enriching guidance.
3. Always cite authentic references (Quran Surah:Ayah, Hadith collection and number).
4. If asked about Ziyarat or Sufi Awliya (saints), explain the Sunnah visiting etiquette (Adab al-Ziyarat), salams upon the righteous, and citing primary classical texts like Kashf al-Mahjub or Siyar al-Awliya.
5. Provide the main response in 2-3 structured paragraphs. At the end of your response, provide an explicit reference line starting with "Reference: [Citation]".
''';

class AiResponse {
  final String answer;
  final String citation;

  const AiResponse({required this.answer, required this.citation});
}

class AiService {
  String get _apiKey {
    try {
      return Platform.environment['OPENAI_API_KEY'] ?? '';
    } catch (_) {
      return '';
    }
  }

  Future<AiResponse> askNoorAi(String question) async {
    if (_apiKey.isEmpty) {
      return _getLocalFallback(question);
    }

    try {
      final response = await http
          .post(
            Uri.parse('https://api.openai.com/v1/chat/completions'),
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer $_apiKey',
            },
            body: jsonEncode({
              'model': 'gpt-4o-mini',
              'messages': [
                {'role': 'system', 'content': _islamicSystemPrompt},
                {'role': 'user', 'content': question.trim()},
              ],
              'temperature': 0.5,
              'max_tokens': 500,
            }),
          )
          .timeout(const Duration(seconds: 30));

      if (response.statusCode != 200) {
        throw Exception('OpenAI API error: ${response.statusCode}');
      }

      final data = jsonDecode(response.body) as Map<String, dynamic>;
      final fullText =
          (data['choices'] as List?)?.first?['message']?['content'] as String? ?? '';

      var answer = fullText;
      var citation = "Noble Qur'an & Authentic Sunnah";

      final refIndex = fullText.lastIndexOf('Reference:');
      if (refIndex != -1) {
        answer = fullText.substring(0, refIndex).trim();
        citation = fullText.substring(refIndex + 'Reference:'.length).trim();
      }

      return AiResponse(answer: answer, citation: citation);
    } catch (e) {
      debugPrint('AI fetch fallback: $e');
      return _getLocalFallback(question);
    }
  }

  AiResponse _getLocalFallback(String question) {
    final lower = question.toLowerCase();

    if (lower.contains('dargah') ||
        lower.contains('shrine') ||
        lower.contains('ziyarat')) {
      return const AiResponse(
        answer:
            'Visiting sanctuaries (Ziyarat) to pay salutations to the Awliya Allah (saints) is recommended to remember the Hereafter and supplicate for the departed. Adab requires approaching with modesty, offering Salam ala Ahl al-Qubur, reciting Quran, and invoking Allah alone for all needs.',
        citation: 'Sahih Muslim 976 • Kashf al-Mahjub',
      );
    }

    if (lower.contains('kursi')) {
      return const AiResponse(
        answer:
            'Ayat al-Kursi (Surah Al-Baqarah 2:255) is the greatest ayah of the Holy Quran. Reciting it after obligatory prayers and before sleeping guarantees divine protection.',
        citation: 'Sahih al-Bukhari 2311 • Jami` at-Tirmidhi',
      );
    }

    return AiResponse(
      answer:
          'Regarding "$question": The Prophet ﷺ taught us that deeds are rewarded by intentions. Seek knowledge with sincerity, maintain prayer at its prescribed times, and invoke Allah frequently.',
      citation: 'Sahih al-Bukhari 1 • Sahih Muslim 1907',
    );
  }
}

// Singleton
final aiService = AiService();

// Helper to print debug
void debugPrint(String msg) {
  // ignore: avoid_print
  print(msg);
}
