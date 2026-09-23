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
import { Ionicons } from '@expo/vector-icons';
import { THEME } from '../theme';

export interface MobileCity {
  city: string;
  country: string;
  lat: number;
  lng: number;
  region: string;
}

export const POPULAR_CITIES: MobileCity[] = [
  { city: 'Makkah', country: 'Saudi Arabia', lat: 21.4225, lng: 39.8262, region: 'Holy Sanctuary' },
  { city: 'Madinah', country: 'Saudi Arabia', lat: 24.5247, lng: 39.5692, region: 'Prophet’s City' },
  { city: 'Jerusalem', country: 'Palestine', lat: 31.7683, lng: 35.2137, region: 'Al-Quds / Al-Aqsa' },
  { city: 'Istanbul', country: 'Turkey', lat: 41.0082, lng: 28.9784, region: 'Ottoman Heritage' },
  { city: 'Cairo', country: 'Egypt', lat: 30.0444, lng: 31.2357, region: 'Al-Azhar City' },
  { city: 'Fez', country: 'Morocco', lat: 34.0331, lng: -5.0003, region: 'Imperial Spiritual Capital' },
  { city: 'Najaf', country: 'Iraq', lat: 31.9961, lng: 44.3142, region: 'Imam Ali Sanctuary' },
  { city: 'Karbala', country: 'Iraq', lat: 32.6164, lng: 44.0324, region: 'Imam Husayn Sanctuary' },
  { city: 'Baghdad', country: 'Iraq', lat: 33.3152, lng: 44.3661, region: 'Ghous-e-Azam Sanctuary' },
  { city: 'Samarkand', country: 'Uzbekistan', lat: 39.6270, lng: 66.9750, region: 'Shah-i Zinda' },
  { city: 'Konya', country: 'Turkey', lat: 37.8706, lng: 32.5053, region: 'Mevlana Rumi City' },
  { city: 'Delhi', country: 'India', lat: 28.6139, lng: 77.2090, region: 'Hazrat Nizamuddin' },
  { city: 'Ajmer', country: 'India', lat: 26.4563, lng: 74.6282, region: 'Khwaja Garib Nawaz' },
  { city: 'Lahore', country: 'Pakistan', lat: 31.5204, lng: 74.3587, region: 'Data Darbar' },
  { city: 'Jakarta', country: 'Indonesia', lat: -6.2088, lng: 106.8456, region: 'Istiqlal Grand Mosque' },
  { city: 'Sylhet', country: 'Bangladesh', lat: 24.8949, lng: 91.8687, region: 'Hazrat Shah Jalal' },
  { city: 'London', country: 'United Kingdom', lat: 51.5074, lng: -0.1278, region: 'Regent’s Park Mosque' },
  { city: 'New York', country: 'United States', lat: 40.7128, lng: -74.0060, region: 'North America' },
];

interface LocationPickerModalProps {
  visible: boolean;
  currentCity: MobileCity;
  onSelectCity: (city: MobileCity) => void;
  onClose: () => void;
}

export const LocationPickerModal: React.FC<LocationPickerModalProps> = ({
  visible,
  currentCity,
  onSelectCity,
  onClose,
}) => {
  return (
    <Modal visible={visible} animationType="fade" transparent>
      <SafeAreaView style={styles.modalBackdrop}>
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <View>
              <Text style={styles.headerTitle}>Select Location</Text>
              <Text style={styles.headerSub}>Astronomical prayer calculations</Text>
            </View>

            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <Ionicons name="close" size={20} color={THEME.colors.textWhite} />
            </TouchableOpacity>
          </View>

          {/* Cities List */}
          <ScrollView contentContainerStyle={styles.list} showsVerticalScrollIndicator={false}>
            {POPULAR_CITIES.map((loc) => {
              const isSelected = loc.city === currentCity.city;
              return (
                <TouchableOpacity
                  key={`${loc.city}-${loc.country}`}
                  style={[styles.cityItem, isSelected && styles.cityItemActive]}
                  onPress={() => {
                    onSelectCity(loc);
                    onClose();
                  }}
                >
                  <View style={styles.cityLeft}>
                    <Ionicons
                      name={isSelected ? 'location' : 'location-outline'}
                      size={20}
                      color={isSelected ? THEME.colors.goldPrimary : THEME.colors.emeraldSubtle}
                    />
                    <View>
                      <Text style={[styles.cityName, isSelected && styles.cityNameActive]}>
                        {loc.city}
                      </Text>
                      <Text style={styles.countryName}>{loc.country}</Text>
                    </View>
                  </View>

                  <Text style={styles.regionBadge}>{loc.region}</Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  container: {
    width: '100%',
    maxHeight: '80%',
    backgroundColor: THEME.colors.bgCard,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: THEME.colors.borderSubtle,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 18,
    borderBottomWidth: 1,
    borderBottomColor: THEME.colors.divider,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: THEME.colors.textWhite,
  },
  headerSub: {
    fontSize: 12,
    color: THEME.colors.emeraldSubtle,
    marginTop: 2,
  },
  closeBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  list: {
    padding: 14,
    gap: 8,
  },
  cityItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 14,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.06)',
  },
  cityItemActive: {
    backgroundColor: 'rgba(245, 158, 11, 0.15)',
    borderColor: THEME.colors.goldBorder,
  },
  cityLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  cityName: {
    fontSize: 15,
    fontWeight: '700',
    color: THEME.colors.textWhite,
  },
  cityNameActive: {
    color: THEME.colors.goldPrimary,
  },
  countryName: {
    fontSize: 12,
    color: THEME.colors.emeraldSubtle,
  },
  regionBadge: {
    fontSize: 11,
    color: 'rgba(110, 231, 183, 0.7)',
  },
});
