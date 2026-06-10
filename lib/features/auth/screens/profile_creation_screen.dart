import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../../../core/theme/app_colors.dart';

const _genders = ['Male', 'Female', 'Other'];
const _bloodGroups = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];

class ProfileCreationScreen extends StatefulWidget {
  const ProfileCreationScreen({super.key});
  @override
  State<ProfileCreationScreen> createState() => _ProfileCreationScreenState();
}

class _ProfileCreationScreenState extends State<ProfileCreationScreen> {
  final _formKey = GlobalKey<FormState>();
  final _name = TextEditingController();
  DateTime? _dob;
  String? _gender;
  String? _bloodGroup;
  final _address = TextEditingController();
  final _emergency = TextEditingController();
  bool _consent = false;
  bool _loading = false;

  @override
  void dispose() {
    _name.dispose(); _address.dispose(); _emergency.dispose();
    super.dispose();
  }

  Future<void> _pickDob() async {
    final picked = await showDatePicker(
      context: context,
      initialDate: DateTime(1990),
      firstDate: DateTime(1900),
      lastDate: DateTime.now(),
    );
    if (picked != null) setState(() => _dob = picked);
  }

  Future<void> _submit() async {
    if (!_formKey.currentState!.validate() || !_consent || _dob == null || _gender == null) return;
    setState(() => _loading = true);
    await Future.delayed(const Duration(milliseconds: 800)); // TODO: POST to patient-service
    if (mounted) context.go('/home');
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(title: const Text('Create Profile'), centerTitle: true),
      body: Form(
        key: _formKey,
        child: ListView(
          padding: const EdgeInsets.all(24),
          children: [
            const Text('Tell us about yourself', style: TextStyle(fontSize: 22, fontWeight: FontWeight.w700, color: AppColors.primaryDark)),
            const SizedBox(height: 24),
            TextFormField(
              controller: _name,
              decoration: const InputDecoration(labelText: 'Full Name *'),
              validator: (v) => (v == null || v.isEmpty) ? 'Required' : null,
            ),
            const SizedBox(height: 16),
            InkWell(
              onTap: _pickDob,
              child: InputDecorator(
                decoration: const InputDecoration(labelText: 'Date of Birth *'),
                child: Text(
                  _dob == null ? 'Select date' : '${_dob!.day}/${_dob!.month}/${_dob!.year}',
                  style: TextStyle(color: _dob == null ? AppColors.outline : AppColors.onSurface),
                ),
              ),
            ),
            const SizedBox(height: 16),
            DropdownButtonFormField<String>(
              value: _gender,
              decoration: const InputDecoration(labelText: 'Gender *'),
              items: _genders.map((g) => DropdownMenuItem(value: g, child: Text(g))).toList(),
              onChanged: (v) => setState(() => _gender = v),
              validator: (v) => v == null ? 'Required' : null,
            ),
            const SizedBox(height: 16),
            DropdownButtonFormField<String>(
              value: _bloodGroup,
              decoration: const InputDecoration(labelText: 'Blood Group (optional)'),
              items: _bloodGroups.map((g) => DropdownMenuItem(value: g, child: Text(g))).toList(),
              onChanged: (v) => setState(() => _bloodGroup = v),
            ),
            const SizedBox(height: 16),
            TextFormField(
              controller: _address,
              decoration: const InputDecoration(labelText: 'Address (optional)'),
              maxLines: 2,
            ),
            const SizedBox(height: 16),
            TextFormField(
              controller: _emergency,
              decoration: const InputDecoration(labelText: 'Emergency Contact (optional)'),
              keyboardType: TextInputType.phone,
            ),
            const SizedBox(height: 24),
            Row(
              children: [
                Checkbox(
                  value: _consent,
                  activeColor: AppColors.primary,
                  onChanged: (v) => setState(() => _consent = v ?? false),
                ),
                const Expanded(
                  child: Text(
                    'I agree to the Privacy Policy and consent to data processing',
                    style: TextStyle(fontSize: 13, color: AppColors.onSurfaceVariant),
                  ),
                ),
              ],
            ),
            const SizedBox(height: 32),
            ElevatedButton(
              onPressed: _loading ? null : _submit,
              child: _loading
                  ? const SizedBox(height: 20, width: 20, child: CircularProgressIndicator(color: Colors.white, strokeWidth: 2))
                  : const Text('Save & Continue'),
            ),
          ],
        ),
      ),
    );
  }
}
