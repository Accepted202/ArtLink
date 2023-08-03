package com.example.projecttest1.controller;

import com.example.projecttest1.dto.GalleryResponseDto;
import com.example.projecttest1.dto.UserResponseDto;
import com.example.projecttest1.entity.Gallery;
import com.example.projecttest1.service.GalleryService;
import com.example.projecttest1.service.UserService;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.ResponseExtractor;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private UserService userService;

    @Autowired
    private GalleryService galleryService;

    @GetMapping("/users")
    private ResponseEntity<Map<String, List<UserResponseDto>>> findAllUsers() {
        List<UserResponseDto> usersDto = new ArrayList<>();
        userService.findAll().forEach( u -> usersDto.add(new UserResponseDto(u.getUsername(), u.getNickname(), u.getPhoneNumber())));
        return ResponseEntity.ok(Map.of("users", usersDto));
    }

    @GetMapping("/galleries")
    public ResponseEntity<Map<String, List<GalleryResponseDto>>> findAllGalleries() {
        List<GalleryResponseDto> galleriesDto = new ArrayList<>();
        galleryService.findAll().forEach( g -> galleriesDto.add(new GalleryResponseDto(g.getUsername(), g.getGalleryName(), g.getDescription())));
        return ResponseEntity.ok(Map.of("galleries", galleriesDto));
    }
//    @PostMapping("/galleries")
//    public ResponseEntity<GalleryResponseDto> createGallery(@RequestBody Gallery gallery) {
//        System.out.println(gallery);
//        galleryService.registerGallery(gallery);
//        GalleryResponseDto dto = new GalleryResponseDto(gallery.getUsername(), gallery.getGalleryName(), gallery.getDescription());
//        return ResponseEntity.ok(dto);
//    }
}
