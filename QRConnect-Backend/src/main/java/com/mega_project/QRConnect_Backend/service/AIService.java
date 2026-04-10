package com.mega_project.QRConnect_Backend.service;

import com.mega_project.QRConnect_Backend.entity.Profile;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@Service
public class AIService {

    private final String AI_API_URL = "http://localhost:8000/ai/profile-summary";

    public String generateSummary(Profile profile) {

        RestTemplate restTemplate = new RestTemplate();

        Map<String, String> request = new HashMap<>();
        request.put("name", profile.getName() != null ? profile.getName() : "");
        request.put("bio", profile.getBio() != null ? profile.getBio() : "");
        request.put("profession", profile.getProfession() != null ? profile.getProfession() : "");
        request.put("github", profile.getGithub() != null ? profile.getGithub() : "");

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<Map<String, String>> entity =
                new HttpEntity<>(request, headers);

        try {
            ResponseEntity<Map> response =
                    restTemplate.postForEntity(AI_API_URL, entity, Map.class);

            // 🔥 DEBUG
            System.out.println("FULL RESPONSE: " + response);

            if (response.getBody() == null) {
                return "AI returned empty response ❌";
            }

            Object summaryObj = response.getBody().get("summary");

            if (summaryObj == null) {
                return "Summary key missing in AI response ❌";
            }

            return summaryObj.toString();

        } catch (Exception e) {
            e.printStackTrace();
            return "AI service failed: " + e.getMessage();
        }
    }
}
