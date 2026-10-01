// ============================================================
// NOOR — Contact & Official Support Screen (Flutter)
// Direct inquiries, scholar feedback & email to salam@nooreilahi.com
// ============================================================

import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';
import '../../theme/app_theme.dart';
import '../../l10n/app_localizations.dart';

class ContactScreen extends StatefulWidget {
  const ContactScreen({super.key});

  @override
  State<ContactScreen> createState() => _ContactScreenState();
}

class _ContactScreenState extends State<ContactScreen> {
  final _formKey = GlobalKey<FormState>();
  final _nameCtrl = TextEditingController();
  final _emailCtrl = TextEditingController();
  final _msgCtrl = TextEditingController();
  String _selectedSubject = 'General Inquiry';
  bool _isSubmitted = false;

  final List<String> _subjects = [
    'General Inquiry',
    'Scholarly / Fiqh Question',
    'Content Verification / Correction',
    'Technical Bug / Feature Request',
    'Partnership & Charity Outreach',
  ];

  @override
  void dispose() {
    _nameCtrl.dispose();
    _emailCtrl.dispose();
    _msgCtrl.dispose();
    super.dispose();
  }

  Future<void> _sendEmailDirectly() async {
    final email = Uri.encodeComponent("salam@nooreilahi.com");
    final subject = Uri.encodeComponent("[NOOR App] $_selectedSubject - ${_nameCtrl.text}");
    final body = Uri.encodeComponent("${_msgCtrl.text}\n\n---\nName: ${_nameCtrl.text}\nEmail: ${_emailCtrl.text}\nPlatform: Noor-e-ilahi Mobile App");
    final mailtoUri = Uri.parse("mailto:$email?subject=$subject&body=$body");

    try {
      if (await canLaunchUrl(mailtoUri)) {
        await launchUrl(mailtoUri, mode: LaunchMode.externalApplication);
      }
    } catch (_) {}
  }

  void _submit() async {
    if (_formKey.currentState!.validate()) {
      setState(() => _isSubmitted = true);
      await _sendEmailDirectly();
    }
  }

