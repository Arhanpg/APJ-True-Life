import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../../../core/theme/app_theme.dart';

class TreatmentOverviewScreen extends StatelessWidget {
  const TreatmentOverviewScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        title: const Text('My Treatment', style: TextStyle(fontFamily: 'PlayfairDisplay', fontWeight: FontWeight.bold)),
        actions: [
          TextButton(
            onPressed: () => context.go('/treatment/archive'),
            child: const Text('Archive', style: TextStyle(color: Colors.white)),
          ),
        ],
      ),
      body: ListView(
        padding: const EdgeInsets.all(20),
        children: [
          // Treatment header
          Container(
            padding: const EdgeInsets.all(20),
            decoration: BoxDecoration(color: AppColors.surface, borderRadius: BorderRadius.circular(16), border: Border.all(color: AppColors.outlineVariant)),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  children: [
                    Container(padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4), decoration: BoxDecoration(color: AppColors.primary.withOpacity(0.12), borderRadius: BorderRadius.circular(20)), child: const Text('ACTIVE', style: TextStyle(color: AppColors.primary, fontSize: 11, fontWeight: FontWeight.bold))),
                    const Spacer(),
                    const Text('Phase 1 of 3', style: TextStyle(color: AppColors.onSurfaceVariant, fontSize: 13)),
                  ],
                ),
                const SizedBox(height: 12),
                const Text('Awaiting Treatment Plan', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold, fontFamily: 'PlayfairDisplay', color: AppColors.primaryDark)),
                const SizedBox(height: 4),
                const Text('Start Date: —', style: TextStyle(fontSize: 13, color: AppColors.onSurfaceVariant)),
                const SizedBox(height: 16),
                const LinearProgressIndicator(value: 0, backgroundColor: Color(0xFFE1F2E8), color: AppColors.primary, minHeight: 8, borderRadius: BorderRadius.all(Radius.circular(4))),
                const SizedBox(height: 6),
                const Text('Overall Progress: 0%', style: TextStyle(fontSize: 13, color: AppColors.outline)),
              ],
            ),
          ),
          const SizedBox(height: 24),
          const Text('Treatment Phases', style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, fontFamily: 'PlayfairDisplay', color: AppColors.primaryDark)),
          const SizedBox(height: 12),
          ..._phases(context),
        ],
      ),
    );
  }

  List<Widget> _phases(BuildContext context) {
    final phases = [
      {'num': '1', 'name': 'Purvakarma', 'status': 'IN PROGRESS', 'active': true},
      {'num': '2', 'name': 'Nasya Therapy', 'status': 'SCHEDULED', 'active': false},
      {'num': '3', 'name': 'Paschatkarma', 'status': 'SCHEDULED', 'active': false},
    ];
    return phases.map((p) => GestureDetector(
      onTap: () => context.go('/treatment/phase/${p['num']}'),
      child: Container(
        margin: const EdgeInsets.only(bottom: 12),
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(
          color: AppColors.surface,
          borderRadius: BorderRadius.circular(14),
          border: Border.all(color: p['active'] == true ? AppColors.primary : AppColors.outlineVariant, width: p['active'] == true ? 1.5 : 1),
        ),
        child: Row(
          children: [
            Container(
              width: 36, height: 36,
              decoration: BoxDecoration(
                color: p['active'] == true ? AppColors.primary : AppColors.surfaceTint,
                shape: BoxShape.circle,
              ),
              child: Center(
                child: p['active'] == true
                    ? const Icon(Icons.play_arrow, color: Colors.white, size: 18)
                    : Text(p['num']!, style: TextStyle(color: p['active'] == true ? Colors.white : AppColors.outline, fontWeight: FontWeight.bold, fontSize: 14)),
              ),
            ),
            const SizedBox(width: 14),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text('Phase ${p['num']}: ${p['name']}', style: const TextStyle(fontWeight: FontWeight.w700, fontSize: 14, color: AppColors.onSurface)),
                  const SizedBox(height: 4),
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                    decoration: BoxDecoration(color: p['active'] == true ? AppColors.primary.withOpacity(0.1) : AppColors.outlineVariant.withOpacity(0.3), borderRadius: BorderRadius.circular(10)),
                    child: Text(p['status']!, style: TextStyle(fontSize: 11, color: p['active'] == true ? AppColors.primary : AppColors.outline, fontWeight: FontWeight.w600)),
                  ),
                ],
              ),
            ),
            const Icon(Icons.chevron_right, color: AppColors.outline),
          ],
        ),
      ),
    )).toList();
  }
}
