package com.example.happibusbackend.error;

import org.springframework.stereotype.Component;

@Component
public class HappiBusValidationException extends Exception {

    public HappiBusValidationException(Exception e){

        System.out.println("Exception is "+ e.getMessage());


    }



    
}
