import 'package:flutter/material.dart';
import '../../../../core/theme/app_colors.dart';

class AppointmentsScreen extends StatefulWidget {
  const AppointmentsScreen({super.key});
  @override
  State<AppointmentsScreen> createState() => _AppointmentsScreenState();
}

class _AppointmentsScreenState extends State<AppointmentsScreen> {
  final List<String> _types = ['General', 'Panchakarma', 'Follow-up'];
  String _selectedType = 'General';

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(title: const Text('Appointments'), backgroundColor: AppColors.primary),
      floatingActionButton: FloatingActionButton.extended(
        onPressed: () {},
        backgroundColor: AppColors.primary,
        icon: const Icon(Icons.add, color: Colors.white),
        label: const Text('Book New', style: TextStyle(color: Colors.white)),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const Text('\ud83d\udcc5', style: TextStyle(fontSize: 64)),
            const SizedBox(height: 20),
            const Text('No Appointments Yet',
              style: TextStyle(fontFamily: 'PlayfairDisplay', fontSize: 22,
                  fontWeight: FontWeight.bold, color: AppColors.primaryDark)),
            const SizedBox(height: 12),
            const Text('Book an appointment with your doctor',
              style: TextStyle(fontFamily: 'DMSans', fontSize: 14, color: AppColors.onSurfaceVariant)),
            const SizedBox(height: 32),
            // Inline booking form
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 24),
              child: Column(
                children: [
                  DropdownButtonFormField<String>(
                    value: _selectedType,
                    decoration: const InputDecoration(labelText: 'Consultation Type'),
                    items: _types.map((t) => DropdownMenuItem(value: t, child: Text(t))).toList(),
                    onChanged: (v) => setState(() => _selectedType = v ?? 'General'),
                  ),
                  const SizedBox(height: 12),
                  ElevatedButton(
                    onPressed: () {},
                    child: const Text('Request Appointment'),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
