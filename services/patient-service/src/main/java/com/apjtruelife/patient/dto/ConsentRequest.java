package com.apjtruelife.patient.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ConsentRequest {

    @NotBlank(message = "Policy version is required")
    private String policyVersion;

    private boolean consentGiven;
    private boolean marketingConsent;
    private String ipAddress;
    private String userAgent;
}
