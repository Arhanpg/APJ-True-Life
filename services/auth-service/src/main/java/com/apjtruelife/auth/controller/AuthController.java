package com.apjtruelife.auth.controller;

import com.apjtruelife.auth.dto.*;
import com.apjtruelife.auth.service.AuthService;
import com.apjtruelife.auth.service.JwtService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

/**
 * Auth Controller v2 — Doctor/Admin authentication.
 * Endpoints:
 *   POST /api/auth/login     — Email + password login
 *   POST /api/auth/refresh   — Refresh access token
 *   POST /api/auth/logout    — Revoke all refresh tokens
 *   POST /api/auth/register  — Register new doctor (admin only)
 *   POST /api/auth/validate  — Internal: validate JWT for api-gateway
 */
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@Slf4j
public class AuthController {

    private final AuthService authService;
    private final JwtService jwtService;

    /**
     * POST /api/auth/login
     * Doctor/Admin login with email + password.
     * Returns RS256 JWT access token + refresh token.
     */
    @PostMapping("/login")
    public ResponseEntity<ApiResponse<AuthResponse>> login(
            @Valid @RequestBody LoginRequest request) {
        log.info("Login attempt for: {}", request.getEmail());
        AuthResponse response = authService.login(request);
        return ResponseEntity.ok(ApiResponse.ok(response, "Login successful"));
    }

    /**
     * POST /api/auth/refresh
     * Refresh access token using refresh token (rotation).
     */
    @PostMapping("/refresh")
    public ResponseEntity<ApiResponse<AuthResponse>> refresh(
            @Valid @RequestBody RefreshRequest request) {
        AuthResponse response = authService.refresh(request.getRefreshToken());
        return ResponseEntity.ok(ApiResponse.ok(response, "Token refreshed"));
    }

    /**
     * POST /api/auth/logout
     * Revoke all refresh tokens for the authenticated doctor.
     */
    @PostMapping("/logout")
    public ResponseEntity<ApiResponse<Void>> logout(
            @RequestHeader("Authorization") String authHeader) {
        String token = extractToken(authHeader);
        UUID doctorId = jwtService.extractDoctorId(token);
        authService.logout(doctorId);
        return ResponseEntity.ok(ApiResponse.ok(null, "Logged out successfully"));
    }

    /**
     * POST /api/auth/register
     * Register a new doctor or admin (admin-only operation).
     */
    @PostMapping("/register")
    public ResponseEntity<ApiResponse<DoctorDto>> register(
            @Valid @RequestBody RegisterDoctorRequest request) {
        log.info("Doctor registration request for: {}", request.getEmail());
        DoctorDto doctor = authService.registerDoctor(request);
        return ResponseEntity.ok(ApiResponse.ok(doctor, "Doctor registered successfully"));
    }

    /**
     * POST /api/auth/validate
     * Internal endpoint for api-gateway to validate JWT tokens.
     */
    @PostMapping("/validate")
    public ResponseEntity<ApiResponse<DoctorDto>> validate(
            @RequestHeader("Authorization") String authHeader) {
        String token = extractToken(authHeader);
        var claims = jwtService.validateToken(token);
        UUID doctorId = UUID.fromString(claims.getSubject());
        String role = claims.get("role", String.class);
        String name = claims.get("name", String.class);
        String email = claims.get("email", String.class);

        DoctorDto dto = DoctorDto.builder()
                .id(doctorId)
                .role(role)
                .name(name)
                .email(email)
                .build();

        return ResponseEntity.ok(ApiResponse.ok(dto, "Token valid"));
    }

    private String extractToken(String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            throw new IllegalArgumentException("Invalid Authorization header");
        }
        return authHeader.substring(7);
    }
}
