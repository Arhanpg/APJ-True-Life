import 'package:flutter/material.dart';
import 'package:flutter/gestures.dart';
import 'package:go_router/go_router.dart';
import '../../../core/dio_client.dart';

/// DPDP Act 2023 consent screen.
///
/// Per Build Guide Section 8.4:
/// - Two consent checkboxes: mandatory (Privacy+Terms) and optional (marketing)
/// - Continue button DISABLED until main mandatory checkbox is checked
/// - Expandable sections for: What we collect, Why, How long, Your rights
/// - NOT pre-checked (user must explicitly check)
/// - Privacy Policy and Terms of Service links
class ConsentScreen extends StatefulWidget {
  const ConsentScreen({super.key});

  @override
  State<ConsentScreen> createState() => _ConsentScreenState();
}

class _ConsentScreenState extends State<ConsentScreen> {
  // Mandatory — cannot proceed without this
  bool _consentMain = false;

  // Optional — separate marketing consent (ADR-009: separate purpose-specific consent)
  bool _consentMarketing = false;

  bool _loading = false;

  // Expandable sections
  final Map<String, bool> _expanded = {
    'collect': false,
    'why': false,
    'retention': false,
    'rights': false,
  };

  Future<void> _submitConsent() async {
    if (!_consentMain) return;

    setState(() => _loading = true);
    try {
      final dio = createDioClient();
      await dio.post('/api/patients/consent', data: {
        'policyVersion': 'v2.0-2026',
        'consentGiven': true,
        'marketingConsent': _consentMarketing,
      });

      if (mounted) context.go('/profile-completion');
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Error recording consent: $e')),
        );
      }
    } finally {
      if (mounted) setState(() => _loading = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFEDFDF3),
      appBar: AppBar(
        title: const Text('Before we continue…'),
        backgroundColor: const Color(0xFF1A5C38),
        foregroundColor: Colors.white,
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text(
              'APJ TRUE LIFE collects your name, phone number, and health information to manage your appointments and treatment records.',
              style: TextStyle(fontSize: 15, color: Color(0xFF111E18), height: 1.5),
            ),
            const SizedBox(height: 20),

            // Expandable info sections
            _buildExpandable('collect', '► What we collect', 'Name, phone number, date of birth, gender, blood group, and health consultation notes. No financial data.'),
            _buildExpandable('why', '► Why we collect it', 'To book appointments, manage treatment plans, send appointment reminders, and provide continuity of Ayurvedic care.'),
            _buildExpandable('retention', '► How long we keep it', 'Patient data is retained for 3 years after your last appointment (as required by Indian medical record guidelines), then permanently deleted.'),
            _buildExpandable('rights', '► Your rights', 'You have the right to: access your data, correct inaccuracies, withdraw consent, and request deletion. Use Settings → Privacy in the app.'),

            const SizedBox(height: 24),

            // Mandatory consent checkbox — NOT pre-checked
            _buildConsentCard(
              value: _consentMain,
              onChanged: (v) => setState(() => _consentMain = v ?? false),
              title: 'I agree to the Privacy Policy and Terms of Service',
              subtitle: 'Required to use APJ TRUE LIFE',
              isRequired: true,
              trailing: Row(
                mainAxisSize: MainAxisSize.min,
                children: [
                  _linkButton('Privacy Policy', () {}),
                  const Text(' · ', style: TextStyle(color: Color(0xFF707971))),
                  _linkButton('Terms', () {}),
                ],
              ),
            ),

            const SizedBox(height: 12),

            // Optional marketing consent — separate (ADR-009)
            _buildConsentCard(
              value: _consentMarketing,
              onChanged: (v) => setState(() => _consentMarketing = v ?? false),
              title: 'I agree to receive appointment reminders and health tips',
              subtitle: 'Optional — you can change this anytime in Settings',
              isRequired: false,
            ),

            const SizedBox(height: 28),

            SizedBox(
              width: double.infinity,
              height: 52,
              child: ElevatedButton(
                // DISABLED until mandatory checkbox is checked
                onPressed: (_consentMain && !_loading) ? _submitConsent : null,
                style: ElevatedButton.styleFrom(
                  backgroundColor: const Color(0xFF1A5C38),
                  disabledBackgroundColor: const Color(0xFFC0C9BF),
                  foregroundColor: Colors.white,
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                ),
                child: _loading
                    ? const SizedBox(height: 20, width: 20, child: CircularProgressIndicator(color: Colors.white, strokeWidth: 2))
                    : const Text('Continue', style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold)),
              ),
            ),

            const SizedBox(height: 16),
            const Text(
              'Your data is protected under the Digital Personal Data Protection Act 2023 (India). APJ TRUE LIFE is a registered Data Fiduciary.',
              style: TextStyle(fontSize: 11, color: Color(0xFF707971), height: 1.5),
              textAlign: TextAlign.center,
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildExpandable(String key, String title, String content) {
    return Column(
      children: [
        InkWell(
          onTap: () => setState(() => _expanded[key] = !(_expanded[key] ?? false)),
          child: Padding(
            padding: const EdgeInsets.symmetric(vertical: 10),
            child: Row(
              children: [
                Text(title, style: const TextStyle(color: Color(0xFF1A5C38), fontWeight: FontWeight.w600, fontSize: 14)),
                const Spacer(),
                Icon(_expanded[key] == true ? Icons.expand_less : Icons.expand_more, color: const Color(0xFF1A5C38), size: 18),
              ],
            ),
          ),
        ),
        if (_expanded[key] == true)
          Padding(
            padding: const EdgeInsets.only(bottom: 10, left: 8),
            child: Text(content, style: const TextStyle(fontSize: 13, color: Color(0xFF404941), height: 1.5)),
          ),
        const Divider(height: 1),
      ],
    );
  }

  Widget _buildConsentCard({
    required bool value,
    required Function(bool?) onChanged,
    required String title,
    required String subtitle,
    required bool isRequired,
    Widget? trailing,
  }) {
    return Container(
      decoration: BoxDecoration(
        color: Colors.white,
        border: Border.all(color: value ? const Color(0xFF1A5C38) : const Color(0xFFE1F2E8)),
        borderRadius: BorderRadius.circular(12),
      ),
      child: CheckboxListTile(
        title: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(title, style: const TextStyle(fontSize: 14, fontWeight: FontWeight.w600, color: Color(0xFF111E18))),
            if (trailing != null) trailing,
          ],
        ),
        subtitle: Padding(
          padding: const EdgeInsets.only(top: 4),
          child: Text(subtitle, style: TextStyle(fontSize: 12, color: isRequired ? const Color(0xFF1A5C38) : const Color(0xFF707971))),
        ),
        value: value,
        onChanged: onChanged,
        activeColor: const Color(0xFF1A5C38),
        controlAffinity: ListTileControlAffinity.leading,
      ),
    );
  }

  Widget _linkButton(String label, VoidCallback onTap) {
    return GestureDetector(
      onTap: onTap,
      child: Text(label, style: const TextStyle(color: Color(0xFF1A5C38), fontSize: 12, decoration: TextDecoration.underline)),
    );
  }
}
