package com.apjtruelife.notification;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * APJ TRUE LIFE Notification Service v2.0
 * FCM Push Notifications via Firebase Admin SDK.
 * FIREBASE_SERVICE_ACCOUNT_JSON lives ONLY in this service (and api-gateway).
 */
@SpringBootApplication
public class NotificationServiceApplication {
    public static void main(String[] args) {
        SpringApplication.run(NotificationServiceApplication.class, args);
    }
}
