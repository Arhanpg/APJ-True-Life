package com.apjtruelife.auth.dto;

import jakarta.validation.constraints.NotBlank;

public class AuthRequest {
    @NotBlank(message = "Firebase token is required")
    private String firebaseToken;
    public String getFirebaseToken() { return firebaseToken; }
    public void setFirebaseToken(String v) { firebaseToken = v; }
}
