package com.apjtruelife.treatment.repository;

import com.apjtruelife.treatment.model.PhaseMedicine;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface PhaseMedicineRepository extends JpaRepository<PhaseMedicine, UUID> {
    List<PhaseMedicine> findByPhaseIdOrderByDisplayOrder(UUID phaseId);
}
