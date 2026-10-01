// ============================================================
// NOOR — Prayer Screen (Flutter)
// Complete Astronomical Timetable, Method Selector, Qada Logger
// ============================================================

import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../theme/app_theme.dart';
import '../../l10n/app_localizations.dart';
import '../../widgets/location_picker_modal.dart';
import '../../widgets/floating_ai_button.dart';
import '../../widgets/ai_assistant_modal.dart';
import '../../widgets/adhan_voice_modal.dart';
import '../../widgets/menu_drawer.dart';
import '../../widgets/qibla_modal.dart';
import '../../widgets/language_modal.dart';
import '../../widgets/auth_modal.dart';
import '../../widgets/search_modal.dart';
import '../../providers/auth_provider.dart';
import '../../services/prayer_service.dart';
import '../../services/location_service.dart';
import '../../providers/location_provider.dart';

const List<Map<String, dynamic>> _kPrayerMethods = [
  {
    'id': 'MWL',
    'name': 'Muslim World League (MWL)',
    'desc': 'Fajr 18.0° • Isha 17.0°'
  },
  {
    'id': 'ISNA',
    'name': 'Islamic Society of North America (ISNA)',
    'desc': 'Fajr 15.0° • Isha 15.0°'
  },
  {
    'id': 'Makkah',
    'name': 'Umm al-Qura University, Makkah',
    'desc': 'Fajr 18.5° • Isha 90 min after Maghrib'
  },
  {
    'id': 'Karachi',
    'name': 'University of Islamic Sciences, Karachi',
    'desc': 'Fajr 18.0° • Isha 18.0°'
  },
  {
    'id': 'Egypt',
    'name': 'Egyptian General Authority of Survey',
    'desc': 'Fajr 19.5° • Isha 17.5°'
  },
];

class PrayerScreen extends ConsumerStatefulWidget {
  const PrayerScreen({super.key});

  @override
  ConsumerState<PrayerScreen> createState() => _PrayerScreenState();
}

class _PrayerScreenState extends ConsumerState<PrayerScreen> {
  bool _showLocationModal = false;
  bool _showMethodModal = false;
  bool _showAiModal = false;
  bool _showAdhanModal = false;
  bool _showMenuModal = false;
  bool _showQiblaModal = false;
  bool _showLanguageModal = false;
  bool _showAuthModal = false;
  bool _showSearchModal = false;
  int _selectedMethodIndex = 0;
  AdhanVoice _activeAdhan = kAdhanVoices[0];

  // Qada tracker
  final Map<String, int> _qadaCounts = {
    'Fajr': 0,
    'Dhuhr': 0,
    'Asr': 0,
    'Maghrib': 0,
    'Isha': 0,
  };

  void _updateQada(String name, int delta) {
    setState(() {
      _qadaCounts[name] = (_qadaCounts[name]! + delta).clamp(0, 9999);
    });
  }

  List<PrayerItem> _getPrayers(MobileCity city) {
    final methodKey = _kPrayerMethods[_selectedMethodIndex]['id'] as String;
    return PrayerCalculationService.calculatePrayers(
      lat: city.lat,
      lng: city.lng,
      customTimezone: city.utcOffset,
      methodKey: methodKey,
    );
  }

