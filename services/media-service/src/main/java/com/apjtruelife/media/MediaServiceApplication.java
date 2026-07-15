package com.apjtruelife.media;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * APJ TRUE LIFE Media Service v2.0
 * Supabase Storage with private buckets and signed URLs.
 * SUPABASE_SERVICE_ROLE_KEY lives ONLY here (media-service Railway env).
 * Port: 8088
 */
@SpringBootApplication
public class MediaServiceApplication {
    public static void main(String[] args) {
        SpringApplication.run(MediaServiceApplication.class, args);
    }
}
