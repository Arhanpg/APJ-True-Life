package com.apjtruelife.treatment.repository;

import com.apjtruelife.treatment.model.TreatmentPlan;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface TreatmentPlanRepository extends JpaRepository<TreatmentPlan, UUID> {
    Page<TreatmentPlan> findByPatientId(UUID patientId, Pageable pageable);
    Page<TreatmentPlan> findByDoctorId(UUID doctorId, Pageable pageable);
    List<TreatmentPlan> findByPatientIdAndStatus(UUID patientId, TreatmentPlan.TreatmentStatus status);
    Page<TreatmentPlan> findByDoctorIdAndStatus(UUID doctorId, TreatmentPlan.TreatmentStatus status, Pageable pageable);
}
