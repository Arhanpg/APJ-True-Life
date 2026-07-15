package com.apjtruelife.chat;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * APJ TRUE LIFE Chat Service v2.0
 * STOMP WebSocket real-time messaging + REST history + read receipts.
 * Port: 8086
 */
@SpringBootApplication
public class ChatServiceApplication {
    public static void main(String[] args) {
        SpringApplication.run(ChatServiceApplication.class, args);
    }
}
