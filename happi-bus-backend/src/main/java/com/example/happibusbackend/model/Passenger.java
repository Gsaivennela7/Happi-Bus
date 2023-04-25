package com.example.happibusbackend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.concurrent.atomic.AtomicInteger;

import org.bson.types.ObjectId;
import lombok.Data;

@Document("Passenger")
@Data
public class Passenger {

    @Id
    private ObjectId id;
    private int passengerId;
    private int accountId;
    private String fName;
    private String lName;
    private Ticket ticket;
    
    public Passenger(int passengerId, int accountId, String fname, String lname, Ticket ticket){
        this.passengerId = passengerId;
        this.accountId = accountId;
        this.fName = fname;
        this.lName = lname;
        this.ticket = ticket;
    }
    public int getId() {
        return passengerId;
    }

    public void setId(int passengerId) {
        this.passengerId = passengerId;
    }

    public String getfName() {
        return fName;
    }

    public void setfName(String fName) {
        this.fName = fName;
    }

    public String getlName() {
        return lName;
    }

    public void setlName(String lName) {
        this.lName = lName;
    }

    public Ticket getTicket() {
        return ticket;
    }

    public void setTicket(Ticket ticket) {
        this.ticket = ticket;
    }
}
