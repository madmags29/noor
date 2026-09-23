import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { THEME } from '../../src/theme';
import { POPULAR_CITIES, MobileCity, LocationPickerModal } from '../../src/components/LocationPickerModal';
import { QiblaModal } from '../../src/components/QiblaModal';
import { FloatingAiButton } from '../../src/components/FloatingAiButton';
import { AiAssistantModal } from '../../src/components/AiAssistantModal';
import { MuslimLogo } from '../../src/components/MuslimLogo';
import { AuthModal, MobileUser } from '../../src/components/AuthModal';
import { MobileMenuModal } from '../../src/components/MobileMenuModal';
import { AdhanVoiceModal, ADHAN_VOICES, AdhanVoice } from '../../src/components/AdhanVoiceModal';
import { useLanguage } from '../../src/context/LanguageContext';
import { LanguageModal } from '../../src/components/LanguageModal';

export default function HomeScreen() {
  const router = useRouter();
  const { t, language, currentLanguageInfo } = useLanguage();
  const [currentCity, setCurrentCity] = useState<MobileCity>(POPULAR_CITIES[0]); // Makkah default
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showQiblaModal, setShowQiblaModal] = useState(false);
  const [showAiModal, setShowAiModal] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showMenuModal, setShowMenuModal] = useState(false);
  const [showAdhanModal, setShowAdhanModal] = useState(false);
  const [activeAdhan, setActiveAdhan] = useState<AdhanVoice>(ADHAN_VOICES[0]);
  const [currentUser, setCurrentUser] = useState<MobileUser | null>({
    name: 'Zubair Ahmad',
    email: 'zubair.ahmad@gmail.com',
    isLoggedIn: true,
    streakDays: 14,
  });

  // Live countdown simulation
  const [secondsLeft, setSecondsLeft] = useState(2535); // ~42 mins

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 3600));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatCountdown = (totalSecs: number) => {
    const h = Math.floor(totalSecs / 3600);
    const m = Math.floor((totalSecs % 3600) / 60);
    const s = totalSecs % 60;
    return `${h.toString().padStart(2, '0')}h ${m.toString().padStart(2, '0')}m ${s.toString().padStart(2, '0')}s`;
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* 1. Header with Website Muslim Logo, Profile & Side Menu */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setShowMenuModal(true)} activeOpacity={0.8}>
            <MuslimLogo size={38} showText />
          </TouchableOpacity>

          <View style={styles.headerRightActions}>
            {/* Native Language Selector Pill */}
            <TouchableOpacity
              style={styles.langPill}
              onPress={() => setShowLanguageModal(true)}
              activeOpacity={0.8}
            >
              <Text style={styles.langPillFlag}>{currentLanguageInfo.flag}</Text>
              <Text style={styles.langPillText} numberOfLines={1}>
                {currentLanguageInfo.nativeName}
              </Text>
            </TouchableOpacity>

            {/* Location Selector Pill */}
            <TouchableOpacity
              style={styles.locationPill}
              onPress={() => setShowLocationModal(true)}
              activeOpacity={0.8}
            >
              <Ionicons name="location" size={13} color={THEME.colors.goldPrimary} />
              <Text style={styles.locationText} numberOfLines={1}>
                {currentCity.city}
              </Text>
              <Ionicons name="chevron-down" size={11} color={THEME.colors.emeraldSubtle} />
            </TouchableOpacity>

            {/* Profile / Auth Button */}
            <TouchableOpacity
              style={styles.profileBtn}
              onPress={() => setShowAuthModal(true)}
              activeOpacity={0.8}
            >
              {currentUser?.isLoggedIn ? (
                <View style={styles.avatarMini}>
                  <Text style={styles.avatarMiniText}>{currentUser.name.charAt(0).toUpperCase()}</Text>
                </View>
              ) : (
                <Ionicons name="person-circle-outline" size={26} color="#f59e0b" />
              )}
            </TouchableOpacity>

            {/* Side Menu Hamburger Button */}
            <TouchableOpacity
              style={styles.menuBtn}
              onPress={() => setShowMenuModal(true)}
              activeOpacity={0.8}
            >
              <Ionicons name="menu" size={22} color="#ffffff" />
            </TouchableOpacity>
          </View>
        </View>

        {/* 2. Hijri Calendar & Holy Month Status Pill */}
        <View style={styles.dateBar}>
          <View style={styles.dateLeft}>
            <Text style={styles.dateMoon}>🌙</Text>
            <Text style={styles.dateText}>{t('ramadanNotice')}</Text>
          </View>
          <TouchableOpacity onPress={() => router.push('/calendar')}>
            <Text style={styles.calendarLink}>{t('calendar')} →</Text>
          </TouchableOpacity>
        </View>

        {/* 3. Upcoming Salaah Hero Card with Visual Countdown */}
        <View style={styles.heroCard}>
          <View style={styles.heroTop}>
            <View>
              <Text style={styles.heroLabel}>{t('upcomingSalaah')}</Text>
              <Text style={styles.heroPrayer}>{t('asr')} • العصر</Text>
            </View>
            <View style={styles.heroTimeBox}>
              <Text style={styles.heroTime}>04:18 PM</Text>
              <Text style={styles.heroMethod}>{t('standardAsrMethod')}</Text>
            </View>
          </View>

          {/* Countdown & Progress Bar */}
          <View style={styles.countdownBox}>
            <Text style={styles.countdownNumber}>{formatCountdown(secondsLeft)}</Text>
            <Text style={styles.countdownSub}>{t('remainingUntilAdhan')}</Text>

            {/* Visual Progress Bar */}
            <View style={styles.progressBarTrack}>
              <View style={[styles.progressBarFill, { width: '68%' }]} />
            </View>
            <View style={styles.progressLabels}>
              <Text style={styles.progressText}>{t('dhuhr')} {t('elapsed')}</Text>
              <Text style={styles.progressText}>68% {t('elapsed')}</Text>
              <Text style={styles.progressText}>{t('asr')} {t('currentBadge')}</Text>
            </View>
          </View>

          {/* Adhan Voice Controller */}
          <View style={styles.adhanHeroBar}>
            <TouchableOpacity
              style={styles.adhanPill}
              onPress={() => setShowAdhanModal(true)}
              activeOpacity={0.8}
            >
              <Ionicons name="volume-high" size={14} color="#f59e0b" />
              <Text style={styles.adhanPillText} numberOfLines={1}>
                {t('adhanVoice')}: {activeAdhan.name}
              </Text>
              <View style={styles.adhanBadgeSmall}>
                <Text style={styles.adhanBadgeText}>VOICE</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.listenAdhanBtn}
              onPress={() => setShowAdhanModal(true)}
            >
              <Ionicons name="play-circle" size={15} color="#031712" />
              <Text style={styles.listenAdhanText}>{t('listenAdhan')}</Text>
            </TouchableOpacity>
          </View>

          {/* Hero Card Actions */}
          <View style={styles.heroActions}>
            <TouchableOpacity
              style={styles.heroBtnPrimary}
              onPress={() => router.push('/(tabs)/prayer')}
            >
              <Ionicons name="time" size={15} color={THEME.colors.textDark} />
              <Text style={styles.heroBtnPrimaryText}>{t('ctaPrayerTimes')}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.heroBtnSecondary}
              onPress={() => setShowQiblaModal(true)}
            >
              <Ionicons name="compass-outline" size={16} color={THEME.colors.goldPrimary} />
              <Text style={styles.heroBtnSecondaryText}>{t('qibla')}</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* 4. Quick Essentials Grid (Matching All Website Features) */}
        <Text style={styles.sectionHeading}>{t('quickEssentials')}</Text>
        <View style={styles.grid}>
          <TouchableOpacity
            style={styles.gridCard}
            onPress={() => router.push('/(tabs)/prayer')}
            activeOpacity={0.8}
          >
            <View style={styles.gridIconCircle}>
              <Ionicons name="time-outline" size={20} color={THEME.colors.goldPrimary} />
            </View>
            <Text style={styles.gridCardTitle}>{t('prayers')}</Text>
            <Text style={styles.gridCardSub}>{t('prayerTimetable')}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.gridCard}
            onPress={() => router.push('/(tabs)/quran')}
            activeOpacity={0.8}
          >
            <View style={styles.gridIconCircle}>
              <Ionicons name="book-outline" size={20} color={THEME.colors.goldPrimary} />
            </View>
            <Text style={styles.gridCardTitle}>{t('quran')}</Text>
            <Text style={styles.gridCardSub}>{t('surahsCatalog')}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.gridCard}
            onPress={() => router.push('/(tabs)/ziyarat')}
            activeOpacity={0.8}
          >
            <View style={styles.gridIconCircle}>
              <MaterialCommunityIcons name="mosque" size={20} color={THEME.colors.goldPrimary} />
            </View>
            <Text style={styles.gridCardTitle}>{t('ziyarat')}</Text>
            <Text style={styles.gridCardSub}>{t('sanctuariesDirectory')}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.gridCard}
            onPress={() => router.push('/(tabs)/duas')}
            activeOpacity={0.8}
          >
            <View style={styles.gridIconCircle}>
              <MaterialCommunityIcons name="hands-pray" size={20} color={THEME.colors.goldPrimary} />
            </View>
            <Text style={styles.gridCardTitle}>{t('duas')}</Text>
            <Text style={styles.gridCardSub}>{t('interactiveTasbih')}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.gridCard}
            onPress={() => router.push('/calendar')}
            activeOpacity={0.8}
          >
            <View style={styles.gridIconCircle}>
              <Ionicons name="calendar-outline" size={20} color={THEME.colors.goldPrimary} />
            </View>
            <Text style={styles.gridCardTitle}>{t('calendar')}</Text>
            <Text style={styles.gridCardSub}>{t('sacredLunarMonths')}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.gridCard}
            onPress={() => router.push('/media')}
            activeOpacity={0.8}
          >
            <View style={styles.gridIconCircle}>
              <Ionicons name="images-outline" size={20} color={THEME.colors.goldPrimary} />
            </View>
            <Text style={styles.gridCardTitle}>{t('media')}</Text>
            <Text style={styles.gridCardSub}>{t('visualTreasures')}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.gridCard}
            onPress={() => router.push('/dashboard')}
            activeOpacity={0.8}
          >
            <View style={styles.gridIconCircle}>
              <Ionicons name="stats-chart-outline" size={20} color={THEME.colors.goldPrimary} />
            </View>
            <Text style={styles.gridCardTitle}>{t('dashboard')}</Text>
            <Text style={styles.gridCardSub}>{t('spiritualDeenTracker')}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.gridCard}
            onPress={() => router.push('/names-of-allah')}
            activeOpacity={0.8}
          >
            <View style={styles.gridIconCircle}>
              <Ionicons name="sparkles-outline" size={20} color={THEME.colors.goldPrimary} />
            </View>
            <Text style={styles.gridCardTitle}>{t('namesOfAllah')}</Text>
            <Text style={styles.gridCardSub}>{t('asmaDesc')}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.gridCard}
            onPress={() => router.push('/giving')}
            activeOpacity={0.8}
          >
            <View style={styles.gridIconCircle}>
              <Ionicons name="heart-outline" size={20} color={THEME.colors.goldPrimary} />
            </View>
            <Text style={styles.gridCardTitle}>{t('giving')}</Text>
            <Text style={styles.gridCardSub}>{t('sadaqahJariyah')}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.gridCard}
            onPress={() => setShowQiblaModal(true)}
            activeOpacity={0.8}
          >
            <View style={styles.gridIconCircle}>
              <Ionicons name="compass-outline" size={20} color={THEME.colors.goldPrimary} />
            </View>
            <Text style={styles.gridCardTitle}>{t('qibla')}</Text>
            <Text style={styles.gridCardSub}>{t('sacredDirection')}</Text>
          </TouchableOpacity>
        </View>

        {/* 5. Verse of the Day */}
        <Text style={styles.sectionHeading}>{t('dailyVerse')}</Text>
        <View style={styles.ayahCard}>
          <View style={styles.ayahTopRow}>
            <Text style={styles.ayahBismillah}>بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</Text>
            <Text style={styles.ayahSurahTag}>Surah Al-Baqarah 2:255</Text>
          </View>

          <Text style={styles.ayahArabicText}>
            اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْमٌ ۚ لَهُ مَا فِي السَّمَاوَاتِ وَमَا فِي الْأَرْضِ
          </Text>

          <Text style={styles.ayahEnglishText}>
            {language === 'hi'
              ? 'अल्लाह — उसके सिवा कोई इबादत के लायक़ नहीं, वह हमेशा ज़िंदा रहने वाला और सब कुछ संभालने वाला है। न उसे ऊंघ आती है और न नींद। जो कुछ आसमानों में है और जो कुछ ज़मीन में है, सब उसी का है।'
              : language === 'ur'
              ? 'اللہ کے سوا کوئی معبود نہیں، وہ ہمیشہ زندہ رہنے والا اور سب کو سنبھالنے والا ہے۔ نہ اسے اونگھ آتی ہے نہ نیند۔'
              : '"Allah! There is no deity except Him, the Ever-Living, the Sustainer of all existence. Neither drowsiness overtakes Him nor sleep. To Him belongs whatever is in the heavens and whatever is on the earth."'}
          </Text>

          <View style={styles.ayahFooter}>
            <Text style={styles.ayahFooterBadge}>Ayat al-Kursi (2:255)</Text>
            <TouchableOpacity onPress={() => router.push('/(tabs)/quran')}>
              <Text style={styles.ayahFooterLink}>{t('readQuranCta')}</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* 6. Daily Hadith Card */}
        <Text style={styles.sectionHeading}>{t('dailyHadith')}</Text>
        <View style={styles.hadithCard}>
          <View style={styles.hadithHeader}>
            <MaterialCommunityIcons name="book-open-variant" size={16} color={THEME.colors.goldPrimary} />
            <Text style={styles.hadithLabel}>AUTHENTIC PROPHETIC SUNNAH</Text>
          </View>
          <Text style={styles.hadithQuote}>
            {t('hadithQuote')}
          </Text>
          <View style={styles.hadithSourceRow}>
            <Text style={styles.hadithSource}>Sahih al-Bukhari 5027</Text>
            <Text style={styles.hadithNarrator}>Narrated by Uthman ibn Affan (RA)</Text>
          </View>
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

      {/* Qibla Compass & Calendar Modal */}
      <QiblaModal
        visible={showQiblaModal}
        cityName={currentCity.city}
        countryName={currentCity.country}
        onClose={() => setShowQiblaModal(false)}
      />

      {/* AI Assistant Modal */}
      <AiAssistantModal
        visible={showAiModal}
        onClose={() => setShowAiModal(false)}
      />

      {/* Mobile Side Navigation Menu Drawer */}
      <MobileMenuModal
        visible={showMenuModal}
        onClose={() => setShowMenuModal(false)}
        currentUser={currentUser}
        onOpenAuth={() => setShowAuthModal(true)}
        onOpenAdhan={() => setShowAdhanModal(true)}
        onOpenQibla={() => setShowQiblaModal(true)}
        onOpenLocation={() => setShowLocationModal(true)}
        onOpenLanguage={() => setShowLanguageModal(true)}
      />

      {/* User Login & Google Auth Modal */}
      <AuthModal
        visible={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        currentUser={currentUser}
        onLoginSuccess={(user) => setCurrentUser(user)}
        onLogout={() => setCurrentUser(null)}
      />

      {/* Adhan Voice Audio Modal */}
      <AdhanVoiceModal
        visible={showAdhanModal}
        onClose={() => setShowAdhanModal(false)}
        activeAdhanId={activeAdhan.id}
        onSelectAdhan={(adhan) => {
          setActiveAdhan(adhan);
          setShowAdhanModal(false);
        }}
      />

      {/* Native Language Selector Modal */}
      <LanguageModal
        visible={showLanguageModal}
        onClose={() => setShowLanguageModal(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: THEME.colors.bgDark,
  },
  scrollContainer: {
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
  headerRightActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
  },
  profileBtn: {
    padding: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarMini: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#f59e0b',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarMiniText: {
    color: '#031712',
    fontSize: 13,
    fontWeight: '900',
  },
  menuBtn: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  adhanHeroBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 14,
    padding: 8,
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.25)',
    marginTop: 4,
    marginBottom: 8,
  },
  adhanPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flex: 1,
    marginRight: 8,
  },
  adhanPillText: {
    color: '#ffffff',
    fontSize: 11,
    fontWeight: '700',
    flex: 1,
  },
  adhanBadgeSmall: {
    backgroundColor: 'rgba(245, 158, 11, 0.2)',
    paddingHorizontal: 5,
    paddingVertical: 1.5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.4)',
  },
  adhanBadgeText: {
    color: '#fde68a',
    fontSize: 8.5,
    fontWeight: '900',
  },
  listenAdhanBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#f59e0b',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  listenAdhanText: {
    color: '#031712',
    fontSize: 11,
    fontWeight: '900',
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  brandTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: THEME.colors.textWhite,
    letterSpacing: 1.5,
  },
  arabicLogoBadge: {
    backgroundColor: 'rgba(245, 158, 11, 0.15)',
    borderWidth: 1,
    borderColor: THEME.colors.goldBorder,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  arabicLogoText: {
    fontSize: 12,
    fontWeight: '800',
    color: THEME.colors.goldPrimary,
  },
  brandTagline: {
    fontSize: 11,
    color: THEME.colors.emeraldSubtle,
    marginTop: 2,
  },
  locationPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: THEME.colors.bgCard,
    borderWidth: 1,
    borderColor: THEME.colors.borderSubtle,
    paddingHorizontal: 9,
    paddingVertical: 6,
    borderRadius: 16,
    maxWidth: 105,
  },
  locationText: {
    fontSize: 12,
    fontWeight: '700',
    color: THEME.colors.textWhite,
  },
  langPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(245, 158, 11, 0.12)',
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.35)',
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 16,
    maxWidth: 95,
  },
  langPillFlag: {
    fontSize: 13,
  },
  langPillText: {
    fontSize: 11,
    fontWeight: '700',
    color: THEME.colors.goldLight,
  },
  dateBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(245, 158, 11, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.25)',
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 14,
  },
  dateLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flex: 1,
  },
  dateMoon: {
    fontSize: 14,
  },
  dateText: {
    fontSize: 11,
    fontWeight: '700',
    color: THEME.colors.goldLight,
    flex: 1,
  },
  calendarLink: {
    fontSize: 11,
    fontWeight: '800',
    color: THEME.colors.goldPrimary,
  },
  heroCard: {
    backgroundColor: THEME.colors.bgCard,
    borderRadius: 24,
    padding: 18,
    borderWidth: 1,
    borderColor: THEME.colors.goldBorder,
    shadowColor: '#f59e0b',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 4,
  },
  heroTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  heroLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: THEME.colors.goldPrimary,
    letterSpacing: 1,
  },
  heroPrayer: {
    fontSize: 22,
    fontWeight: '900',
    color: THEME.colors.textWhite,
    marginTop: 2,
  },
  heroTimeBox: {
    alignItems: 'flex-end',
  },
  heroTime: {
    fontSize: 22,
    fontWeight: '900',
    color: THEME.colors.goldLight,
  },
  heroMethod: {
    fontSize: 10,
    color: THEME.colors.emeraldSubtle,
    marginTop: 2,
  },
  countdownBox: {
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
    borderRadius: 18,
    padding: 14,
    alignItems: 'center',
    marginVertical: 14,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  countdownNumber: {
    fontSize: 26,
    fontWeight: '900',
    color: THEME.colors.textWhite,
    fontFamily: THEME.typography.fontMono,
    letterSpacing: 1,
  },
  countdownSub: {
    fontSize: 11,
    color: THEME.colors.emeraldSubtle,
    marginTop: 2,
  },
  progressBarTrack: {
    width: '100%',
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 3,
    marginTop: 12,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: THEME.colors.goldPrimary,
    borderRadius: 3,
  },
  progressLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 6,
  },
  progressText: {
    fontSize: 10,
    color: 'rgba(255, 255, 255, 0.5)',
  },
  heroActions: {
    flexDirection: 'row',
    gap: 10,
  },
  heroBtnPrimary: {
    flex: 1,
    backgroundColor: THEME.colors.goldPrimary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 11,
    borderRadius: 14,
  },
  heroBtnPrimaryText: {
    color: THEME.colors.textDark,
    fontSize: 13,
    fontWeight: '900',
  },
  heroBtnSecondary: {
    paddingHorizontal: 18,
    backgroundColor: 'rgba(245, 158, 11, 0.15)',
    borderWidth: 1,
    borderColor: THEME.colors.goldBorder,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    paddingVertical: 11,
    borderRadius: 14,
  },
  heroBtnSecondaryText: {
    color: THEME.colors.goldPrimary,
    fontSize: 13,
    fontWeight: '800',
  },
  sectionHeading: {
    fontSize: 15,
    fontWeight: '800',
    color: THEME.colors.textWhite,
    letterSpacing: 0.3,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  gridCard: {
    width: '48%',
    backgroundColor: THEME.colors.bgCard,
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
    borderColor: THEME.colors.borderSubtle,
    gap: 4,
  },
  gridIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(245, 158, 11, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  gridCardTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: THEME.colors.textWhite,
  },
  gridCardSub: {
    fontSize: 10,
    color: THEME.colors.emeraldSubtle,
  },
  ayahCard: {
    backgroundColor: THEME.colors.bgCard,
    borderRadius: 22,
    padding: 18,
    borderWidth: 1,
    borderColor: THEME.colors.borderSubtle,
    gap: 10,
  },
  ayahTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.06)',
    paddingBottom: 8,
  },
  ayahBismillah: {
    fontSize: 13,
    color: THEME.colors.goldLight,
    fontWeight: '700',
  },
  ayahSurahTag: {
    fontSize: 10,
    fontWeight: '800',
    color: THEME.colors.emeraldSubtle,
  },
  ayahArabicText: {
    fontSize: 17,
    color: THEME.colors.textWhite,
    lineHeight: 28,
    textAlign: 'right',
    fontWeight: '700',
  },
  ayahEnglishText: {
    fontSize: 12,
    color: THEME.colors.textMuted,
    lineHeight: 18,
    fontStyle: 'italic',
  },
  ayahFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.06)',
  },
  ayahFooterBadge: {
    fontSize: 11,
    fontWeight: '800',
    color: THEME.colors.goldPrimary,
  },
  ayahFooterLink: {
    fontSize: 11,
    fontWeight: '800',
    color: THEME.colors.emeraldLight,
  },
  hadithCard: {
    backgroundColor: 'rgba(6, 44, 33, 0.7)',
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(52, 211, 153, 0.2)',
    gap: 8,
  },
  hadithHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  hadithLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: THEME.colors.goldPrimary,
    letterSpacing: 0.8,
  },
  hadithQuote: {
    fontSize: 13,
    color: THEME.colors.textWhite,
    lineHeight: 20,
    fontStyle: 'italic',
  },
  hadithSourceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  hadithSource: {
    fontSize: 11,
    fontWeight: '800',
    color: THEME.colors.goldLight,
  },
  hadithNarrator: {
    fontSize: 10,
    color: THEME.colors.emeraldSubtle,
  },
});
