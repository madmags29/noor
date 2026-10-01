// ============================================================
// NOOR — Islamic Nikah & Family Guide (Flutter)
// ============================================================

import 'package:flutter/material.dart';
import '../../theme/app_theme.dart';
import '../../l10n/app_localizations.dart';

class NikahScreen extends StatelessWidget {
  const NikahScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final t = AppLocalizations.of(context)!;

    final pillars = [
      {'title': '1. Mutual Consent & Ijab-Qabul', 'desc': 'Unanimous, free-willed offer (Ijab) and acceptance (Qabul) by both bride and groom.'},
      {'title': '2. The Wali (Guardian)', 'desc': 'Consent and representation of the bride\'s guardian in accordance with Sunnah.'},
      {'title': '3. Two Upright Witnesses (Shuhud)', 'desc': 'Presence of two trustworthy adult Muslim witnesses at the time of the contract.'},
      {'title': '4. The Mahr (Dower Gift)', 'desc': 'A mandatory financial gift given directly to the bride as her exclusive property.'},
    ];

    final familyDuas = [
      {
        'title': 'Dua for Matrimonial Blessings',
        'arabic': 'بَارَكَ اللَّهُ لَكَ، وَبَارَكَ عَلَيْكَ، وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ',
        'trans': 'BarakAllahu laka wa baraka \'alayka wa jama\'a baynakuma fee khayr.',
        'meaning': 'May Allah bless you, and shower His blessings upon you, and unite you both in goodness. (Tirmidhi 1091)',
      },
      {
        'title': 'Quranic Dua for Righteous Family',
        'arabic': 'رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ وَاجْعَلْنَا لِلْمُتَّقِينَ إِمَامًا',
        'trans': 'Rabbana hab lana min azwajina wa dhurriyyatina qurrata a\'yunin waj\'alna lil-muttaqeena imama.',
        'meaning': 'Our Lord, grant us from among our spouses and offspring comfort to our eyes and make us an example for the righteous. (Surah Al-Furqan 25:74)',
      },
    ];

    return Scaffold(
      backgroundColor: AppColors.bgDark,
      appBar: AppBar(
        backgroundColor: AppColors.bgDark,
        title: Text(t.nikah, style: const TextStyle(fontWeight: FontWeight.w900, color: AppColors.textWhite)),
        iconTheme: const IconThemeData(color: AppColors.goldPrimary),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            // Header Quote Card
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
                    'وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً',
                    textAlign: TextAlign.center,
                    style: TextStyle(fontSize: 18, fontWeight: FontWeight.w700, color: AppColors.goldLight, height: 1.6),
                  ),
                  SizedBox(height: 10),
                  Text(
                    '"And among His signs is that He created for you spouses from among yourselves that you may find tranquility in them; and He placed between you affection and mercy." (Surah Ar-Rum 30:21)',
                    textAlign: TextAlign.center,
                    style: TextStyle(fontSize: 12, color: AppColors.textWhite, height: 1.4),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 20),

            _sectionTitle('Four Pillars of Islamic Nikah'),
            const SizedBox(height: 12),
            ...pillars.map((p) => Container(
                  margin: const EdgeInsets.only(bottom: 10),
                  padding: const EdgeInsets.all(16),
                  decoration: BoxDecoration(
                    color: AppColors.bgCard,
                    borderRadius: BorderRadius.circular(16),
                    border: Border.all(color: AppColors.borderSubtle),
                  ),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(p['title']!, style: const TextStyle(fontSize: 15, fontWeight: FontWeight.w800, color: AppColors.goldPrimary)),
                      const SizedBox(height: 4),
                      Text(p['desc']!, style: const TextStyle(fontSize: 13, color: AppColors.emeraldSubtle)),
                    ],
                  ),
                )),

            const SizedBox(height: 20),
            _sectionTitle('Prophetic Duas for Marriage & Children'),
            const SizedBox(height: 12),
            ...familyDuas.map((d) => Container(
                  margin: const EdgeInsets.only(bottom: 14),
                  padding: const EdgeInsets.all(16),
                  decoration: BoxDecoration(
                    color: AppColors.bgCard,
                    borderRadius: BorderRadius.circular(18),
                    border: Border.all(color: AppColors.borderSubtle),
                  ),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.stretch,
                    children: [
                      Text(d['title']!, style: const TextStyle(fontSize: 14, fontWeight: FontWeight.bold, color: AppColors.textWhite)),
                      const SizedBox(height: 10),
                      Container(
                        padding: const EdgeInsets.all(12),
                        decoration: BoxDecoration(
                          color: AppColors.bgDark,
                          borderRadius: BorderRadius.circular(12),
                          border: Border.all(color: AppColors.goldPrimary.withValues(alpha: 0.3)),
                        ),
                        child: Text(
                          d['arabic']!,
                          textAlign: TextAlign.right,
                          textDirection: TextDirection.rtl,
                          style: const TextStyle(fontSize: 17, fontWeight: FontWeight.w700, color: AppColors.goldLight, height: 1.6),
                        ),
                      ),
                      const SizedBox(height: 8),
                      Text(d['trans']!, style: const TextStyle(fontSize: 12, fontStyle: FontStyle.italic, color: AppColors.goldPrimary)),
                      const SizedBox(height: 4),
                      Text(d['meaning']!, style: const TextStyle(fontSize: 12, color: AppColors.textWhite)),
                    ],
                  ),
                )),
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
