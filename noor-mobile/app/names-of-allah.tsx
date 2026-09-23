import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  Modal,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { NAMES_OF_ALLAH, NameOfAllah } from '../src/data/namesOfAllahData';
import { FloatingAiButton } from '../src/components/FloatingAiButton';
import { AiAssistantModal } from '../src/components/AiAssistantModal';

export default function NamesOfAllahScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedName, setSelectedName] = useState<NameOfAllah | null>(null);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);

  const filteredNames = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return NAMES_OF_ALLAH;
    return NAMES_OF_ALLAH.filter(
      item =>
        item.number.toString() === q ||
        item.transliteration.toLowerCase().includes(q) ||
        item.meaning.toLowerCase().includes(q) ||
        item.arabic.includes(q)
    );
  }, [searchQuery]);

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
            <Text style={styles.headerTitle}>Asma-ul-Husna</Text>
            <Text style={styles.headerSub}>The 99 Beautiful Names of Allah</Text>
          </View>
          <View style={styles.countBadge}>
            <Ionicons name="sparkles" size={12} color="#f59e0b" />
            <Text style={styles.countText}>99 Names</Text>
          </View>
        </View>

        {/* Hadith Citation Banner */}
        <View style={styles.hadithBanner}>
          <Text style={styles.hadithText}>
            "Allah has ninety-nine names, one hundred less one. Whoever memorizes and acts upon them will enter Paradise." — Sahih Bukhari 2736
          </Text>
        </View>

        {/* Search Bar */}
        <View style={styles.searchBar}>
          <Ionicons name="search-outline" size={18} color="#10b981" />
          <TextInput
            placeholder="Search by name, meaning, or number..."
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

        {/* Names Grid */}
        <FlatList
          data={filteredNames}
          keyExtractor={(item) => item.number.toString()}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapper}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.nameCard}
              activeOpacity={0.85}
              onPress={() => setSelectedName(item)}
            >
              <View style={styles.cardTopRow}>
                <View style={styles.numberBadge}>
                  <Text style={styles.numberText}>{item.number}</Text>
                </View>
                <Ionicons name="information-circle-outline" size={16} color="rgba(110, 231, 183, 0.5)" />
              </View>

              <Text style={styles.arabicName}>{item.arabic}</Text>
              <Text style={styles.translitName}>{item.transliteration}</Text>
              <Text style={styles.meaningText} numberOfLines={2}>{item.meaning}</Text>
            </TouchableOpacity>
          )}
        />

        {/* Name Detail Modal */}
        {selectedName && (
          <Modal
            visible={!!selectedName}
            animationType="fade"
            transparent
            onRequestClose={() => setSelectedName(null)}
          >
            <View style={styles.modalBackdrop}>
              <View style={styles.modalCard}>
                <View style={styles.modalTopRow}>
                  <View style={styles.modalNumberBadge}>
                    <Text style={styles.modalNumberText}>#{selectedName.number}</Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => setSelectedName(null)}
                    style={styles.modalCloseBtn}
                  >
                    <Ionicons name="close" size={20} color="#ffffff" />
                  </TouchableOpacity>
                </View>

                <Text style={styles.modalArabic}>{selectedName.arabic}</Text>
                <Text style={styles.modalTranslit}>{selectedName.transliteration}</Text>
                <Text style={styles.modalMeaning}>"{selectedName.meaning}"</Text>

                <View style={styles.modalExplanationBox}>
                  <Text style={styles.modalExplanationTitle}>Spiritual Contemplation:</Text>
                  <Text style={styles.modalExplanationText}>
                    {selectedName.explanation}
                  </Text>
                </View>

                <TouchableOpacity
                  style={styles.doneBtn}
                  onPress={() => setSelectedName(null)}
                >
                  <Text style={styles.doneBtnText}>SubhanAllah</Text>
                </TouchableOpacity>
              </View>
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
  countBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(245, 158, 11, 0.15)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.3)',
  },
  countText: {
    color: '#f59e0b',
    fontSize: 11,
    fontWeight: '800',
  },
  hadithBanner: {
    backgroundColor: '#031a14',
    borderRadius: 14,
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.2)',
  },
  hadithText: {
    color: 'rgba(110, 231, 183, 0.85)',
    fontSize: 11,
    lineHeight: 16,
    textAlign: 'center',
    fontStyle: 'italic',
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
  columnWrapper: {
    justifyContent: 'space-between',
    gap: 10,
  },
  listContent: {
    paddingBottom: 60,
    gap: 10,
  },
  nameCard: {
    flex: 1,
    backgroundColor: '#031a14',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: 'rgba(52, 211, 153, 0.12)',
    alignItems: 'center',
  },
  cardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
    marginBottom: 6,
  },
  numberBadge: {
    width: 24,
    height: 24,
    borderRadius: 8,
    backgroundColor: '#02120d',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.3)',
  },
  numberText: {
    color: '#f59e0b',
    fontSize: 10,
    fontWeight: '800',
  },
  arabicName: {
    color: '#fde68a',
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 4,
  },
  translitName: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '700',
    textAlign: 'center',
  },
  meaningText: {
    color: 'rgba(110, 231, 183, 0.75)',
    fontSize: 11,
    textAlign: 'center',
    marginTop: 2,
  },
  // Modal Styles
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalCard: {
    width: '100%',
    backgroundColor: '#031a14',
    borderRadius: 24,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.4)',
  },
  modalTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  modalNumberBadge: {
    backgroundColor: 'rgba(245, 158, 11, 0.15)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.3)',
  },
  modalNumberText: {
    color: '#f59e0b',
    fontSize: 12,
    fontWeight: '800',
  },
  modalCloseBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalArabic: {
    color: '#fde68a',
    fontSize: 38,
    fontWeight: 'bold',
    marginVertical: 6,
  },
  modalTranslit: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '800',
  },
  modalMeaning: {
    color: '#34d399',
    fontSize: 14,
    fontWeight: '600',
    marginTop: 4,
    marginBottom: 14,
  },
  modalExplanationBox: {
    backgroundColor: '#04281e',
    borderRadius: 16,
    padding: 14,
    width: '100%',
    borderWidth: 1,
    borderColor: 'rgba(52, 211, 153, 0.15)',
    marginBottom: 16,
  },
  modalExplanationTitle: {
    color: '#f59e0b',
    fontSize: 12,
    fontWeight: '800',
    marginBottom: 4,
  },
  modalExplanationText: {
    color: 'rgba(255, 255, 255, 0.85)',
    fontSize: 12,
    lineHeight: 18,
  },
  doneBtn: {
    backgroundColor: '#f59e0b',
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 12,
  },
  doneBtnText: {
    color: '#031712',
    fontSize: 13,
    fontWeight: '800',
  },
});
