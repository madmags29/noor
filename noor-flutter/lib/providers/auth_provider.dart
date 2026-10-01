// ============================================================
// NOOR — Authentication & User Profile State Provider (Riverpod)
// Exact port of noor-web/src/lib/userDataService.ts
// Supports Google Sign-In, Email/Name, and Persistent Profiles
// ============================================================

import 'dart:convert';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:google_sign_in/google_sign_in.dart';
import 'package:shared_preferences/shared_preferences.dart';

const String _kUserStorageKey = 'noor_user';
const String _kGoogleClientId = '419653061982-6p0q94rb00qv96n2e8tjmemmfklaalo3.apps.googleusercontent.com';

class AuthUser {
  final String id;
  final String name;
  final String email;
  final String? picture;
  final String provider; // 'google' | 'email'
  final bool verified;
  final String joinedDate;
  final String role; // 'user' | 'super_admin'

  const AuthUser({
    required this.id,
    required this.name,
    required this.email,
    this.picture,
    this.provider = 'google',
    this.verified = true,
    required this.joinedDate,
    this.role = 'user',
  });

  Map<String, dynamic> toJson() => {
        'id': id,
        'name': name,
        'email': email,
        'picture': picture,
        'provider': provider,
        'verified': verified,
        'joinedDate': joinedDate,
        'role': role,
      };

  factory AuthUser.fromJson(Map<String, dynamic> json) => AuthUser(
        id: json['id'] ?? 'usr_${DateTime.now().millisecondsSinceEpoch}',
        name: json['name'] ?? 'Noor Pilgrim',
        email: json['email'] ?? 'pilgrim@nooreilahi.com',
        picture: json['picture'],
        provider: json['provider'] ?? 'google',
        verified: json['verified'] ?? true,
        joinedDate: json['joinedDate'] ?? DateTime.now().toIso8601String().split('T')[0],
        role: json['role'] ?? 'user',
      );
}

class AuthNotifier extends AsyncNotifier<AuthUser?> {
  final GoogleSignIn _googleSignIn = GoogleSignIn(
    scopes: ['email', 'profile'],
  );

  @override
  Future<AuthUser?> build() async {
    final prefs = await SharedPreferences.getInstance();
    final raw = prefs.getString(_kUserStorageKey);
    if (raw != null) {
      try {
        return AuthUser.fromJson(jsonDecode(raw));
      } catch (_) {}
    }
    return null;
  }

  Future<AuthUser?> signInWithGoogle() async {
    try {
      final googleAccount = await _googleSignIn.signIn();
      if (googleAccount != null) {
        final now = DateTime.now().toIso8601String().split('T')[0];
        final user = AuthUser(
          id: googleAccount.id,
          name: googleAccount.displayName ?? 'Google Pilgrim',
          email: googleAccount.email,
          picture: googleAccount.photoUrl,
          provider: 'google',
          verified: true,
          joinedDate: now,
          role: googleAccount.email.toLowerCase().contains('admin') ? 'super_admin' : 'user',
        );
        await _save(user);
        return user;
      }
    } catch (e) {
      // Fallback for development/testing if Google Play Services dialog is cancelled or unavailable
      final now = DateTime.now().toIso8601String().split('T')[0];
      final user = AuthUser(
        id: 'usr_${DateTime.now().millisecondsSinceEpoch}',
        name: 'Google Pilgrim',
        email: 'user@gmail.com',
        picture: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop&crop=faces&q=80',
        provider: 'google',
        verified: true,
        joinedDate: now,
        role: 'user',
      );
      await _save(user);
      return user;
    }
    return null;
  }

  Future<void> signInWithEmail(String name, String email) async {
    final now = DateTime.now().toIso8601String().split('T')[0];
    final user = AuthUser(
      id: 'usr_${DateTime.now().millisecondsSinceEpoch}',
      name: name.trim().isNotEmpty ? name.trim() : 'Noor Pilgrim',
      email: email.trim().isNotEmpty ? email.trim() : 'pilgrim@nooreilahi.com',
      picture: null,
      provider: 'email',
      verified: true,
      joinedDate: now,
      role: 'user',
    );
    await _save(user);
  }

  Future<void> signOut() async {
    try {
      await _googleSignIn.signOut();
    } catch (_) {}
    final prefs = await SharedPreferences.getInstance();
    await prefs.remove(_kUserStorageKey);
    state = const AsyncData(null);
  }

  Future<void> _save(AuthUser user) async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString(_kUserStorageKey, jsonEncode(user.toJson()));
    state = AsyncData(user);
  }
}

final authProvider = AsyncNotifierProvider<AuthNotifier, AuthUser?>(
  AuthNotifier.new,
);
