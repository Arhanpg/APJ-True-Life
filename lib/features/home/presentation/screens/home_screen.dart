import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../../../../core/theme/app_colors.dart';
import '../../../appointments/presentation/screens/appointments_screen.dart';
import '../../../treatment/presentation/screens/treatment_screen.dart';
import '../../../chat/presentation/screens/chat_screen.dart';
import '../../../profile/presentation/screens/profile_screen.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});
  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  int _currentIndex = 0;

  final List<Widget> _screens = const [
    _HomeTab(),
    AppointmentsScreen(),
    TreatmentScreen(),
    ChatScreen(),
    ProfileScreen(),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: _screens[_currentIndex],
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: _currentIndex,
        onTap: (i) => setState(() => _currentIndex = i),
        items: const [
          BottomNavigationBarItem(icon: Icon(Icons.home_outlined),      activeIcon: Icon(Icons.home),          label: 'Home'),
          BottomNavigationBarItem(icon: Icon(Icons.calendar_today_outlined), activeIcon: Icon(Icons.calendar_today), label: 'Appointments'),
          BottomNavigationBarItem(icon: Icon(Icons.medical_services_outlined), activeIcon: Icon(Icons.medical_services), label: 'Treatment'),
          BottomNavigationBarItem(icon: Icon(Icons.chat_bubble_outline), activeIcon: Icon(Icons.chat_bubble),   label: 'Chat'),
          BottomNavigationBarItem(icon: Icon(Icons.person_outline),     activeIcon: Icon(Icons.person),        label: 'Profile'),
        ],
      ),
    );
  }
}

class _HomeTab extends StatelessWidget {
  const _HomeTab();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      body: SafeArea(
        child: ListView(
          padding: const EdgeInsets.all(20),
          children: [
            // Award badge
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
              decoration: BoxDecoration(
                color: const Color(0xFFFFFBEB),
                borderRadius: BorderRadius.circular(12),
                border: Border.all(color: AppColors.accentGold.withOpacity(0.4)),
              ),
              child: const Row(
                children: [
                  Text('\ud83c\udfc6', style: TextStyle(fontSize: 20)),
                  SizedBox(width: 10),
                  Expanded(
                    child: Text(
                      'AYUSH TV National Health Award 2024',
                      style: TextStyle(fontFamily: 'DMSans', fontSize: 13,
                          fontWeight: FontWeight.w500, color: Color(0xFF92400E)),
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 20),
            const Text('Good Morning! \ud83d\udc4b',
              style: TextStyle(fontFamily: 'PlayfairDisplay', fontSize: 22,
                  fontWeight: FontWeight.bold, color: AppColors.primaryDark)),
            const SizedBox(height: 4),
            const Text('Welcome to APJ TRUE LIFE',
              style: TextStyle(fontFamily: 'DMSans', fontSize: 14, color: AppColors.onSurfaceVariant)),
            const SizedBox(height: 24),
            // Active Treatment Card
            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: AppColors.primary,
                borderRadius: BorderRadius.circular(16),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text('Current Treatment', style: TextStyle(color: Colors.white70, fontSize: 12, fontFamily: 'DMSans')),
                  const SizedBox(height: 6),
                  const Text('No active treatment', style: TextStyle(color: Colors.white, fontSize: 17,
                      fontFamily: 'DMSans', fontWeight: FontWeight.w600)),
                  const SizedBox(height: 12),
                  ElevatedButton(
                    onPressed: () => context.go('/appointments'),
                    style: ElevatedButton.styleFrom(
                      backgroundColor: AppColors.accentGold,
                      foregroundColor: AppColors.primaryDark,
                      minimumSize: const Size(double.infinity, 40),
                      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
                    ),
                    child: const Text('Book Appointment', style: TextStyle(fontFamily: 'DMSans', fontWeight: FontWeight.w600)),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
