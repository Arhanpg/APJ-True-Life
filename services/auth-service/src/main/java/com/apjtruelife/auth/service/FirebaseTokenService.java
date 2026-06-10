package com.apjtruelife.auth.service;

import com.google.firebase.FirebaseApp;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.FirebaseToken;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class FirebaseTokenService {

    private final FirebaseApp firebaseApp;

    public FirebaseToken verifyToken(String idToken) {
        try {
            FirebaseToken decodedToken = FirebaseAuth.getInstance(firebaseApp)
                    .verifyIdToken(idToken);
            log.debug("Firebase token verified for UID: {}", decodedToken.getUid());
            return decodedToken;
        } catch (FirebaseAuthException e) {
            log.warn("Firebase token verification failed: {}", e.getMessage());
            throw new IllegalArgumentException("Invalid or expired Firebase token: " + e.getMessage());
        }
    }

    public String getPhoneNumber(FirebaseToken token) {
        // Firebase stores phone in the token claims
        Object phone = token.getClaims().get("phone_number");
        return phone != null ? phone.toString() : null;
    }
}
