import 'package:flutter/material.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:go_router/go_router.dart';
import '../../../core/theme/app_colors.dart';

class PhoneEntryScreen extends StatefulWidget {
  const PhoneEntryScreen({super.key});

  @override
  State<PhoneEntryScreen> createState() => _PhoneEntryScreenState();
}

class _PhoneEntryScreenState extends State<PhoneEntryScreen> {
  final _phoneController = TextEditingController();
  bool _loading = false;
  String? _error;

  String get _fullPhone => '+91\${_phoneController.text.trim()}';

  bool get _isValid => _phoneController.text.trim().length == 10;

  Future<void> _sendOtp() async {
    if (!_isValid) return;
    setState(() { _loading = true; _error = null; });
    await FirebaseAuth.instance.verifyPhoneNumber(
      phoneNumber: _fullPhone,
      timeout: const Duration(seconds: 60),
      verificationCompleted: (credential) async {
        await FirebaseAuth.instance.signInWithCredential(credential);
        if (mounted) context.go('/home');
      },
      verificationFailed: (e) {
        setState(() { _loading = false; _error = e.message; });
      },
      codeSent: (verificationId, _) {
        setState(() => _loading = false);
        context.go('/otp', extra: verificationId);
      },
      codeAutoRetrievalTimeout: (_) {},
    );
  }

  @override
  void dispose() {
    _phoneController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(backgroundColor: AppColors.background, elevation: 0,
        leading: IconButton(icon: const Icon(Icons.arrow_back), onPressed: () => context.go('/onboarding')),
      ),
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(24),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const SizedBox(height: 24),
              Text('Enter your mobile number', style: Theme.of(context).textTheme.displayMedium),
              const SizedBox(height: 8),
              Text('We will send a 6-digit OTP to verify your number.',
                style: Theme.of(context).textTheme.bodyMedium),
              const SizedBox(height: 40),
              Row(
                children: [
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 18),
                    decoration: BoxDecoration(
                      border: Border.all(color: AppColors.outlineVariant),
                      borderRadius: BorderRadius.circular(12),
                      color: AppColors.surfaceTint,
                    ),
                    child: const Text('+91', style: TextStyle(fontSize: 16, fontWeight: FontWeight.w500)),
                  ),
                  const SizedBox(width: 12),
                  Expanded(
                    child: TextField(
                      controller: _phoneController,
                      keyboardType: TextInputType.phone,
                      maxLength: 10,
                      onChanged: (_) => setState(() {}),
                      decoration: const InputDecoration(
                        hintText: '10-digit mobile number',
                        counterText: '',
                      ),
                    ),
                  ),
                ],
              ),
              if (_error != null) ...[
                const SizedBox(height: 12),
                Text(_error!, style: const TextStyle(color: AppColors.error, fontSize: 13)),
              ],
              const SizedBox(height: 32),
              ElevatedButton(
                onPressed: _isValid && !_loading ? _sendOtp : null,
                child: _loading
                    ? const SizedBox(height: 20, width: 20,
                        child: CircularProgressIndicator(color: Colors.white, strokeWidth: 2))
                    : const Text('Send OTP'),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
