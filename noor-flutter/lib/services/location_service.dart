// ============================================================
// NOOR — Location Service & Worldwide City Catalog
// Auto-detect GPS + Fast IP Geolocation Fallback + Persistence
// ============================================================

import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';
import 'package:geolocator/geolocator.dart';

const String _kStorageKeyLocation = 'noor_user_location';

class MobileCity {
  final String city;
  final String country;
  final double lat;
  final double lng;
  final double? utcOffset;
  final bool isAutoDetected;

  const MobileCity({
    required this.city,
    required this.country,
    required this.lat,
    required this.lng,
    this.utcOffset,
    this.isAutoDetected = false,
  });

  Map<String, dynamic> toJson() => {
        'city': city,
        'country': country,
        'lat': lat,
        'lng': lng,
        'utcOffset': utcOffset,
        'isAutoDetected': isAutoDetected,
      };

  factory MobileCity.fromJson(Map<String, dynamic> json) => MobileCity(
        city: json['city'] ?? 'Makkah',
        country: json['country'] ?? 'Saudi Arabia',
        lat: (json['lat'] as num).toDouble(),
        lng: (json['lng'] as num).toDouble(),
        utcOffset: json['utcOffset'] != null
            ? (json['utcOffset'] as num).toDouble()
            : null,
        isAutoDetected: json['isAutoDetected'] ?? false,
      );
}

const List<MobileCity> kWorldCities = [
  // Middle East & Sacred Holy Sites
  MobileCity(city: 'Makkah', country: 'Saudi Arabia', lat: 21.4225, lng: 39.8262, utcOffset: 3.0),
  MobileCity(city: 'Madinah', country: 'Saudi Arabia', lat: 24.4672, lng: 39.6111, utcOffset: 3.0),
  MobileCity(city: 'Riyadh', country: 'Saudi Arabia', lat: 24.7136, lng: 46.6753, utcOffset: 3.0),
  MobileCity(city: 'Dubai', country: 'United Arab Emirates', lat: 25.2048, lng: 55.2708, utcOffset: 4.0),
  MobileCity(city: 'Abu Dhabi', country: 'United Arab Emirates', lat: 24.4539, lng: 54.3773, utcOffset: 4.0),
  MobileCity(city: 'Doha', country: 'Qatar', lat: 25.2854, lng: 51.5310, utcOffset: 3.0),
  MobileCity(city: 'Kuwait City', country: 'Kuwait', lat: 29.3759, lng: 47.9774, utcOffset: 3.0),
  MobileCity(city: 'Amman', country: 'Jordan', lat: 31.9454, lng: 35.9284, utcOffset: 3.0),
  MobileCity(city: 'Jerusalem (Al-Quds)', country: 'Palestine', lat: 31.7683, lng: 35.2137, utcOffset: 3.0),
  MobileCity(city: 'Cairo', country: 'Egypt', lat: 30.0444, lng: 31.2357, utcOffset: 2.0),
  MobileCity(city: 'Casablanca', country: 'Morocco', lat: 33.5731, lng: -7.5898, utcOffset: 1.0),
  MobileCity(city: 'Istanbul', country: 'Turkey', lat: 41.0082, lng: 28.9784, utcOffset: 3.0),

  // South Asia
  MobileCity(city: 'Delhi', country: 'India', lat: 28.7041, lng: 77.1025, utcOffset: 5.5),
  MobileCity(city: 'New Delhi', country: 'India', lat: 28.6139, lng: 77.2090, utcOffset: 5.5),
  MobileCity(city: 'Mumbai', country: 'India', lat: 19.0760, lng: 72.8777, utcOffset: 5.5),
  MobileCity(city: 'Hyderabad', country: 'India', lat: 17.3850, lng: 78.4867, utcOffset: 5.5),
  MobileCity(city: 'Bengaluru', country: 'India', lat: 12.9716, lng: 77.5946, utcOffset: 5.5),
  MobileCity(city: 'Kolkata', country: 'India', lat: 22.5726, lng: 88.3639, utcOffset: 5.5),
  MobileCity(city: 'Chennai', country: 'India', lat: 13.0827, lng: 80.2707, utcOffset: 5.5),
  MobileCity(city: 'Karachi', country: 'Pakistan', lat: 24.8607, lng: 67.0011, utcOffset: 5.0),
  MobileCity(city: 'Lahore', country: 'Pakistan', lat: 31.5204, lng: 74.3587, utcOffset: 5.0),
  MobileCity(city: 'Islamabad', country: 'Pakistan', lat: 33.6844, lng: 73.0479, utcOffset: 5.0),
  MobileCity(city: 'Dhaka', country: 'Bangladesh', lat: 23.8103, lng: 90.4125, utcOffset: 6.0),

  // Southeast Asia
  MobileCity(city: 'Jakarta', country: 'Indonesia', lat: -6.2088, lng: 106.8456, utcOffset: 7.0),
  MobileCity(city: 'Kuala Lumpur', country: 'Malaysia', lat: 3.1390, lng: 101.6869, utcOffset: 8.0),
  MobileCity(city: 'Singapore', country: 'Singapore', lat: 1.3521, lng: 103.8198, utcOffset: 8.0),

  // Europe & Americas & Global
  MobileCity(city: 'London', country: 'United Kingdom', lat: 51.5074, lng: -0.1278, utcOffset: 0.0),
  MobileCity(city: 'Paris', country: 'France', lat: 48.8566, lng: 2.3522, utcOffset: 1.0),
  MobileCity(city: 'Berlin', country: 'Germany', lat: 52.5200, lng: 13.4050, utcOffset: 1.0),
  MobileCity(city: 'New York', country: 'United States', lat: 40.7128, lng: -74.0060, utcOffset: -5.0),
  MobileCity(city: 'Chicago', country: 'United States', lat: 41.8781, lng: -87.6298, utcOffset: -6.0),
  MobileCity(city: 'Los Angeles', country: 'United States', lat: 34.0522, lng: -118.2437, utcOffset: -8.0),
  MobileCity(city: 'Toronto', country: 'Canada', lat: 43.6532, lng: -79.3832, utcOffset: -5.0),
  MobileCity(city: 'Sydney', country: 'Australia', lat: -33.8688, lng: 151.2093, utcOffset: 10.0),
];

