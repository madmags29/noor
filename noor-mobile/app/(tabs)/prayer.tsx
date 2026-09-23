import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { THEME } from '../../src/theme';
import { POPULAR_CITIES, MobileCity, LocationPickerModal } from '../../src/components/LocationPickerModal';
import { FloatingAiButton } from '../../src/components/FloatingAiButton';
import { AiAssistantModal } from '../../src/components/AiAssistantModal';
import { AdhanVoiceModal, ADHAN_VOICES, AdhanVoice } from '../../src/components/AdhanVoiceModal';

interface PrayerItem {
  id: string;
  name: string;
  arabic: string;
  time: string;
  isNext?: boolean;
  desc: string;
}

const METHODS = [
  { id: 'mwl', name: 'Muslim World League (MWL)', desc: 'Fajr 18.0° • Isha 17.0°' },
  { id: 'isna', name: 'Islamic Society of North America (ISNA)', desc: 'Fajr 15.0° • Isha 15.0°' },
  { id: 'makkah', name: 'Umm al-Qura University, Makkah', desc: 'Fajr 18.5° • Isha 90 min after Maghrib' },
  { id: 'karachi', name: 'University of Islamic Sciences, Karachi', desc: 'Fajr 18.0° • Isha 18.0°' },
  { id: 'egypt', name: 'Egyptian General Authority of Survey', desc: 'Fajr 19.5° • Isha 17.5°' },
];

