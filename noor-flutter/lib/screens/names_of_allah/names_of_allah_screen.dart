// ============================================================
// NOOR — Asma-ul-Husna (99 Names of Allah) Screen (Flutter)
// ============================================================

import 'package:flutter/material.dart';
import '../../theme/app_theme.dart';
import '../../l10n/app_localizations.dart';
import '../../data/islamic_core_data.dart';

class NamesOfAllahScreen extends StatefulWidget {
  const NamesOfAllahScreen({super.key});

  @override
  State<NamesOfAllahScreen> createState() => _NamesOfAllahScreenState();
}

class _NamesOfAllahScreenState extends State<NamesOfAllahScreen> {
  String _searchQuery = '';

  void _showNameDetails(NameOfAllah item) {
    showModalBottomSheet(
      context: context,
      backgroundColor: AppColors.bgCard,
      shape: const RoundedRectangleBorder(borderRadius: BorderRadius.vertical(top: Radius.circular(24))),
      builder: (context) {
        return Padding(
          padding: const EdgeInsets.all(24),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              Center(
                child: Container(
                  width: 40,
                  height: 4,
                  decoration: BoxDecoration(color: AppColors.emeraldSubtle.withValues(alpha: 0.4), borderRadius: BorderRadius.circular(2)),
                ),
              ),
              const SizedBox(height: 16),
              Center(
                child: Text(
                  item.arabic,
                  style: const TextStyle(fontSize: 34, fontWeight: FontWeight.w900, color: AppColors.goldLight),
                ),
              ),
              Center(
                child: Text(
                  '${item.number}. ${item.transliteration}',
                  style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: AppColors.goldPrimary),
                ),
              ),
              Center(
                child: Text(
                  '${item.meaningEn} • ${item.meaningUr}',
                  style: const TextStyle(fontSize: 13, color: AppColors.emeraldSubtle),
                ),
              ),
              const SizedBox(height: 16),
              Container(height: 1, color: AppColors.borderSubtle),
              const SizedBox(height: 14),
              const Text('Explanation & Meaning:', style: TextStyle(fontSize: 13, fontWeight: FontWeight.bold, color: AppColors.goldPrimary)),
              const SizedBox(height: 4),
              Text(item.explanation, style: const TextStyle(fontSize: 13, color: AppColors.textWhite, height: 1.5)),
              const SizedBox(height: 12),
              const Text('Spiritual Benefit of Recitation:', style: TextStyle(fontSize: 13, fontWeight: FontWeight.bold, color: AppColors.goldPrimary)),
              const SizedBox(height: 4),
              Text(item.spiritualBenefit, style: const TextStyle(fontSize: 13, color: AppColors.emeraldSubtle, height: 1.5)),
              const SizedBox(height: 12),
              Align(
                alignment: Alignment.centerRight,
                child: Text('Reference: ${item.quranRef}', style: const TextStyle(fontSize: 11, fontStyle: FontStyle.italic, color: AppColors.goldPrimary)),
              ),
            ],
          ),
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    final t = AppLocalizations.of(context)!;

    final filtered = kNamesOfAllah.where((n) {
      final clean = _searchQuery.trim().toLowerCase();
      return clean.isEmpty ||
          n.transliteration.toLowerCase().contains(clean) ||
          n.meaningEn.toLowerCase().contains(clean) ||
          n.arabic.contains(clean) ||
          '${n.number}' == clean;
    }).toList();

    return Scaffold(
      backgroundColor: AppColors.bgDark,
      appBar: AppBar(
        backgroundColor: AppColors.bgDark,
        title: Text(t.namesOfAllah, style: const TextStyle(fontWeight: FontWeight.w900, color: AppColors.textWhite)),
        iconTheme: const IconThemeData(color: AppColors.goldPrimary),
      ),
      body: Column(
        children: [
          // Search Box
          Padding(
            padding: const EdgeInsets.fromLTRB(16, 8, 16, 8),
            child: Container(
              decoration: BoxDecoration(
                color: AppColors.bgCard,
                borderRadius: BorderRadius.circular(16),
                border: Border.all(color: AppColors.borderSubtle),
              ),
              child: TextField(
                style: const TextStyle(color: AppColors.textWhite, fontSize: 14),
                onChanged: (val) => setState(() => _searchQuery = val),
                decoration: InputDecoration(
                  hintText: 'Search 99 Names by transliteration, English or number...',
                  hintStyle: const TextStyle(color: AppColors.emeraldSubtle, fontSize: 13),
                  prefixIcon: const Icon(Icons.search, color: AppColors.goldPrimary, size: 20),
                  suffixIcon: _searchQuery.isNotEmpty
                      ? IconButton(
                          icon: const Icon(Icons.clear, size: 18, color: AppColors.emeraldSubtle),
                          onPressed: () => setState(() => _searchQuery = ''),
                        )
                      : null,
                  border: InputBorder.none,
                  contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
                ),
              ),
            ),
          ),

          // Grid View
          Expanded(
            child: filtered.isEmpty
                ? const Center(child: Text('No names found', style: TextStyle(color: AppColors.emeraldSubtle)))
                : GridView.builder(
                    padding: const EdgeInsets.all(16),
                    gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                      crossAxisCount: 2,
                      crossAxisSpacing: 12,
                      mainAxisSpacing: 12,
                      childAspectRatio: 1.15,
                    ),
                    itemCount: filtered.length,
                    itemBuilder: (context, index) {
                      final item = filtered[index];
                      return Container(
                        decoration: BoxDecoration(
                          color: AppColors.bgCard,
                          borderRadius: BorderRadius.circular(20),
                          border: Border.all(color: AppColors.borderSubtle),
                        ),
                        child: Material(
                          color: Colors.transparent,
                          child: InkWell(
                            borderRadius: BorderRadius.circular(20),
                            onTap: () => _showNameDetails(item),
                            child: Padding(
                              padding: const EdgeInsets.all(14),
                              child: Column(
                                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                crossAxisAlignment: CrossAxisAlignment.stretch,
                                children: [
                                  Row(
                                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                    children: [
                                      Container(
                                        width: 26,
                                        height: 26,
                                        decoration: BoxDecoration(
                                          color: AppColors.bgDark,
                                          shape: BoxShape.circle,
                                          border: Border.all(color: AppColors.goldPrimary.withValues(alpha: 0.4)),
                                        ),
                                        child: Center(
                                          child: Text(
                                            '${item.number}',
                                            style: const TextStyle(fontSize: 10, fontWeight: FontWeight.bold, color: AppColors.goldPrimary),
                                          ),
                                        ),
                                      ),
                                      const Icon(Icons.info_outline, size: 16, color: AppColors.emeraldSubtle),
                                    ],
                                  ),
                                  Text(
                                    item.arabic,
                                    textAlign: TextAlign.center,
                                    style: const TextStyle(fontSize: 22, fontWeight: FontWeight.bold, color: AppColors.goldLight),
                                  ),
                                  Column(
                                    children: [
                                      Text(
                                        item.transliteration,
                                        style: const TextStyle(fontSize: 12, fontWeight: FontWeight.w800, color: AppColors.textWhite),
                                      ),
                                      Text(
                                        item.meaningEn,
                                        maxLines: 1,
                                        overflow: TextOverflow.ellipsis,
                                        style: const TextStyle(fontSize: 10, color: AppColors.emeraldSubtle),
                                      ),
                                    ],
                                  ),
                                ],
                              ),
                            ),
                          ),
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
