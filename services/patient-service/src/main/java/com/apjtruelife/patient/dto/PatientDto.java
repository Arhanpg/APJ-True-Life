package com.apjtruelife.patient.dto;

import com.apjtruelife.patient.model.Patient;
import lombok.*;

import java.time.LocalDate;
import java.time.OffsetDateTime;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PatientDto {
    private UUID id;
    private String firebaseUid;
    private String fullName;
    private String email;
    private String phone;
    private String photoUrl;
    private LocalDate dateOfBirth;
    private String gender;
    private String bloodGroup;
    private String address;
    private String emergencyContact;
    private String prakriti;
    private String patientCode;
    private Boolean consentGiven;
    private OffsetDateTime consentAt;
    private String consentVersion;
    private OffsetDateTime createdAt;
    private OffsetDateTime updatedAt;

    public static PatientDto fromPatient(Patient patient) {
        return PatientDto.builder()
                .id(patient.getId())
                .firebaseUid(patient.getFirebaseUid())
                .fullName(patient.getFullName())
                .email(patient.getEmail())
                .phone(patient.getPhone())
                .photoUrl(patient.getPhotoUrl())
                .dateOfBirth(patient.getDateOfBirth())
                .gender(patient.getGender() != null ? patient.getGender().name().toLowerCase() : null)
                .bloodGroup(patient.getBloodGroup())
                .address(patient.getAddress())
                .emergencyContact(patient.getEmergencyContact())
                .prakriti(patient.getPrakriti())
                .patientCode(patient.getPatientCode())
                .consentGiven(patient.getConsentGiven())
                .consentAt(patient.getConsentAt())
                .consentVersion(patient.getConsentVersion())
                .createdAt(patient.getCreatedAt())
                .updatedAt(patient.getUpdatedAt())
                .build();
    }
}
