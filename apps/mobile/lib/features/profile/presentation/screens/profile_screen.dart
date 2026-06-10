import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../../../../core/theme/app_colors.dart';

class ProfileScreen extends StatelessWidget {
  const ProfileScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        title: const Text('My Profile', style: TextStyle(fontWeight: FontWeight.bold)),
        backgroundColor: AppColors.primary,
        elevation: 0,
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(20),
        child: Column(
          children: [
            // Profile header
            Container(
              padding: const EdgeInsets.all(24),
              decoration: BoxDecoration(
                color: Colors.white, borderRadius: BorderRadius.circular(16),
                border: Border.all(color: AppColors.outlineVariant),
              ),
              child: Column(
                children: [
                  CircleAvatar(radius: 44, backgroundColor: AppColors.surfaceTint,
                    child: const Icon(Icons.person, size: 44, color: AppColors.primary)),
                  const SizedBox(height: 12),
                  const Text('Patient Name', style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold, color: AppColors.primaryDark)),
                  const SizedBox(height: 4),
                  const Text('#ATL-8492', style: TextStyle(fontSize: 13, color: AppColors.textMuted, fontFamily: 'JetBrainsMono')),
                  const SizedBox(height: 12),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceAround,
                    children: const [
                      _Stat(label: 'Treatments', value: '1'),
                      _Divider(),
                      _Stat(label: 'Sessions', value: '5'),
                      _Divider(),
                      _Stat(label: 'Appointments', value: '3'),
                    ],
                  ),
                ],
              ),
            ),
            const SizedBox(height: 16),

            // My Information
            _sectionCard('My Information', Icons.person_outline, [
              _InfoRow(icon: Icons.email_outlined, label: 'Email', value: 'patient@email.com'),
              _InfoRow(icon: Icons.phone_outlined, label: 'Phone', value: '+91 99999 00000'),
              _InfoRow(icon: Icons.cake_outlined, label: 'Date of Birth', value: '15 Jan 1990'),
              _InfoRow(icon: Icons.water_drop_outlined, label: 'Blood Group', value: 'B+'),
            ]),
            const SizedBox(height: 12),

            // My Health
            _sectionCard('My Health', Icons.favorite_outline, [
              _InfoRow(icon: Icons.medical_services_outlined, label: 'Current Treatment', value: 'Nasya Therapy Course'),
              _InfoRow(icon: Icons.calendar_today_outlined, label: 'Next Appointment', value: '12 Jun 2026 · 10:00 AM'),
              _InfoRow(icon: Icons.grass_outlined, label: 'Prakriti', value: 'Kapha-Vata'),
            ]),
            const SizedBox(height: 12),

            // Preferences
            _sectionCard('Preferences', Icons.settings_outlined, [
              _ToggleRow(label: 'Push Notifications', value: true),
              _ToggleRow(label: 'Appointment Reminders', value: true),
              _ToggleRow(label: 'Treatment Updates', value: true),
            ]),
            const SizedBox(height: 12),

            // Links
            _sectionCard('Account', Icons.manage_accounts_outlined, [
              _LinkRow(label: 'Privacy Policy'),
              _LinkRow(label: 'Help & Support'),
              _LinkRow(label: 'Terms & Conditions'),
            ]),
            const SizedBox(height: 16),

            // Logout
            OutlinedButton.icon(
              onPressed: () => context.go('/onboarding'),
              icon: const Icon(Icons.logout, size: 16),
              label: const Text('Logout'),
              style: OutlinedButton.styleFrom(
                foregroundColor: AppColors.error,
                side: const BorderSide(color: AppColors.error),
              ),
            ),
            const SizedBox(height: 24),
          ],
        ),
      ),
    );
  }

  static Widget _sectionCard(String title, IconData icon, List<Widget> children) {
    return Container(
      decoration: BoxDecoration(
        color: Colors.white, borderRadius: BorderRadius.circular(14),
        border: Border.all(color: AppColors.outlineVariant),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Padding(
            padding: const EdgeInsets.fromLTRB(16, 14, 16, 0),
            child: Row(
              children: [
                Icon(icon, size: 16, color: AppColors.primary),
                const SizedBox(width: 8),
                Text(title, style: const TextStyle(fontSize: 14, fontWeight: FontWeight.bold, color: AppColors.primaryDark)),
              ],
            ),
          ),
          const SizedBox(height: 8),
          const Divider(height: 1, indent: 16, endIndent: 16),
          ...children,
        ],
      ),
    );
  }
}

class _Stat extends StatelessWidget {
  final String label, value;
  const _Stat({required this.label, required this.value});

  @override
  Widget build(BuildContext context) => Column(
    children: [
      Text(value, style: const TextStyle(fontSize: 20, fontWeight: FontWeight.bold, color: AppColors.primaryDark)),
      const SizedBox(height: 2),
      Text(label, style: const TextStyle(fontSize: 11, color: AppColors.textMuted)),
    ],
  );
}

class _Divider extends StatelessWidget {
  const _Divider();

  @override
  Widget build(BuildContext context) => Container(width: 1, height: 32, color: AppColors.outlineVariant);
}

class _InfoRow extends StatelessWidget {
  final IconData icon;
  final String label, value;
  const _InfoRow({required this.icon, required this.label, required this.value});

  @override
  Widget build(BuildContext context) => Padding(
    padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
    child: Row(
      children: [
        Icon(icon, size: 16, color: AppColors.textMuted),
        const SizedBox(width: 10),
        Expanded(child: Text(label, style: const TextStyle(fontSize: 13, color: AppColors.textMuted))),
        Text(value, style: const TextStyle(fontSize: 13, fontWeight: FontWeight.w600, color: AppColors.textPrimary)),
      ],
    ),
  );
}

class _ToggleRow extends StatelessWidget {
  final String label;
  final bool value;
  const _ToggleRow({required this.label, required this.value});

  @override
  Widget build(BuildContext context) => Padding(
    padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 4),
    child: Row(
      children: [
        Expanded(child: Text(label, style: const TextStyle(fontSize: 13, color: AppColors.textPrimary))),
        Switch(value: value, onChanged: (_) {}, activeColor: AppColors.primary),
      ],
    ),
  );
}

class _LinkRow extends StatelessWidget {
  final String label;
  const _LinkRow({required this.label});

  @override
  Widget build(BuildContext context) => Padding(
    padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
    child: Row(
      children: [
        Expanded(child: Text(label, style: const TextStyle(fontSize: 13, color: AppColors.textPrimary))),
        const Icon(Icons.chevron_right, size: 18, color: AppColors.textMuted),
      ],
    ),
  );
}
