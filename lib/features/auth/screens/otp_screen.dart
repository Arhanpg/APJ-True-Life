import 'dart:async';
import 'package:flutter/material.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:go_router/go_router.dart';
import '../../../core/theme/app_colors.dart';

class OtpScreen extends StatefulWidget {
  final String phoneNumber; // verificationId passed as extra
  const OtpScreen({super.key, required this.phoneNumber});

  @override
  State<OtpScreen> createState() => _OtpScreenState();
}

class _OtpScreenState extends State<OtpScreen> {
  final List<TextEditingController> _controllers =
      List.generate(6, (_) => TextEditingController());
  final List<FocusNode> _focusNodes = List.generate(6, (_) => FocusNode());

  int _countdown = 45;
  Timer? _timer;
  bool _loading = false;
  String? _error;

  @override
  void initState() {
    super.initState();
    _startTimer();
  }

  void _startTimer() {
    _timer = Timer.periodic(const Duration(seconds: 1), (t) {
      if (_countdown == 0) {
        t.cancel();
      } else {
        setState(() => _countdown--);
      }
    });
  }

  String get _otp => _controllers.map((c) => c.text).join();

  Future<void> _verify() async {
    if (_otp.length != 6) return;
    setState(() { _loading = true; _error = null; });
    try {
      final credential = PhoneAuthProvider.credential(
        verificationId: widget.phoneNumber,
        smsCode: _otp,
      );
      final result = await FirebaseAuth.instance.signInWithCredential(credential);
      if (!mounted) return;
      // New user — go to profile creation
      if (result.additionalUserInfo?.isNewUser == true) {
        context.go('/profile-create');
      } else {
        context.go('/home');
      }
    } on FirebaseAuthException catch (e) {
      setState(() { _loading = false; _error = e.message; });
    }
  }

  @override
  void dispose() {
    _timer?.cancel();
    for (final c in _controllers) c.dispose();
    for (final f in _focusNodes) f.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        backgroundColor: AppColors.background, elevation: 0,
        leading: IconButton(icon: const Icon(Icons.arrow_back), onPressed: () => context.go('/phone')),
      ),
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(24),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const SizedBox(height: 24),
              Text('Verify OTP', style: Theme.of(context).textTheme.displayMedium),
              const SizedBox(height: 8),
              Text('Enter the 6-digit code sent to +91 ••••••',
                style: Theme.of(context).textTheme.bodyMedium),
              const SizedBox(height: 40),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: List.generate(6, (i) {
                  return SizedBox(
                    width: 48,
                    child: TextField(
                      controller: _controllers[i],
                      focusNode: _focusNodes[i],
                      keyboardType: TextInputType.number,
                      maxLength: 1,
                      textAlign: TextAlign.center,
                      style: const TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
                      decoration: InputDecoration(
                        counterText: '',
                        contentPadding: const EdgeInsets.symmetric(vertical: 14),
                        border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)),
                        focusedBorder: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(12),
                          borderSide: const BorderSide(color: AppColors.primary, width: 2),
                        ),
                      ),
                      onChanged: (val) {
                        if (val.isNotEmpty && i < 5) {
                          _focusNodes[i + 1].requestFocus();
                        } else if (val.isEmpty && i > 0) {
                          _focusNodes[i - 1].requestFocus();
                        }
                        setState(() {});
                        if (_otp.length == 6) _verify();
                      },
                    ),
                  );
                }),
              ),
              if (_error != null) ...[
                const SizedBox(height: 12),
                Text(_error!, style: const TextStyle(color: AppColors.error, fontSize: 13)),
              ],
              const SizedBox(height: 24),
              Center(
                child: _countdown > 0
                    ? Text('Resend code in $_countdown s',
                        style: const TextStyle(color: AppColors.textHint))
                    : TextButton(
                        onPressed: () {
                          setState(() => _countdown = 45);
                          _startTimer();
                          context.go('/phone');
                        },
                        child: const Text('Resend Code',
                            style: TextStyle(color: AppColors.primary)),
                      ),
              ),
              const SizedBox(height: 32),
              ElevatedButton(
                onPressed: _otp.length == 6 && !_loading ? _verify : null,
                child: _loading
                    ? const SizedBox(height: 20, width: 20,
                        child: CircularProgressIndicator(color: Colors.white, strokeWidth: 2))
                    : const Text('Verify & Continue'),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
