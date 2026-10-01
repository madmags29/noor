// ============================================================
// NOOR — Global Mosques & Halal Map Screen (Flutter)
// ============================================================

import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';
import '../../theme/app_theme.dart';
import '../../l10n/app_localizations.dart';
import '../../data/map_data.dart';

class MapScreen extends StatefulWidget {
  const MapScreen({super.key});

  @override
  State<MapScreen> createState() => _MapScreenState();
}

class _MapScreenState extends State<MapScreen> {
  String _selectedFilter = 'all'; // 'all', 'holy_site', 'mosque'
  String _searchQuery = '';

  Future<void> _launchMaps(double lat, double lng) async {
    final uri = Uri.parse('https://www.google.com/maps/search/?api=1&query=$lat,$lng');
    if (await canLaunchUrl(uri)) {
      await launchUrl(uri, mode: LaunchMode.externalApplication);
    }
  }

  @override
  Widget build(BuildContext context) {
    final t = AppLocalizations.of(context)!;

    final filtered = kIslamicMapPoints.where((p) {
      final matchType = _selectedFilter == 'all' || p.type == _selectedFilter;
      final clean = _searchQuery.trim().toLowerCase();
      final matchSearch = clean.isEmpty ||
          p.name.toLowerCase().contains(clean) ||
          p.city.toLowerCase().contains(clean) ||
          p.country.toLowerCase().contains(clean);
      return matchType && matchSearch;
    }).toList();

    return Scaffold(
      backgroundColor: AppColors.bgDark,
      appBar: AppBar(
        backgroundColor: AppColors.bgDark,
        title: Text(t.map, style: const TextStyle(fontWeight: FontWeight.w900, color: AppColors.textWhite)),
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
                  hintText: 'Search mosques, city or country...',
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

          // Filters
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 4),
            child: Row(
              children: [
                _filterChip('all', 'All Locations'),
                const SizedBox(width: 8),
                _filterChip('holy_site', 'Holy Sanctuaries'),
                const SizedBox(width: 8),
                _filterChip('mosque', 'Grand Mosques'),
              ],
            ),
          ),

          // Points List
          Expanded(
            child: filtered.isEmpty
                ? const Center(child: Text('No locations found', style: TextStyle(color: AppColors.emeraldSubtle)))
                : ListView.builder(
                    padding: const EdgeInsets.all(16),
                    itemCount: filtered.length,
                    itemBuilder: (context, index) {
                      final point = filtered[index];
                      return Container(
                        margin: const EdgeInsets.only(bottom: 14),
                        padding: const EdgeInsets.all(18),
                        decoration: BoxDecoration(
                          color: AppColors.bgCard,
                          borderRadius: BorderRadius.circular(20),
                          border: Border.all(color: AppColors.borderSubtle),
                        ),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Row(
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              children: [
                                Expanded(
                                  child: Text(
                                    point.name,
                                    style: const TextStyle(fontSize: 16, fontWeight: FontWeight.w800, color: AppColors.textWhite),
                                  ),
                                ),
                                Container(
                                  padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                                  decoration: BoxDecoration(
                                    color: AppColors.emeraldPrimary.withValues(alpha: 0.2),
                                    borderRadius: BorderRadius.circular(8),
                                  ),
                                  child: Text(
                                    point.type.toUpperCase().replaceAll('_', ' '),
                                    style: const TextStyle(fontSize: 9, fontWeight: FontWeight.bold, color: AppColors.goldPrimary),
                                  ),
                                ),
                              ],
                            ),
                            const SizedBox(height: 4),
                            Text(point.arabicName, style: const TextStyle(fontSize: 13, fontWeight: FontWeight.bold, color: AppColors.goldLight)),
                            const SizedBox(height: 8),
                            Text(point.description, style: const TextStyle(fontSize: 12, color: AppColors.emeraldSubtle, height: 1.4)),
                            const SizedBox(height: 12),
                            Row(
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              children: [
                                Row(
                                  children: [
                                    const Icon(Icons.location_on, size: 14, color: AppColors.goldPrimary),
                                    const SizedBox(width: 4),
                                    Text('${point.city}, ${point.country}', style: const TextStyle(fontSize: 11, color: AppColors.textWhite)),
                                  ],
                                ),
                                ElevatedButton.icon(
                                  style: ElevatedButton.styleFrom(
                                    backgroundColor: AppColors.goldPrimary,
                                    foregroundColor: AppColors.bgDark,
                                    padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
                                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
                                  ),
                                  icon: const Icon(Icons.directions, size: 16),
                                  label: const Text('Directions', style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold)),
                                  onPressed: () => _launchMaps(point.latitude, point.longitude),
                                ),
                              ],
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

  Widget _filterChip(String id, String label) {
    final isSelected = _selectedFilter == id;
    return ChoiceChip(
      label: Text(label),
      selected: isSelected,
      onSelected: (val) {
        if (val) setState(() => _selectedFilter = id);
      },
      backgroundColor: AppColors.bgCard,
      selectedColor: AppColors.goldPrimary,
      labelStyle: TextStyle(
        fontSize: 11,
        fontWeight: isSelected ? FontWeight.w800 : FontWeight.w500,
        color: isSelected ? AppColors.bgDark : AppColors.textWhite,
      ),
      side: BorderSide(color: isSelected ? AppColors.goldPrimary : AppColors.borderSubtle),
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
      showCheckmark: false,
    );
  }
}
