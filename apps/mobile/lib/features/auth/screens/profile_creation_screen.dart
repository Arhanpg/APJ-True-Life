import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../../../core/theme/app_colors.dart';

class ProfileCreationScreen extends StatefulWidget {
  const ProfileCreationScreen({super.key});

  @override
  State<ProfileCreationScreen> createState() => _ProfileCreationScreenState();
}

class _ProfileCreationScreenState extends State<ProfileCreationScreen> {
  final _formKey = GlobalKey<FormState>();
  final _nameController = TextEditingController();
  final _dobController = TextEditingController();
  String? _gender;
  String? _bloodGroup;
  bool _consented = false;
  bool _loading = false;

  final _genders = ['Male', 'Female', 'Other'];
  final _bloodGroups = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];

  @override
  void dispose() {
    _nameController.dispose();
    _dobController.dispose();
    super.dispose();
  }

  Future<void> _pickDate() async {
    final picked = await showDatePicker(
      context: context,
      initialDate: DateTime(1990),
      firstDate: DateTime(1920),
      lastDate: DateTime.now(),
      builder: (ctx, child) => Theme(
        data: Theme.of(ctx).copyWith(colorScheme: const ColorScheme.light(primary: AppColors.primary)),
        child: child!,
      ),
    );
    if (picked != null) {
      _dobController.text = '${picked.day}/${picked.month}/${picked.year}';
      setState(() {});
    }
  }

  Future<void> _submit() async {
    if (!_formKey.currentState!.validate() || _gender == null || !_consented) return;
    setState(() => _loading = true);
    await Future.delayed(const Duration(seconds: 1));
    if (mounted) {
      setState(() => _loading = false);
      context.go('/home');
    }
  }

  Widget _field(String label, Widget child) => Column(
    crossAxisAlignment: CrossAxisAlignment.start,
    children: [
      Text(label, style: const TextStyle(fontFamily: 'DMSans', fontSize: 13, fontWeight: FontWeight.w500, color: AppColors.onSurface)),
      const SizedBox(height: 6),
      child,
    ],
  );

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        title: const Text('Create Profile'),
        backgroundColor: AppColors.primary,
      ),
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(20),
          child: Form(
            key: _formKey,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Text(
                  'Tell us about yourself',
                  style: TextStyle(fontFamily: 'PlayfairDisplay', fontSize: 24, fontWeight: FontWeight.w700, color: AppColors.primaryDark),
                ),
                const SizedBox(height: 6),
                const Text('This helps your doctor personalise your treatment', style: TextStyle(fontFamily: 'DMSans', fontSize: 13, color: AppColors.outline)),
                const SizedBox(height: 28),
                // Profile photo placeholder
                Center(
                  child: GestureDetector(
                    onTap: () {},
                    child: Container(
                      width: 88,
                      height: 88,
                      decoration: BoxDecoration(
                        shape: BoxShape.circle,
                        color: AppColors.surfaceTint,
                        border: Border.all(color: AppColors.primary, width: 2),
                      ),
                      child: const Icon(Icons.camera_alt_outlined, color: AppColors.primary, size: 32),
                    ),
                  ),
                ),
                const SizedBox(height: 24),
                _field('Full Name *', TextFormField(
                  controller: _nameController,
                  validator: (v) => (v == null || v.isEmpty) ? 'Required' : null,
                  decoration: const InputDecoration(hintText: 'Enter your full name'),
                  onChanged: (_) => setState(() {}),
                )),
                const SizedBox(height: 16),
                _field('Date of Birth *', TextFormField(
                  controller: _dobController,
                  readOnly: true,
                  onTap: _pickDate,
                  validator: (v) => (v == null || v.isEmpty) ? 'Required' : null,
                  decoration: const InputDecoration(
                    hintText: 'Select date',
                    suffixIcon: Icon(Icons.calendar_today_outlined, size: 18, color: AppColors.outline),
                  ),
                )),
                const SizedBox(height: 16),
                _field('Gender *', DropdownButtonFormField<String>(
                  value: _gender,
                  hint: const Text('Select gender', style: TextStyle(color: AppColors.outline, fontFamily: 'DMSans', fontSize: 14)),
                  onChanged: (v) => setState(() => _gender = v),
                  validator: (v) => v == null ? 'Required' : null,
                  decoration: const InputDecoration(),
                  items: _genders.map((g) => DropdownMenuItem(value: g, child: Text(g, style: const TextStyle(fontFamily: 'DMSans')))).toList(),
                )),
                const SizedBox(height: 16),
                _field('Blood Group', DropdownButtonFormField<String>(
                  value: _bloodGroup,
                  hint: const Text('Select (optional)', style: TextStyle(color: AppColors.outline, fontFamily: 'DMSans', fontSize: 14)),
                  onChanged: (v) => setState(() => _bloodGroup = v),
                  decoration: const InputDecoration(),
                  items: _bloodGroups.map((g) => DropdownMenuItem(value: g, child: Text(g, style: const TextStyle(fontFamily: 'DMSans')))).toList(),
                )),
                const SizedBox(height: 24),
                Row(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Checkbox(
                      value: _consented,
                      onChanged: (v) => setState(() => _consented = v ?? false),
                      activeColor: AppColors.primary,
                    ),
                    const SizedBox(width: 8),
                    const Expanded(
                      child: Text(
                        'I agree to the Privacy Policy and consent to data processing for my healthcare.',
                        style: TextStyle(fontFamily: 'DMSans', fontSize: 13, color: AppColors.onSurfaceVariant, height: 1.5),
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 24),
                ElevatedButton(
                  onPressed: _formKey.currentState?.validate() == true && _gender != null && _consented && !_loading ? _submit : null,
                  child: _loading
                      ? const SizedBox(height: 22, width: 22, child: CircularProgressIndicator(strokeWidth: 2, color: Colors.white))
                      : const Text('CREATE PROFILE'),
                ),
                const SizedBox(height: 16),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
