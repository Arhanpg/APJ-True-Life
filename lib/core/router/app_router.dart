import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../../features/splash/splash_screen.dart';
import '../../features/onboarding/welcome_screen.dart';
import '../../features/auth/mobile_entry_screen.dart';
import '../../features/auth/otp_screen.dart';
import '../../features/auth/profile_creation_screen.dart';
import '../../features/home/home_screen.dart';
import '../../features/treatment/my_treatment_screen.dart';
import '../../features/treatment/phase_detail_screen.dart';
import '../../features/appointments/appointments_screen.dart';
import '../../features/chat/chat_screen.dart';
import '../../features/profile/profile_screen.dart';
import '../../features/navigation/main_nav.dart';

class AppRouter {
  static final router = GoRouter(
    initialLocation: '/splash',
    routes: [
      GoRoute(path: '/splash', builder: (ctx, _) => const SplashScreen()),
      GoRoute(path: '/welcome', builder: (ctx, _) => const WelcomeScreen()),
      GoRoute(path: '/auth/mobile', builder: (ctx, _) => const MobileEntryScreen()),
      GoRoute(path: '/auth/otp', builder: (ctx, state) => OtpScreen(phone: state.uri.queryParameters['phone'] ?? '')),
      GoRoute(path: '/auth/profile', builder: (ctx, _) => const ProfileCreationScreen()),
      ShellRoute(
        builder: (ctx, state, child) => MainNav(child: child),
        routes: [
          GoRoute(path: '/home', builder: (ctx, _) => const HomeScreen()),
          GoRoute(path: '/treatment', builder: (ctx, _) => const MyTreatmentScreen()),
          GoRoute(path: '/treatment/phase/:id', builder: (ctx, state) => PhaseDetailScreen(phaseId: state.pathParameters['id'] ?? '')),
          GoRoute(path: '/appointments', builder: (ctx, _) => const AppointmentsScreen()),
          GoRoute(path: '/chat', builder: (ctx, _) => const ChatScreen()),
          GoRoute(path: '/profile', builder: (ctx, _) => const ProfileScreen()),
        ],
      ),
    ],
  );
}
