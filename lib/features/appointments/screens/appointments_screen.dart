import 'package:flutter/material.dart';
import '../../../core/theme/app_colors.dart';

class AppointmentsScreen extends StatefulWidget {
  const AppointmentsScreen({super.key});
  @override
  State<AppointmentsScreen> createState() => _AppointmentsScreenState();
}

class _AppointmentsScreenState extends State<AppointmentsScreen> with SingleTickerProviderStateMixin {
  late TabController _tabController;
  bool _showBookingForm = false;
  String? _selectedType;
  String? _selectedSlot;

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 2, vsync: this);
  }

  final List<String> _types = ['General Consultation', 'Panchakarma', 'Follow-up'];
  final List<String> _slots = ['9:00 AM', '9:30 AM', '10:00 AM', '11:00 AM', '2:00 PM', '3:00 PM', '4:30 PM'];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        title: const Text('Appointments'),
        backgroundColor: AppColors.background,
        bottom: TabBar(
          controller: _tabController,
          labelColor: AppColors.primary,
          unselectedLabelColor: AppColors.outline,
          indicatorColor: AppColors.primary,
          tabs: const [Tab(text: 'Upcoming'), Tab(text: 'Past')],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () => setState(() => _showBookingForm = !_showBookingForm),
        backgroundColor: AppColors.primary,
        child: Icon(_showBookingForm ? Icons.close : Icons.add, color: Colors.white),
      ),
      body: Column(
        children: [
          if (_showBookingForm) _buildBookingForm(),
          Expanded(
            child: TabBarView(
              controller: _tabController,
              children: [
                _AppointmentList(appointments: _upcoming),
                _AppointmentList(appointments: _past),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildBookingForm() {
    return Container(
      margin: const EdgeInsets.all(16),
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(color: AppColors.surface, borderRadius: BorderRadius.circular(12), border: Border.all(color: const Color(0xFFD4E8D8), width: 2)),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text('Book New Appointment', style: TextStyle(fontFamily: 'PlayfairDisplay', fontSize: 17, fontWeight: FontWeight.w700, color: AppColors.primaryDark)),
          const SizedBox(height: 16),
          DropdownButtonFormField<String>(
            value: _selectedType,
            hint: const Text('Select consultation type'),
            decoration: InputDecoration(labelText: 'Type', border: OutlineInputBorder(borderRadius: BorderRadius.circular(8))),
            items: _types.map((t) => DropdownMenuItem(value: t, child: Text(t))).toList(),
            onChanged: (v) => setState(() => _selectedType = v),
          ),
          const SizedBox(height: 12),
          const Text('Available Slots', style: TextStyle(fontSize: 14, fontWeight: FontWeight.w500, color: AppColors.onSurface)),
          const SizedBox(height: 8),
          Wrap(
            spacing: 8, runSpacing: 8,
            children: _slots.map((s) => GestureDetector(
              onTap: () => setState(() => _selectedSlot = s),
              child: Container(
                padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
                decoration: BoxDecoration(
                  color: _selectedSlot == s ? AppColors.primary : AppColors.surface,
                  borderRadius: BorderRadius.circular(8),
                  border: Border.all(color: _selectedSlot == s ? AppColors.primary : AppColors.outlineVariant),
                ),
                child: Text(s, style: TextStyle(fontSize: 13, fontWeight: FontWeight.w500, color: _selectedSlot == s ? Colors.white : AppColors.onSurface)),
              ),
            )).toList(),
          ),
          const SizedBox(height: 16),
          ElevatedButton(
            onPressed: (_selectedType != null && _selectedSlot != null)
                ? () { setState(() => _showBookingForm = false); ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text('Appointment requested! Awaiting confirmation.'), backgroundColor: AppColors.primary)); }
                : null,
            child: const Text('Request Appointment'),
          ),
        ],
      ),
    );
  }

  static const _upcoming = [
    _ApptData(title: 'Nasya Therapy Session', date: 'Thu, 12 Jun 2026', time: '10:00 AM', type: 'Panchakarma', status: 'CONFIRMED'),
    _ApptData(title: 'Follow-up Consultation', date: 'Mon, 16 Jun 2026', time: '11:00 AM', type: 'Follow-up', status: 'PENDING'),
  ];
  static const _past = [
    _ApptData(title: 'Initial Consultation', date: 'Mon, 1 Jun 2026', time: '9:00 AM', type: 'General', status: 'COMPLETED'),
    _ApptData(title: 'Purvakarma Session', date: 'Wed, 4 Jun 2026', time: '10:30 AM', type: 'Panchakarma', status: 'COMPLETED'),
  ];
}

class _ApptData {
  final String title, date, time, type, status;
  const _ApptData({required this.title, required this.date, required this.time, required this.type, required this.status});
}

class _AppointmentList extends StatelessWidget {
  final List<_ApptData> appointments;
  const _AppointmentList({required this.appointments});

  @override
  Widget build(BuildContext context) {
    if (appointments.isEmpty) return const Center(child: Text('No appointments', style: TextStyle(color: AppColors.outline)));
    return ListView.builder(
      padding: const EdgeInsets.all(16),
      itemCount: appointments.length,
      itemBuilder: (_, i) {
        final a = appointments[i];
        final isConfirmed = a.status == 'CONFIRMED';
        final isPending = a.status == 'PENDING';
        return Container(
          margin: const EdgeInsets.only(bottom: 12),
          padding: const EdgeInsets.all(16),
          decoration: BoxDecoration(color: AppColors.surface, borderRadius: BorderRadius.circular(12), border: Border.all(color: const Color(0xFFD4E8D8), width: 1.5)),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                children: [
                  Expanded(child: Text(a.title, style: const TextStyle(fontWeight: FontWeight.w700, fontSize: 15, color: AppColors.onSurface))),
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                    decoration: BoxDecoration(
                      color: isConfirmed ? AppColors.surfaceTint : isPending ? const Color(0xFFFFF8E1) : const Color(0xFFF5F5F5),
                      borderRadius: BorderRadius.circular(12),
                    ),
                    child: Text(a.status, style: TextStyle(fontSize: 11, fontWeight: FontWeight.w700, color: isConfirmed ? AppColors.primary : isPending ? const Color(0xFF9C6A00) : AppColors.outline)),
                  ),
                ],
              ),
              const SizedBox(height: 8),
              Row(children: [const Icon(Icons.calendar_today_outlined, size: 14, color: AppColors.onSurfaceVariant), const SizedBox(width: 4), Text('${a.date} at ${a.time}', style: const TextStyle(fontSize: 13, color: AppColors.onSurfaceVariant))]),
              const SizedBox(height: 2),
              Row(children: [const Icon(Icons.medical_services_outlined, size: 14, color: AppColors.onSurfaceVariant), const SizedBox(width: 4), Text(a.type, style: const TextStyle(fontSize: 13, color: AppColors.onSurfaceVariant))]),
            ],
          ),
        );
      },
    );
  }
}
