package com.apjtruelife.patient.controller;

import com.apjtruelife.patient.dto.*;
import com.apjtruelife.patient.model.MedicalHistory;
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
import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/patients")
@RequiredArgsConstructor
public class PatientController {

    private final PatientService patientService;

    /** POST /api/v1/patients - Create new patient profile (DOCTOR only) */
    @PostMapping
    public ResponseEntity<ApiResponse<PatientDto>> createPatient(
            @Valid @RequestBody CreatePatientRequest request) {
        PatientDto patient = patientService.createPatient(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.ok(patient, "Patient profile created"));
    }

    /** GET /api/v1/patients - List all patients with search (DOCTOR only) */
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

    /** GET /api/v1/patients/{id} - Get patient profile */
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<PatientDto>> getPatient(@PathVariable UUID id) {
        return ResponseEntity.ok(ApiResponse.ok(patientService.getPatientById(id), "Patient retrieved"));
    }

    /** GET /api/v1/patients/user/{userId} - Get patient by userId */
    @GetMapping("/user/{userId}")
    public ResponseEntity<ApiResponse<PatientDto>> getPatientByUserId(@PathVariable UUID userId) {
        return ResponseEntity.ok(ApiResponse.ok(patientService.getPatientByUserId(userId), "Patient retrieved"));
    }

    /** PUT /api/v1/patients/{id} - Update patient profile */
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<PatientDto>> updatePatient(
            @PathVariable UUID id,
            @RequestBody UpdatePatientRequest request) {
        return ResponseEntity.ok(ApiResponse.ok(patientService.updatePatient(id, request), "Patient updated"));
    }

    /** PATCH /api/v1/patients/{id}/prakriti - Update Ayurvedic body type */
    @PatchMapping("/{id}/prakriti")
    public ResponseEntity<ApiResponse<PatientDto>> updatePrakriti(
            @PathVariable UUID id,
            @RequestBody Map<String, String> body) {
        return ResponseEntity.ok(ApiResponse.ok(
                patientService.updatePrakriti(id, body.get("prakriti")), "Prakriti updated"));
    }

    /** GET /api/v1/patients/{id}/medical-history */
    @GetMapping("/{id}/medical-history")
    public ResponseEntity<ApiResponse<List<MedicalHistory>>> getMedicalHistory(@PathVariable UUID id) {
        return ResponseEntity.ok(ApiResponse.ok(patientService.getMedicalHistory(id), "Medical history retrieved"));
    }
}
