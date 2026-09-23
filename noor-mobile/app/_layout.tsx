import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { LanguageProvider } from '../src/context/LanguageContext';
import { SplashProvider, useSplash } from '../src/context/SplashContext';
import { AnimatedSplashScreen } from '../src/components/AnimatedSplashScreen';

function RootContent() {
  const { showSplash, hideSplash } = useSplash();

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
    <LanguageProvider>
      <SplashProvider>
        <RootContent />
      </SplashProvider>
    </LanguageProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#031712',
  },
});

