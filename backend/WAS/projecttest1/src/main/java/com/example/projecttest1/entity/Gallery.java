package com.example.projecttest1.entity;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor
public class Gallery implements Principal {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "gallery_pk")
    private Integer id;

    private String username; // gallery_id

    private String galleryName;

    @Setter
    private String password;

    @Setter
    private String description;

    @Setter
    private String refreshToken;

    @OneToMany(mappedBy = "gallery", cascade = CascadeType.ALL)
    private List<UserKey> userkeys;

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
