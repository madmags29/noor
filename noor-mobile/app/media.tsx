import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Modal,
  Share,
  StatusBar,
  Linking,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useVideoPlayer, VideoView } from 'expo-video';
import { MEDIA_GALLERY, ISLAMIC_VIDEOS, MediaItem, VideoItem } from '../src/data/mediaData';
import { FloatingAiButton } from '../src/components/FloatingAiButton';
import { AiAssistantModal } from '../src/components/AiAssistantModal';

function ActiveVideoPlayer({ videoUrl }: { videoUrl: string }) {
  const player = useVideoPlayer(videoUrl, p => {
    p.loop = true;
    p.play();
  });

  return (
    <VideoView
      style={styles.nativeVideoPlayer}
      player={player}
      nativeControls
      contentFit="contain"
      allowsPictureInPicture
      fullscreenOptions={{ enable: true }}
    />
  );
}

const CATEGORIES = ['All', 'Makkah', 'Madinah', 'Holy Quran', 'Architecture', 'Calligraphy', 'Twilight'];

export default function MediaScreen() {
  const router = useRouter();
  const [mediaTab, setMediaTab] = useState<'photos' | 'videos'>('photos');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [previewPhoto, setPreviewPhoto] = useState<MediaItem | null>(null);
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);
  const [likedIds, setLikedIds] = useState<number[]>([101, 103, 105, 201]);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);

  const filteredPhotos = MEDIA_GALLERY.filter(item => {
    if (selectedCategory === 'All') return true;
    return item.category === selectedCategory;
  });

  const filteredVideos = ISLAMIC_VIDEOS.filter(item => {
    if (selectedCategory === 'All') return true;
    return item.category === selectedCategory;
  });

  const toggleLike = (id: number) => {
    setLikedIds(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const handleShare = async (item: MediaItem | VideoItem) => {
    try {
      const url = 'hdUrl' in item ? item.hdUrl : item.videoUrl;
      await Share.share({
        message: `${item.title}\n${item.location}\nShared from Noor-e-ilahi Islamic Media: ${url}`,
      });
    } catch (e) {
      // ignore
    }
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
            <Text style={styles.headerTitle}>Islamic Visual Gallery</Text>
            <Text style={styles.headerSub}>4K Cinematography & Sacred Photography</Text>
          </View>
          <View style={styles.badgeCount}>
            <Ionicons name={mediaTab === 'photos' ? 'images-outline' : 'videocam-outline'} size={13} color="#f59e0b" />
            <Text style={styles.badgeText}>
              {mediaTab === 'photos' ? `${MEDIA_GALLERY.length} Photos` : `${ISLAMIC_VIDEOS.length} Videos`}
            </Text>
          </View>
        </View>

        {/* Media Type Switcher: Photos vs Videos */}
        <View style={styles.mediaTypeRow}>
          <TouchableOpacity
            style={[styles.typeBtn, mediaTab === 'photos' && styles.typeBtnActive]}
            onPress={() => setMediaTab('photos')}
          >
            <Ionicons
              name="image-outline"
              size={15}
              color={mediaTab === 'photos' ? '#02120d' : '#6ee7b7'}
            />
            <Text style={[styles.typeBtnText, mediaTab === 'photos' && styles.typeBtnTextActive]}>
              Sacred Photos ({MEDIA_GALLERY.length})
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.typeBtn, mediaTab === 'videos' && styles.typeBtnActive]}
            onPress={() => setMediaTab('videos')}
          >
            <Ionicons
              name="play-circle-outline"
              size={16}
              color={mediaTab === 'videos' ? '#02120d' : '#6ee7b7'}
            />
            <Text style={[styles.typeBtnText, mediaTab === 'videos' && styles.typeBtnTextActive]}>
              4K Videos ({ISLAMIC_VIDEOS.length})
            </Text>
          </TouchableOpacity>
        </View>

        {/* Category Pills */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryRow}
        >
          {CATEGORIES.map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[styles.catPill, selectedCategory === cat && styles.catPillActive]}
              onPress={() => setSelectedCategory(cat)}
            >
              <Text style={[styles.catPillText, selectedCategory === cat && styles.catPillTextActive]}>
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Media Content Grid */}
        <ScrollView
          contentContainerStyle={styles.gridContent}
          showsVerticalScrollIndicator={false}
        >
          {mediaTab === 'photos' ? (
            <View style={styles.grid}>
              {filteredPhotos.map((item) => {
                const isLiked = likedIds.includes(item.id);
                return (
                  <TouchableOpacity
                    key={item.id}
                    style={styles.card}
                    activeOpacity={0.88}
                    onPress={() => setPreviewPhoto(item)}
                  >
                    <Image
                      source={{ uri: item.previewUrl }}
                      style={styles.cardImage}
                      resizeMode="cover"
                    />
                    <View style={styles.cardGradient}>
                      <View style={styles.tagBadge}>
                        <Text style={styles.tagBadgeText}>{item.category}</Text>
                      </View>
                      <Text style={styles.cardTitle} numberOfLines={2}>
                        {item.title}
                      </Text>
                      <View style={styles.cardMetaRow}>
                        <View style={styles.locationGroup}>
                          <Ionicons name="location-outline" size={11} color="#6ee7b7" />
                          <Text style={styles.locationText} numberOfLines={1}>
                            {item.location}
                          </Text>
                        </View>
                        <TouchableOpacity
                          onPress={() => toggleLike(item.id)}
                          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                        >
                          <Ionicons
                            name={isLiked ? 'heart' : 'heart-outline'}
                            size={16}
                            color={isLiked ? '#ef4444' : '#ffffff'}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          ) : (
            <View style={styles.videosList}>
              {filteredVideos.map((video) => {
                const isLiked = likedIds.includes(video.id);
                return (
                  <TouchableOpacity
                    key={video.id}
                    style={styles.videoCard}
                    activeOpacity={0.88}
                    onPress={() => setActiveVideo(video)}
                  >
                    <View style={styles.videoThumbBox}>
                      <Image
                        source={{ uri: video.thumbnail }}
                        style={styles.videoThumb}
                        resizeMode="cover"
                      />
                      {/* Play Icon Badge */}
                      <View style={styles.playButtonCircle}>
                        <Ionicons name="play" size={24} color="#031712" />
                      </View>
                      {/* Duration Tag */}
                      <View style={styles.durationTag}>
                        <Text style={styles.durationText}>{video.duration}</Text>
                      </View>
                      {/* Category Tag */}
                      <View style={styles.videoCategoryTag}>
                        <Text style={styles.videoCategoryText}>{video.category}</Text>
                      </View>
                    </View>

                    <View style={styles.videoInfoBox}>
                      <View style={styles.videoTitleRow}>
                        <Text style={styles.videoTitleText} numberOfLines={2}>
                          {video.title}
                        </Text>
                        <TouchableOpacity
                          onPress={() => toggleLike(video.id)}
                          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                        >
                          <Ionicons
                            name={isLiked ? 'heart' : 'heart-outline'}
                            size={18}
                            color={isLiked ? '#ef4444' : '#6ee7b7'}
                          />
                        </TouchableOpacity>
                      </View>
                      <Text style={styles.videoDescText} numberOfLines={2}>
                        {video.description}
                      </Text>
                      <View style={styles.videoMetaFooter}>
                        <View style={styles.videoLocationGroup}>
                          <Ionicons name="location-outline" size={12} color="#f59e0b" />
                          <Text style={styles.videoLocationText}>{video.location}</Text>
                        </View>
                        <Text style={styles.videoViewsText}>👁️ {video.views.toLocaleString()} views</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          )}
          <View style={{ height: 60 }} />
        </ScrollView>

        {/* Fullscreen Photo Preview Modal */}
        {previewPhoto && (
          <Modal
            visible={!!previewPhoto}
            animationType="fade"
            transparent
            onRequestClose={() => setPreviewPhoto(null)}
          >
            <View style={styles.modalBackdrop}>
              <View style={styles.modalContent}>
                <View style={styles.modalTopBar}>
                  <View style={styles.modalTitleBox}>
                    <Text style={styles.modalTitle}>{previewPhoto.title}</Text>
                    <Text style={styles.modalLocation}>{previewPhoto.location}</Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => setPreviewPhoto(null)}
                    style={styles.modalCloseBtn}
                  >
                    <Ionicons name="close" size={22} color="#ffffff" />
                  </TouchableOpacity>
                </View>

                <Image
                  source={{ uri: previewPhoto.hdUrl }}
                  style={styles.modalHdImage}
                  resizeMode="contain"
                />

                <View style={styles.modalBottomBar}>
                  <View style={styles.modalStats}>
                    <Text style={styles.modalStatText}>
                      ❤️ {previewPhoto.likes + (likedIds.includes(previewPhoto.id) ? 1 : 0)} Likes
                    </Text>
                    <Text style={styles.modalStatDot}>•</Text>
                    <Text style={styles.modalStatText}>👁️ {previewPhoto.views.toLocaleString()} Views</Text>
                  </View>

                  <View style={styles.modalActions}>
                    <TouchableOpacity
                      style={styles.modalActionBtn}
                      onPress={() => toggleLike(previewPhoto.id)}
                    >
                      <Ionicons
                        name={likedIds.includes(previewPhoto.id) ? 'heart' : 'heart-outline'}
                        size={18}
                        color={likedIds.includes(previewPhoto.id) ? '#ef4444' : '#ffffff'}
                      />
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[styles.modalActionBtn, styles.shareBtn]}
                      onPress={() => handleShare(previewPhoto)}
                    >
                      <Ionicons name="share-social-outline" size={18} color="#031712" />
                      <Text style={styles.shareBtnText}>Share</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </Modal>
        )}

        {/* Video Player Modal */}
        {activeVideo && (
          <Modal
            visible={!!activeVideo}
            animationType="slide"
            presentationStyle="pageSheet"
            onRequestClose={() => setActiveVideo(null)}
          >
            <View style={styles.videoModalRoot}>
              <View style={styles.videoModalHeader}>
                <View>
                  <Text style={styles.videoModalTitle}>{activeVideo.title}</Text>
                  <Text style={styles.videoModalLocation}>{activeVideo.location}</Text>
                </View>
                <TouchableOpacity
                  onPress={() => setActiveVideo(null)}
                  style={styles.modalCloseBtn}
                >
                  <Ionicons name="close" size={22} color="#ffffff" />
                </TouchableOpacity>
              </View>

              <View style={styles.videoPlayerContainer}>
                <ActiveVideoPlayer videoUrl={activeVideo.videoUrl} />
              </View>

              <ScrollView style={styles.videoDetailsScroll} contentContainerStyle={{ padding: 16 }}>
                <View style={styles.videoDetailCard}>
                  <Text style={styles.videoDetailHeading}>About this Sacred Visual</Text>
                  <Text style={styles.videoDetailDesc}>{activeVideo.description}</Text>
                  <View style={styles.videoDetailMetaRow}>
                    <Text style={styles.videoDetailMetaText}>Duration: {activeVideo.duration}</Text>
                    <Text style={styles.videoDetailMetaDot}>•</Text>
                    <Text style={styles.videoDetailMetaText}>Views: {activeVideo.views.toLocaleString()}</Text>
                    <Text style={styles.videoDetailMetaDot}>•</Text>
                    <Text style={styles.videoDetailMetaText}>4K Master</Text>
                  </View>
                </View>

                <TouchableOpacity
                  style={styles.videoShareAction}
                  onPress={() => handleShare(activeVideo)}
                >
                  <Ionicons name="share-social-outline" size={18} color="#031712" />
                  <Text style={styles.videoShareActionText}>Share Video with Family & Friends</Text>
                </TouchableOpacity>
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
  badgeCount: {
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
  badgeText: {
    color: '#f59e0b',
    fontSize: 11,
    fontWeight: '800',
  },
  mediaTypeRow: {
    flexDirection: 'row',
    backgroundColor: '#04231b',
    borderRadius: 14,
    padding: 4,
    marginVertical: 8,
    gap: 6,
    borderWidth: 1,
    borderColor: 'rgba(52, 211, 153, 0.18)',
  },
  typeBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 8,
    borderRadius: 10,
  },
  typeBtnActive: {
    backgroundColor: '#10b981',
  },
  typeBtnText: {
    color: '#6ee7b7',
    fontSize: 12,
    fontWeight: '700',
  },
  typeBtnTextActive: {
    color: '#02120d',
    fontWeight: '900',
  },
  categoryRow: {
    gap: 8,
    paddingVertical: 6,
  },
  catPill: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 12,
    backgroundColor: '#04231b',
    borderWidth: 1,
    borderColor: 'rgba(52, 211, 153, 0.18)',
  },
  catPillActive: {
    backgroundColor: '#f59e0b',
    borderColor: '#f59e0b',
  },
  catPillText: {
    color: '#6ee7b7',
    fontSize: 11,
    fontWeight: '700',
  },
  catPillTextActive: {
    color: '#02120d',
    fontWeight: '900',
  },
  gridContent: {
    paddingBottom: 40,
    marginTop: 8,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  card: {
    width: '48%',
    height: 200,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#031a14',
    borderWidth: 1,
    borderColor: 'rgba(52, 211, 153, 0.15)',
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  cardGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 10,
    backgroundColor: 'rgba(2, 18, 13, 0.85)',
  },
  tagBadge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(245, 158, 11, 0.2)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    marginBottom: 4,
  },
  tagBadgeText: {
    color: '#f59e0b',
    fontSize: 9,
    fontWeight: '800',
  },
  cardTitle: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '700',
    lineHeight: 16,
  },
  cardMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 6,
  },
  locationGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    flex: 1,
  },
  locationText: {
    color: '#6ee7b7',
    fontSize: 10,
    fontWeight: '600',
  },
  // Video Cards
  videosList: {
    gap: 14,
  },
  videoCard: {
    backgroundColor: '#031a14',
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(52, 211, 153, 0.15)',
  },
  videoThumbBox: {
    width: '100%',
    height: 180,
    position: 'relative',
  },
  videoThumb: {
    width: '100%',
    height: '100%',
  },
  playButtonCircle: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -26,
    marginLeft: -26,
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#f59e0b',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#f59e0b',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 8,
  },
  durationTag: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  durationText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: '700',
  },
  videoCategoryTag: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: 'rgba(16, 185, 129, 0.85)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  videoCategoryText: {
    color: '#02120d',
    fontSize: 10,
    fontWeight: '800',
  },
  videoInfoBox: {
    padding: 14,
  },
  videoTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  videoTitleText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '800',
    flex: 1,
    marginRight: 8,
  },
  videoDescText: {
    color: 'rgba(110, 231, 183, 0.8)',
    fontSize: 11,
    lineHeight: 16,
    marginBottom: 8,
  },
  videoMetaFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  videoLocationGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  videoLocationText: {
    color: '#fde68a',
    fontSize: 11,
    fontWeight: '600',
  },
  videoViewsText: {
    color: 'rgba(110, 231, 183, 0.6)',
    fontSize: 10,
  },
  // Modal Photo Preview
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.94)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  modalContent: {
    width: '100%',
    maxHeight: '90%',
    backgroundColor: '#031a14',
    borderRadius: 24,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.3)',
  },
  modalTopBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  modalTitleBox: {
    flex: 1,
    marginRight: 10,
  },
  modalTitle: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '800',
  },
  modalLocation: {
    color: '#6ee7b7',
    fontSize: 11,
    marginTop: 2,
  },
  modalCloseBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalHdImage: {
    width: '100%',
    height: 340,
    borderRadius: 16,
  },
  modalBottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 14,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: 'rgba(52, 211, 153, 0.15)',
  },
  modalStats: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  modalStatText: {
    color: '#6ee7b7',
    fontSize: 11,
    fontWeight: '600',
  },
  modalStatDot: {
    color: 'rgba(110, 231, 183, 0.4)',
  },
  modalActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  modalActionBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#04281e',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(52, 211, 153, 0.2)',
  },
  shareBtn: {
    width: 'auto',
    flexDirection: 'row',
    gap: 6,
    paddingHorizontal: 14,
    backgroundColor: '#f59e0b',
    borderColor: '#f59e0b',
  },
  shareBtnText: {
    color: '#031712',
    fontSize: 12,
    fontWeight: '800',
  },
  // Video Modal Styles
  videoModalRoot: {
    flex: 1,
    backgroundColor: '#02120d',
  },
  videoModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(52, 211, 153, 0.15)',
    backgroundColor: '#031712',
  },
  videoModalTitle: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '800',
  },
  videoModalLocation: {
    color: '#6ee7b7',
    fontSize: 11,
    marginTop: 2,
  },
  videoPlayerContainer: {
    width: '100%',
    height: 240,
    backgroundColor: '#000000',
  },
  nativeVideoPlayer: {
    width: '100%',
    height: '100%',
  },
  videoDetailsScroll: {
    flex: 1,
  },
  videoDetailCard: {
    backgroundColor: '#031a14',
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(52, 211, 153, 0.15)',
  },
  videoDetailHeading: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '800',
    marginBottom: 6,
  },
  videoDetailDesc: {
    color: 'rgba(110, 231, 183, 0.85)',
    fontSize: 12,
    lineHeight: 18,
  },
  videoDetailMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 12,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: 'rgba(52, 211, 153, 0.12)',
  },
  videoDetailMetaText: {
    color: '#f59e0b',
    fontSize: 11,
    fontWeight: '700',
  },
  videoDetailMetaDot: {
    color: 'rgba(110, 231, 183, 0.4)',
  },
  videoShareAction: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#f59e0b',
    paddingVertical: 14,
    borderRadius: 16,
    marginTop: 16,
  },
  videoShareActionText: {
    color: '#031712',
    fontSize: 14,
    fontWeight: '900',
  },
});
