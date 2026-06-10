import 'package:flutter/material.dart';
import '../../../../core/theme/app_colors.dart';

class TreatmentScreen extends StatelessWidget {
  const TreatmentScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(title: const Text('My Treatment'), backgroundColor: AppColors.primary),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const Text('\ud83d\udccb', style: TextStyle(fontSize: 64)),
            const SizedBox(height: 20),
            const Text('No Active Treatment',
              style: TextStyle(fontFamily: 'PlayfairDisplay', fontSize: 22,
                  fontWeight: FontWeight.bold, color: AppColors.primaryDark)),
            const SizedBox(height: 12),
            const Padding(
              padding: EdgeInsets.symmetric(horizontal: 32),
              child: Text(
                'Your treatment plan will appear here once your doctor creates one for you.',
                textAlign: TextAlign.center,
                style: TextStyle(fontFamily: 'DMSans', fontSize: 14, color: AppColors.onSurfaceVariant),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
