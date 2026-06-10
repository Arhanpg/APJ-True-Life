import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../theme/app_colors.dart';

class MainShell extends StatelessWidget {
  final Widget child;
  const MainShell({super.key, required this.child});

  int _currentIndex(BuildContext context) {
    final location = GoRouterState.of(context).matchedLocation;
    if (location.startsWith('/home'))         return 0;
    if (location.startsWith('/appointments')) return 1;
    if (location.startsWith('/treatment'))   return 2;
    if (location.startsWith('/chat'))        return 3;
    if (location.startsWith('/profile'))     return 4;
    return 0;
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: child,
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: _currentIndex(context),
        onTap: (i) {
          switch (i) {
            case 0: context.go('/home'); break;
            case 1: context.go('/appointments'); break;
            case 2: context.go('/treatment'); break;
            case 3: context.go('/chat'); break;
            case 4: context.go('/profile'); break;
          }
        },
        items: const [
          BottomNavigationBarItem(icon: Icon(Icons.home_outlined),         activeIcon: Icon(Icons.home),          label: 'Home'),
          BottomNavigationBarItem(icon: Icon(Icons.calendar_today_outlined),activeIcon: Icon(Icons.calendar_today),label: 'Appointments'),
          BottomNavigationBarItem(icon: Icon(Icons.medical_services_outlined),activeIcon: Icon(Icons.medical_services),label: 'Treatment'),
          BottomNavigationBarItem(icon: Icon(Icons.chat_bubble_outline),   activeIcon: Icon(Icons.chat_bubble),   label: 'Chat'),
          BottomNavigationBarItem(icon: Icon(Icons.person_outline),        activeIcon: Icon(Icons.person),        label: 'Profile'),
        ],
      ),
    );
  }
}
