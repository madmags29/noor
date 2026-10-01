// ============================================================
// NOOR — Global Islamic Search Screen (Flutter)
// ============================================================

import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../../theme/app_theme.dart';
import '../../l10n/app_localizations.dart';
import '../../data/quran_data.dart';
import '../../data/duas_data.dart';
import '../../data/ziyarat_data.dart';
import '../../data/islamic_core_data.dart';

class SearchScreen extends StatefulWidget {
  const SearchScreen({super.key});

  @override
  State<SearchScreen> createState() => _SearchScreenState();
}

class _SearchScreenState extends State<SearchScreen> {
  final TextEditingController _searchCtrl = TextEditingController();
  String _query = '';

  @override
  void dispose() {
    _searchCtrl.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final t = AppLocalizations.of(context)!;
    final clean = _query.trim().toLowerCase();

    final surahResults = clean.isEmpty
        ? <SurahItem>[]
        : kSurahsList.where((s) => s.englishName.toLowerCase().contains(clean) || s.name.contains(clean) || s.englishNameTranslation.toLowerCase().contains(clean)).take(4).toList();

    final duaResults = clean.isEmpty
        ? <DuaItem>[]
        : kDuasList.where((d) => d.title.toLowerCase().contains(clean) || d.translation.toLowerCase().contains(clean) || d.arabic.contains(clean)).take(4).toList();

    final ziyaratResults = clean.isEmpty
        ? <SanctuaryItem>[]
        : kSanctuariesList.where((s) => s.name.toLowerCase().contains(clean) || s.city.toLowerCase().contains(clean) || s.country.toLowerCase().contains(clean)).take(4).toList();

    final namesResults = clean.isEmpty
        ? <NameOfAllah>[]
        : kNamesOfAllah.where((n) => n.transliteration.toLowerCase().contains(clean) || n.meaningEn.toLowerCase().contains(clean) || n.arabic.contains(clean)).take(4).toList();

    final hasResults = surahResults.isNotEmpty || duaResults.isNotEmpty || ziyaratResults.isNotEmpty || namesResults.isNotEmpty;

    return Scaffold(
      backgroundColor: AppColors.bgDark,
      appBar: AppBar(
        backgroundColor: AppColors.bgDark,
        title: Text(t.search, style: const TextStyle(fontWeight: FontWeight.w900, color: AppColors.textWhite)),
        iconTheme: const IconThemeData(color: AppColors.goldPrimary),
      ),
      body: Column(
        children: [
          Padding(
            padding: const EdgeInsets.fromLTRB(16, 8, 16, 12),
            child: Container(
              decoration: BoxDecoration(
                color: AppColors.bgCard,
                borderRadius: BorderRadius.circular(16),
                border: Border.all(color: AppColors.goldPrimary.withValues(alpha: 0.4)),
              ),
              child: TextField(
                controller: _searchCtrl,
                autofocus: true,
                style: const TextStyle(color: AppColors.textWhite, fontSize: 15),
                onChanged: (val) => setState(() => _query = val),
                decoration: InputDecoration(
                  hintText: 'Search Surahs, Duas, Sanctuaries, 99 Names...',
                  hintStyle: const TextStyle(color: AppColors.emeraldSubtle, fontSize: 13),
                  prefixIcon: const Icon(Icons.search, color: AppColors.goldPrimary),
                  suffixIcon: _query.isNotEmpty
                      ? IconButton(
                          icon: const Icon(Icons.close, color: AppColors.emeraldSubtle, size: 18),
                          onPressed: () {
                            _searchCtrl.clear();
                            setState(() => _query = '');
                          },
                        )
                      : null,
                  border: InputBorder.none,
                  contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
                ),
              ),
            ),
          ),
          Expanded(
            child: clean.isEmpty
                ? _buildQuickKeywords()
                : !hasResults
                    ? const Center(child: Text('No matching results found', style: TextStyle(color: AppColors.emeraldSubtle)))
                    : ListView(
                        padding: const EdgeInsets.all(16),
                        children: [
                          if (surahResults.isNotEmpty) ...[
                            _resultCategoryHeader('Surahs of the Holy Quran'),
                            ...surahResults.map((s) => _resultTile(
                                  title: '${s.number}. ${s.englishName}',
                                  subtitle: '${s.englishNameTranslation} • ${s.numberOfAyahs} verses',
                                  trailingText: s.name,
                                  onTap: () => context.go('/quran'),
                                )),
                            const SizedBox(height: 16),
                          ],
                          if (duaResults.isNotEmpty) ...[
                            _resultCategoryHeader('Duas & Daily Adhkar'),
                            ...duaResults.map((d) => _resultTile(
                                  title: d.title,
                                  subtitle: d.source,
                                  trailingText: d.category.toUpperCase(),
                                  onTap: () => context.go('/duas'),
                                )),
                            const SizedBox(height: 16),
                          ],
                          if (ziyaratResults.isNotEmpty) ...[
                            _resultCategoryHeader('Sacred Sanctuaries & Ziyarat'),
                            ...ziyaratResults.map((z) => _resultTile(
                                  title: z.name,
                                  subtitle: '${z.city}, ${z.country}',
                                  trailingText: z.arabicName,
                                  onTap: () => context.go('/ziyarat'),
                                )),
                            const SizedBox(height: 16),
                          ],
                          if (namesResults.isNotEmpty) ...[
                            _resultCategoryHeader('99 Names of Allah (Asma-ul-Husna)'),
                            ...namesResults.map((n) => _resultTile(
                                  title: '${n.number}. ${n.transliteration}',
                                  subtitle: n.meaningEn,
                                  trailingText: n.arabic,
                                  onTap: () => context.push('/names-of-allah'),
                                )),
                          ],
                        ],
                      ),
          ),
        ],
      ),
    );
  }

