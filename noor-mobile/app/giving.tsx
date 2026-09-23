import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { FloatingAiButton } from '../src/components/FloatingAiButton';
import { AiAssistantModal } from '../src/components/AiAssistantModal';

interface CauseItem {
  id: string;
  title: string;
  arabicTitle: string;
  description: string;
  target: string;
  raised: string;
  icon: keyof typeof Ionicons.glyphMap;
  hadith: string;
}

const CAUSES: CauseItem[] = [
  {
    id: 'c1',
    title: 'Clean Water Wells (Saqia al-Maa)',
    arabicTitle: 'سُقْيَا الْمَاءِ',
    description: 'Constructing solar-powered water wells for remote arid communities lacking drinking water.',
    target: '$15,000',
    raised: '$11,400',
    icon: 'water-outline',
    hadith: 'The Prophet ﷺ was asked: "Which charity is best?" He replied: "Providing water." (Sunan Abi Dawood)'
  },
  {
    id: 'c2',
    title: 'The Noble Quran Distribution',
    arabicTitle: 'طِبَاعَةُ الْمُصْحَفِ الشَّرِيفِ',
    description: 'Printing durable gilded Mushafs for rural madrasas, students of knowledge, and masjids worldwide.',
    target: '$10,000',
    raised: '$8,250',
    icon: 'book-outline',
    hadith: 'Whoever teaches an ayah from the Book of Allah will have its reward as long as it is recited.'
  },
  {
    id: 'c3',
    title: 'Orphan Care & Sacred Education',
    arabicTitle: 'كَفَالَةُ الْيَتِيمِ',
    description: 'Providing comprehensive nutritional, medical, and Quranic educational sponsorship for orphans.',
    target: '$25,000',
    raised: '$19,800',
    icon: 'heart-outline',
    hadith: '"I and the one who cares for an orphan will be in Paradise like this" (and he joined two fingers). (Sahih Bukhari)'
  },
  {
    id: 'c4',
    title: 'Feed the Fasting (Ramadan Iftar)',
    arabicTitle: 'إِفْطَارُ الصَّائِمِ',
    description: 'Distributing warm wholesome Iftar meals and food baskets to vulnerable fasting families.',
    target: '$20,000',
    raised: '$16,900',
    icon: 'restaurant-outline',
    hadith: 'Whoever feeds a fasting person will have a reward like his without reducing the fasting person\'s reward.'
  }
];

