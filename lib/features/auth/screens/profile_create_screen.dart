import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../../../core/theme/app_theme.dart';

class ProfileCreateScreen extends StatefulWidget {
  const ProfileCreateScreen({super.key});
  @override
  State<ProfileCreateScreen> createState() => _ProfileCreateScreenState();
}

class _ProfileCreateScreenState extends State<ProfileCreateScreen> {
  final _formKey = GlobalKey<FormState>();
  String _name = '', _gender = '', _dob = '', _bloodGroup = '';
  bool _loading = false, _consented = false;

  final _genders = ['Male', 'Female', 'Other'];
  final _bloodGroups = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];

  Future<void> _submit() async {
    if (!_formKey.currentState!.validate()) return;
    if (!_consented) {
      ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text('Please accept the privacy notice.')));
      return;
    }
    _formKey.currentState!.save();
    setState(() => _loading = true);
    await Future.delayed(const Duration(seconds: 1));
    setState(() => _loading = false);
    if (mounted) context.go('/home');
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(title: const Text('Create Profile'), backgroundColor: AppColors.primary, foregroundColor: Colors.white),
      body: Form(
        key: _formKey,
        child: ListView(
          padding: const EdgeInsets.all(24),
          children: [
            const Text('Tell us about yourself', style: TextStyle(fontSize: 20, fontFamily: 'PlayfairDisplay', fontWeight: FontWeight.bold, color: AppColors.primaryDark)),
            const SizedBox(height: 4),
            const Text('This information helps your doctor provide personalised care.', style: TextStyle(fontSize: 13, color: AppColors.onSurfaceVariant)),
            const SizedBox(height: 32),
            TextFormField(
              decoration: const InputDecoration(labelText: 'Full Name *'),
              validator: (v) => v == null || v.isEmpty ? 'Required' : null,
              onSaved: (v) => _name = v ?? '',
            ),
            const SizedBox(height: 16),
            DropdownButtonFormField<String>(
              decoration: const InputDecoration(labelText: 'Gender *'),
              items: _genders.map((g) => DropdownMenuItem(value: g, child: Text(g))).toList(),
              onChanged: (v) => setState(() => _gender = v ?? ''),
              validator: (v) => v == null ? 'Required' : null,
            ),
            const SizedBox(height: 16),
            TextFormField(
              decoration: const InputDecoration(labelText: 'Date of Birth *', hintText: 'DD/MM/YYYY'),
              keyboardType: TextInputType.datetime,
              validator: (v) => v == null || v.isEmpty ? 'Required' : null,
              onSaved: (v) => _dob = v ?? '',
            ),
            const SizedBox(height: 16),
            DropdownButtonFormField<String>(
              decoration: const InputDecoration(labelText: 'Blood Group'),
              items: _bloodGroups.map((g) => DropdownMenuItem(value: g, child: Text(g))).toList(),
              onChanged: (v) => setState(() => _bloodGroup = v ?? ''),
            ),
            const SizedBox(height: 24),
            Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Checkbox(
                  value: _consented,
                  onChanged: (v) => setState(() => _consented = v ?? false),
                  activeColor: AppColors.primary,
                ),
                const Expanded(
                  child: Padding(
                    padding: EdgeInsets.only(top: 12),
                    child: Text('I agree to the Privacy Policy and consent to APJ TRUE LIFE processing my health data.', style: TextStyle(fontSize: 13, color: AppColors.onSurfaceVariant)),
                  ),
                ),
              ],
            ),
            const SizedBox(height: 32),
            ElevatedButton(
              onPressed: _loading ? null : _submit,
              child: _loading
                  ? const SizedBox(height: 20, width: 20, child: CircularProgressIndicator(color: Colors.white, strokeWidth: 2))
                  : const Text('Continue'),
            ),
          ],
        ),
      ),
    );
  }
}
