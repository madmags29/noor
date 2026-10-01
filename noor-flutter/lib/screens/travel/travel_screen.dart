// ============================================================
// NOOR — Traveler's Prayer (Qasr & Jam') Guide (Flutter)
// ============================================================

import 'package:flutter/material.dart';
import '../../theme/app_theme.dart';
import '../../l10n/app_localizations.dart';

class TravelScreen extends StatelessWidget {
  const TravelScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final t = AppLocalizations.of(context)!;

    final prayerShortening = [
      {'prayer': 'Fajr', 'normal': '2 Rakats', 'travel': '2 Rakats (No shortening)', 'shortened': false},
      {'prayer': 'Dhuhr', 'normal': '4 Rakats', 'travel': '2 Rakats (Qasr)', 'shortened': true},
      {'prayer': 'Asr', 'normal': '4 Rakats', 'travel': '2 Rakats (Qasr)', 'shortened': true},
      {'prayer': 'Maghrib', 'normal': '3 Rakats', 'travel': '3 Rakats (No shortening)', 'shortened': false},
      {'prayer': 'Isha', 'normal': '4 Rakats', 'travel': '2 Rakats (Qasr)', 'shortened': true},
    ];

    return Scaffold(
      backgroundColor: AppColors.bgDark,
      appBar: AppBar(
        backgroundColor: AppColors.bgDark,
        title: Text(t.travel, style: const TextStyle(fontWeight: FontWeight.w900, color: AppColors.textWhite)),
        iconTheme: const IconThemeData(color: AppColors.goldPrimary),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            // Hero Rules Card
            Container(
              padding: const EdgeInsets.all(20),
              decoration: BoxDecoration(
                gradient: const LinearGradient(
                  colors: [Color(0xFF064E3B), Color(0xFF0F172A)],
                  begin: Alignment.topLeft,
                  end: Alignment.bottomRight,
                ),
                borderRadius: BorderRadius.circular(20),
                border: Border.all(color: AppColors.goldPrimary.withValues(alpha: 0.3)),
              ),
              child: const Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    children: [
                      Icon(Icons.flight_takeoff, color: AppColors.goldPrimary, size: 22),
                      SizedBox(width: 10),
                      Text('Traveler Concession (Rukhsah)', style: TextStyle(fontSize: 16, fontWeight: FontWeight.w900, color: AppColors.textWhite)),
                    ],
                  ),
                  SizedBox(height: 10),
                  Text(
                    'The Prophet ﷺ said: "Allah loves that His concessions (Rukhsah) are accepted just as He hates that sins are committed." (Musnad Ahmad)',
                    style: TextStyle(fontSize: 12, color: AppColors.goldLight, height: 1.4),
                  ),
                  SizedBox(height: 10),
                  Text(
                    '• Minimum Distance: ~88 km (48 miles) from city limits.\n'
                    '• Duration of Stay: Up to 4 to 15 days depending on juristic school without taking permanent residence.',
                    style: TextStyle(fontSize: 12, color: AppColors.textWhite, height: 1.5),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 20),

            _sectionTitle('Prayer Shortening (Qasr) Matrix'),
            const SizedBox(height: 12),
            ...prayerShortening.map((p) => Container(
                  margin: const EdgeInsets.only(bottom: 8),
                  padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
                  decoration: BoxDecoration(
                    color: AppColors.bgCard,
                    borderRadius: BorderRadius.circular(16),
                    border: Border.all(color: AppColors.borderSubtle),
                  ),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text(p['prayer'] as String, style: const TextStyle(fontSize: 15, fontWeight: FontWeight.bold, color: AppColors.textWhite)),
                      Row(
                        children: [
                          Text(p['normal'] as String, style: const TextStyle(fontSize: 12, color: AppColors.emeraldSubtle, decoration: TextDecoration.lineThrough)),
                          const SizedBox(width: 8),
                          const Icon(Icons.arrow_forward, size: 12, color: AppColors.goldPrimary),
                          const SizedBox(width: 8),
                          Text(
                            p['travel'] as String,
                            style: TextStyle(
                              fontSize: 13,
                              fontWeight: FontWeight.w800,
                              color: (p['shortened'] as bool) ? AppColors.goldPrimary : AppColors.textWhite,
                            ),
                          ),
                        ],
                      ),
                    ],
                  ),
                )),

            const SizedBox(height: 20),
            _sectionTitle('Combining Prayers (Jam\') Rules'),
            const SizedBox(height: 12),
            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: AppColors.bgCard,
                borderRadius: BorderRadius.circular(18),
                border: Border.all(color: AppColors.borderSubtle),
              ),
              child: const Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text('1. Jam\' Taqdim (Early Combination):', style: TextStyle(fontWeight: FontWeight.bold, color: AppColors.goldPrimary, fontSize: 13)),
                  SizedBox(height: 4),
                  Text('Offering Asr along with Dhuhr in Dhuhr\'s time, or offering Isha along with Maghrib in Maghrib\'s time.', style: TextStyle(fontSize: 12, color: AppColors.textWhite, height: 1.4)),
                  SizedBox(height: 12),
                  Text('2. Jam\' Ta\'khir (Delayed Combination):', style: TextStyle(fontWeight: FontWeight.bold, color: AppColors.goldPrimary, fontSize: 13)),
                  SizedBox(height: 4),
                  Text('Delaying Dhuhr to be prayed with Asr during Asr\'s time, or delaying Maghrib to be prayed with Isha during Isha\'s time.', style: TextStyle(fontSize: 12, color: AppColors.textWhite, height: 1.4)),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _sectionTitle(String title) {
    return Text(
      title,
      style: const TextStyle(fontSize: 15, fontWeight: FontWeight.w800, color: AppColors.goldPrimary),
    );
  }
}
