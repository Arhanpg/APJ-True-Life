import 'dart:async';
import 'package:flutter/material.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:go_router/go_router.dart';
import '../../../../core/theme/app_colors.dart';

class OtpScreen extends StatefulWidget {
  const OtpScreen({super.key});

  @override
  State<OtpScreen> createState() => _OtpScreenState();
}

class _OtpScreenState extends State<OtpScreen> {
  final List<TextEditingController> _controllers =
      List.generate(6, (_) => TextEditingController());
  final List<FocusNode> _focusNodes = List.generate(6, (_) => FocusNode());
  int _secondsLeft = 45;
  Timer? _timer;
  bool _loading = false;
  String _error = '';
  String _verificationId = '';

  @override
  void initState() {
    super.initState();
    _startTimer();
  }

  void _startTimer() {
    _timer?.cancel();
    setState(() => _secondsLeft = 45);
    _timer = Timer.periodic(const Duration(seconds: 1), (t) {
      if (_secondsLeft <= 0) { t.cancel(); } else {
        setState(() => _secondsLeft--);
      }
    });
  }

  String get _otpValue => _controllers.map((c) => c.text).join();

  Future<void> _verifyOtp() async {
    if (_otpValue.length < 6) return;
    setState(() { _loading = true; _error = ''; });
    try {
      final credential = PhoneAuthProvider.credential(
        verificationId: _verificationId,
        smsCode: _otpValue,
      );
      await FirebaseAuth.instance.signInWithCredential(credential);
      if (!mounted) return;
      context.go('/profile-create');
    } on FirebaseAuthException catch (e) {
      setState(() { _error = e.message ?? 'Invalid OTP'; _loading = false; });
    }
  }

  @override
  void dispose() {
    _timer?.cancel();
    for (final c in _controllers) { c.dispose(); }
    for (final f in _focusNodes) { f.dispose(); }
    super.dispose();
  }

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    final extra = GoRouterState.of(context).extra;
    if (extra is String) _verificationId = extra;
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        backgroundColor: AppColors.background,
        elevation: 0,
        leading: BackButton(color: AppColors.primary, onPressed: () => context.go('/phone')),
      ),
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 24),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const SizedBox(height: 24),
              const Text('Enter OTP',
                style: TextStyle(fontFamily: 'PlayfairDisplay', fontSize: 28,
                    fontWeight: FontWeight.bold, color: AppColors.primaryDark)),
              const SizedBox(height: 12),
              const Text('Enter the 6-digit code sent to your mobile number',
                style: TextStyle(fontFamily: 'DMSans', fontSize: 15, color: AppColors.onSurfaceVariant)),
              const SizedBox(height: 40),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: List.generate(6, (i) => SizedBox(
                  width: 48,
                  height: 56,
                  child: TextField(
                    controller: _controllers[i],
                    focusNode: _focusNodes[i],
                    textAlign: TextAlign.center,
                    keyboardType: TextInputType.number,
                    maxLength: 1,
                    style: const TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
                    decoration: InputDecoration(
                      counterText: '',
                      border: OutlineInputBorder(borderRadius: BorderRadius.circular(8)),
                    ),
                    onChanged: (val) {
                      if (val.isNotEmpty && i < 5) {
                        _focusNodes[i + 1].requestFocus();
                      } else if (val.isEmpty && i > 0) {
                        _focusNodes[i - 1].requestFocus();
                      }
                      if (_otpValue.length == 6) _verifyOtp();
                    },
                  ),
                )),
              ),
              if (_error.isNotEmpty) ...
                [const SizedBox(height: 12),
                  Text(_error, style: const TextStyle(color: AppColors.error, fontSize: 13))],
              const SizedBox(height: 24),
              Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Text(
                    _secondsLeft > 0
                        ? 'Resend code in ${_secondsLeft}s'
                        : 'Didn\'t receive the code? ',
                    style: const TextStyle(color: AppColors.onSurfaceVariant, fontSize: 13),
                  ),
                  if (_secondsLeft == 0)
                    GestureDetector(
                      onTap: _startTimer,
                      child: const Text('Resend Code',
                          style: TextStyle(color: AppColors.primary, fontSize: 13,
                              fontWeight: FontWeight.w600)),
                    ),
                ],
              ),
              const SizedBox(height: 32),
              ElevatedButton(
                onPressed: _loading ? null : _verifyOtp,
                child: _loading
                    ? const SizedBox(height: 20, width: 20,
                        child: CircularProgressIndicator(color: Colors.white, strokeWidth: 2))
                    : const Text('Verify OTP'),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
