import 'package:flutter/material.dart';
import '../../../core/theme/app_colors.dart';

class PhaseDetailScreen extends StatelessWidget {
  final String phaseId;
  const PhaseDetailScreen({super.key, required this.phaseId});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        title: const Text('Phase Detail'),
        backgroundColor: AppColors.primary,
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Phase header
            Container(
              width: double.infinity,
              padding: const EdgeInsets.all(18),
              decoration: BoxDecoration(
                color: AppColors.surface,
                borderRadius: BorderRadius.circular(14),
                border: Border.all(color: const Color(0xFFD4E8D8)),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    children: [
                      Text('Phase $phaseId', style: const TextStyle(fontFamily: 'JetBrainsMono', fontSize: 12, color: AppColors.outline)),
                      const Spacer(),
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                        decoration: BoxDecoration(color: const Color(0xFFFFF8E1), borderRadius: BorderRadius.circular(999)),
                        child: const Text('In Progress', style: TextStyle(fontSize: 11, fontWeight: FontWeight.w600, color: AppColors.pending)),
                      ),
                    ],
                  ),
                  const SizedBox(height: 8),
                  const Text('Nasya Therapy', style: TextStyle(fontFamily: 'PlayfairDisplay', fontSize: 20, fontWeight: FontWeight.w700, color: AppColors.primaryDark)),
                  const SizedBox(height: 6),
                  const Text('Main therapeutic phase using medicated nasal oil administration', style: TextStyle(fontFamily: 'DMSans', fontSize: 13, color: AppColors.outline, height: 1.5)),
                ],
              ),
            ),
            const SizedBox(height: 16),

            // Procedures
            _Section(
              title: 'What Will Be Done',
              child: Column(
                children: const [
                  _ProcedureItem(num: 1, text: 'Steam inhalation for 10 minutes'),
                  _ProcedureItem(num: 2, text: 'Gentle facial massage with Anu Thailam'),
                  _ProcedureItem(num: 3, text: 'Nasal drops administration (2 drops each nostril)'),
                  _ProcedureItem(num: 4, text: 'Rest in supine position for 10 minutes post-procedure'),
                ],
              ),
            ),
            const SizedBox(height: 14),

            // Medicines
            _Section(
              title: 'Prescribed Medicines',
              child: Column(
                children: const [
                  _MedicineItem(name: 'Anu Thailam', dosage: '2 drops', frequency: 'Morning', timing: 'Empty stomach'),
                  _MedicineItem(name: 'Kanchanara Guggulu', dosage: '2 tablets', frequency: 'Twice daily', timing: 'After food'),
                  _MedicineItem(name: 'Triphala Churna', dosage: '1 tsp', frequency: 'Night', timing: 'With warm water'),
                ],
              ),
            ),
            const SizedBox(height: 14),

            // Diet Guidelines
            _Section(
              title: 'Diet Guidelines',
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text('✓ To Consume', style: TextStyle(fontFamily: 'DMSans', fontSize: 13, fontWeight: FontWeight.w600, color: AppColors.primary)),
                  const SizedBox(height: 8),
                  ...const ['Warm water throughout day', 'Ginger tea', 'Light rice-based meals', 'Sesame seeds'].map((i) => Padding(
                    padding: const EdgeInsets.only(bottom: 6),
                    child: Row(
                      children: [
                        const Icon(Icons.check_circle, color: AppColors.primary, size: 16),
                        const SizedBox(width: 8),
                        Text(i, style: const TextStyle(fontFamily: 'DMSans', fontSize: 13, color: AppColors.onSurfaceVariant)),
                      ],
                    ),
                  )),
                  const SizedBox(height: 14),
                  const Text('✗ To Avoid', style: TextStyle(fontFamily: 'DMSans', fontSize: 13, fontWeight: FontWeight.w600, color: AppColors.error)),
                  const SizedBox(height: 8),
                  ...const ['Cold water and cold drinks', 'Dairy products', 'Spicy foods', 'Exposure to cold wind'].map((i) => Padding(
                    padding: const EdgeInsets.only(bottom: 6),
                    child: Row(
                      children: [
                        const Icon(Icons.cancel, color: AppColors.error, size: 16),
                        const SizedBox(width: 8),
                        Text(i, style: const TextStyle(fontFamily: 'DMSans', fontSize: 13, color: AppColors.onSurfaceVariant)),
                      ],
                    ),
                  )),
                ],
              ),
            ),
            const SizedBox(height: 14),

            // Documents
            _Section(
              title: 'Documents',
              child: Column(
                children: const [
                  _DocItem(name: 'Prescription.pdf', type: 'PRESCRIPTION'),
                  _DocItem(name: 'Diet Chart.pdf', type: 'DIET_CHART'),
                ],
              ),
            ),
            const SizedBox(height: 20),
          ],
        ),
      ),
    );
  }
}

