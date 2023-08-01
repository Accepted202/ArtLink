package com.example.projecttest1.service;

import com.example.projecttest1.dto.ExhibitionRequestDto;
import com.example.projecttest1.entity.Exhibition;
import com.example.projecttest1.entity.Gallery;
import com.example.projecttest1.repository.ExhibitionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class ExhibitionService {

    @Autowired
    private ExhibitionRepository exhibitionRepository;
    public void registerExhibition(ExhibitionRequestDto requestDto, Gallery gallery) {
        // 검증
        Exhibition exhibition = new Exhibition();
        exhibition.setExhibitionName(requestDto.getExhibitionName());
        exhibition.setGallery(gallery);
        exhibition.setExhibitionExplanation("");
        exhibition.setCreatedAt(LocalDateTime.now());
        exhibitionRepository.save(exhibition);
    }
}
