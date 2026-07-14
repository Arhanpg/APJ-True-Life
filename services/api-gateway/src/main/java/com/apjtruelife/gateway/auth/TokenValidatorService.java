package com.apjtruelife.gateway.auth;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseToken;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import jakarta.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.ByteArrayInputStream;
import java.nio.charset.StandardCharsets;
import java.security.KeyFactory;
import java.security.PublicKey;
import java.security.spec.X509EncodedKeySpec;
import java.util.Base64;

/**
 * Validates TWO types of JWT tokens:
 * 1. Firebase tokens (patients): verified via Firebase Admin SDK
 * 2. Spring Boot tokens (doctors/admins): verified via RS256 public key
 *
 * See Build Guide Section 3.3 — Token Validation at API Gateway.
 */
@Service
@Slf4j
public class TokenValidatorService {

    @Value("${firebase.project-id:apj-true-life-firebase}")
    private String firebaseProjectId;

    @Value("${firebase.service-account-json:#{null}}")
    private String firebaseServiceAccountJson;

    @Value("${auth.rs256-public-key:#{null}}")
    private String rs256PublicKeyPem;

    private boolean firebaseInitialized = false;

    @PostConstruct
    public void init() {
        initializeFirebase();
    }

    private void initializeFirebase() {
        try {
            if (firebaseServiceAccountJson != null && !firebaseServiceAccountJson.isBlank()
                    && !firebaseServiceAccountJson.startsWith("CI_STUB")) {
                FirebaseOptions options = FirebaseOptions.builder()
                        .setCredentials(GoogleCredentials.fromStream(
                                new ByteArrayInputStream(firebaseServiceAccountJson.getBytes(StandardCharsets.UTF_8))))
                        .setProjectId(firebaseProjectId)
                        .build();

                if (FirebaseApp.getApps().isEmpty()) {
                    FirebaseApp.initializeApp(options);
                }
                firebaseInitialized = true;
                log.info("Firebase Admin SDK initialized for project: {}", firebaseProjectId);
            } else {
                log.warn("Firebase service account not configured — Firebase token validation disabled");
            }
        } catch (Exception e) {
            log.error("Failed to initialize Firebase Admin SDK", e);
        }
    }

    /**
     * Validates a bearer token and returns an AuthContext.
     * Determines token type by decoding the issuer claim first.
     */
    public AuthContext validate(String bearerToken) {
        // Decode without verification to check issuer
        String[] parts = bearerToken.split("\\.");
        if (parts.length != 3) {
            throw new UnauthorizedException("Invalid token format");
        }

        String payload = new String(Base64.getUrlDecoder().decode(parts[1]), StandardCharsets.UTF_8);

        if (payload.contains("securetoken.google.com")) {
            return validateFirebaseToken(bearerToken);
        } else if (payload.contains("apj-auth")) {
            return validateSpringJwt(bearerToken);
        }

        throw new UnauthorizedException("Unknown token issuer");
    }

    /**
     * Validates Firebase ID token using Firebase Admin SDK.
     */
    private AuthContext validateFirebaseToken(String token) {
        if (!firebaseInitialized) {
            throw new UnauthorizedException("Firebase authentication not available");
        }

        try {
            FirebaseToken firebaseToken = FirebaseAuth.getInstance().verifyIdToken(token);
            return AuthContext.builder()
                    .userId(firebaseToken.getUid())
                    .role("patient")
                    .issuer("https://securetoken.google.com/" + firebaseProjectId)
                    .email(firebaseToken.getEmail())
                    .name(firebaseToken.getName())
                    .build();
        } catch (Exception e) {
            log.warn("Firebase token validation failed: {}", e.getMessage());
            throw new UnauthorizedException("Invalid Firebase token");
        }
    }

    /**
     * Validates Spring Boot RS256 JWT using the auth-service public key.
     */
    private AuthContext validateSpringJwt(String token) {
        try {
            PublicKey publicKey = getRS256PublicKey();
            Claims claims = Jwts.parser()
                    .requireIssuer("apj-auth")
                    .verifyWith(publicKey)
                    .build()
                    .parseSignedClaims(token)
                    .getPayload();

            return AuthContext.builder()
                    .userId(claims.getSubject())
                    .role(claims.get("role", String.class))
                    .issuer("apj-auth")
                    .email(claims.get("email", String.class))
                    .name(claims.get("name", String.class))
                    .build();
        } catch (Exception e) {
            log.warn("Spring JWT validation failed: {}", e.getMessage());
            throw new UnauthorizedException("Invalid access token");
        }
    }

    private PublicKey getRS256PublicKey() {
        try {
            if (rs256PublicKeyPem == null || rs256PublicKeyPem.isBlank()) {
                throw new RuntimeException("RS256 public key not configured");
            }
            String cleaned = rs256PublicKeyPem
                    .replace("-----BEGIN PUBLIC KEY-----", "")
                    .replace("-----END PUBLIC KEY-----", "")
                    .replaceAll("\\s", "");
            byte[] decoded = Base64.getDecoder().decode(cleaned);
            return KeyFactory.getInstance("RSA").generatePublic(new X509EncodedKeySpec(decoded));
        } catch (Exception e) {
            throw new RuntimeException("Failed to load RS256 public key", e);
        }
    }
}
