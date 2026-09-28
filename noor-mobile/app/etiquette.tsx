import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Platform,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { THEME } from '../src/theme';
import { useLanguage } from '../src/context/LanguageContext';
import { ISLAMIC_ADAB_LIBRARY, AdabCategory } from '../src/data/islamicCoreData';

export default function EtiquetteScreen() {
  const router = useRouter();
  const { t, language } = useLanguage();
  const [search, setSearch] = useState('');
  const [selectedCat, setSelectedCat] = useState<string>('all');

  const filteredAdab = useMemo(() => {
    const q = search.trim().toLowerCase();
    return ISLAMIC_ADAB_LIBRARY.filter(cat => {
      const matchesCat = selectedCat === 'all' || cat.id === selectedCat;
      if (!matchesCat) return false;
      if (!q) return true;

      return (
        cat.title.toLowerCase().includes(q) ||
        cat.rules.some(r => r.toLowerCase().includes(q))
      );
    });
  }, [search, selectedCat]);

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
            <View style={styles.headerTitleRow}>
              <Text style={styles.title}>Islamic Etiquette & Adab</Text>
              <View style={styles.badgePill}>
                <Text style={styles.badgeText}>Prophetic Manners</Text>
              </View>
            </View>
            <Text style={styles.subtitle}>Sunnah manners for every dimension of daily life</Text>
          </View>
        </View>

        {/* Search Bar */}
        <View style={styles.searchBar}>
          <Ionicons name="search" size={18} color={THEME.colors.goldPrimary} />
          <TextInput
            style={styles.searchInput}
            placeholder={language === 'hi' ? 'सुन्नत आदाब या हदीस खोजें...' : 'Search Sunnah etiquette, manners, or hadith...'}
            placeholderTextColor="rgba(110, 231, 183, 0.4)"
            value={search}
            onChangeText={setSearch}
          />
          {search.length > 0 && (
            <TouchableOpacity onPress={() => setSearch('')}>
              <Ionicons name="close-circle" size={18} color="rgba(255, 255, 255, 0.5)" />
            </TouchableOpacity>
          )}
        </View>

        {/* Category Filter Pills */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryScroll}>
          <TouchableOpacity
            style={[styles.catBtn, selectedCat === 'all' && styles.catBtnActive]}
            onPress={() => setSelectedCat('all')}
          >
            <Text style={[styles.catText, selectedCat === 'all' && styles.catTextActive]}>
              ✨ All Categories ({ISLAMIC_ADAB_LIBRARY.length})
            </Text>
          </TouchableOpacity>
          {ISLAMIC_ADAB_LIBRARY.map(cat => (
            <TouchableOpacity
              key={cat.id}
              style={[styles.catBtn, selectedCat === cat.id && styles.catBtnActive]}
              onPress={() => setSelectedCat(cat.id)}
            >
              <Text style={[styles.catText, selectedCat === cat.id && styles.catTextActive]}>
                {cat.icon} {cat.title.replace('Etiquette of ', '')}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Adab Cards List */}
        <ScrollView contentContainerStyle={styles.cardsScroll} showsVerticalScrollIndicator={false}>
          {filteredAdab.length === 0 ? (
            <View style={styles.emptyState}>
              <Ionicons name="book-outline" size={36} color="rgba(255, 255, 255, 0.3)" />
              <Text style={styles.emptyTitle}>No matching etiquette found</Text>
              <Text style={styles.emptyDesc}>Try searching with terms like "wudu", "eating", "salam", or "parents".</Text>
            </View>
          ) : (
            filteredAdab.map((cat: AdabCategory) => (
              <View key={cat.id} style={styles.categoryCard}>
                <View style={styles.cardHeader}>
                  <View style={styles.iconCircle}>
                    <Text style={{ fontSize: 20 }}>{cat.icon}</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.cardTitle}>{cat.title}</Text>
                    <Text style={styles.cardArabicTitle}>{cat.arabicTitle}</Text>
                  </View>
                </View>

                <View style={styles.rulesList}>
                  {cat.rules.map((rule, idx) => (
                    <View key={idx} style={styles.ruleItem}>
                      <View style={styles.bulletDot} />
                      <Text style={styles.ruleText}>{rule}</Text>
                    </View>
                  ))}
                </View>
              </View>
            ))
          )}

          <View style={{ height: 40 }} />
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
  headerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexWrap: 'wrap',
  },
  title: {
    color: '#ffffff',
    fontSize: 17,
    fontWeight: '700',
  },
  badgePill: {
    backgroundColor: 'rgba(52, 211, 153, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(52, 211, 153, 0.3)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  badgeText: {
    color: '#34d399',
    fontSize: 10,
    fontWeight: '700',
  },
  subtitle: {
    color: 'rgba(110, 231, 183, 0.7)',
    fontSize: 11,
    marginTop: 2,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#031c15',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.25)',
    paddingHorizontal: 12,
    paddingVertical: 9,
    gap: 10,
    marginTop: 4,
    marginBottom: 8,
  },
  searchInput: {
    flex: 1,
    color: '#ffffff',
    fontSize: 13,
  },
  categoryScroll: {
    flexDirection: 'row',
    gap: 6,
    paddingBottom: 10,
  },
  catBtn: {
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.15)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  catBtnActive: {
    backgroundColor: '#f59e0b',
    borderColor: '#f59e0b',
  },
  catText: {
    color: '#d1fae5',
    fontSize: 11,
    fontWeight: '600',
  },
  catTextActive: {
    color: '#031712',
    fontWeight: '700',
  },
  cardsScroll: {
    paddingTop: 6,
    gap: 14,
  },
  categoryCard: {
    backgroundColor: '#031a14',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.2)',
    padding: 16,
    gap: 12,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.08)',
    paddingBottom: 10,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(245, 158, 11, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardTitle: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '700',
  },
  cardArabicTitle: {
    color: '#f59e0b',
    fontSize: 14,
    marginTop: 2,
    fontFamily: Platform.OS === 'ios' ? 'Geeza Pro' : 'serif',
  },
  rulesList: {
    gap: 8,
  },
  ruleItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  bulletDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#34d399',
    marginTop: 6,
  },
  ruleText: {
    flex: 1,
    color: '#e5e7eb',
    fontSize: 13,
    lineHeight: 19,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 50,
    gap: 10,
  },
  emptyTitle: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '700',
  },
  emptyDesc: {
    color: 'rgba(110, 231, 183, 0.65)',
    fontSize: 12,
    textAlign: 'center',
  },
});
