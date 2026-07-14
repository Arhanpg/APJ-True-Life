package com.apjtruelife.patient.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProfileSyncRequest {

    @NotBlank(message = "Firebase UID is required")
    private String firebaseUid;

    private String name;
    private String phone;
    private String email;
    private String photoUrl;
}
