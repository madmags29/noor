import React, { useState, useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useAudioPlayer, useAudioPlayerStatus } from 'expo-audio';
import { THEME } from '../theme';
import { useLanguage } from '../context/LanguageContext';

export interface AdhanVoice {
  id: string;
  name: string;
  location: string;
  city: string;
  audioUrl: string;
  description: string;
  isFajrSpecial?: boolean;
}

export const ADHAN_VOICES: AdhanVoice[] = [
  {
    id: 'adhan-makkah-mulla',
    name: 'Sheikh Ali Ahmed Mulla',
    location: 'Masjid al-Haram',
    city: 'Makkah Al-Mukarramah 🕋',
    audioUrl: 'https://cdn.aladhan.com/audio/adhans/a1.mp3',
    description: 'The legendary "Bilal of the Haram" whose majestic call has echoed across Makkah for over 40 years.',
  },
  {
    id: 'adhan-madinah-bukhari',
    name: 'Sheikh Essam Bukhari',
    location: 'Al-Masjid An-Nabawi',
    city: 'Madinah Al-Munawwarah 🕌',
    audioUrl: 'https://cdn.aladhan.com/audio/adhans/a2.mp3',
    description: 'Serene and spiritually uplifting call to prayer from the Prophet’s ﷺ holy mosque in Madinah.',
  },
  {
    id: 'adhan-al-aqsa',
    name: 'Al-Aqsa Mosque Sanctuary',
    location: 'Al-Haram Al-Sharif',
    city: 'Jerusalem / Al-Quds 🇵🇸',
    audioUrl: 'https://cdn.aladhan.com/audio/adhans/a3.mp3',
    description: 'Resonant historic call to prayer from the third holiest site in Islam.',
  },
  {
    id: 'adhan-makkah-fajr',
    name: 'Sacred Fajr Adhan',
    location: 'Masjid al-Haram (Dawn)',
    city: 'Makkah Al-Mukarramah 🌅',
    audioUrl: 'https://cdn.aladhan.com/audio/adhans/a6.mp3',
    description: 'Features the sacred dawn phrase: "As-Salatu Khayrun Minan-Nawm" (Prayer is better than sleep).',
    isFajrSpecial: true,
  },
  {
    id: 'adhan-cairo-ismail',
    name: 'Sheikh Mustafa Ismail',
    location: 'Al-Azhar Grand Mosque',
    city: 'Cairo, Egypt 🇪🇬',
    audioUrl: 'https://cdn.aladhan.com/audio/adhans/a4.mp3',
    description: 'Classical Egyptian maqam tradition with sublime spiritual ornamentation.',
  },
  {
    id: 'adhan-alafasy',
    name: 'Mishary Rashid Alafasy',
    location: 'Grand Mosque of Kuwait',
    city: 'Kuwait 🇰🇼',
    audioUrl: 'https://cdn.aladhan.com/audio/adhans/a5.mp3',
    description: 'Heartfelt, crystal-clear recitation beloved by millions of Muslims worldwide.',
  },
  {
    id: 'adhan-istanbul-ottoman',
    name: 'Sultanahmet Blue Mosque',
    location: 'Historic Ottoman Sanctuary',
    city: 'Istanbul, Turkey 🇹🇷',
    audioUrl: 'https://cdn.aladhan.com/audio/adhans/a7.mp3',
    description: 'Classical Ottoman Turkish maqam Sabā melody echoing between Hagia Sophia and the Blue Mosque.',
  },
];

interface AdhanVoiceModalProps {
  visible: boolean;
  onClose: () => void;
  activeAdhanId: string;
  onSelectAdhan: (adhan: AdhanVoice) => void;
}

function AudioPlayButton({
  url,
  isPlaying,
  onTogglePlay,
}: {
  url: string;
  isPlaying: boolean;
  onTogglePlay: () => void;
}) {
  return (
    <TouchableOpacity
      style={[styles.playBtn, isPlaying && styles.playBtnActive]}
      onPress={onTogglePlay}
    >
      <Ionicons
        name={isPlaying ? 'pause' : 'play'}
        size={16}
        color={isPlaying ? '#031712' : '#f59e0b'}
      />
    </TouchableOpacity>
  );
}