  @override
  Widget build(BuildContext context) {
    final t = AppLocalizations.of(context)!;
    final locState = ref.watch(locationProvider).value;
    final currentCity = locState?.city ?? kWorldCities.first;
    final prayers = _getPrayers(currentCity);
    final nextPrayer = prayers.firstWhere((p) => p.isNext, orElse: () => prayers.first);

    return SafeArea(
      child: Stack(
        children: [
          SingleChildScrollView(
            padding: const EdgeInsets.fromLTRB(18, 14, 18, 90),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                _buildHeader(context, t, currentCity),
                const SizedBox(height: 16),
                _buildNextPrayerCard(context, t, nextPrayer),
                const SizedBox(height: 16),
                _buildMethodCard(context, t),
                const SizedBox(height: 16),
                Text(t.dailyPrayerTimes, style: _sectionTitleStyle),
                const SizedBox(height: 8),
                _buildPrayersList(context, t, prayers),
                const SizedBox(height: 16),
                Text(t.qadaTracker, style: _sectionTitleStyle),
                const SizedBox(height: 8),
                _buildQadaCard(context, t),
              ],
            ),
          ),
          Positioned(
            bottom: 16,
            right: 16,
            child: FloatingAiButton(
              onPressed: () => setState(() => _showAiModal = true),
            ),
          ),
          if (_showLocationModal)
            LocationPickerModal(
              currentCity: currentCity,
              onSelectCity: (c) {
                ref.read(locationProvider.notifier).setCity(c);
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
            AiAssistantModal(onClose: () => setState(() => _showAiModal = false)),
          if (_showAuthModal)
            AuthModal(onClose: () => setState(() => _showAuthModal = false)),
          if (_showAdhanModal)
            AdhanVoiceModal(
              activeAdhanId: _activeAdhan.id,
              onSelectAdhan: (a) => setState(() {
                _activeAdhan = a;
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
          if (_showMethodModal) _buildMethodModal(context, t),
        ],
      ),
    );
  }

  TextStyle get _sectionTitleStyle => const TextStyle(
        fontSize: 15,
        fontWeight: FontWeight.w800,
        color: AppColors.textWhite,
        letterSpacing: 0.3,
      );

  Widget _buildHeader(
    BuildContext context,
    AppLocalizations t,
    MobileCity currentCity,
  ) {
    return Row(
      children: [
        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                t.dailyPrayerTimes,
                style: const TextStyle(
                  fontSize: 22,
                  fontWeight: FontWeight.w900,
                  color: AppColors.textWhite,
                ),
              ),
              Text(
                '${t.precisionCalculationFor} ${currentCity.city}',
                style: const TextStyle(
                  fontSize: 11,
                  color: AppColors.emeraldSubtle,
                  height: 1.4,
                ),
                overflow: TextOverflow.ellipsis,
              ),
            ],
          ),
        ),
        GestureDetector(
          onTap: () => setState(() => _showLocationModal = true),
          child: Container(
            padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 7),
            decoration: BoxDecoration(
              color: AppColors.bgCard,
              borderRadius: BorderRadius.circular(20),
              border: Border.all(color: AppColors.borderSubtle),
            ),
            child: Row(
              mainAxisSize: MainAxisSize.min,
              children: [
                const Icon(Icons.location_on, size: 13, color: AppColors.goldPrimary),
                const SizedBox(width: 5),
                Text(
                  currentCity.city,
                  style: const TextStyle(
                    fontSize: 12,
                    fontWeight: FontWeight.w700,
                    color: AppColors.textWhite,
                  ),
                ),
                const SizedBox(width: 3),
                const Icon(Icons.keyboard_arrow_down, size: 11, color: AppColors.emeraldSubtle),
              ],
            ),
          ),
        ),
        const SizedBox(width: 5),
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
                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 6),
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
        const SizedBox(width: 5),
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

