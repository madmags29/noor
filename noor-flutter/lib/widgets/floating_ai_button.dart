import 'package:flutter/material.dart';

class FloatingAiButton extends StatelessWidget {
  final VoidCallback onPressed;
  const FloatingAiButton({super.key, required this.onPressed});

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onPressed,
      child: Container(
        width: 52, height: 52,
        decoration: BoxDecoration(
          gradient: const LinearGradient(colors: [Color(0xFFF59E0B), Color(0xFFD97706)], begin: Alignment.topLeft, end: Alignment.bottomRight),
          borderRadius: BorderRadius.circular(26),
          boxShadow: const [BoxShadow(color: Color(0x4DF59E0B), offset: Offset(0, 4), blurRadius: 12)],
        ),
        child: const Center(
          child: Text('✨', style: TextStyle(fontSize: 22)),
        ),
      ),
    );
  }
}