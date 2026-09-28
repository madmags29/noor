import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Platform,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { THEME } from '../src/theme';
import { useLanguage } from '../src/context/LanguageContext';
import { SURAHS_LIST } from '../src/data/quranData';
import {
  UNIFIED_SEARCH_INDEX,
  LIFE_DUAS,
} from '../src/data/islamicCoreData';

export default function SearchScreen() {
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
    ).slice(0, 10);
  }, [clean]);

  const matchingIndex = useMemo(() => {
    if (!clean) return [];
    return UNIFIED_SEARCH_INDEX.filter(item =>
      item.title.toLowerCase().includes(clean) ||
      item.subtitle.toLowerCase().includes(clean) ||
      item.snippet.toLowerCase().includes(clean) ||
      item.keywords.some(k => k.toLowerCase().includes(clean))
    ).slice(0, 10);
  }, [clean]);

  const matchingDuas = useMemo(() => {
    if (!clean) return [];
    return LIFE_DUAS.filter(d =>
      d.title.toLowerCase().includes(clean) ||
      d.category.toLowerCase().includes(clean) ||
      d.translation.toLowerCase().includes(clean)
    ).slice(0, 8);
  }, [clean]);

  const QUICK_TAGS = ['Al-Fatihah', 'Ayat al-Kursi', 'Salah Steps', 'Wudu', 'Zakat Calculator', 'Nikah Pillars', 'Morning Dua', 'Janazah'];

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#02120d" />
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={22} color="#ffffff" />
          </TouchableOpacity>
          <View style={{ flex: 1 }}>
            <Text style={styles.title}>Universal Search</Text>
            <Text style={styles.subtitle}>Quran, Duas, Jurisprudence & Practice</Text>
          </View>
        </View>

        {/* Search Bar */}
        <View style={styles.searchBar}>
          <Ionicons name="search" size={18} color={THEME.colors.goldPrimary} />
          <TextInput
            style={styles.input}
            placeholder={language === 'hi' ? 'खोजें: फ़ातिहा, नमाज़, वज़ू, ज़कात, निकाह...' : 'Search: Fatihah, Salah, Wudu, Zakat, Nikah...'}
            placeholderTextColor="rgba(110, 231, 183, 0.4)"
            value={query}
            onChangeText={setQuery}
            autoFocus
          />
          {query.length > 0 && (
            <TouchableOpacity onPress={() => setQuery('')}>
              <Ionicons name="close-circle" size={18} color="rgba(255, 255, 255, 0.5)" />
            </TouchableOpacity>
          )}
        </View>

        {/* Quick Tags */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tagScroll}>
          {QUICK_TAGS.map((tag) => (
            <TouchableOpacity
              key={tag}
              style={[styles.tagPill, clean === tag.toLowerCase() && styles.tagPillActive]}
              onPress={() => setQuery(tag)}
            >
              <Text style={[styles.tagText, clean === tag.toLowerCase() && styles.tagTextActive]}>
                {tag}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Results Body */}
        <ScrollView contentContainerStyle={styles.resultsContent} showsVerticalScrollIndicator={false}>
          {!clean ? (
            <View style={styles.emptyState}>
              <Ionicons name="sparkles-outline" size={40} color={THEME.colors.goldPrimary} />
              <Text style={styles.emptyTitle}>Explore Islamic Knowledge</Text>
              <Text style={styles.emptyDesc}>
                Instant access to all 114 Surahs with audio recitations, authentic Hisn al-Muslim supplications, Zakat calculations, and ritual purification guides.
              </Text>
            </View>
          ) : matchingSurahs.length === 0 && matchingIndex.length === 0 && matchingDuas.length === 0 ? (
            <View style={styles.emptyState}>
              <Ionicons name="alert-circle-outline" size={36} color="rgba(255, 255, 255, 0.4)" />
              <Text style={styles.emptyTitle}>No Results Found</Text>
              <Text style={styles.emptyDesc}>No matches for "{query}". Try checking the spelling or searching a general keyword.</Text>
            </View>
          ) : (
            <View style={{ gap: 16 }}>
              {/* Surahs */}
              {matchingSurahs.length > 0 && (
                <View style={styles.sectionBlock}>
                  <Text style={styles.sectionHeader}>NOBLE QURAN SURAHS ({matchingSurahs.length})</Text>
                  {matchingSurahs.map((s) => (
                    <TouchableOpacity
                      key={`surah-${s.number}`}
                      style={styles.card}
                      onPress={() => router.push('/(tabs)/quran')}
                    >
                      <View style={styles.badgeNum}>
                        <Text style={styles.badgeNumText}>{s.number}</Text>
                      </View>
                      <View style={{ flex: 1 }}>
                        <Text style={styles.cardTitle}>{s.englishName}</Text>
                        <Text style={styles.cardSub}>{s.englishNameTranslation} • {s.numberOfAyahs} ayahs • {s.revelationType}</Text>
                      </View>
                      <Text style={styles.cardArabic}>{s.name}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}

              {/* Guides & Practice */}
              {matchingIndex.length > 0 && (
                <View style={styles.sectionBlock}>
                  <Text style={styles.sectionHeader}>ISLAMIC PRACTICE & GUIDES ({matchingIndex.length})</Text>
                  {matchingIndex.map((item) => (
                    <TouchableOpacity
                      key={item.id}
                      style={styles.card}
                      onPress={() => {
                        const route = item.url.split('#')[0];
                        router.push(route as any);
                      }}
                    >
                      <View style={[styles.badgeNum, { backgroundColor: 'rgba(52, 211, 153, 0.15)' }]}>
                        <Ionicons name="shield-checkmark" size={16} color="#34d399" />
                      </View>
                      <View style={{ flex: 1 }}>
                        <Text style={styles.cardCategory}>{item.category.toUpperCase()}</Text>
                        <Text style={styles.cardTitle}>{item.title}</Text>
                        <Text style={styles.cardSub} numberOfLines={2}>{item.snippet}</Text>
                      </View>
                      <Ionicons name="chevron-forward" size={16} color="rgba(110, 231, 183, 0.4)" />
                    </TouchableOpacity>
                  ))}
                </View>
              )}

              {/* Duas */}
              {matchingDuas.length > 0 && (
                <View style={styles.sectionBlock}>
                  <Text style={styles.sectionHeader}>AUTHENTIC SUPPLICATIONS ({matchingDuas.length})</Text>
                  {matchingDuas.map((d) => (
                    <TouchableOpacity
                      key={`dua-${d.id}`}
                      style={styles.card}
                      onPress={() => router.push('/(tabs)/duas')}
                    >
                      <View style={[styles.badgeNum, { backgroundColor: 'rgba(245, 158, 11, 0.15)' }]}>
                        <Ionicons name="heart" size={14} color="#f59e0b" />
                      </View>
                      <View style={{ flex: 1 }}>
                        <Text style={styles.cardTitle}>{d.title}</Text>
                        <Text style={styles.cardSub} numberOfLines={1}>{d.translation}</Text>
                      </View>
                      <Ionicons name="chevron-forward" size={16} color="rgba(110, 231, 183, 0.4)" />
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#02120d',
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    gap: 12,
  },
  backBtn: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '700',
  },
  subtitle: {
    color: 'rgba(110, 231, 183, 0.7)',
    fontSize: 11,
    marginTop: 1,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#031c15',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.3)',
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 10,
    marginTop: 4,
    marginBottom: 10,
  },
  input: {
    flex: 1,
    color: '#ffffff',
    fontSize: 14,
  },
  tagScroll: {
    flexDirection: 'row',
    gap: 6,
    paddingBottom: 10,
  },
  tagPill: {
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.25)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  tagPillActive: {
    backgroundColor: '#f59e0b',
    borderColor: '#f59e0b',
  },
  tagText: {
    color: '#6ee7b7',
    fontSize: 11,
    fontWeight: '500',
  },
  tagTextActive: {
    color: '#031712',
    fontWeight: '700',
  },
  resultsContent: {
    paddingBottom: 40,
    paddingTop: 6,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    paddingHorizontal: 24,
    gap: 10,
  },
  emptyTitle: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
  emptyDesc: {
    color: 'rgba(110, 231, 183, 0.65)',
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 18,
  },
  sectionBlock: {
    gap: 8,
  },
  sectionHeader: {
    color: '#f59e0b',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.8,
    marginBottom: 4,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#031a14',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.2)',
    padding: 12,
    gap: 12,
  },
  badgeNum: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: 'rgba(245, 158, 11, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeNumText: {
    color: '#f59e0b',
    fontSize: 12,
    fontWeight: '700',
  },
  cardTitle: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  cardCategory: {
    color: '#34d399',
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  cardSub: {
    color: 'rgba(110, 231, 183, 0.7)',
    fontSize: 11,
    marginTop: 2,
  },
  cardArabic: {
    color: '#6ee7b7',
    fontSize: 16,
    fontFamily: Platform.OS === 'ios' ? 'Geeza Pro' : 'serif',
  },
});
