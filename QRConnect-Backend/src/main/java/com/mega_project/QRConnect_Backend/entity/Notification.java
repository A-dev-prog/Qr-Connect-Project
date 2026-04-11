package com.mega_project.QRConnect_Backend.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
@Entity
@Getter
@Setter
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long senderId;
    private Long receiverId;

    private String message;
    private String type; // MESSAGE, CONNECTION, LIKE

    private boolean isRead = false;

    private LocalDateTime createdAt = LocalDateTime.now();
}
