// ============================================================
// NOOR — Location State Provider (Riverpod)
// Synchronizes location across Home, Prayers, Qibla, Ziyarat
// Automatic GPS + IP auto-detection on launch
// ============================================================

import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../services/location_service.dart';

class LocationState {
  final MobileCity city;
  final bool isDetecting;

  const LocationState({
    required this.city,
    this.isDetecting = false,
  });

  LocationState copyWith({MobileCity? city, bool? isDetecting}) {
    return LocationState(
      city: city ?? this.city,
      isDetecting: isDetecting ?? this.isDetecting,
    );
  }
}

class LocationNotifier extends AsyncNotifier<LocationState> {
  @override
  Future<LocationState> build() async {
    // 1. Check if user previously pinned a specific manual city
    final saved = await LocationService.getSavedLocation();
    if (saved != null && !saved.isAutoDetected) {
      return LocationState(city: saved, isDetecting: false);
    }

    // 2. Perform live auto-detection on startup (GPS / IP Geolocation)
    try {
      final detected = await LocationService.detectLocation();
      return LocationState(city: detected, isDetecting: false);
    } catch (_) {
      return LocationState(
        city: saved ?? kWorldCities.firstWhere(
          (c) => c.city == 'Delhi' || c.city == 'Makkah',
          orElse: () => kWorldCities.first,
        ),
        isDetecting: false,
      );
    }
  }

  Future<void> setCity(MobileCity newCity) async {
    await LocationService.saveLocation(newCity);
    state = AsyncData(LocationState(city: newCity, isDetecting: false));
  }

  Future<void> autoDetect() async {
    if (state.value != null) {
      state = AsyncData(state.value!.copyWith(isDetecting: true));
    }
    try {
      final detected = await LocationService.detectLocation();
      state = AsyncData(LocationState(city: detected, isDetecting: false));
    } catch (_) {
      if (state.value != null) {
        state = AsyncData(state.value!.copyWith(isDetecting: false));
      }
    }
  }
}

final locationProvider =
    AsyncNotifierProvider<LocationNotifier, LocationState>(
  LocationNotifier.new,
);
