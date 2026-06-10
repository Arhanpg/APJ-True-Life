import 'package:flutter/material.dart';
import '../../../core/theme/app_colors.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(16),
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
                        const Text('Good morning,', style: TextStyle(fontFamily: 'DMSans', fontSize: 13, color: AppColors.outline)),
                        const SizedBox(height: 2),
                        const Text('Welcome Back 👋', style: TextStyle(fontFamily: 'PlayfairDisplay', fontSize: 22, fontWeight: FontWeight.w700, color: AppColors.primaryDark)),
                      ],
                    ),
                  ),
                  Container(
                    width: 44,
                    height: 44,
                    decoration: const BoxDecoration(shape: BoxShape.circle, color: AppColors.primary),
                    child: const Center(child: Text('P', style: TextStyle(color: Colors.white, fontWeight: FontWeight.w700, fontSize: 18))),
                  ),
                ],
              ),
              const SizedBox(height: 16),

              // Award banner
              Container(
                width: double.infinity,
                padding: const EdgeInsets.all(14),
                decoration: BoxDecoration(
                  gradient: const LinearGradient(colors: [Color(0xFF1A5C38), Color(0xFF2E7D52)]),
                  borderRadius: BorderRadius.circular(14),
                ),
                child: const Row(
                  children: [
                    Text('🏆', style: TextStyle(fontSize: 26)),
                    SizedBox(width: 12),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text('AYUSH TV National Health Award 2024', style: TextStyle(fontFamily: 'DMSans', fontSize: 12, fontWeight: FontWeight.w700, color: Colors.white)),
                          SizedBox(height: 2),
                          Text('Recognised for clinical excellence', style: TextStyle(fontFamily: 'DMSans', fontSize: 11, color: Color(0xCCFFFFFF))),
                        ],
                      ),
                    ),
                    Icon(Icons.star, color: Color(0xFFC9A84C), size: 20),
                  ],
                ),
              ),
              const SizedBox(height: 16),

              // Active Treatment Card
              _SectionCard(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      children: [
                        const Text('My Treatment', style: TextStyle(fontFamily: 'DMSans', fontSize: 14, fontWeight: FontWeight.w600, color: AppColors.onSurface)),
                        const Spacer(),
                        Container(padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 3), decoration: BoxDecoration(color: AppColors.confirmedBg, borderRadius: BorderRadius.circular(999)), child: const Text('Active', style: TextStyle(fontSize: 11, fontWeight: FontWeight.w600, color: AppColors.confirmed))),
                      ],
                    ),
                    const SizedBox(height: 10),
                    const Text('Nasya Therapy Course', style: TextStyle(fontFamily: 'PlayfairDisplay', fontSize: 17, fontWeight: FontWeight.w700, color: AppColors.primaryDark)),
                    const SizedBox(height: 6),
                    const Text('Day 7 of 28', style: TextStyle(fontFamily: 'JetBrainsMono', fontSize: 12, color: AppColors.outline)),
                    const SizedBox(height: 10),
                    ClipRRect(
                      borderRadius: BorderRadius.circular(999),
                      child: LinearProgressIndicator(
                        value: 7 / 28,
                        minHeight: 10,
                        backgroundColor: AppColors.surfaceTint,
                        valueColor: const AlwaysStoppedAnimation<Color>(AppColors.primary),
                      ),
                    ),
                    const SizedBox(height: 6),
                    const Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Text('25% complete', style: TextStyle(fontSize: 11, color: AppColors.outline, fontFamily: 'DMSans')),
                        Text('Phase 1 of 3', style: TextStyle(fontSize: 11, color: AppColors.primary, fontFamily: 'DMSans', fontWeight: FontWeight.w600)),
                      ],
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 14),

              // Doctor Card
              _SectionCard(
                child: Row(
                  children: [
                    Container(
                      width: 56,
                      height: 56,
                      decoration: const BoxDecoration(shape: BoxShape.circle, color: AppColors.primary),
                      child: const Center(child: Text('Dr', style: TextStyle(color: Colors.white, fontSize: 16, fontWeight: FontWeight.w700))),
                    ),
                    const SizedBox(width: 14),
                    const Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text('Dr. APJ Sharma', style: TextStyle(fontFamily: 'DMSans', fontSize: 15, fontWeight: FontWeight.w600, color: AppColors.onSurface)),
                          SizedBox(height: 3),
                          Text('Chief Vaidya · APJ TRUE LIFE', style: TextStyle(fontFamily: 'DMSans', fontSize: 12, color: AppColors.outline)),
                          SizedBox(height: 6),
                          Row(
                            children: [
                              Icon(Icons.verified, color: AppColors.accentGold, size: 14),
                              SizedBox(width: 4),
                              Text('AYUSH Certified', style: TextStyle(fontSize: 11, color: AppColors.accentGold, fontWeight: FontWeight.w600)),
                            ],
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 14),

              // Departments
              const Text('Departments', style: TextStyle(fontFamily: 'DMSans', fontSize: 14, fontWeight: FontWeight.w600, color: AppColors.onSurface)),
              const SizedBox(height: 10),
              GridView.count(
                crossAxisCount: 2,
                shrinkWrap: true,
                physics: const NeverScrollableScrollPhysics(),
                crossAxisSpacing: 10,
                mainAxisSpacing: 10,
                childAspectRatio: 2.8,
                children: const [
                  _DeptChip(label: 'General', icon: '🏥'),
                  _DeptChip(label: 'OBG', icon: '👩'),
                  _DeptChip(label: 'Psychiatry', icon: '🧠'),
                  _DeptChip(label: 'Dietetics', icon: '🥗'),
                ],
              ),
              const SizedBox(height: 14),

              // Services
              const Text('Therapeutic Services', style: TextStyle(fontFamily: 'DMSans', fontSize: 14, fontWeight: FontWeight.w600, color: AppColors.onSurface)),
              const SizedBox(height: 10),
              Row(
                children: [
                  Expanded(child: _ServiceCard(label: 'Abhyanga', icon: '💆', color: const Color(0xFFE8F5E9))),
                  const SizedBox(width: 10),
                  Expanded(child: _ServiceCard(label: 'Yoga', icon: '🧘', color: const Color(0xFFFFF8E1))),
                ],
              ),
              const SizedBox(height: 16),

              // Book Appointment CTA
              ElevatedButton.icon(
                onPressed: () {},
                icon: const Icon(Icons.calendar_today_outlined, size: 18),
                label: const Text('Book Appointment'),
              ),
              const SizedBox(height: 8),
            ],
          ),
        ),
      ),
    );
  }
}

