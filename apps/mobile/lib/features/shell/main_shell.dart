import 'package:apj_true_life/core/theme/app_colors.dart';
import 'package:apj_true_life/core/router/app_router.dart';
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

/// Main shell with bottom navigation bar
/// Wraps all authenticated screens
class MainShell extends StatelessWidget {
  final Widget child;

  const MainShell({super.key, required this.child});

  static const List<_NavItem> _navItems = [
    _NavItem(icon: Icons.home_outlined, activeIcon: Icons.home, label: 'Home', path: '/home'),
    _NavItem(icon: Icons.calendar_month_outlined, activeIcon: Icons.calendar_month, label: 'Appointments', path: '/appointments'),
    _NavItem(icon: Icons.healing_outlined, activeIcon: Icons.healing, label: 'Treatment', path: '/treatment'),
    _NavItem(icon: Icons.chat_bubble_outline, activeIcon: Icons.chat_bubble, label: 'Chat', path: '/chat'),
    _NavItem(icon: Icons.person_outline, activeIcon: Icons.person, label: 'Profile', path: '/profile'),
  ];

  int _currentIndex(BuildContext context) {
    final location = GoRouterState.of(context).uri.toString();
    for (int i = 0; i < _navItems.length; i++) {
      if (location.startsWith(_navItems[i].path)) return i;
    }
    return 0;
  }

  @override
  Widget build(BuildContext context) {
    final currentIndex = _currentIndex(context);

    return Scaffold(
      body: child,
      bottomNavigationBar: Container(
        decoration: const BoxDecoration(
          border: Border(top: BorderSide(color: AppColors.outlineVariant, width: 1)),
        ),
        child: BottomNavigationBar(
          currentIndex: currentIndex,
          onTap: (index) => context.go(_navItems[index].path),
          items: _navItems.map((item) {
            final isActive = _navItems.indexOf(item) == currentIndex;
            return BottomNavigationBarItem(
              icon: Icon(item.icon),
              activeIcon: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  Icon(item.activeIcon, color: AppColors.accentGold),
                  const SizedBox(height: 2),
                  Container(
                    width: 4,
                    height: 4,
                    decoration: const BoxDecoration(
                      color: AppColors.accentGold,
                      shape: BoxShape.circle,
                    ),
                  ),
                ],
              ),
              label: item.label,
            );
          }).toList(),
        ),
      ),
    );
  }
}

class _NavItem {
  final IconData icon;
  final IconData activeIcon;
  final String label;
  final String path;

  const _NavItem({
    required this.icon,
    required this.activeIcon,
    required this.label,
    required this.path,
  });
}
