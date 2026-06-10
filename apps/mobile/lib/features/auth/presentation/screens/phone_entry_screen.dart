import 'package:flutter/material.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:go_router/go_router.dart';
import '../../../../core/theme/app_colors.dart';

class PhoneEntryScreen extends StatefulWidget {
  const PhoneEntryScreen({super.key});

  @override
  State<PhoneEntryScreen> createState() => _PhoneEntryScreenState();
}

class _PhoneEntryScreenState extends State<PhoneEntryScreen> {
  final _phoneController = TextEditingController();
  bool _loading = false;
  String? _error;

  Future<void> _sendOtp() async {
    final phone = _phoneController.text.trim();
    if (phone.length != 10) {
      setState(() => _error = 'Enter a valid 10-digit mobile number');
      return;
    }
    setState(() { _loading = true; _error = null; });
    try {
      await FirebaseAuth.instance.verifyPhoneNumber(
        phoneNumber: '+91$phone',
        timeout: const Duration(seconds: 60),
        verificationCompleted: (cred) {},
        verificationFailed: (e) {
          setState(() { _loading = false; _error = e.message ?? 'Verification failed'; });
        },
        codeSent: (verificationId, resendToken) {
          setState(() => _loading = false);
          context.go('/otp?phone=$phone&verificationId=$verificationId');
        },
        codeAutoRetrievalTimeout: (_) {},
      );
    } catch (e) {
      setState(() { _loading = false; _error = e.toString(); });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 28),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const SizedBox(height: 40),
              Container(
                width: 56, height: 56,
                decoration: BoxDecoration(color: AppColors.primary, borderRadius: BorderRadius.circular(14)),
                child: const Center(child: Text('A', style: TextStyle(color: Colors.white, fontSize: 28, fontWeight: FontWeight.bold))),
              ),
              const SizedBox(height: 28),
              const Text('Enter your mobile number', style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold, color: AppColors.primaryDark)),
              const SizedBox(height: 8),
              const Text('We\'ll send a 6-digit OTP to verify your identity.', style: TextStyle(fontSize: 14, color: AppColors.textMuted, height: 1.4)),
              const SizedBox(height: 36),
              // Phone input
              TextFormField(
                controller: _phoneController,
                keyboardType: TextInputType.phone,
                maxLength: 10,
                style: const TextStyle(fontSize: 18, fontWeight: FontWeight.w500),
                decoration: InputDecoration(
                  labelText: 'Mobile Number',
                  counterText: '',
                  prefixIcon: Container(
                    margin: const EdgeInsets.all(12),
                    padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
                    decoration: BoxDecoration(
                      color: AppColors.surfaceTint,
                      borderRadius: BorderRadius.circular(8),
                    ),
                    child: const Text('+91', style: TextStyle(fontWeight: FontWeight.w700, color: AppColors.primary, fontSize: 14)),
                  ),
                ),
              ),
              if (_error != null) ...
                [
                  const SizedBox(height: 10),
                  Text(_error!, style: const TextStyle(color: AppColors.error, fontSize: 13)),
                ],
              const SizedBox(height: 28),
              ElevatedButton(
                onPressed: _loading ? null : _sendOtp,
                child: _loading
                    ? const SizedBox(width: 22, height: 22, child: CircularProgressIndicator(color: Colors.white, strokeWidth: 2))
                    : const Text('Send OTP'),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
