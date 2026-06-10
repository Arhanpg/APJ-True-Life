import 'package:flutter/material.dart';
import '../../../core/theme/app_colors.dart';
import '../../../core/widgets/section_card.dart';
import '../../../core/widgets/status_chip.dart';

class AppointmentsScreen extends StatefulWidget {
  const AppointmentsScreen({super.key});
  @override
  State<AppointmentsScreen> createState() => _AppointmentsScreenState();
}

class _AppointmentsScreenState extends State<AppointmentsScreen> with SingleTickerProviderStateMixin {
  late TabController _tabs;
  @override
  void initState() { super.initState(); _tabs = TabController(length: 2, vsync: this); }
  @override
  void dispose() { _tabs.dispose(); super.dispose(); }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        title: const Text('Appointments'),
        backgroundColor: AppColors.surface,
        elevation: 0,
        bottom: TabBar(
          controller: _tabs,
          labelColor: AppColors.primary,
          unselectedLabelColor: AppColors.outline,
          indicatorColor: AppColors.primary,
          tabs: const [Tab(text: 'Upcoming'), Tab(text: 'Past')],
        ),
      ),
      floatingActionButton: FloatingActionButton.extended(
        onPressed: () => _showBookingSheet(context),
        label: const Text('Book New'),
        icon: const Icon(Icons.add),
        backgroundColor: AppColors.primary,
      ),
      body: TabBarView(
        controller: _tabs,
        children: [
          _UpcomingTab(onBook: () => _showBookingSheet(context)),
          const _PastTab(),
        ],
      ),
    );
  }

  void _showBookingSheet(BuildContext context) {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      shape: const RoundedRectangleBorder(borderRadius: BorderRadius.vertical(top: Radius.circular(20))),
      builder: (_) => const _BookingSheet(),
    );
  }
}

class _UpcomingTab extends StatelessWidget {
  final VoidCallback onBook;
  const _UpcomingTab({required this.onBook});

  @override
  Widget build(BuildContext context) {
    return ListView(
      padding: const EdgeInsets.all(16),
      children: [
        _AppointmentCard(
          date: '14 Jun 2026', time: '10:00 AM', type: 'Panchakarma Consultation',
          status: ChipStatus.active, doctor: 'Dr. APJ Sharma',
        ),
        _AppointmentCard(
          date: '21 Jun 2026', time: '11:30 AM', type: 'Follow-up',
          status: ChipStatus.pending, doctor: 'Dr. APJ Sharma',
        ),
      ],
    );
  }
}

class _PastTab extends StatelessWidget {
  const _PastTab();
  @override
  Widget build(BuildContext context) {
    return ListView(
      padding: const EdgeInsets.all(16),
      children: [
        _AppointmentCard(
          date: '03 Jun 2026', time: '09:00 AM', type: 'Initial Consultation',
          status: ChipStatus.completed, doctor: 'Dr. APJ Sharma',
        ),
      ],
    );
  }
}

class _AppointmentCard extends StatelessWidget {
  final String date, time, type, doctor;
  final ChipStatus status;
  const _AppointmentCard({required this.date, required this.time, required this.type, required this.status, required this.doctor});

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.only(bottom: 12),
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: AppColors.surface,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: AppColors.outlineVariant),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Container(
                padding: const EdgeInsets.all(10),
                decoration: BoxDecoration(color: AppColors.surfaceTint, borderRadius: BorderRadius.circular(12)),
                child: const Icon(Icons.calendar_today, color: AppColors.primary, size: 20),
              ),
              const SizedBox(width: 12),
              Expanded(child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(type, style: const TextStyle(fontSize: 15, fontWeight: FontWeight.w700, color: AppColors.onSurface)),
                  Text('$date · $time', style: const TextStyle(fontSize: 13, color: AppColors.outline)),
                ],
              )),
              StatusChip(status: status),
            ],
          ),
          const Divider(height: 20, color: AppColors.surfaceTint),
          Row(
            children: [
              CircleAvatar(radius: 14, backgroundColor: AppColors.primary, child: const Text('AJ', style: TextStyle(color: Colors.white, fontSize: 10, fontWeight: FontWeight.w700))),
              const SizedBox(width: 8),
              Text(doctor, style: const TextStyle(fontSize: 13, color: AppColors.onSurfaceVariant)),
              const Spacer(),
              if (status == ChipStatus.pending || status == ChipStatus.active)
                TextButton(
                  onPressed: () {},
                  style: TextButton.styleFrom(foregroundColor: AppColors.error, textStyle: const TextStyle(fontSize: 13)),
                  child: const Text('Cancel'),
                ),
            ],
          ),
        ],
      ),
    );
  }
}

