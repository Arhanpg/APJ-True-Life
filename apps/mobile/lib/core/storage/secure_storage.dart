import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';

class SecureStorage {
  final FlutterSecureStorage _storage;

  SecureStorage(this._storage);

  static const String _jwtKey = 'apj_jwt_token';
  static const String _userIdKey = 'apj_user_id';
  static const String _roleKey = 'apj_user_role';

  Future<void> saveJwt(String token) async {
    await _storage.write(key: _jwtKey, value: token);
  }

  Future<String?> getJwt() async {
    return _storage.read(key: _jwtKey);
  }

  Future<void> saveUserId(String userId) async {
    await _storage.write(key: _userIdKey, value: userId);
  }

  Future<String?> getUserId() async {
    return _storage.read(key: _userIdKey);
  }

  Future<void> saveRole(String role) async {
    await _storage.write(key: _roleKey, value: role);
  }

  Future<String?> getRole() async {
    return _storage.read(key: _roleKey);
  }

  Future<bool> hasValidSession() async {
    final token = await getJwt();
    return token != null && token.isNotEmpty;
  }

  Future<void> clearAll() async {
    await _storage.deleteAll();
  }
}

final secureStorageProvider = Provider<SecureStorage>((ref) {
  const storage = FlutterSecureStorage(
    aOptions: AndroidOptions(encryptedSharedPreferences: true),
    iOptions: IOSOptions(accessibility: KeychainAccessibility.first_unlock),
  );
  return SecureStorage(storage);
});
