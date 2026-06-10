import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../../../core/theme/app_theme.dart';

const _pages = [
  _OnboardingPage(emoji: '🌿', title: 'Certified Experts', subtitle: 'AYUSH TV National Health Award 2024 winners. Trusted Ayurvedic care.'),
  _OnboardingPage(emoji: '💊', title: 'Natural Remedies', subtitle: 'Personalised Ayurvedic treatment plans tailored to your Prakriti and health needs.'),
  _OnboardingPage(emoji: '🧘', title: 'Holistic Care', subtitle: 'Panchakarma, Nasya, Abhyanga and more — complete Ayurvedic healing in one app.'),
];

class OnboardingScreen extends StatefulWidget {
  const OnboardingScreen({super.key});
  @override
  State<OnboardingScreen> createState() => _OnboardingScreenState();
}

class _OnboardingScreenState extends State<OnboardingScreen> {
  final _controller = PageController();
  int _current = 0;

  @override
  void dispose() { _controller.dispose(); super.dispose(); }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      body: SafeArea(
        child: Column(
          children: [
            Align(
              alignment: Alignment.topRight,
              child: TextButton(
                onPressed: () => context.go('/phone'),
                child: const Text('Skip', style: TextStyle(color: AppColors.outline)),
              ),
            ),
            Expanded(
              child: PageView.builder(
                controller: _controller,
                itemCount: _pages.length,
                onPageChanged: (i) => setState(() => _current = i),
                itemBuilder: (_, i) => _pages[i],
              ),
            ),
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: List.generate(_pages.length, (i) => AnimatedContainer(
                duration: const Duration(milliseconds: 300),
                margin: const EdgeInsets.symmetric(horizontal: 4),
                width: _current == i ? 24 : 8,
                height: 8,
                decoration: BoxDecoration(
                  color: _current == i ? AppColors.primary : AppColors.outlineVariant,
                  borderRadius: BorderRadius.circular(4),
                ),
              )),
            ),
            const SizedBox(height: 32),
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 24),
              child: ElevatedButton(
                onPressed: () => context.go('/phone'),
                child: const Text('GET STARTED WITH MOBILE OTP'),
              ),
            ),
            const SizedBox(height: 32),
          ],
        ),
      ),
    );
  }
}

class _OnboardingPage extends StatelessWidget {
  final String emoji, title, subtitle;
  const _OnboardingPage({required this.emoji, required this.title, required this.subtitle});
  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(32),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Container(
            width: 120, height: 120,
            decoration: BoxDecoration(color: AppColors.surfaceTint, shape: BoxShape.circle),
            child: Center(child: Text(emoji, style: const TextStyle(fontSize: 52))),
          ),
          const SizedBox(height: 40),
          Text(title, style: const TextStyle(fontSize: 26, fontFamily: 'PlayfairDisplay', fontWeight: FontWeight.bold, color: AppColors.primaryDark), textAlign: TextAlign.center),
          const SizedBox(height: 16),
          Text(subtitle, style: const TextStyle(fontSize: 15, color: AppColors.onSurfaceVariant, height: 1.6), textAlign: TextAlign.center),
        ],
      ),
    );
  }
}
