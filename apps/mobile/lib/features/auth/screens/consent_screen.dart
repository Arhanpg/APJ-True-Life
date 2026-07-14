import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../../core/dio_client.dart';

/// DPDP Act 2023 consent screen.
/// Per Build Guide Section 4.1: Granular data consent before data processing.
class ConsentScreen extends StatefulWidget {
  const ConsentScreen({super.key});

  @override
  State<ConsentScreen> createState() => _ConsentScreenState();
}

class _ConsentScreenState extends State<ConsentScreen> {
  bool _dataProcessing = false;
  bool _healthRecords = false;

  Future<void> _submitConsent() async {
    if (!_dataProcessing || !_healthRecords) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Please accept all required consents to continue')),
      );
      return;
    }

    try {
      final dio = createDioClient();
      await dio.post('/api/patients/consent', data: {
        'policyVersion': 'v2.0-2024',
        'consentGiven': true,
      });

      if (mounted) context.go('/profile-completion');
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Error: $e')),
        );
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Data Privacy Consent')),
      body: Padding(
        padding: const EdgeInsets.all(24),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text(
              'Your Data, Your Rights',
              style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 8),
            Text(
              'Under the Digital Personal Data Protection Act 2023, we need your explicit consent to process your data.',
              style: TextStyle(color: Colors.grey.shade600),
            ),
            const SizedBox(height: 24),
            CheckboxListTile(
              title: const Text('Data Processing Consent *'),
              subtitle: const Text('Allow us to collect and process your personal data for medical services.'),
              value: _dataProcessing,
              onChanged: (v) => setState(() => _dataProcessing = v ?? false),
              activeColor: const Color(0xFF1A5C38),
            ),
            CheckboxListTile(
              title: const Text('Health Records Access *'),
              subtitle: const Text('Allow storage and retrieval of your Ayurvedic health records.'),
              value: _healthRecords,
              onChanged: (v) => setState(() => _healthRecords = v ?? false),
              activeColor: const Color(0xFF1A5C38),
            ),
            const SizedBox(height: 16),
            Text(
              '* Required for service use',
              style: TextStyle(color: Colors.grey.shade500, fontSize: 12),
            ),
            const Spacer(),
            SizedBox(
              width: double.infinity,
              height: 52,
              child: ElevatedButton(
                onPressed: _submitConsent,
                style: ElevatedButton.styleFrom(
                  backgroundColor: const Color(0xFF1A5C38),
                  foregroundColor: Colors.white,
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                ),
                child: const Text('Accept & Continue', style: TextStyle(fontSize: 16)),
              ),
            ),
            const SizedBox(height: 12),
            Center(
              child: TextButton(
                onPressed: () {
                  // Show privacy policy
                },
                child: const Text('Read our Privacy Policy'),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
