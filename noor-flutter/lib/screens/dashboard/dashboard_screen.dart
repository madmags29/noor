// ============================================================
// NOOR — Spiritual Dashboard & User Profile Screen (Flutter)
// Complete Deen Tracker, Profile Card, Google Auth & Salaah Logger
// Matching noor-web/src/components/DashboardModal.tsx
// ============================================================

import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../../theme/app_theme.dart';
import '../../l10n/app_localizations.dart';
import '../../providers/auth_provider.dart';
import '../../widgets/auth_modal.dart';

class DashboardScreen extends ConsumerStatefulWidget {
  const DashboardScreen({super.key});

  @override
  ConsumerState<DashboardScreen> createState() => _DashboardScreenState();
}

class _DashboardScreenState extends ConsumerState<DashboardScreen> {
  final Map<String, bool> _prayersDone = {
    'Fajr': true,
    'Dhuhr': true,
    'Asr': false,
    'Maghrib': false,
    'Isha': false,
  };

  int _quranPagesToday = 4;
  int _tasbihToday = 132;
  int _streakDays = 7;
  bool _showAuthModal = false;

  @override
  void initState() {
    super.initState();
    _loadTrackerData();
  }

  Future<void> _loadTrackerData() async {
    final prefs = await SharedPreferences.getInstance();
    setState(() {
      for (final p in _prayersDone.keys) {
        _prayersDone[p] = prefs.getBool('@noor_prayer_$p') ?? _prayersDone[p]!;
      }
      _quranPagesToday = prefs.getInt('@noor_quran_pages') ?? 4;
      _tasbihToday = prefs.getInt('@noor_tasbih_count') ?? 132;
      _streakDays = prefs.getInt('@noor_streak_days') ?? 7;
    });
  }

  Future<void> _togglePrayer(String prayer) async {
    final prefs = await SharedPreferences.getInstance();
    setState(() {
      _prayersDone[prayer] = !(_prayersDone[prayer] ?? false);
    });
    await prefs.setBool('@noor_prayer_$prayer', _prayersDone[prayer]!);
  }

