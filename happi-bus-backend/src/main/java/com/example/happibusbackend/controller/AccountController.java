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
    public ResponseEntity<?> addAccount(@RequestParam("file")MultipartFile file, @RequestParam String firstName, @RequestParam String email,
                                        @RequestParam String lastName,@RequestParam String password,@RequestParam int userId
                                        ) throws IOException, IOException{

        Account acc = new Account();
        acc.setPassword(password);
        acc.setFirstName(firstName);
        acc.setLastName(lastName);
        acc.setUserId(userId);
        acc.setEmail(email);
        return new ResponseEntity<>(accImpl.createAccount(acc,file), HttpStatus.OK);


    }

//   @PostMapping(value = "/image", produces = {MediaType.IMAGE_PNG_VALUE, "application.json"})
//  public ResponseEntity<?> upload(@RequestParam("imageFile") MultipartFile file){
//
//       return new ResponseEntity<>(accImpl.uploadImage(file), HttpStatus.CREATED);
////    }

//    @PostMapping("/upload")
//    public ResponseEntity<?> upload(@RequestParam("file")MultipartFile file) throws IOException, IOException {
//        return new ResponseEntity<>(accImpl.uploadImage(file), HttpStatus.OK);
//    }

}
