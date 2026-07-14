package com.apjtruelife.treatment.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.OffsetDateTime;
import java.util.UUID;

@Entity
@Table(name = "phase_medicines", schema = "treatments")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class PhaseMedicine {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "phase_id", nullable = false)
    private UUID phaseId;

    @Column(name = "medicine_name", nullable = false)
    private String medicineName;

    @Column(name = "dosage", nullable = false, length = 100)
    private String dosage;

    @Column(name = "frequency", nullable = false, length = 100)
    private String frequency;

    @Column(name = "timing", length = 100)
    private String timing;

    @Column(name = "route", length = 50)
    private String route;

    @Column(name = "instructions")
    private String instructions;

    @Column(name = "display_order")
    @Builder.Default
    private Integer displayOrder = 0;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private OffsetDateTime createdAt;
}
