import 'package:flutter/material.dart';
import '../../../../core/theme/app_colors.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(20),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Greeting
              Row(
                children: [
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: const [
                        Text('Good Morning,', style: TextStyle(fontSize: 14, color: AppColors.textMuted)),
                        SizedBox(height: 2),
                        Text('Patient Name', style: TextStyle(fontSize: 22, fontWeight: FontWeight.bold, color: AppColors.primaryDark)),
                      ],
                    ),
                  ),
                  CircleAvatar(radius: 22, backgroundColor: AppColors.surfaceTint,
                    child: const Icon(Icons.person, color: AppColors.primary)),
                ],
              ),
              const SizedBox(height: 16),

              // Award badge
              Container(
                width: double.infinity,
                padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
                decoration: BoxDecoration(
                  gradient: const LinearGradient(colors: [Color(0xFF004324), Color(0xFF1A5C38)]),
                  borderRadius: BorderRadius.circular(12),
                ),
                child: Row(
                  children: [
                    Container(
                      padding: const EdgeInsets.all(8),
                      decoration: BoxDecoration(color: AppColors.accentGold, borderRadius: BorderRadius.circular(8)),
                      child: const Text('🏆', style: TextStyle(fontSize: 18)),
                    ),
                    const SizedBox(width: 12),
                    const Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text('AYUSH TV National Health Award', style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 13)),
                          Text('2024 Award Winner for Clinical Excellence', style: TextStyle(color: Color(0xAAFFFFFF), fontSize: 11)),
                        ],
                      ),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 20),

              // Active treatment card
              _SectionTitle('My Active Treatment'),
              const SizedBox(height: 10),
              Container(
                padding: const EdgeInsets.all(18),
                decoration: BoxDecoration(
                  color: Colors.white, borderRadius: BorderRadius.circular(14),
                  border: Border.all(color: AppColors.outlineVariant),
                  boxShadow: const [BoxShadow(color: Color(0x0A000000), blurRadius: 8, offset: Offset(0, 2))],
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      children: [
                        const Expanded(child: Text('Nasya Therapy Course', style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: AppColors.primaryDark))),
                        Container(padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                          decoration: BoxDecoration(color: AppColors.confirmedBg, borderRadius: BorderRadius.circular(20)),
                          child: const Text('Active', style: TextStyle(color: AppColors.confirmedText, fontSize: 11, fontWeight: FontWeight.w700)),
                        ),
                      ],
                    ),
                    const SizedBox(height: 8),
                    const Text('Day 5 of 21', style: TextStyle(fontSize: 12, color: AppColors.textMuted)),
                    const SizedBox(height: 12),
                    ClipRRect(
                      borderRadius: BorderRadius.circular(4),
                      child: LinearProgressIndicator(
                        value: 5 / 21,
                        backgroundColor: AppColors.surfaceTint,
                        valueColor: const AlwaysStoppedAnimation(AppColors.secondary),
                        minHeight: 8,
                      ),
                    ),
                    const SizedBox(height: 6),
                    const Text('24% Complete · Phase 1 of 3', style: TextStyle(fontSize: 11, color: AppColors.textMuted)),
                  ],
                ),
              ),
              const SizedBox(height: 20),

              // Primary physician
              _SectionTitle('Primary Physician'),
              const SizedBox(height: 10),
              Container(
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(
                  color: Colors.white, borderRadius: BorderRadius.circular(14),
                  border: Border.all(color: AppColors.outlineVariant),
                ),
                child: Row(
                  children: [
                    CircleAvatar(radius: 28, backgroundColor: AppColors.primary,
                      child: const Text('D', style: TextStyle(color: Colors.white, fontSize: 20, fontWeight: FontWeight.bold))),
                    const SizedBox(width: 14),
                    const Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text('Dr. APJ Sharma', style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: AppColors.primaryDark)),
                          SizedBox(height: 2),
                          Text('Chief Vaidya, APJ TRUE LIFE', style: TextStyle(fontSize: 12, color: AppColors.textMuted)),
                          SizedBox(height: 6),
                          Row(children: [
                            Icon(Icons.verified, size: 14, color: AppColors.accentGold),
                            SizedBox(width: 4),
                            Text('Verified Ayurvedic Practitioner', style: TextStyle(fontSize: 11, color: AppColors.accentGold, fontWeight: FontWeight.w600)),
                          ]),
                        ],
                      ),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 20),

              // Quick access departments
              _SectionTitle('Departments & Services'),
              const SizedBox(height: 10),
              GridView.count(
                crossAxisCount: 2, mainAxisSpacing: 10, crossAxisSpacing: 10,
                shrinkWrap: true, physics: const NeverScrollableScrollPhysics(),
                childAspectRatio: 2.4,
                children: const [
                  _DeptCard('🏥', 'General'),
                  _DeptCard('👶', 'OBG'),
                  _DeptCard('🧠', 'Psychiatry'),
                  _DeptCard('🥗', 'Dietetics'),
                ],
              ),
              const SizedBox(height: 20),

              // Therapeutic services
              _SectionTitle('Therapeutic Services'),
              const SizedBox(height: 10),
              Row(
                children: const [
                  Expanded(child: _ServiceCard('💆', 'Abhyanga', 'Oil massage therapy')),
                  SizedBox(width: 10),
                  Expanded(child: _ServiceCard('🧘', 'Yoga', 'Therapeutic yoga')),
                ],
              ),
              const SizedBox(height: 24),

              // Book appointment CTA
              ElevatedButton.icon(
                onPressed: () {},
                icon: const Icon(Icons.calendar_today, size: 18),
                label: const Text('Book Appointment'),
              ),
              const SizedBox(height: 20),
            ],
          ),
        ),
      ),
    );
  }
}

class _SectionTitle extends StatelessWidget {
  final String text;
  const _SectionTitle(this.text);

  @override
  Widget build(BuildContext context) =>
    Text(text, style: const TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: AppColors.primaryDark));
}

class _DeptCard extends StatelessWidget {
  final String emoji;
  final String label;
  const _DeptCard(this.emoji, this.label);

  @override
  Widget build(BuildContext context) => Container(
    padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
    decoration: BoxDecoration(
      color: Colors.white, borderRadius: BorderRadius.circular(10),
      border: Border.all(color: AppColors.outlineVariant),
    ),
    child: Row(children: [
      Text(emoji, style: const TextStyle(fontSize: 18)),
      const SizedBox(width: 8),
      Text(label, style: const TextStyle(fontSize: 13, fontWeight: FontWeight.w600, color: AppColors.textPrimary)),
    ]),
  );
}

class _ServiceCard extends StatelessWidget {
  final String emoji;
  final String title;
  final String sub;
  const _ServiceCard(this.emoji, this.title, this.sub);

  @override
  Widget build(BuildContext context) => Container(
    padding: const EdgeInsets.all(14),
    decoration: BoxDecoration(
      color: Colors.white, borderRadius: BorderRadius.circular(12),
      border: Border.all(color: AppColors.outlineVariant),
    ),
    child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
      Text(emoji, style: const TextStyle(fontSize: 24)),
      const SizedBox(height: 8),
      Text(title, style: const TextStyle(fontSize: 14, fontWeight: FontWeight.bold, color: AppColors.primaryDark)),
      const SizedBox(height: 2),
      Text(sub, style: const TextStyle(fontSize: 11, color: AppColors.textMuted)),
    ]),
  );
}
