package com.example.projecttest1.controller;

import com.example.projecttest1.config.auth.PrincipalDetails;
import com.example.projecttest1.dto.*;
import com.example.projecttest1.entity.ArtWork;
import com.example.projecttest1.entity.Device;
import com.example.projecttest1.entity.Exhibition;
import com.example.projecttest1.entity.Gallery;
import com.example.projecttest1.exception.django.DjangoFailedException;
import com.example.projecttest1.helper.Helper;
import com.example.projecttest1.repository.GalleryRepository;
import com.example.projecttest1.service.ArtWorkService;
import com.example.projecttest1.service.ExhibitionService;
import com.example.projecttest1.service.GalleryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.*;

@RestController
@RequestMapping("/galleries")
public class GalleryController {

    @Autowired
    private GalleryService galleryService;

    @Autowired
    private GalleryRepository galleryRepository;

    @Autowired
    private ExhibitionService exhibitionService;

    @Autowired
    private ArtWorkService artWorkService;

    @Autowired
    private Helper helper;

    @GetMapping("/me")
    public ResponseEntity<GalleryResponseDto> me(HttpServletRequest request) {
        String username = (String) request.getAttribute("username");
        Gallery gallery = galleryService.findByUsername(username);
        return ResponseEntity.ok(new GalleryResponseDto(gallery.getUsername(), gallery.getGalleryName(),
                gallery.getAccepted(), gallery.getDescription()));
    }

    @PostMapping("/me/exhibitions")
    public ResponseEntity<ExhibitionDetailResponseDto> registerExhibition(@RequestBody ExhibitionRequestDto requestDto, HttpServletRequest request) {
        String username = (String) request.getAttribute("username");
        Exhibition exhibition = exhibitionService.registerExhibition(requestDto, username);
        ExhibitionDetailResponseDto responseDto = new ExhibitionDetailResponseDto(exhibition.getId(),
                exhibition.getExhibitionName(), exhibition.getExhibitionExplanation(),
                exhibition.getPosterUrl(), exhibition.getCreatedAt());
        return ResponseEntity.ok(responseDto);
    }

    @GetMapping("/me/exhibitions")
    public ResponseEntity<Map<String, List<ExhibitionResponseDto>>> selectAllExhibitions(HttpServletRequest request, Authentication authentication) {
        System.out.println(authentication);
        String username = (String) request.getAttribute("username");
        List<Exhibition> exhibitions = exhibitionService.selectAllExhibitions(username);
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

    @PutMapping("/me/exhibitions/{id}")
    public ResponseEntity<ExhibitionDetailResponseDto> modifyExhibition(
            @RequestBody ExhibitionRequestDto requestDto, HttpServletRequest request, @PathVariable Integer id) {
        String username = (String) request.getAttribute("username");
        Exhibition exhibition = exhibitionService.modifyExhibition(requestDto, id);
        ExhibitionDetailResponseDto responseDto = new ExhibitionDetailResponseDto(exhibition.getId(),
                exhibition.getExhibitionName(), exhibition.getExhibitionExplanation(),
                exhibition.getPosterUrl(), exhibition.getCreatedAt());
        return ResponseEntity.ok(responseDto);
    }

    //TODO:갤러리 관리자 그림 조회: Done
    //GalleryArtWorkResponseDto 사용.
    @GetMapping("/me/exhibitions/{exhibitionId}/artworks")
    public ResponseEntity<?> getGalleryArtwork(HttpServletRequest request, Authentication authentication, @PathVariable Integer exhibitionId){
        try {
            Exhibition exhibition = exhibitionService.findById(exhibitionId);
            List<ArtWork> artWorkList = exhibition.getArtWorks();

            List<ArtWorkDto> galleryArtWorkList = new ArrayList<ArtWorkDto>();
            for (ArtWork artWork : artWorkList) {
                galleryArtWorkList.add(new ArtWorkDto(artWork.getName(),
                        artWork.getArtist(),
                        artWork.getXCoor(),
                        artWork.getYCoor(),
                        artWork.getExplanation(),
                        artWork.getPaintPath()));
            }
            Map<String, Object> msg = new HashMap<String, Object>();
            msg.put("DrawingList", galleryArtWorkList);
            return new ResponseEntity<Map<String, Object>>(msg, HttpStatus.OK);
        }
        catch(Exception e){
            e.printStackTrace();
            return new ResponseEntity<ErrorResponseDto>(new ErrorResponseDto("Get Drawing Failed", 400), HttpStatus.BAD_REQUEST);
        }
    }

    //TODO:갤러리 관리자 그림 추가: Done
    @PostMapping("/me/exhibitions/{exhibitionId}/artworks")
    public ResponseEntity<?> postGalleryArtwork(HttpServletRequest request, Authentication authentication, @PathVariable Integer exhibitionId,
                                                @RequestBody ArtWorkDto newArtwork) throws DjangoFailedException {
        try{
            Exhibition exhibition = exhibitionService.findById(exhibitionId);
            ArtWork artWork = artWorkService.addArtWork(newArtwork.getName(),
                    newArtwork.getArtist(),
                    newArtwork.getDescription(),
                    newArtwork.getLocationX(),
                    newArtwork.getLocationY(),
                    newArtwork.getDrawingPath(),
                    exhibition
            );

            /*
            //Send the data to Django server.
            Map<String, Object> sendMsg = new HashMap<String, Object>();
            String path = "http://localhost:8000/artwork/";
            sendMsg.put("galleryid", exhibition.getId());
            sendMsg.put("artworkid", artWork.getId());
            sendMsg.put("coorx", artWork.getXCoor());
            sendMsg.put("coory", artWork.getYCoor());

            //sendMsg
            int statuscode = helper.postSendMsg(path, sendMsg);
            if (statuscode != 200){
                throw new DjangoFailedException("Django failed to send");
            }
            */

            return new ResponseEntity<ArtWorkDto>(newArtwork, HttpStatus.OK);
        }
        /*
        catch(DjangoFailedException de){
            de.printStackTrace();
            return new ResponseEntity<ErrorResponseDto>(new ErrorResponseDto("Django failed to send", 400), HttpStatus.BAD_REQUEST);
        }
        */
        catch(Exception e){
            e.printStackTrace();
            return new ResponseEntity<ErrorResponseDto>(new ErrorResponseDto("Post Drawing Failed", 400), HttpStatus.BAD_REQUEST);
        }
    }

    //갤러리 별 관람 중 기기 띄우기
    @GetMapping("/{galleryId}/devices")
    public ResponseEntity<?> getGalleryDevices(@PathVariable Integer galleryId) throws Exception{
        try{
            Optional<Gallery> gallery = galleryRepository.findById(galleryId);
            if(gallery.get()==null){
                throw new NoSuchElementException("Could not find gallery");
            }
            List<Device> deviceList = gallery.get().getDevices();

            List<GalleryDeviceDto> response = new ArrayList<GalleryDeviceDto>();
            for(Device device: deviceList){
                response.add(new GalleryDeviceDto(device.getDeviceId(), device.getPhoneNumber()));
            }
            return new ResponseEntity<List<GalleryDeviceDto>>(response, HttpStatus.OK);

        }catch(Exception e) {
            e.printStackTrace();
            return new ResponseEntity<ErrorResponseDto>(new ErrorResponseDto(e.getMessage(), 400), HttpStatus.BAD_REQUEST);
        }
    }
}
