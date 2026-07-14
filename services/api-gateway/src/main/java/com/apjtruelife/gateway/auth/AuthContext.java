package com.apjtruelife.gateway.auth;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Authentication context extracted from validated JWT.
 * Carried through the request lifecycle via headers.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AuthContext {
    private String userId;       // Doctor UUID or Firebase UID
    private String role;         // "patient", "doctor", or "admin"
    private String issuer;       // "apj-auth" or "https://securetoken.google.com/..."
    private String email;
    private String name;
}
