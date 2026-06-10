package com.apjtruelife.auth.dto;

import com.apjtruelife.auth.model.User;
import lombok.Builder;
import lombok.Data;

import java.util.UUID;

@Data
@Builder
public class AuthResponse {
    private boolean success;
    private String jwt;
    private UUID userId;
    private String firebaseUid;
    private User.UserRole role;
    private boolean isNewUser;
    private String message;
}
