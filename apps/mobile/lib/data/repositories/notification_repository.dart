import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:dio/dio.dart';
import '../../core/dio_client.dart';

/// NotificationRepository — handles FCM push notification registration.
///
/// Responsibilities:
/// - Request notification permission
/// - Retrieve and register FCM token with notification-service
/// - Listen for token refresh and re-register
/// - Unregister token on sign-out or account deletion
class NotificationRepository {
  final FirebaseMessaging _messaging;
  late final Dio _dio;
  String? _currentToken;

  NotificationRepository({
    FirebaseMessaging? messaging,
  }) : _messaging = messaging ?? FirebaseMessaging.instance {
    _dio = createDioClient();
  }

  /// Request notification permission and register FCM token.
  /// Call this after successful login.
  Future<void> initializeAndRegister(String userId) async {
    // Request permission (especially important for iOS)
    final settings = await _messaging.requestPermission(
      alert: true,
      badge: true,
      sound: true,
    );

    if (settings.authorizationStatus == AuthorizationStatus.authorized ||
        settings.authorizationStatus == AuthorizationStatus.provisional) {
      // Get the FCM token
      final token = await _messaging.getToken();
      if (token != null) {
        _currentToken = token;
        await _registerToken(userId, token);
      }

      // Listen for token refresh — re-register when it changes
      _messaging.onTokenRefresh.listen((newToken) {
        _currentToken = newToken;
        _registerToken(userId, newToken);
      });
    }
  }

  /// Register FCM token with notification-service
  Future<void> _registerToken(String userId, String fcmToken) async {
    try {
      await _dio.post('/api/notifications/device-tokens', data: {
        'userId': userId,
        'fcmToken': fcmToken,
        'deviceType': _getDeviceType(),
      });
    } catch (e) {
      // Log but don't throw — push registration failure shouldn't block the app
      // ignore: avoid_print
      print('FCM token registration failed: $e');
    }
  }

  /// Unregister current FCM token.
  /// Call this on sign-out or account deletion.
  Future<void> unregisterToken() async {
    if (_currentToken == null) return;

    try {
      await _dio.delete('/api/notifications/device-tokens', data: {
        'fcmToken': _currentToken,
      });
    } catch (e) {
      // ignore: avoid_print
      print('FCM token unregistration failed: $e');
    }
    _currentToken = null;
  }

  String _getDeviceType() {
    // Simple platform detection — Firebase handles the nuance
    return 'android'; // TODO: Use Platform.isIOS check for iOS
  }
}
