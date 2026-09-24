import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

export default function SettingsScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Qibla & Settings</Text>
        <Text style={styles.subtitle}>Align towards the Holy Kaaba</Text>

        {/* Qibla Compass Card */}
        <View style={styles.compassCard}>
          <Text style={styles.compassLabel}>QIBLA BEARING</Text>
          <Text style={styles.bearingText}>118.4°</Text>
          <Text style={styles.distanceText}>6,782 km to Holy Kaaba (Makkah)</Text>

          <View style={styles.compassCircle}>
            <Text style={styles.needle}>🕋</Text>
            <Text style={styles.compassNorth}>N</Text>
          </View>
        </View>

        {/* Location & Preferences */}
        <Text style={styles.sectionHeader}>Preferences</Text>

        <View style={styles.settingItem}>
          <Text style={styles.settingTitle}>Current Location</Text>
          <Text style={styles.settingValue}>Makkah Al-Mukarramah</Text>
        </View>

        <View style={styles.settingItem}>
          <Text style={styles.settingTitle}>Calculation Method</Text>
          <Text style={styles.settingValue}>Muslim World League</Text>
        </View>

        <View style={styles.settingItem}>
          <Text style={styles.settingTitle}>Asr Madhab</Text>
          <Text style={styles.settingValue}>Standard (Shafi'i, Maliki, Hanbali)</Text>
        </View>

        <View style={styles.settingItem}>
          <Text style={styles.settingTitle}>Adhan Notifications</Text>
          <Text style={styles.settingValue}>Enabled (Makkah Voice)</Text>
        </View>

        {/* Contact & Support Section */}
        <Text style={[styles.sectionHeader, { marginTop: 14 }]}>Support & Inquiries</Text>

        <TouchableOpacity
          style={styles.settingItem}
          onPress={() => router.push('/contact' as any)}
          activeOpacity={0.8}
        >
          <View>
            <Text style={styles.settingTitle}>Contact & Inquiries</Text>
            <Text style={{ color: 'rgba(110, 231, 183, 0.6)', fontSize: 10, marginTop: 2 }}>
              Business, Feedback & Complaints
            </Text>
          </View>
          <Text style={styles.settingValue}>salam@nooreilahi.com →</Text>
        </TouchableOpacity>

        {/* About NOOR Mobile */}
        <View style={styles.aboutCard}>
          <Text style={styles.aboutTitle}>NOOR Platform</Text>
          <Text style={styles.aboutVersion}>Version 1.0.0 (Production Architecture)</Text>
          <Text style={styles.aboutDesc}>
            Shared backend, PostgreSQL schema, and multi-codebase ecosystem dedicated to the global Ummah.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#031712',
  },
  container: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '900',
    color: '#ffffff',
  },
  subtitle: {
    fontSize: 12,
    color: '#6ee7b7',
    marginTop: 4,
    marginBottom: 20,
  },
  compassCard: {
    backgroundColor: 'rgba(30, 24, 8, 0.9)',
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.4)',
    marginBottom: 24,
  },
  compassLabel: {
    color: '#f59e0b',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1,
  },
  bearingText: {
    fontSize: 36,
    fontWeight: '900',
    color: '#ffffff',
    fontFamily: 'Courier',
    marginVertical: 4,
  },
  distanceText: {
    fontSize: 12,
    color: 'rgba(110, 231, 183, 0.8)',
    marginBottom: 16,
  },
  compassCircle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 2,
    borderColor: '#f59e0b',
    backgroundColor: '#031712',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  needle: {
    fontSize: 32,
  },
  compassNorth: {
    position: 'absolute',
    top: 6,
    color: '#f59e0b',
    fontWeight: '900',
    fontSize: 12,
  },
  sectionHeader: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 12,
  },
  settingItem: {
    backgroundColor: '#062c21',
    borderRadius: 14,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(52, 211, 153, 0.15)',
    marginBottom: 10,
  },
  settingTitle: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '600',
  },
  settingValue: {
    color: '#f59e0b',
    fontSize: 12,
    fontWeight: '700',
  },
  aboutCard: {
    marginTop: 20,
    padding: 16,
    borderRadius: 16,
    backgroundColor: '#02140f',
    borderWidth: 1,
    borderColor: 'rgba(6, 78, 59, 0.5)',
  },
  aboutTitle: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  aboutVersion: {
    color: '#6ee7b7',
    fontSize: 11,
    marginTop: 2,
  },
  aboutDesc: {
    color: 'rgba(110, 231, 183, 0.6)',
    fontSize: 11,
    marginTop: 6,
    lineHeight: 16,
  },
});
