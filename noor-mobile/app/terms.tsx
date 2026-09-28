// ============================================================
// NOOR Mobile — Terms & Conditions Screen
// In-App & Web Unified Agreement
// Shariah-Compliant • Sacred Platform Standards
// ============================================================

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function TermsScreen() {
  const router = useRouter();

  const openWebTerms = () => {
    Linking.openURL('https://www.nooreilahi.com/terms');
  };

  const CLAUSES = [
    {
      icon: 'book',
      title: '1. Acceptance of Terms & Spiritual Intent',
      desc: 'By accessing or using the NOOR mobile application or website (nooreilahi.com), you acknowledge and agree to these Terms. NOOR is provided to assist your spiritual journey and knowledge of classical Islamic practices.'
    },
    {
      icon: 'calculator',
      title: '2. Prayer Times & Astronomical Calculations',
      desc: 'Prayer calculations and Qibla directions are computed using internationally accepted astronomical conventions (MWL, ISNA, Umm al-Qura, Diyanet, Karachi, etc.). Users should account for local terrain, high latitudes, and local mosque announcements.'
    },
    {
      icon: 'shield-checkmark',
      title: '3. Classical Islamic Scholarly Heritage',
      desc: 'All Quranic text, authentic Hadith references, Duas (Hisn al-Muslim), and Ziyarat chronicles are sourced from classical Islamic traditions. NOOR strives for total scholarly fidelity without sectarian partisanship.'
    },
    {
      icon: 'cash',
      title: '4. Zakat Calculations & Voluntary Giving',
      desc: 'The Zakat Calculator is an educational and estimating aid. While calibrated to current silver/gold Nisab values, users should consult qualified Shariah advisors for complex assets or cross-border wealth holdings.'
    },
    {
      icon: 'code-slash',
      title: '5. Intellectual Property & Sacred Respect',
      desc: 'Original code, custom Arabic typography, UI designs, and compiled datasets are protected. Users agree never to misuse Islamic verses, calligraphy, or sacred recitations for profane or harmful purposes.'
    },
    {
      icon: 'lock-closed',
      title: '6. Limitation of Liability & Fair Use',
      desc: 'NOOR is offered as-is with maximum diligence. We do not guarantee uninterrupted server availability during extreme network events, although offline-first caching preserves core prayer and Quran utility.'
    }
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Top Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => router.back()}
          activeOpacity={0.8}
        >
          <Ionicons name="arrow-back" size={20} color="#ffffff" />
        </TouchableOpacity>
        <View style={styles.headerTitleBox}>
          <Text style={styles.headerTitle}>Terms & Conditions</Text>
          <Text style={styles.headerSubtitle}>App & Web • Updated Sept 28, 2026</Text>
        </View>
        <TouchableOpacity
          style={styles.webBtn}
          onPress={openWebTerms}
          activeOpacity={0.8}
        >
          <Ionicons name="globe-outline" size={18} color="#f59e0b" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Banner */}
        <View style={styles.banner}>
          <View style={styles.bannerIconBox}>
            <MaterialCommunityIcons name="scale-balance" size={28} color="#34d399" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.bannerTitle}>Ethical Islamic Agreement</Text>
            <Text style={styles.bannerText}>
              A transparent, Shariah-grounded framework governing both our website and mobile application ecosystem.
            </Text>
          </View>
        </View>

        {/* Clauses */}
        {CLAUSES.map((clause, idx) => (
          <View key={idx} style={styles.card}>
            <View style={styles.cardHeader}>
              <View style={styles.iconCircle}>
                <Ionicons name={clause.icon as any} size={18} color="#f59e0b" />
              </View>
              <Text style={styles.cardTitle}>{clause.title}</Text>
            </View>
            <Text style={styles.cardDesc}>{clause.desc}</Text>
          </View>
        ))}

        {/* Support Box */}
        <View style={styles.supportBox}>
          <Text style={styles.supportTitle}>Legal & Scholarly Oversight</Text>
          <Text style={styles.supportText}>
            For inquiries regarding terms, licensing, or content verification:
          </Text>
          <TouchableOpacity
            style={styles.emailBtn}
            onPress={() => Linking.openURL('mailto:salam@nooreilahi.com?subject=Terms%20Inquiry')}
            activeOpacity={0.85}
          >
            <Ionicons name="mail" size={16} color="#021711" />
            <Text style={styles.emailBtnText}>salam@nooreilahi.com</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.webLinkBtn}
            onPress={openWebTerms}
            activeOpacity={0.85}
          >
            <Text style={styles.webLinkText}>View Full Legal Terms on Website →</Text>
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerBrand}>NOOR-E-ILAHI • نُورِ اِلٰہی</Text>
          <Text style={styles.footerSub}>Global Classical Islamic Platform</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#02120d'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.08)'
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerTitleBox: {
    flex: 1,
    marginLeft: 12
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#ffffff'
  },
  headerSubtitle: {
    fontSize: 10,
    color: '#f59e0b',
    marginTop: 1
  },
  webBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(245, 158, 11, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.25)'
  },
  content: {
    padding: 16,
    paddingBottom: 40
  },
  banner: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#031c15',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(52, 211, 153, 0.3)',
    marginBottom: 16,
    gap: 12
  },
  bannerIconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: 'rgba(52, 211, 153, 0.12)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  bannerTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#6ee7b7',
    marginBottom: 4
  },
  bannerText: {
    fontSize: 11,
    color: 'rgba(255, 255, 255, 0.8)',
    lineHeight: 16
  },
  card: {
    backgroundColor: '#031711',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.12)',
    marginBottom: 12
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 8
  },
  iconCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(245, 158, 11, 0.12)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  cardTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#ffffff',
    flex: 1
  },
  cardDesc: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.72)',
    lineHeight: 18
  },
  supportBox: {
    backgroundColor: '#062c21',
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.25)',
    marginTop: 8,
    alignItems: 'center'
  },
  supportTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#ffffff',
    marginBottom: 6
  },
  supportText: {
    fontSize: 11,
    color: 'rgba(110, 231, 183, 0.8)',
    textAlign: 'center',
    lineHeight: 16,
    marginBottom: 14
  },
  emailBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#f59e0b',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    marginBottom: 10
  },
  emailBtnText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#021711'
  },
  webLinkBtn: {
    paddingVertical: 6
  },
  webLinkText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#34d399'
  },
  footer: {
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 10
  },
  footerBrand: {
    fontSize: 12,
    fontWeight: '800',
    color: '#6ee7b7',
    letterSpacing: 1
  },
  footerSub: {
    fontSize: 10,
    color: 'rgba(255, 255, 255, 0.35)',
    marginTop: 2
  }
});
