import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import '../../features/auth/screens/splash_screen.dart';
import '../../features/auth/screens/onboarding_screen.dart';
import '../../features/auth/screens/phone_number_screen.dart';
import '../../features/auth/screens/otp_screen.dart';
import '../../features/auth/screens/profile_creation_screen.dart';
import '../../features/home/screens/home_screen.dart';
import '../../features/treatment/screens/treatment_screen.dart';
import '../../features/treatment/screens/phase_detail_screen.dart';
import '../../features/appointments/screens/appointments_screen.dart';
import '../../features/chat/screens/chat_screen.dart';
import '../../features/profile/screens/profile_screen.dart';
import '../shell/main_shell.dart';

final appRouterProvider = Provider<GoRouter>((ref) {
  return GoRouter(
    initialLocation: '/splash',
    routes: [
      GoRoute(path: '/splash',    builder: (_, __) => const SplashScreen()),
      GoRoute(path: '/onboarding', builder: (_, __) => const OnboardingScreen()),
      GoRoute(path: '/phone',     builder: (_, __) => const PhoneNumberScreen()),
      GoRoute(
        path: '/otp',
        builder: (_, state) => OtpScreen(phoneNumber: state.extra as String),
      ),
      GoRoute(path: '/create-profile', builder: (_, __) => const ProfileCreationScreen()),
      ShellRoute(
        builder: (_, __, child) => MainShell(child: child),
        routes: [
          GoRoute(path: '/home',         builder: (_, __) => const HomeScreen()),
          GoRoute(path: '/treatment',    builder: (_, __) => const TreatmentScreen()),
          GoRoute(
            path: '/treatment/phase/:id',
            builder: (_, state) => PhaseDetailScreen(phaseId: state.pathParameters['id']!),
          ),
          GoRoute(path: '/appointments', builder: (_, __) => const AppointmentsScreen()),
          GoRoute(path: '/chat',         builder: (_, __) => const ChatScreen()),
          GoRoute(path: '/profile',      builder: (_, __) => const ProfileScreen()),
        ],
      ),
    ],
  );
});
