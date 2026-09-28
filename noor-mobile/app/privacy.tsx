// ============================================================
// NOOR Mobile — Privacy Policy Screen
// In-App & Web Unified Policy
// Adheres to Google Play Data Safety, Apple Privacy Guidelines & Shariah Amanah
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
import { THEME } from '../src/theme';

export default function PrivacyScreen() {
  const router = useRouter();

  const openWebPrivacy = () => {
    Linking.openURL('https://www.nooreilahi.com/privacy');
  };

  const SECTIONS = [
    {
      icon: 'shield-checkmark',
      title: '1. Sacred Trust (Amanah) & Zero Ads',
      desc: 'NOOR-E-ILAHI treats your spiritual practice with absolute sanctity. We do NOT monetize user data, we do NOT sell personal information to brokers, and our platform is 100% ad-free without behavioral tracking.'
    },
    {
      icon: 'location',
      title: '2. Location Processing (Prayer & Qibla)',
      desc: 'GPS coordinates are strictly used on-device or via ephemeral prayer calculation to determine exact prayer timings and the Qibla angle to the Holy Kaaba in Makkah. Your real-time location history is NEVER recorded, stored, or profiled.'
    },
    {
      icon: 'volume-high',
      title: '3. Adhan Audio & Notifications',
      desc: 'Adhan and reminder alerts are scheduled locally on your device. Audio playback streams verified classical Adhans and Quranic recitations directly from our secure CDN without recording or accessing your microphone.'
    },
    {
      icon: 'phone-portrait',
      title: '4. Local Storage & Offline-First Design',
      desc: 'Bookmarks, last read Surahs, Tasbih counts, and preferred calculation methods (MWL, ISNA, Umm al-Qura, Karachi, etc.) are stored locally on your device using secure storage, operating seamlessly offline.'
    },
    {
      icon: 'heart-outline',
      title: '5. Children’s Privacy (COPPA & GDPR-K)',
      desc: 'NOOR Kids content (Arabic alphabet, prophetic stories) is educational, wholesome, and strictly non-commercial. We do not solicit personal identifiers or track children under 13.'
    },
    {
      icon: 'trash-outline',
      title: '6. User Rights & Data Deletion',
      desc: 'If you create a synchronized account, you retain the complete right to request data export or complete account erasure at any time via salam@nooreilahi.com.'
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
          <Text style={styles.headerTitle}>Privacy Policy</Text>
          <Text style={styles.headerSubtitle}>App & Web • Updated Sept 28, 2026</Text>
        </View>
        <TouchableOpacity
          style={styles.webBtn}
          onPress={openWebPrivacy}
          activeOpacity={0.8}
        >
          <Ionicons name="globe-outline" size={18} color="#34d399" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Trust Banner */}
        <View style={styles.trustBanner}>
          <View style={styles.trustIconBox}>
            <MaterialCommunityIcons name="shield-check" size={28} color="#f59e0b" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.trustTitle}>Privacy by Design & Shariah Amanah</Text>
            <Text style={styles.trustText}>
              Built to protect your privacy across mobile apps (iOS & Android) and website (nooreilahi.com). No trackers, no ad networks, no data brokering.
            </Text>
          </View>
        </View>

        {/* Policy Sections */}
        {SECTIONS.map((sec, idx) => (
          <View key={idx} style={styles.sectionCard}>
            <View style={styles.sectionHeader}>
              <View style={styles.iconCircle}>
                <Ionicons name={sec.icon as any} size={18} color="#34d399" />
              </View>
              <Text style={styles.sectionTitle}>{sec.title}</Text>
            </View>
            <Text style={styles.sectionDesc}>{sec.desc}</Text>
          </View>
        ))}

        {/* Contact & Full Policy Box */}
        <View style={styles.contactCard}>
          <Text style={styles.contactTitle}>Questions or Data Requests?</Text>
          <Text style={styles.contactText}>
            For data inquiries, privacy questions, or Shariah audit details, please reach our Data Protection Officer:
          </Text>
          <TouchableOpacity
            style={styles.emailBtn}
            onPress={() => Linking.openURL('mailto:salam@nooreilahi.com?subject=Privacy%20Inquiry')}
            activeOpacity={0.85}
          >
            <Ionicons name="mail" size={16} color="#021711" />
            <Text style={styles.emailBtnText}>salam@nooreilahi.com</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.fullWebBtn}
            onPress={openWebPrivacy}
            activeOpacity={0.85}
          >
            <Text style={styles.fullWebBtnText}>View Full Legal Document on Website →</Text>
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
    color: '#6ee7b7',
    marginTop: 1
  },
  webBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(52, 211, 153, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(52, 211, 153, 0.25)'
  },
  content: {
    padding: 16,
    paddingBottom: 40
  },
  trustBanner: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#031c15',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.3)',
    marginBottom: 16,
    gap: 12
  },
  trustIconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: 'rgba(245, 158, 11, 0.12)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  trustTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#fef3c7',
    marginBottom: 4
  },
  trustText: {
    fontSize: 11,
    color: 'rgba(254, 243, 199, 0.8)',
    lineHeight: 16
  },
  sectionCard: {
    backgroundColor: '#031711',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(52, 211, 153, 0.12)',
    marginBottom: 12
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 8
  },
  iconCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(52, 211, 153, 0.12)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#ffffff',
    flex: 1
  },
  sectionDesc: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.72)',
    lineHeight: 18
  },
  contactCard: {
    backgroundColor: '#062c21',
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: 'rgba(52, 211, 153, 0.25)',
    marginTop: 8,
    alignItems: 'center'
  },
  contactTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#ffffff',
    marginBottom: 6
  },
  contactText: {
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
    backgroundColor: '#34d399',
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
  fullWebBtn: {
    paddingVertical: 6
  },
  fullWebBtnText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#f59e0b'
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
