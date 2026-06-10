package com.apjtruelife.auth.dto;

import com.apjtruelife.auth.model.User;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class RegisterRequest {

    @NotBlank(message = "Firebase UID is required")
    private String firebaseUid;

    @NotNull(message = "Role is required")
    private User.UserRole role;

    private String phoneNumber;

    private String email;
}
