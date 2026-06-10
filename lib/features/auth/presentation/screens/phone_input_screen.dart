import 'package:flutter/material.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:go_router/go_router.dart';
import '../../../../core/theme/app_colors.dart';

class PhoneInputScreen extends StatefulWidget {
  const PhoneInputScreen({super.key});

  @override
  State<PhoneInputScreen> createState() => _PhoneInputScreenState();
}

class _PhoneInputScreenState extends State<PhoneInputScreen> {
  final _phoneController = TextEditingController();
  bool _loading = false;
  String _error = '';

  Future<void> _sendOtp() async {
    final phone = '+91${_phoneController.text.trim()}';
    if (_phoneController.text.trim().length != 10) {
      setState(() => _error = 'Enter a valid 10-digit mobile number');
      return;
    }
    setState(() { _loading = true; _error = ''; });
    try {
      await FirebaseAuth.instance.verifyPhoneNumber(
        phoneNumber: phone,
        verificationCompleted: (_) {},
        verificationFailed: (e) {
          setState(() { _error = e.message ?? 'Verification failed'; _loading = false; });
        },
        codeSent: (verificationId, _) {
          setState(() => _loading = false);
          context.go('/otp', extra: verificationId);
        },
        codeAutoRetrievalTimeout: (_) {},
        timeout: const Duration(seconds: 60),
      );
    } catch (e) {
      setState(() { _error = e.toString(); _loading = false; });
    }
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
      appBar: AppBar(
        backgroundColor: AppColors.background,
        elevation: 0,
        leading: BackButton(color: AppColors.primary, onPressed: () => context.go('/welcome')),
      ),
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 24),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const SizedBox(height: 24),
              const Text('Enter Your\nMobile Number',
                style: TextStyle(fontFamily: 'PlayfairDisplay', fontSize: 28,
                    fontWeight: FontWeight.bold, color: AppColors.primaryDark, height: 1.3)),
              const SizedBox(height: 12),
              const Text('We\'ll send a 6-digit OTP to verify your number',
                style: TextStyle(fontFamily: 'DMSans', fontSize: 15, color: AppColors.onSurfaceVariant)),
              const SizedBox(height: 40),
              Row(
                children: [
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 14),
                    decoration: BoxDecoration(
                      border: Border.all(color: AppColors.outline),
                      borderRadius: const BorderRadius.only(
                        topLeft: Radius.circular(8), bottomLeft: Radius.circular(8)),
                      color: AppColors.surfaceTint,
                    ),
                    child: const Text('+91', style: TextStyle(fontFamily: 'DMSans', fontSize: 16, fontWeight: FontWeight.w500)),
                  ),
                  Expanded(
                    child: TextField(
                      controller: _phoneController,
                      keyboardType: TextInputType.phone,
                      maxLength: 10,
                      decoration: InputDecoration(
                        hintText: '10-digit mobile number',
                        counterText: '',
                        border: OutlineInputBorder(
                          borderRadius: const BorderRadius.only(
                            topRight: Radius.circular(8), bottomRight: Radius.circular(8)),
                          borderSide: const BorderSide(color: AppColors.outline),
                        ),
                        enabledBorder: OutlineInputBorder(
                          borderRadius: const BorderRadius.only(
                            topRight: Radius.circular(8), bottomRight: Radius.circular(8)),
                          borderSide: const BorderSide(color: AppColors.outline),
                        ),
                        focusedBorder: OutlineInputBorder(
                          borderRadius: const BorderRadius.only(
                            topRight: Radius.circular(8), bottomRight: Radius.circular(8)),
                          borderSide: const BorderSide(color: AppColors.primary, width: 2),
                        ),
                        filled: true,
                        fillColor: Colors.white,
                        contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
                      ),
                    ),
                  ),
                ],
              ),
              if (_error.isNotEmpty) ...
                [const SizedBox(height: 12),
                  Text(_error, style: const TextStyle(color: AppColors.error, fontSize: 13, fontFamily: 'DMSans'))],
              const SizedBox(height: 32),
              ElevatedButton(
                onPressed: _loading ? null : _sendOtp,
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
