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
import * as Haptics from 'expo-haptics';
import { FloatingAiButton } from '../src/components/FloatingAiButton';
import { AiAssistantModal } from '../src/components/AiAssistantModal';

interface PrayerLog {
  id: string;
  name: string;
  arabic: string;
  time: string;
  completed: boolean;
}

export default function DashboardScreen() {
  const router = useRouter();
  const [prayers, setPrayers] = useState<PrayerLog[]>([
    { id: 'fajr', name: 'Fajr', arabic: 'الفجر', time: '05:08 AM', completed: true },
    { id: 'dhuhr', name: 'Dhuhr', arabic: 'الظهر', time: '12:28 PM', completed: true },
    { id: 'asr', name: 'Asr', arabic: 'العصر', time: '03:49 PM', completed: true },
    { id: 'maghrib', name: 'Maghrib', arabic: 'المغرب', time: '06:19 PM', completed: false },
    { id: 'isha', name: 'Isha', arabic: 'العشاء', time: '07:34 PM', completed: false },
  ]);

  const [quranGoal, setQuranGoal] = useState({ readAyahs: 24, targetAyahs: 30 });
  const [dhikrDone, setDhikrDone] = useState(132);
  const [fastingToday, setFastingToday] = useState(true);
  const [streakDays, setStreakDays] = useState(14);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);

  const togglePrayer = async (id: string) => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setPrayers(prev =>
      prev.map(p => (p.id === id ? { ...p, completed: !p.completed } : p))
    );
  };

  const completedPrayersCount = prayers.filter(p => p.completed).length;
  const prayerScorePercent = Math.round((completedPrayersCount / 5) * 100);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#02120d" />
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backBtn}
          >
            <Ionicons name="arrow-back" size={20} color="#ffffff" />
          </TouchableOpacity>
          <View style={styles.titleContainer}>
            <Text style={styles.headerTitle}>Spiritual Deen Dashboard</Text>
            <Text style={styles.headerSub}>Daily Worship Progress & Deeds Log</Text>
          </View>
          <View style={styles.streakBadge}>
            <Ionicons name="flame" size={14} color="#f59e0b" />
            <Text style={styles.streakText}>{streakDays}d Streak</Text>
          </View>
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Daily Deeds Progress Hero */}
          <View style={styles.progressHeroCard}>
            <View style={styles.heroTopRow}>
              <View>
                <Text style={styles.heroGreeting}>Salamun Alaykum, Believer</Text>
                <Text style={styles.heroDate}>14 Ramadan 1448 AH • Today's Harmony</Text>
              </View>
              <View style={styles.scoreCircle}>
                <Text style={styles.scoreNumber}>{prayerScorePercent}%</Text>
                <Text style={styles.scoreLabel}>Salah</Text>
              </View>
            </View>

            {/* Quick Metrics */}
            <View style={styles.metricsRow}>
              <View style={styles.metricItem}>
                <Text style={styles.metricVal}>{completedPrayersCount}/5</Text>
                <Text style={styles.metricLabel}>Prayers Done</Text>
              </View>
              <View style={styles.metricDivider} />
              <View style={styles.metricItem}>
                <Text style={styles.metricVal}>{quranGoal.readAyahs}</Text>
                <Text style={styles.metricLabel}>Ayahs Read</Text>
              </View>
              <View style={styles.metricDivider} />
              <View style={styles.metricItem}>
                <Text style={styles.metricVal}>{dhikrDone}</Text>
                <Text style={styles.metricLabel}>Dhikr Count</Text>
              </View>
            </View>
          </View>

          {/* Daily 5 Salaah Tracker */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Daily 5 Canonical Prayers</Text>
              <Text style={styles.sectionSub}>Tap to check off each prayer in its time</Text>
            </View>

            <View style={styles.prayersList}>
              {prayers.map((prayer) => (
                <TouchableOpacity
                  key={prayer.id}
                  style={[styles.prayerCard, prayer.completed && styles.prayerCardDone]}
                  activeOpacity={0.8}
                  onPress={() => togglePrayer(prayer.id)}
                >
                  <View style={styles.prayerLeft}>
                    <View style={[styles.checkbox, prayer.completed && styles.checkboxDone]}>
                      {prayer.completed && (
                        <Ionicons name="checkmark" size={16} color="#031712" />
                      )}
                    </View>
                    <View>
                      <Text style={styles.prayerName}>{prayer.name}</Text>
                      <Text style={styles.prayerTime}>{prayer.time}</Text>
                    </View>
                  </View>
                  <Text style={styles.prayerArabic}>{prayer.arabic}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Quran Goal Card */}
          <View style={styles.goalCard}>
            <View style={styles.goalHeaderRow}>
              <View style={styles.goalTitleGroup}>
                <Ionicons name="book" size={18} color="#f59e0b" />
                <Text style={styles.goalTitle}>Daily Quran Reading Goal</Text>
              </View>
              <Text style={styles.goalTargetText}>
                {quranGoal.readAyahs}/{quranGoal.targetAyahs} Ayahs
              </Text>
            </View>
            <View style={styles.progressBarTrack}>
              <View
                style={[
                  styles.progressBarFill,
                  { width: `${Math.min(100, (quranGoal.readAyahs / quranGoal.targetAyahs) * 100)}%` }
                ]}
              />
            </View>
            <Text style={styles.goalNote}>
              Surah Al-Baqarah • Juz 1 completed. 6 ayahs remaining for today's milestone.
            </Text>
          </View>

          {/* Fasting & Sunnah Deeds */}
          <View style={styles.fastingCard}>
            <View style={styles.fastingHeader}>
              <View style={styles.fastingLeft}>
                <Ionicons name="moon" size={20} color="#fde68a" />
                <View style={{ marginLeft: 10 }}>
                  <Text style={styles.fastingTitle}>Fasting Status</Text>
                  <Text style={styles.fastingSub}>Ramadan Obligatory Fast (Day 14)</Text>
                </View>
              </View>
              <TouchableOpacity
                style={[styles.fastingToggle, fastingToday && styles.fastingToggleActive]}
                onPress={() => setFastingToday(!fastingToday)}
              >
                <Text style={[styles.fastingToggleText, fastingToday && styles.fastingToggleTextActive]}>
                  {fastingToday ? 'Fasting Today' : 'Not Fasting'}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.fastingRewardBox}>
              <Ionicons name="sparkles" size={13} color="#f59e0b" />
              <Text style={styles.fastingRewardText}>
                "Fasting is a shield; it protects you from the Hellfire." (Sahih Bukhari)
              </Text>
            </View>
          </View>

          <View style={{ height: 60 }} />
        </ScrollView>

        {/* Floating Ask AI Button */}
        <FloatingAiButton onPress={() => setIsAiModalOpen(true)} />

        {/* AI Assistant Modal */}
        <AiAssistantModal
          visible={isAiModalOpen}
          onClose={() => setIsAiModalOpen(false)}
        />
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
    backgroundColor: '#02120d',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#04231b',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(52, 211, 153, 0.2)',
  },
  titleContainer: {
    flex: 1,
    marginHorizontal: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: '#ffffff',
  },
  headerSub: {
    fontSize: 10,
    color: '#6ee7b7',
    marginTop: 1,
    fontWeight: '600',
  },
  streakBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(245, 158, 11, 0.15)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.3)',
  },
  streakText: {
    color: '#f59e0b',
    fontSize: 11,
    fontWeight: '800',
  },
  scrollContent: {
    paddingBottom: 40,
    gap: 14,
  },
  progressHeroCard: {
    backgroundColor: '#04281e',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.3)',
  },
  heroTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  heroGreeting: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '800',
  },
  heroDate: {
    color: '#6ee7b7',
    fontSize: 11,
    marginTop: 2,
  },
  scoreCircle: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: '#031712',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#f59e0b',
  },
  scoreNumber: {
    color: '#f59e0b',
    fontSize: 14,
    fontWeight: '900',
  },
  scoreLabel: {
    color: 'rgba(110, 231, 183, 0.8)',
    fontSize: 8,
    fontWeight: '700',
  },
  metricsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: 'rgba(2, 18, 13, 0.6)',
    borderRadius: 14,
    paddingVertical: 10,
  },
  metricItem: {
    alignItems: 'center',
  },
  metricVal: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '900',
  },
  metricLabel: {
    color: '#6ee7b7',
    fontSize: 10,
    marginTop: 2,
  },
  metricDivider: {
    width: 1,
    height: 24,
    backgroundColor: 'rgba(52, 211, 153, 0.2)',
  },
  section: {
    gap: 10,
  },
  sectionHeader: {
    marginBottom: 2,
  },
  sectionTitle: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '800',
  },
  sectionSub: {
    color: '#6ee7b7',
    fontSize: 11,
    marginTop: 1,
  },
  prayersList: {
    gap: 8,
  },
  prayerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#031a14',
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: 'rgba(52, 211, 153, 0.12)',
  },
  prayerCardDone: {
    borderColor: 'rgba(16, 185, 129, 0.5)',
    backgroundColor: '#04281e',
  },
  prayerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  checkbox: {
    width: 26,
    height: 26,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: 'rgba(52, 211, 153, 0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxDone: {
    backgroundColor: '#10b981',
    borderColor: '#34d399',
  },
  prayerName: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '700',
  },
  prayerTime: {
    color: '#6ee7b7',
    fontSize: 11,
    marginTop: 1,
  },
  prayerArabic: {
    color: '#fde68a',
    fontSize: 18,
    fontWeight: 'bold',
  },
  goalCard: {
    backgroundColor: '#031a14',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: 'rgba(52, 211, 153, 0.14)',
  },
  goalHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  goalTitleGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  goalTitle: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '700',
  },
  goalTargetText: {
    color: '#f59e0b',
    fontSize: 12,
    fontWeight: '800',
  },
  progressBarTrack: {
    height: 8,
    backgroundColor: '#02120d',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#f59e0b',
    borderRadius: 4,
  },
  goalNote: {
    color: 'rgba(110, 231, 183, 0.75)',
    fontSize: 11,
  },
  fastingCard: {
    backgroundColor: '#031a14',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: 'rgba(52, 211, 153, 0.14)',
  },
  fastingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  fastingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  fastingTitle: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '700',
  },
  fastingSub: {
    color: '#6ee7b7',
    fontSize: 11,
    marginTop: 1,
  },
  fastingToggle: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
    backgroundColor: '#04231b',
    borderWidth: 1,
    borderColor: 'rgba(52, 211, 153, 0.2)',
  },
  fastingToggleActive: {
    backgroundColor: '#10b981',
    borderColor: '#34d399',
  },
  fastingToggleText: {
    color: '#6ee7b7',
    fontSize: 11,
    fontWeight: '700',
  },
  fastingToggleTextActive: {
    color: '#02120d',
    fontWeight: '900',
  },
  fastingRewardBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(245, 158, 11, 0.08)',
    padding: 8,
    borderRadius: 8,
  },
  fastingRewardText: {
    color: '#fde68a',
    fontSize: 11,
    fontWeight: '500',
    flex: 1,
    fontStyle: 'italic',
  },
});
