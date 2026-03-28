package com.mega_project.QRConnect_Backend.dtos.user_dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserProfileResponseDto {

    private Long id;
    private String name;
    private String bio;
    private String contactNumber;
    private String qrToken;
    private String email;

    // private fields (nullable if not connected)
    private String facebook;
    private String instagram;
    private String linkedin;
    private String github;
    private String twitter;
}
