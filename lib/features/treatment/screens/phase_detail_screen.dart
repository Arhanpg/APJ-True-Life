import 'package:flutter/material.dart';
import '../../../core/theme/app_theme.dart';

class PhaseDetailScreen extends StatelessWidget {
  final String phaseId;
  const PhaseDetailScreen({super.key, required this.phaseId});

  @override
  Widget build(BuildContext context) {
    return DefaultTabController(
      length: 4,
      child: Scaffold(
        backgroundColor: AppColors.background,
        appBar: AppBar(
          title: Text('Phase $phaseId Details', style: const TextStyle(fontFamily: 'PlayfairDisplay', fontWeight: FontWeight.bold)),
          bottom: const TabBar(
            labelColor: Colors.white,
            unselectedLabelColor: Color(0xAAFFFFFF),
            indicatorColor: AppColors.accentGold,
            tabs: [
              Tab(text: 'Overview'),
              Tab(text: 'Medicines'),
              Tab(text: 'Diet'),
              Tab(text: 'Docs'),
            ],
          ),
        ),
        body: TabBarView(
          children: [
            _OverviewTab(phaseId: phaseId),
            _MedicinesTab(),
            _DietTab(),
            _DocsTab(),
          ],
        ),
      ),
    );
  }
}

class _OverviewTab extends StatelessWidget {
  final String phaseId;
  const _OverviewTab({required this.phaseId});
  @override
  Widget build(BuildContext context) {
    return ListView(
      padding: const EdgeInsets.all(20),
      children: [
        Container(padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6), decoration: BoxDecoration(color: AppColors.primary.withOpacity(0.1), borderRadius: BorderRadius.circular(20)), child: const Text('IN PROGRESS', style: TextStyle(color: AppColors.primary, fontWeight: FontWeight.bold, fontSize: 12))),
        const SizedBox(height: 16),
        Text('Phase $phaseId: Purvakarma', style: const TextStyle(fontSize: 20, fontFamily: 'PlayfairDisplay', fontWeight: FontWeight.bold, color: AppColors.primaryDark)),
        const SizedBox(height: 8),
        const Text('Preparatory procedures before the main Panchakarma therapy. Includes internal and external oleation.', style: TextStyle(fontSize: 14, color: AppColors.onSurfaceVariant, height: 1.6)),
        const SizedBox(height: 24),
        const Text('What Will Be Done', style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: AppColors.primaryDark)),
        const SizedBox(height: 12),
        ...[1, 2, 3].map((i) => Padding(
          padding: const EdgeInsets.only(bottom: 12),
          child: Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Container(width: 24, height: 24, decoration: const BoxDecoration(color: AppColors.primary, shape: BoxShape.circle), child: Center(child: Text('$i', style: const TextStyle(color: Colors.white, fontSize: 12, fontWeight: FontWeight.bold)))),
              const SizedBox(width: 12),
              const Expanded(child: Text('Abhyanga (full body oil massage) with medicated oil for 45 minutes.', style: TextStyle(fontSize: 14, color: AppColors.onSurface, height: 1.5))),
            ],
          ),
        )),
      ],
    );
  }
}

class _MedicinesTab extends StatelessWidget {
  final _meds = const [
    {'name': 'Anu Thailam', 'dosage': '2 drops', 'frequency': 'Morning', 'timing': 'Before food', 'route': 'Nasal'},
    {'name': 'Kanchanara Guggulu', 'dosage': '2 tablets', 'frequency': 'Twice daily', 'timing': 'After food', 'route': 'Oral'},
    {'name': 'Triphala Churna', 'dosage': '5g', 'frequency': 'Bedtime', 'timing': 'With warm water', 'route': 'Oral'},
  ];
  @override
  Widget build(BuildContext context) {
    return ListView(
      padding: const EdgeInsets.all(20),
      children: _meds.map((m) => Container(
        margin: const EdgeInsets.only(bottom: 12),
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(color: AppColors.surface, borderRadius: BorderRadius.circular(14), border: Border.all(color: AppColors.outlineVariant)),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(m['name']!, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 15, color: AppColors.onSurface)),
            const SizedBox(height: 8),
            Wrap(
              spacing: 8, runSpacing: 6,
              children: [
                _pill('💊 ${m['dosage']}'),
                _pill('🕐 ${m['frequency']}'),
                _pill('🍽 ${m['timing']}'),
                _pill('📍 ${m['route']}'),
              ],
            ),
          ],
        ),
      )).toList(),
    );
  }
  Widget _pill(String text) => Container(padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4), decoration: BoxDecoration(color: AppColors.surfaceTint, borderRadius: BorderRadius.circular(20)), child: Text(text, style: const TextStyle(fontSize: 12, color: AppColors.primaryDark)));
}

class _DietTab extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    const consume = ['Warm water', 'Ginger tea', 'Rice gruel', 'Steamed vegetables', 'Ghee (clarified butter)'];
    const avoid = ['Cold drinks', 'Dairy products', 'Heavy fried foods', 'Raw vegetables', 'Alcohol'];
    return ListView(
      padding: const EdgeInsets.all(20),
      children: [
        _dietSection('To Consume', consume, true),
        const SizedBox(height: 20),
        _dietSection('To Avoid', avoid, false),
      ],
    );
  }

  Widget _dietSection(String title, List<String> items, bool consume) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: consume ? AppColors.primary.withOpacity(0.05) : AppColors.error.withOpacity(0.05),
        borderRadius: BorderRadius.circular(14),
        border: Border.all(color: consume ? AppColors.primary.withOpacity(0.2) : AppColors.error.withOpacity(0.2)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(title, style: TextStyle(fontWeight: FontWeight.bold, fontSize: 15, color: consume ? AppColors.primary : AppColors.error)),
          const SizedBox(height: 12),
          ...items.map((item) => Padding(
            padding: const EdgeInsets.only(bottom: 8),
            child: Row(
              children: [
                Text(consume ? '✓' : '✗', style: TextStyle(color: consume ? AppColors.primary : AppColors.error, fontWeight: FontWeight.bold, fontSize: 16)),
                const SizedBox(width: 10),
                Text(item, style: const TextStyle(fontSize: 14, color: AppColors.onSurface)),
              ],
            ),
          )),
        ],
      ),
    );
  }
}

class _DocsTab extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return const Center(
      child: Padding(
        padding: EdgeInsets.all(40),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Icon(Icons.folder_outlined, size: 56, color: AppColors.outlineVariant),
            SizedBox(height: 16),
            Text('No documents yet', style: TextStyle(fontSize: 16, color: AppColors.onSurfaceVariant, fontWeight: FontWeight.w500)),
            SizedBox(height: 8),
            Text('Your doctor will upload prescriptions and diet charts here.', style: TextStyle(fontSize: 13, color: AppColors.outline), textAlign: TextAlign.center),
          ],
        ),
      ),
    );
  }
}
