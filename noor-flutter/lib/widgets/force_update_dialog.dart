// ============================================================
// NOOR — Force Update Dialog & Maintenance Banner
// ============================================================

import 'package:flutter/material.dart';
import '../services/remote_config_service.dart';

class ForceUpdateDialog extends StatelessWidget {
  final bool isMandatory;
  final VoidCallback? onDismiss;

  const ForceUpdateDialog({
    super.key,
    required this.isMandatory,
    this.onDismiss,
  });

  static Future<void> checkAndShow(BuildContext context) async {
    await remoteConfig.fetchConfig();

    if (!context.mounted) return;

    if (remoteConfig.isForceUpdateRequired) {
      showDialog(
        context: context,
        barrierDismissible: false,
        builder: (ctx) => const PopScope(
          canPop: false,
          child: ForceUpdateDialog(isMandatory: true),
        ),
      );
    } else if (remoteConfig.isOptionalUpdateAvailable) {
      showDialog(
        context: context,
        barrierDismissible: true,
        builder: (ctx) => ForceUpdateDialog(
          isMandatory: false,
          onDismiss: () => Navigator.of(ctx).pop(),
        ),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    final updateInfo = remoteConfig.forceUpdate;
    final title = updateInfo?.title ?? 'Update Available';
    final message = updateInfo?.message ??
        'A newer version of Noor-e-ilahi is now available on the store.';
    final releaseNotes = updateInfo?.releaseNotes ?? [];

    return Dialog(
      backgroundColor: Colors.transparent,
      insetPadding: const EdgeInsets.symmetric(horizontal: 24),
      child: Container(
        padding: const EdgeInsets.all(24),
        decoration: BoxDecoration(
          color: const Color(0xFF031D16),
          borderRadius: BorderRadius.circular(28),
          border: Border.all(
            color: const Color(0xFFF59E0B).withOpacity(0.4),
            width: 1.5,
          ),
          boxShadow: [
            BoxShadow(
              color: Colors.black.withOpacity(0.7),
              blurRadius: 30,
              spreadRadius: 4,
            ),
          ],
        ),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            // Top Badge / Icon
            Container(
              width: 60,
              height: 60,
              decoration: BoxDecoration(
                gradient: const LinearGradient(
                  colors: [Color(0xFFF59E0B), Color(0xFF059669)],
                  begin: Alignment.topLeft,
                  end: Alignment.bottomRight,
                ),
                borderRadius: BorderRadius.circular(20),
                boxShadow: [
                  BoxShadow(
                    color: const Color(0xFFF59E0B).withOpacity(0.3),
                    blurRadius: 16,
                  ),
                ],
              ),
              child: const Icon(
                Icons.system_update_alt_rounded,
                color: Color(0xFF02120D),
                size: 32,
              ),
            ),
            const SizedBox(height: 16),

            // Mandatory vs Optional tag
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
              decoration: BoxDecoration(
                color: isMandatory
                    ? Colors.red.withOpacity(0.15)
                    : const Color(0xFFF59E0B).withOpacity(0.15),
                borderRadius: BorderRadius.circular(20),
                border: Border.all(
                  color: isMandatory
                      ? Colors.red.withOpacity(0.4)
                      : const Color(0xFFF59E0B).withOpacity(0.4),
                ),
              ),
              child: Text(
                isMandatory ? 'MANDATORY UPDATE' : 'RECOMMENDED UPDATE',
                style: TextStyle(
                  color: isMandatory ? const Color(0xFFF87171) : const Color(0xFFFBBF24),
                  fontSize: 10,
                  fontWeight: FontWeight.w800,
                  letterSpacing: 1.2,
                ),
              ),
            ),
            const SizedBox(height: 12),

            // Title
            Text(
              title,
              textAlign: TextAlign.center,
              style: const TextStyle(
                color: Colors.white,
                fontSize: 18,
                fontWeight: FontWeight.w900,
              ),
            ),
            const SizedBox(height: 8),

            // Description Message
            Text(
              message,
              textAlign: TextAlign.center,
              style: TextStyle(
                color: const Color(0xFF6EE7B7).withOpacity(0.85),
                fontSize: 13,
                height: 1.4,
              ),
            ),
            const SizedBox(height: 16),

            // Release Notes
            if (releaseNotes.isNotEmpty) ...[
              Container(
                width: double.infinity,
                padding: const EdgeInsets.all(12),
                decoration: BoxDecoration(
                  color: Colors.black.withOpacity(0.3),
                  borderRadius: BorderRadius.circular(16),
                  border: Border.all(color: Colors.white.withOpacity(0.08)),
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Text(
                      "What's New in this Version:",
                      style: TextStyle(
                        color: Color(0xFFFBBF24),
                        fontSize: 11,
                        fontWeight: FontWeight.w700,
                      ),
                    ),
                    const SizedBox(height: 6),
                    ...releaseNotes.map(
                      (note) => Padding(
                        padding: const EdgeInsets.only(bottom: 4),
                        child: Row(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            const Text(
                              "• ",
                              style: TextStyle(
                                color: Color(0xFF10B981),
                                fontSize: 12,
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                            Expanded(
                              child: Text(
                                note,
                                style: const TextStyle(
                                  color: Colors.white70,
                                  fontSize: 12,
                                  height: 1.3,
                                ),
                              ),
                            ),
                          ],
                        ),
                      ),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 20),
            ],

            // Action Buttons
            SizedBox(
              width: double.infinity,
              height: 48,
              child: ElevatedButton(
                onPressed: () {
                  remoteConfig.openStore();
                },
                style: ElevatedButton.styleFrom(
                  backgroundColor: const Color(0xFFF59E0B),
                  foregroundColor: const Color(0xFF02120D),
                  elevation: 6,
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(16),
                  ),
                ),
                child: const Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Icon(Icons.download_rounded, size: 20),
                    SizedBox(width: 8),
                    Text(
                      'Update Now on Store',
                      style: TextStyle(
                        fontSize: 14,
                        fontWeight: FontWeight.w900,
                      ),
                    ),
                  ],
                ),
              ),
            ),

            if (!isMandatory) ...[
              const SizedBox(height: 8),
              TextButton(
                onPressed: onDismiss,
                child: const Text(
                  'Remind Me Later',
                  style: TextStyle(
                    color: Colors.white60,
                    fontSize: 12,
                    fontWeight: FontWeight.w600,
                  ),
                ),
              ),
            ],
          ],
        ),
      ),
    );
  }
}
