package com.example.projecttest1.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.*;
@Getter
@Setter
@Entity
@NoArgsConstructor
public class UserKey {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "userkey_pk")
    private Long id;

    private String hashKey;

    @Column
    @OneToMany(mappedBy = "userKey", cascade = CascadeType.ALL)
    private List<PostEvent> postEvents;
}
