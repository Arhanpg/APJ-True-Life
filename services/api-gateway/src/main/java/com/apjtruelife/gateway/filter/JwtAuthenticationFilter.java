package com.apjtruelife.gateway.filter;

import com.apjtruelife.gateway.auth.AuthContext;
import com.apjtruelife.gateway.auth.TokenValidatorService;
import com.apjtruelife.gateway.auth.UnauthorizedException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.core.Ordered;
import org.springframework.core.io.buffer.DataBuffer;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

import java.nio.charset.StandardCharsets;
import java.util.List;

/**
 * Global JWT authentication filter for the API Gateway.
 * Validates all incoming requests except public endpoints.
 * Passes validated user context as headers to downstream services.
 */
@Component
@RequiredArgsConstructor
@Slf4j
public class JwtAuthenticationFilter implements GlobalFilter, Ordered {

    private final TokenValidatorService tokenValidatorService;

    // Endpoints that don't require authentication
    private static final List<String> PUBLIC_PATHS = List.of(
            "/api/auth/login",
            "/api/auth/refresh",
            "/actuator/health",
            "/actuator/info"
    );

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        String path = exchange.getRequest().getURI().getPath();

        // Skip auth for public paths
        if (isPublicPath(path)) {
            return chain.filter(exchange);
        }

        // Extract bearer token
        String authHeader = exchange.getRequest().getHeaders().getFirst(HttpHeaders.AUTHORIZATION);
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return unauthorized(exchange, "Missing or invalid Authorization header");
        }

        String token = authHeader.substring(7);

        try {
            AuthContext authContext = tokenValidatorService.validate(token);

            // Forward auth context as headers to downstream services
            ServerHttpRequest modifiedRequest = exchange.getRequest().mutate()
                    .header("X-User-Id", authContext.getUserId())
                    .header("X-User-Role", authContext.getRole())
                    .header("X-User-Email", authContext.getEmail() != null ? authContext.getEmail() : "")
                    .header("X-User-Name", authContext.getName() != null ? authContext.getName() : "")
                    .header("X-Token-Issuer", authContext.getIssuer())
                    .build();

            return chain.filter(exchange.mutate().request(modifiedRequest).build());
        } catch (UnauthorizedException e) {
            return unauthorized(exchange, e.getMessage());
        } catch (Exception e) {
            log.error("Unexpected auth error", e);
            return unauthorized(exchange, "Authentication failed");
        }
    }

    @Override
    public int getOrder() {
        return -100; // Run before other filters
    }

    private boolean isPublicPath(String path) {
        return PUBLIC_PATHS.stream().anyMatch(path::startsWith);
    }

    private Mono<Void> unauthorized(ServerWebExchange exchange, String message) {
        exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
        exchange.getResponse().getHeaders().setContentType(MediaType.APPLICATION_JSON);
        String body = "{\"success\":false,\"message\":\"" + message + "\"}";
        DataBuffer buffer = exchange.getResponse().bufferFactory()
                .wrap(body.getBytes(StandardCharsets.UTF_8));
        return exchange.getResponse().writeWith(Mono.just(buffer));
    }
}
