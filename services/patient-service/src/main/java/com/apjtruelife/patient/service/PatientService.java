package com.apjtruelife.patient.service;

import com.apjtruelife.patient.dto.*;
import com.apjtruelife.patient.model.Patient;
import com.apjtruelife.patient.repository.PatientRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.OffsetDateTime;
import java.util.UUID;

/**
 * Patient Service v2 — handles patient CRUD, profile sync, consent, and account deletion.
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class PatientService {

    private final PatientRepository patientRepository;

    /**
     * Profile sync — called after first Firebase sign-in.
     * Upserts patient record keyed by firebase_uid.
     */
    @Transactional
    public PatientDto profileSync(ProfileSyncRequest request) {
        Patient patient = patientRepository.findByFirebaseUid(request.getFirebaseUid())
                .map(existing -> {
                    // Update existing profile
                    if (request.getName() != null) existing.setFullName(request.getName());
                    if (request.getPhone() != null) existing.setPhone(request.getPhone());
                    if (request.getEmail() != null) existing.setEmail(request.getEmail());
                    if (request.getPhotoUrl() != null) existing.setPhotoUrl(request.getPhotoUrl());
                    return existing;
                })
                .orElseGet(() -> {
                    // Create new patient profile
                    String patientCode = generatePatientCode();
                    return Patient.builder()
                            .firebaseUid(request.getFirebaseUid())
                            .fullName(request.getName())
                            .email(request.getEmail())
                            .phone(request.getPhone())
                            .photoUrl(request.getPhotoUrl())
                            .patientCode(patientCode)
                            .consentGiven(false)
                            .isDeleted(false)
                            .build();
                });

        patient = patientRepository.save(patient);
        log.info("Patient profile synced: {} (firebase_uid: {})", patient.getId(), request.getFirebaseUid());
        return PatientDto.fromPatient(patient);
    }

    /**
     * Record DPDP consent.
     */
    @Transactional
    public PatientDto recordConsent(String firebaseUid, ConsentRequest request) {
        Patient patient = patientRepository.findByFirebaseUid(firebaseUid)
                .orElseThrow(() -> new IllegalArgumentException("Patient not found"));

        patient.setConsentGiven(request.isConsentGiven());
        patient.setConsentAt(OffsetDateTime.now());
        patient.setConsentVersion(request.getPolicyVersion());

        patient = patientRepository.save(patient);
        log.info("Consent recorded for patient: {} (consent: {}, version: {})",
                patient.getId(), request.isConsentGiven(), request.getPolicyVersion());
        return PatientDto.fromPatient(patient);
    }

    /**
     * Soft-delete patient account (DPDP Act — Right to Erasure).
     * Anonymises PII fields but retains medical records for legal obligation.
     */
    @Transactional
    public void deleteAccount(String firebaseUid) {
        Patient patient = patientRepository.findByFirebaseUid(firebaseUid)
                .orElseThrow(() -> new IllegalArgumentException("Patient not found"));

        // Anonymise PII
        patient.setFullName("[DELETED]");
        patient.setEmail(null);
        patient.setPhone(null);
        patient.setPhotoUrl(null);
        patient.setAddress(null);
        patient.setEmergencyContact(null);
        patient.setIsDeleted(true);
        patient.setDeletedAt(OffsetDateTime.now());

        patientRepository.save(patient);
        log.info("Patient account soft-deleted: {} (firebase_uid: {})", patient.getId(), firebaseUid);
    }

    /**
     * Export patient data (DPDP Act — Right to Access).
     */
    @Transactional(readOnly = true)
    public PatientDto exportData(String firebaseUid) {
        Patient patient = patientRepository.findByFirebaseUid(firebaseUid)
                .orElseThrow(() -> new IllegalArgumentException("Patient not found"));
        return PatientDto.fromPatient(patient);
    }

    @Transactional(readOnly = true)
    public PatientDto getPatientById(UUID id) {
        Patient patient = patientRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Patient not found: " + id));
        return PatientDto.fromPatient(patient);
    }

    @Transactional(readOnly = true)
    public PatientDto getPatientByFirebaseUid(String firebaseUid) {
        Patient patient = patientRepository.findByFirebaseUid(firebaseUid)
                .orElseThrow(() -> new IllegalArgumentException("Patient not found"));
        return PatientDto.fromPatient(patient);
    }

    @Transactional(readOnly = true)
    public Page<PatientDto> getAllPatients(String search, Pageable pageable) {
        Page<Patient> patients;
        if (search != null && !search.isBlank()) {
            patients = patientRepository.searchPatients(search, pageable);
        } else {
            patients = patientRepository.findAllActive(pageable);
        }
        return patients.map(PatientDto::fromPatient);
    }

    @Transactional
    public PatientDto updatePatient(UUID id, UpdatePatientRequest request) {
        Patient patient = patientRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Patient not found: " + id));

        if (request.getFullName() != null) patient.setFullName(request.getFullName());
        if (request.getDateOfBirth() != null) patient.setDateOfBirth(request.getDateOfBirth());
        if (request.getGender() != null) patient.setGender(Patient.Gender.valueOf(request.getGender().toUpperCase()));
        if (request.getBloodGroup() != null) patient.setBloodGroup(request.getBloodGroup());
        if (request.getAddress() != null) patient.setAddress(request.getAddress());
        if (request.getEmergencyContact() != null) patient.setEmergencyContact(request.getEmergencyContact());
        if (request.getPrakriti() != null) patient.setPrakriti(request.getPrakriti());

        patient = patientRepository.save(patient);
        return PatientDto.fromPatient(patient);
    }

    private String generatePatientCode() {
        // APJ-XXXXXXXX format
        return "APJ-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();
    }
}
