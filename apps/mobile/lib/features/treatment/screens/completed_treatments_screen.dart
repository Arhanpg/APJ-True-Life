import 'package:flutter/material.dart';
import '../../../core/theme/app_theme.dart';

class CompletedTreatmentsScreen extends StatelessWidget {
  const CompletedTreatmentsScreen({super.key});

  static const _treatments = [
    {
      'id': '1',
      'planName': 'Nasya Course – Chronic Sinusitis',
      'diagnosis': 'Chronic Sinusitis',
      'startDate': '2024-01-15',
      'endDate': '2024-03-20',
      'totalPhases': 3,
      'completedAt': '2024-03-20',
    },
    {
      'id': '2',
      'planName': 'Panchakarma Detox',
      'diagnosis': 'Stress & Fatigue',
      'startDate': '2023-09-01',
      'endDate': '2023-10-30',
      'totalPhases': 2,
      'completedAt': '2023-10-30',
    },
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        backgroundColor: AppColors.primary,
        foregroundColor: Colors.white,
        title: const Text(
          'Completed Treatments',
          style: TextStyle(
            fontFamily: 'PlayfairDisplay',
            fontSize: 18,
            fontWeight: FontWeight.w700,
          ),
        ),
        elevation: 0,
      ),
      body: _treatments.isEmpty
          ? _buildEmptyState()
          : ListView.separated(
              padding: const EdgeInsets.all(16),
              itemCount: _treatments.length,
              separatorBuilder: (_, __) => const SizedBox(height: 12),
              itemBuilder: (ctx, i) => _TreatmentArchiveCard(
                treatment: _treatments[i],
              ),
            ),
    );
  }

  Widget _buildEmptyState() {
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Icon(Icons.history_rounded, size: 64, color: AppColors.outline),
          const SizedBox(height: 16),
          Text(
            'No completed treatments yet',
            style: TextStyle(
              fontFamily: 'DMSans',
              fontSize: 16,
              fontWeight: FontWeight.w600,
              color: AppColors.onSurfaceVariant,
            ),
          ),
          const SizedBox(height: 8),
          Text(
            'Your completed treatment history will appear here.',
            style: TextStyle(
              fontFamily: 'DMSans',
              fontSize: 13,
              color: AppColors.outline,
            ),
            textAlign: TextAlign.center,
          ),
        ],
      ),
    );
  }
}

class _TreatmentArchiveCard extends StatelessWidget {
  final Map<String, dynamic> treatment;
  const _TreatmentArchiveCard({required this.treatment});

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: AppColors.surfaceTint),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
            decoration: BoxDecoration(
              color: const Color(0xFFEDFDF3),
              borderRadius: const BorderRadius.vertical(top: Radius.circular(12)),
            ),
            child: Row(
              children: [
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        treatment['planName'] as String,
                        style: TextStyle(
                          fontFamily: 'PlayfairDisplay',
                          fontSize: 15,
                          fontWeight: FontWeight.w700,
                          color: AppColors.primaryDark,
                        ),
                      ),
                      const SizedBox(height: 2),
                      Text(
                        treatment['diagnosis'] as String,
                        style: TextStyle(
                          fontFamily: 'DMSans',
                          fontSize: 12,
                          color: AppColors.onSurfaceVariant,
                        ),
                      ),
                    ],
                  ),
                ),
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                  decoration: BoxDecoration(
                    color: const Color(0xFFF5F5F5),
                    borderRadius: BorderRadius.circular(999),
                  ),
                  child: Text(
                    'COMPLETED',
                    style: TextStyle(
                      fontFamily: 'DMSans',
                      fontSize: 10,
                      fontWeight: FontWeight.w700,
                      color: AppColors.onSurfaceVariant,
                    ),
                  ),
                ),
              ],
            ),
          ),
          Padding(
            padding: const EdgeInsets.all(16),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                // Progress bar – always 100%
                Row(
                  children: [
                    Expanded(
                      child: Container(
                        height: 6,
                        decoration: BoxDecoration(
                          color: const Color(0xFFE1F2E8),
                          borderRadius: BorderRadius.circular(999),
                        ),
                        child: FractionallySizedBox(
                          widthFactor: 1.0,
                          alignment: Alignment.centerLeft,
                          child: Container(
                            decoration: BoxDecoration(
                              color: AppColors.primary,
                              borderRadius: BorderRadius.circular(999),
                            ),
                          ),
                        ),
                      ),
                    ),
                    const SizedBox(width: 8),
                    Text(
                      '100%',
                      style: TextStyle(
                        fontFamily: 'DMSans',
                        fontSize: 11,
                        fontWeight: FontWeight.w700,
                        color: AppColors.primary,
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 14),
                Row(
                  children: [
                    _InfoChip(
                      icon: Icons.layers_rounded,
                      label: '${treatment['totalPhases']} Phases',
                    ),
                    const SizedBox(width: 8),
                    _InfoChip(
                      icon: Icons.calendar_today_rounded,
                      label: _formatDate(treatment['startDate'] as String),
                    ),
                    const SizedBox(width: 8),
                    _InfoChip(
                      icon: Icons.check_circle_rounded,
                      label: _formatDate(treatment['completedAt'] as String),
                      color: AppColors.primary,
                    ),
                  ],
                ),
                const SizedBox(height: 12),
                // Chat deleted notice
                Container(
                  padding: const EdgeInsets.all(10),
                  decoration: BoxDecoration(
                    color: const Color(0xFFFFF8F0),
                    borderRadius: BorderRadius.circular(8),
                    border: Border.all(color: const Color(0xFFFFE0B2)),
                  ),
                  child: Row(
                    children: [
                      Icon(Icons.info_outline_rounded,
                          size: 14, color: const Color(0xFF856400)),
                      const SizedBox(width: 6),
                      Expanded(
                        child: Text(
                          'Chat was deleted upon treatment completion.',
                          style: TextStyle(
                            fontFamily: 'DMSans',
                            fontSize: 11,
                            color: const Color(0xFF856400),
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
                const SizedBox(height: 12),
                SizedBox(
                  width: double.infinity,
                  child: OutlinedButton(
                    onPressed: () {},
                    style: OutlinedButton.styleFrom(
                      foregroundColor: AppColors.primary,
                      side: BorderSide(color: AppColors.primary),
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(8),
                      ),
                      padding: const EdgeInsets.symmetric(vertical: 10),
                    ),
                    child: const Text(
                      'View Full Treatment',
                      style: TextStyle(
                        fontFamily: 'DMSans',
                        fontSize: 13,
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  String _formatDate(String dateStr) {
    final parts = dateStr.split('-');
    const months = [
      '', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
    return '${parts[2]} ${months[int.parse(parts[1])]} ${parts[0]}';
  }
}

class _InfoChip extends StatelessWidget {
  final IconData icon;
  final String label;
  final Color? color;

  const _InfoChip({
    required this.icon,
    required this.label,
    this.color,
  });

  @override
  Widget build(BuildContext context) {
    final c = color ?? AppColors.onSurfaceVariant;
    return Row(
      mainAxisSize: MainAxisSize.min,
      children: [
        Icon(icon, size: 12, color: c),
        const SizedBox(width: 4),
        Text(
          label,
          style: TextStyle(
            fontFamily: 'DMSans',
            fontSize: 11,
            color: c,
            fontWeight: FontWeight.w500,
          ),
        ),
      ],
    );
  }
}
