import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../../features/auth/screens/splash_screen.dart';
import '../../features/auth/screens/onboarding_screen.dart';
import '../../features/auth/screens/phone_entry_screen.dart';
import '../../features/auth/screens/otp_screen.dart';
import '../../features/auth/screens/profile_creation_screen.dart';
import '../../features/shell/main_shell.dart';
import '../../features/home/screens/home_screen.dart';
import '../../features/treatment/screens/my_treatment_screen.dart';
import '../../features/treatment/screens/phase_detail_screen.dart';
import '../../features/appointments/screens/appointments_screen.dart';
import '../../features/chat/screens/chat_screen.dart';
import '../../features/profile/screens/profile_screen.dart';

final _rootNavigatorKey = GlobalKey<NavigatorState>();
final _shellNavigatorKey = GlobalKey<NavigatorState>();

final GoRouter appRouter = GoRouter(
  navigatorKey: _rootNavigatorKey,
  initialLocation: '/splash',
  routes: [
    GoRoute(path: '/splash', builder: (ctx, state) => const SplashScreen()),
    GoRoute(path: '/onboarding', builder: (ctx, state) => const OnboardingScreen()),
    GoRoute(path: '/phone', builder: (ctx, state) => const PhoneEntryScreen()),
    GoRoute(
      path: '/otp',
      builder: (ctx, state) {
        final phone = state.uri.queryParameters['phone'] ?? '';
        return OtpScreen(phoneNumber: phone);
      },
    ),
    GoRoute(path: '/create-profile', builder: (ctx, state) => const ProfileCreationScreen()),
    ShellRoute(
      navigatorKey: _shellNavigatorKey,
      builder: (ctx, state, child) => MainShell(child: child),
      routes: [
        GoRoute(path: '/home', builder: (ctx, state) => const HomeScreen()),
        GoRoute(
          path: '/treatment',
          builder: (ctx, state) => const MyTreatmentScreen(),
          routes: [
            GoRoute(
              path: 'phase/:phaseId',
              parentNavigatorKey: _rootNavigatorKey,
              builder: (ctx, state) => PhaseDetailScreen(phaseId: state.pathParameters['phaseId'] ?? ''),
            ),
          ],
        ),
        GoRoute(path: '/appointments', builder: (ctx, state) => const AppointmentsScreen()),
        GoRoute(path: '/chat', builder: (ctx, state) => const ChatScreen()),
        GoRoute(path: '/profile', builder: (ctx, state) => const ProfileScreen()),
      ],
    ),
  ],
);
