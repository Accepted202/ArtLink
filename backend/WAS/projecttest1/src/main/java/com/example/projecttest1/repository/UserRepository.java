package com.example.projecttest1.repository;

import com.example.projecttest1.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer> {
    User findByUsername(String username);
    boolean existsByNickname(String Nickname);
}
