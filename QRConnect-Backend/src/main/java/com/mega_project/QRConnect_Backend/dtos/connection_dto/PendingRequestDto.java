package com.mega_project.QRConnect_Backend.dtos.connection_dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PendingRequestDto {

    private Long id;
    private Long senderId;
    private String senderName;
    private String profession;
    private String profileImageUrl;


}
