// ============================================================
// NOOR — Sacred Media Gallery & Audio Stream (Flutter)
// High-Resolution Visual Treasures & Holy Adhans/Recitations
// ============================================================

import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:just_audio/just_audio.dart';
import 'package:cached_network_image/cached_network_image.dart';
import 'package:share_plus/share_plus.dart';
import '../../theme/app_theme.dart';
import '../../l10n/app_localizations.dart';

class MediaItem {
  final int id;
  final String title;
  final String tags;
  final String imageUrl;
  final String largeImageUrl;
  final int likes;
  final int views;
  final String user;

  const MediaItem({
    required this.id,
    required this.title,
    required this.tags,
    required this.imageUrl,
    required this.largeImageUrl,
    required this.likes,
    required this.views,
    required this.user,
  });
}

const List<MediaItem> kCuratedMediaItems = [
  MediaItem(
    id: 101,
    title: 'The Holy Kaaba • Makkah Al-Mukarramah',
    tags: 'Makkah, Kaaba, Masjid al-Haram, Pilgrimage',
    imageUrl: 'https://images.unsplash.com/photo-1565552645632-d725f8bfc19a?w=800&q=85',
    largeImageUrl: 'https://images.unsplash.com/photo-1565552645632-d725f8bfc19a?w=1600&q=90',
    likes: 9820,
    views: 124000,
    user: 'Noor Islamic Media',
  ),
  MediaItem(
    id: 102,
    title: 'Tawaf Around the Sacred Kaaba • Pilgrims',
    tags: 'Makkah, Kaaba, Tawaf, Umrah',
    imageUrl: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=800&q=85',
    largeImageUrl: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=1600&q=90',
    likes: 8450,
    views: 98000,
    user: 'Noor Islamic Media',
  ),
  MediaItem(
    id: 103,
    title: 'Prophet’s Mosque • Madinah Munawwarah Arches',
    tags: 'Madinah, Green Dome, Masjid Nabawi',
    imageUrl: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?w=800&q=85',
    largeImageUrl: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?w=1600&q=90',
    likes: 7950,
    views: 89000,
    user: 'Noor Islamic Media',
  ),
  MediaItem(
    id: 104,
    title: 'Madinah Minarets & Sacred Marble Courtyard',
    tags: 'Madinah, Mosque, Minarets',
    imageUrl: 'https://images.unsplash.com/photo-1580418827493-f2b22c0a76cb?w=800&q=85',
    largeImageUrl: 'https://images.unsplash.com/photo-1580418827493-f2b22c0a76cb?w=1600&q=90',
    likes: 6420,
    views: 74200,
    user: 'Noor Islamic Media',
  ),
  MediaItem(
    id: 105,
    title: 'Noble Quran • Gold Gilding & Sacred Calligraphy',
    tags: 'Holy Quran, Calligraphy, Scripture',
    imageUrl: 'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=800&q=85',
    largeImageUrl: 'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=1600&q=90',
    likes: 8120,
    views: 91000,
    user: 'Noor Islamic Media',
  ),
  MediaItem(
    id: 106,
    title: 'Illuminated Islamic Manuscript & Ayahs',
    tags: 'Holy Quran, Manuscript, Arabic Art',
    imageUrl: 'https://images.unsplash.com/photo-1585036156171-384164a8c675?w=800&q=85',
    largeImageUrl: 'https://images.unsplash.com/photo-1585036156171-384164a8c675?w=1600&q=90',
    likes: 5690,
    views: 63500,
    user: 'Noor Islamic Media',
  ),
  MediaItem(
    id: 107,
    title: 'Sultan Ahmed Blue Mosque • Istanbul Domes',
    tags: 'Istanbul, Turkey, Ottoman Architecture',
    imageUrl: 'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=800&q=85',
    largeImageUrl: 'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=1600&q=90',
    likes: 6780,
    views: 78000,
    user: 'Noor Islamic Media',
  ),
  MediaItem(
    id: 108,
    title: 'Sheikh Zayed Grand Mosque • Pure White Marble',
    tags: 'Abu Dhabi, UAE, Grand Mosque',
    imageUrl: 'https://images.unsplash.com/photo-1512632570417-a6096ac0e5a8?w=800&q=85',
    largeImageUrl: 'https://images.unsplash.com/photo-1512632570417-a6096ac0e5a8?w=1600&q=90',
    likes: 9150,
    views: 112000,
    user: 'Noor Islamic Media',
  ),
];

