// ============================================================
// NOOR — Duas & Adhkar Screen with Interactive Tasbih (Flutter)
// ============================================================

import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:share_plus/share_plus.dart';
import '../../theme/app_theme.dart';
import '../../l10n/app_localizations.dart';
import '../../data/duas_data.dart';

class DuasScreen extends StatefulWidget {
  const DuasScreen({super.key});

  @override
  State<DuasScreen> createState() => _DuasScreenState();
}

class _DuasScreenState extends State<DuasScreen> with SingleTickerProviderStateMixin {
  String _selectedCategory = 'all';
  String _searchQuery = '';

  // Interactive Tasbih State
  int _tasbihCount = 0;
  int _tasbihTarget = 33;
  int _totalCycles = 0;
  DuaItem? _activeTasbihDua;

  void _incrementTasbih() {
    HapticFeedback.lightImpact();
    setState(() {
      _tasbihCount++;
      if (_tasbihCount >= _tasbihTarget) {
        HapticFeedback.heavyImpact();
        _totalCycles++;
        _tasbihCount = 0;
      }
    });
  }

  void _resetTasbih() {
    HapticFeedback.mediumImpact();
    setState(() {
      _tasbihCount = 0;
      _totalCycles = 0;
    });
  }

  void _setDuaForTasbih(DuaItem dua) {
    setState(() {
      _activeTasbihDua = dua;
      _tasbihTarget = dua.targetCount > 0 ? dua.targetCount : 33;
      _tasbihCount = 0;
    });
  }

