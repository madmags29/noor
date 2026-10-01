// ============================================================
// NOOR — Location Picker Modal (Flutter)
// Complete City Catalog, Live Search Filter & Instant Auto-Detect
// ============================================================

import 'package:flutter/material.dart';
import '../theme/app_theme.dart';
import '../services/location_service.dart';

class LocationPickerModal extends StatefulWidget {
  final MobileCity currentCity;
  final ValueChanged<MobileCity> onSelectCity;
  final VoidCallback onClose;

  const LocationPickerModal({
    super.key,
    required this.currentCity,
    required this.onSelectCity,
    required this.onClose,
  });

  @override
  State<LocationPickerModal> createState() => _LocationPickerModalState();
}

class _LocationPickerModalState extends State<LocationPickerModal> {
  String _search = '';
  bool _isDetecting = false;

  Future<void> _handleAutoDetect() async {
    setState(() => _isDetecting = true);
    try {
      final detected = await LocationService.detectLocation();
      widget.onSelectCity(detected);
    } catch (_) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Could not detect location. Please select a city.')),
        );
      }
    } finally {
      if (mounted) {
        setState(() => _isDetecting = false);
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    final filtered = kWorldCities.where((c) {
      final q = _search.toLowerCase();
      return c.city.toLowerCase().contains(q) ||
          c.country.toLowerCase().contains(q);
    }).toList();

    return GestureDetector(
      behavior: HitTestBehavior.opaque,
      onTap: widget.onClose,
      child: Container(
        color: const Color(0xCC000000),
        child: GestureDetector(
          onTap: () {},
          child: Align(
            alignment: Alignment.bottomCenter,
            child: Container(
              height: MediaQuery.of(context).size.height * 0.72,
              margin: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: const Color(0xFF031D16),
                borderRadius: BorderRadius.circular(28),
                border: Border.all(color: const Color(0xFF34D399).withValues(alpha: 0.4)),
                boxShadow: const [
                  BoxShadow(
                    color: Colors.black87,
                    blurRadius: 30,
                    spreadRadius: 4,
                  ),
                ],
              ),
              child: Column(
                children: [
                  // Top Header
                  Padding(
                    padding: const EdgeInsets.fromLTRB(20, 18, 20, 12),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Row(
                          children: [
                            Container(
                              padding: const EdgeInsets.all(8),
                              decoration: BoxDecoration(
                                color: const Color(0xFF064E3B),
                                borderRadius: BorderRadius.circular(12),
                                border: Border.all(
                                  color: const Color(0xFF10B981).withValues(alpha: 0.3),
                                ),
                              ),
                              child: const Icon(
                                Icons.location_on,
                                size: 18,
                                color: Color(0xFFF59E0B),
                              ),
                            ),
                            const SizedBox(width: 12),
                            const Text(
                              'Select City',
                              style: TextStyle(
                                fontSize: 18,
                                fontWeight: FontWeight.w800,
                                color: Colors.white,
                              ),
                            ),
                          ],
                        ),
                        GestureDetector(
                          onTap: widget.onClose,
                          child: Container(
                            padding: const EdgeInsets.all(6),
                            decoration: BoxDecoration(
                              color: const Color(0x1AFFFFFF),
                              borderRadius: BorderRadius.circular(10),
                            ),
                            child: const Icon(
                              Icons.close,
                              size: 18,
                              color: Color(0xFF94A3B8),
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),

                  // Auto Detect Button (Instant GPS / IP Geolocation)
                  Padding(
                    padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 4),
                    child: GestureDetector(
                      onTap: _isDetecting ? null : _handleAutoDetect,
                      child: Container(
                        padding: const EdgeInsets.symmetric(vertical: 13, horizontal: 16),
                        decoration: BoxDecoration(
                          gradient: const LinearGradient(
                            colors: [Color(0xFF065F46), Color(0xFF047857)],
                          ),
                          borderRadius: BorderRadius.circular(16),
                          border: Border.all(
                            color: const Color(0xFF34D399).withValues(alpha: 0.5),
                          ),
                          boxShadow: [
                            BoxShadow(
                              color: const Color(0xFF059669).withValues(alpha: 0.3),
                              blurRadius: 10,
                              offset: const Offset(0, 2),
                            ),
                          ],
                        ),
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            if (_isDetecting)
                              const SizedBox(
                                width: 16,
                                height: 16,
                                child: CircularProgressIndicator(
                                  strokeWidth: 2,
                                  color: Colors.white,
                                ),
                              )
                            else
                              const Icon(Icons.my_location, size: 18, color: Colors.white),
                            const SizedBox(width: 10),
                            Text(
                              _isDetecting
                                  ? 'Detecting Location...'
                                  : 'Auto-Detect Current Location',
                              style: const TextStyle(
                                fontSize: 14,
                                fontWeight: FontWeight.w700,
                                color: Colors.white,
                              ),
                            ),
                          ],
                        ),
                      ),
                    ),
                  ),

                  // Search Bar
                  Padding(
                    padding: const EdgeInsets.fromLTRB(16, 10, 16, 12),
                    child: TextField(
                      onChanged: (v) => setState(() => _search = v),
                      style: const TextStyle(color: Colors.white, fontSize: 14),
                      decoration: InputDecoration(
                        hintText: 'Search 30+ worldwide cities...',
                        prefixIcon: const Icon(Icons.search, size: 20, color: AppColors.goldPrimary),
                        suffixIcon: _search.isNotEmpty
                            ? IconButton(
                                icon: const Icon(Icons.clear, size: 18, color: AppColors.emeraldSubtle),
                                onPressed: () => setState(() => _search = ''),
                              )
                            : null,
                      ),
                    ),
                  ),

                  const Divider(color: Color(0xFF064E3B), height: 1),

                  // City List
                  Expanded(
                    child: ListView.separated(
                      padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
                      itemCount: filtered.length,
                      separatorBuilder: (_, __) => const SizedBox(height: 6),
                      itemBuilder: (context, index) {
                        final city = filtered[index];
                        final isSelected = city.city.toLowerCase() ==
                            widget.currentCity.city.toLowerCase();

                        return GestureDetector(
                          onTap: () {
                            widget.onSelectCity(city);
                          },
                          child: Container(
                            padding: const EdgeInsets.symmetric(
                              horizontal: 16,
                              vertical: 12,
                            ),
                            decoration: BoxDecoration(
                              color: isSelected
                                  ? const Color(0x1AF59E0B)
                                  : const Color(0x0AFFFFFF),
                              borderRadius: BorderRadius.circular(16),
                              border: Border.all(
                                color: isSelected
                                    ? const Color(0xFFF59E0B)
                                    : const Color(0xFF064E3B).withValues(alpha: 0.5),
                              ),
                            ),
                            child: Row(
                              children: [
                                Container(
                                  width: 38,
                                  height: 38,
                                  decoration: BoxDecoration(
                                    color: isSelected
                                        ? const Color(0xFFF59E0B).withValues(alpha: 0.2)
                                        : const Color(0xFF064E3B),
                                    shape: BoxShape.circle,
                                  ),
                                  child: Icon(
                                    Icons.mosque,
                                    size: 18,
                                    color: isSelected
                                        ? const Color(0xFFF59E0B)
                                        : const Color(0xFF10B981),
                                  ),
                                ),
                                const SizedBox(width: 14),
                                Expanded(
                                  child: Column(
                                    crossAxisAlignment: CrossAxisAlignment.start,
                                    children: [
                                      Text(
                                        city.city,
                                        style: TextStyle(
                                          fontSize: 15,
                                          fontWeight: FontWeight.w700,
                                          color: isSelected
                                              ? const Color(0xFFF59E0B)
                                              : Colors.white,
                                        ),
                                      ),
                                      const SizedBox(height: 2),
                                      Text(
                                        city.country,
                                        style: const TextStyle(
                                          fontSize: 12,
                                          color: Color(0xFF6EE7B7),
                                        ),
                                      ),
                                    ],
                                  ),
                                ),
                                if (isSelected)
                                  const Icon(
                                    Icons.check_circle,
                                    size: 20,
                                    color: Color(0xFFF59E0B),
                                  ),
                              ],
                            ),
                          ),
                        );
                      },
                    ),
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}