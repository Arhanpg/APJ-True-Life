import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:firebase_auth/firebase_auth.dart';
import '../features/auth/screens/onboarding_screen.dart';
import '../features/auth/screens/phone_otp_screen.dart';
import '../features/auth/screens/consent_screen.dart';
import '../features/auth/screens/profile_completion_screen.dart';
import '../features/home/screens/home_screen.dart';
import '../features/appointments/screens/appointments_screen.dart';
import '../features/treatments/screens/treatments_screen.dart';
import '../features/chat/screens/chat_screen.dart';
import '../features/settings/screens/settings_screen.dart';
import '../features/splash/splash_screen.dart';

/// Router provider using go_router.
/// Auth guard redirects to onboarding if not signed in.
/// Per Build Guide Section 6.1 — splash → onboarding → consent → home.
final routerProvider = Provider<GoRouter>((ref) {
  return GoRouter(
    initialLocation: '/',
    redirect: (context, state) {
      final user = FirebaseAuth.instance.currentUser;
      final isOnboarding = state.matchedLocation == '/onboarding';
      final isPhoneOtp = state.matchedLocation == '/phone-otp';
      final isSplash = state.matchedLocation == '/';
      final isConsent = state.matchedLocation == '/consent';
      final isProfileCompletion = state.matchedLocation == '/profile-completion';

      if (isSplash) return null; // Splash handles its own redirect

      if (user == null) {
        // Not signed in — redirect to onboarding
        if (!isOnboarding && !isPhoneOtp) return '/onboarding';
        return null;
      }

      // Signed in — don't show onboarding
      if (isOnboarding || isPhoneOtp) return '/home';
      return null;
    },
    routes: [
      GoRoute(
        path: '/',
        builder: (context, state) => const SplashScreen(),
      ),
      GoRoute(
        path: '/onboarding',
        builder: (context, state) => const OnboardingScreen(),
      ),
      GoRoute(
        path: '/phone-otp',
        builder: (context, state) => const PhoneOtpScreen(),
      ),
      GoRoute(
        path: '/consent',
        builder: (context, state) => const ConsentScreen(),
      ),
      GoRoute(
        path: '/profile-completion',
        builder: (context, state) => const ProfileCompletionScreen(),
      ),
      GoRoute(
        path: '/home',
        builder: (context, state) => const HomeScreen(),
      ),
      GoRoute(
        path: '/appointments',
        builder: (context, state) => const AppointmentsScreen(),
      ),
      GoRoute(
        path: '/treatments',
        builder: (context, state) => const TreatmentsScreen(),
      ),
      GoRoute(
        path: '/chat',
        builder: (context, state) => const ChatScreen(),
      ),
      GoRoute(
        path: '/settings',
        builder: (context, state) => const SettingsScreen(),
      ),
    ],
  );
});
