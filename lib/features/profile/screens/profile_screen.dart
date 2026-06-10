import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../../../core/theme/app_colors.dart';

class ProfileScreen extends StatelessWidget {
  const ProfileScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(title: const Text('My Profile'), backgroundColor: AppColors.background),
      body: SingleChildScrollView(
        child: Column(
          children: [
            // Profile header
            Container(
              padding: const EdgeInsets.all(24),
              decoration: const BoxDecoration(color: AppColors.surface),
              child: Column(
                children: [
                  Stack(
                    children: [
                      CircleAvatar(radius: 44, backgroundColor: AppColors.surfaceTint,
                        child: const Text('A', style: TextStyle(fontFamily: 'PlayfairDisplay', fontSize: 36, fontWeight: FontWeight.w700, color: AppColors.primary))),
                      Positioned(bottom: 0, right: 0,
                        child: Container(padding: const EdgeInsets.all(6), decoration: const BoxDecoration(color: AppColors.primary, shape: BoxShape.circle),
                          child: const Icon(Icons.camera_alt, size: 14, color: Colors.white))),
                    ],
                  ),
                  const SizedBox(height: 12),
                  const Text('Arhan Ghosarwade', style: TextStyle(fontFamily: 'PlayfairDisplay', fontSize: 20, fontWeight: FontWeight.w700, color: AppColors.primaryDark)),
                  const SizedBox(height: 4),
                  const Text('#ATL-8492', style: TextStyle(fontSize: 13, color: AppColors.accentGold, fontWeight: FontWeight.w600)),
                  const SizedBox(height: 12),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      _Stat(label: 'Treatments', value: '3'),
                      Container(width: 1, height: 32, color: AppColors.outlineVariant, margin: const EdgeInsets.symmetric(horizontal: 24)),
                      _Stat(label: 'Sessions', value: '14'),
                    ],
                  ),
                ],
              ),
            ),
            const SizedBox(height: 8),
            _Section(
              title: 'My Information',
              items: [
                _ProfileItem(icon: Icons.email_outlined, label: 'Email', value: 'arhan@example.com', editable: true),
                _ProfileItem(icon: Icons.phone_outlined, label: 'Phone', value: '+91 9876543210', editable: false),
                _ProfileItem(icon: Icons.cake_outlined, label: 'Date of Birth', value: '15 Mar 1998', editable: true),
                _ProfileItem(icon: Icons.location_on_outlined, label: 'Address', value: 'Bengaluru, Karnataka', editable: true),
              ],
            ),
            const SizedBox(height: 8),
            _Section(
              title: 'My Health',
              items: [
                _ProfileItem(icon: Icons.healing_outlined, label: 'Current Treatment', value: 'Nasya Course', editable: false, onTap: () => context.go('/treatment')),
                _ProfileItem(icon: Icons.calendar_today_outlined, label: 'Next Appointment', value: 'Thu, 12 Jun 2026', editable: false, onTap: () => context.go('/appointments')),
                _ProfileItem(icon: Icons.history_outlined, label: 'Medical History', value: 'View records', editable: false),
              ],
            ),
            const SizedBox(height: 8),
            _Section(
              title: 'Preferences',
              items: [
                _ProfileItem(icon: Icons.notifications_outlined, label: 'Push Notifications', value: 'Enabled', editable: false, isToggle: true),
                _ProfileItem(icon: Icons.privacy_tip_outlined, label: 'Privacy Policy', value: '', editable: false),
                _ProfileItem(icon: Icons.help_outline, label: 'Help & Support', value: '', editable: false),
              ],
            ),
            const SizedBox(height: 8),
            Padding(
              padding: const EdgeInsets.all(16),
              child: OutlinedButton(
                onPressed: () => context.go('/onboarding'),
                style: OutlinedButton.styleFrom(
                  foregroundColor: AppColors.error,
                  side: const BorderSide(color: AppColors.error),
                  minimumSize: const Size(double.infinity, 48),
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
                ),
                child: const Text('Log Out'),
              ),
            ),
            const SizedBox(height: 16),
          ],
        ),
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
      Text(value, style: const TextStyle(fontSize: 22, fontWeight: FontWeight.w700, color: AppColors.primary)),
      Text(label, style: const TextStyle(fontSize: 13, color: AppColors.onSurfaceVariant)),
    ],
  );
}

class _Section extends StatelessWidget {
  final String title;
  final List<_ProfileItem> items;
  const _Section({required this.title, required this.items});
  @override
  Widget build(BuildContext context) => Container(
    color: AppColors.surface,
    child: Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding: const EdgeInsets.fromLTRB(16, 16, 16, 8),
          child: Text(title, style: const TextStyle(fontSize: 12, fontWeight: FontWeight.w700, color: AppColors.onSurfaceVariant, letterSpacing: 0.5)),
        ),
        ...items.map((item) => ListTile(
          leading: Icon(item.icon, color: AppColors.primary, size: 22),
          title: Text(item.label, style: const TextStyle(fontSize: 14, fontWeight: FontWeight.w500, color: AppColors.onSurface)),
          subtitle: item.value.isNotEmpty ? Text(item.value, style: const TextStyle(fontSize: 13, color: AppColors.onSurfaceVariant)) : null,
          trailing: item.isToggle ? Switch(value: true, onChanged: (_) {}, activeColor: AppColors.primary)
              : item.editable ? const Icon(Icons.edit_outlined, size: 18, color: AppColors.outline)
              : const Icon(Icons.chevron_right, color: AppColors.outline),
          onTap: item.onTap,
        )),
      ],
    ),
  );
}

class _ProfileItem {
  final IconData icon;
  final String label, value;
  final bool editable, isToggle;
  final VoidCallback? onTap;
  const _ProfileItem({required this.icon, required this.label, required this.value, required this.editable, this.isToggle = false, this.onTap});
}
