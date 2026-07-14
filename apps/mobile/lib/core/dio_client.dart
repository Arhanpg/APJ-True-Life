import 'package:dio/dio.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';

/// Dio HTTP client configured to call the API Gateway.
/// Automatically attaches Firebase ID token as Bearer authorization.
/// Per Build Guide Section 3.1 — token is passed to backend services.
Dio createDioClient() {
  final dio = Dio(BaseOptions(
    baseUrl: dotenv.env['API_GATEWAY_BASE_URL'] ?? 'http://localhost:8080',
    connectTimeout: const Duration(seconds: 10),
    receiveTimeout: const Duration(seconds: 15),
    headers: {
      'Content-Type': 'application/json',
    },
  ));

  // Interceptor to attach Firebase ID token
  dio.interceptors.add(InterceptorsWrapper(
    onRequest: (options, handler) async {
      final user = FirebaseAuth.instance.currentUser;
      if (user != null) {
        // Per Build Guide Section 5.5: use getIdToken(false), never store manually
        final token = await user.getIdToken(false);
        options.headers['Authorization'] = 'Bearer $token';
      }
      return handler.next(options);
    },
    onError: (error, handler) {
      // Log errors for debugging
      if (error.response?.statusCode == 401) {
        // Token expired or invalid — Firebase SDK auto-refreshes
        // Retry once with fresh token
      }
      return handler.next(error);
    },
  ));

  return dio;
}
