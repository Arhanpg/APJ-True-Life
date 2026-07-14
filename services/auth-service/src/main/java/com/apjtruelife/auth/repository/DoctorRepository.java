package com.apjtruelife.auth.repository;

import com.apjtruelife.auth.model.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.OffsetDateTime;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface DoctorRepository extends JpaRepository<Doctor, UUID> {

    Optional<Doctor> findByEmail(String email);

    boolean existsByEmail(String email);

    @Modifying
    @Query("UPDATE Doctor d SET d.lastLoginAt = :loginTime WHERE d.id = :id")
    void updateLastLogin(UUID id, OffsetDateTime loginTime);
}
