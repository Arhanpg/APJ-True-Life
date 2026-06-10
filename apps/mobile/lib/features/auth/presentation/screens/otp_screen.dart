import 'dart:async';
import 'package:flutter/material.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:go_router/go_router.dart';
import '../../../../core/theme/app_colors.dart';

class OtpScreen extends StatefulWidget {
  final String phone;
  final String verificationId;
  const OtpScreen({super.key, required this.phone, required this.verificationId});

  @override
  State<OtpScreen> createState() => _OtpScreenState();
}

class _OtpScreenState extends State<OtpScreen> {
  final List<TextEditingController> _ctrls = List.generate(6, (_) => TextEditingController());
  final List<FocusNode> _nodes = List.generate(6, (_) => FocusNode());
  bool _loading = false;
  String? _error;
  int _secondsLeft = 45;
  Timer? _timer;

  @override
  void initState() {
    super.initState();
    _startTimer();
  }

  void _startTimer() {
    _timer = Timer.periodic(const Duration(seconds: 1), (t) {
      if (_secondsLeft > 0) setState(() => _secondsLeft--);
      else t.cancel();
    });
  }

  String get _otp => _ctrls.map((c) => c.text).join();

  Future<void> _verify() async {
    if (_otp.length < 6) return;
    setState(() { _loading = true; _error = null; });
    try {
      final cred = PhoneAuthProvider.credential(verificationId: widget.verificationId, smsCode: _otp);
      await FirebaseAuth.instance.signInWithCredential(cred);
      if (mounted) context.go('/profile-create');
    } on FirebaseAuthException catch (e) {
      setState(() { _loading = false; _error = e.message ?? 'Invalid OTP'; });
    }
  }

  @override
  void dispose() {
    _timer?.cancel();
    for (final c in _ctrls) c.dispose();
    for (final n in _nodes) n.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(backgroundColor: Colors.transparent, elevation: 0, foregroundColor: AppColors.primaryDark),
      body: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 28),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const SizedBox(height: 12),
            const Text('Verify OTP', style: TextStyle(fontSize: 26, fontWeight: FontWeight.bold, color: AppColors.primaryDark)),
            const SizedBox(height: 8),
            Text('Enter the 6-digit code sent to +91 ${widget.phone}', style: const TextStyle(fontSize: 14, color: AppColors.textMuted, height: 1.4)),
            const SizedBox(height: 36),
            // 6 boxes
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: List.generate(6, (i) => SizedBox(
                width: 46, height: 54,
                child: TextField(
                  controller: _ctrls[i],
                  focusNode: _nodes[i],
                  keyboardType: TextInputType.number,
                  maxLength: 1,
                  textAlign: TextAlign.center,
                  style: const TextStyle(fontSize: 22, fontWeight: FontWeight.bold),
                  decoration: InputDecoration(
                    counterText: '',
                    contentPadding: EdgeInsets.zero,
                    border: OutlineInputBorder(borderRadius: BorderRadius.circular(10)),
                    focusedBorder: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(10),
                      borderSide: const BorderSide(color: AppColors.primary, width: 2),
                    ),
                  ),
                  onChanged: (val) {
                    if (val.isNotEmpty && i < 5) FocusScope.of(context).requestFocus(_nodes[i + 1]);
                    if (val.isEmpty && i > 0) FocusScope.of(context).requestFocus(_nodes[i - 1]);
                    if (_otp.length == 6) _verify();
                  },
                ),
              )),
            ),
            if (_error != null) ...
              [
                const SizedBox(height: 12),
                Text(_error!, style: const TextStyle(color: AppColors.error, fontSize: 13)),
              ],
            const SizedBox(height: 28),
            ElevatedButton(
              onPressed: _loading ? null : _verify,
              child: _loading
                  ? const SizedBox(width: 22, height: 22, child: CircularProgressIndicator(color: Colors.white, strokeWidth: 2))
                  : const Text('Verify OTP'),
            ),
            const SizedBox(height: 20),
            Center(
              child: _secondsLeft > 0
                  ? Text('Resend OTP in ${_secondsLeft}s', style: const TextStyle(color: AppColors.textMuted, fontSize: 13))
                  : TextButton(
                      onPressed: () { setState(() => _secondsLeft = 45); _startTimer(); },
                      child: const Text('Resend OTP', style: TextStyle(color: AppColors.primary, fontWeight: FontWeight.w600)),
                    ),
            ),
          ],
        ),
      ),
    );
  }
}
