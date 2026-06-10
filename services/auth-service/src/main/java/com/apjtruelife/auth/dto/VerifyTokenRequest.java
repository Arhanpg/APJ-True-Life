package com.apjtruelife.auth.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class VerifyTokenRequest {

    @NotBlank(message = "Firebase ID token is required")
    private String idToken;
}
