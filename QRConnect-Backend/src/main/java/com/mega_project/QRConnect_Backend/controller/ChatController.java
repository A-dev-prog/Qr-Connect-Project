package com.mega_project.QRConnect_Backend.controller;

import com.mega_project.QRConnect_Backend.dtos.ChatMessageDto;
import com.mega_project.QRConnect_Backend.entity.Message;
import com.mega_project.QRConnect_Backend.service.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/ws")
public class ChatController {


    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @Autowired
    private ChatService chatService;

    @MessageMapping("/chat.send")
    public void sendMessage(ChatMessageDto messageDto) {

        Message savedMessage = chatService.sendMessage(
                messageDto.getSenderId(),
                messageDto.getReceiverId(),
                messageDto.getContent()
        );

        // 🔥 CONVERT TO DTO
        ChatMessageDto response = new ChatMessageDto();
        response.setSenderId(savedMessage.getSender().getId());
        response.setReceiverId(savedMessage.getReceiver().getId());
        response.setContent(savedMessage.getContent());
        response.setTimestamp(savedMessage.getTimestamp().toString());

        // ✅ SEND TO RECEIVER (ONLY ONCE)
        messagingTemplate.convertAndSend(
                "/topic/messages/" + messageDto.getReceiverId(),
                response
        );

        // ✅ SEND TO SENDER (ONLY ONCE)
        messagingTemplate.convertAndSend(
                "/topic/messages/" + messageDto.getSenderId(),
                response
        );
    }
}
