// ============================================================
// NOOR — Terms of Service & Islamic Verification Screen (Flutter)
// ============================================================

import 'package:flutter/material.dart';
import '../../theme/app_theme.dart';
import '../../l10n/app_localizations.dart';

class TermsScreen extends StatelessWidget {
  const TermsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final t = AppLocalizations.of(context)!;

    return Scaffold(
      backgroundColor: AppColors.bgDark,
      appBar: AppBar(
        backgroundColor: AppColors.bgDark,
        title: Text(t.termsOfService, style: const TextStyle(fontWeight: FontWeight.w900, color: AppColors.textWhite)),
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
                'Terms of Service & Usage',
                style: TextStyle(fontSize: 18, fontWeight: FontWeight.w900, color: AppColors.goldPrimary),
              ),
              SizedBox(height: 12),
              Text(
                'By downloading and using Noor-e-ilahi, you agree to the following terms:\n\n'
                '1. Sacred Integrity: The Noble Qur\'an text, translations, and authentic supplications provided in this application are preserved for spiritual reflection, learning, and prayer worship.\n\n'
                '2. Prayer Times Disclaimer: Solar prayer times are calculated mathematically according to recognized astronomical standards. Local mosque congregations may observe customized safety margins or visual sightings.\n\n'
                '3. Qibla Compass: Compass direction relies on your device\'s internal magnetometer sensors. Ensure you calibrate device away from metallic interference for highest precision.\n\n'
                '4. Academic Attribution: Quran text is sourced from the Tanzil project; audio feeds are provided by trusted Islamic non-profit repositories.\n\n'
                'For scholarly queries or corrections, please contact support through the in-app Contact form.',
                style: TextStyle(fontSize: 13, color: AppColors.textWhite, height: 1.6),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
