package com.example.happibusbackend.model;

import lombok.Data;
import org.bson.types.Binary;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.stereotype.Component;

@Document("Account")
@Data
public class Account {

    @Id
    private ObjectId objectId;
    private int accountId;
    private String password;
    private String email;
    private String sessionId;
    private String firstName;
    private String lastName;




    private Photo photo;

    public Photo getPhoto() {
        return photo;
    }

    public void setPhoto(Photo photo) {
        this.photo = photo;
    }

    public Account(){

    }
    //Use to Create New Account 
    public Account(int accountId, String email, String password, String firstName, String lastName) {
        this.accountId = accountId;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
    }
    //Use to Link Account to Passenger
    public Account(int accountId, String password, String firstName, String lastName) {
        this.accountId = accountId;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
    }

    public String getEmail() {
        return this.email;
    }


    public int getaccountId() {
        return this.accountId;
    }

    public void setAccountId(int accountId) {
        this.accountId = accountId;
    }

    public String getPassword() {
        return this.password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getFirstName() {
        return this.firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return this.lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }



    @Override
    public String toString() {
        return "{" +
                " userId='" + getaccountId() + "'" +
                ", password='" + getPassword() + "'" +
                ", firstName='" + getFirstName() + "'" +
                ", lastName='" + getLastName() + "'" +
                "}";
    }



}
