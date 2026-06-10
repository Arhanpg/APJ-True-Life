import 'package:flutter/material.dart';
import '../../../core/theme/app_theme.dart';

class TreatmentArchiveScreen extends StatelessWidget {
  const TreatmentArchiveScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(title: const Text('Completed Treatments', style: TextStyle(fontFamily: 'PlayfairDisplay', fontWeight: FontWeight.bold))),
      body: ListView(
        padding: const EdgeInsets.all(20),
        children: [
          Container(
            padding: const EdgeInsets.all(14),
            decoration: BoxDecoration(
              color: const Color(0xFFFFF8E1),
              borderRadius: BorderRadius.circular(12),
              border: Border.all(color: AppColors.accentGold.withOpacity(0.5)),
            ),
            child: const Row(
              children: [
                Icon(Icons.info_outline, color: AppColors.accentGold, size: 18),
                SizedBox(width: 10),
                Expanded(child: Text('Chat messages are deleted when a treatment is marked as complete.', style: TextStyle(fontSize: 13, color: Color(0xFF7A5E00)))),
              ],
            ),
          ),
          const SizedBox(height: 32),
          const Center(
            child: Column(
              children: [
                Icon(Icons.inventory_2_outlined, size: 64, color: AppColors.outlineVariant),
                SizedBox(height: 16),
                Text('No completed treatments', style: TextStyle(fontSize: 16, fontWeight: FontWeight.w600, color: AppColors.onSurfaceVariant)),
                SizedBox(height: 8),
                Text('Completed treatment plans will appear here.', style: TextStyle(fontSize: 13, color: AppColors.outline)),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
