// ============================================================
// NOOR — Noble Quran Platform (Flutter)
// Complete 114 Surahs, Continuous Mushaf Tilawat & Verse-by-Verse Reader,
// Cloudflare Audio Player, Multi-Lingual Translations (EN, HI, UR, BN, TR, ID)
// ============================================================

import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:just_audio/just_audio.dart';
import 'package:share_plus/share_plus.dart';
import '../../theme/app_theme.dart';
import '../../l10n/app_localizations.dart';
import '../../providers/language_provider.dart';
import '../../data/quran_data.dart';

class QuranScreen extends ConsumerStatefulWidget {
  const QuranScreen({super.key});

  @override
  ConsumerState<QuranScreen> createState() => _QuranScreenState();
}

class _QuranScreenState extends ConsumerState<QuranScreen> with SingleTickerProviderStateMixin {
  String _searchQuery = '';
  String _selectedFilter = 'All'; // 'All', 'Meccan', 'Medinan'

  // Reader State
  SurahItem? _activeSurah;
  List<AyahItem> _verses = [];
  bool _isLoadingVerses = false;
  String _readingMode = 'verseByVerse'; // 'continuous' or 'verseByVerse'
  String? _overrideLanguage; // null means follow app's language
  double _fontSizeArabic = 22.0;

  // Audio State
  final AudioPlayer _audioPlayer = AudioPlayer();
  bool _isPlaying = false;
  int? _playingAyahNumber;
  String _selectedReciter = 'alafasy';

  @override
  void initState() {
    super.initState();
    _audioPlayer.playerStateStream.listen((state) {
      if (mounted) {
        setState(() {
          _isPlaying = state.playing;
          if (state.processingState == ProcessingState.completed) {
            _playingAyahNumber = null;
            _isPlaying = false;
          }
        });
      }
    });
  }

  @override
  void dispose() {
    _audioPlayer.dispose();
    super.dispose();
  }

  String _getEffectiveLangCode() {
    if (_overrideLanguage != null) return _overrideLanguage!;
    final langCode = ref.read(languageProvider).value?.language.code ?? 'en';
    return langCode;
  }

  Future<void> _openSurah(SurahItem surah) async {
    setState(() {
      _activeSurah = surah;
      _isLoadingVerses = true;
      _verses = [];
      _playingAyahNumber = null;
    });

    final verses = await fetchSurahVerses(surah.number);
    if (mounted) {
      setState(() {
        _verses = verses;
        _isLoadingVerses = false;
      });
    }
  }

  void _closeSurah() {
    _audioPlayer.stop();
    setState(() {
      _activeSurah = null;
      _verses = [];
      _isPlaying = false;
      _playingAyahNumber = null;
    });
  }

