package com.apjtruelife.patient.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDate;
import java.time.OffsetDateTime;
import java.util.UUID;

@Entity
@Table(name = "medical_history")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class MedicalHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "patient_id", nullable = false)
    private UUID patientId;

    @Column(name = "condition_name", nullable = false)
    private String conditionName;

    @Column(name = "description")
    private String description;

    @Column(name = "diagnosed_at")
    private LocalDate diagnosedAt;

    @Column(name = "is_current")
    @Builder.Default
    private Boolean isCurrent = true;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private OffsetDateTime createdAt;
}
