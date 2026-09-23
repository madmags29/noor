import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, {
  Defs,
  LinearGradient,
  RadialGradient,
  Stop,
  Rect,
  Circle,
  Path,
  G,
} from 'react-native-svg';

interface MuslimLogoProps {
  size?: number;
  showText?: boolean;
}

export const MuslimLogo: React.FC<MuslimLogoProps> = ({
  size = 40,
  showText = false,
}) => {
  return (
    <View style={styles.container}>
      {/* Sacred Islamic Emblem SVG */}
      <View style={[styles.emblemContainer, { width: size, height: size }]}>
        <Svg viewBox="0 0 64 64" width={size} height={size}>
          <Defs>
            {/* Liquid Gold Shimmer Gradient */}
            <LinearGradient id="crescentGold" x1="8" y1="8" x2="56" y2="56">
              <Stop offset="0%" stopColor="#FDE68A" />
              <Stop offset="35%" stopColor="#F59E0B" />
              <Stop offset="70%" stopColor="#D97706" />
              <Stop offset="100%" stopColor="#B45309" />
            </LinearGradient>

            {/* Sacred Emerald Jewel Gradient */}
            <LinearGradient id="emeraldBase" x1="0" y1="0" x2="64" y2="64">
              <Stop offset="0%" stopColor="#059669" />
              <Stop offset="50%" stopColor="#064e3b" />
              <Stop offset="100%" stopColor="#022c22" />
            </LinearGradient>

            {/* Radiant Star Core Gradient */}
            <RadialGradient id="starShine" cx="50%" cy="50%" r="50%">
              <Stop offset="0%" stopColor="#FFFFFF" />
              <Stop offset="45%" stopColor="#FDE68A" />
              <Stop offset="80%" stopColor="#F59E0B" />
              <Stop offset="100%" stopColor="#D97706" />
            </RadialGradient>

            {/* Celestial Orbit Ring Gradient */}
            <LinearGradient id="orbitStroke" x1="0" y1="0" x2="64" y2="64">
              <Stop offset="0%" stopColor="#FDE68A" stopOpacity="0.8" />
              <Stop offset="50%" stopColor="#34D399" stopOpacity="0.4" />
              <Stop offset="100%" stopColor="#F59E0B" stopOpacity="0.8" />
            </LinearGradient>
          </Defs>

          {/* 1. Outer Protective Rounded Base with Sacred Emerald Fill */}
          <Rect
            x="2"
            y="2"
            width="60"
            height="60"
            rx="18"
            fill="url(#emeraldBase)"
            stroke="rgba(255, 255, 255, 0.25)"
            strokeWidth="1.2"
          />

          {/* 2. Celestial Astrolabe / Orbit Ring with Dashes */}
          <Circle
            cx="32"
            cy="32"
            r="26"
            stroke="url(#orbitStroke)"
            strokeWidth="1.2"
            strokeDasharray="4, 5"
            fill="none"
          />

          {/* 3. Orbiting Light Spark (Divine Light / Noor) */}
          <Circle cx="32" cy="6" r="2.2" fill="#FEF3C7" />

          {/* 4. Authentic Sacred Crescent Moon (Hilal) */}
          <Path
            d="M 34.61 15.8 A 17.5 17.5 0 1 0 34.61 48.2 A 16.5 16.5 0 0 1 34.61 15.8 Z"
            fill="url(#crescentGold)"
          />

          {/* Inner Crescent Highlight */}
          <Path
            d="M 30 18 A 16 16 0 0 0 13 32 A 16 16 0 0 0 30 46 A 15.5 15.5 0 0 1 14.5 32 A 15.5 15.5 0 0 1 30 18 Z"
            fill="#FFFFFF"
            opacity="0.25"
          />

          {/* 5. Islamic Eight-Pointed Star (Rub el Hizb ۞) Nested in Crescent Cradle */}
          <G transform="translate(35, 32)">
            {/* Square 1 */}
            <Rect
              x="-4.5"
              y="-4.5"
              width="9"
              height="9"
              rx="1"
              fill="url(#starShine)"
            />
            {/* Square 2 (Rotated 45 degrees) */}
            <Rect
              x="-4.5"
              y="-4.5"
              width="9"
              height="9"
              rx="1"
              transform="rotate(45)"
              fill="url(#starShine)"
              opacity="0.95"
            />
            {/* Star Radiant Core Center */}
            <Circle cx="0" cy="0" r="1.5" fill="#FFFFFF" />
            <Circle cx="0" cy="0" r="0.6" fill="#B45309" />
          </G>
        </Svg>
      </View>

      {/* Optional Brand Typography Matching Website */}
      {showText && (
        <View style={styles.textColumn}>
          <View style={styles.titleRow}>
            <Text style={styles.brandTitle}>Noor-e-ilahi</Text>
            <View style={styles.arabicBadge}>
              <Text style={styles.arabicBadgeText}>نُورِ اِلٰہی</Text>
            </View>
          </View>
          <Text style={styles.brandTagline}>Your Deen. Your Daily Companion.</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  emblemContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#f59e0b',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 4,
  },
  textColumn: {
    justifyContent: 'center',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  brandTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  arabicBadge: {
    backgroundColor: 'rgba(245, 158, 11, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.4)',
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 1,
  },
  arabicBadgeText: {
    color: '#fde68a',
    fontSize: 11,
    fontWeight: 'bold',
  },
  brandTagline: {
    color: 'rgba(110, 231, 183, 0.75)',
    fontSize: 9.5,
    fontWeight: '500',
    marginTop: 1,
  },
});
