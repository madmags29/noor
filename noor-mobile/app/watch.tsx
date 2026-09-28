import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Linking,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { THEME } from '../src/theme';
import { useLanguage } from '../src/context/LanguageContext';
import { PERMITTED_VIDEOS, PermittedVideo } from '../src/data/islamicCoreData';

export default function WatchScreen() {
  const router = useRouter();
  const { t } = useLanguage();
  const [selectedCat, setSelectedCat] = useState<string>('All');

  const filteredVideos = PERMITTED_VIDEOS.filter(v => {
    return selectedCat === 'All' || v.category === selectedCat;
  });

  const handleOpenVideo = (video: PermittedVideo) => {
    // Open YouTube link or embed URL directly
    let target = video.sourceUrl;
    if (target.includes('embed/')) {
      target = target.replace('/embed/', '/watch?v=').replace('youtube-nocookie.com', 'youtube.com');
    }
    Linking.openURL(target).catch(() => {
      Linking.openURL(video.sourceUrl);
    });
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
              <Text style={styles.title}>NOOR Sacred Watch</Text>
              <View style={styles.liveBadgeHeader}>
                <View style={styles.liveDot} />
                <Text style={styles.liveBadgeText}>Live & Curated</Text>
              </View>
            </View>
            <Text style={styles.subtitle}>24/7 Makkah & Madinah Live • Seerah & Quran</Text>
          </View>
        </View>

        {/* Category Tabs */}
        <View style={styles.catRow}>
          {['All', 'Live', 'Quran', 'Seerah'].map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[styles.catBtn, selectedCat === cat && styles.catBtnActive]}
              onPress={() => setSelectedCat(cat)}
            >
              <Text style={[styles.catText, selectedCat === cat && styles.catTextActive]}>
                {cat === 'All' ? '✨ All Streams' : cat === 'Live' ? '🔴 Live 24/7' : cat}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Videos ScrollView */}
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {filteredVideos.map((video: PermittedVideo) => (
            <TouchableOpacity
              key={video.id}
              style={styles.videoCard}
              activeOpacity={0.88}
              onPress={() => handleOpenVideo(video)}
            >
              {/* Thumbnail Container */}
              <View style={styles.thumbnailWrap}>
                <Image
                  source={{ uri: video.thumbnail }}
                  style={styles.thumbnailImg}
                  resizeMode="cover"
                />
                <View style={styles.thumbOverlay} />

                {/* Duration / Live Badge */}
                <View style={styles.badgeTopLeft}>
                  {video.category === 'Live' ? (
                    <View style={styles.liveTag}>
                      <View style={styles.pulsingDot} />
                      <Text style={styles.liveTagText}>LIVE STREAM</Text>
                    </View>
                  ) : (
                    <View style={styles.durationTag}>
                      <Ionicons name="time-outline" size={11} color="#ffffff" />
                      <Text style={styles.durationText}>{video.duration}</Text>
                    </View>
                  )}
                </View>

                {/* Big Center Play Button */}
                <View style={styles.playCenterBtn}>
                  <Ionicons name="play" size={24} color="#031712" />
                </View>
              </View>

              {/* Meta details */}
              <View style={styles.metaBox}>
                <View style={styles.categoryRow}>
                  <Text style={styles.categoryTag}>{video.category.toUpperCase()}</Text>
                  <Text style={styles.licensedPill}>Strictly Permitted Embed</Text>
                </View>
                <Text style={styles.videoTitle}>{video.title}</Text>
                <Text style={styles.videoSub}>{video.subtitle}</Text>
              </View>
            </TouchableOpacity>
          ))}

          {/* Sacred Haramain Live Audio Notice */}
          <View style={styles.noticeCard}>
            <Ionicons name="information-circle-outline" size={20} color="#f59e0b" />
            <View style={{ flex: 1 }}>
              <Text style={styles.noticeTitle}>High-Definition Sanctified Broadcasts</Text>
              <Text style={styles.noticeDesc}>
                Official permitted live streams from the General Presidency for the Affairs of the Two Holy Mosques.
              </Text>
            </View>
          </View>

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
  },
  title: {
    color: '#ffffff',
    fontSize: 17,
    fontWeight: '700',
  },
  liveBadgeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(239, 68, 68, 0.2)',
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.4)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    gap: 4,
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#ef4444',
  },
  liveBadgeText: {
    color: '#fca5a5',
    fontSize: 10,
    fontWeight: '700',
  },
  subtitle: {
    color: 'rgba(110, 231, 183, 0.7)',
    fontSize: 11,
    marginTop: 2,
  },
  catRow: {
    flexDirection: 'row',
    gap: 6,
    paddingVertical: 8,
  },
  catBtn: {
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.15)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  catBtnActive: {
    backgroundColor: '#f59e0b',
    borderColor: '#f59e0b',
  },
  catText: {
    color: '#d1fae5',
    fontSize: 11,
    fontWeight: '600',
  },
  catTextActive: {
    color: '#031712',
    fontWeight: '700',
  },
  scrollContent: {
    paddingTop: 8,
    gap: 16,
  },
  videoCard: {
    backgroundColor: '#031a14',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.25)',
    overflow: 'hidden',
  },
  thumbnailWrap: {
    height: 190,
    width: '100%',
    position: 'relative',
    backgroundColor: '#000000',
  },
  thumbnailImg: {
    width: '100%',
    height: '100%',
  },
  thumbOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
  },
  badgeTopLeft: {
    position: 'absolute',
    top: 12,
    left: 12,
  },
  liveTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ef4444',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    gap: 4,
  },
  pulsingDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#ffffff',
  },
  liveTagText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  durationTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    gap: 4,
  },
  durationText: {
    color: '#ffffff',
    fontSize: 11,
    fontWeight: '600',
  },
  playCenterBtn: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -24 }, { translateY: -24 }],
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#f59e0b',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 8,
  },
  metaBox: {
    padding: 14,
    gap: 4,
  },
  categoryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  categoryTag: {
    color: '#34d399',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.6,
  },
  licensedPill: {
    color: 'rgba(255, 255, 255, 0.45)',
    fontSize: 9,
    fontFamily: 'monospace',
  },
  videoTitle: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '700',
  },
  videoSub: {
    color: 'rgba(110, 231, 183, 0.7)',
    fontSize: 12,
  },
  noticeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(245, 158, 11, 0.1)',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.25)',
    padding: 12,
    gap: 10,
  },
  noticeTitle: {
    color: '#f59e0b',
    fontSize: 12,
    fontWeight: '700',
  },
  noticeDesc: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 11,
    lineHeight: 16,
    marginTop: 2,
  },
});
