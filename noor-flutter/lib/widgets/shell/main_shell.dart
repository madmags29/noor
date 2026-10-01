// ============================================================
// NOOR — Main Shell (Bottom Tab Navigator)
// Remote Config & Force Update Verification Engine
// ============================================================

import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../../l10n/app_localizations.dart';
import '../force_update_dialog.dart';

class MainShell extends StatefulWidget {
  final Widget child;

  const MainShell({super.key, required this.child});

  @override
  State<MainShell> createState() => _MainShellState();
}

class _MainShellState extends State<MainShell> {
  bool _checkedUpdate = false;

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      if (!_checkedUpdate) {
        _checkedUpdate = true;
        ForceUpdateDialog.checkAndShow(context);
      }
    });
  }

  int _currentIndex(BuildContext context) {
    final location = GoRouterState.of(context).uri.path;
    if (location == '/') return 0;
    if (location.startsWith('/prayer')) return 1;
    if (location.startsWith('/quran')) return 2;
    if (location.startsWith('/ziyarat')) return 3;
    if (location.startsWith('/duas')) return 4;
    return 0;
  }

  void _onTap(BuildContext context, int index) {
    switch (index) {
      case 0:
        context.go('/');
        break;
      case 1:
        context.go('/prayer');
        break;
      case 2:
        context.go('/quran');
        break;
      case 3:
        context.go('/ziyarat');
        break;
      case 4:
        context.go('/duas');
        break;
    }
  }

  @override
  Widget build(BuildContext context) {
    final t = AppLocalizations.of(context)!;
    final currentIndex = _currentIndex(context);

    return Scaffold(
      body: widget.child,
      bottomNavigationBar: Container(
        decoration: const BoxDecoration(
          border: Border(
            top: BorderSide(
              color: Color(0x3334D399), // emeraldBorder
              width: 1,
            ),
          ),
          boxShadow: [
            BoxShadow(
              color: Colors.black54,
              offset: Offset(0, -4),
              blurRadius: 8,
              spreadRadius: 0,
            ),
          ],
        ),
        child: BottomNavigationBar(
          currentIndex: currentIndex,
          onTap: (index) => _onTap(context, index),
          items: [
            BottomNavigationBarItem(
              icon: Icon(
                currentIndex == 0 ? Icons.home : Icons.home_outlined,
              ),
              label: t.home,
            ),
            BottomNavigationBarItem(
              icon: Icon(
                currentIndex == 1 ? Icons.access_time : Icons.access_time_outlined,
              ),
              label: t.prayers,
            ),
            BottomNavigationBarItem(
              icon: Icon(
                currentIndex == 2 ? Icons.menu_book : Icons.menu_book_outlined,
              ),
              label: t.quran,
            ),
            BottomNavigationBarItem(
              icon: Icon(
                currentIndex == 3 ? Icons.mosque : Icons.mosque_outlined,
              ),
              label: t.ziyarat,
            ),
            BottomNavigationBarItem(
              icon: Icon(
                currentIndex == 4 ? Icons.volunteer_activism : Icons.volunteer_activism_outlined,
              ),
              label: t.duas,
            ),
          ],
        ),
      ),
    );
  }
}