  @override
  Widget build(BuildContext context) {
    final t = AppLocalizations.of(context)!;
    final user = ref.watch(authProvider).value;
    final completedPrayers = _prayersDone.values.where((v) => v).length;
    final prayerProgress = completedPrayers / 5.0;

    return Scaffold(
      backgroundColor: AppColors.bgDark,
      appBar: AppBar(
        backgroundColor: AppColors.bgDark,
        title: Text(
          t.dashboard,
          style: const TextStyle(fontWeight: FontWeight.w900, color: AppColors.textWhite),
        ),
        iconTheme: const IconThemeData(color: AppColors.goldPrimary),
      ),
      body: Stack(
        children: [
          SingleChildScrollView(
            padding: const EdgeInsets.all(16),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                // 1. User Profile Card
                _buildUserProfileCard(context, user),
                const SizedBox(height: 16),

                // 2. Spiritual Streak Banner
                _buildStreakBanner(context),
                const SizedBox(height: 16),

                // 3. Today's 5 Prayers Tracker
                _buildPrayersLogger(context, completedPrayers, prayerProgress),
                const SizedBox(height: 16),

                // 4. Quran & Tasbih Goals Grid
                _buildGoalsGrid(context),
                const SizedBox(height: 16),

                // 5. Bookmarked Ayahs & Duas
                _buildBookmarksSection(context),
              ],
            ),
          ),

          if (_showAuthModal)
            AuthModal(
              onClose: () => setState(() => _showAuthModal = false),
            ),
        ],
      ),
    );
  }

  // ── Profile Card ───────────────────────────────────────────
  Widget _buildUserProfileCard(BuildContext context, AuthUser? user) {
    if (user == null) {
      return Container(
        padding: const EdgeInsets.all(18),
        decoration: BoxDecoration(
          gradient: const LinearGradient(
            colors: [Color(0xFF03261C), Color(0xFF021711)],
          ),
          borderRadius: BorderRadius.circular(22),
          border: Border.all(color: const Color(0x3334D399)),
        ),
        child: Row(
          children: [
            Container(
              width: 48,
              height: 48,
              decoration: BoxDecoration(
                color: const Color(0x26F59E0B),
                shape: BoxShape.circle,
                border: Border.all(color: AppColors.goldBorder),
              ),
              child: const Center(
                child: Icon(Icons.person_outline, size: 24, color: AppColors.goldPrimary),
              ),
            ),
            const SizedBox(width: 14),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: const [
                  Text(
                    'Guest Pilgrim',
                    style: TextStyle(
                      fontSize: 15,
                      fontWeight: FontWeight.w800,
                      color: Colors.white,
                    ),
                  ),
                  Text(
                    'Sign in to sync your spiritual progress',
                    style: TextStyle(fontSize: 11, color: Color(0xFF94A3B8)),
                  ),
                ],
              ),
            ),
            GestureDetector(
              onTap: () => setState(() => _showAuthModal = true),
              child: Container(
                padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
                decoration: BoxDecoration(
                  color: AppColors.goldPrimary,
                  borderRadius: BorderRadius.circular(12),
                ),
                child: const Text(
                  'Sign In',
                  style: TextStyle(
                    color: Color(0xFF021711),
                    fontSize: 12,
                    fontWeight: FontWeight.w900,
                  ),
                ),
              ),
            ),
          ],
        ),
      );
    }

    return Container(
      padding: const EdgeInsets.all(18),
      decoration: BoxDecoration(
        gradient: const LinearGradient(
          colors: [Color(0xFF064E3B), Color(0xFF012017)],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
        borderRadius: BorderRadius.circular(24),
        border: Border.all(color: AppColors.goldBorder),
        boxShadow: const [
          BoxShadow(
            color: Color(0x1AF59E0B),
            blurRadius: 16,
            offset: Offset(0, 4),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Container(
                width: 52,
                height: 52,
                decoration: BoxDecoration(
                  color: const Color(0xFF047857),
                  shape: BoxShape.circle,
                  border: Border.all(color: AppColors.goldPrimary, width: 2),
                ),
                child: Center(
                  child: Text(
                    user.name.isNotEmpty ? user.name[0].toUpperCase() : 'N',
                    style: const TextStyle(
                      fontSize: 22,
                      fontWeight: FontWeight.w900,
                      color: AppColors.goldLight,
                    ),
                  ),
                ),
              ),
              const SizedBox(width: 14),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      children: [
                        Flexible(
                          child: Text(
                            user.name,
                            style: const TextStyle(
                              fontSize: 16,
                              fontWeight: FontWeight.w900,
                              color: Colors.white,
                            ),
                            overflow: TextOverflow.ellipsis,
                          ),
                        ),
                        const SizedBox(width: 6),
                        const Icon(Icons.verified, size: 16, color: AppColors.goldPrimary),
                      ],
                    ),
                    Text(
                      user.email,
                      style: const TextStyle(fontSize: 12, color: Color(0xFF6EE7B7)),
                      overflow: TextOverflow.ellipsis,
                    ),
                  ],
                ),
              ),
              GestureDetector(
                onTap: () async {
                  await ref.read(authProvider.notifier).signOut();
                },
                child: Container(
                  padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
                  decoration: BoxDecoration(
                    color: const Color(0x26EF4444),
                    borderRadius: BorderRadius.circular(10),
                    border: Border.all(color: const Color(0x66EF4444)),
                  ),
                  child: const Text(
                    'Sign Out',
                    style: TextStyle(
                      color: Color(0xFFFCA5A5),
                      fontSize: 11,
                      fontWeight: FontWeight.w800,
                    ),
                  ),
                ),
              ),
            ],
          ),
          const SizedBox(height: 14),
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
            decoration: BoxDecoration(
              color: const Color(0x33000000),
              borderRadius: BorderRadius.circular(12),
              border: Border.all(color: const Color(0x26F59E0B)),
            ),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Row(
                  children: const [
                    Icon(Icons.shield_outlined, size: 14, color: AppColors.goldPrimary),
                    SizedBox(width: 6),
                    Text(
                      'Spiritual Member',
                      style: TextStyle(fontSize: 11, fontWeight: FontWeight.w700, color: AppColors.goldLight),
                    ),
                  ],
                ),
                Text(
                  'Member since ${user.joinedDate}',
                  style: const TextStyle(fontSize: 10, color: Color(0xFF94A3B8)),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  // ── Streak Banner ──────────────────────────────────────────
  Widget _buildStreakBanner(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(18),
      decoration: BoxDecoration(
        gradient: const LinearGradient(
          colors: [Color(0xFF064E3B), Color(0xFF0F172A)],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
        borderRadius: BorderRadius.circular(22),
        border: Border.all(color: AppColors.goldPrimary.withValues(alpha: 0.3)),
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const Text(
                'SPIRITUAL STREAK',
                style: TextStyle(fontSize: 10, color: AppColors.goldPrimary, fontWeight: FontWeight.w800, letterSpacing: 0.8),
              ),
              const SizedBox(height: 4),
              Text(
                '$_streakDays Days Active',
                style: const TextStyle(fontSize: 22, fontWeight: FontWeight.w900, color: AppColors.textWhite),
              ),
              const SizedBox(height: 2),
              const Text(
                'May Allah keep you steadfast in worship!',
                style: TextStyle(fontSize: 11, color: AppColors.goldLight),
              ),
            ],
          ),
          Container(
            width: 50,
            height: 50,
            decoration: BoxDecoration(
              color: AppColors.goldPrimary.withValues(alpha: 0.2),
              shape: BoxShape.circle,
            ),
            child: const Center(
              child: Icon(Icons.local_fire_department, color: AppColors.goldPrimary, size: 28),
            ),
          ),
        ],
      ),
    );
  }

  // ── Daily Prayers Logger ───────────────────────────────────
  Widget _buildPrayersLogger(BuildContext context, int completed, double progress) {
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
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              const Text(
                'Daily Salaah Checklist',
                style: TextStyle(fontSize: 15, fontWeight: FontWeight.w800, color: AppColors.textWhite),
              ),
              Text(
                '$completed / 5 Completed',
                style: const TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: AppColors.goldPrimary),
              ),
            ],
          ),
          const SizedBox(height: 10),
          ClipRRect(
            borderRadius: BorderRadius.circular(3),
            child: LinearProgressIndicator(
              value: progress,
              backgroundColor: Colors.white10,
              valueColor: const AlwaysStoppedAnimation<Color>(AppColors.goldPrimary),
              minHeight: 6,
            ),
          ),
          const SizedBox(height: 16),
          ..._prayersDone.keys.map((prayer) {
            final isDone = _prayersDone[prayer]!;
            return GestureDetector(
              onTap: () => _togglePrayer(prayer),
              child: Container(
                margin: const EdgeInsets.only(bottom: 8),
                padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
                decoration: BoxDecoration(
                  color: isDone ? const Color(0x1A10B981) : const Color(0x0AFFFFFF),
                  borderRadius: BorderRadius.circular(14),
                  border: Border.all(
                    color: isDone ? AppColors.goldPrimary.withValues(alpha: 0.4) : AppColors.borderSubtle,
                  ),
                ),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Row(
                      children: [
                        Icon(
                          isDone ? Icons.check_circle : Icons.radio_button_unchecked,
                          color: isDone ? AppColors.goldPrimary : AppColors.emeraldSubtle,
                          size: 20,
                        ),
                        const SizedBox(width: 12),
                        Text(
                          prayer,
                          style: TextStyle(
                            fontSize: 14,
                            fontWeight: FontWeight.w700,
                            color: isDone ? AppColors.goldLight : Colors.white,
                          ),
                        ),
                      ],
                    ),
                    Text(
                      isDone ? 'Offered' : 'Tap to mark',
                      style: TextStyle(
                        fontSize: 11,
                        color: isDone ? AppColors.goldPrimary : AppColors.emeraldSubtle,
                        fontWeight: isDone ? FontWeight.w700 : FontWeight.w500,
                      ),
                    ),
                  ],
                ),
              ),
            );
          }).toList(),
        ],
      ),
    );
  }

  // ── Goals Grid ─────────────────────────────────────────────
  Widget _buildGoalsGrid(BuildContext context) {
    return Row(
      children: [
        Expanded(
          child: Container(
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              color: AppColors.bgCard,
              borderRadius: BorderRadius.circular(20),
              border: Border.all(color: AppColors.borderSubtle),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Icon(Icons.menu_book, color: Color(0xFF60A5FA), size: 22),
                const SizedBox(height: 8),
                const Text('Daily Quran Goal', style: TextStyle(color: AppColors.emeraldSubtle, fontSize: 11)),
                const SizedBox(height: 2),
                Text('$_quranPagesToday Pages', style: const TextStyle(color: Colors.white, fontSize: 18, fontWeight: FontWeight.w900)),
              ],
            ),
          ),
        ),
        const SizedBox(width: 12),
        Expanded(
          child: Container(
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              color: AppColors.bgCard,
              borderRadius: BorderRadius.circular(20),
              border: Border.all(color: AppColors.borderSubtle),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Icon(Icons.volunteer_activism, color: Color(0xFFF472B6), size: 22),
                const SizedBox(height: 8),
                const Text('Daily Tasbih', style: TextStyle(color: AppColors.emeraldSubtle, fontSize: 11)),
                const SizedBox(height: 2),
                Text('$_tasbihToday Recitations', style: const TextStyle(color: Colors.white, fontSize: 18, fontWeight: FontWeight.w900)),
              ],
            ),
          ),
        ),
      ],
    );
  }

  // ── Bookmarks Section ──────────────────────────────────────
  Widget _buildBookmarksSection(BuildContext context) {
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
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: const [
              Text('Saved Verses & Duas', style: TextStyle(fontSize: 15, fontWeight: FontWeight.w800, color: AppColors.textWhite)),
              Text('2 Bookmarks', style: TextStyle(fontSize: 11, color: AppColors.emeraldSubtle)),
            ],
          ),
          const SizedBox(height: 12),
          Container(
            padding: const EdgeInsets.all(12),
            decoration: BoxDecoration(
              color: const Color(0x0AFFFFFF),
              borderRadius: BorderRadius.circular(14),
              border: Border.all(color: const Color(0x14FFFFFF)),
            ),
            child: Row(
              children: const [
                Icon(Icons.bookmark, size: 16, color: AppColors.goldPrimary),
                SizedBox(width: 10),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text('Surah Al-Baqarah (2:255) • Ayat al-Kursi', style: TextStyle(fontSize: 13, fontWeight: FontWeight.w700, color: Colors.white)),
                      Text('اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ...', style: TextStyle(fontSize: 11, color: AppColors.emeraldSubtle)),
                    ],
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(height: 8),
          Container(
            padding: const EdgeInsets.all(12),
            decoration: BoxDecoration(
              color: const Color(0x0AFFFFFF),
              borderRadius: BorderRadius.circular(14),
              border: Border.all(color: const Color(0x14FFFFFF)),
            ),
            child: Row(
              children: const [
                Icon(Icons.bookmark, size: 16, color: AppColors.goldPrimary),
                SizedBox(width: 10),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text('Morning Adhkar • Praise upon Waking', style: TextStyle(fontSize: 13, fontWeight: FontWeight.w700, color: Colors.white)),
                      Text('Authentic Hisn al-Muslim invocation', style: TextStyle(fontSize: 11, color: AppColors.emeraldSubtle)),
                    ],
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
