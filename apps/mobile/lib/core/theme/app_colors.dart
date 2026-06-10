import 'package:flutter/material.dart';

/// APJ TRUE LIFE Design System — Forest & Gold Palette
/// Matches the SRS Section 10.1 brand colors exactly
class AppColors {
  AppColors._();

  // ── Primary Greens ──────────────────────────────────────────────
  static const Color primary = Color(0xFF1A5C38);       // Primary — sidebar, buttons
  static const Color primaryDark = Color(0xFF004324);   // Primary Dark — headings
  static const Color secondary = Color(0xFF2E7D52);     // Secondary — active states

  // ── Accent ──────────────────────────────────────────────────────
  static const Color accentGold = Color(0xFFC9A84C);    // Gold — badges, highlights

  // ── Backgrounds & Surfaces ──────────────────────────────────────
  static const Color background = Color(0xFFEDFDF3);    // App background
  static const Color surface = Color(0xFFFFFFFF);       // Card surfaces
  static const Color surfaceTint = Color(0xFFE1F2E8);   // Table rows, info backgrounds

  // ── Text ────────────────────────────────────────────────────────
  static const Color onSurface = Color(0xFF111E18);     // Primary body text
  static const Color onSurfaceVariant = Color(0xFF404941); // Secondary text, captions
  static const Color onPrimary = Color(0xFFFFFFFF);     // Text on green backgrounds

  // ── Borders ─────────────────────────────────────────────────────
  static const Color outline = Color(0xFF707971);       // Borders, dividers
  static const Color outlineVariant = Color(0xFFC0C9BF); // Subtle borders
  static const Color cardBorder = Color(0xFFD4E8D8);    // Card border

  // ── States ──────────────────────────────────────────────────────
  static const Color error = Color(0xFFBA1A1A);         // Errors, destructive
  static const Color success = Color(0xFF2E7D52);       // Success states
  static const Color warning = Color(0xFFF59E0B);       // Warning states

  // ── Status Chips ────────────────────────────────────────────────
  static const Color activeChipBg = Color(0xFFEAF4EC);
  static const Color activeChipText = Color(0xFF1A5C38);
  static const Color pendingChipBg = Color(0xFFFEF3C7);
  static const Color pendingChipText = Color(0xFFD97706);
  static const Color completedChipBg = Color(0xFFF3F4F6);
  static const Color completedChipText = Color(0xFF6B7280);
  static const Color cancelledChipBg = Color(0xFFFEE2E2);
  static const Color cancelledChipText = Color(0xFFBA1A1A);
}
