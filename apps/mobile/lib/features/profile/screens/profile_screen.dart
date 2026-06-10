import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../../../core/theme/app_colors.dart';

class ProfileScreen extends StatelessWidget {
  const ProfileScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        title: const Text('My Profile'),
        backgroundColor: AppColors.primary,
        automaticallyImplyLeading: false,
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          children: [
            // Avatar and stats
            Container(
              width: double.infinity,
              padding: const EdgeInsets.all(20),
              decoration: BoxDecoration(
                color: AppColors.surface,
                borderRadius: BorderRadius.circular(16),
                border: Border.all(color: const Color(0xFFD4E8D8)),
              ),
              child: Column(
                children: [
                  Stack(
                    children: [
                      Container(width: 80, height: 80, decoration: const BoxDecoration(shape: BoxShape.circle, color: AppColors.primary), child: const Center(child: Text('P', style: TextStyle(color: Colors.white, fontSize: 32, fontWeight: FontWeight.w700)))),
                      Positioned(right: 0, bottom: 0, child: Container(width: 26, height: 26, decoration: const BoxDecoration(shape: BoxShape.circle, color: AppColors.accentGold), child: const Icon(Icons.camera_alt_outlined, color: Colors.white, size: 14))),
                    ],
                  ),
                  const SizedBox(height: 12),
                  const Text('Patient Name', style: TextStyle(fontFamily: 'PlayfairDisplay', fontSize: 20, fontWeight: FontWeight.w700, color: AppColors.primaryDark)),
                  const SizedBox(height: 4),
                  const Text('#ATL-8492', style: TextStyle(fontFamily: 'JetBrainsMono', fontSize: 13, color: AppColors.outline)),
                  const SizedBox(height: 16),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                    children: const [
                      _Stat(label: 'Treatments', value: '2'),
                      _StatDivider(),
                      _Stat(label: 'Sessions', value: '14'),
                      _StatDivider(),
                      _Stat(label: 'Days Active', value: '28'),
                    ],
                  ),
                ],
              ),
            ),
            const SizedBox(height: 16),

            // My Information
            _ProfileSection(
              title: 'My Information',
              items: const [
                _ProfileItem(icon: Icons.mail_outline, label: 'Email', value: 'patient@email.com'),
                _ProfileItem(icon: Icons.phone_outlined, label: 'Phone', value: '+91 98765 43210'),
                _ProfileItem(icon: Icons.cake_outlined, label: 'Date of Birth', value: '01 Jan 1990'),
                _ProfileItem(icon: Icons.water_drop_outlined, label: 'Blood Group', value: 'A+'),
              ],
            ),
            const SizedBox(height: 14),

            // My Health
            _ProfileSection(
              title: 'My Health',
              items: const [
                _ProfileItem(icon: Icons.healing_outlined, label: 'Current Treatment', value: 'Nasya Course'),
                _ProfileItem(icon: Icons.calendar_today_outlined, label: 'Next Appointment', value: '12 Jun 2026'),
                _ProfileItem(icon: Icons.spa_outlined, label: 'Prakriti', value: 'Vata-Pitta'),
              ],
            ),
            const SizedBox(height: 14),

            // Preferences
            _ProfileSection(
              title: 'Preferences',
              items: const [
                _ProfileItem(icon: Icons.notifications_outlined, label: 'Push Notifications', value: 'Enabled'),
                _ProfileItem(icon: Icons.privacy_tip_outlined, label: 'Privacy Policy', value: ''),
                _ProfileItem(icon: Icons.help_outline, label: 'Help & Support', value: ''),
              ],
            ),
            const SizedBox(height: 20),

            // Logout
            OutlinedButton.icon(
              onPressed: () => context.go('/onboarding'),
              icon: const Icon(Icons.logout, color: AppColors.error, size: 18),
              label: const Text('Logout', style: TextStyle(color: AppColors.error, fontFamily: 'DMSans', fontWeight: FontWeight.w600)),
              style: OutlinedButton.styleFrom(side: const BorderSide(color: AppColors.error)),
            ),
            const SizedBox(height: 16),
          ],
        ),
      ),
    );
  }
}

class _Stat extends StatelessWidget {
  final String label;
  final String value;
  const _Stat({required this.label, required this.value});

  @override
  Widget build(BuildContext context) => Column(
    children: [
      Text(value, style: const TextStyle(fontFamily: 'DMSans', fontSize: 22, fontWeight: FontWeight.w700, color: AppColors.primary)),
      const SizedBox(height: 2),
      Text(label, style: const TextStyle(fontFamily: 'DMSans', fontSize: 11, color: AppColors.outline)),
    ],
  );
}

class _StatDivider extends StatelessWidget {
  const _StatDivider();

  @override
  Widget build(BuildContext context) => Container(height: 32, width: 1, color: AppColors.outlineVariant);
}

class _ProfileSection extends StatelessWidget {
  final String title;
  final List<Widget> items;
  const _ProfileSection({required this.title, required this.items});

  @override
  Widget build(BuildContext context) => Container(
    padding: const EdgeInsets.all(16),
    decoration: BoxDecoration(
      color: AppColors.surface,
      borderRadius: BorderRadius.circular(16),
      border: Border.all(color: const Color(0xFFD4E8D8)),
    ),
    child: Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(title, style: const TextStyle(fontFamily: 'DMSans', fontSize: 13, fontWeight: FontWeight.w700, color: AppColors.outline, letterSpacing: 0.5, height: 1)),
        const SizedBox(height: 12),
        ...items,
      ],
    ),
  );
}

class _ProfileItem extends StatelessWidget {
  final IconData icon;
  final String label;
  final String value;
  const _ProfileItem({required this.icon, required this.label, required this.value});

  @override
  Widget build(BuildContext context) => Padding(
    padding: const EdgeInsets.symmetric(vertical: 8),
    child: Row(
      children: [
        Icon(icon, size: 18, color: AppColors.primary),
        const SizedBox(width: 12),
        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(label, style: const TextStyle(fontFamily: 'DMSans', fontSize: 11, color: AppColors.outline)),
              if (value.isNotEmpty) Text(value, style: const TextStyle(fontFamily: 'DMSans', fontSize: 14, fontWeight: FontWeight.w500, color: AppColors.onSurface)),
            ],
          ),
        ),
        const Icon(Icons.chevron_right, size: 18, color: AppColors.outlineVariant),
      ],
    ),
  );
}
