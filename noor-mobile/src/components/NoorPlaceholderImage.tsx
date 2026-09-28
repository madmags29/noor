// ============================================================
// NOOR Mobile — Official Noor-e-Ilahi Sanctuary Placeholder
// Displayed when authentic sanctuary photographs are not available
// ============================================================

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle, Path, Polygon, Defs, LinearGradient, Stop } from 'react-native-svg';
import { THEME } from '../theme';

interface NoorPlaceholderImageProps {
  title?: string;
  type?: 'mosque' | 'dargah' | 'holy_site';
  height?: number;
}

export const NoorPlaceholderImage: React.FC<NoorPlaceholderImageProps> = ({
  title,
  type = 'dargah',
  height = 180
}) => {
  const iconEmoji = type === 'mosque' ? '🕌' : type === 'holy_site' ? '🕋' : '🏛️';
  const typeLabel =
    type === 'mosque'
      ? 'Historic Mosque'
      : type === 'holy_site'
      ? 'Holy Sanctuary'
      : 'Sacred Dargah & Ziyarat';

  return (
    <View style={[styles.container, { height }]}>
      {/* Decorative Aura */}
      <View style={styles.glow} />

      {/* Emblem SVG */}
      <View style={styles.emblemBox}>
        <Svg width={48} height={48} viewBox="0 0 64 64">
          <Defs>
            <LinearGradient id="goldGrad" x1="0" y1="0" x2="64" y2="64">
              <Stop offset="0" stopColor="#f59e0b" />
              <Stop offset="1" stopColor="#fbbf24" />
            </LinearGradient>
          </Defs>
          <Circle cx="32" cy="32" r="30" stroke="url(#goldGrad)" strokeWidth="1.5" strokeOpacity="0.4" fill="none" />
          <Path d="M42 20 A 18 18 0 1 0 42 44 A 14 14 0 1 1 42 20 Z" fill="url(#goldGrad)" />
          <Polygon points="36,18 38,23 43,23 39,26 41,31 36,28 32,31 34,26 30,23 35,23" fill="#ffffff" />
        </Svg>
      </View>

      <Text style={styles.badgeText}>{typeLabel.toUpperCase()}</Text>

      {title ? (
        <Text style={styles.titleText} numberOfLines={1}>
          {title}
        </Text>
      ) : null}

      <Text style={styles.brandText}>NOOR-E-ILAHI • نُورِ اِلٰہی</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#021711',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.2)',
    paddingHorizontal: 16
  },
  glow: {
    position: 'absolute',
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: 'rgba(245, 158, 11, 0.08)'
  },
  emblemBox: {
    marginBottom: 8,
    alignItems: 'center',
    justifyContent: 'center'
  },
  badgeText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#34d399',
    letterSpacing: 2,
    marginBottom: 4
  },
  titleText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#fef3c7',
    textAlign: 'center',
    marginBottom: 4
  },
  brandText: {
    fontSize: 9,
    fontFamily: 'System',
    color: 'rgba(251, 191, 36, 0.7)',
    letterSpacing: 1.5
  }
});
