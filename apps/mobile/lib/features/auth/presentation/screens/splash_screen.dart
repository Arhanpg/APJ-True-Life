import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../../../../core/theme/app_colors.dart';

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
    _fadeAnim = Tween<double>(begin: 0, end: 1).animate(CurvedAnimation(parent: _controller, curve: Curves.easeIn));
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
                width: 90, height: 90,
                decoration: BoxDecoration(
                  color: AppColors.accentGold,
                  borderRadius: BorderRadius.circular(22),
                ),
                child: const Center(
                  child: Text('A', style: TextStyle(fontSize: 48, fontWeight: FontWeight.bold, color: AppColors.primary)),
                ),
              ),
              const SizedBox(height: 20),
              const Text(
                'APJ TRUE LIFE',
                style: TextStyle(fontSize: 26, fontWeight: FontWeight.bold, color: Colors.white, letterSpacing: 1.5),
              ),
              const SizedBox(height: 8),
              const Text(
                'Ayurvedic Medical Centre',
                style: TextStyle(fontSize: 14, color: Color(0xAAFFFFFF), letterSpacing: 0.5),
              ),
              const SizedBox(height: 48),
              const SizedBox(
                width: 28, height: 28,
                child: CircularProgressIndicator(color: AppColors.accentGold, strokeWidth: 2.5),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
