package com.apjtruelife.chat.repository;

import com.apjtruelife.chat.model.ChatSession;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface ChatSessionRepository extends JpaRepository<ChatSession, UUID> {
    Optional<ChatSession> findByTreatmentPlanId(UUID treatmentPlanId);
    List<ChatSession> findByPatientIdAndIsActiveTrue(UUID patientId);
    List<ChatSession> findByDoctorIdAndIsActiveTrue(UUID doctorId);
}
