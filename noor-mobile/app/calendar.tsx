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
import { HIJRI_MONTHS, HOLY_EVENTS, HijriMonth, HolyEvent } from '../src/data/calendarData';
import { FloatingAiButton } from '../src/components/FloatingAiButton';
import { AiAssistantModal } from '../src/components/AiAssistantModal';
import { useLanguage } from '../src/context/LanguageContext';

export default function CalendarScreen() {
  const router = useRouter();
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'Months' | 'HolyEvents'>('Months');
  const [selectedMonth, setSelectedMonth] = useState<HijriMonth | null>(null);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);

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
            <Text style={styles.headerTitle}>{t('calendar')}</Text>
            <Text style={styles.headerSub}>1448 AH • {t('sacredLunarMonths')}</Text>
          </View>
          <View style={styles.currentMonthBadge}>
            <Ionicons name="moon" size={12} color="#f59e0b" />
            <Text style={styles.currentMonthText}>14 Ramadan</Text>
          </View>
        </View>

        {/* Tab Switcher */}
        <View style={styles.tabToggleRow}>
          <TouchableOpacity
            style={[styles.tabBtn, activeTab === 'Months' && styles.tabBtnActive]}
            onPress={() => setActiveTab('Months')}
          >
            <Ionicons
              name="calendar-outline"
              size={15}
              color={activeTab === 'Months' ? '#02120d' : '#6ee7b7'}
            />
            <Text style={[styles.tabBtnText, activeTab === 'Months' && styles.tabBtnTextActive]}>
              {t('sacredLunarMonths')}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tabBtn, activeTab === 'HolyEvents' && styles.tabBtnActive]}
            onPress={() => setActiveTab('HolyEvents')}
          >
            <Ionicons
              name="star-outline"
              size={15}
              color={activeTab === 'HolyEvents' ? '#02120d' : '#6ee7b7'}
            />
            <Text style={[styles.tabBtnText, activeTab === 'HolyEvents' && styles.tabBtnTextActive]}>
              {t('holyObservances')}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Quran Verse Banner */}
        <View style={styles.verseBanner}>
          <Text style={styles.verseArabic}>
            إِنَّ عِدَّةَ الشُّهُورِ عِندَ اللَّهِ اثْنَا عَشَرَ شَهْرًا
          </Text>
          <Text style={styles.verseTranslation}>
            "Indeed, the number of months with Allah is twelve [lunar] months in the register of Allah from the day He created the heavens and the earth; of these, four are sacred." — Surah At-Tawbah 9:36
          </Text>
        </View>

        {activeTab === 'Months' ? (
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.grid}>
              {HIJRI_MONTHS.map((month) => (
                <TouchableOpacity
                  key={month.index}
                  style={[
                    styles.monthCard,
                    month.holy && styles.monthCardHoly,
                    selectedMonth?.index === month.index && styles.monthCardActive
                  ]}
                  activeOpacity={0.8}
                  onPress={() => setSelectedMonth(selectedMonth?.index === month.index ? null : month)}
                >
                  <View style={styles.cardHeader}>
                    <View style={styles.monthNumberBox}>
                      <Text style={styles.monthNumberText}>{month.index}</Text>
                    </View>
                    <View style={styles.badgeGroup}>
                      {month.holy && (
                        <View style={styles.holyPill}>
                          <Text style={styles.holyPillText}>Blessed Holy</Text>
                        </View>
                      )}
                      {month.sacred && (
                        <View style={styles.sacredPill}>
                          <Text style={styles.sacredPillText}>Sacred</Text>
                        </View>
                      )}
                    </View>
                  </View>

                  <Text style={styles.monthNameEn}>{month.nameEn}</Text>
                  <Text style={styles.monthNameAr}>{month.nameAr}</Text>
                  <Text style={styles.monthDesc}>{month.desc}</Text>

                  {/* Expanded Key Events */}
                  {selectedMonth?.index === month.index && (
                    <View style={styles.eventsBox}>
                      <Text style={styles.eventsHeading}>Key Milestones & Observances:</Text>
                      {month.keyEvents.map((evt, i) => (
                        <View key={i} style={styles.eventRow}>
                          <Ionicons name="sparkles" size={11} color="#f59e0b" />
                          <Text style={styles.eventItemText}>{evt}</Text>
                        </View>
                      ))}
                    </View>
                  )}
                </TouchableOpacity>
              ))}
            </View>
            <View style={{ height: 60 }} />
          </ScrollView>
        ) : (
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.eventsList}>
              {HOLY_EVENTS.map((event, index) => (
                <View key={index} style={styles.holyEventCard}>
                  <View style={styles.eventHeaderRow}>
                    <View style={styles.eventCategoryBadge}>
                      <Text style={styles.eventCategoryText}>{event.badge}</Text>
                    </View>
                    <Text style={styles.eventDateText}>{event.hijriDate}</Text>
                  </View>

                  <Text style={styles.eventTitle}>{event.title}</Text>
                  <Text style={styles.eventDesc}>{event.description}</Text>

                  <View style={styles.virtueBox}>
                    <Ionicons name="ribbon-outline" size={14} color="#f59e0b" />
                    <Text style={styles.virtueText}>{event.virtues}</Text>
                  </View>
                </View>
              ))}
            </View>
            <View style={{ height: 60 }} />
          </ScrollView>
        )}

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
  currentMonthBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(245, 158, 11, 0.12)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.3)',
  },
  currentMonthText: {
    color: '#f59e0b',
    fontSize: 11,
    fontWeight: '800',
  },
  tabToggleRow: {
    flexDirection: 'row',
    backgroundColor: '#04231b',
    borderRadius: 14,
    padding: 4,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: 'rgba(52, 211, 153, 0.15)',
    gap: 6,
  },
  tabBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 8,
    borderRadius: 10,
  },
  tabBtnActive: {
    backgroundColor: '#10b981',
  },
  tabBtnText: {
    color: '#6ee7b7',
    fontSize: 12,
    fontWeight: '700',
  },
  tabBtnTextActive: {
    color: '#02120d',
    fontWeight: '900',
  },
  verseBanner: {
    backgroundColor: '#031a14',
    borderRadius: 14,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.25)',
  },
  verseArabic: {
    color: '#fde68a',
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 4,
  },
  verseTranslation: {
    color: 'rgba(110, 231, 183, 0.85)',
    fontSize: 11,
    textAlign: 'center',
    lineHeight: 16,
    fontStyle: 'italic',
  },
  scrollContent: {
    paddingBottom: 40,
  },
  grid: {
    gap: 12,
  },
  monthCard: {
    backgroundColor: '#031a14',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: 'rgba(52, 211, 153, 0.12)',
  },
  monthCardHoly: {
    borderColor: 'rgba(245, 158, 11, 0.4)',
    backgroundColor: '#04231b',
  },
  monthCardActive: {
    borderColor: '#f59e0b',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  monthNumberBox: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: '#02120d',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.3)',
  },
  monthNumberText: {
    color: '#f59e0b',
    fontSize: 12,
    fontWeight: '800',
  },
  badgeGroup: {
    flexDirection: 'row',
    gap: 6,
  },
  holyPill: {
    backgroundColor: 'rgba(245, 158, 11, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.3)',
  },
  holyPillText: {
    color: '#f59e0b',
    fontSize: 10,
    fontWeight: '800',
  },
  sacredPill: {
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.3)',
  },
  sacredPillText: {
    color: '#34d399',
    fontSize: 10,
    fontWeight: '800',
  },
  monthNameEn: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '800',
  },
  monthNameAr: {
    color: '#fde68a',
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 2,
  },
  monthDesc: {
    color: 'rgba(110, 231, 183, 0.75)',
    fontSize: 11,
    lineHeight: 16,
  },
  eventsBox: {
    marginTop: 10,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: 'rgba(52, 211, 153, 0.15)',
    gap: 4,
  },
  eventsHeading: {
    color: '#ffffff',
    fontSize: 11,
    fontWeight: '700',
    marginBottom: 2,
  },
  eventRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  eventItemText: {
    color: '#a7f3d0',
    fontSize: 11,
  },
  eventsList: {
    gap: 12,
  },
  holyEventCard: {
    backgroundColor: '#031a14',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(52, 211, 153, 0.14)',
  },
  eventHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  eventCategoryBadge: {
    backgroundColor: 'rgba(245, 158, 11, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.3)',
  },
  eventCategoryText: {
    color: '#f59e0b',
    fontSize: 10,
    fontWeight: '800',
  },
  eventDateText: {
    color: '#6ee7b7',
    fontSize: 11,
    fontWeight: '700',
  },
  eventTitle: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 6,
  },
  eventDesc: {
    color: 'rgba(110, 231, 183, 0.85)',
    fontSize: 12,
    lineHeight: 18,
    marginBottom: 10,
  },
  virtueBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(245, 158, 11, 0.08)',
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.2)',
  },
  virtueText: {
    color: '#fde68a',
    fontSize: 11,
    fontWeight: '600',
    flex: 1,
  },
});