export const AdhanVoiceModal: React.FC<AdhanVoiceModalProps> = ({
  visible,
  onClose,
  activeAdhanId,
  onSelectAdhan,
}) => {
  const { t } = useLanguage();
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [currentUrl, setCurrentUrl] = useState<string>(ADHAN_VOICES[0].audioUrl);

  const player = useAudioPlayer(currentUrl);
  const status = useAudioPlayerStatus(player);

  const handleTogglePlay = (item: AdhanVoice) => {
    if (playingId === item.id) {
      player.pause();
      setPlayingId(null);
    } else {
      setCurrentUrl(item.audioUrl);
      player.replace(item.audioUrl);
      player.play();
      setPlayingId(item.id);
    }
  };

  const handleStopAndClose = () => {
    player.pause();
    setPlayingId(null);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={handleStopAndClose}
    >
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.headerTitle}>{t('adhanVoice') || 'Adhan Voices'} ({t('callToPrayer') || 'Call to Prayer'})</Text>
            <Text style={styles.headerSub}>Authentic Mu'adhin recitations from the Islamic world</Text>
          </View>
          <TouchableOpacity onPress={handleStopAndClose} style={styles.closeBtn}>
            <Ionicons name="close" size={22} color="#ffffff" />
          </TouchableOpacity>
        </View>

        {/* Adhan List */}
        <ScrollView contentContainerStyle={styles.scrollList} showsVerticalScrollIndicator={false}>
          {ADHAN_VOICES.map(adhan => {
            const isSelected = activeAdhanId === adhan.id;
            const isPlaying = playingId === adhan.id && status.playing;

            return (
              <View
                key={adhan.id}
                style={[styles.card, isSelected && styles.cardSelected]}
              >
                <View style={styles.cardTopRow}>
                  <View style={styles.infoCol}>
                    <View style={styles.titleRow}>
                      <Text style={styles.nameText}>{adhan.name}</Text>
                      {adhan.isFajrSpecial && (
                        <View style={styles.fajrBadge}>
                          <Text style={styles.fajrBadgeText}>Fajr Special</Text>
                        </View>
                      )}
                    </View>
                    <Text style={styles.cityText}>{adhan.city}</Text>
                    <Text style={styles.locText}>📍 {adhan.location}</Text>
                  </View>

                  {/* Play / Preview Button */}
                  <AudioPlayButton
                    url={adhan.audioUrl}
                    isPlaying={isPlaying}
                    onTogglePlay={() => handleTogglePlay(adhan)}
                  />
                </View>

                <Text style={styles.descText}>{adhan.description}</Text>

                {/* Card Footer Actions */}
                <View style={styles.cardFooter}>
                  <TouchableOpacity
                    style={[styles.selectBtn, isSelected && styles.selectBtnActive]}
                    onPress={() => onSelectAdhan(adhan)}
                  >
                    <Ionicons
                      name={isSelected ? 'checkmark-circle' : 'radio-button-off'}
                      size={16}
                      color={isSelected ? '#031712' : '#6ee7b7'}
                    />
                    <Text style={[styles.selectBtnText, isSelected && styles.selectBtnTextActive]}>
                      {isSelected ? 'Active Prayer Call' : 'Select This Adhan'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#02120d',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.08)',
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 17,
    fontWeight: '800',
  },
  headerSub: {
    color: 'rgba(110, 231, 183, 0.7)',
    fontSize: 11,
    marginTop: 2,
  },
  closeBtn: {
    padding: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
  },
  scrollList: {
    padding: 16,
    gap: 12,
  },
  card: {
    backgroundColor: '#031c15',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  cardSelected: {
    borderColor: 'rgba(245, 158, 11, 0.6)',
    backgroundColor: '#04251c',
  },
  cardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  infoCol: {
    flex: 1,
    marginRight: 12,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  nameText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '800',
  },
  fajrBadge: {
    backgroundColor: 'rgba(245, 158, 11, 0.2)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.4)',
  },
  fajrBadgeText: {
    color: '#fde68a',
    fontSize: 9,
    fontWeight: 'bold',
  },
  cityText: {
    color: '#f59e0b',
    fontSize: 12,
    fontWeight: '700',
    marginTop: 2,
  },
  locText: {
    color: 'rgba(110, 231, 183, 0.7)',
    fontSize: 11,
    marginTop: 2,
  },
  playBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(245, 158, 11, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.35)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playBtnActive: {
    backgroundColor: '#f59e0b',
  },
  descText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 11.5,
    lineHeight: 16,
    marginTop: 10,
  },
  cardFooter: {
    marginTop: 12,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.06)',
  },
  selectBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 8,
    borderRadius: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  selectBtnActive: {
    backgroundColor: '#f59e0b',
    borderColor: '#f59e0b',
  },
  selectBtnText: {
    color: '#6ee7b7',
    fontSize: 12,
    fontWeight: '700',
  },
  selectBtnTextActive: {
    color: '#031712',
    fontWeight: '900',
  },
});
