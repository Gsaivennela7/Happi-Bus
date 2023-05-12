package com.example.happibusbackend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Random;
import java.util.concurrent.atomic.AtomicInteger;

import org.bson.types.ObjectId;
import lombok.Data;

@Document("Ticket")
@Data
public class Ticket {

    @Id
    private ObjectId id;
    private int ticketId;
    private int passengerId;
    private String destination; // Added on 4/22
    private String arrival_time_eta; // Added on 4/22
    private String departure;
    private String departure_time; // Added on 4/22
    private String busNumber;
    private String status;
    private int price;
    

    private static AtomicInteger ID_GENERATOR = new AtomicInteger(1000);
    public Ticket() {

    }
    public Ticket(String destination, String arrival_time_eta, String departure, String departure_time, String busNumber, String status, int price) {
        this.destination = destination;
        this.arrival_time_eta = arrival_time_eta;
        this.departure_time = departure_time;
        this.departure = departure;
        this.busNumber = busNumber;
        this.status = status;
        this.price = price;
        this.ticketId = ID_GENERATOR.getAndIncrement();
    }
    public int getTicketId() {
        return ticketId;
    }

    public void setTicketId(int ticketId) {
        this.ticketId = ticketId;
    }

    public String getBusNumber() {
        return busNumber;
    }

    public void setBusNumber(String busNumber) {
        this.busNumber = busNumber;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    public int getPassengerId() {
        return this.passengerId;
    }

    public void setPassengerId(int passengerId) {
        this.passengerId = passengerId;
    }
}