// ============================================================
// NOOR — Privacy Policy Screen (Flutter)
// ============================================================

import 'package:flutter/material.dart';
import '../../theme/app_theme.dart';
import '../../l10n/app_localizations.dart';

class PrivacyScreen extends StatelessWidget {
  const PrivacyScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final t = AppLocalizations.of(context)!;

    return Scaffold(
      backgroundColor: AppColors.bgDark,
      appBar: AppBar(
        backgroundColor: AppColors.bgDark,
        title: Text(t.privacyPolicy, style: const TextStyle(fontWeight: FontWeight.w900, color: AppColors.textWhite)),
        iconTheme: const IconThemeData(color: AppColors.goldPrimary),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(20),
        child: Container(
          padding: const EdgeInsets.all(20),
          decoration: BoxDecoration(
            color: AppColors.bgCard,
            borderRadius: BorderRadius.circular(20),
            border: Border.all(color: AppColors.borderSubtle),
          ),
          child: const Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                'Noor-e-ilahi Privacy Commitment',
                style: TextStyle(fontSize: 18, fontWeight: FontWeight.w900, color: AppColors.goldPrimary),
              ),
              SizedBox(height: 12),
              Text(
                'Noor-e-ilahi is designed with an uncompromising commitment to user privacy and digital sanctity:\n\n'
                '1. Offline-First Architecture: Prayer times calculations, Quranic text, Duas, and Asma-ul-Husna operate locally on your device without transmitting private usage data to third parties.\n\n'
                '2. Exact Location Usage: Your GPS coordinates are utilized solely on-device to compute high-precision astronomical solar prayer times and Qibla compass bearing. Your location is NEVER sold, shared, or stored on external servers.\n\n'
                '3. No Commercial Ad Networks: Noor-e-ilahi does not utilize invasive commercial ad networks or user tracking trackers.\n\n'
                '4. Academic & Quranic Verification: All Quran and Hadith references are sourced from classical verified manuscripts with complete academic attribution.\n\n'
                'Last updated: October 2026',
                style: TextStyle(fontSize: 13, color: AppColors.textWhite, height: 1.6),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
