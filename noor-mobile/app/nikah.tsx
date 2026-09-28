import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
  StatusBar,
  Share,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { THEME } from '../src/theme';
import { useLanguage } from '../src/context/LanguageContext';
import { NIKAH_FAMILY_GUIDE } from '../src/data/islamicCoreData';

export default function NikahScreen() {
  const router = useRouter();
  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = useState<'pillars' | 'premarital' | 'rights' | 'duas'>('pillars');
  const [copiedDua, setCopiedDua] = useState(false);

  const WEDDING_DUAS = [
    {
      title: 'Prophetic Wedding Congratulation Supplication',
      arabic: 'بَارَكَ اللَّهُ لَكَ، وَبَارَكَ عَلَيْكَ، وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ',
      transliteration: "BarakAllahu laka, wa baraka 'alayka, wa jama'a baynakuma fee khayr.",
      translationEn: "May Allah bless you, and bestow His blessings upon you, and unite both of you in goodness.",
      translationUr: "اللہ تم پر برکت نازل فرمائے، اور تم دونوں کو خیر و بھلائی میں اکٹھا رکھے۔",
      translationHi: "अल्लाह तुम्हें बरकत दे, तुम पर अपनी रहमत नाज़िल करे और तुम दोनों को भलाई में इकट्ठा रखे।",
      source: "Sunan Abu Dawud 2130 & Jami at-Tirmidhi 1091"
    },
    {
      title: 'Dua for Righteous Offspring & Tranquility in Spouse',
      arabic: 'رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ وَاجْعَلْنَا لِلْمُتَّقِينَ إِمَامًا',
      transliteration: "Rabbana hab lana min azwajina wa dhurriyyatina qurrata a'yunin waj'alna lil-muttaqeena imama.",
      translationEn: "Our Lord, grant us from among our spouses and offspring comfort to our eyes and make us an example for the righteous.",
      translationUr: "اے ہمارے رب! ہمیں ہماری بیویوں اور بچوں سے آنکھوں کی ٹھنڈک عطا فرما اور ہمیں پرہیزگاروں کا پیشوا بنا۔",
      translationHi: "ऐ हमारे रब! हमें हमारे जीवनसाथियों और हमारी संतानों से आँखों की ठंडक प्रदान कर और हमें परहेज़गारों का इमाम बना।",
      source: "Surah Al-Furqan 25:74"
    }
  ];

  const handleShareDua = async (dua: typeof WEDDING_DUAS[0]) => {
    try {
      await Share.share({
        message: `${dua.title}\n\n${dua.arabic}\n\n${dua.transliteration}\n\n"${dua.translationEn}"\n\n— ${dua.source} (via NOOR App)`,
      });
      setCopiedDua(true);
      setTimeout(() => setCopiedDua(false), 2000);
    } catch {}
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#02120d" />
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={22} color="#ffffff" />
          </TouchableOpacity>
          <View style={{ flex: 1 }}>
            <View style={styles.headerTitleRow}>
              <Text style={styles.title}>Nikah & Family Islamic Hub</Text>
              <View style={styles.badgeSacred}>
                <Text style={styles.badgeSacredText}>Sacred Covenant</Text>
              </View>
            </View>
            <Text style={styles.subtitle}>Pillars, Pre-Marital Questions, Rights & Duas</Text>
          </View>
        </View>

        {/* Tab Row */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabScroll}>
          {[
            { id: 'pillars', label: '💍 5 Pillars of Nikah' },
            { id: 'premarital', label: '❓ Pre-Marital Questions' },
            { id: 'rights', label: '⚖️ Mutual Rights & Duties' },
            { id: 'duas', label: '🤲 Wedding Duas' },
          ].map(tab => (
            <TouchableOpacity
              key={tab.id}
              style={[styles.tabBtn, activeTab === tab.id && styles.tabBtnActive]}
              onPress={() => setActiveTab(tab.id as any)}
            >
              <Text style={[styles.tabBtnText, activeTab === tab.id && styles.tabBtnTextActive]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* Quranic Harmony Banner (Surah Ar-Rum 30:21) */}
          <View style={styles.bannerCard}>
            <View style={styles.bannerHeader}>
              <Ionicons name="heart" size={14} color="#f59e0b" />
              <Text style={styles.bannerSurah}>SURAH AR-RUM 30:21</Text>
            </View>
            <Text style={styles.bannerArabic}>
              وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً
            </Text>
            <Text style={styles.bannerTranslation}>
              "And of His signs is that He created for you from yourselves mates that you may find tranquility in them; and He placed between you affection and mercy."
            </Text>
          </View>

          {/* TAB 1: PILLARS */}
          {activeTab === 'pillars' && (
            <View style={styles.sectionWrap}>
              <View style={styles.sectionHeaderBox}>
                <Text style={styles.sectionTitle}>The 5 Mandatory Pillars of Nikah</Text>
                <Text style={styles.sectionDesc}>
                  For a marriage contract to be valid under classical Islamic law (Shariah), all five conditions must be fulfilled.
                </Text>
              </View>

              {NIKAH_FAMILY_GUIDE[0].points.map((pt, idx) => (
                <View key={idx} style={styles.itemCard}>
                  <View style={styles.numberCircle}>
                    <Text style={styles.numberText}>{idx + 1}</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.pointText}>{pt}</Text>
                  </View>
                </View>
              ))}
            </View>
          )}

          {/* TAB 2: PRE-MARITAL QUESTIONS */}
          {activeTab === 'premarital' && (
            <View style={styles.sectionWrap}>
              <View style={styles.sectionHeaderBox}>
                <Text style={styles.sectionTitle}>Essential Pre-Marital Discussion Topics</Text>
                <Text style={styles.sectionDesc}>
                  Classical scholars emphasize open, honest dialogue before finalizing Nikah to establish lifelong compatibility and mutual understanding.
                </Text>
              </View>

              {NIKAH_FAMILY_GUIDE[1].points.map((pt, idx) => (
                <View key={idx} style={styles.itemCard}>
                  <View style={[styles.numberCircle, { backgroundColor: 'rgba(52, 211, 153, 0.2)' }]}>
                    <Ionicons name="chatbubble-ellipses" size={14} color="#34d399" />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.pointText}>{pt}</Text>
                  </View>
                </View>
              ))}
            </View>
          )}

          {/* TAB 3: RIGHTS & RESPONSIBILITIES */}
          {activeTab === 'rights' && (
            <View style={styles.sectionWrap}>
              <View style={styles.sectionHeaderBox}>
                <Text style={styles.sectionTitle}>Mutual Rights and Sacred Responsibilities</Text>
                <Text style={styles.sectionDesc}>
                  Prophetic guidance establishes a balanced partnership built upon mutual respect, kindness, and spiritual support.
                </Text>
              </View>

              {NIKAH_FAMILY_GUIDE[2].points.map((pt, idx) => (
                <View key={idx} style={styles.itemCard}>
                  <View style={[styles.numberCircle, { backgroundColor: 'rgba(245, 158, 11, 0.2)' }]}>
                    <Ionicons name="checkmark-done" size={15} color="#f59e0b" />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.pointText}>{pt}</Text>
                  </View>
                </View>
              ))}
            </View>
          )}

          {/* TAB 4: DUAS */}
          {activeTab === 'duas' && (
            <View style={styles.sectionWrap}>
              <View style={styles.sectionHeaderBox}>
                <Text style={styles.sectionTitle}>Wedding & Family Supplications</Text>
                <Text style={styles.sectionDesc}>
                  Authentic prayers from the Sunnah and Quran for the newly wedded couple and family harmony.
                </Text>
              </View>

              {WEDDING_DUAS.map((dua, idx) => (
                <View key={idx} style={styles.duaCard}>
                  <View style={styles.duaTopRow}>
                    <Text style={styles.duaCardTitle}>{dua.title}</Text>
                    <TouchableOpacity onPress={() => handleShareDua(dua)} style={styles.shareBtn}>
                      <Ionicons name="share-social-outline" size={16} color="#f59e0b" />
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.duaArabic}>{dua.arabic}</Text>
                  <Text style={styles.duaTranslit}>{dua.transliteration}</Text>
                  <Text style={styles.duaTranslation}>
                    {language === 'hi' ? dua.translationHi : language === 'ur' ? dua.translationUr : dua.translationEn}
                  </Text>
                  <View style={styles.duaFooter}>
                    <Ionicons name="book-outline" size={12} color="rgba(110, 231, 183, 0.6)" />
                    <Text style={styles.duaSource}>{dua.source}</Text>
                  </View>
                </View>
              ))}
            </View>
          )}

          <View style={{ height: 40 }} />
        </ScrollView>
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
    alignItems: 'center',
    paddingVertical: 12,
    gap: 12,
  },
  backBtn: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexWrap: 'wrap',
  },
  title: {
    color: '#ffffff',
    fontSize: 17,
    fontWeight: '700',
  },
  badgeSacred: {
    backgroundColor: 'rgba(245, 158, 11, 0.2)',
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.4)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  badgeSacredText: {
    color: '#f59e0b',
    fontSize: 10,
    fontWeight: '700',
  },
  subtitle: {
    color: 'rgba(110, 231, 183, 0.7)',
    fontSize: 11,
    marginTop: 2,
  },
  tabScroll: {
    flexDirection: 'row',
    gap: 6,
    paddingVertical: 8,
  },
  tabBtn: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.15)',
  },
  tabBtnActive: {
    backgroundColor: '#f59e0b',
    borderColor: '#f59e0b',
  },
  tabBtnText: {
    color: '#d1fae5',
    fontSize: 12,
    fontWeight: '600',
  },
  tabBtnTextActive: {
    color: '#031712',
    fontWeight: '700',
  },
  scrollContent: {
    paddingTop: 8,
    gap: 16,
  },
  bannerCard: {
    backgroundColor: '#04281f',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.35)',
    padding: 16,
    gap: 8,
  },
  bannerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  bannerSurah: {
    color: '#f59e0b',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.8,
  },
  bannerArabic: {
    color: '#fef3c7',
    fontSize: 19,
    lineHeight: 34,
    textAlign: 'right',
    fontFamily: Platform.OS === 'ios' ? 'Geeza Pro' : 'serif',
  },
  bannerTranslation: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 12,
    lineHeight: 18,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
    paddingTop: 8,
  },
  sectionWrap: {
    gap: 10,
  },
  sectionHeaderBox: {
    marginBottom: 4,
  },
  sectionTitle: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '700',
  },
  sectionDesc: {
    color: 'rgba(110, 231, 183, 0.7)',
    fontSize: 11,
    marginTop: 2,
    lineHeight: 16,
  },
  itemCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#031a14',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.2)',
    padding: 12,
    gap: 12,
  },
  numberCircle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#f59e0b',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 1,
  },
  numberText: {
    color: '#031712',
    fontSize: 12,
    fontWeight: '800',
  },
  pointText: {
    color: '#e5e7eb',
    fontSize: 13,
    lineHeight: 20,
  },
  duaCard: {
    backgroundColor: '#031c15',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.3)',
    padding: 16,
    gap: 10,
  },
  duaTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  duaCardTitle: {
    color: '#f59e0b',
    fontSize: 13,
    fontWeight: '700',
    flex: 1,
  },
  shareBtn: {
    padding: 6,
    borderRadius: 8,
    backgroundColor: 'rgba(245, 158, 11, 0.1)',
  },
  duaArabic: {
    color: '#fef3c7',
    fontSize: 22,
    lineHeight: 38,
    textAlign: 'center',
    paddingVertical: 4,
    fontFamily: Platform.OS === 'ios' ? 'Geeza Pro' : 'serif',
  },
  duaTranslit: {
    color: '#6ee7b7',
    fontSize: 11,
    fontStyle: 'italic',
    textAlign: 'center',
  },
  duaTranslation: {
    color: '#ffffff',
    fontSize: 12,
    lineHeight: 18,
    textAlign: 'center',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.08)',
    paddingTop: 8,
  },
  duaFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    paddingTop: 4,
  },
  duaSource: {
    color: 'rgba(110, 231, 183, 0.6)',
    fontSize: 10,
  },
});
