package com.apjtrue.gateway.filter;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseToken;
import com.google.firebase.auth.UserRecord;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.core.Ordered;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;
import reactor.core.scheduler.Schedulers;

import java.util.HashMap;
import java.util.Map;

/**
 * ClaimEnrichmentFilter — runs on every inbound request to the API Gateway.
 *
 * WHY THIS EXISTS:
 * Firebase blocking functions (beforeUserCreated/beforeUserSignedIn) that set
 * custom claims require the Firebase Blaze (pay-as-you-go) plan.
 * To stay on the free Spark plan, we instead enrich claims here:
 * When a Firebase ID Token arrives that lacks the 'role: authenticated' claim,
 * this filter uses Firebase Admin SDK to set it on the user's account,
 * then proceeds with the request. The next token refresh will carry the claim.
 *
 * FLOW:
 * 1. Extract Bearer token from Authorization header
 * 2. Verify token with Firebase Admin SDK
 * 3. If token.getClaims().get("role") == null → setCustomUserClaims(uid, {role: 'authenticated'})
 * 4. Continue filter chain — downstream services see a valid Firebase uid
 * 5. On next Flutter token refresh (FirebaseAuth.instance.currentUser.getIdToken(true)),
 *    the 'role: authenticated' claim will be present in the JWT for Supabase RLS
 *
 * NOTE: This filter only applies to PATIENT routes (iss = securetoken.google.com).
 * Doctor/Admin routes use Spring RS256 JWT and are handled by JwtValidationFilter.
 */
@Component
public class ClaimEnrichmentFilter implements GlobalFilter, Ordered {

    private static final Logger log = LoggerFactory.getLogger(ClaimEnrichmentFilter.class);
    private static final String FIREBASE_ISS_PREFIX = "https://securetoken.google.com/";
    private static final String ROLE_CLAIM = "role";
    private static final String AUTHENTICATED_ROLE = "authenticated";

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        String authHeader = exchange.getRequest().getHeaders().getFirst(HttpHeaders.AUTHORIZATION);

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return chain.filter(exchange);
        }

        String idToken = authHeader.substring(7);

        return Mono.fromCallable(() -> {
            FirebaseToken decoded = FirebaseAuth.getInstance().verifyIdToken(idToken);
            String issuer = decoded.getIssuer();

            // Only process Firebase (patient) tokens — skip Spring RS256 tokens
            if (issuer == null || !issuer.startsWith(FIREBASE_ISS_PREFIX)) {
                return decoded;
            }

            // Enrich with 'role: authenticated' claim if missing
            Object existingRole = decoded.getClaims().get(ROLE_CLAIM);
            if (existingRole == null) {
                String uid = decoded.getUid();
                Map<String, Object> claims = new HashMap<>(decoded.getClaims());
                claims.put(ROLE_CLAIM, AUTHENTICATED_ROLE);

                // Remove non-custom standard claims before calling setCustomUserClaims
                claims.remove("iss");
                claims.remove("sub");
                claims.remove("aud");
                claims.remove("iat");
                claims.remove("exp");
                claims.remove("user_id");
                claims.remove("firebase");
                claims.remove("email");
                claims.remove("email_verified");
                claims.remove("phone_number");
                claims.remove("name");
                claims.remove("picture");

                Map<String, Object> customClaims = new HashMap<>();
                customClaims.put(ROLE_CLAIM, AUTHENTICATED_ROLE);

                FirebaseAuth.getInstance().setCustomUserClaims(uid, customClaims);
                log.info("ClaimEnrichmentFilter: set role=authenticated for uid={}", uid);
            }

            return decoded;
        })
        .subscribeOn(Schedulers.boundedElastic())
        .flatMap(decoded -> {
            // Attach uid to request header for downstream services
            ServerWebExchange mutated = exchange.mutate()
                .request(r -> r.header("X-Firebase-UID", decoded.getUid())
                               .header("X-Firebase-Email", decoded.getEmail() != null ? decoded.getEmail() : "")
                )
                .build();
            return chain.filter(mutated);
        })
        .onErrorResume(e -> {
            log.warn("ClaimEnrichmentFilter: token verification failed — {}", e.getMessage());
            exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
            return exchange.getResponse().setComplete();
        });
    }

    @Override
    public int getOrder() {
        // Run before routing filters
        return -100;
    }
}
