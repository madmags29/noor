import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';
import Constants from 'expo-constants';

export const GA_MEASUREMENT_ID = 'G-6VEVYV7DX2';
const STORAGE_KEY_CLIENT_ID = '@noor_analytics_client_id';
const STORAGE_KEY_SESSION_ID = '@noor_analytics_session_id';

class AnalyticsService {
  private clientId: string | null = null;
  private sessionId: string | null = null;
  private isInitialized = false;

  private generateUUID(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  async init(): Promise<void> {
    if (this.isInitialized) return;
    try {
      let savedClientId = await AsyncStorage.getItem(STORAGE_KEY_CLIENT_ID);
      if (!savedClientId) {
        savedClientId = this.generateUUID();
        await AsyncStorage.setItem(STORAGE_KEY_CLIENT_ID, savedClientId);
      }
      this.clientId = savedClientId;

      // Session ID (persisted for the session or regenerated if older than 30m)
      this.sessionId = Math.floor(Date.now() / 1000).toString();
      await AsyncStorage.setItem(STORAGE_KEY_SESSION_ID, this.sessionId);
      this.isInitialized = true;
    } catch {
      this.clientId = this.generateUUID();
      this.sessionId = Math.floor(Date.now() / 1000).toString();
      this.isInitialized = true;
    }
  }

  async trackScreenView(screenName: string, screenClass = 'Screen'): Promise<void> {
    await this.trackEvent('screen_view', {
      screen_name: screenName,
      screen_class: screenClass,
      app_platform: Platform.OS,
      app_version: Constants.expoConfig?.version || '1.0.0',
    });
  }

  async trackEvent(eventName: string, params: Record<string, any> = {}): Promise<void> {
    if (!this.isInitialized) {
      await this.init();
    }

    try {
      const payload = {
        client_id: this.clientId,
        events: [
          {
            name: eventName,
            params: {
              ...params,
              session_id: this.sessionId,
              engagement_time_msec: 100,
              platform: Platform.OS,
              app_name: 'Noor-e-ilahi',
              app_version: Constants.expoConfig?.version || '1.0.0',
            },
          },
        ],
      };

      // Using Google Analytics Measurement Protocol
      // Measurement ID: G-6VEVYV7DX2
      await fetch(
        `https://www.google-analytics.com/mp/collect?measurement_id=${GA_MEASUREMENT_ID}&api_secret=noor_mobile_app`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        }
      ).catch(() => {
        // Silently catch network errors to keep app fully offline-functional
      });
    } catch {
      // Fail silently without disrupting user experience
    }
  }
}

export const analytics = new AnalyticsService();
