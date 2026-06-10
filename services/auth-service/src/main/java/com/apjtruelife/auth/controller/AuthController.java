package com.apjtruelife.auth.controller;

import com.apjtruelife.auth.dto.AuthRequest;
import com.apjtruelife.auth.dto.ApiResponse;
import com.apjtruelife.auth.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    private final AuthService authService;
    public AuthController(AuthService authService) { this.authService = authService; }

    @PostMapping("/verify")
    public ResponseEntity<ApiResponse<?>> verify(@Valid @RequestBody AuthRequest req) {
        return ResponseEntity.ok(ApiResponse.ok(authService.verifyAndIssue(req.getFirebaseToken())));
    }

    @GetMapping("/me")
    public ResponseEntity<ApiResponse<?>> me(@RequestHeader("Authorization") String bearer) {
        String token = bearer.replace("Bearer ", "");
        return ResponseEntity.ok(ApiResponse.ok(authService.getCurrentUser(token)));
    }
}
