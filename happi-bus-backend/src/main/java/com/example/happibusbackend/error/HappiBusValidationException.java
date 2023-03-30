package com.example.happibusbackend.error;

public class HappiBusValidationException extends Exception {

    public HappiBusValidationException(Exception e){

        System.out.println("Exception is "+ e.getMessage());


    }



    
}
