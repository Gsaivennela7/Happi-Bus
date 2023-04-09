package com.example.happibusbackend.controller;

import com.example.happibusbackend.Service.AccountImpl;
import com.example.happibusbackend.model.Account;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

/**
 *
 */
@RestController
@RequestMapping("/account")
public class AccountController {

    @Autowired
    AccountImpl accImpl;

    @PostMapping("/addAccount")
    public void addAccount(@RequestBody Account acc){
        accImpl.createAccount(acc);
    }

//    @PostMapping(value = "/image", produces = {MediaType.IMAGE_PNG_VALUE, "application.json"})
//    public ResponseEntity<?> uploadImage(@RequestParam("imageFile") MultipartFile file,
//                                         @RequestParam("imageName") String name){
//
//        return new ResponseEntity<>(name, HttpStatus.CREATED);
//    }

}
