package com.example.projecttest1.entity;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
@Getter
@NoArgsConstructor
public class Gallery implements Principal {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String username; // gallery_id

    private String galleryName;

    @Setter
    private String password;

    @Setter
    private String description;

    @Setter
    private String refreshToken;

    public Gallery(String username, String password, String galleryName) {
        this.username = username;
        this.galleryName = galleryName;
        this.password = password;
    }

    @Override
    public String toString() {
        return String.format(galleryName + " : " + description);
    }
    @Override
    public String getRole() {
        return "ROLE_GALLERY";
    }
}
