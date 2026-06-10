import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../../../../core/theme/app_colors.dart';

class OnboardingScreen extends StatefulWidget {
  const OnboardingScreen({super.key});

  @override
  State<OnboardingScreen> createState() => _OnboardingScreenState();
}

class _OnboardingScreenState extends State<OnboardingScreen> {
  final PageController _controller = PageController();
  int _page = 0;

  static const _pages = [
    (
      emoji: '🏆',
      title: 'Certified Experts',
      subtitle: 'AYUSH TV National Health Award 2024 winning Ayurvedic centre with experienced Vaidyas.',
    ),
    (
      emoji: '🌿',
      title: 'Natural Remedies',
      subtitle: 'Personalised herbal treatments tailored to your Prakriti — your unique Ayurvedic body type.',
    ),
    (
      emoji: '☮️',
      title: 'Holistic Care',
      subtitle: 'Track multi-phase treatment plans, book appointments, and chat with your doctor — all in one app.',
    ),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      body: SafeArea(
        child: Column(
          children: [
            // Skip
            Align(
              alignment: Alignment.topRight,
              child: Padding(
                padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 12),
                child: TextButton(
                  onPressed: () => context.go('/phone'),
                  child: const Text('Skip', style: TextStyle(color: AppColors.textMuted, fontSize: 14)),
                ),
              ),
            ),

            // Page view
            Expanded(
              child: PageView.builder(
                controller: _controller,
                onPageChanged: (i) => setState(() => _page = i),
                itemCount: _pages.length,
                itemBuilder: (ctx, i) => Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 32),
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Container(
                        width: 120, height: 120,
                        decoration: BoxDecoration(
                          color: AppColors.surfaceTint,
                          borderRadius: BorderRadius.circular(30),
                        ),
                        child: Center(child: Text(_pages[i].emoji, style: const TextStyle(fontSize: 54))),
                      ),
                      const SizedBox(height: 36),
                      Text(
                        _pages[i].title,
                        style: const TextStyle(fontSize: 26, fontWeight: FontWeight.bold, color: AppColors.primaryDark),
                        textAlign: TextAlign.center,
                      ),
                      const SizedBox(height: 16),
                      Text(
                        _pages[i].subtitle,
                        style: const TextStyle(fontSize: 15, color: AppColors.textSecondary, height: 1.5),
                        textAlign: TextAlign.center,
                      ),
                    ],
                  ),
                ),
              ),
            ),

            // Dots
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: List.generate(3, (i) => AnimatedContainer(
                duration: const Duration(milliseconds: 250),
                margin: const EdgeInsets.symmetric(horizontal: 4),
                width: _page == i ? 22 : 8,
                height: 8,
                decoration: BoxDecoration(
                  color: _page == i ? AppColors.primary : AppColors.outlineVariant,
                  borderRadius: BorderRadius.circular(4),
                ),
              )),
            ),
            const SizedBox(height: 32),

            // CTA
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 24),
              child: ElevatedButton(
                onPressed: () => context.go('/phone'),
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
