// ============================================================
// NOOR — Precision Qibla Compass Modal (Flutter)
// Spherical Great-Circle Kaaba Bearing, Live Sensor Stream &
// Fallback Compass Dial with Alignment Haptics
// ============================================================

import 'dart:async';
import 'dart:math' as math;
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_compass/flutter_compass.dart';
import '../theme/app_theme.dart';
import '../services/location_service.dart';

class QiblaModal extends StatefulWidget {
  final String cityName;
  final String countryName;
  final double? lat;
  final double? lng;
  final VoidCallback onClose;

  const QiblaModal({
    super.key,
    required this.cityName,
    required this.countryName,
    this.lat,
    this.lng,
    required this.onClose,
  });

  @override
  State<QiblaModal> createState() => _QiblaModalState();
}

class _QiblaModalState extends State<QiblaModal> with SingleTickerProviderStateMixin {
  late MobileCity _activeCity;
  double _deviceHeading = 0.0;
  bool _hasCompassSensor = false;
  StreamSubscription<CompassEvent>? _compassSubscription;
  bool _hasTriggeredAlignmentHaptic = false;

  @override
  void initState() {
    super.initState();
    // Match city coordinates from popular cities or default to Makkah / city params
    if (widget.lat != null && widget.lng != null) {
      _activeCity = MobileCity(
        city: widget.cityName,
        country: widget.countryName,
        lat: widget.lat!,
        lng: widget.lng!,
      );
    } else {
      final found = kWorldCities.firstWhere(
        (c) => c.city.toLowerCase() == widget.cityName.toLowerCase(),
        orElse: () => MobileCity(
          city: widget.cityName,
          country: widget.countryName,
          lat: 28.6139,
          lng: 77.2090, // default New Delhi if unknown
          utcOffset: 5.5,
        ),
      );
      _activeCity = found;
    }

    _initCompass();
  }

  void _initCompass() {
    try {
      _compassSubscription = FlutterCompass.events?.listen((event) {
        if (event.heading != null && mounted) {
          setState(() {
            _deviceHeading = event.heading!;
            _hasCompassSensor = true;
          });

          // Check Kaaba alignment
          final q = _calculateQiblaBearing(_activeCity.lat, _activeCity.lng);
          final bearing = q['bearing']!;
          final relAngle = ((bearing - _deviceHeading + 360) % 360);
          final isAligned = relAngle <= 4 || relAngle >= 356;

          if (isAligned && !_hasTriggeredAlignmentHaptic) {
            HapticFeedback.mediumImpact();
            _hasTriggeredAlignmentHaptic = true;
          } else if (!isAligned) {
            _hasTriggeredAlignmentHaptic = false;
          }
        }
      });
    } catch (_) {
      _hasCompassSensor = false;
    }
  }

  @override
  void dispose() {
    _compassSubscription?.cancel();
    super.dispose();
  }

