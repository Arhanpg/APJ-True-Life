import 'package:flutter/material.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:go_router/go_router.dart';
import '../../../core/theme/app_colors.dart';

class ProfileScreen extends StatelessWidget {
  const ProfileScreen({super.key});

  Future<void> _logout(BuildContext context) async {
    await FirebaseAuth.instance.signOut();
    if (context.mounted) context.go('/onboarding');
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(title: const Text('My Profile'), centerTitle: true),
      body: ListView(
        children: [
          // Profile header
          Container(
            color: AppColors.primary,
            padding: const EdgeInsets.symmetric(vertical: 32, horizontal: 20),
            child: Column(
              children: [
                Container(
                  width: 80, height: 80,
                  decoration: const BoxDecoration(color: AppColors.accentGold, shape: BoxShape.circle),
                  child: const Center(child: Text('P', style: TextStyle(color: AppColors.primary, fontSize: 36, fontWeight: FontWeight.bold))),
                ),
                const SizedBox(height: 12),
                const Text('Patient', style: TextStyle(color: Colors.white, fontSize: 20, fontWeight: FontWeight.w700)),
                const SizedBox(height: 4),
                const Text('#ATL-0001', style: TextStyle(color: Colors.white60, fontSize: 13)),
              ],
            ),
          ),
          _Section('My Information', [
            _Tile(icon: Icons.phone, label: 'Phone', value: 'Not set'),
            _Tile(icon: Icons.email, label: 'Email', value: 'Not set'),
            _Tile(icon: Icons.cake, label: 'Date of Birth', value: 'Not set'),
          ]),
          _Section('My Health', [
            _Tile(icon: Icons.medical_services, label: 'Current Treatment', value: 'None'),
            _Tile(icon: Icons.calendar_today, label: 'Next Appointment', value: 'None'),
          ]),
          _Section('Preferences', [
            _Tile(icon: Icons.notifications, label: 'Push Notifications', value: 'Enabled'),
            _Tile(icon: Icons.privacy_tip, label: 'Privacy Policy', value: ''),
            _Tile(icon: Icons.help, label: 'Help & Support', value: ''),
          ]),
          Padding(
            padding: const EdgeInsets.all(24),
            child: OutlinedButton(
              style: OutlinedButton.styleFrom(
                foregroundColor: AppColors.error,
                side: const BorderSide(color: AppColors.error),
                minimumSize: const Size(double.infinity, 48),
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
              ),
              onPressed: () => _logout(context),
              child: const Text('Logout'),
            ),
          ),
        ],
      ),
    );
  }
}

class _Section extends StatelessWidget {
  final String title;
  final List<Widget> tiles;
  const _Section(this.title, this.tiles);

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding: const EdgeInsets.fromLTRB(20, 20, 20, 8),
          child: Text(title, style: const TextStyle(fontWeight: FontWeight.w700, fontSize: 14, color: AppColors.onSurfaceVariant)),
        ),
        Container(
          margin: const EdgeInsets.symmetric(horizontal: 16),
          decoration: BoxDecoration(
            color: AppColors.surface,
            borderRadius: BorderRadius.circular(12),
            border: Border.all(color: AppColors.outlineVariant),
          ),
          child: Column(children: tiles),
        ),
      ],
    );
  }
}

class _Tile extends StatelessWidget {
  final IconData icon;
  final String label, value;
  const _Tile({required this.icon, required this.label, required this.value});

  @override
  Widget build(BuildContext context) {
    return ListTile(
      leading: Icon(icon, color: AppColors.primary, size: 20),
      title: Text(label, style: const TextStyle(fontSize: 14)),
      trailing: value.isNotEmpty ? Text(value, style: const TextStyle(color: AppColors.onSurfaceVariant, fontSize: 13)) : const Icon(Icons.chevron_right, color: AppColors.outline),
      dense: true,
    );
  }
}
