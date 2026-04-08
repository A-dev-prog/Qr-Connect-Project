package com.mega_project.QRConnect_Backend.repository;

import com.mega_project.QRConnect_Backend.entity.Post;
import com.mega_project.QRConnect_Backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PostRepository extends JpaRepository<Post, Long> {

    //  latest posts
    List<Post> findAllByOrderByCreatedAtDesc();

    //  trending posts
    List<Post> findByIsTrendingTrueOrderByCreatedAtDesc();

    //  network posts
    List<Post> findByUserInOrderByCreatedAtDesc(List<User> users);
}
