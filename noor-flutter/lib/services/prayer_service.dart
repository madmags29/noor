// ============================================================
// NOOR — Astronomical Prayer Calculation Engine (Dart)
// Exact port of noor-web/src/lib/prayerService.ts
// Calculates Fajr, Sunrise, Dhuhr, Asr, Maghrib, Isha for any lat/lng
// ============================================================

import 'dart:math' as math;

class PrayerItem {
  final String id;
  final String name;
  final String arabic;
  final String time;
  final String time24;
  final int minutes;
  final bool isNext;
  final String desc;

  const PrayerItem({
    required this.id,
    required this.name,
    required this.arabic,
    required this.time,
    required this.time24,
    required this.minutes,
    this.isNext = false,
    required this.desc,
  });
}

class PrayerCalculationConfig {
  final double fajrAngle;
  final double ishaAngle;
  final double? ishaInterval;
  final String name;

  const PrayerCalculationConfig({
    required this.fajrAngle,
    required this.ishaAngle,
    this.ishaInterval,
    required this.name,
  });
}

const Map<String, PrayerCalculationConfig> kCalculationMethods = {
  'MWL': PrayerCalculationConfig(
    fajrAngle: 18.0,
    ishaAngle: 17.0,
    name: 'Muslim World League (MWL)',
  ),
  'ISNA': PrayerCalculationConfig(
    fajrAngle: 15.0,
    ishaAngle: 15.0,
    name: 'Islamic Society of North America (ISNA)',
  ),
  'Egypt': PrayerCalculationConfig(
    fajrAngle: 19.5,
    ishaAngle: 17.5,
    name: 'Egyptian General Authority of Survey',
  ),
  'Makkah': PrayerCalculationConfig(
    fajrAngle: 18.5,
    ishaAngle: 0.0,
    ishaInterval: 90.0,
    name: 'Umm Al-Qura University, Makkah',
  ),
  'Karachi': PrayerCalculationConfig(
    fajrAngle: 18.0,
    ishaAngle: 18.0,
    name: 'Univ. of Islamic Sciences, Karachi',
  ),
};

const double _deg = math.pi / 180.0;
const double _rad = 180.0 / math.pi;

double _sin(double d) => math.sin(d * _deg);
double _cos(double d) => math.cos(d * _deg);
double _tan(double d) => math.tan(d * _deg);
double _asin(double x) => _rad * math.asin(x);
double _acos(double x) => _rad * math.acos(x);
double _atan2(double y, double x) => _rad * math.atan2(y, x);

double _julianDate(int year, int month, int day) {
  int y = year;
  int m = month;
  if (m <= 2) {
    y -= 1;
    m += 12;
  }
  final a = (y / 100).floor();
  final b = 2 - a + (a / 4).floor();
  return (365.25 * (y + 4716)).floor() +
      (30.6001 * (m + 1)).floor() +
      day +
      b -
      1524.5;
}

Map<String, double> _sunPosition(double jd) {
  final d = jd - 2451545.0;
  final g = (357.529 + 0.98560028 * d) % 360.0;
  final q = (280.459 + 0.98564736 * d) % 360.0;
  final l = (q + 1.915 * _sin(g) + 0.020 * _sin(2 * g)) % 360.0;
  final e = 23.439 - 0.00000036 * d;
  final ra = _atan2(_cos(e) * _sin(l), _cos(l)) / 15.0;
  final declination = _asin(_sin(e) * _sin(l));
  var eqt = q / 15.0 - ra;
  if (eqt > 12) eqt -= 24;
  if (eqt < -12) eqt += 24;
  return {'declination': declination, 'equation': eqt};
}

double _computeAngleTime(
    double angle, double latitude, double declination, bool isCcw) {
  final part = (_sin(angle) - _sin(latitude) * _sin(declination)) /
      (_cos(latitude) * _cos(declination));
  if (part > 1.0 || part < -1.0) return double.nan;
  final hourAngle = _acos(part) / 15.0;
  return isCcw ? hourAngle : -hourAngle;
}

Map<String, dynamic> _formatTimeComponents(double hours) {
  if (hours.isNaN) {
    return {'time12': '--:--', 'time24': '--:--', 'minutes': 0};
  }
  var hTotal = ((hours % 24) + 24) % 24;
  final h = hTotal.floor();
  final m = ((hTotal - h) * 60).round();
  final safeM = m == 60 ? 0 : m;
  final safeH = m == 60 ? (h + 1) % 24 : h;

  final time24 =
      '${safeH.toString().padLeft(2, '0')}:${safeM.toString().padLeft(2, '0')}';
  final period = safeH >= 12 ? 'PM' : 'AM';
  final h12 = safeH % 12 == 0 ? 12 : safeH % 12;
  final time12 =
      '${h12.toString().padLeft(2, '0')}:${safeM.toString().padLeft(2, '0')} $period';

  return {'time12': time12, 'time24': time24, 'minutes': safeH * 60 + safeM};
}

