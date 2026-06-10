package com.apjtruelife.patient.service;

import com.apjtruelife.patient.dto.*;
import com.apjtruelife.patient.model.MedicalHistory;
import com.apjtruelife.patient.model.Patient;
import com.apjtruelife.patient.repository.MedicalHistoryRepository;
import com.apjtruelife.patient.repository.PatientRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Random;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class PatientService {

    private final PatientRepository patientRepository;
    private final MedicalHistoryRepository medicalHistoryRepository;

    @Transactional
    public PatientDto createPatient(CreatePatientRequest request) {
        if (patientRepository.existsByUserId(request.getUserId())) {
            throw new IllegalArgumentException("Patient profile already exists for user: " + request.getUserId());
        }

        String patientCode = generatePatientCode();
        Patient patient = Patient.builder()
                .userId(request.getUserId())
                .fullName(request.getFullName())
                .dateOfBirth(request.getDateOfBirth())
                .gender(request.getGender())
                .bloodGroup(request.getBloodGroup())
                .address(request.getAddress())
                .emergencyContact(request.getEmergencyContact())
                .profileImageUrl(request.getProfileImageUrl())
                .profileImagePublicId(request.getProfileImagePublicId())
                .prakriti(request.getPrakriti())
                .allergies(request.getAllergies() != null ? request.getAllergies() : new String[]{})
                .patientCode(patientCode)
                .createdByDoctorId(request.getCreatedByDoctorId())
                .build();

        patient = patientRepository.save(patient);
        log.info("Patient profile created: {} ({})", patient.getId(), patientCode);
        return PatientDto.fromPatient(patient);
    }

    @Transactional(readOnly = true)
    public PatientDto getPatientById(UUID patientId) {
        Patient patient = findPatientById(patientId);
        return PatientDto.fromPatient(patient);
    }

    @Transactional(readOnly = true)
    public PatientDto getPatientByUserId(UUID userId) {
        Patient patient = patientRepository.findByUserId(userId)
                .orElseThrow(() -> new IllegalArgumentException("Patient not found for user: " + userId));
        return PatientDto.fromPatient(patient);
    }

    @Transactional
    public PatientDto updatePatient(UUID patientId, UpdatePatientRequest request) {
        Patient patient = findPatientById(patientId);
        if (request.getFullName() != null) patient.setFullName(request.getFullName());
        if (request.getDateOfBirth() != null) patient.setDateOfBirth(request.getDateOfBirth());
        if (request.getGender() != null) patient.setGender(request.getGender());
        if (request.getBloodGroup() != null) patient.setBloodGroup(request.getBloodGroup());
        if (request.getAddress() != null) patient.setAddress(request.getAddress());
        if (request.getEmergencyContact() != null) patient.setEmergencyContact(request.getEmergencyContact());
        if (request.getProfileImageUrl() != null) patient.setProfileImageUrl(request.getProfileImageUrl());
        if (request.getProfileImagePublicId() != null) patient.setProfileImagePublicId(request.getProfileImagePublicId());
        if (request.getPrakriti() != null) patient.setPrakriti(request.getPrakriti());
        if (request.getAllergies() != null) patient.setAllergies(request.getAllergies());
        patient = patientRepository.save(patient);
        return PatientDto.fromPatient(patient);
    }

    @Transactional
    public PatientDto updatePrakriti(UUID patientId, String prakriti) {
        Patient patient = findPatientById(patientId);
        patient.setPrakriti(prakriti);
        patient = patientRepository.save(patient);
        return PatientDto.fromPatient(patient);
    }

    @Transactional(readOnly = true)
    public Page<PatientDto> getAllPatients(String search, Pageable pageable) {
        return patientRepository.searchPatients(search, pageable)
                .map(PatientDto::fromPatient);
    }

    @Transactional(readOnly = true)
    public List<MedicalHistory> getMedicalHistory(UUID patientId) {
        findPatientById(patientId); // verify patient exists
        return medicalHistoryRepository.findByPatientIdOrderByCreatedAtDesc(patientId);
    }

    private Patient findPatientById(UUID id) {
        return patientRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Patient not found: " + id));
    }

    private String generatePatientCode() {
        String code;
        do {
            code = "ATL-" + String.format("%04d", new Random().nextInt(9000) + 1000);
        } while (patientRepository.findByPatientCode(code).isPresent());
        return code;
    }
}
