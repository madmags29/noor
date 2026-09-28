import React, { useState, useMemo } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { THEME } from '../theme';
import { useLanguage } from '../context/LanguageContext';
import { SURAHS_LIST, SurahItem } from '../data/quranData';
import {
  UNIFIED_SEARCH_INDEX,
  LIFE_DUAS,
  ISLAMIC_ADAB_LIBRARY,
  SearchEntry,
  LifeDua
} from '../data/islamicCoreData';

interface SearchModalProps {
  visible: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ visible, onClose }) => {
  const router = useRouter();
  const { t, language } = useLanguage();
  const [query, setQuery] = useState('');

  const clean = query.trim().toLowerCase();

  const matchingSurahs = useMemo(() => {
    if (!clean) return [];
    return SURAHS_LIST.filter(s =>
      s.englishName.toLowerCase().includes(clean) ||
      s.englishNameTranslation.toLowerCase().includes(clean) ||
      s.name.includes(clean) ||
      s.number.toString() === clean
    ).slice(0, 8);
  }, [clean]);

  const matchingIndex = useMemo(() => {
    if (!clean) return [];
    return UNIFIED_SEARCH_INDEX.filter(item =>
      item.title.toLowerCase().includes(clean) ||
      item.subtitle.toLowerCase().includes(clean) ||
      item.snippet.toLowerCase().includes(clean) ||
      item.keywords.some(k => k.toLowerCase().includes(clean))
    ).slice(0, 8);
  }, [clean]);

  const matchingDuas = useMemo(() => {
    if (!clean) return [];
    return LIFE_DUAS.filter(d =>
      d.title.toLowerCase().includes(clean) ||
      d.category.toLowerCase().includes(clean) ||
      d.translation.toLowerCase().includes(clean)
    ).slice(0, 6);
  }, [clean]);

  const handleNavigate = (route: string) => {
    onClose();
    setQuery('');
    router.push(route as any);
  };

  const QUICK_TAGS = ['Al-Fatihah', 'Ayat al-Kursi', 'Salah', 'Wudu', 'Zakat', 'Nikah', 'Morning Dua', 'Janazah'];

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <SafeAreaView style={styles.safeContainer}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            style={styles.keyboardWrap}
          >
            <View style={styles.cardContainer}>
              {/* Header Input */}
              <View style={styles.inputRow}>
                <Ionicons name="search" size={20} color={THEME.colors.goldPrimary} />
                <TextInput
                  style={styles.textInput}
                  placeholder={language === 'hi' ? 'कुरआन, नमाज़, दुआएं या विषय खोजें...' : 'Search Quran, Duas, Salah, Topics...'}
                  placeholderTextColor="rgba(110, 231, 183, 0.4)"
                  value={query}
                  onChangeText={setQuery}
                  autoFocus
                  returnKeyType="search"
                />
                {query.length > 0 && (
                  <TouchableOpacity onPress={() => setQuery('')} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                    <Ionicons name="close-circle" size={18} color="rgba(255, 255, 255, 0.5)" />
                  </TouchableOpacity>
                )}
                <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
                  <Text style={styles.closeBtnText}>{t('close')}</Text>
                </TouchableOpacity>
              </View>

              {/* Quick Tags */}
              {!clean && (
                <View style={styles.quickTagsContainer}>
                  <Text style={styles.quickTagsTitle}>Popular Topics</Text>
                  <View style={styles.quickTagsRow}>
                    {QUICK_TAGS.map((tag) => (
                      <TouchableOpacity
                        key={tag}
                        style={styles.quickTagPill}
                        onPress={() => setQuery(tag)}
                      >
                        <Text style={styles.quickTagText}>{tag}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              )}

              {/* Results ScrollView */}
              <ScrollView
                style={styles.resultsScroll}
                contentContainerStyle={styles.resultsContent}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
              >
                {!clean ? (
                  <View style={styles.emptyPrompt}>
                    <Ionicons name="compass-outline" size={36} color="rgba(245, 158, 11, 0.5)" />
                    <Text style={styles.emptyPromptTitle}>Unified Instant Search</Text>
                    <Text style={styles.emptyPromptSub}>
                      Search across all 114 Quran Surahs, authentic Hisn al-Muslim supplications, step-by-step prayer methods, Zakat calculator, and Nikah guidance.
                    </Text>
                  </View>
                ) : matchingSurahs.length === 0 && matchingIndex.length === 0 && matchingDuas.length === 0 ? (
                  <View style={styles.emptyPrompt}>
                    <Ionicons name="search-outline" size={32} color="rgba(255, 255, 255, 0.3)" />
                    <Text style={styles.emptyPromptTitle}>No Results Found</Text>
                    <Text style={styles.emptyPromptSub}>
                      No matches found for "{query}". Try searching with terms like "Fatihah", "Salah", "Forgiveness", or "Mahr".
                    </Text>
                  </View>
                ) : (
                  <>
                    {/* Surahs Matches */}
                    {matchingSurahs.length > 0 && (
                      <View style={styles.resultGroup}>
                        <View style={styles.groupHeader}>
                          <Ionicons name="book-outline" size={14} color={THEME.colors.goldPrimary} />
                          <Text style={styles.groupTitle}>THE NOBLE QURAN ({matchingSurahs.length})</Text>
                        </View>
                        {matchingSurahs.map((s) => (
                          <TouchableOpacity
                            key={`surah-${s.number}`}
                            style={styles.resultCard}
                            onPress={() => handleNavigate('/(tabs)/quran')}
                          >
                            <View style={styles.badgeNumber}>
                              <Text style={styles.badgeNumberText}>{s.number}</Text>
                            </View>
                            <View style={{ flex: 1 }}>
                              <Text style={styles.resultTitle}>{s.englishName}</Text>
                              <Text style={styles.resultSub}>
                                {s.englishNameTranslation} • {s.numberOfAyahs} verses • {s.revelationType}
                              </Text>
                            </View>
                            <Text style={styles.arabicScriptText}>{s.name}</Text>
                          </TouchableOpacity>
                        ))}
                      </View>
                    )}

                    {/* Unified Knowledge & Guides */}
                    {matchingIndex.length > 0 && (
                      <View style={styles.resultGroup}>
                        <View style={styles.groupHeader}>
                          <Ionicons name="sparkles-outline" size={14} color="#34d399" />
                          <Text style={styles.groupTitle}>PRACTICE & GUIDANCE ({matchingIndex.length})</Text>
                        </View>
                        {matchingIndex.map((item) => (
                          <TouchableOpacity
                            key={item.id}
                            style={styles.resultCard}
                            onPress={() => {
                              const route = item.url.split('#')[0];
                              handleNavigate(route);
                            }}
                          >
                            <View style={[styles.badgeNumber, { backgroundColor: 'rgba(52, 211, 153, 0.15)' }]}>
                              <Ionicons name="shield-checkmark" size={14} color="#34d399" />
                            </View>
                            <View style={{ flex: 1 }}>
                              <View style={styles.categoryPillRow}>
                                <Text style={styles.categoryPillText}>{item.category.toUpperCase()}</Text>
                              </View>
                              <Text style={styles.resultTitle}>{item.title}</Text>
                              <Text style={styles.resultSub} numberOfLines={2}>{item.snippet}</Text>
                            </View>
                            <Ionicons name="chevron-forward" size={16} color="rgba(110, 231, 183, 0.4)" />
                          </TouchableOpacity>
                        ))}
                      </View>
                    )}

                    {/* Duas Matches */}
                    {matchingDuas.length > 0 && (
                      <View style={styles.resultGroup}>
                        <View style={styles.groupHeader}>
                          <MaterialCommunityIcons name="hands-pray" size={14} color={THEME.colors.goldPrimary} />
                          <Text style={styles.groupTitle}>AUTHENTIC SUPPLICATIONS ({matchingDuas.length})</Text>
                        </View>
                        {matchingDuas.map((d) => (
                          <TouchableOpacity
                            key={`dua-${d.id}`}
                            style={styles.resultCard}
                            onPress={() => handleNavigate('/(tabs)/duas')}
                          >
                            <View style={[styles.badgeNumber, { backgroundColor: 'rgba(245, 158, 11, 0.15)' }]}>
                              <Ionicons name="heart" size={13} color="#f59e0b" />
                            </View>
                            <View style={{ flex: 1 }}>
                              <Text style={styles.resultTitle}>{d.title}</Text>
                              <Text style={styles.resultSub} numberOfLines={1}>{d.translation}</Text>
                            </View>
                            <Ionicons name="chevron-forward" size={16} color="rgba(110, 231, 183, 0.4)" />
                          </TouchableOpacity>
                        ))}
                      </View>
                    )}
                  </>
                )}
              </ScrollView>
            </View>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
  },
  safeContainer: {
    flex: 1,
  },
  keyboardWrap: {
    flex: 1,
    paddingHorizontal: 12,
    paddingTop: 8,
    paddingBottom: 24,
  },
  cardContainer: {
    flex: 1,
    backgroundColor: '#031a14',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.3)',
    overflow: 'hidden',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(16, 185, 129, 0.2)',
    gap: 10,
    backgroundColor: 'rgba(2, 24, 18, 0.6)',
  },
  textInput: {
    flex: 1,
    color: '#ffffff',
    fontSize: 15,
    paddingVertical: 4,
  },
  closeBtn: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
  },
  closeBtnText: {
    color: '#6ee7b7',
    fontSize: 12,
    fontWeight: '600',
  },
  quickTagsContainer: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(16, 185, 129, 0.1)',
  },
  quickTagsTitle: {
    color: 'rgba(110, 231, 183, 0.6)',
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  quickTagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  quickTagPill: {
    backgroundColor: 'rgba(16, 185, 129, 0.12)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.25)',
  },
  quickTagText: {
    color: '#6ee7b7',
    fontSize: 11,
    fontWeight: '500',
  },
  resultsScroll: {
    flex: 1,
  },
  resultsContent: {
    padding: 14,
    gap: 16,
  },
  emptyPrompt: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
    gap: 8,
  },
  emptyPromptTitle: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
    marginTop: 6,
  },
  emptyPromptSub: {
    color: 'rgba(110, 231, 183, 0.6)',
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 18,
  },
  resultGroup: {
    gap: 8,
  },
  groupHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  groupTitle: {
    color: '#f59e0b',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.8,
  },
  resultCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(2, 28, 21, 0.7)',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.15)',
    padding: 10,
    gap: 10,
  },
  badgeNumber: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: 'rgba(245, 158, 11, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeNumberText: {
    color: '#f59e0b',
    fontSize: 12,
    fontWeight: '700',
  },
  resultTitle: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '600',
  },
  resultSub: {
    color: 'rgba(110, 231, 183, 0.7)',
    fontSize: 11,
    marginTop: 2,
  },
  arabicScriptText: {
    color: '#6ee7b7',
    fontSize: 16,
    fontFamily: Platform.OS === 'ios' ? 'Geeza Pro' : 'serif',
  },
  categoryPillRow: {
    marginBottom: 2,
  },
  categoryPillText: {
    color: '#34d399',
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 0.6,
  },
});
