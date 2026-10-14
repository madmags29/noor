// ============================================================
// NOOR — Makkah & Madinah 24/7 Live Broadcast Screen (Flutter)
// Authenticated Visual Live Streams & Recitations
// ============================================================

import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';
import 'package:cached_network_image/cached_network_image.dart';
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
        'image': 'https://images.unsplash.com/photo-1565552645632-d725f8bfc19a?w=800&q=85',
      },
      {
        'title': 'Madinah Live (Saudi Sunnah TV)',
        'arabic': 'بث مباشر من المسجد النبوي الشريف • المدينة المنورة',
        'desc': 'Official 24/7 continuous broadcast from Al-Masjid an-Nabawi with live Prophet\'s Rawdah views and Salawat.',
        'url': 'https://www.youtube.com/results?search_query=madinah+live+stream+saudi+sunnah+tv',
        'badge': 'Prophet\'s Mosque',
        'image': 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?w=800&q=85',
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
              color: AppColors.bgCard,
              borderRadius: BorderRadius.circular(24),
              border: Border.all(color: AppColors.goldPrimary.withValues(alpha: 0.3)),
            ),
            child: ClipRRect(
              borderRadius: BorderRadius.circular(24),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  // Visual Live Banner Image
                  AspectRatio(
                    aspectRatio: 16 / 9,
                    child: Stack(
                      children: [
                        Positioned.fill(
                          child: CachedNetworkImage(
                            imageUrl: s['image']!,
                            fit: BoxFit.cover,
                            placeholder: (_, __) => Container(
                              color: const Color(0xFF031D16),
                              child: const Center(
                                child: CircularProgressIndicator(
                                  valueColor: AlwaysStoppedAnimation(AppColors.goldPrimary),
                                ),
                              ),
                            ),
                            errorWidget: (_, __, ___) => Container(
                              color: const Color(0xFF031D16),
                              child: const Icon(Icons.videocam, color: Colors.white30),
                            ),
                          ),
                        ),
                        Positioned.fill(
                          child: Container(
                            decoration: BoxDecoration(
                              gradient: LinearGradient(
                                begin: Alignment.topCenter,
                                end: Alignment.bottomCenter,
                                colors: [
                                  Colors.black.withValues(alpha: 0.2),
                                  Colors.black.withValues(alpha: 0.75),
                                ],
                              ),
                            ),
                          ),
                        ),
                        Positioned(
                          top: 14,
                          left: 14,
                          child: Container(
                            padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                            decoration: BoxDecoration(
                              color: const Color(0xCCEF4444),
                              borderRadius: BorderRadius.circular(10),
                            ),
                            child: const Row(
                              children: [
                                Icon(Icons.circle, size: 8, color: Colors.white),
                                SizedBox(width: 6),
                                Text('24/7 LIVE', style: TextStyle(fontSize: 10, fontWeight: FontWeight.w900, color: Colors.white)),
                              ],
                            ),
                          ),
                        ),
                        Positioned(
                          top: 14,
                          right: 14,
                          child: Container(
                            padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                            decoration: BoxDecoration(
                              color: Colors.black.withValues(alpha: 0.7),
                              borderRadius: BorderRadius.circular(10),
                              border: Border.all(color: AppColors.goldBorder),
                            ),
                            child: Text(
                              s['badge']!,
                              style: const TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: AppColors.goldLight),
                            ),
                          ),
                        ),
                        Center(
                          child: GestureDetector(
                            onTap: () => _openLiveStream(s['url']!),
                            child: Container(
                              width: 52,
                              height: 52,
                              decoration: BoxDecoration(
                                color: AppColors.goldPrimary.withValues(alpha: 0.95),
                                shape: BoxShape.circle,
                                boxShadow: [
                                  BoxShadow(
                                    color: Colors.black.withValues(alpha: 0.4),
                                    blurRadius: 12,
                                  ),
                                ],
                              ),
                              child: const Icon(Icons.play_arrow, color: Color(0xFF02120D), size: 32),
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),

                  Padding(
                    padding: const EdgeInsets.all(18),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.stretch,
                      children: [
                        Text(s['title']!, style: const TextStyle(fontSize: 17, fontWeight: FontWeight.w900, color: AppColors.textWhite)),
                        const SizedBox(height: 4),
                        Text(s['arabic']!, style: const TextStyle(fontSize: 13.5, fontWeight: FontWeight.bold, color: AppColors.goldLight)),
                        const SizedBox(height: 8),
                        Text(s['desc']!, style: const TextStyle(fontSize: 12.5, color: AppColors.emeraldSubtle, height: 1.4)),
                        const SizedBox(height: 16),
                        ElevatedButton.icon(
                          style: ElevatedButton.styleFrom(
                            backgroundColor: AppColors.goldPrimary,
                            foregroundColor: AppColors.bgDark,
                            padding: const EdgeInsets.symmetric(vertical: 13),
                            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                          ),
                          icon: const Icon(Icons.play_circle_filled, size: 20),
                          label: const Text('Open 24/7 Live Stream', style: TextStyle(fontWeight: FontWeight.w900, fontSize: 13.5)),
                          onPressed: () => _openLiveStream(s['url']!),
                        ),
                      ],
                    ),
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
