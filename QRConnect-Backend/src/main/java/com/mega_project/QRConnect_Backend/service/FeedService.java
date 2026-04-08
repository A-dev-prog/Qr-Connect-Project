package com.mega_project.QRConnect_Backend.service;

import com.mega_project.QRConnect_Backend.dtos.PostResponseDto;
import com.mega_project.QRConnect_Backend.entity.Connection;
import com.mega_project.QRConnect_Backend.entity.Post;
import com.mega_project.QRConnect_Backend.entity.User;
import com.mega_project.QRConnect_Backend.exception.ResourceNotFoundException;
import com.mega_project.QRConnect_Backend.repository.ConnectionRepository;
import com.mega_project.QRConnect_Backend.repository.PostRepository;
import com.mega_project.QRConnect_Backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class FeedService {

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private ConnectionRepository connectionRepository;

    @Autowired
    private UserRepository userRepository;

    //  GET LATEST
    public List<PostResponseDto> getLatestFeed() {
        return postRepository.findAllByOrderByCreatedAtDesc()
                .stream()
                .map(this::mapToDto)
                .toList();
    }

    //  GET TRENDING
    public List<PostResponseDto> getTrendingFeed() {
        return postRepository.findByIsTrendingTrueOrderByCreatedAtDesc()
                .stream()
                .map(this::mapToDto)
                .toList();
    }


    //  NETWORK FEED
    public List<PostResponseDto> getNetworkFeed(String email) {

        User user = userRepository.findByEmail(email).orElseThrow(()-> new ResourceNotFoundException("User not found"));

        List<Connection> connections =
                connectionRepository.findAcceptedConnections(user.getId());

        List<User> connectedUsers = connections.stream()
                .map(conn -> conn.getSender().equals(user)
                        ? conn.getReceiver()
                        : conn.getSender())
                .toList();

        return postRepository.findByUserInOrderByCreatedAtDesc(connectedUsers)
                .stream()
                .map(this::mapToDto)
                .toList();
    }


    // create post

    public PostResponseDto createPost(String email, String content) {

        User user = userRepository.findByEmail(email).orElseThrow(()->new ResourceNotFoundException("User not found"));

        Post post = new Post();
        post.setContent(content);
        post.setUser(user);
        post.setCreatedAt(LocalDateTime.now());

        Post saved = postRepository.save(post);

        return mapToDto(saved);
    }

    private PostResponseDto mapToDto(Post post) {

        PostResponseDto dto = new PostResponseDto();

        dto.setId(post.getId());
        dto.setContent(post.getContent());
        dto.setImageUrl(post.getImageUrl());
        dto.setVideoUrl(post.getVideoUrl());
        dto.setLikes(post.getLikes());
        dto.setCreatedAt(post.getCreatedAt());

        dto.setAuthorName(post.getUser().getProfile().getName());
        dto.setAuthorImage(post.getUser().getProfile().getProfileImageUrl());

        return dto;

    }

}
