package com.mega_project.QRConnect_Backend.controller;

import com.mega_project.QRConnect_Backend.dtos.user_dtos.AuthResponseDto;
import com.mega_project.QRConnect_Backend.dtos.user_dtos.UserLoginRequestDto;
import com.mega_project.QRConnect_Backend.dtos.user_dtos.UserRegisterRequestDto;
import com.mega_project.QRConnect_Backend.entity.User;
import com.mega_project.QRConnect_Backend.jwt_authentication.JwtService;
import com.mega_project.QRConnect_Backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private  UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private JwtService jwtService;

    @PostMapping("/register")
    public ResponseEntity<AuthResponseDto> register(
            @RequestBody UserRegisterRequestDto request) {

        User user = new User();
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        userRepository.save(user);

        UserDetails userDetails =
                new org.springframework.security.core.userdetails.User(
                        user.getEmail(),
                        user.getPassword(),
                        List.of(new SimpleGrantedAuthority("ROLE_USER"))
                );

        String token = jwtService.generateToken(userDetails);

        return ResponseEntity.ok(new AuthResponseDto(token));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponseDto> login(
            @RequestBody UserLoginRequestDto request) {

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        UserDetails userDetails =
                new org.springframework.security.core.userdetails.User(
                        request.getEmail(),
                        "",
                        List.of(new SimpleGrantedAuthority("ROLE_USER"))
                );

        String token = jwtService.generateToken(userDetails);

        return ResponseEntity.ok(new AuthResponseDto(token));
    }

}
