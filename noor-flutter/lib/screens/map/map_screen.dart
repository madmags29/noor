// ============================================================
// NOOR — Global Mosques & Halal Map Screen (Flutter)
// Dynamic GPS Proximity Sorting & Nearest Mosque Locator
// ============================================================

import 'package:flutter/material.dart';
import 'package:geolocator/geolocator.dart';
import 'package:url_launcher/url_launcher.dart';
import '../../theme/app_theme.dart';
import '../../l10n/app_localizations.dart';
import '../../data/map_data.dart';
import '../../services/location_service.dart';

class MapScreen extends StatefulWidget {
  const MapScreen({super.key});

  @override
  State<MapScreen> createState() => _MapScreenState();
}

class _MapScreenState extends State<MapScreen> {
  String _selectedFilter = 'all'; // 'all', 'holy_site', 'mosque'
  String _searchQuery = '';
  double? _userLat;
  double? _userLng;
  String _userArea = 'Detecting location...';
  bool _isLoadingLocation = true;

  @override
  void initState() {
    super.initState();
    _initUserLocation();
  }

  Future<void> _initUserLocation() async {
    try {
      final saved = await LocationService.getSavedLocation();
      if (saved != null) {
        if (mounted) {
          setState(() {
            _userLat = saved.lat;
            _userLng = saved.lng;
            _userArea = saved.city.isNotEmpty ? '${saved.city}, ${saved.country}' : 'Current Location';
            _isLoadingLocation = false;
          });
        }
      }

      // Check live GPS
      final permission = await Geolocator.checkPermission();
      if (permission == LocationPermission.always || permission == LocationPermission.whileInUse) {
        final pos = await Geolocator.getCurrentPosition(
          desiredAccuracy: LocationAccuracy.medium,
          timeLimit: const Duration(seconds: 4),
        );
        if (mounted) {
          setState(() {
            _userLat = pos.latitude;
            _userLng = pos.longitude;
            _isLoadingLocation = false;
          });
        }
      }
    } catch (_) {
      // Fallback
    } finally {
      if (mounted && _isLoadingLocation) {
        setState(() => _isLoadingLocation = false);
      }
    }
  }

  double? _calculateDistanceKm(double targetLat, double targetLng) {
    if (_userLat == null || _userLng == null) return null;
    final meters = Geolocator.distanceBetween(_userLat!, _userLng!, targetLat, targetLng);
    return meters / 1000.0;
  }

  String _formatDistance(double? km) {
    if (km == null) return '';
    if (km < 1.0) {
      return '${(km * 1000).toInt()} m away';
    } else if (km < 100) {
      return '${km.toStringAsFixed(1)} km away';
    } else {
      return '${km.toStringAsFixed(0)} km away';
    }
  }

  Future<void> _launchMaps(double lat, double lng) async {
    final uri = Uri.parse('https://www.google.com/maps/dir/?api=1&destination=$lat,$lng');
    if (await canLaunchUrl(uri)) {
      await launchUrl(uri, mode: LaunchMode.externalApplication);
    }
  }

  Future<void> _launchLocalMosquesSearch() async {
    final query = (_userLat != null && _userLng != null)
        ? 'https://www.google.com/maps/search/mosque/@$_userLat,$_userLng,14z'
        : 'https://www.google.com/maps/search/?api=1&query=mosque+near+me';
    final uri = Uri.parse(query);
    if (await canLaunchUrl(uri)) {
      await launchUrl(uri, mode: LaunchMode.externalApplication);
    }
  }

