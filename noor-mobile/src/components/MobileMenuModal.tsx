import React from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { MuslimLogo } from './MuslimLogo';
import { MobileUser } from './AuthModal';
import { THEME } from '../theme';
import { useLanguage } from '../context/LanguageContext';
import { useSplash } from '../context/SplashContext';

interface MobileMenuModalProps {
  visible: boolean;
  onClose: () => void;
  currentUser: MobileUser | null;
  onOpenAuth: () => void;
  onOpenAdhan: () => void;
  onOpenQibla: () => void;
  onOpenLocation: () => void;
  onOpenLanguage: () => void;
}

export const MobileMenuModal: React.FC<MobileMenuModalProps> = ({
  visible,
  onClose,
  currentUser,
  onOpenAuth,
  onOpenAdhan,
  onOpenQibla,
  onOpenLocation,
  onOpenLanguage,
}) => {
  const router = useRouter();
  const { t, currentLanguageInfo } = useLanguage();
  const { replaySplash } = useSplash();

  const navigateTo = (route: string) => {
    onClose();
    router.push(route as any);
  };

  const MENU_ITEMS = [
    {
      id: 'splash',
      label: 'Animated Splash Screen',
      icon: 'sparkles-outline',
      color: '#f59e0b',
      badge: 'Cinema',
      action: () => {
        onClose();
        replaySplash();
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
});
