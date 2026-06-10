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
  bool _loading = false;

  @override
  void dispose() {
    _phoneController.dispose();
    super.dispose();
  }

  Future<void> _sendOtp() async {
    if (_phoneController.text.length != 10) return;
    setState(() => _loading = true);
    await Future.delayed(const Duration(seconds: 1));
    if (mounted) {
      setState(() => _loading = false);
      context.go('/otp?phone=+91${_phoneController.text}');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        backgroundColor: AppColors.background,
        elevation: 0,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back, color: AppColors.onSurface),
          onPressed: () => context.go('/onboarding'),
        ),
      ),
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(24),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const SizedBox(height: 16),
              const Text(
                'Enter your\nmobile number',
                style: TextStyle(
                  fontFamily: 'PlayfairDisplay',
                  fontSize: 30,
                  fontWeight: FontWeight.w700,
                  color: AppColors.primaryDark,
                  height: 1.2,
                ),
              ),
              const SizedBox(height: 10),
              const Text(
                'We will send a 6-digit OTP to verify your number.',
                style: TextStyle(fontFamily: 'DMSans', fontSize: 14, color: AppColors.outline),
              ),
              const SizedBox(height: 36),
              const Text('Mobile Number', style: TextStyle(fontFamily: 'DMSans', fontSize: 13, fontWeight: FontWeight.w500, color: AppColors.onSurface)),
              const SizedBox(height: 8),
              Row(
                children: [
                  Container(
                    height: 52,
                    padding: const EdgeInsets.symmetric(horizontal: 14),
                    decoration: BoxDecoration(
                      color: AppColors.surfaceTint,
                      borderRadius: BorderRadius.circular(10),
                      border: Border.all(color: AppColors.outlineVariant),
                    ),
                    child: const Center(
                      child: Text('+91', style: TextStyle(fontFamily: 'DMSans', fontSize: 15, fontWeight: FontWeight.w600, color: AppColors.primary)),
                    ),
                  ),
                  const SizedBox(width: 10),
                  Expanded(
                    child: TextField(
                      controller: _phoneController,
                      keyboardType: TextInputType.phone,
                      maxLength: 10,
                      inputFormatters: [FilteringTextInputFormatter.digitsOnly],
                      onChanged: (_) => setState(() {}),
                      decoration: const InputDecoration(
                        hintText: '10-digit number',
                        hintStyle: TextStyle(color: AppColors.outline, fontFamily: 'DMSans'),
                        counterText: '',
                      ),
                    ),
                  ),
                ],
              ),
              const Spacer(),
              ElevatedButton(
                onPressed: _phoneController.text.length == 10 && !_loading ? _sendOtp : null,
                style: ElevatedButton.styleFrom(
                  backgroundColor: _phoneController.text.length == 10 ? AppColors.primary : AppColors.outlineVariant,
                ),
                child: _loading
                    ? const SizedBox(height: 22, width: 22, child: CircularProgressIndicator(strokeWidth: 2, color: Colors.white))
                    : const Text('SEND OTP'),
              ),
              const SizedBox(height: 12),
            ],
          ),
        ),
      ),
    );
  }
}