  @override
  Widget build(BuildContext context) {
    final t = AppLocalizations.of(context)!;

    // Filter points
    var list = kIslamicMapPoints.where((p) {
      final matchType = _selectedFilter == 'all' || p.type == _selectedFilter;
      final clean = _searchQuery.trim().toLowerCase();
      final matchSearch = clean.isEmpty ||
          p.name.toLowerCase().contains(clean) ||
          p.city.toLowerCase().contains(clean) ||
          p.country.toLowerCase().contains(clean) ||
          p.arabicName.contains(clean);
      return matchType && matchSearch;
    }).toList();

    // Sort by proximity if user location is available
    if (_userLat != null && _userLng != null) {
      list.sort((a, b) {
        final distA = Geolocator.distanceBetween(_userLat!, _userLng!, a.latitude, a.longitude);
        final distB = Geolocator.distanceBetween(_userLat!, _userLng!, b.latitude, b.longitude);
        return distA.compareTo(distB);
      });
    }

    final IslamicMapPoint? nearestMosque = list.isNotEmpty ? list.first : null;
    final double? nearestDistKm = nearestMosque != null
        ? _calculateDistanceKm(nearestMosque.latitude, nearestMosque.longitude)
        : null;

    return Scaffold(
      backgroundColor: AppColors.bgDark,
      appBar: AppBar(
        backgroundColor: AppColors.bgDark,
        elevation: 0,
        title: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(t.map, style: const TextStyle(fontWeight: FontWeight.w900, fontSize: 20, color: AppColors.textWhite)),
            Text(
              _userLat != null ? 'Nearest Mosques • $_userArea' : 'Global Mosques & Sanctuaries',
              style: const TextStyle(fontSize: 11, color: AppColors.emeraldSubtle),
            ),
          ],
        ),
        iconTheme: const IconThemeData(color: AppColors.goldPrimary),
        actions: [
          IconButton(
            tooltip: 'Find Local Mosques (Google Maps)',
            icon: const Icon(Icons.my_location, color: AppColors.goldPrimary),
            onPressed: _launchLocalMosquesSearch,
          ),
        ],
      ),
      body: Column(
        children: [
          // Nearest Mosque Hero Banner
          if (nearestMosque != null && nearestDistKm != null)
            Container(
              margin: const EdgeInsets.fromLTRB(16, 6, 16, 10),
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                gradient: LinearGradient(
                  colors: [
                    AppColors.emeraldPrimary.withValues(alpha: 0.25),
                    AppColors.bgCard,
                  ],
                  begin: Alignment.topLeft,
                  end: Alignment.bottomRight,
                ),
                borderRadius: BorderRadius.circular(20),
                border: Border.all(color: AppColors.goldPrimary.withValues(alpha: 0.4)),
                boxShadow: [
                  BoxShadow(
                    color: AppColors.emeraldPrimary.withValues(alpha: 0.15),
                    blurRadius: 16,
                    offset: const Offset(0, 4),
                  ),
                ],
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                        decoration: BoxDecoration(
                          color: AppColors.goldPrimary,
                          borderRadius: BorderRadius.circular(12),
                        ),
                        child: const Row(
                          children: [
                            Icon(Icons.near_me, size: 12, color: AppColors.bgDark),
                            SizedBox(width: 4),
                            Text(
                              'NEAREST MOSQUE TO YOU',
                              style: TextStyle(fontSize: 10, fontWeight: FontWeight.w900, color: AppColors.bgDark),
                            ),
                          ],
                        ),
                      ),
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                        decoration: BoxDecoration(
                          color: AppColors.bgDark,
                          borderRadius: BorderRadius.circular(10),
                          border: Border.all(color: AppColors.borderSubtle),
                        ),
                        child: Text(
                          _formatDistance(nearestDistKm),
                          style: const TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: AppColors.goldLight),
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 10),
                  Text(
                    nearestMosque.name,
                    style: const TextStyle(fontSize: 17, fontWeight: FontWeight.w900, color: AppColors.textWhite),
                  ),
                  const SizedBox(height: 2),
                  Text(
                    '${nearestMosque.city}, ${nearestMosque.country}',
                    style: const TextStyle(fontSize: 12, color: AppColors.emeraldSubtle),
                  ),
                  const SizedBox(height: 12),
                  Row(
                    children: [
                      Expanded(
                        child: ElevatedButton.icon(
                          style: ElevatedButton.styleFrom(
                            backgroundColor: AppColors.goldPrimary,
                            foregroundColor: AppColors.bgDark,
                            padding: const EdgeInsets.symmetric(vertical: 10),
                            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                          ),
                          icon: const Icon(Icons.navigation, size: 16),
                          label: const Text('Directions (Maps)', style: TextStyle(fontSize: 12, fontWeight: FontWeight.w800)),
                          onPressed: () => _launchMaps(nearestMosque.latitude, nearestMosque.longitude),
                        ),
                      ),
                      const SizedBox(width: 8),
                      OutlinedButton.icon(
                        style: OutlinedButton.styleFrom(
                          foregroundColor: AppColors.goldLight,
                          side: const BorderSide(color: AppColors.borderSubtle),
                          padding: const EdgeInsets.symmetric(vertical: 10, horizontal: 12),
                          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                        ),
                        icon: const Icon(Icons.radar, size: 16, color: AppColors.goldPrimary),
                        label: const Text('Nearby Radar', style: TextStyle(fontSize: 12, fontWeight: FontWeight.w700)),
                        onPressed: _launchLocalMosquesSearch,
                      ),
                    ],
                  ),
                ],
              ),
            ),

          // Search Box
          Padding(
            padding: const EdgeInsets.fromLTRB(16, 4, 16, 6),
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
                  hintText: 'Search mosques by name, city or country...',
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
                _filterChip('all', 'All Locations (${list.length})'),
                const SizedBox(width: 8),
                _filterChip('mosque', 'Mosques'),
                const SizedBox(width: 8),
                _filterChip('holy_site', 'Holy Sanctuaries'),
              ],
            ),
          ),

          // Points List
          Expanded(
            child: list.isEmpty
                ? const Center(child: Text('No locations found', style: TextStyle(color: AppColors.emeraldSubtle)))
                : ListView.builder(
                    padding: const EdgeInsets.fromLTRB(16, 8, 16, 16),
                    itemCount: list.length,
                    itemBuilder: (context, index) {
                      final point = list[index];
                      final distKm = _calculateDistanceKm(point.latitude, point.longitude);
                      final isFirst = index == 0 && distKm != null;

                      return Container(
                        margin: const EdgeInsets.only(bottom: 14),
                        padding: const EdgeInsets.all(18),
                        decoration: BoxDecoration(
                          color: AppColors.bgCard,
                          borderRadius: BorderRadius.circular(20),
                          border: Border.all(
                            color: isFirst
                                ? AppColors.goldPrimary.withValues(alpha: 0.5)
                                : AppColors.borderSubtle,
                          ),
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
                                if (distKm != null)
                                  Container(
                                    padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                                    decoration: BoxDecoration(
                                      color: isFirst
                                          ? AppColors.goldPrimary
                                          : AppColors.emeraldPrimary.withValues(alpha: 0.2),
                                      borderRadius: BorderRadius.circular(8),
                                    ),
                                    child: Text(
                                      _formatDistance(distKm),
                                      style: TextStyle(
                                        fontSize: 10,
                                        fontWeight: FontWeight.bold,
                                        color: isFirst ? AppColors.bgDark : AppColors.goldPrimary,
                                      ),
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
