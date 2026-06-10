import 'package:flutter/material.dart';
import 'app_colors.dart';

class AppTextStyles {
  AppTextStyles._();

  static const TextTheme textTheme = TextTheme(
    displayLarge:  TextStyle(fontFamily: 'PlayfairDisplay', fontSize: 48, fontWeight: FontWeight.w700, color: AppColors.primaryDark),
    displayMedium: TextStyle(fontFamily: 'PlayfairDisplay', fontSize: 36, fontWeight: FontWeight.w700, color: AppColors.primaryDark),
    headlineLarge: TextStyle(fontFamily: 'DMSans', fontSize: 24, fontWeight: FontWeight.w600, color: AppColors.primaryDark),
    headlineMedium:TextStyle(fontFamily: 'DMSans', fontSize: 20, fontWeight: FontWeight.w600, color: AppColors.onSurface),
    titleLarge:    TextStyle(fontFamily: 'DMSans', fontSize: 18, fontWeight: FontWeight.w600, color: AppColors.onSurface),
    titleMedium:   TextStyle(fontFamily: 'DMSans', fontSize: 16, fontWeight: FontWeight.w500, color: AppColors.onSurface),
    bodyLarge:     TextStyle(fontFamily: 'DMSans', fontSize: 16, fontWeight: FontWeight.w400, color: AppColors.onSurface),
    bodyMedium:    TextStyle(fontFamily: 'DMSans', fontSize: 14, fontWeight: FontWeight.w400, color: AppColors.onSurfaceVariant),
    labelMedium:   TextStyle(fontFamily: 'DMSans', fontSize: 12, fontWeight: FontWeight.w500, color: AppColors.onSurfaceVariant),
  );
}
