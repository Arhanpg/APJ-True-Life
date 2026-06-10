import 'package:flutter/material.dart';
import '../../../core/theme/app_colors.dart';

class ChatScreen extends StatefulWidget {
  const ChatScreen({super.key});
  @override
  State<ChatScreen> createState() => _ChatScreenState();
}

class _ChatScreenState extends State<ChatScreen> {
  final TextEditingController _msgCtrl = TextEditingController();
  final ScrollController _scrollCtrl = ScrollController();
  final List<_Message> _messages = [
    _Message(text: 'Hello! How are you feeling today after the morning Nasya session?', isDoctor: true, time: '9:01 AM'),
    _Message(text: 'Good morning Doctor! I feel much better. The nasal congestion has reduced significantly.', isDoctor: false, time: '9:04 AM'),
    _Message(text: 'Excellent! Please continue the Anu Thailam as prescribed — 2 drops each nostril after the steam. Avoid cold water today.', isDoctor: true, time: '9:06 AM'),
    _Message(text: 'Understood. Can I have warm ginger tea in the afternoon?', isDoctor: false, time: '9:10 AM'),
    _Message(text: 'Yes, ginger tea is perfectly fine and actually recommended. It helps with the detox process.', isDoctor: true, time: '9:12 AM'),
  ];

  void _sendMessage() {
    final text = _msgCtrl.text.trim();
    if (text.isEmpty) return;
    setState(() {
      _messages.add(_Message(text: text, isDoctor: false, time: 'Now'));
      _msgCtrl.clear();
    });
    Future.delayed(const Duration(milliseconds: 100), () {
      _scrollCtrl.animateTo(_scrollCtrl.position.maxScrollExtent, duration: const Duration(milliseconds: 300), curve: Curves.easeOut);
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        backgroundColor: AppColors.surface,
        title: Row(
          children: [
            CircleAvatar(radius: 18, backgroundColor: AppColors.surfaceTint,
              child: const Text('DS', style: TextStyle(fontWeight: FontWeight.w700, color: AppColors.primary, fontSize: 12))),
            const SizedBox(width: 10),
            const Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text('Dr. APJ Sharma', style: TextStyle(fontSize: 15, fontWeight: FontWeight.w700, color: AppColors.onSurface)),
                Text('Nasya Course Chat', style: TextStyle(fontSize: 12, color: AppColors.onSurfaceVariant)),
              ],
            ),
          ],
        ),
        actions: [IconButton(icon: const Icon(Icons.info_outline, color: AppColors.primary), onPressed: () {})],
      ),
      body: Column(
        children: [
          // Warning banner
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
            color: const Color(0xFFFFF8E1),
            child: const Row(
              children: [
                Icon(Icons.warning_amber_outlined, size: 16, color: AppColors.accentGold),
                SizedBox(width: 6),
                Expanded(child: Text('Chat messages will be deleted when treatment is completed.', style: TextStyle(fontSize: 12, color: Color(0xFF7A5C00)))),
              ],
            ),
          ),
          // Messages
          Expanded(
            child: ListView.builder(
              controller: _scrollCtrl,
              padding: const EdgeInsets.all(16),
              itemCount: _messages.length,
              itemBuilder: (_, i) => _MessageBubble(message: _messages[i]),
            ),
          ),
          // Input
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
            decoration: BoxDecoration(
              color: AppColors.surface,
              boxShadow: [BoxShadow(color: Colors.black.withOpacity(0.06), blurRadius: 8, offset: const Offset(0, -2))],
            ),
            child: Row(
              children: [
                IconButton(icon: const Icon(Icons.attach_file_outlined, color: AppColors.outline), onPressed: () {}),
                Expanded(
                  child: TextField(
                    controller: _msgCtrl,
                    maxLines: null,
                    decoration: InputDecoration(
                      hintText: 'Type a message...',
                      filled: true, fillColor: AppColors.background,
                      border: OutlineInputBorder(borderRadius: BorderRadius.circular(24), borderSide: BorderSide.none),
                      contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
                    ),
                  ),
                ),
                const SizedBox(width: 4),
                GestureDetector(
                  onTap: _sendMessage,
                  child: Container(
                    width: 44, height: 44,
                    decoration: const BoxDecoration(color: AppColors.primary, shape: BoxShape.circle),
                    child: const Icon(Icons.send_rounded, color: Colors.white, size: 20),
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

class _Message {
  final String text;
  final bool isDoctor;
  final String time;
  const _Message({required this.text, required this.isDoctor, required this.time});
}

class _MessageBubble extends StatelessWidget {
  final _Message message;
  const _MessageBubble({required this.message});

  @override
  Widget build(BuildContext context) {
    return Align(
      alignment: message.isDoctor ? Alignment.centerLeft : Alignment.centerRight,
      child: Container(
        constraints: BoxConstraints(maxWidth: MediaQuery.of(context).size.width * 0.75),
        margin: EdgeInsets.only(
          left: message.isDoctor ? 0 : 40,
          right: message.isDoctor ? 40 : 0,
          bottom: 8,
        ),
        child: Column(
          crossAxisAlignment: message.isDoctor ? CrossAxisAlignment.start : CrossAxisAlignment.end,
          children: [
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
              decoration: BoxDecoration(
                color: message.isDoctor ? AppColors.surface : AppColors.primary,
                borderRadius: BorderRadius.only(
                  topLeft: const Radius.circular(16),
                  topRight: const Radius.circular(16),
                  bottomLeft: message.isDoctor ? Radius.zero : const Radius.circular(16),
                  bottomRight: message.isDoctor ? const Radius.circular(16) : Radius.zero,
                ),
                border: message.isDoctor ? Border.all(color: const Color(0xFFD4E8D8), width: 1.5) : null,
              ),
              child: Text(message.text,
                style: TextStyle(fontSize: 14, color: message.isDoctor ? AppColors.onSurface : Colors.white, height: 1.5)),
            ),
            const SizedBox(height: 3),
            Row(
              mainAxisSize: MainAxisSize.min,
              children: [
                Text(message.time, style: const TextStyle(fontSize: 11, color: AppColors.outline)),
                if (!message.isDoctor) ...[const SizedBox(width: 4), const Icon(Icons.done_all, size: 14, color: AppColors.primary)],
              ],
            ),
          ],
        ),
      ),
    );
  }
}
