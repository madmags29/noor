// ============================================================
// NOOR — App Router (go_router)
// Exact port of expo-router file structure
// ============================================================

import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../screens/home/home_screen.dart';
import '../screens/prayer/prayer_screen.dart';
import '../screens/quran/quran_screen.dart';
import '../screens/ziyarat/ziyarat_screen.dart';
import '../screens/duas/duas_screen.dart';
import '../screens/settings/settings_screen.dart';
import '../screens/calendar/calendar_screen.dart';
import '../screens/contact/contact_screen.dart';
import '../screens/dashboard/dashboard_screen.dart';
import '../screens/etiquette/etiquette_screen.dart';
import '../screens/giving/giving_screen.dart';
import '../screens/guides/guides_screen.dart';
import '../screens/hajj_umrah/hajj_umrah_screen.dart';
import '../screens/janazah/janazah_screen.dart';
import '../screens/kids/kids_screen.dart';
import '../screens/map/map_screen.dart';
import '../screens/media/media_screen.dart';
import '../screens/names_of_allah/names_of_allah_screen.dart';
import '../screens/nikah/nikah_screen.dart';
import '../screens/privacy/privacy_screen.dart';
import '../screens/search/search_screen.dart';
import '../screens/terms/terms_screen.dart';
import '../screens/travel/travel_screen.dart';
import '../screens/watch/watch_screen.dart';
import '../screens/zakat/zakat_screen.dart';
import '../screens/splash/splash_screen.dart';
import '../widgets/shell/main_shell.dart';

final _rootNavigatorKey = GlobalKey<NavigatorState>();
final _shellNavigatorKey = GlobalKey<NavigatorState>();

final appRouter = GoRouter(
  navigatorKey: _rootNavigatorKey,
  initialLocation: '/splash',
  routes: [
    GoRoute(
      path: '/splash',
      builder: (context, state) => const SplashScreen(),
    ),
    // ── Shell with Bottom Tab Bar ──────────────────────────────
    ShellRoute(
      navigatorKey: _shellNavigatorKey,
      builder: (context, state, child) => MainShell(child: child),
      routes: [
        GoRoute(
          path: '/',
          builder: (context, state) => const HomeScreen(),
        ),
        GoRoute(
          path: '/prayer',
          builder: (context, state) => const PrayerScreen(),
        ),
        GoRoute(
          path: '/quran',
          builder: (context, state) => const QuranScreen(),
        ),
        GoRoute(
          path: '/ziyarat',
          builder: (context, state) => const ZiyaratScreen(),
        ),
        GoRoute(
          path: '/duas',
          builder: (context, state) => const DuasScreen(),
        ),
      ],
    ),

    // ── Stack Screens (no bottom tab) ─────────────────────────
    GoRoute(
      path: '/calendar',
      builder: (context, state) => const CalendarScreen(),
    ),
    GoRoute(
      path: '/contact',
      builder: (context, state) => const ContactScreen(),
    ),
    GoRoute(
      path: '/dashboard',
      builder: (context, state) => const DashboardScreen(),
    ),
    GoRoute(
      path: '/etiquette',
      builder: (context, state) => const EtiquetteScreen(),
    ),
    GoRoute(
      path: '/giving',
      builder: (context, state) => const GivingScreen(),
    ),
    GoRoute(
      path: '/guides',
      builder: (context, state) => const GuidesScreen(),
    ),
    GoRoute(
      path: '/hajj-umrah',
      builder: (context, state) => const HajjUmrahScreen(),
    ),
    GoRoute(
      path: '/janazah',
      builder: (context, state) => const JanazahScreen(),
    ),
    GoRoute(
      path: '/kids',
      builder: (context, state) => const KidsScreen(),
    ),
    GoRoute(
      path: '/map',
      builder: (context, state) => const MapScreen(),
    ),
    GoRoute(
      path: '/media',
      builder: (context, state) => const MediaScreen(),
    ),
    GoRoute(
      path: '/names-of-allah',
      builder: (context, state) => const NamesOfAllahScreen(),
    ),
    GoRoute(
      path: '/nikah',
      builder: (context, state) => const NikahScreen(),
    ),
    GoRoute(
      path: '/privacy',
      builder: (context, state) => const PrivacyScreen(),
    ),
    GoRoute(
      path: '/search',
      builder: (context, state) => const SearchScreen(),
    ),
    GoRoute(
      path: '/settings',
      builder: (context, state) => const SettingsScreen(),
    ),
    GoRoute(
      path: '/terms',
      builder: (context, state) => const TermsScreen(),
    ),
    GoRoute(
      path: '/travel',
      builder: (context, state) => const TravelScreen(),
    ),
    GoRoute(
      path: '/watch',
      builder: (context, state) => const WatchScreen(),
    ),
    GoRoute(
      path: '/zakat',
      builder: (context, state) => const ZakatScreen(),
    ),
  ],
);
