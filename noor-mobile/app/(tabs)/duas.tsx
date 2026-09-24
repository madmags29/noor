import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Share,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';
import { Ionicons } from '@expo/vector-icons';
import { FloatingAiButton } from '../../src/components/FloatingAiButton';
import { AiAssistantModal } from '../../src/components/AiAssistantModal';
import { MobileMenuModal } from '../../src/components/MobileMenuModal';
import { useLanguage } from '../../src/context/LanguageContext';

interface DhikrItem {
  arabic: string;
  translit: string;
  trans: string;
  virtue: string;
  reference: string;
}

import { LIFE_DUAS } from '../../src/data/islamicCoreData';

interface DuaItem {
  id: string;
  title: string;
  category: string;
  arabic: string;
  transliteration: string;
  translation: string;
  reference: string;
  benefits: string;
}

const DHIKR_PHRASES: DhikrItem[] = [
  {
    arabic: 'سُبْحَانَ اللَّهِ',
    translit: 'SubhanAllah',
    trans: 'Glory be to Allah',
    virtue: 'Plants a palm tree in Jannah and erases sins like foam of the sea.',
    reference: 'Sahih Muslim 2691'
  },
  {
    arabic: 'الْحَمْدُ لِلَّهِ',
    translit: 'Alhamdulillah',
    trans: 'All praise is for Allah',
    virtue: 'Fills the scale (Mizan) of good deeds on the Day of Resurrection.',
    reference: 'Sahih Muslim 223'
  },
  {
    arabic: 'اللَّهُ أَكْبَرُ',
    translit: 'Allahu Akbar',
    trans: 'Allah is the Greatest',
    virtue: 'Affirms absolute divine grandeur over all creation and concerns.',
    reference: 'Sahih Bukhari 6405'
  },
  {
    arabic: 'لَا إِلَهَ إِلَّا اللَّهُ',
    translit: 'La ilaha illallah',
    trans: 'There is no god worthy of worship except Allah',
    virtue: 'The best dhikr and key to Paradise.',
    reference: 'Sunan At-Tirmidhi 3383'
  },
  {
    arabic: 'أَسْتَغْفِرُ اللَّهَ وَأَتُوبُ إِلَيْهِ',
    translit: "Astaghfirullah wa atubu ilayh",
    trans: 'I seek forgiveness from Allah and repent to Him',
    virtue: 'Removes distress, opens sustained provision, and purifies hearts.',
    reference: 'Sahih Bukhari 6307'
  },
  {
    arabic: 'اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ',
    translit: "Allahumma salli 'ala Muhammad wa 'ala ali Muhammad",
    trans: 'O Allah, send blessings upon Muhammad and the family of Muhammad',
    virtue: 'Allah sends ten blessings upon the one who recites Salawat once.',
    reference: 'Sahih Muslim 408'
  },
  {
    arabic: 'لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ',
    translit: "La hawla wa la quwwata illa billah",
    trans: 'There is no power nor strength except through Allah',
    virtue: 'A treasure from beneath the Throne of Allah (Arsh).',
    reference: 'Sahih Bukhari 4205'
  }
];

