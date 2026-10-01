// ============================================================
// NOOR — Precision Zakat Calculator (Flutter)
// ============================================================

import 'package:flutter/material.dart';
import '../../theme/app_theme.dart';
import '../../l10n/app_localizations.dart';
import '../../data/zakat_data.dart';

class ZakatScreen extends StatefulWidget {
  const ZakatScreen({super.key});

  @override
  State<ZakatScreen> createState() => _ZakatScreenState();
}

class _ZakatScreenState extends State<ZakatScreen> {
  ZakatCurrency _selectedCurrency = kZakatCurrencies[0]; // USD default
  bool _useSilverNisab = true;

  // Input Controllers
  final TextEditingController _cashCtrl = TextEditingController(text: '0');
  final TextEditingController _goldCtrl = TextEditingController(text: '0');
  final TextEditingController _silverCtrl = TextEditingController(text: '0');
  final TextEditingController _investmentsCtrl = TextEditingController(text: '0');
  final TextEditingController _businessCtrl = TextEditingController(text: '0');
  final TextEditingController _rentalCtrl = TextEditingController(text: '0');
  final TextEditingController _debtsCtrl = TextEditingController(text: '0');

  double _parseVal(TextEditingController ctrl) {
    return double.tryParse(ctrl.text.replaceAll(',', '')) ?? 0.0;
  }

