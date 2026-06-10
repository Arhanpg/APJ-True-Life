import 'package:flutter/material.dart';
import '../../../core/theme/app_theme.dart';

enum AppointmentStatus { confirmed, pending, cancelled, completed }

class AppointmentData {
  final String id;
  final String type;
  final String date;
  final String time;
  final String doctorName;
  final AppointmentStatus status;

  const AppointmentData({
    required this.id,
    required this.type,
    required this.date,
    required this.time,
    required this.doctorName,
    required this.status,
  });
}

const _mockAppointments = [
  AppointmentData(
    id: '1',
    type: 'General Consultation',
    date: '2024-06-15',
    time: '10:00 AM',
    doctorName: 'Dr. APJ Sharma',
    status: AppointmentStatus.confirmed,
  ),
  AppointmentData(
    id: '2',
    type: 'Follow-up',
    date: '2024-06-22',
    time: '11:30 AM',
    doctorName: 'Dr. APJ Sharma',
    status: AppointmentStatus.pending,
  ),
];

const _pastAppointments = [
  AppointmentData(
    id: '3',
    type: 'Panchakarma',
    date: '2024-05-20',
    time: '09:00 AM',
    doctorName: 'Dr. APJ Sharma',
    status: AppointmentStatus.completed,
  ),
];

const _timeSlots = [
  '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM',
  '11:00 AM', '11:30 AM', '02:00 PM', '02:30 PM',
  '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM',
];

class AppointmentsScreen extends StatefulWidget {
  const AppointmentsScreen({super.key});

  @override
  State<AppointmentsScreen> createState() => _AppointmentsScreenState();
}

