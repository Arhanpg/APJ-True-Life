package com.apjtruelife.auth.service;

import com.apjtruelife.auth.model.User;
import com.apjtruelife.auth.repository.UserRepository;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseToken;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Service
public class AuthService {

    private final UserRepository userRepo;
    private final String jwtSecret;
    private final long jwtExpirationMs;

    public AuthService(
        UserRepository userRepo,
        @Value("${app.jwt.secret}") String jwtSecret,
        @Value("${app.jwt.expiration-ms}") long jwtExpirationMs
    ) {
        this.userRepo = userRepo;
        this.jwtSecret = jwtSecret;
        this.jwtExpirationMs = jwtExpirationMs;
    }

    public Map<String, Object> verifyAndIssue(String firebaseToken) {
        try {
            FirebaseToken decoded = FirebaseAuth.getInstance().verifyIdToken(firebaseToken);
            String uid = decoded.getUid();
            String phone = (String) decoded.getClaims().get("phone_number");
            String email = decoded.getEmail();

            User user = userRepo.findByFirebaseUid(uid).orElseGet(() -> {
                User u = new User();
                u.setFirebaseUid(uid);
                u.setPhoneNumber(phone);
                u.setEmail(email);
                // phone-based = PATIENT, email-based = DOCTOR
                u.setRole(phone != null ? User.UserRole.PATIENT : User.UserRole.DOCTOR);
                return userRepo.save(u);
            });

            user.setLastLoginAt(Instant.now());
            userRepo.save(user);

            String jwt = buildJwt(user);
            Map<String, Object> result = new HashMap<>();
            result.put("token", jwt);
            result.put("userId", user.getId());
            result.put("role", user.getRole());
            result.put("isNewUser", !userRepo.existsByFirebaseUid(uid));
            return result;
        } catch (Exception e) {
            throw new RuntimeException("Invalid Firebase token: " + e.getMessage());
        }
    }

    public Map<String, Object> getCurrentUser(String token) {
        SecretKey key = Keys.hmacShaKeyFor(jwtSecret.getBytes(StandardCharsets.UTF_8));
        var claims = Jwts.parser().verifyWith(key).build().parseSignedClaims(token).getPayload();
        String uid = claims.getSubject();
        User user = userRepo.findById(java.util.UUID.fromString(uid))
            .orElseThrow(() -> new RuntimeException("User not found"));
        Map<String, Object> result = new HashMap<>();
        result.put("id", user.getId());
        result.put("role", user.getRole());
        result.put("email", user.getEmail());
        result.put("phoneNumber", user.getPhoneNumber());
        return result;
    }

    private String buildJwt(User user) {
        SecretKey key = Keys.hmacShaKeyFor(jwtSecret.getBytes(StandardCharsets.UTF_8));
        return Jwts.builder()
            .subject(user.getId().toString())
            .claim("role", user.getRole().name())
            .claim("firebaseUid", user.getFirebaseUid())
            .issuedAt(new Date())
            .expiration(new Date(System.currentTimeMillis() + jwtExpirationMs))
            .signWith(key)
            .compact();
    }
}
