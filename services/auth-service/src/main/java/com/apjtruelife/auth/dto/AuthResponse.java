package com.apjtruelife.auth.dto;

import lombok.*;

import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AuthResponse {
    private String accessToken;
    private String refreshToken;
    private UUID doctorId;
    private String role;
    private String name;
    private String email;
}
