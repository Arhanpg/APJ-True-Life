import 'package:flutter/material.dart';
import '../../../core/theme/app_colors.dart';

class TreatmentArchiveScreen extends StatelessWidget {
  const TreatmentArchiveScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(title: const Text('Completed Treatments'), backgroundColor: AppColors.background),
      body: Column(
        children: [
          Container(
            margin: const EdgeInsets.all(16),
            padding: const EdgeInsets.all(12),
            decoration: BoxDecoration(
              color: const Color(0xFFFFF8E1),
              borderRadius: BorderRadius.circular(8),
              border: Border.all(color: AppColors.accentGold.withOpacity(0.4)),
            ),
            child: const Row(
              children: [
                Icon(Icons.info_outline, color: AppColors.accentGold, size: 18),
                SizedBox(width: 8),
                Expanded(child: Text('Chat messages are deleted when treatment is completed.', style: TextStyle(fontSize: 13, color: Color(0xFF7A5C00)))),
              ],
            ),
          ),
          Expanded(
            child: ListView.builder(
              padding: const EdgeInsets.symmetric(horizontal: 16),
              itemCount: 2,
              itemBuilder: (_, i) => Container(
                margin: const EdgeInsets.only(bottom: 12),
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(color: AppColors.surface, borderRadius: BorderRadius.circular(12), border: Border.all(color: const Color(0xFFD4E8D8), width: 1.5)),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      children: [
                        Expanded(child: Text(i == 0 ? 'Arthritis Management — Panchakarma' : 'Digestive Wellness Course',
                          style: const TextStyle(fontWeight: FontWeight.w700, fontSize: 15, color: AppColors.onSurface))),
                        Container(padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3), decoration: BoxDecoration(color: const Color(0xFFF0F0F0), borderRadius: BorderRadius.circular(12)),
                          child: const Text('COMPLETED', style: TextStyle(fontSize: 11, fontWeight: FontWeight.w600, color: AppColors.outline))),
                      ],
                    ),
                    const SizedBox(height: 6),
                    Text(i == 0 ? 'Jan 2026 — Mar 2026' : 'Sep 2025 — Nov 2025', style: const TextStyle(fontSize: 13, color: AppColors.onSurfaceVariant)),
                    const SizedBox(height: 10),
                    ClipRRect(borderRadius: BorderRadius.circular(4), child: const LinearProgressIndicator(value: 1.0, minHeight: 6, backgroundColor: Color(0xFFE1F2E8), valueColor: AlwaysStoppedAnimation<Color>(AppColors.primary))),
                    const SizedBox(height: 4), const Text('100% complete', style: TextStyle(fontSize: 12, color: AppColors.primary, fontWeight: FontWeight.w600)),
                    const SizedBox(height: 10),
                    const Row(children: [Icon(Icons.chat_outlined, size: 14, color: AppColors.outline), SizedBox(width: 4), Text('Chat deleted upon treatment completion', style: TextStyle(fontSize: 12, color: AppColors.outline))]),
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
