import 'package:flutter/material.dart';
import '../../../../core/theme/app_colors.dart';

class PhaseDetailScreen extends StatelessWidget {
  final String phaseId;
  const PhaseDetailScreen({super.key, required this.phaseId});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        title: const Text('Phase Detail', style: TextStyle(fontWeight: FontWeight.bold)),
        backgroundColor: AppColors.primary,
        elevation: 0,
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Phase header
            Container(
              padding: const EdgeInsets.all(18),
              decoration: BoxDecoration(
                color: Colors.white, borderRadius: BorderRadius.circular(14),
                border: Border.all(color: AppColors.outlineVariant),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    children: [
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                        decoration: BoxDecoration(color: const Color(0xFF1A5C38), borderRadius: BorderRadius.circular(20)),
                        child: Text('Phase $phaseId', style: const TextStyle(color: Colors.white, fontSize: 11, fontWeight: FontWeight.w700)),
                      ),
                      const SizedBox(width: 8),
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                        decoration: BoxDecoration(color: const Color(0xFFFFF8E1), borderRadius: BorderRadius.circular(20)),
                        child: const Text('In Progress', style: TextStyle(color: Color(0xFFF59E0B), fontSize: 11, fontWeight: FontWeight.w700)),
                      ),
                    ],
                  ),
                  const SizedBox(height: 12),
                  const Text('Nasya Therapy', style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold, color: AppColors.primaryDark)),
                  const SizedBox(height: 6),
                  const Text('Goal: Eliminate Kapha dosha imbalance through medicated nasal oil administration', style: TextStyle(fontSize: 13, color: AppColors.textMuted, height: 1.4)),
                ],
              ),
            ),
            const SizedBox(height: 20),

            // Procedures
            _sectionHeader('What Will Be Done'),
            const SizedBox(height: 10),
            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(12), border: Border.all(color: AppColors.outlineVariant)),
              child: Column(
                children: [
                  _procedureStep(1, 'Nasya oil (Anu Thailam) preparation and warming'),
                  _procedureStep(2, 'Patient positioned with head tilted back'),
                  _procedureStep(3, '2 drops administered in each nostril'),
                  _procedureStep(4, '20-minute rest in supine position'),
                  _procedureStep(5, 'Follow-up steam inhalation'),
                ],
              ),
            ),
            const SizedBox(height: 20),

            // Medicines
            _sectionHeader('Prescribed Medicines'),
            const SizedBox(height: 10),
            ..._medicines.map(_MedicineCard.new),
            const SizedBox(height: 20),

            // Diet guidelines
            _sectionHeader('Diet Guidelines'),
            const SizedBox(height: 10),
            Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Expanded(
                  child: _DietSection(
                    title: 'To Consume',
                    icon: '✓',
                    color: AppColors.primary,
                    bgColor: AppColors.confirmedBg,
                    items: const ['Warm water', 'Ginger tea', 'Khichdi', 'Steamed vegetables', 'Light soups'],
                  ),
                ),
                const SizedBox(width: 10),
                Expanded(
                  child: _DietSection(
                    title: 'To Avoid',
                    icon: '✗',
                    color: AppColors.error,
                    bgColor: const Color(0xFFFFEBEE),
                    items: const ['Cold foods', 'Dairy products', 'Raw vegetables', 'Heavy meals', 'Spicy food'],
                  ),
                ),
              ],
            ),
            const SizedBox(height: 20),

            // Prescription warning
            Container(
              padding: const EdgeInsets.all(14),
              decoration: BoxDecoration(
                color: const Color(0xFFFFF8E1),
                borderRadius: BorderRadius.circular(10),
                border: Border.all(color: const Color(0xFFF59E0B).withOpacity(0.3)),
              ),
              child: Row(
                children: const [
                  Icon(Icons.info_outline, color: Color(0xFFF59E0B), size: 18),
                  SizedBox(width: 10),
                  Expanded(child: Text('Chat messages will be deleted when treatment is completed.', style: TextStyle(fontSize: 12, color: Color(0xFF856404), height: 1.4))),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _sectionHeader(String title) =>
    Text(title, style: const TextStyle(fontSize: 15, fontWeight: FontWeight.bold, color: AppColors.primaryDark));

  Widget _procedureStep(int n, String text) => Padding(
    padding: const EdgeInsets.only(bottom: 10),
    child: Row(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Container(
          width: 24, height: 24,
          decoration: BoxDecoration(color: AppColors.surfaceTint, shape: BoxShape.circle),
          child: Center(child: Text('$n', style: const TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: AppColors.primary))),
        ),
        const SizedBox(width: 10),
        Expanded(child: Padding(
          padding: const EdgeInsets.only(top: 3),
          child: Text(text, style: const TextStyle(fontSize: 13, color: AppColors.textSecondary, height: 1.4)),
        )),
      ],
    ),
  );

  static const _medicines = [
    (name: 'Anu Thailam', dosage: '2 drops', freq: 'Morning only', timing: 'Empty stomach', route: 'Nasal'),
    (name: 'Kanchanara Guggulu', dosage: '2 tablets', freq: 'Twice daily', timing: 'After food', route: 'Oral'),
    (name: 'Shadbindu Taila', dosage: '4 drops', freq: 'Once daily', timing: 'Bedtime', route: 'Nasal'),
  ];
}

