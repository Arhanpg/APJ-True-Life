import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../../core/theme/app_theme.dart';

class MobileEntryScreen extends StatefulWidget {
  const MobileEntryScreen({super.key});
  @override
  State<MobileEntryScreen> createState() => _MobileEntryScreenState();
}

class _MobileEntryScreenState extends State<MobileEntryScreen> {
  final _phoneCtrl = TextEditingController();
  bool _loading = false;
  String? _error;

  void _sendOtp() async {
    final phone = _phoneCtrl.text.trim();
    if (phone.length != 10 || !RegExp(r'^\d{10}$').hasMatch(phone)) {
      setState(() => _error = 'Please enter a valid 10-digit mobile number');
      return;
    }
    setState(() { _loading = true; _error = null; });
    await Future.delayed(const Duration(seconds: 1)); // Simulate API call
    if (mounted) {
      setState(() => _loading = false);
      context.go('/auth/otp?phone=%2B91$phone');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(backgroundColor: AppColors.background, elevation: 0, leading: IconButton(icon: const Icon(Icons.arrow_back), onPressed: () => context.go('/welcome'))),
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(24),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const SizedBox(height: 16),
              Container(
                width: 56, height: 56,
                decoration: BoxDecoration(color: AppColors.primary, borderRadius: BorderRadius.circular(14)),
                child: const Icon(Icons.phone_android, color: AppColors.accentGold, size: 28),
              ),
              const SizedBox(height: 24),
              const Text('Enter Your\nMobile Number', style: TextStyle(fontSize: 26, fontWeight: FontWeight.w700, color: AppColors.primaryDark, fontFamily: 'DM Sans', height: 1.2)),
              const SizedBox(height: 10),
              const Text('We\'ll send you a 6-digit OTP to verify your number', style: TextStyle(color: AppColors.onSurfaceVariant, fontSize: 14, fontFamily: 'DM Sans')),
              const SizedBox(height: 36),
              Container(
                decoration: BoxDecoration(
                  border: Border.all(color: _error != null ? AppColors.error : AppColors.outlineVariant, width: 1.5),
                  borderRadius: BorderRadius.circular(10),
                  color: AppColors.surface,
                ),
                child: Row(
                  children: [
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 16),
                      decoration: const BoxDecoration(border: Border(right: BorderSide(color: AppColors.outlineVariant))),
                      child: const Text('+91', style: TextStyle(fontWeight: FontWeight.w600, color: AppColors.primary, fontSize: 15, fontFamily: 'DM Sans')),
                    ),
                    Expanded(
                      child: TextField(
                        controller: _phoneCtrl,
                        keyboardType: TextInputType.phone,
                        maxLength: 10,
                        decoration: const InputDecoration(
                          border: InputBorder.none,
                          filled: false,
                          hintText: '98765 43210',
                          counterText: '',
                          contentPadding: EdgeInsets.symmetric(horizontal: 14, vertical: 16),
                        ),
                        style: const TextStyle(fontSize: 16, fontFamily: 'DM Sans'),
                      ),
                    ),
                  ],
                ),
              ),
              if (_error != null) Padding(
                padding: const EdgeInsets.only(top: 8, left: 4),
                child: Text(_error!, style: const TextStyle(color: AppColors.error, fontSize: 12, fontFamily: 'DM Sans')),
              ),
              const SizedBox(height: 32),
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
