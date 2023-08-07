package com.example.projecttest1.dto;

import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
public class ArtWorkDto {
    private final Long ArtworkId;

    private final String Name;

    private final String Artist;

    private final double LocationX;

    private final double LocationY;

    private final String DrawingPath;

    private final String Description;

}
