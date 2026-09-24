import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import {
  ARABIC_ALPHABET,
  PROPHET_STORIES,
  SALAH_STEPS,
  ArabicLetter,
  ProphetStory,
  SalahStep
} from '../src/data/islamicCoreData';

export default function KidsScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'alphabet' | 'stories' | 'salah'>('alphabet');
  const [selectedLetter, setSelectedLetter] = useState<ArabicLetter>(ARABIC_ALPHABET[0]);

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
            <Text style={styles.title}>NOOR Kids & Family</Text>
            <Text style={styles.subtitle}>Fun Arabic, Inspiring Stories & Salah</Text>
          </View>
        </View>

        {/* Tab Row */}
        <View style={styles.tabRow}>
          {[
            { id: 'alphabet', label: '🔤 Arabic (28)' },
            { id: 'stories', label: '📖 Prophets' },
            { id: 'salah', label: '🕌 Learn Salah' },
          ].map(tab => (
            <TouchableOpacity
              key={tab.id}
              style={[styles.tabBtn, activeTab === tab.id && styles.tabBtnActive]}
              onPress={() => setActiveTab(tab.id as any)}
            >
              <Text style={[styles.tabBtnText, activeTab === tab.id && styles.tabBtnTextActive]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <ScrollView contentContainerStyle={styles.contentScroll} showsVerticalScrollIndicator={false}>
          {activeTab === 'alphabet' && (
            <View style={styles.sectionWrap}>
              {/* Spotlight Card */}
              <View style={styles.spotlightCard}>
                <Text style={styles.spotlightLetter}>{selectedLetter.letter}</Text>
                <Text style={styles.spotlightName}>{selectedLetter.name} ({selectedLetter.transliteration})</Text>
                <View style={styles.examplePill}>
                  <Text style={styles.exampleText}>
                    Word: {selectedLetter.word} ({selectedLetter.meaning}) • Hint: {selectedLetter.audioHint}
                  </Text>
                </View>
              </View>

              {/* 28 Letters Grid */}
              <Text style={styles.subHeading}>Tap any letter to practice:</Text>
              <View style={styles.alphabetGrid}>
                {ARABIC_ALPHABET.map((item: ArabicLetter, idx: number) => (
                  <TouchableOpacity
                    key={idx}
                    style={[
                      styles.letterBtn,
                      selectedLetter.letter === item.letter && styles.letterBtnActive
                    ]}
                    onPress={() => setSelectedLetter(item)}
                  >
                    <Text style={styles.letterText}>{item.letter}</Text>
                    <Text style={styles.letterSub}>{item.name}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}

          {activeTab === 'stories' && (
            <View style={styles.sectionWrap}>
              {PROPHET_STORIES.map((prophet: ProphetStory) => (
                <View key={prophet.id} style={styles.storyCard}>
                  <Text style={styles.prophetArabic}>{prophet.arabicName}</Text>
                  <Text style={styles.prophetTitle}>{prophet.name}: {prophet.title}</Text>
                  <Text style={styles.storySynopsis}>{prophet.kidStory}</Text>
                  <View style={styles.moralBox}>
                    <Text style={styles.moralTitle}>Moral Lesson for Kids:</Text>
                    <Text style={styles.moralText}>💡 {prophet.moralLesson}</Text>
                  </View>
                </View>
              ))}
            </View>
          )}

          {activeTab === 'salah' && (
            <View style={styles.sectionWrap}>
              <View style={styles.infoBanner}>
                <Ionicons name="sparkles" size={18} color="#fbbf24" />
                <Text style={styles.infoBannerText}>
                  "Teach your children prayer when they are seven years old." (Sunan Abi Dawood)
                </Text>
              </View>

              {SALAH_STEPS.map((step: SalahStep) => (
                <View key={step.step} style={styles.storyCard}>
                  <View style={styles.stepNumBadge}>
                    <Text style={styles.stepNumText}>Step {step.step}</Text>
                  </View>
                  <Text style={styles.prophetTitle}>{step.name}</Text>
                  <Text style={styles.prophetArabic}>{step.arabicUtterance}</Text>
                  <Text style={styles.storySynopsis}>Say: {step.transliteration}</Text>
                  <Text style={styles.meaningText}>Meaning: "{step.englishMeaning}"</Text>
                  <Text style={styles.moralText}>Action: {step.posture}</Text>
                </View>
              ))}
            </View>
          )}

          <View style={{ height: 60 }} />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#02120d' },
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.08)',
  },
  backBtn: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.06)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: { fontSize: 16, fontWeight: '800', color: '#ffffff' },
  subtitle: { fontSize: 11, color: '#fbbf24', marginTop: 1 },
  tabRow: {
    flexDirection: 'row',
    padding: 12,
    gap: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.06)',
  },
  tabBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: 'rgba(4, 35, 27, 0.7)',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  tabBtnActive: { backgroundColor: '#fbbf24', borderColor: '#f59e0b' },
  tabBtnText: { color: '#a7f3d0', fontSize: 11, fontWeight: '700' },
  tabBtnTextActive: { color: '#02120d', fontWeight: '900' },
  contentScroll: { padding: 16 },
  sectionWrap: { gap: 12 },
  spotlightCard: {
    backgroundColor: '#04271e',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fbbf24',
  },
  spotlightLetter: {
    fontSize: 72,
    color: '#fef08a',
    fontWeight: '900',
  },
  spotlightName: {
    fontSize: 20,
    fontWeight: '900',
    color: '#ffffff',
    marginTop: 4,
  },
  examplePill: {
    backgroundColor: 'rgba(251, 191, 36, 0.15)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginTop: 10,
  },
  exampleText: { color: '#fbbf24', fontSize: 12, fontWeight: '700' },
  subHeading: { color: '#a7f3d0', fontSize: 12, fontWeight: '700', marginTop: 6 },
  alphabetGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    justifyContent: 'space-between',
  },
  letterBtn: {
    width: '22%',
    backgroundColor: '#031a14',
    borderRadius: 14,
    paddingVertical: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  letterBtnActive: {
    backgroundColor: '#fbbf24',
    borderColor: '#f59e0b',
  },
  letterText: { fontSize: 24, color: '#fef08a', fontWeight: '800' },
  letterSub: { fontSize: 9, color: '#94a3b8', marginTop: 2 },
  storyCard: {
    backgroundColor: '#031a14',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  prophetArabic: { fontSize: 20, color: '#fef08a', textAlign: 'right', fontWeight: '700' },
  prophetTitle: { fontSize: 16, color: '#ffffff', fontWeight: '800', marginTop: 4 },
  storySynopsis: { color: '#cbd5e1', fontSize: 12, lineHeight: 18, marginTop: 6 },
  moralBox: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  moralTitle: { color: '#fbbf24', fontSize: 11, fontWeight: '800', marginBottom: 2 },
  moralText: { color: '#e2e8f0', fontSize: 11, lineHeight: 16 },
  meaningText: { color: '#93c5fd', fontSize: 11, marginVertical: 4 },
  infoBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(251, 191, 36, 0.12)',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(251, 191, 36, 0.3)',
  },
  infoBannerText: { color: '#fef08a', fontSize: 11, flex: 1, fontStyle: 'italic' },
  stepNumBadge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(245, 158, 11, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    marginBottom: 6,
  },
  stepNumText: { color: '#f59e0b', fontSize: 10, fontWeight: '800' },
});