  Widget _buildQuickKeywords() {
    final keywords = ['Al-Fatihah', 'Ayat al-Kursi', 'Forgiveness', 'Makkah', 'Ar-Rahman', 'Morning Adhkar', 'Travel', 'Zakat'];
    return Padding(
      padding: const EdgeInsets.all(20),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text('Suggested Searches', style: TextStyle(fontSize: 14, fontWeight: FontWeight.bold, color: AppColors.goldPrimary)),
          const SizedBox(height: 12),
          Wrap(
            spacing: 8,
            runSpacing: 8,
            children: keywords.map((k) {
              return ActionChip(
                label: Text(k),
                backgroundColor: AppColors.bgCard,
                labelStyle: const TextStyle(color: AppColors.textWhite, fontSize: 12),
                side: const BorderSide(color: AppColors.borderSubtle),
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
                onPressed: () {
                  _searchCtrl.text = k;
                  setState(() => _query = k);
                },
              );
            }).toList(),
          ),
        ],
      ),
    );
  }

  Widget _resultCategoryHeader(String title) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 8),
      child: Text(
        title,
        style: const TextStyle(fontSize: 13, fontWeight: FontWeight.w800, color: AppColors.goldPrimary),
      ),
    );
  }

  Widget _resultTile({
    required String title,
    required String subtitle,
    required String trailingText,
    required VoidCallback onTap,
  }) {
    return Container(
      margin: const EdgeInsets.only(bottom: 8),
      decoration: BoxDecoration(
        color: AppColors.bgCard,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: AppColors.borderSubtle),
      ),
      child: ListTile(
        title: Text(title, style: const TextStyle(fontSize: 14, fontWeight: FontWeight.bold, color: AppColors.textWhite)),
        subtitle: Text(subtitle, style: const TextStyle(fontSize: 12, color: AppColors.emeraldSubtle)),
        trailing: Text(trailingText, style: const TextStyle(fontSize: 13, color: AppColors.goldLight, fontWeight: FontWeight.bold)),
        onTap: onTap,
      ),
    );
  }
}
