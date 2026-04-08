package com.mega_project.QRConnect_Backend.repository;

import com.mega_project.QRConnect_Backend.entity.Connection;
import com.mega_project.QRConnect_Backend.entity.ConnectionStatus;
import com.mega_project.QRConnect_Backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ConnectionRepository extends JpaRepository<Connection,Long> {

    Optional<Connection> findBySenderAndReceiverAndStatus(
            User sender,
            User receiver,
            ConnectionStatus status
    );

    List<Connection> findByReceiverAndStatus(User receiver, ConnectionStatus status);

    @Query("""
SELECT c FROM Connection c 
WHERE (c.sender = :user1 AND c.receiver = :user2)
   OR (c.sender = :user2 AND c.receiver = :user1)
""")
    Optional<Connection> findByUsers(
            @Param("user1") User user1,
            @Param("user2") User user2
    );


    @Query("""
SELECT c FROM Connection c
WHERE (c.sender = :user OR c.receiver = :user)
AND c.status = 'ACCEPTED'
""")
    List<Connection> findAcceptedConnections(User user);


    @Query("""
SELECT c FROM Connection c
WHERE (c.sender.id = :userId OR c.receiver.id = :userId)
AND c.status = 'ACCEPTED'
""")
    List<Connection> findAcceptedConnections(Long userId);


}
