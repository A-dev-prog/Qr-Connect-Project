package com.mega_project.QRConnect_Backend.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class ProfileRequestDto {
    private String name;
    private String contactNumber;
    private String email;
    private String facebook;
    private String instagram;
    private String linkedin;
    private String github;
    private String twitter;

    private String profession;
    private String bio;

    private String profileImageUrl;

}
