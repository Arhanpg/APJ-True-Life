import 'package:flutter/material.dart';
import '../../../core/theme/app_colors.dart';

const _appointments = [
  {'date': '12 Jun 2026', 'time': '10:00 AM', 'type': 'General Consultation', 'status': 'confirmed'},
  {'date': '18 Jun 2026', 'time': '02:30 PM', 'type': 'Panchakarma Follow-up', 'status': 'pending'},
];

class AppointmentsScreen extends StatefulWidget {
  const AppointmentsScreen({super.key});

  @override
  State<AppointmentsScreen> createState() => _AppointmentsScreenState();
}

class _AppointmentsScreenState extends State<AppointmentsScreen> {
  bool _showBooking = _appointments.isEmpty;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        title: const Text('Appointments'),
        backgroundColor: AppColors.primary,
        automaticallyImplyLeading: false,
      ),
      floatingActionButton: FloatingActionButton.extended(
        onPressed: () => setState(() => _showBooking = true),
        backgroundColor: AppColors.primary,
        icon: const Icon(Icons.add, color: Colors.white),
        label: const Text('Book New', style: TextStyle(color: Colors.white, fontFamily: 'DMSans', fontWeight: FontWeight.w600)),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            if (_appointments.isEmpty) _EmptyState(onBook: () => setState(() => _showBooking = true))
            else ...[
              const Text('Upcoming', style: TextStyle(fontFamily: 'DMSans', fontSize: 14, fontWeight: FontWeight.w600, color: AppColors.onSurface)),
              const SizedBox(height: 10),
              ..._appointments.map((a) => _AppointmentCard(appt: a)),
            ],
            if (_showBooking) ...[
              const SizedBox(height: 20),
              const Text('Book an Appointment', style: TextStyle(fontFamily: 'PlayfairDisplay', fontSize: 18, fontWeight: FontWeight.w700, color: AppColors.primaryDark)),
              const SizedBox(height: 14),
              _BookingForm(onSubmit: () => setState(() => _showBooking = false)),
            ],
          ],
        ),
      ),
    );
  }
}

class _AppointmentCard extends StatelessWidget {
  final Map<String, dynamic> appt;
  const _AppointmentCard({required this.appt});

  @override
  Widget build(BuildContext context) {
    final isConfirmed = appt['status'] == 'confirmed';
    return Container(
      margin: const EdgeInsets.only(bottom: 12),
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: AppColors.surface,
        borderRadius: BorderRadius.circular(14),
        border: Border.all(color: const Color(0xFFD4E8D8)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              const Icon(Icons.calendar_today_outlined, size: 16, color: AppColors.primary),
              const SizedBox(width: 6),
              Text(appt['date'] as String, style: const TextStyle(fontFamily: 'DMSans', fontSize: 13, fontWeight: FontWeight.w600, color: AppColors.onSurface)),
              const SizedBox(width: 10),
              const Icon(Icons.access_time_outlined, size: 16, color: AppColors.outline),
              const SizedBox(width: 4),
              Text(appt['time'] as String, style: const TextStyle(fontFamily: 'DMSans', fontSize: 13, color: AppColors.outline)),
              const Spacer(),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                decoration: BoxDecoration(
                  color: isConfirmed ? AppColors.confirmedBg : AppColors.pendingBg,
                  borderRadius: BorderRadius.circular(999),
                ),
                child: Text(
                  isConfirmed ? 'Confirmed' : 'Awaiting',
                  style: TextStyle(fontSize: 11, fontWeight: FontWeight.w600, color: isConfirmed ? AppColors.confirmed : AppColors.pending),
                ),
              ),
            ],
          ),
          const SizedBox(height: 8),
          Text(appt['type'] as String, style: const TextStyle(fontFamily: 'DMSans', fontSize: 14, fontWeight: FontWeight.w600, color: AppColors.onSurface)),
          const SizedBox(height: 4),
          const Text('Dr. APJ Sharma · APJ TRUE LIFE', style: TextStyle(fontFamily: 'DMSans', fontSize: 12, color: AppColors.outline)),
          const SizedBox(height: 12),
          TextButton(
            onPressed: () {},
            style: TextButton.styleFrom(foregroundColor: AppColors.error, padding: EdgeInsets.zero, minimumSize: Size.zero),
            child: const Text('Cancel Appointment', style: TextStyle(fontFamily: 'DMSans', fontSize: 12)),
          ),
        ],
      ),
    );
  }
}

