// ============================================================
// NOOR Mobile — Global Islamic World Map Screen
// World's Dargahs, Ziyarat Points, Historic Mosques & Holy Sanctuaries
// 100% Free • Zero API Key Required • Authentic Sources Only
// ============================================================

import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  Linking,
  Platform
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { THEME } from '../src/theme';
import { useLanguage } from '../src/context/LanguageContext';
import { NoorPlaceholderImage } from '../src/components/NoorPlaceholderImage';

export type MapPointType = 'all' | 'mosque' | 'dargah' | 'holy_site';

export interface MobileMapPoint {
  id: string;
  name: string;
  arabicUrduName?: string;
  type: 'mosque' | 'dargah' | 'holy_site';
  city: string;
  country: string;
  region: string;
  latitude: number;
  longitude: number;
  shortContent: string;
  thumbnailUrl: string;
  century?: string;
  architecturalStyle?: string;
}

export const MOBILE_MAP_POINTS: MobileMapPoint[] = [
  // Holy Sanctuaries
  {
    id: 'masjid-al-haram',
    name: 'Masjid al-Haram (The Holy Kaaba)',
    arabicUrduName: 'المسجد الحرام • مكة المكرمة',
    type: 'holy_site',
    city: 'Makkah',
    country: 'Saudi Arabia',
    region: 'Middle East',
    latitude: 21.4225,
    longitude: 39.8262,
    shortContent: 'The most sacred site in Islam, encircling the Holy Kaaba (Qibla of all Muslims). Host to the annual Hajj and Umrah pilgrimages, Zamzam well, and Maqam Ibrahim.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=800&q=80',
    century: 'Time of Prophet Ibrahim (AS)',
    architecturalStyle: 'Grand Multi-Tier White Marble & 9 Minarets'
  },
  {
    id: 'masjid-an-nabawi',
    name: 'Masjid an-Nabawi (The Prophet\'s Mosque)',
    arabicUrduName: 'المسجد النبوي الشريف • المدينة المنورة',
    type: 'holy_site',
    city: 'Madinah',
    country: 'Saudi Arabia',
    region: 'Middle East',
    latitude: 24.4672,
    longitude: 39.6109,
    shortContent: 'Second holiest sanctuary in Islam, founded by Prophet Muhammad (PBUH) upon the Hijrah. Encompasses the Rawdah ash-Sharifah and the Green Dome over the Prophet\'s resting place.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1542816417-0983c9c9ad53?auto=format&fit=crop&w=800&q=80',
    century: '1st Century AH / 622 CE',
    architecturalStyle: 'Iconic Green Dome, Rawdah & Kinetic Umbrellas'
  },
  {
    id: 'masjid-al-aqsa',
    name: 'Masjid al-Aqsa & Dome of the Rock',
    arabicUrduName: 'المسجد الأقصى وقبة الصخرة • القدس',
    type: 'holy_site',
    city: 'Jerusalem',
    country: 'Palestine',
    region: 'Middle East',
    latitude: 31.7761,
    longitude: 35.2358,
    shortContent: 'Third holiest sanctuary in Islam and the first Qibla. Site of the Miraculous Night Journey (Isra and Mi\'raj) of the Prophet Muhammad (PBUH).',
    thumbnailUrl: 'https://images.unsplash.com/photo-1565552645632-d725f8bfc19a?auto=format&fit=crop&w=800&q=80',
    century: '7th–8th Century CE (Umayyad Era)',
    architecturalStyle: 'Octagonal Golden Dome & Umayyad Silver Leaded Qibli Mosque'
  },

  // Historic Mosques
  {
    id: 'sultan-ahmed-mosque',
    name: 'Sultan Ahmed Mosque (Blue Mosque)',
    arabicUrduName: 'جامع السلطان أحمد • إسطنبول',
    type: 'mosque',
    city: 'Istanbul',
    country: 'Turkey',
    region: 'Europe',
    latitude: 41.0054,
    longitude: 28.9768,
    shortContent: 'Masterpiece of classical Ottoman imperial architecture commissioned by Sultan Ahmed I. Renowned for its six towering minarets and 20,000 handmade Iznik turquoise ceramic tiles.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1527838832700-5059252407fa?auto=format&fit=crop&w=800&q=80',
    century: '1616 CE',
    architecturalStyle: 'Ottoman Classical Central-Dome with Six Minarets'
  },
  {
    id: 'sheikh-zayed-grand-mosque',
    name: 'Sheikh Zayed Grand Mosque',
    arabicUrduName: 'جامع الشيخ زايد الكبير • أبوظبي',
    type: 'mosque',
    city: 'Abu Dhabi',
    country: 'United Arab Emirates',
    region: 'Middle East',
    latitude: 24.4128,
    longitude: 54.475,
    shortContent: 'One of the world\'s largest contemporary mosques, clad in Macedonian Sivec white marble. Houses the world\'s largest hand-knotted Persian carpet and 24-carat gold-plated chandeliers.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1512632570417-a6096a60775d?auto=format&fit=crop&w=800&q=80',
    century: '2007 CE',
    architecturalStyle: 'Neo-Islamic Mughal, Moorish & Fatimid Symphony'
  },
  {
    id: 'badshahi-mosque-lahore',
    name: 'Badshahi Mosque',
    arabicUrduName: 'بادشاہی مسجد • لاہور',
    type: 'mosque',
    city: 'Lahore',
    country: 'Pakistan',
    region: 'South Asia',
    latitude: 31.5882,
    longitude: 74.3105,
    shortContent: 'Monumental Mughal congregational mosque commissioned by Emperor Aurangzeb Alamgir. Constructed with carved red sandstone with white marble inlay overlooking the Lahore Fort.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1627894483216-2138af692e32?auto=format&fit=crop&w=800&q=80',
    century: '1673 CE (1084 AH)',
    architecturalStyle: 'Classical Mughal Red Sandstone Imperial Courtyard'
  },
  {
    id: 'jama-masjid-delhi',
    name: 'Jama Masjid (Masjid-i-Jahan Numa)',
    arabicUrduName: 'جامع مسجد دہلی • ہندوستان',
    type: 'mosque',
    city: 'Delhi',
    country: 'India',
    region: 'South Asia',
    latitude: 28.6507,
    longitude: 77.2334,
    shortContent: 'Principal imperial congregational mosque built by Mughal Emperor Shah Jahan. Built of red sandstone and pure white marble with three grand domes and two 40-meter minarets.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1585135497273-1a86b09fe70e?auto=format&fit=crop&w=800&q=80',
    century: '1656 CE (1066 AH)',
    architecturalStyle: 'High Mughal Red Sandstone & Marble Monument'
  },
  {
    id: 'faisal-mosque',
    name: 'Faisal Mosque',
    arabicUrduName: 'مسجد الملك فيصل • إسلام آباد',
    type: 'mosque',
    city: 'Islamabad',
    country: 'Pakistan',
    region: 'South Asia',
    latitude: 33.7297,
    longitude: 73.0372,
    shortContent: 'National mosque of Pakistan nestled at the foot of Margalla Hills, designed by Turkish architect Vedat Dalokay resembling a Bedouin desert tent, flanked by four 88-meter minarets.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1587974928442-77dc3e0dba72?auto=format&fit=crop&w=800&q=80',
    century: '1986 CE',
    architecturalStyle: 'Modernist Bedouin Tent Architecture & Turkish Minarets'
  },

  // Sacred Dargahs & Ziyarat
  {
    id: 'dargah-ajmer-sharif',
    name: 'Dargah Ajmer Sharif (Khwaja Gharib Nawaz)',
    arabicUrduName: 'درگاہ اجمیر شریف خواجہ معین الدین چشتی غریب نواز',
    type: 'dargah',
    city: 'Ajmer',
    country: 'India',
    region: 'South Asia',
    latitude: 26.4562,
    longitude: 74.6277,
    shortContent: 'The revered sanctuary of Hazrat Khwaja Moinuddin Hasan Chishti (RA), Sultan-ul-Hind. Pioneer of Chishti Sufism in India, famous for universal love and feeding the destitute (Langar).',
    thumbnailUrl: '', // Uses official NOOR-E-ILAHI placeholder
    century: '1236 CE (7th Century AH)',
    architecturalStyle: 'White Marble Dome, Silver Plated Doors & Mughal Gateways'
  },
  {
    id: 'dargah-nizamuddin-aulia',
    name: 'Dargah Hazrat Nizamuddin Aulia',
    arabicUrduName: 'درگاہ حضرت نظام الدین اولیاء • محبوب الٰہی • دہلی',
    type: 'dargah',
    city: 'Delhi',
    country: 'India',
    region: 'South Asia',
    latitude: 28.5912,
    longitude: 77.2415,
    shortContent: 'Sacred resting place of Hazrat Nizamuddin Aulia (Mahbub-e-Ilahi) and his beloved disciple, poet Amir Khusrau. Epicenter of spiritual qawwali, adab, and charity for 700+ years.',
    thumbnailUrl: '', // Uses official NOOR-E-ILAHI placeholder
    century: '1325 CE (725 AH)',
    architecturalStyle: 'Fluted White Marble Dome, Red Sandstone Jali Screens'
  },
  {
    id: 'dargah-haji-ali',
    name: 'Haji Ali Dargah',
    arabicUrduName: 'درگاہ حاجی علی شاہ بخاری • ممبئی',
    type: 'dargah',
    city: 'Mumbai',
    country: 'India',
    region: 'South Asia',
    latitude: 18.9778,
    longitude: 72.8089,
    shortContent: 'World-famous offshore sanctuary of Pir Haji Ali Shah Bukhari (RA) set 500 meters into the Arabian Sea on an islet accessible via a causeway during low tide.',
    thumbnailUrl: '', // Uses official NOOR-E-ILAHI placeholder
    century: '1431 CE',
    architecturalStyle: 'Pure Makrana White Marble Indo-Islamic Offshore Shrine'
  },
  {
    id: 'data-darbar-lahore',
    name: 'Data Darbar (Hazrat Ali Hujwiri)',
    arabicUrduName: 'داتا دربار حضرت علی ہجویری داتا گنج بخش • لاہور',
    type: 'dargah',
    city: 'Lahore',
    country: 'Pakistan',
    region: 'South Asia',
    latitude: 31.5794,
    longitude: 74.3039,
    shortContent: 'One of the oldest and largest Sufi shrines in South Asia. Resting place of Ali Hujwiri (Data Ganj Bakhsh), author of the seminal Persian Sufi treatise Kashf al-Mahjub.',
    thumbnailUrl: '', // Uses official NOOR-E-ILAHI placeholder
    century: '1077 CE (465 AH)',
    architecturalStyle: 'Grand White Carved Marble Courtyard & Gold Inscriptions'
  },
  {
    id: 'shrine-imam-husayn-karbala',
    name: 'Shrine of Imam Husayn ibn Ali',
    arabicUrduName: 'الروضة الحسينية المقدسة • كربلاء المقدسة',
    type: 'dargah',
    city: 'Karbala',
    country: 'Iraq',
    region: 'Middle East',
    latitude: 32.6164,
    longitude: 44.0324,
    shortContent: 'The sacred resting place of Imam Husayn (RA), grandson of Prophet Muhammad (PBUH) and martyr of Karbala (680 CE). Destination of the annual Arbaeen pilgrimage.',
    thumbnailUrl: '', // Uses official NOOR-E-ILAHI placeholder
    century: '680 CE (61 AH)',
    architecturalStyle: 'Solid Gold Dome, Twin Gilded Minarets & Mirrored Glasswork'
  },
  {
    id: 'shrine-imam-ali-najaf',
    name: 'Shrine of Imam Ali ibn Abi Talib',
    arabicUrduName: 'الروضة الحيدرية الشريفة • النجف الأشرف',
    type: 'dargah',
    city: 'Najaf',
    country: 'Iraq',
    region: 'Middle East',
    latitude: 31.9961,
    longitude: 44.3142,
    shortContent: 'The holy sanctuary of Ali ibn Abi Talib (RA), cousin and son-in-law of Prophet Muhammad (PBUH) and fourth Righteous Caliph. Renowned for its solid gold dome.',
    thumbnailUrl: '', // Uses official NOOR-E-ILAHI placeholder
    century: '977 CE Established',
    architecturalStyle: 'Solid Gilded Dome & 7,777 Pure Gold Tiles'
  },
  {
    id: 'mevlana-rumi-konya',
    name: 'Mevlana Rumi Mausoleum & Museum',
    arabicUrduName: 'مقام مولانا جلال الدين الرومي • قونية',
    type: 'dargah',
    city: 'Konya',
    country: 'Turkey',
    region: 'Europe',
    latitude: 37.8707,
    longitude: 32.505,
    shortContent: 'The sacred tomb of Jalal al-Din Muhammad Rumi, world-celebrated mystic poet and master of the Mevlevi whirling dervishes. Marked by its iconic turquoise ribbed dome (Kubbe-i Hadra).',
    thumbnailUrl: '', // Uses official NOOR-E-ILAHI placeholder
    century: '1274 CE',
    architecturalStyle: 'Seljuk Fluted Turquoise Glazed Tile Dome'
  }
];

