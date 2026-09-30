import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Stack, usePathname } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { LanguageProvider } from '../src/context/LanguageContext';
import { SplashProvider, useSplash } from '../src/context/SplashContext';
import { AnimatedSplashScreen } from '../src/components/AnimatedSplashScreen';
import { analytics } from '../src/services/analyticsService';

// ============================================================
// Global Error Boundary — prevents unhandled JS errors from crashing the app
// ============================================================
interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class GlobalErrorBoundary extends React.Component<
  { children: React.ReactNode },
  ErrorBoundaryState
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log the error silently for debugging but don't crash
    console.warn('Noor Error Boundary caught error:', error?.message);
    try {
      analytics.trackEvent('app_error', {
        error_message: error?.message?.slice(0, 200),
        error_component: errorInfo?.componentStack?.slice(0, 200),
      });
    } catch (_) {}
  }

  render() {
    if (this.state.hasError) {
      return (
        <View style={errorStyles.container}>
          <StatusBar style="light" />
          <Text style={errorStyles.icon}>🕌</Text>
          <Text style={errorStyles.title}>Something went wrong</Text>
          <Text style={errorStyles.message}>
            The app encountered an unexpected issue. Please restart.
          </Text>
          <TouchableOpacity
            style={errorStyles.button}
            onPress={() => this.setState({ hasError: false, error: null })}
          >
            <Text style={errorStyles.buttonText}>Try Again</Text>
          </TouchableOpacity>
        </View>
      );
    }
    return this.props.children;
  }
}

const errorStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#031712',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  icon: { fontSize: 48, marginBottom: 16 },
  title: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 8,
    textAlign: 'center',
  },
  message: {
    color: '#a7f3d0',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20,
  },
  button: {
    backgroundColor: '#f59e0b',
    paddingHorizontal: 28,
    paddingVertical: 12,
    borderRadius: 14,
  },
  buttonText: {
    color: '#031712',
    fontSize: 15,
    fontWeight: '900',
  },
});

// ============================================================
// Root Content
// ============================================================
function RootContent() {
  const { showSplash, hideSplash } = useSplash();
  const pathname = usePathname();

  useEffect(() => {
    try {
      analytics.init();
    } catch (_) {
      // Silently handle analytics init failure
    }
  }, []);

  useEffect(() => {
    if (pathname) {
      try {
        analytics.trackScreenView(pathname);
      } catch (_) {
        // Silently handle analytics tracking failure
      }
    }
  }, [pathname]);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: '#031712' },
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>

      <AnimatedSplashScreen
        visible={showSplash}
        onFinish={hideSplash}
        autoDismissDelay={3500}
      />
    </View>
  );
}

export default function RootLayout() {
  return (
    <GlobalErrorBoundary>
      <LanguageProvider>
        <SplashProvider>
          <RootContent />
        </SplashProvider>
      </LanguageProvider>
    </GlobalErrorBoundary>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#031712',
  },
});
