import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Path } from 'react-native-svg';
import { THEME } from '../theme';
import { useLanguage } from '../context/LanguageContext';

export interface MobileUser {
  name: string;
  email: string;
  avatar?: string;
  isLoggedIn: boolean;
  streakDays?: number;
}

interface AuthModalProps {
  visible: boolean;
  onClose: () => void;
  onLoginSuccess: (user: MobileUser) => void;
  currentUser: MobileUser | null;
  onLogout: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  visible,
  onClose,
  onLoginSuccess,
  currentUser,
  onLogout,
}) => {
  const { t } = useLanguage();
  const [tab, setTab] = useState<'signin' | 'signup'>('signin');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleEmailSubmit = () => {
    if (!email || !password) {
      setError('Please fill in all required fields.');
      return;
    }
    setLoading(true);
    setError('');

    setTimeout(() => {
      setLoading(false);
      const displayName = tab === 'signup' ? (name || 'Noor Pilgrim') : email.split('@')[0];
      onLoginSuccess({
        name: displayName,
        email,
        isLoggedIn: true,
        streakDays: 14,
      });
      onClose();
    }, 600);
  };

  const handleGoogleSignIn = () => {
    setLoading(true);
    setError('');
    setTimeout(() => {
      setLoading(false);
      onLoginSuccess({
        name: 'Zubair Ahmad',
        email: 'zubair.ahmad@gmail.com',
        isLoggedIn: true,
        streakDays: 21,
      });
      onClose();
    }, 800);
  };

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.backdrop}
      >
        <SafeAreaView style={styles.safeContainer}>
          <View style={styles.modalCard}>
            {/* Close Button */}
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <Ionicons name="close" size={22} color="#6ee7b7" />
            </TouchableOpacity>

            {currentUser?.isLoggedIn ? (
              // Logged in Profile Sheet
              <View style={styles.profileBox}>
                <View style={styles.avatarCircle}>
                  <Text style={styles.avatarInitial}>{currentUser.name.charAt(0).toUpperCase()}</Text>
                </View>
                <Text style={styles.profileName}>{currentUser.name}</Text>
                <Text style={styles.profileEmail}>{currentUser.email}</Text>

                <View style={styles.statsCard}>
                  <View style={styles.statItem}>
                    <Text style={styles.statNumber}>{currentUser.streakDays || 14}</Text>
                    <Text style={styles.statLabel}>Day Streak 🔥</Text>
                  </View>
                  <View style={styles.statDivider} />
                  <View style={styles.statItem}>
                    <Text style={styles.statNumber}>100%</Text>
                    <Text style={styles.statLabel}>Cloud Synced ☁️</Text>
                  </View>
                </View>

                <TouchableOpacity
                  style={styles.logoutBtn}
                  onPress={() => {
                    onLogout();
                    onClose();
                  }}
                >
                  <Ionicons name="log-out-outline" size={18} color="#ef4444" />
                  <Text style={styles.logoutBtnText}>{t('signOut') || 'Sign Out'}</Text>
                </TouchableOpacity>
              </View>
            ) : (
              // Login / Sign Up Form
              <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 10 }}>
                {/* Header Icon & Titles */}
                <View style={styles.header}>
                  <View style={styles.iconCircle}>
                    <Ionicons name="person" size={24} color="#031712" />
                  </View>
                  <Text style={styles.title}>
                    {tab === 'signin' ? (t('login') || 'Sign In') : (t('signup') || 'Create Account')}
                  </Text>
                  <Text style={styles.subtitle}>
                    Sync prayer progress, favorite Ziyarat sanctuaries, and personal Quranic bookmarks across devices
                  </Text>
                </View>

                {/* Tab Switcher */}
                <View style={styles.tabRow}>
                  <TouchableOpacity
                    style={[styles.tabBtn, tab === 'signin' && styles.tabBtnActive]}
                    onPress={() => { setTab('signin'); setError(''); }}
                  >
                    <Text style={[styles.tabBtnText, tab === 'signin' && styles.tabBtnTextActive]}>
                      {t('login') || 'Sign In'}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.tabBtn, tab === 'signup' && styles.tabBtnActive]}
                    onPress={() => { setTab('signup'); setError(''); }}
                  >
                    <Text style={[styles.tabBtnText, tab === 'signup' && styles.tabBtnTextActive]}>
                      {t('signup') || 'Create Account'}
                    </Text>
                  </TouchableOpacity>
                </View>

                {/* Continue with Google Button */}
                <TouchableOpacity
                  style={styles.googleBtn}
                  onPress={handleGoogleSignIn}
                  disabled={loading}
                  activeOpacity={0.85}
                >
                  {/* Official Multi-colored Google SVG Icon */}
                  <Svg width={20} height={20} viewBox="0 0 48 48">
                    <Path
                      fill="#EA4335"
                      d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                    />
                    <Path
                      fill="#4285F4"
                      d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                    />
                    <Path
                      fill="#FBBC05"
                      d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                    />
                    <Path
                      fill="#34A853"
                      d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                    />
                  </Svg>
                  <Text style={styles.googleBtnText}>Continue with Google</Text>
                </TouchableOpacity>

                {/* Divider */}
                <View style={styles.dividerRow}>
                  <View style={styles.dividerLine} />
                  <Text style={styles.dividerText}>or continue with email</Text>
                  <View style={styles.dividerLine} />
                </View>

                {/* Error Message */}
                {!!error && (
                  <View style={styles.errorBox}>
                    <Ionicons name="alert-circle" size={14} color="#ef4444" />
                    <Text style={styles.errorText}>{error}</Text>
                  </View>
                )}

                {/* Input Fields */}
                {tab === 'signup' && (
                  <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Full Name</Text>
                    <View style={styles.inputWrapper}>
                      <Ionicons name="person-outline" size={16} color="#6ee7b7" />
                      <TextInput
                        style={styles.input}
                        placeholder="e.g. Tariq ibn Ziyad"
                        placeholderTextColor="rgba(255,255,255,0.3)"
                        value={name}
                        onChangeText={setName}
                        autoCapitalize="words"
                      />
                    </View>
                  </View>
                )}

                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Email Address</Text>
                  <View style={styles.inputWrapper}>
                    <Ionicons name="mail-outline" size={16} color="#6ee7b7" />
                    <TextInput
                      style={styles.input}
                      placeholder="pilgrim@noor.app"
                      placeholderTextColor="rgba(255,255,255,0.3)"
                      value={email}
                      onChangeText={setEmail}
                      keyboardType="email-address"
                      autoCapitalize="none"
                    />
                  </View>
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Password</Text>
                  <View style={styles.inputWrapper}>
                    <Ionicons name="lock-closed-outline" size={16} color="#6ee7b7" />
                    <TextInput
                      style={styles.input}
                      placeholder="••••••••"
                      placeholderTextColor="rgba(255,255,255,0.3)"
                      value={password}
                      onChangeText={setPassword}
                      secureTextEntry
                    />
                  </View>
                </View>

                {/* Submit Button */}
                <TouchableOpacity
                  style={styles.submitBtn}
                  onPress={handleEmailSubmit}
                  disabled={loading}
                >
                  {loading ? (
                    <ActivityIndicator color="#031712" />
                  ) : (
                    <Text style={styles.submitBtnText}>
                      {tab === 'signin' ? (t('login') || 'Sign In') : (t('signup') || 'Create Account')}
                    </Text>
                  )}
                </TouchableOpacity>
              </ScrollView>
            )}
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  safeContainer: {
    width: '100%',
    paddingHorizontal: 20,
  },
  modalCard: {
    backgroundColor: '#031c15',
    borderRadius: 28,
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.35)',
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.6,
    shadowRadius: 20,
    elevation: 10,
    position: 'relative',
    maxHeight: '90%',
  },
  closeBtn: {
    position: 'absolute',
    top: 18,
    right: 18,
    zIndex: 10,
    padding: 6,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 12,
  },
  header: {
    alignItems: 'center',
    marginBottom: 16,
    marginTop: 4,
  },
  iconCircle: {
    width: 46,
    height: 46,
    borderRadius: 16,
    backgroundColor: '#f59e0b',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    shadowColor: '#f59e0b',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  title: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '800',
    textAlign: 'center',
  },
  subtitle: {
    color: 'rgba(110, 231, 183, 0.7)',
    fontSize: 11,
    textAlign: 'center',
    marginTop: 4,
    lineHeight: 16,
    paddingHorizontal: 12,
  },
  tabRow: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderRadius: 14,
    padding: 3,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  tabBtn: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 11,
    alignItems: 'center',
  },
  tabBtnActive: {
    backgroundColor: '#f59e0b',
  },
  tabBtnText: {
    color: 'rgba(110, 231, 183, 0.7)',
    fontSize: 12,
    fontWeight: '700',
  },
  tabBtnTextActive: {
    color: '#031712',
    fontWeight: '900',
  },
  googleBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    paddingVertical: 12,
    borderRadius: 14,
    gap: 10,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  googleBtnText: {
    color: '#1f2937',
    fontSize: 13,
    fontWeight: '800',
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 12,
    gap: 8,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  dividerText: {
    color: 'rgba(255, 255, 255, 0.4)',
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  errorBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(239, 68, 68, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.3)',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 6,
    marginBottom: 10,
  },
  errorText: {
    color: '#fca5a5',
    fontSize: 11,
  },
  inputGroup: {
    marginBottom: 12,
  },
  inputLabel: {
    color: '#6ee7b7',
    fontSize: 11,
    fontWeight: '700',
    marginBottom: 5,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 44,
    gap: 10,
  },
  input: {
    flex: 1,
    color: '#ffffff',
    fontSize: 13,
  },
  submitBtn: {
    backgroundColor: '#f59e0b',
    paddingVertical: 13,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 6,
    shadowColor: '#f59e0b',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  submitBtnText: {
    color: '#031712',
    fontSize: 13,
    fontWeight: '900',
  },
  profileBox: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  avatarCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#f59e0b',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  avatarInitial: {
    color: '#031712',
    fontSize: 26,
    fontWeight: '900',
  },
  profileName: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '800',
  },
  profileEmail: {
    color: 'rgba(110, 231, 183, 0.7)',
    fontSize: 12,
    marginTop: 2,
  },
  statsCard: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 14,
    padding: 14,
    marginVertical: 16,
    width: '100%',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    color: '#fde68a',
    fontSize: 18,
    fontWeight: '900',
  },
  statLabel: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 10,
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: 'rgba(239, 68, 68, 0.12)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.3)',
  },
  logoutBtnText: {
    color: '#ef4444',
    fontSize: 13,
    fontWeight: '700',
  },
});
