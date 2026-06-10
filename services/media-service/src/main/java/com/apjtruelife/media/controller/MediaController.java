package com.apjtruelife.media.controller;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/media")
public class MediaController {

    private final Cloudinary cloudinary;

    @Value("${app.cloudinary.folder}")
    private String folder;

    public MediaController(
        @Value("${app.cloudinary.cloud-name}") String cloudName,
        @Value("${app.cloudinary.api-key}")    String apiKey,
        @Value("${app.cloudinary.api-secret}") String apiSecret
    ) {
        this.cloudinary = new Cloudinary(ObjectUtils.asMap(
            "cloud_name", cloudName,
            "api_key",    apiKey,
            "api_secret", apiSecret,
            "secure",     true
        ));
    }

    private static final List<String> ALLOWED_TYPES = Arrays.asList(
        "image/jpeg", "image/png", "image/webp", "application/pdf"
    );

    @PostMapping("/upload")
    public ResponseEntity<?> upload(@RequestParam("file") MultipartFile file) throws IOException {
        if (!ALLOWED_TYPES.contains(file.getContentType())) {
            return ResponseEntity.badRequest().body(Map.of("error", "File type not allowed"));
        }
        if (file.getSize() > 10 * 1024 * 1024) {
            return ResponseEntity.badRequest().body(Map.of("error", "File too large (max 10MB)"));
        }
        Map<?, ?> result = cloudinary.uploader().upload(
            file.getBytes(),
            ObjectUtils.asMap("folder", folder, "resource_type", "auto")
        );
        return ResponseEntity.ok(Map.of(
            "success",   true,
            "url",       result.get("secure_url"),
            "publicId",  result.get("public_id"),
            "format",    result.get("format"),
            "bytes",     result.get("bytes")
        ));
    }

    @DeleteMapping("/{publicId}")
    public ResponseEntity<?> delete(@PathVariable String publicId) throws IOException {
        cloudinary.uploader().destroy(publicId, ObjectUtils.emptyMap());
        return ResponseEntity.ok(Map.of("success", true));
    }
}
