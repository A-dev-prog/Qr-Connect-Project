package com.mega_project.QRConnect_Backend.dtos;

import lombok.Data;

@Data
public class ExternalPostDto {

    private String title;
    private String description;
    private String imageUrl;
    private String url;
    private String source;
}
