package com.mega_project.QRConnect_Backend.dtos.connection_dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class ConnectionResponseDto {

    private Long connectionId;
    private Long senderId;
    private Long receiverId;
    private String status;
}
