import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../../../core/theme/app_theme.dart';

class ProfileScreen extends StatelessWidget {
  const ProfileScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(title: const Text('My Profile', style: TextStyle(fontFamily: 'PlayfairDisplay', fontWeight: FontWeight.bold))),
      body: ListView(
        padding: const EdgeInsets.all(20),
        children: [
          // Profile header
          Center(
            child: Column(
              children: [
                CircleAvatar(
                  radius: 44,
                  backgroundColor: AppColors.primary,
                  child: const Text('P', style: TextStyle(color: Colors.white, fontSize: 36, fontFamily: 'PlayfairDisplay', fontWeight: FontWeight.bold)),
                ),
                const SizedBox(height: 12),
                const Text('Patient Name', style: TextStyle(fontSize: 20, fontFamily: 'PlayfairDisplay', fontWeight: FontWeight.bold, color: AppColors.primaryDark)),
                const Text('#ATL-0000', style: TextStyle(fontSize: 13, color: AppColors.outline)),
                const SizedBox(height: 12),
                Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    _statBadge('Treatments', '0'),
                    const SizedBox(width: 20),
                    _statBadge('Sessions', '0'),
                  ],
                ),
              ],
            ),
          ),
          const SizedBox(height: 28),
          // Sections
          _section('My Information', [
            _infoTile(Icons.email_outlined, 'Email', '—'),
            _infoTile(Icons.phone_outlined, 'Phone', '+91 XXXXXXXXXX'),
            _infoTile(Icons.cake_outlined, 'Date of Birth', '—'),
          ]),
          const SizedBox(height: 16),
          _section('My Health', [
            _actionTile(Icons.local_hospital_outlined, 'Current Treatment', 'View', () {}),
            _actionTile(Icons.calendar_today_outlined, 'Next Appointment', 'Book', () => context.go('/appointments')),
            _actionTile(Icons.history, 'Medical History', 'View', () {}),
          ]),
          const SizedBox(height: 16),
          _section('Preferences', [
            _switchTile(Icons.notifications_outlined, 'Push Notifications', true),
            _actionTile(Icons.policy_outlined, 'Privacy Policy', '', () {}),
            _actionTile(Icons.help_outline, 'Help & Support', '', () {}),
          ]),
          const SizedBox(height: 24),
          OutlinedButton.icon(
            onPressed: () => context.go('/onboarding'),
            icon: const Icon(Icons.logout, color: AppColors.error),
            label: const Text('Logout', style: TextStyle(color: AppColors.error)),
            style: OutlinedButton.styleFrom(minimumSize: const Size(double.infinity, 50), side: const BorderSide(color: AppColors.error), shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12))),
          ),
          const SizedBox(height: 32),
        ],
      ),
    );
  }

  Widget _statBadge(String label, String value) => Column(
    children: [
      Text(value, style: const TextStyle(fontSize: 22, fontWeight: FontWeight.bold, color: AppColors.primaryDark)),
      Text(label, style: const TextStyle(fontSize: 12, color: AppColors.onSurfaceVariant)),
    ],
  );

  Widget _section(String title, List<Widget> items) => Column(
    crossAxisAlignment: CrossAxisAlignment.start,
    children: [
      Text(title, style: const TextStyle(fontSize: 13, fontWeight: FontWeight.w700, color: AppColors.primary, letterSpacing: 0.5)),
      const SizedBox(height: 8),
      Container(
        decoration: BoxDecoration(color: AppColors.surface, borderRadius: BorderRadius.circular(14), border: Border.all(color: AppColors.outlineVariant)),
        child: Column(children: items),
      ),
    ],
  );

  Widget _infoTile(IconData icon, String label, String value) => ListTile(
    leading: Icon(icon, color: AppColors.primary, size: 20),
    title: Text(label, style: const TextStyle(fontSize: 12, color: AppColors.onSurfaceVariant)),
    subtitle: Text(value, style: const TextStyle(fontSize: 14, color: AppColors.onSurface)),
    dense: true,
  );

  Widget _actionTile(IconData icon, String label, String action, VoidCallback onTap) => ListTile(
    leading: Icon(icon, color: AppColors.primary, size: 20),
    title: Text(label, style: const TextStyle(fontSize: 14, color: AppColors.onSurface)),
    trailing: action.isNotEmpty ? Text(action, style: const TextStyle(color: AppColors.primary, fontSize: 13, fontWeight: FontWeight.w600)) : const Icon(Icons.chevron_right, color: AppColors.outline),
    onTap: onTap,
    dense: true,
  );

  Widget _switchTile(IconData icon, String label, bool value) => ListTile(
    leading: Icon(icon, color: AppColors.primary, size: 20),
    title: Text(label, style: const TextStyle(fontSize: 14, color: AppColors.onSurface)),
    trailing: Switch(value: value, onChanged: (_) {}, activeColor: AppColors.primary),
    dense: true,
  );
}
