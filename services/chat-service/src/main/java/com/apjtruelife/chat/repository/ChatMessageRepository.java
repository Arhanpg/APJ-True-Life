package com.apjtruelife.chat.repository;

import com.apjtruelife.chat.model.ChatMessage;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface ChatMessageRepository extends JpaRepository<ChatMessage, UUID> {
    Page<ChatMessage> findBySessionIdOrderByCreatedAtDesc(UUID sessionId, Pageable pageable);

    @Query("SELECT COUNT(m) FROM ChatMessage m WHERE m.sessionId = :sessionId AND m.isRead = false AND m.senderId != :currentUserId")
    long countUnreadMessages(UUID sessionId, UUID currentUserId);

    @Modifying
    @Query("UPDATE ChatMessage m SET m.isRead = true, m.readAt = CURRENT_TIMESTAMP WHERE m.sessionId = :sessionId AND m.senderId != :readByUserId AND m.isRead = false")
    void markAsRead(UUID sessionId, UUID readByUserId);
}
