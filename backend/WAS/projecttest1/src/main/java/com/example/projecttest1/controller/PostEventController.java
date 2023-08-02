package com.example.projecttest1.controller;

import com.example.projecttest1.service.PostEventService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashMap;
import java.util.Map;

@Controller
@RequestMapping("/postevents")
@RequiredArgsConstructor
public class PostEventController {

    private final PostEventService postEventService;

    @GetMapping("/{Key}")
    @ResponseBody
    public ResponseEntity getDataByKey(@PathVariable String Key){
        try{
            Map<String, Object> response = new HashMap<String, Object>();
            response = postEventService.getPostEventByUserKey(Key);
            return new ResponseEntity(response, HttpStatus.OK);
        }
        catch(Exception e){
            e.printStackTrace();
            throw e;
        }
    }


}
