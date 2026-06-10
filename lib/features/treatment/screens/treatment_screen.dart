import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../../../core/theme/app_colors.dart';

class TreatmentScreen extends StatelessWidget {
  const TreatmentScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(title: const Text('My Treatment'), backgroundColor: AppColors.background,
        actions: [TextButton(onPressed: () => context.go('/treatment/archive'), child: const Text('Archive', style: TextStyle(color: AppColors.primary)))]),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Overview card
            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(color: AppColors.surface, borderRadius: BorderRadius.circular(12), border: Border.all(color: const Color(0xFFD4E8D8), width: 2)),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    children: [
                      Expanded(child: const Text('Nasal Polyp — Nasya Course', style: TextStyle(fontFamily: 'PlayfairDisplay', fontSize: 18, fontWeight: FontWeight.w700, color: AppColors.primaryDark))),
                      Container(padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4), decoration: BoxDecoration(color: AppColors.surfaceTint, borderRadius: BorderRadius.circular(20)),
                        child: const Text('ACTIVE', style: TextStyle(fontSize: 11, fontWeight: FontWeight.w700, color: AppColors.primary))),
                    ],
                  ),
                  const SizedBox(height: 8),
                  Row(
                    children: [
                      const Icon(Icons.calendar_today_outlined, size: 14, color: AppColors.onSurfaceVariant),
                      const SizedBox(width: 4),
                      const Text('Start: 1 Jun 2026 → End: 12 Jul 2026', style: TextStyle(fontSize: 13, color: AppColors.onSurfaceVariant)),
                    ],
                  ),
                  const SizedBox(height: 12),
                  Row(mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      const Text('Overall Progress', style: TextStyle(fontSize: 13, fontWeight: FontWeight.w500, color: AppColors.onSurface)),
                      const Text('33%', style: TextStyle(fontSize: 13, fontWeight: FontWeight.w700, color: AppColors.primary)),
                    ],
                  ),
                  const SizedBox(height: 6),
                  ClipRRect(borderRadius: BorderRadius.circular(4),
                    child: const LinearProgressIndicator(value: 0.33, minHeight: 8, backgroundColor: Color(0xFFE1F2E8), valueColor: AlwaysStoppedAnimation<Color>(AppColors.primary))),
                ],
              ),
            ),
            const SizedBox(height: 24),
            const Text('Treatment Phases', style: TextStyle(fontSize: 17, fontWeight: FontWeight.w700, color: AppColors.onSurface)),
            const SizedBox(height: 16),
            // Phase timeline
            ..._phases.asMap().entries.map((e) => _PhaseTimelineTile(phase: e.value, index: e.key, total: _phases.length, onTap: () => context.go('/treatment/phase/${e.key + 1}'))),
          ],
        ),
      ),
    );
  }

  static const _phases = [
    _PhaseData(number: 1, name: 'Purvakarma Preparation', status: 'COMPLETED', progress: 1.0),
    _PhaseData(number: 2, name: 'Nasya Therapy', status: 'IN_PROGRESS', progress: 0.55),
    _PhaseData(number: 3, name: 'Post-treatment Rasayana', status: 'SCHEDULED', progress: 0.0),
  ];
}

class _PhaseData {
  final int number;
  final String name;
  final String status;
  final double progress;
  const _PhaseData({required this.number, required this.name, required this.status, required this.progress});
}

class _PhaseTimelineTile extends StatelessWidget {
  final _PhaseData phase;
  final int index;
  final int total;
  final VoidCallback onTap;
  const _PhaseTimelineTile({required this.phase, required this.index, required this.total, required this.onTap});

  @override
  Widget build(BuildContext context) {
    Color chipColor; Color chipBg; IconData icon;
    switch (phase.status) {
      case 'COMPLETED': chipColor = AppColors.primary; chipBg = AppColors.surfaceTint; icon = Icons.check_circle;
        break;
      case 'IN_PROGRESS': chipColor = AppColors.primary; chipBg = AppColors.surfaceTint; icon = Icons.play_circle_outline;
        break;
      default: chipColor = AppColors.outline; chipBg = const Color(0xFFF4F4F4); icon = Icons.radio_button_unchecked;
    }
    return Row(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Column(
          children: [
            Icon(icon, color: chipColor, size: 28),
            if (index < total - 1) Container(width: 2, height: 60, color: AppColors.outlineVariant),
          ],
        ),
        const SizedBox(width: 16),
        Expanded(
          child: GestureDetector(
            onTap: phase.status != 'SCHEDULED' ? onTap : null,
            child: Container(
              margin: const EdgeInsets.only(bottom: 12),
              padding: const EdgeInsets.all(14),
              decoration: BoxDecoration(
                color: phase.status == 'IN_PROGRESS' ? const Color(0xFFF0FAF4) : AppColors.surface,
                borderRadius: BorderRadius.circular(10),
                border: Border.all(color: phase.status == 'IN_PROGRESS' ? AppColors.primary : const Color(0xFFD4E8D8), width: phase.status == 'IN_PROGRESS' ? 2 : 1.5),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    children: [
                      Text('Phase ${phase.number}', style: TextStyle(fontSize: 12, fontWeight: FontWeight.w600, color: chipColor)),
                      const SizedBox(width: 8),
                      Container(padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2), decoration: BoxDecoration(color: chipBg, borderRadius: BorderRadius.circular(12)),
                        child: Text(phase.status.replaceAll('_', ' '), style: TextStyle(fontSize: 11, fontWeight: FontWeight.w600, color: chipColor))),
                    ],
                  ),
                  const SizedBox(height: 4),
                  Text(phase.name, style: const TextStyle(fontSize: 15, fontWeight: FontWeight.w600, color: AppColors.onSurface)),
                  if (phase.status == 'IN_PROGRESS') ...[const SizedBox(height: 10),
                    ClipRRect(borderRadius: BorderRadius.circular(4), child: LinearProgressIndicator(value: phase.progress, minHeight: 6, backgroundColor: const Color(0xFFE1F2E8), valueColor: const AlwaysStoppedAnimation<Color>(AppColors.primary))),
                    const SizedBox(height: 4), Text('${(phase.progress * 100).toInt()}% complete', style: const TextStyle(fontSize: 12, color: AppColors.onSurfaceVariant)),
                  ],
                  if (phase.status != 'SCHEDULED') ...[const SizedBox(height: 8),
                    const Row(children: [Text('View Details', style: TextStyle(fontSize: 13, color: AppColors.primary, fontWeight: FontWeight.w600)), SizedBox(width: 4), Icon(Icons.arrow_forward_ios, size: 12, color: AppColors.primary)])],
                ],
              ),
            ),
          ),
        ),
      ],
    );
  }
}
