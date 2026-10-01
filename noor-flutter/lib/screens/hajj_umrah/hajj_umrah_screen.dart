// ============================================================
// NOOR — Hajj & Umrah Interactive Guide Screen (Flutter)
// ============================================================

import 'package:flutter/material.dart';
import '../../theme/app_theme.dart';
import '../../l10n/app_localizations.dart';
import '../../data/islamic_core_data.dart';

class HajjUmrahScreen extends StatefulWidget {
  const HajjUmrahScreen({super.key});

  @override
  State<HajjUmrahScreen> createState() => _HajjUmrahScreenState();
}

class _HajjUmrahScreenState extends State<HajjUmrahScreen> with SingleTickerProviderStateMixin {
  late TabController _tabController;
  final Set<int> _completedUmrahSteps = {};

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 2, vsync: this);
  }

  @override
  void dispose() {
    _tabController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final t = AppLocalizations.of(context)!;

    return Scaffold(
      backgroundColor: AppColors.bgDark,
      appBar: AppBar(
        backgroundColor: AppColors.bgDark,
        title: Text(t.hajjUmrah, style: const TextStyle(fontWeight: FontWeight.w900, color: AppColors.textWhite)),
        iconTheme: const IconThemeData(color: AppColors.goldPrimary),
        bottom: TabBar(
          controller: _tabController,
          indicatorColor: AppColors.goldPrimary,
          labelColor: AppColors.goldPrimary,
          unselectedLabelColor: AppColors.emeraldSubtle,
          labelStyle: const TextStyle(fontWeight: FontWeight.w800, fontSize: 14),
          tabs: const [
            Tab(text: 'Umrah Guide (4 Steps)'),
            Tab(text: 'Hajj Journey (5 Days)'),
          ],
        ),
      ),
      body: TabBarView(
        controller: _tabController,
        children: [
          _buildUmrahTab(),
          _buildHajjTab(),
        ],
      ),
    );
  }

  Widget _buildUmrahTab() {
    final progress = _completedUmrahSteps.length / kUmrahSteps.length;

    return SingleChildScrollView(
      padding: const EdgeInsets.all(16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          // Progress Card
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
            child: Column(
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    const Text('Umrah Rituals Checklist', style: TextStyle(fontSize: 14, fontWeight: FontWeight.bold, color: AppColors.textWhite)),
                    Text('${(_completedUmrahSteps.length)} of ${kUmrahSteps.length} Done', style: const TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: AppColors.goldPrimary)),
                  ],
                ),
                const SizedBox(height: 10),
                LinearProgressIndicator(
                  value: progress,
                  backgroundColor: Colors.white10,
                  valueColor: const AlwaysStoppedAnimation<Color>(AppColors.goldPrimary),
                  minHeight: 6,
                ),
              ],
            ),
          ),
          const SizedBox(height: 16),

          ...kUmrahSteps.map((s) => _buildUmrahStepCard(s)),
        ],
      ),
    );
  }

  Widget _buildUmrahStepCard(UmrahStepItem step) {
    final isDone = _completedUmrahSteps.contains(step.step);

    return Container(
      margin: const EdgeInsets.only(bottom: 16),
      padding: const EdgeInsets.all(18),
      decoration: BoxDecoration(
        color: AppColors.bgCard,
        borderRadius: BorderRadius.circular(20),
        border: Border.all(color: isDone ? AppColors.goldPrimary : AppColors.borderSubtle),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Row(
                children: [
                  Container(
                    width: 32,
                    height: 32,
                    decoration: BoxDecoration(
                      color: isDone ? AppColors.goldPrimary : AppColors.bgDark,
                      shape: BoxShape.circle,
                      border: Border.all(color: AppColors.goldPrimary),
                    ),
                    child: Center(
                      child: Text(
                        '${step.step}',
                        style: TextStyle(
                          fontSize: 13,
                          fontWeight: FontWeight.bold,
                          color: isDone ? AppColors.bgDark : AppColors.goldPrimary,
                        ),
                      ),
                    ),
                  ),
                  const SizedBox(width: 12),
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(step.title, style: const TextStyle(fontSize: 15, fontWeight: FontWeight.w800, color: AppColors.textWhite)),
                      Text(step.location, style: const TextStyle(fontSize: 11, color: AppColors.emeraldSubtle)),
                    ],
                  ),
                ],
              ),
              Checkbox(
                value: isDone,
                activeColor: AppColors.goldPrimary,
                checkColor: AppColors.bgDark,
                onChanged: (val) {
                  setState(() {
                    if (val == true) {
                      _completedUmrahSteps.add(step.step);
                    } else {
                      _completedUmrahSteps.remove(step.step);
                    }
                  });
                },
              ),
            ],
          ),
          const SizedBox(height: 10),
          Text(step.arabicTitle, style: const TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: AppColors.goldLight)),
          const SizedBox(height: 8),
          Text(step.description, style: const TextStyle(fontSize: 13, color: AppColors.textWhite, height: 1.4)),
          const SizedBox(height: 12),

          // Actions List
          ...step.actions.map((act) => Padding(
                padding: const EdgeInsets.only(bottom: 4),
                child: Row(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Text('• ', style: TextStyle(color: AppColors.goldPrimary, fontSize: 14)),
                    Expanded(child: Text(act, style: const TextStyle(fontSize: 12, color: AppColors.emeraldSubtle, height: 1.4))),
                  ],
                ),
              )),
          const SizedBox(height: 12),

          // Key Dua
          Container(
            padding: const EdgeInsets.all(12),
            decoration: BoxDecoration(
              color: AppColors.bgDark,
              borderRadius: BorderRadius.circular(14),
              border: Border.all(color: AppColors.goldPrimary.withValues(alpha: 0.3)),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                Text(
                  step.dua,
                  textAlign: TextAlign.right,
                  textDirection: TextDirection.rtl,
                  style: const TextStyle(fontSize: 16, fontWeight: FontWeight.w700, color: AppColors.goldLight, height: 1.6),
                ),
                const SizedBox(height: 8),
                Text(step.duaTranslation, style: const TextStyle(fontSize: 11, color: AppColors.textWhite, height: 1.4)),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildHajjTab() {
    final hajjDays = [
      {
        'day': '8th Dhul-Hijjah',
        'title': 'Day 1: Yawm at-Tarwiyah (Mina)',
        'arabic': 'يوم التروية • منى',
        'desc': 'Enter Ihram for Hajj, proceed to Mina, and offer Dhuhr, Asr, Maghrib, Isha, and Fajr of 9th Dhul-Hijjah shortening 4-rakat prayers without combining.',
      },
      {
        'day': '9th Dhul-Hijjah',
        'title': 'Day 2: Yawm Arafah & Muzdalifah',
        'arabic': 'يوم عرفة ومزدلفة',
        'desc': 'The core of Hajj: Stand at Mount Arafat (Wuqoof) making fervent du\'a until sunset. After sunset, proceed peacefully to Muzdalifah, combine Maghrib and Isha, sleep under the stars, and collect pebbles.',
      },
      {
        'day': '10th Dhul-Hijjah',
        'title': 'Day 3: Yawm an-Nahr (Eid Day)',
        'arabic': 'يوم النحر ورجم جمرة العقبة',
        'desc': 'Stone Jamarat al-Aqaba (7 pebbles with Takbeer), perform Qurbani animal sacrifice, shave/cut hair (Halq/Taqsir for Tahallul al-Asghar), and perform Tawaf al-Ifadah and Sa\'i at the Ka\'bah.',
      },
      {
        'day': '11th - 13th Dhul-Hijjah',
        'title': 'Days 4 & 5: Ayyam at-Tashreeq (Mina)',
        'arabic': 'أيام التشريق وطواف الوداع',
        'desc': 'Stay in Mina and stone all three Jamarat (Sughra, Wusta, Kubra) daily after Dhuhr. Conclude with Tawaf al-Wada (Farewell Tawaf) before leaving Makkah.',
      },
    ];

    return ListView.builder(
      padding: const EdgeInsets.all(16),
      itemCount: hajjDays.length,
      itemBuilder: (context, index) {
        final d = hajjDays[index];
        return Container(
          margin: const EdgeInsets.only(bottom: 16),
          padding: const EdgeInsets.all(18),
          decoration: BoxDecoration(
            color: AppColors.bgCard,
            borderRadius: BorderRadius.circular(20),
            border: Border.all(color: AppColors.borderSubtle),
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                decoration: BoxDecoration(
                  color: AppColors.emeraldPrimary.withValues(alpha: 0.2),
                  borderRadius: BorderRadius.circular(10),
                ),
                child: Text(d['day']!, style: const TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: AppColors.goldPrimary)),
              ),
              const SizedBox(height: 8),
              Text(d['title']!, style: const TextStyle(fontSize: 16, fontWeight: FontWeight.w800, color: AppColors.textWhite)),
              const SizedBox(height: 2),
              Text(d['arabic']!, style: const TextStyle(fontSize: 14, fontWeight: FontWeight.bold, color: AppColors.goldLight)),
              const SizedBox(height: 10),
              Text(d['desc']!, style: const TextStyle(fontSize: 13, color: AppColors.emeraldSubtle, height: 1.5)),
            ],
          ),
        );
      },
    );
  }
}
