import 'package:flutter/material.dart';

class AppColors {
  static const primary = Color(0xFF1A5C38);
  static const primaryDark = Color(0xFF004324);
  static const secondary = Color(0xFF2E7D52);
  static const accentGold = Color(0xFFC9A84C);
  static const background = Color(0xFFEDFDF3);
  static const surface = Color(0xFFFFFFFF);
  static const surfaceTint = Color(0xFFE1F2E8);
  static const onSurface = Color(0xFF111E18);
  static const onSurfaceVariant = Color(0xFF404941);
  static const outline = Color(0xFF707971);
  static const outlineVariant = Color(0xFFC0C9BF);
  static const error = Color(0xFFBA1A1A);
  static const onPrimary = Color(0xFFFFFFFF);
}

class AppTheme {
  static ThemeData get light => ThemeData(
    useMaterial3: true,
    colorScheme: ColorScheme.fromSeed(
      seedColor: AppColors.primary,
      brightness: Brightness.light,
    ).copyWith(
      primary: AppColors.primary,
      onPrimary: AppColors.onPrimary,
      secondary: AppColors.secondary,
      background: AppColors.background,
      surface: AppColors.surface,
      error: AppColors.error,
    ),
    scaffoldBackgroundColor: AppColors.background,
    appBarTheme: const AppBarTheme(
      backgroundColor: AppColors.surface,
      foregroundColor: AppColors.onSurface,
      elevation: 0,
      centerTitle: false,
      titleTextStyle: TextStyle(fontFamily: 'DM Sans', fontSize: 18, fontWeight: FontWeight.w600, color: AppColors.onSurface),
    ),
    textTheme: const TextTheme(
      displayLarge: TextStyle(fontFamily: 'DM Sans', fontSize: 28, fontWeight: FontWeight.w700, color: AppColors.primaryDark),
      headlineMedium: TextStyle(fontFamily: 'DM Sans', fontSize: 22, fontWeight: FontWeight.w700, color: AppColors.onSurface),
      headlineSmall: TextStyle(fontFamily: 'DM Sans', fontSize: 18, fontWeight: FontWeight.w600, color: AppColors.onSurface),
      titleLarge: TextStyle(fontFamily: 'DM Sans', fontSize: 16, fontWeight: FontWeight.w600, color: AppColors.onSurface),
      titleMedium: TextStyle(fontFamily: 'DM Sans', fontSize: 14, fontWeight: FontWeight.w500, color: AppColors.onSurface),
      bodyLarge: TextStyle(fontFamily: 'DM Sans', fontSize: 15, fontWeight: FontWeight.w400, color: AppColors.onSurface),
      bodyMedium: TextStyle(fontFamily: 'DM Sans', fontSize: 14, fontWeight: FontWeight.w400, color: AppColors.onSurfaceVariant),
      labelMedium: TextStyle(fontFamily: 'DM Sans', fontSize: 12, fontWeight: FontWeight.w500, color: AppColors.outline),
    ),
    elevatedButtonTheme: ElevatedButtonThemeData(
      style: ElevatedButton.styleFrom(
        backgroundColor: AppColors.primary,
        foregroundColor: AppColors.onPrimary,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
        minimumSize: const Size(double.infinity, 50),
        textStyle: const TextStyle(fontFamily: 'DM Sans', fontSize: 15, fontWeight: FontWeight.w600),
        elevation: 0,
      ),
    ),
    inputDecorationTheme: InputDecorationTheme(
      filled: true,
      fillColor: AppColors.surface,
      border: OutlineInputBorder(borderRadius: BorderRadius.circular(10), borderSide: const BorderSide(color: AppColors.outlineVariant)),
      enabledBorder: OutlineInputBorder(borderRadius: BorderRadius.circular(10), borderSide: const BorderSide(color: AppColors.outlineVariant)),
      focusedBorder: OutlineInputBorder(borderRadius: BorderRadius.circular(10), borderSide: const BorderSide(color: AppColors.primary, width: 2)),
      labelStyle: const TextStyle(color: AppColors.outline, fontFamily: 'DM Sans'),
      hintStyle: const TextStyle(color: AppColors.outlineVariant, fontFamily: 'DM Sans'),
    ),
  );
}
