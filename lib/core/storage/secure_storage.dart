import 'package:flutter_secure_storage/flutter_secure_storage.dart';

class SecureStorage {
  SecureStorage._();

  static const _storage = FlutterSecureStorage(
    aOptions: AndroidOptions(encryptedSharedPreferences: true),
    iOptions: IOSOptions(accessibility: KeychainAccessibility.first_unlock),
  );

  static const _keyJwt       = 'apj_jwt';
  static const _keyUserId    = 'apj_user_id';
  static const _keyUserRole  = 'apj_user_role';

  static Future<void> saveJwt(String token)   => _storage.write(key: _keyJwt, value: token);
  static Future<String?> getJwt()             => _storage.read(key: _keyJwt);
  static Future<void> deleteJwt()             => _storage.delete(key: _keyJwt);

  static Future<void> saveUserId(String id)   => _storage.write(key: _keyUserId, value: id);
  static Future<String?> getUserId()          => _storage.read(key: _keyUserId);

  static Future<void> saveUserRole(String r)  => _storage.write(key: _keyUserRole, value: r);
  static Future<String?> getUserRole()        => _storage.read(key: _keyUserRole);

  static Future<void> clearAll()              => _storage.deleteAll();
}
