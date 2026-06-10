import 'package:go_router/go_router.dart';
import 'package:flutter/material.dart';
import '../../features/auth/screens/splash_screen.dart';
import '../../features/auth/screens/onboarding_screen.dart';
import '../../features/auth/screens/phone_entry_screen.dart';
import '../../features/auth/screens/otp_screen.dart';
import '../../features/auth/screens/profile_creation_screen.dart';
import '../../features/home/screens/home_screen.dart';
import '../../features/treatment/screens/treatment_screen.dart';
import '../../features/treatment/screens/phase_detail_screen.dart';
import '../../features/treatment/screens/treatment_archive_screen.dart';
import '../../features/appointments/screens/appointments_screen.dart';
import '../../features/chat/screens/chat_screen.dart';
import '../../features/profile/screens/profile_screen.dart';
import '../widgets/main_shell.dart';

class AppRouter {
  static final router = GoRouter(
    initialLocation: '/splash',
    routes: [
      GoRoute(path: '/splash', builder: (_, __) => const SplashScreen()),
      GoRoute(path: '/onboarding', builder: (_, __) => const OnboardingScreen()),
      GoRoute(path: '/phone', builder: (_, __) => const PhoneEntryScreen()),
      GoRoute(
        path: '/otp',
        builder: (_, state) => OtpScreen(phone: state.extra as String? ?? ''),
      ),
      GoRoute(path: '/profile-create', builder: (_, __) => const ProfileCreationScreen()),
      ShellRoute(
        builder: (context, state, child) => MainShell(child: child),
        routes: [
          GoRoute(path: '/home', builder: (_, __) => const HomeScreen()),
          GoRoute(path: '/treatment', builder: (_, __) => const TreatmentScreen()),
          GoRoute(
            path: '/treatment/phase/:phaseId',
            builder: (_, state) => PhaseDetailScreen(phaseId: state.pathParameters['phaseId'] ?? ''),
          ),
          GoRoute(path: '/treatment/archive', builder: (_, __) => const TreatmentArchiveScreen()),
          GoRoute(path: '/appointments', builder: (_, __) => const AppointmentsScreen()),
          GoRoute(path: '/chat', builder: (_, __) => const ChatScreen()),
          GoRoute(path: '/profile', builder: (_, __) => const ProfileScreen()),
        ],
      ),
    ],
  );
}
