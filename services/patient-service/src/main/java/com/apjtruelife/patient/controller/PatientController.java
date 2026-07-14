package com.apjtruelife.patient.controller;

import com.apjtruelife.patient.dto.*;
import com.apjtruelife.patient.service.PatientService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

/**
 * Patient Controller v2.
 * Profile sync, DPDP consent, account deletion, data export.
 */
@RestController
@RequestMapping("/api/patients")
@RequiredArgsConstructor
public class PatientController {

    private final PatientService patientService;

    /**
     * POST /api/patients/profile-sync
     * Called once after first Firebase sign-in to create/update patient profile.
     * Firebase JWT validated by api-gateway — firebase_uid from X-User-Id header.
     */
    @PostMapping("/profile-sync")
    public ResponseEntity<ApiResponse<PatientDto>> profileSync(
            @Valid @RequestBody ProfileSyncRequest request,
            @RequestHeader(value = "X-User-Id", required = false) String userId) {
        // Override firebase_uid from gateway header if present
        if (userId != null && !userId.isBlank()) {
            request.setFirebaseUid(userId);
        }
        PatientDto patient = patientService.profileSync(request);
        return ResponseEntity.ok(ApiResponse.ok(patient, "Profile synced"));
    }

    /**
     * POST /api/patients/consent
     * Record DPDP Act consent.
     */
    @PostMapping("/consent")
    public ResponseEntity<ApiResponse<PatientDto>> recordConsent(
            @Valid @RequestBody ConsentRequest request,
            @RequestHeader("X-User-Id") String firebaseUid) {
        PatientDto patient = patientService.recordConsent(firebaseUid, request);
        return ResponseEntity.ok(ApiResponse.ok(patient, "Consent recorded"));
    }

    /**
     * POST /api/patients/delete-account
     * DPDP Act — Right to Erasure. Soft-deletes patient data.
     */
    @PostMapping("/delete-account")
    public ResponseEntity<ApiResponse<Void>> deleteAccount(
            @RequestHeader("X-User-Id") String firebaseUid) {
        patientService.deleteAccount(firebaseUid);
        return ResponseEntity.ok(ApiResponse.ok(null, "Account deleted"));
    }

    /**
     * GET /api/patients/export-data
     * DPDP Act — Right to Access. Returns JSON export of patient data.
     */
    @GetMapping("/export-data")
    public ResponseEntity<ApiResponse<PatientDto>> exportData(
            @RequestHeader("X-User-Id") String firebaseUid) {
        PatientDto patient = patientService.exportData(firebaseUid);
        return ResponseEntity.ok(ApiResponse.ok(patient, "Data exported"));
    }

    /** GET /api/patients - List all patients (DOCTOR only) */
    @GetMapping
    public ResponseEntity<ApiResponse<Map<String, Object>>> getAllPatients(
            @RequestParam(required = false) String search,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "createdAt") String sortBy,
            @RequestParam(defaultValue = "desc") String sortDir) {
        Sort.Direction direction = sortDir.equalsIgnoreCase("asc") ? Sort.Direction.ASC : Sort.Direction.DESC;
        PageRequest pageable = PageRequest.of(page, size, Sort.by(direction, sortBy));
        Page<PatientDto> patientPage = patientService.getAllPatients(search, pageable);
        Map<String, Object> response = new HashMap<>();
        response.put("patients", patientPage.getContent());
        response.put("totalElements", patientPage.getTotalElements());
        response.put("totalPages", patientPage.getTotalPages());
        response.put("currentPage", patientPage.getNumber());
        return ResponseEntity.ok(ApiResponse.ok(response, "Patients retrieved"));
    }

    /** GET /api/patients/{id} */
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<PatientDto>> getPatient(@PathVariable UUID id) {
        return ResponseEntity.ok(ApiResponse.ok(patientService.getPatientById(id), "Patient retrieved"));
    }

    /** PUT /api/patients/{id} */
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<PatientDto>> updatePatient(
            @PathVariable UUID id,
            @RequestBody UpdatePatientRequest request) {
        return ResponseEntity.ok(ApiResponse.ok(patientService.updatePatient(id, request), "Patient updated"));
    }
}
