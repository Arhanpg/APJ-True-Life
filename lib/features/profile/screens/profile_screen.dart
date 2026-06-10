import 'package:flutter/material.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:go_router/go_router.dart';
import '../../../core/theme/app_colors.dart';

class ProfileScreen extends StatelessWidget {
  const ProfileScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final user = FirebaseAuth.instance.currentUser;
    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        title: Text('Profile', style: Theme.of(context).textTheme.headlineLarge),
        backgroundColor: AppColors.background,
        automaticallyImplyLeading: false,
      ),
      body: SingleChildScrollView(
        child: Column(
          children: [
            // Profile header
            Container(
              width: double.infinity,
              padding: const EdgeInsets.all(24),
              color: AppColors.surface,
              child: Column(
                children: [
                  CircleAvatar(
                    radius: 44,
                    backgroundColor: AppColors.primary,
                    child: Text(
                      (user?.phoneNumber ?? 'P').isNotEmpty ? 'P' : 'P',
                      style: const TextStyle(color: Colors.white, fontSize: 32, fontWeight: FontWeight.bold),
                    ),
                  ),
                  const SizedBox(height: 12),
                  Text('Patient', style: Theme.of(context).textTheme.headlineLarge),
                  const SizedBox(height: 4),
                  Text('#ATL-0001',
                    style: Theme.of(context).textTheme.bodyMedium?.copyWith(color: AppColors.primary, fontWeight: FontWeight.w500)),
                  const SizedBox(height: 4),
                  Text(user?.phoneNumber ?? '',
                    style: Theme.of(context).textTheme.bodyMedium),
                ],
              ),
            ),
            const SizedBox(height: 12),

            // Stats
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 20),
              child: Row(
                children: [
                  _StatCard(label: 'Total Treatments', value: '0'),
                  const SizedBox(width: 12),
                  _StatCard(label: 'Total Sessions', value: '0'),
                ],
              ),
            ),
            const SizedBox(height: 12),

            // Menu items
            _MenuSection(title: 'My Information', items: [
              _MenuItem(icon: Icons.person_outline, label: 'Personal Details', onTap: () {}),
              _MenuItem(icon: Icons.phone_outlined, label: 'Phone Number', value: user?.phoneNumber ?? '', onTap: () {}),
            ]),
            _MenuSection(title: 'My Health', items: [
              _MenuItem(icon: Icons.assignment_outlined, label: 'Current Treatment', onTap: () => context.go('/treatment')),
              _MenuItem(icon: Icons.calendar_today_outlined, label: 'Next Appointment', onTap: () => context.go('/appointments')),
              _MenuItem(icon: Icons.history, label: 'Medical History', onTap: () {}),
            ]),
            _MenuSection(title: 'Preferences', items: [
              _MenuItem(icon: Icons.notifications_outlined, label: 'Push Notifications', trailing: Switch(
                value: true, onChanged: (_) {}, activeColor: AppColors.primary,
              ), onTap: () {}),
              _MenuItem(icon: Icons.privacy_tip_outlined, label: 'Privacy Policy', onTap: () {}),
              _MenuItem(icon: Icons.help_outline, label: 'Help & Support', onTap: () {}),
            ]),

            // Logout
            Padding(
              padding: const EdgeInsets.all(20),
              child: OutlinedButton.icon(
                onPressed: () async {
                  await FirebaseAuth.instance.signOut();
                  if (context.mounted) context.go('/onboarding');
                },
                icon: const Icon(Icons.logout, color: AppColors.error),
                label: const Text('Logout', style: TextStyle(color: AppColors.error)),
                style: OutlinedButton.styleFrom(
                  side: const BorderSide(color: AppColors.error),
                ),
              ),
            ),
            const SizedBox(height: 20),
          ],
        ),
      ),
    );
  }
}

class _StatCard extends StatelessWidget {
  final String label, value;
  const _StatCard({required this.label, required this.value});
  @override
  Widget build(BuildContext context) {
    return Expanded(
      child: Container(
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(
          color: AppColors.surface,
          border: Border.all(color: AppColors.outlineVariant),
          borderRadius: BorderRadius.circular(12),
        ),
        child: Column(
          children: [
            Text(value, style: const TextStyle(fontSize: 28, fontWeight: FontWeight.bold, color: AppColors.primary)),
            const SizedBox(height: 4),
            Text(label, style: const TextStyle(fontSize: 12, color: AppColors.textSecondary), textAlign: TextAlign.center),
          ],
        ),
      ),
    );
  }
}

class _MenuSection extends StatelessWidget {
  final String title;
  final List<_MenuItem> items;
  const _MenuSection({required this.title, required this.items});
  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.fromLTRB(20, 8, 20, 0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Padding(
            padding: const EdgeInsets.only(bottom: 8),
            child: Text(title, style: const TextStyle(fontSize: 12, fontWeight: FontWeight.w600,
              color: AppColors.textSecondary, letterSpacing: 0.5)),
          ),
          Container(
            decoration: BoxDecoration(
              color: AppColors.surface,
              border: Border.all(color: AppColors.outlineVariant),
              borderRadius: BorderRadius.circular(12),
            ),
            child: Column(
              children: items.map((item) {
                final isLast = items.last == item;
                return Column(
                  children: [
                    item,
                    if (!isLast) const Divider(height: 1, indent: 52),
                  ],
                );
              }).toList(),
            ),
          ),
          const SizedBox(height: 12),
        ],
      ),
    );
  }
}

class _MenuItem extends StatelessWidget {
  final IconData icon;
  final String label;
  final String? value;
  final Widget? trailing;
  final VoidCallback onTap;
  const _MenuItem({required this.icon, required this.label, this.value, this.trailing, required this.onTap});
  @override
  Widget build(BuildContext context) {
    return ListTile(
      leading: Icon(icon, color: AppColors.primary, size: 22),
      title: Text(label, style: const TextStyle(fontSize: 14, fontWeight: FontWeight.w500)),
      subtitle: value != null ? Text(value!, style: const TextStyle(fontSize: 12, color: AppColors.textSecondary)) : null,
      trailing: trailing ?? const Icon(Icons.chevron_right, color: AppColors.textHint, size: 18),
      onTap: onTap,
      dense: true,
      contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 2),
    );
  }
}
