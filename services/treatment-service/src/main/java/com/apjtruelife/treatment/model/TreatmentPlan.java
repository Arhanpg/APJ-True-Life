package com.apjtruelife.treatment.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDate;
import java.time.OffsetDateTime;
import java.util.UUID;

@Entity
@Table(name = "treatment_plans")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class TreatmentPlan {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "patient_id", nullable = false)
    private UUID patientId;

    @Column(name = "doctor_id", nullable = false)
    private UUID doctorId;

    @Column(name = "plan_name", nullable = false)
    private String planName;

    @Column(name = "diagnosis", nullable = false, length = 500)
    private String diagnosis;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    @Builder.Default
    private TreatmentStatus status = TreatmentStatus.DRAFT;

    @Column(name = "total_phases", nullable = false)
    private Integer totalPhases;

    @Column(name = "start_date", nullable = false)
    private LocalDate startDate;

    @Column(name = "end_date")
    private LocalDate endDate;

    @Column(name = "completed_at")
    private OffsetDateTime completedAt;

    @Column(name = "clinical_notes")
    private String clinicalNotes;

    @Column(name = "dosha_assessment")
    private String doshaAssessment;

    @Column(name = "special_instructions")
    private String specialInstructions;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private OffsetDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private OffsetDateTime updatedAt;

    public enum TreatmentStatus { DRAFT, ACTIVE, COMPLETED, CANCELLED }
}
