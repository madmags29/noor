import React, { useState, useEffect, useRef } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Animated,
  Easing,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import * as Haptics from 'expo-haptics';
import { THEME } from '../theme';
import { useLanguage } from '../context/LanguageContext';

interface QiblaModalProps {
  visible: boolean;
  onClose: () => void;
  cityName: string;
  countryName: string;
}

// Known coordinates for default cities
const CITY_COORDS: Record<string, { lat: number; lng: number }> = {
  'New Delhi': { lat: 28.6139, lng: 77.2090 },
  'Delhi': { lat: 28.6139, lng: 77.2090 },
  'Mumbai': { lat: 19.0760, lng: 72.8777 },
  'Makkah': { lat: 21.4225, lng: 39.8262 },
  'Madinah': { lat: 24.4672, lng: 39.6111 },
  'Dubai': { lat: 25.2048, lng: 55.2708 },
  'Cairo': { lat: 30.0444, lng: 31.2357 },
  'Istanbul': { lat: 41.0082, lng: 28.9784 },
  'London': { lat: 51.5074, lng: -0.1278 },
  'New York': { lat: 40.7128, lng: -74.0060 },
  'Karachi': { lat: 24.8607, lng: 67.0011 },
  'Kuala Lumpur': { lat: 3.1390, lng: 101.6869 },
  'Jakarta': { lat: -6.2088, lng: 106.8456 },
  'Toronto': { lat: 43.6532, lng: -79.3832 },
};

