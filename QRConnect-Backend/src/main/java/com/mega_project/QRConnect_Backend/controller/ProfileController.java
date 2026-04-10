package com.mega_project.QRConnect_Backend.controller;

import com.mega_project.QRConnect_Backend.dtos.ProfileRequestDto;
import com.mega_project.QRConnect_Backend.dtos.ProfileResponseDto;
import com.mega_project.QRConnect_Backend.service.AIService;
import com.mega_project.QRConnect_Backend.service.ProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

@RestController
@RequestMapping("/api/profile")
public class ProfileController {

    @Autowired
    private ProfileService profileService;
    @Autowired
    private AIService aiService;

    @PostMapping("/create")
    public ResponseEntity<?> createProfile(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestBody ProfileRequestDto dto) {

        profileService.createProfile(userDetails.getUsername(), dto);
        return ResponseEntity.ok("Profile created");
    }

    @PostMapping("/upload-image")
    public ResponseEntity<?> uploadProfileImage(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestParam("file") MultipartFile file) {

        profileService.uploadProfileImage(userDetails.getUsername(), file);
        return ResponseEntity.ok("Image uploaded");
    }

    @GetMapping("/me")
    public ResponseEntity<ProfileResponseDto> getProfile(
            @AuthenticationPrincipal UserDetails userDetails) {

        ProfileResponseDto profile =
                profileService.getProfile(userDetails.getUsername());

        return ResponseEntity.ok(profile);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProfileResponseDto> getProfileById(
            @PathVariable Long id,
            @AuthenticationPrincipal UserDetails userDetails) {

        return ResponseEntity.ok(
                profileService.getProfileById(id, userDetails.getUsername())
        );
    }

    @PutMapping("/update")
    public ResponseEntity<?> updateProfile(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestBody ProfileRequestDto dto) {

        profileService.updateProfile(userDetails.getUsername(), dto);
        return ResponseEntity.ok("Profile updated");
    }

    // 🔥 GENERATE AI SUMMARY
    @PostMapping("/generate-summary/{userId}")
    public ResponseEntity<?> generateSummary(@PathVariable Long userId) {

        try {
            String summary = profileService.generateAndSaveSummary(userId);

            return ResponseEntity.ok(Map.of(
                    "success", true,
                    "summary", summary
            ));

        } catch (Exception e) {
            e.printStackTrace(); // 🔥 VERY IMPORTANT

            return ResponseEntity.status(500).body(Map.of(
                    "error", e.getMessage()
            ));
        }
    }


}
