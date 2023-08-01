package com.example.projecttest1.controller;

import com.example.projecttest1.dto.ExhibitionRequestDto;
import com.example.projecttest1.dto.GalleryResponseDto;
import com.example.projecttest1.entity.Gallery;
import com.example.projecttest1.repository.GalleryRepository;
import com.example.projecttest1.service.ExhibitionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/galleries")
public class GalleryController {

    @Autowired
    private GalleryRepository galleryRepository;
    @Autowired
    private ExhibitionService exhibitionService;

    @GetMapping("/me")
    public ResponseEntity<GalleryResponseDto> me(HttpServletRequest request) {
        String username = (String) request.getAttribute("username");
        Gallery gallery = galleryRepository.findByUsername(username);
        return ResponseEntity.ok(new GalleryResponseDto(gallery.getUsername(), gallery.getGalleryName(), gallery.getDescription()));
    }

    @PostMapping("/me/exhibitions")
    public ResponseEntity<String> registerExhibition(@RequestBody ExhibitionRequestDto requestDto, HttpServletRequest request) {
        String username = (String) request.getAttribute("username");
        Gallery gallery = galleryRepository.findByUsername(username);
        exhibitionService.registerExhibition(requestDto, gallery);
        return ResponseEntity.ok("registered");
    }

}
