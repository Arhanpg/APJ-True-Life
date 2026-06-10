import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../../../core/theme/app_colors.dart';

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
    _controller = AnimationController(vsync: this, duration: const Duration(milliseconds: 900));
    _fadeAnim = CurvedAnimation(parent: _controller, curve: Curves.easeIn);
    _controller.forward();
    Future.delayed(const Duration(seconds: 2), () {
      if (mounted) context.go('/onboarding');
    });
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.primary,
      body: Center(
        child: FadeTransition(
          opacity: _fadeAnim,
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Container(
                width: 100, height: 100,
                decoration: BoxDecoration(
                  color: AppColors.onPrimary.withOpacity(0.15),
                  borderRadius: BorderRadius.circular(24),
                ),
                child: const Icon(Icons.local_florist, size: 56, color: AppColors.onPrimary),
              ),
              const SizedBox(height: 24),
              const Text(
                'APJ TRUE LIFE',
                style: TextStyle(
                  fontFamily: 'PlayfairDisplay',
                  fontSize: 28, fontWeight: FontWeight.w700,
                  color: AppColors.onPrimary, letterSpacing: 1.5,
                ),
              ),
              const SizedBox(height: 8),
              const Text(
                'Ayurvedic Medical Centre',
                style: TextStyle(fontSize: 14, color: Color(0xCCFFFFFF), letterSpacing: 0.5),
              ),
              const SizedBox(height: 48),
              const CircularProgressIndicator(
                color: AppColors.accentGold,
                strokeWidth: 2,
              ),
            ],
          ),
        ),
      ),
    );
  }
}
