// ============================================================
// NOOR — Authentication Modal (Flutter)
// Official Google Authentication, Email Login & User Profile
// Matching noor-web/src/components/AuthModal.tsx
// ============================================================

import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import '../theme/app_theme.dart';
import '../providers/auth_provider.dart';

class AuthModal extends ConsumerStatefulWidget {
  final VoidCallback onClose;
  const AuthModal({super.key, required this.onClose});

  @override
  ConsumerState<AuthModal> createState() => _AuthModalState();
}

class _AuthModalState extends ConsumerState<AuthModal> {
  final TextEditingController _nameController = TextEditingController();
  final TextEditingController _emailController = TextEditingController();
  bool _isEmailMode = false;
  bool _isLoading = false;

  @override
  void dispose() {
    _nameController.dispose();
    _emailController.dispose();
    super.dispose();
  }

  Future<void> _handleGoogleSignIn() async {
    setState(() => _isLoading = true);
    try {
      final user = await ref.read(authProvider.notifier).signInWithGoogle();
      if (user != null) {
        widget.onClose();
        if (mounted) {
          ScaffoldMessenger.of(context).showSnackBar(
            SnackBar(
              content: Text('✨ Welcome, ${user.name}! Signed in successfully with Google.'),
              backgroundColor: const Color(0xFF065F46),
              duration: const Duration(seconds: 3),
            ),
          );
        }
      }
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text('Sign-in notice: ${e.toString()}'),
            backgroundColor: const Color(0xFF991B1B),
          ),
        );
      }
    } finally {
      if (mounted) setState(() => _isLoading = false);
    }
  }

  Future<void> _handleEmailSignIn() async {
    final email = _emailController.text.trim();
    final name = _nameController.text.trim();

    if (email.isEmpty || !email.contains('@')) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('Please enter a valid email address (e.g. pilgrim@gmail.com)'),
          backgroundColor: Color(0xFF991B1B),
        ),
      );
      return;
    }
    setState(() => _isLoading = true);
    try {
      await ref.read(authProvider.notifier).signInWithEmail(name, email);
      widget.onClose();
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text('✨ Welcome, ${name.isNotEmpty ? name : 'Pilgrim'}! Signed in to Noor.'),
            backgroundColor: const Color(0xFF065F46),
            duration: const Duration(seconds: 3),
          ),
        );
      }
    } catch (_) {
    } finally {
      if (mounted) setState(() => _isLoading = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    final user = ref.watch(authProvider).value;

    return GestureDetector(
      behavior: HitTestBehavior.opaque,
      onTap: widget.onClose,
      child: Container(
        color: const Color(0xCC000000),
        child: GestureDetector(
          onTap: () {},
          child: Align(
            alignment: Alignment.bottomCenter,
            child: Container(
              margin: const EdgeInsets.all(16),
              padding: const EdgeInsets.fromLTRB(22, 24, 22, 20),
              decoration: BoxDecoration(
                color: const Color(0xFF021711),
                borderRadius: BorderRadius.circular(28),
                border: Border.all(
                  color: const Color(0xFF34D399).withValues(alpha: 0.35),
                ),
                boxShadow: const [
                  BoxShadow(
                    color: Colors.black87,
                    blurRadius: 30,
                    spreadRadius: 4,
                  ),
                ],
              ),
              child: user != null
                  ? _buildLoggedInView(context, user)
                  : _buildLoginView(context),
            ),
          ),
        ),
      ),
    );
  }

  // ── View When User is Logged In ───────────────────────────
  Widget _buildLoggedInView(BuildContext context, AuthUser user) {
    return Column(
      mainAxisSize: MainAxisSize.min,
      children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Row(
              children: [
                Container(
                  width: 48,
                  height: 48,
                  decoration: BoxDecoration(
                    color: const Color(0xFF065F46),
                    shape: BoxShape.circle,
                    border: Border.all(color: AppColors.goldPrimary, width: 2),
                  ),
                  child: Center(
                    child: Text(
                      user.name.isNotEmpty ? user.name[0].toUpperCase() : 'N',
                      style: const TextStyle(
                        fontSize: 20,
                        fontWeight: FontWeight.w900,
                        color: AppColors.goldLight,
                      ),
                    ),
                  ),
                ),
                const SizedBox(width: 14),
                Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      user.name,
                      style: const TextStyle(
                        fontSize: 16,
                        fontWeight: FontWeight.w800,
                        color: Colors.white,
                      ),
                    ),
                    Text(
                      user.email,
                      style: const TextStyle(
                        fontSize: 12,
                        color: Color(0xFF6EE7B7),
                      ),
                    ),
                  ],
                ),
              ],
            ),
            GestureDetector(
              onTap: widget.onClose,
              child: Container(
                padding: const EdgeInsets.all(6),
                decoration: BoxDecoration(
                  color: Colors.white.withValues(alpha: 0.08),
                  shape: BoxShape.circle,
                ),
                child: const Icon(Icons.close, size: 18, color: Colors.white70),
              ),
            ),
          ],
        ),
        const SizedBox(height: 18),
        Container(
          padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
          decoration: BoxDecoration(
            color: const Color(0x1AF59E0B),
            borderRadius: BorderRadius.circular(14),
            border: Border.all(color: const Color(0x40F59E0B)),
          ),
          child: Row(
            children: const [
              Icon(Icons.verified, size: 16, color: AppColors.goldPrimary),
              SizedBox(width: 8),
              Expanded(
                child: Text(
                  'Verified Spiritual Member • Active Deen Sync',
                  style: TextStyle(
                    fontSize: 12,
                    fontWeight: FontWeight.w700,
                    color: AppColors.goldLight,
                  ),
                ),
              ),
            ],
          ),
        ),
        const SizedBox(height: 18),
        Row(
          children: [
            Expanded(
              child: GestureDetector(
                onTap: () {
                  widget.onClose();
                  context.push('/dashboard');
                },
                child: Container(
                  padding: const EdgeInsets.symmetric(vertical: 13),
                  decoration: BoxDecoration(
                    color: AppColors.goldPrimary,
                    borderRadius: BorderRadius.circular(16),
                  ),
                  child: const Center(
                    child: Text(
                      'View Deen Profile',
                      style: TextStyle(
                        color: Color(0xFF021711),
                        fontSize: 13,
                        fontWeight: FontWeight.w900,
                      ),
                    ),
                  ),
                ),
              ),
            ),
            const SizedBox(width: 10),
            GestureDetector(
              onTap: () async {
                await ref.read(authProvider.notifier).signOut();
              },
              child: Container(
                padding: const EdgeInsets.symmetric(horizontal: 18, vertical: 13),
                decoration: BoxDecoration(
                  color: const Color(0x26EF4444),
                  borderRadius: BorderRadius.circular(16),
                  border: Border.all(color: const Color(0x66EF4444)),
                ),
                child: const Text(
                  'Sign Out',
                  style: TextStyle(
                    color: Color(0xFFFCA5A5),
                    fontSize: 13,
                    fontWeight: FontWeight.w800,
                  ),
                ),
              ),
            ),
          ],
        ),
      ],
    );
  }

  // ── View When User is Not Logged In ───────────────────────
  Widget _buildLoginView(BuildContext context) {
    return Column(
      mainAxisSize: MainAxisSize.min,
      children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Row(
              children: [
                Container(
                  padding: const EdgeInsets.all(8),
                  decoration: BoxDecoration(
                    color: const Color(0xFF064E3B),
                    borderRadius: BorderRadius.circular(12),
                    border: Border.all(
                      color: const Color(0xFF10B981).withValues(alpha: 0.3),
                    ),
                  ),
                  child: const Icon(
                    Icons.lock_outline,
                    size: 18,
                    color: AppColors.goldPrimary,
                  ),
                ),
                const SizedBox(width: 12),
                const Text(
                  'Sign In to Noor',
                  style: TextStyle(
                    fontSize: 18,
                    fontWeight: FontWeight.w800,
                    color: Colors.white,
                  ),
                ),
              ],
            ),
            GestureDetector(
              onTap: widget.onClose,
              child: Container(
                padding: const EdgeInsets.all(6),
                decoration: BoxDecoration(
                  color: Colors.white.withValues(alpha: 0.08),
                  shape: BoxShape.circle,
                ),
                child: const Icon(Icons.close, size: 18, color: Colors.white70),
              ),
            ),
          ],
        ),
        const SizedBox(height: 8),
        const Align(
          alignment: Alignment.centerLeft,
          child: Text(
            'Sync your prayer streak, Quran reading, and daily deen tracker across all devices.',
            style: TextStyle(fontSize: 12, color: Color(0xFF94A3B8), height: 1.4),
          ),
        ),
        const SizedBox(height: 20),

        // Google Sign In Button
        GestureDetector(
          onTap: _isLoading ? null : _handleGoogleSignIn,
          child: Container(
            padding: const EdgeInsets.symmetric(vertical: 13, horizontal: 16),
            decoration: BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.circular(16),
              boxShadow: [
                BoxShadow(
                  color: Colors.black.withValues(alpha: 0.3),
                  blurRadius: 10,
                  offset: const Offset(0, 2),
                ),
              ],
            ),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                if (_isLoading && !_isEmailMode)
                  const SizedBox(
                    width: 18,
                    height: 18,
                    child: CircularProgressIndicator(
                      strokeWidth: 2,
                      color: Color(0xFF1E293B),
                    ),
                  )
                else ...[
                  _buildGoogleIcon(),
                  const SizedBox(width: 12),
                  const Text(
                    'Continue with Google',
                    style: TextStyle(
                      color: Color(0xFF1E293B),
                      fontSize: 14,
                      fontWeight: FontWeight.w800,
                    ),
                  ),
                ],
              ],
            ),
          ),
        ),

        const SizedBox(height: 14),

        if (!_isEmailMode)
          GestureDetector(
            onTap: () => setState(() => _isEmailMode = true),
            child: Container(
              padding: const EdgeInsets.symmetric(vertical: 12),
              decoration: BoxDecoration(
                color: const Color(0x14FFFFFF),
                borderRadius: BorderRadius.circular(16),
                border: Border.all(color: const Color(0x2234D399)),
              ),
              child: const Center(
                child: Text(
                  'Or sign in with Name & Email',
                  style: TextStyle(
                    color: Color(0xFF6EE7B7),
                    fontSize: 12.5,
                    fontWeight: FontWeight.w700,
                  ),
                ),
              ),
            ),
          )
        else ...[
          TextField(
            controller: _nameController,
            textInputAction: TextInputAction.next,
            style: const TextStyle(color: Colors.white, fontSize: 13.5),
            decoration: const InputDecoration(
              labelText: 'Full Name',
              hintText: 'e.g. Tariq Mansoor',
              prefixIcon: Icon(Icons.person_outline, size: 20, color: AppColors.goldPrimary),
            ),
          ),
          const SizedBox(height: 10),
          TextField(
            controller: _emailController,
            keyboardType: TextInputType.emailAddress,
            textInputAction: TextInputAction.done,
            style: const TextStyle(color: Colors.white, fontSize: 13.5),
            onSubmitted: (_) => _handleEmailSignIn(),
            decoration: const InputDecoration(
              labelText: 'Email Address',
              hintText: 'e.g. tariq@gmail.com',
              prefixIcon: Icon(Icons.email_outlined, size: 20, color: AppColors.goldPrimary),
            ),
          ),
          const SizedBox(height: 14),
          GestureDetector(
            onTap: _isLoading ? null : _handleEmailSignIn,
            child: Container(
              padding: const EdgeInsets.symmetric(vertical: 13),
              decoration: BoxDecoration(
                color: AppColors.goldPrimary,
                borderRadius: BorderRadius.circular(14),
              ),
              child: Center(
                child: _isLoading
                    ? const SizedBox(
                        width: 16,
                        height: 16,
                        child: CircularProgressIndicator(
                          strokeWidth: 2,
                          color: Color(0xFF021711),
                        ),
                      )
                    : const Text(
                        'Sign In to Account',
                        style: TextStyle(
                          color: Color(0xFF021711),
                          fontSize: 13.5,
                          fontWeight: FontWeight.w900,
                        ),
                      ),
              ),
            ),
          ),
        ],

        const SizedBox(height: 10),
        TextButton(
          onPressed: widget.onClose,
          child: const Text(
            'Continue as Guest',
            style: TextStyle(color: Color(0xFF64748B), fontSize: 12),
          ),
        ),
      ],
    );
  }

  Widget _buildGoogleIcon() {
    return Container(
      width: 20,
      height: 20,
      decoration: const BoxDecoration(shape: BoxShape.circle),
      child: Center(
        child: Text(
          'G',
          style: TextStyle(
            fontSize: 17,
            fontWeight: FontWeight.w900,
            fontFamily: 'sans-serif',
            color: const Color(0xFF4285F4),
          ),
        ),
      ),
    );
  }
}