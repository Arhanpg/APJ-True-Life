import 'package:flutter/material.dart';
import '../../../core/theme/app_colors.dart';

class AppointmentsScreen extends StatelessWidget {
  const AppointmentsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        title: Text('Appointments', style: Theme.of(context).textTheme.headlineLarge),
        backgroundColor: AppColors.background,
        automaticallyImplyLeading: false,
      ),
      body: Center(
        child: Padding(
          padding: const EdgeInsets.all(24),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Icon(Icons.calendar_today_outlined, size: 64, color: AppColors.primary.withOpacity(0.4)),
              const SizedBox(height: 20),
              Text('No appointments yet',
                style: Theme.of(context).textTheme.headlineLarge,
                textAlign: TextAlign.center),
              const SizedBox(height: 12),
              Text('Book your first appointment with your Vaidya.',
                style: Theme.of(context).textTheme.bodyMedium,
                textAlign: TextAlign.center),
              const SizedBox(height: 32),
              ElevatedButton.icon(
                onPressed: () {},
                icon: const Icon(Icons.add),
                label: const Text('Book Appointment'),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
