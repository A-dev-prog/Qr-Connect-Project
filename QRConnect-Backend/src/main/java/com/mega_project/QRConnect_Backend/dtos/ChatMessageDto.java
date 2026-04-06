package com.mega_project.QRConnect_Backend.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ChatMessageDto {

    private Long senderId;
    private Long receiverId;
    private String content;
    private String timestamp;

}
