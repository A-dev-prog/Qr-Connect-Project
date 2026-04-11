package com.mega_project.QRConnect_Backend.repository;

import com.mega_project.QRConnect_Backend.entity.Notification;
import com.mega_project.QRConnect_Backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface NotificationRepository extends JpaRepository<Notification,Long> {

    List<Notification> findByReceiverIdOrderByCreatedAtDesc(Long receiverId);
}