export default function IslamicMapScreen() {
  const router = useRouter();
  const { t } = useLanguage();
  const [activeType, setActiveType] = useState<MapPointType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPoint, setSelectedPoint] = useState<MobileMapPoint | null>(null);
  const [failedImageIds, setFailedImageIds] = useState<Record<string, boolean>>({});

  const filteredPoints = useMemo(() => {
    return MOBILE_MAP_POINTS.filter((p) => {
      const matchesType = activeType === 'all' || p.type === activeType;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.city.toLowerCase().includes(q) ||
        p.country.toLowerCase().includes(q) ||
        (p.arabicUrduName && p.arabicUrduName.toLowerCase().includes(q));

      return matchesType && matchesSearch;
    });
  }, [activeType, searchQuery]);

  const openNavigation = (lat: number, lng: number, label: string) => {
    const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
    const latLng = `${lat},${lng}`;
    const url =
      Platform.select({
        ios: `${scheme}${label}@${latLng}`,
        android: `${scheme}${latLng}(${label})`
      }) || `https://www.google.com/maps/search/?api=1&query=${latLng}`;

    Linking.openURL(url).catch(() => {
      Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${latLng}`);
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Top App Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backBtn}
          accessibilityLabel="Back"
        >
          <Ionicons name="chevron-back" size={24} color="#fef3c7" />
        </TouchableOpacity>

        <View style={styles.headerTitleBox}>
          <Text style={styles.headerTitle}>{t('islamicMap') || 'Islamic World Map'}</Text>
          <Text style={styles.headerSubtitle}>
            World Dargahs, Ziyarat Points & Mosques
          </Text>
        </View>

        <View style={styles.freeBadge}>
          <Text style={styles.freeBadgeText}>FREE MAP</Text>
        </View>
      </View>

      {/* Search Input */}
      <View style={styles.searchBar}>
        <Ionicons name="search" size={18} color="#6ee7b7" />
        <TextInput
          style={styles.searchInput}
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search world dargahs, mosques, or cities..."
          placeholderTextColor="rgba(110, 231, 183, 0.4)"
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <Ionicons name="close-circle" size={18} color="#6ee7b7" />
          </TouchableOpacity>
        )}
      </View>

      {/* Filter Chips */}
      <View style={styles.filterRow}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterScroll}>
          <TouchableOpacity
            style={[styles.filterChip, activeType === 'all' && styles.filterChipActive]}
            onPress={() => setActiveType('all')}
          >
            <Text style={[styles.filterChipText, activeType === 'all' && styles.filterChipTextActive]}>
              All ({MOBILE_MAP_POINTS.length})
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.filterChip, activeType === 'holy_site' && styles.filterChipActive]}
            onPress={() => setActiveType('holy_site')}
          >
            <Text style={[styles.filterChipText, activeType === 'holy_site' && styles.filterChipTextActive]}>
              🕋 Holy Sites
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.filterChip, activeType === 'mosque' && styles.filterChipActive]}
            onPress={() => setActiveType('mosque')}
          >
            <Text style={[styles.filterChipText, activeType === 'mosque' && styles.filterChipTextActive]}>
              🕌 Mosques
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.filterChip, activeType === 'dargah' && styles.filterChipActive]}
            onPress={() => setActiveType('dargah')}
          >
            <Text style={[styles.filterChipText, activeType === 'dargah' && styles.filterChipTextActive]}>
              🏛️ Dargahs & Ziyarat
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      {/* Sanctuaries List */}
      <ScrollView contentContainerStyle={styles.listContent} showsVerticalScrollIndicator={false}>
        {filteredPoints.map((point) => {
          const typeBadgeColor =
            point.type === 'mosque' ? '#10b981' : point.type === 'holy_site' ? '#f59e0b' : '#fbbf24';
          const typeLabel =
            point.type === 'mosque'
              ? '🕌 Historic Mosque'
              : point.type === 'holy_site'
              ? '🕋 Holy Sanctuary'
              : '🏛️ Sacred Dargah';

          return (
            <View key={point.id} style={styles.card}>
              {/* Image or Noor Placeholder */}
              <View style={styles.imageContainer}>
                {point.thumbnailUrl && !failedImageIds[point.id] ? (
                  <Image
                    source={{ uri: point.thumbnailUrl }}
                    style={styles.image}
                    resizeMode="cover"
                    onError={() => setFailedImageIds(prev => ({ ...prev, [point.id]: true }))}
                  />
                ) : (
                  <NoorPlaceholderImage title={point.name} type={point.type} height={160} />
                )}
                <View style={styles.typeBadge}>
                  <Text style={[styles.typeBadgeText, { color: typeBadgeColor }]}>{typeLabel}</Text>
                </View>
              </View>

              {/* Card Body */}
              <View style={styles.cardBody}>
                <Text style={styles.sanctuaryName}>{point.name}</Text>
                {point.arabicUrduName ? (
                  <Text style={styles.arabicName}>{point.arabicUrduName}</Text>
                ) : null}

                <View style={styles.locationRow}>
                  <Ionicons name="location" size={14} color="#f59e0b" />
                  <Text style={styles.locationText}>
                    {point.city}, {point.country}
                  </Text>
                  {point.century ? <Text style={styles.centuryText}>• {point.century}</Text> : null}
                </View>

                {point.architecturalStyle ? (
                  <Text style={styles.archText} numberOfLines={1}>
                    🏛️ {point.architecturalStyle}
                  </Text>
                ) : null}

                <Text style={styles.shortDesc} numberOfLines={3}>
                  {point.shortContent}
                </Text>

                {/* Actions */}
                <View style={styles.actionRow}>
                  <TouchableOpacity
                    style={styles.navigateBtn}
                    onPress={() => openNavigation(point.latitude, point.longitude, point.name)}
                    activeOpacity={0.8}
                  >
                    <Ionicons name="navigate" size={14} color="#021711" />
                    <Text style={styles.navigateBtnText}>Open in Maps</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.detailBtn}
                    onPress={() => router.navigate('/(tabs)/ziyarat')}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.detailBtnText}>View in Ziyarat →</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#02120d'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)'
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerTitleBox: {
    flex: 1,
    marginHorizontal: 12
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#fef3c7'
  },
  headerSubtitle: {
    fontSize: 10,
    color: '#6ee7b7',
    marginTop: 1
  },
  freeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    backgroundColor: 'rgba(16, 185, 129, 0.2)',
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.4)'
  },
  freeBadgeText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#34d399',
    letterSpacing: 1
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(2, 23, 17, 0.95)',
    marginHorizontal: 16,
    marginTop: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)'
  },
  searchInput: {
    flex: 1,
    color: '#ffffff',
    fontSize: 13,
    marginLeft: 8
  },
  filterRow: {
    marginVertical: 10
  },
  filterScroll: {
    paddingHorizontal: 16,
    gap: 8
  },
  filterChip: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)'
  },
  filterChipActive: {
    backgroundColor: '#f59e0b',
    borderColor: '#f59e0b'
  },
  filterChipText: {
    fontSize: 12,
    fontWeight: '700',
    color: 'rgba(255, 255, 255, 0.8)'
  },
  filterChipTextActive: {
    color: '#021711'
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 40,
    gap: 16
  },
  card: {
    backgroundColor: 'rgba(2, 23, 17, 0.95)',
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)'
  },
  imageContainer: {
    width: '100%',
    height: 160,
    backgroundColor: '#010b08',
    position: 'relative'
  },
  image: {
    width: '100%',
    height: '100%'
  },
  typeBadge: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: 'rgba(2, 23, 17, 0.92)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)'
  },
  typeBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5
  },
  cardBody: {
    padding: 14
  },
  sanctuaryName: {
    fontSize: 15,
    fontWeight: '800',
    color: '#ffffff',
    lineHeight: 20
  },
  arabicName: {
    fontSize: 13,
    color: '#fbbf24',
    marginVertical: 3
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4
  },
  locationText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6ee7b7'
  },
  centuryText: {
    fontSize: 11,
    color: 'rgba(255, 255, 255, 0.4)'
  },
  archText: {
    fontSize: 11,
    color: 'rgba(255, 255, 255, 0.6)',
    marginTop: 4
  },
  shortDesc: {
    fontSize: 12,
    lineHeight: 18,
    color: 'rgba(255, 255, 255, 0.75)',
    marginTop: 6
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 12,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.08)'
  },
  navigateBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: '#f59e0b',
    paddingVertical: 8,
    borderRadius: 12
  },
  navigateBtnText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#021711'
  },
  detailBtn: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)'
  },
  detailBtnText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#ffffff'
  }
});
