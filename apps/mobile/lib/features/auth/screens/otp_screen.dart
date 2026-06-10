import 'dart:async';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:go_router/go_router.dart';
import '../../../core/theme/app_colors.dart';
import '../../../core/constants/app_constants.dart';

class OtpScreen extends StatefulWidget {
  final String phoneNumber;
  const OtpScreen({super.key, required this.phoneNumber});

  @override
  State<OtpScreen> createState() => _OtpScreenState();
}

class _OtpScreenState extends State<OtpScreen> {
  final List<TextEditingController> _controllers = List.generate(6, (_) => TextEditingController());
  final List<FocusNode> _focusNodes = List.generate(6, (_) => FocusNode());
  int _secondsLeft = AppConstants.otpResendSeconds;
  Timer? _timer;
  bool _loading = false;

  @override
  void initState() {
    super.initState();
    _startTimer();
  }

  void _startTimer() {
    _timer?.cancel();
    setState(() => _secondsLeft = AppConstants.otpResendSeconds);
    _timer = Timer.periodic(const Duration(seconds: 1), (t) {
      if (_secondsLeft == 0) t.cancel();
      else setState(() => _secondsLeft--);
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

  void _onDigitChanged(int index, String value) {
    if (value.isNotEmpty && index < 5) {
      _focusNodes[index + 1].requestFocus();
    }
    if (_otp.length == 6) _verify();
  }

  Future<void> _verify() async {
    setState(() => _loading = true);
    await Future.delayed(const Duration(seconds: 1));
    if (mounted) {
      setState(() => _loading = false);
      context.go('/create-profile');
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
          onPressed: () => context.go('/phone'),
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
                'Verify OTP',
                style: TextStyle(
                  fontFamily: 'PlayfairDisplay',
                  fontSize: 30,
                  fontWeight: FontWeight.w700,
                  color: AppColors.primaryDark,
                ),
              ),
              const SizedBox(height: 10),
              Text(
                'Enter the 6-digit code sent to ${widget.phoneNumber}',
                style: const TextStyle(fontFamily: 'DMSans', fontSize: 14, color: AppColors.outline),
              ),
              const SizedBox(height: 40),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: List.generate(6, (i) => SizedBox(
                  width: 48,
                  height: 56,
                  child: TextField(
                    controller: _controllers[i],
                    focusNode: _focusNodes[i],
                    keyboardType: TextInputType.number,
                    maxLength: 1,
                    textAlign: TextAlign.center,
                    inputFormatters: [FilteringTextInputFormatter.digitsOnly],
                    style: const TextStyle(fontSize: 22, fontWeight: FontWeight.w700, color: AppColors.primary),
                    decoration: InputDecoration(
                      counterText: '',
                      filled: true,
                      fillColor: AppColors.surface,
                      contentPadding: EdgeInsets.zero,
                      border: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(10),
                        borderSide: const BorderSide(color: AppColors.outlineVariant),
                      ),
                      focusedBorder: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(10),
                        borderSide: const BorderSide(color: AppColors.primary, width: 2),
                      ),
                    ),
                    onChanged: (v) => _onDigitChanged(i, v),
                  ),
                )),
              ),
              const SizedBox(height: 32),
              if (_loading)
                const Center(child: CircularProgressIndicator(color: AppColors.primary))
              else
                ElevatedButton(
                  onPressed: _otp.length == 6 ? _verify : null,
                  child: const Text('VERIFY OTP'),
                ),
              const SizedBox(height: 20),
              Center(
                child: _secondsLeft > 0
                    ? Text(
                        'Resend code in 0:${_secondsLeft.toString().padLeft(2, '0')}',
                        style: const TextStyle(fontFamily: 'DMSans', fontSize: 13, color: AppColors.outline),
                      )
                    : TextButton(
                        onPressed: _startTimer,
                        child: const Text('Resend Code', style: TextStyle(color: AppColors.primary, fontFamily: 'DMSans', fontWeight: FontWeight.w600)),
                      ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
