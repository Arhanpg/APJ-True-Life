package com.apjtruelife.treatment.controller;

import com.apjtruelife.treatment.model.*;
import com.apjtruelife.treatment.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.OffsetDateTime;
import java.util.*;

@RestController
@RequestMapping("/api/v1/treatments")
@RequiredArgsConstructor
public class TreatmentController {

    private final TreatmentPlanRepository planRepository;
    private final TreatmentPhaseRepository phaseRepository;
    private final PhaseMedicineRepository medicineRepository;

    @PostMapping
    public ResponseEntity<Map<String, Object>> createPlan(@RequestBody TreatmentPlan plan) {
        plan = planRepository.save(plan);
        return ResponseEntity.ok(Map.of("success", true, "data", plan, "message", "Treatment plan created"));
    }

    @GetMapping
    public ResponseEntity<Map<String, Object>> getAll(
            @RequestParam(required = false) UUID doctorId,
            @RequestParam(required = false) UUID patientId,
            @RequestParam(required = false) String status,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        PageRequest pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "createdAt"));
        Page<TreatmentPlan> results;
        if (doctorId != null && status != null) {
            results = planRepository.findByDoctorIdAndStatus(doctorId, TreatmentPlan.TreatmentStatus.valueOf(status.toUpperCase()), pageable);
        } else if (doctorId != null) {
            results = planRepository.findByDoctorId(doctorId, pageable);
        } else if (patientId != null) {
            results = planRepository.findByPatientId(patientId, pageable);
        } else {
            results = planRepository.findAll(pageable);
        }
        Map<String, Object> response = new HashMap<>();
        response.put("treatments", results.getContent());
        response.put("totalElements", results.getTotalElements());
        response.put("totalPages", results.getTotalPages());
        return ResponseEntity.ok(Map.of("success", true, "data", response));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Map<String, Object>> getById(@PathVariable UUID id) {
        TreatmentPlan plan = planRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Treatment plan not found: " + id));
        List<TreatmentPhase> phases = phaseRepository.findByTreatmentPlanIdOrderByPhaseNumber(id);
        Map<String, Object> data = new HashMap<>();
        data.put("plan", plan);
        data.put("phases", phases);
        return ResponseEntity.ok(Map.of("success", true, "data", data));
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<Map<String, Object>> updateStatus(@PathVariable UUID id, @RequestBody Map<String, String> body) {
        TreatmentPlan plan = planRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Treatment plan not found: " + id));
        plan.setStatus(TreatmentPlan.TreatmentStatus.valueOf(body.get("status").toUpperCase()));
        if (plan.getStatus() == TreatmentPlan.TreatmentStatus.COMPLETED) {
            plan.setCompletedAt(OffsetDateTime.now());
        }
        plan = planRepository.save(plan);
        return ResponseEntity.ok(Map.of("success", true, "data", plan, "message", "Status updated"));
    }

    // Phase CRUD
    @PostMapping("/{id}/phases")
    public ResponseEntity<Map<String, Object>> addPhase(@PathVariable UUID id, @RequestBody TreatmentPhase phase) {
        phase.setTreatmentPlanId(id);
        phase = phaseRepository.save(phase);
        return ResponseEntity.ok(Map.of("success", true, "data", phase));
    }

    @GetMapping("/{id}/phases")
    public ResponseEntity<Map<String, Object>> getPhases(@PathVariable UUID id) {
        List<TreatmentPhase> phases = phaseRepository.findByTreatmentPlanIdOrderByPhaseNumber(id);
        return ResponseEntity.ok(Map.of("success", true, "data", phases));
    }

    @PatchMapping("/phases/{phaseId}/status")
    public ResponseEntity<Map<String, Object>> updatePhaseStatus(@PathVariable UUID phaseId, @RequestBody Map<String, String> body) {
        TreatmentPhase phase = phaseRepository.findById(phaseId)
                .orElseThrow(() -> new IllegalArgumentException("Phase not found: " + phaseId));
        phase.setStatus(TreatmentPhase.PhaseStatus.valueOf(body.get("status").toUpperCase()));
        if (phase.getStatus() == TreatmentPhase.PhaseStatus.IN_PROGRESS) {
            phase.setStartedAt(OffsetDateTime.now());
        } else if (phase.getStatus() == TreatmentPhase.PhaseStatus.COMPLETED) {
            phase.setCompletedAt(OffsetDateTime.now());
        }
        phase = phaseRepository.save(phase);
        return ResponseEntity.ok(Map.of("success", true, "data", phase));
    }

    // Medicine CRUD
    @PostMapping("/phases/{phaseId}/medicines")
    public ResponseEntity<Map<String, Object>> addMedicine(@PathVariable UUID phaseId, @RequestBody PhaseMedicine medicine) {
        medicine.setPhaseId(phaseId);
        medicine = medicineRepository.save(medicine);
        return ResponseEntity.ok(Map.of("success", true, "data", medicine));
    }

    @GetMapping("/phases/{phaseId}/medicines")
    public ResponseEntity<Map<String, Object>> getMedicines(@PathVariable UUID phaseId) {
        List<PhaseMedicine> medicines = medicineRepository.findByPhaseIdOrderByDisplayOrder(phaseId);
        return ResponseEntity.ok(Map.of("success", true, "data", medicines));
    }
}