  Future<void> _playAyahAudio(AyahItem ayah) async {
    try {
      if (_playingAyahNumber == ayah.number && _isPlaying) {
        await _audioPlayer.pause();
        setState(() => _isPlaying = false);
        return;
      }

      final url = ayah.audioUrl ?? getAyahAudioUrl(_activeSurah!.number, ayah.number);
      await _audioPlayer.setUrl(url);
      await _audioPlayer.play();
      setState(() {
        _playingAyahNumber = ayah.number;
        _isPlaying = true;
      });
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Audio stream loading... please check internet connection.')),
        );
      }
    }
  }

  Future<void> _playFullSurahAudio() async {
    if (_activeSurah == null) return;
    try {
      if (_isPlaying && _playingAyahNumber == null) {
        await _audioPlayer.pause();
        setState(() => _isPlaying = false);
        return;
      }
      final url = getSurahAudioUrl(_activeSurah!.number, _selectedReciter);
      await _audioPlayer.setUrl(url);
      await _audioPlayer.play();
      setState(() {
        _playingAyahNumber = null;
        _isPlaying = true;
      });
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Unable to load surah recitation audio.')),
        );
      }
    }
  }

  void _copyAyah(AyahItem ayah) {
    final lang = _getEffectiveLangCode();
    final translationText = ayah.getTranslation(lang);

    final shareText = '${ayah.arabic}\n\n"$translationText"\n— [Surah ${_activeSurah!.englishName} ${_activeSurah!.number}:${ayah.number}]';
    Clipboard.setData(ClipboardData(text: shareText));
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(content: Text('Ayah copied to clipboard!'), duration: Duration(seconds: 2)),
    );
  }

  void _shareAyah(AyahItem ayah) {
    final lang = _getEffectiveLangCode();
    final translationText = ayah.getTranslation(lang);

    final shareText = '${ayah.arabic}\n\n"$translationText"\n— [Surah ${_activeSurah!.englishName} ${_activeSurah!.number}:${ayah.number}]\n\nRead more on Noor-e-ilahi app';
    Share.share(shareText);
  }

  @override
  Widget build(BuildContext context) {
    final t = AppLocalizations.of(context)!;
    // Watch languageProvider to rebuild whenever app language changes
    ref.watch(languageProvider);

    if (_activeSurah != null) {
      return _buildSurahReaderView(t);
    }

    final filteredSurahs = kSurahsList.filterSurahs(_searchQuery, _selectedFilter);

    return Scaffold(
      backgroundColor: AppColors.bgDark,
      body: SafeArea(
        child: Column(
          children: [
            _buildHeader(t),
            _buildSearchBar(t),
            _buildFilterChips(t),
            Expanded(
              child: filteredSurahs.isEmpty
                  ? _buildEmptyState()
                  : ListView.builder(
                      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                      itemCount: filteredSurahs.length,
                      itemBuilder: (context, index) {
                        final surah = filteredSurahs[index];
                        return _buildSurahCard(surah);
                      },
                    ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildHeader(AppLocalizations t) {
    return Container(
      padding: const EdgeInsets.fromLTRB(20, 16, 20, 8),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                t.quran,
                style: const TextStyle(
                  fontSize: 26,
                  fontWeight: FontWeight.w900,
                  color: AppColors.textWhite,
                  letterSpacing: -0.5,
                ),
              ),
              const SizedBox(height: 2),
              const Text(
                '114 Surahs • Uthmani Script • Recitations',
                style: TextStyle(fontSize: 12, color: AppColors.emeraldSubtle),
              ),
            ],
          ),
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
            decoration: BoxDecoration(
              color: AppColors.emeraldPrimary.withValues(alpha: 0.15),
              borderRadius: BorderRadius.circular(20),
              border: Border.all(color: AppColors.emeraldPrimary.withValues(alpha: 0.3)),
            ),
            child: const Row(
              mainAxisSize: MainAxisSize.min,
              children: [
                Icon(Icons.auto_stories, size: 14, color: AppColors.goldPrimary),
                SizedBox(width: 6),
                Text(
                  '30 Juz',
                  style: TextStyle(fontSize: 11, fontWeight: FontWeight.w700, color: AppColors.goldPrimary),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildSearchBar(AppLocalizations t) {
    return Padding(
      padding: const EdgeInsets.fromLTRB(16, 4, 16, 12),
      child: Container(
        height: 48,
        decoration: BoxDecoration(
          color: AppColors.bgCard,
          borderRadius: BorderRadius.circular(16),
          border: Border.all(color: AppColors.borderSubtle),
        ),
        child: TextField(
          onChanged: (val) => setState(() => _searchQuery = val),
          style: const TextStyle(color: AppColors.textWhite, fontSize: 14),
          decoration: InputDecoration(
            hintText: '${t.search} Surah (e.g. Al-Fatiha, Yasin, 36)...',
            hintStyle: const TextStyle(color: AppColors.emeraldSubtle, fontSize: 13),
            prefixIcon: const Icon(Icons.search, color: AppColors.goldPrimary, size: 20),
            suffixIcon: _searchQuery.isNotEmpty
                ? IconButton(
                    icon: const Icon(Icons.clear, color: AppColors.emeraldSubtle, size: 18),
                    onPressed: () => setState(() => _searchQuery = ''),
                  )
                : null,
            border: InputBorder.none,
            contentPadding: const EdgeInsets.symmetric(vertical: 12),
          ),
        ),
      ),
    );
  }

  Widget _buildFilterChips(AppLocalizations t) {
    final filters = ['All', 'Meccan', 'Medinan'];
    return Container(
      height: 38,
      margin: const EdgeInsets.only(bottom: 8),
      child: ListView.separated(
        padding: const EdgeInsets.symmetric(horizontal: 16),
        scrollDirection: Axis.horizontal,
        itemCount: filters.length,
        separatorBuilder: (_, __) => const SizedBox(width: 8),
        itemBuilder: (context, index) {
          final filter = filters[index];
          final isSelected = _selectedFilter == filter;
          return GestureDetector(
            onTap: () => setState(() => _selectedFilter = filter),
            child: AnimatedContainer(
              duration: const Duration(milliseconds: 200),
              padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
              decoration: BoxDecoration(
                color: isSelected ? AppColors.goldPrimary : AppColors.bgCard,
                borderRadius: BorderRadius.circular(20),
                border: Border.all(
                  color: isSelected ? AppColors.goldPrimary : AppColors.borderSubtle,
                ),
              ),
              child: Center(
                child: Text(
                  filter == 'All'
                      ? 'All 114 Surahs'
                      : filter == 'Meccan'
                          ? 'Makki (Meccan)'
                          : 'Madani (Medinan)',
                  style: TextStyle(
                    fontSize: 12,
                    fontWeight: isSelected ? FontWeight.w800 : FontWeight.w600,
                    color: isSelected ? AppColors.bgDark : AppColors.textMuted,
                  ),
                ),
              ),
            ),
          );
        },
      ),
    );
  }

  Widget _buildSurahCard(SurahItem surah) {
    final isMeccan = surah.revelationType.toLowerCase() == 'meccan';

    return Container(
      margin: const EdgeInsets.only(bottom: 10),
      decoration: BoxDecoration(
        color: AppColors.bgCard,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: AppColors.borderSubtle),
      ),
      child: Material(
        color: Colors.transparent,
        child: InkWell(
          borderRadius: BorderRadius.circular(16),
          onTap: () => _openSurah(surah),
          child: Padding(
            padding: const EdgeInsets.all(14),
            child: Row(
              children: [
                // Surah Number Badge
                Container(
                  width: 38,
                  height: 38,
                  decoration: BoxDecoration(
                    color: AppColors.emeraldPrimary.withValues(alpha: 0.15),
                    borderRadius: BorderRadius.circular(12),
                    border: Border.all(color: AppColors.goldPrimary.withValues(alpha: 0.4)),
                  ),
                  child: Center(
                    child: Text(
                      '${surah.number}',
                      style: const TextStyle(
                        fontSize: 13,
                        fontWeight: FontWeight.w900,
                        color: AppColors.goldPrimary,
                      ),
                    ),
                  ),
                ),
                const SizedBox(width: 14),

                // English Details
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        surah.englishName,
                        style: const TextStyle(
                          fontSize: 15,
                          fontWeight: FontWeight.w800,
                          color: AppColors.textWhite,
                        ),
                      ),
                      const SizedBox(height: 2),
                      Row(
                        children: [
                          Flexible(
                            child: Text(
                              surah.englishNameTranslation,
                              style: const TextStyle(fontSize: 11, color: AppColors.emeraldSubtle),
                              overflow: TextOverflow.ellipsis,
                            ),
                          ),
                          const SizedBox(width: 8),
                          Container(
                            width: 3,
                            height: 3,
                            decoration: const BoxDecoration(color: AppColors.emeraldSubtle, shape: BoxShape.circle),
                          ),
                          const SizedBox(width: 8),
                          Text(
                            '${surah.numberOfAyahs} verses',
                            style: const TextStyle(fontSize: 11, color: AppColors.emeraldSubtle),
                          ),
                        ],
                      ),
                    ],
                  ),
                ),

                // Arabic & Badge
                Column(
                  crossAxisAlignment: CrossAxisAlignment.end,
                  children: [
                    Text(
                      surah.name,
                      style: const TextStyle(
                        fontSize: 18,
                        fontWeight: FontWeight.w700,
                        color: AppColors.goldLight,
                      ),
                    ),
                    const SizedBox(height: 4),
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                      decoration: BoxDecoration(
                        color: isMeccan ? const Color(0x2634D399) : const Color(0x26F59E0B),
                        borderRadius: BorderRadius.circular(8),
                      ),
                      child: Text(
                        surah.revelationType,
                        style: TextStyle(
                          fontSize: 9,
                          fontWeight: FontWeight.w700,
                          color: isMeccan ? const Color(0xFF34D399) : const Color(0xFFF59E0B),
                        ),
                      ),
                    ),
                  ],
                ),
                const SizedBox(width: 6),
                const Icon(Icons.chevron_right, size: 18, color: AppColors.emeraldSubtle),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildEmptyState() {
    return const Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Icon(Icons.search_off, size: 48, color: AppColors.emeraldSubtle),
          SizedBox(height: 12),
          Text(
            'No matching Surahs found',
            style: TextStyle(fontSize: 16, color: AppColors.textWhite, fontWeight: FontWeight.w700),
          ),
        ],
      ),
    );
  }

  // ── IN-APP SURAH READER ───────────────────────────────────────
  Widget _buildSurahReaderView(AppLocalizations t) {
    final surah = _activeSurah!;
    final currentLang = _getEffectiveLangCode();

    return Scaffold(
      backgroundColor: AppColors.bgDark,
      appBar: AppBar(
        backgroundColor: AppColors.bgCard,
        elevation: 0,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back, color: AppColors.goldPrimary),
          onPressed: _closeSurah,
        ),
        title: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              surah.englishName,
              style: const TextStyle(fontSize: 16, fontWeight: FontWeight.w800, color: AppColors.textWhite),
            ),
            Text(
              '${surah.englishNameTranslation} • ${surah.numberOfAyahs} Ayahs',
              style: const TextStyle(fontSize: 10, color: AppColors.emeraldSubtle),
            ),
          ],
        ),
        actions: [
          IconButton(
            icon: Icon(
              _readingMode == 'continuous' ? Icons.format_align_justify : Icons.view_agenda_outlined,
              color: AppColors.goldPrimary,
            ),
            tooltip: _readingMode == 'continuous' ? 'Switch to Verse by Verse' : 'Switch to Mushaf View',
            onPressed: () {
              setState(() {
                _readingMode = _readingMode == 'continuous' ? 'verseByVerse' : 'continuous';
              });
            },
          ),
          IconButton(
            icon: const Icon(Icons.text_fields, color: AppColors.goldPrimary),
            onPressed: _showReaderSettingsModal,
          ),
        ],
      ),
      bottomNavigationBar: _buildReaderBottomAudioBar(),
      body: Column(
        children: [
          _buildLanguageRibbon(currentLang),
          Expanded(
            child: _isLoadingVerses
                ? const Center(
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        CircularProgressIndicator(color: AppColors.goldPrimary),
                        SizedBox(height: 16),
                        Text('Loading Noble Qur\'an verses...', style: TextStyle(color: AppColors.emeraldSubtle)),
                      ],
                    ),
                  )
                : _verses.isEmpty
                    ? _buildVerseErrorState()
                    : _readingMode == 'continuous'
                        ? _buildMushafContinuousView(currentLang)
                        : _buildVerseByVerseView(currentLang),
          ),
        ],
      ),
    );
  }

  Widget _buildLanguageRibbon(String currentLang) {
    final languages = [
      {'code': 'hi', 'name': 'हिन्दी', 'flag': '🇮🇳'},
      {'code': 'ur', 'name': 'اردو', 'flag': '🇵🇰'},
      {'code': 'en', 'name': 'English', 'flag': '🇬🇧'},
      {'code': 'bn', 'name': 'বাংলা', 'flag': '🇮🇳'},
      {'code': 'tr', 'name': 'Türkçe', 'flag': '🇹🇷'},
      {'code': 'id', 'name': 'Bahasa', 'flag': '🇮🇩'},
      {'code': 'ar', 'name': 'العربية', 'flag': '🇸🇦'},
    ];

    return Container(
      height: 44,
      decoration: const BoxDecoration(
        color: Color(0xFF042018),
        border: Border(bottom: BorderSide(color: Color(0x2634D399))),
      ),
      child: ListView.separated(
        scrollDirection: Axis.horizontal,
        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
        itemCount: languages.length,
        separatorBuilder: (_, __) => const SizedBox(width: 8),
        itemBuilder: (context, index) {
          final l = languages[index];
          final isSelected = currentLang == l['code'];
          return GestureDetector(
            onTap: () {
              setState(() => _overrideLanguage = l['code']);
            },
            child: Container(
              padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
              decoration: BoxDecoration(
                color: isSelected ? AppColors.goldPrimary : const Color(0x1AFFFFFF),
                borderRadius: BorderRadius.circular(12),
                border: Border.all(
                  color: isSelected ? AppColors.goldPrimary : const Color(0x3334D399),
                ),
              ),
              child: Row(
                mainAxisSize: MainAxisSize.min,
                children: [
                  Text(l['flag']!, style: const TextStyle(fontSize: 12)),
                  const SizedBox(width: 5),
                  Text(
                    l['name']!,
                    style: TextStyle(
                      fontSize: 11,
                      fontWeight: isSelected ? FontWeight.w900 : FontWeight.w600,
                      color: isSelected ? const Color(0xFF021711) : Colors.white,
                    ),
                  ),
                ],
              ),
            ),
          );
        },
      ),
    );
  }

  Widget _buildReaderBottomAudioBar() {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 12),
      decoration: const BoxDecoration(
        color: AppColors.bgCard,
        border: Border(top: BorderSide(color: AppColors.borderSubtle)),
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Row(
            children: [
              IconButton(
                style: IconButton.styleFrom(
                  backgroundColor: AppColors.goldPrimary,
                  foregroundColor: AppColors.bgDark,
                ),
                icon: Icon(_isPlaying && _playingAyahNumber == null ? Icons.pause : Icons.play_arrow),
                onPressed: _playFullSurahAudio,
              ),
              const SizedBox(width: 12),
              Column(
                mainAxisSize: MainAxisSize.min,
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    _isPlaying
                        ? (_playingAyahNumber != null ? 'Playing Ayah $_playingAyahNumber' : 'Playing Full Surah')
                        : 'Recitation Audio',
                    style: const TextStyle(fontSize: 13, fontWeight: FontWeight.w700, color: AppColors.textWhite),
                  ),
                  Text(
                    'Qari: ${_selectedReciter.toUpperCase()}',
                    style: const TextStyle(fontSize: 10, color: AppColors.emeraldSubtle),
                  ),
                ],
              ),
            ],
          ),
          PopupMenuButton<String>(
            color: AppColors.bgCard,
            icon: const Icon(Icons.settings_voice, color: AppColors.goldPrimary),
            onSelected: (reciter) {
              setState(() => _selectedReciter = reciter);
              if (_isPlaying) {
                _playFullSurahAudio();
              }
            },
            itemBuilder: (context) => kRecitersList.map((r) {
              return PopupMenuItem<String>(
                value: r.id,
                child: Text(
                  r.name,
                  style: TextStyle(
                    color: _selectedReciter == r.id ? AppColors.goldPrimary : AppColors.textWhite,
                    fontWeight: _selectedReciter == r.id ? FontWeight.w800 : FontWeight.w500,
                  ),
                ),
              );
            }).toList(),
          ),
        ],
      ),
    );
  }

  Widget _buildMushafContinuousView(String currentLang) {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(20),
      child: Column(
        children: [
          _buildBismillahBanner(),
          const SizedBox(height: 20),
          Container(
            padding: const EdgeInsets.all(20),
            decoration: BoxDecoration(
              color: AppColors.bgCard,
              borderRadius: BorderRadius.circular(20),
              border: Border.all(color: AppColors.borderSubtle),
            ),
            child: Text.rich(
              TextSpan(
                children: _verses.map((ayah) {
                  return TextSpan(
                    children: [
                      TextSpan(
                        text: '${ayah.arabic} ',
                        style: TextStyle(
                          fontSize: _fontSizeArabic,
                          fontWeight: FontWeight.w600,
                          color: _playingAyahNumber == ayah.number ? AppColors.goldPrimary : AppColors.textWhite,
                          height: 2.2,
                        ),
                      ),
                      WidgetSpan(
                        alignment: PlaceholderAlignment.middle,
                        child: Container(
                          margin: const EdgeInsets.symmetric(horizontal: 4),
                          padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                          decoration: BoxDecoration(
                            shape: BoxShape.circle,
                            border: Border.all(color: AppColors.goldPrimary.withValues(alpha: 0.6)),
                          ),
                          child: Text(
                            '${ayah.number}',
                            style: const TextStyle(fontSize: 10, color: AppColors.goldPrimary, fontWeight: FontWeight.bold),
                          ),
                        ),
                      ),
                      const TextSpan(text: '  '),
                    ],
                  );
                }).toList(),
              ),
              textAlign: TextAlign.justify,
              textDirection: TextDirection.rtl,
            ),
          ),
        ],
      ),
    );
  }

  String _getLangTitle(String code) {
    switch (code) {
      case 'hi':
        return '🇮🇳 हिन्दी अनुवाद (Farooq Khan & Nadwi)';
      case 'ur':
        return '🇵🇰 اردو ترجمہ (فتح محمد جالندھری)';
      case 'bn':
        return '🇮🇳 বাংলা অনুবাদ (জহুরুল হক)';
      case 'tr':
        return '🇹🇷 Türkçe Meal (Süleyman Ateş)';
      case 'id':
        return '🇮🇩 Bahasa Indonesia (Kemenag)';
      case 'ar':
        return '🇸🇦 النص العربي الأصلي';
      default:
        return '🇬🇧 English Translation (Sahih International)';
    }
  }

  Widget _buildVerseByVerseView(String currentLang) {
    final langTitle = _getLangTitle(currentLang);

    return ListView.builder(
      padding: const EdgeInsets.all(16),
      itemCount: _verses.length + 1,
      itemBuilder: (context, index) {
        if (index == 0) {
          return _buildBismillahBanner();
        }

        final ayah = _verses[index - 1];
        final isPlayingThisAyah = _playingAyahNumber == ayah.number && _isPlaying;
        final translationText = ayah.getTranslation(currentLang);

        return Container(
          margin: const EdgeInsets.only(bottom: 16),
          padding: const EdgeInsets.all(16),
          decoration: BoxDecoration(
            color: isPlayingThisAyah ? AppColors.emeraldPrimary.withValues(alpha: 0.1) : AppColors.bgCard,
            borderRadius: BorderRadius.circular(18),
            border: Border.all(
              color: isPlayingThisAyah ? AppColors.goldPrimary : AppColors.borderSubtle,
              width: isPlayingThisAyah ? 1.5 : 1.0,
            ),
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              // Top Action Row
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                    decoration: BoxDecoration(
                      color: AppColors.bgDark,
                      borderRadius: BorderRadius.circular(10),
                      border: Border.all(color: AppColors.goldPrimary.withValues(alpha: 0.3)),
                    ),
                    child: Text(
                      '${_activeSurah!.number}:${ayah.number}',
                      style: const TextStyle(
                        fontSize: 11,
                        fontWeight: FontWeight.w800,
                        color: AppColors.goldPrimary,
                      ),
                    ),
                  ),
                  Row(
                    children: [
                      IconButton(
                        icon: Icon(
                          isPlayingThisAyah ? Icons.pause_circle : Icons.play_circle_outline,
                          color: AppColors.goldPrimary,
                          size: 22,
                        ),
                        onPressed: () => _playAyahAudio(ayah),
                      ),
                      IconButton(
                        icon: const Icon(Icons.copy, color: AppColors.emeraldSubtle, size: 18),
                        onPressed: () => _copyAyah(ayah),
                      ),
                      IconButton(
                        icon: const Icon(Icons.share_outlined, color: AppColors.emeraldSubtle, size: 18),
                        onPressed: () => _shareAyah(ayah),
                      ),
                    ],
                  ),
                ],
              ),
              const SizedBox(height: 12),

              // Arabic Text
              Text(
                ayah.arabic,
                textAlign: TextAlign.right,
                textDirection: TextDirection.rtl,
                style: TextStyle(
                  fontSize: _fontSizeArabic,
                  fontWeight: FontWeight.w600,
                  color: AppColors.textWhite,
                  height: 1.8,
                ),
              ),
              const SizedBox(height: 14),

              // Translation Header & Divider
              Row(
                children: [
                  Expanded(
                    child: Container(
                      height: 1,
                      color: AppColors.borderSubtle,
                    ),
                  ),
                  Padding(
                    padding: const EdgeInsets.symmetric(horizontal: 8),
                    child: Text(
                      langTitle,
                      style: const TextStyle(fontSize: 10, color: AppColors.goldLight, fontWeight: FontWeight.w700),
                    ),
                  ),
                  Expanded(
                    child: Container(
                      height: 1,
                      color: AppColors.borderSubtle,
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 8),

              // Translation
              Text(
                translationText,
                style: const TextStyle(
                  fontSize: 14.5,
                  color: Color(0xFFD1FAE5),
                  height: 1.55,
                ),
              ),
            ],
          ),
        );
      },
    );
  }

  Widget _buildBismillahBanner() {
    if (_activeSurah!.number == 1 || _activeSurah!.number == 9) {
      return const SizedBox.shrink();
    }
    return Container(
      margin: const EdgeInsets.only(bottom: 16),
      padding: const EdgeInsets.symmetric(vertical: 16, horizontal: 20),
      decoration: BoxDecoration(
        color: AppColors.bgCard,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: AppColors.borderSubtle),
      ),
      child: const Center(
        child: Text(
          'بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ',
          style: TextStyle(
            fontSize: 22,
            fontWeight: FontWeight.w700,
            color: AppColors.goldLight,
          ),
        ),
      ),
    );
  }

  Widget _buildVerseErrorState() {
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          const Icon(Icons.cloud_off, size: 48, color: AppColors.emeraldSubtle),
          const SizedBox(height: 16),
          const Text(
            'Unable to load online verses',
            style: TextStyle(fontSize: 16, fontWeight: FontWeight.w800, color: AppColors.textWhite),
          ),
          const SizedBox(height: 8),
          ElevatedButton.icon(
            style: ElevatedButton.styleFrom(backgroundColor: AppColors.goldPrimary, foregroundColor: AppColors.bgDark),
            icon: const Icon(Icons.refresh),
            label: const Text('Retry'),
            onPressed: () => _openSurah(_activeSurah!),
          ),
        ],
      ),
    );
  }

  void _showReaderSettingsModal() {
    final currentLang = _getEffectiveLangCode();

    showModalBottomSheet(
      context: context,
      backgroundColor: AppColors.bgCard,
      shape: const RoundedRectangleBorder(borderRadius: BorderRadius.vertical(top: Radius.circular(24))),
      builder: (context) {
        return StatefulBuilder(
          builder: (context, setModalState) {
            return Padding(
              padding: const EdgeInsets.all(24),
              child: Column(
                mainAxisSize: MainAxisSize.min,
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text(
                    'Reader Settings',
                    style: TextStyle(fontSize: 18, fontWeight: FontWeight.w800, color: AppColors.textWhite),
                  ),
                  const SizedBox(height: 16),
                  const Text('Translation Language:', style: TextStyle(fontSize: 13, color: AppColors.emeraldSubtle)),
                  const SizedBox(height: 10),
                  Wrap(
                    spacing: 8,
                    runSpacing: 8,
                    children: [
                      _langChip('hi', 'हिन्दी (Hindi)', currentLang, setModalState),
                      _langChip('ur', 'اردو (Urdu)', currentLang, setModalState),
                      _langChip('en', 'English (Sahih)', currentLang, setModalState),
                      _langChip('bn', 'বাংলা (Bengali)', currentLang, setModalState),
                      _langChip('tr', 'Türkçe (Turkish)', currentLang, setModalState),
                      _langChip('id', 'Indonesia', currentLang, setModalState),
                    ],
                  ),
                  const SizedBox(height: 20),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      const Text('Arabic Font Size:', style: TextStyle(fontSize: 13, color: AppColors.emeraldSubtle)),
                      Text('${_fontSizeArabic.toInt()} pt', style: const TextStyle(fontWeight: FontWeight.bold, color: AppColors.goldPrimary)),
                    ],
                  ),
                  Slider(
                    value: _fontSizeArabic,
                    min: 16.0,
                    max: 36.0,
                    activeColor: AppColors.goldPrimary,
                    inactiveColor: AppColors.borderSubtle,
                    onChanged: (val) {
                      setModalState(() => _fontSizeArabic = val);
                      setState(() => _fontSizeArabic = val);
                    },
                  ),
                ],
              ),
            );
          },
        );
      },
    );
  }

  Widget _langChip(String code, String label, String currentLang, StateSetter setModalState) {
    final isSelected = currentLang == code;
    return GestureDetector(
      onTap: () {
        setModalState(() => _overrideLanguage = code);
        setState(() => _overrideLanguage = code);
      },
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
        decoration: BoxDecoration(
          color: isSelected ? AppColors.goldPrimary : AppColors.bgDark,
          borderRadius: BorderRadius.circular(12),
          border: Border.all(color: isSelected ? AppColors.goldPrimary : AppColors.borderSubtle),
        ),
        child: Text(
          label,
          style: TextStyle(
            fontSize: 12,
            fontWeight: FontWeight.bold,
            color: isSelected ? AppColors.bgDark : AppColors.textWhite,
          ),
        ),
      ),
    );
  }
}

extension SurahFilterExtension on List<SurahItem> {
  List<SurahItem> filterSurahs(String query, String type) {
    final clean = query.trim().toLowerCase();
    return where((s) {
      final matchesQuery = clean.isEmpty ||
          s.englishName.toLowerCase().contains(clean) ||
          s.englishNameTranslation.toLowerCase().contains(clean) ||
          s.name.contains(clean) ||
          '${s.number}' == clean;

      final matchesType = type == 'All' || s.revelationType.toLowerCase() == type.toLowerCase();

      return matchesQuery && matchesType;
    }).toList();
  }
}
