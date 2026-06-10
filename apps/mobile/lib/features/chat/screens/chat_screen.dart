import 'package:flutter/material.dart';
import '../../../core/theme/app_colors.dart';

const _messages = [
  {'sender': 'doctor', 'text': 'Good morning! How are you feeling after yesterday\'s Nasya session?', 'time': '09:02', 'read': true},
  {'sender': 'patient', 'text': 'Good morning Doctor! I feel much better. The headache has reduced significantly.', 'time': '09:15', 'read': true},
  {'sender': 'doctor', 'text': 'That is great progress. Please continue the morning Anu Thailam drops. Avoid cold water today.', 'time': '09:18', 'read': true},
  {'sender': 'patient', 'text': 'Understood. Should I continue the Triphala at night as well?', 'time': '09:22', 'read': false},
];

class ChatScreen extends StatefulWidget {
  const ChatScreen({super.key});

  @override
  State<ChatScreen> createState() => _ChatScreenState();
}

class _ChatScreenState extends State<ChatScreen> {
  final _msgCtrl = TextEditingController();
  final _scrollCtrl = ScrollController();
  final List<Map<String, dynamic>> _localMessages = List.from(_messages);

  @override
  void dispose() {
    _msgCtrl.dispose();
    _scrollCtrl.dispose();
    super.dispose();
  }

  void _send() {
    if (_msgCtrl.text.trim().isEmpty) return;
    setState(() {
      _localMessages.add({'sender': 'patient', 'text': _msgCtrl.text.trim(), 'time': TimeOfDay.now().format(context), 'read': false});
      _msgCtrl.clear();
    });
    Future.delayed(const Duration(milliseconds: 100), () {
      if (_scrollCtrl.hasClients) _scrollCtrl.animateTo(_scrollCtrl.position.maxScrollExtent, duration: const Duration(milliseconds: 300), curve: Curves.easeOut);
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        title: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: const [
            Text('Dr. APJ Sharma', style: TextStyle(fontSize: 15, fontWeight: FontWeight.w700)),
            Text('Nasya Therapy Course', style: TextStyle(fontSize: 11, fontWeight: FontWeight.w400, color: Color(0xCCFFFFFF))),
          ],
        ),
        backgroundColor: AppColors.primary,
        automaticallyImplyLeading: false,
      ),
      body: Column(
        children: [
          // Warning banner
          Container(
            width: double.infinity,
            padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
            color: const Color(0xFFFFF8E1),
            child: const Row(
              children: [
                Icon(Icons.info_outline, color: Color(0xFFB45309), size: 16),
                SizedBox(width: 8),
                Expanded(
                  child: Text(
                    'Chat messages will be deleted when treatment is completed.',
                    style: TextStyle(fontFamily: 'DMSans', fontSize: 11, color: Color(0xFF92400E)),
                  ),
                ),
              ],
            ),
          ),
          // Messages
          Expanded(
            child: ListView.builder(
              controller: _scrollCtrl,
              padding: const EdgeInsets.all(16),
              itemCount: _localMessages.length,
              itemBuilder: (ctx, i) {
                final m = _localMessages[i];
                final isPatient = m['sender'] == 'patient';
                return Padding(
                  padding: const EdgeInsets.only(bottom: 10),
                  child: Row(
                    mainAxisAlignment: isPatient ? MainAxisAlignment.end : MainAxisAlignment.start,
                    crossAxisAlignment: CrossAxisAlignment.end,
                    children: [
                      if (!isPatient) Container(
                        width: 32,
                        height: 32,
                        margin: const EdgeInsets.only(right: 8),
                        decoration: const BoxDecoration(shape: BoxShape.circle, color: AppColors.primary),
                        child: const Center(child: Text('Dr', style: TextStyle(color: Colors.white, fontSize: 10, fontWeight: FontWeight.w700))),
                      ),
                      Flexible(
                        child: Container(
                          padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
                          decoration: BoxDecoration(
                            color: isPatient ? AppColors.primary : AppColors.surface,
                            borderRadius: BorderRadius.only(
                              topLeft: const Radius.circular(16),
                              topRight: const Radius.circular(16),
                              bottomLeft: Radius.circular(isPatient ? 16 : 4),
                              bottomRight: Radius.circular(isPatient ? 4 : 16),
                            ),
                            border: isPatient ? null : Border.all(color: const Color(0xFFD4E8D8)),
                          ),
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.end,
                            children: [
                              Text(
                                m['text'] as String,
                                style: TextStyle(
                                  fontFamily: 'DMSans',
                                  fontSize: 14,
                                  color: isPatient ? Colors.white : AppColors.onSurface,
                                  height: 1.4,
                                ),
                              ),
                              const SizedBox(height: 4),
                              Row(
                                mainAxisSize: MainAxisSize.min,
                                children: [
                                  Text(m['time'] as String, style: TextStyle(fontSize: 10, color: isPatient ? Colors.white70 : AppColors.outline)),
                                  if (isPatient) ...[
                                    const SizedBox(width: 4),
                                    Icon(
                                      (m['read'] as bool) ? Icons.done_all : Icons.done,
                                      size: 14,
                                      color: (m['read'] as bool) ? AppColors.accentGold : Colors.white70,
                                    ),
                                  ],
                                ],
                              ),
                            ],
                          ),
                        ),
                      ),
                    ],
                  ),
                );
              },
            ),
          ),
          // Input bar
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
            decoration: const BoxDecoration(color: AppColors.surface, border: Border(top: BorderSide(color: Color(0xFFE1F2E8)))),
            child: SafeArea(
              child: Row(
                children: [
                  IconButton(onPressed: () {}, icon: const Icon(Icons.attach_file_outlined, color: AppColors.outline)),
                  IconButton(onPressed: () {}, icon: const Icon(Icons.mic_outlined, color: AppColors.outline)),
                  Expanded(
                    child: TextField(
                      controller: _msgCtrl,
                      decoration: const InputDecoration(
                        hintText: 'Type a message...',
                        hintStyle: TextStyle(fontFamily: 'DMSans', fontSize: 14, color: AppColors.outline),
                        border: InputBorder.none,
                        contentPadding: EdgeInsets.symmetric(horizontal: 12, vertical: 8),
                        filled: true,
                        fillColor: Color(0xFFF5FAF7),
                      ),
                      onSubmitted: (_) => _send(),
                    ),
                  ),
                  const SizedBox(width: 8),
                  GestureDetector(
                    onTap: _send,
                    child: Container(
                      width: 44,
                      height: 44,
                      decoration: const BoxDecoration(shape: BoxShape.circle, color: AppColors.primary),
                      child: const Icon(Icons.send_rounded, color: Colors.white, size: 20),
                    ),
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}
