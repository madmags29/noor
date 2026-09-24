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
import { TRAVEL_MODE_RULES } from '../src/data/islamicCoreData';

export default function TravelScreen() {
  const router = useRouter();
  const [distanceKm, setDistanceKm] = useState(120);

  const isQasrEligible = distanceKm >= TRAVEL_MODE_RULES.minDistanceKm;

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
            <Text style={styles.title}>NOOR Travel Mode</Text>
            <Text style={styles.subtitle}>Safar Rules, Qasr Salah & Halal Policy</Text>
          </View>
        </View>

        <ScrollView contentContainerStyle={styles.contentScroll} showsVerticalScrollIndicator={false}>
          {/* Halal Strict Policy Banner */}
          <View style={styles.warningCard}>
            <Ionicons name="shield-checkmark" size={20} color="#fbbf24" />
            <View style={{ flex: 1 }}>
              <Text style={styles.warningTitle}>Halal Verification Principle</Text>
              <Text style={styles.warningText}>
                {TRAVEL_MODE_RULES.halalEvidenceRule}
              </Text>
            </View>
          </View>

          {/* Interactive Distance Calculator */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Journey Distance Calculator</Text>
            <Text style={styles.distanceValue}>{distanceKm} km</Text>
            <Text style={styles.distanceSub}>Approx {Math.round(distanceKm * 0.621371)} miles</Text>

            <View style={styles.distancePresets}>
              {[50, 77, 120, 250, 500].map(d => (
                <TouchableOpacity
                  key={d}
                  style={[styles.presetBtn, distanceKm === d && styles.presetBtnActive]}
                  onPress={() => setDistanceKm(d)}
                >
                  <Text style={[styles.presetText, distanceKm === d && styles.presetTextActive]}>
                    {d} km
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={[styles.eligibilityBanner, isQasrEligible ? styles.eligible : styles.notEligible]}>
              <Ionicons
                name={isQasrEligible ? 'checkmark-circle' : 'information-circle'}
                size={20}
                color={isQasrEligible ? '#10b981' : '#f59e0b'}
              />
              <View style={{ flex: 1 }}>
                <Text style={styles.eligibilityTitle}>
                  {isQasrEligible ? 'Qasr (Shortening) Permitted' : 'Below Safar Threshold (77 km)'}
                </Text>
                <Text style={styles.eligibilityText}>
                  {isQasrEligible
                    ? TRAVEL_MODE_RULES.shorteningPrayers
                    : 'Pray full normal units until your travel distance exceeds 77 km.'}
                </Text>
              </View>
            </View>
          </View>

          {/* Travel Dispensations */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Travel Rules & Rulings</Text>
            <View style={styles.ruleItem}>
              <Text style={styles.ruleName}>Shortening (Qasr):</Text>
              <Text style={styles.ruleDesc}>{TRAVEL_MODE_RULES.shorteningPrayers}</Text>
            </View>
            <View style={styles.ruleItem}>
              <Text style={styles.ruleName}>Combining (Jam'):</Text>
              <Text style={styles.ruleDesc}>{TRAVEL_MODE_RULES.combiningAllowed}</Text>
            </View>
            <View style={styles.ruleItem}>
              <Text style={styles.ruleName}>Wiping over Khuffayn / Socks:</Text>
              <Text style={styles.ruleDesc}>{TRAVEL_MODE_RULES.wipingSocksDays}</Text>
            </View>
            <View style={styles.ruleItem}>
              <Text style={styles.ruleName}>Ramadan Fasting:</Text>
              <Text style={styles.ruleDesc}>{TRAVEL_MODE_RULES.fastingExemption}</Text>
            </View>
          </View>

          {/* Travel Duas Shortcut */}
          <TouchableOpacity
            style={styles.duaShortcutCard}
            onPress={() => router.push('/duas' as any)}
            activeOpacity={0.8}
          >
            <View style={{ flex: 1 }}>
              <Text style={styles.duaShortcutTitle}>✈️ Prophetic Travel Duas</Text>
              <Text style={styles.duaShortcutSub}>Dua for boarding vehicle, departure & return</Text>
            </View>
            <Ionicons name="arrow-forward" size={20} color="#34d399" />
          </TouchableOpacity>

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
  subtitle: { fontSize: 11, color: '#38bdf8', marginTop: 1 },
  contentScroll: { padding: 16, gap: 14 },
  warningCard: {
    flexDirection: 'row',
    gap: 12,
    backgroundColor: 'rgba(251, 191, 36, 0.1)',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: 'rgba(251, 191, 36, 0.3)',
  },
  warningTitle: { color: '#fbbf24', fontSize: 13, fontWeight: '800', marginBottom: 2 },
  warningText: { color: '#fef08a', fontSize: 11, lineHeight: 16 },
  card: {
    backgroundColor: '#031a14',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  cardTitle: { color: '#ffffff', fontSize: 14, fontWeight: '800', marginBottom: 10 },
  distanceValue: { color: '#38bdf8', fontSize: 36, fontWeight: '900', textAlign: 'center' },
  distanceSub: { color: '#94a3b8', fontSize: 11, textAlign: 'center', marginTop: 2, marginBottom: 12 },
  distancePresets: { flexDirection: 'row', gap: 6, justifyContent: 'center', marginBottom: 14 },
  presetBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  presetBtnActive: { backgroundColor: '#38bdf8', borderColor: '#7dd3fc' },
  presetText: { color: '#e2e8f0', fontSize: 11, fontWeight: '700' },
  presetTextActive: { color: '#02120d', fontWeight: '900' },
  eligibilityBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
  },
  eligible: {
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    borderColor: 'rgba(16, 185, 129, 0.35)',
  },
  notEligible: {
    backgroundColor: 'rgba(245, 158, 11, 0.15)',
    borderColor: 'rgba(245, 158, 11, 0.35)',
  },
  eligibilityTitle: { color: '#ffffff', fontSize: 13, fontWeight: '800' },
  eligibilityText: { color: '#cbd5e1', fontSize: 11, marginTop: 2 },
  ruleItem: { marginBottom: 10 },
  ruleName: { color: '#38bdf8', fontSize: 12, fontWeight: '700' },
  ruleDesc: { color: '#e2e8f0', fontSize: 11, lineHeight: 16, marginTop: 2 },
  duaShortcutCard: {
    backgroundColor: '#04271e',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(52, 211, 153, 0.25)',
  },
  duaShortcutTitle: { color: '#ffffff', fontSize: 14, fontWeight: '800' },
  duaShortcutSub: { color: '#6ee7b7', fontSize: 11, marginTop: 2 },
});
