import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../../core/theme/app_theme.dart';

class ProfileCreationScreen extends StatefulWidget {
  const ProfileCreationScreen({super.key});
  @override
  State<ProfileCreationScreen> createState() => _ProfileCreationScreenState();
}

class _ProfileCreationScreenState extends State<ProfileCreationScreen> {
  final _formKey = GlobalKey<FormState>();
  String _gender = 'Male';
  bool _consent = false;
  bool _loading = false;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(title: const Text('Create Profile'), backgroundColor: AppColors.background, elevation: 0),
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(24),
          child: Form(
            key: _formKey,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Text('Tell us about yourself', style: TextStyle(fontSize: 22, fontWeight: FontWeight.w700, color: AppColors.primaryDark, fontFamily: 'DM Sans')),
                const SizedBox(height: 6),
                const Text('This helps your doctor provide personalised care', style: TextStyle(color: AppColors.onSurfaceVariant, fontSize: 14, fontFamily: 'DM Sans')),
                const SizedBox(height: 32),

                // Profile photo
                Center(
                  child: Stack(
                    children: [
                      CircleAvatar(radius: 48, backgroundColor: AppColors.primary, child: const Icon(Icons.person, color: AppColors.accentGold, size: 48)),
                      Positioned(
                        bottom: 0, right: 0,
                        child: Container(
                          width: 30, height: 30,
                          decoration: BoxDecoration(color: AppColors.accentGold, shape: BoxShape.circle),
                          child: const Icon(Icons.camera_alt, color: AppColors.primary, size: 16),
                        ),
                      ),
                    ],
                  ),
                ),
                const SizedBox(height: 28),

                _field('Full Name *', 'Enter your full name', Icons.person_outline),
                const SizedBox(height: 16),
                _field('Date of Birth *', 'DD/MM/YYYY', Icons.calendar_today_outlined),
                const SizedBox(height: 16),

                // Gender
                const Text('Gender *', style: TextStyle(fontFamily: 'DM Sans', fontSize: 13, fontWeight: FontWeight.w500, color: AppColors.onSurfaceVariant)),
                const SizedBox(height: 8),
                Row(
                  children: ['Male', 'Female', 'Other'].map((g) => Expanded(
                    child: GestureDetector(
                      onTap: () => setState(() => _gender = g),
                      child: Container(
                        margin: const EdgeInsets.only(right: 8),
                        padding: const EdgeInsets.symmetric(vertical: 12),
                        decoration: BoxDecoration(
                          color: _gender == g ? AppColors.primary : AppColors.surface,
                          border: Border.all(color: _gender == g ? AppColors.primary : AppColors.outlineVariant),
                          borderRadius: BorderRadius.circular(10),
                        ),
                        child: Text(g, textAlign: TextAlign.center, style: TextStyle(fontFamily: 'DM Sans', fontWeight: FontWeight.w600, fontSize: 13, color: _gender == g ? Colors.white : AppColors.onSurfaceVariant)),
                      ),
                    ),
                  )).toList(),
                ),
                const SizedBox(height: 16),
                _field('Blood Group', 'e.g. A+, O-', Icons.bloodtype_outlined, required: false),
                const SizedBox(height: 16),
                _field('Address', 'Your address (optional)', Icons.location_on_outlined, required: false),
                const SizedBox(height: 16),
                _field('Emergency Contact', '+91 mobile number', Icons.emergency_outlined, required: false),
                const SizedBox(height: 28),

                // Consent
                Container(
                  padding: const EdgeInsets.all(14),
                  decoration: BoxDecoration(color: AppColors.surfaceTint, borderRadius: BorderRadius.circular(10)),
                  child: Row(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Checkbox(value: _consent, onChanged: (v) => setState(() => _consent = v ?? false), activeColor: AppColors.primary),
                      const Expanded(child: Padding(
                        padding: EdgeInsets.only(top: 2),
                        child: Text('I agree to the Privacy Policy and consent to my health data being processed for medical care purposes.', style: TextStyle(fontSize: 12, fontFamily: 'DM Sans', color: AppColors.onSurfaceVariant, height: 1.5)),
                      )),
                    ],
                  ),
                ),
                const SizedBox(height: 24),
                ElevatedButton(
                  onPressed: (_consent && !_loading) ? () async {
                    setState(() => _loading = true);
                    await Future.delayed(const Duration(seconds: 1));
                    if (mounted) context.go('/home');
                  } : null,
                  child: _loading ? const SizedBox(width: 22, height: 22, child: CircularProgressIndicator(color: Colors.white, strokeWidth: 2)) : const Text('Create Profile & Continue'),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget _field(String label, String hint, IconData icon, {bool required = true}) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(label, style: const TextStyle(fontFamily: 'DM Sans', fontSize: 13, fontWeight: FontWeight.w500, color: AppColors.onSurfaceVariant)),
        const SizedBox(height: 8),
        TextFormField(
          decoration: InputDecoration(hintText: hint, prefixIcon: Icon(icon, color: AppColors.outline, size: 20)),
          validator: required ? (v) => (v == null || v.isEmpty) ? 'Required' : null : null,
        ),
      ],
    );
  }
}
