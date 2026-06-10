import 'package:flutter/material.dart';
import '../../../../core/theme/app_colors.dart';

class AppointmentsScreen extends StatefulWidget {
  const AppointmentsScreen({super.key});

  @override
  State<AppointmentsScreen> createState() => _AppointmentsScreenState();
}

class _AppointmentsScreenState extends State<AppointmentsScreen> with SingleTickerProviderStateMixin {
  late TabController _tabs;

  @override
  void initState() {
    super.initState();
    _tabs = TabController(length: 2, vsync: this);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        title: const Text('Appointments', style: TextStyle(fontWeight: FontWeight.bold)),
        backgroundColor: AppColors.primary,
        elevation: 0,
        bottom: TabBar(
          controller: _tabs,
          labelColor: Colors.white,
          unselectedLabelColor: Colors.white60,
          indicatorColor: AppColors.accentGold,
          tabs: const [Tab(text: 'Upcoming'), Tab(text: 'Past')],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        backgroundColor: AppColors.primary,
        onPressed: () => _showBookingSheet(context),
        child: const Icon(Icons.add, color: Colors.white),
      ),
      body: TabBarView(
        controller: _tabs,
        children: [
          // Upcoming
          ListView(
            padding: const EdgeInsets.all(16),
            children: [
              _AppointmentCard(
                date: 'Mon, 12 Jun 2026',
                time: '10:00 AM',
                type: 'General Consultation',
                status: 'CONFIRMED',
              ),
              _AppointmentCard(
                date: 'Fri, 16 Jun 2026',
                time: '2:30 PM',
                type: 'Panchakarma Follow-up',
                status: 'PENDING',
              ),
            ],
          ),
          // Past
          ListView(
            padding: const EdgeInsets.all(16),
            children: [
              _AppointmentCard(
                date: 'Mon, 2 Jun 2026',
                time: '11:00 AM',
                type: 'Initial Consultation',
                status: 'COMPLETED',
              ),
            ],
          ),
        ],
      ),
    );
  }

  void _showBookingSheet(BuildContext context) {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      shape: const RoundedRectangleBorder(borderRadius: BorderRadius.vertical(top: Radius.circular(20))),
      builder: (ctx) => Padding(
        padding: EdgeInsets.only(bottom: MediaQuery.of(ctx).viewInsets.bottom),
        child: const _BookingSheet(),
      ),
    );
  }
}

class _AppointmentCard extends StatelessWidget {
  final String date, time, type, status;
  const _AppointmentCard({required this.date, required this.time, required this.type, required this.status});

  @override
  Widget build(BuildContext context) {
    Color bg, fg;
    switch (status) {
      case 'CONFIRMED': bg = AppColors.confirmedBg; fg = AppColors.confirmedText; break;
      case 'PENDING': bg = AppColors.pendingBg; fg = AppColors.pendingText; break;
      default: bg = const Color(0xFFF5F5F5); fg = AppColors.textMuted;
    }
    return Container(
      margin: const EdgeInsets.only(bottom: 12),
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.white, borderRadius: BorderRadius.circular(14),
        border: Border.all(color: AppColors.outlineVariant),
        boxShadow: const [BoxShadow(color: Color(0x08000000), blurRadius: 6, offset: Offset(0, 2))],
      ),
      child: Row(
        children: [
          Container(
            width: 50, height: 56,
            decoration: BoxDecoration(color: AppColors.surfaceTint, borderRadius: BorderRadius.circular(10)),
            child: Column(mainAxisAlignment: MainAxisAlignment.center, children: [
              Text(date.split(' ')[1], style: const TextStyle(fontSize: 20, fontWeight: FontWeight.bold, color: AppColors.primary)),
              Text(date.split(' ')[2].replaceAll(',', ''), style: const TextStyle(fontSize: 10, color: AppColors.textMuted, fontWeight: FontWeight.w600)),
            ]),
          ),
          const SizedBox(width: 14),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(type, style: const TextStyle(fontSize: 14, fontWeight: FontWeight.bold, color: AppColors.primaryDark)),
                const SizedBox(height: 4),
                Text('Dr. APJ Sharma · $time', style: const TextStyle(fontSize: 12, color: AppColors.textMuted)),
                const SizedBox(height: 6),
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                  decoration: BoxDecoration(color: bg, borderRadius: BorderRadius.circular(20)),
                  child: Text(status, style: TextStyle(fontSize: 10, fontWeight: FontWeight.w700, color: fg)),
                ),
              ],
            ),
          ),
          const Icon(Icons.chevron_right, color: AppColors.textMuted),
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
  String? _type;
  int? _slot;

  static const _types = ['General Consultation', 'Panchakarma', 'Follow-up'];
  static const _slots = ['9:00 AM', '10:00 AM', '11:00 AM', '2:00 PM', '3:00 PM', '4:00 PM'];

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(24),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text('Book Appointment', style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold, color: AppColors.primaryDark)),
          const SizedBox(height: 20),
          DropdownButtonFormField<String>(
            value: _type,
            decoration: const InputDecoration(labelText: 'Consultation Type'),
            items: _types.map((t) => DropdownMenuItem(value: t, child: Text(t))).toList(),
            onChanged: (v) => setState(() => _type = v),
          ),
          const SizedBox(height: 16),
          const Text('Select Time Slot', style: TextStyle(fontSize: 13, fontWeight: FontWeight.w600, color: AppColors.textSecondary)),
          const SizedBox(height: 10),
          Wrap(
            spacing: 8, runSpacing: 8,
            children: _slots.asMap().entries.map((e) => GestureDetector(
              onTap: () => setState(() => _slot = e.key),
              child: Container(
                padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
                decoration: BoxDecoration(
                  color: _slot == e.key ? AppColors.primary : Colors.white,
                  borderRadius: BorderRadius.circular(8),
                  border: Border.all(color: _slot == e.key ? AppColors.primary : AppColors.outlineVariant),
                ),
                child: Text(e.value, style: TextStyle(fontSize: 13, fontWeight: FontWeight.w600, color: _slot == e.key ? Colors.white : AppColors.textPrimary)),
              ),
            )).toList(),
          ),
          const SizedBox(height: 20),
          ElevatedButton(
            onPressed: () => Navigator.pop(context),
            child: const Text('Request Appointment'),
          ),
          const SizedBox(height: 8),
        ],
      ),
    );
  }
}
