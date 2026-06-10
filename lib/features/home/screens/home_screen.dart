import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../../../core/theme/app_colors.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
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
                        const Text('Good morning,', style: TextStyle(fontSize: 14, color: AppColors.onSurfaceVariant)),
                        const Text('Arhan', style: TextStyle(fontFamily: 'PlayfairDisplay', fontSize: 22, fontWeight: FontWeight.w700, color: AppColors.primaryDark)),
                      ],
                    ),
                  ),
                  CircleAvatar(radius: 22, backgroundColor: AppColors.surfaceTint,
                    child: const Text('A', style: TextStyle(fontWeight: FontWeight.w700, color: AppColors.primary, fontSize: 18))),
                ],
              ),
              const SizedBox(height: 16),
              // AYUSH Award banner
              Container(
                padding: const EdgeInsets.all(14),
                decoration: BoxDecoration(
                  gradient: const LinearGradient(colors: [Color(0xFF004324), Color(0xFF1A5C38)]),
                  borderRadius: BorderRadius.circular(12),
                ),
                child: Row(
                  children: [
                    Container(
                      padding: const EdgeInsets.all(8),
                      decoration: BoxDecoration(color: AppColors.accentGold.withOpacity(0.2), borderRadius: BorderRadius.circular(8)),
                      child: const Icon(Icons.emoji_events, color: AppColors.accentGold, size: 28),
                    ),
                    const SizedBox(width: 12),
                    const Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text('AYUSH TV National Health Award',
                            style: TextStyle(color: Colors.white, fontWeight: FontWeight.w700, fontSize: 13)),
                          Text('2024 — Clinical Excellence Recognition',
                            style: TextStyle(color: Color(0xCCFFFFFF), fontSize: 12)),
                        ],
                      ),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 20),
              // Active Treatment Card
              _SectionTitle(title: 'Active Treatment'),
              const SizedBox(height: 8),
              GestureDetector(
                onTap: () => context.go('/treatment'),
                child: Container(
                  padding: const EdgeInsets.all(16),
                  decoration: BoxDecoration(
                    color: AppColors.surface,
                    borderRadius: BorderRadius.circular(12),
                    border: Border.all(color: const Color(0xFFD4E8D8), width: 2),
                  ),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Row(
                        children: [
                          const Expanded(child: Text('Nasal Polyp — Nasya Course',
                            style: TextStyle(fontWeight: FontWeight.w700, fontSize: 16, color: AppColors.onSurface))),
                          Container(
                            padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                            decoration: BoxDecoration(color: AppColors.surfaceTint, borderRadius: BorderRadius.circular(20)),
                            child: const Text('ACTIVE', style: TextStyle(fontSize: 11, fontWeight: FontWeight.w700, color: AppColors.primary)),
                          ),
                        ],
                      ),
                      const SizedBox(height: 6),
                      const Text('Day 14 of 42', style: TextStyle(fontSize: 13, color: AppColors.onSurfaceVariant)),
                      const SizedBox(height: 12),
                      ClipRRect(
                        borderRadius: BorderRadius.circular(4),
                        child: LinearProgressIndicator(
                          value: 14 / 42,
                          minHeight: 8,
                          backgroundColor: AppColors.surfaceTint,
                          valueColor: const AlwaysStoppedAnimation<Color>(AppColors.primary),
                        ),
                      ),
                      const SizedBox(height: 6),
                      const Text('33% complete', style: TextStyle(fontSize: 12, color: AppColors.onSurfaceVariant)),
                    ],
                  ),
                ),
              ),
              const SizedBox(height: 20),
              // Primary Physician
              _SectionTitle(title: 'Primary Physician'),
              const SizedBox(height: 8),
              Container(
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(
                  color: AppColors.surface,
                  borderRadius: BorderRadius.circular(12),
                  border: Border.all(color: const Color(0xFFD4E8D8), width: 2),
                ),
                child: Row(
                  children: [
                    CircleAvatar(radius: 28, backgroundColor: AppColors.surfaceTint,
                      child: const Text('DS', style: TextStyle(fontWeight: FontWeight.w700, color: AppColors.primary, fontSize: 16))),
                    const SizedBox(width: 14),
                    const Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Row(
                            children: [
                              Text('Dr. APJ Sharma', style: TextStyle(fontWeight: FontWeight.w700, fontSize: 16, color: AppColors.onSurface)),
                              SizedBox(width: 6),
                              Icon(Icons.verified, color: AppColors.primary, size: 18),
                            ],
                          ),
                          Text('Chief Vaidya • Ayurvedic Physician', style: TextStyle(fontSize: 13, color: AppColors.onSurfaceVariant)),
                        ],
                      ),
                    ),
                    IconButton(
                      icon: const Icon(Icons.chat_outlined, color: AppColors.primary),
                      onPressed: () {},
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 20),
              // Departments
              _SectionTitle(title: 'Departments'),
              const SizedBox(height: 12),
              GridView.count(
                shrinkWrap: true,
                physics: const NeverScrollableScrollPhysics(),
                crossAxisCount: 2,
                mainAxisSpacing: 12,
                crossAxisSpacing: 12,
                childAspectRatio: 2.2,
                children: [
                  _DeptCard(icon: Icons.local_hospital_outlined, label: 'General'),
                  _DeptCard(icon: Icons.pregnant_woman_outlined, label: 'OBG'),
                  _DeptCard(icon: Icons.psychology_outlined, label: 'Psychiatry'),
                  _DeptCard(icon: Icons.restaurant_outlined, label: 'Dietetics'),
                ],
              ),
              const SizedBox(height: 20),
              // Book Appointment
              ElevatedButton.icon(
                onPressed: () => context.go('/appointments'),
                icon: const Icon(Icons.calendar_today_outlined),
                label: const Text('Book Appointment'),
              ),
              const SizedBox(height: 20),
            ],
          ),
        ),
      ),
    );
  }
}

class _SectionTitle extends StatelessWidget {
  final String title;
  const _SectionTitle({required this.title});
  @override
  Widget build(BuildContext context) => Text(title,
    style: const TextStyle(fontSize: 17, fontWeight: FontWeight.w700, color: AppColors.onSurface));
}

class _DeptCard extends StatelessWidget {
  final IconData icon;
  final String label;
  const _DeptCard({required this.icon, required this.label});
  @override
  Widget build(BuildContext context) => Container(
    padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 12),
    decoration: BoxDecoration(
      color: AppColors.surface,
      borderRadius: BorderRadius.circular(10),
      border: Border.all(color: const Color(0xFFD4E8D8), width: 1.5),
    ),
    child: Row(
      children: [
        Icon(icon, color: AppColors.primary, size: 22),
        const SizedBox(width: 8),
        Text(label, style: const TextStyle(fontWeight: FontWeight.w600, fontSize: 14, color: AppColors.onSurface)),
      ],
    ),
  );
}
