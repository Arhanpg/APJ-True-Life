package com.apjtruelife.auth.service;

import com.apjtruelife.auth.dto.*;
import com.apjtruelife.auth.model.Doctor;
import com.apjtruelife.auth.model.RefreshToken;
import com.apjtruelife.auth.repository.DoctorRepository;
import com.apjtruelife.auth.repository.RefreshTokenRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.MessageDigest;
import java.time.OffsetDateTime;
import java.util.Base64;
import java.util.UUID;

/**
 * Auth service v2 — Doctor/Admin authentication only.
 * Patients use Firebase Auth directly (not this service).
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class AuthService {

    private final DoctorRepository doctorRepository;
    private final RefreshTokenRepository refreshTokenRepository;
    private final JwtService jwtService;
    private final BCryptPasswordEncoder passwordEncoder;

    @Value("${jwt.refresh-token-expiry-days:7}")
    private int refreshTokenExpiryDays;

    /**
     * Doctor login — validates email + password, returns JWT + refresh token.
     */
    @Transactional
    public AuthResponse login(LoginRequest request) {
        Doctor doctor = doctorRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("Invalid email or password"));

        if (!doctor.getIsActive()) {
            throw new IllegalStateException("Account is deactivated");
        }

        if (!passwordEncoder.matches(request.getPassword(), doctor.getPasswordHash())) {
            throw new IllegalArgumentException("Invalid email or password");
        }

        // Update last login
        doctorRepository.updateLastLogin(doctor.getId(), OffsetDateTime.now());

        String accessToken = jwtService.generateAccessToken(doctor);
        String refreshToken = generateRefreshToken(doctor.getId());

        log.info("Doctor login successful: {} (role: {})", doctor.getEmail(), doctor.getRole());

        return AuthResponse.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .doctorId(doctor.getId())
                .role(doctor.getRole().name().toLowerCase())
                .name(doctor.getName())
                .email(doctor.getEmail())
                .build();
    }

    /**
     * Refresh access token using refresh token.
     * Implements rotation: old refresh token is revoked, new one issued.
     */
    @Transactional
    public AuthResponse refresh(String refreshTokenValue) {
        String tokenHash = hashToken(refreshTokenValue);
        RefreshToken storedToken = refreshTokenRepository.findByTokenHash(tokenHash)
                .orElseThrow(() -> new IllegalArgumentException("Invalid refresh token"));

        if (!storedToken.isValid()) {
            // Possible token reuse attack — revoke all tokens for this doctor
            refreshTokenRepository.revokeAllByDoctorId(storedToken.getDoctorId());
            throw new IllegalArgumentException("Refresh token expired or revoked");
        }

        // Revoke old token
        storedToken.setIsRevoked(true);
        storedToken.setRevokedAt(OffsetDateTime.now());
        refreshTokenRepository.save(storedToken);

        // Issue new tokens
        Doctor doctor = doctorRepository.findById(storedToken.getDoctorId())
                .orElseThrow(() -> new IllegalArgumentException("Doctor not found"));

        if (!doctor.getIsActive()) {
            throw new IllegalStateException("Account is deactivated");
        }

        String accessToken = jwtService.generateAccessToken(doctor);
        String newRefreshToken = generateRefreshToken(doctor.getId());

        return AuthResponse.builder()
                .accessToken(accessToken)
                .refreshToken(newRefreshToken)
                .doctorId(doctor.getId())
                .role(doctor.getRole().name().toLowerCase())
                .name(doctor.getName())
                .email(doctor.getEmail())
                .build();
    }

    /**
     * Logout — revoke all refresh tokens for the doctor.
     */
    @Transactional
    public void logout(UUID doctorId) {
        refreshTokenRepository.revokeAllByDoctorId(doctorId);
        log.info("All refresh tokens revoked for doctor: {}", doctorId);
    }

    /**
     * Register a new doctor (admin-only operation).
     */
    @Transactional
    public DoctorDto registerDoctor(RegisterDoctorRequest request) {
        if (doctorRepository.existsByEmail(request.getEmail())) {
            throw new IllegalArgumentException("Email already registered");
        }

        Doctor doctor = Doctor.builder()
                .email(request.getEmail())
                .name(request.getName())
                .passwordHash(passwordEncoder.encode(request.getPassword()))
                .role(Doctor.DoctorRole.valueOf(request.getRole().toUpperCase()))
                .isActive(true)
                .build();

        doctor = doctorRepository.save(doctor);
        log.info("New {} registered: {}", doctor.getRole(), doctor.getEmail());

        return DoctorDto.fromDoctor(doctor);
    }

    private String generateRefreshToken(UUID doctorId) {
        String rawToken = UUID.randomUUID().toString() + "-" + UUID.randomUUID().toString();
        String tokenHash = hashToken(rawToken);

        RefreshToken refreshToken = RefreshToken.builder()
                .tokenHash(tokenHash)
                .doctorId(doctorId)
                .expiresAt(OffsetDateTime.now().plusDays(refreshTokenExpiryDays))
                .isRevoked(false)
                .build();

        refreshTokenRepository.save(refreshToken);
        return rawToken;
    }

    private String hashToken(String token) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] hash = digest.digest(token.getBytes());
            return Base64.getEncoder().encodeToString(hash);
        } catch (Exception e) {
            throw new RuntimeException("Failed to hash token", e);
        }
    }
}
