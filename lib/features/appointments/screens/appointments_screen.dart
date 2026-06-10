import 'package:flutter/material.dart';
import '../../../core/theme/app_colors.dart';

const _types = ['General Consultation', 'Panchakarma', 'Follow-up'];

class AppointmentsScreen extends StatefulWidget {
  const AppointmentsScreen({super.key});
  @override
  State<AppointmentsScreen> createState() => _AppointmentsScreenState();
}

class _AppointmentsScreenState extends State<AppointmentsScreen> {
  bool _showBooking = false;
  String? _selectedType;
  DateTime? _selectedDate;
  String? _selectedSlot;
  final _reason = TextEditingController();
  bool _loading = false;

  final List<String> _slots = ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
                               '14:00', '14:30', '15:00', '15:30', '16:00'];

  Future<void> _pickDate() async {
    final d = await showDatePicker(
      context: context,
      initialDate: DateTime.now().add(const Duration(days: 1)),
      firstDate: DateTime.now(),
      lastDate: DateTime.now().add(const Duration(days: 60)),
    );
    if (d != null) setState(() => _selectedDate = d);
  }

  Future<void> _book() async {
    setState(() => _loading = true);
    await Future.delayed(const Duration(milliseconds: 800)); // TODO: POST to appointment-service
    if (mounted) { setState(() { _loading = false; _showBooking = false; }); }
  }

  @override
  void dispose() { _reason.dispose(); super.dispose(); }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(title: const Text('Appointments'), centerTitle: true),
      floatingActionButton: !_showBooking
          ? FloatingActionButton.extended(
              backgroundColor: AppColors.primary,
              foregroundColor: Colors.white,
              onPressed: () => setState(() => _showBooking = true),
              icon: const Icon(Icons.add),
              label: const Text('Book New'),
            )
          : null,
      body: _showBooking ? _buildBookingForm() : _buildUpcoming(),
    );
  }

  Widget _buildUpcoming() {
    return Center(
      child: Padding(
        padding: const EdgeInsets.all(32),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const Text('📅', style: TextStyle(fontSize: 56)),
            const SizedBox(height: 16),
            const Text('No Appointments Yet', style: TextStyle(fontWeight: FontWeight.w700, fontSize: 18, color: AppColors.primaryDark)),
            const SizedBox(height: 8),
            const Text('Book your first appointment with the doctor.', style: TextStyle(color: AppColors.onSurfaceVariant), textAlign: TextAlign.center),
            const SizedBox(height: 24),
            ElevatedButton.icon(
              onPressed: () => setState(() => _showBooking = true),
              icon: const Icon(Icons.add),
              label: const Text('Book Appointment'),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildBookingForm() {
    return ListView(
      padding: const EdgeInsets.all(20),
      children: [
        Row(
          children: [
            IconButton(icon: const Icon(Icons.arrow_back), onPressed: () => setState(() => _showBooking = false)),
            const Text('Book Appointment', style: TextStyle(fontSize: 18, fontWeight: FontWeight.w700, color: AppColors.primaryDark)),
          ],
        ),
        const SizedBox(height: 16),
        DropdownButtonFormField<String>(
          value: _selectedType,
          decoration: const InputDecoration(labelText: 'Consultation Type'),
          items: _types.map((t) => DropdownMenuItem(value: t, child: Text(t))).toList(),
          onChanged: (v) => setState(() => _selectedType = v),
        ),
        const SizedBox(height: 16),
        InkWell(
          onTap: _pickDate,
          child: InputDecorator(
            decoration: const InputDecoration(labelText: 'Select Date'),
            child: Text(
              _selectedDate == null ? 'Tap to choose date' : '${_selectedDate!.day}/${_selectedDate!.month}/${_selectedDate!.year}',
              style: TextStyle(color: _selectedDate == null ? AppColors.outline : AppColors.onSurface),
            ),
          ),
        ),
        const SizedBox(height: 16),
        const Text('Available Time Slots', style: TextStyle(fontWeight: FontWeight.w600, color: AppColors.primaryDark)),
        const SizedBox(height: 10),
        Wrap(
          spacing: 8, runSpacing: 8,
          children: _slots.map((s) => ChoiceChip(
            label: Text(s),
            selected: _selectedSlot == s,
            selectedColor: AppColors.surfaceTint,
            onSelected: (_) => setState(() => _selectedSlot = s),
          )).toList(),
        ),
        const SizedBox(height: 16),
        TextField(
          controller: _reason,
          decoration: const InputDecoration(labelText: 'Reason (optional)', hintText: 'Brief description of your concern'),
          maxLines: 2,
        ),
        const SizedBox(height: 32),
        ElevatedButton(
          onPressed: (_loading || _selectedType == null || _selectedDate == null || _selectedSlot == null) ? null : _book,
          child: _loading
              ? const SizedBox(height: 20, width: 20, child: CircularProgressIndicator(color: Colors.white, strokeWidth: 2))
              : const Text('Request Appointment'),
        ),
      ],
    );
  }
}
