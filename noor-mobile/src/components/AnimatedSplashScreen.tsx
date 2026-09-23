import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Easing,
  Dimensions,
  TouchableOpacity,
  Platform,
} from 'react-native';
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
import * as Haptics from 'expo-haptics';

const { width, height } = Dimensions.get('window');

interface AnimatedSplashScreenProps {
  visible: boolean;
  onFinish: () => void;
  autoDismissDelay?: number;
}

export const AnimatedSplashScreen: React.FC<AnimatedSplashScreenProps> = ({
  visible,
  onFinish,
  autoDismissDelay = 3200,
}) => {
  // Animation Values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.92)).current;
  const glowAnim = useRef(new Animated.Value(0.3)).current;
  const logoSpinAnim = useRef(new Animated.Value(0)).current;
  const starPulseAnim = useRef(new Animated.Value(1)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;
  const textFadeAnim = useRef(new Animated.Value(0)).current;
  const textSlideAnim = useRef(new Animated.Value(14)).current;

  useEffect(() => {
    if (!visible) return;

    // Reset values
    fadeAnim.setValue(0);
    scaleAnim.setValue(0.92);
    glowAnim.setValue(0.3);
    logoSpinAnim.setValue(0);
    starPulseAnim.setValue(1);
    progressAnim.setValue(0);
    textFadeAnim.setValue(0);
    textSlideAnim.setValue(14);

    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } catch (_) {}

    // Continuous Celestial Orbit Spin
    const spinLoop = Animated.loop(
      Animated.timing(logoSpinAnim, {
        toValue: 1,
        duration: 8000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );
    spinLoop.start();

    // Continuous Star Breathing Pulse
    const pulseLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(starPulseAnim, {
          toValue: 1.15,
          duration: 1400,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(starPulseAnim, {
          toValue: 1,
          duration: 1400,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    );
    pulseLoop.start();

    // Ambient Radial Glow Breathing
    const glowLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, {
          toValue: 0.85,
          duration: 1800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(glowAnim, {
          toValue: 0.35,
          duration: 1800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    );
    glowLoop.start();

    // Staggered Entrance
    Animated.parallel([
      // Container Fade In
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      // Emblem Scale
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 900,
        easing: Easing.out(Easing.back(1.4)),
        useNativeDriver: true,
      }),
      // Typography Entrance
      Animated.sequence([
        Animated.delay(350),
        Animated.parallel([
          Animated.timing(textFadeAnim, {
            toValue: 1,
            duration: 600,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(textSlideAnim, {
            toValue: 0,
            duration: 600,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: true,
          }),
        ]),
      ]),
      // Progress Bar Filling
      Animated.timing(progressAnim, {
        toValue: 1,
        duration: autoDismissDelay - 400,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: false,
      }),
    ]).start();

    // Auto-dismiss timer
    const timer = setTimeout(() => {
      handleDismiss();
    }, autoDismissDelay);

    return () => {
      clearTimeout(timer);
      spinLoop.stop();
      pulseLoop.stop();
      glowLoop.stop();
    };
  }, [visible]);

  const handleDismiss = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 450,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start(() => {
      onFinish();
    });
  };

  if (!visible) return null;

  const orbitSpin = logoSpinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={handleDismiss}
        style={styles.touchable}
      >
        {/* Background Islamic Geometric Watermarks */}
        <View style={styles.backgroundGrid}>
          {/* Subtle Corner Arabesque Stars */}
          <View style={styles.cornerTopLeft}>
            <Text style={styles.arabesqueWatermark}>۞</Text>
          </View>
          <View style={styles.cornerBottomRight}>
            <Text style={styles.arabesqueWatermark}>۞</Text>
          </View>
        </View>

        {/* Ambient Radial Golden Aura */}
        <Animated.View
          style={[
            styles.radialAura,
            {
              opacity: glowAnim,
            },
          ]}
          pointerEvents="none"
        >
          <Svg width={360} height={360} viewBox="0 0 360 360">
            <Defs>
              <RadialGradient id="splashGoldAura" cx="50%" cy="50%" rx="50%" ry="50%">
                <Stop offset="0%" stopColor="#F59E0B" stopOpacity="0.45" />
                <Stop offset="45%" stopColor="#059669" stopOpacity="0.22" />
                <Stop offset="100%" stopColor="#02130E" stopOpacity="0" />
              </RadialGradient>
            </Defs>
            <Circle cx="180" cy="180" r="170" fill="url(#splashGoldAura)" />
          </Svg>
        </Animated.View>

        {/* Top Header with Skip Button */}
        <View style={styles.topHeader}>
          <View style={styles.statusPill}>
            <View style={styles.statusDot} />
            <Text style={styles.statusText}>AUTHENTIC ISLAMIC PLATFORM</Text>
          </View>
          <TouchableOpacity
            onPress={handleDismiss}
            style={styles.skipButton}
            hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
          >
            <Text style={styles.skipText}>SKIP ✕</Text>
          </TouchableOpacity>
        </View>

        {/* Center Section: Bismillah + Sacred Noor Emblem + Brand Typography */}
        <View style={styles.centerContent}>
          {/* Sacred Bismillah Calligraphy */}
          <Animated.View
            style={[
              styles.bismillahContainer,
              {
                opacity: textFadeAnim,
                transform: [{ translateY: textSlideAnim }],
              },
            ]}
          >
            <Text style={styles.bismillahArabic}>بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</Text>
            <Text style={styles.bismillahSub}>In the Name of Allah, the Most Compassionate, the Most Merciful</Text>
          </Animated.View>

          {/* Majestic Animated Noor Emblem */}
          <Animated.View
            style={[
              styles.emblemContainer,
              {
                transform: [{ scale: scaleAnim }],
              },
            ]}
          >
            <Svg viewBox="0 0 64 64" width={100} height={100}>
              <Defs>
                {/* Liquid Gold Shimmer Gradient */}
                <LinearGradient id="splashCrescentGold" x1="8" y1="8" x2="56" y2="56">
                  <Stop offset="0%" stopColor="#FDE68A" />
                  <Stop offset="35%" stopColor="#F59E0B" />
                  <Stop offset="70%" stopColor="#D97706" />
                  <Stop offset="100%" stopColor="#B45309" />
                </LinearGradient>

                {/* Sacred Emerald Jewel Gradient */}
                <LinearGradient id="splashEmeraldBase" x1="0" y1="0" x2="64" y2="64">
                  <Stop offset="0%" stopColor="#059669" />
                  <Stop offset="50%" stopColor="#064e3b" />
                  <Stop offset="100%" stopColor="#022c22" />
                </LinearGradient>

                {/* Radiant Star Core Gradient */}
                <RadialGradient id="splashStarShine" cx="50%" cy="50%" r="50%">
                  <Stop offset="0%" stopColor="#FFFFFF" />
                  <Stop offset="45%" stopColor="#FDE68A" />
                  <Stop offset="80%" stopColor="#F59E0B" />
                  <Stop offset="100%" stopColor="#D97706" />
                </RadialGradient>

                {/* Celestial Orbit Ring Gradient */}
                <LinearGradient id="splashOrbitStroke" x1="0" y1="0" x2="64" y2="64">
                  <Stop offset="0%" stopColor="#FDE68A" stopOpacity="0.85" />
                  <Stop offset="50%" stopColor="#34D399" stopOpacity="0.4" />
                  <Stop offset="100%" stopColor="#F59E0B" stopOpacity="0.85" />
                </LinearGradient>
              </Defs>

              {/* 1. Outer Protective Rounded Base with Sacred Emerald Fill */}
              <Rect
                x="2"
                y="2"
                width="60"
                height="60"
                rx="18"
                fill="url(#splashEmeraldBase)"
                stroke="rgba(255, 255, 255, 0.3)"
                strokeWidth="1.2"
              />

              {/* 2. Celestial Astrolabe / Orbit Ring with Dashes */}
              <Circle
                cx="32"
                cy="32"
                r="26"
                stroke="url(#splashOrbitStroke)"
                strokeWidth="1.2"
                strokeDasharray="4, 5"
                fill="none"
              />

              {/* 3. Orbiting Light Spark (Divine Light / Noor) */}
              <Circle cx="32" cy="6" r="2.4" fill="#FEF3C7" />

              {/* 4. Authentic Sacred Crescent Moon (Hilal) */}
              <Path
                d="M 34.61 15.8 A 17.5 17.5 0 1 0 34.61 48.2 A 16.5 16.5 0 0 1 34.61 15.8 Z"
                fill="url(#splashCrescentGold)"
              />

              {/* Inner Crescent Highlight */}
              <Path
                d="M 30 18 A 16 16 0 0 0 13 32 A 16 16 0 0 0 30 46 A 15.5 15.5 0 0 1 14.5 32 A 15.5 15.5 0 0 1 30 18 Z"
                fill="#FFFFFF"
                opacity="0.28"
              />

              {/* 5. Islamic Eight-Pointed Star (Rub el Hizb ۞) Nested in Crescent */}
              <G transform="translate(35, 32)">
                <Rect
                  x="-4.5"
                  y="-4.5"
                  width="9"
                  height="9"
                  rx="1"
                  fill="url(#splashStarShine)"
                />
                <Rect
                  x="-4.5"
                  y="-4.5"
                  width="9"
                  height="9"
                  rx="1"
                  transform="rotate(45)"
                  fill="url(#splashStarShine)"
                  opacity="0.95"
                />
                <Circle cx="0" cy="0" r="1.5" fill="#FFFFFF" />
                <Circle cx="0" cy="0" r="0.6" fill="#B45309" />
              </G>
            </Svg>
          </Animated.View>

          {/* Brand Typography */}
          <Animated.View
            style={[
              styles.typographyContainer,
              {
                opacity: textFadeAnim,
                transform: [{ translateY: textSlideAnim }],
              },
            ]}
          >
            <View style={styles.brandTitleRow}>
              <Text style={styles.brandTitle}>Noor-e-ilahi</Text>
              <View style={styles.arabicBadge}>
                <Text style={styles.arabicBadgeText}>نُورِ اِلٰہی</Text>
              </View>
            </View>

            <Text style={styles.brandSubtitle}>Your Deen. Your Daily Companion.</Text>

            {/* Feature Pills Bar */}
            <View style={styles.featuresRow}>
              <Text style={styles.featureItem}>🕌 SALAAH</Text>
              <Text style={styles.featureDot}>•</Text>
              <Text style={styles.featureItem}>📖 QURAN</Text>
              <Text style={styles.featureDot}>•</Text>
              <Text style={styles.featureItem}>🏛️ ZIYARAT</Text>
              <Text style={styles.featureDot}>•</Text>
              <Text style={styles.featureItem}>🧭 QIBLA</Text>
            </View>
          </Animated.View>
        </View>

        {/* Bottom Loading Progress Bar & Version */}
        <View style={styles.bottomSection}>
          <View style={styles.progressBarContainer}>
            <Animated.View
              style={[
                styles.progressBarFill,
                {
                  width: progressWidth,
                },
              ]}
            />
          </View>

          <Text style={styles.loadingLabel}>SYNCHRONIZING PRAYER TIMES & MECCA AZIMUTH...</Text>
          <Text style={styles.versionLabel}>NOOR-E-ILAHI v1.0.0 • GLOBAL ISLAMIC ECOSYSTEM</Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFill,
    zIndex: 99999,
    backgroundColor: '#02130e',
  },
  touchable: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: Platform.OS === 'ios' ? 56 : 40,
    paddingBottom: Platform.OS === 'ios' ? 44 : 28,
  },
  backgroundGrid: {
    ...StyleSheet.absoluteFill,
    overflow: 'hidden',
  },
  cornerTopLeft: {
    position: 'absolute',
    top: -20,
    left: -20,
  },
  cornerBottomRight: {
    position: 'absolute',
    bottom: -20,
    right: -20,
  },
  arabesqueWatermark: {
    fontSize: 140,
    color: 'rgba(5, 150, 105, 0.04)',
  },
  radialAura: {
    position: 'absolute',
    top: height * 0.28 - 180,
    left: width * 0.5 - 180,
    width: 360,
    height: 360,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 10,
  },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    backgroundColor: 'rgba(5, 150, 105, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(5, 150, 105, 0.3)',
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#34d399',
  },
  statusText: {
    color: '#a7f3d0',
    fontSize: 8.5,
    fontWeight: '800',
    letterSpacing: 1,
  },
  skipButton: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  skipText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1.2,
  },
  centerContent: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 'auto',
  },
  bismillahContainer: {
    alignItems: 'center',
    marginBottom: 26,
  },
  bismillahArabic: {
    color: '#fde68a',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    letterSpacing: 1,
    textShadowColor: 'rgba(245, 158, 11, 0.4)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
  },
  bismillahSub: {
    color: 'rgba(167, 243, 208, 0.7)',
    fontSize: 9,
    fontWeight: '500',
    marginTop: 4,
    letterSpacing: 0.5,
    textAlign: 'center',
  },
  emblemContainer: {
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#f59e0b',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 8,
  },
  typographyContainer: {
    alignItems: 'center',
    marginTop: 24,
  },
  brandTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  brandTitle: {
    color: '#ffffff',
    fontSize: 26,
    fontWeight: '900',
    letterSpacing: 1,
  },
  arabicBadge: {
    backgroundColor: 'rgba(245, 158, 11, 0.18)',
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.45)',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  arabicBadgeText: {
    color: '#fde68a',
    fontSize: 13,
    fontWeight: 'bold',
  },
  brandSubtitle: {
    color: '#a7f3d0',
    fontSize: 12,
    fontWeight: '600',
    marginTop: 5,
    letterSpacing: 0.5,
  },
  featuresRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 14,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: 'rgba(6, 78, 59, 0.3)',
    borderWidth: 1,
    borderColor: 'rgba(52, 211, 153, 0.2)',
  },
  featureItem: {
    color: 'rgba(255, 255, 255, 0.85)',
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 0.8,
  },
  featureDot: {
    color: '#f59e0b',
    fontSize: 10,
    fontWeight: 'bold',
  },
  bottomSection: {
    alignItems: 'center',
    width: '100%',
  },
  progressBarContainer: {
    width: '75%',
    height: 3.5,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    overflow: 'hidden',
    marginBottom: 10,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#f59e0b',
    borderRadius: 4,
  },
  loadingLabel: {
    color: 'rgba(167, 243, 208, 0.75)',
    fontSize: 8,
    fontWeight: '700',
    letterSpacing: 1.5,
    marginBottom: 4,
  },
  versionLabel: {
    color: 'rgba(255, 255, 255, 0.35)',
    fontSize: 7.5,
    fontWeight: '600',
    letterSpacing: 1,
  },
});
