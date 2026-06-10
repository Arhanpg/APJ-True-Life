import 'package:flutter/material.dart';
import '../theme/app_colors.dart';

enum ChipStatus { active, pending, completed, scheduled, inProgress, cancelled }

class StatusChip extends StatelessWidget {
  final ChipStatus status;
  final String? label;
  const StatusChip({super.key, required this.status, this.label});

  @override
  Widget build(BuildContext context) {
    final config = _config[status]!;
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
      decoration: BoxDecoration(
        color: config['bg'] as Color,
        borderRadius: BorderRadius.circular(999),
      ),
      child: Text(
        label ?? config['label'] as String,
        style: TextStyle(
          fontSize: 11, fontWeight: FontWeight.w600,
          color: config['text'] as Color,
        ),
      ),
    );
  }

  static const _config = {
    ChipStatus.active: {'label': 'Active', 'bg': Color(0xFFEAF4EC), 'text': AppColors.primary},
    ChipStatus.pending: {'label': 'Pending', 'bg': Color(0xFFFFF8E1), 'text': Color(0xFFF57F17)},
    ChipStatus.completed: {'label': 'Completed', 'bg': Color(0xFFF5F5F5), 'text': AppColors.outline},
    ChipStatus.scheduled: {'label': 'Scheduled', 'bg': Color(0xFFE3F2FD), 'text': Color(0xFF1565C0)},
    ChipStatus.inProgress: {'label': 'In Progress', 'bg': Color(0xFFE8F5E9), 'text': AppColors.secondary},
    ChipStatus.cancelled: {'label': 'Cancelled', 'bg': Color(0xFFFFEBEE), 'text': AppColors.error},
  };
}
