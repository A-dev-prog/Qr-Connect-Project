package com.mega_project.QRConnect_Backend.controller;

import com.mega_project.QRConnect_Backend.dtos.ProfileRequestDto;
import com.mega_project.QRConnect_Backend.dtos.ProfileResponseDto;
import com.mega_project.QRConnect_Backend.dtos.user_dtos.UserProfileResponseDto;
import com.mega_project.QRConnect_Backend.service.ProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/profile")
public class ProfileController {

    @Autowired
    private ProfileService profileService;

    @PostMapping("/create")
    public ResponseEntity<?> createProfile(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestBody ProfileRequestDto dto) {

        profileService.createProfile(userDetails.getUsername(), dto);
        return ResponseEntity.ok("Profile created");
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
            @PathVariable Long id) {

        return ResponseEntity.ok(
                profileService.getProfileById(id)
        );
    }


}
