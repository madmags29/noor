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
  HAJJ_UMRAH_GUIDE,
  HAJJ_PACKING_CHECKLIST,
  PilgrimageStep
} from '../src/data/islamicCoreData';

export default function HajjUmrahScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'phases' | 'checklist' | 'talbiyah'>('phases');
  const [packedItems, setPackedItems] = useState<Record<string, boolean>>({});

  useEffect(() => {
    AsyncStorage.getItem('@noor_mobile_hajj_pack').then(val => {
      if (val) {
        try {
          setPackedItems(JSON.parse(val));
        } catch {}
      }
    }).catch(() => {});
  }, []);

  const togglePacked = async (itemKey: string) => {
    const updated = { ...packedItems, [itemKey]: !packedItems[itemKey] };
    setPackedItems(updated);
    try {
      await AsyncStorage.setItem('@noor_mobile_hajj_pack', JSON.stringify(updated));
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
            <Text style={styles.title}>Hajj & Umrah Pilgrimage</Text>
            <Text style={styles.subtitle}>Complete Offline Field Guide</Text>
          </View>
        </View>

        {/* Tab Switcher */}
        <View style={styles.tabRow}>
          {[
            { id: 'phases', label: '🕋 Ritual Phases' },
            { id: 'checklist', label: '🎒 Packing List' },
            { id: 'talbiyah', label: '🗣️ Talbiyah Dua' },
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
          {activeTab === 'phases' && (
            <View style={styles.sectionWrap}>
              {HAJJ_UMRAH_GUIDE.map((phase: PilgrimageStep, idx: number) => (
                <View key={idx} style={styles.phaseCard}>
                  <View style={styles.phaseTop}>
                    <View style={styles.dayBadge}>
                      <Text style={styles.dayText}>{phase.dayOrPhase}</Text>
                    </View>
                    {phase.isRukn && (
                      <View style={styles.typeBadge}>
                        <Text style={styles.typeText}>RUKN (PILLAR)</Text>
                      </View>
                    )}
                  </View>
                  <Text style={styles.phaseName}>{phase.title}</Text>
                  <Text style={styles.arabicName}>{phase.arabicTitle}</Text>
                  <Text style={styles.phaseLocation}>📍 {phase.location}</Text>
                  
                  <View style={styles.actionsBox}>
                    <Text style={styles.actionsHeading}>Mandatory Rituals:</Text>
                    {phase.actions.map((act: string, i: number) => (
                      <Text key={i} style={styles.actionItem}>• {act}</Text>
                    ))}
                  </View>

                  {phase.duas && (
                    <View style={styles.duaBox}>
                      <Text style={styles.duaHeading}>Phase Supplication:</Text>
                      <Text style={styles.duaScript}>{phase.duas}</Text>
                    </View>
                  )}

                  {phase.prohibitions && phase.prohibitions.length > 0 && (
                    <View style={styles.warningBox}>
                      <Ionicons name="warning-outline" size={14} color="#f87171" />
                      <Text style={styles.warningText}>Prohibited: {phase.prohibitions.join(', ')}</Text>
                    </View>
                  )}
                </View>
              ))}
            </View>
          )}

          {activeTab === 'checklist' && (
            <View style={styles.sectionWrap}>
              <View style={styles.progressCard}>
                <Text style={styles.progressTitle}>Pilgrim Packing Progress</Text>
                <Text style={styles.progressCount}>
                  {Object.values(packedItems).filter(Boolean).length} of {HAJJ_PACKING_CHECKLIST.length} Packed
                </Text>
              </View>

              {HAJJ_PACKING_CHECKLIST.map((itemObj: { item: string; essential: boolean }, idx: number) => {
                const isPacked = !!packedItems[itemObj.item];
                return (
                  <TouchableOpacity
                    key={idx}
                    style={[styles.checkItem, isPacked && styles.checkItemDone]}
                    onPress={() => togglePacked(itemObj.item)}
                    activeOpacity={0.8}
                  >
                    <Ionicons
                      name={isPacked ? 'checkbox' : 'square-outline'}
                      size={22}
                      color={isPacked ? '#10b981' : 'rgba(255,255,255,0.4)'}
                    />
                    <View style={{ flex: 1 }}>
                      <Text style={[styles.itemTitle, isPacked && styles.itemTitleDone]}>{itemObj.item}</Text>
                    </View>
                    {itemObj.essential && (
                      <View style={styles.essentialBadge}>
                        <Text style={styles.essentialText}>CRITICAL</Text>
                      </View>
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>
          )}

          {activeTab === 'talbiyah' && (
            <View style={styles.sectionWrap}>
              <View style={styles.talbiyahCard}>
                <Text style={styles.talbiyahHeading}>The Sacred Talbiyah</Text>
                <Text style={styles.talbiyahArabic}>
                  لَبَّيْكَ اللّٰهُمَّ لَبَّيْكَ، لَبَّيْكَ لَا شَرِيكَ لَكَ لَبَّيْكَ، إِنَّ الْحَمْدَ وَالنِّعْمَةَ لَكَ وَالْمُلْكَ، لَا شَرِيكَ لَكَ
                </Text>
                <Text style={styles.talbiyahTranslit}>
                  Labbayk Allahumma labbayk, labbayka la shareeka laka labbayk, innal-hamda wan-ni'mata laka wal-mulk, la shareeka lak.
                </Text>
                <Text style={styles.talbiyahTrans}>
                  "Here I am at Your service, O Allah, here I am! Here I am, You have no partner, here I am! Verily all praise, blessings, and kingdom belong to You; You have no partner."
                </Text>
                <Text style={styles.talbiyahHadith}>📜 Sahih al-Bukhari 1549 & Sahih Muslim 1184</Text>
              </View>
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
  subtitle: { fontSize: 11, color: '#f59e0b', marginTop: 1 },
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
  tabBtnActive: { backgroundColor: '#f59e0b', borderColor: '#fbbf24' },
  tabBtnText: { color: '#a7f3d0', fontSize: 11, fontWeight: '700' },
  tabBtnTextActive: { color: '#02120d', fontWeight: '900' },
  contentScroll: { padding: 16 },
  sectionWrap: { gap: 12 },
  phaseCard: {
    backgroundColor: '#031a14',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  phaseTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  dayBadge: {
    backgroundColor: 'rgba(245, 158, 11, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  dayText: { color: '#f59e0b', fontSize: 10, fontWeight: '800' },
  typeBadge: {
    backgroundColor: 'rgba(16, 185, 129, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  typeText: { color: '#34d399', fontSize: 10, fontWeight: '800' },
  phaseName: { color: '#ffffff', fontSize: 16, fontWeight: '800' },
  arabicName: { color: '#fde68a', fontSize: 14, marginTop: 2 },
  phaseLocation: { color: '#6ee7b7', fontSize: 11, marginTop: 4 },
  actionsBox: {
    backgroundColor: 'rgba(0,0,0,0.25)',
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  actionsHeading: { color: '#f59e0b', fontSize: 11, fontWeight: '800', marginBottom: 4 },
  actionItem: { color: '#e2e8f0', fontSize: 11, lineHeight: 16 },
  duaBox: {
    backgroundColor: 'rgba(245, 158, 11, 0.08)',
    padding: 10,
    borderRadius: 10,
    marginTop: 8,
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.2)',
  },
  duaHeading: { color: '#fbbf24', fontSize: 10, fontWeight: '800', marginBottom: 4 },
  duaScript: { color: '#fef08a', fontSize: 14, textAlign: 'right', fontWeight: '700', lineHeight: 22 },
  warningBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    padding: 8,
    borderRadius: 8,
    marginTop: 8,
  },
  warningText: { color: '#fca5a5', fontSize: 10, flex: 1 },
  progressCard: {
    backgroundColor: 'rgba(245, 158, 11, 0.12)',
    borderRadius: 14,
    padding: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.3)',
    marginBottom: 6,
  },
  progressTitle: { color: '#ffffff', fontSize: 13, fontWeight: '800' },
  progressCount: { color: '#f59e0b', fontSize: 12, fontWeight: '900', marginTop: 2 },
  checkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#031a14',
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  checkItemDone: {
    borderColor: 'rgba(16, 185, 129, 0.3)',
    opacity: 0.8,
  },
  itemTitle: { color: '#ffffff', fontSize: 13, fontWeight: '700' },
  itemTitleDone: { textDecorationLine: 'line-through', color: '#6ee7b7' },
  essentialBadge: {
    backgroundColor: 'rgba(239, 68, 68, 0.2)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  essentialText: { color: '#f87171', fontSize: 9, fontWeight: '900' },
  talbiyahCard: {
    backgroundColor: '#031a14',
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: '#f59e0b',
  },
  talbiyahHeading: { color: '#f59e0b', fontSize: 16, fontWeight: '900', textAlign: 'center', marginBottom: 12 },
  talbiyahArabic: { color: '#fef08a', fontSize: 20, textAlign: 'center', lineHeight: 32, fontWeight: '700', marginBottom: 12 },
  talbiyahTranslit: { color: '#93c5fd', fontSize: 12, fontStyle: 'italic', textAlign: 'center', marginBottom: 8 },
  talbiyahTrans: { color: '#e2e8f0', fontSize: 12, lineHeight: 18, textAlign: 'center', marginBottom: 12 },
  talbiyahHadith: { color: '#34d399', fontSize: 10, textAlign: 'center', fontStyle: 'italic' },
});
