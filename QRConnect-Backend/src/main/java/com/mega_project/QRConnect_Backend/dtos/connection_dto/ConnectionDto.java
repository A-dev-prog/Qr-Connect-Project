package com.mega_project.QRConnect_Backend.dtos.connection_dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ConnectionDto {

    private Long id;
    private String name;
    private String profileImageUrl;
    private String profession;
    private String email;
}
