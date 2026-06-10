import 'package:dio/dio.dart';
import 'package:firebase_auth/firebase_auth.dart';

class DioClient {
  static Dio get instance {
    final dio = Dio(
      BaseOptions(
        baseUrl: const String.fromEnvironment(
          'API_BASE_URL',
          defaultValue: 'https://api.apjtruelife.com/api/v1',
        ),
        connectTimeout: const Duration(seconds: 10),
        receiveTimeout: const Duration(seconds: 15),
        headers: {'Content-Type': 'application/json'},
      ),
    );

    // JWT interceptor
    dio.interceptors.add(InterceptorsWrapper(
      onRequest: (options, handler) async {
        final user = FirebaseAuth.instance.currentUser;
        if (user != null) {
          final token = await user.getIdToken();
          options.headers['Authorization'] = 'Bearer $token';
        }
        return handler.next(options);
      },
      onError: (error, handler) async {
        if (error.response?.statusCode == 401) {
          // Token expired — refresh and retry
          final user = FirebaseAuth.instance.currentUser;
          if (user != null) {
            final token = await user.getIdToken(true);
            error.requestOptions.headers['Authorization'] = 'Bearer $token';
            final retryResponse = await dio.fetch(error.requestOptions);
            return handler.resolve(retryResponse);
          }
        }
        return handler.next(error);
      },
    ));

    return dio;
  }
}
