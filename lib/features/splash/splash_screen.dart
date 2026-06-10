import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../../core/theme/app_theme.dart';

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
    _fadeAnim = Tween<double>(begin: 0, end: 1).animate(CurvedAnimation(parent: _controller, curve: Curves.easeIn));
    _controller.forward();
    Future.delayed(const Duration(seconds: 2), () {
      if (mounted) context.go('/welcome');
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
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Container(
                width: 96,
                height: 96,
                decoration: BoxDecoration(
                  color: AppColors.accentGold,
                  borderRadius: BorderRadius.circular(24),
                  boxShadow: [BoxShadow(color: Colors.black26, blurRadius: 20, offset: const Offset(0, 8))],
                ),
                child: const Center(
                  child: Text('APJ', style: TextStyle(color: AppColors.primary, fontSize: 22, fontWeight: FontWeight.w800, fontFamily: 'DM Sans')),
                ),
              ),
              const SizedBox(height: 24),
              const Text('APJ TRUE LIFE', style: TextStyle(color: Colors.white, fontSize: 22, fontWeight: FontWeight.w700, fontFamily: 'DM Sans', letterSpacing: 2)),
              const SizedBox(height: 6),
              const Text('Ayurvedic Medical Centre', style: TextStyle(color: Color(0xBBFFFFFF), fontSize: 13, fontFamily: 'DM Sans')),
              const SizedBox(height: 48),
              const SizedBox(width: 32, height: 32, child: CircularProgressIndicator(valueColor: AlwaysStoppedAnimation<Color>(AppColors.accentGold), strokeWidth: 2)),
            ],
          ),
        ),
      ),
    );
  }
}
