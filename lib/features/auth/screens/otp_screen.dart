import 'dart:async';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:go_router/go_router.dart';
import '../../../core/theme/app_theme.dart';

class OtpScreen extends StatefulWidget {
  final String phone;
  const OtpScreen({super.key, required this.phone});
  @override
  State<OtpScreen> createState() => _OtpScreenState();
}

class _OtpScreenState extends State<OtpScreen> {
  final List<TextEditingController> _controllers = List.generate(6, (_) => TextEditingController());
  final List<FocusNode> _focusNodes = List.generate(6, (_) => FocusNode());
  int _secondsLeft = 45;
  Timer? _timer;
  bool _loading = false;

  @override
  void initState() {
    super.initState();
    _startTimer();
  }

  void _startTimer() {
    _timer?.cancel();
    setState(() => _secondsLeft = 45);
    _timer = Timer.periodic(const Duration(seconds: 1), (t) {
      if (_secondsLeft == 0) { t.cancel(); return; }
      setState(() => _secondsLeft--);
    });
  }

  @override
  void dispose() {
    _timer?.cancel();
    for (final c in _controllers) c.dispose();
    for (final f in _focusNodes) f.dispose();
    super.dispose();
  }

  void _onChanged(String val, int i) {
    if (val.isNotEmpty && i < 5) _focusNodes[i + 1].requestFocus();
    if (_controllers.every((c) => c.text.isNotEmpty)) _verifyOtp();
  }

  void _verifyOtp() async {
    final otp = _controllers.map((c) => c.text).join();
    setState(() => _loading = true);
    // TODO: Firebase verifyPhoneNumber credential
    await Future.delayed(const Duration(seconds: 1));
    setState(() => _loading = false);
    if (mounted) context.go('/profile-create');
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
              IconButton(
                icon: const Icon(Icons.arrow_back, color: AppColors.primaryDark),
                onPressed: () => context.go('/phone'),
              ),
              const SizedBox(height: 24),
              const Text('Verify OTP', style: TextStyle(fontSize: 24, fontFamily: 'PlayfairDisplay', fontWeight: FontWeight.bold, color: AppColors.primaryDark)),
              const SizedBox(height: 8),
              Text('Enter the 6-digit code sent to ${widget.phone}', style: const TextStyle(fontSize: 14, color: AppColors.onSurfaceVariant)),
              const SizedBox(height: 40),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: List.generate(6, (i) => SizedBox(
                  width: 48, height: 56,
                  child: TextFormField(
                    controller: _controllers[i],
                    focusNode: _focusNodes[i],
                    keyboardType: TextInputType.number,
                    textAlign: TextAlign.center,
                    maxLength: 1,
                    inputFormatters: [FilteringTextInputFormatter.digitsOnly],
                    decoration: InputDecoration(
                      counterText: '',
                      contentPadding: EdgeInsets.zero,
                      border: OutlineInputBorder(borderRadius: BorderRadius.circular(12), borderSide: const BorderSide(color: AppColors.outlineVariant)),
                      focusedBorder: OutlineInputBorder(borderRadius: BorderRadius.circular(12), borderSide: const BorderSide(color: AppColors.primary, width: 2)),
                    ),
                    onChanged: (v) => _onChanged(v, i),
                  ),
                )),
              ),
              const SizedBox(height: 32),
              if (_loading)
                const Center(child: CircularProgressIndicator(color: AppColors.primary))
              else
                ElevatedButton(
                  onPressed: _verifyOtp,
                  child: const Text('Verify OTP'),
                ),
              const SizedBox(height: 24),
              Center(
                child: _secondsLeft > 0
                    ? Text('Resend OTP in 0:${_secondsLeft.toString().padLeft(2, '0')}', style: const TextStyle(color: AppColors.outline, fontSize: 14))
                    : TextButton(
                        onPressed: _startTimer,
                        child: const Text('Resend Code', style: TextStyle(color: AppColors.primary, fontWeight: FontWeight.w600)),
                      ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
