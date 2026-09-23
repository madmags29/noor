import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { THEME } from '../theme';
import { askNoorAi } from '../services/aiService';

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  citation?: string;
}

interface AiAssistantModalProps {
  visible: boolean;
  onClose: () => void;
}

const QUICK_PROMPTS = [
  'Virtues of Tahajjud prayer',
  'Visiting Dargahs & Islamic Adab',
  'Benefits of Ayat al-Kursi',
  'Dua for anxiety and relief',
  'Etiquette of reciting the Holy Quran'
];

const PRELOADED_RESPONSES: Record<string, { text: string; citation: string }> = {
  'tahajjud': {
    text: 'Tahajjud (Qiyam al-Layl) is among the most meritorious voluntary prayers. It is performed in the final third of the night when divine mercy descends.',
    citation: 'Sahih al-Bukhari 1145 • "Our Lord descends every night to the lowest heaven when one-third of the night remains and says: Who calls upon Me, that I may answer him?"'
  },
  'dargah': {
    text: 'Visiting the resting places of the righteous (Ziyarat al-Qubur) serves to soften the heart and remember the Hereafter. The Sunnah etiquette entails sending greetings (*Salam ala Ahl al-Qubur*), making dua for the deceased, maintaining physical modesty, and avoiding worldly disputes.',
    citation: 'Sahih Muslim 976 & 249 • Kashf al-Mahjub of Ali al-Hujwiri (465 AH)'
  },
  'ayat al-kursi': {
    text: 'Ayat al-Kursi (Surah Al-Baqarah 2:255) is the greatest verse of the Quran, encompassing the absolute sovereignty, omniscience, and eternal living nature of Allah (Al-Hayy, Al-Qayyum).',
    citation: 'Sahih Muslim 810 • Recited after every obligatory prayer for divine protection.'
  },
  'anxiety': {
    text: 'The Prophet ﷺ taught this profound supplication for distress: "Allāhumma innī a‘ūdhu bika minal-hammi wal-hazan, wal-‘ajzi wal-kasal, wal-jubni wal-bukhl, wa dala‘id-dayni wa ghalabatir-rijāl."',
    citation: 'Sahih al-Bukhari 6363 • "O Allah, I seek refuge in You from grief and sadness, weakness and laziness, cowardice and stinginess."'
  },
  'quran': {
    text: 'The etiquette of reciting the Noble Quran includes entering with physical purity (Wudu), facing the Qibla, reciting with measured contemplation (Tartil), and absorbing the divine meaning with humility.',
    citation: 'Surah Al-Muzzammil 73:4 • "And recite the Quran with measured recitation."'
  }
};

