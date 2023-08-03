package com.example.projecttest1.controller;

import com.example.projecttest1.dto.GalleryManagementDto;
import com.example.projecttest1.dto.GalleryResponseDto;
import com.example.projecttest1.dto.UserDetailResponseDto;
import com.example.projecttest1.dto.UserResponseDto;
import com.example.projecttest1.entity.Gallery;
import com.example.projecttest1.entity.User;
import com.example.projecttest1.service.GalleryService;
import com.example.projecttest1.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;

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
        userService.findAll().forEach( u -> usersDto.add(
                new UserResponseDto(u.getUsername(), u.getPhoneNumber(), u.getNickname())));
        return ResponseEntity.ok(Map.of("users", usersDto));
    }

    @GetMapping("/users/{id}")
    private ResponseEntity<UserDetailResponseDto> findByIdUser(@PathVariable Integer id) {
        User user = userService.findById(id);
        UserDetailResponseDto responseDto = new UserDetailResponseDto(
                user.getUsername(), user.getPhoneNumber(), user.getNickname());
        return ResponseEntity.ok(responseDto);
    }

    @GetMapping("/galleries")
    public ResponseEntity<Map<String, List<GalleryManagementDto>>> findAllGalleries() {
        List<GalleryManagementDto> galleriesDto = new ArrayList<>();
        galleryService.findAll().forEach( g -> galleriesDto.add(new GalleryManagementDto(g.getId(), g.getUsername(), g.getGalleryName(), g.getAccepted(), g.getDescription())));
        return ResponseEntity.ok(Map.of("galleries", galleriesDto));
    }

    @GetMapping("/galleries/{id}")
    public ResponseEntity<GalleryManagementDto> findByIdGallery(@PathVariable Integer id) {
        Gallery gallery = galleryService.findById(id);
        GalleryManagementDto responseDto = new GalleryManagementDto(gallery.getId(), gallery.getUsername(), gallery.getGalleryName(), gallery.getAccepted(), gallery.getDescription());
        return ResponseEntity.ok(responseDto);
    }

    @PatchMapping("/galleries/{id}/accept")
    public ResponseEntity<GalleryManagementDto> acceptGallery(@PathVariable Integer id) {
        Gallery gallery = galleryService.acceptGallery(id);
        GalleryManagementDto responseDto = new GalleryManagementDto(gallery.getId(), gallery.getUsername(), gallery.getGalleryName(), gallery.getAccepted(), gallery.getDescription());
        return ResponseEntity.ok(responseDto);
    }


//    @PostMapping("/galleries")
//    public ResponseEntity<GalleryResponseDto> createGallery(@RequestBody Gallery gallery) {
//        System.out.println(gallery);
//        galleryService.registerGallery(gallery);
//        GalleryResponseDto dto = new GalleryResponseDto(gallery.getUsername(), gallery.getGalleryName(), gallery.getDescription());
//        return ResponseEntity.ok(dto);
//    }
}
