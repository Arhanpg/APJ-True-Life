import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../../../core/theme/app_colors.dart';

class TreatmentScreen extends StatelessWidget {
  const TreatmentScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(title: const Text('My Treatment'), centerTitle: true),
      body: ListView(
        padding: const EdgeInsets.all(20),
        children: [
          // Empty state
          Container(
            padding: const EdgeInsets.all(32),
            decoration: BoxDecoration(
              color: AppColors.surface,
              borderRadius: BorderRadius.circular(16),
              border: Border.all(color: AppColors.outlineVariant),
            ),
            child: Column(
              children: [
                const Text('🌿', style: TextStyle(fontSize: 56)),
                const SizedBox(height: 16),
                const Text('No Active Treatment', style: TextStyle(fontWeight: FontWeight.w700, fontSize: 18, color: AppColors.primaryDark)),
                const SizedBox(height: 8),
                const Text('Your doctor will assign a treatment plan after consultation.', style: TextStyle(color: AppColors.onSurfaceVariant, height: 1.5), textAlign: TextAlign.center),
                const SizedBox(height: 24),
                ElevatedButton(
                  style: ElevatedButton.styleFrom(minimumSize: const Size(0, 44)),
                  onPressed: () => context.go('/appointments'),
                  child: const Text('Book a Consultation'),
                ),
              ],
            ),
          ),
          const SizedBox(height: 24),
          const Text('Completed Treatments', style: TextStyle(fontWeight: FontWeight.w700, fontSize: 16, color: AppColors.primaryDark)),
          const SizedBox(height: 12),
          Container(
            padding: const EdgeInsets.all(20),
            decoration: BoxDecoration(
              color: AppColors.surface,
              borderRadius: BorderRadius.circular(12),
              border: Border.all(color: AppColors.outlineVariant),
            ),
            child: const Center(
              child: Text('No completed treatments yet', style: TextStyle(color: AppColors.outline)),
            ),
          ),
        ],
      ),
    );
  }
}
