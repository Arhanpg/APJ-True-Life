package com.apjtruelife.patient.repository;

import com.apjtruelife.patient.model.MedicalHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface MedicalHistoryRepository extends JpaRepository<MedicalHistory, UUID> {
    List<MedicalHistory> findByPatientIdOrderByCreatedAtDesc(UUID patientId);
}
