package com.mega_project.QRConnect_Backend.controller;

import com.mega_project.QRConnect_Backend.entity.Notification;
import com.mega_project.QRConnect_Backend.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
public class NotificationController {

    @Autowired
    private NotificationService notificationService;

    @GetMapping("/{userId}")
    public List<Notification> getNotifications(@PathVariable Long userId) {
        return notificationService.getUserNotifications(userId);
    }

    @PutMapping("/read/{id}")
    public void markAsRead(@PathVariable Long id) {
        notificationService.markAsRead(id);
    }
}
