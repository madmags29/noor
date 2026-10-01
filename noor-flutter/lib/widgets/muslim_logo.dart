import 'package:flutter/material.dart';
import '../theme/app_theme.dart';

class MuslimLogo extends StatelessWidget {
  final double size;
  final bool showText;
  final bool compactText;
  final bool showSubtitle;

  const MuslimLogo({
    super.key,
    this.size = 34,
    this.showText = true,
    this.compactText = false,
    this.showSubtitle = true,
  });

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisSize: MainAxisSize.min,
      crossAxisAlignment: CrossAxisAlignment.center,
      children: [
        // Emblem with gold/emerald ring
        Container(
          width: size,
          height: size,
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(size * 0.28),
            boxShadow: [
              BoxShadow(
                color: const Color(0xFFF59E0B).withOpacity(0.35),
                blurRadius: size * 0.3,
                spreadRadius: 0.5,
              ),
            ],
            border: Border.all(
              color: const Color(0xFFF59E0B).withOpacity(0.6),
              width: 1.2,
            ),
          ),
          child: ClipRRect(
            borderRadius: BorderRadius.circular(size * 0.26),
            child: Image.asset(
              'assets/icon.png',
              width: size,
              height: size,
              fit: BoxFit.cover,
              errorBuilder: (context, error, stackTrace) => Container(
                decoration: const BoxDecoration(
                  gradient: LinearGradient(
                    colors: [Color(0xFF059669), Color(0xFF022C22)],
                    begin: Alignment.topLeft,
                    end: Alignment.bottomRight,
                  ),
                ),
                child: Center(
                  child: Text(
                    "🌙",
                    style: TextStyle(fontSize: size * 0.5),
                  ),
                ),
              ),
            ),
          ),
        ),
        if (showText) ...[
          const SizedBox(width: 9),
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            mainAxisSize: MainAxisSize.min,
            children: [
              Text(
                compactText ? "NOOR" : "NOOR-E-ILAHI",
                style: TextStyle(
                  fontSize: compactText ? (size * 0.48).clamp(13.0, 16.0) : (size * 0.42).clamp(12.0, 15.0),
                  fontWeight: FontWeight.w900,
                  color: AppColors.textWhite,
                  letterSpacing: 1.2,
                  height: 1.1,
                ),
              ),
              if (showSubtitle && !compactText)
                const Text(
                  "نور إلهي",
                  style: TextStyle(
                    fontSize: 11,
                    color: AppColors.goldLight,
                    fontWeight: FontWeight.w700,
                    letterSpacing: 0.5,
                    height: 1.1,
                  ),
                )
              else if (compactText)
                const Text(
                  "نور إلهي",
                  style: TextStyle(
                    fontSize: 9.5,
                    color: AppColors.goldLight,
                    fontWeight: FontWeight.w600,
                    height: 1.0,
                  ),
                ),
            ],
          ),
        ],
      ],
    );
  }
}