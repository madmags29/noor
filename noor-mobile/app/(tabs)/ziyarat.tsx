import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  Modal,
  Linking,
  Platform
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { THEME } from '../../src/theme';
import {
  MOBILE_SANCTUARIES,
  MOBILE_COUNTRIES,
  MOBILE_TARIQAS,
  MobileSanctuary
} from '../../src/data/mobileZiyaratData';
import { FloatingAiButton } from '../../src/components/FloatingAiButton';
import { AiAssistantModal } from '../../src/components/AiAssistantModal';
import { MobileMenuModal } from '../../src/components/MobileMenuModal';
import { useLanguage } from '../../src/context/LanguageContext';

export default function ZiyaratScreen() {
  const { t } = useLanguage();
  const [selectedCountry, setSelectedCountry] = useState('All Nations');
  const [selectedTariqa, setSelectedTariqa] = useState('All Lineages');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSanctuary, setSelectedSanctuary] = useState<MobileSanctuary | null>(null);
  const [showAiModal, setShowAiModal] = useState(false);
  const [showMenuModal, setShowMenuModal] = useState(false);

  // Filter sanctuaries
  const filteredSanctuaries = MOBILE_SANCTUARIES.filter(s => {
    const matchesCountry = selectedCountry === 'All Nations' || s.country === selectedCountry;
    const matchesTariqa = selectedTariqa === 'All Lineages' || s.spiritualLineage.includes(selectedTariqa);
    const q = searchQuery.toLowerCase();
    const matchesSearch = !q ||
      s.name.toLowerCase().includes(q) ||
      s.arabicName.toLowerCase().includes(q) ||
      s.city.toLowerCase().includes(q) ||
      s.country.toLowerCase().includes(q) ||
      s.titleHonorific.toLowerCase().includes(q);

    return matchesCountry && matchesTariqa && matchesSearch;
  });

  const openInMaps = (lat: number, lng: number, label: string) => {
    const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
    const latLng = `${lat},${lng}`;
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`
    }) || `https://www.google.com/maps/search/?api=1&query=${latLng}`;

    Linking.openURL(url).catch(() => {
      Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${latLng}`);
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Top Header */}
        <View style={styles.header}>
          <View style={styles.badgeRow}>
            <View style={styles.verifiedBadge}>
              <MaterialCommunityIcons name="shield-check" size={14} color={THEME.colors.goldPrimary} />
              <Text style={styles.verifiedText}>100% SCHOLARLY VERIFIED</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 7 }}>
              <Text style={styles.countPill}>{filteredSanctuaries.length} Sanctuaries</Text>
              <TouchableOpacity
                style={styles.menuBtn}
                onPress={() => setShowMenuModal(true)}
                activeOpacity={0.8}
                accessibilityLabel="Open Menu"
              >
                <Ionicons name="menu" size={22} color="#ffffff" />
              </TouchableOpacity>
            </View>
          </View>

          <Text style={styles.pageTitle}>{t('ziyarat')}</Text>
          <Text style={styles.pageSubtitle}>
            {t('sanctuariesDirectory')}
          </Text>
        </View>

        {/* Search Bar */}
        <View style={styles.searchBar}>
          <Ionicons name="search" size={18} color={THEME.colors.emeraldSubtle} />
          <TextInput
            style={styles.searchInput}
            placeholder={t('searchSanctuaries')}
            placeholderTextColor="rgba(110, 231, 183, 0.4)"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={18} color={THEME.colors.goldPrimary} />
            </TouchableOpacity>
          )}
        </View>

        {/* Country Filter Pills (Horizontal Scroll) */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.countryScroll}
        >
          {MOBILE_COUNTRIES.map((c) => {
            const isActive = selectedCountry === c.name;
            return (
              <TouchableOpacity
                key={c.name}
                style={[styles.countryPill, isActive && styles.countryPillActive]}
                onPress={() => setSelectedCountry(c.name)}
              >
                <Text style={styles.countryFlag}>{c.flag}</Text>
                <Text style={[styles.countryName, isActive && styles.countryNameActive]}>
                  {c.name}
                </Text>
                <View style={[styles.miniCount, isActive && styles.miniCountActive]}>
                  <Text style={[styles.miniCountText, isActive && styles.miniCountTextActive]}>
                    {c.count}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Tariqa / Lineage Filter Pills */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tariqaScroll}
        >
          {MOBILE_TARIQAS.map((t) => {
            const isActive = selectedTariqa === t;
            return (
              <TouchableOpacity
                key={t}
                style={[styles.tariqaPill, isActive && styles.tariqaPillActive]}
                onPress={() => setSelectedTariqa(t)}
              >
                <Text style={[styles.tariqaText, isActive && styles.tariqaTextActive]}>
                  {t}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Prophetic Greeting Card */}
        <View style={styles.hadithGreetingCard}>
          <View style={styles.greetingHeader}>
            <Ionicons name="volume-medium-outline" size={16} color={THEME.colors.goldPrimary} />
            <Text style={styles.greetingLabel}>PROPHETIC ZIYARAT GREETING</Text>
          </View>
          <Text style={styles.greetingArabic}>
            السَّلَامُ عَلَيْكُمْ دَارَ قَوْمٍ مُؤْمِنِينَ، وَإِنَّا إِنْ شَاءَ اللَّهُ بِكُمْ لَاحِقُونَ
          </Text>
          <Text style={styles.greetingTrans}>
            "Peace be upon you, O dwellers of the abode of believers! Indeed, if Allah wills, we shall soon join you."
          </Text>
          <Text style={styles.greetingSource}>Sahih Muslim 249</Text>
        </View>

        {/* Sanctuaries List */}
        <View style={styles.sanctuariesList}>
          {filteredSanctuaries.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.card}
              activeOpacity={0.9}
              onPress={() => setSelectedSanctuary(item)}
            >
              {/* Sanctuary Image */}
              <View style={styles.imageContainer}>
                <Image
                  source={{ uri: item.imageUrl }}
                  style={styles.cardImage}
                  resizeMode="cover"
                />
                <View style={styles.imageOverlay} />

                {/* Badges on Image */}
                <View style={styles.imageTopRow}>
                  <View style={styles.lineageBadge}>
                    <Text style={styles.lineageText}>{item.spiritualLineage}</Text>
                  </View>
                  <View style={styles.countryBadge}>
                    <Text style={styles.countryBadgeText}>
                      {item.countryFlag} {item.country}
                    </Text>
                  </View>
                </View>

                {/* Bottom title on image */}
                <View style={styles.imageBottomRow}>
                  <Text style={styles.honorificText}>{item.titleHonorific}</Text>
                  <Text style={styles.sanctuaryName}>{item.name}</Text>
                </View>
              </View>

              {/* Card Body */}
              <View style={styles.cardBody}>
                <Text style={styles.cardArabic}>{item.arabicName}</Text>

                <View style={styles.metaRow}>
                  <View style={styles.metaItem}>
                    <Ionicons name="location-outline" size={14} color={THEME.colors.emeraldSubtle} />
                    <Text style={styles.metaText}>{item.city}, {item.region}</Text>
                  </View>

                  <View style={styles.metaItem}>
                    <Ionicons name="calendar-outline" size={14} color={THEME.colors.goldPrimary} />
                    <Text style={styles.metaTextGold}>Urs: {item.ursDateHijri}</Text>
                  </View>
                </View>

                <Text style={styles.cardDesc} numberOfLines={2}>
                  {item.historicalSignificance}
                </Text>

                {/* Card Action Buttons */}
                <View style={styles.cardActions}>
                  <TouchableOpacity
                    style={styles.detailBtn}
                    onPress={() => setSelectedSanctuary(item)}
                  >
                    <Text style={styles.detailBtnText}>Explore Sanctuary →</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.mapBtn}
                    onPress={() => openInMaps(item.lat, item.lng, item.name)}
                  >
                    <Ionicons name="navigate-outline" size={16} color={THEME.colors.goldPrimary} />
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Floating Ask AI Button */}
      <FloatingAiButton onPress={() => setShowAiModal(true)} />

      {/* AI Assistant Modal */}
      <AiAssistantModal
        visible={showAiModal}
        onClose={() => setShowAiModal(false)}
      />

      {/* Sanctuary Detail Full Modal */}
      {selectedSanctuary && (
        <Modal visible={!!selectedSanctuary} animationType="slide" transparent>
          <SafeAreaView style={styles.modalBackdrop}>
            <View style={styles.modalContent}>
              {/* Modal Header */}
              <View style={styles.modalHeader}>
                <View style={styles.modalHeaderLeft}>
                  <Text style={styles.modalHeaderCountry}>
                    {selectedSanctuary.countryFlag} {selectedSanctuary.country} • {selectedSanctuary.spiritualLineage}
                  </Text>
                  <Text style={styles.modalHeaderTitle} numberOfLines={1}>
                    {selectedSanctuary.name}
                  </Text>
                </View>

                <TouchableOpacity
                  style={styles.modalCloseBtn}
                  onPress={() => setSelectedSanctuary(null)}
                >
                  <Ionicons name="close" size={20} color={THEME.colors.textWhite} />
                </TouchableOpacity>
              </View>

              <ScrollView contentContainerStyle={styles.modalScroll} showsVerticalScrollIndicator={false}>
                {/* Hero Image */}
                <Image
                  source={{ uri: selectedSanctuary.imageUrl }}
                  style={styles.modalHeroImage}
                  resizeMode="cover"
                />

                {/* Arabic Calligraphy & Honorifics */}
                <View style={styles.modalSection}>
                  <Text style={styles.modalArabicText}>{selectedSanctuary.arabicName}</Text>
                  <Text style={styles.modalHonorificText}>{selectedSanctuary.titleHonorific}</Text>
                </View>

                {/* Location & Navigation Action */}
                <View style={styles.modalNavRow}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.modalNavCity}>
                      📍 {selectedSanctuary.city}, {selectedSanctuary.region}
                    </Text>
                    <Text style={styles.modalNavCoords}>
                      GPS: {selectedSanctuary.lat.toFixed(4)}° N, {selectedSanctuary.lng.toFixed(4)}° E
                    </Text>
                  </View>

                  <TouchableOpacity
                    style={styles.modalGetDirectionsBtn}
                    onPress={() => openInMaps(selectedSanctuary.lat, selectedSanctuary.lng, selectedSanctuary.name)}
                  >
                    <Ionicons name="navigate" size={15} color={THEME.colors.textDark} />
                    <Text style={styles.modalGetDirectionsText}>Get Directions</Text>
                  </TouchableOpacity>
                </View>

                {/* Historical Chronicles */}
                <View style={styles.modalSection}>
                  <Text style={styles.modalSectionTitle}>Historical Chronicles</Text>
                  <Text style={styles.modalBodyText}>{selectedSanctuary.historicalSignificance}</Text>
                </View>

                {/* Visiting Etiquette (Adab) */}
                <View style={styles.modalSection}>
                  <Text style={styles.modalSectionTitle}>Visiting Etiquette (Adab al-Ziyarat)</Text>
                  {selectedSanctuary.visitingEtiquette.map((rule, idx) => (
                    <View key={idx} style={styles.etiquetteRow}>
                      <Ionicons name="checkmark-circle" size={16} color={THEME.colors.goldPrimary} />
                      <Text style={styles.etiquetteText}>{rule}</Text>
                    </View>
                  ))}
                </View>

                {/* Dress Code & Primary Source */}
                <View style={styles.modalInfoCard}>
                  <View style={styles.infoCardRow}>
                    <Ionicons name="shirt-outline" size={16} color={THEME.colors.emeraldSubtle} />
                    <Text style={styles.infoCardText}>
                      <Text style={{ fontWeight: '800' }}>Dress Code: </Text>
                      {selectedSanctuary.dressCode}
                    </Text>
                  </View>

                  <View style={styles.infoCardRow}>
                    <Ionicons name="library-outline" size={16} color={THEME.colors.goldLight} />
                    <Text style={styles.infoCardText}>
                      <Text style={{ fontWeight: '800' }}>Primary Source: </Text>
                      {selectedSanctuary.primarySource}
                    </Text>
                  </View>
                </View>
              </ScrollView>
            </View>
          </SafeAreaView>
        </Modal>
      )}

      {/* Side Menu Drawer Modal */}
      <MobileMenuModal
        visible={showMenuModal}
        onClose={() => setShowMenuModal(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: THEME.colors.bgDark,
  },
  scrollContent: {
    paddingBottom: 90,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
  },
  menuBtn: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(245, 158, 11, 0.12)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: THEME.colors.goldBorder,
  },
  verifiedText: {
    fontSize: 10,
    fontWeight: '800',
    color: THEME.colors.goldLight,
    letterSpacing: 0.5,
  },
  countPill: {
    fontSize: 12,
    fontWeight: '700',
    color: THEME.colors.emeraldSubtle,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: THEME.colors.textWhite,
  },
  pageSubtitle: {
    fontSize: 12,
    color: THEME.colors.textMuted,
    marginTop: 4,
    lineHeight: 18,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginHorizontal: 20,
    backgroundColor: THEME.colors.bgCard,
    borderWidth: 1,
    borderColor: THEME.colors.borderSubtle,
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginTop: 6,
  },
  searchInput: {
    flex: 1,
    color: THEME.colors.textWhite,
    fontSize: 13,
  },
  countryScroll: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    gap: 8,
  },
  countryPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  countryPillActive: {
    backgroundColor: 'rgba(245, 158, 11, 0.2)',
    borderColor: THEME.colors.goldBorder,
  },
  countryFlag: {
    fontSize: 14,
  },
  countryName: {
    fontSize: 12,
    fontWeight: '700',
    color: THEME.colors.textMuted,
  },
  countryNameActive: {
    color: THEME.colors.goldPrimary,
  },
  miniCount: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  miniCountActive: {
    backgroundColor: THEME.colors.goldPrimary,
  },
  miniCountText: {
    fontSize: 10,
    color: THEME.colors.textWhite,
    fontWeight: '800',
  },
  miniCountTextActive: {
    color: THEME.colors.textDark,
  },
  tariqaScroll: {
    paddingHorizontal: 20,
    paddingBottom: 12,
    gap: 6,
  },
  tariqaPill: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: 'rgba(6, 44, 33, 0.6)',
    borderWidth: 1,
    borderColor: 'rgba(52, 211, 153, 0.15)',
  },
  tariqaPillActive: {
    borderColor: THEME.colors.goldPrimary,
    backgroundColor: 'rgba(245, 158, 11, 0.15)',
  },
  tariqaText: {
    fontSize: 11,
    fontWeight: '700',
    color: THEME.colors.emeraldSubtle,
  },
  tariqaTextActive: {
    color: THEME.colors.goldLight,
  },
  hadithGreetingCard: {
    marginHorizontal: 20,
    marginBottom: 16,
    padding: 14,
    borderRadius: 18,
    backgroundColor: 'rgba(4, 35, 27, 0.7)',
    borderWidth: 1,
    borderColor: 'rgba(52, 211, 153, 0.2)',
  },
  greetingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },
  greetingLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: THEME.colors.goldPrimary,
    letterSpacing: 0.8,
  },
  greetingArabic: {
    fontSize: 16,
    color: THEME.colors.textWhite,
    lineHeight: 26,
    textAlign: 'right',
    fontWeight: '700',
    marginBottom: 6,
  },
  greetingTrans: {
    fontSize: 12,
    color: THEME.colors.textMuted,
    fontStyle: 'italic',
    lineHeight: 18,
  },
  greetingSource: {
    fontSize: 10,
    color: THEME.colors.goldLight,
    marginTop: 4,
    fontWeight: '700',
  },
  sanctuariesList: {
    paddingHorizontal: 20,
    gap: 16,
  },
  card: {
    backgroundColor: THEME.colors.bgCard,
    borderRadius: 22,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: THEME.colors.borderSubtle,
  },
  imageContainer: {
    height: 170,
    position: 'relative',
    justifyContent: 'space-between',
    padding: 12,
  },
  cardImage: {
    ...StyleSheet.absoluteFill,
  },
  imageOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
  },
  imageTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lineageBadge: {
    backgroundColor: THEME.colors.goldPrimary,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  lineageText: {
    fontSize: 10,
    fontWeight: '900',
    color: THEME.colors.textDark,
  },
  countryBadge: {
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  countryBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: THEME.colors.textWhite,
  },
  imageBottomRow: {
    gap: 2,
  },
  honorificText: {
    fontSize: 10,
    fontWeight: '800',
    color: THEME.colors.goldLight,
    letterSpacing: 0.5,
  },
  sanctuaryName: {
    fontSize: 17,
    fontWeight: '900',
    color: THEME.colors.textWhite,
  },
  cardBody: {
    padding: 14,
  },
  cardArabic: {
    fontSize: 13,
    color: THEME.colors.emeraldSubtle,
    textAlign: 'right',
    marginBottom: 8,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 11,
    color: THEME.colors.textMuted,
  },
  metaTextGold: {
    fontSize: 11,
    color: THEME.colors.goldLight,
    fontWeight: '700',
  },
  cardDesc: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
    lineHeight: 18,
    marginBottom: 12,
  },
  cardActions: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  detailBtn: {
    flex: 1,
    backgroundColor: 'rgba(245, 158, 11, 0.15)',
    borderWidth: 1,
    borderColor: THEME.colors.goldBorder,
    paddingVertical: 10,
    borderRadius: 14,
    alignItems: 'center',
  },
  detailBtnText: {
    fontSize: 12,
    fontWeight: '800',
    color: THEME.colors.goldPrimary,
  },
  mapBtn: {
    width: 38,
    height: 38,
    borderRadius: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: THEME.colors.bgModalGlass,
  },
  modalContent: {
    flex: 1,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: THEME.colors.divider,
  },
  modalHeaderLeft: {
    flex: 1,
    marginRight: 10,
  },
  modalHeaderCountry: {
    fontSize: 11,
    color: THEME.colors.goldLight,
    fontWeight: '800',
  },
  modalHeaderTitle: {
    fontSize: 16,
    fontWeight: '900',
    color: THEME.colors.textWhite,
  },
  modalCloseBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalScroll: {
    padding: 18,
    gap: 16,
  },
  modalHeroImage: {
    width: '100%',
    height: 200,
    borderRadius: 18,
  },
  modalSection: {
    backgroundColor: THEME.colors.bgCard,
    padding: 16,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: THEME.colors.borderSubtle,
    gap: 8,
  },
  modalArabicText: {
    fontSize: 17,
    color: THEME.colors.goldLight,
    textAlign: 'right',
    fontWeight: '700',
  },
  modalHonorificText: {
    fontSize: 12,
    color: THEME.colors.emeraldSubtle,
    fontStyle: 'italic',
  },
  modalNavRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(6, 44, 33, 0.7)',
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: THEME.colors.borderSubtle,
  },
  modalNavCity: {
    fontSize: 13,
    fontWeight: '800',
    color: THEME.colors.textWhite,
  },
  modalNavCoords: {
    fontSize: 10,
    color: THEME.colors.emeraldSubtle,
    marginTop: 2,
  },
  modalGetDirectionsBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: THEME.colors.goldPrimary,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
  },
  modalGetDirectionsText: {
    fontSize: 12,
    fontWeight: '900',
    color: THEME.colors.textDark,
  },
  modalSectionTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: THEME.colors.goldPrimary,
    letterSpacing: 0.5,
  },
  modalBodyText: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.85)',
    lineHeight: 20,
  },
  etiquetteRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    marginTop: 4,
  },
  etiquetteText: {
    flex: 1,
    fontSize: 12,
    color: THEME.colors.textWhite,
    lineHeight: 18,
  },
  modalInfoCard: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 16,
    padding: 14,
    gap: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  infoCardRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  infoCardText: {
    flex: 1,
    fontSize: 12,
    color: THEME.colors.textMuted,
    lineHeight: 18,
  },
});