const AUTHENTIC_DUAS: DuaItem[] = [
  {
    id: 'd1',
    title: 'Sayyid al-Istighfar (Master of Forgiveness)',
    category: 'Forgiveness',
    arabic: 'اللَّهُمَّ أَنْتَ رَبِّي لاَ إِلَهَ إِلاَّ أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ، وَأَبُوءُ لَكَ بِذَنْبِي، فَاغْفِرْ لِي فَإِنَّهُ لاَ يَغْفِرُ الذُّنُوبَ إِلاَّ أَنْتَ',
    transliteration: "Allahumma Anta Rabbi la ilaha illa Anta, khalaqtani wa ana 'abduka, wa ana 'ala 'ahdika wa wa'dika mastata'tu, a'udhu bika min sharri ma sana'tu, abu'u laka bini'matika 'alayya, wa abu'u laka bidhanbi faghfir li, fa-innahu la yaghfiru-dh-dhunuba illa Anta.",
    translation: "O Allah, You are my Lord, there is no god but You. You created me and I am Your servant, and I uphold Your covenant as much as I am able. I seek refuge in You from the evil of what I have done. I acknowledge Your favor upon me and I confess my sins to You; so forgive me, for none forgives sins except You.",
    reference: 'Sahih Bukhari 6306',
    benefits: 'Recited with conviction in morning/evening grants entrance into Paradise if one dies that day.'
  },
  {
    id: 'd2',
    title: 'Morning Protection from All Harm',
    category: 'Protection',
    arabic: 'بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ',
    transliteration: "Bismillahil-ladhi la yadurru ma'as-mihi shay'un fil-ardi wa la fis-sama'i wa Huwas-Sami'ul-'Alim.",
    translation: "In the name of Allah, with whose name nothing on earth or in heaven can cause harm, and He is the All-Hearing, the All-Knowing.",
    reference: 'Sunan Abi Dawood 5088',
    benefits: 'Recited 3 times every morning and evening protects from unexpected affliction.'
  },
  {
    id: 'd3',
    title: 'Relief from Anxiety, Sorrow & Debt',
    category: 'Relief',
    arabic: 'اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ، وَالْعَجْزِ وَالْكَسَلِ، وَالْبُخْلِ وَالْجُبْنِ، وَضَلَعِ الدَّيْنِ وَغَلَبَةِ الرِّجَالِ',
    transliteration: "Allahumma inni a'udhu bika minal-hammi wal-hazan, wal-'ajzi wal-kasal, wal-bukhli wal-jubn, wa dala'id-dayni wa ghalabatir-rijal.",
    translation: "O Allah, I seek refuge in You from grief and sadness, from weakness and laziness, from miserliness and cowardice, from the burden of debt and from being overpowered by men.",
    reference: 'Sahih Bukhari 2893',
    benefits: 'Sunnah supplication taught by the Prophet (ﷺ) for complete mental and financial relief.'
  },
  {
    id: 'd4',
    title: 'Supplication of Prophet Yunus (In Distress)',
    category: 'Relief',
    arabic: 'لَا إِلَهَ إِلَّا أَنْتَ سُبْحَانَكَ إِنِّي كُنْتُ مِنَ الظَّالِمِينَ',
    transliteration: "La ilaha illa Anta subhanaka inni kuntu minaz-zalimin.",
    translation: "There is no deity except You; exalted are You. Indeed, I have been of the wrongdoers.",
    reference: 'Surah Al-Anbiya 21:87 • Jami` at-Tirmidhi 3505',
    benefits: 'No Muslim supplicates with this for any matter except that Allah responds to him.'
  },
  {
    id: 'd5',
    title: 'Morning Covenant & Surrender',
    category: 'Morning & Evening',
    arabic: 'أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ',
    transliteration: "Asbahna wa asbahal-mulku lillah, wal-hamdu lillah, la ilaha illallahu wahdahu la sharika lah.",
    translation: "We have reached the morning and the kingdom belongs to Allah, and all praise is for Allah. None has the right to be worshipped except Allah alone, without partner.",
    reference: 'Sahih Muslim 2723',
    benefits: 'Realigns the soul with sovereignty and divine protection upon waking.'
  }
];

const CONVERTED_LIFE_DUAS: DuaItem[] = LIFE_DUAS.map(ld => {
  const catLabel = ld.category.charAt(0).toUpperCase() + ld.category.slice(1);
  return {
    id: ld.id,
    title: ld.title,
    category: catLabel,
    arabic: ld.arabic,
    transliteration: ld.transliteration,
    translation: ld.translation,
    reference: ld.hadithSource,
    benefits: `Authentic supplication for ${ld.categoryLabel}.`
  };
});

const ALL_COMBINED_DUAS: DuaItem[] = [
  ...CONVERTED_LIFE_DUAS,
  ...AUTHENTIC_DUAS
];

const MOBILE_DUA_CATEGORIES = [
  'All',
  'Travel',
  'Food',
  'Rain',
  'Home',
  'Work',
  'Study',
  'Marriage',
  'Children',
  'Parents',
  'Difficulties',
  'Forgiveness',
  'Protection',
  'Gratitude',
  'Rizq',
  'Morning & Evening'
];

