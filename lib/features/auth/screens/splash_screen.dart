import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../../../core/theme/app_theme.dart';

class SplashScreen extends StatefulWidget {
  const SplashScreen({super.key});
  @override
  State<SplashScreen> createState() => _SplashScreenState();
}

class _SplashScreenState extends State<SplashScreen> with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<double> _fadeAnim;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(vsync: this, duration: const Duration(milliseconds: 800));
    _fadeAnim = CurvedAnimation(parent: _controller, curve: Curves.easeIn);
    _controller.forward();
    Future.delayed(const Duration(seconds: 2), () {
      if (mounted) context.go('/onboarding');
    });
  }

  @override
  void dispose() { _controller.dispose(); super.dispose(); }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.primary,
      body: Center(
        child: FadeTransition(
          opacity: _fadeAnim,
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              Container(
                width: 96, height: 96,
                decoration: BoxDecoration(
                  color: AppColors.accentGold,
                  borderRadius: BorderRadius.circular(24),
                ),
                child: const Center(
                  child: Text('A', style: TextStyle(color: AppColors.primary, fontSize: 48, fontFamily: 'PlayfairDisplay', fontWeight: FontWeight.bold)),
                ),
              ),
              const SizedBox(height: 24),
              const Text('APJ TRUE LIFE', style: TextStyle(color: AppColors.onPrimary, fontSize: 28, fontFamily: 'PlayfairDisplay', fontWeight: FontWeight.bold, letterSpacing: 1.2)),
              const SizedBox(height: 8),
              const Text('Ayurvedic Medical Centre', style: TextStyle(color: Color(0xCCFFFFFF), fontSize: 14, letterSpacing: 0.5)),
              const SizedBox(height: 48),
              const SizedBox(width: 24, height: 24, child: CircularProgressIndicator(color: AppColors.accentGold, strokeWidth: 2)),
            ],
          ),
        ),
      ),
    );
  }
}
