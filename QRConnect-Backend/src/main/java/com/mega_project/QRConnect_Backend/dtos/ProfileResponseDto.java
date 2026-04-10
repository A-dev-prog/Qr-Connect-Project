package com.mega_project.QRConnect_Backend.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ProfileResponseDto {

    private Long id;
    private String name;
    private String email;
    private String contactNumber;
    private String facebook;
    private String instagram;
    private String linkedin;
    private String github;
    private String twitter;

    private String profession;
    private String bio;

    private String profileImageUrl;
    private String connectionStatus;

    private String aiSummary;
}
