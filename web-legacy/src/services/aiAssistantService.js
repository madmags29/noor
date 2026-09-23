// NOOR AI Assistant Service: Authentic Grounded Islamic Knowledge Assistant

export const SUGGESTED_QUERIES = [
  "What does Sabr mean?",
  "Show me verses about patience.",
  "What Dua should I read before sleeping?",
  "Explain this Hadith: Actions are judged by motives.",
  "Teach me about Salah and its conditions.",
  "Tell me about the early Seerah of Prophet Muhammad ﷺ.",
  "Create a 30-day Quran reading plan."
];

export const KNOWLEDGE_BASE = {
  "sabr": {
    topic: "The Concept of Sabr (Patience & Perseverance)",
    sections: [
      {
        type: "Quran",
        badge: "Noble Quran",
        text: "يَا أَيُّهَا الَّذِينَ آمَنُوا اسْتَعِينُوا بِالصَّبْرِ وَالصَّلَاةِ ۚ إِنَّ اللَّهَ مَعَ الصَّابِرِينَ",
        translation: "O you who have believed, seek help through patience and prayer. Indeed, Allah is with the patient.",
        reference: "Surah Al-Baqarah (2:153)"
      },
      {
        type: "Scholar Commentary",
        badge: "Scholarly Classical Commentary",
        text: "Imam Ibn al-Qayyim categorized Sabr into three essential dimensions: (1) Patience in remaining steadfast in obedience to Allah, (2) Patience in refraining from what is forbidden, and (3) Patience during decrees that cause sorrow or distress."
      },
      {
        type: "General Explanation",
        badge: "Practical Spiritual Takeaway",
        text: "Sabr in Islam is not passive resignation; rather, it is proactive emotional resilience, self-restraint, and trusting Allah's wisdom while actively taking righteous means."
      }
    ]
  },
  "sleep": {
    topic: "Supplications Before Sleep (Adhkar an-Nawm)",
    sections: [
      {
        type: "Hadith",
        badge: "Sahih Hadith",
        text: "بِاسْمِكَ رَبِّ وَضَعْتُ جَنْبِي، وَبِكَ أَرْفَعُهُ، إِنْ أَمْسَكْتَ نَفْسِي فَارْحَمْهَا، وَإِنْ أَرْسَلْتَهَا فَاحْفَظْهَا بِمَا تَحْفَظُ بِهِ عِبَادَكَ الصَّالِحِينَ",
        translation: "In Your name, my Lord, I lay my side down, and in Your name I raise it. If You take my soul, have mercy upon it, and if You release it, protect it as You protect Your righteous servants.",
        reference: "Sahih al-Bukhari 6320, Sahih Muslim 2714"
      },
      {
        type: "Sunnah Practice",
        badge: "Prophetic Practice",
        text: "It is the Sunnah of the Prophet ﷺ to perform Wudu before sleeping, dust off the bedding three times, recite Ayat al-Kursi (2:255) and the Mu'awwidhat (Surahs Al-Ikhlas, Al-Falaq, and An-Nas) into cupped hands and wipe over the body."
      }
    ]
  },
  "motives": {
    topic: "Understanding 'Actions are Judged by Motives' (Innamal A'malu bin-Niyyat)",
    sections: [
      {
        type: "Hadith",
        badge: "Sahih Bukhari & Muslim",
        text: "إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ، وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى",
        translation: "Actions are judged by intentions, and every person will get what he intended.",
        reference: "Sahih al-Bukhari 1, Sahih Muslim 1907"
      },
      {
        type: "Scholar Commentary",
        badge: "Scholarly Principles",
        text: "Scholars such as Imam ash-Shafi'i and Imam Ahmad bin Hanbal established that all voluntary and obligatory worship is invalid without sincere intention (Ikhlas) solely for the pleasure of Allah."
      }
    ]
  },
  "salah": {
    topic: "Conditions & Pillars of Salah (Prayer)",
    sections: [
      {
        type: "Quran",
        badge: "Noble Quran",
        text: "إِنَّ الصَّلَاةَ كَانَتْ عَلَى الْمُؤْمِنِينَ كِتَابًا مَّوْقُوتًا",
        translation: "Indeed, prayer has been decreed upon the believers a decree of specified times.",
        reference: "Surah An-Nisa (4:103)"
      },
      {
        type: "Fiqh Distinction",
        badge: "Conditions of Validity",
        text: "1. Islam and discernment\n2. Purification from minor and major impurity (Wudu/Ghusl)\n3. Cleanliness of body, clothes, and place\n4. Covering the Awrah\n5. Entry of the prayer time\n6. Facing the Qibla (Direction of the Kaaba)\n7. Sincere intention (Niyyah)"
      }
    ]
  }
};

export function getAssistantResponse(prompt) {
  const pLower = prompt.toLowerCase();
  let matched = null;

  if (pLower.includes('sabr') || pLower.includes('patience')) {
    matched = KNOWLEDGE_BASE['sabr'];
  } else if (pLower.includes('sleep') || pLower.includes('night') || pLower.includes('bed')) {
    matched = KNOWLEDGE_BASE['sleep'];
  } else if (pLower.includes('motive') || pLower.includes('intention') || pLower.includes('niyyah')) {
    matched = KNOWLEDGE_BASE['motives'];
  } else if (pLower.includes('salah') || pLower.includes('prayer') || pLower.includes('pray')) {
    matched = KNOWLEDGE_BASE['salah'];
  } else {
    // General grounded response
    matched = {
      topic: `Islamic Perspectives on: "${prompt}"`,
      sections: [
        {
          type: "Noble Guidance",
          badge: "Quran & Sunnah Principle",
          text: "Islam encourages seeking knowledge with humility, sincerity, and authentic grounding in the Quran and the Sunnah of the Prophet Muhammad ﷺ.",
          translation: ""
        },
        {
          type: "Scholar Advisory",
          badge: "Important Fiqh Notice",
          text: "For personal legal rulings (Fatwa) pertaining to complex individual circumstances, financial contracts, or marital matters, believers are advised to consult qualified, recognized Islamic scholars within their local community."
        }
      ]
    };
  }

  return matched;
}
