package com.apjtruelife.auth.service;

import com.apjtruelife.auth.dto.AuthResponse;
import com.apjtruelife.auth.dto.RegisterRequest;
import com.apjtruelife.auth.dto.UserDto;
import com.apjtruelife.auth.model.User;
import com.apjtruelife.auth.repository.UserRepository;
import com.google.firebase.auth.FirebaseToken;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.OffsetDateTime;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class AuthService {

    private final UserRepository userRepository;
    private final FirebaseTokenService firebaseTokenService;
    private final JwtService jwtService;

    /**
     * Verifies a Firebase ID token and returns a custom JWT.
     * If the user does not exist, creates a new PATIENT record.
     */
    @Transactional
    public AuthResponse verifyAndLogin(String idToken) {
        FirebaseToken firebaseToken = firebaseTokenService.verifyToken(idToken);
        String firebaseUid = firebaseToken.getUid();

        Optional<User> existingUser = userRepository.findByFirebaseUid(firebaseUid);
        boolean isNewUser = existingUser.isEmpty();

        User user;
        if (isNewUser) {
            // Auto-create PATIENT for first-time OTP login
            String phoneNumber = firebaseTokenService.getPhoneNumber(firebaseToken);
            user = User.builder()
                    .firebaseUid(firebaseUid)
                    .role(User.UserRole.PATIENT)
                    .phoneNumber(phoneNumber)
                    .email((String) firebaseToken.getClaims().get("email"))
                    .isActive(true)
                    .build();
            user = userRepository.save(user);
            log.info("New PATIENT user created for Firebase UID: {}", firebaseUid);
        } else {
            user = existingUser.get();
            if (!user.getIsActive()) {
                throw new IllegalStateException("User account is deactivated");
            }
        }

        // Update last login
        userRepository.updateLastLogin(user.getId(), OffsetDateTime.now());

        String jwt = jwtService.generateToken(user);
        log.info("JWT issued for user {} with role {}", user.getId(), user.getRole());

        return AuthResponse.builder()
                .success(true)
                .jwt(jwt)
                .userId(user.getId())
                .firebaseUid(user.getFirebaseUid())
                .role(user.getRole())
                .isNewUser(isNewUser)
                .message(isNewUser ? "New user created" : "Login successful")
                .build();
    }

    /**
     * Registers a DOCTOR user (called when doctor is added via Firebase Console).
     */
    @Transactional
    public AuthResponse registerDoctor(RegisterRequest request) {
        if (userRepository.existsByFirebaseUid(request.getFirebaseUid())) {
            throw new IllegalArgumentException("User with this Firebase UID already exists");
        }

        User user = User.builder()
                .firebaseUid(request.getFirebaseUid())
                .role(User.UserRole.DOCTOR)
                .email(request.getEmail())
                .isActive(true)
                .build();
        user = userRepository.save(user);
        log.info("DOCTOR user registered: {}", user.getId());

        String jwt = jwtService.generateToken(user);
        return AuthResponse.builder()
                .success(true)
                .jwt(jwt)
                .userId(user.getId())
                .firebaseUid(user.getFirebaseUid())
                .role(user.getRole())
                .isNewUser(true)
                .message("Doctor registered successfully")
                .build();
    }

    @Transactional(readOnly = true)
    public UserDto getUserById(UUID userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found: " + userId));
        return UserDto.fromUser(user);
    }

    @Transactional(readOnly = true)
    public UserDto getUserByFirebaseUid(String firebaseUid) {
        User user = userRepository.findByFirebaseUid(firebaseUid)
                .orElseThrow(() -> new IllegalArgumentException("User not found for Firebase UID: " + firebaseUid));
        return UserDto.fromUser(user);
    }
}
