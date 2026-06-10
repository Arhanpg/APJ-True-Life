package com.apjtruelife.patient.dto;

import com.apjtruelife.patient.model.Patient;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;
import java.time.OffsetDateTime;
import java.time.Period;
import java.util.UUID;

@Data
@Builder
public class PatientDto {
    private UUID id;
    private UUID userId;
    private String fullName;
    private LocalDate dateOfBirth;
    private Integer age;
    private Patient.Gender gender;
    private String bloodGroup;
    private String address;
    private String emergencyContact;
    private String profileImageUrl;
    private String prakriti;
    private String[] allergies;
    private String patientCode;
    private UUID createdByDoctorId;
    private OffsetDateTime createdAt;
    private OffsetDateTime updatedAt;

    public static PatientDto fromPatient(Patient patient) {
        int age = Period.between(patient.getDateOfBirth(), LocalDate.now()).getYears();
        return PatientDto.builder()
                .id(patient.getId())
                .userId(patient.getUserId())
                .fullName(patient.getFullName())
                .dateOfBirth(patient.getDateOfBirth())
                .age(age)
                .gender(patient.getGender())
                .bloodGroup(patient.getBloodGroup())
                .address(patient.getAddress())
                .emergencyContact(patient.getEmergencyContact())
                .profileImageUrl(patient.getProfileImageUrl())
                .prakriti(patient.getPrakriti())
                .allergies(patient.getAllergies())
                .patientCode(patient.getPatientCode())
                .createdByDoctorId(patient.getCreatedByDoctorId())
                .createdAt(patient.getCreatedAt())
                .updatedAt(patient.getUpdatedAt())
                .build();
    }
}
