package com.example.happibusbackend.controller;

import com.example.happibusbackend.model.Account;
import com.example.happibusbackend.model.Ticket;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/passenger")
public class PassengerController{


    @Autowired
    Account account;

    @Autowired
    Ticket ticket;



                    


}