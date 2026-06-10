package com.apjtruelife.auth.dto;

import com.apjtruelife.auth.model.User;
import lombok.Builder;
import lombok.Data;

import java.time.OffsetDateTime;
import java.util.UUID;

@Data
@Builder
public class UserDto {
    private UUID id;
    private String firebaseUid;
    private User.UserRole role;
    private String phoneNumber;
    private String email;
    private Boolean isActive;
    private OffsetDateTime lastLoginAt;
    private OffsetDateTime createdAt;

    public static UserDto fromUser(User user) {
        return UserDto.builder()
                .id(user.getId())
                .firebaseUid(user.getFirebaseUid())
                .role(user.getRole())
                .phoneNumber(user.getPhoneNumber())
                .email(user.getEmail())
                .isActive(user.getIsActive())
                .lastLoginAt(user.getLastLoginAt())
                .createdAt(user.getCreatedAt())
                .build();
    }
}
