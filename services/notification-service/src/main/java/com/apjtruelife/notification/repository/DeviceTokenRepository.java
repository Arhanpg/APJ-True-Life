package com.apjtruelife.notification.repository;

import com.apjtruelife.notification.model.DeviceToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface DeviceTokenRepository extends JpaRepository<DeviceToken, UUID> {
    List<DeviceToken> findByUserIdAndIsActiveTrue(String userId);
    Optional<DeviceToken> findByFcmToken(String fcmToken);
    void deleteByFcmToken(String fcmToken);
}
