package com.example.happibusbackend.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.happibusbackend.repository.BusRepository;

@Service
public class BusService {
    @Autowired
    private BusRepository busRepository;
}
