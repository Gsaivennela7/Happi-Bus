package com.example.happibusbackend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.bson.types.ObjectId;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;
@Document("Bus")
@Data
public class Bus {

    @Id
    private ObjectId id;
    private int busNumber;
    private int capacity;
    private String driverName;
    private String dest;
    private String src;
    private List<Passenger> passengers = new ArrayList<Passenger>();

    public Bus(){

    }
    public Bus(int busNumber, int capacity, String driverName, String dest, String src, List<Passenger> passengers){
        this.busNumber = busNumber;
        this.capacity = capacity;
        this.driverName = driverName;
        this.dest = dest;
        this.src = src;
        this.passengers = passengers;
    }


    public String getDriverName() {
        return driverName;
    }

    public void setDriverName(String driverName) {
        this.driverName = driverName;
    }

    public String getDest() {
        return dest;
    }

    public void setDest(String dest) {
        this.dest = dest;
    }

    public String getSrc() {
        return src;
    }

    public void setSrc(String src) {
        this.src = src;
    }

    public List<Passenger> getPassengers() {
        return passengers;
    }

    public void setPassengers(List<Passenger> passengers) {
        this.passengers = passengers;
    }


    public int getCapacity() {
        return capacity;
    }

    public void setCapacity(int capacity) {
        this.capacity = capacity;
    }

    public int getBusNumber() {
        return busNumber;
    }

    public void setBusNumber(int busNumber) {
        this.busNumber = busNumber;
    }
    public void addNewPassenger(Passenger passenger){
        passengers.add(passenger);
    }

    @Override
    public String toString() {
        return "Bus{" +
                "busNumber=" + busNumber +
                ", capacity=" + capacity +
                ", driverName='" + driverName + '\'' +
                ", dest='" + dest + '\'' +
                ", src='" + src + '\'' +
                ", passengers=" + passengers +
                '}';
    }
}
