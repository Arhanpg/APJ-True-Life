import 'package:flutter/material.dart';
import '../../../../core/theme/app_colors.dart';

class PhaseDetailScreen extends StatelessWidget {
  final String phaseId;
  const PhaseDetailScreen({super.key, required this.phaseId});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(title: const Text('Phase Details'), backgroundColor: AppColors.primary),
      body: ListView(
        padding: const EdgeInsets.all(20),
        children: [
          // Phase status chip
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
            decoration: BoxDecoration(
              color: const Color(0xFFEAF4EC),
              borderRadius: BorderRadius.circular(20),
            ),
            child: const Text('IN PROGRESS',
              style: TextStyle(color: AppColors.primary, fontFamily: 'DMSans',
                  fontSize: 12, fontWeight: FontWeight.w600)),
          ),
          const SizedBox(height: 20),
          const Text('Phase Details', style: TextStyle(fontFamily: 'PlayfairDisplay',
              fontSize: 22, fontWeight: FontWeight.bold, color: AppColors.primaryDark)),
          const SizedBox(height: 20),
          _SectionCard(title: 'What Will Be Done', icon: '\ud83d\udcdd', children: [
            _StepItem(number: 1, text: 'Step details will appear here once your doctor sets up the phase.'),
          ]),
          const SizedBox(height: 16),
          _SectionCard(title: 'Medicines', icon: '\ud83d\udc8a', children: [
            const Text('No medicines prescribed yet.',
              style: TextStyle(fontFamily: 'DMSans', fontSize: 14, color: AppColors.onSurfaceVariant)),
          ]),
          const SizedBox(height: 16),
          _SectionCard(title: 'Diet Guidelines', icon: '\ud83e\udd57', children: [
            const Text('To Consume',
              style: TextStyle(fontFamily: 'DMSans', fontWeight: FontWeight.w600, color: AppColors.primary)),
            const SizedBox(height: 8),
            const Text('No diet guidelines yet.',
              style: TextStyle(fontFamily: 'DMSans', fontSize: 14, color: AppColors.onSurfaceVariant)),
          ]),
        ],
      ),
    );
  }
}

class _SectionCard extends StatelessWidget {
  final String title, icon;
  final List<Widget> children;
  const _SectionCard({required this.title, required this.icon, required this.children});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: AppColors.outlineVariant),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Text(icon, style: const TextStyle(fontSize: 18)),
              const SizedBox(width: 8),
              Text(title, style: const TextStyle(fontFamily: 'DMSans', fontSize: 15,
                  fontWeight: FontWeight.w600, color: AppColors.onSurface)),
            ],
          ),
          const SizedBox(height: 12),
          ...children,
        ],
      ),
    );
  }
}

class _StepItem extends StatelessWidget {
  final int number;
  final String text;
  const _StepItem({required this.number, required this.text});

  @override
  Widget build(BuildContext context) {
    return Row(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        CircleAvatar(radius: 12, backgroundColor: AppColors.primary,
          child: Text('$number', style: const TextStyle(color: Colors.white, fontSize: 11))),
        const SizedBox(width: 10),
        Expanded(
          child: Text(text, style: const TextStyle(fontFamily: 'DMSans', fontSize: 14, color: AppColors.onSurface)),
        ),
      ],
    );
  }
}
