package com.mega_project.QRConnect_Backend.service;

import com.mega_project.QRConnect_Backend.dtos.ProfileResponseDto;
import com.mega_project.QRConnect_Backend.dtos.connection_dto.ConnectionDto;
import com.mega_project.QRConnect_Backend.dtos.connection_dto.PendingRequestDto;
import com.mega_project.QRConnect_Backend.dtos.previev_dto.ScanFullResponse;
import com.mega_project.QRConnect_Backend.dtos.previev_dto.ScanPreviewResponse;
import com.mega_project.QRConnect_Backend.entity.Connection;
import com.mega_project.QRConnect_Backend.entity.ConnectionStatus;
import com.mega_project.QRConnect_Backend.entity.Profile;
import com.mega_project.QRConnect_Backend.entity.User;
import com.mega_project.QRConnect_Backend.repository.ConnectionRepository;
import com.mega_project.QRConnect_Backend.repository.ProfileRepository;
import com.mega_project.QRConnect_Backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ConnectionService {

    @Autowired
    private  ConnectionRepository connectionRepository;
    @Autowired
    private  UserRepository userRepository;
    @Autowired
    private ProfileRepository profileRepository;
    @Autowired
    private NotificationService notificationService;

    public void sendRequest(String senderEmail, Long receiverId) {

        User sender = userRepository.findByEmail(senderEmail)
                .orElseThrow();

        User receiver = userRepository.findById(receiverId)
                .orElseThrow();

        Connection connection = new Connection();
        connection.setSender(sender);
        connection.setReceiver(receiver);
        connection.setStatus(ConnectionStatus.PENDING);

        connectionRepository.save(connection);
    }

    public void respondToRequest(Long connectionId, boolean accept) {

        Connection connection = connectionRepository.findById(connectionId)
                .orElseThrow();

        connection.setStatus(
                accept ? ConnectionStatus.ACCEPTED : ConnectionStatus.REJECTED
        );

        connectionRepository.save(connection);

        notificationService.sendNotification(
                connection.getReceiver().getId(), // who accepted
                connection.getSender().getId(),   // who sent request
                connection.getReceiver().getEmail() + " accepted your request 🤝",
                "CONNECTION"
        );


    }

    public List<PendingRequestDto> getPendingRequests(String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<Connection> connections =
                connectionRepository.findByReceiverAndStatus(user, ConnectionStatus.PENDING);

        return connections.stream().map(conn -> {

            Profile profile = profileRepository
                    .findByUser(conn.getSender())
                    .orElseThrow();

            PendingRequestDto dto = new PendingRequestDto();

            dto.setId(conn.getId());
            dto.setSenderId(conn.getSender().getId());
            dto.setSenderName(profile.getName());
            dto.setProfession(profile.getProfession());
            dto.setProfileImageUrl(profile.getProfileImageUrl());

            return dto;

        }).toList();
    }


    // scan logic

    public Object scanProfile(String email, Long targetUserId) {

        // 1️⃣ Get current logged-in user
        User currentUser = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // 2️⃣ Get target user
        User targetUser = userRepository.findById(targetUserId)
                .orElseThrow(() -> new RuntimeException("Target user not found"));

        // 3️⃣ Prevent self scan
        if (currentUser.getId().equals(targetUser.getId())) {
            throw new RuntimeException("You cannot scan yourself");
        }

        // 4️⃣ Get target profile
        Profile targetProfile = profileRepository
                .findByUser(targetUser)
                .orElseThrow(() -> new RuntimeException("Profile not found"));

        // 5️⃣ Check connection status
        Optional<Connection> connection =
                connectionRepository.findByUsers(currentUser, targetUser);

        if (connection.isEmpty()) {
            return buildPreviewResponse(targetProfile, "NOT_CONNECTED");
        }

        if (connection.get().getStatus() == ConnectionStatus.PENDING) {
            return buildPreviewResponse(targetProfile, "PENDING");
        }

        return buildFullProfileResponse(targetProfile, "CONNECTED");
    }

    public List<ConnectionDto> getMyConnections(String email) {

        User currentUser = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<Connection> connections =
                connectionRepository.findAcceptedConnections(currentUser);

        return connections.stream().map(conn -> {

            // 🔥 get other user
            User otherUser = conn.getSender().equals(currentUser)
                    ? conn.getReceiver()
                    : conn.getSender();

            Profile profile = profileRepository.findByUser(otherUser)
                    .orElseThrow(() -> new RuntimeException("Profile not found"));

            // 🔥 return clean DTO
            return new ConnectionDto(
                    otherUser.getId(),                     // ✅ IMPORTANT (for navigation)
                    profile.getName(),
                    profile.getProfileImageUrl(),
                    profile.getProfession(),
                    otherUser.getEmail()                   // optional but useful
            );

        }).toList();
    }

    private Object buildFullProfileResponse(Profile targetProfile, String connected) {

        ScanFullResponse response = new ScanFullResponse();

        response.setName(targetProfile.getName());
        response.setEmail(targetProfile.getUser().getEmail());
        response.setContactNumber(targetProfile.getContactNumber());
        response.setProfileImageUrl(targetProfile.getProfileImageUrl());
        response.setBio(targetProfile.getBio());
        response.setProfession(targetProfile.getProfession());

        response.setFacebook(targetProfile.getFacebook());
        response.setInstagram(targetProfile.getInstagram());
        response.setLinkedin(targetProfile.getLinkedin());
        response.setGithub(targetProfile.getGithub());
        response.setTwitter(targetProfile.getTwitter());

        response.setConnectionStatus(connected);

        return response;
    }

    private Object buildPreviewResponse(Profile targetProfile, String notConnected) {

        ScanPreviewResponse response = new ScanPreviewResponse();

        response.setName(targetProfile.getName());
        response.setEmail(targetProfile.getUser().getEmail());
        response.setContactNumber(targetProfile.getContactNumber());
        response.setProfileImageUrl(targetProfile.getProfileImageUrl());
        response.setBio(targetProfile.getBio());
        response.setProfession(targetProfile.getProfession());
        response.setConnectionStatus(notConnected);

        return response;
    }

}
