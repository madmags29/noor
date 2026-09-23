import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { THEME } from '../theme';
import {
  useLanguage,
  SUPPORTED_LANGUAGES,
  SupportedLanguage,
} from '../context/LanguageContext';

interface LanguageModalProps {
  visible: boolean;
  onClose: () => void;
}

export const LanguageModal: React.FC<LanguageModalProps> = ({ visible, onClose }) => {
  const { t, language, setLanguage, currentLanguageInfo, detectedLocation } = useLanguage();

  const handleSelect = async (code: SupportedLanguage) => {
    try {
      await Haptics.selectionAsync();
    } catch {}
    await setLanguage(code);
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.backdrop}>
        <SafeAreaView edges={['bottom']} style={styles.sheetContainer}>
          {/* Header */}
          <View style={styles.header}>
            <View>
              <Text style={styles.title}>{t('selectLanguage')} • {currentLanguageInfo.nativeName}</Text>
              <Text style={styles.subtitle}>{t('autoDetectedNotice')}</Text>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <Ionicons name="close" size={20} color={THEME.colors.textMuted} />
            </TouchableOpacity>
          </View>

          {/* Auto-detected status pill */}
          {detectedLocation && (
            <View style={styles.detectedBanner}>
              <Ionicons name="location" size={14} color={THEME.colors.goldLight} />
              <Text style={styles.detectedText}>
                Detected: <Text style={styles.detectedBold}>{detectedLocation.region || detectedLocation.country}</Text> • Auto-set: <Text style={styles.detectedBold}>{currentLanguageInfo.nativeName}</Text>
              </Text>
            </View>
          )}

          <ScrollView style={styles.scrollArea} showsVerticalScrollIndicator={false}>
            {/* 1. India & Core Languages */}
            <Text style={styles.sectionHeader}>INDIA & CORE LANGUAGES</Text>
            {SUPPORTED_LANGUAGES.slice(0, 4).map((item) => {
              const isSelected = language === item.code;
              return (
                <TouchableOpacity
                  key={item.code}
                  style={[styles.langRow, isSelected && styles.langRowActive]}
                  onPress={() => handleSelect(item.code)}
                >
                  <Text style={styles.flag}>{item.flag}</Text>
                  <View style={styles.langInfo}>
                    <Text style={[styles.nativeName, isSelected && styles.activeText]}>
                      {item.nativeName}
                    </Text>
                    <Text style={styles.nameSub}>
                      {item.name} • {item.region}
                    </Text>
                  </View>
                  {isSelected && (
                    <Ionicons name="checkmark-circle" size={20} color={THEME.colors.goldLight} />
                  )}
                </TouchableOpacity>
              );
            })}

            {/* 2. Indian State Languages */}
            <Text style={styles.sectionHeader}>INDIAN STATE LANGUAGES</Text>
            {SUPPORTED_LANGUAGES.slice(4, 9).map((item) => {
              const isSelected = language === item.code;
              return (
                <TouchableOpacity
                  key={item.code}
                  style={[styles.langRow, isSelected && styles.langRowActive]}
                  onPress={() => handleSelect(item.code)}
                >
                  <Text style={styles.flag}>{item.flag}</Text>
                  <View style={styles.langInfo}>
                    <Text style={[styles.nativeName, isSelected && styles.activeText]}>
                      {item.nativeName}
                    </Text>
                    <Text style={styles.nameSub}>
                      {item.name} • {item.region}
                    </Text>
                  </View>
                  {isSelected && (
                    <Ionicons name="checkmark-circle" size={20} color={THEME.colors.goldLight} />
                  )}
                </TouchableOpacity>
              );
            })}

            {/* 3. Global Languages */}
            <Text style={styles.sectionHeader}>GLOBAL LANGUAGES</Text>
            {SUPPORTED_LANGUAGES.slice(9).map((item) => {
              const isSelected = language === item.code;
              return (
                <TouchableOpacity
                  key={item.code}
                  style={[styles.langRow, isSelected && styles.langRowActive]}
                  onPress={() => handleSelect(item.code)}
                >
                  <Text style={styles.flag}>{item.flag}</Text>
                  <View style={styles.langInfo}>
                    <Text style={[styles.nativeName, isSelected && styles.activeText]}>
                      {item.nativeName}
                    </Text>
                    <Text style={styles.nameSub}>
                      {item.name} • {item.region}
                    </Text>
                  </View>
                  {isSelected && (
                    <Ionicons name="checkmark-circle" size={20} color={THEME.colors.goldLight} />
                  )}
                </TouchableOpacity>
              );
            })}
            <View style={{ height: 24 }} />
          </ScrollView>
        </SafeAreaView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    justifyContent: 'flex-end',
  },
  sheetContainer: {
    backgroundColor: '#031712',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    borderTopWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.25)',
    maxHeight: '85%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.08)',
  },
  title: {
    fontSize: 16,
    fontWeight: '800',
    color: THEME.colors.textWhite,
  },
  subtitle: {
    fontSize: 11,
    color: THEME.colors.emeraldSubtle,
    marginTop: 2,
  },
  closeBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  detectedBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginHorizontal: 16,
    marginTop: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 14,
    backgroundColor: 'rgba(245, 158, 11, 0.12)',
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.3)',
  },
  detectedText: {
    fontSize: 11,
    color: THEME.colors.textWhite,
  },
  detectedBold: {
    fontWeight: '800',
    color: THEME.colors.goldLight,
  },
  scrollArea: {
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  sectionHeader: {
    fontSize: 10,
    fontWeight: '800',
    color: THEME.colors.goldLight,
    letterSpacing: 1,
    marginTop: 16,
    marginBottom: 8,
    paddingHorizontal: 4,
  },
  langRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    marginBottom: 6,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  langRowActive: {
    backgroundColor: 'rgba(245, 158, 11, 0.15)',
    borderColor: 'rgba(245, 158, 11, 0.4)',
  },
  flag: {
    fontSize: 22,
    marginRight: 12,
  },
  langInfo: {
    flex: 1,
  },
  nativeName: {
    fontSize: 14,
    fontWeight: '700',
    color: THEME.colors.textWhite,
  },
  nameSub: {
    fontSize: 11,
    color: THEME.colors.emeraldSubtle,
    marginTop: 2,
  },
  activeText: {
    color: THEME.colors.goldLight,
  },
});
