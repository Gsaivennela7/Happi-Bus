package com.example.happibusbackend.controller;

import com.example.happibusbackend.Service.AccountService;
import com.example.happibusbackend.model.Account;
import com.example.happibusbackend.repository.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

/**
 *
 */
@RestController
@CrossOrigin("*")
@RequestMapping("/account")
public class AccountController {


    @Autowired
    AccountService accImpl;

    @PostMapping("/addAccount")
    public void addAccount(@RequestBody Account acc){
        accImpl.createAccount(acc);

    }

//   @PostMapping(value = "/image", produces = {MediaType.IMAGE_PNG_VALUE, "application.json"})
//  public ResponseEntity<?> upload(@RequestParam("imageFile") MultipartFile file){
//
//       return new ResponseEntity<>(accImpl.uploadImage(file), HttpStatus.CREATED);
////    }

    @PostMapping("/upload")
    public ResponseEntity<?> upload(@RequestParam("file")MultipartFile file) throws IOException, IOException {
        return new ResponseEntity<>(accImpl.uploadImage(file), HttpStatus.OK);
    }

}
