import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:go_router/go_router.dart';
import '../../../core/theme/app_theme.dart';

class PhoneScreen extends StatefulWidget {
  const PhoneScreen({super.key});
  @override
  State<PhoneScreen> createState() => _PhoneScreenState();
}

class _PhoneScreenState extends State<PhoneScreen> {
  final _phoneController = TextEditingController();
  bool _loading = false;
  String _error = '';

  @override
  void dispose() { _phoneController.dispose(); super.dispose(); }

  void _sendOtp() async {
    final phone = _phoneController.text.trim();
    if (phone.length != 10) {
      setState(() => _error = 'Enter a valid 10-digit mobile number.');
      return;
    }
    setState(() { _loading = true; _error = ''; });
    // TODO: Firebase Phone Auth - verifyPhoneNumber
    await Future.delayed(const Duration(seconds: 1));
    setState(() => _loading = false);
    if (mounted) context.go('/otp', extra: '+91$phone');
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(24),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const SizedBox(height: 32),
              Container(
                width: 56, height: 56,
                decoration: BoxDecoration(color: AppColors.primary, borderRadius: BorderRadius.circular(14)),
                child: const Center(child: Text('A', style: TextStyle(color: AppColors.onPrimary, fontSize: 28, fontFamily: 'PlayfairDisplay', fontWeight: FontWeight.bold))),
              ),
              const SizedBox(height: 32),
              const Text('Enter your mobile number', style: TextStyle(fontSize: 24, fontFamily: 'PlayfairDisplay', fontWeight: FontWeight.bold, color: AppColors.primaryDark)),
              const SizedBox(height: 8),
              const Text('We'll send you an OTP to verify your number', style: TextStyle(fontSize: 14, color: AppColors.onSurfaceVariant)),
              const SizedBox(height: 40),
              Row(
                children: [
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 16),
                    decoration: BoxDecoration(
                      color: AppColors.surface,
                      border: Border.all(color: AppColors.outlineVariant),
                      borderRadius: BorderRadius.circular(12),
                    ),
                    child: const Text('+91', style: TextStyle(fontSize: 15, fontWeight: FontWeight.w600, color: AppColors.onSurface)),
                  ),
                  const SizedBox(width: 12),
                  Expanded(
                    child: TextFormField(
                      controller: _phoneController,
                      keyboardType: TextInputType.phone,
                      maxLength: 10,
                      inputFormatters: [FilteringTextInputFormatter.digitsOnly],
                      decoration: const InputDecoration(hintText: '10-digit mobile number', counterText: ''),
                      style: const TextStyle(fontSize: 16, letterSpacing: 0.5),
                    ),
                  ),
                ],
              ),
              if (_error.isNotEmpty) ...[const SizedBox(height: 8), Text(_error, style: const TextStyle(color: AppColors.error, fontSize: 13))],
              const SizedBox(height: 32),
              ElevatedButton(
                onPressed: _loading ? null : _sendOtp,
                child: _loading
                    ? const SizedBox(height: 20, width: 20, child: CircularProgressIndicator(color: Colors.white, strokeWidth: 2))
                    : const Text('Send OTP'),
              ),
              const Spacer(),
              const Text('By continuing, you agree to our Terms of Service and Privacy Policy.', style: TextStyle(fontSize: 12, color: AppColors.outline), textAlign: TextAlign.center),
              const SizedBox(height: 16),
            ],
          ),
        ),
      ),
    );
  }
}
