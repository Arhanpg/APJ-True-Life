import 'package:apj_true_life/core/theme/app_colors.dart';
import 'package:flutter/material.dart';

/// APJ TRUE LIFE Typography System
/// Display: Playfair Display — brand moments, headings
/// Body: DM Sans — clinical UI, all body text
class AppTextStyles {
  AppTextStyles._();

  // ── Display (Playfair Display) ───────────────────────────────────
  static const TextStyle displayLarge = TextStyle(
    fontFamily: 'PlayfairDisplay',
    fontSize: 48,
    fontWeight: FontWeight.w700,
    height: 1.17,
    color: AppColors.primaryDark,
  );

  static const TextStyle displayMedium = TextStyle(
    fontFamily: 'PlayfairDisplay',
    fontSize: 36,
    fontWeight: FontWeight.w700,
    height: 1.22,
    color: AppColors.primaryDark,
  );

  // ── Headlines (DM Sans) ─────────────────────────────────────────
  static const TextStyle headlineLarge = TextStyle(
    fontFamily: 'DMSans',
    fontSize: 24,
    fontWeight: FontWeight.w600,
    height: 1.33,
    color: AppColors.onSurface,
  );

  static const TextStyle headlineMedium = TextStyle(
    fontFamily: 'DMSans',
    fontSize: 20,
    fontWeight: FontWeight.w600,
    height: 1.4,
    color: AppColors.onSurface,
  );

  static const TextStyle headlineSmall = TextStyle(
    fontFamily: 'DMSans',
    fontSize: 18,
    fontWeight: FontWeight.w600,
    height: 1.44,
    color: AppColors.onSurface,
  );

  // ── Body (DM Sans) ──────────────────────────────────────────────
  static const TextStyle bodyLarge = TextStyle(
    fontFamily: 'DMSans',
    fontSize: 16,
    fontWeight: FontWeight.w400,
    height: 1.5,
    color: AppColors.onSurface,
  );

  static const TextStyle bodyMedium = TextStyle(
    fontFamily: 'DMSans',
    fontSize: 14,
    fontWeight: FontWeight.w400,
    height: 1.43,
    color: AppColors.onSurface,
  );

  static const TextStyle bodySmall = TextStyle(
    fontFamily: 'DMSans',
    fontSize: 12,
    fontWeight: FontWeight.w400,
    height: 1.33,
    color: AppColors.onSurfaceVariant,
  );

  // ── Labels (DM Sans Medium) ─────────────────────────────────────
  static const TextStyle labelLarge = TextStyle(
    fontFamily: 'DMSans',
    fontSize: 14,
    fontWeight: FontWeight.w500,
    height: 1.43,
    letterSpacing: 0.1,
    color: AppColors.onSurface,
  );

  static const TextStyle labelMedium = TextStyle(
    fontFamily: 'DMSans',
    fontSize: 12,
    fontWeight: FontWeight.w500,
    height: 1.33,
    letterSpacing: 0.5,
    color: AppColors.onSurfaceVariant,
  );

  static const TextStyle labelSmall = TextStyle(
    fontFamily: 'DMSans',
    fontSize: 11,
    fontWeight: FontWeight.w500,
    height: 1.45,
    letterSpacing: 0.5,
    color: AppColors.onSurfaceVariant,
  );

  // ── Button Text ─────────────────────────────────────────────────
  static const TextStyle button = TextStyle(
    fontFamily: 'DMSans',
    fontSize: 16,
    fontWeight: FontWeight.w500,
    height: 1.5,
    letterSpacing: 0.1,
  );

  // ── Caption / Mono (for IDs, dosages) ───────────────────────────
  static const TextStyle caption = TextStyle(
    fontFamily: 'DMSans',
    fontSize: 12,
    fontWeight: FontWeight.w400,
    height: 1.33,
    color: AppColors.onSurfaceVariant,
  );
}
