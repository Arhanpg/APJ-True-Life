package com.apjtruelife.media.controller;

import com.apjtruelife.media.service.SupabaseStorageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Arrays;
import java.util.List;
import java.util.Map;

/**
 * Media Controller v2 — Supabase Storage with signed URLs.
 * All buckets are PRIVATE. Every file access via signed URL.
 * SUPABASE_SERVICE_ROLE_KEY lives ONLY in this service.
 */
@RestController
@RequestMapping("/api/v1/media")
@RequiredArgsConstructor
public class MediaController {

    private final SupabaseStorageService storageService;

    private static final List<String> ALLOWED_TYPES = Arrays.asList(
            "image/jpeg", "image/png", "image/webp", "application/pdf"
    );
    private static final long MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

    /**
     * POST /api/v1/media/upload
     * Upload file to Supabase Storage (private bucket).
     */
    @PostMapping("/upload")
    public ResponseEntity<?> upload(
            @RequestParam("file") MultipartFile file,
            @RequestParam("bucket") String bucket,
            @RequestParam("path") String path) {

        if (!ALLOWED_TYPES.contains(file.getContentType())) {
            return ResponseEntity.badRequest().body(Map.of("error", "File type not allowed"));
        }
        if (file.getSize() > MAX_FILE_SIZE) {
            return ResponseEntity.badRequest().body(Map.of("error", "File too large (max 10MB)"));
        }

        try {
            String storagePath = storageService.upload(bucket, path, file);
            return ResponseEntity.ok(Map.of(
                    "success", true,
                    "path", storagePath,
                    "bucket", bucket,
                    "size", file.getSize()
            ));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(Map.of("error", e.getMessage()));
        }
    }

    /**
     * GET /api/v1/media/signed-url
     * Generate time-limited signed URL for private file access.
     */
    @GetMapping("/signed-url")
    public ResponseEntity<?> getSignedUrl(
            @RequestParam("bucket") String bucket,
            @RequestParam("path") String path) {
        try {
            String signedUrl = storageService.createSignedUrl(bucket, path);
            return ResponseEntity.ok(Map.of(
                    "success", true,
                    "signedUrl", signedUrl
            ));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(Map.of("error", e.getMessage()));
        }
    }

    /**
     * DELETE /api/v1/media
     * Remove file from Supabase Storage.
     */
    @DeleteMapping
    public ResponseEntity<?> delete(
            @RequestParam("bucket") String bucket,
            @RequestParam("path") String path) {
        try {
            storageService.delete(bucket, path);
            return ResponseEntity.ok(Map.of("success", true));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(Map.of("error", e.getMessage()));
        }
    }
}
