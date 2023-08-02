package com.example.projecttest1.service;

import com.example.projecttest1.entity.ArtWork;
import com.example.projecttest1.repository.ArtWorkRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ArtWorkService {

    @Autowired
    private ArtWorkRepository artWorkRepository;
    public void addArtWork(String name, String artist, String explanation, Long xCoor, Long yCoor, String artWorkPath){
        ArtWork artWork = new ArtWork();
        artWork.setName(name);
        artWork.setArtist(artist);
        artWork.setExplanation(explanation);
        artWork.setXCoor(xCoor);
        artWork.setYCoor(yCoor);
        artWork.setPaintPath(artWorkPath);
        artWorkRepository.save(artWork);
    }

    public void addArtWork(ArtWork artWork){
        artWorkRepository.save(artWork);
    }
}
