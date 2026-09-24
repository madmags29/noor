import React, { useState, useMemo, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  Modal,
  ScrollView,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { FloatingAiButton } from '../../src/components/FloatingAiButton';
import { AiAssistantModal } from '../../src/components/AiAssistantModal';
import { MobileMenuModal } from '../../src/components/MobileMenuModal';
import { useLanguage } from '../../src/context/LanguageContext';

import { CANONICAL_SURAHS } from '../../src/data/quranFullCatalog';

interface SurahItem {
  number: number;
  name: string;
  englishName: string;
  translation: string;
  ayahs: number;
  type: 'Meccan' | 'Medinan';
  popular?: boolean;
  juz?: number;
  sampleAyahs?: {
    num: number;
    arabic: string;
    english: string;
  }[];
}

const SAMPLE_AYAHS_MAP: Record<number, { num: number; arabic: string; english: string }[]> = {
  1: [
    { num: 1, arabic: "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ", english: "In the name of Allah, the Entirely Merciful, the Especially Merciful." },
    { num: 2, arabic: "ٱلْحَمْدُ لِلَّهِ رَبِّ ٱلْعَٰلَمِينَ", english: "[All] praise is [due] to Allah, Lord of the worlds." },
    { num: 3, arabic: "ٱلرَّحْمَٰنِ ٱلرَّحِيمِ", english: "The Entirely Merciful, the Especially Merciful." },
    { num: 4, arabic: "مَٰلِكِ يَوْمِ ٱلدِّينِ", english: "Sovereign of the Day of Recompense." },
    { num: 5, arabic: "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ", english: "It is You we worship and You we ask for help." },
    { num: 6, arabic: "ٱهْدِنَا ٱلصِّرَٰطَ ٱلْمُسْتَقِيمَ", english: "Guide us to the straight path." },
    { num: 7, arabic: "صِرَٰطَ ٱلَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ ٱلْمَغْضُوبِ عَلَيْهِمْ وَلَا ٱلضَّآلِّينَ", english: "The path of those upon whom You have bestowed favor, not of those who have evoked [Your] anger or of those who are astray." }
  ],
  2: [
    { num: 1, arabic: "الٓمٓ", english: "Alif, Lam, Meem." },
    { num: 2, arabic: "ذَٰلِكَ ٱلْكِتَٰبُ لَا رَيْبَ ۛ فِيهِ ۛ هُدًى لِّلْمُتَّقِينَ", english: "This is the Book about which there is no doubt, a guidance for those conscious of Allah." },
    { num: 255, arabic: "ٱللَّهُ لَآ إِلَٰهَ إِلَّا هُوَ ٱلْحَىُّ ٱلْقَيُّومُ ۚ لَا تَأْخُذُهُۥ سِنَةٌ وَلَا نَوْمٌ ۚ لَّهُۥ مَا فِى ٱلسَّمَٰوَٰتِ وَمَا فِى ٱلْأَرْضِ", english: "Allah - there is no deity except Him, the Ever-Living, the Sustainer of [all] existence. Neither drowsiness overtakes Him nor sleep." }
  ],
  18: [
    { num: 1, arabic: "ٱلْحَمْدُ لِلَّهِ ٱلَّذِىٓ أَنزَلَ عَلَىٰ عَبْدِهِ ٱلْكِتَٰبَ وَلَمْ يَجْعَل لَّهُۥ عِوَجَاۜ", english: "[All] praise is [due] to Allah, who has sent down upon His Servant the Book and has not made therein any deviance." },
    { num: 10, arabic: "إِذْ أَوَى ٱلْفِتْيَةُ إِلَى ٱلْكَهْفِ فَقَالُوا۟ رَبَّنَآ ءَاتِنَا مِن لَّدُنكَ رَحْمَةً وَهَيِّئْ لَنَا مِنْ أَمْرِنَا رَشَدًا", english: "When the youths retreated to the cave and said, 'Our Lord, grant us from Yourself mercy and prepare for us from our affair right guidance.'" }
  ],
  36: [
    { num: 1, arabic: "يسٓ", english: "Ya, Seen." },
    { num: 2, arabic: "وَٱلْقُرْءَانِ ٱلْحَكِيمِ", english: "By the wise Qur'an." },
    { num: 3, arabic: "إِنَّكَ لَمِنَ ٱلْمُرْسَلِينَ", english: "Indeed you, [O Muhammad], are from among the messengers." }
  ],
  55: [
    { num: 1, arabic: "ٱلرَّحْمَٰنُ", english: "The Most Merciful." },
    { num: 2, arabic: "عَلَّمَ ٱلْقُرْءَانَ", english: "Taught the Qur'an," },
    { num: 13, arabic: "فَبِأَىِّ ءَالَآءِ رَبِّكُمَا تُكَذِّبَانِ", english: "So which of the favors of your Lord would you deny?" }
  ],
  67: [
    { num: 1, arabic: "تَبَٰرَكَ ٱلَّذِى بِيَدِهِ ٱلْمُلْكُ وَوَهُوَ عَلَىٰ كُلِّ شَىْءٍ قَدِيرٌ", english: "Blessed is He in whose hand is dominion, and He is over all things competent -" },
    { num: 2, arabic: "ٱلَّذِى خَلَقَ ٱلْمَوْتَ وَٱلْحَيَوٰةَ لِيَبْلُوَكُمْ أَيُّكُمْ أَحْسَنُ عَمَلًا", english: "[He] who created death and life to test you [as to] which of you is best in deed." }
  ],
  112: [
    { num: 1, arabic: "قُلْ هُوَ ٱللَّهُ أَحَدٌ", english: "Say, 'He is Allah, [who is] One,'" },
    { num: 2, arabic: "ٱللَّهُ ٱلصَّمَدُ", english: "Allah, the Eternal Refuge." },
    { num: 3, arabic: "لَمْ يَلِدْ وَلَمْ يُولَدْ", english: "He neither begets nor is born," },
    { num: 4, arabic: "وَلَمْ يَكُن لَّهُۥ كُفُوًا أَحَدٌۢ", english: "Nor is there to Him any equivalent." }
  ],
  113: [
    { num: 1, arabic: "قُلْ أَعُوذُ بِرَبِّ ٱلْفَلَقِ", english: "Say, 'I seek refuge in the Lord of daybreak'" },
    { num: 2, arabic: "مِن شَرِّ مَا خَلَقَ", english: "From the evil of that which He created" }
  ],
  114: [
    { num: 1, arabic: "قُلْ أَعُوذُ بِرَبِّ ٱلنَّاسِ", english: "Say, 'I seek refuge in the Lord of mankind,'" },
    { num: 2, arabic: "مَلِكِ ٱلنَّاسِ", english: "The Sovereign of mankind." },
    { num: 3, arabic: "إِلَٰهِ ٱلنَّاسِ", english: "The God of mankind." }
  ]
};

const SURAH_LIST: SurahItem[] = CANONICAL_SURAHS.map((s) => ({
  ...s,
  sampleAyahs: SAMPLE_AYAHS_MAP[s.number],
}));

export default function QuranScreen() {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'All' | 'Popular' | 'Meccan' | 'Medinan'>('All');
  const [selectedSurah, setSelectedSurah] = useState<SurahItem | null>(null);
  const [readerModalVisible, setReaderModalVisible] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [showMenuModal, setShowMenuModal] = useState(false);
  const [bookmarkedSurahs, setBookmarkedSurahs] = useState<number[]>([1, 18, 67]);
  const [lastRead, setLastRead] = useState<{ surahNumber: number; surahName: string; ayah: number } | null>(null);

  useEffect(() => {
    AsyncStorage.getItem('@noor_quran_last_read').then(val => {
      if (val) {
        try {
          setLastRead(JSON.parse(val));
        } catch {}
      }
    }).catch(() => {});
  }, []);

  const filteredSurahs = useMemo(() => {
    return SURAH_LIST.filter(surah => {
      const matchesSearch =
        surah.englishName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        surah.translation.toLowerCase().includes(searchQuery.toLowerCase()) ||
        surah.name.includes(searchQuery) ||
        surah.number.toString().includes(searchQuery);

      if (!matchesSearch) return false;

      if (activeFilter === 'Popular') return surah.popular;
      if (activeFilter === 'Meccan') return surah.type === 'Meccan';
      if (activeFilter === 'Medinan') return surah.type === 'Medinan';
      return true;
    });
  }, [searchQuery, activeFilter]);

  const toggleBookmark = (num: number) => {
    setBookmarkedSurahs(prev =>
      prev.includes(num) ? prev.filter(x => x !== num) : [...prev, num]
    );
  };

  const openSurahReader = (surah: SurahItem, ayahNum: number = 1) => {
    setSelectedSurah(surah);
    setIsPlayingAudio(false);
    setReaderModalVisible(true);
    const data = { surahNumber: surah.number, surahName: surah.englishName, ayah: ayahNum };
    setLastRead(data);
    AsyncStorage.setItem('@noor_quran_last_read', JSON.stringify(data)).catch(() => {});
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#02120d" />
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View style={{ flex: 1, marginRight: 8 }}>
            <Text style={styles.title}>{t('quran')}</Text>
            <Text style={styles.subtitle} numberOfLines={1}>الْقُرْآن الْكَرِيم • {t('nobleScripture')}</Text>
          </View>
          <View style={styles.headerRightActions}>
            <View style={styles.badgeQari}>
              <Ionicons name="mic-outline" size={13} color="#f59e0b" />
              <Text style={styles.qariText}>Alafasy</Text>
            </View>
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

        {/* Search Bar */}
        <View style={styles.searchBar}>
          <Ionicons name="search-outline" size={18} color="#10b981" />
          <TextInput
            placeholder={t('searchSurahPlaceholder')}
            placeholderTextColor="rgba(110, 231, 183, 0.45)"
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={styles.searchInput}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={18} color="#6ee7b7" />
            </TouchableOpacity>
          )}
        </View>

        {/* Filter Pills */}
        <View style={styles.filterRow}>
          {(['All', 'Popular', 'Meccan', 'Medinan'] as const).map((filter) => {
            const label =
              filter === 'All'
                ? t('filterAll')
                : filter === 'Meccan'
                ? t('filterMeccan')
                : filter === 'Medinan'
                ? t('filterMedinan')
                : '⭐ Popular';
            return (
              <TouchableOpacity
                key={filter}
                style={[styles.filterPill, activeFilter === filter && styles.filterPillActive]}
                onPress={() => setActiveFilter(filter)}
              >
                <Text style={[styles.filterPillText, activeFilter === filter && styles.filterPillTextActive]}>
                  {label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Continue Exactly Where User Left Off Banner */}
        {lastRead && (
          <TouchableOpacity
            style={styles.resumeCard}
            activeOpacity={0.85}
            onPress={() => {
              const target = SURAH_LIST.find(s => s.number === lastRead.surahNumber);
              if (target) openSurahReader(target, lastRead.ayah);
            }}
          >
            <View style={styles.resumeLeft}>
              <View style={styles.resumeIconWrap}>
                <Ionicons name="bookmark" size={16} color="#02120d" />
              </View>
              <View style={{ flex: 1 }}>
                <View style={styles.resumeBadgeRow}>
                  <Text style={styles.resumeBadgeText}>CONTINUE READING</Text>
                  <Text style={styles.resumeAyahBadge}>Ayah {lastRead.ayah}</Text>
                </View>
                <Text style={styles.resumeSurahName}>{lastRead.surahName}</Text>
                <Text style={styles.resumeSub}>Surah #{lastRead.surahNumber} • Tap to resume immediately</Text>
              </View>
            </View>
            <View style={styles.resumeActionBtn}>
              <Ionicons name="arrow-forward-circle" size={26} color="#f59e0b" />
            </View>
          </TouchableOpacity>
        )}

        {/* Surahs List */}
        <FlatList
          data={filteredSurahs}
          keyExtractor={(item) => item.number.toString()}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => {
            const isBookmarked = bookmarkedSurahs.includes(item.number);
            return (
              <TouchableOpacity
                style={styles.surahCard}
                activeOpacity={0.82}
                onPress={() => openSurahReader(item)}
              >
                <View style={styles.cardLeft}>
                  <View style={styles.numberBadge}>
                    <Text style={styles.numberText}>{item.number}</Text>
                  </View>
                  <View style={styles.surahMeta}>
                    <View style={styles.titleRow}>
                      <Text style={styles.englishName}>{item.englishName}</Text>
                      {item.popular && (
                        <View style={styles.popularTag}>
                          <Text style={styles.popularTagText}>Recited</Text>
                        </View>
                      )}
                    </View>
                    <Text style={styles.translationText}>{item.translation}</Text>
                    <View style={styles.tagRow}>
                      <Text style={styles.typeBadge}>
                        {item.type === 'Meccan' ? '🕋 Makkah' : '🕌 Madinah'}
                      </Text>
                      <Text style={styles.dot}>•</Text>
                      <Text style={styles.ayahsCount}>{item.ayahs} {t('versesCount')}</Text>
                    </View>
                  </View>
                </View>

                <View style={styles.cardRight}>
                  <Text style={styles.arabicName}>{item.name}</Text>
                  <TouchableOpacity
                    onPress={() => toggleBookmark(item.number)}
                    hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                  >
                    <Ionicons
                      name={isBookmarked ? 'bookmark' : 'bookmark-outline'}
                      size={18}
                      color={isBookmarked ? '#f59e0b' : 'rgba(110, 231, 183, 0.4)'}
                    />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            );
          }}
        />

        {/* Reader Modal */}
        {selectedSurah && (
          <Modal
            visible={readerModalVisible}
            animationType="slide"
            presentationStyle="pageSheet"
            onRequestClose={() => setReaderModalVisible(false)}
          >
            <View style={styles.modalRoot}>
              {/* Modal Top Bar */}
              <View style={styles.modalHeader}>
                <TouchableOpacity
                  onPress={() => setReaderModalVisible(false)}
                  style={styles.closeButton}
                >
                  <Ionicons name="chevron-down" size={22} color="#ffffff" />
                </TouchableOpacity>

                <View style={styles.modalTitleContainer}>
                  <Text style={styles.modalTitle}>{selectedSurah.englishName}</Text>
                  <Text style={styles.modalSub}>{selectedSurah.ayahs} {t('ayahsCount')} • {selectedSurah.type}</Text>
                </View>

                <TouchableOpacity
                  onPress={() => toggleBookmark(selectedSurah.number)}
                  style={styles.bookmarkBtn}
                >
                  <Ionicons
                    name={bookmarkedSurahs.includes(selectedSurah.number) ? 'bookmark' : 'bookmark-outline'}
                    size={20}
                    color="#f59e0b"
                  />
                </TouchableOpacity>
              </View>

              <ScrollView
                style={styles.modalScroll}
                contentContainerStyle={styles.modalScrollContent}
                showsVerticalScrollIndicator={false}
              >
                {/* Surah Banner Card */}
                <View style={styles.surahBanner}>
                  <Text style={styles.bannerArabicTitle}>{selectedSurah.name}</Text>
                  <Text style={styles.bannerEnglishMeaning}>{selectedSurah.translation}</Text>
                  <View style={styles.bannerMetaRow}>
                    <Text style={styles.bannerMetaText}>Surah #{selectedSurah.number}</Text>
                    <Text style={styles.bannerMetaDot}>•</Text>
                    <Text style={styles.bannerMetaText}>{selectedSurah.type} {t('revelation')}</Text>
                  </View>
                </View>

                {/* Audio Recitation Player Bar */}
                <View style={styles.audioPlayerCard}>
                  <View style={styles.audioInfo}>
                    <Ionicons name="musical-notes" size={20} color="#f59e0b" />
                    <View style={{ marginLeft: 10 }}>
                      <Text style={styles.audioQari}>Sheikh Mishary Rashid Alafasy</Text>
                      <Text style={styles.audioState}>
                        {isPlayingAudio ? t('pauseRecitation') : t('listenReciter')}
                      </Text>
                    </View>
                  </View>
                  <TouchableOpacity
                    style={[styles.audioPlayBtn, isPlayingAudio && styles.audioPlayBtnActive]}
                    onPress={() => setIsPlayingAudio(!isPlayingAudio)}
                  >
                    <Ionicons
                      name={isPlayingAudio ? 'pause' : 'play'}
                      size={20}
                      color="#031712"
                    />
                  </TouchableOpacity>
                </View>

                {/* Bismillah calligraphy header (except Surah At-Tawbah) */}
                {selectedSurah.number !== 9 && (
                  <View style={styles.bismillahBox}>
                    <Text style={styles.bismillahArabic}>بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ</Text>
                    <Text style={styles.bismillahTrans}>
                      {t('bismillahTranslation')}
                    </Text>
                  </View>
                )}

                {/* Verses Container */}
                <View style={styles.versesContainer}>
                  {selectedSurah.sampleAyahs && selectedSurah.sampleAyahs.length > 0 ? (
                    selectedSurah.sampleAyahs.map((ayah) => (
                      <View key={ayah.num} style={styles.ayahCard}>
                        <View style={styles.ayahTopRow}>
                          <View style={styles.ayahBadge}>
                            <Text style={styles.ayahBadgeText}>{selectedSurah.number}:{ayah.num}</Text>
                          </View>
                          <TouchableOpacity>
                            <Ionicons name="share-outline" size={16} color="#6ee7b7" />
                          </TouchableOpacity>
                        </View>
                        <Text style={styles.ayahArabicText}>{ayah.arabic}</Text>
                        <Text style={styles.ayahEnglishText}>{ayah.english}</Text>
                      </View>
                    ))
                  ) : (
                    <View style={styles.emptyVersesBox}>
                      <Ionicons name="book-outline" size={32} color="#f59e0b" />
                      <Text style={styles.emptyTitle}>Full Recitation Mode</Text>
                      <Text style={styles.emptyDesc}>
                        Stream full high-definition recitation recited verse-by-verse by Mishary Rashid Alafasy with word-by-word tajweed.
                      </Text>
                      <TouchableOpacity
                        style={styles.listenFullBtn}
                        onPress={() => setIsPlayingAudio(true)}
                      >
                        <Ionicons name="play-circle" size={18} color="#031712" />
                        <Text style={styles.listenFullText}>Start Surah Audio</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>

                <View style={{ height: 40 }} />
              </ScrollView>
            </View>
          </Modal>
        )}

        {/* Floating Ask AI Button */}
        <FloatingAiButton onPress={() => setIsAiModalOpen(true)} />

        {/* AI Assistant Modal */}
        <AiAssistantModal
          visible={isAiModalOpen}
          onClose={() => setIsAiModalOpen(false)}
        />

        {/* Side Menu Drawer Modal */}
        <MobileMenuModal
          visible={showMenuModal}
          onClose={() => setShowMenuModal(false)}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#02120d',
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 10,
    backgroundColor: '#02120d',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  headerRightActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
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
  title: {
    fontSize: 24,
    fontWeight: '900',
    color: '#ffffff',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 12,
    color: '#6ee7b7',
    marginTop: 2,
    fontWeight: '600',
  },
  badgeQari: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(245, 158, 11, 0.12)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.3)',
  },
  qariText: {
    color: '#f59e0b',
    fontSize: 11,
    fontWeight: '800',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#04231b',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: 'rgba(52, 211, 153, 0.2)',
    marginBottom: 12,
    gap: 10,
  },
  searchInput: {
    flex: 1,
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '500',
  },
  filterRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 14,
  },
  filterPill: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 12,
    backgroundColor: 'rgba(4, 35, 27, 0.8)',
    borderWidth: 1,
    borderColor: 'rgba(52, 211, 153, 0.18)',
  },
  filterPillActive: {
    backgroundColor: '#10b981',
    borderColor: '#34d399',
  },
  filterPillText: {
    color: '#6ee7b7',
    fontSize: 12,
    fontWeight: '700',
  },
  filterPillTextActive: {
    color: '#02120d',
    fontWeight: '900',
  },
  resumeCard: {
    backgroundColor: 'rgba(245, 158, 11, 0.12)',
    borderRadius: 16,
    padding: 14,
    marginHorizontal: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.35)',
  },
  resumeLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  resumeIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#f59e0b',
    alignItems: 'center',
    justifyContent: 'center',
  },
  resumeBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 2,
  },
  resumeBadgeText: {
    fontSize: 9,
    fontWeight: '900',
    color: '#f59e0b',
    letterSpacing: 0.5,
  },
  resumeAyahBadge: {
    fontSize: 9,
    fontWeight: '800',
    color: '#a7f3d0',
    backgroundColor: 'rgba(16, 185, 129, 0.25)',
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 6,
  },
  resumeSurahName: {
    fontSize: 15,
    fontWeight: '800',
    color: '#ffffff',
  },
  resumeSub: {
    fontSize: 10,
    color: 'rgba(167, 243, 208, 0.7)',
    marginTop: 1,
  },
  resumeActionBtn: {
    paddingLeft: 8,
  },
  listContent: {
    paddingBottom: 90,
    gap: 10,
  },
  surahCard: {
    backgroundColor: '#031a14',
    borderRadius: 16,
    padding: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(52, 211, 153, 0.12)',
  },
  cardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  numberBadge: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: '#04231b',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.35)',
  },
  numberText: {
    color: '#f59e0b',
    fontWeight: '900',
    fontSize: 13,
  },
  surahMeta: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  englishName: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '800',
  },
  popularTag: {
    backgroundColor: 'rgba(245, 158, 11, 0.2)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  popularTagText: {
    color: '#f59e0b',
    fontSize: 9,
    fontWeight: '800',
  },
  translationText: {
    color: 'rgba(110, 231, 183, 0.75)',
    fontSize: 12,
    marginTop: 2,
    fontWeight: '500',
  },
  tagRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 4,
  },
  typeBadge: {
    color: '#a7f3d0',
    fontSize: 10,
    fontWeight: '600',
  },
  dot: {
    color: 'rgba(110, 231, 183, 0.4)',
    fontSize: 10,
  },
  ayahsCount: {
    color: 'rgba(110, 231, 183, 0.7)',
    fontSize: 10,
    fontWeight: '600',
  },
  cardRight: {
    alignItems: 'flex-end',
    gap: 6,
    marginLeft: 10,
  },
  arabicName: {
    color: '#fde68a',
    fontSize: 20,
    fontWeight: '900',
    fontFamily: 'Courier',
  },
  // Reader Modal Styles
  modalRoot: {
    flex: 1,
    backgroundColor: '#02120d',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(52, 211, 153, 0.15)',
    backgroundColor: '#031712',
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalTitleContainer: {
    alignItems: 'center',
  },
  modalTitle: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '800',
  },
  modalSub: {
    color: '#6ee7b7',
    fontSize: 11,
    marginTop: 2,
  },
  bookmarkBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(245, 158, 11, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalScroll: {
    flex: 1,
  },
  modalScrollContent: {
    padding: 16,
  },
  surahBanner: {
    backgroundColor: '#04281e',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.3)',
    marginBottom: 16,
  },
  bannerArabicTitle: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#fde68a',
    marginBottom: 8,
  },
  bannerEnglishMeaning: {
    fontSize: 15,
    color: '#ffffff',
    fontWeight: '700',
    textAlign: 'center',
  },
  bannerMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 8,
  },
  bannerMetaText: {
    fontSize: 12,
    color: '#6ee7b7',
    fontWeight: '600',
  },
  bannerMetaDot: {
    color: 'rgba(110, 231, 183, 0.4)',
    fontSize: 12,
  },
  audioPlayerCard: {
    backgroundColor: '#031a14',
    borderRadius: 16,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: 'rgba(52, 211, 153, 0.18)',
    marginBottom: 18,
  },
  audioInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  audioQari: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '700',
  },
  audioState: {
    color: '#6ee7b7',
    fontSize: 11,
    marginTop: 2,
  },
  audioPlayBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f59e0b',
    alignItems: 'center',
    justifyContent: 'center',
  },
  audioPlayBtnActive: {
    backgroundColor: '#10b981',
  },
  bismillahBox: {
    alignItems: 'center',
    paddingVertical: 18,
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(52, 211, 153, 0.1)',
  },
  bismillahArabic: {
    fontSize: 26,
    color: '#fde68a',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  bismillahTrans: {
    fontSize: 11,
    color: 'rgba(110, 231, 183, 0.7)',
    marginTop: 6,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  versesContainer: {
    gap: 14,
  },
  ayahCard: {
    backgroundColor: '#031a14',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(52, 211, 153, 0.12)',
  },
  ayahTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  ayahBadge: {
    backgroundColor: 'rgba(245, 158, 11, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.3)',
  },
  ayahBadgeText: {
    color: '#f59e0b',
    fontSize: 10,
    fontWeight: '800',
  },
  ayahArabicText: {
    fontSize: 22,
    lineHeight: 38,
    color: '#ffffff',
    textAlign: 'right',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  ayahEnglishText: {
    fontSize: 13,
    lineHeight: 20,
    color: '#a7f3d0',
    fontWeight: '400',
  },
  emptyVersesBox: {
    backgroundColor: '#04281e',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(52, 211, 153, 0.2)',
  },
  emptyTitle: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '800',
    marginTop: 10,
  },
  emptyDesc: {
    color: 'rgba(110, 231, 183, 0.8)',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 6,
    lineHeight: 18,
  },
  listenFullBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#f59e0b',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    marginTop: 16,
  },
  listenFullText: {
    color: '#031712',
    fontWeight: '800',
    fontSize: 12,
  },
});
