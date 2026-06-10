import 'package:flutter/material.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:go_router/go_router.dart';
import '../../../../core/theme/app_colors.dart';

class ProfileScreen extends StatelessWidget {
  const ProfileScreen({super.key});

  Future<void> _logout(BuildContext context) async {
    await FirebaseAuth.instance.signOut();
    if (context.mounted) context.go('/welcome');
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(title: const Text('My Profile'), backgroundColor: AppColors.primary),
      body: ListView(
        padding: const EdgeInsets.all(20),
        children: [
          // Profile header
          Center(
            child: Column(
              children: [
                CircleAvatar(
                  radius: 40,
                  backgroundColor: AppColors.primary,
                  child: const Text('P', style: TextStyle(color: Colors.white, fontSize: 32, fontFamily: 'PlayfairDisplay')),
                ),
                const SizedBox(height: 12),
                const Text('Patient Name',
                  style: TextStyle(fontFamily: 'PlayfairDisplay', fontSize: 20,
                      fontWeight: FontWeight.bold, color: AppColors.primaryDark)),
                const SizedBox(height: 4),
                const Text('#ATL-0000',
                  style: TextStyle(fontFamily: 'DMSans', fontSize: 13, color: AppColors.onSurfaceVariant)),
              ],
            ),
          ),
          const SizedBox(height: 24),
          // Sections
          _SectionTile(icon: Icons.info_outline,    title: 'My Information',  onTap: () {}),
          _SectionTile(icon: Icons.favorite_outline, title: 'My Health',       onTap: () {}),
          _SectionTile(icon: Icons.notifications_outlined, title: 'Preferences', onTap: () {}),
          _SectionTile(icon: Icons.privacy_tip_outlined, title: 'Privacy Policy', onTap: () {}),
          _SectionTile(icon: Icons.help_outline,    title: 'Help & Support',  onTap: () {}),
          const SizedBox(height: 12),
          TextButton.icon(
            onPressed: () => _logout(context),
            icon: const Icon(Icons.logout, color: AppColors.error),
            label: const Text('Logout', style: TextStyle(color: AppColors.error, fontFamily: 'DMSans', fontSize: 15)),
          ),
        ],
      ),
    );
  }
}

class _SectionTile extends StatelessWidget {
  final IconData icon;
  final String title;
  final VoidCallback onTap;
  const _SectionTile({required this.icon, required this.title, required this.onTap});

  @override
  Widget build(BuildContext context) {
    return ListTile(
      leading: Icon(icon, color: AppColors.primary),
      title: Text(title, style: const TextStyle(fontFamily: 'DMSans', fontSize: 15)),
      trailing: const Icon(Icons.chevron_right, color: AppColors.onSurfaceVariant),
      onTap: onTap,
      contentPadding: const EdgeInsets.symmetric(horizontal: 0, vertical: 4),
    );
  }
}