class _BookingSheet extends StatefulWidget {
  const _BookingSheet();
  @override
  State<_BookingSheet> createState() => _BookingSheetState();
}

class _BookingSheetState extends State<_BookingSheet> {
  String _type = 'General';
  String? _slot;
  final _reason = TextEditingController();

  static const _types = ['General', 'Panchakarma', 'Follow-up'];
  static const _slots = ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'];

  @override
  void dispose() { _reason.dispose(); super.dispose(); }

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: EdgeInsets.only(bottom: MediaQuery.of(context).viewInsets.bottom),
      child: Container(
        padding: const EdgeInsets.all(24),
        decoration: const BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.vertical(top: Radius.circular(20)),
        ),
        child: SingleChildScrollView(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            mainAxisSize: MainAxisSize.min,
            children: [
              // Handle
              Center(child: Container(width: 40, height: 4, margin: const EdgeInsets.only(bottom: 20), decoration: BoxDecoration(color: AppColors.outlineVariant, borderRadius: BorderRadius.circular(2)))),
              const Text('Book Appointment', style: TextStyle(fontFamily: 'PlayfairDisplay', fontSize: 20, fontWeight: FontWeight.w700, color: AppColors.primaryDark)),
              const SizedBox(height: 20),

              const Text('Consultation Type', style: TextStyle(fontSize: 13, fontWeight: FontWeight.w600, color: AppColors.outline)),
              const SizedBox(height: 8),
              Wrap(
                spacing: 8,
                children: _types.map((t) => ChoiceChip(
                  label: Text(t),
                  selected: _type == t,
                  onSelected: (_) => setState(() => _type = t),
                  selectedColor: AppColors.primary,
                  labelStyle: TextStyle(color: _type == t ? Colors.white : AppColors.onSurface, fontSize: 13),
                )).toList(),
              ),
              const SizedBox(height: 20),

              const Text('Select Time Slot', style: TextStyle(fontSize: 13, fontWeight: FontWeight.w600, color: AppColors.outline)),
              const SizedBox(height: 8),
              GridView.count(
                crossAxisCount: 4, shrinkWrap: true,
                physics: const NeverScrollableScrollPhysics(),
                mainAxisSpacing: 8, crossAxisSpacing: 8,
                childAspectRatio: 2.2,
                children: _slots.map((s) => GestureDetector(
                  onTap: () => setState(() => _slot = s),
                  child: Container(
                    decoration: BoxDecoration(
                      color: _slot == s ? AppColors.primary : AppColors.surfaceTint,
                      borderRadius: BorderRadius.circular(8),
                    ),
                    child: Center(child: Text(s, style: TextStyle(fontSize: 12, fontWeight: FontWeight.w600, color: _slot == s ? Colors.white : AppColors.onSurface))),
                  ),
                )).toList(),
              ),
              const SizedBox(height: 16),

              TextField(
                controller: _reason,
                maxLines: 2,
                decoration: const InputDecoration(labelText: 'Reason (optional)', hintText: 'Briefly describe your concern...'),
              ),
              const SizedBox(height: 24),

              SizedBox(
                width: double.infinity, height: 52,
                child: ElevatedButton(
                  onPressed: _slot == null ? null : () { Navigator.pop(context); ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text('Appointment request sent!'), backgroundColor: AppColors.primary)); },
                  style: ElevatedButton.styleFrom(shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12))),
                  child: const Text('Request Appointment', style: TextStyle(fontWeight: FontWeight.w700, fontSize: 15)),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
