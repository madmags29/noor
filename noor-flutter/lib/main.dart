// ============================================================
// NOOR Flutter — main.dart
// ============================================================

import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_localizations/flutter_localizations.dart';
import 'router/app_router.dart';
import 'theme/app_theme.dart';
import 'services/analytics_service.dart';
import 'l10n/app_localizations.dart';
import 'providers/language_provider.dart';

import 'services/notification_service.dart';
import 'services/crash_reporting_service.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();

  // Initialize Global Crash Sentry & Exception Reporting
  try {
    await crashReportingService.initialize();
  } catch (_) {}

  // Initialize Push Notifications & FCM Engine
  try {
    await notificationService.initialize();
  } catch (_) {}

  // Force portrait orientation (matches expo orientation: "portrait")
  await SystemChrome.setPreferredOrientations([
    DeviceOrientation.portraitUp,
    DeviceOrientation.portraitDown,
  ]);

  // Set system overlay style for dark UI (matches StatusBar style="light")
  SystemChrome.setSystemUIOverlayStyle(const SystemUiOverlayStyle(
    statusBarColor: Colors.transparent,
    statusBarIconBrightness: Brightness.light,
    statusBarBrightness: Brightness.dark,
    systemNavigationBarColor: Color(0xFF010D09),
    systemNavigationBarIconBrightness: Brightness.light,
  ));

  // Initialize analytics (matches analytics.init() in _layout.tsx)
  try {
    await analytics.init();
  } catch (_) {
    // Silently handle analytics init failure
  }

  runApp(
    const ProviderScope(
      child: NoorApp(),
    ),
  );
}

class NoorApp extends ConsumerWidget {
  const NoorApp({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final languageAsync = ref.watch(languageProvider);

    return languageAsync.when(
      loading: () => const MaterialApp(
        debugShowCheckedModeBanner: false,
        home: Scaffold(
          backgroundColor: Color(0xFF02120D),
          body: Center(
            child: CircularProgressIndicator(
              color: Color(0xFFF59E0B),
            ),
          ),
        ),
      ),
      error: (_, __) => const MaterialApp(
        debugShowCheckedModeBanner: false,
        home: Scaffold(
          backgroundColor: Color(0xFF02120D),
        ),
      ),
      data: (langState) => MaterialApp.router(
        debugShowCheckedModeBanner: false,
        title: 'Noor-e-ilahi: Daily Islamic App',
        theme: AppTheme.dark,
        routerConfig: appRouter,

        // Localization (11 languages matching LanguageContext)
        locale: langState.locale,
        supportedLocales: const [
          Locale('en'),
          Locale('hi'),
          Locale('ur'),
          Locale('ar'),
          Locale('bn'),
          Locale('ta'),
          Locale('ml'),
          Locale('mr'),
          Locale('gu'),
          Locale('tr'),
          Locale('id'),
        ],
        localizationsDelegates: const [
          AppLocalizations.delegate,
          GlobalMaterialLocalizations.delegate,
          GlobalWidgetsLocalizations.delegate,
          GlobalCupertinoLocalizations.delegate,
        ],

        // RTL support for Arabic & Urdu
        builder: (context, child) {
          return Directionality(
            textDirection: langState.info.direction,
            child: child ?? const SizedBox.shrink(),
          );
        },
      ),
    );
  }
}
