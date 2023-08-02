package com.example.projecttest1.entity;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;

@Entity
@Getter
@NoArgsConstructor
public class User implements Principal{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotNull
    private String username;

    @Setter
    @NotNull
    private String password;


    private Long phoneNumber;

    @Setter
    private String nickname;

    @Setter
    private String profilePictureUrl;

//    private String provider;
//    private String providerId;

    @Setter
    private String refreshToken;

    public User(String username, String password, Long phoneNumber) {
        this.username = username;
        this.password = password;
        this.phoneNumber = phoneNumber;
    }
    @Override
    public String getRole() {
        return "ROLE_USER";
    }
}
