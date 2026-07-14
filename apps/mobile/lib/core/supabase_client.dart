import 'package:supabase_flutter/supabase_flutter.dart';
import 'package:firebase_auth/firebase_auth.dart' as fb;
import 'package:flutter_dotenv/flutter_dotenv.dart';

/// Initialize Supabase with Firebase Third-Party Auth.
/// Per Build Guide Section 3.5.
Future<void> initSupabase() async {
  await Supabase.initialize(
    url: dotenv.env['SUPABASE_URL'] ?? 'https://bwozwxrzotnlajutxupm.supabase.co',
    anonKey: dotenv.env['SUPABASE_ANON_KEY'] ?? '',
    authOptions: const FlutterAuthClientOptions(
      authFlowType: AuthFlowType.pkce,
    ),
  );
}

/// Get a Supabase client that uses the Firebase ID token.
/// This is the primary way patients access Supabase data.
/// Per Build Guide Section 3.5.
SupabaseClient getFirebaseBackedSupabaseClient() {
  return SupabaseClient(
    dotenv.env['SUPABASE_URL'] ?? 'https://bwozwxrzotnlajutxupm.supabase.co',
    dotenv.env['SUPABASE_ANON_KEY'] ?? '',
    accessToken: () async {
      final user = fb.FirebaseAuth.instance.currentUser;
      if (user == null) return null;
      return await user.getIdToken(false);
    },
  );
}

/// Convenience getter for the standard Supabase client.
SupabaseClient get supabase => Supabase.instance.client;
