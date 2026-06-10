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
  String _gender = 'Male';
  String _bloodGroup = '';
  bool _loading = false;
  bool _consented = false;

  Future<void> _save() async {
    if (!_formKey.currentState!.validate() || !_consented) return;
    setState(() => _loading = true);
    // TODO: POST to /api/v1/patients
    await Future.delayed(const Duration(milliseconds: 800));
    if (mounted) context.go('/home');
  }

  @override
  void dispose() {
    _nameController.dispose();
    _dobController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        backgroundColor: AppColors.background,
        title: const Text('Create Profile'),
      ),
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(24),
          child: Form(
            key: _formKey,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text('Tell us about yourself',
                  style: Theme.of(context).textTheme.displayMedium),
                const SizedBox(height: 8),
                Text('This information helps your Vaidya personalise your treatment.',
                  style: Theme.of(context).textTheme.bodyMedium),
                const SizedBox(height: 32),

                // Full name
                TextFormField(
                  controller: _nameController,
                  decoration: const InputDecoration(labelText: 'Full Name *'),
                  validator: (v) => v == null || v.isEmpty ? 'Required' : null,
                ),
                const SizedBox(height: 16),

                // DOB
                TextFormField(
                  controller: _dobController,
                  readOnly: true,
                  decoration: const InputDecoration(labelText: 'Date of Birth *', suffixIcon: Icon(Icons.calendar_today)),
                  onTap: () async {
                    final picked = await showDatePicker(
                      context: context,
                      initialDate: DateTime(1990),
                      firstDate: DateTime(1920),
                      lastDate: DateTime.now(),
                    );
                    if (picked != null) {
                      _dobController.text =
                          '\${picked.day}/\${picked.month}/\${picked.year}';
                    }
                  },
                  validator: (v) => v == null || v.isEmpty ? 'Required' : null,
                ),
                const SizedBox(height: 16),

                // Gender
                DropdownButtonFormField<String>(
                  value: _gender,
                  decoration: const InputDecoration(labelText: 'Gender *'),
                  items: ['Male', 'Female', 'Other']
                      .map((g) => DropdownMenuItem(value: g, child: Text(g)))
                      .toList(),
                  onChanged: (v) => setState(() => _gender = v!),
                ),
                const SizedBox(height: 16),

                // Blood group
                DropdownButtonFormField<String>(
                  value: _bloodGroup.isEmpty ? null : _bloodGroup,
                  decoration: const InputDecoration(labelText: 'Blood Group (optional)'),
                  items: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-']
                      .map((g) => DropdownMenuItem(value: g, child: Text(g)))
                      .toList(),
                  onChanged: (v) => setState(() => _bloodGroup = v ?? ''),
                ),
                const SizedBox(height: 32),

                // Consent
                Row(
                  children: [
                    Checkbox(
                      value: _consented,
                      activeColor: AppColors.primary,
                      onChanged: (v) => setState(() => _consented = v ?? false),
                    ),
                    Expanded(
                      child: Text(
                        'I agree to the privacy policy and consent to data processing for my healthcare.',
                        style: Theme.of(context).textTheme.bodyMedium,
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 24),

                ElevatedButton(
                  onPressed: _consented && !_loading ? _save : null,
                  child: _loading
                      ? const SizedBox(height: 20, width: 20,
                          child: CircularProgressIndicator(color: Colors.white, strokeWidth: 2))
                      : const Text('Save Profile & Continue'),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
