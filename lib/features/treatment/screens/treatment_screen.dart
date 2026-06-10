import 'package:flutter/material.dart';
import '../../../core/theme/app_colors.dart';

class TreatmentScreen extends StatelessWidget {
  const TreatmentScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        title: Text('My Treatment', style: Theme.of(context).textTheme.headlineLarge),
        backgroundColor: AppColors.background,
        automaticallyImplyLeading: false,
      ),
      body: Center(
        child: Padding(
          padding: const EdgeInsets.all(24),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Icon(Icons.assignment_outlined, size: 64, color: AppColors.primary.withOpacity(0.4)),
              const SizedBox(height: 20),
              Text('No active treatment plan',
                style: Theme.of(context).textTheme.headlineLarge,
                textAlign: TextAlign.center),
              const SizedBox(height: 12),
              Text(
                'Once your doctor creates a treatment plan for you, it will appear here with all phases, medicines, and diet guidelines.',
                style: Theme.of(context).textTheme.bodyMedium?.copyWith(height: 1.6),
                textAlign: TextAlign.center,
              ),
            ],
          ),
        ),
      ),
    );
  }
}
