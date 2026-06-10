import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:firebase_auth/firebase_auth.dart';
import '../../../core/theme/app_colors.dart';

class PhoneNumberScreen extends ConsumerStatefulWidget {
  const PhoneNumberScreen({super.key});
  @override
  ConsumerState<PhoneNumberScreen> createState() => _PhoneNumberScreenState();
}

class _PhoneNumberScreenState extends ConsumerState<PhoneNumberScreen> {
  final _phoneController = TextEditingController();
  bool _loading = false;
  String _error = '';

  @override
  void dispose() { _phoneController.dispose(); super.dispose(); }

  Future<void> _sendOtp() async {
    final phone = _phoneController.text.trim();
    if (phone.length != 10 || !RegExp(r'^[6-9]\d{9}$').hasMatch(phone)) {
      setState(() => _error = 'Enter a valid 10-digit Indian mobile number');
      return;
    }
    setState(() { _loading = true; _error = ''; });
    try {
      await FirebaseAuth.instance.verifyPhoneNumber(
        phoneNumber: '+91$phone',
        timeout: const Duration(seconds: 60),
        verificationCompleted: (credential) async {
          await FirebaseAuth.instance.signInWithCredential(credential);
          if (mounted) context.go('/home');
        },
        verificationFailed: (e) {
          setState(() { _error = e.message ?? 'Verification failed'; _loading = false; });
        },
        codeSent: (verificationId, _) {
          setState(() => _loading = false);
          context.go('/otp', extra: verificationId);
        },
        codeAutoRetrievalTimeout: (_) {},
      );
    } catch (e) {
      setState(() { _error = e.toString(); _loading = false; });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(title: const Text('APJ TRUE LIFE'), centerTitle: true),
      body: Padding(
        padding: const EdgeInsets.all(24),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const SizedBox(height: 32),
            const Text('Enter your mobile number', style: TextStyle(fontSize: 24, fontWeight: FontWeight.w700, color: AppColors.primaryDark)),
            const SizedBox(height: 8),
            const Text('We will send you a 6-digit OTP to verify your number', style: TextStyle(color: AppColors.onSurfaceVariant)),
            const SizedBox(height: 40),
            Row(
              children: [
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 14),
                  decoration: BoxDecoration(
                    border: Border.all(color: AppColors.outlineVariant),
                    borderRadius: const BorderRadius.horizontal(left: Radius.circular(8)),
                    color: AppColors.surfaceTint,
                  ),
                  child: const Text('+91', style: TextStyle(fontWeight: FontWeight.w600)),
                ),
                Expanded(
                  child: TextField(
                    controller: _phoneController,
                    keyboardType: TextInputType.phone,
                    maxLength: 10,
                    decoration: const InputDecoration(
                      hintText: '10-digit mobile number',
                      counterText: '',
                      border: OutlineInputBorder(
                        borderRadius: BorderRadius.horizontal(right: Radius.circular(8)),
                      ),
                    ),
                  ),
                ),
              ],
            ),
            if (_error.isNotEmpty) ...
              [const SizedBox(height: 12), Text(_error, style: const TextStyle(color: AppColors.error, fontSize: 13))],
            const SizedBox(height: 32),
            ElevatedButton(
              onPressed: _loading ? null : _sendOtp,
              child: _loading
                  ? const SizedBox(height: 20, width: 20, child: CircularProgressIndicator(color: Colors.white, strokeWidth: 2))
                  : const Text('Send OTP'),
            ),
          ],
        ),
      ),
    );
  }
}
