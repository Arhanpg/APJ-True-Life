import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../../../../core/theme/app_colors.dart';

class MainShell extends StatelessWidget {
  final Widget child;
  const MainShell({super.key, required this.child});

  static const _tabs = [
    (path: '/home', label: 'Home', icon: Icons.home_outlined, activeIcon: Icons.home),
    (path: '/appointments', label: 'Appointments', icon: Icons.calendar_today_outlined, activeIcon: Icons.calendar_today),
    (path: '/treatment', label: 'Treatment', icon: Icons.medical_services_outlined, activeIcon: Icons.medical_services),
    (path: '/chat', label: 'Chat', icon: Icons.chat_bubble_outline, activeIcon: Icons.chat_bubble),
    (path: '/profile', label: 'Profile', icon: Icons.person_outline, activeIcon: Icons.person),
  ];

  int _currentIndex(BuildContext context) {
    final location = GoRouterState.of(context).uri.path;
    for (var i = 0; i < _tabs.length; i++) {
      if (location.startsWith(_tabs[i].path)) return i;
    }
    return 0;
  }

  @override
  Widget build(BuildContext context) {
    final idx = _currentIndex(context);
    return Scaffold(
      body: child,
      bottomNavigationBar: Container(
        decoration: const BoxDecoration(
          color: Colors.white,
          boxShadow: [BoxShadow(color: Color(0x18000000), blurRadius: 12, offset: Offset(0, -2))],
        ),
        child: SafeArea(
          child: SizedBox(
            height: 60,
            child: Row(
              children: List.generate(_tabs.length, (i) {
                final selected = idx == i;
                return Expanded(
                  child: InkWell(
                    onTap: () => context.go(_tabs[i].path),
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Icon(
                          selected ? _tabs[i].activeIcon : _tabs[i].icon,
                          size: 22,
                          color: selected ? AppColors.primary : AppColors.textMuted,
                        ),
                        const SizedBox(height: 3),
                        Text(
                          _tabs[i].label,
                          style: TextStyle(
                            fontSize: 10,
                            fontWeight: selected ? FontWeight.w700 : FontWeight.normal,
                            color: selected ? AppColors.primary : AppColors.textMuted,
                          ),
                        ),
                        if (selected)
                          Container(
                            margin: const EdgeInsets.only(top: 3),
                            width: 18, height: 3,
                            decoration: BoxDecoration(
                              color: AppColors.accentGold,
                              borderRadius: BorderRadius.circular(2),
                            ),
                          ),
                      ],
                    ),
                  ),
                );
              }),
            ),
          ),
        ),
      ),
    );
  }
}
