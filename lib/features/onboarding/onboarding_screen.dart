import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../../core/theme/app_colors.dart';
import '../../core/widgets/apj_button.dart';

class OnboardingScreen extends StatefulWidget {
  const OnboardingScreen({super.key});
  @override
  State<OnboardingScreen> createState() => _OnboardingScreenState();
}

class _OnboardingScreenState extends State<OnboardingScreen> {
  final PageController _ctrl = PageController();
  int _page = 0;

  static const _pages = [
    _OnboardPage(
      icon: '\u2665',
      title: 'Certified Ayurvedic\nExperts',
      subtitle: 'Guided by award-winning Vaidyas recognized by AYUSH TV National Health Award 2024.',
      color: Color(0xFF1A5C38),
    ),
    _OnboardPage(
      icon: '\U0001F33F',
      title: 'Natural Remedies\n& Healing',
      subtitle: 'Classical Ayurvedic therapies including Panchakarma, Nasya and Purvakarma tailored to your Prakriti.',
      color: Color(0xFF2E7D52),
    ),
    _OnboardPage(
      icon: '\u2606',
      title: 'Holistic Care\nJourney',
      subtitle: 'Track your multi-phase treatment, book appointments and chat directly with your Vaidya.',
      color: Color(0xFF004324),
    ),
  ];

  @override
  void dispose() { _ctrl.dispose(); super.dispose(); }

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
                padding: const EdgeInsets.all(16),
                child: TextButton(
                  onPressed: () => context.go('/auth/mobile'),
                  child: const Text('Skip', style: TextStyle(color: AppColors.primary, fontWeight: FontWeight.w600)),
                ),
              ),
            ),
            // Pages
            Expanded(
              child: PageView.builder(
                controller: _ctrl,
                onPageChanged: (i) => setState(() => _page = i),
                itemCount: _pages.length,
                itemBuilder: (_, i) => _pages[i],
              ),
            ),
            // Indicators
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: List.generate(_pages.length, (i) => AnimatedContainer(
                duration: const Duration(milliseconds: 300),
                margin: const EdgeInsets.symmetric(horizontal: 4),
                width: i == _page ? 24 : 8, height: 8,
                decoration: BoxDecoration(
                  color: i == _page ? AppColors.primary : AppColors.outlineVariant,
                  borderRadius: BorderRadius.circular(4),
                ),
              )),
            ),
            const SizedBox(height: 32),
            // CTA
            Padding(
              padding: const EdgeInsets.fromLTRB(24, 0, 24, 32),
              child: _page == _pages.length - 1
                  ? APJButton(
                      label: 'GET STARTED WITH MOBILE OTP',
                      onPressed: () => context.go('/auth/mobile'),
                      icon: Icons.phone_android,
                    )
                  : APJButton(
                      label: 'Next',
                      onPressed: () => _ctrl.nextPage(duration: const Duration(milliseconds: 300), curve: Curves.easeOut),
                    ),
            ),
          ],
        ),
      ),
    );
  }
}

class _OnboardPage extends StatelessWidget {
  final String icon;
  final String title;
  final String subtitle;
  final Color color;
  const _OnboardPage({required this.icon, required this.title, required this.subtitle, required this.color});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 32),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Container(
            width: 120, height: 120,
            decoration: BoxDecoration(
              color: color.withOpacity(0.1),
              shape: BoxShape.circle,
            ),
            child: Center(child: Text(icon, style: const TextStyle(fontSize: 56))),
          ),
          const SizedBox(height: 32),
          Text(title,
            textAlign: TextAlign.center,
            style: const TextStyle(
              fontFamily: 'PlayfairDisplay', fontSize: 28,
              fontWeight: FontWeight.w700, color: AppColors.primaryDark, height: 1.3,
            ),
          ),
          const SizedBox(height: 16),
          Text(subtitle,
            textAlign: TextAlign.center,
            style: const TextStyle(fontSize: 16, color: AppColors.onSurfaceVariant, height: 1.6),
          ),
        ],
      ),
    );
  }
}
