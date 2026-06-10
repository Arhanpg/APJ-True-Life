import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import '../../features/auth/presentation/screens/splash_screen.dart';
import '../../features/auth/presentation/screens/onboarding_screen.dart';
import '../../features/auth/presentation/screens/phone_entry_screen.dart';
import '../../features/auth/presentation/screens/otp_screen.dart';
import '../../features/auth/presentation/screens/profile_creation_screen.dart';
import '../../features/home/presentation/screens/home_screen.dart';
import '../../features/treatment/presentation/screens/treatment_screen.dart';
import '../../features/treatment/presentation/screens/phase_detail_screen.dart';
import '../../features/appointments/presentation/screens/appointments_screen.dart';
import '../../features/chat/presentation/screens/chat_screen.dart';
import '../../features/profile/presentation/screens/profile_screen.dart';
import '../../features/main/presentation/screens/main_shell.dart';

final appRouterProvider = Provider<GoRouter>((ref) {
  return GoRouter(
    initialLocation: '/',
    routes: [
      GoRoute(path: '/', builder: (ctx, st) => const SplashScreen()),
      GoRoute(path: '/onboarding', builder: (ctx, st) => const OnboardingScreen()),
      GoRoute(path: '/phone', builder: (ctx, st) => const PhoneEntryScreen()),
      GoRoute(
        path: '/otp',
        builder: (ctx, st) {
          final phone = st.uri.queryParameters['phone'] ?? '';
          final verificationId = st.uri.queryParameters['verificationId'] ?? '';
          return OtpScreen(phone: phone, verificationId: verificationId);
        },
      ),
      GoRoute(path: '/profile-create', builder: (ctx, st) => const ProfileCreationScreen()),
      ShellRoute(
        builder: (ctx, st, child) => MainShell(child: child),
        routes: [
          GoRoute(path: '/home', builder: (ctx, st) => const HomeScreen()),
          GoRoute(path: '/treatment', builder: (ctx, st) => const TreatmentScreen()),
          GoRoute(
            path: '/treatment/phase/:phaseId',
            builder: (ctx, st) => PhaseDetailScreen(phaseId: st.pathParameters['phaseId']!),
          ),
          GoRoute(path: '/appointments', builder: (ctx, st) => const AppointmentsScreen()),
          GoRoute(path: '/chat', builder: (ctx, st) => const ChatScreen()),
          GoRoute(path: '/profile', builder: (ctx, st) => const ProfileScreen()),
        ],
      ),
    ],
  );
});
