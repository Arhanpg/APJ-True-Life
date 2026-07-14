package com.apjtruelife.auth;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * APJ TRUE LIFE Auth Service — v2.0
 * Handles DOCTOR and ADMIN authentication only.
 * Patient authentication is handled by Firebase Auth (not this service).
 *
 * Features:
 * - Email + password login (bcrypt)
 * - RS256 JWT token generation
 * - Refresh token rotation
 * - Token validation endpoint for api-gateway
 */
@SpringBootApplication
public class AuthServiceApplication {
    public static void main(String[] args) {
        SpringApplication.run(AuthServiceApplication.class, args);
    }
}
