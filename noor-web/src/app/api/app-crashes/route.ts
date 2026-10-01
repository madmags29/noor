import { NextResponse } from 'next/server';

export interface CrashBreadcrumb {
  timestamp: string;
  category: 'navigation' | 'user_action' | 'api' | 'state' | 'lifecycle';
  message: string;
  data?: Record<string, any>;
}

export interface CrashReport {
  id: string;
  errorName: string;
  errorMessage: string;
  errorType: 'fatal' | 'non_fatal' | 'anr' | 'network';
  stackTrace: string;
  platform: 'android' | 'ios' | 'web';
  deviceModel: string;
  osVersion: string;
  appVersion: string;
  buildNumber: number;
  breadcrumbs: CrashBreadcrumb[];
  userId?: string;
  userEmail?: string;
  city?: string;
  country?: string;
  status: 'open' | 'investigating' | 'resolved' | 'ignored';
  occurrences: number;
  firstSeenAt: string;
  lastSeenAt: string;
  deviceMetrics?: {
    freeMemoryMb?: number;
    totalMemoryMb?: number;
    batteryLevel?: number;
    isCharging?: boolean;
    orientation?: 'portrait' | 'landscape';
    networkType?: 'wifi' | 'cellular' | 'none';
  };
}

// In-memory crash telemetry database with realistic production logs
const crashesStore: CrashReport[] = [
  {
    id: 'crash-101',
    errorName: 'PlatformException (LOCATION_SERVICE_DISABLED)',
    errorMessage: 'Location services are disabled on the device while calculating Qibla azimuth orientation.',
    errorType: 'non_fatal',
    stackTrace: `PlatformException(LOCATION_SERVICE_DISABLED, Location services are disabled., null, null)
#0      StandardMethodCodec.decodeEnvelope (package:flutter/src/services/message_codecs.dart:652:7)
#1      MethodChannel._invokeMethod (package:flutter/src/services/platform_channel.dart:310:18)
<asynchronous suspension>
#2      GeolocatorPlatform.getCurrentPosition (package:geolocator_platform_interface/src/geolocator_platform_interface.dart:125:12)
#3      LocationProvider._fetchDeviceLocation (package:noor/providers/location_provider.dart:88:24)
#4      QiblaScreenState.initState (package:noor/screens/qibla_screen.dart:45:15)`,
    platform: 'android',
    deviceModel: 'Samsung Galaxy S24 Ultra',
    osVersion: 'Android 15 (API 35)',
    appVersion: '2.1.0',
    buildNumber: 6,
    breadcrumbs: [
      { timestamp: new Date(Date.now() - 1000 * 60 * 35).toISOString(), category: 'lifecycle', message: 'App launched from cold boot' },
      { timestamp: new Date(Date.now() - 1000 * 60 * 34).toISOString(), category: 'navigation', message: 'Navigated to HomeScreen' },
      { timestamp: new Date(Date.now() - 1000 * 60 * 32).toISOString(), category: 'user_action', message: 'Tapped Qibla Compass quick action tile' },
      { timestamp: new Date(Date.now() - 1000 * 60 * 31).toISOString(), category: 'api', message: 'Requested GPS hardware coordinates with High Accuracy' },
    ],
    userId: 'usr_882910_samsung',
    userEmail: 'tariq.mansoor@gmail.com',
    city: 'London',
    country: 'United Kingdom',
    status: 'open',
    occurrences: 4,
    firstSeenAt: new Date(Date.now() - 1000 * 60 * 60 * 14).toISOString(),
    lastSeenAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    deviceMetrics: {
      freeMemoryMb: 4120,
      totalMemoryMb: 12288,
      batteryLevel: 82,
      isCharging: false,
      orientation: 'portrait',
      networkType: 'wifi'
    }
  },
  {
    id: 'crash-102',
    errorName: 'LateInitializationError',
    errorMessage: "Field '_cachedAdhanAudioUri' has not been initialized in AdhanBackgroundService.",
    errorType: 'fatal',
    stackTrace: `LateInitializationError: Field '_cachedAdhanAudioUri' has not been initialized.
#0      AdhanBackgroundService._cachedAdhanAudioUri (package:noor/services/adhan_service.dart:34:10)
#1      AdhanBackgroundService.triggerScheduledAdhan (package:noor/services/adhan_service.dart:112:28)
#2      _RootZone.runUnaryGuarded (dart:async/zone.dart:1594:10)
#3      _BufferingStreamSubscription._sendData (dart:async/stream_impl.dart:339:11)`,
    platform: 'android',
    deviceModel: 'Xiaomi 14 Pro',
    osVersion: 'Android 14 (HyperOS)',
    appVersion: '2.1.0',
    buildNumber: 6,
    breadcrumbs: [
      { timestamp: new Date(Date.now() - 1000 * 60 * 85).toISOString(), category: 'state', message: 'AlarmManager woke device for Asr Prayer Adhan' },
      { timestamp: new Date(Date.now() - 1000 * 60 * 84).toISOString(), category: 'lifecycle', message: 'Background service initialized with flutter_local_notifications' },
      { timestamp: new Date(Date.now() - 1000 * 60 * 84).toISOString(), category: 'api', message: 'Adhan audio buffer requested before asset pre-warm' },
    ],
    userId: 'usr_771928_xiaomi',
    userEmail: 'fatima.n@gmail.com',
    city: 'Jakarta',
    country: 'Indonesia',
    status: 'investigating',
    occurrences: 2,
    firstSeenAt: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(),
    lastSeenAt: new Date(Date.now() - 1000 * 60 * 84).toISOString(),
    deviceMetrics: {
      freeMemoryMb: 1850,
      totalMemoryMb: 8192,
      batteryLevel: 45,
      isCharging: false,
      orientation: 'portrait',
      networkType: 'cellular'
    }
  },
  {
    id: 'crash-103',
    errorName: 'SocketException: OS Error: Connection timed out',
    errorMessage: 'Failed to download Quran recitation audio stream from CDN (sheikh_alafasy_018.mp3).',
    errorType: 'network',
    stackTrace: `SocketException: OS Error: Connection timed out, errno = 110, address = cdn.nooreilahi.com, port = 443
#0      _NativeSocket.startConnect (dart:io-patch/socket_patch.dart:738:35)
#1      _RawSocket.startConnect (dart:io-patch/socket_patch.dart:1980:25)
#2      RawSecureSocket.startConnect (dart:io/secure_socket.dart:340:24)
#3      AudioPlayerService.streamSurah (package:noor/services/audio_player_service.dart:94:18)`,
    platform: 'ios',
    deviceModel: 'iPhone 16 Pro Max',
    osVersion: 'iOS 18.2',
    appVersion: '2.1.0',
    buildNumber: 6,
    breadcrumbs: [
      { timestamp: new Date(Date.now() - 1000 * 60 * 110).toISOString(), category: 'navigation', message: 'Navigated to Surah Al-Kahf' },
      { timestamp: new Date(Date.now() - 1000 * 60 * 109).toISOString(), category: 'user_action', message: 'Selected Reciter: Sheikh Mishary Rashid Alafasy' },
      { timestamp: new Date(Date.now() - 1000 * 60 * 108).toISOString(), category: 'api', message: 'Buffering HLS Audio stream from global CDN' },
    ],
    userId: 'usr_993812_iphone',
    userEmail: 'bilal.q@gmail.com',
    city: 'Karachi',
    country: 'Pakistan',
    status: 'open',
    occurrences: 7,
    firstSeenAt: new Date(Date.now() - 1000 * 60 * 60 * 20).toISOString(),
    lastSeenAt: new Date(Date.now() - 1000 * 60 * 108).toISOString(),
    deviceMetrics: {
      freeMemoryMb: 3200,
      totalMemoryMb: 8192,
      batteryLevel: 94,
      isCharging: true,
      orientation: 'portrait',
      networkType: 'cellular'
    }
  },
  {
    id: 'crash-104',
    errorName: 'FormatException: Unexpected character in Zakat Currency Exchange JSON',
    errorMessage: 'JSON parser encountered non-standard trailing comma in exchange rate cache payload.',
    errorType: 'non_fatal',
    stackTrace: `FormatException: Unexpected character (at character 142)
#0      _ChunkedJsonParser.fail (dart:convert-patch/chunked_conversion_patch.dart:140:5)
#1      _ChunkedJsonParser.parse (dart:convert-patch/chunked_conversion_patch.dart:935:13)
#2      _JsonListener.reviver (dart:convert/json.dart:154:27)
#3      ZakatService.fetchLiveRates (package:noor/services/zakat_service.dart:67:22)`,
    platform: 'android',
    deviceModel: 'Google Pixel 9 Pro',
    osVersion: 'Android 15',
    appVersion: '2.0.0',
    buildNumber: 5,
    breadcrumbs: [
      { timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(), category: 'navigation', message: 'Navigated to Zakat Calculator' },
      { timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(), category: 'user_action', message: 'Changed currency from USD to SAR' },
    ],
    userId: 'usr_551029_pixel',
    userEmail: 'anonymous_pilgrim@makkah.sa',
    city: 'Makkah',
    country: 'Saudi Arabia',
    status: 'resolved',
    occurrences: 1,
    firstSeenAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
    lastSeenAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
    deviceMetrics: {
      freeMemoryMb: 5120,
      totalMemoryMb: 16384,
      batteryLevel: 68,
      isCharging: false,
      orientation: 'portrait',
      networkType: 'wifi'
    }
  }
];

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const platform = searchParams.get('platform');
    const status = searchParams.get('status');
    const severity = searchParams.get('severity');
    const search = searchParams.get('search')?.toLowerCase();

    let filtered = [...crashesStore];

    if (platform && platform !== 'all') {
      filtered = filtered.filter(c => c.platform === platform);
    }
    if (status && status !== 'all') {
      filtered = filtered.filter(c => c.status === status);
    }
    if (severity && severity !== 'all') {
      filtered = filtered.filter(c => c.errorType === severity);
    }
    if (search) {
      filtered = filtered.filter(c =>
        c.errorName.toLowerCase().includes(search) ||
        c.errorMessage.toLowerCase().includes(search) ||
        c.deviceModel.toLowerCase().includes(search) ||
        c.stackTrace.toLowerCase().includes(search) ||
        (c.userEmail && c.userEmail.toLowerCase().includes(search))
      );
    }

    // Sort by latest seen
    filtered.sort((a, b) => new Date(b.lastSeenAt).getTime() - new Date(a.lastSeenAt).getTime());

    // Compute live stats
    const totalOccurrences = crashesStore.reduce((acc, c) => acc + c.occurrences, 0);
    const fatalCount = crashesStore.filter(c => c.errorType === 'fatal').reduce((acc, c) => acc + c.occurrences, 0);
    const nonFatalCount = crashesStore.filter(c => c.errorType !== 'fatal').reduce((acc, c) => acc + c.occurrences, 0);
    const openCount = crashesStore.filter(c => c.status === 'open').length;
    const resolvedCount = crashesStore.filter(c => c.status === 'resolved').length;
    const uniqueUsersAffected = new Set(crashesStore.map(c => c.userId || c.userEmail).filter(Boolean)).size;

    return NextResponse.json({
      success: true,
      crashes: filtered,
      stats: {
        totalReports: crashesStore.length,
        totalOccurrences,
        fatalCount,
        nonFatalCount,
        openCount,
        resolvedCount,
        uniqueUsersAffected,
        crashFreeRate: '99.82%',
        totalSessionsAnalyzed: 142800,
        lastUpdated: new Date().toISOString()
      }
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      errorName = 'UnhandledException',
      errorMessage = 'An unexpected error occurred in mobile client',
      errorType = 'non_fatal',
      stackTrace = '',
      platform = 'android',
      deviceModel = 'Unknown Device',
      osVersion = 'Android 14',
      appVersion = '2.1.0',
      buildNumber = 6,
      breadcrumbs = [],
      userId,
      userEmail,
      city,
      country,
      deviceMetrics
    } = body;

    // Check if duplicate crash signature already exists
    const existingIndex = crashesStore.findIndex(
      c => c.errorName === errorName && c.deviceModel === deviceModel && c.status !== 'resolved'
    );

    if (existingIndex >= 0) {
      crashesStore[existingIndex].occurrences += 1;
      crashesStore[existingIndex].lastSeenAt = new Date().toISOString();
      if (stackTrace && !crashesStore[existingIndex].stackTrace) {
        crashesStore[existingIndex].stackTrace = stackTrace;
      }
      return NextResponse.json({
        success: true,
        message: 'Crash report occurrence updated',
        crash: crashesStore[existingIndex]
      });
    }

    const newCrash: CrashReport = {
      id: `crash-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      errorName,
      errorMessage,
      errorType,
      stackTrace: stackTrace || `Error: ${errorMessage}\n  at Object.<anonymous> (noor_app_core.dart:1:1)`,
      platform,
      deviceModel,
      osVersion,
      appVersion,
      buildNumber,
      breadcrumbs: breadcrumbs.length ? breadcrumbs : [
        { timestamp: new Date().toISOString(), category: 'lifecycle', message: 'Crash occurred during runtime execution' }
      ],
      userId: userId || `anon_${Math.random().toString(36).substring(2, 9)}`,
      userEmail,
      city: city || 'Global Edge',
      country: country || 'International',
      status: 'open',
      occurrences: 1,
      firstSeenAt: new Date().toISOString(),
      lastSeenAt: new Date().toISOString(),
      deviceMetrics: deviceMetrics || {
        freeMemoryMb: 3450,
        totalMemoryMb: 8192,
        batteryLevel: 75,
        isCharging: false,
        orientation: 'portrait',
        networkType: 'wifi'
      }
    };

    crashesStore.unshift(newCrash);

    // Keep store bounded
    if (crashesStore.length > 500) {
      crashesStore.pop();
    }

    return NextResponse.json({
      success: true,
      message: 'Crash telemetry ingested successfully',
      crash: newCrash
    }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json({ success: false, error: 'Crash ID and status are required' }, { status: 400 });
    }

    const crash = crashesStore.find(c => c.id === id);
    if (!crash) {
      return NextResponse.json({ success: false, error: 'Crash report not found' }, { status: 404 });
    }

    crash.status = status;

    return NextResponse.json({
      success: true,
      message: `Crash ${id} status updated to ${status}`,
      crash
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (id === 'all') {
      crashesStore.length = 0;
      return NextResponse.json({ success: true, message: 'All crash reports cleared' });
    }

    if (!id) {
      return NextResponse.json({ success: false, error: 'Crash ID is required' }, { status: 400 });
    }

    const index = crashesStore.findIndex(c => c.id === id);
    if (index === -1) {
      return NextResponse.json({ success: false, error: 'Crash report not found' }, { status: 404 });
    }

    crashesStore.splice(index, 1);
    return NextResponse.json({ success: true, message: `Crash report ${id} deleted` });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
