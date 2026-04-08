package com.mega_project.QRConnect_Backend.service;

import com.mega_project.QRConnect_Backend.dtos.ExternalPostDto;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class ExternalFeedService {

    private final String DEV_TO_API =
            "https://dev.to/api/articles?tag=technology&per_page=10";

    public List<ExternalPostDto> getDevToPosts() {

        RestTemplate restTemplate = new RestTemplate();

        try {
            // ✅ ADD HEADERS
            HttpHeaders headers = new HttpHeaders();
            headers.set("User-Agent", "Mozilla/5.0");
            headers.set("Accept", "application/json");

            HttpEntity<String> entity = new HttpEntity<>(headers);

            ResponseEntity<List<Map<String, Object>>> response =
                    restTemplate.exchange(
                            DEV_TO_API,
                            HttpMethod.GET,
                            entity,
                            new ParameterizedTypeReference<List<Map<String, Object>>>() {}
                    );

            List<Map<String, Object>> body = response.getBody();

            List<ExternalPostDto> result = new ArrayList<>();

            if (body == null) return result;

            for (Map<String, Object> item : body) {

                ExternalPostDto dto = new ExternalPostDto();

                dto.setTitle((String) item.get("title"));
                dto.setDescription((String) item.get("description"));
                dto.setImageUrl((String) item.get("cover_image"));
                dto.setUrl((String) item.get("url"));
                dto.setSource("Dev.to");

                result.add(dto);
            }

            return result;

        } catch (Exception e) {
            e.printStackTrace();
            return new ArrayList<>();
        }
    }
}