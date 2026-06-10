package com.apjtruelife.auth.config;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;

@Configuration
@Slf4j
public class FirebaseConfig {

    @Value("${app.firebase.service-account-path}")
    private String serviceAccountPath;

    @Value("${app.firebase.project-id}")
    private String projectId;

    @Bean
    public FirebaseApp firebaseApp() throws IOException {
        if (!FirebaseApp.getApps().isEmpty()) {
            return FirebaseApp.getInstance();
        }

        GoogleCredentials credentials;

        // Try loading from file path first (for production/Railway)
        try {
            InputStream serviceAccount = new FileInputStream(serviceAccountPath);
            credentials = GoogleCredentials.fromStream(serviceAccount);
            log.info("Firebase initialized from service account file: {}", serviceAccountPath);
        } catch (IOException e) {
            // Fallback to application default credentials (for CI/cloud environments)
            log.warn("Service account file not found at {}. Trying application default credentials.", serviceAccountPath);
            credentials = GoogleCredentials.getApplicationDefault();
        }

        FirebaseOptions options = FirebaseOptions.builder()
                .setCredentials(credentials)
                .setProjectId(projectId)
                .build();

        return FirebaseApp.initializeApp(options);
    }
}
