import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../../../core/theme/app_colors.dart';
import '../../../core/widgets/section_card.dart';

class ProfileScreen extends StatelessWidget {
  const ProfileScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        title: const Text('My Profile'),
        backgroundColor: AppColors.surface,
        elevation: 0,
        actions: [
          TextButton(
            onPressed: () {},
            child: const Text('Edit', style: TextStyle(color: AppColors.primary, fontWeight: FontWeight.w600)),
          ),
        ],
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          children: [
            // Profile header
            Container(
              width: double.infinity,
              padding: const EdgeInsets.all(24),
              decoration: BoxDecoration(
                color: AppColors.primary,
                borderRadius: BorderRadius.circular(20),
              ),
              child: Column(
                children: [
                  Stack(
                    children: [
                      CircleAvatar(
                        radius: 44,
                        backgroundColor: Colors.white.withOpacity(0.2),
                        child: const Text('P', style: TextStyle(color: Colors.white, fontSize: 36, fontWeight: FontWeight.w700, fontFamily: 'PlayfairDisplay')),
                      ),
                      Positioned(
                        right: 0, bottom: 0,
                        child: Container(
                          padding: const EdgeInsets.all(6),
                          decoration: const BoxDecoration(color: AppColors.accentGold, shape: BoxShape.circle),
                          child: const Icon(Icons.camera_alt, color: Colors.white, size: 14),
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 14),
                  const Text('Patient Name', style: TextStyle(fontFamily: 'PlayfairDisplay', fontSize: 22, fontWeight: FontWeight.w700, color: Colors.white)),
                  const SizedBox(height: 4),
                  const Text('#ATL-8492', style: TextStyle(fontSize: 13, color: Colors.white70, letterSpacing: 1)),
                  const SizedBox(height: 16),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                    children: [
                      _StatItem(label: 'Treatments', value: '2'),
                      Container(width: 1, height: 32, color: Colors.white24),
                      _StatItem(label: 'Sessions', value: '14'),
                    ],
                  ),
                ],
              ),
            ),
            const SizedBox(height: 20),

            // My information
            SectionCard(
              title: 'My Information',
              child: Column(
                children: const [
                  _InfoRow(icon: Icons.phone, label: 'Mobile', value: '+91 98765 43210'),
                  Divider(color: AppColors.surfaceTint, height: 20),
                  _InfoRow(icon: Icons.cake, label: 'Date of Birth', value: '01 Jan 1990'),
                  Divider(color: AppColors.surfaceTint, height: 20),
                  _InfoRow(icon: Icons.water_drop, label: 'Blood Group', value: 'B+'),
                  Divider(color: AppColors.surfaceTint, height: 20),
                  _InfoRow(icon: Icons.psychology, label: 'Prakriti', value: 'Vata-Pitta'),
                ],
              ),
            ),
            const SizedBox(height: 16),

            // My health
            SectionCard(
              title: 'My Health',
              child: Column(
                children: [
                  _LinkRow(
                    icon: Icons.medical_services_outlined,
                    label: 'Current Treatment',
                    subtitle: 'Nasya Therapy Course',
                    onTap: () => context.go('/treatment'),
                  ),
                  const Divider(color: AppColors.surfaceTint, height: 20),
                  _LinkRow(
                    icon: Icons.calendar_today_outlined,
                    label: 'Next Appointment',
                    subtitle: '14 Jun 2026 · 10:00 AM',
                    onTap: () => context.go('/appointments'),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 16),

            // Preferences
            SectionCard(
              title: 'Preferences',
              child: Column(
                children: [
                  _ToggleRow(icon: Icons.notifications_outlined, label: 'Push Notifications'),
                  const Divider(color: AppColors.surfaceTint, height: 20),
                  _LinkRow(
                    icon: Icons.privacy_tip_outlined,
                    label: 'Privacy Policy',
                    subtitle: '',
                    onTap: () {},
                  ),
                  const Divider(color: AppColors.surfaceTint, height: 20),
                  _LinkRow(
                    icon: Icons.help_outline,
                    label: 'Help & Support',
                    subtitle: '',
                    onTap: () {},
                  ),
                ],
              ),
            ),
            const SizedBox(height: 16),

            // Logout
            SizedBox(
              width: double.infinity, height: 52,
              child: OutlinedButton.icon(
                onPressed: () => context.go('/onboarding'),
                icon: const Icon(Icons.logout, size: 18),
                label: const Text('Logout', style: TextStyle(fontWeight: FontWeight.w600)),
                style: OutlinedButton.styleFrom(
                  foregroundColor: AppColors.error,
                  side: const BorderSide(color: AppColors.error),
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                ),
              ),
            ),
            const SizedBox(height: 32),
          ],
        ),
      ),
    );
  }
}

class _StatItem extends StatelessWidget {
  final String label, value;
  const _StatItem({required this.label, required this.value});
  @override
  Widget build(BuildContext context) => Column(
    children: [
      Text(value, style: const TextStyle(fontSize: 22, fontWeight: FontWeight.w700, color: Colors.white)),
      Text(label, style: const TextStyle(fontSize: 12, color: Colors.white70)),
    ],
  );
}

class _InfoRow extends StatelessWidget {
  final IconData icon;
  final String label, value;
  const _InfoRow({required this.icon, required this.label, required this.value});
  @override
  Widget build(BuildContext context) => Row(
    children: [
      Icon(icon, color: AppColors.primary, size: 20),
      const SizedBox(width: 12),
      Expanded(child: Text(label, style: const TextStyle(fontSize: 14, color: AppColors.outline))),
      Text(value, style: const TextStyle(fontSize: 14, fontWeight: FontWeight.w600, color: AppColors.onSurface)),
    ],
  );
}

class _LinkRow extends StatelessWidget {
  final IconData icon;
  final String label, subtitle;
  final VoidCallback onTap;
  const _LinkRow({required this.icon, required this.label, required this.subtitle, required this.onTap});
  @override
  Widget build(BuildContext context) => InkWell(
    onTap: onTap,
    child: Row(
      children: [
        Icon(icon, color: AppColors.primary, size: 20),
        const SizedBox(width: 12),
        Expanded(child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(label, style: const TextStyle(fontSize: 14, fontWeight: FontWeight.w600, color: AppColors.onSurface)),
            if (subtitle.isNotEmpty) Text(subtitle, style: const TextStyle(fontSize: 12, color: AppColors.outline)),
          ],
        )),
        const Icon(Icons.chevron_right, color: AppColors.outline, size: 20),
      ],
    ),
  );
}

class _ToggleRow extends StatefulWidget {
  final IconData icon;
  final String label;
  const _ToggleRow({required this.icon, required this.label});
  @override
  State<_ToggleRow> createState() => _ToggleRowState();
}

class _ToggleRowState extends State<_ToggleRow> {
  bool _on = true;
  @override
  Widget build(BuildContext context) => Row(
    children: [
      Icon(widget.icon, color: AppColors.primary, size: 20),
      const SizedBox(width: 12),
      Expanded(child: Text(widget.label, style: const TextStyle(fontSize: 14, fontWeight: FontWeight.w600, color: AppColors.onSurface))),
      Switch(value: _on, onChanged: (v) => setState(() => _on = v), activeColor: AppColors.primary),
    ],
  );
}
