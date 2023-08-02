package com.example.projecttest1.service;

import com.example.projecttest1.entity.User;
import com.example.projecttest1.exception.auth.UserAlreadyExistsException;
import com.example.projecttest1.exception.user.UserNotFoundException;
import com.example.projecttest1.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    private UserRepository userRepository;

    public void registerUser(User user) {
        if (userRepository.findByUsername(user.getUsername()) != null) {
            throw new UserAlreadyExistsException("User with username " + user.getUsername() + " already exists.");
        }
        if (userRepository.existsByNickname(user.getNickname())) {
            throw new UserAlreadyExistsException("User with nickname " + user.getNickname() + " already exists.");
        }
        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        userRepository.save(user);
    }

    public void saveRefreshToken(String username, String refreshToken) {
        User user = userRepository.findByUsername(username);
        if (user == null) {
            throw new UserNotFoundException(user.getUsername());
        }
        user.setRefreshToken(refreshToken);
        userRepository.save(user);
        System.out.println("Userservice : saveRefreshToken call");
    }

    public void logout(String username) {
        User user = userRepository.findByUsername(username);
        if (user == null) {
            throw new UserNotFoundException(user.getUsername());
        }
        user.setRefreshToken(null);
        userRepository.save(user);
        System.out.println("UserService : removeRefreshToken call");
    }
}
