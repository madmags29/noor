import 'package:flutter/material.dart';
import '../theme/app_theme.dart';

class AdhanVoice {
  final String id;
  final String name;
  final String city;
  final String style;
  final String audioUrl;
  const AdhanVoice({required this.id, required this.name, required this.city, required this.style, required this.audioUrl});
}

const List<AdhanVoice> kAdhanVoices = [
  AdhanVoice(id: "makkah_live", name: "Masjid al-Haram", city: "Makkah", style: "Live Broadcast", audioUrl: "https://cdn.islamic.network/quran/audio-surah/128/ar.alafasy/1.mp3"),
  AdhanVoice(id: "madinah", name: "Masjid an-Nabawi", city: "Madinah", style: "Traditional Hijazi", audioUrl: "https://cdn.islamic.network/quran/audio-surah/128/ar.abdurrahmaansudais/1.mp3"),
  AdhanVoice(id: "egypt", name: "Sheikh Ali Hajjaj", city: "Cairo", style: "Egyptian Maqam", audioUrl: "https://cdn.islamic.network/quran/audio-surah/128/ar.husary/1.mp3"),
  AdhanVoice(id: "turkey", name: "Diyanet Istanbul", city: "Istanbul", style: "Ottoman Rast", audioUrl: "https://cdn.islamic.network/quran/audio-surah/128/ar.minshawi/1.mp3"),
];

class AdhanVoiceModal extends StatelessWidget {
  final String activeAdhanId;
  final ValueChanged<AdhanVoice> onSelectAdhan;
  final VoidCallback onClose;
  const AdhanVoiceModal({super.key, required this.activeAdhanId, required this.onSelectAdhan, required this.onClose});

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onClose,
      child: Container(
        color: const Color(0xCC000000),
        child: GestureDetector(
          onTap: () {},
          child: Align(
            alignment: Alignment.bottomCenter,
            child: Container(
              margin: const EdgeInsets.all(16),
              decoration: BoxDecoration(color: AppColors.bgCard, borderRadius: BorderRadius.circular(24), border: Border.all(color: AppColors.goldBorder)),
              child: Column(mainAxisSize: MainAxisSize.min, children: [
                Padding(padding: const EdgeInsets.all(16), child: Row(mainAxisAlignment: MainAxisAlignment.spaceBetween, children: [
                  const Text("Select Adhan Voice", style: TextStyle(fontSize: 18, fontWeight: FontWeight.w800, color: AppColors.textWhite)),
                  GestureDetector(onTap: onClose, child: const Icon(Icons.close, color: AppColors.textMuted)),
                ])),
                const Divider(color: AppColors.divider, height: 1),
                ...kAdhanVoices.map((v) {
                  final isActive = v.id == activeAdhanId;
                  return GestureDetector(
                    onTap: () => onSelectAdhan(v),
                    child: Container(
                      margin: const EdgeInsets.symmetric(horizontal: 12, vertical: 4),
                      padding: const EdgeInsets.all(14),
                      decoration: BoxDecoration(
                        color: isActive ? const Color(0x1AF59E0B) : const Color(0x08FFFFFF),
                        borderRadius: BorderRadius.circular(16),
                        border: Border.all(color: isActive ? AppColors.goldBorder : Colors.transparent),
                      ),
                      child: Row(children: [
                        const Icon(Icons.volume_up, size: 18, color: AppColors.goldPrimary),
                        const SizedBox(width: 12),
                        Expanded(child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                          Text(v.name, style: TextStyle(fontSize: 14, fontWeight: FontWeight.w700, color: isActive ? AppColors.goldPrimary : AppColors.textWhite)),
                          Text("${v.city} • ${v.style}", style: const TextStyle(fontSize: 11, color: AppColors.emeraldSubtle)),
                        ])),
                        if (isActive) const Icon(Icons.check_circle, size: 20, color: AppColors.goldPrimary),
                      ]),
                    ),
                  );
                }),
                const SizedBox(height: 8),
              ]),
            ),
          ),
        ),
      ),
    );
  }
}