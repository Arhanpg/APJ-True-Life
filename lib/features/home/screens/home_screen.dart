import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../../../core/theme/app_colors.dart';
import '../../../core/widgets/section_card.dart';
import '../../../core/widgets/status_chip.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      body: CustomScrollView(
        slivers: [
          // App bar
          SliverAppBar(
            floating: true,
            backgroundColor: AppColors.primary,
            expandedHeight: 120,
            flexibleSpace: FlexibleSpaceBar(
              background: Container(
                color: AppColors.primary,
                padding: const EdgeInsets.fromLTRB(20, 48, 20, 12),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  mainAxisAlignment: MainAxisAlignment.end,
                  children: const [
                    Text('Good Morning,', style: TextStyle(fontSize: 14, color: Colors.white70)),
                    SizedBox(height: 4),
                    Text('Patient', style: TextStyle(
                      fontFamily: 'PlayfairDisplay', fontSize: 24, fontWeight: FontWeight.w700, color: Colors.white,
                    )),
                  ],
                ),
              ),
            ),
            actions: [
              Padding(
                padding: const EdgeInsets.only(right: 16, top: 8),
                child: IconButton(
                  icon: const Icon(Icons.notifications_outlined, color: Colors.white),
                  onPressed: () {},
                ),
              ),
            ],
          ),

          SliverToBoxAdapter(
            child: Padding(
              padding: const EdgeInsets.all(16),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  // Award badge
                  Container(
                    width: double.infinity,
                    padding: const EdgeInsets.all(14),
                    decoration: BoxDecoration(
                      gradient: const LinearGradient(colors: [Color(0xFFC9A84C), Color(0xFFB8860B)]),
                      borderRadius: BorderRadius.circular(14),
                    ),
                    child: const Row(
                      children: [
                        Icon(Icons.emoji_events, color: Colors.white, size: 28),
                        SizedBox(width: 12),
                        Expanded(child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text('AYUSH TV National Health Award 2024', style: TextStyle(color: Colors.white, fontWeight: FontWeight.w700, fontSize: 13)),
                            Text('Recognized for Clinical Excellence', style: TextStyle(color: Colors.white70, fontSize: 12)),
                          ],
                        )),
                      ],
                    ),
                  ),
                  const SizedBox(height: 20),

                  // Active treatment card
                  SectionCard(
                    title: 'My Active Treatment',
                    trailing: TextButton(
                      onPressed: () => context.go('/treatment'),
                      child: const Text('View All', style: TextStyle(color: AppColors.primary, fontSize: 13)),
                    ),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Row(
                          children: [
                            Container(
                              padding: const EdgeInsets.all(8),
                              decoration: BoxDecoration(color: AppColors.surfaceTint, borderRadius: BorderRadius.circular(10)),
                              child: const Icon(Icons.healing, color: AppColors.primary, size: 22),
                            ),
                            const SizedBox(width: 12),
                            const Expanded(child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Text('Nasya Therapy Course', style: TextStyle(fontWeight: FontWeight.w700, fontSize: 15, color: AppColors.onSurface)),
                                Text('Phase 1 of 3 · Day 7 of 14', style: TextStyle(fontSize: 13, color: AppColors.outline)),
                              ],
                            )),
                            const StatusChip(status: ChipStatus.inProgress),
                          ],
                        ),
                        const SizedBox(height: 14),
                        const Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Text('Progress', style: TextStyle(fontSize: 13, fontWeight: FontWeight.w600, color: AppColors.onSurfaceVariant)),
                            Text('45%', style: TextStyle(fontSize: 13, fontWeight: FontWeight.w700, color: AppColors.primary)),
                          ],
                        ),
                        const SizedBox(height: 8),
                        ClipRRect(
                          borderRadius: BorderRadius.circular(4),
                          child: const LinearProgressIndicator(
                            value: 0.45, minHeight: 8,
                            backgroundColor: AppColors.surfaceTint,
                            valueColor: AlwaysStoppedAnimation(AppColors.primary),
                          ),
                        ),
                        const SizedBox(height: 14),
                        SizedBox(
                          width: double.infinity,
                          child: OutlinedButton(
                            onPressed: () => context.go('/treatment'),
                            child: const Text('View Treatment Plan'),
                          ),
                        ),
                      ],
                    ),
                  ),
                  const SizedBox(height: 16),

                  // Primary physician
                  SectionCard(
                    title: 'Primary Physician',
                    child: Row(
                      children: [
                        CircleAvatar(
                          radius: 28,
                          backgroundColor: AppColors.primary,
                          child: const Text('AJ', style: TextStyle(color: Colors.white, fontSize: 16, fontWeight: FontWeight.w700)),
                        ),
                        const SizedBox(width: 14),
                        const Expanded(child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Row(children: [
                              Text('Dr. APJ Sharma', style: TextStyle(fontWeight: FontWeight.w700, fontSize: 15, color: AppColors.onSurface)),
                              SizedBox(width: 6),
                              Icon(Icons.verified, color: AppColors.primary, size: 16),
                            ]),
                            Text('Chief Vaidya · Ayurvedic Physician', style: TextStyle(fontSize: 13, color: AppColors.outline)),
                          ],
                        )),
                        TextButton(
                          onPressed: () {},
                          child: const Text('Chat', style: TextStyle(color: AppColors.primary, fontWeight: FontWeight.w600)),
                        ),
                      ],
                    ),
                  ),
                  const SizedBox(height: 16),

                  // Departments
                  SectionCard(
                    title: 'Departments & Services',
                    child: GridView.count(
                      crossAxisCount: 2,
                      childAspectRatio: 2.5,
                      shrinkWrap: true,
                      physics: const NeverScrollableScrollPhysics(),
                      crossAxisSpacing: 10, mainAxisSpacing: 10,
                      children: const [
                        _DeptTile(label: 'General', icon: Icons.local_hospital_outlined),
                        _DeptTile(label: 'OBG', icon: Icons.pregnant_woman_outlined),
                        _DeptTile(label: 'Psychiatry', icon: Icons.psychology_outlined),
                        _DeptTile(label: 'Dietetics', icon: Icons.restaurant_menu_outlined),
                        _DeptTile(label: 'Abhyanga', icon: Icons.spa_outlined),
                        _DeptTile(label: 'Yoga', icon: Icons.self_improvement_outlined),
                      ],
                    ),
                  ),
                  const SizedBox(height: 16),

                  // Book appointment CTA
                  SizedBox(
                    width: double.infinity,
                    child: ElevatedButton.icon(
                      onPressed: () => context.go('/appointments'),
                      icon: const Icon(Icons.calendar_today_outlined),
                      label: const Text('Book an Appointment'),
                      style: ElevatedButton.styleFrom(
                        backgroundColor: AppColors.accentGold,
                        foregroundColor: Colors.white,
                        minimumSize: const Size.fromHeight(52),
                        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
                      ),
                    ),
                  ),
                  const SizedBox(height: 32),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}

class _DeptTile extends StatelessWidget {
  final String label;
  final IconData icon;
  const _DeptTile({required this.label, required this.icon});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
      decoration: BoxDecoration(
        color: AppColors.surfaceTint,
        borderRadius: BorderRadius.circular(10),
      ),
      child: Row(
        children: [
          Icon(icon, color: AppColors.primary, size: 18),
          const SizedBox(width: 8),
          Text(label, style: const TextStyle(fontSize: 13, fontWeight: FontWeight.w600, color: AppColors.primaryDark)),
        ],
      ),
    );
  }
}
