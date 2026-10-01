// ============================================================
// NOOR — Kids Corner & Islamic Quiz Game (Flutter)
// ============================================================

import 'package:flutter/material.dart';
import '../../theme/app_theme.dart';
import '../../l10n/app_localizations.dart';
import '../../data/islamic_core_data.dart';

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
  }

  @override
  void dispose() {
    _tabController.dispose();
    super.dispose();
  }

  void _submitAnswer(int index) {
    if (_isAnswerSubmitted) return;
    setState(() {
      _selectedOptionIndex = index;
      _isAnswerSubmitted = true;
      if (index == kKidsQuiz[_currentQuestionIndex].correctIndex) {
        _score++;
      }
    });
  }

  void _nextQuestion() {
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
    setState(() {
      _currentQuestionIndex = 0;
      _selectedOptionIndex = null;
      _isAnswerSubmitted = false;
      _score = 0;
      _isQuizFinished = false;
    });
  }

  void _showStoryDetails(KidStoryItem story) {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: AppColors.bgCard,
      shape: const RoundedRectangleBorder(borderRadius: BorderRadius.vertical(top: Radius.circular(24))),
      builder: (context) {
        return DraggableScrollableSheet(
          initialChildSize: 0.8,
          maxChildSize: 0.95,
          minChildSize: 0.5,
          expand: false,
          builder: (context, scrollController) {
            return SingleChildScrollView(
              controller: scrollController,
              padding: const EdgeInsets.all(24),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  Center(
                    child: Container(
                      width: 40,
                      height: 4,
                      decoration: BoxDecoration(color: AppColors.emeraldSubtle.withValues(alpha: 0.4), borderRadius: BorderRadius.circular(2)),
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
                  Container(
                    padding: const EdgeInsets.all(16),
                    decoration: BoxDecoration(
                      color: AppColors.bgDark,
                      borderRadius: BorderRadius.circular(16),
                      border: Border.all(color: AppColors.goldPrimary.withValues(alpha: 0.3)),
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
                ],
              ),
            );
          },
        );
      },
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
          margin: const EdgeInsets.only(bottom: 16),
          decoration: BoxDecoration(
            color: AppColors.bgCard,
            borderRadius: BorderRadius.circular(20),
            border: Border.all(color: AppColors.borderSubtle),
          ),
          child: Material(
            color: Colors.transparent,
            child: InkWell(
              borderRadius: BorderRadius.circular(20),
              onTap: () => _showStoryDetails(story),
              child: Padding(
                padding: const EdgeInsets.all(18),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                      decoration: BoxDecoration(
                        color: AppColors.emeraldPrimary.withValues(alpha: 0.2),
                        borderRadius: BorderRadius.circular(10),
                      ),
                      child: Text(story.prophetName, style: const TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: AppColors.goldPrimary)),
                    ),
                    const SizedBox(height: 8),
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
              border: Border.all(color: AppColors.goldPrimary),
            ),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                const Icon(Icons.emoji_events, size: 54, color: AppColors.goldPrimary),
                const SizedBox(height: 16),
                const Text('MashaAllah! Quiz Complete!', style: TextStyle(fontSize: 20, fontWeight: FontWeight.w900, color: AppColors.textWhite)),
                const SizedBox(height: 8),
                Text('Your Score: $_score / ${kKidsQuiz.length}', style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: AppColors.goldLight)),
                const SizedBox(height: 20),
                ElevatedButton.icon(
                  style: ElevatedButton.styleFrom(backgroundColor: AppColors.goldPrimary, foregroundColor: AppColors.bgDark),
                  icon: const Icon(Icons.replay),
                  label: const Text('Play Again', style: TextStyle(fontWeight: FontWeight.bold)),
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
      padding: const EdgeInsets.all(16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text('Question ${_currentQuestionIndex + 1} of ${kKidsQuiz.length}', style: const TextStyle(color: AppColors.emeraldSubtle, fontWeight: FontWeight.bold)),
              Text('Score: $_score', style: const TextStyle(color: AppColors.goldPrimary, fontWeight: FontWeight.bold)),
            ],
          ),
          const SizedBox(height: 12),
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
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
              ),
              onPressed: _nextQuestion,
              child: Text(
                _currentQuestionIndex < kKidsQuiz.length - 1 ? 'Next Question' : 'View Results',
                style: const TextStyle(fontWeight: FontWeight.w900, fontSize: 15),
              ),
            ),
          ],
        ],
      ),
    );
  }
}
