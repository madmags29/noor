// ============================================================
// NOOR — Navigation Menu Drawer (Flutter)
// Localized Navigation across all 11 languages with direct routing
// & Integrated Spiritual Account / Google Auth Banner
// ============================================================

import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:url_launcher/url_launcher.dart';
import '../theme/app_theme.dart';
import '../l10n/app_localizations.dart';
import '../widgets/muslim_logo.dart';
import '../providers/auth_provider.dart';

class MenuDrawer extends ConsumerWidget {
  final VoidCallback onClose;
  final VoidCallback onOpenAuth;
  final VoidCallback onOpenAdhan;
  final VoidCallback onOpenQibla;
  final VoidCallback onOpenLocation;
  final VoidCallback onOpenLanguage;
  final VoidCallback? onOpenSearch;

  const MenuDrawer({
    super.key,
    required this.onClose,
    required this.onOpenAuth,
    required this.onOpenAdhan,
    required this.onOpenQibla,
    required this.onOpenLocation,
    required this.onOpenLanguage,
    this.onOpenSearch,
  });

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final size = MediaQuery.of(context).size;
    final t = AppLocalizations.of(context)!;
    final user = ref.watch(authProvider).value;

    return Stack(
      children: [
        // Backdrop overlay
        GestureDetector(
          behavior: HitTestBehavior.opaque,
          onTap: onClose,
          child: Container(
            width: double.infinity,
            height: double.infinity,
            color: Colors.black.withValues(alpha: 0.7),
          ),
        ),

        // Sliding Drawer Panel
        Align(
          alignment: Alignment.centerRight,
          child: Container(
            width: (size.width * 0.85).clamp(280.0, 380.0),
            height: double.infinity,
            decoration: const BoxDecoration(
              color: Color(0xFF021711),
              border: Border(
                left: BorderSide(
                  color: Color(0x3334D399),
                  width: 1,
                ),
              ),
              boxShadow: [
                BoxShadow(
                  color: Colors.black87,
                  blurRadius: 24,
                  spreadRadius: 4,
                ),
              ],
            ),
            child: SafeArea(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  // Top Header
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 18, vertical: 14),
                    decoration: const BoxDecoration(
                      border: Border(
                        bottom: BorderSide(color: Color(0x2234D399), width: 1),
                      ),
                    ),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        const MuslimLogo(size: 32, showText: true, compactText: false),
                        Material(
                          color: Colors.transparent,
                          child: InkWell(
                            borderRadius: BorderRadius.circular(20),
                            onTap: onClose,
                            child: Container(
                              padding: const EdgeInsets.all(6),
                              decoration: BoxDecoration(
                                color: Colors.white.withValues(alpha: 0.08),
                                shape: BoxShape.circle,
                              ),
                              child: const Icon(
                                Icons.close,
                                color: AppColors.textMuted,
                                size: 20,
                              ),
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),

                  // Auth / Spiritual Member Profile Card
                  _buildAuthHeaderCard(context, user),

                  // Scrollable Navigation List
                  Expanded(
                    child: SingleChildScrollView(
                      physics: const BouncingScrollPhysics(),
                      padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          // ── Core Pillars ─────────────────────────────────
                          _sectionHeader(
                            t.t('worshipPillars', 'SACRED PILLARS & ESSENTIALS').toUpperCase(),
                            const Color(0xFFF59E0B),
                          ),
                          _navItem(context, "🕌", Icons.home_outlined, t.home, "/"),
                          _navItem(context, "⏰", Icons.access_time_outlined, t.prayers, "/prayer"),
                          _navItem(context, "📖", Icons.menu_book_outlined, t.quran, "/quran"),
                          _navItem(context, "🕋", Icons.place_outlined, t.ziyarat, "/ziyarat"),
                          _navItem(context, "🤲", Icons.volunteer_activism_outlined, t.duas, "/duas"),
                          _navItem(context, "🌙", Icons.calendar_month_outlined, t.calendar, "/calendar"),
                          _navItem(context, "📊", Icons.bar_chart_outlined, t.dashboard, "/dashboard"),

                          const SizedBox(height: 14),
                          // ── Knowledge & Practice ─────────────────────────
                          _sectionHeader(
                            t.t('explorePillars', 'KNOWLEDGE & ISLAMIC LIFE').toUpperCase(),
                            const Color(0xFF34D399),
                          ),
                          _navItem(context, "✨", Icons.auto_awesome_outlined, t.namesOfAllah, "/names-of-allah"),
                          _navItem(context, "💰", Icons.payments_outlined, t.t('zakatHub', 'Zakat Calculator'), "/zakat"),
                          _navItem(context, "🕋", Icons.navigation_outlined, t.hajjUmrah, "/hajj-umrah"),
                          _navItem(context, "📖", Icons.verified_user_outlined, t.guides, "/guides"),
                          _navItem(context, "🧒", Icons.child_care_outlined, t.t('kids', 'NOOR Kids & Family'), "/kids"),
                          _navItem(context, "🕊️", Icons.wb_twilight_outlined, t.janazah, "/janazah"),
                          _navItem(context, "📜", Icons.menu_book_outlined, t.adab, "/etiquette"),
                          _navItem(context, "💍", Icons.favorite_border, t.nikah, "/nikah"),
                          _navItem(context, "✈️", Icons.flight_takeoff_outlined, t.travel, "/travel"),
                          _navItem(context, "💝", Icons.card_giftcard_outlined, t.giving, "/giving"),

                          const SizedBox(height: 14),
                          // ── Media & Maps ─────────────────────────────────
                          _sectionHeader(
                            t.t('toolsAndMedia', 'MEDIA & PLACES').toUpperCase(),
                            const Color(0xFF60A5FA),
                          ),
                          _navItem(context, "📺", Icons.live_tv_outlined, t.t('watch', 'Sacred Watch 24/7'), "/watch"),
                          _navItem(context, "🖼️", Icons.photo_library_outlined, t.media, "/media"),
                          _navItem(context, "🗺️", Icons.map_outlined, t.map, "/map"),

                          const SizedBox(height: 14),
                          // ── Quick Tools & Settings ───────────────────────
                          _sectionHeader(
                            t.t('spiritualTools', 'TOOLS & ACTIONS').toUpperCase(),
                            const Color(0xFFFBBF24),
                          ),
                          _actionItem("🧭", Icons.explore_outlined, t.qibla, onOpenQibla),
                          _actionItem("🔊", Icons.volume_up_outlined, t.adhanVoice, onOpenAdhan),
                          _actionItem("📍", Icons.location_on_outlined, t.t('selectLocation', 'Change Location'), onOpenLocation),
                          _actionItem("🌐", Icons.language_outlined, t.language, onOpenLanguage),
                          if (onOpenSearch != null)
                            _actionItem("🔍", Icons.search, t.search, onOpenSearch!),

                          const SizedBox(height: 14),
                          // ── App Settings & Info ───────────────────────────
                          _sectionHeader(
                            t.t('profileSettings', 'SETTINGS & SUPPORT').toUpperCase(),
                            const Color(0xFF9CA3AF),
                          ),
                          _actionItem("⭐", Icons.star_outline, t.t('rateUs', 'Rate Us on Play Store'), () async {
                            final uri = Uri.parse("https://play.google.com/store/apps/details?id=com.nooreilahi.app");
                            if (await canLaunchUrl(uri)) {
                              await launchUrl(uri, mode: LaunchMode.externalApplication);
                            }
                          }),
                          _navItem(context, "⚙️", Icons.settings_outlined, t.settings, "/settings"),
                          _navItem(context, "✉️", Icons.email_outlined, t.contact, "/contact"),
                          _navItem(context, "🔒", Icons.security_outlined, t.privacyPolicy, "/privacy"),
                          _navItem(context, "📄", Icons.description_outlined, t.termsOfService, "/terms"),

                          const SizedBox(height: 24),
                        ],
                      ),
                    ),
                  ),

                  // Bottom Version Badge
                  Container(
                    width: double.infinity,
                    padding: const EdgeInsets.symmetric(vertical: 12, horizontal: 16),
                    decoration: const BoxDecoration(
                      border: Border(top: BorderSide(color: Color(0x1AFFFFFF), width: 1)),
                      color: Color(0xFF010E0A),
                    ),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        const Text(
                          "NOOR-E-ILAHI",
                          style: TextStyle(
                            fontSize: 11,
                            fontWeight: FontWeight.w800,
                            color: AppColors.goldPrimary,
                            letterSpacing: 1.0,
                          ),
                        ),
                        Text(
                          "v1.0.0",
                          style: TextStyle(
                            fontSize: 10,
                            color: Colors.white.withValues(alpha: 0.5),
                            fontWeight: FontWeight.w500,
                          ),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),
          ),
        ),
      ],
    );
  }

