package com.mega_project.QRConnect_Backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "profile")
public class Profile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
//    private String email;
    private String contactNumber;
    private String facebook;
    private String instagram;
    private String linkedin;
    private String github;
    private String twitter;

    private String profession;


    @Column(length = 1000)
    private String bio;

    private String profileImageUrl;

    private String qrToken;

    @OneToOne
    @JoinColumn(name = "user_id",nullable = false)
    private User user;



}
