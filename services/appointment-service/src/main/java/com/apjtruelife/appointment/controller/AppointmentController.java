package com.apjtruelife.appointment.controller;

import com.apjtruelife.appointment.model.Appointment;
import com.apjtruelife.appointment.repository.AppointmentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.*;

@RestController
@RequestMapping("/api/v1/appointments")
@RequiredArgsConstructor
public class AppointmentController {

    private final AppointmentRepository appointmentRepository;

    @PostMapping
    public ResponseEntity<Map<String, Object>> create(@RequestBody Appointment appointment) {
        appointment = appointmentRepository.save(appointment);
        return ResponseEntity.ok(Map.of("success", true, "data", appointment, "message", "Appointment created"));
    }

    @GetMapping
    public ResponseEntity<Map<String, Object>> getAll(
            @RequestParam(required = false) UUID doctorId,
            @RequestParam(required = false) UUID patientId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        PageRequest pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "appointmentDate", "startTime"));
        Page<Appointment> results;
        if (doctorId != null) {
            results = appointmentRepository.findByDoctorId(doctorId, pageable);
        } else if (patientId != null) {
            results = appointmentRepository.findByPatientId(patientId, pageable);
        } else {
            results = appointmentRepository.findAll(pageable);
        }
        Map<String, Object> response = new HashMap<>();
        response.put("appointments", results.getContent());
        response.put("totalElements", results.getTotalElements());
        response.put("totalPages", results.getTotalPages());
        return ResponseEntity.ok(Map.of("success", true, "data", response));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Map<String, Object>> getById(@PathVariable UUID id) {
        Appointment appointment = appointmentRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Appointment not found: " + id));
        return ResponseEntity.ok(Map.of("success", true, "data", appointment));
    }

    @GetMapping("/doctor/{doctorId}")
    public ResponseEntity<Map<String, Object>> getByDoctor(
            @PathVariable UUID doctorId,
            @RequestParam(required = false) String date,
            @RequestParam(required = false) String startDate,
            @RequestParam(required = false) String endDate) {
        List<Appointment> appointments;
        if (date != null) {
            appointments = appointmentRepository.findByDoctorIdAndAppointmentDate(doctorId, LocalDate.parse(date));
        } else if (startDate != null && endDate != null) {
            appointments = appointmentRepository.findByDoctorIdAndDateRange(doctorId, LocalDate.parse(startDate), LocalDate.parse(endDate));
        } else {
            appointments = appointmentRepository.findByDoctorIdAndAppointmentDate(doctorId, LocalDate.now());
        }
        return ResponseEntity.ok(Map.of("success", true, "data", appointments));
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<Map<String, Object>> updateStatus(
            @PathVariable UUID id,
            @RequestBody Map<String, String> body) {
        Appointment appointment = appointmentRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Appointment not found: " + id));
        String newStatus = body.get("status");
        appointment.setStatus(Appointment.AppointmentStatus.valueOf(newStatus.toUpperCase()));
        if (body.containsKey("cancelledReason")) {
            appointment.setCancelledReason(body.get("cancelledReason"));
        }
        if (body.containsKey("doctorNotes")) {
            appointment.setDoctorNotes(body.get("doctorNotes"));
        }
        appointment = appointmentRepository.save(appointment);
        return ResponseEntity.ok(Map.of("success", true, "data", appointment, "message", "Status updated"));
    }

    @GetMapping("/patient/{patientId}/upcoming")
    public ResponseEntity<Map<String, Object>> getUpcoming(@PathVariable UUID patientId) {
        List<Appointment> appointments = appointmentRepository.findUpcomingByPatientId(patientId);
        return ResponseEntity.ok(Map.of("success", true, "data", appointments));
    }
}
