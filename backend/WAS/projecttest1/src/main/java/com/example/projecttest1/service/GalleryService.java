package com.example.projecttest1.service;

import com.example.projecttest1.entity.Gallery;
import com.example.projecttest1.exception.auth.UserAlreadyExistsException;
import com.example.projecttest1.repository.GalleryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class GalleryService {

    @Autowired
    private GalleryRepository galleryRepository;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    public void registerGallery(Gallery gallery) {
        if (galleryRepository.findByUsername(gallery.getUsername()) != null) {
            throw new UserAlreadyExistsException("Gallery with gallery id " + gallery.getUsername() + " already exists.");
        }
        if (galleryRepository.existsByGalleryName(gallery.getGalleryName())) {
            throw new UserAlreadyExistsException("Gallery with gallery name " + gallery.getGalleryName() + " already exists.");
        }
        gallery.setPassword(bCryptPasswordEncoder.encode(gallery.getPassword()));
        galleryRepository.save(gallery);
    }

    public Gallery findByUsername(String username) {
        return galleryRepository.findByUsername(username);
    }

}
