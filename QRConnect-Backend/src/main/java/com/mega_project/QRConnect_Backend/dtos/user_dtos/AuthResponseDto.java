package com.mega_project.QRConnect_Backend.dtos.user_dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class AuthResponseDto {

    private String token;
    private Long id;


    public AuthResponseDto(String token) {
    }
}
