package com.mega_project.QRConnect_Backend.controller;

import com.mega_project.QRConnect_Backend.service.ConnectionService;
import com.mega_project.QRConnect_Backend.service.QrService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/qr")
@CrossOrigin(origins = "http://localhost:5173")
public class QRController {
    @Autowired
    private QrService qrService;
    @Autowired
    private ConnectionService connectionService;

    @GetMapping("/generate")
    public ResponseEntity<byte[]> generateQr(
            @AuthenticationPrincipal UserDetails userDetails) throws Exception {

        byte[] qrImage = qrService.generateQr(userDetails.getUsername());

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=qr.png")
                .contentType(MediaType.IMAGE_PNG)
                .body(qrImage);
    }

    //scan
    @GetMapping("/scan/{userId}")
    public ResponseEntity<?> scanUser(
            @PathVariable Long userId,
            @AuthenticationPrincipal UserDetails userDetails) {

        return ResponseEntity.ok(
                connectionService.scanProfile(
                        userDetails.getUsername(),
                        userId
                )
        );
    }
}
