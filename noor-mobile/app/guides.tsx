import React, { useState, useEffect } from 'react';
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
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  WUDU_STEPS,
  POST_WUDU_DUA,
  GHUSL_STEPS,
  SALAH_STEPS,
  SUNNAH_PRAYERS,
  WuduStep,
  GhuslStep,
  SalahStep,
  SunnahPrayer
} from '../src/data/islamicCoreData';

interface QadaItem {
  id: string;
  name: string;
  count: number;
}

const DEFAULT_QADA: QadaItem[] = [
  { id: 'fajr', name: 'Fajr (2 Rak\'ahs)', count: 0 },
  { id: 'dhuhr', name: 'Dhuhr (4 Rak\'ahs)', count: 0 },
  { id: 'asr', name: 'Asr (4 Rak\'ahs)', count: 0 },
  { id: 'maghrib', name: 'Maghrib (3 Rak\'ahs)', count: 0 },
  { id: 'isha', name: 'Isha (4 Rak\'ahs)', count: 0 },
  { id: 'witr', name: 'Witr (3 Rak\'ahs)', count: 0 },
];

export default function GuidesScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'wudu' | 'ghusl' | 'salah' | 'sunnah' | 'qada'>('wudu');
  const [qadaCounts, setQadaCounts] = useState<QadaItem[]>(DEFAULT_QADA);

  useEffect(() => {
    AsyncStorage.getItem('@noor_mobile_qada').then(val => {
      if (val) {
        try {
          setQadaCounts(JSON.parse(val));
        } catch {}
      }
    }).catch(() => {});
  }, []);

  const updateQada = async (id: string, delta: number) => {
    const updated = qadaCounts.map(q => {
      if (q.id === id) {
        return { ...q, count: Math.max(0, q.count + delta) };
      }
      return q;
    });
    setQadaCounts(updated);
    try {
      await AsyncStorage.setItem('@noor_mobile_qada', JSON.stringify(updated));
    } catch {}
  };

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
            <Text style={styles.title}>Prayer & Purification</Text>
            <Text style={styles.subtitle}>Wudu, Ghusl, Salah Guide & Qada Tracker</Text>
          </View>
        </View>

        {/* Tab Pills */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabScroll}>
          {[
            { id: 'wudu', label: '💧 Wudu', desc: '8 Steps' },
            { id: 'ghusl', label: '🚿 Ghusl', desc: 'Purification' },
            { id: 'salah', label: '🕌 Salah Step-by-Step', desc: '8 Postures' },
            { id: 'sunnah', label: '✨ Sunnah Prayers', desc: 'Rawatib' },
            { id: 'qada', label: '📋 Qada Journal', desc: 'Missed Prayers' },
          ].map(tab => (
            <TouchableOpacity
              key={tab.id}
              style={[styles.tabPill, activeTab === tab.id && styles.tabPillActive]}
              onPress={() => setActiveTab(tab.id as any)}
            >
              <Text style={[styles.tabLabel, activeTab === tab.id && styles.tabLabelActive]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <ScrollView contentContainerStyle={styles.contentScroll} showsVerticalScrollIndicator={false}>
          {/* WUDU TAB */}
          {activeTab === 'wudu' && (
            <View style={styles.sectionWrap}>
              <View style={styles.infoBanner}>
                <Ionicons name="water-outline" size={20} color="#34d399" />
                <Text style={styles.infoBannerText}>
                  "The prayer of none of you will be accepted if he relieves himself until he performs ablution." (Sahih Bukhari)
                </Text>
              </View>

              {WUDU_STEPS.map((step: WuduStep) => (
                <View key={step.step} style={styles.stepCard}>
                  <View style={styles.stepNumBadge}>
                    <Text style={styles.stepNumText}>{step.step}</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <View style={styles.stepHeaderRow}>
                      <Text style={styles.stepTitle}>{step.title}</Text>
                      {step.isFard && (
                        <View style={styles.fardBadge}>
                          <Text style={styles.fardText}>FARD</Text>
                        </View>
                      )}
                    </View>
                    <Text style={styles.arabicScript}>{step.arabicName}</Text>
                    <Text style={styles.stepInstruction}>{step.instruction}</Text>
                    {step.hadithNote && (
                      <Text style={styles.hadithText}>📜 {step.hadithNote}</Text>
                    )}
                  </View>
                </View>
              ))}

              <View style={styles.card}>
                <Text style={styles.subHeading}>Post-Wudu Supplication</Text>
                <Text style={styles.arabicScript}>{POST_WUDU_DUA.arabic}</Text>
                <Text style={styles.translitScript}>{POST_WUDU_DUA.transliteration}</Text>
                <Text style={styles.meaningText}>"{POST_WUDU_DUA.translation}"</Text>
                <Text style={styles.hadithText}>📜 {POST_WUDU_DUA.virtue}</Text>
              </View>
            </View>
          )}

          {/* GHUSL TAB */}
          {activeTab === 'ghusl' && (
            <View style={styles.sectionWrap}>
              {GHUSL_STEPS.map((step: GhuslStep) => (
                <View key={step.step} style={styles.stepCard}>
                  <View style={styles.stepNumBadge}>
                    <Text style={styles.stepNumText}>{step.step}</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <View style={styles.stepHeaderRow}>
                      <Text style={styles.stepTitle}>{step.title}</Text>
                      {step.type === 'Fard' && (
                        <View style={styles.fardBadge}>
                          <Text style={styles.fardText}>FARD</Text>
                        </View>
                      )}
                    </View>
                    <Text style={styles.arabicScript}>{step.arabicName}</Text>
                    <Text style={styles.stepInstruction}>{step.detail}</Text>
                  </View>
                </View>
              ))}
            </View>
          )}

          {/* SALAH STEP-BY-STEP */}
          {activeTab === 'salah' && (
            <View style={styles.sectionWrap}>
              {SALAH_STEPS.map((st: SalahStep) => (
                <View key={st.step} style={styles.stepCard}>
                  <View style={styles.stepNumBadge}>
                    <Text style={styles.stepNumText}>{st.step}</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.stepTitle}>{st.name}</Text>
                    <Text style={styles.arabicScript}>{st.arabicUtterance}</Text>
                    <Text style={styles.translitScript}>{st.transliteration}</Text>
                    <Text style={styles.meaningText}>"{st.englishMeaning}"</Text>
                    <Text style={styles.postureDesc}>📍 {st.posture}</Text>
                    <Text style={styles.hadithText}>⚡ {st.vitalRules}</Text>
                  </View>
                </View>
              ))}
            </View>
          )}

          {/* SUNNAH PRAYERS */}
          {activeTab === 'sunnah' && (
            <View style={styles.sectionWrap}>
              {SUNNAH_PRAYERS.map((sp: SunnahPrayer, idx: number) => (
                <View key={idx} style={styles.stepCard}>
                  <View style={styles.sunnahLeft}>
                    <Text style={styles.sunnahRakats}>{sp.rakahs}</Text>
                    <Text style={styles.sunnahTiming}>{sp.timing}</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.stepTitle}>{sp.name}</Text>
                    <Text style={styles.stepInstruction}>{sp.description}</Text>
                    <Text style={styles.hadithText}>📜 {sp.virtue}</Text>
                  </View>
                </View>
              ))}
            </View>
          )}

          {/* QADA JOURNAL */}
          {activeTab === 'qada' && (
            <View style={styles.sectionWrap}>
              <View style={styles.infoBanner}>
                <Ionicons name="checkmark-done-circle" size={20} color="#f59e0b" />
                <Text style={styles.infoBannerText}>
                  "Whoever forgets a prayer, let him pray it when he remembers it; there is no expiation except that." (Sahih Bukhari)
                </Text>
              </View>

              {qadaCounts.map(item => (
                <View key={item.id} style={styles.qadaRow}>
                  <View>
                    <Text style={styles.qadaName}>{item.name}</Text>
                  </View>
                  <View style={styles.qadaControls}>
                    <TouchableOpacity
                      style={styles.counterBtn}
                      onPress={() => updateQada(item.id, -1)}
                    >
                      <Ionicons name="remove" size={18} color="#ffffff" />
                    </TouchableOpacity>
                    <Text style={styles.qadaCountText}>{item.count}</Text>
                    <TouchableOpacity
                      style={[styles.counterBtn, { backgroundColor: '#10b981' }]}
                      onPress={() => updateQada(item.id, 1)}
                    >
                      <Ionicons name="add" size={18} color="#ffffff" />
                    </TouchableOpacity>
                  </View>
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
  subtitle: { fontSize: 11, color: '#34d399', marginTop: 1 },
  tabScroll: { paddingHorizontal: 16, paddingVertical: 10, gap: 8 },
  tabPill: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: 'rgba(4, 35, 27, 0.7)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  tabPillActive: { backgroundColor: '#f59e0b', borderColor: '#fbbf24' },
  tabLabel: { color: '#a7f3d0', fontSize: 12, fontWeight: '700' },
  tabLabelActive: { color: '#02120d', fontWeight: '900' },
  contentScroll: { padding: 16 },
  sectionWrap: { gap: 12 },
  infoBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.25)',
    marginBottom: 6,
  },
  infoBannerText: { fontSize: 11, color: '#a7f3d0', flex: 1, lineHeight: 16, fontStyle: 'italic' },
  stepCard: {
    backgroundColor: '#031a14',
    borderRadius: 16,
    padding: 14,
    flexDirection: 'row',
    gap: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  card: {
    backgroundColor: '#031a14',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  stepNumBadge: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: '#04231b',
    borderWidth: 1,
    borderColor: '#f59e0b',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepNumText: { color: '#f59e0b', fontWeight: '900', fontSize: 13 },
  stepHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  stepTitle: { color: '#ffffff', fontSize: 14, fontWeight: '800', flex: 1 },
  fardBadge: {
    backgroundColor: 'rgba(239, 68, 68, 0.2)',
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.4)',
  },
  fardText: { color: '#f87171', fontSize: 9, fontWeight: '900' },
  stepInstruction: { color: '#e2e8f0', fontSize: 12, lineHeight: 18 },
  hadithText: { color: '#6ee7b7', fontSize: 10, marginTop: 4, fontStyle: 'italic' },
  arabicScript: { color: '#fde68a', fontSize: 16, textAlign: 'right', marginVertical: 4, fontWeight: '700' },
  translitScript: { color: '#93c5fd', fontSize: 11, fontStyle: 'italic', marginBottom: 2 },
  meaningText: { color: '#cbd5e1', fontSize: 11, lineHeight: 16, marginBottom: 4 },
  postureDesc: { color: '#34d399', fontSize: 11 },
  subHeading: { fontSize: 14, fontWeight: '800', color: '#f59e0b', marginBottom: 4 },
  sunnahLeft: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#04231b',
    paddingHorizontal: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.3)',
  },
  sunnahRakats: { color: '#f59e0b', fontWeight: '900', fontSize: 12 },
  sunnahTiming: { color: '#a7f3d0', fontSize: 9, marginTop: 2 },
  qadaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#031a14',
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  qadaName: { color: '#ffffff', fontSize: 15, fontWeight: '800' },
  qadaControls: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  counterBtn: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  qadaCountText: {
    color: '#f59e0b',
    fontWeight: '900',
    fontSize: 18,
    minWidth: 30,
    textAlign: 'center',
  },
});
