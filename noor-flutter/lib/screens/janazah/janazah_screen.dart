// ============================================================
// NOOR — Complete Janazah & Funeral Prayer Guide (Flutter)
// ============================================================

import 'package:flutter/material.dart';
import '../../theme/app_theme.dart';
import '../../l10n/app_localizations.dart';
import '../../data/islamic_core_data.dart';

class JanazahScreen extends StatelessWidget {
  const JanazahScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final t = AppLocalizations.of(context)!;

    return Scaffold(
      backgroundColor: AppColors.bgDark,
      appBar: AppBar(
        backgroundColor: AppColors.bgDark,
        title: Text(t.janazah, style: const TextStyle(fontWeight: FontWeight.w900, color: AppColors.textWhite)),
        iconTheme: const IconThemeData(color: AppColors.goldPrimary),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            // Virtue Card
            Container(
              padding: const EdgeInsets.all(18),
              decoration: BoxDecoration(
                gradient: const LinearGradient(
                  colors: [Color(0xFF064E3B), Color(0xFF0F172A)],
                  begin: Alignment.topLeft,
                  end: Alignment.bottomRight,
                ),
                borderRadius: BorderRadius.circular(20),
                border: Border.all(color: AppColors.goldPrimary.withValues(alpha: 0.3)),
              ),
              child: const Row(
                children: [
                  Icon(Icons.auto_awesome, color: AppColors.goldPrimary, size: 24),
                  SizedBox(width: 14),
                  Expanded(
                    child: Text(
                      'The Prophet ﷺ said: "Whoever attends the funeral until prayer is offered will receive one Qirat of reward (like Mount Uhud)." (Bukhari 1325)',
                      style: TextStyle(fontSize: 12, color: AppColors.textWhite, height: 1.5, fontWeight: FontWeight.w600),
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 20),

            Text(
              'Step-by-Step 4 Takbeers Prayer (Salat al-Janazah)',
              style: const TextStyle(fontSize: 16, fontWeight: FontWeight.w900, color: AppColors.goldPrimary),
            ),
            const SizedBox(height: 12),

            ...kJanazahSteps.map((step) => _buildStepCard(step)),

            const SizedBox(height: 20),
            _buildFuneralEtiquettes(),
          ],
        ),
      ),
    );
  }

  Widget _buildStepCard(JanazahStepItem step) {
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
            children: [
              Container(
                width: 32,
                height: 32,
                decoration: BoxDecoration(
                  color: AppColors.goldPrimary,
                  shape: BoxShape.circle,
                ),
                child: Center(
                  child: Text(
                    '${step.takbeerNumber}',
                    style: const TextStyle(fontSize: 13, fontWeight: FontWeight.w900, color: AppColors.bgDark),
                  ),
                ),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(step.title, style: const TextStyle(fontSize: 15, fontWeight: FontWeight.w800, color: AppColors.textWhite)),
                    Text(step.arabicTitle, style: const TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: AppColors.goldLight)),
                  ],
                ),
              ),
            ],
          ),
          const SizedBox(height: 12),
          Text(step.action, style: const TextStyle(fontSize: 12, color: AppColors.emeraldSubtle)),
          const SizedBox(height: 12),

          // Arabic recitation
          Container(
            padding: const EdgeInsets.all(14),
            decoration: BoxDecoration(
              color: AppColors.bgDark,
              borderRadius: BorderRadius.circular(14),
              border: Border.all(color: AppColors.goldPrimary.withValues(alpha: 0.3)),
            ),
            child: Text(
              step.arabicRecitation,
              textAlign: TextAlign.right,
              textDirection: TextDirection.rtl,
              style: const TextStyle(fontSize: 17, fontWeight: FontWeight.w700, color: AppColors.goldLight, height: 1.8),
            ),
          ),
          const SizedBox(height: 12),
          Text(step.transliteration, style: const TextStyle(fontSize: 12, fontStyle: FontStyle.italic, color: AppColors.goldPrimary, height: 1.4)),
          const SizedBox(height: 8),
          Text(step.englishTranslation, style: const TextStyle(fontSize: 12, color: AppColors.textWhite, height: 1.4)),
        ],
      ),
    );
  }

  Widget _buildFuneralEtiquettes() {
    return Container(
      padding: const EdgeInsets.all(18),
      decoration: BoxDecoration(
        color: AppColors.bgCard,
        borderRadius: BorderRadius.circular(20),
        border: Border.all(color: AppColors.borderSubtle),
      ),
      child: const Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Icon(Icons.info_outline, size: 16, color: AppColors.goldPrimary),
              SizedBox(width: 8),
              Text('Sunnah Funeral Etiquettes', style: TextStyle(fontSize: 14, fontWeight: FontWeight.w800, color: AppColors.goldPrimary)),
            ],
          ),
          SizedBox(height: 10),
          Text(
            '• The Janazah prayer has NO Ruku (bowing) and NO Sujood (prostration). It is performed standing entirely.\n'
            '• Offer sincere condolences (Ta\'ziyah) to the bereaved family: "Inna lillahi wa inna ilayhi raji\'oon".\n'
            '• Prepare food for the deceased\'s family for three days as practiced by the Sahaba.',
            style: TextStyle(fontSize: 12, color: AppColors.emeraldSubtle, height: 1.6),
          ),
        ],
      ),
    );
  }
}
