// ============================================================
// NOOR — Animated Islamic Pre-Loader (Flutter)
// Rotating 8-Pointed Islamic Star (Rub al-Hizb) + Glowing Crescent
// ============================================================

import 'dart:math' as math;
import 'package:flutter/material.dart';
import '../theme/app_theme.dart';

class IslamicPreloader extends StatefulWidget {
  final double size;
  final String? message;
  final String? subMessage;
  final bool isFullScreen;

  const IslamicPreloader({
    super.key,
    this.size = 64,
    this.message,
    this.subMessage,
    this.isFullScreen = false,
  });

  const IslamicPreloader.compact({
    super.key,
    this.size = 40,
    this.message,
    this.subMessage,
  }) : isFullScreen = false;

  const IslamicPreloader.fullScreen({
    super.key,
    this.size = 80,
    this.message = 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
    this.subMessage = 'Loading Sacred Islamic Treasures...',
  }) : isFullScreen = true;

  @override
  State<IslamicPreloader> createState() => _IslamicPreloaderState();
}

class _IslamicPreloaderState extends State<IslamicPreloader>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: const Duration(seconds: 4),
    )..repeat();
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final preloader = AnimatedBuilder(
      animation: _controller,
      builder: (context, child) {
        final rotation = _controller.value * 2 * math.pi;
        final pulse = 0.88 + 0.12 * math.sin(_controller.value * 2 * math.pi);

        return Column(
          mainAxisSize: MainAxisSize.min,
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            SizedBox(
              width: widget.size,
              height: widget.size,
              child: Stack(
                alignment: Alignment.center,
                children: [
                  // Outer Glow Halo
                  Container(
                    width: widget.size * pulse,
                    height: widget.size * pulse,
                    decoration: BoxDecoration(
                      shape: BoxShape.circle,
                      boxShadow: [
                        BoxShadow(
                          color: AppColors.goldPrimary.withValues(alpha: 0.22),
                          blurRadius: widget.size * 0.4,
                          spreadRadius: widget.size * 0.05,
                        ),
                        BoxShadow(
                          color: AppColors.emeraldPrimary.withValues(alpha: 0.3),
                          blurRadius: widget.size * 0.6,
                        ),
                      ],
                    ),
                  ),

                  // Rotating Outer 8-Pointed Islamic Star (Square 1)
                  Transform.rotate(
                    angle: rotation,
                    child: Container(
                      width: widget.size * 0.78,
                      height: widget.size * 0.78,
                      decoration: BoxDecoration(
                        border: Border.all(
                          color: AppColors.goldPrimary.withValues(alpha: 0.55),
                          width: widget.size > 50 ? 2.0 : 1.5,
                        ),
                        borderRadius: BorderRadius.circular(widget.size * 0.1),
                      ),
                    ),
                  ),

                  // Rotating Interlocking Square 2 (45 degree offset)
                  Transform.rotate(
                    angle: rotation + (math.pi / 4),
                    child: Container(
                      width: widget.size * 0.78,
                      height: widget.size * 0.78,
                      decoration: BoxDecoration(
                        border: Border.all(
                          color: AppColors.emeraldLight.withValues(alpha: 0.65),
                          width: widget.size > 50 ? 2.0 : 1.5,
                        ),
                        borderRadius: BorderRadius.circular(widget.size * 0.1),
                      ),
                    ),
                  ),

                  // Inner Counter-Rotating Golden Ring
                  Transform.rotate(
                    angle: -rotation * 1.5,
                    child: Container(
                      width: widget.size * 0.54,
                      height: widget.size * 0.54,
                      decoration: BoxDecoration(
                        shape: BoxShape.circle,
                        border: Border.all(
                          color: AppColors.goldLight.withValues(alpha: 0.4),
                          width: 1.2,
                        ),
                      ),
                    ),
                  ),

                  // Center Pulsing Luminous Icon
                  Transform.scale(
                    scale: pulse,
                    child: Icon(
                      Icons.star,
                      size: widget.size * 0.32,
                      color: AppColors.goldPrimary,
                    ),
                  ),
                ],
              ),
            ),

            if (widget.message != null) ...[
              SizedBox(height: widget.size * 0.25),
              Text(
                widget.message!,
                textAlign: TextAlign.center,
                style: TextStyle(
                  fontSize: widget.isFullScreen ? 18 : 13,
                  fontWeight: FontWeight.w700,
                  color: AppColors.goldLight,
                  fontFamily: 'serif',
                  letterSpacing: 0.5,
                ),
              ),
            ],

            if (widget.subMessage != null) ...[
              const SizedBox(height: 6),
              Text(
                widget.subMessage!,
                textAlign: TextAlign.center,
                style: const TextStyle(
                  fontSize: 11,
                  fontWeight: FontWeight.w500,
                  color: AppColors.emeraldSubtle,
                ),
              ),
            ],
          ],
        );
      },
    );

    if (widget.isFullScreen) {
      return Scaffold(
        backgroundColor: AppColors.bgDark,
        body: Center(
          child: Padding(
            padding: const EdgeInsets.all(24),
            child: preloader,
          ),
        ),
      );
    }

    return Center(child: preloader);
  }
}
