// ============================================================
// NOOR — Home Screen (Flutter)
// Precision Live Prayer Times, Global Location, 11-Language Engine
// ============================================================

import 'dart:async';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import '../../theme/app_theme.dart';
import '../../l10n/app_localizations.dart';
import '../../providers/language_provider.dart';
import '../../providers/location_provider.dart';
import '../../widgets/muslim_logo.dart';
import '../../widgets/location_picker_modal.dart';
import '../../widgets/qibla_modal.dart';
import '../../widgets/floating_ai_button.dart';
import '../../widgets/ai_assistant_modal.dart';
import '../../widgets/auth_modal.dart';
import '../../widgets/menu_drawer.dart';
import '../../widgets/adhan_voice_modal.dart';
import '../../widgets/language_modal.dart';
import '../../widgets/search_modal.dart';
import '../../providers/auth_provider.dart';
import '../../data/quran_data.dart';
import '../../data/calendar_data.dart';
import '../../services/prayer_service.dart';
import '../../services/location_service.dart';
import '../../services/remote_config_service.dart';
import '../../services/pixabay_service.dart';
import '../../widgets/pixabay_video_player_dialog.dart';
import 'package:cached_network_image/cached_network_image.dart';
import 'package:share_plus/share_plus.dart';
import 'package:geolocator/geolocator.dart';
import 'package:url_launcher/url_launcher.dart';
import '../../data/map_data.dart';
import '../../widgets/islamic_preloader.dart';
import '../../services/analytics_service.dart';
import 'package:flutter/services.dart';
import '../../widgets/exit_app_bottom_sheet.dart';

class HomeScreen extends ConsumerStatefulWidget {
  const HomeScreen({super.key});

