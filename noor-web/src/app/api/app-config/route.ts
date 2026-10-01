import { NextResponse } from 'next/server';

// Default App Remote Configuration
export interface AppRemoteConfig {
  forceUpdate: {
    enabled: boolean;
    minRequiredVersion: string; // e.g., "1.0.0"
    minRequiredBuildNumber: number; // e.g., 6
    latestVersion: string; // e.g., "1.0.1"
    latestBuildNumber: number; // e.g., 7
    title: string;
    message: string;
    releaseNotes: string[];
    playStoreUrl: string;
    appStoreUrl: string;
  };
  maintenance: {
    enabled: boolean;
    title: string;
    message: string;
    estimatedEndTime?: string;
  };
  features: {
    enableQuranAudio: boolean;
    enableAiAssistant: boolean;
    enablePushNotifications: boolean;
    enableZiyaratAudioGuides: boolean;
    enableDonations: boolean;
    enableLiveMedia: boolean;
    enableFatwaSearch: boolean;
    enableAdhanAlarms: boolean;
    enableCommunityDuas: boolean;
    enableTravelMode: boolean;
  };
  announcement: {
    enabled: boolean;
    id: string;
    title: string;
    message: string;
    actionLabel?: string;
    actionUrl?: string;
    type: 'info' | 'ramadan' | 'jummah' | 'alert';
  };
  updatedAt: string;
}

// In-memory persistent config with fallback
let globalAppConfig: AppRemoteConfig = {
  forceUpdate: {
    enabled: false,
    minRequiredVersion: '1.0.0',
    minRequiredBuildNumber: 1,
    latestVersion: '1.0.0',
    latestBuildNumber: 6,
    title: 'New Update Available',
    message: 'A critical update of Noor-E-Ilahi is ready with improved prayer accuracy, high-quality recitations, and bug fixes.',
    releaseNotes: [
      'Enhanced prayer times calculation accuracy',
      'Google Sign-in and cross-platform profile synchronization',
      'Instant Qibla compass calibration',
      'Performance and battery optimizations'
    ],
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.noor_e_ilahi',
    appStoreUrl: 'https://apps.apple.com/app/noor-e-ilahi/id6470000000',
  },
  maintenance: {
    enabled: false,
    title: 'Under Scheduled Maintenance',
    message: 'We are currently upgrading the Islamic cloud infrastructure to serve you better. Noor-E-Ilahi will be back shortly.',
    estimatedEndTime: '',
  },
  features: {
    enableQuranAudio: true,
    enableAiAssistant: true,
    enablePushNotifications: true,
    enableZiyaratAudioGuides: true,
    enableDonations: true,
    enableLiveMedia: true,
    enableFatwaSearch: true,
    enableAdhanAlarms: true,
    enableCommunityDuas: true,
    enableTravelMode: true,
  },
  announcement: {
    enabled: false,
    id: 'announcement-1',
    title: 'Blessed Friday (Jummah Mubarak)',
    message: 'Remember to recite Surah Al-Kahf today and send abundant blessings upon the Prophet ﷺ.',
    actionLabel: 'Read Surah Kahf',
    actionUrl: '/quran/18',
    type: 'jummah',
  },
  updatedAt: new Date().toISOString(),
};

// GET: Public endpoint for Flutter / Web clients
export async function GET() {
  return NextResponse.json(
    {
      success: true,
      data: globalAppConfig,
      serverTime: new Date().toISOString(),
    },
    {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'public, max-age=60, s-maxage=60',
      },
    }
  );
}

// POST: Admin endpoint to update remote configuration
export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (body.forceUpdate) {
      globalAppConfig.forceUpdate = { ...globalAppConfig.forceUpdate, ...body.forceUpdate };
    }
    if (body.maintenance) {
      globalAppConfig.maintenance = { ...globalAppConfig.maintenance, ...body.maintenance };
    }
    if (body.features) {
      globalAppConfig.features = { ...globalAppConfig.features, ...body.features };
    }
    if (body.announcement) {
      globalAppConfig.announcement = { ...globalAppConfig.announcement, ...body.announcement };
    }

    globalAppConfig.updatedAt = new Date().toISOString();

    return NextResponse.json({
      success: true,
      message: 'App configuration updated successfully across all mobile and web clients.',
      data: globalAppConfig,
    });
  } catch (error) {
    console.error('Error updating app config:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update remote app config.' },
      { status: 500 }
    );
  }
}
