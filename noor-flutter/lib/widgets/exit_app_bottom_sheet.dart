// ============================================================
// NOOR — Exit App Confirmation Bottom Sheet (Flutter)
// Sunnah Kafarat al-Majlis Farewell & Professional Dialog
// ============================================================

import 'package:flutter/material.dart';
import '../theme/app_theme.dart';
import '../services/analytics_service.dart';

class ExitAppBottomSheet extends StatelessWidget {
  const ExitAppBottomSheet({super.key});

  /// Static helper to trigger the bottom sheet with event tracking
  static Future<bool?> show(BuildContext context) async {
    try {
      analytics.trackAppExitPrompt();
    } catch (_) {}

    final result = await showModalBottomSheet<bool>(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      barrierColor: Colors.black.withValues(alpha: 0.82),
      builder: (ctx) => const ExitAppBottomSheet(),
    );

    try {
      if (result == true) {
        analytics.trackAppExitConfirmed();
      } else {
        analytics.trackAppExitCancelled();
      }
    } catch (_) {}

    return result;
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        color: const Color(0xFF021711),
        borderRadius: const BorderRadius.only(
          topLeft: Radius.circular(28),
          topRight: Radius.circular(28),
        ),
        border: Border.all(
          color: const Color(0x4034D399),
          width: 1.2,
        ),
        boxShadow: const [
          BoxShadow(
            color: Colors.black87,
            blurRadius: 32,
            spreadRadius: 8,
            offset: Offset(0, -6),
          ),
        ],
      ),
      child: SafeArea(
        top: false,
        child: SingleChildScrollView(
          padding: const EdgeInsets.symmetric(horizontal: 22, vertical: 16),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              // Top drag pill
              Container(
                width: 44,
                height: 4.5,
                decoration: BoxDecoration(
                  color: const Color(0x4D34D399),
                  borderRadius: BorderRadius.circular(10),
                ),
              ),
              const SizedBox(height: 18),

              // Professional Sacred Emblem / Icon
              Container(
                width: 72,
                height: 72,
                decoration: BoxDecoration(
                  shape: BoxShape.circle,
                  gradient: const RadialGradient(
                    colors: [
                      Color(0x3310B981),
                      Color(0x0504231B),
                    ],
                  ),
                  border: Border.all(
                    color: AppColors.goldPrimary.withValues(alpha: 0.5),
                    width: 1.5,
                  ),
                  boxShadow: [
                    BoxShadow(
                      color: AppColors.goldPrimary.withValues(alpha: 0.2),
                      blurRadius: 18,
                      spreadRadius: 2,
                    ),
                  ],
                ),
                child: Center(
                  child: Container(
                    width: 52,
                    height: 52,
                    decoration: const BoxDecoration(
                      shape: BoxShape.circle,
                      color: Color(0xFF04291E),
                    ),
                    child: const Icon(
                      Icons.mosque_rounded,
                      color: AppColors.goldPrimary,
                      size: 28,
                    ),
                  ),
                ),
              ),
              const SizedBox(height: 14),

              // Title Header
              const Text(
                'Leaving Noor-e-ilahi?',
                style: TextStyle(
                  color: Colors.white,
                  fontSize: 20,
                  fontWeight: FontWeight.w800,
                  letterSpacing: -0.3,
                ),
              ),
              const SizedBox(height: 4),
              const Text(
                'قبل أن تغادر • Before You Depart',
                style: TextStyle(
                  color: AppColors.emeraldLight,
                  fontSize: 13,
                  fontWeight: FontWeight.w600,
                  letterSpacing: 0.2,
                ),
              ),
              const SizedBox(height: 18),

              // Prophetic Sunnah Kafarat al-Majlis Card
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
                decoration: BoxDecoration(
                  color: const Color(0xFF04231B),
                  borderRadius: BorderRadius.circular(16),
                  border: Border.all(
                    color: const Color(0x3334D399),
                    width: 1,
                  ),
                ),
                child: Column(
                  children: [
                    // Badge Header
                    Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        const Icon(
                          Icons.auto_awesome,
                          color: AppColors.goldLight,
                          size: 14,
                        ),
                        const SizedBox(width: 6),
                        Text(
                          'Sunnah Kafarat al-Majlis (كفارة المجلس)',
                          style: TextStyle(
                            color: AppColors.goldLight.withValues(alpha: 0.95),
                            fontSize: 11.5,
                            fontWeight: FontWeight.w700,
                            letterSpacing: 0.3,
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 10),

                    // Arabic Dua
                    const Text(
                      '« سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ، أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا أَنْتَ، أَسْتَغْفِرُكَ وَأَتُوبُ إِلَيْكَ »',
                      textAlign: TextAlign.center,
                      textDirection: TextDirection.rtl,
                      style: TextStyle(
                        color: Color(0xFFFEF3C7),
                        fontSize: 16,
                        height: 1.7,
                        fontWeight: FontWeight.w700,
                      ),
                    ),
                    const SizedBox(height: 8),

                    // Transliteration
                    const Text(
                      '"Subhanak-Allahumma wa bihamdika, ashhadu alla ilaha illa Anta, astaghfiruka wa atubu ilayk."',
                      textAlign: TextAlign.center,
                      style: TextStyle(
                        color: Color(0xFF94A3B8),
                        fontSize: 11,
                        fontStyle: FontStyle.italic,
                        height: 1.35,
                      ),
                    ),
                    const SizedBox(height: 6),

                    // English Translation
                    const Text(
                      '"Glory be to You, O Allah, and praise. I bear witness that there is no god but You. I seek Your forgiveness and repent to You."',
                      textAlign: TextAlign.center,
                      style: TextStyle(
                        color: Color(0xFFD1FAE5),
                        fontSize: 11.5,
                        height: 1.4,
                      ),
                    ),
                    const SizedBox(height: 6),

                    // Reference
                    Text(
                      '— Sunan at-Tirmidhi 3433 (Sahih)',
                      style: TextStyle(
                        color: Colors.white.withValues(alpha: 0.45),
                        fontSize: 10,
                        fontWeight: FontWeight.w500,
                      ),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 14),

              // Warm Parting Message
              Text(
                'May Allah accept your prayers, recitation, and remembrance today.',
                textAlign: TextAlign.center,
                style: TextStyle(
                  color: Colors.white.withValues(alpha: 0.7),
                  fontSize: 12,
                  height: 1.4,
                ),
              ),
              const SizedBox(height: 20),

              // Action Buttons Row / Column
              // Primary Button: Stay & Continue Dhikr
              SizedBox(
                width: double.infinity,
                height: 48,
                child: Container(
                  decoration: BoxDecoration(
                    gradient: const LinearGradient(
                      colors: [
                        Color(0xFF059669),
                        Color(0xFF10B981),
                      ],
                    ),
                    borderRadius: BorderRadius.circular(14),
                    boxShadow: [
                      BoxShadow(
                        color: const Color(0xFF10B981).withValues(alpha: 0.35),
                        blurRadius: 12,
                        offset: const Offset(0, 3),
                      ),
                    ],
                  ),
                  child: ElevatedButton(
                    onPressed: () => Navigator.of(context).pop(false),
                    style: ElevatedButton.styleFrom(
                      backgroundColor: Colors.transparent,
                      shadowColor: Colors.transparent,
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(14),
                      ),
                    ),
                    child: const Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Icon(Icons.favorite_rounded, color: Colors.white, size: 18),
                        SizedBox(width: 8),
                        Text(
                          'Stay & Continue Dhikr',
                          style: TextStyle(
                            color: Colors.white,
                            fontSize: 14,
                            fontWeight: FontWeight.w800,
                            letterSpacing: 0.2,
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
              ),
              const SizedBox(height: 10),

              // Secondary Button: Exit App
              SizedBox(
                width: double.infinity,
                height: 44,
                child: OutlinedButton(
                  onPressed: () => Navigator.of(context).pop(true),
                  style: OutlinedButton.styleFrom(
                    backgroundColor: const Color(0x1AE11D48),
                    side: const BorderSide(
                      color: Color(0x4DE11D48),
                      width: 1,
                    ),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(14),
                    ),
                  ),
                  child: const Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Icon(Icons.exit_to_app_rounded, color: Color(0xFFFDA4AF), size: 18),
                      SizedBox(width: 8),
                      Text(
                        'Exit App',
                        style: TextStyle(
                          color: Color(0xFFFDA4AF),
                          fontSize: 13.5,
                          fontWeight: FontWeight.w700,
                        ),
                      ),
                    ],
                  ),
                ),
              ),
              const SizedBox(height: 6),
            ],
          ),
        ),
      ),
    );
  }
}