class _MedicineCard extends StatelessWidget {
  final ({String name, String dosage, String freq, String timing, String route}) medicine;
  const _MedicineCard(this.medicine);

  @override
  Widget build(BuildContext context) => Container(
    margin: const EdgeInsets.only(bottom: 10),
    padding: const EdgeInsets.all(14),
    decoration: BoxDecoration(
      color: Colors.white, borderRadius: BorderRadius.circular(12),
      border: Border.all(color: AppColors.outlineVariant),
    ),
    child: Row(
      children: [
        Container(
          padding: const EdgeInsets.all(10),
          decoration: BoxDecoration(color: AppColors.surfaceTint, borderRadius: BorderRadius.circular(10)),
          child: const Text('💊', style: TextStyle(fontSize: 20)),
        ),
        const SizedBox(width: 12),
        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(medicine.name, style: const TextStyle(fontSize: 14, fontWeight: FontWeight.bold, color: AppColors.primaryDark)),
              const SizedBox(height: 4),
              Text('${medicine.dosage} · ${medicine.freq} · ${medicine.timing}', style: const TextStyle(fontSize: 12, color: AppColors.textMuted)),
            ],
          ),
        ),
        Container(
          padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
          decoration: BoxDecoration(color: AppColors.surfaceTint, borderRadius: BorderRadius.circular(6)),
          child: Text(medicine.route, style: const TextStyle(fontSize: 10, fontWeight: FontWeight.w600, color: AppColors.primary)),
        ),
      ],
    ),
  );
}

class _DietSection extends StatelessWidget {
  final String title, icon;
  final Color color, bgColor;
  final List<String> items;
  const _DietSection({required this.title, required this.icon, required this.color, required this.bgColor, required this.items});

  @override
  Widget build(BuildContext context) => Container(
    padding: const EdgeInsets.all(14),
    decoration: BoxDecoration(color: bgColor, borderRadius: BorderRadius.circular(12)),
    child: Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(title, style: TextStyle(fontSize: 13, fontWeight: FontWeight.bold, color: color)),
        const SizedBox(height: 10),
        ...items.map((item) => Padding(
          padding: const EdgeInsets.only(bottom: 6),
          child: Row(children: [
            Text(icon, style: TextStyle(color: color, fontWeight: FontWeight.bold, fontSize: 12)),
            const SizedBox(width: 6),
            Expanded(child: Text(item, style: const TextStyle(fontSize: 12, color: AppColors.textSecondary))),
          ]),
        )),
      ],
    ),
  );
}
