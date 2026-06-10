import 'package:flutter/material.dart';
import '../../../../core/theme/app_colors.dart';

class ChatScreen extends StatefulWidget {
  const ChatScreen({super.key});
  @override
  State<ChatScreen> createState() => _ChatScreenState();
}

class _ChatScreenState extends State<ChatScreen> {
  final _messageCtrl = TextEditingController();
  final List<Map<String, dynamic>> _messages = [];

  @override
  void dispose() {
    _messageCtrl.dispose();
    super.dispose();
  }

  void _sendMessage() {
    final text = _messageCtrl.text.trim();
    if (text.isEmpty) return;
    setState(() {
      _messages.add({'text': text, 'isPatient': true, 'time': TimeOfDay.now().format(context)});
      _messageCtrl.clear();
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        title: const Text('Chat with Doctor'),
        backgroundColor: AppColors.primary,
        actions: [
          IconButton(icon: const Icon(Icons.videocam_outlined, color: Colors.white), onPressed: () {}),
        ],
      ),
      body: Column(
        children: [
          // Warning banner
          Container(
            width: double.infinity,
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
            color: const Color(0xFFFFFBEB),
            child: const Row(
              children: [
                Text('\u26a0\ufe0f', style: TextStyle(fontSize: 14)),
                SizedBox(width: 8),
                Expanded(
                  child: Text(
                    'Chat messages will be deleted when treatment is completed.',
                    style: TextStyle(fontFamily: 'DMSans', fontSize: 12, color: Color(0xFF92400E)),
                  ),
                ),
              ],
            ),
          ),
          // Messages
          Expanded(
            child: _messages.isEmpty
                ? const Center(
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Text('\ud83d\udcac', style: TextStyle(fontSize: 48)),
                        SizedBox(height: 16),
                        Text('No messages yet',
                          style: TextStyle(fontFamily: 'PlayfairDisplay', fontSize: 18,
                              fontWeight: FontWeight.bold, color: AppColors.primaryDark)),
                        SizedBox(height: 8),
                        Text('Start a conversation with your doctor',
                          style: TextStyle(fontFamily: 'DMSans', fontSize: 13, color: AppColors.onSurfaceVariant)),
                      ],
                    ),
                  )
                : ListView.builder(
                    padding: const EdgeInsets.all(16),
                    itemCount: _messages.length,
                    itemBuilder: (context, i) {
                      final msg = _messages[i];
                      final isPatient = msg['isPatient'] as bool;
                      return Align(
                        alignment: isPatient ? Alignment.centerRight : Alignment.centerLeft,
                        child: Container(
                          margin: const EdgeInsets.only(bottom: 8),
                          padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
                          constraints: BoxConstraints(maxWidth: MediaQuery.of(context).size.width * 0.72),
                          decoration: BoxDecoration(
                            color: isPatient ? AppColors.patientBubble : AppColors.doctorBubble,
                            borderRadius: BorderRadius.only(
                              topLeft: const Radius.circular(16),
                              topRight: const Radius.circular(16),
                              bottomLeft: Radius.circular(isPatient ? 16 : 4),
                              bottomRight: Radius.circular(isPatient ? 4 : 16),
                            ),
                          ),
                          child: Text(msg['text'],
                            style: TextStyle(
                              fontFamily: 'DMSans', fontSize: 14,
                              color: isPatient ? Colors.white : AppColors.onSurface,
                            )),
                        ),
                      );
                    },
                  ),
          ),
          // Input
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
            decoration: BoxDecoration(
              color: Colors.white,
              boxShadow: [BoxShadow(color: Colors.black.withOpacity(0.05), blurRadius: 8, offset: const Offset(0, -2))],
            ),
            child: Row(
              children: [
                IconButton(icon: const Icon(Icons.attach_file, color: AppColors.onSurfaceVariant), onPressed: () {}),
                Expanded(
                  child: TextField(
                    controller: _messageCtrl,
                    decoration: InputDecoration(
                      hintText: 'Type a message...',
                      filled: true, fillColor: AppColors.background,
                      border: OutlineInputBorder(borderRadius: BorderRadius.circular(24), borderSide: BorderSide.none),
                      contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
                    ),
                    onSubmitted: (_) => _sendMessage(),
                  ),
                ),
                const SizedBox(width: 8),
                GestureDetector(
                  onTap: _sendMessage,
                  child: Container(
                    width: 44, height: 44,
                    decoration: const BoxDecoration(color: AppColors.primary, shape: BoxShape.circle),
                    child: const Icon(Icons.send, color: Colors.white, size: 20),
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
