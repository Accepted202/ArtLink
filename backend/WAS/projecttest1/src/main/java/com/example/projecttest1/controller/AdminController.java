package com.example.projecttest1.controller;

import com.example.projecttest1.dto.GalleryResponseDto;
import com.example.projecttest1.entity.Gallery;
import com.example.projecttest1.service.GalleryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private GalleryService galleryService;

    @PostMapping("/galleries")
    public ResponseEntity<GalleryResponseDto> createGallery(@RequestBody Gallery gallery) {
        System.out.println(gallery);
//        galleryService.registerGallery(gallery);
        GalleryResponseDto dto = new GalleryResponseDto(gallery.getUsername(), gallery.getGalleryName(), gallery.getDescription());
        return ResponseEntity.ok(dto);
    }
}
