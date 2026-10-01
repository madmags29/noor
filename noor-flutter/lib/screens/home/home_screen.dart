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
    _timer = Timer.periodic(const Duration(seconds: 1), (_) {
      if (mounted) {
        final loc = ref.read(locationProvider).value?.city ?? kWorldCities.first;
        final prayers = _getPrayers(loc);
        setState(() {
          _secondsLeft = _secondsLeft > 0
              ? _secondsLeft - 1
              : PrayerCalculationService.getSecondsToNextPrayer(prayers);
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
      return '${h.formatted} (Local sighting ±1d)';
    } catch (_) {
      return '17 Rabi al-Thani 1448 AH (Local sighting ±1d)';
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

  @override
  Widget build(BuildContext context) {
    final t = AppLocalizations.of(context)!;
    final langState = ref.watch(languageProvider).value;
    final locState = ref.watch(locationProvider).value;
    final currentCity = locState?.city ?? kWorldCities.first;
    final prayers = _getPrayers(currentCity);
    final nextPrayer = _getNextPrayer(prayers);

    return SafeArea(
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
                _buildDateBar(context, t),
                const SizedBox(height: 16),
                _buildHeroCard(context, t, currentCity, prayers, nextPrayer),
                const SizedBox(height: 16),
                _buildVerseOfDayHeader(context, t),
                const SizedBox(height: 8),
                _buildAyahCard(context, t, langState),
                const SizedBox(height: 16),
                _buildSectionHeading(t.dailyHadith),
                const SizedBox(height: 8),
                _buildHadithCard(context, t),
                const SizedBox(height: 16),
                _buildSectionHeading(t.quickEssentials),
                const SizedBox(height: 12),
                _buildQuickGrid(context, t),
              ],
            ),
          ),

          // Floating AI Button
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
    );
  }

  // ── Header ─────────────────────────────────────────────────
  Widget _buildHeader(BuildContext context, AppLocalizations t) {
    final langState = ref.watch(languageProvider).value;

    return Row(
      children: [
        GestureDetector(
          onTap: () => setState(() => _showMenuModal = true),
          child: const MuslimLogo(size: 34, showText: true, compactText: true),
        ),
        const Spacer(),
        // Language pill
        GestureDetector(
          onTap: () => setState(() => _showLanguageModal = true),
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
                onTap: () => setState(() => _showAuthModal = true),
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
              onTap: () => setState(() => _showAuthModal = true),
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
          onTap: () => setState(() => _showMenuModal = true),
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
            onTap: () => setState(() => _showSearchModal = true),
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
          onTap: () => setState(() => _showLocationModal = true),
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
                const SizedBox(width: 6),
                const Icon(Icons.my_location, size: 14, color: AppColors.goldPrimary),
                const SizedBox(width: 5),
                ConstrainedBox(
                  constraints: const BoxConstraints(maxWidth: 100),
                  child: Text(
                    currentCity.city,
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
            onTap: () => context.push('/calendar'),
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
                    onTap: () => setState(() => _showAdhanModal = true),
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
                  onTap: () => setState(() => _showAdhanModal = true),
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
                  onTap: () => context.go('/prayer'),
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
                onTap: () => setState(() => _showQiblaModal = true),
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
        onTap: onTap,
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
                onTap: () => setState(() => _isDailyAyahPlaying = !_isDailyAyahPlaying),
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
                onTap: () => context.go('/quran'),
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
    return Container(
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
    );
  }
}
