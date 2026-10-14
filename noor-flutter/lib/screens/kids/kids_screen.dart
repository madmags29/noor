// ============================================================
// NOOR — Kids Corner & Islamic Quiz Game (Flutter)
// Illustrated Prophet Stories & Interactive Quiz Engine
// ============================================================

import 'package:flutter/material.dart';
import 'package:cached_network_image/cached_network_image.dart';
import '../../theme/app_theme.dart';
import '../../l10n/app_localizations.dart';
import '../../data/islamic_core_data.dart';
import '../../services/analytics_service.dart';

class KidsScreen extends StatefulWidget {
  const KidsScreen({super.key});

  @override
  State<KidsScreen> createState() => _KidsScreenState();
}

class _KidsScreenState extends State<KidsScreen> with SingleTickerProviderStateMixin {
  late TabController _tabController;

  // Quiz Game State
  int _currentQuestionIndex = 0;
  int? _selectedOptionIndex;
  bool _isAnswerSubmitted = false;
  int _score = 0;
  bool _isQuizFinished = false;

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 2, vsync: this);
    _tabController.addListener(() {
      if (_tabController.indexIsChanging) {
        try {
          analytics.trackFeatureClick(
            featureName: _tabController.index == 0 ? 'Tab: Prophet Stories' : 'Tab: Islamic Quiz',
            screen: 'kids',
          );
        } catch (_) {}
      }
    });
  }

  @override
  void dispose() {
    _tabController.dispose();
    super.dispose();
  }

  void _submitAnswer(int index) {
    if (_isAnswerSubmitted) return;
    try {
      analytics.trackFeatureClick(
        featureName: 'Kids Quiz Answer Submitted',
        screen: 'kids',
        metadata: {
          'questionIndex': _currentQuestionIndex,
          'selected': kKidsQuiz[_currentQuestionIndex].options[index],
          'isCorrect': index == kKidsQuiz[_currentQuestionIndex].correctIndex,
        },
      );
    } catch (_) {}

    setState(() {
      _selectedOptionIndex = index;
      _isAnswerSubmitted = true;
      if (index == kKidsQuiz[_currentQuestionIndex].correctIndex) {
        _score++;
      }
    });
  }

  void _nextQuestion() {
    try {
      analytics.trackFeatureClick(
        featureName: 'Kids Quiz Next Question',
        screen: 'kids',
        metadata: {'nextIndex': _currentQuestionIndex + 1},
      );
    } catch (_) {}

    setState(() {
      if (_currentQuestionIndex < kKidsQuiz.length - 1) {
        _currentQuestionIndex++;
        _selectedOptionIndex = null;
        _isAnswerSubmitted = false;
      } else {
        _isQuizFinished = true;
      }
    });
  }

  void _restartQuiz() {
    try {
      analytics.trackFeatureClick(
        featureName: 'Kids Quiz Retake',
        screen: 'kids',
      );
    } catch (_) {}

    setState(() {
      _currentQuestionIndex = 0;
      _selectedOptionIndex = null;
      _isAnswerSubmitted = false;
      _score = 0;
      _isQuizFinished = false;
    });
  }

  void _showStoryDetails(KidStoryItem story) {
    try {
      analytics.trackKidsStoryRead(
        storyId: story.id,
        storyTitle: story.title,
      );
    } catch (_) {}
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: AppColors.bgCard,
      shape: const RoundedRectangleBorder(borderRadius: BorderRadius.vertical(top: Radius.circular(24))),
      builder: (context) {
        return DraggableScrollableSheet(
          initialChildSize: 0.85,
          maxChildSize: 0.95,
          minChildSize: 0.5,
          expand: false,
          builder: (context, scrollController) {
            return SingleChildScrollView(
              controller: scrollController,
              padding: const EdgeInsets.all(22),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  Center(
                    child: Container(
                      width: 44,
                      height: 4.5,
                      decoration: BoxDecoration(color: AppColors.emeraldSubtle.withValues(alpha: 0.4), borderRadius: BorderRadius.circular(2.5)),
                    ),
                  ),
                  const SizedBox(height: 16),

                  // Hero Illustration
                  ClipRRect(
                    borderRadius: BorderRadius.circular(18),
                    child: AspectRatio(
                      aspectRatio: 16 / 9,
                      child: _buildStoryImage(story, isHero: true),
                    ),
                  ),
                  const SizedBox(height: 16),

                  Text(
                    story.title,
                    style: const TextStyle(fontSize: 20, fontWeight: FontWeight.w900, color: AppColors.textWhite),
                  ),
                  const SizedBox(height: 4),
                  Text(
                    story.prophetName,
                    style: const TextStyle(fontSize: 14, fontWeight: FontWeight.bold, color: AppColors.goldPrimary),
                  ),
                  const SizedBox(height: 16),
                  Text(
                    story.fullStory,
                    style: const TextStyle(fontSize: 14, color: AppColors.textWhite, height: 1.6),
                  ),
                  const SizedBox(height: 20),
                  if (story.keyAyah.isNotEmpty) ...[
                    Container(
                      padding: const EdgeInsets.all(16),
                      decoration: BoxDecoration(
                        color: AppColors.bgDark,
                        borderRadius: BorderRadius.circular(16),
                        border: Border.all(color: AppColors.goldPrimary.withValues(alpha: 0.3)),
                      ),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.stretch,
                        children: [
                          Text(
                            story.keyAyah,
                            textAlign: TextAlign.center,
                            textDirection: TextDirection.rtl,
                            style: const TextStyle(
                              fontSize: 18,
                              fontWeight: FontWeight.w700,
                              color: AppColors.goldLight,
                              height: 1.8,
                            ),
                          ),
                          const SizedBox(height: 8),
                          Text(
                            story.ayahRef,
                            textAlign: TextAlign.center,
                            style: const TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: AppColors.emeraldSubtle),
                          ),
                        ],
                      ),
                    ),
                    const SizedBox(height: 16),
                  ],
                  Container(
                    padding: const EdgeInsets.all(16),
                    decoration: BoxDecoration(
                      color: AppColors.bgDark,
                      borderRadius: BorderRadius.circular(16),
                      border: Border.all(color: AppColors.emeraldPrimary.withValues(alpha: 0.3)),
                    ),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        const Row(
                          children: [
                            Icon(Icons.star, size: 16, color: AppColors.goldPrimary),
                            SizedBox(width: 8),
                            Text('Moral Lesson for Young Minds', style: TextStyle(fontSize: 13, fontWeight: FontWeight.bold, color: AppColors.goldPrimary)),
                          ],
                        ),
                        const SizedBox(height: 8),
                        Text(story.moralLesson, style: const TextStyle(fontSize: 13, color: AppColors.textWhite, height: 1.4)),
                      ],
                    ),
                  ),
                  const SizedBox(height: 10),
                ],
              ),
            );
          },
        );
      },
    );
  }

  Widget _buildStoryImage(KidStoryItem story, {bool isHero = false}) {
    if (story.imageAsset != null) {
      return Image.asset(
        story.imageAsset!,
        fit: BoxFit.cover,
        errorBuilder: (context, error, stackTrace) {
          if (story.imageUrl != null) {
            return CachedNetworkImage(
              imageUrl: story.imageUrl!,
              fit: BoxFit.cover,
              placeholder: (context, url) => Container(
                color: const Color(0xFF03261C),
                child: const Center(
                  child: CircularProgressIndicator(color: AppColors.goldPrimary, strokeWidth: 2),
                ),
              ),
              errorWidget: (_, __, ___) => _buildStoryImagePlaceholder(story),
            );
          }
          return _buildStoryImagePlaceholder(story);
        },
      );
    } else if (story.imageUrl != null) {
      return CachedNetworkImage(
        imageUrl: story.imageUrl!,
        fit: BoxFit.cover,
        placeholder: (context, url) => Container(
          color: const Color(0xFF03261C),
          child: const Center(
            child: CircularProgressIndicator(color: AppColors.goldPrimary, strokeWidth: 2),
          ),
        ),
        errorWidget: (_, __, ___) => _buildStoryImagePlaceholder(story),
      );
    }
    return _buildStoryImagePlaceholder(story);
  }

  Widget _buildStoryImagePlaceholder(KidStoryItem story) {
    return Container(
      decoration: const BoxDecoration(
        gradient: LinearGradient(
          colors: [Color(0xFF064E3B), Color(0xFF022C22)],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
      ),
      child: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const Icon(Icons.auto_stories, color: AppColors.goldPrimary, size: 36),
            const SizedBox(height: 6),
            Text(
              story.prophetName,
              style: const TextStyle(
                color: AppColors.goldLight,
                fontSize: 12,
                fontWeight: FontWeight.w800,
              ),
            ),
          ],
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final t = AppLocalizations.of(context)!;

    return Scaffold(
      backgroundColor: AppColors.bgDark,
      appBar: AppBar(
        backgroundColor: AppColors.bgDark,
        title: Text(t.kids, style: const TextStyle(fontWeight: FontWeight.w900, color: AppColors.textWhite)),
        iconTheme: const IconThemeData(color: AppColors.goldPrimary),
        bottom: TabBar(
          controller: _tabController,
          indicatorColor: AppColors.goldPrimary,
          labelColor: AppColors.goldPrimary,
          unselectedLabelColor: AppColors.emeraldSubtle,
          labelStyle: const TextStyle(fontWeight: FontWeight.w800, fontSize: 14),
          tabs: const [
            Tab(text: 'Prophet Stories'),
            Tab(text: 'Islamic Quiz Game'),
          ],
        ),
      ),
      body: TabBarView(
        controller: _tabController,
        children: [
          _buildStoriesTab(),
          _buildQuizTab(),
        ],
      ),
    );
  }

  Widget _buildStoriesTab() {
    return ListView.builder(
      padding: const EdgeInsets.all(16),
      itemCount: kKidsStories.length,
      itemBuilder: (context, index) {
        final story = kKidsStories[index];
        return Container(
          margin: const EdgeInsets.only(bottom: 18),
          decoration: BoxDecoration(
            color: AppColors.bgCard,
            borderRadius: BorderRadius.circular(20),
            border: Border.all(color: AppColors.borderSubtle),
            boxShadow: const [
              BoxShadow(
                color: Colors.black38,
                blurRadius: 10,
                offset: Offset(0, 4),
              ),
            ],
          ),
          child: Material(
            color: Colors.transparent,
            child: InkWell(
              borderRadius: BorderRadius.circular(20),
              onTap: () => _showStoryDetails(story),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  // Illustration Banner with Gradient Overlay
                  ClipRRect(
                    borderRadius: const BorderRadius.vertical(top: Radius.circular(20)),
                    child: AspectRatio(
                      aspectRatio: 16 / 9,
                      child: Stack(
                        fit: StackFit.expand,
                        children: [
                          _buildStoryImage(story),
                          Positioned(
                            bottom: 0,
                            left: 0,
                            right: 0,
                            height: 48,
                            child: Container(
                              decoration: const BoxDecoration(
                                gradient: LinearGradient(
                                  begin: Alignment.topCenter,
                                  end: Alignment.bottomCenter,
                                  colors: [Colors.transparent, AppColors.bgCard],
                                ),
                              ),
                            ),
                          ),
                          Positioned(
                            top: 12,
                            left: 12,
                            child: Container(
                              padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                              decoration: BoxDecoration(
                                color: const Color(0xCC011610),
                                borderRadius: BorderRadius.circular(10),
                                border: Border.all(color: AppColors.goldPrimary.withValues(alpha: 0.6)),
                              ),
                              child: Text(
                                story.prophetName,
                                style: const TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: AppColors.goldLight),
                              ),
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),

                  // Text Info
                  Padding(
                    padding: const EdgeInsets.all(16),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(story.title, style: const TextStyle(fontSize: 16, fontWeight: FontWeight.w800, color: AppColors.textWhite)),
                        const SizedBox(height: 6),
                        Text(story.summary, style: const TextStyle(fontSize: 13, color: AppColors.emeraldSubtle, height: 1.4)),
                        const SizedBox(height: 12),
                        const Row(
                          mainAxisAlignment: MainAxisAlignment.end,
                          children: [
                            Text('Read Full Story', style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: AppColors.goldPrimary)),
                            SizedBox(width: 4),
                            Icon(Icons.arrow_forward, size: 14, color: AppColors.goldPrimary),
                          ],
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),
          ),
        );
      },
    );
  }

  Widget _buildQuizTab() {
    if (_isQuizFinished) {
      return Center(
        child: Padding(
          padding: const EdgeInsets.all(24),
          child: Container(
            padding: const EdgeInsets.all(24),
            decoration: BoxDecoration(
              color: AppColors.bgCard,
              borderRadius: BorderRadius.circular(24),
              border: Border.all(color: AppColors.goldPrimary.withValues(alpha: 0.4)),
            ),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                const Icon(Icons.emoji_events, size: 64, color: AppColors.goldPrimary),
                const SizedBox(height: 16),
                const Text('Quiz Completed!', style: TextStyle(fontSize: 22, fontWeight: FontWeight.w900, color: AppColors.textWhite)),
                const SizedBox(height: 8),
                Text(
                  'Your Score: $_score / ${kKidsQuiz.length}',
                  style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: AppColors.goldLight),
                ),
                const SizedBox(height: 8),
                Text(
                  _score == kKidsQuiz.length ? 'Masha\'Allah! Outstanding Islamic knowledge!' : 'Great effort! Keep learning more about Islam every day.',
                  textAlign: TextAlign.center,
                  style: const TextStyle(fontSize: 13, color: AppColors.emeraldSubtle),
                ),
                const SizedBox(height: 24),
                ElevatedButton.icon(
                  style: ElevatedButton.styleFrom(
                    backgroundColor: AppColors.goldPrimary,
                    foregroundColor: AppColors.bgDark,
                    padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 12),
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
                  ),
                  icon: const Icon(Icons.refresh),
                  label: const Text('Play Again', style: TextStyle(fontWeight: FontWeight.w800)),
                  onPressed: _restartQuiz,
                ),
              ],
            ),
          ),
        ),
      );
    }

    final q = kKidsQuiz[_currentQuestionIndex];

    return SingleChildScrollView(
      padding: const EdgeInsets.all(20),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          // Question Header
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                'Question ${_currentQuestionIndex + 1} of ${kKidsQuiz.length}',
                style: const TextStyle(fontSize: 13, fontWeight: FontWeight.bold, color: AppColors.emeraldSubtle),
              ),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                decoration: BoxDecoration(
                  color: const Color(0x26F59E0B),
                  borderRadius: BorderRadius.circular(10),
                  border: Border.all(color: const Color(0x59F59E0B)),
                ),
                child: Text('Score: $_score', style: const TextStyle(fontSize: 12, fontWeight: FontWeight.w800, color: AppColors.goldLight)),
              ),
            ],
          ),
          const SizedBox(height: 10),
          LinearProgressIndicator(
            value: (_currentQuestionIndex + 1) / kKidsQuiz.length,
            backgroundColor: Colors.white10,
            valueColor: const AlwaysStoppedAnimation<Color>(AppColors.goldPrimary),
          ),
          const SizedBox(height: 20),

          // Question Card
          Container(
            padding: const EdgeInsets.all(20),
            decoration: BoxDecoration(
              color: AppColors.bgCard,
              borderRadius: BorderRadius.circular(20),
              border: Border.all(color: AppColors.borderSubtle),
            ),
            child: Text(
              q.question,
              style: const TextStyle(fontSize: 17, fontWeight: FontWeight.w800, color: AppColors.textWhite, height: 1.4),
            ),
          ),
          const SizedBox(height: 16),

          // Options
          ...List.generate(q.options.length, (optIdx) {
            final isSelected = _selectedOptionIndex == optIdx;
            final isCorrect = optIdx == q.correctIndex;

            Color bgColor = AppColors.bgCard;
            Color borderColor = AppColors.borderSubtle;
            if (_isAnswerSubmitted) {
              if (isCorrect) {
                bgColor = const Color(0x2634D399);
                borderColor = const Color(0xFF34D399);
              } else if (isSelected) {
                bgColor = const Color(0x26EF4444);
                borderColor = const Color(0xFFEF4444);
              }
            }

            return Container(
              margin: const EdgeInsets.only(bottom: 10),
              decoration: BoxDecoration(
                color: bgColor,
                borderRadius: BorderRadius.circular(16),
                border: Border.all(color: borderColor),
              ),
              child: ListTile(
                title: Text(q.options[optIdx], style: const TextStyle(fontSize: 14, fontWeight: FontWeight.bold, color: AppColors.textWhite)),
                trailing: _isAnswerSubmitted
                    ? Icon(
                        isCorrect ? Icons.check_circle : (isSelected ? Icons.cancel : null),
                        color: isCorrect ? const Color(0xFF34D399) : const Color(0xFFEF4444),
                      )
                    : null,
                onTap: () => _submitAnswer(optIdx),
              ),
            );
          }),

          if (_isAnswerSubmitted) ...[
            const SizedBox(height: 16),
            Container(
              padding: const EdgeInsets.all(14),
              decoration: BoxDecoration(
                color: AppColors.bgDark,
                borderRadius: BorderRadius.circular(14),
                border: Border.all(color: AppColors.goldPrimary.withValues(alpha: 0.3)),
              ),
              child: Text(
                q.explanation,
                style: const TextStyle(fontSize: 12, color: AppColors.textWhite, height: 1.4),
              ),
            ),
            const SizedBox(height: 16),
            ElevatedButton(
              style: ElevatedButton.styleFrom(
                backgroundColor: AppColors.goldPrimary,
                foregroundColor: AppColors.bgDark,
                padding: const EdgeInsets.symmetric(vertical: 14),
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
              ),
              onPressed: _nextQuestion,
              child: Text(
                _currentQuestionIndex < kKidsQuiz.length - 1 ? 'Next Question' : 'See Results',
                style: const TextStyle(fontWeight: FontWeight.w900, fontSize: 14),
              ),
            ),
          ],
        ],
      ),
    );
  }
}
