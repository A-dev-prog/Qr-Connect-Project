package com.mega_project.QRConnect_Backend.dtos.chat_dtos;

import lombok.*;

import java.time.LocalDateTime;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class MessageResponseDto {

    private Long id;
    private Long senderId;
    private Long receiverId;
    private String content;
    private LocalDateTime timestamp;
}
