import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Share,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { JANAZAH_GUIDE, JanazahGuideSection } from '../src/data/islamicCoreData';

export default function JanazahScreen() {
  const router = useRouter();
  const [selectedSection, setSelectedSection] = useState<string>(JANAZAH_GUIDE[0].id);

  const handleShareDua = async (title: string, arabic: string, translit: string, trans: string) => {
    try {
      await Share.share({
        message: `${title}\n\n${arabic}\n\n${translit}\n\n"${trans}"\n\nShared from Noor-e-ilahi Janazah Guide`,
      });
    } catch {}
  };

  const active = JANAZAH_GUIDE.find(s => s.id === selectedSection) || JANAZAH_GUIDE[0];

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
            <Text style={styles.title}>Janazah & Bereavement Guide</Text>
            <Text style={styles.subtitle}>Carefully Sourced Prophetic Protocols</Text>
          </View>
        </View>

        {/* Section Tabs */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabScroll}>
          {JANAZAH_GUIDE.map((sec: JanazahGuideSection) => (
            <TouchableOpacity
              key={sec.id}
              style={[styles.tabBtn, selectedSection === sec.id && styles.tabBtnActive]}
              onPress={() => setSelectedSection(sec.id)}
            >
              <Text style={[styles.tabBtnText, selectedSection === sec.id && styles.tabBtnTextActive]}>
                {sec.title}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <ScrollView contentContainerStyle={styles.contentScroll} showsVerticalScrollIndicator={false}>
          <View style={styles.sectionWrap}>
            {/* Header info card */}
            <View style={styles.card}>
              <Text style={styles.arabicHeading}>{active.arabicTitle}</Text>
              <Text style={styles.cardTitle}>{active.title}</Text>
              <Text style={styles.summaryText}>{active.summary}</Text>
            </View>

            {/* Steps & Rules */}
            <View style={styles.card}>
              <Text style={styles.rulesHeading}>Prophetic Guidelines & Protocols:</Text>
              {active.stepsOrRules.map((rule: string, i: number) => (
                <View key={i} style={styles.ruleRow}>
                  <View style={styles.bulletDot} />
                  <Text style={styles.bulletItem}>{rule}</Text>
                </View>
              ))}
            </View>

            {/* Key Dua if available */}
            {active.keyDua && (
              <View style={styles.duaCard}>
                <View style={styles.duaHeaderRow}>
                  <Text style={styles.duaTitle}>Essential Supplication (Dua):</Text>
                  <TouchableOpacity
                    onPress={() =>
                      handleShareDua(
                        `${active.title} Dua`,
                        active.keyDua?.arabic || '',
                        active.keyDua?.transliteration || '',
                        active.keyDua?.translation || ''
                      )
                    }
                  >
                    <Ionicons name="share-social-outline" size={18} color="#a78bfa" />
                  </TouchableOpacity>
                </View>
                <Text style={styles.arabicScript}>{active.keyDua.arabic}</Text>
                <Text style={styles.translitScript}>{active.keyDua.transliteration}</Text>
                <Text style={styles.transScript}>"{active.keyDua.translation}"</Text>
              </View>
            )}
          </View>

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
  subtitle: { fontSize: 11, color: '#a78bfa', marginTop: 1 },
  tabScroll: { paddingHorizontal: 16, paddingVertical: 10, gap: 8 },
  tabBtn: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: 'rgba(4, 35, 27, 0.7)',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  tabBtnActive: { backgroundColor: '#a78bfa', borderColor: '#c4b5fd' },
  tabBtnText: { color: '#a7f3d0', fontSize: 11, fontWeight: '700' },
  tabBtnTextActive: { color: '#02120d', fontWeight: '900' },
  contentScroll: { padding: 16 },
  sectionWrap: { gap: 14 },
  card: {
    backgroundColor: '#031a14',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  arabicHeading: { color: '#fde68a', fontSize: 18, textAlign: 'right', fontWeight: '700', marginBottom: 4 },
  cardTitle: { color: '#ffffff', fontSize: 16, fontWeight: '800' },
  summaryText: { color: '#cbd5e1', fontSize: 12, lineHeight: 18, marginTop: 6 },
  rulesHeading: { color: '#a78bfa', fontSize: 12, fontWeight: '800', marginBottom: 10 },
  ruleRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 8, marginBottom: 8 },
  bulletDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#a78bfa', marginTop: 6 },
  bulletItem: { color: '#e2e8f0', fontSize: 12, lineHeight: 18, flex: 1 },
  duaCard: {
    backgroundColor: 'rgba(167, 139, 250, 0.1)',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(167, 139, 250, 0.3)',
  },
  duaHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  duaTitle: { color: '#fde68a', fontSize: 12, fontWeight: '800' },
  arabicScript: {
    color: '#fef08a',
    fontSize: 16,
    textAlign: 'right',
    lineHeight: 28,
    fontWeight: '700',
    marginVertical: 8,
  },
  translitScript: { color: '#93c5fd', fontSize: 11, fontStyle: 'italic', marginBottom: 4 },
  transScript: { color: '#e2e8f0', fontSize: 11, lineHeight: 16 },
});
