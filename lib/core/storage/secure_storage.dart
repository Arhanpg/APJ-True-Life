import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

final secureStorageProvider = Provider<SecureStorageService>(
  (_) => SecureStorageService(),
);

class SecureStorageService {
  final _storage = const FlutterSecureStorage(
    aOptions: AndroidOptions(encryptedSharedPreferences: true),
  );

  Future<void> writeToken(String token) =>
      _storage.write(key: 'jwt_token', value: token);

  Future<String?> readToken() => _storage.read(key: 'jwt_token');

  Future<void> deleteToken() => _storage.delete(key: 'jwt_token');

  Future<void> clear() => _storage.deleteAll();
}