class _AppointmentsScreenState extends State<AppointmentsScreen>
    with SingleTickerProviderStateMixin {
  bool _showBooking = false;
  String _selectedType = 'General';
  String? _selectedSlot;
  DateTime _selectedDate = DateTime.now().add(const Duration(days: 1));
  bool _booking = false;

  Future<void> _requestAppointment() async {
    setState(() => _booking = true);
    await Future.delayed(const Duration(milliseconds: 900));
    if (mounted) {
      setState(() {
        _booking = false;
        _showBooking = false;
      })
      ;
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: const Text('Appointment requested! Doctor will confirm shortly.'),
          backgroundColor: AppColors.primary,
          behavior: SnackBarBehavior.floating,
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
        ),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        backgroundColor: AppColors.primary,
        foregroundColor: Colors.white,
        title: const Text(
          'Appointments',
          style: TextStyle(
            fontFamily: 'PlayfairDisplay',
            fontSize: 18,
            fontWeight: FontWeight.w700,
          ),
        ),
        actions: [
          if (!_showBooking)
            TextButton.icon(
              onPressed: () => setState(() => _showBooking = true),
              icon: const Icon(Icons.add, color: Colors.white, size: 16),
              label: const Text(
                'Book New',
                style: TextStyle(color: Colors.white, fontFamily: 'DMSans', fontSize: 13),
              ),
            ),
        ],
        elevation: 0,
      ),
      body: _showBooking ? _buildBookingForm() : _buildAppointmentList(),
    );
  }

  Widget _buildAppointmentList() {
    if (_mockAppointments.isEmpty && _pastAppointments.isEmpty) {
      return _buildEmptyState();
    }
    return ListView(
      padding: const EdgeInsets.all(16),
      children: [
        if (_mockAppointments.isNotEmpty) ...[
          _SectionHeader(title: 'Upcoming', count: _mockAppointments.length),
          const SizedBox(height: 10),
          ..._mockAppointments.map((a) => _AppointmentCard(appointment: a)),
        ],
        if (_pastAppointments.isNotEmpty) ...[
          const SizedBox(height: 20),
          _SectionHeader(title: 'Past', count: _pastAppointments.length),
          const SizedBox(height: 10),
          ..._pastAppointments.map((a) => _AppointmentCard(appointment: a)),
        ],
      ],
    );
  }

  Widget _buildEmptyState() {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(20),
      child: Column(
        children: [
          const SizedBox(height: 20),
          Icon(Icons.calendar_today_outlined, size: 72, color: AppColors.outline),
          const SizedBox(height: 16),
          Text(
            'No appointments yet',
            style: TextStyle(
              fontFamily: 'PlayfairDisplay',
              fontSize: 20,
              fontWeight: FontWeight.w700,
              color: AppColors.primaryDark,
            ),
          ),
          const SizedBox(height: 8),
          Text(
            'Book your first consultation with Dr. APJ Sharma.',
            style: TextStyle(
              fontFamily: 'DMSans',
              fontSize: 14,
              color: AppColors.onSurfaceVariant,
            ),
            textAlign: TextAlign.center,
          ),
          const SizedBox(height: 24),
          _buildBookingForm(),
        ],
      ),
    );
  }

  Widget _buildBookingForm() {
    final inputDec = InputDecoration(
      border: OutlineInputBorder(
        borderRadius: BorderRadius.circular(8),
        borderSide: BorderSide(color: AppColors.outlineVariant),
      ),
      enabledBorder: OutlineInputBorder(
        borderRadius: BorderRadius.circular(8),
        borderSide: BorderSide(color: AppColors.outlineVariant),
      ),
      focusedBorder: OutlineInputBorder(
        borderRadius: BorderRadius.circular(8),
        borderSide: BorderSide(color: AppColors.primary, width: 2),
      ),
      filled: true,
      fillColor: Colors.white,
      contentPadding: const EdgeInsets.symmetric(horizontal: 12, vertical: 12),
    );

    return SingleChildScrollView(
      padding: const EdgeInsets.all(16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Header
          Row(
            children: [
              if (_showBooking)
                IconButton(
                  icon: const Icon(Icons.arrow_back),
                  onPressed: () => setState(() => _showBooking = false),
                  padding: EdgeInsets.zero,
                  constraints: const BoxConstraints(),
                ),
              if (_showBooking) const SizedBox(width: 8),
              Text(
                'Book Appointment',
                style: TextStyle(
                  fontFamily: 'PlayfairDisplay',
                  fontSize: 20,
                  fontWeight: FontWeight.w700,
                  color: AppColors.primaryDark,
                ),
              ),
            ],
          ),
          const SizedBox(height: 20),

          // Consultation type
          Container(
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.circular(12),
              border: Border.all(color: AppColors.surfaceTint),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'Consultation Type',
                  style: TextStyle(
                    fontFamily: 'DMSans',
                    fontSize: 13,
                    fontWeight: FontWeight.w600,
                    color: AppColors.onSurface,
                  ),
                ),
                const SizedBox(height: 10),
                DropdownButtonFormField<String>(
                  value: _selectedType,
                  decoration: inputDec,
                  style: TextStyle(
                    fontFamily: 'DMSans',
                    fontSize: 14,
                    color: AppColors.onSurface,
                  ),
                  items: ['General', 'Panchakarma', 'Follow-up', 'OBG', 'Psychiatry', 'Dietetics']
                      .map((t) => DropdownMenuItem(value: t, child: Text(t)))
                      .toList(),
                  onChanged: (v) => setState(() => _selectedType = v!),
                ),
              ],
            ),
          ),
          const SizedBox(height: 12),

          // Date picker
          Container(
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.circular(12),
              border: Border.all(color: AppColors.surfaceTint),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'Select Date',
                  style: TextStyle(
                    fontFamily: 'DMSans',
                    fontSize: 13,
                    fontWeight: FontWeight.w600,
                    color: AppColors.onSurface,
                  ),
                ),
                const SizedBox(height: 10),
                InkWell(
                  onTap: () async {
                    final picked = await showDatePicker(
                      context: context,
                      initialDate: _selectedDate,
                      firstDate: DateTime.now().add(const Duration(days: 1)),
                      lastDate: DateTime.now().add(const Duration(days: 90)),
                      builder: (ctx, child) => Theme(
                        data: Theme.of(ctx).copyWith(
                          colorScheme: ColorScheme.light(
                            primary: AppColors.primary,
                          ),
                        ),
                        child: child!,
                      ),
                    );
                    if (picked != null) setState(() => _selectedDate = picked);
                  },
                  child: Container(
                    width: double.infinity,
                    padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 12),
                    decoration: BoxDecoration(
                      border: Border.all(color: AppColors.outlineVariant),
                      borderRadius: BorderRadius.circular(8),
                      color: Colors.white,
                    ),
                    child: Row(
                      children: [
                        Icon(Icons.calendar_month_rounded,
                            size: 16, color: AppColors.primary),
                        const SizedBox(width: 8),
                        Text(
                          '${_selectedDate.day} ${_monthName(_selectedDate.month)} ${_selectedDate.year}',
                          style: TextStyle(
                            fontFamily: 'DMSans',
                            fontSize: 14,
                            color: AppColors.onSurface,
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(height: 12),

          // Time slots
          Container(
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.circular(12),
              border: Border.all(color: AppColors.surfaceTint),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'Available Time Slots',
                  style: TextStyle(
                    fontFamily: 'DMSans',
                    fontSize: 13,
                    fontWeight: FontWeight.w600,
                    color: AppColors.onSurface,
                  ),
                ),
                const SizedBox(height: 12),
                Wrap(
                  spacing: 8,
                  runSpacing: 8,
                  children: _timeSlots
                      .map((slot) => _TimeSlotChip(
                            slot: slot,
                            isSelected: _selectedSlot == slot,
                            onTap: () => setState(() => _selectedSlot = slot),
                          ))
                      .toList(),
                ),
              ],
            ),
          ),
          const SizedBox(height: 24),

          SizedBox(
            width: double.infinity,
            height: 48,
            child: ElevatedButton(
              onPressed: _selectedSlot != null && !_booking
                  ? _requestAppointment
                  : null,
              style: ElevatedButton.styleFrom(
                backgroundColor: AppColors.primary,
                foregroundColor: Colors.white,
                disabledBackgroundColor: AppColors.outlineVariant,
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(10),
                ),
              ),
              child: _booking
                  ? const SizedBox(
                      width: 20,
                      height: 20,
                      child: CircularProgressIndicator(
                          strokeWidth: 2, color: Colors.white),
                    )
                  : const Text(
                      'Request Appointment',
                      style: TextStyle(
                        fontFamily: 'DMSans',
                        fontSize: 15,
                        fontWeight: FontWeight.w700,
                      ),
                    ),
            ),
          ),
          const SizedBox(height: 24),
        ],
      ),
    );
  }

  String _monthName(int m) {
    const months = [
      '', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
    return months[m];
  }
}

