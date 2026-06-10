import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../../../core/theme/app_colors.dart';

const _pages = [
  {
    'title': 'Certified Ayurvedic Experts',
    'desc': 'Experience authentic Panchakarma and holistic healing under AYUSH-certified Vaidyas.',
    'icon': '🌿',
  },
  {
    'title': 'Natural Remedies',
    'desc': 'Personalised treatment plans using time-tested natural medicines tailored to your Prakriti.',
    'icon': '🍃',
  },
  {
    'title': 'Holistic Care',
    'desc': 'Track your multi-phase treatment, book appointments, and chat with your doctor — all in one app.',
    'icon': '✨',
  },
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
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final h = MediaQuery.of(context).size.height;
    return Scaffold(
      backgroundColor: AppColors.background,
      body: SafeArea(
        child: Column(
          children: [
            Align(
              alignment: Alignment.centerRight,
              child: TextButton(
                onPressed: () => context.go('/phone'),
                child: const Text('Skip', style: TextStyle(color: AppColors.outline, fontFamily: 'DMSans')),
              ),
            ),
            Expanded(
              child: PageView.builder(
                controller: _controller,
                itemCount: _pages.length,
                onPageChanged: (i) => setState(() => _current = i),
                itemBuilder: (ctx, i) {
                  final p = _pages[i];
                  return Padding(
                    padding: const EdgeInsets.all(32),
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Container(
                          width: h * 0.22,
                          height: h * 0.22,
                          decoration: BoxDecoration(
                            color: AppColors.surfaceTint,
                            borderRadius: BorderRadius.circular(28),
                          ),
                          child: Center(
                            child: Text(p['icon'] as String, style: TextStyle(fontSize: h * 0.09)),
                          ),
                        ),
                        const SizedBox(height: 40),
                        Text(
                          p['title'] as String,
                          textAlign: TextAlign.center,
                          style: const TextStyle(
                            fontFamily: 'PlayfairDisplay',
                            fontSize: 26,
                            fontWeight: FontWeight.w700,
                            color: AppColors.primaryDark,
                          ),
                        ),
                        const SizedBox(height: 16),
                        Text(
                          p['desc'] as String,
                          textAlign: TextAlign.center,
                          style: const TextStyle(
                            fontFamily: 'DMSans',
                            fontSize: 15,
                            color: AppColors.onSurfaceVariant,
                            height: 1.6,
                          ),
                        ),
                      ],
                    ),
                  );
                },
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
            const SizedBox(height: 24),
          ],
        ),
      ),
    );
  }
}