  Widget _buildAuthHeaderCard(BuildContext context, AuthUser? user) {
    if (user != null) {
      return Container(
        margin: const EdgeInsets.fromLTRB(14, 10, 14, 6),
        padding: const EdgeInsets.all(12),
        decoration: BoxDecoration(
          gradient: const LinearGradient(
            colors: [Color(0xFF064E3B), Color(0xFF022C21)],
          ),
          borderRadius: BorderRadius.circular(16),
          border: Border.all(color: AppColors.goldBorder),
        ),
        child: InkWell(
          onTap: () {
            onClose();
            onOpenAuth();
          },
          child: Row(
            children: [
              Container(
                width: 38,
                height: 38,
                decoration: BoxDecoration(
                  color: AppColors.goldPrimary,
                  shape: BoxShape.circle,
                  border: Border.all(color: AppColors.goldLight, width: 1.5),
                ),
                child: Center(
                  child: Text(
                    user.name.isNotEmpty ? user.name[0].toUpperCase() : 'N',
                    style: const TextStyle(fontSize: 16, fontWeight: FontWeight.w900, color: Color(0xFF021711)),
                  ),
                ),
              ),
              const SizedBox(width: 10),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      user.name,
                      style: const TextStyle(fontSize: 13, fontWeight: FontWeight.w800, color: Colors.white),
                      overflow: TextOverflow.ellipsis,
                    ),
                    const Text(
                      'Spiritual Member • Sync Active',
                      style: TextStyle(fontSize: 10.5, color: Color(0xFF6EE7B7)),
                    ),
                  ],
                ),
              ),
              const Icon(Icons.manage_accounts, color: AppColors.goldPrimary, size: 20),
            ],
          ),
        ),
      );
    }

    return Container(
      margin: const EdgeInsets.fromLTRB(14, 10, 14, 6),
      padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 11),
      decoration: BoxDecoration(
        color: const Color(0x1AF59E0B),
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: const Color(0x40F59E0B)),
      ),
      child: InkWell(
        onTap: () {
          onClose();
          onOpenAuth();
        },
        child: Row(
          children: [
            Container(
              padding: const EdgeInsets.all(7),
              decoration: const BoxDecoration(
                color: Color(0xFF042F24),
                shape: BoxShape.circle,
              ),
              child: const Icon(Icons.person_add_alt_1, size: 16, color: AppColors.goldPrimary),
            ),
            const SizedBox(width: 10),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: const [
                  Text(
                    'Sign In / Register',
                    style: TextStyle(fontSize: 13, fontWeight: FontWeight.w800, color: Colors.white),
                  ),
                  Text(
                    'Sync streaks & spiritual tracking',
                    style: TextStyle(fontSize: 10, color: Color(0xFF94A3B8)),
                  ),
                ],
              ),
            ),
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 5),
              decoration: BoxDecoration(
                color: AppColors.goldPrimary,
                borderRadius: BorderRadius.circular(10),
              ),
              child: const Text(
                'Sign In',
                style: TextStyle(fontSize: 11, fontWeight: FontWeight.w900, color: Color(0xFF021711)),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _sectionHeader(String title, Color accentColor) {
    return Padding(
      padding: const EdgeInsets.only(left: 4, top: 8, bottom: 6),
      child: Text(
        title,
        style: TextStyle(
          fontSize: 10,
          fontWeight: FontWeight.w900,
          color: accentColor,
          letterSpacing: 1.0,
        ),
      ),
    );
  }

  Widget _navItem(BuildContext context, String emoji, IconData icon, String title, String route) {
    return Container(
      margin: const EdgeInsets.symmetric(vertical: 2),
      decoration: BoxDecoration(
        color: const Color(0x0AFFFFFF),
        borderRadius: BorderRadius.circular(12),
      ),
      child: ListTile(
        dense: true,
        contentPadding: const EdgeInsets.symmetric(horizontal: 12, vertical: 0),
        leading: Container(
          width: 32,
          height: 32,
          alignment: Alignment.center,
          decoration: BoxDecoration(
            color: const Color(0x1A34D399),
            borderRadius: BorderRadius.circular(8),
          ),
          child: Text(emoji, style: const TextStyle(fontSize: 15)),
        ),
        title: Text(
          title,
          style: const TextStyle(
            color: Colors.white,
            fontSize: 13,
            fontWeight: FontWeight.w700,
          ),
        ),
        trailing: const Icon(
          Icons.chevron_right,
          color: Color(0x4D34D399),
          size: 16,
        ),
        onTap: () {
          onClose();
          if (route == '/') {
            context.go('/');
          } else if (route == '/prayer' || route == '/quran' || route == '/duas' || route == '/ziyarat') {
            context.go(route);
          } else {
            context.push(route);
          }
        },
      ),
    );
  }

  Widget _actionItem(String emoji, IconData icon, String title, VoidCallback onTap) {
    return Container(
      margin: const EdgeInsets.symmetric(vertical: 2),
      decoration: BoxDecoration(
        color: const Color(0x0AFFFFFF),
        borderRadius: BorderRadius.circular(12),
      ),
      child: ListTile(
        dense: true,
        contentPadding: const EdgeInsets.symmetric(horizontal: 12, vertical: 0),
        leading: Container(
          width: 32,
          height: 32,
          alignment: Alignment.center,
          decoration: BoxDecoration(
            color: const Color(0x1AF59E0B),
            borderRadius: BorderRadius.circular(8),
          ),
          child: Text(emoji, style: const TextStyle(fontSize: 15)),
        ),
        title: Text(
          title,
          style: const TextStyle(
            color: Color(0xFFFDE68A),
            fontSize: 13,
            fontWeight: FontWeight.w700,
          ),
        ),
        trailing: const Icon(
          Icons.arrow_forward_ios,
          color: Color(0x66F59E0B),
          size: 12,
        ),
        onTap: () {
          onClose();
          onTap();
        },
      ),
    );
  }
}