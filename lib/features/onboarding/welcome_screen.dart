import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../../core/theme/app_theme.dart';

final _pages = [
  _OnboardingPage(
    icon: Icons.verified_user_outlined,
    title: 'Certified Experts',
    subtitle: 'Consult with AYUSH TV award-winning Ayurvedic physicians with decades of expertise.',
  ),
  _OnboardingPage(
    icon: Icons.spa_outlined,
    title: 'Natural Remedies',
    subtitle: 'Personalized herbal medicine and Panchakarma plans crafted specifically for your body constitution.',
  ),
  _OnboardingPage(
    icon: Icons.favorite_border,
    title: 'Holistic Care',
    subtitle: 'Track your complete treatment journey — from diagnosis to full recovery — all in one place.',
  ),
];

class WelcomeScreen extends StatefulWidget {
  const WelcomeScreen({super.key});
  @override
  State<WelcomeScreen> createState() => _WelcomeScreenState();
}

class _WelcomeScreenState extends State<WelcomeScreen> {
  final _pageController = PageController();
  int _currentPage = 0;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      body: SafeArea(
        child: Column(
          children: [
            Align(alignment: Alignment.topRight, child: TextButton(onPressed: () => context.go('/auth/mobile'), child: const Text('Skip', style: TextStyle(color: AppColors.outline, fontFamily: 'DM Sans')))),
            Expanded(
              child: PageView.builder(
                controller: _pageController,
                itemCount: _pages.length,
                onPageChanged: (i) => setState(() => _currentPage = i),
                itemBuilder: (ctx, i) => _pages[i].build(context),
              ),
            ),
            // Dots
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: List.generate(_pages.length, (i) => AnimatedContainer(
                duration: const Duration(milliseconds: 250),
                margin: const EdgeInsets.symmetric(horizontal: 4),
                width: _currentPage == i ? 24 : 8, height: 8,
                decoration: BoxDecoration(
                  color: _currentPage == i ? AppColors.primary : AppColors.outlineVariant,
                  borderRadius: BorderRadius.circular(999),
                ),
              )),
            ),
            const SizedBox(height: 32),
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 24),
              child: ElevatedButton(
                onPressed: () => context.go('/auth/mobile'),
                child: const Text('GET STARTED WITH MOBILE OTP'),
              ),
            ),
            const SizedBox(height: 24),
          ],
        ),
      ),
    );
  }
}

class _OnboardingPage {
  final IconData icon;
  final String title;
  final String subtitle;
  const _OnboardingPage({required this.icon, required this.title, required this.subtitle});

  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 32),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Container(
            width: 120, height: 120,
            decoration: BoxDecoration(color: AppColors.primary, borderRadius: BorderRadius.circular(32)),
            child: Icon(icon, color: AppColors.accentGold, size: 56),
          ),
          const SizedBox(height: 32),
          Text(title, textAlign: TextAlign.center, style: const TextStyle(fontSize: 24, fontWeight: FontWeight.w700, color: AppColors.primaryDark, fontFamily: 'DM Sans')),
          const SizedBox(height: 16),
          Text(subtitle, textAlign: TextAlign.center, style: const TextStyle(fontSize: 15, color: AppColors.onSurfaceVariant, fontFamily: 'DM Sans', height: 1.6)),
        ],
      ),
    );
  }
}
