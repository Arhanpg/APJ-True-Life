import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../../../core/theme/app_colors.dart';
import '../../../core/widgets/section_card.dart';
import '../../../core/widgets/status_chip.dart';

class TreatmentScreen extends StatelessWidget {
  const TreatmentScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        title: const Text('My Treatment'),
        backgroundColor: AppColors.surface,
        elevation: 0,
        bottom: PreferredSize(
          preferredSize: const Size.fromHeight(1),
          child: Container(height: 1, color: AppColors.surfaceTint),
        ),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Treatment header card
            SectionCard(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    children: [
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: const [
                            Text('Nasya Therapy Course',
                              style: TextStyle(fontFamily: 'PlayfairDisplay', fontSize: 18, fontWeight: FontWeight.w700, color: AppColors.primaryDark)),
                            SizedBox(height: 4),
                            Text('Started: 03 Jun 2026 · Est. end: 30 Jul 2026', style: TextStyle(fontSize: 12, color: AppColors.outline)),
                          ],
                        ),
                      ),
                      const StatusChip(status: ChipStatus.active),
                    ],
                  ),
                  const SizedBox(height: 16),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: const [
                      Text('Overall Progress', style: TextStyle(fontSize: 13, fontWeight: FontWeight.w600, color: AppColors.onSurfaceVariant)),
                      Text('45%', style: TextStyle(fontSize: 14, fontWeight: FontWeight.w700, color: AppColors.primary)),
                    ],
                  ),
                  const SizedBox(height: 8),
                  ClipRRect(
                    borderRadius: BorderRadius.circular(4),
                    child: const LinearProgressIndicator(
                      value: 0.45, minHeight: 10,
                      backgroundColor: AppColors.surfaceTint,
                      valueColor: AlwaysStoppedAnimation(AppColors.primary),
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 20),

            const Text('Treatment Phases',
              style: TextStyle(fontSize: 16, fontWeight: FontWeight.w700, color: AppColors.onSurface)),
            const SizedBox(height: 12),

            // Phase timeline
            _PhaseTimelineItem(
              number: 1, name: 'Purvakarma', status: ChipStatus.completed,
              description: 'Preparatory procedures before main therapy.',
              daysTotal: 7, daysCompleted: 7,
              onTap: () => context.go('/treatment/phase/1'),
            ),
            _PhaseTimelineItem(
              number: 2, name: 'Nasya Therapy', status: ChipStatus.inProgress,
              description: 'Medicated oil nasal administration therapy.',
              daysTotal: 14, daysCompleted: 7,
              isCurrent: true,
              onTap: () => context.go('/treatment/phase/2'),
            ),
            _PhaseTimelineItem(
              number: 3, name: 'Paschatkarma', status: ChipStatus.scheduled,
              description: 'Post-therapy restoration procedures.',
              daysTotal: 7, daysCompleted: 0,
              onTap: () {},
            ),
          ],
        ),
      ),
    );
  }
}

class _PhaseTimelineItem extends StatelessWidget {
  final int number;
  final String name;
  final ChipStatus status;
  final String description;
  final int daysTotal;
  final int daysCompleted;
  final bool isCurrent;
  final VoidCallback onTap;

  const _PhaseTimelineItem({
    required this.number, required this.name, required this.status,
    required this.description, required this.daysTotal, required this.daysCompleted,
    this.isCurrent = false, required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    final isCompleted = status == ChipStatus.completed;
    return InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(16),
      child: Container(
        margin: const EdgeInsets.only(bottom: 12),
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(
          color: isCurrent ? AppColors.surfaceTint : AppColors.surface,
          borderRadius: BorderRadius.circular(16),
          border: Border.all(
            color: isCurrent ? AppColors.primary : AppColors.outlineVariant,
            width: isCurrent ? 2 : 1,
          ),
        ),
        child: Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Phase number circle
            Container(
              width: 36, height: 36,
              decoration: BoxDecoration(
                color: isCompleted ? AppColors.primary : (isCurrent ? AppColors.primary : AppColors.outlineVariant),
                shape: BoxShape.circle,
              ),
              child: Center(
                child: isCompleted
                    ? const Icon(Icons.check, color: Colors.white, size: 18)
                    : Text('$number', style: const TextStyle(color: Colors.white, fontSize: 14, fontWeight: FontWeight.w700)),
              ),
            ),
            const SizedBox(width: 12),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    children: [
                      Expanded(child: Text(name, style: const TextStyle(fontSize: 15, fontWeight: FontWeight.w700, color: AppColors.onSurface))),
                      StatusChip(status: status),
                    ],
                  ),
                  const SizedBox(height: 4),
                  Text(description, style: const TextStyle(fontSize: 13, color: AppColors.outline)),
                  if (isCurrent) ...[
                    const SizedBox(height: 10),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Text('Day $daysCompleted of $daysTotal', style: const TextStyle(fontSize: 12, fontWeight: FontWeight.w600, color: AppColors.primary)),
                        Text('${(daysCompleted / daysTotal * 100).round()}%', style: const TextStyle(fontSize: 12, fontWeight: FontWeight.w700, color: AppColors.primary)),
                      ],
                    ),
                    const SizedBox(height: 6),
                    ClipRRect(
                      borderRadius: BorderRadius.circular(4),
                      child: LinearProgressIndicator(
                        value: daysCompleted / daysTotal, minHeight: 6,
                        backgroundColor: AppColors.outlineVariant,
                        valueColor: const AlwaysStoppedAnimation(AppColors.primary),
                      ),
                    ),
                    const SizedBox(height: 10),
                    const Text('Tap to view phase details →', style: TextStyle(fontSize: 12, color: AppColors.primary, fontWeight: FontWeight.w600)),
                  ],
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
