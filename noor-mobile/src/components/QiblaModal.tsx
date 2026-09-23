import React from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { THEME } from '../theme';

interface QiblaModalProps {
  visible: boolean;
  onClose: () => void;
  cityName: string;
  countryName: string;
}

export const QiblaModal: React.FC<QiblaModalProps> = ({
  visible,
  onClose,
  cityName,
  countryName,
}) => {
  return (
    <Modal visible={visible} animationType="slide" transparent>
      <SafeAreaView style={styles.modalBackdrop}>
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.titleRow}>
              <View style={styles.iconCircle}>
                <Ionicons name="compass" size={20} color={THEME.colors.goldPrimary} />
              </View>
              <View>
                <Text style={styles.headerTitle}>Spherical Qibla Compass</Text>
                <Text style={styles.headerSub}>Direction towards the Holy Kaaba</Text>
              </View>
            </View>

            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <Ionicons name="close" size={20} color={THEME.colors.textWhite} />
            </TouchableOpacity>
          </View>

          <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
            {/* Compass Visual Card */}
            <View style={styles.compassCard}>
              <Text style={styles.cardCity}>
                📍 {cityName}, {countryName}
              </Text>

              {/* Compass Dial */}
              <View style={styles.compassDial}>
                <Text style={styles.cardNorth}>N</Text>
                <Text style={styles.cardEast}>E</Text>
                <Text style={styles.cardSouth}>S</Text>
                <Text style={styles.cardWest}>W</Text>

                {/* Center Kaaba Pointer */}
                <View style={styles.centerKaaba}>
                  <Text style={styles.kaabaIcon}>🕋</Text>
                  <Text style={styles.degreeText}>118.4°</Text>
                </View>
              </View>

              <View style={styles.bearingRow}>
                <View style={styles.statBox}>
                  <Text style={styles.statLabel}>QIBLA BEARING</Text>
                  <Text style={styles.statVal}>118.4° ESE</Text>
                </View>

                <View style={styles.statBox}>
                  <Text style={styles.statLabel}>DISTANCE TO MAKKAH</Text>
                  <Text style={styles.statVal}>4,215 km</Text>
                </View>
              </View>

              <View style={styles.calibrationNote}>
                <Ionicons name="information-circle-outline" size={16} color={THEME.colors.goldLight} />
                <Text style={styles.calibrationText}>
                  Hold phone flat and rotate gently in figure-8 motion for electronic magnetometer calibration.
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
    padding: 20,
    borderWidth: 1,
    borderColor: THEME.colors.goldBorder,
    alignItems: 'center',
  },
  cardCity: {
    fontSize: 13,
    color: THEME.colors.emeraldSubtle,
    fontWeight: '700',
    marginBottom: 16,
  },
  compassDial: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 3,
    borderColor: THEME.colors.goldPrimary,
    backgroundColor: 'rgba(2, 20, 15, 0.8)',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    marginVertical: 10,
  },
  cardNorth: {
    position: 'absolute',
    top: 10,
    fontSize: 14,
    fontWeight: '900',
    color: '#ef4444',
  },
  cardEast: {
    position: 'absolute',
    right: 12,
    fontSize: 13,
    fontWeight: '700',
    color: THEME.colors.textWhite,
  },
  cardSouth: {
    position: 'absolute',
    bottom: 10,
    fontSize: 13,
    fontWeight: '700',
    color: THEME.colors.textWhite,
  },
  cardWest: {
    position: 'absolute',
    left: 12,
    fontSize: 13,
    fontWeight: '700',
    color: THEME.colors.textWhite,
  },
  centerKaaba: {
    alignItems: 'center',
  },
  kaabaIcon: {
    fontSize: 32,
  },
  degreeText: {
    fontSize: 18,
    fontWeight: '900',
    color: THEME.colors.goldLight,
    marginTop: 4,
  },
  bearingRow: {
    flexDirection: 'row',
    width: '100%',
    gap: 10,
    marginTop: 18,
  },
  statBox: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderRadius: 14,
    padding: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  statLabel: {
    fontSize: 9,
    fontWeight: '800',
    color: THEME.colors.goldPrimary,
    letterSpacing: 0.8,
  },
  statVal: {
    fontSize: 15,
    fontWeight: '800',
    color: THEME.colors.textWhite,
    marginTop: 4,
  },
  calibrationNote: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(245, 158, 11, 0.08)',
    borderRadius: 12,
    padding: 10,
    marginTop: 14,
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.2)',
  },
  calibrationText: {
    flex: 1,
    fontSize: 11,
    color: THEME.colors.goldLight,
    lineHeight: 16,
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
