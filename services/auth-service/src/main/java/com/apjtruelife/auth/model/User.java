package com.apjtruelife.auth.model;

import jakarta.persistence.*;
import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "users", schema = "auth")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "firebase_uid", nullable = false, unique = true)
    private String firebaseUid;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private UserRole role;

    @Column(name = "phone_number", unique = true)
    private String phoneNumber;

    @Column(unique = true)
    private String email;

    @Column(name = "is_active", nullable = false)
    private boolean active = true;

    @Column(name = "last_login_at")
    private Instant lastLoginAt;

    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt = Instant.now();

    @Column(name = "updated_at", nullable = false)
    private Instant updatedAt = Instant.now();

    public enum UserRole { PATIENT, DOCTOR, ADMIN }

    // Getters & Setters
    public UUID getId() { return id; }
    public String getFirebaseUid() { return firebaseUid; }
    public void setFirebaseUid(String v) { firebaseUid = v; }
    public UserRole getRole() { return role; }
    public void setRole(UserRole v) { role = v; }
    public String getPhoneNumber() { return phoneNumber; }
    public void setPhoneNumber(String v) { phoneNumber = v; }
    public String getEmail() { return email; }
    public void setEmail(String v) { email = v; }
    public boolean isActive() { return active; }
    public void setActive(boolean v) { active = v; }
    public Instant getLastLoginAt() { return lastLoginAt; }
    public void setLastLoginAt(Instant v) { lastLoginAt = v; }
    public Instant getCreatedAt() { return createdAt; }
    public Instant getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(Instant v) { updatedAt = v; }
}