class _SectionCard extends StatelessWidget {
  final Widget child;
  const _SectionCard({required this.child});

  @override
  Widget build(BuildContext context) => Container(
    padding: const EdgeInsets.all(16),
    decoration: BoxDecoration(
      color: AppColors.surface,
      borderRadius: BorderRadius.circular(14),
      border: Border.all(color: const Color(0xFFD4E8D8)),
    ),
    child: child,
  );
}

class _DeptChip extends StatelessWidget {
  final String label;
  final String icon;
  const _DeptChip({required this.label, required this.icon});

  @override
  Widget build(BuildContext context) => Container(
    padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
    decoration: BoxDecoration(
      color: AppColors.surface,
      borderRadius: BorderRadius.circular(10),
      border: Border.all(color: const Color(0xFFD4E8D8)),
    ),
    child: Row(
      children: [
        Text(icon, style: const TextStyle(fontSize: 18)),
        const SizedBox(width: 8),
        Text(label, style: const TextStyle(fontFamily: 'DMSans', fontSize: 13, fontWeight: FontWeight.w600, color: AppColors.onSurface)),
      ],
    ),
  );
}

class _ServiceCard extends StatelessWidget {
  final String label;
  final String icon;
  final Color color;
  const _ServiceCard({required this.label, required this.icon, required this.color});

  @override
  Widget build(BuildContext context) => Container(
    padding: const EdgeInsets.all(16),
    decoration: BoxDecoration(color: color, borderRadius: BorderRadius.circular(12)),
    child: Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(icon, style: const TextStyle(fontSize: 28)),
        const SizedBox(height: 8),
        Text(label, style: const TextStyle(fontFamily: 'DMSans', fontSize: 14, fontWeight: FontWeight.w600, color: AppColors.onSurface)),
      ],
    ),
  );
}
