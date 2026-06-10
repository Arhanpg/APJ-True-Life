import 'dart:async';
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../../core/theme/app_theme.dart';

class OtpScreen extends StatefulWidget {
  final String phone;
  const OtpScreen({super.key, required this.phone});
  @override
  State<OtpScreen> createState() => _OtpScreenState();
}

class _OtpScreenState extends State<OtpScreen> {
  final List<TextEditingController> _controllers = List.generate(6, (_) => TextEditingController());
  final List<FocusNode> _focusNodes = List.generate(6, (_) => FocusNode());
  int _seconds = 45;
  late Timer _timer;
  bool _loading = false;

  @override
  void initState() {
    super.initState();
    _startTimer();
    WidgetsBinding.instance.addPostFrameCallback((_) => _focusNodes[0].requestFocus());
  }

  void _startTimer() {
    _timer = Timer.periodic(const Duration(seconds: 1), (t) {
      if (_seconds == 0) t.cancel();
      else setState(() => _seconds--);
    });
  }

  @override
  void dispose() {
    _timer.cancel();
    for (var c in _controllers) c.dispose();
    for (var f in _focusNodes) f.dispose();
    super.dispose();
  }

  void _onDigit(int index, String val) {
    if (val.isNotEmpty && index < 5) _focusNodes[index + 1].requestFocus();
    final otp = _controllers.map((c) => c.text).join();
    if (otp.length == 6) _verify();
  }

  void _verify() async {
    setState(() => _loading = true);
    await Future.delayed(const Duration(seconds: 1));
    if (mounted) context.go('/auth/profile');
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(backgroundColor: AppColors.background, elevation: 0, leading: IconButton(icon: const Icon(Icons.arrow_back), onPressed: () => context.go('/auth/mobile'))),
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(24),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const SizedBox(height: 16),
              const Text('Verify OTP', style: TextStyle(fontSize: 26, fontWeight: FontWeight.w700, color: AppColors.primaryDark, fontFamily: 'DM Sans')),
              const SizedBox(height: 10),
              Text('We sent a 6-digit code to ${widget.phone}', style: const TextStyle(color: AppColors.onSurfaceVariant, fontSize: 14, fontFamily: 'DM Sans')),
              const SizedBox(height: 40),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: List.generate(6, (i) => SizedBox(
                  width: 48,
                  child: TextField(
                    controller: _controllers[i],
                    focusNode: _focusNodes[i],
                    keyboardType: TextInputType.number,
                    maxLength: 1,
                    textAlign: TextAlign.center,
                    style: const TextStyle(fontSize: 20, fontWeight: FontWeight.w700, fontFamily: 'DM Sans', color: AppColors.primary),
                    decoration: InputDecoration(
                      counterText: '',
                      filled: true,
                      fillColor: AppColors.surface,
                      border: OutlineInputBorder(borderRadius: BorderRadius.circular(10), borderSide: const BorderSide(color: AppColors.outlineVariant)),
                      enabledBorder: OutlineInputBorder(borderRadius: BorderRadius.circular(10), borderSide: const BorderSide(color: AppColors.outlineVariant)),
                      focusedBorder: OutlineInputBorder(borderRadius: BorderRadius.circular(10), borderSide: const BorderSide(color: AppColors.primary, width: 2)),
                    ),
                    onChanged: (v) => _onDigit(i, v),
                  ),
                )),
              ),
              const SizedBox(height: 32),
              if (_seconds > 0)
                Center(child: Text('Resend OTP in $_seconds seconds', style: const TextStyle(color: AppColors.outline, fontSize: 13, fontFamily: 'DM Sans')))
              else
                Center(child: TextButton(onPressed: () { setState(() => _seconds = 45); _startTimer(); }, child: const Text('Resend Code', style: TextStyle(color: AppColors.primary, fontWeight: FontWeight.w600, fontFamily: 'DM Sans')))),
              const SizedBox(height: 32),
              ElevatedButton(
                onPressed: _loading ? null : _verify,
                child: _loading
                  ? const SizedBox(width: 22, height: 22, child: CircularProgressIndicator(color: Colors.white, strokeWidth: 2))
                  : const Text('Verify OTP'),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
