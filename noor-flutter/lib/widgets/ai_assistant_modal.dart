import 'package:flutter/material.dart';
import '../theme/app_theme.dart';
import '../services/ai_service.dart';

class AiAssistantModal extends StatefulWidget {
  final VoidCallback onClose;
  const AiAssistantModal({super.key, required this.onClose});

  @override
  State<AiAssistantModal> createState() => _AiAssistantModalState();
}

class _AiAssistantModalState extends State<AiAssistantModal> {
  final _controller = TextEditingController();
  AiResponse? _response;
  bool _isLoading = false;

  Future<void> _ask() async {
    if (_controller.text.trim().isEmpty) return;
    setState(() { _isLoading = true; _response = null; });
    final res = await aiService.askNoorAi(_controller.text.trim());
    setState(() { _response = res; _isLoading = false; });
  }

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: widget.onClose,
      child: Container(
        color: const Color(0xCC000000),
        child: GestureDetector(
          onTap: () {},
          child: Align(
            alignment: Alignment.bottomCenter,
            child: Container(
              margin: const EdgeInsets.all(16),
              padding: const EdgeInsets.all(20),
              decoration: BoxDecoration(
                color: AppColors.bgCard,
                borderRadius: BorderRadius.circular(24),
                border: Border.all(color: AppColors.goldBorder),
              ),
              child: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  Row(mainAxisAlignment: MainAxisAlignment.spaceBetween, children: [
                    const Text('Noor AI ✨', style: TextStyle(fontSize: 18, fontWeight: FontWeight.w900, color: AppColors.textWhite)),
                    GestureDetector(onTap: widget.onClose, child: const Icon(Icons.close, color: AppColors.textMuted)),
                  ]),
                  const SizedBox(height: 16),
                  TextField(
                    controller: _controller,
                    style: const TextStyle(color: AppColors.textWhite),
                    decoration: const InputDecoration(hintText: 'Ask about Islam, duas, fiqh...'),
                    maxLines: 3,
                    onSubmitted: (_) => _ask(),
                  ),
                  const SizedBox(height: 12),
                  ElevatedButton(
                    onPressed: _isLoading ? null : _ask,
                    style: ElevatedButton.styleFrom(backgroundColor: AppColors.goldPrimary, foregroundColor: AppColors.textDark,
                        minimumSize: const Size(double.infinity, 44), shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14))),
                    child: _isLoading ? const CircularProgressIndicator(color: AppColors.textDark, strokeWidth: 2)
                        : const Text('Ask Noor AI', style: TextStyle(fontWeight: FontWeight.w900)),
                  ),
                  if (_response != null) ...[
                    const SizedBox(height: 16),
                    Container(
                      padding: const EdgeInsets.all(14),
                      decoration: BoxDecoration(color: const Color(0x1A10B981), borderRadius: BorderRadius.circular(16), border: Border.all(color: AppColors.emeraldBorder)),
                      child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                        Text(_response!.answer, style: const TextStyle(color: AppColors.textWhite, fontSize: 13, height: 1.55)),
                        const SizedBox(height: 8),
                        Text(_response!.citation, style: const TextStyle(color: AppColors.goldPrimary, fontSize: 11, fontWeight: FontWeight.w700)),
                      ]),
                    ),
                  ],
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}