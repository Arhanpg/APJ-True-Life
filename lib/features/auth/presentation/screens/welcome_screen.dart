import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../../../../core/theme/app_colors.dart';

class WelcomeScreen extends StatefulWidget {
  const WelcomeScreen({super.key});

  @override
  State<WelcomeScreen> createState() => _WelcomeScreenState();
}

class _WelcomeScreenState extends State<WelcomeScreen> {
  final PageController _pageController = PageController();
  int _currentPage = 0;

  final List<Map<String, String>> _pages = [
    {
      'emoji': '\u2695\ufe0f',
      'title': 'Certified Experts',
      'subtitle': 'Consult with award-winning Ayurvedic physicians recognised by AYUSH TV.',
    },
    {
      'emoji': '\ud83c\udf3f',
      'title': 'Natural Remedies',
      'subtitle': 'Personalised multi-phase treatment plans using classical Ayurvedic therapies.',
    },
    {
      'emoji': '\u2728',
      'title': 'Holistic Care',
      'subtitle': 'Track your treatment progress, diet guidelines, and medicines — all in one place.',
    },
  ];

  @override
  void dispose() {
    _pageController.dispose();
    super.dispose();
  }

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
                child: const Text('Skip', style: TextStyle(color: AppColors.onSurfaceVariant)),
              ),
            ),
            Expanded(
              child: PageView.builder(
                controller: _pageController,
                onPageChanged: (i) => setState(() => _currentPage = i),
                itemCount: _pages.length,
                itemBuilder: (context, i) {
                  final page = _pages[i];
                  return Padding(
                    padding: const EdgeInsets.symmetric(horizontal: 32),
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Text(page['emoji']!, style: const TextStyle(fontSize: 72)),
                        const SizedBox(height: 32),
                        Text(
                          page['title']!,
                          style: const TextStyle(
                            fontFamily: 'PlayfairDisplay',
                            fontSize: 26,
                            fontWeight: FontWeight.bold,
                            color: AppColors.primaryDark,
                          ),
                          textAlign: TextAlign.center,
                        ),
                        const SizedBox(height: 16),
                        Text(
                          page['subtitle']!,
                          style: const TextStyle(
                            fontFamily: 'DMSans',
                            fontSize: 16,
                            color: AppColors.onSurfaceVariant,
                            height: 1.6,
                          ),
                          textAlign: TextAlign.center,
                        ),
                      ],
                    ),
                  );
                },
              ),
            ),
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: List.generate(
                _pages.length,
                (i) => AnimatedContainer(
                  duration: const Duration(milliseconds: 300),
                  margin: const EdgeInsets.symmetric(horizontal: 4),
                  width: _currentPage == i ? 20 : 8,
                  height: 8,
                  decoration: BoxDecoration(
                    color: _currentPage == i ? AppColors.primary : AppColors.outline,
                    borderRadius: BorderRadius.circular(4),
                  ),
                ),
              ),
            ),
            const SizedBox(height: 40),
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
