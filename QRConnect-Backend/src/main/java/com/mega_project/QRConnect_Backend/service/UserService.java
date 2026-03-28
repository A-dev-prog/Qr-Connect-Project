package com.mega_project.QRConnect_Backend.service;

import com.mega_project.QRConnect_Backend.dtos.user_dtos.UserProfileResponseDto;
import com.mega_project.QRConnect_Backend.dtos.user_dtos.UserRegisterRequestDto;
import com.mega_project.QRConnect_Backend.dtos.user_dtos.UserUpdateRequestDto;

public interface UserService {

    void register(UserRegisterRequestDto request);

    UserProfileResponseDto getProfileByQrToken(String qrToken);

    UserProfileResponseDto getOwnProfile(Long userId);

    void updateProfile(Long userId, UserUpdateRequestDto request);
}
