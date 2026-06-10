package com.apjtruelife.patient.dto;

import com.apjtruelife.patient.model.Patient;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Past;
import lombok.Data;

import java.time.LocalDate;
import java.util.UUID;

@Data
public class CreatePatientRequest {
    @NotNull private UUID userId;
    @NotBlank private String fullName;
    @NotNull @Past private LocalDate dateOfBirth;
    @NotNull private Patient.Gender gender;
    private String bloodGroup;
    private String address;
    private String emergencyContact;
    private String profileImageUrl;
    private String profileImagePublicId;
    private String prakriti;
    private String[] allergies;
    private UUID createdByDoctorId;
}
