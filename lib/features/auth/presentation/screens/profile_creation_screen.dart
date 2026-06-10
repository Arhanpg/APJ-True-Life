import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../../../../core/theme/app_colors.dart';

class ProfileCreationScreen extends StatefulWidget {
  const ProfileCreationScreen({super.key});
  @override
  State<ProfileCreationScreen> createState() => _ProfileCreationScreenState();
}

class _ProfileCreationScreenState extends State<ProfileCreationScreen> {
  final _formKey = GlobalKey<FormState>();
  final _nameCtrl    = TextEditingController();
  final _dobCtrl     = TextEditingController();
  String _gender     = '';
  String _bloodGroup = '';
  bool _consent      = false;
  bool _loading      = false;

  static const _genders     = ['Male', 'Female', 'Other'];
  static const _bloodGroups = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];

  Future<void> _submit() async {
    if (!_formKey.currentState!.validate() || !_consent) return;
    setState(() => _loading = true);
    // TODO: POST to /api/v1/patients
    await Future.delayed(const Duration(milliseconds: 800));
    if (!mounted) return;
    context.go('/home');
  }

  @override
  void dispose() {
    _nameCtrl.dispose();
    _dobCtrl.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(title: const Text('Create Your Profile'), backgroundColor: AppColors.primary),
      body: Form(
        key: _formKey,
        child: ListView(
          padding: const EdgeInsets.all(24),
          children: [
            const Text('Tell us about yourself',
              style: TextStyle(fontFamily: 'PlayfairDisplay', fontSize: 22,
                  fontWeight: FontWeight.bold, color: AppColors.primaryDark)),
            const SizedBox(height: 24),
            TextFormField(
              controller: _nameCtrl,
              decoration: const InputDecoration(labelText: 'Full Name *'),
              validator: (v) => (v == null || v.isEmpty) ? 'Name is required' : null,
            ),
            const SizedBox(height: 16),
            TextFormField(
              controller: _dobCtrl,
              readOnly: true,
              decoration: const InputDecoration(labelText: 'Date of Birth *', suffixIcon: Icon(Icons.calendar_today)),
              onTap: () async {
                final d = await showDatePicker(
                  context: context,
                  initialDate: DateTime(1990),
                  firstDate: DateTime(1920),
                  lastDate: DateTime.now(),
                );
                if (d != null) {
                  _dobCtrl.text = '${d.day.toString().padLeft(2,'0')}/${d.month.toString().padLeft(2,'0')}/${d.year}';
                }
              },
              validator: (v) => (v == null || v.isEmpty) ? 'Date of birth is required' : null,
            ),
            const SizedBox(height: 16),
            DropdownButtonFormField<String>(
              value: _gender.isEmpty ? null : _gender,
              decoration: const InputDecoration(labelText: 'Gender *'),
              items: _genders.map((g) => DropdownMenuItem(value: g, child: Text(g))).toList(),
              onChanged: (v) => setState(() => _gender = v ?? ''),
              validator: (v) => (v == null || v.isEmpty) ? 'Gender is required' : null,
            ),
            const SizedBox(height: 16),
            DropdownButtonFormField<String>(
              value: _bloodGroup.isEmpty ? null : _bloodGroup,
              decoration: const InputDecoration(labelText: 'Blood Group'),
              items: _bloodGroups.map((g) => DropdownMenuItem(value: g, child: Text(g))).toList(),
              onChanged: (v) => setState(() => _bloodGroup = v ?? ''),
            ),
            const SizedBox(height: 24),
            Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Checkbox(
                  value: _consent,
                  activeColor: AppColors.primary,
                  onChanged: (v) => setState(() => _consent = v ?? false),
                ),
                Expanded(
                  child: Padding(
                    padding: const EdgeInsets.only(top: 12),
                    child: Text(
                      'I agree to the Privacy Policy and consent to APJ TRUE LIFE processing my health data.',
                      style: TextStyle(fontSize: 13, color: AppColors.onSurfaceVariant),
                    ),
                  ),
                ),
              ],
            ),
            const SizedBox(height: 24),
            ElevatedButton(
              onPressed: (_loading || !_consent) ? null : _submit,
              child: _loading
                  ? const SizedBox(height: 20, width: 20,
                      child: CircularProgressIndicator(color: Colors.white, strokeWidth: 2))
                  : const Text('Save & Continue'),
            ),
          ],
        ),
      ),
    );
  }
}