class LocationService {
  static Future<MobileCity?> getSavedLocation() async {
    try {
      final prefs = await SharedPreferences.getInstance();
      final raw = prefs.getString(_kStorageKeyLocation);
      if (raw != null) {
        final data = jsonDecode(raw);
        return MobileCity.fromJson(data);
      }
    } catch (_) {}
    return null;
  }

  static Future<void> saveLocation(MobileCity city) async {
    try {
      final prefs = await SharedPreferences.getInstance();
      await prefs.setString(
        _kStorageKeyLocation,
        jsonEncode(city.toJson()),
      );
    } catch (_) {}
  }

  static Future<MobileCity> detectLocation() async {
    // 1. Try GPS Location
    try {
      bool serviceEnabled = await Geolocator.isLocationServiceEnabled();
      if (serviceEnabled) {
        LocationPermission permission = await Geolocator.checkPermission();
        if (permission == LocationPermission.denied) {
          permission = await Geolocator.requestPermission();
        }
        if (permission == LocationPermission.whileInUse ||
            permission == LocationPermission.always) {
          final pos = await Geolocator.getCurrentPosition(
            locationSettings: const LocationSettings(
              accuracy: LocationAccuracy.medium,
              timeLimit: Duration(seconds: 4),
            ),
          );
          final detected = MobileCity(
            city: 'My Location',
            country: 'GPS Detected',
            lat: pos.latitude,
            lng: pos.longitude,
            isAutoDetected: true,
          );
          await saveLocation(detected);
          return detected;
        }
      }
    } catch (_) {}

    // 2. Fast IP Geolocation Fallback (zero permission prompt)
    try {
      final res = await http.get(Uri.parse('https://ipwho.is/')).timeout(
            const Duration(seconds: 4),
          );
      if (res.statusCode == 200) {
        final data = jsonDecode(res.body);
        if (data['success'] == true && data['latitude'] != null) {
          final detected = MobileCity(
            city: data['city'] ?? 'Current City',
            country: data['country'] ?? 'Detected',
            lat: (data['latitude'] as num).toDouble(),
            lng: (data['longitude'] as num).toDouble(),
            utcOffset: data['timezone']?['offset'] != null
                ? ((data['timezone']['offset'] as num).toDouble() / 3600.0)
                : null,
            isAutoDetected: true,
          );
          await saveLocation(detected);
          return detected;
        }
      }
    } catch (_) {}

    // 3. Fallback to Delhi/Makkah
    final saved = await getSavedLocation();
    if (saved != null) return saved;

    return kWorldCities.first;
  }
}
