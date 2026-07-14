package com.apjtruelife.patient.repository;

import com.apjtruelife.patient.model.Patient;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface PatientRepository extends JpaRepository<Patient, UUID> {

    Optional<Patient> findByFirebaseUid(String firebaseUid);

    boolean existsByFirebaseUid(String firebaseUid);

    @Query("SELECT p FROM Patient p WHERE p.isDeleted = false AND " +
            "(LOWER(p.fullName) LIKE LOWER(CONCAT('%', :search, '%')) " +
            "OR LOWER(p.phone) LIKE LOWER(CONCAT('%', :search, '%')) " +
            "OR LOWER(p.patientCode) LIKE LOWER(CONCAT('%', :search, '%')))")
    Page<Patient> searchPatients(String search, Pageable pageable);

    @Query("SELECT p FROM Patient p WHERE p.isDeleted = false")
    Page<Patient> findAllActive(Pageable pageable);
}
