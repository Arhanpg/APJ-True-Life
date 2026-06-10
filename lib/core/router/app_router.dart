import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import '../../features/auth/presentation/screens/splash_screen.dart';
import '../../features/auth/presentation/screens/welcome_screen.dart';
import '../../features/auth/presentation/screens/phone_input_screen.dart';
import '../../features/auth/presentation/screens/otp_screen.dart';
import '../../features/auth/presentation/screens/profile_creation_screen.dart';
import '../../features/home/presentation/screens/home_screen.dart';
import '../../features/treatment/presentation/screens/treatment_screen.dart';
import '../../features/treatment/presentation/screens/phase_detail_screen.dart';
import '../../features/appointments/presentation/screens/appointments_screen.dart';
import '../../features/chat/presentation/screens/chat_screen.dart';
import '../../features/profile/presentation/screens/profile_screen.dart';

final appRouterProvider = Provider<GoRouter>((ref) {
  return GoRouter(
    initialLocation: '/splash',
    routes: [
      GoRoute(path: '/splash',          builder: (c, s) => const SplashScreen()),
      GoRoute(path: '/welcome',         builder: (c, s) => const WelcomeScreen()),
      GoRoute(path: '/phone',           builder: (c, s) => const PhoneInputScreen()),
      GoRoute(path: '/otp',             builder: (c, s) => const OtpScreen()),
      GoRoute(path: '/profile-create',  builder: (c, s) => const ProfileCreationScreen()),
      GoRoute(path: '/home',            builder: (c, s) => const HomeScreen()),
      GoRoute(path: '/treatment',       builder: (c, s) => const TreatmentScreen()),
      GoRoute(
        path: '/treatment/phase/:phaseId',
        builder: (c, s) => PhaseDetailScreen(phaseId: s.pathParameters['phaseId']!),
      ),
      GoRoute(path: '/appointments',    builder: (c, s) => const AppointmentsScreen()),
      GoRoute(path: '/chat',            builder: (c, s) => const ChatScreen()),
      GoRoute(path: '/profile',         builder: (c, s) => const ProfileScreen()),
    ],
  );
});