class PrayerCalculationService {
  static List<PrayerItem> calculatePrayers({
    required double lat,
    required double lng,
    DateTime? date,
    String methodKey = 'MWL',
    double asrFactor = 1.0, // 1.0 = standard, 2.0 = hanafi
    double? customTimezone,
  }) {
    final targetDate = date ?? DateTime.now();
    
    // In Dart, timeZoneOffset is positive for East of UTC.
    double timezone = customTimezone ?? (targetDate.timeZoneOffset.inMinutes / 60.0);
    
    // If selected city is in another timezone than device, adapt to solar longitude timezone:
    final solarTz = (lng / 15.0).roundToDouble();
    if (customTimezone == null && (timezone - solarTz).abs() > 2.5) {
      timezone = solarTz;
    }

    final method = kCalculationMethods[methodKey] ?? kCalculationMethods['MWL']!;

    final jd = _julianDate(
        targetDate.year, targetDate.month, targetDate.day);
    final sun = _sunPosition(jd);
    final declination = sun['declination']!;
    final equation = sun['equation']!;

    final dhuhrDec = 12.0 + timezone - lng / 15.0 - equation;
    final sunriseHA = _computeAngleTime(-0.833, lat, declination, true);
    final sunriseDec = dhuhrDec - sunriseHA;
    final sunsetDec = dhuhrDec + sunriseHA;

    final fajrHA = _computeAngleTime(-method.fajrAngle, lat, declination, true);
    final fajrDec = dhuhrDec - fajrHA;

    final asrAngle =
        _rad * math.atan(1.0 / (asrFactor + _tan((lat - declination).abs())));
    final asrHA = _computeAngleTime(asrAngle, lat, declination, false);
    final asrDec = dhuhrDec - asrHA;

    final maghribDec = sunsetDec;

    double ishaDec;
    if (method.ishaInterval != null && method.ishaInterval! > 0) {
      ishaDec = maghribDec + method.ishaInterval! / 60.0;
    } else {
      final ishaHA =
          _computeAngleTime(-method.ishaAngle, lat, declination, false);
      ishaDec = dhuhrDec - ishaHA;
    }

    final fajr = _formatTimeComponents(fajrDec);
    final sunrise = _formatTimeComponents(sunriseDec);
    final dhuhr = _formatTimeComponents(dhuhrDec);
    final asr = _formatTimeComponents(asrDec);
    final maghrib = _formatTimeComponents(maghribDec);
    final isha = _formatTimeComponents(ishaDec);

    final nowMinutes = targetDate.hour * 60 + targetDate.minute;

    // Determine upcoming prayer
    String nextId = 'fajr';
    if (nowMinutes < (fajr['minutes'] as int)) {
      nextId = 'fajr';
    } else if (nowMinutes < (dhuhr['minutes'] as int)) {
      nextId = 'dhuhr';
    } else if (nowMinutes < (asr['minutes'] as int)) {
      nextId = 'asr';
    } else if (nowMinutes < (maghrib['minutes'] as int)) {
      nextId = 'maghrib';
    } else if (nowMinutes < (isha['minutes'] as int)) {
      nextId = 'isha';
    } else {
      nextId = 'fajr';
    }

    return [
      PrayerItem(
        id: 'fajr',
        name: 'Fajr',
        arabic: 'الفجر',
        time: fajr['time12'],
        time24: fajr['time24'],
        minutes: fajr['minutes'],
        isNext: nextId == 'fajr',
        desc: 'Dawn Prayer until Sunrise',
      ),
      PrayerItem(
        id: 'sunrise',
        name: 'Sunrise',
        arabic: 'الشروق',
        time: sunrise['time12'],
        time24: sunrise['time24'],
        minutes: sunrise['minutes'],
        isNext: false,
        desc: 'End of Fajr period',
      ),
      PrayerItem(
        id: 'dhuhr',
        name: 'Dhuhr',
        arabic: 'الظهر',
        time: dhuhr['time12'],
        time24: dhuhr['time24'],
        minutes: dhuhr['minutes'],
        isNext: nextId == 'dhuhr',
        desc: 'Midday solar zenith',
      ),
      PrayerItem(
        id: 'asr',
        name: 'Asr',
        arabic: 'العصر',
        time: asr['time12'],
        time24: asr['time24'],
        minutes: asr['minutes'],
        isNext: nextId == 'asr',
        desc: 'Afternoon prayer',
      ),
      PrayerItem(
        id: 'maghrib',
        name: 'Maghrib',
        arabic: 'المغرب',
        time: maghrib['time12'],
        time24: maghrib['time24'],
        minutes: maghrib['minutes'],
        isNext: nextId == 'maghrib',
        desc: 'Sunset & Iftar time',
      ),
      PrayerItem(
        id: 'isha',
        name: 'Isha',
        arabic: 'العشاء',
        time: isha['time12'],
        time24: isha['time24'],
        minutes: isha['minutes'],
        isNext: nextId == 'isha',
        desc: 'Night prayer',
      ),
    ];
  }

  static int getSecondsToNextPrayer(List<PrayerItem> prayers) {
    final now = DateTime.now();
    final nowMins = now.hour * 60 + now.minute;
    final nowSecs = now.second;

    for (final p in prayers) {
      if (p.id == 'sunrise') continue;
      if (p.minutes > nowMins) {
        return (p.minutes - nowMins) * 60 - nowSecs;
      }
    }

    // After Isha: next is tomorrow's Fajr
    final fajr = prayers.firstWhere((p) => p.id == 'fajr');
    final minutesUntilMidnight = (24 * 60) - nowMins;
    return (minutesUntilMidnight + fajr.minutes) * 60 - nowSecs;
  }
}