export default function PrayerScreen() {
  const [currentCity, setCurrentCity] = useState<MobileCity>(POPULAR_CITIES[0]); // Makkah
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [showMethodModal, setShowMethodModal] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState(METHODS[0]);
  const [showAiModal, setShowAiModal] = useState(false);
  const [showAdhanModal, setShowAdhanModal] = useState(false);
  const [activeAdhan, setActiveAdhan] = useState<AdhanVoice>(ADHAN_VOICES[0]);

  // Audio playing simulation
  const [isPlayingAdhan, setIsPlayingAdhan] = useState(false);

  // Qada tracker state
  const [qadaCounts, setQadaCounts] = useState<Record<string, number>>({
    Fajr: 0,
    Dhuhr: 0,
    Asr: 0,
    Maghrib: 0,
    Isha: 0,
  });

  const updateQada = (name: string, delta: number) => {
    setQadaCounts(prev => ({
      ...prev,
      [name]: Math.max(0, (prev[name] || 0) + delta)
    }));
  };

  const prayers: PrayerItem[] = [
    { id: 'fajr', name: 'Fajr', arabic: 'الفجر', time: '05:14 AM', desc: 'Dawn Prayer until Sunrise' },
    { id: 'sunrise', name: 'Sunrise', arabic: 'الشروق', time: '06:38 AM', desc: 'End of Fajr period' },
    { id: 'dhuhr', name: 'Dhuhr', arabic: 'الظهر', time: '12:54 PM', desc: 'Midday solar zenith' },
    { id: 'asr', name: 'Asr', arabic: 'العصر', time: '04:18 PM', isNext: true, desc: 'Afternoon prayer' },
    { id: 'maghrib', name: 'Maghrib', arabic: 'المغرب', time: '07:08 PM', desc: 'Sunset & Iftar time' },
    { id: 'isha', name: 'Isha', arabic: 'العشاء', time: '08:38 PM', desc: 'Night prayer' },
  ];

  const toggleAdhanAudio = () => {
    setIsPlayingAdhan(!isPlayingAdhan);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Top Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.pageTitle}>Daily Prayer Timetable</Text>
            <Text style={styles.pageSub}>Astronomical calculation • 14 Ramadan 1448 AH</Text>
          </View>

          {/* Location Picker */}
          <TouchableOpacity
            style={styles.locationBtn}
            onPress={() => setShowLocationModal(true)}
            activeOpacity={0.8}
          >
            <Ionicons name="location" size={14} color={THEME.colors.goldPrimary} />
            <Text style={styles.locationBtnText}>{currentCity.city}</Text>
            <Ionicons name="chevron-down" size={12} color={THEME.colors.emeraldSubtle} />
          </TouchableOpacity>
        </View>

        {/* Next Prayer Highlight Card */}
        <View style={styles.nextPrayerCard}>
          <View style={styles.nextTopRow}>
            <View>
              <Text style={styles.nextSubText}>NEXT PRAYER</Text>
              <Text style={styles.nextNameText}>Asr • صلاة العصر</Text>
            </View>
            <Text style={styles.nextTimeText}>04:18 PM</Text>
          </View>

          {/* Audio Adhan Voice Button */}
          <TouchableOpacity
            style={styles.adhanAudioBtn}
            onPress={() => setShowAdhanModal(true)}
            activeOpacity={0.85}
          >
            <Ionicons
              name="volume-high"
              size={20}
              color={THEME.colors.goldPrimary}
            />
            <View style={{ flex: 1 }}>
              <Text style={styles.adhanAudioText}>
                Adhan Call: {activeAdhan.name}
              </Text>
              <Text style={{ color: 'rgba(110, 231, 183, 0.7)', fontSize: 10, marginTop: 1 }}>
                {activeAdhan.city} • Tap to listen or switch voice
              </Text>
            </View>
            <Ionicons name="play-circle" size={20} color="#f59e0b" />
          </TouchableOpacity>
        </View>

        {/* Calculation Method Pill */}
        <TouchableOpacity
          style={styles.methodCard}
          onPress={() => setShowMethodModal(true)}
          activeOpacity={0.85}
        >
          <View style={styles.methodLeft}>
            <MaterialCommunityIcons name="compass-rose" size={18} color={THEME.colors.goldPrimary} />
            <View>
              <Text style={styles.methodLabel}>CALCULATION CONVENTION</Text>
              <Text style={styles.methodName}>{selectedMethod.name}</Text>
              <Text style={styles.methodDesc}>{selectedMethod.desc}</Text>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={18} color={THEME.colors.emeraldSubtle} />
        </TouchableOpacity>

        {/* 6 Prayers Timetable */}
        <Text style={styles.sectionTitle}>Daily Salaah Schedule</Text>
        <View style={styles.prayersList}>
          {prayers.map((p) => {
            const isNext = p.isNext;
            return (
              <View
                key={p.id}
                style={[styles.prayerRow, isNext && styles.prayerRowNext]}
              >
                <View style={styles.prayerLeft}>
                  <View style={[styles.prayerIconBox, isNext && styles.prayerIconBoxNext]}>
                    <Ionicons
                      name="time"
                      size={16}
                      color={isNext ? THEME.colors.textDark : THEME.colors.goldPrimary}
                    />
                  </View>
                  <View>
                    <View style={styles.nameBadgeRow}>
                      <Text style={[styles.prayerName, isNext && styles.prayerNameNext]}>
                        {p.name}
                      </Text>
                      {isNext && (
                        <View style={styles.nextBadge}>
                          <Text style={styles.nextBadgeText}>NEXT</Text>
                        </View>
                      )}
                    </View>
                    <Text style={styles.prayerDesc}>{p.desc}</Text>
                  </View>
                </View>

                <View style={styles.prayerRight}>
                  <Text style={[styles.prayerTime, isNext && styles.prayerTimeNext]}>
                    {p.time}
                  </Text>
                  <Text style={styles.prayerArabic}>{p.arabic}</Text>
                </View>
              </View>
            );
          })}
        </View>

        {/* Qada Salaah Tracker */}
        <Text style={styles.sectionTitle}>Qada Tracker (Missed Prayers)</Text>
        <View style={styles.qadaCard}>
          <Text style={styles.qadaIntro}>
            Track and fulfill any missed obligatory prayers to maintain your spiritual ledger.
          </Text>

          {['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'].map((name) => (
            <View key={name} style={styles.qadaRow}>
              <Text style={styles.qadaPrayerName}>{name}</Text>

              <View style={styles.qadaCounterRow}>
                <TouchableOpacity
                  style={styles.qadaBtn}
                  onPress={() => updateQada(name, -1)}
                >
                  <Ionicons name="remove" size={16} color={THEME.colors.textWhite} />
                </TouchableOpacity>

                <Text style={styles.qadaCountText}>{qadaCounts[name] || 0}</Text>

                <TouchableOpacity
                  style={styles.qadaBtn}
                  onPress={() => updateQada(name, 1)}
                >
                  <Ionicons name="add" size={16} color={THEME.colors.goldPrimary} />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Floating Ask AI Button in Bottom Right */}
      <FloatingAiButton onPress={() => setShowAiModal(true)} />

      {/* Location Picker Modal */}
      <LocationPickerModal
        visible={showLocationModal}
        currentCity={currentCity}
        onSelectCity={(city) => setCurrentCity(city)}
        onClose={() => setShowLocationModal(false)}
      />

      {/* Calculation Method Modal */}
      <Modal visible={showMethodModal} animationType="fade" transparent>
        <SafeAreaView style={styles.modalBackdrop}>
          <View style={styles.modalBox}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalHeaderTitle}>Select Calculation Method</Text>
              <TouchableOpacity onPress={() => setShowMethodModal(false)}>
                <Ionicons name="close" size={20} color={THEME.colors.textWhite} />
              </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.methodsList}>
              {METHODS.map((m) => {
                const isSelected = m.id === selectedMethod.id;
                return (
                  <TouchableOpacity
                    key={m.id}
                    style={[styles.methodOption, isSelected && styles.methodOptionActive]}
                    onPress={() => {
                      setSelectedMethod(m);
                      setShowMethodModal(false);
                    }}
                  >
                    <View style={{ flex: 1 }}>
                      <Text style={[styles.methodOptionName, isSelected && styles.methodOptionNameActive]}>
                        {m.name}
                      </Text>
                      <Text style={styles.methodOptionDesc}>{m.desc}</Text>
                    </View>
                    {isSelected && (
                      <Ionicons name="checkmark-circle" size={20} color={THEME.colors.goldPrimary} />
                    )}
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        </SafeAreaView>
      </Modal>

      {/* Adhan Voice Selector Modal */}
      <AdhanVoiceModal
        visible={showAdhanModal}
        onClose={() => setShowAdhanModal(false)}
        activeAdhanId={activeAdhan.id}
        onSelectAdhan={(adhan) => {
          setActiveAdhan(adhan);
          setShowAdhanModal(false);
        }}
      />

      {/* AI Assistant Modal */}
      <AiAssistantModal
        visible={showAiModal}
        onClose={() => setShowAiModal(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: THEME.colors.bgDark,
  },
  scrollContent: {
    paddingHorizontal: 18,
    paddingTop: 14,
    paddingBottom: 90,
    gap: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 4,
  },
  pageTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: THEME.colors.textWhite,
  },
  pageSub: {
    fontSize: 11,
    color: THEME.colors.emeraldSubtle,
    marginTop: 2,
  },
  locationBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: THEME.colors.bgCard,
    borderWidth: 1,
    borderColor: THEME.colors.borderSubtle,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 20,
  },
  locationBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: THEME.colors.textWhite,
  },
  nextPrayerCard: {
    backgroundColor: THEME.colors.bgCard,
    borderRadius: 24,
    padding: 18,
    borderWidth: 1,
    borderColor: THEME.colors.goldBorder,
    shadowColor: '#f59e0b',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 4,
    gap: 14,
  },
  nextTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  nextSubText: {
    fontSize: 10,
    fontWeight: '800',
    color: THEME.colors.goldPrimary,
    letterSpacing: 1,
  },
  nextNameText: {
    fontSize: 22,
    fontWeight: '900',
    color: THEME.colors.textWhite,
    marginTop: 2,
  },
  nextTimeText: {
    fontSize: 24,
    fontWeight: '900',
    color: THEME.colors.goldLight,
  },
  adhanAudioBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: 'rgba(245, 158, 11, 0.12)',
    borderWidth: 1,
    borderColor: THEME.colors.goldBorder,
    paddingVertical: 12,
    borderRadius: 16,
  },
  adhanAudioBtnActive: {
    backgroundColor: THEME.colors.goldPrimary,
  },
  adhanAudioText: {
    fontSize: 12,
    fontWeight: '800',
    color: THEME.colors.goldPrimary,
  },
  adhanAudioTextActive: {
    color: THEME.colors.textDark,
  },
  methodCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: THEME.colors.bgCard,
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
    borderColor: THEME.colors.borderSubtle,
  },
  methodLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  methodLabel: {
    fontSize: 9,
    fontWeight: '800',
    color: THEME.colors.goldPrimary,
    letterSpacing: 0.8,
  },
  methodName: {
    fontSize: 13,
    fontWeight: '700',
    color: THEME.colors.textWhite,
    marginTop: 1,
  },
  methodDesc: {
    fontSize: 10,
    color: THEME.colors.emeraldSubtle,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: THEME.colors.textWhite,
    letterSpacing: 0.3,
  },
  prayersList: {
    gap: 8,
  },
  prayerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: THEME.colors.bgCard,
    padding: 14,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: THEME.colors.borderSubtle,
  },
  prayerRowNext: {
    borderColor: THEME.colors.goldBorder,
    backgroundColor: 'rgba(245, 158, 11, 0.1)',
  },
  prayerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  prayerIconBox: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  prayerIconBoxNext: {
    backgroundColor: THEME.colors.goldPrimary,
  },
  nameBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  prayerName: {
    fontSize: 15,
    fontWeight: '800',
    color: THEME.colors.textWhite,
  },
  prayerNameNext: {
    color: THEME.colors.goldLight,
  },
  nextBadge: {
    backgroundColor: THEME.colors.goldPrimary,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  nextBadgeText: {
    fontSize: 9,
    fontWeight: '900',
    color: THEME.colors.textDark,
  },
  prayerDesc: {
    fontSize: 10,
    color: THEME.colors.emeraldSubtle,
    marginTop: 1,
  },
  prayerRight: {
    alignItems: 'flex-end',
  },
  prayerTime: {
    fontSize: 16,
    fontWeight: '800',
    color: THEME.colors.textWhite,
    fontFamily: THEME.typography.fontMono,
  },
  prayerTimeNext: {
    color: THEME.colors.goldLight,
    fontWeight: '900',
  },
  prayerArabic: {
    fontSize: 12,
    color: THEME.colors.emeraldSubtle,
    marginTop: 1,
  },
  qadaCard: {
    backgroundColor: THEME.colors.bgCard,
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: THEME.colors.borderSubtle,
    gap: 12,
  },
  qadaIntro: {
    fontSize: 11,
    color: THEME.colors.emeraldSubtle,
    lineHeight: 16,
  },
  qadaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.05)',
  },
  qadaPrayerName: {
    fontSize: 14,
    fontWeight: '700',
    color: THEME.colors.textWhite,
  },
  qadaCounterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  qadaBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  qadaCountText: {
    fontSize: 16,
    fontWeight: '800',
    color: THEME.colors.textWhite,
    minWidth: 24,
    textAlign: 'center',
    fontFamily: THEME.typography.fontMono,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  modalBox: {
    width: '100%',
    maxHeight: '75%',
    backgroundColor: THEME.colors.bgCard,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: THEME.colors.borderSubtle,
    overflow: 'hidden',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: THEME.colors.divider,
  },
  modalHeaderTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: THEME.colors.textWhite,
  },
  methodsList: {
    padding: 14,
    gap: 8,
  },
  methodOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 14,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.06)',
  },
  methodOptionActive: {
    backgroundColor: 'rgba(245, 158, 11, 0.15)',
    borderColor: THEME.colors.goldBorder,
  },
  methodOptionName: {
    fontSize: 14,
    fontWeight: '700',
    color: THEME.colors.textWhite,
  },
  methodOptionNameActive: {
    color: THEME.colors.goldPrimary,
  },
  methodOptionDesc: {
    fontSize: 11,
    color: THEME.colors.emeraldSubtle,
    marginTop: 2,
  },
});
