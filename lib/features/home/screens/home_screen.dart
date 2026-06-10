import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../../../core/theme/app_theme.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      body: CustomScrollView(
        slivers: [
          SliverAppBar(
            floating: true,
            backgroundColor: AppColors.primary,
            expandedHeight: 120,
            flexibleSpace: FlexibleSpaceBar(
              titlePadding: const EdgeInsets.fromLTRB(20, 0, 20, 16),
              title: Column(
                mainAxisSize: MainAxisSize.min,
                crossAxisAlignment: CrossAxisAlignment.start,
                children: const [
                  Text('Good Morning! 👋', style: TextStyle(color: Colors.white, fontSize: 13, fontWeight: FontWeight.normal)),
                  Text('Welcome Back', style: TextStyle(color: Colors.white, fontSize: 18, fontFamily: 'PlayfairDisplay', fontWeight: FontWeight.bold)),
                ],
              ),
            ),
            actions: [
              Padding(
                padding: const EdgeInsets.only(right: 16),
                child: CircleAvatar(backgroundColor: AppColors.accentGold, child: const Text('P', style: TextStyle(color: AppColors.primaryDark, fontWeight: FontWeight.bold))),
              ),
            ],
          ),
          SliverToBoxAdapter(
            child: Padding(
              padding: const EdgeInsets.all(20),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  // Award banner
                  Container(
                    width: double.infinity,
                    padding: const EdgeInsets.all(16),
                    decoration: BoxDecoration(
                      gradient: LinearGradient(colors: [AppColors.accentGold.withOpacity(0.15), AppColors.accentGold.withOpacity(0.05)]),
                      borderRadius: BorderRadius.circular(16),
                      border: Border.all(color: AppColors.accentGold.withOpacity(0.4)),
                    ),
                    child: Row(
                      children: [
                        const Text('🏆', style: TextStyle(fontSize: 28)),
                        const SizedBox(width: 12),
                        const Expanded(
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text('AYUSH TV National Health Award', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 13, color: AppColors.primaryDark)),
                              Text('2024 Winner — Clinical Excellence', style: TextStyle(fontSize: 12, color: AppColors.onSurfaceVariant)),
                            ],
                          ),
                        ),
                      ],
                    ),
                  ),
                  const SizedBox(height: 20),
                  // Active Treatment Card
                  _sectionLabel('My Treatment'),
                  const SizedBox(height: 10),
                  _TreatmentCard(),
                  const SizedBox(height: 20),
                  // Doctor Card
                  _sectionLabel('Primary Physician'),
                  const SizedBox(height: 10),
                  _DoctorCard(),
                  const SizedBox(height: 20),
                  // Departments
                  _sectionLabel('Departments'),
                  const SizedBox(height: 10),
                  _DepartmentsGrid(),
                  const SizedBox(height: 20),
                  // Book Appointment CTA
                  ElevatedButton.icon(
                    onPressed: () => context.go('/appointments'),
                    icon: const Icon(Icons.calendar_today),
                    label: const Text('Book Appointment'),
                  ),
                  const SizedBox(height: 24),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _sectionLabel(String label) => Text(label, style: const TextStyle(fontSize: 16, fontWeight: FontWeight.w700, color: AppColors.primaryDark, fontFamily: 'PlayfairDisplay'));
}

class _TreatmentCard extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () => context.go('/treatment'),
      child: Container(
        width: double.infinity,
        padding: const EdgeInsets.all(18),
        decoration: BoxDecoration(
          color: AppColors.surface,
          borderRadius: BorderRadius.circular(16),
          border: Border.all(color: AppColors.outlineVariant),
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                Container(padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4), decoration: BoxDecoration(color: AppColors.primary.withOpacity(0.12), borderRadius: BorderRadius.circular(20)), child: const Text('ACTIVE', style: TextStyle(color: AppColors.primary, fontSize: 11, fontWeight: FontWeight.w700, letterSpacing: 0.5))),
                const Spacer(),
                const Text('View Details ›', style: TextStyle(color: AppColors.primary, fontSize: 13, fontWeight: FontWeight.w600)),
              ],
            ),
            const SizedBox(height: 12),
            const Text('Awaiting Treatment Plan', style: TextStyle(fontWeight: FontWeight.w700, fontSize: 16, color: AppColors.onSurface)),
            const SizedBox(height: 4),
            const Text('Your doctor will assign a treatment plan soon.', style: TextStyle(fontSize: 13, color: AppColors.onSurfaceVariant)),
            const SizedBox(height: 14),
            const LinearProgressIndicator(value: 0, backgroundColor: Color(0xFFE1F2E8), color: AppColors.primary, minHeight: 6, borderRadius: BorderRadius.all(Radius.circular(4))),
            const SizedBox(height: 6),
            const Text('0% Complete', style: TextStyle(fontSize: 12, color: AppColors.outline)),
          ],
        ),
      ),
    );
  }
}

class _DoctorCard extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(color: AppColors.surface, borderRadius: BorderRadius.circular(16), border: Border.all(color: AppColors.outlineVariant)),
      child: Row(
        children: [
          CircleAvatar(radius: 28, backgroundColor: AppColors.primary, child: const Text('DR', style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold))),
          const SizedBox(width: 14),
          const Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text('Dr. APJ Sharma', style: TextStyle(fontWeight: FontWeight.w700, fontSize: 15, color: AppColors.onSurface)),
                Text('Chief Vaidya', style: TextStyle(fontSize: 13, color: AppColors.onSurfaceVariant)),
                SizedBox(height: 4),
                Row(children: [
                  Icon(Icons.verified, color: AppColors.primary, size: 14),
                  SizedBox(width: 4),
                  Text('AYUSH Certified', style: TextStyle(fontSize: 12, color: AppColors.primary)),
                ]),
              ],
            ),
          ),
          IconButton(icon: const Icon(Icons.chat_bubble_outline, color: AppColors.primary), onPressed: () {}),
        ],
      ),
    );
  }
}

class _DepartmentsGrid extends StatelessWidget {
  final _depts = const [
    {'icon': '🏥', 'name': 'General'},
    {'icon': '👶', 'name': 'OBG'},
    {'icon': '🧠', 'name': 'Psychiatry'},
    {'icon': '🥗', 'name': 'Dietetics'},
    {'icon': '🤲', 'name': 'Abhyanga'},
    {'icon': '🧘', 'name': 'Yoga'},
  ];
  @override
  Widget build(BuildContext context) {
    return GridView.builder(
      shrinkWrap: true,
      physics: const NeverScrollableScrollPhysics(),
      gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(crossAxisCount: 3, mainAxisSpacing: 10, crossAxisSpacing: 10, childAspectRatio: 1.1),
      itemCount: _depts.length,
      itemBuilder: (_, i) => Container(
        decoration: BoxDecoration(color: AppColors.surface, borderRadius: BorderRadius.circular(14), border: Border.all(color: AppColors.outlineVariant)),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text(_depts[i]['icon']!, style: const TextStyle(fontSize: 26)),
            const SizedBox(height: 6),
            Text(_depts[i]['name']!, style: const TextStyle(fontSize: 12, fontWeight: FontWeight.w600, color: AppColors.onSurface)),
          ],
        ),
      ),
    );
  }
}