export default function DuasScreen() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'Tasbih' | 'Duas'>('Tasbih');
  const [count, setCount] = useState(0);
  const [target, setTarget] = useState(33);
  const [activeDhikrIndex, setActiveDhikrIndex] = useState(0);
  const [isHapticEnabled, setIsHapticEnabled] = useState(true);
  const [completedCycles, setCompletedCycles] = useState(0);
  const [duaCategory, setDuaCategory] = useState<string>('All');
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [showMenuModal, setShowMenuModal] = useState(false);

  const activeDhikr = DHIKR_PHRASES[activeDhikrIndex];

  const handleTapCount = useCallback(async () => {
    const next = count + 1;
    setCount(next);

    if (isHapticEnabled) {
      if (next >= target) {
        // Milestone haptic
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        setCompletedCycles(prev => prev + 1);
        setCount(0);
      } else {
        // Regular tap haptic
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      }
    } else if (next >= target) {
      setCompletedCycles(prev => prev + 1);
      setCount(0);
    }
  }, [count, target, isHapticEnabled]);

  const handleReset = async () => {
    if (isHapticEnabled) {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    }
    setCount(0);
  };

  const handleShareDua = async (dua: DuaItem) => {
    try {
      await Share.share({
        message: `${dua.title}\n\n${dua.arabic}\n\n${dua.transliteration}\n\n"${dua.translation}"\n\n[Reference: ${dua.reference}]\nShared from Noor-e-ilahi Mobile`,
      });
    } catch (e) {
      // ignore
    }
  };

  const filteredDuas = ALL_COMBINED_DUAS.filter(d => {
    if (duaCategory === 'All') return true;
    return d.category.toLowerCase() === duaCategory.toLowerCase();
  });

  const progressPercent = Math.min(100, Math.round((count / target) * 100));

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#02120d" />
      <View style={styles.container}>
        {/* Top Header Row with Title, Subtitle & Hamburger Menu */}
        <View style={styles.header}>
          <View style={{ flex: 1, marginRight: 10 }}>
            <Text style={styles.title}>{t('duas')}</Text>
            <Text style={styles.subtitle} numberOfLines={1}>
              أَلا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ • {t('supplicationsTitle')}
            </Text>
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

        {/* Dedicated Full-Width Segmented Tab Switcher (Never Cuts Off!) */}
        <View style={styles.tabToggleRow}>
          <TouchableOpacity
            style={[styles.tabBtn, activeTab === 'Tasbih' && styles.tabBtnActive]}
            onPress={() => setActiveTab('Tasbih')}
            activeOpacity={0.8}
          >
            <Ionicons
              name="finger-print-outline"
              size={15}
              color={activeTab === 'Tasbih' ? '#02120d' : '#f59e0b'}
            />
            <Text style={[styles.tabBtnText, activeTab === 'Tasbih' && styles.tabBtnTextActive]}>
              📿 Tasbih Counter
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tabBtn, activeTab === 'Duas' && styles.tabBtnActive]}
            onPress={() => setActiveTab('Duas')}
            activeOpacity={0.8}
          >
            <Ionicons
              name="book-outline"
              size={15}
              color={activeTab === 'Duas' ? '#02120d' : '#34d399'}
            />
            <Text style={[styles.tabBtnText, activeTab === 'Duas' && styles.tabBtnTextActive]}>
              🤲 Authentic Duas
            </Text>
          </TouchableOpacity>
        </View>

        {activeTab === 'Tasbih' ? (
          <ScrollView
            contentContainerStyle={styles.tasbihScroll}
            showsVerticalScrollIndicator={false}
          >
            {/* Active Dhikr Card */}
            <View style={styles.dhikrCard}>
              <View style={styles.dhikrBadgeRow}>
                <View style={styles.dhikrNumBadge}>
                  <Text style={styles.dhikrNumText}>Dhikr {activeDhikrIndex + 1} of {DHIKR_PHRASES.length}</Text>
                </View>
                <Text style={styles.dhikrRefBadge}>{activeDhikr.reference}</Text>
              </View>

              <Text style={styles.dhikrArabic}>{activeDhikr.arabic}</Text>
              <Text style={styles.dhikrTranslit}>{activeDhikr.translit}</Text>
              <Text style={styles.dhikrTrans}>{activeDhikr.trans}</Text>

              <View style={styles.virtueBox}>
                <Ionicons name="sparkles" size={13} color="#f59e0b" />
                <Text style={styles.virtueText}>{activeDhikr.virtue}</Text>
              </View>

              {/* Horizontal Scroll Dhikr Selector */}
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.dhikrPillsRow}
              >
                {DHIKR_PHRASES.map((item, idx) => (
                  <TouchableOpacity
                    key={idx}
                    style={[styles.dhikrPill, activeDhikrIndex === idx && styles.dhikrPillActive]}
                    onPress={() => {
                      setActiveDhikrIndex(idx);
                      setCount(0);
                    }}
                  >
                    <Text style={[styles.dhikrPillText, activeDhikrIndex === idx && styles.dhikrPillTextActive]}>
                      {item.translit.length > 14 ? item.translit.substring(0, 14) + '...' : item.translit}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            {/* Circular Counter Tap Arena */}
            <View style={styles.counterArena}>
              <TouchableOpacity
                style={styles.tapArea}
                activeOpacity={0.85}
                onPress={handleTapCount}
              >
                {/* Glow ring */}
                <View style={styles.ringGlow} />

                <Text style={styles.counterNum}>{count}</Text>
                <Text style={styles.targetProgress}>{progressPercent}% OF {target}</Text>

                <View style={styles.tapInstruction}>
                  <Ionicons name="hand-right-outline" size={14} color="#f59e0b" />
                  <Text style={styles.tapHint}>{t('tapToCount')}</Text>
                </View>
              </TouchableOpacity>
            </View>

            {/* Target Selectors & Settings */}
            <View style={styles.controlSection}>
              <View style={styles.targetsRow}>
                <Text style={styles.sectionLabel}>{t('targetLabel')}:</Text>
                {[33, 99, 100, 1000].map(t => (
                  <TouchableOpacity
                    key={t}
                    style={[styles.targetBtn, target === t && styles.targetBtnActive]}
                    onPress={() => {
                      setTarget(t);
                      setCount(0);
                    }}
                  >
                    <Text style={[styles.targetBtnText, target === t && styles.targetBtnTextActive]}>
                      {t}x
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <View style={styles.actionRow}>
                <TouchableOpacity
                  style={[styles.actionBtn, isHapticEnabled && styles.actionBtnActive]}
                  onPress={() => setIsHapticEnabled(!isHapticEnabled)}
                >
                  <Ionicons
                    name={isHapticEnabled ? 'phone-portrait' : 'phone-portrait-outline'}
                    size={16}
                    color={isHapticEnabled ? '#10b981' : 'rgba(110, 231, 183, 0.6)'}
                  />
                  <Text style={styles.actionBtnText}>
                    Haptics: {isHapticEnabled ? 'ON' : 'OFF'}
                  </Text>
                </TouchableOpacity>

                <View style={styles.cyclesBadge}>
                  <Ionicons name="checkmark-circle" size={16} color="#f59e0b" />
                  <Text style={styles.cyclesText}>{completedCycles} Completed</Text>
                </View>

                <TouchableOpacity
                  style={[styles.actionBtn, styles.resetBtn]}
                  onPress={handleReset}
                >
                  <Ionicons name="refresh-outline" size={16} color="#f87171" />
                  <Text style={styles.resetBtnText}>{t('resetCounter')}</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={{ height: 90 }} />
          </ScrollView>
        ) : (
          <ScrollView
            contentContainerStyle={styles.duasScroll}
            showsVerticalScrollIndicator={false}
          >
            {/* Categories filter pills */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.duaCategoryRow}
            >
              {MOBILE_DUA_CATEGORIES.map(cat => {
                return (
                  <TouchableOpacity
                    key={cat}
                    style={[styles.duaCatPill, duaCategory === cat && styles.duaCatPillActive]}
                    onPress={() => setDuaCategory(cat)}
                  >
                    <Text style={[styles.duaCatPillText, duaCategory === cat && styles.duaCatPillTextActive]}>
                      {cat}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>

            {/* Duas List */}
            <View style={styles.duasList}>
              {filteredDuas.map(dua => (
                <View key={dua.id} style={styles.duaCard}>
                  <View style={styles.duaHeaderRow}>
                    <View style={styles.duaCatBadge}>
                      <Text style={styles.duaCatBadgeText}>{dua.category}</Text>
                    </View>
                    <TouchableOpacity
                      onPress={() => handleShareDua(dua)}
                      hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                    >
                      <Ionicons name="share-social-outline" size={18} color="#6ee7b7" />
                    </TouchableOpacity>
                  </View>

                  <Text style={styles.duaTitle}>{dua.title}</Text>
                  <Text style={styles.duaArabic}>{dua.arabic}</Text>
                  <Text style={styles.duaTranslit}>{dua.transliteration}</Text>
                  <Text style={styles.duaTrans}>"{dua.translation}"</Text>

                  <View style={styles.duaBenefitBox}>
                    <Ionicons name="ribbon-outline" size={14} color="#f59e0b" />
                    <Text style={styles.duaBenefitText}>{dua.benefits}</Text>
                  </View>

                  <Text style={styles.duaReferenceText}>Source: {dua.reference}</Text>
                </View>
              ))}
            </View>

            <View style={{ height: 90 }} />
          </ScrollView>
        )}

        {/* Floating Ask AI Button */}
        <FloatingAiButton onPress={() => setIsAiModalOpen(true)} />

        {/* AI Assistant Modal */}
        <AiAssistantModal
          visible={isAiModalOpen}
          onClose={() => setIsAiModalOpen(false)}
        />

        {/* Mobile Side Navigation Menu Drawer */}
        <MobileMenuModal
          visible={showMenuModal}
          onClose={() => setShowMenuModal(false)}
          currentUser={null}
          onOpenAuth={() => {}}
          onOpenAdhan={() => {}}
          onOpenQibla={() => {}}
          onOpenLocation={() => {}}
          onOpenLanguage={() => {}}
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
    marginBottom: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: '900',
    color: '#ffffff',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 11,
    color: '#6ee7b7',
    marginTop: 2,
    fontWeight: '600',
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
  tabToggleRow: {
    flexDirection: 'row',
    backgroundColor: '#04231b',
    borderRadius: 14,
    padding: 4,
    borderWidth: 1,
    borderColor: 'rgba(52, 211, 153, 0.25)',
    marginBottom: 14,
    gap: 6,
  },
  tabBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 9,
    borderRadius: 10,
  },
  tabBtnActive: {
    backgroundColor: '#10b981',
    shadowColor: '#10b981',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  tabBtnText: {
    color: '#6ee7b7',
    fontSize: 12,
    fontWeight: '700',
  },
  tabBtnTextActive: {
    color: '#02120d',
    fontWeight: '800',
  },
  tasbihScroll: {
    paddingBottom: 20,
    alignItems: 'center',
  },
  dhikrCard: {
    width: '100%',
    backgroundColor: '#031a14',
    borderRadius: 20,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(52, 211, 153, 0.16)',
    marginBottom: 16,
  },
  dhikrBadgeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 12,
  },
  dhikrNumBadge: {
    backgroundColor: 'rgba(245, 158, 11, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  dhikrNumText: {
    color: '#f59e0b',
    fontSize: 10,
    fontWeight: '800',
  },
  dhikrRefBadge: {
    color: 'rgba(110, 231, 183, 0.7)',
    fontSize: 10,
    fontWeight: '600',
  },
  dhikrArabic: {
    fontSize: 28,
    color: '#fde68a',
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  dhikrTranslit: {
    fontSize: 15,
    color: '#ffffff',
    fontWeight: '700',
    textAlign: 'center',
  },
  dhikrTrans: {
    fontSize: 12,
    color: 'rgba(110, 231, 183, 0.8)',
    marginTop: 4,
    textAlign: 'center',
  },
  virtueBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(245, 158, 11, 0.08)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    marginTop: 12,
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.2)',
  },
  virtueText: {
    color: '#fde68a',
    fontSize: 11,
    fontWeight: '600',
    flex: 1,
  },
  dhikrPillsRow: {
    gap: 8,
    marginTop: 14,
    paddingVertical: 2,
  },
  dhikrPill: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    backgroundColor: '#04281e',
    borderWidth: 1,
    borderColor: 'rgba(52, 211, 153, 0.15)',
  },
  dhikrPillActive: {
    backgroundColor: '#10b981',
    borderColor: '#34d399',
  },
  dhikrPillText: {
    color: '#6ee7b7',
    fontSize: 11,
    fontWeight: '600',
  },
  dhikrPillTextActive: {
    color: '#02120d',
    fontWeight: '800',
  },
  counterArena: {
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tapArea: {
    width: 240,
    height: 240,
    borderRadius: 120,
    backgroundColor: '#04281e',
    borderWidth: 4,
    borderColor: '#f59e0b',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#f59e0b',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 10,
  },
  ringGlow: {
    position: 'absolute',
    width: 220,
    height: 220,
    borderRadius: 110,
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.3)',
  },
  counterNum: {
    fontSize: 64,
    fontWeight: '900',
    color: '#f59e0b',
    fontFamily: 'Courier',
  },
  targetProgress: {
    fontSize: 12,
    color: '#6ee7b7',
    fontWeight: '700',
    marginTop: 4,
    letterSpacing: 0.5,
  },
  tapInstruction: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 10,
  },
  tapHint: {
    fontSize: 9,
    color: '#f59e0b',
    fontWeight: '800',
    letterSpacing: 1,
  },
  controlSection: {
    width: '100%',
    marginTop: 14,
    gap: 12,
  },
  targetsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  sectionLabel: {
    color: 'rgba(110, 231, 183, 0.7)',
    fontSize: 12,
    fontWeight: '700',
  },
  targetBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#04231b',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(52, 211, 153, 0.2)',
  },
  targetBtnActive: {
    backgroundColor: '#f59e0b',
    borderColor: '#f59e0b',
  },
  targetBtnText: {
    color: '#6ee7b7',
    fontSize: 12,
    fontWeight: '700',
  },
  targetBtnTextActive: {
    color: '#02120d',
    fontWeight: '900',
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: '#031a14',
    borderWidth: 1,
    borderColor: 'rgba(52, 211, 153, 0.15)',
  },
  actionBtnActive: {
    borderColor: 'rgba(16, 185, 129, 0.5)',
  },
  actionBtnText: {
    color: '#6ee7b7',
    fontSize: 11,
    fontWeight: '700',
  },
  cyclesBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(245, 158, 11, 0.12)',
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 10,
  },
  cyclesText: {
    color: '#f59e0b',
    fontSize: 11,
    fontWeight: '800',
  },
  resetBtn: {
    borderColor: 'rgba(239, 68, 68, 0.3)',
    backgroundColor: 'rgba(239, 68, 68, 0.08)',
  },
  resetBtnText: {
    color: '#f87171',
    fontSize: 11,
    fontWeight: '700',
  },
  // Duas Tab
  duasScroll: {
    paddingBottom: 20,
  },
  duaCategoryRow: {
    gap: 8,
    marginBottom: 14,
    paddingVertical: 2,
  },
  duaCatPill: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 12,
    backgroundColor: '#04231b',
    borderWidth: 1,
    borderColor: 'rgba(52, 211, 153, 0.2)',
  },
  duaCatPillActive: {
    backgroundColor: '#10b981',
    borderColor: '#34d399',
  },
  duaCatPillText: {
    color: '#6ee7b7',
    fontSize: 12,
    fontWeight: '700',
  },
  duaCatPillTextActive: {
    color: '#02120d',
    fontWeight: '900',
  },
  duasList: {
    gap: 12,
  },
  duaCard: {
    backgroundColor: '#031a14',
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(52, 211, 153, 0.14)',
  },
  duaHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  duaCatBadge: {
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  duaCatBadgeText: {
    color: '#10b981',
    fontSize: 10,
    fontWeight: '800',
  },
  duaTitle: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '800',
    marginBottom: 10,
  },
  duaArabic: {
    color: '#fde68a',
    fontSize: 19,
    lineHeight: 32,
    textAlign: 'right',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  duaTranslit: {
    color: '#a7f3d0',
    fontSize: 12,
    lineHeight: 18,
    fontWeight: '600',
    marginBottom: 6,
  },
  duaTrans: {
    color: 'rgba(255, 255, 255, 0.85)',
    fontSize: 12,
    lineHeight: 18,
    fontStyle: 'italic',
    marginBottom: 10,
  },
  duaBenefitBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(245, 158, 11, 0.08)',
    padding: 8,
    borderRadius: 8,
    marginBottom: 8,
  },
  duaBenefitText: {
    color: '#fde68a',
    fontSize: 11,
    fontWeight: '600',
    flex: 1,
  },
  duaReferenceText: {
    color: 'rgba(110, 231, 183, 0.5)',
    fontSize: 10,
    fontWeight: '500',
  },
});
