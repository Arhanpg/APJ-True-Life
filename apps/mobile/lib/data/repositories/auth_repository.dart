import 'package:firebase_auth/firebase_auth.dart';
import 'package:google_sign_in/google_sign_in.dart';
import 'package:dio/dio.dart';
import '../../core/dio_client.dart';

/// AuthRepository — handles all Firebase Auth operations for patients.
///
/// Auth methods: Google Sign-In + Email/Password.
/// No Phone OTP — per audit correction §4.
///
/// CRITICAL: Per README and Build Guide Section 3.1:
/// - After first login, force-refresh the token so the ClaimEnrichmentFilter's
///   role:authenticated claim is picked up in the JWT.
/// - See ClaimEnrichmentFilter.java in api-gateway for implementation.
/// - NEVER store tokens in SharedPreferences or local storage.
class AuthRepository {
  final FirebaseAuth _firebaseAuth;
  final GoogleSignIn _googleSignIn;
  late final Dio _dio;

  AuthRepository({
    FirebaseAuth? firebaseAuth,
    GoogleSignIn? googleSignIn,
  })  : _firebaseAuth = firebaseAuth ?? FirebaseAuth.instance,
        _googleSignIn = googleSignIn ?? GoogleSignIn() {
    _dio = createDioClient();
  }

  /// Current authenticated user
  User? get currentUser => _firebaseAuth.currentUser;

  /// Stream of auth state changes
  Stream<User?> get authStateChanges => _firebaseAuth.authStateChanges();

  /// Sign in with Google
  Future<User?> signInWithGoogle() async {
    final GoogleSignInAccount? googleUser = await _googleSignIn.signIn();
    if (googleUser == null) return null; // User cancelled

    final GoogleSignInAuthentication googleAuth = await googleUser.authentication;
    final credential = GoogleAuthProvider.credential(
      accessToken: googleAuth.accessToken,
      idToken: googleAuth.idToken,
    );

    final userCredential = await _firebaseAuth.signInWithCredential(credential);
    
    // Force-refresh token after first login so ClaimEnrichmentFilter's
    // role:authenticated claim is present in subsequent tokens.
    // Per README: "Flutter calls getIdToken(true) → refreshed token has the claim"
    await _enrichClaimsViaGateway();
    
    return userCredential.user;
  }

  /// Sign in with Email + Password
  Future<User?> signInWithEmail(String email, String password) async {
    final userCredential = await _firebaseAuth.signInWithEmailAndPassword(
      email: email,
      password: password,
    );

    // Force-refresh to pick up role:authenticated claim from ClaimEnrichmentFilter
    await _enrichClaimsViaGateway();

    return userCredential.user;
  }

  /// Register with Email + Password
  Future<User?> registerWithEmail(String email, String password) async {
    final userCredential = await _firebaseAuth.createUserWithEmailAndPassword(
      email: email,
      password: password,
    );

    // Force-refresh to pick up role:authenticated claim from ClaimEnrichmentFilter
    await _enrichClaimsViaGateway();

    return userCredential.user;
  }

  /// Calls the API Gateway once to trigger ClaimEnrichmentFilter.
  /// The filter will set role:authenticated via Firebase Admin SDK.
  /// Then force-refresh forces Firebase to issue a new token with the claim.
  Future<void> _enrichClaimsViaGateway() async {
    try {
      // Any authenticated call to the gateway triggers ClaimEnrichmentFilter
      await _dio.get('/api/patients/profile-sync');
    } catch (_) {
      // Ignore errors (patient may not have profile yet)
    }
    
    // Force-refresh the token so the new claim (role:authenticated) is included
    await _firebaseAuth.currentUser?.getIdToken(true);
  }

  /// Sync patient profile with backend after first login
  Future<void> syncProfile({
    required String name,
    required String? phone,
    required String? email,
    required String? photoUrl,
  }) async {
    final user = currentUser;
    if (user == null) return;

    await _dio.post('/api/patients/profile-sync', data: {
      'firebaseUid': user.uid,
      'name': name,
      'phone': phone,
      'email': email,
      'photoUrl': photoUrl,
    });
  }

  /// Record DPDP Act 2023 consent
  Future<void> recordConsent({required String policyVersion}) async {
    await _dio.post('/api/patients/consent', data: {
      'policyVersion': policyVersion,
      'consentGiven': true,
    });
  }

  /// Sign out from Firebase + unregister FCM token
  Future<void> signOut() async {
    // TODO: Call NotificationRepository.unregisterToken() before signing out
    await _googleSignIn.signOut().catchError((_) {});
    await _firebaseAuth.signOut();
  }

  /// Request account deletion (DPDP Act — Right to Erasure)
  Future<void> deleteAccount() async {
    final user = currentUser;
    if (user == null) return;

    // TODO: Call NotificationRepository.unregisterToken() before deleting

    // Backend: soft-delete + anonymise PII + log consent_audit_log
    await _dio.post('/api/patients/delete-account');
    
    // Delete Firebase account
    await user.delete();
  }
}
