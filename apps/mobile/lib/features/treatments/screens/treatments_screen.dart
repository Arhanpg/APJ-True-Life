import 'package:flutter/material.dart';

class TreatmentsScreen extends StatelessWidget {
  const TreatmentsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('My Treatments'),
        backgroundColor: const Color(0xFF1A5C38),
        foregroundColor: Colors.white,
      ),
      body: const Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(Icons.medical_services, size: 64, color: Colors.grey),
            SizedBox(height: 16),
            Text('No active treatments', style: TextStyle(fontSize: 18, color: Colors.grey)),
            SizedBox(height: 8),
            Text('Your treatment plans will appear here', style: TextStyle(color: Colors.grey)),
          ],
        ),
      ),
    );
  }
}
