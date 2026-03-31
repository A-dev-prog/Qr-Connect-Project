package com.mega_project.QRConnect_Backend.controller;

import com.mega_project.QRConnect_Backend.dtos.connection_dto.SendConnectionRequestDto;
import com.mega_project.QRConnect_Backend.entity.Connection;
import com.mega_project.QRConnect_Backend.entity.User;
import com.mega_project.QRConnect_Backend.repository.ConnectionRepository;
import com.mega_project.QRConnect_Backend.service.ConnectionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/connections")
public class ConnectionController {

    @Autowired
    private ConnectionService connectionService;
    @Autowired
    private ConnectionRepository connectionRepository;

    @PostMapping("/send")
    public ResponseEntity<?> sendRequest(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestBody SendConnectionRequestDto dto) {

        connectionService.sendRequest(userDetails.getUsername(), dto.getReceiverId());
        return ResponseEntity.ok("Request sent");
    }

    @PostMapping("/respond/{id}")
    public ResponseEntity<?> respond(
            @PathVariable Long id,
            @RequestParam boolean accept) {

        connectionService.respondToRequest(id, accept);
        return ResponseEntity.ok("Updated");
    }

    @GetMapping("/pending")
    public ResponseEntity<?> getPendingRequests(
            @AuthenticationPrincipal UserDetails userDetails) {

        return ResponseEntity.ok(
                connectionService.getPendingRequests(userDetails.getUsername())
        );
    }

//    @GetMapping("/my")
//    public List<User> getMyConnections(User user) {
//
//        List<Connection> connections =
//                connectionRepository.findAcceptedConnections(user);
//
//        return connections.stream()
//                .map(c -> c.getSender().equals(user) ? c.getReceiver() : c.getSender())
//                .toList();
//    }

    @GetMapping("/my-connections")
    public ResponseEntity<?> getMyConnections(
            @AuthenticationPrincipal UserDetails userDetails) {

        return ResponseEntity.ok(
                connectionService.getMyConnections(userDetails.getUsername())
        );
    }

}
