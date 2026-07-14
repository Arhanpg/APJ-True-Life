package com.apjtruelife.gateway;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * APJ TRUE LIFE API Gateway v2.0
 * Single entry point for all client requests.
 *
 * Responsibilities:
 * - Dual JWT validation (Firebase for patients, RS256 for doctors/admins)
 * - Rate limiting (per-IP and per-user via Redis)
 * - CORS enforcement
 * - Request routing to downstream microservices
 */
@SpringBootApplication
public class ApiGatewayApplication {
    public static void main(String[] args) {
        SpringApplication.run(ApiGatewayApplication.class, args);
    }
}
