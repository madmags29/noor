import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Linking,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { MuslimLogo } from './MuslimLogo';
import { MobileUser } from './AuthModal';
import { THEME } from '../theme';
import { useLanguage } from '../context/LanguageContext';

interface MobileMenuModalProps {
  visible: boolean;
  onClose: () => void;
  currentUser?: MobileUser | null;
  onOpenAuth?: () => void;
  onOpenAdhan?: () => void;
  onOpenQibla?: () => void;
  onOpenLocation?: () => void;
  onOpenLanguage?: () => void;
}

export const MobileMenuModal: React.FC<MobileMenuModalProps> = ({
  visible,
  onClose,
  currentUser = null,
  onOpenAuth = () => {},
  onOpenAdhan = () => {},
  onOpenQibla = () => {},
  onOpenLocation = () => {},
  onOpenLanguage = () => {},
}) => {
  const router = useRouter();
  const { t, currentLanguageInfo } = useLanguage();
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [userRating, setUserRating] = useState(5);
  const [ratingSubmitted, setRatingSubmitted] = useState(false);

  const openAppStore = () => {
    const iosUrl = 'https://apps.apple.com/app/noor-e-ilahi/id6470000000?action=write-review';
    Linking.openURL(iosUrl).catch(() => {
      Linking.openURL('https://apps.apple.com/app/noor-e-ilahi');
    });
    setRatingSubmitted(true);
  };

  const openPlayStore = () => {
    const androidMarketUrl = 'market://details?id=com.noor.app';
    const playStoreWebUrl = 'https://play.google.com/store/apps/details?id=com.noor.app';
    Linking.openURL(androidMarketUrl).catch(() => {
      Linking.openURL(playStoreWebUrl);
    });
    setRatingSubmitted(true);
  };

  const navigateTo = (route: string) => {
    onClose();
    router.push(route as any);
  };

  const MENU_ITEMS = [
    {
      id: 'rating',
      label: 'Rate on App Store / Play Store',
      icon: 'star',
      color: '#f59e0b',
      badge: '★★★★★ 5.0',
      action: () => {
        setShowRatingModal(true);
      },
    },
    {
      id: 'language',
      label: `${t('language')}: ${currentLanguageInfo.nativeName}`,
      icon: 'globe-outline',
      color: '#34d399',
      badge: `${currentLanguageInfo.flag} Change`,
      action: () => {
        onClose();
        onOpenLanguage();
      },
    },

    {
      id: 'home',
      label: t('home'),
      icon: 'home-outline',
      color: '#6ee7b7',
      action: () => navigateTo('/'),
    },
    {
      id: 'prayer',
      label: t('prayers'),
      icon: 'time-outline',
      color: '#f59e0b',
      action: () => navigateTo('/prayer'),
    },
    {
      id: 'adhan',
      label: t('adhanVoice'),
      icon: 'volume-high-outline',
      color: '#f59e0b',
      badge: 'Audio',
      action: () => {
        onClose();
        onOpenAdhan();
      },
    },
    {
      id: 'quran',
      label: t('quran'),
      icon: 'book-outline',
      color: '#34d399',
      badge: '114 Surahs',
      action: () => navigateTo('/quran'),
    },
    {
      id: 'ziyarat',
      label: t('ziyarat'),
      icon: 'business-outline',
      color: '#f59e0b',
      badge: '35+ Sanctuaries',
      action: () => navigateTo('/ziyarat'),
    },
    {
      id: 'duas',
      label: t('duas'),
      icon: 'heart-outline',
      color: '#6ee7b7',
      badge: 'Hisn al-Muslim',
      action: () => navigateTo('/duas'),
    },
    {
      id: 'media',
      label: t('media'),
      icon: 'images-outline',
      color: '#38bdf8',
      badge: '4K',
      action: () => navigateTo('/media'),
    },
    {
      id: 'calendar',
      label: t('calendar'),
      icon: 'calendar-outline',
      color: '#a78bfa',
      badge: '1448 AH',
      action: () => navigateTo('/calendar'),
    },
    {
      id: 'dashboard',
      label: t('dashboard'),
      icon: 'analytics-outline',
      color: '#34d399',
      badge: 'Tracker',
      action: () => navigateTo('/dashboard'),
    },
    {
      id: 'names',
      label: t('namesOfAllah'),
      icon: 'sparkles-outline',
      color: '#fbbf24',
      action: () => navigateTo('/names-of-allah'),
    },
    {
      id: 'guides',
      label: 'Prayer & Purification Guides',
      icon: 'shield-checkmark-outline',
      color: '#34d399',
      badge: 'Wudu & Salah',
      action: () => navigateTo('/guides'),
    },
    {
      id: 'hajj',
      label: 'Hajj & Umrah Field Guide',
      icon: 'navigate-outline',
      color: '#f59e0b',
      badge: 'Packing List',
      action: () => navigateTo('/hajj-umrah'),
    },
    {
      id: 'zakat',
      label: 'Zakat & Sadaqah Hub',
      icon: 'cash-outline',
      color: '#fbbf24',
      badge: '2.5% Calc',
      action: () => navigateTo('/zakat'),
    },
    {
      id: 'kids',
      label: 'NOOR Kids & Arabic Letters',
      icon: 'happy-outline',
      color: '#38bdf8',
      badge: 'Ages 4-12',
      action: () => navigateTo('/kids'),
    },
    {
      id: 'janazah',
      label: 'Janazah & Bereavement Guide',
      icon: 'leaf-outline',
      color: '#a78bfa',
      badge: '4 Takbeers',
      action: () => navigateTo('/janazah'),
    },
    {
      id: 'travel',
      label: 'NOOR Travel Mode',
      icon: 'airplane-outline',
      color: '#38bdf8',
      badge: 'Safar & Qasr',
      action: () => navigateTo('/travel'),
    },
    {
      id: 'giving',
      label: t('giving'),
      icon: 'gift-outline',
      color: '#6ee7b7',
      action: () => navigateTo('/giving'),
    },
    {
      id: 'qibla',
      label: t('qibla'),
      icon: 'compass-outline',
      color: '#f59e0b',
      action: () => {
        onClose();
        onOpenQibla();
      },
    },
    {
      id: 'location',
      label: t('selectLocation'),
      icon: 'location-outline',
      color: '#6ee7b7',
      action: () => {
        onClose();
        onOpenLocation();
      },
    },
    {
      id: 'contact',
      label: t('contact') || 'Contact & Support',
      icon: 'mail-outline',
      color: '#34d399',
      badge: 'salam@nooreilahi.com',
      action: () => navigateTo('/contact'),
    },
  ];

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <SafeAreaView style={styles.container}>
        {/* Top Header with Website Logo */}
        <View style={styles.header}>
          <MuslimLogo size={42} showText />
          <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
            <Ionicons name="close" size={22} color="#ffffff" />
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* User Auth Banner */}
          <TouchableOpacity
            style={styles.authBanner}
            onPress={() => {
              onClose();
              onOpenAuth();
            }}
            activeOpacity={0.88}
          >
            {currentUser?.isLoggedIn ? (
              <View style={styles.userRow}>
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>{currentUser.name.charAt(0).toUpperCase()}</Text>
                </View>
                <View style={styles.userInfo}>
                  <Text style={styles.userName}>{currentUser.name}</Text>
                  <Text style={styles.userEmail}>{currentUser.email}</Text>
                  <Text style={styles.userStreak}>🔥 {currentUser.streakDays || 14}-Day Prayer Streak</Text>
                </View>
                <Ionicons name="chevron-forward" size={18} color="#6ee7b7" />
              </View>
            ) : (
              <View style={styles.loginPromptRow}>
                <View style={styles.loginIconBox}>
                  <Ionicons name="person" size={20} color="#031712" />
                </View>
                <View style={styles.loginPromptText}>
                  <Text style={styles.loginTitle}>{t('login')}</Text>
                  <Text style={styles.loginSub}>{t('continueGoogle')}</Text>
                </View>
                <View style={styles.loginActionPill}>
                  <Text style={styles.loginActionText}>{t('login')}</Text>
                </View>
              </View>
            )}
          </TouchableOpacity>

          {/* Navigation Section */}
          <Text style={styles.sectionHeader}>{t('explore').toUpperCase()}</Text>
          <View style={styles.menuList}>
            {MENU_ITEMS.map(item => (
              <TouchableOpacity
                key={item.id}
                style={styles.menuItem}
                onPress={item.action}
                activeOpacity={0.7}
              >
                <View style={[styles.menuIconBox, { backgroundColor: `${item.color}15`, borderColor: `${item.color}30` }]}>
                  <Ionicons name={item.icon as any} size={20} color={item.color} />
                </View>
                <View style={styles.menuTextBox}>
                  <Text style={styles.menuLabel}>{item.label}</Text>
                  {item.badge && (
                    <Text style={[styles.menuBadge, { color: item.color }]}>{item.badge}</Text>
                  )}
                </View>
                <Ionicons name="chevron-forward" size={16} color="rgba(255,255,255,0.2)" />
              </TouchableOpacity>
            ))}
          </View>

          {/* Footer Branding */}
          <View style={styles.footer}>
            <Text style={styles.footerBrand}>NOOR-E-ILAHI • نُورِ اِلٰہی</Text>
            <Text style={styles.footerTagline}>Global Classical Islamic Companion • v1.0.0 (SDK 57)</Text>
          </View>
        </ScrollView>

        {/* Rating Prompt Modal */}
        <Modal
          visible={showRatingModal}
          transparent
          animationType="fade"
          onRequestClose={() => {
            setShowRatingModal(false);
            setRatingSubmitted(false);
          }}
        >
          <View style={styles.ratingBackdrop}>
            <View style={styles.ratingCard}>
              <View style={styles.ratingTopIcon}>
                <Ionicons name="star" size={32} color="#f59e0b" />
              </View>

              <Text style={styles.ratingTitle}>Rate Noor-e-ilahi</Text>
              <Text style={styles.ratingArabic}>جَزَاكَ ٱللَّٰهُ خَيْرًا</Text>
              <Text style={styles.ratingDesc}>
                Your review helps Muslims worldwide discover 100% verified prayer calculations, Quran recitations, and authentic duas.
              </Text>

              {/* Star selector */}
              <View style={styles.starsRow}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <TouchableOpacity
                    key={star}
                    onPress={() => setUserRating(star)}
                    activeOpacity={0.7}
                    style={styles.starTouch}
                  >
                    <Ionicons
                      name={star <= userRating ? 'star' : 'star-outline'}
                      size={32}
                      color="#f59e0b"
                    />
                  </TouchableOpacity>
                ))}
              </View>

              {ratingSubmitted && (
                <View style={styles.thankYouBox}>
                  <Text style={styles.thankYouText}>
                    ✨ JazakAllah Khair for your {userRating}-star support!
                  </Text>
                </View>
              )}

              {/* Store Buttons */}
              <View style={styles.storeButtonsCol}>
                <TouchableOpacity
                  style={styles.appleStoreBtn}
                  onPress={openAppStore}
                  activeOpacity={0.85}
                >
                  <Ionicons name="logo-apple" size={22} color="#ffffff" />
                  <View style={{ marginLeft: 10 }}>
                    <Text style={styles.storeBtnSub}>Download on the</Text>
                    <Text style={styles.storeBtnMain}>Apple App Store</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.googlePlayBtn}
                  onPress={openPlayStore}
                  activeOpacity={0.85}
                >
                  <Ionicons name="logo-google-playstore" size={20} color="#ffffff" />
                  <View style={{ marginLeft: 10 }}>
                    <Text style={styles.storeBtnSub}>Get it on</Text>
                    <Text style={styles.storeBtnMain}>Google Play Store</Text>
                  </View>
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={styles.ratingCloseBtn}
                onPress={() => {
                  setShowRatingModal(false);
                  setRatingSubmitted(false);
                }}
              >
                <Text style={styles.ratingCloseText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#02120d',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.08)',
  },
  closeBtn: {
    padding: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 14,
  },
  scrollContent: {
    padding: 16,
  },
  authBanner: {
    backgroundColor: '#031c15',
    borderRadius: 20,
    padding: 14,
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.35)',
    marginBottom: 20,
    shadowColor: '#f59e0b',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#f59e0b',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#031712',
    fontSize: 18,
    fontWeight: '900',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '800',
  },
  userEmail: {
    color: 'rgba(110, 231, 183, 0.7)',
    fontSize: 11,
    marginTop: 1,
  },
  userStreak: {
    color: '#fde68a',
    fontSize: 10,
    fontWeight: '700',
    marginTop: 3,
  },
  loginPromptRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  loginIconBox: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: '#f59e0b',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginPromptText: {
    flex: 1,
  },
  loginTitle: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '800',
  },
  loginSub: {
    color: 'rgba(110, 231, 183, 0.7)',
    fontSize: 10,
    marginTop: 2,
  },
  loginActionPill: {
    backgroundColor: '#f59e0b',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
  },
  loginActionText: {
    color: '#031712',
    fontSize: 11,
    fontWeight: '900',
  },
  sectionHeader: {
    color: 'rgba(255, 255, 255, 0.4)',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
    marginBottom: 8,
    marginLeft: 4,
  },
  menuList: {
    backgroundColor: '#031a14',
    borderRadius: 22,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.06)',
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 13,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.04)',
    gap: 12,
  },
  menuIconBox: {
    width: 36,
    height: 36,
    borderRadius: 11,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuTextBox: {
    flex: 1,
  },
  menuLabel: {
    color: '#ffffff',
    fontSize: 13.5,
    fontWeight: '700',
  },
  menuBadge: {
    fontSize: 10,
    fontWeight: '600',
    marginTop: 2,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 24,
    gap: 4,
  },
  footerBrand: {
    color: '#f59e0b',
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 1,
  },
  footerTagline: {
    color: 'rgba(255, 255, 255, 0.35)',
    fontSize: 9.5,
  },
  ratingBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  ratingCard: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: '#04231b',
    borderRadius: 24,
    borderWidth: 1.5,
    borderColor: 'rgba(245, 158, 11, 0.35)',
    padding: 24,
    alignItems: 'center',
    shadowColor: '#f59e0b',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 12,
  },
  ratingTopIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(245, 158, 11, 0.15)',
    borderWidth: 1.5,
    borderColor: 'rgba(245, 158, 11, 0.4)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  ratingTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: '#ffffff',
    textAlign: 'center',
  },
  ratingArabic: {
    fontSize: 13,
    fontWeight: '700',
    color: '#fde68a',
    marginTop: 4,
    letterSpacing: 0.5,
  },
  ratingDesc: {
    fontSize: 12,
    color: '#a7f3d0',
    textAlign: 'center',
    marginTop: 10,
    lineHeight: 18,
  },
  starsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginVertical: 18,
  },
  starTouch: {
    padding: 4,
  },
  thankYouBox: {
    backgroundColor: 'rgba(52, 211, 153, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(52, 211, 153, 0.4)',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 8,
    marginBottom: 16,
  },
  thankYouText: {
    color: '#6ee7b7',
    fontSize: 12,
    fontWeight: '700',
    textAlign: 'center',
  },
  storeButtonsCol: {
    width: '100%',
    gap: 10,
    marginBottom: 14,
  },
  appleStoreBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000000',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)',
    borderRadius: 14,
    paddingVertical: 11,
    paddingHorizontal: 16,
  },
  googlePlayBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#01382b',
    borderWidth: 1,
    borderColor: 'rgba(52, 211, 153, 0.4)',
    borderRadius: 14,
    paddingVertical: 11,
    paddingHorizontal: 16,
  },
  storeBtnSub: {
    fontSize: 9,
    color: 'rgba(255, 255, 255, 0.7)',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  storeBtnMain: {
    fontSize: 13,
    fontWeight: '800',
    color: '#ffffff',
  },
  ratingCloseBtn: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  ratingCloseText: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 12,
    fontWeight: '600',
  },
});
