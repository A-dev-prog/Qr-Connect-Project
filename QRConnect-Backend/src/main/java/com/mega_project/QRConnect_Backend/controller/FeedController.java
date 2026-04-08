package com.mega_project.QRConnect_Backend.controller;

import com.mega_project.QRConnect_Backend.dtos.ExternalPostDto;
import com.mega_project.QRConnect_Backend.dtos.PostResponseDto;
import com.mega_project.QRConnect_Backend.service.ExternalFeedService;
import com.mega_project.QRConnect_Backend.service.FeedService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/feed")
public class FeedController {

    @Autowired
    private FeedService feedService;

    @Autowired
    private ExternalFeedService externalFeedService;

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    //  TRENDING
    @GetMapping("/trending")
    public List<PostResponseDto> getTrending() {
        return feedService.getTrendingFeed();
    }

    //  LATEST
    @GetMapping("/latest")
    public List<PostResponseDto> getLatest() {
        return feedService.getLatestFeed();
    }

    //  NETWORK
    @GetMapping("/network")
    public List<PostResponseDto> getNetworkFeed(
            @RequestParam String email
    ) {
        return feedService.getNetworkFeed(email);
    }

    //  CREATE POST + REALTIME PUSH
    @PostMapping("/create")
    public PostResponseDto createPost(
            @RequestParam String email,
            @RequestParam String content
    ) {

        PostResponseDto post = feedService.createPost(email, content);

        //  REAL-TIME BROADCAST
        messagingTemplate.convertAndSend("/topic/feed", post);

        return post;
    }

    // external feeds from api

    @GetMapping("/external")
    public List<ExternalPostDto> getExternalFeed() {
        return externalFeedService.getDevToPosts();
    }
}
