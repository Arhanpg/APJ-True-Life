import 'package:flutter/material.dart';
import '../../../core/theme/app_theme.dart';

class ChatScreen extends StatefulWidget {
  const ChatScreen({super.key});
  @override
  State<ChatScreen> createState() => _ChatScreenState();
}

class _ChatScreenState extends State<ChatScreen> {
  final _messageController = TextEditingController();
  final _scrollController = ScrollController();
  final List<_Message> _messages = [];

  @override
  void dispose() { _messageController.dispose(); _scrollController.dispose(); super.dispose(); }

  void _sendMessage() {
    final text = _messageController.text.trim();
    if (text.isEmpty) return;
    setState(() { _messages.add(_Message(text: text, isPatient: true, time: TimeOfDay.now())); });
    _messageController.clear();
    Future.delayed(const Duration(milliseconds: 100), () { if (_scrollController.hasClients) _scrollController.animateTo(_scrollController.position.maxScrollExtent, duration: const Duration(milliseconds: 200), curve: Curves.easeOut); });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        title: const Row(
          children: [
            CircleAvatar(radius: 16, backgroundColor: AppColors.accentGold, child: Text('DR', style: TextStyle(color: AppColors.primaryDark, fontSize: 10, fontWeight: FontWeight.bold))),
            SizedBox(width: 10),
            Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text('Dr. APJ Sharma', style: TextStyle(fontSize: 15, fontWeight: FontWeight.bold)),
                Text('Treatment Chat', style: TextStyle(fontSize: 11, color: Color(0xCCFFFFFF))),
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
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
            color: const Color(0xFFFFF8E1),
            child: const Row(
              children: [
                Icon(Icons.warning_amber_rounded, color: Color(0xFFB8860B), size: 16),
                SizedBox(width: 8),
                Expanded(child: Text('Chat messages will be deleted when your treatment is completed.', style: TextStyle(fontSize: 12, color: Color(0xFF7A5E00)))),
              ],
            ),
          ),
          // Messages
          Expanded(
            child: _messages.isEmpty
                ? const Center(
                    child: Column(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        Icon(Icons.chat_bubble_outline, size: 52, color: AppColors.outlineVariant),
                        SizedBox(height: 12),
                        Text('No messages yet', style: TextStyle(fontWeight: FontWeight.w600, color: AppColors.onSurfaceVariant)),
                        SizedBox(height: 4),
                        Text('Send a message to your doctor', style: TextStyle(fontSize: 13, color: AppColors.outline)),
                      ],
                    ),
                  )
                : ListView.builder(
                    controller: _scrollController,
                    padding: const EdgeInsets.all(16),
                    itemCount: _messages.length,
                    itemBuilder: (_, i) => _MessageBubble(message: _messages[i]),
                  ),
          ),
          // Input bar
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 10),
            decoration: BoxDecoration(color: AppColors.surface, border: Border(top: BorderSide(color: AppColors.outlineVariant))),
            child: Row(
              children: [
                IconButton(icon: const Icon(Icons.attach_file, color: AppColors.outline), onPressed: () {}),
                Expanded(
                  child: TextField(
                    controller: _messageController,
                    maxLines: null,
                    textInputAction: TextInputAction.send,
                    onSubmitted: (_) => _sendMessage(),
                    decoration: InputDecoration(
                      hintText: 'Type a message...',
                      hintStyle: const TextStyle(color: AppColors.outline),
                      border: OutlineInputBorder(borderRadius: BorderRadius.circular(24), borderSide: const BorderSide(color: AppColors.outlineVariant)),
                      contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
                      isDense: true,
                    ),
                  ),
                ),
                const SizedBox(width: 8),
                GestureDetector(
                  onTap: _sendMessage,
                  child: Container(
                    width: 40, height: 40,
                    decoration: const BoxDecoration(color: AppColors.primary, shape: BoxShape.circle),
                    child: const Icon(Icons.send, color: Colors.white, size: 18),
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
  final bool isPatient;
  final TimeOfDay time;
  const _Message({required this.text, required this.isPatient, required this.time});
}

class _MessageBubble extends StatelessWidget {
  final _Message message;
  const _MessageBubble({required this.message});
  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 8),
      child: Row(
        mainAxisAlignment: message.isPatient ? MainAxisAlignment.end : MainAxisAlignment.start,
        children: [
          if (!message.isPatient) ...[const CircleAvatar(radius: 14, backgroundColor: AppColors.primary, child: Text('DR', style: TextStyle(color: Colors.white, fontSize: 9, fontWeight: FontWeight.bold))), const SizedBox(width: 8)],
          Container(
            constraints: BoxConstraints(maxWidth: MediaQuery.of(context).size.width * 0.68),
            padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
            decoration: BoxDecoration(
              color: message.isPatient ? AppColors.primary : AppColors.surface,
              borderRadius: BorderRadius.only(
                topLeft: const Radius.circular(16),
                topRight: const Radius.circular(16),
                bottomLeft: Radius.circular(message.isPatient ? 16 : 4),
                bottomRight: Radius.circular(message.isPatient ? 4 : 16),
              ),
              border: message.isPatient ? null : Border.all(color: AppColors.outlineVariant),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.end,
              children: [
                Text(message.text, style: TextStyle(fontSize: 14, color: message.isPatient ? Colors.white : AppColors.onSurface)),
                const SizedBox(height: 4),
                Text('${message.time.hour.toString().padLeft(2, '0')}:${message.time.minute.toString().padLeft(2, '0')}', style: TextStyle(fontSize: 10, color: message.isPatient ? Colors.white60 : AppColors.outline)),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
