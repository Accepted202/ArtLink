package com.example.projecttest1.controller;

import com.example.projecttest1.config.auth.PrincipalDetails;
import com.example.projecttest1.dto.ExhibitionDetailResponseDto;
import com.example.projecttest1.dto.ExhibitionRequestDto;
import com.example.projecttest1.dto.ExhibitionResponseDto;
import com.example.projecttest1.dto.GalleryResponseDto;
import com.example.projecttest1.entity.Exhibition;
import com.example.projecttest1.entity.Gallery;
import com.example.projecttest1.entity.Principal;
import com.example.projecttest1.repository.GalleryRepository;
import com.example.projecttest1.service.ExhibitionService;
import com.example.projecttest1.service.GalleryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/galleries")
public class GalleryController {

    @Autowired
    private GalleryService galleryService;

    @Autowired
    private ExhibitionService exhibitionService;

    @GetMapping("/me")
    public ResponseEntity<GalleryResponseDto> me(HttpServletRequest request) {
        String username = (String) request.getAttribute("username");
        Gallery gallery = galleryService.findByUsername(username);
        return ResponseEntity.ok(new GalleryResponseDto(gallery.getUsername(), gallery.getGalleryName(), gallery.getDescription()));
    }

    @PostMapping("/me/exhibitions")
    public ResponseEntity<ExhibitionDetailResponseDto> registerExhibition(@RequestBody ExhibitionRequestDto requestDto, HttpServletRequest request) {
        String galleryName = (String) request.getAttribute("username");
        Exhibition exhibition = exhibitionService.registerExhibition(requestDto, galleryName);
        ExhibitionDetailResponseDto responseDto = new ExhibitionDetailResponseDto(exhibition.getId(),
                exhibition.getExhibitionName(), exhibition.getExhibitionExplanation(),
                exhibition.getPosterUrl(), exhibition.getCreatedAt());
        return ResponseEntity.ok(responseDto);
    }

    @GetMapping("/me/exhibitions")
    public ResponseEntity<Map<String, List<ExhibitionResponseDto>>> selectAllExhibitions(HttpServletRequest request, Authentication authentication) {
        System.out.println(authentication);
        String galleryName = (String) request.getAttribute("username");
        List<Exhibition> exhibitions = exhibitionService.selectAllExhibitions(galleryName);
        List<ExhibitionResponseDto> exhibitionResponseDtos = new ArrayList<>();
        exhibitions.forEach(exhibition -> exhibitionResponseDtos.add(new ExhibitionResponseDto(exhibition.getId(),
                exhibition.getExhibitionName(), exhibition.getExhibitionExplanation(),
                exhibition.getCreatedAt())));
        return ResponseEntity.ok(Map.of("exhibitions", exhibitionResponseDtos));
    }

    @GetMapping("/me/exhibitions/{id}")
    public ResponseEntity<ExhibitionDetailResponseDto> selectExhibition(
            HttpServletRequest request, Authentication authentication, @PathVariable Integer id) {
        System.out.println(((PrincipalDetails)authentication.getPrincipal()).getUsername());
        Exhibition exhibition = exhibitionService.findById(id);
        return ResponseEntity.ok(new ExhibitionDetailResponseDto(exhibition.getId(), exhibition.getExhibitionName(),
                exhibition.getExhibitionExplanation(), exhibition.getPosterUrl(), exhibition.getCreatedAt()));
    }

}