class MediaScreen extends StatefulWidget {
  const MediaScreen({super.key});

  @override
  State<MediaScreen> createState() => _MediaScreenState();
}

class _MediaScreenState extends State<MediaScreen> with SingleTickerProviderStateMixin {
  late TabController _tabController;
  final AudioPlayer _player = AudioPlayer();
  String? _currentlyPlayingId;
  bool _isPlaying = false;
  String _searchQuery = '';
  String _selectedCategory = 'All';

  final List<String> _categories = [
    'All',
    'Makkah',
    'Madinah',
    'Holy Quran',
    'Mosque',
    'Calligraphy'
  ];

  final List<Map<String, String>> _audioTracks = [
    {
      'id': 'adhan-makkah',
      'title': 'Adhan — Masjid al-Haram (Makkah)',
      'reciter': 'Sheikh Ali Mulla (Bilal of the Haram)',
      'url': 'https://cdn.islamic.network/adhan/makkah.mp3',
      'tag': 'Sacred Adhan',
    },
    {
      'id': 'adhan-madinah',
      'title': 'Adhan — Al-Masjid an-Nabawi (Madinah)',
      'reciter': 'Sheikh Essam Bukhari',
      'url': 'https://cdn.islamic.network/adhan/madinah.mp3',
      'tag': 'Sacred Adhan',
    },
    {
      'id': 'adhan-alaqsa',
      'title': 'Adhan — Al-Masjid al-Aqsa (Jerusalem)',
      'reciter': 'Sheikh Naji Qazzaz',
      'url': 'https://cdn.islamic.network/adhan/aqsa.mp3',
      'tag': 'Sacred Adhan',
    },
    {
      'id': 'surah-rahman',
      'title': 'Surah Ar-Rahman (The Most Merciful)',
      'reciter': 'Sheikh Mishary Rashid Alafasy',
      'url': 'https://server8.mp3quran.net/afs/055.mp3',
      'tag': 'Noble Qur\'an',
    },
    {
      'id': 'surah-mulk',
      'title': 'Surah Al-Mulk (The Sovereignty)',
      'reciter': 'Sheikh Abdul Basit Abdus Samad',
      'url': 'https://server7.mp3quran.net/basit/067.mp3',
      'tag': 'Noble Qur\'an',
    },
    {
      'id': 'surah-kahf',
      'title': 'Surah Al-Kahf (The Cave)',
      'reciter': 'Sheikh Abdur-Rahman As-Sudais',
      'url': 'https://server11.mp3quran.net/sds/018.mp3',
      'tag': 'Noble Qur\'an',
    },
    {
      'id': 'surah-yasin',
      'title': 'Surah Yasin (Heart of the Quran)',
      'reciter': 'Sheikh Maher Al-Muaiqly',
      'url': 'https://server12.mp3quran.net/maher/036.mp3',
      'tag': 'Noble Qur\'an',
    },
  ];

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 2, vsync: this);
    _player.playerStateStream.listen((state) {
      if (mounted) {
        setState(() {
          _isPlaying = state.playing;
          if (state.processingState == ProcessingState.completed) {
            _isPlaying = false;
            _currentlyPlayingId = null;
          }
        });
      }
    });
  }

  @override
  void dispose() {
    _tabController.dispose();
    _player.dispose();
    super.dispose();
  }

  Future<void> _playAudio(Map<String, String> track) async {
    try {
      if (_currentlyPlayingId == track['id'] && _isPlaying) {
        await _player.pause();
        setState(() => _isPlaying = false);
        return;
      }

      await _player.setUrl(track['url']!);
      await _player.play();
      setState(() {
        _currentlyPlayingId = track['id'];
        _isPlaying = true;
      });
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Audio stream loading error. Check internet connection.')),
        );
      }
    }
  }

  void _openPhotoLightbox(MediaItem item) {
    showDialog(
      context: context,
      builder: (context) {
        return Dialog(
          backgroundColor: Colors.transparent,
          insetPadding: const EdgeInsets.all(12),
          child: Stack(
            alignment: Alignment.center,
            children: [
              ClipRRect(
                borderRadius: BorderRadius.circular(20),
                child: Container(
                  color: const Color(0xFF010D09),
                  child: Column(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      CachedNetworkImage(
                        imageUrl: item.largeImageUrl,
                        fit: BoxFit.contain,
                        placeholder: (context, url) => Container(
                          height: 260,
                          color: const Color(0xFF031D16),
                          child: const Center(
                            child: CircularProgressIndicator(
                              valueColor: AlwaysStoppedAnimation(AppColors.goldPrimary),
                            ),
                          ),
                        ),
                        errorWidget: (context, url, error) => Container(
                          height: 200,
                          color: const Color(0xFF031D16),
                          child: const Icon(Icons.broken_image, color: Colors.white54),
                        ),
                      ),
                      Padding(
                        padding: const EdgeInsets.all(16),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              item.title,
                              style: const TextStyle(
                                fontSize: 16,
                                fontWeight: FontWeight.w900,
                                color: AppColors.textWhite,
                              ),
                            ),
                            const SizedBox(height: 4),
                            Text(
                              item.tags,
                              style: const TextStyle(
                                fontSize: 11,
                                color: AppColors.emeraldSubtle,
                              ),
                            ),
                            const SizedBox(height: 12),
                            Row(
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              children: [
                                Text(
                                  '❤️ ${item.likes} • 👁️ ${item.views}',
                                  style: const TextStyle(
                                    fontSize: 11,
                                    color: AppColors.goldLight,
                                    fontWeight: FontWeight.w700,
                                  ),
                                ),
                                Row(
                                  children: [
                                    IconButton(
                                      icon: const Icon(Icons.share, color: AppColors.goldPrimary, size: 20),
                                      onPressed: () {
                                        Share.share('Check out "${item.title}" on Noor-e-ilahi: ${item.largeImageUrl}');
                                      },
                                    ),
                                  ],
                                ),
                              ],
                            ),
                          ],
                        ),
                      ),
                    ],
                  ),
                ),
              ),
              Positioned(
                top: 8,
                right: 8,
                child: GestureDetector(
                  onTap: () => Navigator.of(context).pop(),
                  child: Container(
                    padding: const EdgeInsets.all(6),
                    decoration: const BoxDecoration(
                      color: Colors.black54,
                      shape: BoxShape.circle,
                    ),
                    child: const Icon(Icons.close, color: Colors.white, size: 20),
                  ),
                ),
              ),
            ],
          ),
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    final t = AppLocalizations.of(context)!;

    final filteredMedia = kCuratedMediaItems.where((item) {
      final matchesSearch = _searchQuery.isEmpty ||
          item.title.toLowerCase().contains(_searchQuery.toLowerCase()) ||
          item.tags.toLowerCase().contains(_searchQuery.toLowerCase());
      final matchesCat = _selectedCategory == 'All' ||
          item.tags.toLowerCase().contains(_selectedCategory.toLowerCase()) ||
          item.title.toLowerCase().contains(_selectedCategory.toLowerCase());
      return matchesSearch && matchesCat;
    }).toList();

    return Scaffold(
      backgroundColor: AppColors.bgDark,
      appBar: AppBar(
        backgroundColor: AppColors.bgDark,
        title: Text(t.media, style: const TextStyle(fontWeight: FontWeight.w900, color: AppColors.textWhite)),
        iconTheme: const IconThemeData(color: AppColors.goldPrimary),
        bottom: TabBar(
          controller: _tabController,
          indicatorColor: AppColors.goldPrimary,
          labelColor: AppColors.goldPrimary,
          unselectedLabelColor: AppColors.emeraldSubtle,
          tabs: const [
            Tab(icon: Icon(Icons.photo_library), text: 'Photos & Wallpapers'),
            Tab(icon: Icon(Icons.music_note), text: 'Adhans & Recitations'),
          ],
        ),
      ),
      body: TabBarView(
        controller: _tabController,
        children: [
          // ── Tab 1: Visual Treasures ────────────────────────────────
          Column(
            children: [
              // Search & Categories Filter
              Container(
                padding: const EdgeInsets.fromLTRB(16, 12, 16, 8),
                child: Column(
                  children: [
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 12),
                      decoration: BoxDecoration(
                        color: Colors.black.withValues(alpha: 0.35),
                        borderRadius: BorderRadius.circular(12),
                        border: Border.all(color: Colors.white.withValues(alpha: 0.1)),
                      ),
                      child: TextField(
                        onChanged: (val) => setState(() => _searchQuery = val),
                        style: const TextStyle(color: Colors.white, fontSize: 13),
                        decoration: InputDecoration(
                          hintText: 'Search Islamic architecture, Makkah, Quran...',
                          hintStyle: const TextStyle(color: Colors.white38, fontSize: 12),
                          prefixIcon: const Icon(Icons.search, size: 18, color: AppColors.goldPrimary),
                          suffixIcon: _searchQuery.isNotEmpty
                              ? IconButton(
                                  icon: const Icon(Icons.clear, size: 16, color: Colors.white60),
                                  onPressed: () => setState(() => _searchQuery = ''),
                                )
                              : null,
                          prefixIconConstraints: const BoxConstraints(minWidth: 28, minHeight: 28),
                          border: InputBorder.none,
                          isDense: true,
                          contentPadding: const EdgeInsets.symmetric(vertical: 10),
                        ),
                      ),
                    ),
                    const SizedBox(height: 8),
                    SizedBox(
                      height: 32,
                      child: ListView.separated(
                        scrollDirection: Axis.horizontal,
                        itemCount: _categories.length,
                        separatorBuilder: (_, __) => const SizedBox(width: 6),
                        itemBuilder: (context, index) {
                          final cat = _categories[index];
                          final isSel = _selectedCategory == cat;
                          return GestureDetector(
                            onTap: () => setState(() => _selectedCategory = cat),
                            child: Container(
                              padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                              decoration: BoxDecoration(
                                color: isSel ? AppColors.goldPrimary : const Color(0x1AF59E0B),
                                borderRadius: BorderRadius.circular(16),
                                border: Border.all(
                                  color: isSel ? AppColors.goldPrimary : AppColors.goldBorder,
                                ),
                              ),
                              child: Text(
                                cat,
                                style: TextStyle(
                                  fontSize: 11,
                                  fontWeight: FontWeight.w700,
                                  color: isSel ? const Color(0xFF02120D) : AppColors.goldLight,
                                ),
                              ),
                            ),
                          );
                        },
                      ),
                    ),
                  ],
                ),
              ),

              // Grid View
              Expanded(
                child: filteredMedia.isEmpty
                    ? const Center(
                        child: Text(
                          'No matching photos found.',
                          style: TextStyle(color: Colors.white54, fontSize: 13),
                        ),
                      )
                    : GridView.builder(
                        physics: const BouncingScrollPhysics(),
                        padding: const EdgeInsets.all(16),
                        gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                          crossAxisCount: 2,
                          crossAxisSpacing: 12,
                          mainAxisSpacing: 12,
                          childAspectRatio: 0.82,
                        ),
                        itemCount: filteredMedia.length,
                        itemBuilder: (context, index) {
                          final item = filteredMedia[index];
                          return GestureDetector(
                            onTap: () => _openPhotoLightbox(item),
                            child: Container(
                              decoration: BoxDecoration(
                                color: AppColors.bgCard,
                                borderRadius: BorderRadius.circular(16),
                                border: Border.all(color: AppColors.borderSubtle),
                              ),
                              child: ClipRRect(
                                borderRadius: BorderRadius.circular(16),
                                child: Stack(
                                  children: [
                                    Positioned.fill(
                                      child: CachedNetworkImage(
                                        imageUrl: item.imageUrl,
                                        fit: BoxFit.cover,
                                        placeholder: (context, url) => Container(
                                          color: const Color(0xFF031D16),
                                          child: const Center(
                                            child: CircularProgressIndicator(
                                              strokeWidth: 2,
                                              valueColor: AlwaysStoppedAnimation(AppColors.goldPrimary),
                                            ),
                                          ),
                                        ),
                                        errorWidget: (context, url, error) => Container(
                                          color: const Color(0xFF031D16),
                                          child: const Icon(Icons.broken_image, color: Colors.white30),
                                        ),
                                      ),
                                    ),
                                    // Title overlay gradient
                                    Positioned(
                                      bottom: 0,
                                      left: 0,
                                      right: 0,
                                      child: Container(
                                        padding: const EdgeInsets.all(8),
                                        decoration: const BoxDecoration(
                                          gradient: LinearGradient(
                                            begin: Alignment.topCenter,
                                            end: Alignment.bottomCenter,
                                            colors: [Colors.transparent, Colors.black87],
                                          ),
                                        ),
                                        child: Text(
                                          item.title,
                                          maxLines: 2,
                                          overflow: TextOverflow.ellipsis,
                                          style: const TextStyle(
                                            fontSize: 11,
                                            fontWeight: FontWeight.w800,
                                            color: Colors.white,
                                          ),
                                        ),
                                      ),
                                    ),
                                  ],
                                ),
                              ),
                            ),
                          );
                        },
                      ),
              ),
            ],
          ),

          // ── Tab 2: Sacred Adhans & Recitations ─────────────────────
          ListView.separated(
            physics: const BouncingScrollPhysics(),
            padding: const EdgeInsets.all(16),
            itemCount: _audioTracks.length,
            separatorBuilder: (_, __) => const SizedBox(height: 10),
            itemBuilder: (context, index) {
              final track = _audioTracks[index];
              final isCurrentPlaying = _currentlyPlayingId == track['id'] && _isPlaying;

              return Container(
                padding: const EdgeInsets.all(14),
                decoration: BoxDecoration(
                  color: isCurrentPlaying ? const Color(0x26F59E0B) : AppColors.bgCard,
                  borderRadius: BorderRadius.circular(18),
                  border: Border.all(
                    color: isCurrentPlaying ? AppColors.goldPrimary : AppColors.borderSubtle,
                    width: isCurrentPlaying ? 1.5 : 1,
                  ),
                ),
                child: Row(
                  children: [
                    GestureDetector(
                      onTap: () => _playAudio(track),
                      child: Container(
                        width: 44,
                        height: 44,
                        decoration: BoxDecoration(
                          color: isCurrentPlaying ? AppColors.goldPrimary : const Color(0x26F59E0B),
                          shape: BoxShape.circle,
                        ),
                        child: Icon(
                          isCurrentPlaying ? Icons.pause : Icons.play_arrow,
                          color: isCurrentPlaying ? const Color(0xFF02120D) : AppColors.goldPrimary,
                          size: 24,
                        ),
                      ),
                    ),
                    const SizedBox(width: 14),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Container(
                            padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                            decoration: BoxDecoration(
                              color: const Color(0x1A34D399),
                              borderRadius: BorderRadius.circular(6),
                            ),
                            child: Text(
                              track['tag']!,
                              style: const TextStyle(fontSize: 9.5, fontWeight: FontWeight.w800, color: Color(0xFF34D399)),
                            ),
                          ),
                          const SizedBox(height: 3),
                          Text(
                            track['title']!,
                            style: TextStyle(
                              fontSize: 13.5,
                              fontWeight: FontWeight.w800,
                              color: isCurrentPlaying ? AppColors.goldLight : AppColors.textWhite,
                            ),
                          ),
                          Text(
                            track['reciter']!,
                            style: const TextStyle(fontSize: 11, color: AppColors.emeraldSubtle),
                          ),
                        ],
                      ),
                    ),
                    IconButton(
                      icon: const Icon(Icons.share, size: 18, color: AppColors.emeraldSubtle),
                      onPressed: () {
                        Share.share('Listen to ${track['title']} on Noor-e-ilahi: ${track['url']}');
                      },
                    ),
                  ],
                ),
              );
            },
          ),
        ],
      ),
    );
  }
}
