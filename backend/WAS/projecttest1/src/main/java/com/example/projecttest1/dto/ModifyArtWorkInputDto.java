package com.example.projecttest1.dto;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class ModifyArtWorkInputDto {
    private final Long OldArtworkId;

    private final String Name;

    private final String Artist;

    private final double LocationX;

    private final double LocationY;

    private final String Description;

    private final MultipartFile ImageFile;
}
