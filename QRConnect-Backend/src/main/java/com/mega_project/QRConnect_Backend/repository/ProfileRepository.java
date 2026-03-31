package com.mega_project.QRConnect_Backend.repository;

import com.mega_project.QRConnect_Backend.entity.Profile;
import com.mega_project.QRConnect_Backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface ProfileRepository extends JpaRepository<Profile,Long> {

    Optional<Profile> findByUser(User user);

    Optional<Profile> findByUserId(Long userId);


}
