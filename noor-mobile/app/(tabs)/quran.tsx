import React, { useState, useMemo, useEffect, useRef } from 'react';
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
  ActivityIndicator,
  Share,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { FloatingAiButton } from '../../src/components/FloatingAiButton';
import { AiAssistantModal } from '../../src/components/AiAssistantModal';
import { MobileMenuModal } from '../../src/components/MobileMenuModal';
import { useLanguage } from '../../src/context/LanguageContext';
import { THEME } from '../../src/theme';
import { useAudioPlayer } from 'expo-audio';

import {
  SURAHS_LIST,
  RECITERS_LIST,
  SurahItem,
  AyahItem,
  ReciterItem,
  getSurahAudioUrl,
  getAyahAudioUrl,
  fetchSurahVerses,
} from '../../src/data/quranData';

function toEasternArabicNumerals(num: number): string {
  const digits = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
  return num.toString().split('').map(d => digits[parseInt(d, 10)]).join('');
}

export default function QuranScreen() {
  const { t, language } = useLanguage();

  // Search & Filter
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'All' | 'Popular' | 'Meccan' | 'Medinan'>('All');

  // Active Surah & Reader
  const [selectedSurah, setSelectedSurah] = useState<SurahItem | null>(null);
  const [readerModalVisible, setReaderModalVisible] = useState(false);
  const [verses, setVerses] = useState<AyahItem[]>([]);
  const [loadingVerses, setLoadingVerses] = useState(false);

  // Professional Reading Mode Switch: 'continuous' (Read in One Go) vs 'verseByVerse'
  const [readingMode, setReadingMode] = useState<'continuous' | 'verseByVerse'>('continuous');

  // Translation display in reader: 'en' | 'ur' | 'hi' | 'none'
  const [translationLang, setTranslationLang] = useState<'en' | 'ur' | 'hi' | 'none'>('en');

  // Font size setting
  const [fontSize, setFontSize] = useState<'sm' | 'md' | 'lg' | 'xl'>('lg');

  // Reciter & Audio
  const [selectedReciter, setSelectedReciter] = useState<ReciterItem>(RECITERS_LIST[0]);
  const [showReciterModal, setShowReciterModal] = useState(false);
  const [isPlayingSurah, setIsPlayingSurah] = useState(false);
  const [playingAyahNum, setPlayingAyahNum] = useState<number | null>(null);

  // Quick Surah Switcher Modal
  const [showSurahPicker, setShowSurahPicker] = useState(false);

  // UI state
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [showMenuModal, setShowMenuModal] = useState(false);
  const [bookmarkedSurahs, setBookmarkedSurahs] = useState<number[]>([1, 18, 36, 67]);
  const [lastRead, setLastRead] = useState<{ surahNumber: number; surahName: string; ayah: number } | null>(null);

  // Audio players
  const currentSurahAudioUrl = selectedSurah
    ? getSurahAudioUrl(selectedSurah.number, selectedReciter.id)
    : getSurahAudioUrl(1, selectedReciter.id);
  const surahPlayer = useAudioPlayer(currentSurahAudioUrl);

  const [currentAyahAudioUrl, setCurrentAyahAudioUrl] = useState<string>(getAyahAudioUrl(1, 1));
  const ayahPlayer = useAudioPlayer(currentAyahAudioUrl);

  // Popular Surah numbers
  const POPULAR_NUMBERS = [1, 2, 18, 24, 36, 44, 48, 55, 56, 67, 78, 112, 113, 114];

  // Set default translation based on active language
  useEffect(() => {
    if (language === 'hi') setTranslationLang('hi');
    else if (language === 'ur') setTranslationLang('ur');
    else setTranslationLang('en');
  }, [language]);

  // Load last read & preferences
  useEffect(() => {
    AsyncStorage.getItem('@noor_quran_last_read').then(val => {
      if (val) {
        try {
          setLastRead(JSON.parse(val));
        } catch {}
      }
    }).catch(() => {});

    AsyncStorage.getItem('@noor_quran_reading_mode').then(val => {
      if (val === 'continuous' || val === 'verseByVerse') {
        setReadingMode(val);
      }
    }).catch(() => {});
  }, []);

  const handleSetReadingMode = (mode: 'continuous' | 'verseByVerse') => {
    setReadingMode(mode);
    AsyncStorage.setItem('@noor_quran_reading_mode', mode).catch(() => {});
  };

  const filteredSurahs = useMemo(() => {
    return SURAHS_LIST.filter(surah => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        surah.englishName.toLowerCase().includes(q) ||
        surah.englishNameTranslation.toLowerCase().includes(q) ||
        surah.name.includes(q) ||
        surah.number.toString() === q;

      if (!matchesSearch) return false;

      if (activeFilter === 'Popular') return POPULAR_NUMBERS.includes(surah.number);
      if (activeFilter === 'Meccan') return surah.revelationType === 'Meccan';
      if (activeFilter === 'Medinan') return surah.revelationType === 'Medinan';
      return true;
    });
  }, [searchQuery, activeFilter]);

  const toggleBookmark = (num: number) => {
    setBookmarkedSurahs(prev =>
      prev.includes(num) ? prev.filter(x => x !== num) : [...prev, num]
    );
  };

  // Open Surah and fetch verses
  const openSurahReader = async (surah: SurahItem, ayahNum: number = 1) => {
    setSelectedSurah(surah);
    setReaderModalVisible(true);
    stopAllAudio();

    const data = { surahNumber: surah.number, surahName: surah.englishName, ayah: ayahNum };
    setLastRead(data);
    AsyncStorage.setItem('@noor_quran_last_read', JSON.stringify(data)).catch(() => {});

    setLoadingVerses(true);
    try {
      const v = await fetchSurahVerses(surah.number);
      setVerses(v);
    } catch {
      setVerses([]);
    } finally {
      setLoadingVerses(false);
    }
  };

  const stopAllAudio = () => {
    try {
      surahPlayer.pause();
      ayahPlayer.pause();
    } catch {}
    setIsPlayingSurah(false);
    setPlayingAyahNum(null);
  };

  const toggleSurahAudio = () => {
    if (!selectedSurah) return;
    try {
      if (isPlayingSurah) {
        surahPlayer.pause();
        setIsPlayingSurah(false);
      } else {
        if (playingAyahNum) {
          try {
            ayahPlayer.pause();
          } catch (_) {}
          setPlayingAyahNum(null);
        }
        const url = getSurahAudioUrl(selectedSurah.number, selectedReciter.id);
        if (url) {
          surahPlayer.replace(url);
          surahPlayer.play();
          setIsPlayingSurah(true);
        }
      }
    } catch (err) {
      console.warn('Surah playback error handled safely:', err);
      setIsPlayingSurah(false);
    }
  };

  const playAyahAudio = (ayahNumber: number) => {
    if (!selectedSurah) return;
    try {
      if (playingAyahNum === ayahNumber) {
        ayahPlayer.pause();
        setPlayingAyahNum(null);
      } else {
        if (isPlayingSurah) {
          try {
            surahPlayer.pause();
          } catch (_) {}
          setIsPlayingSurah(false);
        }
        const url = getAyahAudioUrl(selectedSurah.number, ayahNumber);
        if (url) {
          setCurrentAyahAudioUrl(url);
          ayahPlayer.replace(url);
          ayahPlayer.play();
          setPlayingAyahNum(ayahNumber);
        }
      }
    } catch (err) {
      console.warn('Ayah playback error handled safely:', err);
      setPlayingAyahNum(null);
    }
  };

  const navigateSurah = (direction: 'next' | 'prev') => {
    if (!selectedSurah) return;
    const nextNum = direction === 'next' ? selectedSurah.number + 1 : selectedSurah.number - 1;
    const target = SURAHS_LIST.find(s => s.number === nextNum);
    if (target) {
      openSurahReader(target, 1);
    }
  };

  const handleShareAyah = async (ayah: AyahItem) => {
    if (!selectedSurah) return;
    const trans =
      translationLang === 'hi'
        ? (ayah.translationHi || ayah.translation)
        : translationLang === 'ur'
        ? (ayah.translationUr || ayah.translation)
        : ayah.translation;

    try {
      await Share.share({
        message: `${ayah.arabic}\n\n"${trans}"\n\n— Surah ${selectedSurah.englishName} (${selectedSurah.number}:${ayah.number}) [via NOOR App]`,
      });
    } catch {}
  };

  // Arabic font size calculation
  const getArabicFontSize = () => {
    switch (fontSize) {
      case 'sm': return 19;
      case 'md': return 23;
      case 'lg': return 27;
      case 'xl': return 32;
      default: return 26;
    }
  };

  const getArabicLineHeight = () => {
    switch (fontSize) {
      case 'sm': return 36;
      case 'md': return 42;
      case 'lg': return 50;
      case 'xl': return 58;
      default: return 48;
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#02120d" />
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View style={{ flex: 1, marginRight: 8 }}>
            <Text style={styles.title}>{t('quran')}</Text>
            <Text style={styles.subtitle} numberOfLines={1}>
              الْقُرْآن الْكَرِيم • All 114 Surahs • Mushaf Tilawat
            </Text>
          </View>
          <View style={styles.headerRightActions}>
            <TouchableOpacity
              style={styles.badgeQari}
              onPress={() => setShowReciterModal(true)}
              activeOpacity={0.8}
            >
              <Ionicons name="mic-outline" size={13} color="#f59e0b" />
              <Text style={styles.qariText} numberOfLines={1}>
                {selectedReciter.name.split(' ')[0]}
              </Text>
            </TouchableOpacity>

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

        {/* Resume Last Read Banner */}
        {lastRead && (
          <TouchableOpacity
            style={styles.lastReadBanner}
            onPress={() => {
              const s = SURAHS_LIST.find(item => item.number === lastRead.surahNumber);
              if (s) openSurahReader(s, lastRead.ayah);
            }}
            activeOpacity={0.85}
          >
            <View style={styles.lastReadLeft}>
              <Ionicons name="bookmark" size={15} color="#f59e0b" />
              <Text style={styles.lastReadText}>
                Resume Last Read: <Text style={styles.lastReadBold}>Surah {lastRead.surahName}</Text> (Ayah {lastRead.ayah})
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={15} color="#f59e0b" />
          </TouchableOpacity>
        )}

        {/* Search Bar */}
        <View style={styles.searchBar}>
          <Ionicons name="search-outline" size={18} color="#10b981" />
          <TextInput
            placeholder="Search 114 Surahs by name, translation, or number..."
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
                ? `All (114)`
                : filter === 'Popular'
                ? `Popular (${POPULAR_NUMBERS.length})`
                : filter === 'Meccan'
                ? `Meccan (86)`
                : `Medinan (28)`;
            const isActive = activeFilter === filter;
            return (
              <TouchableOpacity
                key={filter}
                style={[styles.filterPill, isActive && styles.filterPillActive]}
                onPress={() => setActiveFilter(filter)}
                activeOpacity={0.8}
              >
                <Text style={[styles.filterPillText, isActive && styles.filterPillTextActive]}>
                  {label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Surahs Catalog List */}
        <FlatList
          data={filteredSurahs}
          keyExtractor={(item) => item.number.toString()}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => {
            const isBookmarked = bookmarkedSurahs.includes(item.number);
            const isPopular = POPULAR_NUMBERS.includes(item.number);
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
                      {isPopular && (
                        <View style={styles.popularTag}>
                          <Text style={styles.popularTagText}>Most Recited</Text>
                        </View>
                      )}
                    </View>
                    <Text style={styles.translationText}>{item.englishNameTranslation}</Text>
                    <View style={styles.tagRow}>
                      <Text style={styles.typeBadge}>
                        {item.revelationType === 'Meccan' ? '🕋 Makkah' : '🕌 Madinah'}
                      </Text>
                      <Text style={styles.dot}>•</Text>
                      <Text style={styles.ayahsCount}>{item.numberOfAyahs} verses</Text>
                      <Text style={styles.dot}>•</Text>
                      <Text style={styles.juzBadge}>Juz {item.juz}</Text>
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

        {/* Reader Full Screen Modal */}
        {selectedSurah && (
          <Modal
            visible={readerModalVisible}
            animationType="slide"
            presentationStyle="pageSheet"
            onRequestClose={() => {
              stopAllAudio();
              setReaderModalVisible(false);
            }}
          >
            <View style={styles.modalRoot}>
              {/* Modal Top Bar */}
              <View style={styles.modalHeader}>
                <TouchableOpacity
                  onPress={() => {
                    stopAllAudio();
                    setReaderModalVisible(false);
                  }}
                  style={styles.closeButton}
                >
                  <Ionicons name="chevron-down" size={22} color="#ffffff" />
                </TouchableOpacity>

                {/* 114 Surah Quick Switcher Button */}
                <TouchableOpacity
                  style={styles.surahPickerBtn}
                  onPress={() => setShowSurahPicker(true)}
                  activeOpacity={0.8}
                >
                  <View style={styles.modalTitleContainer}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                      <Text style={styles.modalTitle}>{selectedSurah.englishName}</Text>
                      <Ionicons name="caret-down" size={12} color="#f59e0b" />
                    </View>
                    <Text style={styles.modalSub}>
                      Surah #{selectedSurah.number} • {selectedSurah.numberOfAyahs} ayahs • {selectedSurah.revelationType}
                    </Text>
                  </View>
                </TouchableOpacity>

                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                  {/* Prev / Next Surah Navigation */}
                  <TouchableOpacity
                    disabled={selectedSurah.number <= 1}
                    onPress={() => navigateSurah('prev')}
                    style={[styles.navSurahBtn, selectedSurah.number <= 1 && styles.navSurahBtnDisabled]}
                  >
                    <Ionicons name="chevron-back" size={16} color={selectedSurah.number <= 1 ? '#4b5563' : '#6ee7b7'} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    disabled={selectedSurah.number >= 114}
                    onPress={() => navigateSurah('next')}
                    style={[styles.navSurahBtn, selectedSurah.number >= 114 && styles.navSurahBtnDisabled]}
                  >
                    <Ionicons name="chevron-forward" size={16} color={selectedSurah.number >= 114 ? '#4b5563' : '#6ee7b7'} />
                  </TouchableOpacity>

                  {/* Bookmark Button */}
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
              </View>

              {/* Mode Switcher & Controls Bar */}
              <View style={styles.controlsBar}>
                {/* Mode Switch: "Read in One Go" vs "Verse by Verse" */}
                <View style={styles.modeSwitchWrap}>
                  <TouchableOpacity
                    style={[styles.modeTab, readingMode === 'continuous' && styles.modeTabActive]}
                    onPress={() => handleSetReadingMode('continuous')}
                  >
                    <MaterialCommunityIcons
                      name="format-paragraph"
                      size={14}
                      color={readingMode === 'continuous' ? '#031712' : '#6ee7b7'}
                    />
                    <Text style={[styles.modeTabText, readingMode === 'continuous' && styles.modeTabTextActive]}>
                      Read in One Go
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.modeTab, readingMode === 'verseByVerse' && styles.modeTabActive]}
                    onPress={() => handleSetReadingMode('verseByVerse')}
                  >
                    <Ionicons
                      name="list"
                      size={14}
                      color={readingMode === 'verseByVerse' ? '#031712' : '#6ee7b7'}
                    />
                    <Text style={[styles.modeTabText, readingMode === 'verseByVerse' && styles.modeTabTextActive]}>
                      Verse by Verse
                    </Text>
                  </TouchableOpacity>
                </View>

                {/* Translation Selector Pill */}
                <View style={styles.langPillRow}>
                  {(['en', 'ur', 'hi', 'none'] as const).map(langCode => (
                    <TouchableOpacity
                      key={langCode}
                      style={[styles.langSelectBtn, translationLang === langCode && styles.langSelectBtnActive]}
                      onPress={() => setTranslationLang(langCode)}
                    >
                      <Text style={[styles.langSelectText, translationLang === langCode && styles.langSelectTextActive]}>
                        {langCode === 'en' ? 'EN' : langCode === 'ur' ? 'اردو' : langCode === 'hi' ? 'हिन्दी' : 'Off'}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              <ScrollView
                style={styles.modalScroll}
                contentContainerStyle={styles.modalScrollContent}
                showsVerticalScrollIndicator={false}
              >
                {/* Surah Banner Card */}
                <View style={styles.surahBanner}>
                  <Text style={styles.bannerArabicTitle}>{selectedSurah.name}</Text>
                  <Text style={styles.bannerEnglishMeaning}>{selectedSurah.englishNameTranslation}</Text>
                  <View style={styles.bannerMetaRow}>
                    <Text style={styles.bannerMetaText}>Surah #{selectedSurah.number}</Text>
                    <Text style={styles.bannerMetaDot}>•</Text>
                    <Text style={styles.bannerMetaText}>{selectedSurah.revelationType} Revelation</Text>
                    <Text style={styles.bannerMetaDot}>•</Text>
                    <Text style={styles.bannerMetaText}>{selectedSurah.numberOfAyahs} Ayahs</Text>
                  </View>
                </View>

                {/* Audio Recitation Player Bar */}
                <View style={styles.audioPlayerCard}>
                  <TouchableOpacity
                    style={styles.audioInfo}
                    onPress={() => setShowReciterModal(true)}
                    activeOpacity={0.8}
                  >
                    <Ionicons name="musical-notes" size={20} color="#f59e0b" />
                    <View style={{ marginLeft: 10, flex: 1 }}>
                      <Text style={styles.audioQari}>{selectedReciter.name}</Text>
                      <Text style={styles.audioState}>
                        {isPlayingSurah ? 'Playing Surah Recitation (Tap to Pause)' : 'Listen to Full Surah (Tap Reciter to Change)'}
                      </Text>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[styles.audioPlayBtn, isPlayingSurah && styles.audioPlayBtnActive]}
                    onPress={toggleSurahAudio}
                  >
                    <Ionicons
                      name={isPlayingSurah ? 'pause' : 'play'}
                      size={20}
                      color={isPlayingSurah ? '#ffffff' : '#031712'}
                    />
                  </TouchableOpacity>
                </View>

                {/* Bismillah Calligraphy Header (Except Surah At-Tawbah #9) */}
                {selectedSurah.number !== 9 && (
                  <View style={styles.bismillahBox}>
                    <Text style={styles.bismillahArabic}>بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ</Text>
                    <Text style={styles.bismillahTrans}>
                      In the name of Allah, the Entirely Merciful, the Especially Merciful
                    </Text>
                  </View>
                )}

                {/* Loading Indicator */}
                {loadingVerses ? (
                  <View style={styles.loadingBox}>
                    <ActivityIndicator size="large" color="#f59e0b" />
                    <Text style={styles.loadingText}>Fetching Noble Ayahs...</Text>
                  </View>
                ) : (
                  <>
                    {/* MODE 1: READ IN ONE GO (Continuous Mushaf Tilawat Flow) */}
                    {readingMode === 'continuous' ? (
                      <View style={styles.mushafContinuousBox}>
                        <Text style={[styles.mushafParagraph, { fontSize: getArabicFontSize(), lineHeight: getArabicLineHeight() }]}>
                          {verses.map((ayah) => (
                            <React.Fragment key={`cont-${ayah.number}`}>
                              <Text
                                style={[
                                  styles.mushafAyahWord,
                                  playingAyahNum === ayah.number && styles.mushafAyahWordHighlight,
                                ]}
                                onPress={() => playAyahAudio(ayah.number)}
                              >
                                {ayah.arabic}{' '}
                              </Text>
                              <Text
                                style={styles.mushafAyahGlyph}
                                onPress={() => playAyahAudio(ayah.number)}
                              >
                                ۝{toEasternArabicNumerals(ayah.number)}{' '}
                              </Text>
                            </React.Fragment>
                          ))}
                        </Text>

                        {/* Continuous Translation Panel Underneath */}
                        {translationLang !== 'none' && (
                          <View style={styles.continuousTranslationWrap}>
                            <Text style={styles.continuousTransHeader}>
                              {translationLang === 'hi' ? 'अनुवाद (हिन्दी):' : translationLang === 'ur' ? 'ترجمہ (اردو):' : 'English Translation:'}
                            </Text>
                            {verses.map((ayah) => {
                              const trans =
                                translationLang === 'hi'
                                  ? (ayah.translationHi || ayah.translation)
                                  : translationLang === 'ur'
                                  ? (ayah.translationUr || ayah.translation)
                                  : ayah.translation;
                              return (
                                <View key={`trans-${ayah.number}`} style={styles.continuousTransRow}>
                                  <Text style={styles.continuousTransNum}>({ayah.number})</Text>
                                  <Text style={styles.continuousTransBody}>{trans}</Text>
                                </View>
                              );
                            })}
                          </View>
                        )}
                      </View>
                    ) : (
                      /* MODE 2: VERSE BY VERSE CARDS */
                      <View style={styles.versesContainer}>
                        {verses.map((ayah) => {
                          const trans =
                            translationLang === 'hi'
                              ? (ayah.translationHi || ayah.translation)
                              : translationLang === 'ur'
                              ? (ayah.translationUr || ayah.translation)
                              : ayah.translation;

                          const isAyahActive = playingAyahNum === ayah.number;

                          return (
                            <View
                              key={`vbv-${ayah.number}`}
                              style={[styles.ayahCard, isAyahActive && styles.ayahCardActive]}
                            >
                              <View style={styles.ayahTopRow}>
                                <View style={styles.ayahBadge}>
                                  <Text style={styles.ayahBadgeText}>
                                    {selectedSurah.number}:{ayah.number}
                                  </Text>
                                </View>

                                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                                  {/* Play Ayah Audio */}
                                  <TouchableOpacity
                                    style={[styles.ayahAudioMiniBtn, isAyahActive && styles.ayahAudioMiniBtnActive]}
                                    onPress={() => playAyahAudio(ayah.number)}
                                  >
                                    <Ionicons
                                      name={isAyahActive ? 'pause' : 'play'}
                                      size={13}
                                      color={isAyahActive ? '#031712' : '#f59e0b'}
                                    />
                                    <Text style={[styles.ayahAudioMiniText, isAyahActive && styles.ayahAudioMiniTextActive]}>
                                      {isAyahActive ? 'Playing' : 'Listen'}
                                    </Text>
                                  </TouchableOpacity>

                                  {/* Share Ayah */}
                                  <TouchableOpacity
                                    style={styles.ayahIconBtn}
                                    onPress={() => handleShareAyah(ayah)}
                                  >
                                    <Ionicons name="share-outline" size={16} color="#6ee7b7" />
                                  </TouchableOpacity>
                                </View>
                              </View>

                              {/* Arabic Text */}
                              <Text style={[styles.ayahArabicText, { fontSize: getArabicFontSize(), lineHeight: getArabicLineHeight() }]}>
                                {ayah.arabic}
                              </Text>

                              {/* Translation Text */}
                              {translationLang !== 'none' && (
                                <Text style={styles.ayahEnglishText}>
                                  {trans}
                                </Text>
                              )}
                            </View>
                          );
                        })}
                      </View>
                    )}
                  </>
                )}

                <View style={{ height: 60 }} />
              </ScrollView>
            </View>
          </Modal>
        )}

        {/* 114 Surahs Picker Modal */}
        <Modal
          visible={showSurahPicker}
          animationType="fade"
          transparent
          onRequestClose={() => setShowSurahPicker(false)}
        >
          <View style={styles.pickerOverlay}>
            <SafeAreaView style={styles.pickerContainer}>
              <View style={styles.pickerCard}>
                <View style={styles.pickerHeader}>
                  <Text style={styles.pickerTitle}>Select from all 114 Surahs</Text>
                  <TouchableOpacity onPress={() => setShowSurahPicker(false)}>
                    <Ionicons name="close-circle" size={22} color="#ffffff" />
                  </TouchableOpacity>
                </View>

                <FlatList
                  data={SURAHS_LIST}
                  keyExtractor={s => s.number.toString()}
                  showsVerticalScrollIndicator={false}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={[
                        styles.pickerItem,
                        selectedSurah?.number === item.number && styles.pickerItemActive,
                      ]}
                      onPress={() => {
                        setShowSurahPicker(false);
                        openSurahReader(item, 1);
                      }}
                    >
                      <View style={styles.pickerBadge}>
                        <Text style={styles.pickerBadgeText}>{item.number}</Text>
                      </View>
                      <View style={{ flex: 1 }}>
                        <Text style={styles.pickerSurahName}>{item.englishName}</Text>
                        <Text style={styles.pickerSurahMeaning}>{item.englishNameTranslation} • {item.numberOfAyahs} ayahs</Text>
                      </View>
                      <Text style={styles.pickerArabicName}>{item.name}</Text>
                    </TouchableOpacity>
                  )}
                />
              </View>
            </SafeAreaView>
          </View>
        </Modal>

        {/* Reciters Picker Modal */}
        <Modal
          visible={showReciterModal}
          animationType="fade"
          transparent
          onRequestClose={() => setShowReciterModal(false)}
        >
          <View style={styles.pickerOverlay}>
            <SafeAreaView style={styles.pickerContainer}>
              <View style={styles.pickerCard}>
                <View style={styles.pickerHeader}>
                  <Text style={styles.pickerTitle}>Select Master Qari Reciter</Text>
                  <TouchableOpacity onPress={() => setShowReciterModal(false)}>
                    <Ionicons name="close-circle" size={22} color="#ffffff" />
                  </TouchableOpacity>
                </View>

                {RECITERS_LIST.map((reciter) => {
                  const isCurrent = selectedReciter.id === reciter.id;
                  return (
                    <TouchableOpacity
                      key={reciter.id}
                      style={[styles.reciterItem, isCurrent && styles.reciterItemActive]}
                      onPress={() => {
                        setSelectedReciter(reciter);
                        setShowReciterModal(false);
                        stopAllAudio();
                      }}
                    >
                      <View style={styles.reciterIconWrap}>
                        <Ionicons name="mic" size={18} color="#f59e0b" />
                      </View>
                      <View style={{ flex: 1 }}>
                        <Text style={styles.reciterName}>{reciter.name}</Text>
                        <Text style={styles.reciterSub}>{reciter.style} • {reciter.country}</Text>
                      </View>
                      {isCurrent && (
                        <Ionicons name="checkmark-circle" size={20} color="#f59e0b" />
                      )}
                    </TouchableOpacity>
                  );
                })}
              </View>
            </SafeAreaView>
          </View>
        </Modal>

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
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: '#ffffff',
  },
  subtitle: {
    fontSize: 11,
    color: 'rgba(110, 231, 183, 0.7)',
    marginTop: 2,
  },
  headerRightActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  badgeQari: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(245, 158, 11, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.4)',
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 14,
    gap: 4,
  },
  qariText: {
    color: '#f59e0b',
    fontSize: 11,
    fontWeight: '700',
  },
  menuBtn: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  lastReadBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(245, 158, 11, 0.12)',
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.3)',
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 10,
  },
  lastReadLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flex: 1,
  },
  lastReadText: {
    color: '#e5e7eb',
    fontSize: 11,
  },
  lastReadBold: {
    color: '#f59e0b',
    fontWeight: '700',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#031c15',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.25)',
    paddingHorizontal: 12,
    paddingVertical: 9,
    gap: 8,
    marginBottom: 8,
  },
  searchInput: {
    flex: 1,
    color: '#ffffff',
    fontSize: 13,
  },
  filterRow: {
    flexDirection: 'row',
    gap: 6,
    marginBottom: 10,
  },
  filterPill: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.15)',
    paddingVertical: 6,
    borderRadius: 10,
  },
  filterPillActive: {
    backgroundColor: '#f59e0b',
    borderColor: '#f59e0b',
  },
  filterPillText: {
    color: '#d1fae5',
    fontSize: 10.5,
    fontWeight: '600',
  },
  filterPillTextActive: {
    color: '#031712',
    fontWeight: '700',
  },
  listContent: {
    paddingBottom: 90,
    gap: 8,
  },
  surahCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#031a14',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.2)',
    padding: 12,
  },
  cardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  numberBadge: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: 'rgba(245, 158, 11, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  numberText: {
    color: '#f59e0b',
    fontSize: 13,
    fontWeight: '800',
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
    fontSize: 14,
    fontWeight: '700',
  },
  popularTag: {
    backgroundColor: 'rgba(52, 211, 153, 0.15)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  popularTagText: {
    color: '#34d399',
    fontSize: 8.5,
    fontWeight: '800',
  },
  translationText: {
    color: 'rgba(110, 231, 183, 0.7)',
    fontSize: 11,
    marginTop: 1,
  },
  tagRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 3,
  },
  typeBadge: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 10,
  },
  dot: {
    color: 'rgba(110, 231, 183, 0.4)',
    fontSize: 10,
  },
  ayahsCount: {
    color: 'rgba(110, 231, 183, 0.65)',
    fontSize: 10,
  },
  juzBadge: {
    color: '#f59e0b',
    fontSize: 10,
    fontWeight: '600',
  },
  cardRight: {
    alignItems: 'flex-end',
    gap: 6,
    marginLeft: 8,
  },
  arabicName: {
    color: '#6ee7b7',
    fontSize: 17,
    fontFamily: Platform.OS === 'ios' ? 'Geeza Pro' : 'serif',
  },
  modalRoot: {
    flex: 1,
    backgroundColor: '#02120d',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(16, 185, 129, 0.2)',
    backgroundColor: '#031c15',
  },
  closeButton: {
    padding: 6,
  },
  surahPickerBtn: {
    flex: 1,
    paddingHorizontal: 8,
  },
  modalTitleContainer: {
    alignItems: 'center',
  },
  modalTitle: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '700',
  },
  modalSub: {
    color: 'rgba(110, 231, 183, 0.7)',
    fontSize: 10,
    marginTop: 1,
  },
  navSurahBtn: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  navSurahBtnDisabled: {
    opacity: 0.3,
  },
  bookmarkBtn: {
    padding: 6,
  },
  controlsBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    paddingVertical: 8,
    backgroundColor: '#031711',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(16, 185, 129, 0.15)',
    gap: 8,
  },
  modeSwitchWrap: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    borderRadius: 10,
    padding: 2,
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.2)',
  },
  modeTab: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  modeTabActive: {
    backgroundColor: '#f59e0b',
  },
  modeTabText: {
    color: '#6ee7b7',
    fontSize: 10.5,
    fontWeight: '600',
  },
  modeTabTextActive: {
    color: '#031712',
    fontWeight: '800',
  },
  langPillRow: {
    flexDirection: 'row',
    gap: 4,
  },
  langSelectBtn: {
    paddingHorizontal: 7,
    paddingVertical: 4,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.2)',
  },
  langSelectBtnActive: {
    backgroundColor: '#34d399',
    borderColor: '#34d399',
  },
  langSelectText: {
    color: '#d1fae5',
    fontSize: 10,
    fontWeight: '600',
  },
  langSelectTextActive: {
    color: '#031712',
    fontWeight: '800',
  },
  modalScroll: {
    flex: 1,
  },
  modalScrollContent: {
    padding: 14,
    gap: 14,
  },
  surahBanner: {
    backgroundColor: '#04281f',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.35)',
    padding: 16,
    alignItems: 'center',
    gap: 4,
  },
  bannerArabicTitle: {
    color: '#fef3c7',
    fontSize: 26,
    fontWeight: '700',
    fontFamily: Platform.OS === 'ios' ? 'Geeza Pro' : 'serif',
  },
  bannerEnglishMeaning: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '600',
  },
  bannerMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 4,
  },
  bannerMetaText: {
    color: 'rgba(110, 231, 183, 0.8)',
    fontSize: 10.5,
  },
  bannerMetaDot: {
    color: '#f59e0b',
    fontSize: 10,
  },
  audioPlayerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#031c15',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.3)',
    padding: 12,
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
    color: 'rgba(110, 231, 183, 0.7)',
    fontSize: 10,
    marginTop: 1,
  },
  audioPlayBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#f59e0b',
    alignItems: 'center',
    justifyContent: 'center',
  },
  audioPlayBtnActive: {
    backgroundColor: '#ef4444',
  },
  bismillahBox: {
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.08)',
    gap: 4,
  },
  bismillahArabic: {
    color: '#fef3c7',
    fontSize: 22,
    fontFamily: Platform.OS === 'ios' ? 'Geeza Pro' : 'serif',
  },
  bismillahTrans: {
    color: 'rgba(110, 231, 183, 0.65)',
    fontSize: 11,
    fontStyle: 'italic',
    textAlign: 'center',
  },
  loadingBox: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    gap: 12,
  },
  loadingText: {
    color: '#6ee7b7',
    fontSize: 13,
  },
  mushafContinuousBox: {
    backgroundColor: '#031a14',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.25)',
    padding: 16,
  },
  mushafParagraph: {
    color: '#ffffff',
    textAlign: 'right',
    fontFamily: Platform.OS === 'ios' ? 'Geeza Pro' : 'serif',
  },
  mushafAyahWord: {
    color: '#ffffff',
  },
  mushafAyahWordHighlight: {
    color: '#f59e0b',
    backgroundColor: 'rgba(245, 158, 11, 0.2)',
  },
  mushafAyahGlyph: {
    color: '#f59e0b',
    fontSize: 18,
    fontWeight: '700',
  },
  continuousTranslationWrap: {
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
    paddingTop: 14,
    gap: 8,
  },
  continuousTransHeader: {
    color: '#f59e0b',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  continuousTransRow: {
    flexDirection: 'row',
    gap: 6,
    alignItems: 'flex-start',
  },
  continuousTransNum: {
    color: '#34d399',
    fontSize: 11,
    fontWeight: '700',
  },
  continuousTransBody: {
    flex: 1,
    color: '#d1fae5',
    fontSize: 12,
    lineHeight: 18,
  },
  versesContainer: {
    gap: 12,
  },
  ayahCard: {
    backgroundColor: '#031a14',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.2)',
    padding: 14,
    gap: 10,
  },
  ayahCardActive: {
    borderColor: '#f59e0b',
    backgroundColor: '#05291e',
  },
  ayahTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.06)',
    paddingBottom: 8,
  },
  ayahBadge: {
    backgroundColor: 'rgba(245, 158, 11, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  ayahBadgeText: {
    color: '#f59e0b',
    fontSize: 10,
    fontWeight: '800',
  },
  ayahAudioMiniBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(245, 158, 11, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.3)',
  },
  ayahAudioMiniBtnActive: {
    backgroundColor: '#f59e0b',
  },
  ayahAudioMiniText: {
    color: '#f59e0b',
    fontSize: 10,
    fontWeight: '700',
  },
  ayahAudioMiniTextActive: {
    color: '#031712',
  },
  ayahIconBtn: {
    padding: 4,
  },
  ayahArabicText: {
    color: '#ffffff',
    textAlign: 'right',
    fontFamily: Platform.OS === 'ios' ? 'Geeza Pro' : 'serif',
  },
  ayahEnglishText: {
    color: 'rgba(255, 255, 255, 0.88)',
    fontSize: 12.5,
    lineHeight: 19,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.06)',
    paddingTop: 8,
  },
  pickerOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    justifyContent: 'center',
    padding: 16,
  },
  pickerContainer: {
    maxHeight: '80%',
  },
  pickerCard: {
    backgroundColor: '#031c15',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.3)',
    overflow: 'hidden',
    padding: 14,
    gap: 10,
  },
  pickerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.08)',
    paddingBottom: 10,
  },
  pickerTitle: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '700',
  },
  pickerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.04)',
    gap: 10,
  },
  pickerItemActive: {
    backgroundColor: 'rgba(245, 158, 11, 0.15)',
  },
  pickerBadge: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: 'rgba(245, 158, 11, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pickerBadgeText: {
    color: '#f59e0b',
    fontSize: 11,
    fontWeight: '800',
  },
  pickerSurahName: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '700',
  },
  pickerSurahMeaning: {
    color: 'rgba(110, 231, 183, 0.65)',
    fontSize: 10,
  },
  pickerArabicName: {
    color: '#6ee7b7',
    fontSize: 15,
    fontFamily: Platform.OS === 'ios' ? 'Geeza Pro' : 'serif',
  },
  reciterItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    gap: 12,
    marginBottom: 8,
  },
  reciterItemActive: {
    backgroundColor: 'rgba(245, 158, 11, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.4)',
  },
  reciterIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(245, 158, 11, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  reciterName: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '700',
  },
  reciterSub: {
    color: 'rgba(110, 231, 183, 0.7)',
    fontSize: 11,
    marginTop: 2,
  },
});
