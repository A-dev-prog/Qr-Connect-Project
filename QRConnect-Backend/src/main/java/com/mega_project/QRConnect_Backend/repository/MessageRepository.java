package com.mega_project.QRConnect_Backend.repository;

import com.mega_project.QRConnect_Backend.entity.Message;
import com.mega_project.QRConnect_Backend.entity.User;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;


import java.util.List;

public interface MessageRepository extends JpaRepository<Message,Long> {

    List<Message> findBySenderAndReceiverOrReceiverAndSender(
            User sender1, User receiver1,
            User sender2, User receiver2
    );

    @Query("SELECT m FROM Message m WHERE " +
            "(m.sender.id = :user1 AND m.receiver.id = :user2) OR " +
            "(m.sender.id = :user2 AND m.receiver.id = :user1) " +
            "ORDER BY m.timestamp DESC")
    List<Message> getChatHistory(Long user1, Long user2, Pageable pageable);
}
