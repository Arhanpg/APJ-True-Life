import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:go_router/go_router.dart';
import '../../../core/theme/app_colors.dart';

class PhoneEntryScreen extends StatefulWidget {
  const PhoneEntryScreen({super.key});
  @override
  State<PhoneEntryScreen> createState() => _PhoneEntryScreenState();
}

class _PhoneEntryScreenState extends State<PhoneEntryScreen> {
  final _phoneController = TextEditingController();
  bool _isLoading = false;
  String? _error;

  bool get _isValid => _phoneController.text.length == 10;

  void _sendOtp() async {
    if (!_isValid) return;
    setState(() { _isLoading = true; _error = null; });
    // Firebase Phone Auth would go here
    await Future.delayed(const Duration(seconds: 1));
    if (mounted) {
      setState(() => _isLoading = false);
      context.go('/otp', extra: '+91${_phoneController.text}');
    }
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
              const SizedBox(height: 40),
              Container(
                width: 56, height: 56,
                decoration: BoxDecoration(
                  color: AppColors.surfaceTint,
                  borderRadius: BorderRadius.circular(16),
                ),
                child: const Icon(Icons.local_florist, color: AppColors.primary, size: 32),
              ),
              const SizedBox(height: 32),
              const Text('Sign In',
                style: TextStyle(
                  fontFamily: 'PlayfairDisplay',
                  fontSize: 32, fontWeight: FontWeight.w700,
                  color: AppColors.primaryDark,
                )),
              const SizedBox(height: 8),
              const Text('Enter your mobile number to receive a one-time password.',
                style: TextStyle(fontSize: 15, color: AppColors.onSurfaceVariant, height: 1.5)),
              const SizedBox(height: 40),
              const Text('Mobile Number', style: TextStyle(fontSize: 14, fontWeight: FontWeight.w500, color: AppColors.onSurface)),
              const SizedBox(height: 8),
              Row(
                children: [
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 16),
                    decoration: BoxDecoration(
                      color: AppColors.surfaceTint,
                      borderRadius: BorderRadius.circular(8),
                      border: Border.all(color: AppColors.outlineVariant, width: 1.5),
                    ),
                    child: const Text('+91', style: TextStyle(fontWeight: FontWeight.w600, fontSize: 16, color: AppColors.onSurface)),
                  ),
                  const SizedBox(width: 8),
                  Expanded(
                    child: TextField(
                      controller: _phoneController,
                      keyboardType: TextInputType.phone,
                      maxLength: 10,
                      inputFormatters: [FilteringTextInputFormatter.digitsOnly],
                      onChanged: (_) => setState(() {}),
                      decoration: const InputDecoration(
                        hintText: '9876543210',
                        counterText: '',
                      ),
                    ),
                  ),
                ],
              ),
              if (_error != null) ...[const SizedBox(height: 8), Text(_error!, style: const TextStyle(color: AppColors.error, fontSize: 13))],
              const SizedBox(height: 32),
              ElevatedButton(
                onPressed: _isValid && !_isLoading ? _sendOtp : null,
                child: _isLoading
                    ? const SizedBox(height: 20, width: 20, child: CircularProgressIndicator(color: Colors.white, strokeWidth: 2))
                    : const Text('Send OTP'),
              ),
              const Spacer(),
              Center(
                child: Text('AYUSH TV National Health Award 2024',
                  style: TextStyle(fontSize: 12, color: AppColors.accentGold, fontWeight: FontWeight.w500)),
              ),
              const SizedBox(height: 16),
            ],
          ),
        ),
      ),
    );
  }
}
