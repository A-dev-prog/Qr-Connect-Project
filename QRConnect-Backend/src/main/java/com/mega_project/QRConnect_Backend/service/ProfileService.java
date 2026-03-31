package com.mega_project.QRConnect_Backend.service;

import com.mega_project.QRConnect_Backend.dtos.ProfileRequestDto;
import com.mega_project.QRConnect_Backend.dtos.ProfileResponseDto;
import com.mega_project.QRConnect_Backend.entity.Profile;
import com.mega_project.QRConnect_Backend.entity.User;
import com.mega_project.QRConnect_Backend.exception.ResourceNotFoundException;
import com.mega_project.QRConnect_Backend.repository.ProfileRepository;
import com.mega_project.QRConnect_Backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;

@Service
@CrossOrigin(origins = "http://localhost:5173")
public class ProfileService  {
    @Autowired
    private  UserRepository userRepository;
    @Autowired
    private ProfileRepository profileRepository;

    public void createProfile(String email, ProfileRequestDto dto) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (profileRepository.findByUser(user).isPresent()) {
            throw new RuntimeException("Profile already exists");
        }

        Profile profile = new Profile();
        profile.setName(dto.getName());
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

    public ProfileResponseDto getProfileById(Long userId) {

        Profile profile = profileRepository
                .findByUserId(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Profile Not found"));

        ProfileResponseDto dto = new ProfileResponseDto();

        dto.setId(profile.getId());
        dto.setName(profile.getName());
        dto.setProfession(profile.getProfession());
        dto.setBio(profile.getBio());
        dto.setContactNumber(profile.getContactNumber());
        dto.setConnectionStatus("NONE");

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

        return dto;
    }

}
