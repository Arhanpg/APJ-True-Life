import 'package:flutter/material.dart';
import '../../../core/theme/app_colors.dart';

class PhaseDetailScreen extends StatelessWidget {
  final String phaseId;
  const PhaseDetailScreen({super.key, required this.phaseId});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(title: const Text('Phase Details'), centerTitle: true),
      body: ListView(
        padding: const EdgeInsets.all(20),
        children: [
          _SectionCard(
            title: 'Phase Status',
            child: Chip(
              label: const Text('IN PROGRESS', style: TextStyle(color: AppColors.primary, fontWeight: FontWeight.w600, fontSize: 12)),
              backgroundColor: AppColors.surfaceTint,
              side: const BorderSide(color: AppColors.primary),
            ),
          ),
          _SectionCard(
            title: 'Procedures',
            child: const Text('No procedures added yet.', style: TextStyle(color: AppColors.outline)),
          ),
          _SectionCard(
            title: 'Medicines',
            child: const Text('No medicines prescribed yet.', style: TextStyle(color: AppColors.outline)),
          ),
          _SectionCard(
            title: 'Diet Guidelines',
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                _DietRow(icon: Icons.check_circle, color: AppColors.success, label: 'To Consume', items: const []),
                const SizedBox(height: 12),
                _DietRow(icon: Icons.cancel, color: AppColors.error, label: 'To Avoid', items: const []),
              ],
            ),
          ),
          _SectionCard(
            title: 'Documents',
            child: const Text('No documents uploaded.', style: TextStyle(color: AppColors.outline)),
          ),
        ],
      ),
    );
  }
}

class _SectionCard extends StatelessWidget {
  final String title;
  final Widget child;
  const _SectionCard({required this.title, required this.child});

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.only(bottom: 16),
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: AppColors.surface,
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: AppColors.outlineVariant),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(title, style: const TextStyle(fontWeight: FontWeight.w700, fontSize: 14, color: AppColors.primaryDark)),
          const SizedBox(height: 12),
          child,
        ],
      ),
    );
  }
}

class _DietRow extends StatelessWidget {
  final IconData icon;
  final Color color;
  final String label;
  final List<String> items;
  const _DietRow({required this.icon, required this.color, required this.label, required this.items});

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(children: [
          Icon(icon, color: color, size: 16),
          const SizedBox(width: 6),
          Text(label, style: TextStyle(color: color, fontWeight: FontWeight.w600, fontSize: 13)),
        ]),
        const SizedBox(height: 6),
        items.isEmpty
            ? Text('None added', style: TextStyle(color: color.withOpacity(0.6), fontSize: 13))
            : Column(children: items.map((i) => Text('• $i')).toList()),
      ],
    );
  }
}