  @override
  Widget build(BuildContext context) {
    final t = AppLocalizations.of(context)!;

    return Scaffold(
      backgroundColor: AppColors.bgDark,
      appBar: AppBar(
        backgroundColor: AppColors.bgDark,
        title: Text(t.contact, style: const TextStyle(fontWeight: FontWeight.w900, color: AppColors.textWhite)),
        iconTheme: const IconThemeData(color: AppColors.goldPrimary),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            // Hero Banner
            Container(
              padding: const EdgeInsets.all(20),
              decoration: BoxDecoration(
                gradient: const LinearGradient(
                  colors: [Color(0xFF03281E), Color(0xFF064E3B)],
                  begin: Alignment.topLeft,
                  end: Alignment.bottomRight,
                ),
                borderRadius: BorderRadius.circular(20),
                border: Border.all(color: const Color(0xFFF59E0B).withOpacity(0.3)),
              ),
              child: const Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    children: [
                      Icon(Icons.mark_email_read, color: AppColors.goldPrimary, size: 20),
                      SizedBox(width: 8),
                      Text('Official Contact & Support', style: TextStyle(fontSize: 16, fontWeight: FontWeight.w900, color: AppColors.textWhite)),
                    ],
                  ),
                  SizedBox(height: 6),
                  Text(
                    'Direct correspondence for business partnerships, platform feedback, and classical Islamic support. All inquiries are reviewed by our team and scholars.',
                    style: TextStyle(fontSize: 12, color: AppColors.emeraldSubtle, height: 1.5),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 16),

            // Quick Email Card
            Material(
              color: Colors.transparent,
              child: InkWell(
                borderRadius: BorderRadius.circular(16),
                onTap: () async {
                  final uri = Uri.parse("mailto:salam@nooreilahi.com?subject=Inquiry%20from%20Noor%20App");
                  if (await canLaunchUrl(uri)) {
                    await launchUrl(uri, mode: LaunchMode.externalApplication);
                  }
                },
                child: Container(
                  padding: const EdgeInsets.all(14),
                  decoration: BoxDecoration(
                    color: AppColors.bgCard,
                    borderRadius: BorderRadius.circular(16),
                    border: Border.all(color: const Color(0xFF34D399).withOpacity(0.3)),
                  ),
                  child: Row(
                    children: [
                      Container(
                        padding: const EdgeInsets.all(10),
                        decoration: BoxDecoration(
                          color: const Color(0x26F59E0B),
                          borderRadius: BorderRadius.circular(12),
                        ),
                        child: const Icon(Icons.email, color: AppColors.goldPrimary, size: 22),
                      ),
                      const SizedBox(width: 14),
                      const Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              'Official Email',
                              style: TextStyle(fontSize: 11, color: AppColors.emeraldSubtle),
                            ),
                            Text(
                              'salam@nooreilahi.com',
                              style: TextStyle(fontSize: 14, fontWeight: FontWeight.w800, color: AppColors.goldLight),
                            ),
                          ],
                        ),
                      ),
                      const Icon(Icons.arrow_forward_ios, size: 14, color: AppColors.emeraldSubtle),
                    ],
                  ),
                ),
              ),
            ),

            const SizedBox(height: 16),

            if (_isSubmitted)
              Container(
                padding: const EdgeInsets.all(24),
                decoration: BoxDecoration(
                  color: AppColors.bgCard,
                  borderRadius: BorderRadius.circular(20),
                  border: Border.all(color: const Color(0xFF34D399)),
                ),
                child: Column(
                  children: [
                    const Icon(Icons.check_circle_outline, color: Color(0xFF34D399), size: 48),
                    const SizedBox(height: 12),
                    const Text('JazakAllah Khair!', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: AppColors.textWhite)),
                    const SizedBox(height: 6),
                    const Text(
                      'Your message has been dispatched to salam@nooreilahi.com. Our editorial and scholarly team will respond shortly inshaAllah.',
                      textAlign: TextAlign.center,
                      style: TextStyle(fontSize: 12, color: AppColors.emeraldSubtle, height: 1.5),
                    ),
                    const SizedBox(height: 16),
                    ElevatedButton(
                      style: ElevatedButton.styleFrom(backgroundColor: AppColors.goldPrimary, foregroundColor: AppColors.bgDark),
                      onPressed: () {
                        setState(() {
                          _isSubmitted = false;
                          _nameCtrl.clear();
                          _emailCtrl.clear();
                          _msgCtrl.clear();
                        });
                      },
                      child: const Text('Send Another Message', style: TextStyle(fontWeight: FontWeight.bold)),
                    ),
                  ],
                ),
              )
            else
              Container(
                padding: const EdgeInsets.all(20),
                decoration: BoxDecoration(
                  color: AppColors.bgCard,
                  borderRadius: BorderRadius.circular(20),
                  border: Border.all(color: AppColors.borderSubtle),
                ),
                child: Form(
                  key: _formKey,
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.stretch,
                    children: [
                      const Text('Send Us a Message', style: TextStyle(fontSize: 16, fontWeight: FontWeight.w800, color: AppColors.textWhite)),
                      const SizedBox(height: 16),

                      // Subject Dropdown
                      const Text('Inquiry Subject', style: TextStyle(fontSize: 11, fontWeight: FontWeight.w700, color: AppColors.emeraldSubtle)),
                      const SizedBox(height: 6),
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 14),
                        decoration: BoxDecoration(
                          color: AppColors.bgDark,
                          borderRadius: BorderRadius.circular(12),
                          border: Border.all(color: AppColors.borderSubtle),
                        ),
                        child: DropdownButtonHideUnderline(
                          child: DropdownButton<String>(
                            value: _selectedSubject,
                            dropdownColor: AppColors.bgCard,
                            isExpanded: true,
                            style: const TextStyle(color: AppColors.textWhite, fontSize: 13, fontWeight: FontWeight.bold),
                            items: _subjects.map((s) => DropdownMenuItem(value: s, child: Text(s))).toList(),
                            onChanged: (val) => setState(() => _selectedSubject = val!),
                          ),
                        ),
                      ),
                      const SizedBox(height: 14),

                      // Name
                      _buildTextField('Your Name', _nameCtrl, 'Please enter your name', Icons.person_outline),
                      const SizedBox(height: 14),

                      // Email
                      _buildTextField('Your Email Address', _emailCtrl, 'Please enter a valid email', Icons.email_outlined, keyboardType: TextInputType.emailAddress),
                      const SizedBox(height: 14),

                      // Message
                      _buildTextField('Your Message / Question', _msgCtrl, 'Please write your message', Icons.edit_note, maxLines: 4),
                      const SizedBox(height: 20),

                      // Submit Button
                      ElevatedButton(
                        style: ElevatedButton.styleFrom(
                          backgroundColor: AppColors.goldPrimary,
                          foregroundColor: AppColors.bgDark,
                          padding: const EdgeInsets.symmetric(vertical: 14),
                          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
                        ),
                        onPressed: _submit,
                        child: const Row(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            Icon(Icons.send, size: 18),
                            SizedBox(width: 8),
                            Text('Send to salam@nooreilahi.com', style: TextStyle(fontWeight: FontWeight.w900, fontSize: 14)),
                          ],
                        ),
                      ),
                    ],
                  ),
                ),
              ),
          ],
        ),
      ),
    );
  }

  Widget _buildTextField(String label, TextEditingController ctrl, String validatorMsg, IconData icon, {int maxLines = 1, TextInputType? keyboardType}) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(label, style: const TextStyle(fontSize: 11, fontWeight: FontWeight.w700, color: AppColors.emeraldSubtle)),
        const SizedBox(height: 6),
        TextFormField(
          controller: ctrl,
          maxLines: maxLines,
          keyboardType: keyboardType,
          style: const TextStyle(color: AppColors.textWhite, fontSize: 13),
          validator: (val) => (val == null || val.trim().isEmpty) ? validatorMsg : null,
          decoration: InputDecoration(
            prefixIcon: Icon(icon, color: AppColors.goldPrimary, size: 18),
            filled: true,
            fillColor: AppColors.bgDark,
            border: OutlineInputBorder(borderRadius: BorderRadius.circular(12), borderSide: const BorderSide(color: AppColors.borderSubtle)),
            enabledBorder: OutlineInputBorder(borderRadius: BorderRadius.circular(12), borderSide: const BorderSide(color: AppColors.borderSubtle)),
            focusedBorder: OutlineInputBorder(borderRadius: BorderRadius.circular(12), borderSide: const BorderSide(color: AppColors.goldPrimary)),
            contentPadding: const EdgeInsets.symmetric(horizontal: 14, vertical: 12),
          ),
        ),
      ],
    );
  }
}