  Widget _buildNextPrayerCard(
    BuildContext context,
    AppLocalizations t,
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
            color: Color(0x33F59E0B),
            offset: Offset(0, 4),
            blurRadius: 10,
          )
        ],
      ),
      child: Column(
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    t.nextPrayer.toUpperCase(),
                    style: const TextStyle(
                      fontSize: 10,
                      fontWeight: FontWeight.w800,
                      color: AppColors.goldPrimary,
                      letterSpacing: 1,
                    ),
                  ),
                  const SizedBox(height: 2),
                  Text(
                    '${nextPrayer.name} • ${nextPrayer.arabic}',
                    style: const TextStyle(
                      fontSize: 22,
                      fontWeight: FontWeight.w900,
                      color: AppColors.textWhite,
                    ),
                  ),
                ],
              ),
              Text(
                nextPrayer.time,
                style: const TextStyle(
                  fontSize: 24,
                  fontWeight: FontWeight.w900,
                  color: AppColors.goldLight,
                ),
              ),
            ],
          ),
          const SizedBox(height: 14),
          GestureDetector(
            onTap: () => setState(() => _showAdhanModal = true),
            child: Container(
              padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 12),
              decoration: BoxDecoration(
                color: const Color(0x1FF59E0B),
                borderRadius: BorderRadius.circular(16),
                border: Border.all(color: AppColors.goldBorder),
              ),
              child: Row(
                children: [
                  const Icon(Icons.volume_up, size: 20, color: AppColors.goldPrimary),
                  const SizedBox(width: 8),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          '${t.adhanVoice}: ${_activeAdhan.name}',
                          style: const TextStyle(
                            fontSize: 12,
                            fontWeight: FontWeight.w800,
                            color: AppColors.goldPrimary,
                          ),
                        ),
                        Text(
                          '${_activeAdhan.city} • ${t.listenAdhan}',
                          style: const TextStyle(
                            color: Color(0xB36EE7B7),
                            fontSize: 10,
                          ),
                        ),
                      ],
                    ),
                  ),
                  const Icon(
                    Icons.play_circle_fill,
                    size: 20,
                    color: AppColors.goldPrimary,
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildMethodCard(BuildContext context, AppLocalizations t) {
    final method = _kPrayerMethods[_selectedMethodIndex];
    return GestureDetector(
      onTap: () => setState(() => _showMethodModal = true),
      child: Container(
        padding: const EdgeInsets.all(14),
        decoration: BoxDecoration(
          color: AppColors.bgCard,
          borderRadius: BorderRadius.circular(18),
          border: Border.all(color: AppColors.borderSubtle),
        ),
        child: Row(
          children: [
            const Icon(Icons.explore_outlined, size: 18, color: AppColors.goldPrimary),
            const SizedBox(width: 10),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    t.calculationMethod,
                    style: const TextStyle(
                      fontSize: 9,
                      fontWeight: FontWeight.w800,
                      color: AppColors.goldPrimary,
                      letterSpacing: 0.8,
                    ),
                  ),
                  Text(
                    method['name'],
                    style: const TextStyle(
                      fontSize: 13,
                      fontWeight: FontWeight.w700,
                      color: AppColors.textWhite,
                      height: 1.3,
                    ),
                  ),
                  Text(
                    method['desc'],
                    style: const TextStyle(
                      fontSize: 10,
                      color: AppColors.emeraldSubtle,
                    ),
                  ),
                ],
              ),
            ),
            const Icon(Icons.chevron_right, size: 18, color: AppColors.emeraldSubtle),
          ],
        ),
      ),
    );
  }

  Widget _buildPrayersList(
    BuildContext context,
    AppLocalizations t,
    List<PrayerItem> prayers,
  ) {
    return Column(
      children: prayers.map((p) {
        return Container(
          margin: const EdgeInsets.only(bottom: 8),
          padding: const EdgeInsets.all(14),
          decoration: BoxDecoration(
            color: p.isNext ? const Color(0x1AF59E0B) : AppColors.bgCard,
            borderRadius: BorderRadius.circular(18),
            border: Border.all(
              color: p.isNext ? AppColors.goldBorder : AppColors.borderSubtle,
            ),
          ),
          child: Row(
            children: [
              Container(
                width: 34,
                height: 34,
                decoration: BoxDecoration(
                  color: p.isNext
                      ? AppColors.goldPrimary
                      : const Color(0x0DFFFFFF),
                  borderRadius: BorderRadius.circular(17),
                ),
                child: Icon(
                  Icons.access_time,
                  size: 16,
                  color: p.isNext ? AppColors.textDark : AppColors.goldPrimary,
                ),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      children: [
                        Text(
                          p.name,
                          style: TextStyle(
                            fontSize: 15,
                            fontWeight: FontWeight.w800,
                            color: p.isNext
                                ? AppColors.goldLight
                                : AppColors.textWhite,
                          ),
                        ),
                        if (p.isNext) ...[
                          const SizedBox(width: 6),
                          Container(
                            padding: const EdgeInsets.symmetric(
                              horizontal: 6,
                              vertical: 2,
                            ),
                            decoration: BoxDecoration(
                              color: AppColors.goldPrimary,
                              borderRadius: BorderRadius.circular(6),
                            ),
                            child: Text(
                              t.currentBadge,
                              style: const TextStyle(
                                fontSize: 9,
                                fontWeight: FontWeight.w900,
                                color: AppColors.textDark,
                              ),
                            ),
                          ),
                        ],
                      ],
                    ),
                    Text(
                      p.desc,
                      style: const TextStyle(
                        fontSize: 10,
                        color: AppColors.emeraldSubtle,
                        height: 1.3,
                      ),
                    ),
                  ],
                ),
              ),
              Column(
                crossAxisAlignment: CrossAxisAlignment.end,
                children: [
                  Text(
                    p.time,
                    style: TextStyle(
                      fontSize: 16,
                      fontWeight:
                          p.isNext ? FontWeight.w900 : FontWeight.w800,
                      color:
                          p.isNext ? AppColors.goldLight : AppColors.textWhite,
                      fontFamily: 'monospace',
                    ),
                  ),
                  Text(
                    p.arabic,
                    style: const TextStyle(
                      fontSize: 12,
                      color: AppColors.emeraldSubtle,
                      height: 1.3,
                    ),
                  ),
                ],
              ),
            ],
          ),
        );
      }).toList(),
    );
  }

  Widget _buildQadaCard(BuildContext context, AppLocalizations t) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: AppColors.bgCard,
        borderRadius: BorderRadius.circular(20),
        border: Border.all(color: AppColors.borderSubtle),
      ),
      child: Column(
        children: [
          Text(
            t.logMissedPrayers,
            style: const TextStyle(
              fontSize: 11,
              color: AppColors.emeraldSubtle,
              height: 1.45,
            ),
          ),
          const SizedBox(height: 12),
          ..._qadaCounts.keys.map((name) {
            return Column(
              children: [
                Padding(
                  padding: const EdgeInsets.symmetric(vertical: 6),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text(
                        name,
                        style: const TextStyle(
                          fontSize: 14,
                          fontWeight: FontWeight.w700,
                          color: AppColors.textWhite,
                        ),
                      ),
                      Row(
                        children: [
                          GestureDetector(
                            onTap: () => _updateQada(name, -1),
                            child: Container(
                              width: 32,
                              height: 32,
                              decoration: BoxDecoration(
                                color: const Color(0x14FFFFFF),
                                borderRadius: BorderRadius.circular(16),
                              ),
                              child: const Icon(
                                Icons.remove,
                                size: 16,
                                color: AppColors.textWhite,
                              ),
                            ),
                          ),
                          const SizedBox(width: 12),
                          Text(
                            '${_qadaCounts[name]}',
                            style: const TextStyle(
                              fontSize: 16,
                              fontWeight: FontWeight.w800,
                              color: AppColors.textWhite,
                              fontFamily: 'monospace',
                            ),
                          ),
                          const SizedBox(width: 12),
                          GestureDetector(
                            onTap: () => _updateQada(name, 1),
                            child: Container(
                              width: 32,
                              height: 32,
                              decoration: BoxDecoration(
                                color: const Color(0x14FFFFFF),
                                borderRadius: BorderRadius.circular(16),
                              ),
                              child: const Icon(
                                Icons.add,
                                size: 16,
                                color: AppColors.goldPrimary,
                              ),
                            ),
                          ),
                        ],
                      ),
                    ],
                  ),
                ),
                const Divider(color: Color(0x0DFFFFFF), height: 1),
              ],
            );
          }),
        ],
      ),
    );
  }

  Widget _buildMethodModal(BuildContext context, AppLocalizations t) {
    return GestureDetector(
      onTap: () => setState(() => _showMethodModal = false),
      child: Container(
        color: const Color(0xBF000000),
        child: Center(
          child: GestureDetector(
            onTap: () {},
            child: Container(
              margin: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: AppColors.bgCard,
                borderRadius: BorderRadius.circular(24),
                border: Border.all(color: AppColors.borderSubtle),
              ),
              child: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  Padding(
                    padding: const EdgeInsets.all(16),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        const Text(
                          'Select Calculation Method',
                          style: TextStyle(
                            fontSize: 16,
                            fontWeight: FontWeight.w800,
                            color: AppColors.textWhite,
                          ),
                        ),
                        GestureDetector(
                          onTap: () => setState(() => _showMethodModal = false),
                          child: const Icon(
                            Icons.close,
                            size: 20,
                            color: AppColors.textMuted,
                          ),
                        ),
                      ],
                    ),
                  ),
                  const Divider(color: AppColors.divider, height: 1),
                  ConstrainedBox(
                    constraints: const BoxConstraints(maxHeight: 320),
                    child: ListView.separated(
                      padding: const EdgeInsets.all(14),
                      shrinkWrap: true,
                      itemCount: _kPrayerMethods.length,
                      separatorBuilder: (_, __) => const SizedBox(height: 8),
                      itemBuilder: (_, i) {
                        final m = _kPrayerMethods[i];
                        final isSelected = i == _selectedMethodIndex;
                        return GestureDetector(
                          onTap: () => setState(() {
                            _selectedMethodIndex = i;
                            _showMethodModal = false;
                          }),
                          child: Container(
                            padding: const EdgeInsets.all(14),
                            decoration: BoxDecoration(
                              color: isSelected
                                  ? const Color(0x26F59E0B)
                                  : const Color(0x08FFFFFF),
                              borderRadius: BorderRadius.circular(16),
                              border: Border.all(
                                color: isSelected
                                    ? AppColors.goldBorder
                                    : const Color(0x0FFFFFFF),
                              ),
                            ),
                            child: Row(
                              children: [
                                Expanded(
                                  child: Column(
                                    crossAxisAlignment:
                                        CrossAxisAlignment.start,
                                    children: [
                                      Text(
                                        m['name'],
                                        style: TextStyle(
                                          fontSize: 14,
                                          fontWeight: FontWeight.w700,
                                          color: isSelected
                                              ? AppColors.goldPrimary
                                              : AppColors.textWhite,
                                        ),
                                      ),
                                      Text(
                                        m['desc'],
                                        style: const TextStyle(
                                          fontSize: 11,
                                          color: AppColors.emeraldSubtle,
                                          height: 1.3,
                                        ),
                                      ),
                                    ],
                                  ),
                                ),
                                if (isSelected)
                                  const Icon(
                                    Icons.check_circle,
                                    size: 20,
                                    color: AppColors.goldPrimary,
                                  ),
                              ],
                            ),
                          ),
                        );
                      },
                    ),
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}
