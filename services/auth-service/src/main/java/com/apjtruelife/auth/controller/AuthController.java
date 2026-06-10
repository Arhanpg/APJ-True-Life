package com.apjtruelife.auth.controller;

import com.apjtruelife.auth.dto.*;
import com.apjtruelife.auth.service.AuthService;
import com.apjtruelife.auth.service.JwtService;
import io.jsonwebtoken.Claims;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
@Slf4j
public class AuthController {

    private final AuthService authService;
    private final JwtService jwtService;

    /**
     * POST /api/v1/auth/verify
     * Accepts Firebase ID token, validates with Firebase Admin SDK,
     * returns custom JWT with role claims.
     */
    @PostMapping("/verify")
    public ResponseEntity<ApiResponse<AuthResponse>> verifyToken(
            @Valid @RequestBody VerifyTokenRequest request) {
        log.info("Token verification request received");
        AuthResponse response = authService.verifyAndLogin(request.getIdToken());
        return ResponseEntity.ok(ApiResponse.ok(response, "Token verified successfully"));
    }

    /**
     * POST /api/v1/auth/register
     * Register a new DOCTOR user (used by admin to onboard doctors).
     */
    @PostMapping("/register")
    public ResponseEntity<ApiResponse<AuthResponse>> registerDoctor(
            @Valid @RequestBody RegisterRequest request) {
        log.info("Doctor registration request for Firebase UID: {}", request.getFirebaseUid());
        AuthResponse response = authService.registerDoctor(request);
        return ResponseEntity.ok(ApiResponse.ok(response, "Doctor registered successfully"));
    }

    /**
     * GET /api/v1/auth/me
     * Returns current user info from JWT.
     */
    @GetMapping("/me")
    public ResponseEntity<ApiResponse<UserDto>> getCurrentUser(
            @RequestHeader(HttpHeaders.AUTHORIZATION) String authHeader) {
        String token = extractToken(authHeader);
        Claims claims = jwtService.validateToken(token);
        String firebaseUid = claims.getSubject();
        UserDto userDto = authService.getUserByFirebaseUid(firebaseUid);
        return ResponseEntity.ok(ApiResponse.ok(userDto, "User info retrieved"));
    }

    /**
     * POST /api/v1/auth/validate
     * Internal endpoint for API Gateway to validate JWT tokens.
     */
    @PostMapping("/validate")
    public ResponseEntity<ApiResponse<UserDto>> validateToken(
            @RequestHeader(HttpHeaders.AUTHORIZATION) String authHeader) {
        String token = extractToken(authHeader);
        Claims claims = jwtService.validateToken(token);
        String firebaseUid = claims.getSubject();
        UserDto userDto = authService.getUserByFirebaseUid(firebaseUid);
        return ResponseEntity.ok(ApiResponse.ok(userDto, "Token valid"));
    }

    private String extractToken(String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            throw new IllegalArgumentException("Invalid Authorization header");
        }
        return authHeader.substring(7);
    }
}
