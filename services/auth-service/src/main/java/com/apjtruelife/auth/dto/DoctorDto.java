package com.apjtruelife.auth.dto;

import com.apjtruelife.auth.model.Doctor;
import lombok.*;

import java.time.OffsetDateTime;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DoctorDto {
    private UUID id;
    private String email;
    private String name;
    private String role;
    private Boolean isActive;
    private OffsetDateTime lastLoginAt;
    private OffsetDateTime createdAt;

    public static DoctorDto fromDoctor(Doctor doctor) {
        return DoctorDto.builder()
                .id(doctor.getId())
                .email(doctor.getEmail())
                .name(doctor.getName())
                .role(doctor.getRole().name().toLowerCase())
                .isActive(doctor.getIsActive())
                .lastLoginAt(doctor.getLastLoginAt())
                .createdAt(doctor.getCreatedAt())
                .build();
    }
}
