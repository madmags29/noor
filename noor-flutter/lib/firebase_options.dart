// ============================================================
// NOOR — Firebase Options Configuration (Flutter)
// Generated and configured for noor-e-ilahi-app
// ============================================================

import 'package:firebase_core/firebase_core.dart' show FirebaseOptions;
import 'package:flutter/foundation.dart'
    show defaultTargetPlatform, kIsWeb, TargetPlatform;

class DefaultFirebaseOptions {
  static FirebaseOptions get currentPlatform {
    if (kIsWeb) {
      return web;
    }
    switch (defaultTargetPlatform) {
      case TargetPlatform.android:
        return android;
      case TargetPlatform.iOS:
        return ios;
      default:
        return android;
    }
  }

  static const FirebaseOptions android = FirebaseOptions(
    apiKey: 'AIzaSyB80cnL8O5N5KXtnDO_z-LocgXV1_CCLWs',
    appId: '1:802292970181:android:543b2a7c1e6021290436ac',
    messagingSenderId: '802292970181',
    projectId: 'noor-e-ilahi-app',
    storageBucket: 'noor-e-ilahi-app.firebasestorage.app',
  );

  static const FirebaseOptions ios = FirebaseOptions(
    apiKey: 'AIzaSyB80cnL8O5N5KXtnDO_z-LocgXV1_CCLWs',
    appId: '1:802292970181:ios:543b2a7c1e6021290436ac',
    messagingSenderId: '802292970181',
    projectId: 'noor-e-ilahi-app',
    storageBucket: 'noor-e-ilahi-app.firebasestorage.app',
    iosBundleId: 'com.noor_e_ilahi',
  );

  static const FirebaseOptions web = FirebaseOptions(
    apiKey: 'AIzaSyB80cnL8O5N5KXtnDO_z-LocgXV1_CCLWs',
    appId: '1:802292970181:web:543b2a7c1e6021290436ac',
    messagingSenderId: '802292970181',
    projectId: 'noor-e-ilahi-app',
    storageBucket: 'noor-e-ilahi-app.firebasestorage.app',
  );
}
