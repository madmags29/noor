// ============================================================
// NOOR — Precision Zakat Engine & Multi-Currency Database (Dart)
// Verified according to classical 2.5% annual lunar Hawl rulings
// ============================================================

class ZakatCurrency {
  final String code;
  final String symbol;
  final String name;
  final double goldGramRate;
  final double silverGramRate;

  const ZakatCurrency({
    required this.code,
    required this.symbol,
    required this.name,
    required this.goldGramRate,
    required this.silverGramRate,
  });
}

class ZakatCalculationResult {
  final double totalGrossAssets;
  final double totalDeductibleDebts;
  final double netZakatValue;
  final double goldNisabThreshold;
  final double silverNisabThreshold;
  final bool isEligibleForZakat;
  final double zakatPayable;

  const ZakatCalculationResult({
    required this.totalGrossAssets,
    required this.totalDeductibleDebts,
    required this.netZakatValue,
    required this.goldNisabThreshold,
    required this.silverNisabThreshold,
    required this.isEligibleForZakat,
    required this.zakatPayable,
  });
}

const double kGoldNisabGrams = 87.48; // 7.5 Tola (Gold Nisab standard)
const double kSilverNisabGrams = 612.36; // 52.5 Tola (Silver Nisab standard)
const double kZakatRate = 0.025; // 2.5%

const List<ZakatCurrency> kZakatCurrencies = [
  ZakatCurrency(code: 'USD', symbol: '\$', name: 'US Dollar', goldGramRate: 75.50, silverGramRate: 0.92),
  ZakatCurrency(code: 'INR', symbol: '₹', name: 'Indian Rupee', goldGramRate: 7250.0, silverGramRate: 88.0),
  ZakatCurrency(code: 'PKR', symbol: '₨', name: 'Pakistani Rupee', goldGramRate: 23500.0, silverGramRate: 285.0),
  ZakatCurrency(code: 'SAR', symbol: '﷼', name: 'Saudi Riyal', goldGramRate: 283.0, silverGramRate: 3.45),
  ZakatCurrency(code: 'AED', symbol: 'د.إ', name: 'UAE Dirham', goldGramRate: 277.0, silverGramRate: 3.38),
  ZakatCurrency(code: 'BDT', symbol: '৳', name: 'Bangladeshi Taka', goldGramRate: 8850.0, silverGramRate: 108.0),
  ZakatCurrency(code: 'TRY', symbol: '₺', name: 'Turkish Lira', goldGramRate: 2450.0, silverGramRate: 30.0),
  ZakatCurrency(code: 'IDR', symbol: 'Rp', name: 'Indonesian Rupiah', goldGramRate: 1180000.0, silverGramRate: 14500.0),
  ZakatCurrency(code: 'MYR', symbol: 'RM', name: 'Malaysian Ringgit', goldGramRate: 355.0, silverGramRate: 4.35),
  ZakatCurrency(code: 'GBP', symbol: '£', name: 'British Pound', goldGramRate: 59.80, silverGramRate: 0.73),
  ZakatCurrency(code: 'EUR', symbol: '€', name: 'Euro', goldGramRate: 70.20, silverGramRate: 0.85),
  ZakatCurrency(code: 'CAD', symbol: 'C\$', name: 'Canadian Dollar', goldGramRate: 102.50, silverGramRate: 1.25),
  ZakatCurrency(code: 'AUD', symbol: 'A\$', name: 'Australian Dollar', goldGramRate: 115.0, silverGramRate: 1.40),
  ZakatCurrency(code: 'QAR', symbol: 'QR', name: 'Qatari Riyal', goldGramRate: 275.0, silverGramRate: 3.35),
  ZakatCurrency(code: 'KWD', symbol: 'KD', name: 'Kuwaiti Dinar', goldGramRate: 23.20, silverGramRate: 0.28),
  ZakatCurrency(code: 'EGP', symbol: 'E£', name: 'Egyptian Pound', goldGramRate: 3650.0, silverGramRate: 45.0),
];

ZakatCalculationResult calculateZakat({
  required double cash,
  required double goldValue,
  required double silverValue,
  required double investments,
  required double businessInventory,
  required double rentalIncome,
  required double deductibleDebts,
  required ZakatCurrency currency,
  bool useSilverNisab = true, // Silver Nisab is standard recommended for benefiting the poor
}) {
  final grossAssets = cash + goldValue + silverValue + investments + businessInventory + rentalIncome;
  final netAssets = (grossAssets - deductibleDebts) > 0 ? (grossAssets - deductibleDebts) : 0.0;
  final goldThreshold = kGoldNisabGrams * currency.goldGramRate;
  final silverThreshold = kSilverNisabGrams * currency.silverGramRate;
  final threshold = useSilverNisab ? silverThreshold : goldThreshold;

  final isEligible = netAssets >= threshold;
  final zakatDue = isEligible ? netAssets * kZakatRate : 0.0;

  return ZakatCalculationResult(
    totalGrossAssets: grossAssets,
    totalDeductibleDebts: deductibleDebts,
    netZakatValue: netAssets,
    goldNisabThreshold: goldThreshold,
    silverNisabThreshold: silverThreshold,
    isEligibleForZakat: isEligible,
    zakatPayable: zakatDue,
  );
}
