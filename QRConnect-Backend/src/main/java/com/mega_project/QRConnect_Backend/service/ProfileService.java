package com.mega_project.QRConnect_Backend.service;

import com.mega_project.QRConnect_Backend.dtos.ProfileRequestDto;
import com.mega_project.QRConnect_Backend.dtos.ProfileResponseDto;
import com.mega_project.QRConnect_Backend.entity.Connection;
import com.mega_project.QRConnect_Backend.entity.Profile;
import com.mega_project.QRConnect_Backend.entity.User;
import com.mega_project.QRConnect_Backend.exception.ResourceNotFoundException;
import com.mega_project.QRConnect_Backend.repository.ConnectionRepository;
import com.mega_project.QRConnect_Backend.repository.ProfileRepository;
import com.mega_project.QRConnect_Backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Optional;

@Service
@CrossOrigin(origins = "http://localhost:5173")
public class ProfileService  {
    @Autowired
    private  UserRepository userRepository;
    @Autowired
    private ProfileRepository profileRepository;
    @Autowired
    private ConnectionRepository connectionRepository;

    @Autowired
    private AIService aiService;

    public void createProfile(String email, ProfileRequestDto dto) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (profileRepository.findByUser(user).isPresent()) {
            throw new RuntimeException("Profile already exists");
        }

        Profile profile = new Profile();
        profile.setName(dto.getName());
        profile.setEmail(dto.getEmail());
        profile.setContactNumber(dto.getContactNumber());
        profile.setFacebook(dto.getFacebook());
        profile.setInstagram(dto.getInstagram());
        profile.setLinkedin(dto.getLinkedin());
        profile.setGithub(dto.getGithub());
        profile.setTwitter(dto.getTwitter());
        profile.setBio(dto.getBio());
        profile.setProfession(dto.getProfession());
        profile.setProfileImageUrl(dto.getProfileImageUrl());
        profile.setUser(user);

        profileRepository.save(profile);
    }

    // ✅ FIXED METHOD
    public ProfileResponseDto getProfile(String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Profile profile = profileRepository.findByUser(user)
                .orElseThrow(() -> new RuntimeException("Profile not found"));

        ProfileResponseDto response = new ProfileResponseDto();

        response.setName(profile.getName());
        response.setBio(profile.getBio());
        response.setEmail(profile.getEmail());
        response.setProfession(profile.getProfession());
        response.setContactNumber(profile.getContactNumber());
        response.setProfileImageUrl(profile.getProfileImageUrl());
        response.setInstagram(profile.getInstagram());
        response.setFacebook(profile.getFacebook());
        response.setLinkedin(profile.getLinkedin());
        response.setGithub(profile.getGithub());
        response.setTwitter(profile.getTwitter());

        return response;
    }

    public ProfileResponseDto getProfileById(Long userId,  String currentUserEmail) {

            User currentUser = userRepository.findByEmail(currentUserEmail)
                    .orElseThrow();

            User otherUser = userRepository.findById(userId)
                    .orElseThrow();

            Profile profile = profileRepository.findByUser(otherUser)
                    .orElseThrow();

        ProfileResponseDto dto = new ProfileResponseDto();
       dto.setId(profile.getId());
       dto.setName(profile.getName());
       dto.setProfession(profile.getProfession());
        dto.setBio(profile.getBio());
       dto.setContactNumber(profile.getContactNumber());
        dto.setEmail(otherUser.getEmail());
        dto.setProfileImageUrl(profile.getProfileImageUrl());
        dto.setInstagram(profile.getInstagram());
        dto.setLinkedin(profile.getLinkedin());
        dto.setGithub(profile.getGithub());
        dto.setTwitter(profile.getTwitter());
        dto.setFacebook(profile.getFacebook());
        dto.setAiSummary(profile.getAiSummary());
      dto.setConnectionStatus("NONE");


            // 🔥 CHECK CONNECTION
            Optional<Connection> connection = connectionRepository.findByUsers(currentUser, otherUser);

            if (connection.isPresent()) {
                dto.setConnectionStatus(connection.get().getStatus().name());
            } else {
                dto.setConnectionStatus("NONE");
            }

            return dto;

    }

    public ProfileResponseDto getProfileByUser(User user) {

        Profile profile = profileRepository.findByUser(user)
                .orElseThrow(() -> new RuntimeException("Profile not found"));

        ProfileResponseDto dto = new ProfileResponseDto();

        dto.setId(profile.getId()); // VERY IMPORTANT
        dto.setName(profile.getName());
        dto.setEmail(profile.getEmail());
        dto.setBio(profile.getBio());
        dto.setProfession(profile.getProfession());
        dto.setInstagram(profile.getInstagram());
        dto.setLinkedin(profile.getLinkedin());
        dto.setGithub(profile.getGithub());
        dto.setTwitter(profile.getTwitter());
        dto.setFacebook(profile.getFacebook());
        dto.setContactNumber(profile.getContactNumber());
        dto.setProfileImageUrl(profile.getProfileImageUrl());

        return dto;
    }

    public void uploadProfileImage(String email, MultipartFile file) {

        User user = userRepository.findByEmail(email)
                .orElseThrow();

        Profile profile = profileRepository.findByUser(user)
                .orElseThrow();

        try {
            String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();

            String uploadDir = "uploads/";
            File uploadPath = new File(uploadDir);

            if (!uploadPath.exists()) {
                uploadPath.mkdir();
            }

            Path filePath = Paths.get(uploadDir + fileName);
            Files.write(filePath, file.getBytes());

            // ✅ Save path in DB
            profile.setProfileImageUrl("http://localhost:8080/uploads/" + fileName);

            profileRepository.save(profile);

        } catch (IOException e) {
            throw new RuntimeException("Image upload failed");
        }
    }

    public void updateProfile(String email, ProfileRequestDto dto) {

        User user = userRepository.findByEmail(email)
                .orElseThrow();

        Profile profile = profileRepository.findByUser(user)
                .orElseThrow();

        // ✅ update only fields (no new object)
        profile.setName(dto.getName());
        profile.setProfileImageUrl(dto.getProfileImageUrl());
        profile.setProfession(dto.getProfession());
        profile.setBio(dto.getBio());
        profile.setEmail(dto.getEmail());
        profile.setContactNumber(dto.getContactNumber());
        profile.setInstagram(dto.getInstagram());
        profile.setFacebook(dto.getFacebook());
        profile.setTwitter(dto.getTwitter());
        profile.setLinkedin(dto.getLinkedin());
        profile.setGithub(dto.getGithub());

        profileRepository.save(profile);
    }

    // ai service: profile summary

    public String generateAndSaveSummary(Long userId) {

        Profile profile = profileRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Profile not found"));

        // 🔥 OPTIONAL: avoid regenerating
        if (profile.getAiSummary() != null && !profile.getAiSummary().isEmpty()) {
            return profile.getAiSummary();
        }

        String summary = aiService.generateSummary(profile);

        profile.setAiSummary(summary);
        profileRepository.save(profile);

        return summary;
    }
}
