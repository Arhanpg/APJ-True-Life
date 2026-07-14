package com.apjtruelife.doctor.repository;

import com.apjtruelife.doctor.model.ClinicService;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface ClinicServiceRepository extends JpaRepository<ClinicService, UUID> {
    List<ClinicService> findByClinicIdOrderByDisplayOrder(UUID clinicId);
    List<ClinicService> findByClinicIdAndIsActiveTrueOrderByDisplayOrder(UUID clinicId);
}
