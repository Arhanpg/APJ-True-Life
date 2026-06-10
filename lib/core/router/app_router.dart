import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import '../../features/auth/screens/splash_screen.dart';
import '../../features/auth/screens/onboarding_screen.dart';
import '../../features/auth/screens/phone_entry_screen.dart';
import '../../features/auth/screens/otp_screen.dart';
import '../../features/auth/screens/profile_creation_screen.dart';
import '../../features/home/screens/home_screen.dart';
import '../../features/treatment/screens/treatment_screen.dart';
import '../../features/appointments/screens/appointments_screen.dart';
import '../../features/chat/screens/chat_screen.dart';
import '../../features/profile/screens/profile_screen.dart';

final appRouterProvider = Provider<GoRouter>((ref) {
  return GoRouter(
    initialLocation: '/splash',
    routes: [
      GoRoute(path: '/splash',        builder: (_, __) => const SplashScreen()),
      GoRoute(path: '/onboarding',    builder: (_, __) => const OnboardingScreen()),
      GoRoute(path: '/phone',         builder: (_, __) => const PhoneEntryScreen()),
      GoRoute(path: '/otp',           builder: (_, state) => OtpScreen(phoneNumber: state.extra as String)),
      GoRoute(path: '/profile-create',builder: (_, __) => const ProfileCreationScreen()),
      ShellRoute(
        builder: (context, state, child) => MainShell(child: child),
        routes: [
          GoRoute(path: '/home',         builder: (_, __) => const HomeScreen()),
          GoRoute(path: '/treatment',    builder: (_, __) => const TreatmentScreen()),
          GoRoute(path: '/appointments', builder: (_, __) => const AppointmentsScreen()),
          GoRoute(path: '/chat',         builder: (_, __) => const ChatScreen()),
          GoRoute(path: '/profile',      builder: (_, __) => const ProfileScreen()),
        ],
      ),
    ],
  );
});

class MainShell extends StatefulWidget {
  final Widget child;
  const MainShell({super.key, required this.child});

  @override
  State<MainShell> createState() => _MainShellState();
}

class _MainShellState extends State<MainShell> {
  int _currentIndex = 0;
  final _tabs = ['/home', '/appointments', '/treatment', '/chat', '/profile'];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: widget.child,
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: _currentIndex,
        onTap: (i) {
          setState(() => _currentIndex = i);
          context.go(_tabs[i]);
        },
        items: const [
          BottomNavigationBarItem(icon: Icon(Icons.home_outlined),        activeIcon: Icon(Icons.home),        label: 'Home'),
          BottomNavigationBarItem(icon: Icon(Icons.calendar_today_outlined), activeIcon: Icon(Icons.calendar_today), label: 'Appointments'),
          BottomNavigationBarItem(icon: Icon(Icons.assignment_outlined),  activeIcon: Icon(Icons.assignment),  label: 'Treatment'),
          BottomNavigationBarItem(icon: Icon(Icons.chat_outlined),        activeIcon: Icon(Icons.chat),        label: 'Chat'),
          BottomNavigationBarItem(icon: Icon(Icons.person_outline),       activeIcon: Icon(Icons.person),      label: 'Profile'),
        ],
      ),
    );
  }
}
