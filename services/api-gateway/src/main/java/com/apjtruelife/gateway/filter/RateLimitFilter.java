package com.apjtruelife.gateway.filter;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.core.Ordered;
import org.springframework.core.io.buffer.DataBuffer;
import org.springframework.data.redis.core.ReactiveStringRedisTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

import java.net.InetAddress;
import java.net.InetSocketAddress;
import java.nio.charset.StandardCharsets;
import java.time.Duration;
import java.util.Optional;

/**
 * Rate limiting filter using Redis.
 * Enforces per-IP rate limits for unauthenticated requests
 * and per-user rate limits for authenticated requests.
 */
@Component
@RequiredArgsConstructor
@Slf4j
public class RateLimitFilter implements GlobalFilter, Ordered {

    private final ReactiveStringRedisTemplate redisTemplate;

    private static final int UNAUTH_LIMIT_PER_MINUTE = 60;
    private static final int AUTH_LIMIT_PER_MINUTE = 500;
    private static final Duration WINDOW = Duration.ofMinutes(1);

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        String userId = exchange.getRequest().getHeaders().getFirst("X-User-Id");
        String clientIp = getClientIp(exchange);

        String rateLimitKey;
        int limit;

        if (userId != null && !userId.isBlank()) {
            rateLimitKey = "rate:user:" + userId;
            limit = AUTH_LIMIT_PER_MINUTE;
        } else {
            rateLimitKey = "rate:ip:" + clientIp;
            limit = UNAUTH_LIMIT_PER_MINUTE;
        }

        return redisTemplate.opsForValue().increment(rateLimitKey)
                .flatMap(count -> {
                    if (count == 1) {
                        // First request in window — set expiry
                        return redisTemplate.expire(rateLimitKey, WINDOW)
                                .then(chain.filter(exchange));
                    } else if (count > limit) {
                        log.warn("Rate limit exceeded for key: {} (count: {})", rateLimitKey, count);
                        return tooManyRequests(exchange);
                    }
                    return chain.filter(exchange);
                })
                .onErrorResume(e -> {
                    // If Redis is down, allow the request (fail-open)
                    log.warn("Redis unavailable for rate limiting, allowing request", e);
                    return chain.filter(exchange);
                });
    }

    @Override
    public int getOrder() {
        return -50; // After auth filter but before routing
    }

    private String getClientIp(ServerWebExchange exchange) {
        // Check X-Forwarded-For header (Cloudflare/proxy)
        String xff = exchange.getRequest().getHeaders().getFirst("X-Forwarded-For");
        if (xff != null && !xff.isBlank()) {
            return xff.split(",")[0].trim();
        }
        return Optional.ofNullable(exchange.getRequest().getRemoteAddress())
                .map(InetSocketAddress::getAddress)
                .map(InetAddress::getHostAddress)
                .orElse("unknown");
    }

    private Mono<Void> tooManyRequests(ServerWebExchange exchange) {
        exchange.getResponse().setStatusCode(HttpStatus.TOO_MANY_REQUESTS);
        exchange.getResponse().getHeaders().setContentType(MediaType.APPLICATION_JSON);
        String body = "{\"success\":false,\"message\":\"Rate limit exceeded. Please try again later.\"}";
        DataBuffer buffer = exchange.getResponse().bufferFactory()
                .wrap(body.getBytes(StandardCharsets.UTF_8));
        return exchange.getResponse().writeWith(Mono.just(buffer));
    }
}
