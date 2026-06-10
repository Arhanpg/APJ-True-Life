package com.apjtruelife.patient.dto;

import com.apjtruelife.patient.model.Patient;
import lombok.Data;

import java.time.LocalDate;

@Data
public class UpdatePatientRequest {
    private String fullName;
    private LocalDate dateOfBirth;
    private Patient.Gender gender;
    private String bloodGroup;
    private String address;
    private String emergencyContact;
    private String profileImageUrl;
    private String profileImagePublicId;
    private String prakriti;
    private String[] allergies;
}
