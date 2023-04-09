package com.example.happibusbackend.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.happibusbackend.repository.PassengerRepository;

@Service
public class PassengerService {
    @Autowired
    private PassengerRepository passengerRepository;
    
}