function calculateQibla(lat: number, lng: number): { bearing: number; distanceKm: number } {
  const kaabaLat = (21.4225 * Math.PI) / 180;
  const kaabaLng = (39.8262 * Math.PI) / 180;
  const phi = (lat * Math.PI) / 180;
  const lambda = (lng * Math.PI) / 180;
  const psi =
    (180.0 / Math.PI) *
    Math.atan2(
      Math.sin(kaabaLng - lambda),
      Math.cos(phi) * Math.tan(kaabaLat) - Math.sin(phi) * Math.cos(kaabaLng - lambda)
    );
  const bearing = Math.round(((psi + 360.0) % 360.0) * 10) / 10;

  // Haversine distance
  const R = 6371;
  const dLat = kaabaLat - phi;
  const dLng = kaabaLng - lambda;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(phi) * Math.cos(kaabaLat) * Math.sin(dLng / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distanceKm = Math.round(R * c);

  return { bearing, distanceKm };
}

function getCardinal(deg: number): string {
  const val = (deg + 360) % 360;
  if (val >= 337.5 || val < 22.5) return 'N';
  if (val >= 22.5 && val < 67.5) return 'NE';
  if (val >= 67.5 && val < 112.5) return 'E';
  if (val >= 112.5 && val < 157.5) return 'ESE';
  if (val >= 157.5 && val < 202.5) return 'S';
  if (val >= 202.5 && val < 247.5) return 'SW';
  if (val >= 247.5 && val < 292.5) return 'W';
  return 'NW';
}

export const QiblaModal: React.FC<QiblaModalProps> = ({
  visible,
  onClose,
  cityName,
  countryName,
}) => {
  const { t } = useLanguage();

  // Coordinates & Computed Bearing
  const coords = CITY_COORDS[cityName] || CITY_COORDS['New Delhi'];
  const [userCoords, setUserCoords] = useState<{ lat: number; lng: number }>(coords);
  const { bearing: qiblaBearing, distanceKm } = calculateQibla(userCoords.lat, userCoords.lng);

  // Compass Heading & Sensor Status
  const [heading, setHeading] = useState<number>(0);
  const [accuracy, setAccuracy] = useState<number>(3);
  const [isSensorActive, setIsSensorActive] = useState<boolean>(false);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  // Animated rotation value for buttery smooth movement
  const animatedHeading = useRef(new Animated.Value(0)).current;
  const lastHapticRef = useRef<number>(0);

  // Calculate relative angle to Kaaba
  const relativeAngle = ((qiblaBearing - heading + 360) % 360);
  const isAligned = relativeAngle <= 4 || relativeAngle >= 356;

  // Trigger haptic vibration upon Kaaba alignment
  useEffect(() => {
    if (isAligned && visible) {
      const now = Date.now();
      if (now - lastHapticRef.current > 1500) {
        lastHapticRef.current = now;
        try {
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        } catch (_) {}
      }
    }
  }, [isAligned, visible]);

  // Smoothly animate compass heading transitions
  useEffect(() => {
    Animated.timing(animatedHeading, {
      toValue: heading,
      duration: 180,
      easing: Easing.out(Easing.quad),
      useNativeDriver: true,
    }).start();
  }, [heading]);

  // Watch hardware compass/gyroscope sensors
  useEffect(() => {
    let sub: Location.LocationSubscription | null = null;
    let isMounted = true;

    async function setupLocationAndSensors() {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (!isMounted) return;
        setHasPermission(status === 'granted');

        if (status === 'granted') {
          // Attempt GPS position
          try {
            const pos = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced });
            if (isMounted && pos?.coords) {
              setUserCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude });
            }
          } catch (_) {
            // Fall back to city coords
          }

          // Subscribe to hardware compass/magnetometer/gyroscope
          sub = await Location.watchHeadingAsync((headingData) => {
            if (!isMounted || isSimulating) return;
            const h = headingData.trueHeading >= 0 ? headingData.trueHeading : headingData.magHeading;
            setHeading(Math.round(h));
            setAccuracy(headingData.accuracy);
            setIsSensorActive(true);
          });
        }
      } catch (err) {
        if (isMounted) setIsSensorActive(false);
      }
    }

    if (visible) {
      setupLocationAndSensors();
    } else {
      setIsSensorActive(false);
    }

    return () => {
      isMounted = false;
      if (sub) sub.remove();
    };
  }, [visible, isSimulating]);

  // Manual Gyroscope Stepper for testing / simulation
  const adjustHeading = (delta: number) => {
    setIsSimulating(true);
    setHeading((prev) => (prev + delta + 360) % 360);
  };

  const snapToQibla = () => {
    setIsSimulating(true);
    setHeading(Math.round(qiblaBearing));
  };

  // Interpolate rotation for dial & needle
  const dialRotation = animatedHeading.interpolate({
    inputRange: [0, 360],
    outputRange: ['0deg', '-360deg'],
  });

  const kaabaNeedleRotation = animatedHeading.interpolate({
    inputRange: [0, 360],
    outputRange: [`${qiblaBearing}deg`, `${qiblaBearing - 360}deg`],
  });

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <SafeAreaView style={styles.modalBackdrop}>
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.titleRow}>
              <View style={[styles.iconCircle, isAligned && styles.iconCircleAligned]}>
                <Ionicons
                  name="compass"
                  size={20}
                  color={isAligned ? '#10b981' : THEME.colors.goldPrimary}
                />
              </View>
              <View>
                <Text style={styles.headerTitle}>{t('qibla') || 'Spherical Qibla Compass'}</Text>
                <Text style={styles.headerSub}>
                  {isAligned ? '✨ Perfect Alignment with Holy Kaaba' : t('qiblaSub') || 'Direction towards the Holy Kaaba'}
                </Text>
              </View>
            </View>

            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <Ionicons name="close" size={20} color={THEME.colors.textWhite} />
            </TouchableOpacity>
          </View>

          <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
            {/* Live Gyroscope Compass Visual Card */}
            <View style={[styles.compassCard, isAligned && styles.compassCardAligned]}>
              {/* Location & Status Bar */}
              <View style={styles.cardHeaderRow}>
                <Text style={styles.cardCity}>
                  📍 {cityName}, {countryName}
                </Text>
                <View style={styles.sensorStatusBadge}>
                  <View
                    style={[
                      styles.statusDot,
                      { backgroundColor: isSensorActive ? '#10b981' : '#f59e0b' },
                    ]}
                  />
                  <Text style={styles.sensorStatusText}>
                    {isSensorActive ? 'Hardware Gyro' : isSimulating ? 'Simulated' : 'Standby'}
                  </Text>
                </View>
              </View>

              {/* Kaaba Alignment Banner */}
              {isAligned ? (
                <View style={styles.alignedBanner}>
                  <Text style={styles.alignedBannerText}>🕋 ALIGNED WITH THE HOLY KAABA 🕋</Text>
                  <Text style={styles.alignedBannerSub}>काबा के बिल्कुल सम्मुख • You are facing Makkah</Text>
                </View>
              ) : (
                <Text style={styles.turnInstruction}>
                  Rotate device {relativeAngle < 180 ? `right by ${Math.round(relativeAngle)}°` : `left by ${Math.round(360 - relativeAngle)}°`} to face Kaaba
                </Text>
              )}

              {/* Compass Dial Outer Ring */}
              <View style={[styles.compassDialWrapper, isAligned && styles.dialWrapperAligned]}>
                {/* Rotatable Compass Rose */}
                <Animated.View
                  style={[
                    styles.compassDial,
                    { transform: [{ rotate: dialRotation }] },
                  ]}
                >
                  <Text style={styles.cardNorth}>N</Text>
                  <Text style={styles.cardEast}>E</Text>
                  <Text style={styles.cardSouth}>S</Text>
                  <Text style={styles.cardWest}>W</Text>

                  {/* Degree Tick Ring */}
                  <View style={styles.tickCircle} />
                </Animated.View>

                {/* Rotatable Kaaba Target Needle */}
                <Animated.View
                  style={[
                    styles.kaabaNeedleContainer,
                    { transform: [{ rotate: kaabaNeedleRotation }] },
                  ]}
                >
                  <View style={styles.kaabaNeedleTop}>
                    <Text style={styles.kaabaIcon}>🕋</Text>
                    <View style={styles.needlePointer} />
                  </View>
                </Animated.View>

                {/* Center Hub Displaying Live Heading */}
                <View style={[styles.centerHub, isAligned && styles.centerHubAligned]}>
                  <Text style={styles.degreeText}>{heading}°</Text>
                  <Text style={styles.cardinalText}>{getCardinal(heading)}</Text>
                </View>
              </View>

              {/* Bearing & Distance Stats */}
              <View style={styles.bearingRow}>
                <View style={styles.statBox}>
                  <Text style={styles.statLabel}>QIBLA BEARING</Text>
                  <Text style={styles.statVal}>{qiblaBearing}° {getCardinal(qiblaBearing)}</Text>
                </View>

                <View style={styles.statBox}>
                  <Text style={styles.statLabel}>CURRENT HEADING</Text>
                  <Text style={[styles.statVal, isAligned && { color: '#10b981' }]}>
                    {heading}° {getCardinal(heading)}
                  </Text>
                </View>

                <View style={styles.statBox}>
                  <Text style={styles.statLabel}>DISTANCE</Text>
                  <Text style={styles.statVal}>{distanceKm.toLocaleString()} km</Text>
                </View>
              </View>

              {/* Gyroscope Simulator & Test Controls */}
              <View style={styles.gyroControlSection}>
                <View style={styles.gyroHeader}>
                  <MaterialCommunityIcons name="axis-z-rotate-clockwise" size={14} color="#f59e0b" />
                  <Text style={styles.gyroTitle}>Gyroscope Simulator & Testing</Text>
                </View>
                <View style={styles.gyroButtonsRow}>
                  <TouchableOpacity
                    style={styles.gyroBtn}
                    onPress={() => adjustHeading(-30)}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.gyroBtnText}>↺ -30°</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.gyroBtn}
                    onPress={() => adjustHeading(-10)}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.gyroBtnText}>-10°</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[styles.gyroBtn, styles.gyroBtnKaaba]}
                    onPress={snapToQibla}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.gyroBtnKaabaText}>🕋 Face Kaaba</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.gyroBtn}
                    onPress={() => adjustHeading(+10)}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.gyroBtnText}>+10°</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.gyroBtn}
                    onPress={() => adjustHeading(+30)}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.gyroBtnText}>+30° ↻</Text>
                  </TouchableOpacity>
                </View>
                {isSimulating && (
                  <TouchableOpacity
                    style={styles.resetSensorBtn}
                    onPress={() => setIsSimulating(false)}
                  >
                    <Text style={styles.resetSensorText}>Return to Hardware Compass Sensors</Text>
                  </TouchableOpacity>
                )}
              </View>

              {/* Calibration Instructions */}
              <View style={styles.calibrationNote}>
                <Ionicons name="information-circle-outline" size={16} color={THEME.colors.goldLight} />
                <Text style={styles.calibrationText}>
                  Hold device flat horizontally away from magnets or metal. Wave in a gentle figure-8 motion if calibration is required.
                </Text>
              </View>
            </View>

            {/* Sacred Hijri Calendar Highlights */}
            <Text style={styles.sectionHeading}>Upcoming Holy Events (1448 AH)</Text>

            <View style={styles.eventItem}>
              <Text style={styles.eventEmoji}>🌙</Text>
              <View style={styles.eventInfo}>
                <Text style={styles.eventName}>Laylat al-Qadr (Night of Power)</Text>
                <Text style={styles.eventDate}>27 Ramadan 1448 AH • Better than 1,000 Months</Text>
              </View>
            </View>

            <View style={styles.eventItem}>
              <Text style={styles.eventEmoji}>✨</Text>
              <View style={styles.eventInfo}>
                <Text style={styles.eventName}>Eid al-Fitr Mubarak</Text>
                <Text style={styles.eventDate}>1 Shawwal 1448 AH • Festival of Breaking Fast</Text>
              </View>
            </View>

            <View style={styles.eventItem}>
              <Text style={styles.eventEmoji}>🕋</Text>
              <View style={styles.eventInfo}>
                <Text style={styles.eventName}>Day of Arafah & Eid al-Adha</Text>
                <Text style={styles.eventDate}>9-10 Dhu al-Hijjah 1448 AH • Pilgrimage Culmination</Text>
              </View>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackdrop: {
    flex: 1,
    backgroundColor: THEME.colors.bgModalGlass,
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: THEME.colors.divider,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: THEME.colors.goldMuted,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: THEME.colors.goldBorder,
  },
  iconCircleAligned: {
    borderColor: '#10b981',
    backgroundColor: 'rgba(16, 185, 129, 0.2)',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: THEME.colors.textWhite,
  },
  headerSub: {
    fontSize: 11,
    color: THEME.colors.emeraldSubtle,
  },
  closeBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    paddingVertical: 18,
    gap: 16,
  },
  compassCard: {
    backgroundColor: THEME.colors.bgCard,
    borderRadius: 24,
    padding: 16,
    borderWidth: 1,
    borderColor: THEME.colors.goldBorder,
    alignItems: 'center',
  },
  compassCardAligned: {
    borderColor: '#10b981',
    shadowColor: '#10b981',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 16,
    elevation: 8,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 8,
  },
  cardCity: {
    fontSize: 13,
    color: THEME.colors.emeraldSubtle,
    fontWeight: '700',
  },
  sensorStatusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  sensorStatusText: {
    fontSize: 9,
    fontWeight: '700',
    color: THEME.colors.textWhite,
  },
  alignedBanner: {
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    borderWidth: 1,
    borderColor: '#10b981',
    borderRadius: 12,
    paddingVertical: 6,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginVertical: 6,
    width: '100%',
  },
  alignedBannerText: {
    fontSize: 12,
    fontWeight: '900',
    color: '#34d399',
    letterSpacing: 0.5,
  },
  alignedBannerSub: {
    fontSize: 10,
    fontWeight: '600',
    color: '#a7f3d0',
    marginTop: 1,
  },
  turnInstruction: {
    fontSize: 11,
    fontWeight: '700',
    color: THEME.colors.goldLight,
    marginVertical: 4,
    textAlign: 'center',
  },
  compassDialWrapper: {
    width: 220,
    height: 220,
    borderRadius: 110,
    borderWidth: 3,
    borderColor: 'rgba(245, 158, 11, 0.4)',
    backgroundColor: 'rgba(2, 20, 15, 0.9)',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    marginVertical: 12,
  },
  dialWrapperAligned: {
    borderColor: '#10b981',
  },
  compassDial: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 110,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardNorth: {
    position: 'absolute',
    top: 8,
    fontSize: 14,
    fontWeight: '900',
    color: '#ef4444',
  },
  cardEast: {
    position: 'absolute',
    right: 10,
    fontSize: 12,
    fontWeight: '800',
    color: THEME.colors.textWhite,
  },
  cardSouth: {
    position: 'absolute',
    bottom: 8,
    fontSize: 12,
    fontWeight: '800',
    color: THEME.colors.textWhite,
  },
  cardWest: {
    position: 'absolute',
    left: 10,
    fontSize: 12,
    fontWeight: '800',
    color: THEME.colors.textWhite,
  },
  tickCircle: {
    width: 170,
    height: 170,
    borderRadius: 85,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderStyle: 'dashed',
  },
  kaabaNeedleContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  kaabaNeedleTop: {
    alignItems: 'center',
    top: 14,
  },
  kaabaIcon: {
    fontSize: 24,
    filter: 'drop-shadow(0px 0px 8px rgba(245, 158, 11, 0.8))',
  },
  needlePointer: {
    width: 0,
    height: 0,
    borderLeftWidth: 5,
    borderLeftColor: 'transparent',
    borderRightWidth: 5,
    borderRightColor: 'transparent',
    borderTopWidth: 12,
    borderTopColor: '#f59e0b',
    marginTop: 2,
  },
  centerHub: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: '#031712',
    borderWidth: 2,
    borderColor: THEME.colors.goldPrimary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 4,
  },
  centerHubAligned: {
    borderColor: '#10b981',
    backgroundColor: '#04281e',
  },
  degreeText: {
    fontSize: 16,
    fontWeight: '900',
    color: '#ffffff',
    fontVariant: ['tabular-nums'],
  },
  cardinalText: {
    fontSize: 9,
    fontWeight: '800',
    color: THEME.colors.goldLight,
  },
  bearingRow: {
    flexDirection: 'row',
    width: '100%',
    gap: 8,
    marginTop: 8,
  },
  statBox: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 6,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  statLabel: {
    fontSize: 8,
    fontWeight: '800',
    color: THEME.colors.goldPrimary,
    letterSpacing: 0.5,
  },
  statVal: {
    fontSize: 13,
    fontWeight: '800',
    color: THEME.colors.textWhite,
    marginTop: 3,
  },
  gyroControlSection: {
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 16,
    padding: 10,
    marginTop: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.06)',
  },
  gyroHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
    justifyContent: 'center',
  },
  gyroTitle: {
    fontSize: 10,
    fontWeight: '800',
    color: '#f59e0b',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  gyroButtonsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 4,
  },
  gyroBtn: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    paddingVertical: 7,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  gyroBtnText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#ffffff',
  },
  gyroBtnKaaba: {
    flex: 1.5,
    backgroundColor: 'rgba(245, 158, 11, 0.25)',
    borderColor: 'rgba(245, 158, 11, 0.6)',
  },
  gyroBtnKaabaText: {
    fontSize: 10,
    fontWeight: '900',
    color: '#fbbf24',
  },
  resetSensorBtn: {
    marginTop: 8,
    alignItems: 'center',
  },
  resetSensorText: {
    fontSize: 9,
    color: '#6ee7b7',
    textDecorationLine: 'underline',
    fontWeight: '600',
  },
  calibrationNote: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(245, 158, 11, 0.08)',
    borderRadius: 12,
    padding: 10,
    marginTop: 12,
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.2)',
  },
  calibrationText: {
    flex: 1,
    fontSize: 10,
    color: THEME.colors.goldLight,
    lineHeight: 14,
  },
  sectionHeading: {
    fontSize: 15,
    fontWeight: '800',
    color: THEME.colors.textWhite,
    marginTop: 8,
  },
  eventItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: THEME.colors.bgCard,
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: THEME.colors.borderSubtle,
  },
  eventEmoji: {
    fontSize: 22,
  },
  eventInfo: {
    flex: 1,
  },
  eventName: {
    fontSize: 14,
    fontWeight: '700',
    color: THEME.colors.textWhite,
  },
  eventDate: {
    fontSize: 11,
    color: THEME.colors.emeraldSubtle,
    marginTop: 2,
  },
});
