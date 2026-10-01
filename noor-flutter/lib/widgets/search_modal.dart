import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../theme/app_theme.dart';

class SearchModal extends StatefulWidget {
  final VoidCallback onClose;
  const SearchModal({super.key, required this.onClose});
  @override
  State<SearchModal> createState() => _SearchModalState();
}

class _SearchModalState extends State<SearchModal> {
  String _query = '';

  final _allRoutes = const [
    {'title': 'Prayer Times', 'sub': 'Daily prayer timetable', 'route': '/prayer', 'icon': Icons.access_time_outlined},
    {'title': 'Noble Quran', 'sub': '114 Surahs', 'route': '/quran', 'icon': Icons.menu_book_outlined},
    {'title': 'Ziyarat', 'sub': 'Shrine directory', 'route': '/ziyarat', 'icon': Icons.place_outlined},
    {'title': 'Duas & Dhikr', 'sub': 'Authentic supplications', 'route': '/duas', 'icon': Icons.favorite_border},
    {'title': 'Hijri Calendar', 'sub': 'Islamic dates', 'route': '/calendar', 'icon': Icons.calendar_today_outlined},
    {'title': 'Zakat Calculator', 'sub': '2.5% Nisab', 'route': '/zakat', 'icon': Icons.payments_outlined},
    {'title': '99 Names of Allah', 'sub': 'Asma ul-Husna', 'route': '/names-of-allah', 'icon': Icons.auto_awesome_outlined},
    {'title': 'Hajj & Umrah', 'sub': 'Complete guide', 'route': '/hajj-umrah', 'icon': Icons.navigation_outlined},
  ];

  @override
  Widget build(BuildContext context) {
    final results = _query.isEmpty ? _allRoutes : _allRoutes.where((r) =>
        (r['title'] as String).toLowerCase().contains(_query.toLowerCase()) ||
        (r['sub'] as String).toLowerCase().contains(_query.toLowerCase())).toList();

    return GestureDetector(
      onTap: widget.onClose,
      child: Container(
        color: const Color(0xCC000000),
        child: GestureDetector(
          onTap: () {},
          child: Align(
            alignment: Alignment.topCenter,
            child: Container(
              margin: const EdgeInsets.fromLTRB(16, 60, 16, 0),
              constraints: BoxConstraints(maxHeight: MediaQuery.of(context).size.height * 0.7),
              decoration: BoxDecoration(color: AppColors.bgCard, borderRadius: BorderRadius.circular(24), border: Border.all(color: AppColors.borderSubtle)),
              child: Column(children: [
                Padding(padding: const EdgeInsets.all(16), child: TextField(
                  autofocus: true,
                  onChanged: (v) => setState(() => _query = v),
                  style: const TextStyle(color: AppColors.textWhite),
                  decoration: const InputDecoration(
                    hintText: 'Search features, duas, surahs...',
                    prefixIcon: Icon(Icons.search, color: AppColors.goldPrimary),
                    border: InputBorder.none,
                  ),
                )),
                const Divider(color: AppColors.divider, height: 1),
                Flexible(child: ListView.builder(
                  itemCount: results.length,
                  itemBuilder: (_, i) {
                    final r = results[i];
                    return GestureDetector(
                      onTap: () { context.push(r['route'] as String); widget.onClose(); },
                      child: Padding(padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12), child: Row(children: [
                        Icon(r['icon'] as IconData, size: 20, color: AppColors.goldPrimary),
                        const SizedBox(width: 12),
                        Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                          Text(r['title'] as String, style: const TextStyle(fontSize: 14, fontWeight: FontWeight.w700, color: AppColors.textWhite)),
                          Text(r['sub'] as String, style: const TextStyle(fontSize: 11, color: AppColors.emeraldSubtle)),
                        ]),
                      ])),
                    );
                  },
                )),
              ]),
            ),
          ),
        ),
      ),
    );
  }
}