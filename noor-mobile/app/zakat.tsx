import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StatusBar,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import {
  NISAB_STANDARDS,
  SADAQAH_CATEGORIES,
  SadaqahCategory
} from '../src/data/islamicCoreData';

export default function ZakatScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'calc' | 'sadaqah' | 'ramadan'>('calc');
  const [nisabStandard, setNisabStandard] = useState<'gold' | 'silver'>('silver');
  const [cash, setCash] = useState('5000');
  const [goldVal, setGoldVal] = useState('2000');
  const [investments, setInvestments] = useState('1000');
  const [debts, setDebts] = useState('500');

  const goldPricePerGram = 85;
  const silverPricePerGram = 1.1;

  const cashNum = parseFloat(cash) || 0;
  const goldNum = parseFloat(goldVal) || 0;
  const invNum = parseFloat(investments) || 0;
  const debtsNum = parseFloat(debts) || 0;

  const totalAssets = cashNum + goldNum + invNum;
  const netWealth = Math.max(0, totalAssets - debtsNum);
  const currentNisab =
    nisabStandard === 'silver'
      ? Math.round(NISAB_STANDARDS.silverGrams * silverPricePerGram)
      : Math.round(NISAB_STANDARDS.goldGrams * goldPricePerGram);

  const isEligible = netWealth >= currentNisab;
  const zakatDue = isEligible ? Math.round(netWealth * 0.025) : 0;

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
            <Text style={styles.title}>Zakat & Sadaqah Hub</Text>
            <Text style={styles.subtitle}>2.5% Purification & 9 Charity Channels</Text>
          </View>
        </View>

        {/* Tabs */}
        <View style={styles.tabRow}>
          {[
            { id: 'calc', label: '🧮 Calculator' },
            { id: 'sadaqah', label: '🤲 9 Sadaqah' },
            { id: 'ramadan', label: '🌙 Ramadan/Eid' },
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
        </View>

        <ScrollView contentContainerStyle={styles.contentScroll} showsVerticalScrollIndicator={false}>
          {activeTab === 'calc' && (
            <View style={styles.sectionWrap}>
              {/* Nisab Selector */}
              <View style={styles.card}>
                <Text style={styles.cardTitle}>Nisab Standard</Text>
                <View style={styles.nisabRow}>
                  <TouchableOpacity
                    style={[styles.nisabBtn, nisabStandard === 'silver' && styles.nisabBtnActive]}
                    onPress={() => setNisabStandard('silver')}
                  >
                    <Text style={[styles.nisabBtnText, nisabStandard === 'silver' && styles.nisabBtnTextActive]}>
                      Silver ({NISAB_STANDARDS.silverGrams}g) ~ ${Math.round(NISAB_STANDARDS.silverGrams * silverPricePerGram)}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.nisabBtn, nisabStandard === 'gold' && styles.nisabBtnActive]}
                    onPress={() => setNisabStandard('gold')}
                  >
                    <Text style={[styles.nisabBtnText, nisabStandard === 'gold' && styles.nisabBtnTextActive]}>
                      Gold ({NISAB_STANDARDS.goldGrams}g) ~ ${Math.round(NISAB_STANDARDS.goldGrams * goldPricePerGram)}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Inputs */}
              <View style={styles.card}>
                <Text style={styles.cardTitle}>Your Assets & Liabilities ($ USD)</Text>
                
                <Text style={styles.inputLabel}>Cash, Savings & Bank Balances</Text>
                <TextInput
                  style={styles.input}
                  keyboardType="numeric"
                  value={cash}
                  onChangeText={setCash}
                />

                <Text style={styles.inputLabel}>Gold, Silver & Precious Assets</Text>
                <TextInput
                  style={styles.input}
                  keyboardType="numeric"
                  value={goldVal}
                  onChangeText={setGoldVal}
                />

                <Text style={styles.inputLabel}>Stocks, Crypto & Trade Inventory</Text>
                <TextInput
                  style={styles.input}
                  keyboardType="numeric"
                  value={investments}
                  onChangeText={setInvestments}
                />

                <Text style={[styles.inputLabel, { color: '#f87171' }]}>Immediate Liabilities & Due Debts</Text>
                <TextInput
                  style={[styles.input, { borderColor: 'rgba(239, 68, 68, 0.4)' }]}
                  keyboardType="numeric"
                  value={debts}
                  onChangeText={setDebts}
                />
              </View>

              {/* Result Summary */}
              <View style={styles.resultCard}>
                <Text style={styles.resultTitle}>Total Zakat Payable (2.5%)</Text>
                <Text style={styles.resultAmount}>${zakatDue.toLocaleString()}</Text>
                <Text style={styles.resultSub}>
                  Net Zakatable: ${netWealth.toLocaleString()} • Status: {isEligible ? '✅ Nisab Exceeded' : 'ℹ️ Below Nisab'}
                </Text>
              </View>
            </View>
          )}

          {activeTab === 'sadaqah' && (
            <View style={styles.sectionWrap}>
              {SADAQAH_CATEGORIES.map((sc: SadaqahCategory) => (
                <View key={sc.id} style={styles.card}>
                  <View style={styles.sadaqahHeader}>
                    <Text style={styles.sadaqahIcon}>{sc.icon}</Text>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.sadaqahName}>{sc.name}</Text>
                      <Text style={styles.sadaqahArabic}>{sc.arabicName}</Text>
                    </View>
                  </View>
                  <Text style={styles.sadaqahDesc}>{sc.description}</Text>
                  <Text style={styles.sadaqahHadith}>🎯 {sc.impactMetric}</Text>
                  <TouchableOpacity
                    style={styles.giveBtn}
                    onPress={() => Alert.alert('Give Sadaqah', `Dedicate Sadaqah for ${sc.name} via verified partners.`)}
                  >
                    <Text style={styles.giveBtnText}>Support {sc.name}</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}

          {activeTab === 'ramadan' && (
            <View style={styles.sectionWrap}>
              <View style={styles.card}>
                <Text style={styles.cardTitle}>🌙 Laylat al-Qadr (Night of Decree)</Text>
                <Text style={styles.sadaqahDesc}>
                  Better than a thousand months. Seek it during the odd nights of the last 10 days of Ramadan.
                </Text>
                <Text style={styles.duaScript}>اللَّهُمَّ إِنَّكَ عَفُوٌّ تُحِبُّ الْعَفْوَ فَاعْفُ عَنِّي</Text>
                <Text style={styles.duaTranslit}>Allahumma innaka 'Afuwwun tuhibbul-'afwa fa'fu 'annee</Text>
                <Text style={styles.duaTrans}>"O Allah, You are Most Forgiving, and You love forgiveness; so forgive me." (Jami' at-Tirmidhi 3513)</Text>
              </View>

              <View style={styles.card}>
                <Text style={styles.cardTitle}>🕌 Taraweeh Prayers</Text>
                <Text style={styles.sadaqahDesc}>
                  "Whoever prays during the nights of Ramadan with faith and seeking reward, all his previous sins will be forgiven." (Sahih al-Bukhari 37)
                </Text>
              </View>

              <View style={styles.card}>
                <Text style={styles.cardTitle}>✨ Eid-ul-Fitr Preparations</Text>
                <Text style={styles.sunnahText}>• Pay Zakat al-Fitr before the Eid prayer</Text>
                <Text style={styles.sunnahText}>• Perform Ghusl before departing</Text>
                <Text style={styles.sunnahText}>• Eat an odd number of dates before leaving for prayer</Text>
                <Text style={styles.sunnahText}>• Recite the Eid Takbeeraat</Text>
                <Text style={styles.sunnahText}>• Return by a different route after prayer</Text>
              </View>
            </View>
          )}

          <View style={{ height: 60 }} />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#02120d' },
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.08)',
  },
  backBtn: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.06)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: { fontSize: 16, fontWeight: '800', color: '#ffffff' },
  subtitle: { fontSize: 11, color: '#f59e0b', marginTop: 1 },
  tabRow: {
    flexDirection: 'row',
    padding: 12,
    gap: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.06)',
  },
  tabBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: 'rgba(4, 35, 27, 0.7)',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  tabBtnActive: { backgroundColor: '#f59e0b', borderColor: '#fbbf24' },
  tabBtnText: { color: '#a7f3d0', fontSize: 11, fontWeight: '700' },
  tabBtnTextActive: { color: '#02120d', fontWeight: '900' },
  contentScroll: { padding: 16 },
  sectionWrap: { gap: 12 },
  card: {
    backgroundColor: '#031a14',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  cardTitle: { color: '#ffffff', fontSize: 14, fontWeight: '800', marginBottom: 10 },
  nisabRow: { flexDirection: 'row', gap: 8 },
  nisabBtn: {
    flex: 1,
    padding: 10,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.05)',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  nisabBtnActive: { backgroundColor: 'rgba(245, 158, 11, 0.2)', borderColor: '#f59e0b' },
  nisabBtnText: { color: '#e2e8f0', fontSize: 10, fontWeight: '600' },
  nisabBtnTextActive: { color: '#f59e0b', fontWeight: '800' },
  inputLabel: { color: '#a7f3d0', fontSize: 11, marginTop: 10, marginBottom: 4, fontWeight: '600' },
  input: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '700',
  },
  resultCard: {
    backgroundColor: 'rgba(245, 158, 11, 0.15)',
    borderRadius: 16,
    padding: 18,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#f59e0b',
  },
  resultTitle: { color: '#fde68a', fontSize: 12, fontWeight: '800', letterSpacing: 0.5 },
  resultAmount: { color: '#ffffff', fontSize: 32, fontWeight: '900', marginVertical: 6 },
  resultSub: { color: '#a7f3d0', fontSize: 11 },
  sadaqahHeader: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 8 },
  sadaqahIcon: { fontSize: 24 },
  sadaqahName: { color: '#ffffff', fontSize: 15, fontWeight: '800' },
  sadaqahArabic: { color: '#fde68a', fontSize: 12 },
  sadaqahDesc: { color: '#cbd5e1', fontSize: 12, lineHeight: 18, marginBottom: 8 },
  sadaqahHadith: { color: '#34d399', fontSize: 11, fontStyle: 'italic', marginBottom: 12 },
  giveBtn: {
    backgroundColor: '#10b981',
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  giveBtnText: { color: '#02120d', fontWeight: '900', fontSize: 12 },
  duaScript: { color: '#fef08a', fontSize: 18, textAlign: 'right', fontWeight: '700', marginVertical: 8 },
  duaTranslit: { color: '#93c5fd', fontSize: 11, fontStyle: 'italic', marginBottom: 4 },
  duaTrans: { color: '#e2e8f0', fontSize: 11, lineHeight: 16 },
  sunnahText: { color: '#e2e8f0', fontSize: 12, lineHeight: 20 },
});