export default function GivingScreen() {
  const router = useRouter();
  const [selectedAmount, setSelectedAmount] = useState<number>(25);
  const [selectedCause, setSelectedCause] = useState<string>('c1');
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);

  const handleContribute = () => {
    Alert.alert(
      'JazakAllah Khair!',
      `May Allah accept your blessed contribution of $${selectedAmount} as enduring Sadaqah Jariyah and reward you manifold in this life and the Hereafter.`,
      [{ text: 'Ameen', style: 'default' }]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#02120d" />
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backBtn}
          >
            <Ionicons name="arrow-back" size={20} color="#ffffff" />
          </TouchableOpacity>
          <View style={styles.titleContainer}>
            <Text style={styles.headerTitle}>Sadaqah Jariyah</Text>
            <Text style={styles.headerSub}>Enduring Islamic Charitable Giving</Text>
          </View>
          <View style={styles.secureBadge}>
            <Ionicons name="shield-checkmark" size={13} color="#10b981" />
            <Text style={styles.secureText}>100% Halal</Text>
          </View>
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Hadith Banner */}
          <View style={styles.hadithHeroCard}>
            <Text style={styles.heroArabic}>مَا نَقَصَتْ صَدَقَةٌ مِنْ مَالٍ</Text>
            <Text style={styles.heroHadith}>
              "Charity does not decrease wealth; and Allah increases the honor of the servant who forgives, and no one humbles himself for Allah except that Allah elevates him." — Sahih Muslim 2588
            </Text>
          </View>

          {/* Amount Selector */}
          <View style={styles.amountSection}>
            <Text style={styles.sectionHeading}>Select Contribution (USD):</Text>
            <View style={styles.amountsRow}>
              {[10, 25, 50, 100, 250].map((amt) => (
                <TouchableOpacity
                  key={amt}
                  style={[styles.amtBtn, selectedAmount === amt && styles.amtBtnActive]}
                  onPress={() => setSelectedAmount(amt)}
                >
                  <Text style={[styles.amtBtnText, selectedAmount === amt && styles.amtBtnTextActive]}>
                    ${amt}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Causes List */}
          <View style={styles.causesSection}>
            <Text style={styles.sectionHeading}>Designate to a Noble Cause:</Text>
            <View style={styles.causesList}>
              {CAUSES.map((cause) => {
                const isSelected = selectedCause === cause.id;
                return (
                  <TouchableOpacity
                    key={cause.id}
                    style={[styles.causeCard, isSelected && styles.causeCardActive]}
                    activeOpacity={0.85}
                    onPress={() => setSelectedCause(cause.id)}
                  >
                    <View style={styles.causeTopRow}>
                      <View style={styles.causeIconBox}>
                        <Ionicons name={cause.icon} size={20} color="#f59e0b" />
                      </View>
                      <View style={styles.causeTitleGroup}>
                        <Text style={styles.causeTitle}>{cause.title}</Text>
                        <Text style={styles.causeArabicTitle}>{cause.arabicTitle}</Text>
                      </View>
                      <View style={[styles.radio, isSelected && styles.radioActive]}>
                        {isSelected && <View style={styles.radioDot} />}
                      </View>
                    </View>

                    <Text style={styles.causeDesc}>{cause.description}</Text>

                    <View style={styles.progressRow}>
                      <View style={styles.progressBar}>
                        <View style={[styles.progressFill, { width: '76%' }]} />
                      </View>
                      <Text style={styles.raisedText}>{cause.raised} of {cause.target}</Text>
                    </View>

                    <View style={styles.hadithFooter}>
                      <Ionicons name="sparkles" size={12} color="#f59e0b" />
                      <Text style={styles.hadithFooterText}>{cause.hadith}</Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* Give Button */}
          <TouchableOpacity
            style={styles.giveBtn}
            activeOpacity={0.88}
            onPress={handleContribute}
          >
            <Ionicons name="heart" size={18} color="#031712" />
            <Text style={styles.giveBtnText}>Contribute ${selectedAmount} as Sadaqah</Text>
          </TouchableOpacity>

          <View style={{ height: 60 }} />
        </ScrollView>

        {/* Floating Ask AI Button */}
        <FloatingAiButton onPress={() => setIsAiModalOpen(true)} />

        {/* AI Assistant Modal */}
        <AiAssistantModal
          visible={isAiModalOpen}
          onClose={() => setIsAiModalOpen(false)}
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
    backgroundColor: '#02120d',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#04231b',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(52, 211, 153, 0.2)',
  },
  titleContainer: {
    flex: 1,
    marginHorizontal: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: '#ffffff',
  },
  headerSub: {
    fontSize: 10,
    color: '#6ee7b7',
    marginTop: 1,
    fontWeight: '600',
  },
  secureBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.3)',
  },
  secureText: {
    color: '#10b981',
    fontSize: 11,
    fontWeight: '800',
  },
  scrollContent: {
    paddingBottom: 40,
    gap: 14,
  },
  hadithHeroCard: {
    backgroundColor: '#04281e',
    borderRadius: 20,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.3)',
  },
  heroArabic: {
    color: '#fde68a',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  heroHadith: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 18,
    fontStyle: 'italic',
  },
  amountSection: {
    gap: 8,
  },
  sectionHeading: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '800',
  },
  amountsRow: {
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'space-between',
  },
  amtBtn: {
    flex: 1,
    backgroundColor: '#031a14',
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(52, 211, 153, 0.2)',
  },
  amtBtnActive: {
    backgroundColor: '#f59e0b',
    borderColor: '#f59e0b',
  },
  amtBtnText: {
    color: '#6ee7b7',
    fontSize: 13,
    fontWeight: '800',
  },
  amtBtnTextActive: {
    color: '#031712',
    fontWeight: '900',
  },
  causesSection: {
    gap: 10,
  },
  causesList: {
    gap: 12,
  },
  causeCard: {
    backgroundColor: '#031a14',
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
    borderColor: 'rgba(52, 211, 153, 0.14)',
  },
  causeCardActive: {
    borderColor: 'rgba(245, 158, 11, 0.6)',
    backgroundColor: '#04281e',
  },
  causeTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 8,
  },
  causeIconBox: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: 'rgba(245, 158, 11, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.3)',
  },
  causeTitleGroup: {
    flex: 1,
  },
  causeTitle: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '800',
  },
  causeArabicTitle: {
    color: '#fde68a',
    fontSize: 12,
    fontWeight: '600',
    marginTop: 2,
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: 'rgba(52, 211, 153, 0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioActive: {
    borderColor: '#f59e0b',
  },
  radioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#f59e0b',
  },
  causeDesc: {
    color: 'rgba(110, 231, 183, 0.85)',
    fontSize: 12,
    lineHeight: 18,
    marginBottom: 10,
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 10,
  },
  progressBar: {
    flex: 1,
    height: 6,
    backgroundColor: '#02120d',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#10b981',
    borderRadius: 3,
  },
  raisedText: {
    color: '#6ee7b7',
    fontSize: 10,
    fontWeight: '700',
  },
  hadithFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(245, 158, 11, 0.08)',
    padding: 8,
    borderRadius: 8,
  },
  hadithFooterText: {
    color: '#fde68a',
    fontSize: 10,
    fontStyle: 'italic',
    flex: 1,
  },
  giveBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#f59e0b',
    paddingVertical: 14,
    borderRadius: 16,
    shadowColor: '#f59e0b',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6,
    marginTop: 6,
  },
  giveBtnText: {
    color: '#031712',
    fontSize: 15,
    fontWeight: '900',
  },
});