  @override
  ConsumerState<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends ConsumerState<HomeScreen> {
  bool _showLocationModal = false;
  bool _showLanguageModal = false;
  bool _showSearchModal = false;
  bool _showQiblaModal = false;
  bool _showAiModal = false;
  bool _showAuthModal = false;
  bool _showMenuModal = false;
  bool _showAdhanModal = false;
  AdhanVoice _activeAdhan = kAdhanVoices[0];

  // Prayer countdown
  int _secondsLeft = 2535;
  Timer? _timer;

  // Daily verse navigation
  int _dayOffset = 0;
  late DailyAyahItem _dailyAyah;

  // Audio playback state
  bool _isDailyAyahPlaying = false;

  // Pixabay Media for Home Section
  List<PixabayPhotoItem> _homePhotos = kCuratedIslamicPhotos;
  List<PixabayVideoItem> _homeVideos = kCuratedIslamicVideos;

  // Cool Animated Islamic Stats (Dynamically changing on app home page end)
  int _globalSalawatCount = 1428942;
  int _globalQuranAyahsRecited = 8642180;
  int _globalIstighfarCount = 3219840;
  int _activeMosquesInSalah = 48320;
  int _userContributedSalawat = 0;
  int _statsTickerStep = 0;
  bool _statsPulse = false;

  List<PrayerItem> _getPrayers(MobileCity city) =>
      PrayerCalculationService.calculatePrayers(
        lat: city.lat,
        lng: city.lng,
        customTimezone: city.utcOffset,
      );

  PrayerItem _getNextPrayer(List<PrayerItem> prayers) {
    return prayers.firstWhere((p) => p.isNext, orElse: () => prayers.first);
  }

  @override
  void initState() {
    super.initState();
    _updateDailyAyah();
    _loadHomePixabayMedia();
    _timer = Timer.periodic(const Duration(seconds: 1), (_) {
      if (mounted) {
        final loc = ref.read(locationProvider).value?.city ?? kWorldCities.first;
        final prayers = _getPrayers(loc);
        setState(() {
          _secondsLeft = _secondsLeft > 0
              ? _secondsLeft - 1
              : PrayerCalculationService.getSecondsToNextPrayer(prayers);

          // Dynamically change global Islamic stats in real time
          _statsTickerStep++;
          _statsPulse = !_statsPulse;
          if (_statsTickerStep % 2 == 0) {
            _globalSalawatCount += 1 + (_statsTickerStep % 3);
            _globalQuranAyahsRecited += 2 + (_statsTickerStep % 4);
            if (_statsTickerStep % 4 == 0) {
              _globalIstighfarCount += 2 + (_statsTickerStep % 2);
            }
          }
        });
      }
    });
  }

  @override
  void dispose() {
    _timer?.cancel();
    super.dispose();
  }

  void _updateDailyAyah() {
    final date = DateTime.now().add(Duration(days: _dayOffset));
    _dailyAyah = getDailyAyah(date);
  }

  Future<void> _loadHomePixabayMedia() async {
    try {
      final photos = await PixabayService.fetchIslamicPhotos(query: 'islamic architecture', perPage: 8);
      if (mounted) setState(() => _homePhotos = photos);
    } catch (_) {}

    try {
      final videos = await PixabayService.fetchIslamicVideos(query: 'islamic mosque', perPage: 4);
      if (mounted) setState(() => _homeVideos = videos);
    } catch (_) {}
  }

  String _formatCountdown(int totalSecs) {
    final h = totalSecs ~/ 3600;
    final m = (totalSecs % 3600) ~/ 60;
    final s = totalSecs % 60;
    return '${h.toString().padLeft(2, '0')}h '
        '${m.toString().padLeft(2, '0')}m '
        '${s.toString().padLeft(2, '0')}s';
  }

  String _localizedPrayerTitle(PrayerItem p, AppLocalizations t) {
    switch (p.id) {
      case 'fajr':
        return '${t.fajr} • ${p.arabic}';
      case 'sunrise':
        return '${t.sunrise} • ${p.arabic}';
      case 'dhuhr':
        return '${t.dhuhr} • ${p.arabic}';
      case 'asr':
        return '${t.asr} • ${p.arabic}';
      case 'maghrib':
        return '${t.maghrib} • ${p.arabic}';
      case 'isha':
        return '${t.isha} • ${p.arabic}';
      default:
        return '${p.name} • ${p.arabic}';
    }
  }

  String _getHijriDate() {
    try {
      final h = getHijriDate(DateTime.now());
      return '${h.monthNameEn} ${h.day}, ${h.year} AH • (Local sighting may vary ±1d)';
    } catch (_) {
      return 'Rabiʻ II 20, 1448 AH • (Local sighting may vary ±1d)';
    }
  }

  String _getDayLabel() {
    if (_dayOffset == 0) return 'Today';
    if (_dayOffset == -1) return 'Yesterday';
    if (_dayOffset == 1) return 'Tomorrow';
    final date = DateTime.now().add(Duration(days: _dayOffset));
    return '${_monthName(date.month)} ${date.day}';
  }

  String _monthName(int m) {
    const months = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
    return months[m - 1];
  }

  Widget _buildAnnouncementBanner(BuildContext context) {
    final ann = remoteConfig.announcement;
    if (ann == null || !ann.enabled || ann.title.isEmpty) {
      return const SizedBox.shrink();
    }

    final isJummah = ann.type == 'jummah';
    final isAlert = ann.type == 'alert';

    return Container(
      margin: const EdgeInsets.only(bottom: 14),
      padding: const EdgeInsets.all(14),
      decoration: BoxDecoration(
        gradient: LinearGradient(
          colors: isAlert
              ? [const Color(0xFF7F1D1D), const Color(0xFF450A0A)]
              : isJummah
                  ? [const Color(0xFF065F46), const Color(0xFF022C22)]
                  : [const Color(0xFF78350F), const Color(0xFF451A03)],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
        borderRadius: BorderRadius.circular(18),
        border: Border.all(
          color: isAlert ? const Color(0xFFF87171) : const Color(0xFFF59E0B),
          width: 1.2,
        ),
        boxShadow: const [
          BoxShadow(
            color: Colors.black45,
            blurRadius: 10,
            offset: Offset(0, 3),
          ),
        ],
      ),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Container(
            padding: const EdgeInsets.all(8),
            decoration: BoxDecoration(
              color: Colors.black.withValues(alpha: 0.25),
              borderRadius: BorderRadius.circular(12),
            ),
            child: Icon(
              isAlert ? Icons.warning_amber_rounded : isJummah ? Icons.mosque_rounded : Icons.auto_awesome,
              color: isAlert ? const Color(0xFFFCA5A5) : const Color(0xFFFBBF24),
              size: 20,
            ),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  ann.title,
                  style: const TextStyle(
                    fontSize: 13,
                    fontWeight: FontWeight.w900,
                    color: Colors.white,
                  ),
                ),
                const SizedBox(height: 4),
                Text(
                  ann.message,
                  style: TextStyle(
                    fontSize: 11.5,
                    color: Colors.white.withValues(alpha: 0.9),
                    height: 1.35,
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final t = AppLocalizations.of(context)!;
    final langState = ref.watch(languageProvider).value;
    final locState = ref.watch(locationProvider).value;
    final currentCity = locState?.city ?? kWorldCities.first;
    final prayers = _getPrayers(currentCity);
    final nextPrayer = _getNextPrayer(prayers);

    return PopScope(
      canPop: false,
      onPopInvokedWithResult: (didPop, result) async {
        if (didPop) return;
        // Dismiss any active modals first
        if (_showLocationModal ||
            _showLanguageModal ||
            _showSearchModal ||
            _showQiblaModal ||
            _showAiModal ||
            _showAuthModal ||
            _showMenuModal ||
            _showAdhanModal) {
          setState(() {
            _showLocationModal = false;
            _showLanguageModal = false;
            _showSearchModal = false;
            _showQiblaModal = false;
            _showAiModal = false;
            _showAuthModal = false;
            _showMenuModal = false;
            _showAdhanModal = false;
          });
          return;
        }
        final shouldExit = await ExitAppBottomSheet.show(context);
        if (shouldExit == true) {
          SystemNavigator.pop();
        }
      },
      child: SafeArea(
        child: Stack(
          children: [
            SingleChildScrollView(
              padding: const EdgeInsets.fromLTRB(14, 14, 14, 90),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  _buildHeader(context, t),
                  const SizedBox(height: 12),
                  _buildSearchBarWithLocation(context, t, currentCity),
                  const SizedBox(height: 14),
                  _buildAnnouncementBanner(context),
                  _buildDateBar(context, t),
                  const SizedBox(height: 16),
                  _buildHeroCard(context, t, currentCity, prayers, nextPrayer),
                  const SizedBox(height: 16),
                  _buildNearestMosqueCard(context, t, currentCity),
                  const SizedBox(height: 16),
                  _buildUpcomingFestivals(context, t, currentCity),
                  const SizedBox(height: 16),
                  _buildVerseOfDayHeader(context, t),
                  const SizedBox(height: 8),
                  _buildAyahCard(context, t, langState),
                  const SizedBox(height: 16),
                  _buildSectionHeading(t.dailyHadith),
                  const SizedBox(height: 8),
                  _buildHadithCard(context, t),
                  const SizedBox(height: 18),
                  _buildVisualTreasuresSection(context, t),
                  const SizedBox(height: 18),
                  _buildSectionHeading(t.quickEssentials),
                  const SizedBox(height: 12),
                  _buildQuickGrid(context, t),
                  const SizedBox(height: 22),
                  _buildAnimatedIslamicStats(context, t),
                  const SizedBox(height: 28),
                ],
              ),
            ),

            // Floating AI Button (Remotely Controllable)
            if (remoteConfig.isFeatureEnabled('enableAiAssistant'))
              Positioned(
                bottom: 16,
                right: 16,
                child: FloatingAiButton(
                  onPressed: () => setState(() => _showAiModal = true),
                ),
              ),

            // Modals
            if (_showLocationModal)
              LocationPickerModal(
                currentCity: currentCity,
                onSelectCity: (city) {
                  ref.read(locationProvider.notifier).setCity(city);
                  setState(() => _showLocationModal = false);
                },
                onClose: () => setState(() => _showLocationModal = false),
              ),
            if (_showQiblaModal)
              QiblaModal(
                cityName: currentCity.city,
                countryName: currentCity.country,
                lat: currentCity.lat,
                lng: currentCity.lng,
                onClose: () => setState(() => _showQiblaModal = false),
              ),
            if (_showAiModal)
              AiAssistantModal(
                onClose: () => setState(() => _showAiModal = false),
              ),
            if (_showAuthModal)
              AuthModal(
                onClose: () => setState(() => _showAuthModal = false),
              ),
            if (_showAdhanModal)
              AdhanVoiceModal(
                activeAdhanId: _activeAdhan.id,
                onSelectAdhan: (adhan) => setState(() {
                  _activeAdhan = adhan;
                  _showAdhanModal = false;
                }),
                onClose: () => setState(() => _showAdhanModal = false),
              ),
            if (_showLanguageModal)
              LanguageModal(
                onClose: () => setState(() => _showLanguageModal = false),
              ),
            if (_showSearchModal)
              SearchModal(
                onClose: () => setState(() => _showSearchModal = false),
              ),
            if (_showMenuModal)
              MenuDrawer(
                onClose: () => setState(() => _showMenuModal = false),
                onOpenAuth: () => setState(() => _showAuthModal = true),
                onOpenAdhan: () => setState(() => _showAdhanModal = true),
                onOpenQibla: () => setState(() => _showQiblaModal = true),
                onOpenLocation: () => setState(() => _showLocationModal = true),
                onOpenLanguage: () => setState(() => _showLanguageModal = true),
                onOpenSearch: () => setState(() => _showSearchModal = true),
              ),
          ],
        ),
      ),
    );
  }

  // ── Header ─────────────────────────────────────────────────
  Widget _buildHeader(BuildContext context, AppLocalizations t) {
    final langState = ref.watch(languageProvider).value;

    return Row(
      children: [
        GestureDetector(
          onTap: () {
            analytics.trackFeatureClick(featureName: 'Logo / Menu Open', screen: 'home');
            setState(() => _showMenuModal = true);
          },
          child: const MuslimLogo(
            size: 34,
            showText: true,
            compactText: true,
            customTitle: 'SALAM',
            customSubtitle: 'سلام',
          ),
        ),
        const Spacer(),
        // Language pill
        GestureDetector(
          onTap: () {
            analytics.trackFeatureClick(featureName: 'Language Selector', screen: 'home');
            setState(() => _showLanguageModal = true);
          },
          child: Container(
            padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 6),
            decoration: BoxDecoration(
              color: const Color(0x1FF59E0B),
              borderRadius: BorderRadius.circular(16),
              border: Border.all(color: const Color(0x59F59E0B)),
            ),
            child: Row(
              mainAxisSize: MainAxisSize.min,
              children: [
                Text(langState?.info.flag ?? '🇬🇧', style: const TextStyle(fontSize: 12)),
                const SizedBox(width: 4),
                Text(
                  (langState?.info.code.code ?? 'en').toUpperCase(),
                  style: const TextStyle(
                    fontSize: 11,
                    fontWeight: FontWeight.w800,
                    color: AppColors.goldLight,
                  ),
                ),
              ],
            ),
          ),
        ),
        const SizedBox(width: 6),
        // Auth / User Profile Button
        Consumer(
          builder: (context, ref, _) {
            final user = ref.watch(authProvider).value;
            if (user != null) {
              return GestureDetector(
                onTap: () {
                  analytics.trackFeatureClick(featureName: 'User Profile Tap', screen: 'home');
                  setState(() => _showAuthModal = true);
                },
                child: Container(
                  width: 34,
                  height: 34,
                  decoration: BoxDecoration(
                    color: const Color(0xFF065F46),
                    shape: BoxShape.circle,
                    border: Border.all(color: AppColors.goldPrimary, width: 1.5),
                  ),
                  child: Center(
                    child: Text(
                      user.name.isNotEmpty ? user.name[0].toUpperCase() : 'N',
                      style: const TextStyle(
                        fontSize: 14,
                        fontWeight: FontWeight.w900,
                        color: AppColors.goldLight,
                      ),
                    ),
                  ),
                ),
              );
            }
            return GestureDetector(
              onTap: () {
                analytics.trackFeatureClick(featureName: 'Login Button Tap', screen: 'home');
                setState(() => _showAuthModal = true);
              },
              child: Container(
                padding: const EdgeInsets.symmetric(horizontal: 9, vertical: 6),
                decoration: BoxDecoration(
                  color: const Color(0x26F59E0B),
                  borderRadius: BorderRadius.circular(16),
                  border: Border.all(color: const Color(0x66F59E0B)),
                ),
                child: Row(
                  mainAxisSize: MainAxisSize.min,
                  children: const [
                    Icon(Icons.person_outline, size: 14, color: AppColors.goldPrimary),
                    SizedBox(width: 3),
                    Text(
                      'Login',
                      style: TextStyle(
                        fontSize: 11,
                        fontWeight: FontWeight.w800,
                        color: AppColors.goldLight,
                      ),
                    ),
                  ],
                ),
              ),
            );
          },
        ),
        const SizedBox(width: 6),
        // Hamburger menu
        GestureDetector(
          onTap: () {
            analytics.trackFeatureClick(featureName: 'Menu Drawer Tap', screen: 'home');
            setState(() => _showMenuModal = true);
          },
          child: Container(
            width: 34,
            height: 34,
            decoration: BoxDecoration(
              color: const Color(0x14FFFFFF),
              borderRadius: BorderRadius.circular(12),
              border: Border.all(color: const Color(0x1FFFFFFF)),
            ),
            child: const Icon(Icons.menu, size: 20, color: Colors.white),
          ),
        ),
      ],
    );
  }

  // ── In-App Search & My Location Bar (Below Header) ─────────
  Widget _buildSearchBarWithLocation(BuildContext context, AppLocalizations t, MobileCity currentCity) {
    return Row(
      children: [
        // Search Input Trigger
        Expanded(
          child: GestureDetector(
            onTap: () {
              analytics.trackFeatureClick(featureName: 'Search Bar Trigger', screen: 'home');
              setState(() => _showSearchModal = true);
            },
            child: Container(
              height: 44,
              padding: const EdgeInsets.symmetric(horizontal: 12),
              decoration: BoxDecoration(
                color: const Color(0xFF032219),
                borderRadius: BorderRadius.circular(14),
                border: Border.all(color: const Color(0x3334D399)),
                boxShadow: [
                  BoxShadow(
                    color: Colors.black.withValues(alpha: 0.25),
                    blurRadius: 8,
                    offset: const Offset(0, 2),
                  ),
                ],
              ),
              child: Row(
                children: [
                  const Icon(Icons.search, size: 18, color: AppColors.goldPrimary),
                  const SizedBox(width: 8),
                  Expanded(
                    child: Text(
                      '${t.search} Qur\'an, Duas, Prayers, Hadith...',
                      style: const TextStyle(
                        fontSize: 12,
                        color: Color(0xFF6EE7B7),
                        fontWeight: FontWeight.w500,
                      ),
                      overflow: TextOverflow.ellipsis,
                    ),
                  ),
                ],
              ),
            ),
          ),
        ),
        const SizedBox(width: 8),
        // My Location Quick Pill
        GestureDetector(
          onTap: () {
            analytics.trackFeatureClick(featureName: 'Location Bar Trigger', screen: 'home');
            setState(() => _showLocationModal = true);
          },
          child: Container(
            height: 44,
            padding: const EdgeInsets.symmetric(horizontal: 11),
            decoration: BoxDecoration(
              gradient: const LinearGradient(
                colors: [Color(0xFF064E3B), Color(0xFF022C21)],
              ),
              borderRadius: BorderRadius.circular(14),
              border: Border.all(color: AppColors.goldBorder),
              boxShadow: [
                BoxShadow(
                  color: Colors.black.withValues(alpha: 0.25),
                  blurRadius: 8,
                  offset: const Offset(0, 2),
                ),
              ],
            ),
            child: Row(
              mainAxisSize: MainAxisSize.min,
              children: [
                Container(
                  width: 7,
                  height: 7,
                  decoration: const BoxDecoration(
                    color: Color(0xFF34D399),
                    shape: BoxShape.circle,
                    boxShadow: [
                      BoxShadow(color: Color(0xFF34D399), blurRadius: 4, spreadRadius: 1),
                    ],
                  ),
                ),
                const Icon(Icons.location_on, size: 14, color: AppColors.goldPrimary),
                const SizedBox(width: 5),
                ConstrainedBox(
                  constraints: const BoxConstraints(maxWidth: 130),
                  child: Text(
                    currentCity.city == 'My Location' ? 'Current Location' : currentCity.city,
                    style: const TextStyle(
                      fontSize: 12,
                      fontWeight: FontWeight.w800,
                      color: Colors.white,
                    ),
                    overflow: TextOverflow.ellipsis,
                  ),
                ),
                const SizedBox(width: 2),
                const Icon(Icons.keyboard_arrow_down, size: 14, color: AppColors.emeraldSubtle),
              ],
            ),
          ),
        ),
      ],
    );
  }

  // ── Date Bar ───────────────────────────────────────────────
  Widget _buildDateBar(BuildContext context, AppLocalizations t) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 9),
      decoration: BoxDecoration(
        color: const Color(0x14F59E0B),
        borderRadius: BorderRadius.circular(14),
        border: Border.all(color: const Color(0x40F59E0B)),
      ),
      child: Row(
        children: [
          const Text('🌙', style: TextStyle(fontSize: 14)),
          const SizedBox(width: 6),
          Expanded(
            child: Text(
              _getHijriDate(),
              style: const TextStyle(
                fontSize: 11,
                fontWeight: FontWeight.w700,
                color: AppColors.goldLight,
              ),
            ),
          ),
          GestureDetector(
            onTap: () {
              analytics.trackFeatureClick(featureName: 'Calendar Quick Link', screen: 'home');
              context.push('/calendar');
            },
            child: Text(
              '${t.calendar} →',
              style: const TextStyle(
                fontSize: 11,
                fontWeight: FontWeight.w800,
                color: AppColors.goldPrimary,
              ),
            ),
          ),
        ],
      ),
    );
  }

  // ── Hero Prayer Card ───────────────────────────────────────
  Widget _buildHeroCard(
    BuildContext context,
    AppLocalizations t,
    MobileCity currentCity,
    List<PrayerItem> prayers,
    PrayerItem nextPrayer,
  ) {
    return Container(
      padding: const EdgeInsets.all(18),
      decoration: BoxDecoration(
        color: AppColors.bgCard,
        borderRadius: BorderRadius.circular(24),
        border: Border.all(color: AppColors.goldBorder),
        boxShadow: const [
          BoxShadow(
            color: Color(0x26F59E0B),
            offset: Offset(0, 4),
            blurRadius: 10,
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Top row — upcoming prayer
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    t.upcomingSalaah.toUpperCase(),
                    style: const TextStyle(
                      fontSize: 10,
                      fontWeight: FontWeight.w800,
                      color: AppColors.goldPrimary,
                      letterSpacing: 1,
                    ),
                  ),
                  const SizedBox(height: 2),
                  Text(
                    _localizedPrayerTitle(nextPrayer, t),
                    style: const TextStyle(
                      fontSize: 22,
                      fontWeight: FontWeight.w900,
                      color: AppColors.textWhite,
                    ),
                  ),
                ],
              ),
              Column(
                crossAxisAlignment: CrossAxisAlignment.end,
                children: [
                  Text(
                    nextPrayer.time,
                    style: const TextStyle(
                      fontSize: 22,
                      fontWeight: FontWeight.w900,
                      color: AppColors.goldLight,
                    ),
                  ),
                  Text(
                    t.standardAsrMethod,
                    style: const TextStyle(
                      fontSize: 10,
                      color: AppColors.emeraldSubtle,
                    ),
                  ),
                ],
              ),
            ],
          ),

          // Countdown box
          Container(
            margin: const EdgeInsets.symmetric(vertical: 14),
            padding: const EdgeInsets.all(14),
            decoration: BoxDecoration(
              color: const Color(0x59000000),
              borderRadius: BorderRadius.circular(18),
              border: Border.all(color: const Color(0x0DFFFFFF)),
            ),
            child: Column(
              children: [
                Text(
                  _formatCountdown(_secondsLeft),
                  style: const TextStyle(
                    fontSize: 26,
                    fontWeight: FontWeight.w900,
                    color: AppColors.textWhite,
                    fontFamily: 'monospace',
                    letterSpacing: 1,
                  ),
                ),
                const SizedBox(height: 2),
                Text(
                  t.remainingUntilAdhan,
                  style: const TextStyle(fontSize: 11, color: AppColors.emeraldSubtle),
                ),
                const SizedBox(height: 12),
                // Progress bar
                ClipRRect(
                  borderRadius: BorderRadius.circular(3),
                  child: const LinearProgressIndicator(
                    value: 0.68,
                    backgroundColor: Color(0x1AFFFFFF),
                    valueColor: AlwaysStoppedAnimation(AppColors.goldPrimary),
                    minHeight: 6,
                  ),
                ),
                const SizedBox(height: 6),
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text('${t.dhuhr} ${t.elapsed}',
                        style: const TextStyle(fontSize: 10, color: Color(0x80FFFFFF))),
                    Text('68% ${t.elapsed}',
                        style: const TextStyle(fontSize: 10, color: Color(0x80FFFFFF))),
                    Text('${t.asr} ${t.currentBadge}',
                        style: const TextStyle(fontSize: 10, color: Color(0x80FFFFFF))),
                  ],
                ),
              ],
            ),
          ),

          // Adhan voice bar
          Container(
            margin: const EdgeInsets.only(bottom: 8),
            padding: const EdgeInsets.all(8),
            decoration: BoxDecoration(
              color: const Color(0x4D000000),
              borderRadius: BorderRadius.circular(14),
              border: Border.all(color: const Color(0x40F59E0B)),
            ),
            child: Row(
              children: [
                Expanded(
                  child: GestureDetector(
                    onTap: () {
                      analytics.trackFeatureClick(featureName: 'Adhan Voice Modal Trigger', screen: 'home');
                      setState(() => _showAdhanModal = true);
                    },
                    child: Row(
                      children: [
                        const Icon(Icons.volume_up, size: 14, color: AppColors.goldPrimary),
                        const SizedBox(width: 6),
                        Expanded(
                          child: Text(
                            '${t.adhanVoice}: ${_activeAdhan.name}',
                            style: const TextStyle(
                              color: Colors.white,
                              fontSize: 11,
                              fontWeight: FontWeight.w700,
                            ),
                            overflow: TextOverflow.ellipsis,
                          ),
                        ),
                        Container(
                          padding: const EdgeInsets.symmetric(horizontal: 5, vertical: 1.5),
                          decoration: BoxDecoration(
                            color: const Color(0x33F59E0B),
                            borderRadius: BorderRadius.circular(5),
                            border: Border.all(color: const Color(0x66F59E0B)),
                          ),
                          child: const Text(
                            'VOICE',
                            style: TextStyle(color: Color(0xFFFDE68A), fontSize: 8.5, fontWeight: FontWeight.w900),
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
                const SizedBox(width: 8),
                GestureDetector(
                  onTap: () {
                    analytics.trackFeatureClick(featureName: 'Listen Adhan Hero CTA', screen: 'home');
                    setState(() => _showAdhanModal = true);
                  },
                  child: Container(
                    padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 5),
                    decoration: BoxDecoration(
                      color: AppColors.goldPrimary,
                      borderRadius: BorderRadius.circular(8),
                    ),
                    child: Row(
                      children: [
                        const Icon(Icons.play_circle_fill, size: 15, color: Color(0xFF031712)),
                        const SizedBox(width: 4),
                        Text(
                          t.listenAdhan,
                          style: const TextStyle(
                            color: Color(0xFF031712),
                            fontSize: 11,
                            fontWeight: FontWeight.w900,
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
              ],
            ),
          ),

          // Hero action buttons
          Row(
            children: [
              Expanded(
                child: GestureDetector(
                  onTap: () {
                    analytics.trackFeatureClick(featureName: 'Prayer Times Hero CTA', screen: 'home');
                    context.go('/prayer');
                  },
                  child: Container(
                    padding: const EdgeInsets.symmetric(vertical: 11),
                    decoration: BoxDecoration(
                      color: AppColors.goldPrimary,
                      borderRadius: BorderRadius.circular(14),
                    ),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        const Icon(Icons.access_time, size: 15, color: Color(0xFF02120D)),
                        const SizedBox(width: 6),
                        Text(
                          t.ctaPrayerTimes,
                          style: const TextStyle(
                            color: Color(0xFF02120D),
                            fontSize: 13,
                            fontWeight: FontWeight.w900,
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
              ),
              const SizedBox(width: 10),
              GestureDetector(
                onTap: () {
                  analytics.trackFeatureClick(featureName: 'Qibla Hero CTA', screen: 'home');
                  setState(() => _showQiblaModal = true);
                },
                child: Container(
                  padding: const EdgeInsets.symmetric(horizontal: 18, vertical: 11),
                  decoration: BoxDecoration(
                    color: const Color(0x26F59E0B),
                    borderRadius: BorderRadius.circular(14),
                    border: Border.all(color: AppColors.goldBorder),
                  ),
                  child: Row(
                    children: [
                      const Icon(Icons.explore_outlined, size: 16, color: AppColors.goldPrimary),
                      const SizedBox(width: 5),
                      Text(
                        t.qibla,
                        style: const TextStyle(
                          color: AppColors.goldPrimary,
                          fontSize: 13,
                          fontWeight: FontWeight.w800,
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            ],
          ),
        ],
      ),
    );
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
                        placeholder: (_, __) => Container(
                          height: 260,
                          color: const Color(0xFF031D16),
                          child: const Center(
                            child: IslamicPreloader.compact(),
                          ),
                        ),
                        errorWidget: (_, __, ___) => Container(
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
                              style: const TextStyle(fontSize: 11, color: AppColors.emeraldSubtle),
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

  Widget _buildVisualTreasuresSection(BuildContext context, AppLocalizations t) {
    final combinedCount = _homePhotos.length + _homeVideos.length;
    if (combinedCount == 0) return const SizedBox.shrink();

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Row(
              children: [
                const Icon(Icons.photo_library_outlined, size: 16, color: AppColors.goldPrimary),
                const SizedBox(width: 6),
                _buildSectionHeading(t.t('visualTreasures', 'Visual Treasures & Cinematography')),
              ],
            ),
            GestureDetector(
              onTap: () {
                analytics.trackFeatureClick(featureName: 'Explore All Media CTA', screen: 'home');
                context.push('/media');
              },
              child: const Text(
                'Explore All →',
                style: TextStyle(
                  fontSize: 12,
                  fontWeight: FontWeight.w800,
                  color: AppColors.goldPrimary,
                ),
              ),
            ),
          ],
        ),
        const SizedBox(height: 10),
        SizedBox(
          height: 145,
          child: ListView.separated(
            scrollDirection: Axis.horizontal,
            physics: const BouncingScrollPhysics(),
            itemCount: combinedCount,
            separatorBuilder: (_, __) => const SizedBox(width: 10),
            itemBuilder: (context, index) {
              if (index < _homePhotos.length) {
                final photo = _homePhotos[index];
                return GestureDetector(
                  onTap: () {
                    analytics.trackFeatureClick(featureName: 'Home Photo View: ${photo.title}', screen: 'home');
                    _openPhotoLightbox(photo);
                  },
                  child: Container(
                    width: 130,
                    decoration: BoxDecoration(
                      borderRadius: BorderRadius.circular(16),
                      border: Border.all(color: AppColors.borderSubtle),
                    ),
                    child: ClipRRect(
                      borderRadius: BorderRadius.circular(16),
                      child: Stack(
                        children: [
                          Positioned.fill(
                            child: CachedNetworkImage(
                              imageUrl: photo.imageUrl,
                              fit: BoxFit.cover,
                              placeholder: (_, __) => Container(
                                color: const Color(0xFF031D16),
                                child: const Center(
                                  child: IslamicPreloader.compact(size: 32),
                                ),
                              ),
                              errorWidget: (_, __, ___) => Container(
                                color: const Color(0xFF031D16),
                                child: const Icon(Icons.photo, color: Colors.white30),
                              ),
                            ),
                          ),
                          Positioned(
                            bottom: 0,
                            left: 0,
                            right: 0,
                            child: Container(
                              padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 4),
                              decoration: const BoxDecoration(
                                gradient: LinearGradient(
                                  begin: Alignment.topCenter,
                                  end: Alignment.bottomCenter,
                                  colors: [Colors.transparent, Colors.black87],
                                ),
                              ),
                              child: Text(
                                photo.title,
                                maxLines: 1,
                                overflow: TextOverflow.ellipsis,
                                style: const TextStyle(
                                  fontSize: 10,
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
              } else {
                final vid = _homeVideos[index - _homePhotos.length];
                return GestureDetector(
                  onTap: () {
                    analytics.trackFeatureClick(featureName: 'Home Video Play: ${vid.title}', screen: 'home');
                    _openVideoPlayerModal(vid);
                  },
                  child: Container(
                    width: 170,
                    decoration: BoxDecoration(
                      borderRadius: BorderRadius.circular(16),
                      border: Border.all(color: AppColors.borderSubtle),
                    ),
                    child: ClipRRect(
                      borderRadius: BorderRadius.circular(16),
                      child: Stack(
                        children: [
                          Positioned.fill(
                            child: CachedNetworkImage(
                              imageUrl: vid.thumbnail,
                              fit: BoxFit.cover,
                              placeholder: (_, __) => Container(
                                color: const Color(0xFF031D16),
                                child: const Center(
                                  child: IslamicPreloader.compact(size: 32),
                                ),
                              ),
                              errorWidget: (_, __, ___) => Container(
                                color: const Color(0xFF031D16),
                                child: const Icon(Icons.videocam, color: Colors.white30),
                              ),
                            ),
                          ),
                          Positioned.fill(
                            child: Container(
                              color: Colors.black.withValues(alpha: 0.25),
                              child: Center(
                                child: Container(
                                  width: 38,
                                  height: 38,
                                  decoration: BoxDecoration(
                                    color: AppColors.goldPrimary.withValues(alpha: 0.9),
                                    shape: BoxShape.circle,
                                  ),
                                  child: const Icon(
                                    Icons.play_arrow,
                                    color: Color(0xFF02120D),
                                    size: 22,
                                  ),
                                ),
                              ),
                            ),
                          ),
                          Positioned(
                            bottom: 6,
                            left: 6,
                            right: 6,
                            child: Row(
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              children: [
                                Expanded(
                                  child: Text(
                                    vid.title,
                                    maxLines: 1,
                                    overflow: TextOverflow.ellipsis,
                                    style: const TextStyle(
                                      fontSize: 10,
                                      fontWeight: FontWeight.w800,
                                      color: Colors.white,
                                    ),
                                  ),
                                ),
                                Container(
                                  padding: const EdgeInsets.symmetric(horizontal: 5, vertical: 2),
                                  decoration: BoxDecoration(
                                    color: Colors.black.withValues(alpha: 0.7),
                                    borderRadius: BorderRadius.circular(4),
                                  ),
                                  child: Text(
                                    '${vid.duration}s',
                                    style: const TextStyle(color: Colors.white, fontSize: 9, fontWeight: FontWeight.w700),
                                  ),
                                ),
                              ],
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
                );
              }
            },
          ),
        ),
      ],
    );
  }

  // ── Section Heading ─────────────────────────────────────────
  Widget _buildSectionHeading(String title) {
    return Text(
      title,
      style: const TextStyle(
        fontSize: 15,
        fontWeight: FontWeight.w800,
        color: AppColors.textWhite,
        letterSpacing: 0.3,
      ),
    );
  }

  // ── Quick Essentials Grid ───────────────────────────────────
  Widget _buildQuickGrid(BuildContext context, AppLocalizations t) {
    final items = _buildGridItems(context, t);
    return GridView.builder(
      shrinkWrap: true,
      physics: const NeverScrollableScrollPhysics(),
      gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
        crossAxisCount: 2,
        crossAxisSpacing: 10,
        mainAxisSpacing: 10,
        childAspectRatio: 1.55,
      ),
      itemCount: items.length,
      itemBuilder: (_, i) => items[i],
    );
  }

  List<Widget> _buildGridItems(BuildContext context, AppLocalizations t) {
    Widget gridCard({
      required IconData icon,
      required String title,
      required String sub,
      required VoidCallback onTap,
      Color? iconBg,
      Color? iconColor,
    }) {
      return GestureDetector(
        onTap: () {
          analytics.trackFeatureClick(featureName: 'Grid: $title', screen: 'home');
          onTap();
        },
        child: Container(
          padding: const EdgeInsets.all(14),
          decoration: BoxDecoration(
            color: AppColors.bgCard,
            borderRadius: BorderRadius.circular(18),
            border: Border.all(color: AppColors.borderSubtle),
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Container(
                width: 36,
                height: 36,
                decoration: BoxDecoration(
                  color: iconBg ?? const Color(0x1AF59E0B),
                  borderRadius: BorderRadius.circular(18),
                ),
                child: Icon(icon, size: 20, color: iconColor ?? AppColors.goldPrimary),
              ),
              const SizedBox(height: 6),
              Text(
                title,
                style: const TextStyle(fontSize: 13, fontWeight: FontWeight.w800, color: AppColors.textWhite),
                maxLines: 1,
                overflow: TextOverflow.ellipsis,
              ),
              Text(
                sub,
                style: const TextStyle(fontSize: 10, color: AppColors.emeraldSubtle),
                maxLines: 1,
                overflow: TextOverflow.ellipsis,
              ),
            ],
          ),
        ),
      );
    }

    return [
      gridCard(
        icon: Icons.access_time_outlined,
        title: t.prayers,
        sub: t.prayerTimetable,
        onTap: () => context.go('/prayer'),
      ),
      gridCard(
        icon: Icons.menu_book_outlined,
        title: t.quran,
        sub: t.surahsCatalog,
        onTap: () => context.go('/quran'),
      ),
      gridCard(
        icon: Icons.mosque_outlined,
        title: t.ziyarat,
        sub: t.sanctuariesDirectory,
        onTap: () => context.go('/ziyarat'),
      ),
      gridCard(
        icon: Icons.volunteer_activism_outlined,
        title: t.duas,
        sub: t.interactiveTasbih,
        onTap: () => context.go('/duas'),
      ),
      gridCard(
        icon: Icons.calendar_today_outlined,
        title: t.calendar,
        sub: t.sacredLunarMonths,
        onTap: () => context.push('/calendar'),
      ),
      gridCard(
        icon: Icons.photo_library_outlined,
        title: t.media,
        sub: t.visualTreasures,
        onTap: () => context.push('/media'),
      ),
      gridCard(
        icon: Icons.bar_chart_outlined,
        title: t.dashboard,
        sub: t.spiritualDeenTracker,
        onTap: () => context.push('/dashboard'),
      ),
      gridCard(
        icon: Icons.auto_awesome_outlined,
        title: t.namesOfAllah,
        sub: t.asmaDesc,
        onTap: () => context.push('/names-of-allah'),
      ),
      gridCard(
        icon: Icons.child_care_outlined,
        title: t.t('kids', 'NOOR Kids'),
        sub: t.t('kidsDesc', 'Stories & Quiz'),
        iconBg: const Color(0x26EC4899),
        iconColor: const Color(0xFFF472B6),
        onTap: () => context.push('/kids'),
      ),
      gridCard(
        icon: Icons.wb_twilight_outlined,
        title: t.t('janazah', 'Janazah Guide'),
        sub: t.t('janazahDesc', '4 Takbeers & Adab'),
        iconBg: const Color(0x268B5CF6),
        iconColor: const Color(0xFFA78BFA),
        onTap: () => context.push('/janazah'),
      ),
      gridCard(
        icon: Icons.favorite_border,
        title: t.t('nikah', 'Nikah & Family'),
        sub: t.t('nikahDesc', 'Pillars, Rights & Duas'),
        iconBg: const Color(0x26F43F5E),
        iconColor: const Color(0xFFF43F5E),
        onTap: () => context.push('/nikah'),
      ),
      gridCard(
        icon: Icons.flight_takeoff_outlined,
        title: t.t('travelMode', 'Travel Mode'),
        sub: t.t('travelModeDesc', 'Safar & Qasr Salah'),
        iconBg: const Color(0x2606B6D4),
        iconColor: const Color(0xFF22D3EE),
        onTap: () => context.push('/travel'),
      ),
      gridCard(
        icon: Icons.menu_book_outlined,
        title: t.t('etiquette', 'Etiquette (Adab)'),
        sub: t.t('etiquetteDesc', 'Sunnah Daily Manners'),
        iconBg: const Color(0x2634D399),
        iconColor: const Color(0xFF34D399),
        onTap: () => context.push('/etiquette'),
      ),
      gridCard(
        icon: Icons.videocam_outlined,
        title: t.t('watch', 'Sacred Watch'),
        sub: t.t('watchDesc', '24/7 Haramain Live'),
        iconBg: const Color(0x26EF4444),
        iconColor: const Color(0xFFEF4444),
        onTap: () => context.push('/watch'),
      ),
      gridCard(
        icon: Icons.payments_outlined,
        title: t.t('zakatHub', 'Zakat Calculator'),
        sub: t.t('liveNisab', '2.5% Live Nisab'),
        iconBg: const Color(0x26F59E0B),
        iconColor: const Color(0xFFFBBF24),
        onTap: () => context.push('/zakat'),
      ),
      gridCard(
        icon: Icons.verified_user_outlined,
        title: t.t('guides', 'Prayer Guides'),
        sub: t.t('guidesDesc', 'Wudu, Ghusl & Salah'),
        iconBg: const Color(0x2634D399),
        iconColor: const Color(0xFF34D399),
        onTap: () => context.push('/guides'),
      ),
      gridCard(
        icon: Icons.navigation_outlined,
        title: t.t('hajjUmrah', 'Hajj & Umrah'),
        sub: t.t('hajjUmrahDesc', 'Field Guide & Checklist'),
        iconBg: const Color(0x26F59E0B),
        iconColor: const Color(0xFFF59E0B),
        onTap: () => context.push('/hajj-umrah'),
      ),
      gridCard(
        icon: Icons.map_outlined,
        title: t.t('islamicMap', 'Islamic Map'),
        sub: t.t('islamicMapDesc', 'Sacred Mosques Directory'),
        iconBg: const Color(0x263B82F6),
        iconColor: const Color(0xFF60A5FA),
        onTap: () => context.push('/map'),
      ),
      gridCard(
        icon: Icons.card_giftcard_outlined,
        title: t.giving,
        sub: t.sadaqahJariyah,
        onTap: () => context.push('/giving'),
      ),
      gridCard(
        icon: Icons.explore_outlined,
        title: t.qibla,
        sub: t.sacredDirection,
        onTap: () => setState(() => _showQiblaModal = true),
      ),
    ];
  }

  // ── Verse of the Day Header ────────────────────────────────
  Widget _buildVerseOfDayHeader(BuildContext context, AppLocalizations t) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        Text(
          t.dailyVerse,
          style: const TextStyle(
            fontSize: 15,
            fontWeight: FontWeight.w800,
            color: AppColors.textWhite,
            letterSpacing: 0.3,
          ),
        ),
        Container(
          padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 3),
          decoration: BoxDecoration(
            color: const Color(0x1A10B981),
            borderRadius: BorderRadius.circular(12),
            border: Border.all(color: const Color(0x3310B981)),
          ),
          child: Row(
            children: [
              GestureDetector(
                onTap: () => setState(() {
                  _dayOffset--;
                  _updateDailyAyah();
                }),
                child: const Icon(Icons.chevron_left, size: 13, color: AppColors.emeraldSubtle),
              ),
              const SizedBox(width: 2),
              Text(
                _getDayLabel(),
                style: const TextStyle(fontSize: 10, fontWeight: FontWeight.w700, color: AppColors.emeraldSubtle),
              ),
              const SizedBox(width: 2),
              GestureDetector(
                onTap: () => setState(() {
                  _dayOffset++;
                  _updateDailyAyah();
                }),
                child: const Icon(Icons.chevron_right, size: 13, color: AppColors.emeraldSubtle),
              ),
            ],
          ),
        ),
      ],
    );
  }

  // ── Ayah Card ──────────────────────────────────────────────
  Widget _buildAyahCard(BuildContext context, AppLocalizations t, LanguageState? langState) {
    return Container(
      padding: const EdgeInsets.all(18),
      decoration: BoxDecoration(
        color: AppColors.bgCard,
        borderRadius: BorderRadius.circular(22),
        border: Border.all(color: AppColors.borderSubtle),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Top row
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Text(
                      'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
                      style: TextStyle(fontSize: 13, color: AppColors.goldLight, fontWeight: FontWeight.w700),
                    ),
                    Text(
                      '${_dailyAyah.surahName} • ${_dailyAyah.reference}',
                      style: const TextStyle(fontSize: 10, fontWeight: FontWeight.w800, color: AppColors.emeraldSubtle),
                    ),
                  ],
                ),
              ),
              GestureDetector(
                onTap: () {
                  setState(() => _isDailyAyahPlaying = !_isDailyAyahPlaying);
                  if (_isDailyAyahPlaying) {
                    analytics.trackAyahAudioPlay(
                      surahNumber: _dailyAyah.surahNumber,
                      ayahNumber: _dailyAyah.ayahNumber,
                    );
                  }
                },
                child: Container(
                  padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                  decoration: BoxDecoration(
                    color: _isDailyAyahPlaying ? AppColors.goldPrimary : const Color(0x26F59E0B),
                    borderRadius: BorderRadius.circular(8),
                    border: Border.all(color: AppColors.goldBorder),
                  ),
                  child: Row(
                    children: [
                      Icon(
                        _isDailyAyahPlaying ? Icons.pause : Icons.play_arrow,
                        size: 13,
                        color: _isDailyAyahPlaying ? const Color(0xFF031712) : AppColors.goldPrimary,
                      ),
                      const SizedBox(width: 4),
                      Text(
                        _isDailyAyahPlaying ? 'Pause' : 'Recite',
                        style: TextStyle(
                          fontSize: 10,
                          fontWeight: FontWeight.w700,
                          color: _isDailyAyahPlaying ? const Color(0xFF031712) : AppColors.goldPrimary,
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            ],
          ),
          const Divider(color: Color(0x0FFFFFFF), height: 16),
          // Arabic text
          Text(
            _dailyAyah.arabic,
            textDirection: TextDirection.rtl,
            style: const TextStyle(
              fontSize: 17,
              color: AppColors.textWhite,
              height: 1.65,
              fontWeight: FontWeight.w700,
            ),
          ),
          if (_dailyAyah.transliteration != null) ...[
            const SizedBox(height: 4),
            Text(
              _dailyAyah.transliteration!,
              style: const TextStyle(
                fontSize: 11,
                color: AppColors.emeraldSubtle,
                fontStyle: FontStyle.italic,
                height: 1.45,
              ),
            ),
          ],
          const SizedBox(height: 4),
          Text(
            langState?.language == SupportedLanguage.hi
                ? (_dailyAyah.translationHi ?? _dailyAyah.translationEn)
                : langState?.language == SupportedLanguage.ur
                    ? (_dailyAyah.translationUr ?? _dailyAyah.translationEn)
                    : _dailyAyah.translationEn,
            style: const TextStyle(
              fontSize: 12,
              color: AppColors.textMuted,
              fontStyle: FontStyle.italic,
              height: 1.5,
            ),
          ),
          const Divider(color: Color(0x0FFFFFFF), height: 16),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                '${_dailyAyah.surahName} ${_dailyAyah.surahNumber}:${_dailyAyah.ayahNumber}',
                style: const TextStyle(fontSize: 11, fontWeight: FontWeight.w800, color: AppColors.goldPrimary),
              ),
              GestureDetector(
                onTap: () {
                  analytics.trackFeatureClick(featureName: 'Read Quran Daily Ayah CTA', screen: 'home');
                  context.go('/quran');
                },
                child: Text(
                  t.readQuranCta,
                  style: const TextStyle(fontSize: 11, fontWeight: FontWeight.w800, color: AppColors.emeraldLight),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }

  // ── Daily Hadith Card ──────────────────────────────────────
  Widget _buildHadithCard(BuildContext context, AppLocalizations t) {
    return GestureDetector(
      onTap: () {
        analytics.trackFeatureClick(featureName: 'Daily Hadith Tap', screen: 'home');
      },
      child: Container(
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(
          color: const Color(0xB3062C21),
          borderRadius: BorderRadius.circular(18),
          border: Border.all(color: const Color(0x3334D399)),
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                const Icon(Icons.menu_book, size: 16, color: AppColors.goldPrimary),
                const SizedBox(width: 6),
                const Text(
                  'AUTHENTIC PROPHETIC SUNNAH',
                  style: TextStyle(
                    fontSize: 10,
                    fontWeight: FontWeight.w800,
                    color: AppColors.goldPrimary,
                    letterSpacing: 0.8,
                  ),
                ),
              ],
            ),
            const SizedBox(height: 8),
            Text(
              t.hadithQuote,
              style: const TextStyle(
                fontSize: 13,
                color: AppColors.textWhite,
                height: 1.55,
                fontStyle: FontStyle.italic,
              ),
            ),
            const SizedBox(height: 8),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: const [
                Text(
                  'Sahih al-Bukhari 5027',
                  style: TextStyle(fontSize: 11, fontWeight: FontWeight.w800, color: AppColors.goldLight),
                ),
                Text(
                  'Narrated by Uthman ibn Affan (RA)',
                  style: TextStyle(fontSize: 10, color: AppColors.emeraldSubtle),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }

  // ── Cool Animated Global Islamic Stats (End of Home Page) ──────
  String _formatStatsNum(int n) {
    final str = n.toString();
    final reg = RegExp(r'\B(?=(\d{3})+(?!\d))');
    return str.replaceAll(reg, ',');
  }

  void _contributeSalawat() {
    setState(() {
      _globalSalawatCount++;
      _userContributedSalawat++;
    });
    try {
      analytics.trackSalawatContributed(
        totalCount: _globalSalawatCount,
        userContribution: 1,
      );
    } catch (_) {}
    ScaffoldMessenger.of(context).hideCurrentSnackBar();
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: const Row(
          children: [
            Icon(Icons.favorite, color: AppColors.goldPrimary, size: 18),
            SizedBox(width: 8),
            Expanded(
              child: Text(
                'اللَّهُمَّ صَلِّ عَلَى سَيِّدِنَا مُحَمَّدٍ • Salawat recorded to Global Pulse!',
                style: TextStyle(fontWeight: FontWeight.w700, fontSize: 12),
              ),
            ),
          ],
        ),
        backgroundColor: const Color(0xFF063326),
        behavior: SnackBarBehavior.floating,
        duration: const Duration(seconds: 2),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(12),
          side: const BorderSide(color: AppColors.goldPrimary, width: 0.8),
        ),
      ),
    );
  }

  Widget _buildAnimatedIslamicStats(BuildContext context, AppLocalizations t) {
    return Container(
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        gradient: const LinearGradient(
          colors: [
            Color(0xFF04281E),
            Color(0xFF031B14),
            Color(0xFF063023),
          ],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
        borderRadius: BorderRadius.circular(24),
        border: Border.all(color: AppColors.goldPrimary.withValues(alpha: 0.35), width: 1.2),
        boxShadow: [
          BoxShadow(
            color: AppColors.emeraldPrimary.withValues(alpha: 0.2),
            blurRadius: 24,
            offset: const Offset(0, 8),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Header with Live Pulsing Indicator
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Row(
                children: [
                  AnimatedOpacity(
                    opacity: _statsPulse ? 1.0 : 0.35,
                    duration: const Duration(milliseconds: 600),
                    child: Container(
                      width: 9,
                      height: 9,
                      decoration: const BoxDecoration(
                        color: Color(0xFF10B981),
                        shape: BoxShape.circle,
                        boxShadow: [
                          BoxShadow(
                            color: Color(0xFF10B981),
                            blurRadius: 8,
                            spreadRadius: 2,
                          ),
                        ],
                      ),
                    ),
                  ),
                  const SizedBox(width: 8),
                  const Text(
                    'LIVE GLOBAL UMMAH STATS',
                    style: TextStyle(
                      fontSize: 10,
                      fontWeight: FontWeight.w900,
                      color: Color(0xFF34D399),
                      letterSpacing: 1.0,
                    ),
                  ),
                ],
              ),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                decoration: BoxDecoration(
                  color: AppColors.goldPrimary.withValues(alpha: 0.15),
                  borderRadius: BorderRadius.circular(10),
                  border: Border.all(color: AppColors.goldPrimary.withValues(alpha: 0.3)),
                ),
                child: const Text(
                  'REAL-TIME',
                  style: TextStyle(fontSize: 9, fontWeight: FontWeight.w900, color: AppColors.goldPrimary),
                ),
              ),
            ],
          ),
          const SizedBox(height: 10),
          const Text(
            'Global Islamic Devotion Pulse',
            style: TextStyle(fontSize: 18, fontWeight: FontWeight.w900, color: AppColors.textWhite, letterSpacing: -0.3),
          ),
          const SizedBox(height: 3),
          const Text(
            'Dynamic continuous Tilawat, Salawat & Istighfar by believers across 24 timezones.',
            style: TextStyle(fontSize: 12, color: AppColors.emeraldSubtle, height: 1.35),
          ),
          const SizedBox(height: 16),

          // 2x2 Grid of Animated Stat Counters
          Row(
            children: [
              Expanded(
                child: _buildStatTile(
                  icon: Icons.favorite,
                  iconColor: const Color(0xFFF59E0B),
                  title: 'Salawat on Prophet ﷺ',
                  value: _formatStatsNum(_globalSalawatCount),
                  badge: 'Live Ticker',
                  valueColor: AppColors.goldPrimary,
                ),
              ),
              const SizedBox(width: 10),
              Expanded(
                child: _buildStatTile(
                  icon: Icons.menu_book,
                  iconColor: const Color(0xFF34D399),
                  title: 'Ayahs Recited Today',
                  value: _formatStatsNum(_globalQuranAyahsRecited),
                  badge: '~420 ayahs/s',
                  valueColor: const Color(0xFF6EE7B7),
                ),
              ),
            ],
          ),
          const SizedBox(height: 10),
          Row(
            children: [
              Expanded(
                child: _buildStatTile(
                  icon: Icons.auto_awesome,
                  iconColor: const Color(0xFF38BDF8),
                  title: 'Daily Istighfar & Dhikr',
                  value: _formatStatsNum(_globalIstighfarCount),
                  badge: 'Astaghfirullah',
                  valueColor: const Color(0xFF7DD3FC),
                ),
              ),
              const SizedBox(width: 10),
              Expanded(
                child: _buildStatTile(
                  icon: Icons.mosque,
                  iconColor: const Color(0xFFA78BFA),
                  title: 'Mosques in Jama\'ah Now',
                  value: _formatStatsNum(_activeMosquesInSalah),
                  badge: 'Active Salah',
                  valueColor: const Color(0xFFC4B5FD),
                ),
              ),
            ],
          ),

          const SizedBox(height: 16),

          // Interactive Salawat Contribution Action
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 12),
            decoration: BoxDecoration(
              color: AppColors.bgDark.withValues(alpha: 0.7),
              borderRadius: BorderRadius.circular(16),
              border: Border.all(color: AppColors.borderSubtle),
            ),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const Text(
                        'Send Salawat Right Now',
                        style: TextStyle(fontSize: 13, fontWeight: FontWeight.w800, color: AppColors.textWhite),
                      ),
                      const SizedBox(height: 2),
                      Text(
                        _userContributedSalawat > 0
                            ? 'You sent $_userContributedSalawat Salawat today • Keep going!'
                            : 'Tap to add your Salawat to the global counter',
                        style: const TextStyle(fontSize: 11, color: AppColors.emeraldSubtle),
                      ),
                    ],
                  ),
                ),
                ElevatedButton.icon(
                  style: ElevatedButton.styleFrom(
                    backgroundColor: AppColors.goldPrimary,
                    foregroundColor: AppColors.bgDark,
                    padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                  ),
                  icon: const Icon(Icons.add_circle_outline, size: 16),
                  label: const Text('+1 Salawat', style: TextStyle(fontWeight: FontWeight.w900, fontSize: 11)),
                  onPressed: _contributeSalawat,
                ),
              ],
            ),
          ),
          const SizedBox(height: 12),

          // Bottom Hadith Reminder
          Center(
            child: Text(
              '« مَنْ صَلَّى عَلَيَّ وَاحِدَةً صَلَّى اللَّهُ عَلَيْهِ عَشْرًا »\n"Whoever sends blessings upon me once, Allah sends blessings upon him tenfold." (Muslim 408)',
              textAlign: TextAlign.center,
              style: const TextStyle(
                fontSize: 11,
                fontStyle: FontStyle.italic,
                color: AppColors.emeraldSubtle,
                height: 1.45,
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildStatTile({
    required IconData icon,
    required Color iconColor,
    required String title,
    required String value,
    required String badge,
    required Color valueColor,
  }) {
    return Container(
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: AppColors.bgDark.withValues(alpha: 0.8),
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: AppColors.borderSubtle.withValues(alpha: 0.6)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Icon(icon, size: 16, color: iconColor),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                decoration: BoxDecoration(
                  color: iconColor.withValues(alpha: 0.15),
                  borderRadius: BorderRadius.circular(6),
                ),
                child: Text(
                  badge,
                  style: TextStyle(fontSize: 9, fontWeight: FontWeight.bold, color: iconColor),
                ),
              ),
            ],
          ),
          const SizedBox(height: 8),
          Text(
            value,
            style: TextStyle(fontSize: 16, fontWeight: FontWeight.w900, color: valueColor, letterSpacing: -0.5),
          ),
          const SizedBox(height: 2),
          Text(
            title,
            maxLines: 1,
            overflow: TextOverflow.ellipsis,
            style: const TextStyle(fontSize: 11, color: AppColors.emeraldSubtle, fontWeight: FontWeight.w500),
          ),
        ],
      ),
    );
  }

  // ── Nearest Mosque with Map Navigation (Home Page) ───────────
  Future<void> _launchDirections(double lat, double lng, [String? mosqueName, double? distanceKm]) async {
    try {
      analytics.trackMosqueNavigation(
        mosqueName: mosqueName ?? 'Nearest Mosque',
        distanceKm: distanceKm ?? 0.0,
      );
    } catch (_) {}
    final uri = Uri.parse('https://www.google.com/maps/dir/?api=1&destination=$lat,$lng');
    if (await canLaunchUrl(uri)) {
      await launchUrl(uri, mode: LaunchMode.externalApplication);
    }
  }

  Future<void> _launchNearbyMosques(double lat, double lng) async {
    try {
      analytics.trackFeatureClick(
        featureName: 'Nearby Mosques Radar',
        screen: 'home',
        metadata: {'lat': lat, 'lng': lng},
      );
    } catch (_) {}
    final uri = Uri.parse('https://www.google.com/maps/search/mosque/@$lat,$lng,14z');
    if (await canLaunchUrl(uri)) {
      await launchUrl(uri, mode: LaunchMode.externalApplication);
    }
  }

  Widget _buildNearestMosqueCard(BuildContext context, AppLocalizations t, MobileCity city) {
    IslamicMapPoint nearest = kIslamicMapPoints.first;
    double minMeters = double.infinity;
    for (final p in kIslamicMapPoints) {
      final d = Geolocator.distanceBetween(city.lat, city.lng, p.latitude, p.longitude);
      if (d < minMeters) {
        minMeters = d;
        nearest = p;
      }
    }
    final distKm = minMeters / 1000.0;
    final distText = distKm < 1.0
        ? '${(distKm * 1000).toInt()} m away'
        : distKm < 100
            ? '${distKm.toStringAsFixed(1)} km away'
            : '${distKm.toStringAsFixed(0)} km away';

    return Container(
      padding: const EdgeInsets.all(18),
      decoration: BoxDecoration(
        gradient: LinearGradient(
          colors: [
            const Color(0xFF063A2B),
            AppColors.bgCard,
          ],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
        borderRadius: BorderRadius.circular(22),
        border: Border.all(color: AppColors.goldPrimary.withValues(alpha: 0.35)),
        boxShadow: [
          BoxShadow(
            color: AppColors.emeraldPrimary.withValues(alpha: 0.15),
            blurRadius: 18,
            offset: const Offset(0, 6),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Header Row
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Row(
                children: [
                  Container(
                    padding: const EdgeInsets.all(7),
                    decoration: BoxDecoration(
                      color: AppColors.goldPrimary.withValues(alpha: 0.18),
                      borderRadius: BorderRadius.circular(10),
                    ),
                    child: const Icon(Icons.mosque, size: 16, color: AppColors.goldPrimary),
                  ),
                  const SizedBox(width: 8),
                  const Text(
                    'NEAREST MOSQUE',
                    style: TextStyle(
                      fontSize: 11,
                      fontWeight: FontWeight.w900,
                      color: AppColors.goldPrimary,
                      letterSpacing: 0.8,
                    ),
                  ),
                ],
              ),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                decoration: BoxDecoration(
                  color: AppColors.bgDark,
                  borderRadius: BorderRadius.circular(12),
                  border: Border.all(color: AppColors.goldPrimary.withValues(alpha: 0.3)),
                ),
                child: Row(
                  children: [
                    const Icon(Icons.near_me, size: 11, color: AppColors.goldLight),
                    const SizedBox(width: 4),
                    Text(
                      distText,
                      style: const TextStyle(fontSize: 11, fontWeight: FontWeight.w800, color: AppColors.goldLight),
                    ),
                  ],
                ),
              ),
            ],
          ),
          const SizedBox(height: 12),

          // Mosque Title and Arabic Name
          Text(
            nearest.name,
            style: const TextStyle(fontSize: 17, fontWeight: FontWeight.w900, color: AppColors.textWhite),
          ),
          const SizedBox(height: 3),
          Text(
            nearest.arabicName,
            style: const TextStyle(fontSize: 13, fontWeight: FontWeight.w700, color: AppColors.goldLight),
          ),
          const SizedBox(height: 6),
          Row(
            children: [
              const Icon(Icons.location_on, size: 13, color: AppColors.emeraldSubtle),
              const SizedBox(width: 4),
              Text(
                '${nearest.city}, ${nearest.country}',
                style: const TextStyle(fontSize: 12, color: AppColors.emeraldSubtle),
              ),
            ],
          ),
          const SizedBox(height: 8),
          Text(
            nearest.description,
            maxLines: 2,
            overflow: TextOverflow.ellipsis,
            style: const TextStyle(fontSize: 12, color: AppColors.textWhite, height: 1.35),
          ),
          const SizedBox(height: 14),

          // Action Buttons: Navigate in Maps & Nearby Radar
          Row(
            children: [
              Expanded(
                flex: 3,
                child: ElevatedButton.icon(
                  style: ElevatedButton.styleFrom(
                    backgroundColor: AppColors.goldPrimary,
                    foregroundColor: AppColors.bgDark,
                    padding: const EdgeInsets.symmetric(vertical: 11),
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                  ),
                  icon: const Icon(Icons.navigation, size: 16),
                  label: const Text('Directions (Maps)', style: TextStyle(fontWeight: FontWeight.w900, fontSize: 12)),
                  onPressed: () => _launchDirections(
                    nearest.latitude,
                    nearest.longitude,
                    nearest.name,
                    minMeters / 1000.0,
                  ),
                ),
              ),
              const SizedBox(width: 8),
              Expanded(
                flex: 2,
                child: OutlinedButton.icon(
                  style: OutlinedButton.styleFrom(
                    foregroundColor: AppColors.goldLight,
                    side: BorderSide(color: AppColors.goldPrimary.withValues(alpha: 0.4)),
                    padding: const EdgeInsets.symmetric(vertical: 11),
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                  ),
                  icon: const Icon(Icons.radar, size: 15, color: AppColors.goldPrimary),
                  label: const Text('Radar', style: TextStyle(fontWeight: FontWeight.w800, fontSize: 12)),
                  onPressed: () => _launchNearbyMosques(city.lat, city.lng),
                ),
              ),
              const SizedBox(width: 8),
              IconButton(
                tooltip: 'All Mosques',
                style: IconButton.styleFrom(
                  backgroundColor: AppColors.bgDark,
                  side: const BorderSide(color: AppColors.borderSubtle),
                ),
                icon: const Icon(Icons.map_outlined, color: AppColors.goldPrimary, size: 18),
                onPressed: () {
                  analytics.trackFeatureClick(featureName: 'All Mosques Map CTA', screen: 'home');
                  context.push('/map');
                },
              ),
            ],
          ),
        ],
      ),
    );
  }

  // ── Upcoming Festivals According to User Location (Home Page) ─
  String _getSightingZoneForCountry(String country) {
    final c = country.toLowerCase();
    if (c.contains('india') || c.contains('pakistan') || c.contains('bangladesh')) {
      return 'South Asia Sighting Zone (±1d)';
    } else if (c.contains('saudi') || c.contains('emirates') || c.contains('qatar') || c.contains('kuwait') || c.contains('oman') || c.contains('bahrain')) {
      return 'Umm al-Qura Hijaz Sighting';
    } else if (c.contains('turkey')) {
      return 'Diyanet Astronomical Zone';
    } else if (c.contains('united states') || c.contains('canada') || c.contains('kingdom') || c.contains('europe')) {
      return 'Western Horizon Sighting';
    } else if (c.contains('indonesia') || c.contains('malaysia') || c.contains('singapore')) {
      return 'MABIMS Southeast Asia Zone';
    } else if (c.contains('egypt') || c.contains('morocco')) {
      return 'North Africa Dar al-Ifta Zone';
    }
    return 'Global Lunar Horizon';
  }

  List<_FestivalCountdownItem> _getUpcomingFestivals(MobileCity city) {
    final now = DateTime.now();
    final hDate = getHijriDate(now);

    final list = <_FestivalCountdownItem>[];
    for (final ev in kIslamicEvents) {
      double daysRemaining = 0;
      if (ev.hijriMonth > hDate.month) {
        daysRemaining = (ev.hijriMonth - hDate.month) * 29.53 + (ev.hijriDay - hDate.day);
      } else if (ev.hijriMonth == hDate.month) {
        if (ev.hijriDay >= hDate.day) {
          daysRemaining = (ev.hijriDay - hDate.day).toDouble();
        } else {
          daysRemaining = (12 * 29.53) - (hDate.day - ev.hijriDay);
        }
      } else {
        daysRemaining = ((12 - hDate.month) + ev.hijriMonth) * 29.53 + (ev.hijriDay - hDate.day);
      }

      list.add(_FestivalCountdownItem(
        event: ev,
        daysRemaining: daysRemaining,
        hijriDay: ev.hijriDay,
        hijriMonthName: kIslamicMonths[ev.hijriMonth - 1].nameEn,
      ));
    }

    list.sort((a, b) => a.daysRemaining.compareTo(b.daysRemaining));
    return list.take(3).toList();
  }

  Widget _buildUpcomingFestivals(BuildContext context, AppLocalizations t, MobileCity city) {
    final festivals = _getUpcomingFestivals(city);
    final sightingZone = _getSightingZoneForCountry(city.country);

    return Container(
      padding: const EdgeInsets.all(18),
      decoration: BoxDecoration(
        color: AppColors.bgCard,
        borderRadius: BorderRadius.circular(22),
        border: Border.all(color: AppColors.borderSubtle),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Header Row
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Row(
                children: [
                  Container(
                    padding: const EdgeInsets.all(7),
                    decoration: BoxDecoration(
                      color: AppColors.emeraldPrimary.withValues(alpha: 0.2),
                      borderRadius: BorderRadius.circular(10),
                    ),
                    child: const Icon(Icons.celebration, size: 16, color: AppColors.goldPrimary),
                  ),
                  const SizedBox(width: 8),
                  const Text(
                    'UPCOMING FESTIVALS',
                    style: TextStyle(
                      fontSize: 11,
                      fontWeight: FontWeight.w900,
                      color: AppColors.textWhite,
                      letterSpacing: 0.8,
                    ),
                  ),
                ],
              ),
              GestureDetector(
                onTap: () {
                  analytics.trackFeatureClick(featureName: 'Upcoming Festivals Full Calendar CTA', screen: 'home');
                  context.push('/calendar');
                },
                child: const Row(
                  children: [
                    Text(
                      'Full Calendar',
                      style: TextStyle(fontSize: 11, fontWeight: FontWeight.w800, color: AppColors.goldPrimary),
                    ),
                    SizedBox(width: 3),
                    Icon(Icons.arrow_forward_ios, size: 10, color: AppColors.goldPrimary),
                  ],
                ),
              ),
            ],
          ),
          const SizedBox(height: 6),

          // Location Sighting Notice
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 5),
            decoration: BoxDecoration(
              color: AppColors.bgDark,
              borderRadius: BorderRadius.circular(10),
              border: Border.all(color: AppColors.borderSubtle.withValues(alpha: 0.5)),
            ),
            child: Row(
              children: [
                const Icon(Icons.public, size: 12, color: AppColors.emeraldLight),
                const SizedBox(width: 6),
                Expanded(
                  child: Text(
                    'Zone: $sightingZone • ${city.city}, ${city.country}',
                    maxLines: 1,
                    overflow: TextOverflow.ellipsis,
                    style: const TextStyle(fontSize: 10, fontWeight: FontWeight.bold, color: AppColors.emeraldLight),
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(height: 12),

          // Festival Cards
          ...festivals.map((f) {
            final int days = f.daysRemaining.round();
            final String badgeText = days == 0
                ? 'TODAY 🌙'
                : days == 1
                    ? 'TOMORROW ✨'
                    : 'IN ~$days DAYS';
            final Color badgeBg = days <= 2 ? AppColors.goldPrimary : AppColors.emeraldPrimary.withValues(alpha: 0.2);
            final Color badgeTextCol = days <= 2 ? AppColors.bgDark : AppColors.goldPrimary;

            return GestureDetector(
              onTap: () {
                analytics.trackFestivalView(festivalTitle: f.event.title);
              },
              child: Container(
                margin: const EdgeInsets.only(bottom: 10),
                padding: const EdgeInsets.all(12),
                decoration: BoxDecoration(
                  color: AppColors.bgDark.withValues(alpha: 0.7),
                  borderRadius: BorderRadius.circular(14),
                  border: Border.all(color: AppColors.borderSubtle.withValues(alpha: 0.6)),
                ),
                child: Row(
                  children: [
                    Container(
                      width: 44,
                      height: 44,
                      decoration: BoxDecoration(
                        color: AppColors.bgCard,
                        borderRadius: BorderRadius.circular(12),
                        border: Border.all(color: AppColors.goldPrimary.withValues(alpha: 0.3)),
                      ),
                      child: Column(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          Text(
                            '${f.hijriDay}',
                            style: const TextStyle(fontSize: 15, fontWeight: FontWeight.w900, color: AppColors.goldLight),
                          ),
                          Text(
                            f.hijriMonthName.substring(0, 3).toUpperCase(),
                            style: const TextStyle(fontSize: 9, fontWeight: FontWeight.bold, color: AppColors.emeraldSubtle),
                          ),
                        ],
                      ),
                    ),
                    const SizedBox(width: 12),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: [
                              Expanded(
                                child: Text(
                                  f.event.title,
                                  style: const TextStyle(fontSize: 13, fontWeight: FontWeight.w800, color: AppColors.textWhite),
                                ),
                              ),
                              Container(
                                padding: const EdgeInsets.symmetric(horizontal: 7, vertical: 2),
                                decoration: BoxDecoration(
                                  color: badgeBg,
                                  borderRadius: BorderRadius.circular(8),
                                ),
                                child: Text(
                                  badgeText,
                                  style: TextStyle(fontSize: 9, fontWeight: FontWeight.w900, color: badgeTextCol),
                                ),
                              ),
                            ],
                          ),
                          const SizedBox(height: 2),
                          Text(
                            f.event.titleAr,
                            style: const TextStyle(fontSize: 11, fontWeight: FontWeight.w700, color: AppColors.goldLight),
                          ),
                          const SizedBox(height: 3),
                          Text(
                            f.event.recommendedActions,
                            maxLines: 1,
                            overflow: TextOverflow.ellipsis,
                            style: const TextStyle(fontSize: 10, color: AppColors.emeraldSubtle),
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
              ),
            );
          }),
        ],
      ),
    );
  }
}

class _FestivalCountdownItem {
  final IslamicEventItem event;
  final double daysRemaining;
  final int hijriDay;
  final String hijriMonthName;

  _FestivalCountdownItem({
    required this.event,
    required this.daysRemaining,
    required this.hijriDay,
    required this.hijriMonthName,
  });
}


