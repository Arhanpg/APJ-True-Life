import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../../../../core/theme/app_colors.dart';

class ProfileCreationScreen extends StatefulWidget {
  const ProfileCreationScreen({super.key});

  @override
  State<ProfileCreationScreen> createState() => _ProfileCreationScreenState();
}

class _ProfileCreationScreenState extends State<ProfileCreationScreen> {
  final _nameCtrl = TextEditingController();
  DateTime? _dob;
  String? _gender;
  String? _bloodGroup;
  bool _consent = false;

  static const _genders = ['Male', 'Female', 'Other'];
  static const _bloodGroups = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];

  Future<void> _pickDate() async {
    final d = await showDatePicker(
      context: context,
      initialDate: DateTime(1990),
      firstDate: DateTime(1920),
      lastDate: DateTime.now(),
    );
    if (d != null) setState(() => _dob = d);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        backgroundColor: AppColors.primary,
        title: const Text('Create Profile', style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold)),
        elevation: 0,
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(24),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Avatar
            Center(
              child: Stack(
                children: [
                  CircleAvatar(radius: 48, backgroundColor: AppColors.surfaceTint,
                    child: const Icon(Icons.person, size: 48, color: AppColors.primary)),
                  Positioned(bottom: 0, right: 0,
                    child: Container(
                      width: 30, height: 30,
                      decoration: BoxDecoration(color: AppColors.primary, shape: BoxShape.circle, border: Border.all(color: Colors.white, width: 2)),
                      child: const Icon(Icons.camera_alt, size: 14, color: Colors.white),
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 28),
            const Text('Personal Information', style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: AppColors.primaryDark)),
            const SizedBox(height: 16),
            TextFormField(controller: _nameCtrl, decoration: const InputDecoration(labelText: 'Full Name *')),
            const SizedBox(height: 14),
            // DOB
            InkWell(
              onTap: _pickDate,
              child: InputDecorator(
                decoration: const InputDecoration(labelText: 'Date of Birth *'),
                child: Text(
                  _dob == null ? 'Select date' : '${_dob!.day}/${_dob!.month}/${_dob!.year}',
                  style: TextStyle(color: _dob == null ? AppColors.textMuted : AppColors.textPrimary, fontSize: 15),
                ),
              ),
            ),
            const SizedBox(height: 14),
            // Gender
            DropdownButtonFormField<String>(
              value: _gender,
              decoration: const InputDecoration(labelText: 'Gender *'),
              items: _genders.map((g) => DropdownMenuItem(value: g, child: Text(g))).toList(),
              onChanged: (v) => setState(() => _gender = v),
            ),
            const SizedBox(height: 14),
            // Blood Group
            DropdownButtonFormField<String>(
              value: _bloodGroup,
              decoration: const InputDecoration(labelText: 'Blood Group'),
              items: _bloodGroups.map((b) => DropdownMenuItem(value: b, child: Text(b))).toList(),
              onChanged: (v) => setState(() => _bloodGroup = v),
            ),
            const SizedBox(height: 28),
            // Consent
            Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Checkbox(
                  value: _consent,
                  onChanged: (v) => setState(() => _consent = v ?? false),
                  activeColor: AppColors.primary,
                ),
                const Expanded(
                  child: Padding(
                    padding: EdgeInsets.only(top: 12),
                    child: Text(
                      'I consent to the collection and processing of my personal health data by APJ TRUE LIFE Ayurvedic Medical Centre.',
                      style: TextStyle(fontSize: 12, color: AppColors.textMuted, height: 1.4),
                    ),
                  ),
                ),
              ],
            ),
            const SizedBox(height: 20),
            ElevatedButton(
              onPressed: _consent ? () => context.go('/home') : null,
              child: const Text('Create Profile & Continue'),
            ),
          ],
        ),
      ),
    );
  }
}
