import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../../../core/theme/app_colors.dart';

const _phases = [
  {'number': 1, 'name': 'Purvakarma', 'status': 'completed', 'desc': 'Preparatory procedures'},
  {'number': 2, 'name': 'Nasya Therapy', 'status': 'in_progress', 'desc': 'Main therapeutic phase'},
  {'number': 3, 'name': 'Paschatkarma', 'status': 'scheduled', 'desc': 'Post-treatment care'},
];

class MyTreatmentScreen extends StatelessWidget {
  const MyTreatmentScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        title: const Text('My Treatment'),
        backgroundColor: AppColors.primary,
        automaticallyImplyLeading: false,
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Plan header
            Container(
              width: double.infinity,
              padding: const EdgeInsets.all(20),
              decoration: BoxDecoration(
                gradient: const LinearGradient(begin: Alignment.topLeft, end: Alignment.bottomRight, colors: [Color(0xFF1A5C38), Color(0xFF2E7D52)]),
                borderRadius: BorderRadius.circular(16),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text('Nasya Therapy Course', style: TextStyle(fontFamily: 'PlayfairDisplay', fontSize: 20, fontWeight: FontWeight.w700, color: Colors.white)),
                  const SizedBox(height: 6),
                  const Text('Started: 01 Jun 2026  ·  Est. End: 28 Jun 2026', style: TextStyle(fontFamily: 'DMSans', fontSize: 12, color: Color(0xCCFFFFFF))),
                  const SizedBox(height: 14),
                  ClipRRect(
                    borderRadius: BorderRadius.circular(999),
                    child: LinearProgressIndicator(
                      value: 0.33,
                      minHeight: 10,
                      backgroundColor: Colors.white24,
                      valueColor: const AlwaysStoppedAnimation<Color>(AppColors.accentGold),
                    ),
                  ),
                  const SizedBox(height: 6),
                  const Text('33% Overall Complete', style: TextStyle(fontFamily: 'JetBrainsMono', fontSize: 12, color: AppColors.accentGold)),
                ],
              ),
            ),
            const SizedBox(height: 20),
            const Text('Phase Timeline', style: TextStyle(fontFamily: 'DMSans', fontSize: 15, fontWeight: FontWeight.w600, color: AppColors.onSurface)),
            const SizedBox(height: 14),

            // Phase timeline
            ...List.generate(_phases.length, (i) {
              final phase = _phases[i];
              final status = phase['status'] as String;
              final isLast = i == _phases.length - 1;
              return IntrinsicHeight(
                child: Row(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    // Timeline indicator
                    Column(
                      children: [
                        Container(
                          width: 32,
                          height: 32,
                          decoration: BoxDecoration(
                            shape: BoxShape.circle,
                            color: status == 'completed' ? AppColors.primary : status == 'in_progress' ? AppColors.accentGold : AppColors.outlineVariant,
                          ),
                          child: Center(
                            child: status == 'completed'
                                ? const Icon(Icons.check, color: Colors.white, size: 16)
                                : status == 'in_progress'
                                    ? const Icon(Icons.play_arrow, color: Colors.white, size: 16)
                                    : Text('${phase['number']}', style: const TextStyle(color: Colors.white, fontSize: 13, fontWeight: FontWeight.w700)),
                          ),
                        ),
                        if (!isLast) Expanded(child: Container(width: 2, color: AppColors.outlineVariant, margin: const EdgeInsets.symmetric(vertical: 4))),
                      ],
                    ),
                    const SizedBox(width: 14),
                    // Phase card
                    Expanded(
                      child: GestureDetector(
                        onTap: () => context.push('/treatment/phase/${i + 1}'),
                        child: Container(
                          margin: EdgeInsets.only(bottom: isLast ? 0 : 14),
                          padding: const EdgeInsets.all(16),
                          decoration: BoxDecoration(
                            color: AppColors.surface,
                            borderRadius: BorderRadius.circular(12),
                            border: Border.all(color: status == 'in_progress' ? AppColors.primary : const Color(0xFFD4E8D8), width: status == 'in_progress' ? 2 : 1),
                          ),
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Row(
                                children: [
                                  Text('Phase ${phase['number']}', style: const TextStyle(fontFamily: 'JetBrainsMono', fontSize: 11, color: AppColors.outline)),
                                  const Spacer(),
                                  Container(
                                    padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                                    decoration: BoxDecoration(
                                      color: status == 'completed' ? AppColors.confirmedBg : status == 'in_progress' ? const Color(0xFFFFF8E1) : const Color(0xFFF5F5F5),
                                      borderRadius: BorderRadius.circular(999),
                                    ),
                                    child: Text(
                                      status == 'completed' ? 'Completed ✓' : status == 'in_progress' ? 'In Progress' : 'Scheduled',
                                      style: TextStyle(
                                        fontSize: 10,
                                        fontWeight: FontWeight.w600,
                                        color: status == 'completed' ? AppColors.confirmed : status == 'in_progress' ? AppColors.pending : AppColors.outline,
                                      ),
                                    ),
                                  ),
                                ],
                              ),
                              const SizedBox(height: 6),
                              Text(phase['name'] as String, style: const TextStyle(fontFamily: 'DMSans', fontSize: 15, fontWeight: FontWeight.w600, color: AppColors.onSurface)),
                              const SizedBox(height: 4),
                              Text(phase['desc'] as String, style: const TextStyle(fontFamily: 'DMSans', fontSize: 13, color: AppColors.outline)),
                              if (status == 'in_progress') ...[
                                const SizedBox(height: 10),
                                ClipRRect(
                                  borderRadius: BorderRadius.circular(999),
                                  child: const LinearProgressIndicator(
                                    value: 0.5,
                                    minHeight: 6,
                                    backgroundColor: Color(0xFFE1F2E8),
                                    valueColor: AlwaysStoppedAnimation<Color>(AppColors.primary),
                                  ),
                                ),
                                const SizedBox(height: 8),
                                const Text('View Full Phase Details →', style: TextStyle(fontFamily: 'DMSans', fontSize: 12, color: AppColors.primary, fontWeight: FontWeight.w600)),
                              ],
                            ],
                          ),
                        ),
                      ),
                    ),
                  ],
                ),
              );
            }),
          ],
        ),
      ),
    );
  }
}
