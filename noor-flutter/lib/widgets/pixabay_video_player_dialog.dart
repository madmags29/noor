// ============================================================
// NOOR — Pixabay Video Player Dialog (Flutter)
// Fullscreen Autoplay, Looping & Play/Pause Controls
// ============================================================

import 'package:flutter/material.dart';
import 'package:video_player/video_player.dart';
import 'package:share_plus/share_plus.dart';
import '../theme/app_theme.dart';
import '../services/pixabay_service.dart';

class PixabayVideoPlayerDialog extends StatefulWidget {
  final PixabayVideoItem video;
  const PixabayVideoPlayerDialog({super.key, required this.video});

  @override
  State<PixabayVideoPlayerDialog> createState() => _PixabayVideoPlayerDialogState();
}

class _PixabayVideoPlayerDialogState extends State<PixabayVideoPlayerDialog> {
  late VideoPlayerController _controller;
  bool _initialized = false;
  bool _hasError = false;

  @override
  void initState() {
    super.initState();
    _controller = VideoPlayerController.networkUrl(Uri.parse(widget.video.videoUrl))
      ..initialize().then((_) {
        if (mounted) {
          setState(() => _initialized = true);
          _controller.play();
          _controller.setLooping(true);
        }
      }).catchError((_) {
        if (mounted) setState(() => _hasError = true);
      });
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Dialog(
      backgroundColor: Colors.transparent,
      insetPadding: const EdgeInsets.all(12),
      child: Stack(
        children: [
          ClipRRect(
            borderRadius: BorderRadius.circular(20),
            child: Container(
              color: const Color(0xFF010D09),
              child: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  AspectRatio(
                    aspectRatio: _initialized ? _controller.value.aspectRatio : (16 / 9),
                    child: _hasError
                        ? Container(
                            color: const Color(0xFF031D16),
                            child: const Center(
                              child: Text(
                                'Unable to load video stream',
                                style: TextStyle(color: Colors.white54, fontSize: 13),
                              ),
                            ),
                          )
                        : _initialized
                            ? Stack(
                                alignment: Alignment.center,
                                children: [
                                  VideoPlayer(_controller),
                                  GestureDetector(
                                    onTap: () {
                                      setState(() {
                                        _controller.value.isPlaying
                                            ? _controller.pause()
                                            : _controller.play();
                                      });
                                    },
                                    child: AnimatedOpacity(
                                      opacity: _controller.value.isPlaying ? 0.0 : 1.0,
                                      duration: const Duration(milliseconds: 200),
                                      child: Container(
                                        width: 54,
                                        height: 54,
                                        decoration: const BoxDecoration(
                                          color: Colors.black54,
                                          shape: BoxShape.circle,
                                        ),
                                        child: const Icon(Icons.play_arrow, color: Colors.white, size: 36),
                                      ),
                                    ),
                                  ),
                                ],
                              )
                            : Container(
                                color: const Color(0xFF031D16),
                                child: const Center(
                                  child: CircularProgressIndicator(
                                    valueColor: AlwaysStoppedAnimation(AppColors.goldPrimary),
                                  ),
                                ),
                              ),
                  ),
                  Padding(
                    padding: const EdgeInsets.all(16),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          widget.video.title,
                          style: const TextStyle(
                            fontSize: 16,
                            fontWeight: FontWeight.w900,
                            color: AppColors.textWhite,
                          ),
                        ),
                        const SizedBox(height: 4),
                        Text(
                          widget.video.tags,
                          style: const TextStyle(
                            fontSize: 11,
                            color: AppColors.emeraldSubtle,
                          ),
                        ),
                        const SizedBox(height: 12),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Text(
                              '❤️ ${widget.video.likes} • 👁️ ${widget.video.views} • ${widget.video.user}',
                              style: const TextStyle(
                                fontSize: 11,
                                color: AppColors.goldLight,
                                fontWeight: FontWeight.w700,
                              ),
                            ),
                            IconButton(
                              icon: const Icon(Icons.share, color: AppColors.goldPrimary, size: 20),
                              onPressed: () {
                                Share.share('Watch "${widget.video.title}" on Noor-e-ilahi: ${widget.video.videoUrl}');
                              },
                            ),
                          ],
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),
          ),
          Positioned(
            top: 8,
            right: 8,
            child: GestureDetector(
              onTap: () => Navigator.of(context).pop(),
              child: Container(
                padding: const EdgeInsets.all(6),
                decoration: const BoxDecoration(
                  color: Colors.black54,
                  shape: BoxShape.circle,
                ),
                child: const Icon(Icons.close, color: Colors.white, size: 20),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