class _SectionHeader extends StatelessWidget {
  final String title;
  final int count;
  const _SectionHeader({required this.title, required this.count});

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        Text(
          title,
          style: TextStyle(
            fontFamily: 'DMSans',
            fontSize: 14,
            fontWeight: FontWeight.w700,
            color: AppColors.onSurface,
          ),
        ),
        const SizedBox(width: 6),
        Container(
          padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
          decoration: BoxDecoration(
            color: AppColors.surfaceTint,
            borderRadius: BorderRadius.circular(999),
          ),
          child: Text(
            '$count',
            style: TextStyle(
              fontFamily: 'DMSans',
              fontSize: 11,
              fontWeight: FontWeight.w700,
              color: AppColors.primary,
            ),
          ),
        ),
      ],
    );
  }
}

class _AppointmentCard extends StatelessWidget {
  final AppointmentData appointment;
  const _AppointmentCard({required this.appointment});

  @override
  Widget build(BuildContext context) {
    final statusColor = {
      AppointmentStatus.confirmed: (bg: const Color(0xFFEAF4EC), text: const Color(0xFF1A5C38), label: 'CONFIRMED'),
      AppointmentStatus.pending: (bg: const Color(0xFFFFF8E7), text: const Color(0xFF856400), label: 'AWAITING'),
      AppointmentStatus.completed: (bg: const Color(0xFFF5F5F5), text: const Color(0xFF707971), label: 'COMPLETED'),
      AppointmentStatus.cancelled: (bg: const Color(0xFFFFF5F5), text: const Color(0xFFBA1A1A), label: 'CANCELLED'),
    }[appointment.status]!;

    return Container(
      margin: const EdgeInsets.only(bottom: 10),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: AppColors.surfaceTint),
      ),
      child: Padding(
        padding: const EdgeInsets.all(14),
        child: Row(
          children: [
            Container(
              width: 44,
              height: 44,
              decoration: BoxDecoration(
                color: const Color(0xFFEDFDF3),
                borderRadius: BorderRadius.circular(10),
              ),
              child: Icon(Icons.medical_services_rounded,
                  color: AppColors.primary, size: 20),
            ),
            const SizedBox(width: 12),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    appointment.type,
                    style: TextStyle(
                      fontFamily: 'DMSans',
                      fontSize: 14,
                      fontWeight: FontWeight.w600,
                      color: AppColors.onSurface,
                    ),
                  ),
                  const SizedBox(height: 2),
                  Text(
                    '${appointment.date} · ${appointment.time}',
                    style: TextStyle(
                      fontFamily: 'DMSans',
                      fontSize: 12,
                      color: AppColors.onSurfaceVariant,
                    ),
                  ),
                  const SizedBox(height: 2),
                  Text(
                    appointment.doctorName,
                    style: TextStyle(
                      fontFamily: 'DMSans',
                      fontSize: 12,
                      color: AppColors.onSurfaceVariant,
                    ),
                  ),
                ],
              ),
            ),
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
              decoration: BoxDecoration(
                color: statusColor.bg,
                borderRadius: BorderRadius.circular(999),
              ),
              child: Text(
                statusColor.label,
                style: TextStyle(
                  fontFamily: 'DMSans',
                  fontSize: 10,
                  fontWeight: FontWeight.w700,
                  color: statusColor.text,
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _TimeSlotChip extends StatelessWidget {
  final String slot;
  final bool isSelected;
  final VoidCallback onTap;

  const _TimeSlotChip({
    required this.slot,
    required this.isSelected,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(8),
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
        decoration: BoxDecoration(
          color: isSelected ? AppColors.primary : Colors.white,
          borderRadius: BorderRadius.circular(8),
          border: Border.all(
            color: isSelected ? AppColors.primary : AppColors.outlineVariant,
            width: isSelected ? 2 : 1,
          ),
        ),
        child: Text(
          slot,
          style: TextStyle(
            fontFamily: 'DMSans',
            fontSize: 12,
            fontWeight: FontWeight.w600,
            color: isSelected ? Colors.white : AppColors.onSurface,
          ),
        ),
      ),
    );
  }
}
