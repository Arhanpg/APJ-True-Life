package com.apjtruelife.doctor.controller;

import com.apjtruelife.doctor.model.Clinic;
import com.apjtruelife.doctor.model.ClinicService;
import com.apjtruelife.doctor.model.Doctor;
import com.apjtruelife.doctor.repository.ClinicRepository;
import com.apjtruelife.doctor.repository.ClinicServiceRepository;
import com.apjtruelife.doctor.repository.DoctorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/doctors")
@RequiredArgsConstructor
public class DoctorController {

    private final DoctorRepository doctorRepository;
    private final ClinicRepository clinicRepository;
    private final ClinicServiceRepository clinicServiceRepository;

    @GetMapping("/{id}")
    public ResponseEntity<Map<String, Object>> getDoctor(@PathVariable UUID id) {
        Doctor doctor = doctorRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Doctor not found: " + id));
        return ResponseEntity.ok(Map.of("success", true, "data", doctor));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<Map<String, Object>> getDoctorByUserId(@PathVariable UUID userId) {
        Doctor doctor = doctorRepository.findByUserId(userId)
                .orElseThrow(() -> new IllegalArgumentException("Doctor not found for user: " + userId));
        return ResponseEntity.ok(Map.of("success", true, "data", doctor));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Map<String, Object>> updateDoctor(@PathVariable UUID id, @RequestBody Doctor updates) {
        Doctor doctor = doctorRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Doctor not found: " + id));
        if (updates.getFullName() != null) doctor.setFullName(updates.getFullName());
        if (updates.getProfessionalTitle() != null) doctor.setProfessionalTitle(updates.getProfessionalTitle());
        if (updates.getBio() != null) doctor.setBio(updates.getBio());
        if (updates.getProfileImageUrl() != null) doctor.setProfileImageUrl(updates.getProfileImageUrl());
        if (updates.getSpecializations() != null) doctor.setSpecializations(updates.getSpecializations());
        doctor = doctorRepository.save(doctor);
        return ResponseEntity.ok(Map.of("success", true, "data", doctor));
    }

    @GetMapping("/{id}/clinic")
    public ResponseEntity<Map<String, Object>> getClinic(@PathVariable UUID id) {
        Clinic clinic = clinicRepository.findByDoctorId(id)
                .orElseThrow(() -> new IllegalArgumentException("Clinic not found for doctor: " + id));
        return ResponseEntity.ok(Map.of("success", true, "data", clinic));
    }

    @PutMapping("/{id}/clinic")
    public ResponseEntity<Map<String, Object>> updateClinic(@PathVariable UUID id, @RequestBody Clinic updates) {
        Clinic clinic = clinicRepository.findByDoctorId(id)
                .orElseGet(() -> Clinic.builder().doctorId(id).name("APJ TRUE LIFE").build());
        if (updates.getName() != null) clinic.setName(updates.getName());
        if (updates.getTagline() != null) clinic.setTagline(updates.getTagline());
        if (updates.getAddress() != null) clinic.setAddress(updates.getAddress());
        if (updates.getPhone() != null) clinic.setPhone(updates.getPhone());
        if (updates.getEmail() != null) clinic.setEmail(updates.getEmail());
        if (updates.getWebsiteUrl() != null) clinic.setWebsiteUrl(updates.getWebsiteUrl());
        if (updates.getLogoUrl() != null) clinic.setLogoUrl(updates.getLogoUrl());
        clinic = clinicRepository.save(clinic);
        return ResponseEntity.ok(Map.of("success", true, "data", clinic));
    }

    @GetMapping("/{id}/services")
    public ResponseEntity<Map<String, Object>> getServices(@PathVariable UUID id) {
        Clinic clinic = clinicRepository.findByDoctorId(id)
                .orElseThrow(() -> new IllegalArgumentException("Clinic not found for doctor: " + id));
        List<ClinicService> services = clinicServiceRepository.findByClinicIdAndIsActiveTrueOrderByDisplayOrder(clinic.getId());
        return ResponseEntity.ok(Map.of("success", true, "data", services));
    }

    @PostMapping("/{id}/services")
    public ResponseEntity<Map<String, Object>> addService(@PathVariable UUID id, @RequestBody ClinicService service) {
        Clinic clinic = clinicRepository.findByDoctorId(id)
                .orElseThrow(() -> new IllegalArgumentException("Clinic not found for doctor: " + id));
        service.setClinicId(clinic.getId());
        service = clinicServiceRepository.save(service);
        return ResponseEntity.ok(Map.of("success", true, "data", service));
    }
}
