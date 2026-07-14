package com.apjtruelife.appointment.repository;

import com.apjtruelife.appointment.model.Appointment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, UUID> {

    Page<Appointment> findByPatientId(UUID patientId, Pageable pageable);

    Page<Appointment> findByDoctorId(UUID doctorId, Pageable pageable);

    List<Appointment> findByDoctorIdAndAppointmentDate(UUID doctorId, LocalDate date);

    @Query("SELECT a FROM Appointment a WHERE a.doctorId = :doctorId AND a.appointmentDate BETWEEN :startDate AND :endDate ORDER BY a.appointmentDate, a.startTime")
    List<Appointment> findByDoctorIdAndDateRange(UUID doctorId, LocalDate startDate, LocalDate endDate);

    @Query("SELECT a FROM Appointment a WHERE a.patientId = :patientId AND a.status IN ('PENDING', 'CONFIRMED') ORDER BY a.appointmentDate, a.startTime")
    List<Appointment> findUpcomingByPatientId(UUID patientId);
}
