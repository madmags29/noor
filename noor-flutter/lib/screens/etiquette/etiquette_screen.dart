// ============================================================
// NOOR — Daily Sunnah Etiquette (Adab) Screen (Flutter)
// ============================================================

import 'package:flutter/material.dart';
import '../../theme/app_theme.dart';
import '../../l10n/app_localizations.dart';
import '../../data/islamic_core_data.dart';

class EtiquetteScreen extends StatefulWidget {
  const EtiquetteScreen({super.key});

  @override
  State<EtiquetteScreen> createState() => _EtiquetteScreenState();
}

class _EtiquetteScreenState extends State<EtiquetteScreen> {
  String _selectedCatId = kDailyAdabCategories[0].id;

  @override
  Widget build(BuildContext context) {
    final t = AppLocalizations.of(context)!;
    final activeCategory = kDailyAdabCategories.firstWhere((c) => c.id == _selectedCatId, orElse: () => kDailyAdabCategories[0]);

    return Scaffold(
      backgroundColor: AppColors.bgDark,
      appBar: AppBar(
        backgroundColor: AppColors.bgDark,
        title: Text(t.adab, style: const TextStyle(fontWeight: FontWeight.w900, color: AppColors.textWhite)),
        iconTheme: const IconThemeData(color: AppColors.goldPrimary),
      ),
      body: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          // Category Selector
          SingleChildScrollView(
            scrollDirection: Axis.horizontal,
            padding: const EdgeInsets.fromLTRB(16, 12, 16, 12),
            child: Row(
              children: kDailyAdabCategories.map((cat) {
                final isSelected = _selectedCatId == cat.id;
                return Padding(
                  padding: const EdgeInsets.only(right: 8),
                  child: FilterChip(
                    label: Text(cat.title),
                    selected: isSelected,
                    onSelected: (val) => setState(() => _selectedCatId = cat.id),
                    backgroundColor: AppColors.bgCard,
                    selectedColor: AppColors.goldPrimary,
                    labelStyle: TextStyle(
                      fontSize: 12,
                      fontWeight: isSelected ? FontWeight.w800 : FontWeight.w500,
                      color: isSelected ? AppColors.bgDark : AppColors.textWhite,
                    ),
                    side: BorderSide(color: isSelected ? AppColors.goldPrimary : AppColors.borderSubtle),
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
                    showCheckmark: false,
                  ),
                );
              }).toList(),
            ),
          ),

          // Content List
          Expanded(
            child: ListView.builder(
              padding: const EdgeInsets.all(16),
              itemCount: activeCategory.rules.length,
              itemBuilder: (context, index) {
                final rule = activeCategory.rules[index];
                return Container(
                  margin: const EdgeInsets.only(bottom: 16),
                  padding: const EdgeInsets.all(18),
                  decoration: BoxDecoration(
                    color: AppColors.bgCard,
                    borderRadius: BorderRadius.circular(20),
                    border: Border.all(color: AppColors.borderSubtle),
                  ),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        rule.title,
                        style: const TextStyle(fontSize: 16, fontWeight: FontWeight.w800, color: AppColors.goldPrimary),
                      ),
                      const SizedBox(height: 8),
                      Text(
                        rule.instruction,
                        style: const TextStyle(fontSize: 13, color: AppColors.textWhite, height: 1.5),
                      ),
                      if (rule.arabicDua.isNotEmpty) ...[
                        const SizedBox(height: 12),
                        Container(
                          width: double.infinity,
                          padding: const EdgeInsets.all(14),
                          decoration: BoxDecoration(
                            color: AppColors.bgDark,
                            borderRadius: BorderRadius.circular(14),
                            border: Border.all(color: AppColors.goldPrimary.withValues(alpha: 0.3)),
                          ),
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.stretch,
                            children: [
                              Text(
                                rule.arabicDua,
                                textAlign: TextAlign.right,
                                textDirection: TextDirection.rtl,
                                style: const TextStyle(fontSize: 18, fontWeight: FontWeight.w700, color: AppColors.goldLight, height: 1.6),
                              ),
                              const SizedBox(height: 6),
                              Text(
                                rule.duaTranslation,
                                style: const TextStyle(fontSize: 11, color: AppColors.textWhite),
                              ),
                            ],
                          ),
                        ),
                      ],
                      const SizedBox(height: 12),
                      Container(
                        padding: const EdgeInsets.all(10),
                        decoration: BoxDecoration(
                          color: AppColors.emeraldPrimary.withValues(alpha: 0.1),
                          borderRadius: BorderRadius.circular(10),
                        ),
                        child: Row(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            const Icon(Icons.menu_book, size: 14, color: AppColors.goldPrimary),
                            const SizedBox(width: 8),
                            Expanded(
                              child: Text(
                                rule.hadithReference,
                                style: const TextStyle(fontSize: 11, color: AppColors.emeraldSubtle, fontStyle: FontStyle.italic),
                              ),
                            ),
                          ],
                        ),
                      ),
                    ],
                  ),
                );
              },
            ),
          ),
        ],
      ),
    );
  }
}
