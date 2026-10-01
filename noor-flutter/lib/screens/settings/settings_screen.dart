// ============================================================
// NOOR — App Settings & Preferences Screen (Flutter)
// ============================================================

import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../theme/app_theme.dart';
import '../../l10n/app_localizations.dart';
import '../../widgets/adhan_voice_modal.dart';
import '../../widgets/language_modal.dart';
import '../../services/notification_service.dart';

class SettingsScreen extends ConsumerStatefulWidget {
  const SettingsScreen({super.key});

  @override
  ConsumerState<SettingsScreen> createState() => _SettingsScreenState();
}

class _SettingsScreenState extends ConsumerState<SettingsScreen> {
  String _calculationMethod = 'mwl';
  String _asrJuristic = 'standard';
  int _hijriAdjustment = 0;
  bool _adhanNotifications = true;
  bool _quranDailyReminder = true;

  final Map<String, String> _methods = {
    'mwl': 'Muslim World League (MWL)',
    'isna': 'Islamic Society of North America (ISNA)',
    'egypt': 'Egyptian General Authority of Survey',
    'makkah': 'Umm al-Qura University, Makkah',
    'karachi': 'University of Islamic Sciences, Karachi',
    'tehran': 'Institute of Geophysics, Tehran',
  };

  @override
  Widget build(BuildContext context) {
    final t = AppLocalizations.of(context)!;

    return Scaffold(
      backgroundColor: AppColors.bgDark,
      appBar: AppBar(
        backgroundColor: AppColors.bgDark,
        title: Text(t.settings, style: const TextStyle(fontWeight: FontWeight.w900, color: AppColors.textWhite)),
        iconTheme: const IconThemeData(color: AppColors.goldPrimary),
      ),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          _sectionHeader('Prayer Calculation & Fiqh'),
          _settingTile(
            title: 'Calculation Method',
            subtitle: _methods[_calculationMethod] ?? 'Muslim World League',
            icon: Icons.calculate_outlined,
            onTap: _showCalculationMethodDialog,
          ),
          _settingTile(
            title: 'Asr Juristic School',
            subtitle: _asrJuristic == 'standard' ? 'Standard (Shafi\'i, Maliki, Hanbali)' : 'Hanafi (Shadow 2x)',
            icon: Icons.access_time_outlined,
            onTap: _showAsrMethodDialog,
          ),
          _settingTile(
            title: 'Hijri Date Adjustment',
            subtitle: _hijriAdjustment == 0 ? 'Standard (0 Days)' : '${_hijriAdjustment > 0 ? '+' : ''}$_hijriAdjustment Days',
            icon: Icons.calendar_today_outlined,
            onTap: _showHijriAdjustmentDialog,
          ),
          const SizedBox(height: 20),

          _sectionHeader('Audio & Adhan Voice'),
          _settingTile(
            title: 'Adhan Voice Selection',
            subtitle: 'Select Makkah, Madinah, Al-Aqsa or Istanbul voice',
            icon: Icons.volume_up_outlined,
            onTap: () {
              showModalBottomSheet(
                context: context,
                backgroundColor: AppColors.bgCard,
                shape: const RoundedRectangleBorder(borderRadius: BorderRadius.vertical(top: Radius.circular(24))),
                builder: (context) => AdhanVoiceModal(
                  activeAdhanId: 'makkah_live',
                  onSelectAdhan: (voice) => Navigator.pop(context),
                  onClose: () => Navigator.pop(context),
                ),
              );
            },
          ),
          const SizedBox(height: 20),

          _sectionHeader('Language & Preferences'),
          _settingTile(
            title: 'App Display Language',
            subtitle: 'English, Urdu, Hindi, Arabic',
            icon: Icons.language_outlined,
            onTap: () {
              showModalBottomSheet(
                context: context,
                backgroundColor: AppColors.bgCard,
                shape: const RoundedRectangleBorder(borderRadius: BorderRadius.vertical(top: Radius.circular(24))),
                builder: (context) => LanguageModal(
                  onClose: () => Navigator.pop(context),
                ),
              );
            },
          ),
          _switchTile(
            title: 'Adhan Notifications',
            subtitle: 'Receive reminder callouts at prayer times',
            icon: Icons.notifications_active_outlined,
            value: _adhanNotifications,
            onChanged: (val) => setState(() => _adhanNotifications = val),
          ),
          _switchTile(
            title: 'Daily Ayah Reflection',
            subtitle: 'Daily morning Quran verse and reflection',
            icon: Icons.auto_stories_outlined,
            value: _quranDailyReminder,
            onChanged: (val) => setState(() => _quranDailyReminder = val),
          ),
          _settingTile(
            title: 'Test Notification Banner',
            subtitle: 'Send an immediate test alert to check device notifications',
            icon: Icons.send_to_mobile_outlined,
            onTap: () async {
              await notificationService.showNotification(
                id: DateTime.now().millisecondsSinceEpoch ~/ 1000,
                title: '🕌 Noor-e-ilahi Adhan Alert',
                body: 'Allahu Akbar, Allahu Akbar — Push notifications are working perfectly on your device!',
              );
              if (context.mounted) {
                ScaffoldMessenger.of(context).showSnackBar(
                  const SnackBar(
                    content: Text('✨ Test notification dispatched! Check your status bar.'),
                    backgroundColor: Color(0xFF065F46),
                  ),
                );
              }
            },
          ),
          const SizedBox(height: 20),

          _sectionHeader('About & Version'),
          Container(
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              color: AppColors.bgCard,
              borderRadius: BorderRadius.circular(20),
              border: Border.all(color: AppColors.borderSubtle),
            ),
            child: const Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text('Noor-e-ilahi — Classical Islamic Companion', style: TextStyle(fontWeight: FontWeight.w800, color: AppColors.textWhite, fontSize: 14)),
                SizedBox(height: 4),
                Text('Version 1.0.0 (Build 5) • 100% Scholarly Verified Offline First', style: TextStyle(color: AppColors.emeraldSubtle, fontSize: 11)),
                SizedBox(height: 10),
                Text(
                  'Noble Quran text from Tanzil Project. Audio recitations provided by EveryAyah & MP3Quran. Prayer timings calculated using standard astronomical algorithms.',
                  style: TextStyle(color: AppColors.emeraldSubtle, fontSize: 11, height: 1.4),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _sectionHeader(String title) {
    return Padding(
      padding: const EdgeInsets.only(left: 4, bottom: 10),
      child: Text(
        title,
        style: const TextStyle(fontSize: 13, fontWeight: FontWeight.w800, color: AppColors.goldPrimary),
      ),
    );
  }

  Widget _settingTile({
    required String title,
    required String subtitle,
    required IconData icon,
    required VoidCallback onTap,
  }) {
    return Container(
      margin: const EdgeInsets.only(bottom: 8),
      decoration: BoxDecoration(
        color: AppColors.bgCard,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: AppColors.borderSubtle),
      ),
      child: ListTile(
        leading: Icon(icon, color: AppColors.goldPrimary, size: 22),
        title: Text(title, style: const TextStyle(fontSize: 14, fontWeight: FontWeight.bold, color: AppColors.textWhite)),
        subtitle: Text(subtitle, style: const TextStyle(fontSize: 12, color: AppColors.emeraldSubtle)),
        trailing: const Icon(Icons.chevron_right, size: 18, color: AppColors.emeraldSubtle),
        onTap: onTap,
      ),
    );
  }

  Widget _switchTile({
    required String title,
    required String subtitle,
    required IconData icon,
    required bool value,
    required ValueChanged<bool> onChanged,
  }) {
    return Container(
      margin: const EdgeInsets.only(bottom: 8),
      decoration: BoxDecoration(
        color: AppColors.bgCard,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: AppColors.borderSubtle),
      ),
      child: SwitchListTile(
        secondary: Icon(icon, color: AppColors.goldPrimary, size: 22),
        title: Text(title, style: const TextStyle(fontSize: 14, fontWeight: FontWeight.bold, color: AppColors.textWhite)),
        subtitle: Text(subtitle, style: const TextStyle(fontSize: 12, color: AppColors.emeraldSubtle)),
        value: value,
        activeColor: AppColors.goldPrimary,
        onChanged: onChanged,
      ),
    );
  }

  void _showCalculationMethodDialog() {
    showDialog(
      context: context,
      builder: (context) {
        return AlertDialog(
          backgroundColor: AppColors.bgCard,
          title: const Text('Calculation Method', style: TextStyle(color: AppColors.textWhite, fontWeight: FontWeight.bold)),
          content: Column(
            mainAxisSize: MainAxisSize.min,
            children: _methods.entries.map((e) {
              return RadioListTile<String>(
                title: Text(e.value, style: const TextStyle(fontSize: 13, color: AppColors.textWhite)),
                value: e.key,
                groupValue: _calculationMethod,
                activeColor: AppColors.goldPrimary,
                onChanged: (val) {
                  setState(() => _calculationMethod = val!);
                  Navigator.pop(context);
                },
              );
            }).toList(),
          ),
        );
      },
    );
  }

  void _showAsrMethodDialog() {
    showDialog(
      context: context,
      builder: (context) {
        return AlertDialog(
          backgroundColor: AppColors.bgCard,
          title: const Text('Asr Juristic Method', style: TextStyle(color: AppColors.textWhite, fontWeight: FontWeight.bold)),
          content: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              RadioListTile<String>(
                title: const Text('Standard (Shafi\'i, Maliki, Hanbali)', style: TextStyle(fontSize: 13, color: AppColors.textWhite)),
                value: 'standard',
                groupValue: _asrJuristic,
                activeColor: AppColors.goldPrimary,
                onChanged: (val) {
                  setState(() => _asrJuristic = val!);
                  Navigator.pop(context);
                },
              ),
              RadioListTile<String>(
                title: const Text('Hanafi (Shadow 2x length)', style: TextStyle(fontSize: 13, color: AppColors.textWhite)),
                value: 'hanafi',
                groupValue: _asrJuristic,
                activeColor: AppColors.goldPrimary,
                onChanged: (val) {
                  setState(() => _asrJuristic = val!);
                  Navigator.pop(context);
                },
              ),
            ],
          ),
        );
      },
    );
  }

  void _showHijriAdjustmentDialog() {
    showDialog(
      context: context,
      builder: (context) {
        return AlertDialog(
          backgroundColor: AppColors.bgCard,
          title: const Text('Hijri Adjustment', style: TextStyle(color: AppColors.textWhite, fontWeight: FontWeight.bold)),
          content: Column(
            mainAxisSize: MainAxisSize.min,
            children: [-2, -1, 0, 1, 2].map((adj) {
              return RadioListTile<int>(
                title: Text(adj == 0 ? 'Standard (0 Days)' : '${adj > 0 ? '+' : ''}$adj Days', style: const TextStyle(fontSize: 13, color: AppColors.textWhite)),
                value: adj,
                groupValue: _hijriAdjustment,
                activeColor: AppColors.goldPrimary,
                onChanged: (val) {
                  setState(() => _hijriAdjustment = val!);
                  Navigator.pop(context);
                },
              );
            }).toList(),
          ),
        );
      },
    );
  }
}
