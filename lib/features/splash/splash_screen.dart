import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../../core/theme/app_colors.dart';

class SplashScreen extends StatefulWidget {
  const SplashScreen({super.key});
  @override
  State<SplashScreen> createState() => _SplashScreenState();
}

class _SplashScreenState extends State<SplashScreen> with SingleTickerProviderStateMixin {
  late AnimationController _ctrl;
  late Animation<double> _fade;

  @override
  void initState() {
    super.initState();
    _ctrl = AnimationController(vsync: this, duration: const Duration(milliseconds: 800));
    _fade = Tween<double>(begin: 0, end: 1).animate(CurvedAnimation(parent: _ctrl, curve: Curves.easeIn));
    _ctrl.forward();
    Future.delayed(const Duration(milliseconds: 2200), () {
      if (mounted) context.go('/onboarding');
    });
  }

  @override
  void dispose() { _ctrl.dispose(); super.dispose(); }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.primary,
      body: Center(
        child: FadeTransition(
          opacity: _fade,
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Container(
                width: 90, height: 90,
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(24),
                  boxShadow: [BoxShadow(color: Colors.black.withOpacity(0.15), blurRadius: 20, offset: const Offset(0, 8))],
                ),
                child: const Center(
                  child: Text('A', style: TextStyle(
                    fontFamily: 'PlayfairDisplay', fontSize: 44,
                    fontWeight: FontWeight.w700, color: AppColors.primary,
                  )),
                ),
              ),
              const SizedBox(height: 20),
              const Text('APJ TRUE LIFE', style: TextStyle(
                fontFamily: 'PlayfairDisplay', fontSize: 28,
                fontWeight: FontWeight.w700, color: Colors.white, letterSpacing: 1.5,
              )),
              const SizedBox(height: 8),
              const Text('Ayurvedic Medical Centre', style: TextStyle(
                fontSize: 14, color: Colors.white70, letterSpacing: 0.5,
              )),
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
