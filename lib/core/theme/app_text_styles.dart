import 'package:flutter/material.dart';
import 'app_colors.dart';

class AppTextStyles {
  static const displayLarge = TextStyle(
    fontFamily: 'PlayfairDisplay',
    fontSize: 32, fontWeight: FontWeight.w700,
    color: AppColors.primaryDark, height: 1.2,
  );
  static const displayMedium = TextStyle(
    fontFamily: 'PlayfairDisplay',
    fontSize: 24, fontWeight: FontWeight.w700,
    color: AppColors.primaryDark, height: 1.3,
  );
  static const headlineLarge = TextStyle(
    fontFamily: 'PlayfairDisplay',
    fontSize: 22, fontWeight: FontWeight.w600,
    color: AppColors.onSurface, height: 1.3,
  );
  static const headlineMedium = TextStyle(
    fontSize: 18, fontWeight: FontWeight.w600,
    color: AppColors.onSurface, height: 1.4,
  );
  static const bodyLarge = TextStyle(
    fontSize: 16, fontWeight: FontWeight.w400,
    color: AppColors.onSurface, height: 1.5,
  );
  static const bodyMedium = TextStyle(
    fontSize: 14, fontWeight: FontWeight.w400,
    color: AppColors.onSurfaceVariant, height: 1.5,
  );
  static const labelMedium = TextStyle(
    fontSize: 12, fontWeight: FontWeight.w500,
    color: AppColors.outline, letterSpacing: 0.5,
  );
  static const labelSmall = TextStyle(
    fontSize: 11, fontWeight: FontWeight.w600,
    color: AppColors.outline, letterSpacing: 0.8,
  );
  static const button = TextStyle(
    fontSize: 16, fontWeight: FontWeight.w600,
    color: AppColors.onPrimary, letterSpacing: 0.2,
  );
  static const mono = TextStyle(
    fontFamily: 'monospace', fontSize: 13,
    color: AppColors.onSurface, fontWeight: FontWeight.w500,
  );
}
