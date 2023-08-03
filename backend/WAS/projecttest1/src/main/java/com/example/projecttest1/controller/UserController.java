package com.example.projecttest1.controller;

import com.example.projecttest1.dto.UserKeyResponseDto;
import com.example.projecttest1.dto.UserResponseDto;
import com.example.projecttest1.dto.UserUpdateDto;
import com.example.projecttest1.entity.User;
import com.example.projecttest1.entity.UserKey;
import com.example.projecttest1.exception.user.UserAuthorizationException;
import com.example.projecttest1.repository.UserKeyRepository;
import com.example.projecttest1.repository.UserRepository;
import com.example.projecttest1.service.ImageService;
import com.example.projecttest1.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private ImageService imageService;

    @Autowired
    private UserKeyRepository userKeyRepository;

    @GetMapping("/me")
    public ResponseEntity<UserResponseDto> me(HttpServletRequest request) {
        String username = (String) request.getAttribute("username");
        User user = userRepository.findByUsername(username);
        return ResponseEntity.ok(new UserResponseDto(user.getUsername(), user.getPhoneNumber(), user.getNickname()));
    }

    @PutMapping("/me")
    public ResponseEntity<UserResponseDto> updateMe(@RequestBody UserUpdateDto userUpdateDto, HttpServletRequest request) {
        String username = (String) request.getAttribute("username");
        if (!userUpdateDto.getUsername().equals(username)) {
            throw new UserAuthorizationException("권한없음");
        }
        User user = userService.updateUser(userUpdateDto);
        return ResponseEntity.ok(new UserResponseDto(user.getUsername(), user.getPhoneNumber(), user.getNickname()));
    }

    @PutMapping("/me/profile-picture")
    public ResponseEntity<?> uploadProfilePicture(HttpServletRequest request, @RequestParam("file") MultipartFile file) throws IOException {
        // 유저 찾기
        String username = (String) request.getAttribute("username");
        User user = userRepository.findByUsername(username);

        // 파일 저장
        String imagePath = imageService.saveImage(file, username);

        // 유저 레코드 업데이트
        user.setProfilePictureUrl(imagePath);
        userRepository.save(user);

        // 응답 반환
        return ResponseEntity.ok().build();
    }

    @GetMapping("/me/profile-picture")
    public ResponseEntity<byte[]> getProfilePicture(HttpServletRequest request) throws IOException {
        // 유저 찾기
        User user = userRepository.findByUsername((String) request.getAttribute("username"));

        // 이미지 파일을 byte 배열로 읽기
        byte[] imageBytes = imageService.loadImage(user.getUsername() + File.separator + user.getProfilePictureUrl());

        // 헤더 설정
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.IMAGE_JPEG);

        // 이미지 반환
        return new ResponseEntity<>(imageBytes, headers, HttpStatus.OK);
    }

    //TODO: User UserKey 반환
    @GetMapping("/me/userkeys")
    public ResponseEntity getUserKeys(HttpServletRequest request){
        try{
            //유저 찾기...?
            User user = userRepository.findByUsername((String) request.getAttribute("username"));

            //유저 키 찾기
            List<UserKey> userKeys = userKeyRepository.findByUser(user);
            List<UserKeyResponseDto> ResponseDtoList = new ArrayList<UserKeyResponseDto>();
            for(UserKey userKey : userKeys){
                ResponseDtoList.add(new UserKeyResponseDto(userKey.getHashKey(),
                        userKey.getExhibition().getExhibitionName(),
                        userKey.getExhibition().getGallery().getGalleryName(),
                        userKey.getVisitDate()
                ));
            }
            return new ResponseEntity<List<UserKeyResponseDto>>(ResponseDtoList, HttpStatus.OK);
        } catch (Exception e){
            e.printStackTrace();
            throw e;
        }

    }
}
