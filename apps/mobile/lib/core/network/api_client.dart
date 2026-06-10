import 'package:apj_true_life/core/storage/secure_storage.dart';
import 'package:dio/dio.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

/// Base URL constants — switch between staging and production
class ApiConstants {
  ApiConstants._();

  static const String baseUrl = 'https://api.apjtruelife.com/api/v1';
  static const String stagingUrl = 'https://api-staging.apjtruelife.com/api/v1';

  // Endpoints
  static const String authVerify = '/auth/verify';
  static const String authRegister = '/auth/register';
  static const String authMe = '/auth/me';
  static const String patients = '/patients';
  static const String treatments = '/treatments';
  static const String appointments = '/appointments';
  static const String chatSessions = '/chat/sessions';
  static const String notifications = '/notifications';
  static const String mediaUpload = '/media/upload';
}

final dioProvider = Provider<Dio>((ref) {
  final dio = Dio(
    BaseOptions(
      baseUrl: ApiConstants.baseUrl,
      connectTimeout: const Duration(seconds: 30),
      receiveTimeout: const Duration(seconds: 30),
      headers: {
        'Content-Type': 'application/json',
        'X-Client-Version': '1.0.0',
      },
    ),
  );

  // JWT injection interceptor
  dio.interceptors.add(
    InterceptorsWrapper(
      onRequest: (options, handler) async {
        final storage = ref.read(secureStorageProvider);
        final token = await storage.getJwt();
        if (token != null) {
          options.headers['Authorization'] = 'Bearer $token';
        }
        handler.next(options);
      },
      onError: (error, handler) async {
        // Handle 401 — token expired
        if (error.response?.statusCode == 401) {
          // TODO: Trigger token refresh flow
        }
        handler.next(error);
      },
    ),
  );

  // Logging interceptor (debug only)
  dio.interceptors.add(
    LogInterceptor(
      requestBody: true,
      responseBody: true,
      logPrint: (log) => debugPrint(log.toString()),
    ),
  );

  return dio;
});

import 'package:flutter/foundation.dart';
