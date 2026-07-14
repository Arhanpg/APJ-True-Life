import 'package:flutter/material.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:sentry_flutter/sentry_flutter.dart';
import 'core/supabase_client.dart';
import 'core/router.dart';

/// APJ TRUE LIFE — Patient Mobile App v2.0
/// Firebase Auth (Google Sign-In + Phone OTP) for patients.
/// Supabase for data access via Firebase JWT (Third-Party Auth).
void main() async {
  WidgetsFlutterBinding.ensureInitialized();

  // Load environment variables
  await dotenv.load(fileName: '.env');

  // Initialize Firebase
  await Firebase.initializeApp();

  // Initialize Supabase with Firebase Third-Party Auth
  await initSupabase();

  // Initialize Sentry
  final sentryDsn = dotenv.env['SENTRY_DSN'];
  if (sentryDsn != null && sentryDsn.isNotEmpty) {
    await SentryFlutter.init(
      (options) {
        options.dsn = sentryDsn;
        options.tracesSampleRate = 0.2;
      },
      appRunner: () => runApp(const ProviderScope(child: ApjTrueLifeApp())),
    );
  } else {
    runApp(const ProviderScope(child: ApjTrueLifeApp()));
  }
}

class ApjTrueLifeApp extends ConsumerWidget {
  const ApjTrueLifeApp({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final router = ref.watch(routerProvider);

    return MaterialApp.router(
      title: 'APJ TRUE LIFE',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        useMaterial3: true,
        colorScheme: ColorScheme.fromSeed(
          seedColor: const Color(0xFF1A5C38),
          brightness: Brightness.light,
        ),
        fontFamily: 'Roboto',
      ),
      routerConfig: router,
    );
  }
}
