import 'package:flutter/material.dart';
import 'app_colors.dart';

class AppTextStyles {
  static const TextStyle displayLarge = TextStyle(
    fontFamily: 'PlayfairDisplay',
    fontSize: 32,
    fontWeight: FontWeight.w700,
    color: AppColors.primaryDark,
    height: 1.2,
  );
  static const TextStyle displayMedium = TextStyle(
    fontFamily: 'PlayfairDisplay',
    fontSize: 24,
    fontWeight: FontWeight.w700,
    color: AppColors.primaryDark,
    height: 1.3,
  );
  static const TextStyle headlineLarge = TextStyle(
    fontFamily: 'DMSans',
    fontSize: 22,
    fontWeight: FontWeight.w600,
    color: AppColors.onSurface,
    height: 1.3,
  );
  static const TextStyle headlineMedium = TextStyle(
    fontFamily: 'DMSans',
    fontSize: 18,
    fontWeight: FontWeight.w600,
    color: AppColors.onSurface,
    height: 1.4,
  );
  static const TextStyle bodyLarge = TextStyle(
    fontFamily: 'DMSans',
    fontSize: 16,
    fontWeight: FontWeight.w400,
    color: AppColors.onSurface,
    height: 1.5,
  );
  static const TextStyle bodyMedium = TextStyle(
    fontFamily: 'DMSans',
    fontSize: 14,
    fontWeight: FontWeight.w400,
    color: AppColors.onSurfaceVariant,
    height: 1.5,
  );
  static const TextStyle labelMedium = TextStyle(
    fontFamily: 'DMSans',
    fontSize: 12,
    fontWeight: FontWeight.w500,
    color: AppColors.onSurfaceVariant,
    height: 1.4,
    letterSpacing: 0.3,
  );
  static const TextStyle dataMono = TextStyle(
    fontFamily: 'JetBrainsMono',
    fontSize: 13,
    fontWeight: FontWeight.w400,
    color: AppColors.onSurface,
  );
}