  @override
  void dispose() {
    _cashCtrl.dispose();
    _goldCtrl.dispose();
    _silverCtrl.dispose();
    _investmentsCtrl.dispose();
    _businessCtrl.dispose();
    _rentalCtrl.dispose();
    _debtsCtrl.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final t = AppLocalizations.of(context)!;

    final cash = _parseVal(_cashCtrl);
    final gold = _parseVal(_goldCtrl);
    final silver = _parseVal(_silverCtrl);
    final inv = _parseVal(_investmentsCtrl);
    final biz = _parseVal(_businessCtrl);
    final rental = _parseVal(_rentalCtrl);
    final debts = _parseVal(_debtsCtrl);

    final result = calculateZakat(
      cash: cash,
      goldValue: gold,
      silverValue: silver,
      investments: inv,
      businessInventory: biz,
      rentalIncome: rental,
      deductibleDebts: debts,
      currency: _selectedCurrency,
      useSilverNisab: _useSilverNisab,
    );

    return Scaffold(
      backgroundColor: AppColors.bgDark,
      appBar: AppBar(
        backgroundColor: AppColors.bgDark,
        title: Text(t.zakat, style: const TextStyle(fontWeight: FontWeight.w900, color: AppColors.textWhite)),
        iconTheme: const IconThemeData(color: AppColors.goldPrimary),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            // Currency & Nisab Settings Card
            _buildCurrencyCard(),
            const SizedBox(height: 16),

            // Summary Result Card
            _buildResultCard(result),
            const SizedBox(height: 20),

            // Input Fields
            _sectionTitle('Zakatable Assets'),
            const SizedBox(height: 12),
            _inputField('Cash in Hand & Bank Accounts', _cashCtrl, Icons.account_balance_wallet_outlined),
            _inputField('Gold Value', _goldCtrl, Icons.monetization_on_outlined),
            _inputField('Silver Value', _silverCtrl, Icons.circle_outlined),
            _inputField('Stocks, Shares & Crypto', _investmentsCtrl, Icons.trending_up),
            _inputField('Business Goods & Trade Inventory', _businessCtrl, Icons.storefront_outlined),
            _inputField('Net Rental & Agricultural Profit', _rentalCtrl, Icons.home_work_outlined),

            const SizedBox(height: 16),
            _sectionTitle('Liabilities & Deductible Debts'),
            const SizedBox(height: 12),
            _inputField('Short-term Debts / Immediate Bills', _debtsCtrl, Icons.credit_card_off_outlined, isDeduction: true),

            const SizedBox(height: 24),
            // Rulings Card
            _buildRulingsCard(),
          ],
        ),
      ),
    );
  }

  Widget _sectionTitle(String title) {
    return Text(
      title,
      style: const TextStyle(fontSize: 14, fontWeight: FontWeight.w800, color: AppColors.goldPrimary),
    );
  }

  Widget _buildCurrencyCard() {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: AppColors.bgCard,
        borderRadius: BorderRadius.circular(20),
        border: Border.all(color: AppColors.borderSubtle),
      ),
      child: Column(
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              const Text('Currency:', style: TextStyle(color: AppColors.textWhite, fontWeight: FontWeight.bold)),
              DropdownButton<ZakatCurrency>(
                value: _selectedCurrency,
                dropdownColor: AppColors.bgCard,
                underline: const SizedBox(),
                style: const TextStyle(color: AppColors.goldPrimary, fontWeight: FontWeight.bold),
                items: kZakatCurrencies.map((c) {
                  return DropdownMenuItem<ZakatCurrency>(
                    value: c,
                    child: Text('${c.code} (${c.symbol}) — ${c.name}'),
                  );
                }).toList(),
                onChanged: (val) {
                  if (val != null) setState(() => _selectedCurrency = val);
                },
              ),
            ],
          ),
          const SizedBox(height: 12),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              const Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text('Nisab Standard', style: TextStyle(color: AppColors.textWhite, fontSize: 13, fontWeight: FontWeight.w700)),
                  Text('Silver (612.36g) vs Gold (87.48g)', style: TextStyle(color: AppColors.emeraldSubtle, fontSize: 11)),
                ],
              ),
              Switch(
                value: _useSilverNisab,
                activeColor: AppColors.goldPrimary,
                onChanged: (val) => setState(() => _useSilverNisab = val),
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildResultCard(ZakatCalculationResult result) {
    final sym = _selectedCurrency.symbol;
    final threshold = _useSilverNisab ? result.silverNisabThreshold : result.goldNisabThreshold;

    return Container(
      padding: const EdgeInsets.all(22),
      decoration: BoxDecoration(
        gradient: const LinearGradient(
          colors: [Color(0xFF064E3B), Color(0xFF0F172A)],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
        borderRadius: BorderRadius.circular(24),
        border: Border.all(color: AppColors.goldPrimary.withValues(alpha: 0.4)),
        boxShadow: const [
          BoxShadow(
            color: Color(0x33000000),
            blurRadius: 16,
            offset: Offset(0, 8),
          ),
        ],
      ),
      child: Column(
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              const Text('Total Zakat Payable (2.5%)', style: TextStyle(fontSize: 13, color: AppColors.emeraldSubtle, fontWeight: FontWeight.bold)),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                decoration: BoxDecoration(
                  color: result.isEligibleForZakat ? const Color(0x2634D399) : const Color(0x26EF4444),
                  borderRadius: BorderRadius.circular(20),
                ),
                child: Text(
                  result.isEligibleForZakat ? 'Eligible' : 'Below Nisab',
                  style: TextStyle(
                    fontSize: 11,
                    fontWeight: FontWeight.w800,
                    color: result.isEligibleForZakat ? const Color(0xFF34D399) : const Color(0xFFEF4444),
                  ),
                ),
              ),
            ],
          ),
          const SizedBox(height: 12),
          Text(
            '$sym ${result.zakatPayable.toStringAsFixed(2)}',
            style: const TextStyle(
              fontSize: 36,
              fontWeight: FontWeight.w900,
              color: AppColors.goldPrimary,
              letterSpacing: -0.5,
            ),
          ),
          const SizedBox(height: 16),
          Container(height: 1, color: Colors.white10),
          const SizedBox(height: 14),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text('Net Zakatable Wealth', style: TextStyle(fontSize: 11, color: AppColors.emeraldSubtle)),
                  const SizedBox(height: 2),
                  Text('$sym ${result.netZakatValue.toStringAsFixed(2)}', style: const TextStyle(fontSize: 14, fontWeight: FontWeight.w800, color: AppColors.textWhite)),
                ],
              ),
              Column(
                crossAxisAlignment: CrossAxisAlignment.end,
                children: [
                  Text('Nisab Threshold (${_useSilverNisab ? 'Silver' : 'Gold'})', style: const TextStyle(fontSize: 11, color: AppColors.emeraldSubtle)),
                  const SizedBox(height: 2),
                  Text('$sym ${threshold.toStringAsFixed(2)}', style: const TextStyle(fontSize: 14, fontWeight: FontWeight.w800, color: AppColors.goldLight)),
                ],
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _inputField(String label, TextEditingController ctrl, IconData icon, {bool isDeduction = false}) {
    return Container(
      margin: const EdgeInsets.only(bottom: 12),
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 4),
      decoration: BoxDecoration(
        color: AppColors.bgCard,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: AppColors.borderSubtle),
      ),
      child: Row(
        children: [
          Icon(icon, size: 20, color: isDeduction ? const Color(0xFFEF4444) : AppColors.goldPrimary),
          const SizedBox(width: 14),
          Expanded(
            child: TextField(
              controller: ctrl,
              keyboardType: const TextInputType.numberWithOptions(decimal: true),
              style: const TextStyle(color: AppColors.textWhite, fontSize: 15, fontWeight: FontWeight.bold),
              onChanged: (_) => setState(() {}),
              decoration: InputDecoration(
                labelText: label,
                labelStyle: const TextStyle(color: AppColors.emeraldSubtle, fontSize: 12),
                border: InputBorder.none,
                prefixText: '${_selectedCurrency.symbol} ',
                prefixStyle: TextStyle(color: isDeduction ? const Color(0xFFEF4444) : AppColors.goldPrimary, fontWeight: FontWeight.bold),
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildRulingsCard() {
    return Container(
      padding: const EdgeInsets.all(18),
      decoration: BoxDecoration(
        color: AppColors.bgCard,
        borderRadius: BorderRadius.circular(20),
        border: Border.all(color: AppColors.borderSubtle),
      ),
      child: const Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Icon(Icons.info_outline, size: 16, color: AppColors.goldPrimary),
              SizedBox(width: 8),
              Text('Zakat Fiqh Guidelines', style: TextStyle(fontSize: 14, fontWeight: FontWeight.w800, color: AppColors.goldPrimary)),
            ],
          ),
          SizedBox(height: 10),
          Text(
            '• Zakat is an obligatory pillar of Islam (2.5% of net qualifying assets held for one full lunar year / Hawl).\n'
            '• Silver Nisab (612.36g) is historically recommended by the majority of scholars as it allows broader assistance to the poor.\n'
            '• Personal necessities (primary residence, personal car, daily clothes) are exempt from Zakat.',
            style: TextStyle(fontSize: 12, color: AppColors.emeraldSubtle, height: 1.6),
          ),
        ],
      ),
    );
  }
}
