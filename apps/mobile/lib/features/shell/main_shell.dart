import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../../core/theme/app_colors.dart';

class MainShell extends StatelessWidget {
  final Widget child;
  const MainShell({super.key, required this.child});

  int _routeIndex(BuildContext context) {
    final loc = GoRouterState.of(context).uri.path;
    if (loc.startsWith('/treatment')) return 2;
    if (loc.startsWith('/appointments')) return 1;
    if (loc.startsWith('/chat')) return 3;
    if (loc.startsWith('/profile')) return 4;
    return 0;
  }

  void _onTap(BuildContext context, int index) {
    switch (index) {
      case 0: context.go('/home'); break;
      case 1: context.go('/appointments'); break;
      case 2: context.go('/treatment'); break;
      case 3: context.go('/chat'); break;
      case 4: context.go('/profile'); break;
    }
  }

  @override
  Widget build(BuildContext context) {
    final current = _routeIndex(context);
    return Scaffold(
      body: child,
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: current,
        onTap: (i) => _onTap(context, i),
        items: const [
          BottomNavigationBarItem(icon: Icon(Icons.home_outlined), activeIcon: Icon(Icons.home), label: 'Home'),
          BottomNavigationBarItem(icon: Icon(Icons.calendar_today_outlined), activeIcon: Icon(Icons.calendar_today), label: 'Appointments'),
          BottomNavigationBarItem(icon: Icon(Icons.healing_outlined), activeIcon: Icon(Icons.healing), label: 'Treatment'),
          BottomNavigationBarItem(icon: Icon(Icons.chat_bubble_outline), activeIcon: Icon(Icons.chat_bubble), label: 'Chat'),
          BottomNavigationBarItem(icon: Icon(Icons.person_outline), activeIcon: Icon(Icons.person), label: 'Profile'),
        ],
      ),
    );
  }
}
