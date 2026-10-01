// ============================================================
// NOOR — Design Tokens & Theme Engine (Flutter)
// Exact port of noor-mobile/src/theme.ts
// ============================================================

import 'package:flutter/material.dart';

abstract class AppColors {
  // Deep Emerald Obsidian Backgrounds
  static const bgDarkest = Color(0xFF010D09);
  static const bgDark = Color(0xFF02120D);
  static const bgDefault = Color(0xFF031712);
  static const bgCard = Color(0xFF04231B);
  static const bgCardHover = Color(0xFF063327);
  static const bgSurfaceGlass = Color(0xD904231B); // 85% opacity
  static const bgModalGlass = Color(0xF502120D); // 96% opacity

  // Gold / Amber Luxury Accents
  static const goldPrimary = Color(0xFFF59E0B);
  static const goldLight = Color(0xFFFBBF24);
  static const goldDark = Color(0xFFD97706);
  static const goldMuted = Color(0x33F59E0B); // 20% opacity
  static const goldBorder = Color(0x59F59E0B); // 35% opacity
  static const goldGlow = Color(0x80F59E0B); // 50% opacity

  // Emerald & Sage Highlights
  static const emeraldPrimary = Color(0xFF10B981);
  static const emeraldLight = Color(0xFF34D399);
  static const emeraldSubtle = Color(0xFF6EE7B7);
  static const emeraldMuted = Color(0x2610B981); // 15% opacity
  static const emeraldBorder = Color(0x3334D399); // 20% opacity

  // Text Colors
  static const textWhite = Colors.white;
  static const textCream = Color(0xFFFEF3C7);
  static const textMuted = Color(0xFFA7F3D0);
  static const textSubtle = Color(0xFF6EE7B7);
  static const textDark = Color(0xFF02120D);

  // Functional & Borders
  static const borderGlass = Color(0x1AFFFFFF); // 10% white
  static const borderSubtle = Color(0x2634D399); // 15% emerald
  static const divider = Color(0x14FFFFFF); // 8% white
}

abstract class AppSpacing {
  static const xs = 4.0;
  static const sm = 8.0;
  static const md = 16.0;
  static const lg = 20.0;
  static const xl = 24.0;
  static const xxl = 32.0;
}

abstract class AppRadius {
  static const sm = Radius.circular(8);
  static const md = Radius.circular(14);
  static const lg = Radius.circular(20);
  static const xl = Radius.circular(28);
  static const full = Radius.circular(9999);
}

class AppTheme {
  static ThemeData get dark => ThemeData(
        useMaterial3: true,
        brightness: Brightness.dark,
        colorScheme: const ColorScheme.dark(
          primary: AppColors.goldPrimary,
          secondary: AppColors.emeraldPrimary,
          surface: AppColors.bgCard,
          onSurface: AppColors.textWhite,
          onPrimary: AppColors.textDark,
        ),
        scaffoldBackgroundColor: AppColors.bgDark,
        cardColor: AppColors.bgCard,
        dividerColor: AppColors.divider,
        textTheme: const TextTheme(
          headlineLarge: TextStyle(
            color: AppColors.textWhite,
            fontWeight: FontWeight.w900,
            fontSize: 28,
            letterSpacing: 0.5,
          ),
          headlineMedium: TextStyle(
            color: AppColors.textWhite,
            fontWeight: FontWeight.w800,
            fontSize: 22,
          ),
          headlineSmall: TextStyle(
            color: AppColors.textWhite,
            fontWeight: FontWeight.w700,
            fontSize: 18,
          ),
          titleLarge: TextStyle(
            color: AppColors.textWhite,
            fontWeight: FontWeight.w800,
            fontSize: 16,
          ),
          titleMedium: TextStyle(
            color: AppColors.textWhite,
            fontWeight: FontWeight.w700,
            fontSize: 14,
          ),
          bodyLarge: TextStyle(
            color: AppColors.textMuted,
            fontSize: 15,
          ),
          bodyMedium: TextStyle(
            color: AppColors.textMuted,
            fontSize: 13,
          ),
          bodySmall: TextStyle(
            color: AppColors.textSubtle,
            fontSize: 11,
          ),
          labelSmall: TextStyle(
            color: AppColors.goldPrimary,
            fontWeight: FontWeight.w900,
            fontSize: 9,
            letterSpacing: 0.8,
          ),
        ),
        bottomNavigationBarTheme: const BottomNavigationBarThemeData(
          backgroundColor: AppColors.bgDarkest,
          selectedItemColor: AppColors.goldPrimary,
          unselectedItemColor: AppColors.emeraldSubtle,
          selectedLabelStyle: TextStyle(
            fontSize: 11,
            fontWeight: FontWeight.w700,
            letterSpacing: 0.2,
          ),
          unselectedLabelStyle: TextStyle(
            fontSize: 11,
            fontWeight: FontWeight.w700,
          ),
          elevation: 10,
          type: BottomNavigationBarType.fixed,
        ),
        appBarTheme: const AppBarTheme(
          backgroundColor: AppColors.bgDark,
          elevation: 0,
          centerTitle: false,
        ),
        textSelectionTheme: const TextSelectionThemeData(
          cursorColor: AppColors.goldPrimary,
          selectionColor: Color(0x66F59E0B),
          selectionHandleColor: AppColors.goldPrimary,
        ),
        inputDecorationTheme: InputDecorationTheme(
          filled: true,
          fillColor: const Color(0xFF032219),
          contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
          prefixIconColor: AppColors.goldPrimary,
          suffixIconColor: AppColors.emeraldSubtle,
          border: OutlineInputBorder(
            borderRadius: BorderRadius.circular(16),
            borderSide: const BorderSide(color: Color(0x3334D399)),
          ),
          enabledBorder: OutlineInputBorder(
            borderRadius: BorderRadius.circular(16),
            borderSide: const BorderSide(color: Color(0x3334D399)),
          ),
          focusedBorder: OutlineInputBorder(
            borderRadius: BorderRadius.circular(16),
            borderSide: const BorderSide(color: AppColors.goldPrimary, width: 1.5),
          ),
          errorBorder: OutlineInputBorder(
            borderRadius: BorderRadius.circular(16),
            borderSide: const BorderSide(color: Color(0xFFEF4444), width: 1.5),
          ),
          hintStyle: const TextStyle(color: Color(0xFF6EE7B7), fontSize: 13),
          labelStyle: const TextStyle(color: Color(0xFF6EE7B7), fontSize: 13),
        ),
      );
}
