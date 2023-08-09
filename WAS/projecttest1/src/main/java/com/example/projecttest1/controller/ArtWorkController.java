package com.example.projecttest1.controller;

import com.example.projecttest1.entity.ArtWork;
import com.example.projecttest1.service.ArtWorkService;
import com.example.projecttest1.service.DeviceService;
import com.example.projecttest1.service.SelectionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequiredArgsConstructor
@RequestMapping("/artWork")
public class ArtWorkController {
    private final ArtWorkService artWorkService;
    private final DeviceService deviceService;
    private final SelectionService selectionService;
    //Will be fill out in the future
    @PostMapping
    public ResponseEntity<ArtWork> addArtWork(@RequestBody ArtWork artWork){
        try{
            artWorkService.addArtWork(artWork);
            return new ResponseEntity<ArtWork>(artWork, HttpStatus.OK);
        }catch (Exception e){
            e.printStackTrace();
            throw e;
        }
    }


}
