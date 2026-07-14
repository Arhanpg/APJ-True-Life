package com.apjtruelife.notification.controller;

import com.apjtruelife.notification.model.DeviceToken;
import com.apjtruelife.notification.service.FcmService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/notifications")
@RequiredArgsConstructor
public class NotificationController {

    private final FcmService fcmService;

    @PostMapping("/register-device")
    public ResponseEntity<Map<String, Object>> registerDevice(@RequestBody Map<String, String> body) {
        String userId = body.get("userId");
        String fcmToken = body.get("fcmToken");
        String deviceType = body.getOrDefault("deviceType", "android");
        DeviceToken token = fcmService.registerDevice(userId, fcmToken, deviceType);
        return ResponseEntity.ok(Map.of("success", true, "data", Map.of("id", token.getId())));
    }

    @PostMapping("/send")
    public ResponseEntity<Map<String, Object>> send(@RequestBody Map<String, String> body) {
        String userId = body.get("userId");
        String title = body.get("title");
        String message = body.get("body");
        fcmService.sendToUser(userId, title, message, null);
        return ResponseEntity.ok(Map.of("success", true, "message", "Notification sent"));
    }
}
