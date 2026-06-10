import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'core/theme/app_theme.dart';
import 'core/router/app_router.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  // Firebase.initializeApp() will go here once google-services.json is added
  runApp(const ProviderScope(child: APJTrueLifeApp()));
}

class APJTrueLifeApp extends StatelessWidget {
  const APJTrueLifeApp({super.key});
  @override
  Widget build(BuildContext context) {
    return MaterialApp.router(
      title: 'APJ TRUE LIFE',
      debugShowCheckedModeBanner: false,
      theme: AppTheme.lightTheme,
      routerConfig: appRouter,
    );
  }
}
