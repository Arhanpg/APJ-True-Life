import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../../../../core/theme/app_colors.dart';

class TreatmentScreen extends StatelessWidget {
  const TreatmentScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        title: const Text('My Treatment', style: TextStyle(fontWeight: FontWeight.bold)),
        backgroundColor: AppColors.primary,
        elevation: 0,
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Overview card
            Container(
              width: double.infinity, padding: const EdgeInsets.all(20),
              decoration: BoxDecoration(
                color: Colors.white, borderRadius: BorderRadius.circular(16),
                border: Border.all(color: AppColors.outlineVariant),
                boxShadow: const [BoxShadow(color: Color(0x0A000000), blurRadius: 8, offset: Offset(0, 2))],
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    children: [
                      const Expanded(child: Text('Nasya Therapy Course', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: AppColors.primaryDark))),
                      Container(padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                        decoration: BoxDecoration(color: AppColors.confirmedBg, borderRadius: BorderRadius.circular(20)),
                        child: const Text('Active', style: TextStyle(color: AppColors.confirmedText, fontSize: 11, fontWeight: FontWeight.w700)),
                      ),
                    ],
                  ),
                  const SizedBox(height: 6),
                  const Text('Nasal Polyp Treatment', style: TextStyle(fontSize: 13, color: AppColors.textMuted)),
                  const SizedBox(height: 16),
                  const Text('Overall Progress', style: TextStyle(fontSize: 12, color: AppColors.textMuted)),
                  const SizedBox(height: 8),
                  ClipRRect(
                    borderRadius: BorderRadius.circular(6),
                    child: LinearProgressIndicator(
                      value: 0.4,
                      backgroundColor: AppColors.surfaceTint,
                      valueColor: const AlwaysStoppedAnimation(AppColors.secondary),
                      minHeight: 12,
                    ),
                  ),
                  const SizedBox(height: 6),
                  const Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text('40%', style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: AppColors.secondary)),
                      Text('Start: 01 Jun 2026 → End: 21 Jun 2026', style: TextStyle(fontSize: 11, color: AppColors.textMuted)),
                    ],
                  ),
                ],
              ),
            ),
            const SizedBox(height: 24),

            const Text('Treatment Phases', style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: AppColors.primaryDark)),
            const SizedBox(height: 14),

            // Phase timeline
            ..._phases.asMap().entries.map((e) => _PhaseCard(
              phase: e.value,
              index: e.key,
              total: _phases.length,
              onTap: () => context.go('/treatment/phase/${e.key + 1}'),
            )),
          ],
        ),
      ),
    );
  }

  static const _phases = [
    (name: 'Phase 1 · Purvakarma', status: 'COMPLETED', progress: 1.0),
    (name: 'Phase 2 · Nasya Therapy', status: 'IN_PROGRESS', progress: 0.6),
    (name: 'Phase 3 · Paschat Karma', status: 'SCHEDULED', progress: 0.0),
  ];
}

class _PhaseCard extends StatelessWidget {
  final ({String name, String status, double progress}) phase;
  final int index;
  final int total;
  final VoidCallback onTap;
  const _PhaseCard({required this.phase, required this.index, required this.total, required this.onTap});

  @override
  Widget build(BuildContext context) {
    final isCompleted = phase.status == 'COMPLETED';
    final isCurrent = phase.status == 'IN_PROGRESS';
    final isScheduled = phase.status == 'SCHEDULED';
    return IntrinsicHeight(
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Timeline line
          SizedBox(
            width: 36,
            child: Column(
              children: [
                Container(
                  width: 28, height: 28,
                  decoration: BoxDecoration(
                    shape: BoxShape.circle,
                    color: isCompleted ? AppColors.primary : isCurrent ? Colors.white : Colors.white,
                    border: Border.all(
                      color: isCompleted ? AppColors.primary : isCurrent ? AppColors.primary : AppColors.outlineVariant,
                      width: isCurrent ? 2.5 : 2,
                    ),
                  ),
                  child: Center(
                    child: isCompleted
                        ? const Icon(Icons.check, size: 14, color: Colors.white)
                        : Text('${index + 1}', style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: isCurrent ? AppColors.primary : AppColors.textMuted)),
                  ),
                ),
                if (index < total - 1)
                  Expanded(child: Container(width: 2, color: isCompleted ? AppColors.primary : AppColors.outlineVariant)),
              ],
            ),
          ),
          const SizedBox(width: 12),
          // Card
          Expanded(
            child: GestureDetector(
              onTap: isCurrent || isCompleted ? onTap : null,
              child: Container(
                margin: const EdgeInsets.only(bottom: 12),
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(12),
                  border: Border.all(color: isCurrent ? AppColors.primary : AppColors.outlineVariant, width: isCurrent ? 1.5 : 1),
                  boxShadow: isCurrent ? const [BoxShadow(color: Color(0x151A5C38), blurRadius: 8, offset: Offset(0, 2))] : null,
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      children: [
                        Expanded(child: Text(phase.name, style: const TextStyle(fontSize: 14, fontWeight: FontWeight.w700, color: AppColors.primaryDark))),
                        _StatusChip(phase.status),
                      ],
                    ),
                    if (isCurrent) ...[
                      const SizedBox(height: 10),
                      ClipRRect(
                        borderRadius: BorderRadius.circular(4),
                        child: LinearProgressIndicator(
                          value: phase.progress,
                          backgroundColor: AppColors.surfaceTint,
                          valueColor: const AlwaysStoppedAnimation(AppColors.secondary),
                          minHeight: 6,
                        ),
                      ),
                      const SizedBox(height: 6),
                      Text('${(phase.progress * 100).toInt()}% complete', style: const TextStyle(fontSize: 11, color: AppColors.textMuted)),
                    ],
                    if (isCurrent || isCompleted) ...[
                      const SizedBox(height: 8),
                      Text('Tap to view details →', style: TextStyle(fontSize: 12, color: AppColors.primary, fontWeight: FontWeight.w600)),
                    ],
                  ],
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}

class _StatusChip extends StatelessWidget {
  final String status;
  const _StatusChip(this.status);

  @override
  Widget build(BuildContext context) {
    Color bg, text;
    String label;
    switch (status) {
      case 'COMPLETED': bg = AppColors.confirmedBg; text = AppColors.confirmedText; label = '✓ Done'; break;
      case 'IN_PROGRESS': bg = const Color(0xFFFFF8E1); text = const Color(0xFFF59E0B); label = '● In Progress'; break;
      default: bg = const Color(0xFFF5F5F5); text = AppColors.textMuted; label = 'Scheduled';
    }
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
      decoration: BoxDecoration(color: bg, borderRadius: BorderRadius.circular(20)),
      child: Text(label, style: TextStyle(fontSize: 10, fontWeight: FontWeight.w700, color: text)),
    );
  }
}
