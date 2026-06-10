import 'package:apj_true_life/features/auth/presentation/screens/otp_screen.dart';
import 'package:apj_true_life/features/auth/presentation/screens/phone_number_screen.dart';
import 'package:apj_true_life/features/auth/presentation/screens/profile_creation_screen.dart';
import 'package:apj_true_life/features/auth/presentation/screens/splash_screen.dart';
import 'package:apj_true_life/features/auth/presentation/screens/welcome_screen.dart';
import 'package:apj_true_life/features/appointments/presentation/screens/appointments_screen.dart';
import 'package:apj_true_life/features/chat/presentation/screens/chat_screen.dart';
import 'package:apj_true_life/features/home/presentation/screens/home_screen.dart';
import 'package:apj_true_life/features/profile/presentation/screens/profile_screen.dart';
import 'package:apj_true_life/features/treatment/presentation/screens/treatment_screen.dart';
import 'package:apj_true_life/features/treatment/presentation/screens/phase_detail_screen.dart';
import 'package:apj_true_life/features/treatment/presentation/screens/completed_treatments_screen.dart';
import 'package:apj_true_life/features/shell/main_shell.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

/// Route name constants
class AppRoutes {
  AppRoutes._();

  static const String splash = '/splash';
  static const String welcome = '/welcome';
  static const String phoneNumber = '/auth/phone';
  static const String otp = '/auth/otp';
  static const String profileCreation = '/auth/profile';
  static const String home = '/home';
  static const String appointments = '/appointments';
  static const String treatment = '/treatment';
  static const String phaseDetail = '/treatment/phase/:phaseId';
  static const String completedTreatments = '/treatment/completed';
  static const String chat = '/chat';
  static const String profile = '/profile';
}

final appRouterProvider = Provider<GoRouter>((ref) {
  return GoRouter(
    initialLocation: AppRoutes.splash,
    debugLogDiagnostics: true,
    routes: [
      // ── Auth Routes ──────────────────────────────────────────────
      GoRoute(
        path: AppRoutes.splash,
        builder: (context, state) => const SplashScreen(),
      ),
      GoRoute(
        path: AppRoutes.welcome,
        builder: (context, state) => const WelcomeScreen(),
      ),
      GoRoute(
        path: AppRoutes.phoneNumber,
        builder: (context, state) => const PhoneNumberScreen(),
      ),
      GoRoute(
        path: AppRoutes.otp,
        builder: (context, state) {
          final phone = state.extra as String? ?? '';
          return OtpScreen(phoneNumber: phone);
        },
      ),
      GoRoute(
        path: AppRoutes.profileCreation,
        builder: (context, state) => const ProfileCreationScreen(),
      ),

      // ── Main App Shell (Bottom Navigation) ──────────────────────
      ShellRoute(
        builder: (context, state, child) => MainShell(child: child),
        routes: [
          GoRoute(
            path: AppRoutes.home,
            builder: (context, state) => const HomeScreen(),
          ),
          GoRoute(
            path: AppRoutes.appointments,
            builder: (context, state) => const AppointmentsScreen(),
          ),
          GoRoute(
            path: AppRoutes.treatment,
            builder: (context, state) => const TreatmentScreen(),
            routes: [
              GoRoute(
                path: 'phase/:phaseId',
                builder: (context, state) {
                  final phaseId = state.pathParameters['phaseId']!;
                  return PhaseDetailScreen(phaseId: phaseId);
                },
              ),
              GoRoute(
                path: 'completed',
                builder: (context, state) => const CompletedTreatmentsScreen(),
              ),
            ],
          ),
          GoRoute(
            path: AppRoutes.chat,
            builder: (context, state) => const ChatScreen(),
          ),
          GoRoute(
            path: AppRoutes.profile,
            builder: (context, state) => const ProfileScreen(),
          ),
        ],
      ),
    ],
    errorBuilder: (context, state) => Scaffold(
      body: Center(
        child: Text('Route not found: ${state.uri}'),
      ),
    ),
  );
});
