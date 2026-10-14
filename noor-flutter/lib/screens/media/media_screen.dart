// ============================================================
// NOOR — Sacred Media Gallery, Cinematography & Audio Stream (Flutter)
// Authenticated Live Pixabay API Client for Relatable Islamic Images & Videos
// ============================================================

import 'package:flutter/material.dart';
import 'package:just_audio/just_audio.dart';
import 'package:cached_network_image/cached_network_image.dart';
import 'package:share_plus/share_plus.dart';
import '../../theme/app_theme.dart';
import '../../l10n/app_localizations.dart';
import '../../services/pixabay_service.dart';
import '../../widgets/pixabay_video_player_dialog.dart';

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

  // Search & Category
  String _searchQuery = '';
  String _selectedCategory = 'All';

  final List<String> _categories = [
    'All',
    'Makkah',
    'Madinah',
    'Holy Quran',
    'Mosque',
    'Architecture',
    'Calligraphy',
    'Ramadan'
  ];

  // Photos State
  List<PixabayPhotoItem> _photos = kCuratedIslamicPhotos;
  bool _loadingPhotos = false;

  // Videos State
  List<PixabayVideoItem> _videos = kCuratedIslamicVideos;
  bool _loadingVideos = false;

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
    _tabController = TabController(length: 3, vsync: this);

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

    _loadPixabayMedia('islamic architecture');
  }

  @override
  void dispose() {
    _tabController.dispose();
    _player.dispose();
    super.dispose();
  }

  Future<void> _loadPixabayMedia(String query) async {
    setState(() {
      _loadingPhotos = true;
      _loadingVideos = true;
    });

    try {
      final photos = await PixabayService.fetchIslamicPhotos(query: query, perPage: 24);
      if (mounted) {
        setState(() {
          _photos = photos;
          _loadingPhotos = false;
        });
      }
    } catch (_) {
      if (mounted) setState(() => _loadingPhotos = false);
    }

    try {
      final videos = await PixabayService.fetchIslamicVideos(query: query, perPage: 12);
      if (mounted) {
        setState(() {
          _videos = videos;
          _loadingVideos = false;
        });
      }
    } catch (_) {
      if (mounted) setState(() => _loadingVideos = false);
    }
  }

  void _onCategorySelected(String cat) {
    setState(() {
      _selectedCategory = cat;
      _searchQuery = '';
    });
    final query = cat == 'All' ? 'islamic architecture' : cat;
    _loadPixabayMedia(query);
  }

  void _onSearchSubmitted(String val) {
    setState(() => _searchQuery = val);
    if (val.trim().isNotEmpty) {
      _loadPixabayMedia(val.trim());
    } else {
      _loadPixabayMedia('islamic architecture');
    }
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

  void _openPhotoLightbox(PixabayPhotoItem item) {
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
                                  '❤️ ${item.likes} • 👁️ ${item.views} • ${item.user}',
                                  style: const TextStyle(
                                    fontSize: 11,
                                    color: AppColors.goldLight,
                                    fontWeight: FontWeight.w700,
                                  ),
                                ),
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

  void _openVideoPlayerModal(PixabayVideoItem item) {
    showDialog(
      context: context,
      builder: (context) => PixabayVideoPlayerDialog(video: item),
    );
  }

  @override
  Widget build(BuildContext context) {
    final t = AppLocalizations.of(context)!;

    final filteredPhotos = _photos.where((item) {
      if (_searchQuery.isEmpty) return true;
      final q = _searchQuery.toLowerCase();
      return item.title.toLowerCase().contains(q) || item.tags.toLowerCase().contains(q);
    }).toList();

    final filteredVideos = _videos.where((item) {
      if (_searchQuery.isEmpty) return true;
      final q = _searchQuery.toLowerCase();
      return item.title.toLowerCase().contains(q) || item.tags.toLowerCase().contains(q);
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
            Tab(icon: Icon(Icons.photo_library), text: 'Photos'),
            Tab(icon: Icon(Icons.videocam), text: 'Videos'),
            Tab(icon: Icon(Icons.music_note), text: 'Adhans & Recitations'),
          ],
        ),
      ),
      body: TabBarView(
        controller: _tabController,
        children: [
          // ── Tab 1: Visual Treasures (Photos from Pixabay) ────────
          Column(
            children: [
              _buildFilterHeader(),
              Expanded(
                child: _loadingPhotos
                    ? const Center(
                        child: CircularProgressIndicator(
                          valueColor: AlwaysStoppedAnimation(AppColors.goldPrimary),
                        ),
                      )
                    : filteredPhotos.isEmpty
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
                            itemCount: filteredPhotos.length,
                            itemBuilder: (context, index) {
                              final item = filteredPhotos[index];
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

          // ── Tab 2: Islamic Cinematography (Videos from Pixabay) ───
          Column(
            children: [
              _buildFilterHeader(),
              Expanded(
                child: _loadingVideos
                    ? const Center(
                        child: CircularProgressIndicator(
                          valueColor: AlwaysStoppedAnimation(AppColors.goldPrimary),
                        ),
                      )
                    : filteredVideos.isEmpty
                        ? const Center(
                            child: Text(
                              'No matching videos found.',
                              style: TextStyle(color: Colors.white54, fontSize: 13),
                            ),
                          )
                        : ListView.separated(
                            physics: const BouncingScrollPhysics(),
                            padding: const EdgeInsets.all(16),
                            itemCount: filteredVideos.length,
                            separatorBuilder: (_, __) => const SizedBox(height: 14),
                            itemBuilder: (context, index) {
                              final item = filteredVideos[index];
                              return GestureDetector(
                                onTap: () => _openVideoPlayerModal(item),
                                child: Container(
                                  decoration: BoxDecoration(
                                    color: AppColors.bgCard,
                                    borderRadius: BorderRadius.circular(18),
                                    border: Border.all(color: AppColors.borderSubtle),
                                  ),
                                  child: ClipRRect(
                                    borderRadius: BorderRadius.circular(18),
                                    child: Column(
                                      crossAxisAlignment: CrossAxisAlignment.stretch,
                                      children: [
                                        AspectRatio(
                                          aspectRatio: 16 / 9,
                                          child: Stack(
                                            children: [
                                              Positioned.fill(
                                                child: CachedNetworkImage(
                                                  imageUrl: item.thumbnail,
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
                                                    child: const Icon(Icons.videocam, color: Colors.white30),
                                                  ),
                                                ),
                                              ),
                                              Positioned.fill(
                                                child: Container(
                                                  color: Colors.black.withValues(alpha: 0.3),
                                                  child: Center(
                                                    child: Container(
                                                      width: 48,
                                                      height: 48,
                                                      decoration: BoxDecoration(
                                                        color: AppColors.goldPrimary.withValues(alpha: 0.9),
                                                        shape: BoxShape.circle,
                                                        boxShadow: [
                                                          BoxShadow(
                                                            color: Colors.black.withValues(alpha: 0.4),
                                                            blurRadius: 10,
                                                          ),
                                                        ],
                                                      ),
                                                      child: const Icon(
                                                        Icons.play_arrow,
                                                        color: Color(0xFF02120D),
                                                        size: 28,
                                                      ),
                                                    ),
                                                  ),
                                                ),
                                              ),
                                              Positioned(
                                                bottom: 8,
                                                right: 8,
                                                child: Container(
                                                  padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                                                  decoration: BoxDecoration(
                                                    color: Colors.black.withValues(alpha: 0.7),
                                                    borderRadius: BorderRadius.circular(6),
                                                  ),
                                                  child: Text(
                                                    '${item.duration}s',
                                                    style: const TextStyle(
                                                      color: Colors.white,
                                                      fontSize: 10,
                                                      fontWeight: FontWeight.w700,
                                                    ),
                                                  ),
                                                ),
                                              ),
                                            ],
                                          ),
                                        ),
                                        Padding(
                                          padding: const EdgeInsets.all(12),
                                          child: Row(
                                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                            children: [
                                              Expanded(
                                                child: Column(
                                                  crossAxisAlignment: CrossAxisAlignment.start,
                                                  children: [
                                                    Text(
                                                      item.title,
                                                      maxLines: 1,
                                                      overflow: TextOverflow.ellipsis,
                                                      style: const TextStyle(
                                                        fontSize: 13.5,
                                                        fontWeight: FontWeight.w800,
                                                        color: AppColors.textWhite,
                                                      ),
                                                    ),
                                                    const SizedBox(height: 2),
                                                    Text(
                                                      '${item.user} • ❤️ ${item.likes} • 👁️ ${item.views}',
                                                      style: const TextStyle(
                                                        fontSize: 10.5,
                                                        color: AppColors.emeraldSubtle,
                                                      ),
                                                    ),
                                                  ],
                                                ),
                                              ),
                                              IconButton(
                                                icon: const Icon(Icons.share, size: 18, color: AppColors.goldPrimary),
                                                onPressed: () {
                                                  Share.share('Watch "${item.title}" on Noor-e-ilahi: ${item.videoUrl}');
                                                },
                                              ),
                                            ],
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

          // ── Tab 3: Sacred Adhans & Recitations (Audio Stream) ──────
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

  Widget _buildFilterHeader() {
    return Container(
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
              onSubmitted: _onSearchSubmitted,
              style: const TextStyle(color: Colors.white, fontSize: 13),
              decoration: InputDecoration(
                hintText: 'Search Islamic architecture, Makkah, Quran...',
                hintStyle: const TextStyle(color: Colors.white38, fontSize: 12),
                prefixIcon: const Icon(Icons.search, size: 18, color: AppColors.goldPrimary),
                suffixIcon: _searchQuery.isNotEmpty
                    ? IconButton(
                        icon: const Icon(Icons.clear, size: 16, color: Colors.white60),
                        onPressed: () {
                          setState(() => _searchQuery = '');
                          _loadPixabayMedia('islamic architecture');
                        },
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
                  onTap: () => _onCategorySelected(cat),
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
    );
  }
}
