import 'package:flutter/material.dart';
import '../../../../core/theme/app_colors.dart';

class ChatScreen extends StatefulWidget {
  const ChatScreen({super.key});

  @override
  State<ChatScreen> createState() => _ChatScreenState();
}

class _ChatScreenState extends State<ChatScreen> {
  final _msgCtrl = TextEditingController();
  final _scrollCtrl = ScrollController();
  final List<_Message> _messages = [
    _Message(text: 'Hello! How are you feeling today?', isMine: false, time: '10:00 AM'),
    _Message(text: 'A bit better after the morning Nasya session.', isMine: true, time: '10:02 AM'),
    _Message(text: 'Good. Make sure to rest for 20 minutes after each session and avoid cold water.', isMine: false, time: '10:04 AM'),
    _Message(text: 'Understood, Doctor. Any changes to my diet?', isMine: true, time: '10:06 AM'),
    _Message(text: 'Yes, please add warm turmeric milk in the evening. Continue avoiding dairy for now.', isMine: false, time: '10:08 AM'),
  ];

  void _send() {
    final text = _msgCtrl.text.trim();
    if (text.isEmpty) return;
    setState(() => _messages.add(_Message(text: text, isMine: true, time: 'Now')));
    _msgCtrl.clear();
    Future.delayed(const Duration(milliseconds: 100), () {
      _scrollCtrl.animateTo(_scrollCtrl.position.maxScrollExtent, duration: const Duration(milliseconds: 200), curve: Curves.easeOut);
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        backgroundColor: AppColors.primary,
        title: Row(
          children: [
            CircleAvatar(radius: 16, backgroundColor: AppColors.accentGold,
              child: const Text('D', style: TextStyle(color: AppColors.primary, fontWeight: FontWeight.bold, fontSize: 14))),
            const SizedBox(width: 10),
            const Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text('Dr. APJ Sharma', style: TextStyle(fontSize: 14, fontWeight: FontWeight.bold, color: Colors.white)),
                Text('Nasya Therapy · Active', style: TextStyle(fontSize: 10, color: Colors.white70)),
              ],
            ),
          ],
        ),
      ),
      body: Column(
        children: [
          // Warning banner
          Container(
            width: double.infinity,
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
            color: const Color(0xFFFFF8E1),
            child: Row(
              children: const [
                Icon(Icons.info_outline, size: 14, color: Color(0xFFF59E0B)),
                SizedBox(width: 8),
                Expanded(
                  child: Text(
                    'Chat messages will be deleted when treatment is completed.',
                    style: TextStyle(fontSize: 11, color: Color(0xFF856404)),
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
              itemCount: _messages.length,
              itemBuilder: (ctx, i) => _Bubble(msg: _messages[i]),
            ),
          ),
          // Input
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 10),
            decoration: const BoxDecoration(
              color: Colors.white,
              boxShadow: [BoxShadow(color: Color(0x14000000), blurRadius: 8, offset: Offset(0, -2))],
            ),
            child: SafeArea(
              child: Row(
                children: [
                  IconButton(
                    onPressed: () {},
                    icon: const Icon(Icons.attach_file, color: AppColors.textMuted),
                    padding: EdgeInsets.zero,
                  ),
                  Expanded(
                    child: TextField(
                      controller: _msgCtrl,
                      minLines: 1, maxLines: 4,
                      decoration: InputDecoration(
                        hintText: 'Type a message…',
                        hintStyle: const TextStyle(color: AppColors.textMuted, fontSize: 14),
                        filled: true, fillColor: AppColors.background,
                        border: OutlineInputBorder(borderRadius: BorderRadius.circular(24), borderSide: BorderSide.none),
                        contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
                      ),
                    ),
                  ),
                  const SizedBox(width: 8),
                  GestureDetector(
                    onTap: _send,
                    child: Container(
                      width: 42, height: 42,
                      decoration: const BoxDecoration(color: AppColors.primary, shape: BoxShape.circle),
                      child: const Icon(Icons.send, color: Colors.white, size: 18),
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

class _Message {
  final String text;
  final bool isMine;
  final String time;
  const _Message({required this.text, required this.isMine, required this.time});
}

class _Bubble extends StatelessWidget {
  final _Message msg;
  const _Bubble({super.key, required this.msg});

  @override
  Widget build(BuildContext context) {
    return Align(
      alignment: msg.isMine ? Alignment.centerRight : Alignment.centerLeft,
      child: Container(
        constraints: BoxConstraints(maxWidth: MediaQuery.of(context).size.width * 0.72),
        margin: const EdgeInsets.only(bottom: 10),
        padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
        decoration: BoxDecoration(
          color: msg.isMine ? AppColors.primary : Colors.white,
          borderRadius: BorderRadius.only(
            topLeft: const Radius.circular(16),
            topRight: const Radius.circular(16),
            bottomLeft: msg.isMine ? const Radius.circular(16) : const Radius.circular(4),
            bottomRight: msg.isMine ? const Radius.circular(4) : const Radius.circular(16),
          ),
          boxShadow: const [BoxShadow(color: Color(0x0A000000), blurRadius: 4, offset: Offset(0, 1))],
        ),
        child: Column(
          crossAxisAlignment: msg.isMine ? CrossAxisAlignment.end : CrossAxisAlignment.start,
          children: [
            Text(msg.text, style: TextStyle(fontSize: 14, color: msg.isMine ? Colors.white : AppColors.textPrimary, height: 1.4)),
            const SizedBox(height: 4),
            Row(
              mainAxisSize: MainAxisSize.min,
              children: [
                Text(msg.time, style: TextStyle(fontSize: 10, color: msg.isMine ? Colors.white60 : AppColors.textMuted)),
                if (msg.isMine) ...[
                  const SizedBox(width: 4),
                  const Icon(Icons.done_all, size: 12, color: Colors.white60),
                ],
              ],
            ),
          ],
        ),
      ),
    );
  }
}
