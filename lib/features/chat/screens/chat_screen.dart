import 'package:flutter/material.dart';
import '../../../core/theme/app_colors.dart';

class ChatScreen extends StatefulWidget {
  const ChatScreen({super.key});

  @override
  State<ChatScreen> createState() => _ChatScreenState();
}

class _ChatScreenState extends State<ChatScreen> {
  final _messageController = TextEditingController();

  @override
  void dispose() {
    _messageController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        title: Text('Chat', style: Theme.of(context).textTheme.headlineLarge),
        backgroundColor: AppColors.surface,
        automaticallyImplyLeading: false,
        bottom: PreferredSize(
          preferredSize: const Size.fromHeight(40),
          child: Container(
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
            color: const Color(0xFFFFF8E1),
            child: Row(
              children: [
                const Icon(Icons.warning_amber_outlined, size: 16, color: Color(0xFFF59E0B)),
                const SizedBox(width: 8),
                Expanded(
                  child: Text(
                    'Chat messages are deleted when treatment is completed.',
                    style: TextStyle(fontSize: 12, color: Colors.orange.shade800),
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
      body: Column(
        children: [
          Expanded(
            child: Center(
              child: Padding(
                padding: const EdgeInsets.all(24),
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Icon(Icons.chat_bubble_outline, size: 64, color: AppColors.primary.withOpacity(0.4)),
                    const SizedBox(height: 20),
                    Text('No active chat', style: Theme.of(context).textTheme.headlineLarge, textAlign: TextAlign.center),
                    const SizedBox(height: 12),
                    Text('Chat will be available once your doctor activates a treatment plan.',
                      style: Theme.of(context).textTheme.bodyMedium, textAlign: TextAlign.center),
                  ],
                ),
              ),
            ),
          ),
          // Chat input
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
            color: AppColors.surface,
            child: SafeArea(
              child: Row(
                children: [
                  IconButton(icon: const Icon(Icons.attach_file, color: AppColors.textHint), onPressed: () {}),
                  Expanded(
                    child: TextField(
                      controller: _messageController,
                      decoration: const InputDecoration(
                        hintText: 'Type a message...',
                        contentPadding: EdgeInsets.symmetric(horizontal: 16, vertical: 12),
                      ),
                      maxLines: null,
                    ),
                  ),
                  const SizedBox(width: 8),
                  CircleAvatar(
                    backgroundColor: AppColors.primary,
                    child: IconButton(
                      icon: const Icon(Icons.send, color: Colors.white, size: 18),
                      onPressed: () {},
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
