import 'package:flutter/material.dart';
import '../../../core/theme/app_colors.dart';

class ChatScreen extends StatefulWidget {
  const ChatScreen({super.key});
  @override
  State<ChatScreen> createState() => _ChatScreenState();
}

class _ChatScreenState extends State<ChatScreen> {
  final TextEditingController _msg = TextEditingController();
  final ScrollController _scroll = ScrollController();
  final List<_Message> _messages = [
    _Message(text: 'Good morning! How are you feeling after yesterday\'s Nasya session?', isDoctor: true, time: '09:15 AM'),
    _Message(text: 'Good morning Doctor! I feel much better. The nasal heaviness is reduced.', isDoctor: false, time: '09:22 AM'),
    _Message(text: 'That is a good sign. Please make sure to avoid cold foods and drinks today. Continue the Triphala at night.', isDoctor: true, time: '09:25 AM'),
    _Message(text: 'Understood, Doctor. Will do. Should I do the oil massage myself?', isDoctor: false, time: '09:30 AM'),
    _Message(text: 'Yes, gentle Abhyanga on the forehead and neck twice daily. I have uploaded the technique guide in your treatment documents.', isDoctor: true, time: '09:33 AM'),
  ];

  void _send() {
    final text = _msg.text.trim();
    if (text.isEmpty) return;
    setState(() {
      _messages.add(_Message(text: text, isDoctor: false, time: 'Now'));
      _msg.clear();
    });
    Future.delayed(const Duration(milliseconds: 100), () {
      _scroll.animateTo(_scroll.position.maxScrollExtent, duration: const Duration(milliseconds: 300), curve: Curves.easeOut);
    });
  }

  @override
  void dispose() { _msg.dispose(); _scroll.dispose(); super.dispose(); }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        title: Row(
          children: [
            CircleAvatar(radius: 18, backgroundColor: AppColors.primary, child: const Text('AJ', style: TextStyle(color: Colors.white, fontSize: 11, fontWeight: FontWeight.w700))),
            const SizedBox(width: 10),
            const Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text('Dr. APJ Sharma', style: TextStyle(fontSize: 15, fontWeight: FontWeight.w700, color: AppColors.onSurface)),
                Text('Chief Vaidya · Online', style: TextStyle(fontSize: 11, color: AppColors.primary)),
              ],
            ),
          ],
        ),
        backgroundColor: AppColors.surface,
        elevation: 0,
        bottom: PreferredSize(
          preferredSize: const Size.fromHeight(40),
          child: Container(
            margin: const EdgeInsets.fromLTRB(12, 0, 12, 8),
            padding: const EdgeInsets.all(8),
            decoration: BoxDecoration(
              color: const Color(0xFFFFF8E1),
              borderRadius: BorderRadius.circular(10),
              border: Border.all(color: const Color(0xFFFFCA28)),
            ),
            child: const Row(
              children: [
                Icon(Icons.info_outline, color: Color(0xFFF57F17), size: 14),
                SizedBox(width: 6),
                Expanded(child: Text('Chat messages will be deleted when treatment is completed.', style: TextStyle(fontSize: 11, color: Color(0xFFF57F17)))),
              ],
            ),
          ),
        ),
      ),
      body: Column(
        children: [
          Expanded(
            child: ListView.builder(
              controller: _scroll,
              padding: const EdgeInsets.fromLTRB(12, 12, 12, 8),
              itemCount: _messages.length,
              itemBuilder: (_, i) => _MessageBubble(msg: _messages[i]),
            ),
          ),
          Container(
            padding: const EdgeInsets.fromLTRB(12, 8, 12, 12),
            decoration: const BoxDecoration(
              color: AppColors.surface,
              border: Border(top: BorderSide(color: AppColors.surfaceTint)),
            ),
            child: SafeArea(
              child: Row(
                children: [
                  IconButton(
                    icon: const Icon(Icons.attach_file, color: AppColors.outline),
                    onPressed: () {},
                  ),
                  Expanded(
                    child: TextField(
                      controller: _msg,
                      decoration: InputDecoration(
                        hintText: 'Type a message...',
                        hintStyle: const TextStyle(color: AppColors.outline),
                        filled: true, fillColor: AppColors.background,
                        border: OutlineInputBorder(borderRadius: BorderRadius.circular(24), borderSide: BorderSide.none),
                        contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
                      ),
                      onSubmitted: (_) => _send(),
                    ),
                  ),
                  const SizedBox(width: 8),
                  GestureDetector(
                    onTap: _send,
                    child: Container(
                      width: 44, height: 44,
                      decoration: const BoxDecoration(color: AppColors.primary, shape: BoxShape.circle),
                      child: const Icon(Icons.send, color: Colors.white, size: 20),
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
  final bool isDoctor;
  final String time;
  _Message({required this.text, required this.isDoctor, required this.time});
}

class _MessageBubble extends StatelessWidget {
  final _Message msg;
  const _MessageBubble({required this.msg});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 10),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.end,
        mainAxisAlignment: msg.isDoctor ? MainAxisAlignment.start : MainAxisAlignment.end,
        children: [
          if (msg.isDoctor)
            Padding(
              padding: const EdgeInsets.only(right: 8),
              child: CircleAvatar(radius: 16, backgroundColor: AppColors.primary, child: const Text('AJ', style: TextStyle(color: Colors.white, fontSize: 9, fontWeight: FontWeight.w700))),
            ),
          Flexible(
            child: Column(
              crossAxisAlignment: msg.isDoctor ? CrossAxisAlignment.start : CrossAxisAlignment.end,
              children: [
                Container(
                  constraints: BoxConstraints(maxWidth: MediaQuery.of(context).size.width * 0.72),
                  padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
                  decoration: BoxDecoration(
                    color: msg.isDoctor ? AppColors.surface : AppColors.primary,
                    borderRadius: BorderRadius.only(
                      topLeft: const Radius.circular(16),
                      topRight: const Radius.circular(16),
                      bottomLeft: Radius.circular(msg.isDoctor ? 4 : 16),
                      bottomRight: Radius.circular(msg.isDoctor ? 16 : 4),
                    ),
                    border: msg.isDoctor ? Border.all(color: AppColors.outlineVariant) : null,
                  ),
                  child: Text(msg.text, style: TextStyle(fontSize: 14, color: msg.isDoctor ? AppColors.onSurface : Colors.white, height: 1.4)),
                ),
                const SizedBox(height: 3),
                Row(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    Text(msg.time, style: const TextStyle(fontSize: 10, color: AppColors.outline)),
                    if (!msg.isDoctor) ...[
                      const SizedBox(width: 4),
                      const Icon(Icons.done_all, size: 14, color: AppColors.primary),
                    ],
                  ],
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
