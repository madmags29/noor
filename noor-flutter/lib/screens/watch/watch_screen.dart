// ============================================================
// NOOR — Makkah & Madinah 24/7 Live Broadcast Screen (Flutter)
// ============================================================

import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';
import '../../theme/app_theme.dart';
import '../../l10n/app_localizations.dart';

class WatchScreen extends StatelessWidget {
  const WatchScreen({super.key});

  Future<void> _openLiveStream(String url) async {
    final uri = Uri.parse(url);
    if (await canLaunchUrl(uri)) {
      await launchUrl(uri, mode: LaunchMode.externalApplication);
    }
  }

  @override
  Widget build(BuildContext context) {
    final t = AppLocalizations.of(context)!;

    final streams = [
      {
        'title': 'Makkah Live (Saudi Quran TV)',
        'arabic': 'بث مباشر من المسجد الحرام • مكة المكرمة',
        'desc': 'Official 24/7 continuous ultra HD broadcast from Masjid al-Haram with live Tawaf and prayer recitations.',
        'url': 'https://www.youtube.com/results?search_query=makkah+live+stream+saudi+quran+tv',
        'badge': 'Makkah Haram',
      },
      {
        'title': 'Madinah Live (Saudi Sunnah TV)',
        'arabic': 'بث مباشر من المسجد النبوي الشريف • المدينة المنورة',
        'desc': 'Official 24/7 continuous broadcast from Al-Masjid an-Nabawi with live Prophet\'s Rawdah views and Salawat.',
        'url': 'https://www.youtube.com/results?search_query=madinah+live+stream+saudi+sunnah+tv',
        'badge': 'Prophet\'s Mosque',
      },
    ];

    return Scaffold(
      backgroundColor: AppColors.bgDark,
      appBar: AppBar(
        backgroundColor: AppColors.bgDark,
        title: Text(t.watch, style: const TextStyle(fontWeight: FontWeight.w900, color: AppColors.textWhite)),
        iconTheme: const IconThemeData(color: AppColors.goldPrimary),
      ),
      body: ListView.builder(
        padding: const EdgeInsets.all(16),
        itemCount: streams.length,
        itemBuilder: (context, index) {
          final s = streams[index];
          return Container(
            margin: const EdgeInsets.only(bottom: 20),
            decoration: BoxDecoration(
              gradient: const LinearGradient(
                colors: [Color(0xFF064E3B), Color(0xFF0F172A)],
                begin: Alignment.topLeft,
                end: Alignment.bottomRight,
              ),
              borderRadius: BorderRadius.circular(24),
              border: Border.all(color: AppColors.goldPrimary.withValues(alpha: 0.3)),
            ),
            child: Padding(
              padding: const EdgeInsets.all(20),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                        decoration: BoxDecoration(
                          color: const Color(0x26EF4444),
                          borderRadius: BorderRadius.circular(10),
                          border: Border.all(color: const Color(0xFFEF4444)),
                        ),
                        child: const Row(
                          children: [
                            Icon(Icons.circle, size: 8, color: Color(0xFFEF4444)),
                            SizedBox(width: 6),
                            Text('24/7 LIVE', style: TextStyle(fontSize: 10, fontWeight: FontWeight.w900, color: Color(0xFFEF4444))),
                          ],
                        ),
                      ),
                      Text(s['badge']!, style: const TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: AppColors.goldPrimary)),
                    ],
                  ),
                  const SizedBox(height: 14),
                  Text(s['title']!, style: const TextStyle(fontSize: 18, fontWeight: FontWeight.w900, color: AppColors.textWhite)),
                  const SizedBox(height: 4),
                  Text(s['arabic']!, style: const TextStyle(fontSize: 14, fontWeight: FontWeight.bold, color: AppColors.goldLight)),
                  const SizedBox(height: 10),
                  Text(s['desc']!, style: const TextStyle(fontSize: 13, color: AppColors.emeraldSubtle, height: 1.4)),
                  const SizedBox(height: 18),
                  ElevatedButton.icon(
                    style: ElevatedButton.styleFrom(
                      backgroundColor: AppColors.goldPrimary,
                      foregroundColor: AppColors.bgDark,
                      padding: const EdgeInsets.symmetric(vertical: 14),
                      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                    ),
                    icon: const Icon(Icons.play_circle_filled, size: 22),
                    label: const Text('Watch Live Broadcast', style: TextStyle(fontWeight: FontWeight.w900, fontSize: 14)),
                    onPressed: () => _openLiveStream(s['url']!),
                  ),
                ],
              ),
            ),
          );
        },
      ),
    );
  }
}
