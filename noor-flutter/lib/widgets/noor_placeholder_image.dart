import 'package:flutter/material.dart';
import '../theme/app_theme.dart';

class NoorPlaceholderImage extends StatelessWidget {
  final double? width;
  final double? height;
  const NoorPlaceholderImage({super.key, this.width, this.height});

  @override
  Widget build(BuildContext context) {
    return Container(
      width: width, height: height,
      decoration: BoxDecoration(color: AppColors.bgCard, borderRadius: BorderRadius.circular(12), border: Border.all(color: AppColors.borderSubtle)),
      child: const Center(child: Text("🕌", style: TextStyle(fontSize: 32))),
    );
  }
}