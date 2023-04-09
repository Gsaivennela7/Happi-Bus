package com.example.happibusbackend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.stereotype.Component;

@Document("Ticket")
@Component
public class Ticket {

    @Id
    private int ticketId;

    private int busNumber;

    private int seatNumber;

    private  String status;

    private int price;

    public Ticket(){

    }

    public Ticket(int ticketId, int busNumber, int seatNumber, String status, int price) {
        this.ticketId = ticketId;
        this.busNumber = busNumber;
        this.seatNumber = seatNumber;
        this.status = status;
        this.price = price;
    }

    public int getTicketId() {
        return ticketId;
    }

    public void setTicketId(int ticketId) {
        this.ticketId = ticketId;
    }

    public int getBusNumber() {
        return busNumber;
    }

    public void setBusNumber(int busNumber) {
        this.busNumber = busNumber;
    }

    public int getSeatNumber() {
        return seatNumber;
    }

    public void setSeatNumber(int seatNumber) {
        this.seatNumber = seatNumber;
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
}
