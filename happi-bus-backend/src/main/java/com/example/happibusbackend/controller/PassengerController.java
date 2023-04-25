package com.example.happibusbackend.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.example.happibusbackend.model.Passenger;
import com.example.happibusbackend.model.Ticket;
import com.example.happibusbackend.repository.PassengerRepository;
import com.example.happibusbackend.repository.TicketRepository;

@RestController
@CrossOrigin(origins = {"http://localhost:19006"})
public class PassengerController {
    @Autowired
    private PassengerRepository passengerRepository;
    @Autowired
    private TicketRepository ticketRepository;

}
