// ============================================================
// NOOR — Sacred Islamic Lunar Calendar (Flutter)
// ============================================================

import 'package:flutter/material.dart';
import '../../theme/app_theme.dart';
import '../../l10n/app_localizations.dart';
import '../../data/calendar_data.dart';

class CalendarScreen extends StatefulWidget {
  const CalendarScreen({super.key});

  @override
  State<CalendarScreen> createState() => _CalendarScreenState();
}

class _CalendarScreenState extends State<CalendarScreen> {
  int _selectedMonthIndex = 0; // 0 to 11

  @override
  Widget build(BuildContext context) {
    final t = AppLocalizations.of(context)!;
    final activeMonth = kIslamicMonths[_selectedMonthIndex];

    final monthEvents = kIslamicEvents.where((e) => e.hijriMonth == activeMonth.number).toList();

    return Scaffold(
      backgroundColor: AppColors.bgDark,
      appBar: AppBar(
        backgroundColor: AppColors.bgDark,
        title: Text(t.calendar, style: const TextStyle(fontWeight: FontWeight.w900, color: AppColors.textWhite)),
        iconTheme: const IconThemeData(color: AppColors.goldPrimary),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            // Hero Lunar Banner
            _buildLunarBanner(activeMonth),
            const SizedBox(height: 16),

            // Month Selector Carousel
            _buildMonthSelector(),
            const SizedBox(height: 20),

            // Sacred Month Status Banner
            if (activeMonth.isSacred) _buildSacredBanner(activeMonth),
            if (activeMonth.isSacred) const SizedBox(height: 16),

            // White Days (Ayyam al-Beed) Fasting Card
            _buildWhiteDaysCard(activeMonth),
            const SizedBox(height: 20),

            // Islamic Events in this Month
            _sectionTitle('Key Islamic Events in ${activeMonth.nameEn}'),
            const SizedBox(height: 12),
            if (monthEvents.isEmpty)
              Container(
                padding: const EdgeInsets.all(20),
                decoration: BoxDecoration(
                  color: AppColors.bgCard,
                  borderRadius: BorderRadius.circular(16),
                  border: Border.all(color: AppColors.borderSubtle),
                ),
                child: const Center(
                  child: Text(
                    'No major canonical holidays in this month. Ideal for ongoing voluntary fasting & personal dhikr.',
                    textAlign: TextAlign.center,
                    style: TextStyle(color: AppColors.emeraldSubtle, fontSize: 13),
                  ),
                ),
              )
            else
              ...monthEvents.map((e) => _buildEventCard(e)),

            const SizedBox(height: 20),
            // Month Virtues
            _sectionTitle('Spiritual Significance of ${activeMonth.nameEn}'),
            const SizedBox(height: 10),
            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: AppColors.bgCard,
                borderRadius: BorderRadius.circular(16),
                border: Border.all(color: AppColors.borderSubtle),
              ),
              child: Text(
                activeMonth.virtue,
                style: const TextStyle(fontSize: 13, color: AppColors.textWhite, height: 1.5),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _sectionTitle(String text) {
    return Text(
      text,
      style: const TextStyle(fontSize: 15, fontWeight: FontWeight.w800, color: AppColors.goldPrimary),
    );
  }

  Widget _buildLunarBanner(IslamicMonthItem month) {
    return Container(
      padding: const EdgeInsets.all(22),
      decoration: BoxDecoration(
        gradient: const LinearGradient(
          colors: [Color(0xFF064E3B), Color(0xFF022C22), Color(0xFF0F172A)],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
        borderRadius: BorderRadius.circular(24),
        border: Border.all(color: AppColors.goldPrimary.withValues(alpha: 0.3)),
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                  decoration: BoxDecoration(
                    color: AppColors.goldPrimary.withValues(alpha: 0.2),
                    borderRadius: BorderRadius.circular(20),
                  ),
                  child: Text(
                    'Month ${month.number} of 12',
                    style: const TextStyle(fontSize: 10, fontWeight: FontWeight.w800, color: AppColors.goldPrimary),
                  ),
                ),
                const SizedBox(height: 8),
                Text(
                  month.nameEn,
                  style: const TextStyle(fontSize: 24, fontWeight: FontWeight.w900, color: AppColors.textWhite),
                ),
                Text(
                  month.nameUr,
                  style: const TextStyle(fontSize: 14, color: AppColors.emeraldSubtle),
                ),
              ],
            ),
          ),
          Column(
            crossAxisAlignment: CrossAxisAlignment.end,
            children: [
              Text(
                month.nameAr,
                style: const TextStyle(fontSize: 28, fontWeight: FontWeight.w700, color: AppColors.goldLight),
              ),
              const SizedBox(height: 4),
              const Icon(Icons.nightlight_round, size: 24, color: AppColors.goldPrimary),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildMonthSelector() {
    return SingleChildScrollView(
      scrollDirection: Axis.horizontal,
      child: Row(
        children: List.generate(kIslamicMonths.length, (idx) {
          final m = kIslamicMonths[idx];
          final isSelected = _selectedMonthIndex == idx;
          return Padding(
            padding: const EdgeInsets.only(right: 8),
            child: ChoiceChip(
              label: Text(m.nameEn),
              selected: isSelected,
              onSelected: (val) {
                if (val) setState(() => _selectedMonthIndex = idx);
              },
              backgroundColor: AppColors.bgCard,
              selectedColor: AppColors.goldPrimary,
              labelStyle: TextStyle(
                fontSize: 12,
                fontWeight: isSelected ? FontWeight.w800 : FontWeight.w500,
                color: isSelected ? AppColors.bgDark : AppColors.textWhite,
              ),
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
              side: BorderSide(color: isSelected ? AppColors.goldPrimary : AppColors.borderSubtle),
              showCheckmark: false,
            ),
          );
        }),
      ),
    );
  }

  Widget _buildSacredBanner(IslamicMonthItem month) {
    return Container(
      padding: const EdgeInsets.all(14),
      decoration: BoxDecoration(
        color: const Color(0x26F59E0B),
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: const Color(0x66F59E0B)),
      ),
      child: const Row(
        children: [
          Icon(Icons.shield_outlined, color: Color(0xFFF59E0B), size: 20),
          SizedBox(width: 10),
          Expanded(
            child: Text(
              'Sacred Month (Al-Ashhur al-Hurum) — Good deeds and charity carry manifold multiplied rewards.',
              style: TextStyle(fontSize: 12, fontWeight: FontWeight.w700, color: Color(0xFFF59E0B)),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildWhiteDaysCard(IslamicMonthItem month) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: AppColors.bgCard,
        borderRadius: BorderRadius.circular(20),
        border: Border.all(color: AppColors.borderSubtle),
      ),
      child: const Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text('Ayyam al-Beed (White Days Fasting)', style: TextStyle(fontSize: 13, fontWeight: FontWeight.w800, color: AppColors.goldPrimary)),
              Text('13th, 14th & 15th', style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: AppColors.textWhite)),
            ],
          ),
          SizedBox(height: 6),
          Text(
            'Sunnah of Prophet Muhammad ﷺ: Fasting the three middle days of each lunar month is equal in reward to fasting for a lifetime.',
            style: TextStyle(fontSize: 12, color: AppColors.emeraldSubtle, height: 1.4),
          ),
        ],
      ),
    );
  }

  Widget _buildEventCard(IslamicEventItem event) {
    return Container(
      margin: const EdgeInsets.only(bottom: 12),
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: AppColors.bgCard,
        borderRadius: BorderRadius.circular(18),
        border: Border.all(color: AppColors.borderSubtle),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                event.title,
                style: const TextStyle(fontSize: 15, fontWeight: FontWeight.w800, color: AppColors.textWhite),
              ),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 3),
                decoration: BoxDecoration(
                  color: AppColors.emeraldPrimary.withValues(alpha: 0.2),
                  borderRadius: BorderRadius.circular(10),
                ),
                child: Text(
                  '${event.hijriDay} ${kIslamicMonths[event.hijriMonth - 1].nameEn}',
                  style: const TextStyle(fontSize: 10, fontWeight: FontWeight.w800, color: AppColors.goldPrimary),
                ),
              ),
            ],
          ),
          const SizedBox(height: 4),
          Text(event.titleAr, style: const TextStyle(fontSize: 14, color: AppColors.goldLight, fontWeight: FontWeight.bold)),
          const SizedBox(height: 8),
          Text(event.description, style: const TextStyle(fontSize: 12, color: AppColors.textWhite, height: 1.4)),
          const SizedBox(height: 8),
          Container(
            padding: const EdgeInsets.all(10),
            decoration: BoxDecoration(
              color: AppColors.bgDark,
              borderRadius: BorderRadius.circular(10),
            ),
            child: Row(
              children: [
                const Icon(Icons.star_outline, size: 14, color: AppColors.goldPrimary),
                const SizedBox(width: 8),
                Expanded(
                  child: Text(
                    event.recommendedActions,
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
