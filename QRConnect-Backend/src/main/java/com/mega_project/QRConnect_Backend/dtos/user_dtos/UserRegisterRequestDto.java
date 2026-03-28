package com.mega_project.QRConnect_Backend.dtos.user_dtos;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserRegisterRequestDto {

    private String email;
    private String password;
}
