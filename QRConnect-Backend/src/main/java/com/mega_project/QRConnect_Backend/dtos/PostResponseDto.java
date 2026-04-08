package com.mega_project.QRConnect_Backend.dtos;

import lombok.Data;

import java.time.LocalDateTime;
@Data
public class PostResponseDto {

    private Long id;
    private String content;
    private String imageUrl;
    private String videoUrl;
    private int likes;
    private String authorName;
    private String authorImage;
    private LocalDateTime createdAt;
}
