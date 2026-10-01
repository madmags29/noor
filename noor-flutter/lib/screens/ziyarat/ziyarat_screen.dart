// ============================================================
// NOOR — Global Ziyarat & Sanctuaries Screen (Flutter)
// ============================================================

import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';
import '../../theme/app_theme.dart';
import '../../l10n/app_localizations.dart';
import '../../data/ziyarat_data.dart';

class ZiyaratScreen extends StatefulWidget {
  const ZiyaratScreen({super.key});

  @override
  State<ZiyaratScreen> createState() => _ZiyaratScreenState();
}

class _ZiyaratScreenState extends State<ZiyaratScreen> {
  String _searchQuery = '';
  String _selectedRegion = 'All';

  final List<String> _regions = ['All', 'Saudi Arabia / Hijaz', 'Levant / Palestine', 'Iraq / Mesopotamia', 'South Asia / India'];

  Future<void> _launchMaps(double lat, double lng) async {
    final uri = Uri.parse('https://www.google.com/maps/search/?api=1&query=$lat,$lng');
    if (await canLaunchUrl(uri)) {
      await launchUrl(uri, mode: LaunchMode.externalApplication);
    }
  }

  void _showSanctuaryDetails(SanctuaryItem sanctuary) {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: AppColors.bgCard,
      shape: const RoundedRectangleBorder(borderRadius: BorderRadius.vertical(top: Radius.circular(24))),
      builder: (context) {
        return DraggableScrollableSheet(
          initialChildSize: 0.85,
          maxChildSize: 0.95,
          minChildSize: 0.5,
          expand: false,
          builder: (context, scrollController) {
            return SingleChildScrollView(
              controller: scrollController,
              padding: const EdgeInsets.all(24),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  Center(
                    child: Container(
                      width: 40,
                      height: 4,
                      decoration: BoxDecoration(
                        color: AppColors.emeraldSubtle.withValues(alpha: 0.4),
                        borderRadius: BorderRadius.circular(2),
                      ),
                    ),
                  ),
                  const SizedBox(height: 16),

                  // Title & Arabic
                  Text(
                    sanctuary.name,
                    style: const TextStyle(fontSize: 20, fontWeight: FontWeight.w900, color: AppColors.textWhite),
                  ),
                  const SizedBox(height: 4),
                  Text(
                    sanctuary.arabicName,
                    style: const TextStyle(fontSize: 18, fontWeight: FontWeight.w700, color: AppColors.goldLight),
                  ),
                  const SizedBox(height: 8),

                  // Location Tag & Coordinates
                  Row(
                    children: [
                      const Icon(Icons.location_on, size: 14, color: AppColors.goldPrimary),
                      const SizedBox(width: 4),
                      Text(
                        '${sanctuary.city}, ${sanctuary.country}',
                        style: const TextStyle(fontSize: 12, color: AppColors.emeraldSubtle),
                      ),
                    ],
                  ),
                  const SizedBox(height: 16),

                  // Map Navigation Button
                  ElevatedButton.icon(
                    style: ElevatedButton.styleFrom(
                      backgroundColor: AppColors.goldPrimary,
                      foregroundColor: AppColors.bgDark,
                      padding: const EdgeInsets.symmetric(vertical: 12),
                      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
                    ),
                    icon: const Icon(Icons.map_outlined),
                    label: const Text('Open Coordinates in Maps', style: TextStyle(fontWeight: FontWeight.w800)),
                    onPressed: () => _launchMaps(sanctuary.latitude, sanctuary.longitude),
                  ),
                  const SizedBox(height: 20),

                  // Summary
                  _sectionTitle('Historical Significance'),
                  const SizedBox(height: 8),
                  Text(
                    sanctuary.summary,
                    style: const TextStyle(fontSize: 14, color: AppColors.textWhite, height: 1.5),
                  ),
                  const SizedBox(height: 12),
                  Text(
                    sanctuary.chronicle,
                    style: const TextStyle(fontSize: 13, color: AppColors.emeraldSubtle, height: 1.5),
                  ),
                  const SizedBox(height: 20),

                  // Architectural Style
                  _sectionTitle('Architectural Essence'),
                  const SizedBox(height: 8),
                  Container(
                    padding: const EdgeInsets.all(12),
                    decoration: BoxDecoration(
                      color: AppColors.bgDark,
                      borderRadius: BorderRadius.circular(12),
                      border: Border.all(color: AppColors.borderSubtle),
                    ),
                    child: Text(
                      sanctuary.architecturalStyle,
                      style: const TextStyle(fontSize: 13, color: AppColors.goldLight),
                    ),
                  ),
                  const SizedBox(height: 20),

                  // Ziyarat Du'a
                  _sectionTitle('Authentic Ziyarat Supplication'),
                  const SizedBox(height: 8),
                  Container(
                    padding: const EdgeInsets.all(16),
                    decoration: BoxDecoration(
                      color: AppColors.bgDark,
                      borderRadius: BorderRadius.circular(16),
                      border: Border.all(color: AppColors.goldPrimary.withValues(alpha: 0.3)),
                    ),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.stretch,
                      children: [
                        Text(
                          sanctuary.ziyaratDua,
                          textAlign: TextAlign.right,
                          textDirection: TextDirection.rtl,
                          style: const TextStyle(
                            fontSize: 18,
                            fontWeight: FontWeight.w700,
                            color: AppColors.goldLight,
                            height: 1.8,
                          ),
                        ),
                        const SizedBox(height: 12),
                        Container(height: 1, color: AppColors.borderSubtle),
                        const SizedBox(height: 12),
                        Text(
                          sanctuary.duaTranslation,
                          style: const TextStyle(fontSize: 13, color: AppColors.textWhite, height: 1.4),
                        ),
                      ],
                    ),
                  ),
                  const SizedBox(height: 20),

                  // Etiquettes
                  _sectionTitle('Etiquettes of Visitation (Adab)'),
                  const SizedBox(height: 8),
                  ...sanctuary.etiquettes.map((e) => Padding(
                        padding: const EdgeInsets.only(bottom: 6),
                        child: Row(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            const Text('• ', style: TextStyle(color: AppColors.goldPrimary, fontSize: 16)),
                            Expanded(child: Text(e, style: const TextStyle(fontSize: 13, color: AppColors.textWhite, height: 1.4))),
                          ],
                        ),
                      )),
                ],
              ),
            );
          },
        );
      },
    );
  }

  Widget _sectionTitle(String text) {
    return Text(
      text,
      style: const TextStyle(fontSize: 14, fontWeight: FontWeight.w800, color: AppColors.goldPrimary),
    );
  }

  @override
  Widget build(BuildContext context) {
    final t = AppLocalizations.of(context)!;

    final filtered = kSanctuariesList.where((s) {
      final matchesRegion = _selectedRegion == 'All' || s.region == _selectedRegion;
      final clean = _searchQuery.trim().toLowerCase();
      final matchesSearch = clean.isEmpty ||
          s.name.toLowerCase().contains(clean) ||
          s.city.toLowerCase().contains(clean) ||
          s.country.toLowerCase().contains(clean) ||
          s.arabicName.contains(clean) ||
          s.honorific.toLowerCase().contains(clean);
      return matchesRegion && matchesSearch;
    }).toList();

    return Scaffold(
      backgroundColor: AppColors.bgDark,
      body: SafeArea(
        child: Column(
          children: [
            // Header
            Padding(
              padding: const EdgeInsets.fromLTRB(20, 16, 20, 8),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        t.ziyarat,
                        style: const TextStyle(
                          fontSize: 26,
                          fontWeight: FontWeight.w900,
                          color: AppColors.textWhite,
                          letterSpacing: -0.5,
                        ),
                      ),
                      const SizedBox(height: 2),
                      const Text(
                        'Sacred Sanctuaries, Dargahs & Heritage',
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
                        Icon(Icons.mosque, size: 14, color: AppColors.goldPrimary),
                        SizedBox(width: 6),
                        Text(
                          'Verified Sites',
                          style: TextStyle(fontSize: 11, fontWeight: FontWeight.w700, color: AppColors.goldPrimary),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),

            // Search Bar
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
                    hintText: 'Search sanctuary, city, country, or figure...',
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

            // Regions Filter
            SingleChildScrollView(
              scrollDirection: Axis.horizontal,
              padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 4),
              child: Row(
                children: _regions.map((r) {
                  final isSelected = _selectedRegion == r;
                  return Padding(
                    padding: const EdgeInsets.only(right: 8),
                    child: FilterChip(
                      label: Text(r),
                      selected: isSelected,
                      onSelected: (val) => setState(() => _selectedRegion = r),
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

            // Sanctuaries List
            Expanded(
              child: filtered.isEmpty
                  ? const Center(
                      child: Text('No sanctuaries found matching criteria', style: TextStyle(color: AppColors.emeraldSubtle)),
                    )
                  : ListView.builder(
                      padding: const EdgeInsets.all(16),
                      itemCount: filtered.length,
                      itemBuilder: (context, index) {
                        final s = filtered[index];
                        return _buildSanctuaryCard(s);
                      },
                    ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildSanctuaryCard(SanctuaryItem s) {
    return Container(
      margin: const EdgeInsets.only(bottom: 16),
      decoration: BoxDecoration(
        color: AppColors.bgCard,
        borderRadius: BorderRadius.circular(20),
        border: Border.all(color: AppColors.borderSubtle),
      ),
      child: Material(
        color: Colors.transparent,
        child: InkWell(
          borderRadius: BorderRadius.circular(20),
          onTap: () => _showSanctuaryDetails(s),
          child: Padding(
            padding: const EdgeInsets.all(18),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Expanded(
                      child: Text(
                        s.name,
                        style: const TextStyle(fontSize: 16, fontWeight: FontWeight.w800, color: AppColors.textWhite),
                      ),
                    ),
                    Text(
                      s.arabicName,
                      style: const TextStyle(fontSize: 14, fontWeight: FontWeight.w700, color: AppColors.goldLight),
                    ),
                  ],
                ),
                const SizedBox(height: 6),
                Text(
                  s.honorific,
                  style: const TextStyle(fontSize: 12, fontWeight: FontWeight.w600, color: AppColors.goldPrimary),
                ),
                const SizedBox(height: 8),
                Text(
                  s.summary,
                  maxLines: 2,
                  overflow: TextOverflow.ellipsis,
                  style: const TextStyle(fontSize: 12, color: AppColors.emeraldSubtle, height: 1.4),
                ),
                const SizedBox(height: 14),
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Row(
                      children: [
                        const Icon(Icons.location_on, size: 14, color: AppColors.emeraldSubtle),
                        const SizedBox(width: 4),
                        Text(
                          '${s.city}, ${s.country}',
                          style: const TextStyle(fontSize: 11, color: AppColors.emeraldSubtle),
                        ),
                      ],
                    ),
                    Row(
                      children: [
                        Text(
                          'View Guide',
                          style: TextStyle(fontSize: 12, fontWeight: FontWeight.w800, color: AppColors.goldPrimary),
                        ),
                        const SizedBox(width: 4),
                        const Icon(Icons.arrow_forward, size: 14, color: AppColors.goldPrimary),
                      ],
                    ),
                  ],
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
