package com.example.projecttest1.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor
public class Exhibition {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Setter
    private String exhibitionName;

    @Setter
    private String exhibitionExplanation;

    @Setter
    private String posterUrl;

    @Setter
//    @CreatedDate
    private LocalDateTime createdAt;

    @Setter
    @ManyToOne(fetch = FetchType.LAZY)
    private Gallery gallery;

    public Exhibition(String exhibitionName, Gallery gallery) {
        this.exhibitionName = exhibitionName;
        this.gallery = gallery;
    }
}