// ============================================================
// NOOR — Islamic Living Guides Screen (Flutter)
// Wudu, Ghusl, Tayammum, Beginner's Prayer & Sujood as-Sahw
// ============================================================

import 'package:flutter/material.dart';
import '../../theme/app_theme.dart';
import '../../l10n/app_localizations.dart';
import '../../data/islamic_core_data.dart';

class GuidesScreen extends StatefulWidget {
  const GuidesScreen({super.key});

  @override
  State<GuidesScreen> createState() => _GuidesScreenState();
}

class _GuidesScreenState extends State<GuidesScreen> with SingleTickerProviderStateMixin {
  late TabController _tabController;

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 4, vsync: this);
  }

  @override
  void dispose() {
    _tabController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final t = AppLocalizations.of(context)!;

    return Scaffold(
      backgroundColor: AppColors.bgDark,
      appBar: AppBar(
        backgroundColor: AppColors.bgDark,
        title: Text(t.guides, style: const TextStyle(fontWeight: FontWeight.w900, color: AppColors.textWhite)),
        iconTheme: const IconThemeData(color: AppColors.goldPrimary),
        bottom: TabBar(
          controller: _tabController,
          isScrollable: true,
          indicatorColor: AppColors.goldPrimary,
          labelColor: AppColors.goldPrimary,
          unselectedLabelColor: AppColors.emeraldSubtle,
          labelStyle: const TextStyle(fontWeight: FontWeight.w800, fontSize: 13),
          tabs: const [
            Tab(text: 'Wudu (Ablution)'),
            Tab(text: 'Ghusl (Purification)'),
            Tab(text: 'Tayammum'),
            Tab(text: 'Sujood as-Sahw'),
          ],
        ),
      ),
      body: TabBarView(
        controller: _tabController,
        children: [
          _buildWuduTab(),
          _buildGhuslTab(),
          _buildTayammumTab(),
          _buildSahwTab(),
        ],
      ),
    );
  }

  Widget _buildWuduTab() {
    return ListView.builder(
      padding: const EdgeInsets.all(16),
      itemCount: kWuduSteps.length,
      itemBuilder: (context, index) {
        final step = kWuduSteps[index];
        return Container(
          margin: const EdgeInsets.only(bottom: 14),
          padding: const EdgeInsets.all(16),
          decoration: BoxDecoration(
            color: AppColors.bgCard,
            borderRadius: BorderRadius.circular(18),
            border: Border.all(color: AppColors.borderSubtle),
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Row(
                    children: [
                      Container(
                        width: 28,
                        height: 28,
                        decoration: BoxDecoration(
                          color: step.isFard ? AppColors.goldPrimary : AppColors.bgDark,
                          shape: BoxShape.circle,
                          border: Border.all(color: AppColors.goldPrimary),
                        ),
                        child: Center(
                          child: Text(
                            '${step.step}',
                            style: TextStyle(
                              fontSize: 12,
                              fontWeight: FontWeight.bold,
                              color: step.isFard ? AppColors.bgDark : AppColors.goldPrimary,
                            ),
                          ),
                        ),
                      ),
                      const SizedBox(width: 10),
                      Text(step.title, style: const TextStyle(fontSize: 14, fontWeight: FontWeight.bold, color: AppColors.textWhite)),
                    ],
                  ),
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                    decoration: BoxDecoration(
                      color: step.isFard ? const Color(0x26F59E0B) : const Color(0x2634D399),
                      borderRadius: BorderRadius.circular(8),
                    ),
                    child: Text(
                      step.isFard ? 'FARD' : '${step.times}x SUNNAH',
                      style: TextStyle(
                        fontSize: 9,
                        fontWeight: FontWeight.bold,
                        color: step.isFard ? const Color(0xFFF59E0B) : const Color(0xFF34D399),
                      ),
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 8),
              Text(step.arabicName, style: const TextStyle(fontSize: 15, fontWeight: FontWeight.bold, color: AppColors.goldLight)),
              const SizedBox(height: 6),
              Text(step.instruction, style: const TextStyle(fontSize: 13, color: AppColors.textWhite, height: 1.4)),
              const SizedBox(height: 8),
              Text(step.hadithNote, style: const TextStyle(fontSize: 11, fontStyle: FontStyle.italic, color: AppColors.emeraldSubtle)),
            ],
          ),
        );
      },
    );
  }

  Widget _buildGhuslTab() {
    final steps = [
      {'title': '1. Intention (Niyyah)', 'desc': 'Form the sincere intention in heart to perform Ghusl for ritual purification.'},
      {'title': '2. Wash Hands & Private Areas', 'desc': 'Wash both hands three times and cleanse any physical impurities thoroughly.'},
      {'title': '3. Perform Complete Wudu', 'desc': 'Perform a complete Wudu just like for prayer, rinsing mouth and nose thoroughly.'},
      {'title': '4. Pour Water over Head (3 Times)', 'desc': 'Pour water over head three times, ensuring water reaches the roots of all hair.'},
      {'title': '5. Wash Entire Body', 'desc': 'Pour water over the entire right side of body, then the left side, ensuring no spot is left dry.'},
    ];

    return ListView.builder(
      padding: const EdgeInsets.all(16),
      itemCount: steps.length,
      itemBuilder: (context, index) {
        final s = steps[index];
        return Container(
          margin: const EdgeInsets.only(bottom: 12),
          padding: const EdgeInsets.all(16),
          decoration: BoxDecoration(
            color: AppColors.bgCard,
            borderRadius: BorderRadius.circular(16),
            border: Border.all(color: AppColors.borderSubtle),
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(s['title']!, style: const TextStyle(fontSize: 15, fontWeight: FontWeight.bold, color: AppColors.goldPrimary)),
              const SizedBox(height: 6),
              Text(s['desc']!, style: const TextStyle(fontSize: 13, color: AppColors.textWhite, height: 1.4)),
            ],
          ),
        );
      },
    );
  }

  Widget _buildTayammumTab() {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(16),
      child: Container(
        padding: const EdgeInsets.all(18),
        decoration: BoxDecoration(
          color: AppColors.bgCard,
          borderRadius: BorderRadius.circular(20),
          border: Border.all(color: AppColors.borderSubtle),
        ),
        child: const Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text('Tayammum (Dry Ablution with Clean Earth)', style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: AppColors.goldPrimary)),
            SizedBox(height: 12),
            Text(
              'Used when water is unavailable or its use is harmful due to severe illness.',
              style: TextStyle(fontSize: 13, color: AppColors.emeraldSubtle),
            ),
            SizedBox(height: 16),
            Text('1. Sincere Intention (Niyyah) & say Bismillah.', style: TextStyle(fontWeight: FontWeight.bold, color: AppColors.textWhite)),
            SizedBox(height: 8),
            Text('2. Strike clean earth/sand lightly once with both palms.', style: TextStyle(fontWeight: FontWeight.bold, color: AppColors.textWhite)),
            SizedBox(height: 8),
            Text('3. Blow off excess dust from hands.', style: TextStyle(fontWeight: FontWeight.bold, color: AppColors.textWhite)),
            SizedBox(height: 8),
            Text('4. Wipe the entire face once with both hands.', style: TextStyle(fontWeight: FontWeight.bold, color: AppColors.textWhite)),
            SizedBox(height: 8),
            Text('5. Wipe the back of the right hand with the left palm, and the left hand with the right palm once. (Bukhari 338)', style: TextStyle(fontWeight: FontWeight.bold, color: AppColors.textWhite)),
          ],
        ),
      ),
    );
  }

  Widget _buildSahwTab() {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(16),
      child: Container(
        padding: const EdgeInsets.all(18),
        decoration: BoxDecoration(
          color: AppColors.bgCard,
          borderRadius: BorderRadius.circular(20),
          border: Border.all(color: AppColors.borderSubtle),
        ),
        child: const Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text('Sujood as-Sahw (Prostration of Forgetfulness)', style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: AppColors.goldPrimary)),
            SizedBox(height: 12),
            Text(
              'Performed to compensate for unintentional mistakes in prayer (addition, omission, or doubt).',
              style: TextStyle(fontSize: 13, color: AppColors.emeraldSubtle, height: 1.5),
            ),
            SizedBox(height: 16),
            Text('When to perform before Salam (Qabl al-Salam):', style: TextStyle(fontWeight: FontWeight.bold, color: AppColors.goldLight, fontSize: 13)),
            SizedBox(height: 4),
            Text('• If you omitted a required obligation (e.g. first Tashahhud) or doubted between 3 or 4 rakats and built on certainty (the lesser number).', style: TextStyle(fontSize: 12, color: AppColors.textWhite, height: 1.4)),
            SizedBox(height: 14),
            Text('When to perform after Salam (Ba\'d al-Salam):', style: TextStyle(fontWeight: FontWeight.bold, color: AppColors.goldLight, fontSize: 13)),
            SizedBox(height: 4),
            Text('• If you added an extra action (e.g. prayed 5 rakats by accident) or had doubt with prevailing likelihood. Perform 2 prostrations with Takbeer after Salam, then give Salam again.', style: TextStyle(fontSize: 12, color: AppColors.textWhite, height: 1.4)),
          ],
        ),
      ),
    );
  }
}
