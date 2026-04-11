package com.mega_project.QRConnect_Backend.controller;

import com.mega_project.QRConnect_Backend.dtos.chat_dtos.ChatMessageDto;
import com.mega_project.QRConnect_Backend.dtos.chat_dtos.MessageResponseDto;
import com.mega_project.QRConnect_Backend.entity.Message;
import com.mega_project.QRConnect_Backend.service.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

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

    // get older chat history

    @GetMapping("/history")
    public ResponseEntity<?> getChatHistory(
            @RequestParam Long senderId,
            @RequestParam Long receiverId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size
    ) {

        return ResponseEntity.ok(
                chatService.getChatHistory(senderId, receiverId, page, size)
        );
    }
}
