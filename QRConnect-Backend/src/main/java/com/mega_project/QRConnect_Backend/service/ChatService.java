package com.mega_project.QRConnect_Backend.service;

import com.mega_project.QRConnect_Backend.dtos.chat_dtos.MessageResponseDto;
import com.mega_project.QRConnect_Backend.entity.Connection;
import com.mega_project.QRConnect_Backend.entity.ConnectionStatus;
import com.mega_project.QRConnect_Backend.entity.Message;
import com.mega_project.QRConnect_Backend.entity.User;
import com.mega_project.QRConnect_Backend.exception.ResourceNotFoundException;
import com.mega_project.QRConnect_Backend.repository.ConnectionRepository;
import com.mega_project.QRConnect_Backend.repository.MessageRepository;
import com.mega_project.QRConnect_Backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;

import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class ChatService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ConnectionRepository connectionRepository;
    @Autowired
    private MessageRepository messageRepository;
    @Autowired
    private NotificationService notificationService;

    public Message sendMessage(Long senderId, Long receiverId, String content) {

        User sender = userRepository.findById(senderId).orElseThrow(()-> new ResourceNotFoundException("Sender Not found"));
        User receiver = userRepository.findById(receiverId).orElseThrow(()-> new ResourceNotFoundException("Receiver Not found"));

        // 🔥 CHECK CONNECTION
        Optional<Connection> connection =
                connectionRepository.findByUsers(sender, receiver);

        if (connection.isEmpty() ||
                connection.get().getStatus() != ConnectionStatus.ACCEPTED) {

            throw new RuntimeException("You are not connected ❌");
        }

        Message message = new Message();
        message.setSender(sender);
        message.setReceiver(receiver);
        message.setContent(content);
        message.setTimestamp(LocalDateTime.now());

       Message saved = messageRepository.save(message);

        notificationService.sendNotification(
                senderId,
                receiverId,
                sender.getEmail() + " sent you a message 💬",
                "MESSAGE"
        );

        return saved;
    }

    private boolean isConnected(User user1, User user2) {
        Optional<Connection> connection =
                connectionRepository.findByUsers(user1, user2);

        return connection.isPresent() &&
                connection.get().getStatus() == ConnectionStatus.ACCEPTED;
    }

    public List<MessageResponseDto> getChatHistory(Long user1, Long user2, int page, int size) {

        Pageable pageable = PageRequest.of(page, size);

        List<Message> messages =
                messageRepository.getChatHistory(user1, user2, pageable);

        Collections.reverse(messages);

        return messages.stream().map(m ->
                new MessageResponseDto(
                        m.getId(),
                        m.getSender().getId(),
                        m.getReceiver().getId(),
                        m.getContent(),
                        m.getTimestamp()
                )
        ).toList();
    }


}
