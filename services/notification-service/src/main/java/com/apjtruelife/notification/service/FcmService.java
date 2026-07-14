package com.apjtruelife.notification.service;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.messaging.*;
import com.apjtruelife.notification.model.DeviceToken;
import com.apjtruelife.notification.repository.DeviceTokenRepository;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.ByteArrayInputStream;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class FcmService {

    private final DeviceTokenRepository deviceTokenRepository;

    @Value("${firebase.service-account-json:#{null}}")
    private String firebaseServiceAccountJson;

    private boolean initialized = false;

    @PostConstruct
    public void init() {
        try {
            if (firebaseServiceAccountJson != null && !firebaseServiceAccountJson.isBlank()
                    && !firebaseServiceAccountJson.startsWith("CI_STUB")) {
                FirebaseOptions options = FirebaseOptions.builder()
                        .setCredentials(GoogleCredentials.fromStream(
                                new ByteArrayInputStream(firebaseServiceAccountJson.getBytes(StandardCharsets.UTF_8))))
                        .build();
                if (FirebaseApp.getApps().isEmpty()) {
                    FirebaseApp.initializeApp(options);
                }
                initialized = true;
                log.info("Firebase Admin SDK initialized for FCM");
            } else {
                log.warn("Firebase service account not configured — FCM disabled");
            }
        } catch (Exception e) {
            log.error("Failed to initialize Firebase for FCM", e);
        }
    }

    /**
     * Send push notification to a specific user (all their devices).
     */
    public void sendToUser(String userId, String title, String body, Map<String, String> data) {
        if (!initialized) {
            log.warn("FCM not initialized, skipping notification to user: {}", userId);
            return;
        }

        List<DeviceToken> tokens = deviceTokenRepository.findByUserIdAndIsActiveTrue(userId);
        if (tokens.isEmpty()) {
            log.info("No active device tokens for user: {}", userId);
            return;
        }

        List<String> fcmTokens = tokens.stream()
                .map(DeviceToken::getFcmToken)
                .collect(Collectors.toList());

        MulticastMessage message = MulticastMessage.builder()
                .setNotification(Notification.builder()
                        .setTitle(title)
                        .setBody(body)
                        .build())
                .putAllData(data != null ? data : Map.of())
                .addAllTokens(fcmTokens)
                .build();

        try {
            BatchResponse response = FirebaseMessaging.getInstance().sendEachForMulticast(message);
            log.info("FCM multicast sent to user {} — success: {}, failure: {}",
                    userId, response.getSuccessCount(), response.getFailureCount());

            // Deactivate invalid tokens
            List<SendResponse> responses = response.getResponses();
            for (int i = 0; i < responses.size(); i++) {
                if (!responses.get(i).isSuccessful()) {
                    String failedToken = fcmTokens.get(i);
                    deviceTokenRepository.findByFcmToken(failedToken)
                            .ifPresent(dt -> {
                                dt.setIsActive(false);
                                deviceTokenRepository.save(dt);
                                log.info("Deactivated invalid FCM token: {}", failedToken);
                            });
                }
            }
        } catch (FirebaseMessagingException e) {
            log.error("FCM send failed for user: {}", userId, e);
        }
    }

    /**
     * Register a device token for push notifications.
     */
    public DeviceToken registerDevice(String userId, String fcmToken, String deviceType) {
        DeviceToken token = deviceTokenRepository.findByFcmToken(fcmToken)
                .map(existing -> {
                    existing.setUserId(userId);
                    existing.setIsActive(true);
                    existing.setDeviceType(deviceType);
                    return existing;
                })
                .orElse(DeviceToken.builder()
                        .userId(userId)
                        .fcmToken(fcmToken)
                        .deviceType(deviceType)
                        .isActive(true)
                        .build());

        return deviceTokenRepository.save(token);
    }
}