class _Section extends StatelessWidget {
  final String title;
  final Widget child;
  const _Section({required this.title, required this.child});

  @override
  Widget build(BuildContext context) => Container(
    padding: const EdgeInsets.all(16),
    decoration: BoxDecoration(
      color: AppColors.surface,
      borderRadius: BorderRadius.circular(14),
      border: Border.all(color: const Color(0xFFD4E8D8)),
    ),
    child: Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(title, style: const TextStyle(fontFamily: 'DMSans', fontSize: 14, fontWeight: FontWeight.w700, color: AppColors.primaryDark)),
        const Divider(height: 20, color: Color(0xFFE1F2E8)),
        child,
      ],
    ),
  );
}

class _ProcedureItem extends StatelessWidget {
  final int num;
  final String text;
  const _ProcedureItem({required this.num, required this.text});

  @override
  Widget build(BuildContext context) => Padding(
    padding: const EdgeInsets.only(bottom: 10),
    child: Row(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Container(width: 24, height: 24, decoration: BoxDecoration(color: AppColors.primary, borderRadius: BorderRadius.circular(6)), child: Center(child: Text('$num', style: const TextStyle(color: Colors.white, fontSize: 12, fontWeight: FontWeight.w700)))),
        const SizedBox(width: 10),
        Expanded(child: Text(text, style: const TextStyle(fontFamily: 'DMSans', fontSize: 13, color: AppColors.onSurfaceVariant, height: 1.5))),
      ],
    ),
  );
}

class _MedicineItem extends StatelessWidget {
  final String name;
  final String dosage;
  final String frequency;
  final String timing;
  const _MedicineItem({required this.name, required this.dosage, required this.frequency, required this.timing});

  @override
  Widget build(BuildContext context) => Container(
    margin: const EdgeInsets.only(bottom: 10),
    padding: const EdgeInsets.all(12),
    decoration: BoxDecoration(color: AppColors.surfaceTint, borderRadius: BorderRadius.circular(10)),
    child: Row(
      children: [
        const Icon(Icons.medication_outlined, color: AppColors.primary, size: 22),
        const SizedBox(width: 10),
        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(name, style: const TextStyle(fontFamily: 'DMSans', fontSize: 14, fontWeight: FontWeight.w600, color: AppColors.onSurface)),
              Text('$dosage · $frequency · $timing', style: const TextStyle(fontFamily: 'DMSans', fontSize: 12, color: AppColors.outline)),
            ],
          ),
        ),
      ],
    ),
  );
}

class _DocItem extends StatelessWidget {
  final String name;
  final String type;
  const _DocItem({required this.name, required this.type});

  @override
  Widget build(BuildContext context) => Container(
    margin: const EdgeInsets.only(bottom: 8),
    padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 10),
    decoration: BoxDecoration(
      color: AppColors.surfaceTint,
      borderRadius: BorderRadius.circular(10),
    ),
    child: Row(
      children: [
        const Icon(Icons.picture_as_pdf_outlined, color: AppColors.error, size: 22),
        const SizedBox(width: 10),
        Expanded(child: Text(name, style: const TextStyle(fontFamily: 'DMSans', fontSize: 13, color: AppColors.onSurface))),
        const Icon(Icons.download_outlined, color: AppColors.primary, size: 18),
      ],
    ),
  );
}
