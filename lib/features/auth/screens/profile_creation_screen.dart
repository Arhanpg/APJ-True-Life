import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../../../core/theme/app_colors.dart';

class ProfileCreationScreen extends StatefulWidget {
  const ProfileCreationScreen({super.key});
  @override
  State<ProfileCreationScreen> createState() => _ProfileCreationScreenState();
}

class _ProfileCreationScreenState extends State<ProfileCreationScreen> {
  final _nameCtrl = TextEditingController();
  final _addressCtrl = TextEditingController();
  final _emergencyCtrl = TextEditingController();
  String? _selectedGender;
  String? _selectedBloodGroup;
  DateTime? _dob;
  bool _consent = false;
  bool _isLoading = false;

  final List<String> _genders = ['Male', 'Female', 'Other'];
  final List<String> _bloodGroups = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];

  void _pickDate() async {
    final picked = await showDatePicker(
      context: context,
      initialDate: DateTime(1990),
      firstDate: DateTime(1920),
      lastDate: DateTime.now(),
      builder: (ctx, child) => Theme(data: Theme.of(ctx).copyWith(colorScheme: const ColorScheme.light(primary: AppColors.primary)), child: child!),
    );
    if (picked != null) setState(() => _dob = picked);
  }

  void _submit() async {
    if (_nameCtrl.text.isEmpty || _selectedGender == null || _dob == null || !_consent) return;
    setState(() => _isLoading = true);
    await Future.delayed(const Duration(seconds: 1));
    if (mounted) { setState(() => _isLoading = false); context.go('/home'); }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(title: const Text('Complete Profile'), backgroundColor: AppColors.background),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(24),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text('Tell us about yourself', style: TextStyle(fontFamily: 'PlayfairDisplay', fontSize: 22, fontWeight: FontWeight.w700, color: AppColors.primaryDark)),
            const SizedBox(height: 4),
            const Text('This helps your doctor personalise your Ayurvedic treatment.', style: TextStyle(fontSize: 14, color: AppColors.onSurfaceVariant)),
            const SizedBox(height: 32),
            // Profile photo
            Center(
              child: Stack(
                children: [
                  CircleAvatar(radius: 44, backgroundColor: AppColors.surfaceTint,
                    child: const Icon(Icons.person, size: 48, color: AppColors.primary)),
                  Positioned(bottom: 0, right: 0,
                    child: Container(
                      padding: const EdgeInsets.all(6),
                      decoration: const BoxDecoration(color: AppColors.primary, shape: BoxShape.circle),
                      child: const Icon(Icons.camera_alt, size: 16, color: Colors.white),
                    )),
                ],
              ),
            ),
            const SizedBox(height: 24),
            _label('Full Name *'),
            TextField(controller: _nameCtrl, decoration: const InputDecoration(hintText: 'Enter your full name')),
            const SizedBox(height: 16),
            _label('Date of Birth *'),
            GestureDetector(
              onTap: _pickDate,
              child: Container(
                padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 16),
                decoration: BoxDecoration(
                  color: AppColors.surface, borderRadius: BorderRadius.circular(8),
                  border: Border.all(color: AppColors.outlineVariant, width: 1.5),
                ),
                child: Row(
                  children: [
                    Expanded(child: Text(_dob == null ? 'Select date' : '${_dob!.day}/${_dob!.month}/${_dob!.year}',
                      style: TextStyle(color: _dob == null ? AppColors.outline : AppColors.onSurface))),
                    const Icon(Icons.calendar_today_outlined, color: AppColors.outline, size: 20),
                  ],
                ),
              ),
            ),
            const SizedBox(height: 16),
            _label('Gender *'),
            DropdownButtonFormField<String>(
              value: _selectedGender,
              hint: const Text('Select gender'),
              decoration: InputDecoration(border: OutlineInputBorder(borderRadius: BorderRadius.circular(8), borderSide: const BorderSide(color: AppColors.outlineVariant, width: 1.5))),
              items: _genders.map((g) => DropdownMenuItem(value: g, child: Text(g))).toList(),
              onChanged: (v) => setState(() => _selectedGender = v),
            ),
            const SizedBox(height: 16),
            _label('Blood Group'),
            DropdownButtonFormField<String>(
              value: _selectedBloodGroup,
              hint: const Text('Select blood group'),
              decoration: InputDecoration(border: OutlineInputBorder(borderRadius: BorderRadius.circular(8), borderSide: const BorderSide(color: AppColors.outlineVariant, width: 1.5))),
              items: _bloodGroups.map((g) => DropdownMenuItem(value: g, child: Text(g))).toList(),
              onChanged: (v) => setState(() => _selectedBloodGroup = v),
            ),
            const SizedBox(height: 16),
            _label('Address'),
            TextField(controller: _addressCtrl, maxLines: 2, decoration: const InputDecoration(hintText: 'Your address (optional)')),
            const SizedBox(height: 16),
            _label('Emergency Contact'),
            TextField(controller: _emergencyCtrl, keyboardType: TextInputType.phone, decoration: const InputDecoration(hintText: '+91 XXXXXXXXXX (optional)')),
            const SizedBox(height: 24),
            Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Checkbox(value: _consent, onChanged: (v) => setState(() => _consent = v ?? false), activeColor: AppColors.primary),
                Expanded(child: const Text('I consent to APJ TRUE LIFE processing my health data for treatment purposes. Privacy Policy applies.', style: TextStyle(fontSize: 13, color: AppColors.onSurfaceVariant))),
              ],
            ),
            const SizedBox(height: 24),
            ElevatedButton(
              onPressed: _consent && !_isLoading ? _submit : null,
              child: _isLoading ? const SizedBox(height: 20, width: 20, child: CircularProgressIndicator(color: Colors.white, strokeWidth: 2)) : const Text('Save Profile'),
            ),
            const SizedBox(height: 24),
          ],
        ),
      ),
    );
  }

  Widget _label(String text) => Padding(
    padding: const EdgeInsets.only(bottom: 8),
    child: Text(text, style: const TextStyle(fontSize: 14, fontWeight: FontWeight.w500, color: AppColors.onSurface)),
  );
}
