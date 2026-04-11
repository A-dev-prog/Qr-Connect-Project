package com.mega_project.QRConnect_Backend.service;

import com.mega_project.QRConnect_Backend.entity.Notification;
import com.mega_project.QRConnect_Backend.repository.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NotificationService {

    @Autowired
    private NotificationRepository notificationRepository;

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    public void sendNotification(Long senderId, Long receiverId, String message, String type) {

        Notification notification = new Notification();
        notification.setSenderId(senderId);
        notification.setReceiverId(receiverId);
        notification.setMessage(message);
        notification.setType(type);

        Notification saved = notificationRepository.save(notification);

        // 🔥 REAL-TIME PUSH
        messagingTemplate.convertAndSend(
                "/topic/notifications/" + receiverId,
                saved
        );
    }

    public List<Notification> getUserNotifications(Long userId) {
        return notificationRepository.findByReceiverIdOrderByCreatedAtDesc(userId);
    }

    public void markAsRead(Long id) {
        Notification n = notificationRepository.findById(id).orElseThrow();
        n.setRead(true);
        notificationRepository.save(n);
    }
}

