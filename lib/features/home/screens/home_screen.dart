import 'package:flutter/material.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:go_router/go_router.dart';
import '../../../core/theme/app_colors.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final user = FirebaseAuth.instance.currentUser;
    return Scaffold(
      backgroundColor: AppColors.background,
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(20),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Header
              Row(
                children: [
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text('Hello, Patient 👋', style: Theme.of(context).textTheme.headlineLarge),
                        const SizedBox(height: 4),
                        Text('Welcome back to APJ TRUE LIFE',
                          style: Theme.of(context).textTheme.bodyMedium),
                      ],
                    ),
                  ),
                  CircleAvatar(
                    radius: 22,
                    backgroundColor: AppColors.primary,
                    child: Text((user?.phoneNumber ?? 'P').substring(0, 1).toUpperCase(),
                      style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold)),
                  ),
                ],
              ),
              const SizedBox(height: 20),

              // Award banner
              Container(
                padding: const EdgeInsets.all(14),
                decoration: BoxDecoration(
                  color: AppColors.gold.withOpacity(0.15),
                  border: Border.all(color: AppColors.gold.withOpacity(0.4)),
                  borderRadius: BorderRadius.circular(12),
                ),
                child: Row(
                  children: [
                    const Text('🏆', style: TextStyle(fontSize: 24)),
                    const SizedBox(width: 12),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text('AYUSH TV National Health Award 2024',
                            style: TextStyle(fontSize: 13, fontWeight: FontWeight.w600,
                              color: AppColors.primaryDark)),
                          Text('Recognised for Clinical Excellence',
                            style: TextStyle(fontSize: 12, color: AppColors.textSecondary)),
                        ],
                      ),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 24),

              // Active Treatment Card
              _SectionHeader(title: 'My Treatment', action: 'View all', onAction: () => context.go('/treatment')),
              const SizedBox(height: 12),
              Container(
                padding: const EdgeInsets.all(18),
                decoration: BoxDecoration(
                  color: AppColors.surface,
                  border: Border.all(color: AppColors.outlineVariant),
                  borderRadius: BorderRadius.circular(16),
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Text('No active treatment plan',
                      style: TextStyle(fontSize: 15, fontWeight: FontWeight.w500, color: AppColors.textPrimary)),
                    const SizedBox(height: 6),
                    Text('Your doctor will assign a treatment plan after your first appointment.',
                      style: TextStyle(fontSize: 13, color: AppColors.textSecondary, height: 1.5)),
                    const SizedBox(height: 16),
                    SizedBox(
                      height: 44,
                      child: ElevatedButton(
                        onPressed: () => context.go('/appointments'),
                        child: const Text('Book Appointment'),
                      ),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 24),

              // Primary Physician
              _SectionHeader(title: 'Primary Physician', action: '', onAction: () {}),
              const SizedBox(height: 12),
              Container(
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(
                  color: AppColors.surface,
                  border: Border.all(color: AppColors.outlineVariant),
                  borderRadius: BorderRadius.circular(16),
                ),
                child: Row(
                  children: [
                    CircleAvatar(
                      radius: 28,
                      backgroundColor: AppColors.primary,
                      child: const Text('DR', style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold)),
                    ),
                    const SizedBox(width: 16),
                    Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        const Text('Dr. APJ Sharma', style: TextStyle(fontSize: 16, fontWeight: FontWeight.w600)),
                        const SizedBox(height: 2),
                        Text('Chief Vaidya · APJ TRUE LIFE',
                          style: TextStyle(fontSize: 13, color: AppColors.textSecondary)),
                        const SizedBox(height: 6),
                        Container(
                          padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                          decoration: BoxDecoration(
                            color: AppColors.primary.withOpacity(0.1),
                            borderRadius: BorderRadius.circular(20),
                          ),
                          child: const Text('✓ Verified', style: TextStyle(fontSize: 11,
                            color: AppColors.primary, fontWeight: FontWeight.w500)),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 24),

              // Quick actions
              _SectionHeader(title: 'Services', action: '', onAction: () {}),
              const SizedBox(height: 12),
              GridView.count(
                crossAxisCount: 2,
                shrinkWrap: true,
                physics: const NeverScrollableScrollPhysics(),
                mainAxisSpacing: 12,
                crossAxisSpacing: 12,
                childAspectRatio: 2.4,
                children: [
                  _ServiceTile(label: 'General', icon: Icons.medical_services_outlined),
                  _ServiceTile(label: 'OBG', icon: Icons.favorite_outline),
                  _ServiceTile(label: 'Psychiatry', icon: Icons.psychology_outlined),
                  _ServiceTile(label: 'Dietetics', icon: Icons.restaurant_outlined),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class _SectionHeader extends StatelessWidget {
  final String title;
  final String action;
  final VoidCallback onAction;
  const _SectionHeader({required this.title, required this.action, required this.onAction});

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        Text(title, style: Theme.of(context).textTheme.titleMedium?.copyWith(fontWeight: FontWeight.w700)),
        if (action.isNotEmpty)
          TextButton(onPressed: onAction, child: Text(action, style: const TextStyle(color: AppColors.primary))),
      ],
    );
  }
}

class _ServiceTile extends StatelessWidget {
  final String label;
  final IconData icon;
  const _ServiceTile({required this.label, required this.icon});

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        color: AppColors.surface,
        border: Border.all(color: AppColors.outlineVariant),
        borderRadius: BorderRadius.circular(12),
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Icon(icon, color: AppColors.primary, size: 20),
          const SizedBox(width: 8),
          Text(label, style: const TextStyle(fontSize: 13, fontWeight: FontWeight.w500)),
        ],
      ),
    );
  }
}
