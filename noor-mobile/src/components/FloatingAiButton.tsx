import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { THEME } from '../theme';

interface FloatingAiButtonProps {
  onPress: () => void;
}

export const FloatingAiButton: React.FC<FloatingAiButtonProps> = ({ onPress }) => {
  return (
    <TouchableOpacity
      style={styles.floatingButton}
      onPress={onPress}
      activeOpacity={0.85}
      accessibilityLabel="Ask NOOR Islamic AI"
    >
      <View style={styles.iconBox}>
        <MaterialCommunityIcons name="creation" size={18} color={THEME.colors.goldPrimary} />
      </View>
      <Text style={styles.btnText}>Ask AI</Text>
      <View style={styles.indicatorDot} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  floatingButton: {
    position: 'absolute',
    bottom: 14,
    right: 14,
    zIndex: 999,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    backgroundColor: THEME.colors.goldPrimary,
    paddingVertical: 9,
    paddingHorizontal: 14,
    borderRadius: 30,
    shadowColor: '#f59e0b',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 8,
    borderWidth: 1.5,
    borderColor: '#ffffff',
  },
  iconBox: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: THEME.colors.bgDarkest,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    color: THEME.colors.textDark,
    fontSize: 13,
    fontWeight: '900',
    letterSpacing: 0.4,
  },
  indicatorDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#064e3b',
  },
});
