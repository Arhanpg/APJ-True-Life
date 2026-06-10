import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../../features/splash/splash_screen.dart';
import '../../features/onboarding/onboarding_screen.dart';
import '../../features/auth/mobile_entry_screen.dart';
import '../../features/auth/otp_screen.dart';
import '../../features/auth/profile_creation_screen.dart';
import '../../features/navigation/main_navigation.dart';
import '../../features/home/screens/home_screen.dart';
import '../../features/treatment/screens/treatment_screen.dart';
import '../../features/treatment/screens/phase_detail_screen.dart';
import '../../features/appointments/screens/appointments_screen.dart';
import '../../features/chat/screens/chat_screen.dart';
import '../../features/profile/screens/profile_screen.dart';

final appRouter = GoRouter(
  initialLocation: '/splash',
  routes: [
    GoRoute(path: '/splash', builder: (_, __) => const SplashScreen()),
    GoRoute(path: '/onboarding', builder: (_, __) => const OnboardingScreen()),
    GoRoute(path: '/auth/mobile', builder: (_, __) => const MobileEntryScreen()),
    GoRoute(
      path: '/auth/otp',
      builder: (_, state) {
        final phone = state.extra as String? ?? '';
        return OTPScreen(phoneNumber: phone);
      },
    ),
    GoRoute(path: '/auth/profile', builder: (_, __) => const ProfileCreationScreen()),
    ShellRoute(
      builder: (_, __, child) => MainNavigation(child: child),
      routes: [
        GoRoute(path: '/home', builder: (_, __) => const HomeScreen()),
        GoRoute(path: '/treatment', builder: (_, __) => const TreatmentScreen()),
        GoRoute(
          path: '/treatment/phase/:phaseId',
          builder: (_, state) => PhaseDetailScreen(phaseId: state.pathParameters['phaseId'] ?? ''),
        ),
        GoRoute(path: '/appointments', builder: (_, __) => const AppointmentsScreen()),
        GoRoute(path: '/chat', builder: (_, __) => const ChatScreen()),
        GoRoute(path: '/profile', builder: (_, __) => const ProfileScreen()),
      ],
    ),
  ],
);
