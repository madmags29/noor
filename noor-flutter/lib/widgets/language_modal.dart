import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../theme/app_theme.dart';
import '../providers/language_provider.dart';

class LanguageModal extends ConsumerWidget {
  final VoidCallback onClose;
  const LanguageModal({super.key, required this.onClose});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final langAsync = ref.watch(languageProvider);
    return langAsync.when(
      loading: () => const SizedBox.shrink(),
      error: (_, __) => const SizedBox.shrink(),
      data: (state) => GestureDetector(
        onTap: onClose,
        child: Container(
          color: const Color(0xCC000000),
          child: GestureDetector(
            onTap: () {},
            child: Align(
              alignment: Alignment.bottomCenter,
              child: Container(
                height: MediaQuery.of(context).size.height * 0.65,
                margin: const EdgeInsets.all(16),
                decoration: BoxDecoration(color: AppColors.bgCard, borderRadius: BorderRadius.circular(24), border: Border.all(color: AppColors.borderSubtle)),
                child: Column(children: [
                  Padding(padding: const EdgeInsets.all(16), child: Row(mainAxisAlignment: MainAxisAlignment.spaceBetween, children: [
                    const Text("Select Language", style: TextStyle(fontSize: 18, fontWeight: FontWeight.w800, color: AppColors.textWhite)),
                    GestureDetector(onTap: onClose, child: const Icon(Icons.close, color: AppColors.textMuted)),
                  ])),
                  const Divider(color: AppColors.divider, height: 1),
                  Expanded(
                    child: ListView.separated(
                      padding: const EdgeInsets.all(12),
                      itemCount: kSupportedLanguages.length,
                      separatorBuilder: (_, __) => const SizedBox(height: 4),
                      itemBuilder: (_, i) {
                        final lang = kSupportedLanguages[i];
                        final isSelected = lang.code == state.language;
                        return GestureDetector(
                          onTap: () { ref.read(languageProvider.notifier).setLanguage(lang.code); onClose(); },
                          child: Container(
                            padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 12),
                            decoration: BoxDecoration(
                              color: isSelected ? const Color(0x1AF59E0B) : const Color(0x08FFFFFF),
                              borderRadius: BorderRadius.circular(14),
                              border: Border.all(color: isSelected ? AppColors.goldBorder : Colors.transparent),
                            ),
                            child: Row(children: [
                              Text(lang.flag, style: const TextStyle(fontSize: 22)),
                              const SizedBox(width: 12),
                              Expanded(child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                                Text(lang.nativeName, style: TextStyle(fontSize: 14, fontWeight: FontWeight.w700, color: isSelected ? AppColors.goldPrimary : AppColors.textWhite)),
                                Text(lang.region ?? lang.name, style: const TextStyle(fontSize: 11, color: AppColors.emeraldSubtle)),
                              ])),
                              if (isSelected) const Icon(Icons.check_circle, size: 18, color: AppColors.goldPrimary),
                            ]),
                          ),
                        );
                      },
                    ),
                  ),
                ]),
              ),
            ),
          ),
        ),
      ),
    );
  }
}