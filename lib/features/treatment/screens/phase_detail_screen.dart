import 'package:flutter/material.dart';
import '../../../core/theme/app_colors.dart';

class PhaseDetailScreen extends StatelessWidget {
  final String phaseId;
  const PhaseDetailScreen({super.key, required this.phaseId});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(title: const Text('Phase 2: Nasya Therapy'), backgroundColor: AppColors.background),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Status
            Row(
              children: [
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 5),
                  decoration: BoxDecoration(color: AppColors.surfaceTint, borderRadius: BorderRadius.circular(20)),
                  child: const Text('IN PROGRESS', style: TextStyle(fontSize: 12, fontWeight: FontWeight.w700, color: AppColors.primary)),
                ),
                const SizedBox(width: 8),
                const Text('Phase 2 of 3', style: TextStyle(fontSize: 13, color: AppColors.onSurfaceVariant)),
              ],
            ),
            const SizedBox(height: 16),
            const Text('Phase Goal', style: TextStyle(fontFamily: 'PlayfairDisplay', fontSize: 18, fontWeight: FontWeight.w700, color: AppColors.primaryDark)),
            const SizedBox(height: 8),
            const Text('Clear nasal passages, reduce inflammation, and restore proper Prana flow using medicated oil therapy administered through the nasal passages.',
              style: TextStyle(fontSize: 14, color: AppColors.onSurfaceVariant, height: 1.6)),
            const SizedBox(height: 24),
            _sectionHeader(Icons.assignment_outlined, 'What Will Be Done'),
            const SizedBox(height: 12),
            ..._procedures.asMap().entries.map((e) => Padding(
              padding: const EdgeInsets.only(bottom: 10),
              child: Row(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Container(
                    width: 24, height: 24, margin: const EdgeInsets.only(right: 10, top: 1),
                    decoration: const BoxDecoration(color: AppColors.primary, shape: BoxShape.circle),
                    child: Center(child: Text('${e.key + 1}', style: const TextStyle(fontSize: 12, fontWeight: FontWeight.w700, color: Colors.white))),
                  ),
                  Expanded(child: Text(e.value, style: const TextStyle(fontSize: 14, color: AppColors.onSurface, height: 1.5))),
                ],
              ),
            )),
            const SizedBox(height: 24),
            _sectionHeader(Icons.medication_outlined, 'Prescribed Medicines'),
            const SizedBox(height: 12),
            ..._medicines.map((m) => Container(
              margin: const EdgeInsets.only(bottom: 10),
              padding: const EdgeInsets.all(14),
              decoration: BoxDecoration(color: AppColors.surface, borderRadius: BorderRadius.circular(10), border: Border.all(color: const Color(0xFFD4E8D8), width: 1.5)),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(m['name']!, style: const TextStyle(fontWeight: FontWeight.w700, fontSize: 15, color: AppColors.onSurface)),
                  const SizedBox(height: 4),
                  Text('${m["dosage"]} • ${m["frequency"]} • ${m["timing"]}', style: const TextStyle(fontSize: 13, color: AppColors.onSurfaceVariant)),
                ],
              ),
            )),
            const SizedBox(height: 24),
            _sectionHeader(Icons.restaurant_menu_outlined, 'Diet Guidelines'),
            const SizedBox(height: 12),
            _DietSection(title: 'To Consume', items: _consume, positive: true),
            const SizedBox(height: 12),
            _DietSection(title: 'To Avoid', items: _avoid, positive: false),
            const SizedBox(height: 24),
            _sectionHeader(Icons.attachment_outlined, 'Prescription Documents'),
            const SizedBox(height: 12),
            ...List.generate(2, (i) => Container(
              margin: const EdgeInsets.only(bottom: 10),
              padding: const EdgeInsets.all(14),
              decoration: BoxDecoration(color: AppColors.surface, borderRadius: BorderRadius.circular(10), border: Border.all(color: const Color(0xFFD4E8D8), width: 1.5)),
              child: Row(
                children: [
                  const Icon(Icons.picture_as_pdf_outlined, color: AppColors.error, size: 28),
                  const SizedBox(width: 12),
                  Expanded(child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text('Prescription_Phase2_${i + 1}.pdf', style: const TextStyle(fontWeight: FontWeight.w600, fontSize: 14)),
                      const Text('Uploaded by Dr. APJ Sharma', style: TextStyle(fontSize: 12, color: AppColors.onSurfaceVariant)),
                    ],
                  )),
                  const Icon(Icons.download_outlined, color: AppColors.primary, size: 22),
                ],
              ),
            )),
            const SizedBox(height: 24),
          ],
        ),
      ),
    );
  }

  Widget _sectionHeader(IconData icon, String title) => Row(
    children: [
      Icon(icon, color: AppColors.primary, size: 20),
      const SizedBox(width: 8),
      Text(title, style: const TextStyle(fontSize: 16, fontWeight: FontWeight.w700, color: AppColors.onSurface)),
    ],
  );

  static const _procedures = [
    'Preliminary gentle face massage with warm sesame oil for 10 minutes.',
    'Steam inhalation to open nasal passages — 5 minutes.',
    'Administration of Anu Thailam oil drops (2 drops each nostril).',
    'Nasya massage on forehead, nose, and neck — 5 minutes.',
    'Rest period of 20 minutes in supine position.',
    'Warm water gargling to complete the session.',
  ];

  static const _medicines = [
    {'name': 'Anu Thailam', 'dosage': '2 drops each nostril', 'frequency': 'Twice daily', 'timing': 'Morning & Evening'},
    {'name': 'Kanchanara Guggulu', 'dosage': '2 tablets', 'frequency': 'Twice daily', 'timing': 'After food'},
    {'name': 'Chyawanprash', 'dosage': '1 teaspoon', 'frequency': 'Once daily', 'timing': 'Morning with warm milk'},
  ];

  static const _consume = ['Warm water throughout the day', 'Ginger tea', 'Light vegetable soups', 'Rice and moong dal', 'Fresh fruits (no citrus)'];
  static const _avoid = ['Cold beverages and ice cream', 'Dairy products', 'Heavy fried food', 'Citrus fruits', 'Exposure to cold/AC'];
}

class _DietSection extends StatelessWidget {
  final String title;
  final List<String> items;
  final bool positive;
  const _DietSection({required this.title, required this.items, required this.positive});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(14),
      decoration: BoxDecoration(
        color: positive ? const Color(0xFFF0FAF4) : const Color(0xFFFFF5F5),
        borderRadius: BorderRadius.circular(10),
        border: Border.all(color: positive ? const Color(0xFFBBDDCA) : const Color(0xFFFFCDD2), width: 1.5),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(title, style: TextStyle(fontWeight: FontWeight.w700, fontSize: 14, color: positive ? AppColors.primary : AppColors.error)),
          const SizedBox(height: 8),
          ...items.map((item) => Padding(
            padding: const EdgeInsets.symmetric(vertical: 3),
            child: Row(
              children: [
                Icon(positive ? Icons.check_circle_outline : Icons.cancel_outlined, size: 16, color: positive ? AppColors.primary : AppColors.error),
                const SizedBox(width: 8),
                Expanded(child: Text(item, style: const TextStyle(fontSize: 13, color: AppColors.onSurface))),
              ],
            ),
          )),
        ],
      ),
    );
  }
}