  // ── Spherical Great Circle Trigonometry ────────────────────
  static Map<String, double> _calculateQiblaBearing(double lat, double lng) {
    const kaabaLat = 21.422487 * math.pi / 180.0;
    const kaabaLng = 39.826206 * math.pi / 180.0;
    final phi = lat * math.pi / 180.0;
    final lambda = lng * math.pi / 180.0;
    final dLng = kaabaLng - lambda;

    final y = math.sin(dLng) * math.cos(kaabaLat);
    final x = math.cos(phi) * math.sin(kaabaLat) -
        math.sin(phi) * math.cos(kaabaLat) * math.cos(dLng);
    final psi = math.atan2(y, x);
    final bearing = ((psi * 180.0 / math.pi + 360.0) % 360.0);

    // Haversine distance
    const R = 6371.0;
    final dLat = kaabaLat - phi;
    final a = math.sin(dLat / 2) * math.sin(dLat / 2) +
        math.cos(phi) * math.cos(kaabaLat) * math.sin(dLng / 2) * math.sin(dLng / 2);
    final c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a));
    final distKm = R * c;

    return {
      'bearing': (bearing * 10).round() / 10.0,
      'distKm': distKm.roundToDouble(),
    };
  }

  String _getCardinal(double deg) {
    const directions = [
      'N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE',
      'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'
    ];
    final idx = ((deg / 22.5).round()) % 16;
    return directions[idx];
  }

  @override
  Widget build(BuildContext context) {
    final q = _calculateQiblaBearing(_activeCity.lat, _activeCity.lng);
    final bearing = q['bearing']!;
    final distKm = q['distKm']!;

    // Relative angle: Kaaba direction relative to top of device
    final relAngle = ((bearing - _deviceHeading + 360) % 360);
    final isAligned = relAngle <= 4 || relAngle >= 356;

    final size = MediaQuery.of(context).size;

    return Stack(
      children: [
        // Backdrop overlay
        GestureDetector(
          behavior: HitTestBehavior.opaque,
          onTap: widget.onClose,
          child: Container(
            width: double.infinity,
            height: double.infinity,
            color: Colors.black.withOpacity(0.75),
          ),
        ),

        // Centered Modal
        Center(
          child: Container(
            width: (size.width * 0.92).clamp(320.0, 420.0),
            constraints: BoxConstraints(maxHeight: size.height * 0.88),
            margin: const EdgeInsets.symmetric(horizontal: 16),
            padding: const EdgeInsets.all(20),
            decoration: BoxDecoration(
              color: const Color(0xFF031D16),
              borderRadius: BorderRadius.circular(28),
              border: Border.all(
                color: isAligned ? const Color(0xFF10B981) : const Color(0xFFF59E0B).withOpacity(0.5),
                width: isAligned ? 2.0 : 1.2,
              ),
              boxShadow: [
                BoxShadow(
                  color: isAligned
                      ? const Color(0xFF10B981).withOpacity(0.3)
                      : const Color(0xFFF59E0B).withOpacity(0.2),
                  blurRadius: 28,
                  spreadRadius: 2,
                ),
              ],
            ),
            child: SingleChildScrollView(
              physics: const BouncingScrollPhysics(),
              child: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  // Header
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Row(
                        children: [
                          Container(
                            padding: const EdgeInsets.all(6),
                            decoration: BoxDecoration(
                              color: const Color(0x26F59E0B),
                              borderRadius: BorderRadius.circular(10),
                            ),
                            child: const Icon(Icons.explore, size: 20, color: AppColors.goldPrimary),
                          ),
                          const SizedBox(width: 10),
                          const Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(
                                "Qibla Direction",
                                style: TextStyle(
                                  fontSize: 17,
                                  fontWeight: FontWeight.w900,
                                  color: AppColors.textWhite,
                                ),
                              ),
                              Text(
                                "Great-Circle Kaaba Bearing",
                                style: TextStyle(fontSize: 10.5, color: AppColors.emeraldSubtle),
                              ),
                            ],
                          ),
                        ],
                      ),
                      GestureDetector(
                        onTap: widget.onClose,
                        child: Container(
                          padding: const EdgeInsets.all(6),
                          decoration: BoxDecoration(
                            color: Colors.white.withOpacity(0.08),
                            shape: BoxShape.circle,
                          ),
                          child: const Icon(Icons.close, color: AppColors.textMuted, size: 18),
                        ),
                      ),
                    ],
                  ),

                  const SizedBox(height: 16),

                  // Alignment Badge
                  Container(
                    width: double.infinity,
                    padding: const EdgeInsets.symmetric(vertical: 8, horizontal: 12),
                    decoration: BoxDecoration(
                      color: isAligned ? const Color(0x3310B981) : const Color(0x1AF59E0B),
                      borderRadius: BorderRadius.circular(14),
                      border: Border.all(
                        color: isAligned ? const Color(0xFF10B981) : const Color(0x40F59E0B),
                      ),
                    ),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Text(
                          isAligned ? "🕋" : "🧭",
                          style: const TextStyle(fontSize: 16),
                        ),
                        const SizedBox(width: 8),
                        Text(
                          isAligned
                              ? "ALIGNED WITH KAABA — FACE THIS WAY"
                              : _hasCompassSensor
                                  ? "Rotate phone to align needle with Kaaba"
                                  : "Target Kaaba Heading: ${bearing.toStringAsFixed(1)}° (${_getCardinal(bearing)})",
                          style: TextStyle(
                            fontSize: 11,
                            fontWeight: FontWeight.w800,
                            color: isAligned ? const Color(0xFF34D399) : AppColors.goldLight,
                            letterSpacing: 0.3,
                          ),
                        ),
                      ],
                    ),
                  ),

                  const SizedBox(height: 20),

                  // ── Luxury Compass Dial ──────────────────────────────
                  SizedBox(
                    width: 220,
                    height: 220,
                    child: Stack(
                      alignment: Alignment.center,
                      children: [
                        // Outer Glowing Ring
                        Container(
                          width: 220,
                          height: 220,
                          decoration: BoxDecoration(
                            shape: BoxShape.circle,
                            gradient: RadialGradient(
                              colors: [
                                const Color(0xFF021711),
                                const Color(0xFF052B20),
                                isAligned ? const Color(0xFF065F46) : const Color(0xFF1F2937),
                              ],
                            ),
                            border: Border.all(
                              color: isAligned ? const Color(0xFF10B981) : const Color(0xFFF59E0B),
                              width: 2,
                            ),
                            boxShadow: [
                              BoxShadow(
                                color: isAligned
                                    ? const Color(0xFF10B981).withOpacity(0.35)
                                    : const Color(0xFFF59E0B).withOpacity(0.2),
                                blurRadius: 18,
                              ),
                            ],
                          ),
                        ),

                        // Compass Rose Dial (rotates with device heading)
                        Transform.rotate(
                          angle: -_deviceHeading * math.pi / 180.0,
                          child: Stack(
                            alignment: Alignment.center,
                            children: [
                              // Degree Tick Marks
                              CustomPaint(
                                size: const Size(200, 200),
                                painter: _CompassTicksPainter(),
                              ),
                              // Cardinal Points
                              const Positioned(
                                top: 10,
                                child: Text(
                                  "N",
                                  style: TextStyle(
                                    fontSize: 14,
                                    fontWeight: FontWeight.w900,
                                    color: Color(0xFFEF4444),
                                  ),
                                ),
                              ),
                              const Positioned(
                                bottom: 10,
                                child: Text(
                                  "S",
                                  style: TextStyle(
                                    fontSize: 12,
                                    fontWeight: FontWeight.w800,
                                    color: AppColors.textMuted,
                                  ),
                                ),
                              ),
                              const Positioned(
                                right: 12,
                                child: Text(
                                  "E",
                                  style: TextStyle(
                                    fontSize: 12,
                                    fontWeight: FontWeight.w800,
                                    color: AppColors.textMuted,
                                  ),
                                ),
                              ),
                              const Positioned(
                                left: 12,
                                child: Text(
                                  "W",
                                  style: TextStyle(
                                    fontSize: 12,
                                    fontWeight: FontWeight.w800,
                                    color: AppColors.textMuted,
                                  ),
                                ),
                              ),
                            ],
                          ),
                        ),

                        // Kaaba Direction Needle (Points to Makkah)
                        Transform.rotate(
                          angle: (_hasCompassSensor ? relAngle : bearing) * math.pi / 180.0,
                          child: Column(
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: [
                              // Golden Kaaba Indicator
                              Container(
                                padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 3),
                                decoration: BoxDecoration(
                                  color: const Color(0xFF010E0A),
                                  borderRadius: BorderRadius.circular(8),
                                  border: Border.all(
                                    color: isAligned ? const Color(0xFF10B981) : AppColors.goldPrimary,
                                    width: 1.5,
                                  ),
                                  boxShadow: const [
                                    BoxShadow(
                                      color: Colors.black54,
                                      blurRadius: 6,
                                    ),
                                  ],
                                ),
                                child: const Row(
                                  mainAxisSize: MainAxisSize.min,
                                  children: [
                                    Text("🕋", style: TextStyle(fontSize: 14)),
                                    SizedBox(width: 3),
                                    Text(
                                      "KAABA",
                                      style: TextStyle(
                                        fontSize: 8.5,
                                        fontWeight: FontWeight.w900,
                                        color: AppColors.goldLight,
                                      ),
                                    ),
                                  ],
                                ),
                              ),
                              const Icon(
                                Icons.navigation,
                                size: 52,
                                color: AppColors.goldPrimary,
                              ),
                              const SizedBox(height: 60), // offset needle upward
                            ],
                          ),
                        ),

                        // Center Pivot Jewel
                        Container(
                          width: 16,
                          height: 16,
                          decoration: BoxDecoration(
                            shape: BoxShape.circle,
                            color: isAligned ? const Color(0xFF10B981) : AppColors.goldPrimary,
                            border: Border.all(color: Colors.white, width: 2),
                          ),
                        ),
                      ],
                    ),
                  ),

                  const SizedBox(height: 20),

                  // ── Stats Cards ──────────────────────────────────────
                  Row(
                    children: [
                      // Bearing
                      Expanded(
                        child: Container(
                          padding: const EdgeInsets.symmetric(vertical: 10, horizontal: 8),
                          decoration: BoxDecoration(
                            color: const Color(0xFF02140E),
                            borderRadius: BorderRadius.circular(16),
                            border: Border.all(color: const Color(0x3334D399)),
                          ),
                          child: Column(
                            children: [
                              const Text(
                                "QIBLA BEARING",
                                style: TextStyle(
                                  fontSize: 9,
                                  fontWeight: FontWeight.w800,
                                  color: AppColors.emeraldSubtle,
                                  letterSpacing: 0.5,
                                ),
                              ),
                              const SizedBox(height: 2),
                              Text(
                                "${bearing.toStringAsFixed(1)}°",
                                style: const TextStyle(
                                  fontSize: 20,
                                  fontWeight: FontWeight.w900,
                                  color: AppColors.goldPrimary,
                                ),
                              ),
                              Text(
                                "${_getCardinal(bearing)} (from True North)",
                                style: const TextStyle(
                                  fontSize: 9.5,
                                  color: AppColors.textMuted,
                                ),
                              ),
                            ],
                          ),
                        ),
                      ),
                      const SizedBox(width: 8),
                      // Distance
                      Expanded(
                        child: Container(
                          padding: const EdgeInsets.symmetric(vertical: 10, horizontal: 8),
                          decoration: BoxDecoration(
                            color: const Color(0xFF02140E),
                            borderRadius: BorderRadius.circular(16),
                            border: Border.all(color: const Color(0x3334D399)),
                          ),
                          child: Column(
                            children: [
                              const Text(
                                "DISTANCE TO KAABA",
                                style: TextStyle(
                                  fontSize: 9,
                                  fontWeight: FontWeight.w800,
                                  color: AppColors.emeraldSubtle,
                                  letterSpacing: 0.5,
                                ),
                              ),
                              const SizedBox(height: 2),
                              Text(
                                "${distKm.toInt().toString().replaceAllMapped(RegExp(r'(\d{1,3})(?=(\d{3})+(?!\d))'), (m) => '${m[1]},')} km",
                                style: const TextStyle(
                                  fontSize: 18,
                                  fontWeight: FontWeight.w900,
                                  color: AppColors.textWhite,
                                ),
                              ),
                              const Text(
                                "Direct Great-Circle",
                                style: TextStyle(
                                  fontSize: 9.5,
                                  color: AppColors.textMuted,
                                ),
                              ),
                            ],
                          ),
                        ),
                      ),
                    ],
                  ),

                  const SizedBox(height: 12),

                  // Location Switcher Pill
                  Container(
                    width: double.infinity,
                    padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 7),
                    decoration: BoxDecoration(
                      color: const Color(0x14F59E0B),
                      borderRadius: BorderRadius.circular(14),
                      border: Border.all(color: const Color(0x40F59E0B)),
                    ),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Row(
                          children: [
                            const Icon(Icons.location_on, size: 14, color: AppColors.goldPrimary),
                            const SizedBox(width: 6),
                            Text(
                              "${_activeCity.city}, ${_activeCity.country}",
                              style: const TextStyle(
                                fontSize: 11.5,
                                fontWeight: FontWeight.w700,
                                color: AppColors.textWhite,
                              ),
                            ),
                          ],
                        ),
                        PopupMenuButton<MobileCity>(
                          tooltip: "Change City",
                          color: const Color(0xFF021711),
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(16),
                            side: const BorderSide(color: Color(0x3334D399)),
                          ),
                          onSelected: (city) => setState(() => _activeCity = city),
                          itemBuilder: (context) => kWorldCities
                              .map(
                                (c) => PopupMenuItem<MobileCity>(
                                  value: c,
                                  child: Text(
                                    "${c.city}, ${c.country}",
                                    style: const TextStyle(
                                      fontSize: 12,
                                      fontWeight: FontWeight.w600,
                                      color: AppColors.textWhite,
                                    ),
                                  ),
                                ),
                              )
                              .toList(),
                          child: Container(
                            padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                            decoration: BoxDecoration(
                              color: AppColors.goldPrimary.withOpacity(0.2),
                              borderRadius: BorderRadius.circular(8),
                            ),
                            child: const Row(
                              children: [
                                Text(
                                  "Change",
                                  style: TextStyle(
                                    fontSize: 10,
                                    fontWeight: FontWeight.w800,
                                    color: AppColors.goldLight,
                                  ),
                                ),
                                Icon(Icons.arrow_drop_down, size: 14, color: AppColors.goldLight),
                              ],
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),
          ),
        ),
      ],
    );
  }
}

// ── Painter for Compass Dial Ticks ───────────────────────────
class _CompassTicksPainter extends CustomPainter {
  @override
  void paint(Canvas canvas, Size size) {
    final center = Offset(size.width / 2, size.height / 2);
    final radius = size.width / 2;
    final tickPaint = Paint()
      ..color = const Color(0x6634D399)
      ..strokeWidth = 1.0;

    final majorTickPaint = Paint()
      ..color = const Color(0xFFF59E0B)
      ..strokeWidth = 2.0;

    for (int i = 0; i < 360; i += 15) {
      final angle = i * math.pi / 180.0;
      final isMajor = i % 45 == 0;
      final tickLength = isMajor ? 10.0 : 5.0;

      final start = Offset(
        center.dx + (radius - tickLength) * math.sin(angle),
        center.dy - (radius - tickLength) * math.cos(angle),
      );
      final end = Offset(
        center.dx + radius * math.sin(angle),
        center.dy - radius * math.cos(angle),
      );

      canvas.drawLine(start, end, isMajor ? majorTickPaint : tickPaint);
    }
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => false;
}