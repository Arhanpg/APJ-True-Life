package com.apjtruelife.auth.service;

import com.apjtruelife.auth.model.Doctor;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.security.KeyFactory;
import java.security.PrivateKey;
import java.security.PublicKey;
import java.security.spec.PKCS8EncodedKeySpec;
import java.security.spec.X509EncodedKeySpec;
import java.util.*;

/**
 * JWT Service using RS256 (asymmetric key pair).
 * v2: issuer is 'apj-auth' to distinguish from Firebase tokens.
 * Access tokens: 15 minutes TTL.
 */
@Service
@Slf4j
public class JwtService {

    private static final String ISSUER = "apj-auth";

    @Value("${jwt.private-key}")
    private String privateKeyPem;

    @Value("${jwt.public-key}")
    private String publicKeyPem;

    @Value("${jwt.access-token-expiry-minutes:15}")
    private int accessTokenExpiryMinutes;

    /**
     * Generate RS256 JWT for doctor/admin.
     */
    public String generateAccessToken(Doctor doctor) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("role", doctor.getRole().name().toLowerCase());
        claims.put("name", doctor.getName());
        claims.put("email", doctor.getEmail());

        Date now = new Date();
        Date expiry = new Date(now.getTime() + (long) accessTokenExpiryMinutes * 60 * 1000);

        return Jwts.builder()
                .issuer(ISSUER)
                .subject(doctor.getId().toString())
                .claims(claims)
                .issuedAt(now)
                .expiration(expiry)
                .signWith(getPrivateKey())
                .compact();
    }

    /**
     * Validate RS256 JWT and return claims.
     */
    public Claims validateToken(String token) {
        return Jwts.parser()
                .requireIssuer(ISSUER)
                .verifyWith(getPublicKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    /**
     * Extract doctor ID from token subject.
     */
    public UUID extractDoctorId(String token) {
        return UUID.fromString(validateToken(token).getSubject());
    }

    /**
     * Extract role from token.
     */
    public String extractRole(String token) {
        return validateToken(token).get("role", String.class);
    }

    public PublicKey getPublicKey() {
        try {
            String cleaned = publicKeyPem
                    .replace("-----BEGIN PUBLIC KEY-----", "")
                    .replace("-----END PUBLIC KEY-----", "")
                    .replaceAll("\\s", "");
            byte[] decoded = Base64.getDecoder().decode(cleaned);
            return KeyFactory.getInstance("RSA").generatePublic(new X509EncodedKeySpec(decoded));
        } catch (Exception e) {
            throw new RuntimeException("Failed to load RS256 public key", e);
        }
    }

    private PrivateKey getPrivateKey() {
        try {
            String cleaned = privateKeyPem
                    .replace("-----BEGIN PRIVATE KEY-----", "")
                    .replace("-----END PRIVATE KEY-----", "")
                    .replaceAll("\\s", "");
            byte[] decoded = Base64.getDecoder().decode(cleaned);
            return KeyFactory.getInstance("RSA").generatePrivate(new PKCS8EncodedKeySpec(decoded));
        } catch (Exception e) {
            throw new RuntimeException("Failed to load RS256 private key", e);
        }
    }
}
