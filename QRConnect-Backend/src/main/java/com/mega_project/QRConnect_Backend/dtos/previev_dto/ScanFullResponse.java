package com.mega_project.QRConnect_Backend.dtos.previev_dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ScanFullResponse {
    private String name;
    private String email;
    private String contactNumber;
    private String profileImageUrl;
    private String bio;
    private String profession;

    private String facebook;
    private String instagram;
    private String linkedin;
    private String github;
    private String twitter;

    private String connectionStatus;
}