  void _copyDua(DuaItem dua) {
    final text = '${dua.arabic}\n\n${dua.transliteration}\n\n"${dua.translation}"\n\n— [${dua.source}]';
    Clipboard.setData(ClipboardData(text: text));
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(content: Text('Du\'a copied to clipboard!'), duration: Duration(seconds: 2)),
    );
  }

  void _shareDua(DuaItem dua) {
    final text = '${dua.arabic}\n\n${dua.transliteration}\n\n"${dua.translation}"\n\n— [${dua.source}]\n\nRead on Noor-e-ilahi app';
    Share.share(text);
  }

  @override
  Widget build(BuildContext context) {
    final t = AppLocalizations.of(context)!;

    final filteredDuas = kDuasList.where((d) {
      final matchesCat = _selectedCategory == 'all' || d.category == _selectedCategory;
      final clean = _searchQuery.trim().toLowerCase();
      final matchesSearch = clean.isEmpty ||
          d.title.toLowerCase().contains(clean) ||
          d.translation.toLowerCase().contains(clean) ||
          d.transliteration.toLowerCase().contains(clean) ||
          (d.titleUr != null && d.titleUr!.contains(clean));
      return matchesCat && matchesSearch;
    }).toList();

    return Scaffold(
      backgroundColor: AppColors.bgDark,
      body: SafeArea(
        child: CustomScrollView(
          slivers: [
            SliverToBoxAdapter(
              child: Padding(
                padding: const EdgeInsets.fromLTRB(20, 16, 20, 8),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          t.duas,
                          style: const TextStyle(
                            fontSize: 26,
                            fontWeight: FontWeight.w900,
                            color: AppColors.textWhite,
                            letterSpacing: -0.5,
                          ),
                        ),
                        const SizedBox(height: 2),
                        const Text(
                          'Authentic Supplications & Interactive Tasbih',
                          style: TextStyle(fontSize: 12, color: AppColors.emeraldSubtle),
                        ),
                      ],
                    ),
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                      decoration: BoxDecoration(
                        color: AppColors.emeraldPrimary.withValues(alpha: 0.15),
                        borderRadius: BorderRadius.circular(20),
                        border: Border.all(color: AppColors.emeraldPrimary.withValues(alpha: 0.3)),
                      ),
                      child: const Row(
                        children: [
                          Icon(Icons.volunteer_activism, size: 14, color: AppColors.goldPrimary),
                          SizedBox(width: 6),
                          Text(
                            'Hisn al-Muslim',
                            style: TextStyle(fontSize: 11, fontWeight: FontWeight.w700, color: AppColors.goldPrimary),
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
              ),
            ),

            // Hero Interactive Tasbih Station
            SliverToBoxAdapter(
              child: _buildInteractiveTasbihStation(),
            ),

            // Search Bar
            SliverToBoxAdapter(
              child: Padding(
                padding: const EdgeInsets.fromLTRB(16, 12, 16, 8),
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
                      hintText: 'Search Duas by keyword, Arabic or title...',
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
            ),

            // Categories
            SliverToBoxAdapter(
              child: SingleChildScrollView(
                scrollDirection: Axis.horizontal,
                padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 6),
                child: Row(
                  children: kDuaCategories.map((c) {
                    final isSelected = _selectedCategory == c.id;
                    return Padding(
                      padding: const EdgeInsets.only(right: 8),
                      child: FilterChip(
                        avatar: Text(c.icon, style: const TextStyle(fontSize: 12)),
                        label: Text(c.name),
                        selected: isSelected,
                        onSelected: (val) => setState(() => _selectedCategory = c.id),
                        backgroundColor: AppColors.bgCard,
                        selectedColor: AppColors.emeraldPrimary.withValues(alpha: 0.3),
                        labelStyle: TextStyle(
                          fontSize: 12,
                          fontWeight: isSelected ? FontWeight.w800 : FontWeight.w500,
                          color: isSelected ? AppColors.goldPrimary : AppColors.textWhite,
                        ),
                        side: BorderSide(
                          color: isSelected ? AppColors.goldPrimary : AppColors.borderSubtle,
                        ),
                        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
                        showCheckmark: false,
                      ),
                    );
                  }).toList(),
                ),
              ),
            ),

            // Duas List
            filteredDuas.isEmpty
                ? const SliverToBoxAdapter(
                    child: Padding(
                      padding: EdgeInsets.all(40),
                      child: Center(
                        child: Text(
                          'No supplications found matching criteria',
                          style: TextStyle(color: AppColors.emeraldSubtle),
                        ),
                      ),
                    ),
                  )
                : SliverPadding(
                    padding: const EdgeInsets.all(16),
                    sliver: SliverList(
                      delegate: SliverChildBuilderDelegate(
                        (context, index) {
                          final dua = filteredDuas[index];
                          return _buildDuaCard(dua);
                        },
                        childCount: filteredDuas.length,
                      ),
                    ),
                  ),
          ],
        ),
      ),
    );
  }

  Widget _buildInteractiveTasbihStation() {
    final progress = _tasbihTarget > 0 ? (_tasbihCount / _tasbihTarget) : 0.0;

    return Container(
      margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        gradient: const LinearGradient(
          colors: [Color(0xFF064E3B), Color(0xFF022C22), Color(0xFF0F172A)],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
        borderRadius: BorderRadius.circular(24),
        border: Border.all(color: AppColors.goldPrimary.withValues(alpha: 0.3)),
        boxShadow: const [
          BoxShadow(
            color: Color(0x33000000),
            blurRadius: 16,
            offset: Offset(0, 8),
          ),
        ],
      ),
      child: Column(
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Row(
                children: [
                  const Icon(Icons.circle, size: 8, color: AppColors.goldPrimary),
                  const SizedBox(width: 8),
                  Text(
                    _activeTasbihDua != null ? _activeTasbihDua!.title : 'Digital Tasbih Station',
                    style: const TextStyle(fontSize: 13, fontWeight: FontWeight.w800, color: AppColors.goldLight),
                    overflow: TextOverflow.ellipsis,
                  ),
                ],
              ),
              Row(
                children: [
                  _targetButton(33),
                  const SizedBox(width: 6),
                  _targetButton(99),
                  const SizedBox(width: 6),
                  _targetButton(100),
                ],
              ),
            ],
          ),
          const SizedBox(height: 16),

          // Central Tap Counter Button
          GestureDetector(
            onTap: _incrementTasbih,
            child: Stack(
              alignment: Alignment.center,
              children: [
                SizedBox(
                  width: 140,
                  height: 140,
                  child: CircularProgressIndicator(
                    value: progress,
                    strokeWidth: 6,
                    backgroundColor: Colors.white10,
                    valueColor: const AlwaysStoppedAnimation<Color>(AppColors.goldPrimary),
                  ),
                ),
                Container(
                  width: 120,
                  height: 120,
                  decoration: BoxDecoration(
                    shape: BoxShape.circle,
                    gradient: const RadialGradient(
                      colors: [Color(0xFF047857), Color(0xFF064E3B)],
                    ),
                    boxShadow: [
                      BoxShadow(
                        color: AppColors.goldPrimary.withValues(alpha: 0.3),
                        blurRadius: 12,
                        spreadRadius: 2,
                      ),
                    ],
                  ),
                  child: Center(
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Text(
                          '$_tasbihCount',
                          style: const TextStyle(
                            fontSize: 38,
                            fontWeight: FontWeight.w900,
                            color: AppColors.textWhite,
                          ),
                        ),
                        Text(
                          '/ $_tasbihTarget',
                          style: const TextStyle(fontSize: 11, color: AppColors.goldLight, fontWeight: FontWeight.bold),
                        ),
                      ],
                    ),
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(height: 14),

          // Action row
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                'Completed Cycles: $_totalCycles',
                style: const TextStyle(fontSize: 12, color: AppColors.emeraldSubtle, fontWeight: FontWeight.w600),
              ),
              TextButton.icon(
                style: TextButton.styleFrom(foregroundColor: AppColors.emeraldSubtle),
                icon: const Icon(Icons.refresh, size: 16),
                label: const Text('Reset', style: TextStyle(fontSize: 12)),
                onPressed: _resetTasbih,
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _targetButton(int target) {
    final isSelected = _tasbihTarget == target;
    return GestureDetector(
      onTap: () {
        HapticFeedback.selectionClick();
        setState(() {
          _tasbihTarget = target;
          _tasbihCount = 0;
        });
      },
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
        decoration: BoxDecoration(
          color: isSelected ? AppColors.goldPrimary : Colors.white10,
          borderRadius: BorderRadius.circular(8),
        ),
        child: Text(
          '$target',
          style: TextStyle(
            fontSize: 10,
            fontWeight: FontWeight.w800,
            color: isSelected ? AppColors.bgDark : AppColors.textWhite,
          ),
        ),
      ),
    );
  }

  Widget _buildDuaCard(DuaItem dua) {
    return Container(
      margin: const EdgeInsets.only(bottom: 16),
      padding: const EdgeInsets.all(18),
      decoration: BoxDecoration(
        color: AppColors.bgCard,
        borderRadius: BorderRadius.circular(20),
        border: Border.all(color: AppColors.borderSubtle),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Expanded(
                child: Text(
                  dua.title,
                  style: const TextStyle(
                    fontSize: 15,
                    fontWeight: FontWeight.w800,
                    color: AppColors.textWhite,
                  ),
                ),
              ),
              Row(
                children: [
                  IconButton(
                    icon: const Icon(Icons.touch_app_outlined, color: AppColors.goldPrimary, size: 20),
                    tooltip: 'Recite in Tasbih',
                    onPressed: () => _setDuaForTasbih(dua),
                  ),
                  IconButton(
                    icon: const Icon(Icons.copy, color: AppColors.emeraldSubtle, size: 18),
                    onPressed: () => _copyDua(dua),
                  ),
                  IconButton(
                    icon: const Icon(Icons.share_outlined, color: AppColors.emeraldSubtle, size: 18),
                    onPressed: () => _shareDua(dua),
                  ),
                ],
              ),
            ],
          ),
          const SizedBox(height: 12),

          // Arabic Text
          Container(
            padding: const EdgeInsets.all(14),
            decoration: BoxDecoration(
              color: AppColors.bgDark.withValues(alpha: 0.6),
              borderRadius: BorderRadius.circular(14),
              border: Border.all(color: AppColors.borderSubtle.withValues(alpha: 0.5)),
            ),
            child: Text(
              dua.arabic,
              textAlign: TextAlign.right,
              textDirection: TextDirection.rtl,
              style: const TextStyle(
                fontSize: 20,
                fontWeight: FontWeight.w700,
                color: AppColors.goldLight,
                height: 1.8,
              ),
            ),
          ),
          const SizedBox(height: 12),

          // Transliteration
          Text(
            dua.transliteration,
            style: const TextStyle(
              fontSize: 13,
              fontStyle: FontStyle.italic,
              color: AppColors.goldPrimary,
              height: 1.4,
            ),
          ),
          const SizedBox(height: 8),

          // Translation
          Text(
            dua.translation,
            style: const TextStyle(
              fontSize: 13,
              color: AppColors.textWhite,
              height: 1.5,
            ),
          ),
          const SizedBox(height: 12),

          // Virtue & Source footer
          Container(
            padding: const EdgeInsets.all(10),
            decoration: BoxDecoration(
              color: AppColors.emeraldPrimary.withValues(alpha: 0.08),
              borderRadius: BorderRadius.circular(10),
            ),
            child: Row(
              children: [
                const Icon(Icons.auto_awesome, size: 14, color: AppColors.goldPrimary),
                const SizedBox(width: 8),
                Expanded(
                  child: Text(
                    '${dua.virtue} (${dua.source})',
                    style: const TextStyle(fontSize: 11, color: AppColors.emeraldSubtle),
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
