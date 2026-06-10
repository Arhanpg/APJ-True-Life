package com.apjtruelife.patient.repository;

import com.apjtruelife.patient.model.Patient;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface PatientRepository extends JpaRepository<Patient, UUID> {

    Optional<Patient> findByUserId(UUID userId);

    Optional<Patient> findByPatientCode(String patientCode);

    boolean existsByUserId(UUID userId);

    @Query("SELECT p FROM Patient p WHERE " +
           "(:search IS NULL OR LOWER(p.fullName) LIKE LOWER(CONCAT('%', :search, '%'))) OR " +
           "(:search IS NULL OR p.patientCode LIKE CONCAT('%', :search, '%'))")
    Page<Patient> searchPatients(@Param("search") String search, Pageable pageable);

    Page<Patient> findByCreatedByDoctorId(UUID doctorId, Pageable pageable);
}
