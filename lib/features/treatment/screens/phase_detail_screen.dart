import 'package:flutter/material.dart';
import '../../../core/theme/app_colors.dart';
import '../../../core/widgets/section_card.dart';
import '../../../core/widgets/status_chip.dart';

class PhaseDetailScreen extends StatelessWidget {
  final String phaseId;
  const PhaseDetailScreen({super.key, required this.phaseId});

  @override
  Widget build(BuildContext context) {
    final isPhase2 = phaseId == '2';
    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        title: Text('Phase $phaseId Details'),
        backgroundColor: AppColors.surface,
        elevation: 0,
        bottom: PreferredSize(
          preferredSize: const Size.fromHeight(1),
          child: Container(height: 1, color: AppColors.surfaceTint),
        ),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Phase header
            SectionCard(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    children: [
                      Container(
                        width: 44, height: 44,
                        decoration: BoxDecoration(
                          color: AppColors.primary,
                          borderRadius: BorderRadius.circular(12),
                        ),
                        child: Center(child: Text('P$phaseId', style: const TextStyle(color: Colors.white, fontWeight: FontWeight.w700, fontSize: 14))),
                      ),
                      const SizedBox(width: 12),
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(isPhase2 ? 'Nasya Therapy' : phaseId == '1' ? 'Purvakarma' : 'Paschatkarma',
                              style: const TextStyle(fontFamily: 'PlayfairDisplay', fontSize: 18, fontWeight: FontWeight.w700, color: AppColors.primaryDark)),
                            const SizedBox(height: 4),
                            Text(isPhase2 ? 'Day 7 of 14' : phaseId == '1' ? 'Completed · 7 days' : 'Scheduled',
                              style: const TextStyle(fontSize: 13, color: AppColors.outline)),
                          ],
                        ),
                      ),
                      StatusChip(status: isPhase2 ? ChipStatus.inProgress : phaseId == '1' ? ChipStatus.completed : ChipStatus.scheduled),
                    ],
                  ),
                  if (isPhase2) ...[
                    const SizedBox(height: 14),
                    const Text('Phase Goal', style: TextStyle(fontSize: 12, fontWeight: FontWeight.w600, color: AppColors.outline, letterSpacing: 0.5)),
                    const SizedBox(height: 4),
                    const Text('Clear nasal pathways, improve absorption of medicated oils, balance Vata and Kapha doshas.',
                      style: TextStyle(fontSize: 14, color: AppColors.onSurface, height: 1.5)),
                  ],
                ],
              ),
            ),
            const SizedBox(height: 16),

            // Warning banner
            Container(
              padding: const EdgeInsets.all(12),
              decoration: BoxDecoration(
                color: const Color(0xFFFFF8E1),
                borderRadius: BorderRadius.circular(12),
                border: Border.all(color: const Color(0xFFFFCA28), width: 1),
              ),
              child: const Row(
                children: [
                  Icon(Icons.info_outline, color: Color(0xFFF57F17), size: 18),
                  SizedBox(width: 10),
                  Expanded(child: Text('Chat messages will be deleted when treatment is completed.',
                    style: TextStyle(fontSize: 12, color: Color(0xFFF57F17)))),
                ],
              ),
            ),
            const SizedBox(height: 16),

            // Procedures
            SectionCard(
              title: 'What Will Be Done',
              child: Column(
                children: const [
                  _ProcedureItem(number: 1, text: 'Prepare Anu Thailam (medicated sesame oil) at body temperature.'),
                  _ProcedureItem(number: 2, text: 'Patient lies down with neck slightly extended.'),
                  _ProcedureItem(number: 3, text: 'Administer 2 drops of oil in each nostril.'),
                  _ProcedureItem(number: 4, text: 'Gentle nasal massage for 5 minutes post-administration.'),
                  _ProcedureItem(number: 5, text: 'Rest for 15 minutes in supine position.'),
                ],
              ),
            ),
            const SizedBox(height: 16),

            // Medicines
            SectionCard(
              title: 'Prescribed Medicines',
              child: Column(
                children: const [
                  _MedicineItem(name: 'Anu Thailam', dosage: '2 drops', frequency: 'Morning', timing: 'Empty stomach'),
                  Divider(color: AppColors.surfaceTint),
                  _MedicineItem(name: 'Kanchanara Guggulu', dosage: '2 tablets', frequency: 'Twice daily', timing: 'After food'),
                  Divider(color: AppColors.surfaceTint),
                  _MedicineItem(name: 'Triphala Churna', dosage: '5g', frequency: 'Once at night', timing: 'With warm water'),
                ],
              ),
            ),
            const SizedBox(height: 16),

            // Diet guidelines
            SectionCard(
              title: 'Diet Guidelines',
              child: Row(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Row(children: const [
                          Icon(Icons.check_circle, color: AppColors.primary, size: 16),
                          SizedBox(width: 6),
                          Text('Consume', style: TextStyle(fontSize: 13, fontWeight: FontWeight.w700, color: AppColors.primary)),
                        ]),
                        const SizedBox(height: 10),
                        ...[' Warm water', ' Ginger tea', ' Steamed vegetables', ' Light khichdi'].map((e) =>
                          Padding(
                            padding: const EdgeInsets.only(bottom: 6),
                            child: Text(e, style: const TextStyle(fontSize: 13, color: AppColors.onSurface)),
                          )),
                      ],
                    ),
                  ),
                  const VerticalDivider(color: AppColors.surfaceTint),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Row(children: const [
                          Icon(Icons.cancel, color: AppColors.error, size: 16),
                          SizedBox(width: 6),
                          Text('Avoid', style: TextStyle(fontSize: 13, fontWeight: FontWeight.w700, color: AppColors.error)),
                        ]),
                        const SizedBox(height: 10),
                        ...[' Cold foods', ' Dairy', ' Spicy food', ' Late nights'].map((e) =>
                          Padding(
                            padding: const EdgeInsets.only(bottom: 6),
                            child: Text(e, style: const TextStyle(fontSize: 13, color: AppColors.onSurface)),
                          )),
                      ],
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 32),
          ],
        ),
      ),
    );
  }
}

class _ProcedureItem extends StatelessWidget {
  final int number;
  final String text;
  const _ProcedureItem({required this.number, required this.text});
  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 12),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Container(
            width: 24, height: 24,
            decoration: const BoxDecoration(color: AppColors.surfaceTint, shape: BoxShape.circle),
            child: Center(child: Text('$number', style: const TextStyle(fontSize: 12, fontWeight: FontWeight.w700, color: AppColors.primary))),
          ),
          const SizedBox(width: 10),
          Expanded(child: Text(text, style: const TextStyle(fontSize: 14, color: AppColors.onSurface, height: 1.4))),
        ],
      ),
    );
  }
}

class _MedicineItem extends StatelessWidget {
  final String name, dosage, frequency, timing;
  const _MedicineItem({required this.name, required this.dosage, required this.frequency, required this.timing});
  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 8),
      child: Row(
        children: [
          Container(
            padding: const EdgeInsets.all(8),
            decoration: BoxDecoration(color: AppColors.surfaceTint, borderRadius: BorderRadius.circular(8)),
            child: const Icon(Icons.medication, color: AppColors.primary, size: 20),
          ),
          const SizedBox(width: 12),
          Expanded(child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(name, style: const TextStyle(fontSize: 14, fontWeight: FontWeight.w700, color: AppColors.onSurface)),
              Text('$dosage · $frequency · $timing', style: const TextStyle(fontSize: 12, color: AppColors.outline)),
            ],
          )),
        ],
      ),
    );
  }
}
