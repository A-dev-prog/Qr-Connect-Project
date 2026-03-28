package com.mega_project.QRConnect_Backend.dtos.user_dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class UserLoginRequestDto {

    
    private String email;
    private String password;
}
