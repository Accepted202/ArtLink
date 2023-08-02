package com.example.projecttest1.repository;


import com.example.projecttest1.entity.Gallery;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GalleryRepository extends JpaRepository<Gallery, Integer> {
    Gallery findByUsername(String username);
    boolean existsByGalleryName(String galleryName);
}
