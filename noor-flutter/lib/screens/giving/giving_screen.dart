// ============================================================
// NOOR — Sadaqah & Charitable Giving Screen (Flutter)
// ============================================================

import 'package:flutter/material.dart';
import '../../theme/app_theme.dart';
import '../../l10n/app_localizations.dart';

class GivingScreen extends StatelessWidget {
  const GivingScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final t = AppLocalizations.of(context)!;

    final causes = [
      {'title': 'Clean Water & Wells (Saqya)', 'icon': Icons.water_drop_outlined, 'desc': 'Providing continuous clean drinking water to remote, drought-stricken communities (Sadaqah Jariyah).'},
      {'title': 'Orphan Sponsorship & Care', 'icon': Icons.favorite_border, 'desc': '"I and the sponsor of an orphan will be in Paradise like these two fingers." (Bukhari)'},
      {'title': 'Food Packages & Langar', 'icon': Icons.restaurant_outlined, 'desc': 'Distributing staple food baskets to needy families and refugees.'},
      {'title': 'Quran Printing & Islamic Education', 'icon': Icons.menu_book_outlined, 'desc': 'Endowing Noble Quran copies to newly built mosques and educational institutions.'},
    ];

    return Scaffold(
      backgroundColor: AppColors.bgDark,
      appBar: AppBar(
        backgroundColor: AppColors.bgDark,
        title: Text(t.giving, style: const TextStyle(fontWeight: FontWeight.w900, color: AppColors.textWhite)),
        iconTheme: const IconThemeData(color: AppColors.goldPrimary),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            // Hero Sadaqah Quote
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
                children: [
                  Text(
                    'مَّثَلُ الَّذِينَ يُنفِقُونَ أَمْوَالَهُمْ فِي سَبِيلِ اللَّهِ كَمَثَلِ حَبَّةٍ أَنبَتَتْ سَبْعَ سَنَابِلَ فِي كُلِّ سُنبُلَةٍ مِّائَةُ حَبَّةٍ',
                    textAlign: TextAlign.center,
                    style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: AppColors.goldLight, height: 1.6),
                  ),
                  SizedBox(height: 10),
                  Text(
                    '"The example of those who spend their wealth in the way of Allah is like a seed of grain which grows seven spikes; in each spike is a hundred grains." (Surah Al-Baqarah 2:261)',
                    textAlign: TextAlign.center,
                    style: TextStyle(fontSize: 12, color: AppColors.textWhite, height: 1.4),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 20),

            _sectionTitle('Continuous Charity (Sadaqah Jariyah) Causes'),
            const SizedBox(height: 12),
            ...causes.map((c) => Container(
                  margin: const EdgeInsets.only(bottom: 12),
                  padding: const EdgeInsets.all(16),
                  decoration: BoxDecoration(
                    color: AppColors.bgCard,
                    borderRadius: BorderRadius.circular(18),
                    border: Border.all(color: AppColors.borderSubtle),
                  ),
                  child: Row(
                    children: [
                      Container(
                        padding: const EdgeInsets.all(10),
                        decoration: BoxDecoration(
                          color: AppColors.emeraldPrimary.withValues(alpha: 0.15),
                          borderRadius: BorderRadius.circular(12),
                        ),
                        child: Icon(c['icon'] as IconData, color: AppColors.goldPrimary, size: 22),
                      ),
                      const SizedBox(width: 14),
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(c['title'] as String, style: const TextStyle(fontSize: 14, fontWeight: FontWeight.bold, color: AppColors.textWhite)),
                            const SizedBox(height: 4),
                            Text(c['desc'] as String, style: const TextStyle(fontSize: 12, color: AppColors.emeraldSubtle, height: 1.4)),
                          ],
                        ),
                      ),
                    ],
                  ),
                )),

            const SizedBox(height: 16),
            _sectionTitle('Everyday Acts of Sadaqah'),
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
                  Text('• Your smile for your brother is charity (Sadaqah).', style: TextStyle(color: AppColors.textWhite, fontSize: 13)),
                  SizedBox(height: 6),
                  Text('• Enjoining good and forbidding wrong is charity.', style: TextStyle(color: AppColors.textWhite, fontSize: 13)),
                  SizedBox(height: 6),
                  Text('• Removing harmful objects from the path is charity.', style: TextStyle(color: AppColors.textWhite, fontSize: 13)),
                  SizedBox(height: 6),
                  Text('• Guiding a lost traveler is charity. (Jami` at-Tirmidhi 1956)', style: TextStyle(color: AppColors.textWhite, fontSize: 13)),
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