class _EmptyState extends StatelessWidget {
  final VoidCallback onBook;
  const _EmptyState({required this.onBook});

  @override
  Widget build(BuildContext context) => Column(
    children: [
      const SizedBox(height: 40),
      const Text('📅', style: TextStyle(fontSize: 60)),
      const SizedBox(height: 16),
      const Text('No upcoming appointments', style: TextStyle(fontFamily: 'DMSans', fontSize: 16, fontWeight: FontWeight.w600, color: AppColors.onSurface)),
      const SizedBox(height: 8),
      const Text('Book your first appointment below', style: TextStyle(fontFamily: 'DMSans', fontSize: 13, color: AppColors.outline)),
    ],
  );
}

class _BookingForm extends StatefulWidget {
  final VoidCallback onSubmit;
  const _BookingForm({required this.onSubmit});

  @override
  State<_BookingForm> createState() => _BookingFormState();
}

class _BookingFormState extends State<_BookingForm> {
  String? _consultType;
  String? _date;
  String? _slot;
  final _reasonCtrl = TextEditingController();

  final _types = ['General', 'Panchakarma', 'Follow-up'];
  final _slots = ['09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM', '04:00 PM'];

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(18),
      decoration: BoxDecoration(
        color: AppColors.surface,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: const Color(0xFFD4E8D8)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text('Consultation Type', style: TextStyle(fontFamily: 'DMSans', fontSize: 12, fontWeight: FontWeight.w500, color: AppColors.onSurface)),
          const SizedBox(height: 6),
          DropdownButtonFormField<String>(
            value: _consultType,
            hint: const Text('Select type', style: TextStyle(fontSize: 13, color: AppColors.outline, fontFamily: 'DMSans')),
            onChanged: (v) => setState(() => _consultType = v),
            decoration: const InputDecoration(contentPadding: EdgeInsets.symmetric(horizontal: 12, vertical: 10)),
            items: _types.map((t) => DropdownMenuItem(value: t, child: Text(t, style: const TextStyle(fontFamily: 'DMSans', fontSize: 13)))).toList(),
          ),
          const SizedBox(height: 14),
          const Text('Select Time Slot', style: TextStyle(fontFamily: 'DMSans', fontSize: 12, fontWeight: FontWeight.w500, color: AppColors.onSurface)),
          const SizedBox(height: 8),
          Wrap(
            spacing: 8,
            runSpacing: 8,
            children: _slots.map((s) => GestureDetector(
              onTap: () => setState(() => _slot = s),
              child: Container(
                padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
                decoration: BoxDecoration(
                  color: _slot == s ? AppColors.primary : AppColors.surfaceTint,
                  borderRadius: BorderRadius.circular(8),
                  border: Border.all(color: _slot == s ? AppColors.primary : AppColors.outlineVariant),
                ),
                child: Text(s, style: TextStyle(fontFamily: 'DMSans', fontSize: 12, fontWeight: FontWeight.w600, color: _slot == s ? Colors.white : AppColors.onSurface)),
              ),
            )).toList(),
          ),
          const SizedBox(height: 14),
          const Text('Reason (optional)', style: TextStyle(fontFamily: 'DMSans', fontSize: 12, fontWeight: FontWeight.w500, color: AppColors.onSurface)),
          const SizedBox(height: 6),
          TextField(
            controller: _reasonCtrl,
            maxLines: 2,
            decoration: const InputDecoration(hintText: 'Brief description of your concern...', hintStyle: TextStyle(fontSize: 13, color: AppColors.outline, fontFamily: 'DMSans')),
          ),
          const SizedBox(height: 20),
          ElevatedButton(
            onPressed: _consultType != null && _slot != null ? widget.onSubmit : null,
            child: const Text('REQUEST APPOINTMENT'),
          ),
        ],
      ),
    );
  }
}
