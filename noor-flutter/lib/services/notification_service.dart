// ============================================================
// NOOR — Complete Push Notification & Prayer Adhan Engine
// Firebase Cloud Messaging (FCM) + Local Adhan Scheduler
// ============================================================

import 'dart:developer' as dev;
import 'package:firebase_core/firebase_core.dart';
import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:flutter_local_notifications/flutter_local_notifications.dart';
import 'package:timezone/data/latest_all.dart' as tz;
import 'package:timezone/timezone.dart' as tz;

// Top-level background message handler for FCM
@pragma('vm:entry-point')
Future<void> _firebaseMessagingBackgroundHandler(RemoteMessage message) async {
  try {
    await Firebase.initializeApp();
  } catch (_) {}
}

class NotificationService {
  static final NotificationService _instance = NotificationService._internal();
  factory NotificationService() => _instance;
  NotificationService._internal();

  final FlutterLocalNotificationsPlugin _localNotifications = FlutterLocalNotificationsPlugin();
  bool _isInitialized = false;
  String? _fcmToken;

  String? get fcmToken => _fcmToken;

  Future<void> initialize() async {
    if (_isInitialized) return;

    try {
      // 1. Initialize Timezones for accurate prayer scheduling
      tz.initializeTimeZones();

      // 2. Initialize Local Notifications Plugin
      const androidSettings = AndroidInitializationSettings('@mipmap/launcher_icon');
      const darwinSettings = DarwinInitializationSettings(
        requestAlertPermission: true,
        requestBadgePermission: true,
        requestSoundPermission: true,
      );

      const initSettings = InitializationSettings(
        android: androidSettings,
        iOS: darwinSettings,
      );

      await _localNotifications.initialize(
        settings: initSettings,
        onDidReceiveNotificationResponse: (NotificationResponse response) {
          dev.log('Notification tapped: ${response.payload}', name: 'NOOR_NOTIFICATIONS');
        },
      );

      // Create High-Importance Notification Channel for Android
      const androidChannel = AndroidNotificationChannel(
        'noor_prayer_channel',
        'Noor Prayer & Adhan Alerts',
        description: 'High-priority notifications for daily Salaah, Adhan, and Islamic reminders',
        importance: Importance.max,
        playSound: true,
        enableVibration: true,
      );

      final androidPlugin = _localNotifications.resolvePlatformSpecificImplementation<
          AndroidFlutterLocalNotificationsPlugin>();
      if (androidPlugin != null) {
        await androidPlugin.createNotificationChannel(androidChannel);
        await androidPlugin.requestNotificationsPermission();
      }

      // 3. Initialize Firebase Cloud Messaging (FCM)
      try {
        await Firebase.initializeApp();
        FirebaseMessaging.onBackgroundMessage(_firebaseMessagingBackgroundHandler);

        final messaging = FirebaseMessaging.instance;
        final settings = await messaging.requestPermission(
          alert: true,
          badge: true,
          sound: true,
          provisional: false,
        );

        if (settings.authorizationStatus == AuthorizationStatus.authorized ||
            settings.authorizationStatus == AuthorizationStatus.provisional) {
          _fcmToken = await messaging.getToken();
          dev.log('FCM Token: $_fcmToken', name: 'NOOR_FCM');

          // Subscribe to general announcement topic
          await messaging.subscribeToTopic('all_pilgrims');
          await messaging.subscribeToTopic('daily_hadith');
        }

        // Handle foreground notifications
        FirebaseMessaging.onMessage.listen((RemoteMessage message) {
          final notification = message.notification;
          if (notification != null) {
            showNotification(
              id: message.hashCode,
              title: notification.title ?? 'Noor-e-ilahi',
              body: notification.body ?? 'Sacred Daily Reminder',
              payload: message.data.toString(),
            );
          }
        });
      } catch (e) {
        dev.log('Firebase Cloud Messaging notice: $e', name: 'NOOR_FCM');
      }

      _isInitialized = true;
    } catch (e) {
      dev.log('Notification initialization error: $e', name: 'NOOR_NOTIFICATIONS');
    }
  }

  Future<void> showNotification({
    required int id,
    required String title,
    required String body,
    String? payload,
  }) async {
    const androidDetails = AndroidNotificationDetails(
      'noor_prayer_channel',
      'Noor Prayer & Adhan Alerts',
      channelDescription: 'High-priority notifications for daily Salaah, Adhan, and Islamic reminders',
      importance: Importance.max,
      priority: Priority.high,
      playSound: true,
      enableVibration: true,
      icon: '@mipmap/launcher_icon',
    );

    const darwinDetails = DarwinNotificationDetails(
      presentAlert: true,
      presentBadge: true,
      presentSound: true,
    );

    const details = NotificationDetails(
      android: androidDetails,
      iOS: darwinDetails,
    );

    await _localNotifications.show(
      id: id,
      title: title,
      body: body,
      notificationDetails: details,
      payload: payload,
    );
  }

  Future<void> schedulePrayerAlert({
    required int id,
    required String prayerName,
    required DateTime scheduledTime,
    String? adhanVoice,
  }) async {
    if (scheduledTime.isBefore(DateTime.now())) return;

    const androidDetails = AndroidNotificationDetails(
      'noor_prayer_channel',
      'Noor Prayer & Adhan Alerts',
      channelDescription: 'High-priority notifications for daily Salaah, Adhan, and Islamic reminders',
      importance: Importance.max,
      priority: Priority.high,
      playSound: true,
      enableVibration: true,
      icon: '@mipmap/launcher_icon',
    );

    const darwinDetails = DarwinNotificationDetails(
      presentAlert: true,
      presentBadge: true,
      presentSound: true,
    );

    const details = NotificationDetails(
      android: androidDetails,
      iOS: darwinDetails,
    );

    await _localNotifications.zonedSchedule(
      id: id,
      title: '🕌 Time for $prayerName Salaah',
      body: 'Hayya \'alas-Salah — Come to Prayer. It is time for $prayerName in your location.',
      scheduledDate: tz.TZDateTime.from(scheduledTime, tz.local),
      notificationDetails: details,
      androidScheduleMode: AndroidScheduleMode.exactAllowWhileIdle,
      matchDateTimeComponents: DateTimeComponents.time,
    );
  }

  Future<void> cancelAll() async {
    await _localNotifications.cancelAll();
  }
}

final notificationService = NotificationService();
