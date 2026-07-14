package com.apjtruelife.media.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;

import java.io.IOException;

/**
 * Supabase Storage service using REST API.
 * Uses SUPABASE_SERVICE_ROLE_KEY for private bucket operations.
 * Per spec: this key lives ONLY in media-service Railway env.
 */
@Service
@Slf4j
public class SupabaseStorageService {

    private final WebClient webClient;

    @Value("${supabase.signed-url-ttl-documents:300}")
    private int signedUrlTtlDocuments;

    @Value("${supabase.signed-url-ttl-avatars:3600}")
    private int signedUrlTtlAvatars;

    public SupabaseStorageService(
            @Value("${supabase.url}") String supabaseUrl,
            @Value("${supabase.service-role-key}") String serviceRoleKey) {

        this.webClient = WebClient.builder()
                .baseUrl(supabaseUrl + "/storage/v1")
                .defaultHeader(HttpHeaders.AUTHORIZATION, "Bearer " + serviceRoleKey)
                .defaultHeader("apikey", serviceRoleKey)
                .build();
    }

    /**
     * Upload file to a private Supabase Storage bucket.
     */
    public String upload(String bucket, String path, MultipartFile file) throws IOException {
        String fullPath = path + "/" + file.getOriginalFilename();

        webClient.post()
                .uri("/object/{bucket}/{path}", bucket, fullPath)
                .contentType(MediaType.parseMediaType(file.getContentType()))
                .body(BodyInserters.fromResource(new ByteArrayResource(file.getBytes())))
                .retrieve()
                .bodyToMono(String.class)
                .block();

        log.info("File uploaded to Supabase Storage: {}/{}", bucket, fullPath);
        return fullPath;
    }

    /**
     * Create a time-limited signed URL for private file access.
     * TTL: 5 minutes for documents, 1 hour for avatars (per spec Section 9).
     */
    public String createSignedUrl(String bucket, String path) {
        int ttl = path.contains("avatar") ? signedUrlTtlAvatars : signedUrlTtlDocuments;

        String response = webClient.post()
                .uri("/object/sign/{bucket}/{path}", bucket, path)
                .contentType(MediaType.APPLICATION_JSON)
                .bodyValue("{\"expiresIn\":" + ttl + "}")
                .retrieve()
                .bodyToMono(String.class)
                .block();

        log.info("Signed URL created for: {}/{} (TTL: {}s)", bucket, path, ttl);
        return response;
    }

    /**
     * Delete file from Supabase Storage.
     */
    public void delete(String bucket, String path) {
        webClient.delete()
                .uri("/object/{bucket}/{path}", bucket, path)
                .retrieve()
                .bodyToMono(String.class)
                .block();

        log.info("File deleted from Supabase Storage: {}/{}", bucket, path);
    }
}
