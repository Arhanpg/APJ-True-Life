import 'package:flutter/material.dart';
import '../../../core/theme/app_theme.dart';

class AppointmentsScreen extends StatefulWidget {
  const AppointmentsScreen({super.key});
  @override
  State<AppointmentsScreen> createState() => _AppointmentsScreenState();
}

class _AppointmentsScreenState extends State<AppointmentsScreen> {
  String _selectedType = 'General';
  final _types = ['General', 'Panchakarma', 'Follow-up'];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(title: const Text('Appointments', style: TextStyle(fontFamily: 'PlayfairDisplay', fontWeight: FontWeight.bold))),
      body: ListView(
        padding: const EdgeInsets.all(20),
        children: [
          // Upcoming appointments section
          const Text('Upcoming', style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: AppColors.primaryDark, fontFamily: 'PlayfairDisplay')),
          const SizedBox(height: 12),
          _emptyState(
            icon: Icons.calendar_today_outlined,
            title: 'No upcoming appointments',
            subtitle: 'Book your first appointment below',
          ),
          const SizedBox(height: 28),
          const Divider(color: AppColors.outlineVariant),
          const SizedBox(height: 20),
          // Booking form
          const Text('Book Appointment', style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: AppColors.primaryDark, fontFamily: 'PlayfairDisplay')),
          const SizedBox(height: 16),
          DropdownButtonFormField<String>(
            value: _selectedType,
            decoration: const InputDecoration(labelText: 'Consultation Type'),
            items: _types.map((t) => DropdownMenuItem(value: t, child: Text(t))).toList(),
            onChanged: (v) => setState(() => _selectedType = v ?? ''),
          ),
          const SizedBox(height: 14),
          TextFormField(
            readOnly: true,
            decoration: const InputDecoration(labelText: 'Select Date', suffixIcon: Icon(Icons.calendar_today, color: AppColors.primary)),
            onTap: () async {
              await showDatePicker(context: context, initialDate: DateTime.now().add(const Duration(days: 1)), firstDate: DateTime.now(), lastDate: DateTime.now().add(const Duration(days: 90)));
            },
          ),
          const SizedBox(height: 14),
          const Text('Available Time Slots', style: TextStyle(fontSize: 13, fontWeight: FontWeight.w600, color: AppColors.onSurfaceVariant)),
          const SizedBox(height: 10),
          _TimeSlotGrid(),
          const SizedBox(height: 14),
          TextFormField(
            maxLines: 3,
            decoration: const InputDecoration(labelText: 'Reason (optional)', hintText: 'Briefly describe your concern...'),
          ),
          const SizedBox(height: 24),
          ElevatedButton(
            onPressed: () {},
            child: const Text('Request Appointment'),
          ),
        ],
      ),
    );
  }

  Widget _emptyState({required IconData icon, required String title, required String subtitle}) {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.symmetric(vertical: 32, horizontal: 20),
      decoration: BoxDecoration(color: AppColors.surface, borderRadius: BorderRadius.circular(16), border: Border.all(color: AppColors.outlineVariant)),
      child: Column(
        children: [
          Icon(icon, size: 40, color: AppColors.outlineVariant),
          const SizedBox(height: 10),
          Text(title, style: const TextStyle(fontWeight: FontWeight.w600, color: AppColors.onSurface)),
          const SizedBox(height: 4),
          Text(subtitle, style: const TextStyle(fontSize: 13, color: AppColors.outline)),
        ],
      ),
    );
  }
}

class _TimeSlotGrid extends StatefulWidget {
  @override
  State<_TimeSlotGrid> createState() => _TimeSlotGridState();
}

class _TimeSlotGridState extends State<_TimeSlotGrid> {
  int _selected = -1;
  final _slots = ['9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '2:00 PM', '2:30 PM', '3:00 PM', '4:00 PM', '4:30 PM', '5:00 PM'];

  @override
  Widget build(BuildContext context) {
    return GridView.builder(
      shrinkWrap: true,
      physics: const NeverScrollableScrollPhysics(),
      gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(crossAxisCount: 3, mainAxisSpacing: 8, crossAxisSpacing: 8, childAspectRatio: 2.8),
      itemCount: _slots.length,
      itemBuilder: (_, i) => GestureDetector(
        onTap: () => setState(() => _selected = i),
        child: Container(
          decoration: BoxDecoration(
            color: _selected == i ? AppColors.primary : AppColors.surface,
            borderRadius: BorderRadius.circular(8),
            border: Border.all(color: _selected == i ? AppColors.primary : AppColors.outlineVariant),
          ),
          child: Center(child: Text(_slots[i], style: TextStyle(fontSize: 12, fontWeight: FontWeight.w600, color: _selected == i ? Colors.white : AppColors.onSurface))),
        ),
      ),
    );
  }
}
