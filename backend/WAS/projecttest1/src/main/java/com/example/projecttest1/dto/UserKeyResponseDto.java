package com.example.projecttest1.dto;

import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.time.LocalDate;

@Data
@RequiredArgsConstructor
public class UserKeyResponseDto {
    private final String UserKey;
    private final String ExhibitionName;
    private final String GalleryName;
    private final LocalDate VisitDate;

}
