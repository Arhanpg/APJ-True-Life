import 'dart:async';
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:firebase_auth/firebase_auth.dart';
import '../../../core/theme/app_colors.dart';

class OtpScreen extends StatefulWidget {
  final String phoneNumber; // verificationId passed as extra
  const OtpScreen({super.key, required this.phoneNumber});
  @override
  State<OtpScreen> createState() => _OtpScreenState();
}

class _OtpScreenState extends State<OtpScreen> {
  final _controllers = List.generate(6, (_) => TextEditingController());
  final _focusNodes   = List.generate(6, (_) => FocusNode());
  bool _loading = false;
  String _error = '';
  int _resendSeconds = 45;
  Timer? _timer;

  @override
  void initState() {
    super.initState();
    _startTimer();
  }

  void _startTimer() {
    _timer = Timer.periodic(const Duration(seconds: 1), (t) {
      if (_resendSeconds <= 0) { t.cancel(); return; }
      setState(() => _resendSeconds--);
    });
  }

  @override
  void dispose() {
    for (final c in _controllers) c.dispose();
    for (final f in _focusNodes) f.dispose();
    _timer?.cancel();
    super.dispose();
  }

  String get _otp => _controllers.map((c) => c.text).join();

  Future<void> _verify() async {
    if (_otp.length < 6) return;
    setState(() { _loading = true; _error = ''; });
    try {
      final credential = PhoneAuthProvider.credential(
        verificationId: widget.phoneNumber,
        smsCode: _otp,
      );
      final result = await FirebaseAuth.instance.signInWithCredential(credential);
      if (!mounted) return;
      if (result.additionalUserInfo?.isNewUser == true) {
        context.go('/create-profile');
      } else {
        context.go('/home');
      }
    } on FirebaseAuthException catch (e) {
      setState(() { _error = e.message ?? 'Invalid OTP'; _loading = false; });
    }
  }

  void _onDigitEntered(int index, String value) {
    if (value.isNotEmpty && index < 5) _focusNodes[index + 1].requestFocus();
    if (value.isEmpty && index > 0) _focusNodes[index - 1].requestFocus();
    if (_otp.length == 6) _verify();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(title: const Text('Verify OTP'), centerTitle: true),
      body: Padding(
        padding: const EdgeInsets.all(24),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const SizedBox(height: 32),
            const Text('Enter 6-digit OTP', style: TextStyle(fontSize: 24, fontWeight: FontWeight.w700, color: AppColors.primaryDark)),
            const SizedBox(height: 8),
            const Text('Check your SMS for the verification code', style: TextStyle(color: AppColors.onSurfaceVariant)),
            const SizedBox(height: 40),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              children: List.generate(6, (i) => SizedBox(
                width: 48,
                child: TextField(
                  controller: _controllers[i],
                  focusNode: _focusNodes[i],
                  keyboardType: TextInputType.number,
                  maxLength: 1,
                  textAlign: TextAlign.center,
                  style: const TextStyle(fontSize: 22, fontWeight: FontWeight.w700),
                  decoration: InputDecoration(
                    counterText: '',
                    border: OutlineInputBorder(borderRadius: BorderRadius.circular(8)),
                  ),
                  onChanged: (v) => _onDigitEntered(i, v),
                ),
              )),
            ),
            if (_error.isNotEmpty) ...
              [const SizedBox(height: 12), Text(_error, style: const TextStyle(color: AppColors.error, fontSize: 13))],
            const SizedBox(height: 24),
            Center(
              child: _resendSeconds > 0
                  ? Text('Resend code in $_resendSeconds s', style: const TextStyle(color: AppColors.outline))
                  : TextButton(
                      onPressed: () { setState(() => _resendSeconds = 45); _startTimer(); },
                      child: const Text('Resend Code', style: TextStyle(color: AppColors.primary)),
                    ),
            ),
            const SizedBox(height: 32),
            ElevatedButton(
              onPressed: (_loading || _otp.length < 6) ? null : _verify,
              child: _loading
                  ? const SizedBox(height: 20, width: 20, child: CircularProgressIndicator(color: Colors.white, strokeWidth: 2))
                  : const Text('Verify'),
            ),
          ],
        ),
      ),
    );
  }
}
