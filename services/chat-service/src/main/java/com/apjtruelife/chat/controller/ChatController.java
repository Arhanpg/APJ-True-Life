package com.apjtruelife.chat.controller;

import com.apjtruelife.chat.model.ChatMessage;
import com.apjtruelife.chat.model.ChatSession;
import com.apjtruelife.chat.repository.ChatMessageRepository;
import com.apjtruelife.chat.repository.ChatSessionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequiredArgsConstructor
public class ChatController {

    private final ChatSessionRepository sessionRepository;
    private final ChatMessageRepository messageRepository;

    // REST endpoints for history
    @GetMapping("/api/v1/chat/sessions")
    public ResponseEntity<Map<String, Object>> getSessions(
            @RequestParam(required = false) UUID patientId,
            @RequestParam(required = false) UUID doctorId) {
        List<ChatSession> sessions;
        if (patientId != null) {
            sessions = sessionRepository.findByPatientIdAndIsActiveTrue(patientId);
        } else if (doctorId != null) {
            sessions = sessionRepository.findByDoctorIdAndIsActiveTrue(doctorId);
        } else {
            sessions = sessionRepository.findAll();
        }
        return ResponseEntity.ok(Map.of("success", true, "data", sessions));
    }

    @PostMapping("/api/v1/chat/sessions")
    public ResponseEntity<Map<String, Object>> createSession(@RequestBody ChatSession session) {
        session = sessionRepository.save(session);
        return ResponseEntity.ok(Map.of("success", true, "data", session));
    }

    @GetMapping("/api/v1/chat/sessions/{sessionId}/messages")
    public ResponseEntity<Map<String, Object>> getMessages(
            @PathVariable UUID sessionId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "50") int size) {
        Page<ChatMessage> messages = messageRepository.findBySessionIdOrderByCreatedAtDesc(sessionId, PageRequest.of(page, size));
        Map<String, Object> response = new HashMap<>();
        response.put("messages", messages.getContent());
        response.put("totalElements", messages.getTotalElements());
        response.put("totalPages", messages.getTotalPages());
        return ResponseEntity.ok(Map.of("success", true, "data", response));
    }

    @PostMapping("/api/v1/chat/sessions/{sessionId}/read")
    public ResponseEntity<Map<String, Object>> markAsRead(
            @PathVariable UUID sessionId,
            @RequestParam UUID userId) {
        messageRepository.markAsRead(sessionId, userId);
        return ResponseEntity.ok(Map.of("success", true, "message", "Messages marked as read"));
    }

    // STOMP WebSocket endpoint for real-time messaging
    @MessageMapping("/chat/{sessionId}")
    @SendTo("/topic/chat/{sessionId}")
    public ChatMessage handleMessage(@DestinationVariable UUID sessionId, ChatMessage message) {
        message.setSessionId(sessionId);
        message = messageRepository.save(message);
        return message;
    }
}