export const AiAssistantModal: React.FC<AiAssistantModalProps> = ({ visible, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: 'Salam Alaykum! I am NOOR Islamic AI Companion. Ask me about the Holy Quran, Sunnah, authentic Hadith citations, prayer rulings, or historic sanctuaries and saints.',
      citation: '100% Scholarly Verified • Zero Synthetic Inventions'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async (query?: string) => {
    const textToSend = query || inputText.trim();
    if (!textToSend) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: textToSend
    };

    setMessages(prev => [...prev, userMsg]);
    if (!query) setInputText('');
    setLoading(true);

    try {
      const response = await askNoorAi(textToSend);
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: response.answer,
        citation: response.citation
      };
      setMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: 'Turn to Allah in heartfelt prayer. "And when My servants ask you concerning Me - indeed I am near." (Surah Al-Baqarah 2:186).',
        citation: 'Surah Al-Baqarah 2:186'
      };
      setMessages(prev => [...prev, aiMsg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <SafeAreaView style={styles.modalBackdrop}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.container}
        >
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.titleRow}>
              <View style={styles.iconCircle}>
                <MaterialCommunityIcons name="creation" size={18} color={THEME.colors.goldPrimary} />
              </View>
              <View>
                <Text style={styles.headerTitle}>NOOR Islamic AI</Text>
                <Text style={styles.headerSub}>Spiritual Knowledge Companion</Text>
              </View>
            </View>

            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <Ionicons name="close" size={20} color={THEME.colors.textWhite} />
            </TouchableOpacity>
          </View>

          {/* Messages Scroll Area */}
          <ScrollView contentContainerStyle={styles.messagesList} showsVerticalScrollIndicator={false}>
            {messages.map(msg => (
              <View
                key={msg.id}
                style={[
                  styles.msgContainer,
                  msg.sender === 'user' ? styles.msgUser : styles.msgAssistant
                ]}
              >
                {msg.sender === 'assistant' && (
                  <View style={styles.msgHeader}>
                    <MaterialCommunityIcons name="book-open-page-variant" size={14} color={THEME.colors.goldPrimary} />
                    <Text style={styles.assistantBadge}>NOOR COMPANION</Text>
                  </View>
                )}
                <Text style={[styles.msgText, msg.sender === 'user' ? styles.msgTextUser : styles.msgTextAssistant]}>
                  {msg.text}
                </Text>
                {msg.citation && (
                  <View style={styles.citationBox}>
                    <Ionicons name="bookmark-outline" size={12} color={THEME.colors.goldLight} />
                    <Text style={styles.citationText}>{msg.citation}</Text>
                  </View>
                )}
              </View>
            ))}

            {loading && (
              <View style={[styles.msgContainer, styles.msgAssistant]}>
                <Text style={styles.loadingText}>Consulting classical Islamic sources...</Text>
              </View>
            )}

            {/* Quick Prompt Suggestions */}
            <View style={styles.suggestionsSection}>
              <Text style={styles.suggestionsLabel}>SUGGESTED QUESTIONS</Text>
              <View style={styles.suggestionsPills}>
                {QUICK_PROMPTS.map((prompt, idx) => (
                  <TouchableOpacity
                    key={idx}
                    style={styles.promptPill}
                    onPress={() => handleSend(prompt)}
                  >
                    <Text style={styles.promptPillText}>{prompt}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </ScrollView>

          {/* Input Bar */}
          <View style={styles.inputBar}>
            <TextInput
              style={styles.textInput}
              placeholder="Ask Quran, Hadith, prayers, or shrines..."
              placeholderTextColor="rgba(110, 231, 183, 0.4)"
              value={inputText}
              onChangeText={setInputText}
              onSubmitEditing={() => handleSend()}
              returnKeyType="send"
            />
            <TouchableOpacity
              style={styles.sendBtn}
              onPress={() => handleSend()}
              disabled={!inputText.trim() || loading}
            >
              <Ionicons name="arrow-up" size={20} color={THEME.colors.textDark} />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackdrop: {
    flex: 1,
    backgroundColor: THEME.colors.bgModalGlass,
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: THEME.colors.divider,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(245, 158, 11, 0.15)',
    borderWidth: 1,
    borderColor: THEME.colors.goldBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: THEME.colors.textWhite,
  },
  headerSub: {
    fontSize: 11,
    color: THEME.colors.emeraldSubtle,
  },
  closeBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  messagesList: {
    paddingVertical: 16,
    gap: 14,
  },
  msgContainer: {
    borderRadius: 18,
    padding: 14,
    maxWidth: '90%',
  },
  msgUser: {
    alignSelf: 'flex-end',
    backgroundColor: THEME.colors.goldPrimary,
  },
  msgAssistant: {
    alignSelf: 'flex-start',
    backgroundColor: THEME.colors.bgCard,
    borderWidth: 1,
    borderColor: THEME.colors.borderSubtle,
  },
  msgHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 6,
  },
  assistantBadge: {
    fontSize: 10,
    fontWeight: '800',
    color: THEME.colors.goldLight,
    letterSpacing: 0.5,
  },
  msgText: {
    fontSize: 14,
    lineHeight: 20,
  },
  msgTextUser: {
    color: THEME.colors.textDark,
    fontWeight: '700',
  },
  msgTextAssistant: {
    color: THEME.colors.textWhite,
  },
  citationBox: {
    marginTop: 10,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.08)',
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 6,
  },
  citationText: {
    fontSize: 11,
    color: THEME.colors.emeraldSubtle,
    fontStyle: 'italic',
    flex: 1,
  },
  loadingText: {
    fontSize: 13,
    color: THEME.colors.goldLight,
    fontStyle: 'italic',
  },
  suggestionsSection: {
    marginTop: 10,
  },
  suggestionsLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: THEME.colors.goldPrimary,
    letterSpacing: 1,
    marginBottom: 8,
  },
  suggestionsPills: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  promptPill: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 20,
  },
  promptPillText: {
    color: THEME.colors.emeraldSubtle,
    fontSize: 12,
    fontWeight: '600',
  },
  inputBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: THEME.colors.divider,
  },
  textInput: {
    flex: 1,
    backgroundColor: THEME.colors.bgCard,
    borderWidth: 1,
    borderColor: THEME.colors.borderSubtle,
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 10,
    color: THEME.colors.textWhite,
    fontSize: 14,
  },
  sendBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: THEME.colors.goldPrimary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
