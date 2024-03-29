package com.example.happibusbackend.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.happibusbackend.model.Bus;
import com.example.happibusbackend.model.Passenger;
import com.example.happibusbackend.model.Ticket;
import com.example.happibusbackend.repository.BusRepository;
import com.example.happibusbackend.repository.PassengerRepository;
import com.example.happibusbackend.repository.TicketRepository;

@RestController
@CrossOrigin(origins = { "http://localhost:19006" })
@RequestMapping("/bus")
public class BusController {
    @Autowired
    private BusRepository busRepository;

    @Autowired
    private TicketRepository ticketRepository;

    @Autowired
    private PassengerRepository passengerRepository;

    @GetMapping(value = "/addTicketsOnSale/")
    public String addTicketsOnSale() {
        ticketRepository.save(new Ticket("Temecula", "2023-04-29 1:30pm", "San Jose", "2023-04-29 7:30pm", "1", "On Sale", 80));
        ticketRepository.save(new Ticket("San Diego", "2023-04-29 1:30pm", "San Jose", "2023-04-29 7:30pm", "2", "On Sale", 80));
        ticketRepository.save(new Ticket("Los Angeles", "2023-04-29 1:30pm", "San Jose", "2023-04-29 7:30pm", "3", "On Sale", 80));
        return "Tickets successfully added";
    }
    @GetMapping(value = "/addBusOnTerminal/")
    public String addBusOnTerminal() {
        
        List<Passenger> busTwoPassengers = new ArrayList<Passenger>(10);
        List<Passenger> busThreePassengers = new ArrayList<Passenger>(10);
        busRepository.save(new Bus(1, 10, "John Doe", "Temecula", "San Jose", busTwoPassengers));
        busRepository.save(new Bus(2, 10, "John Doe", "San Diego", "San Jose", busTwoPassengers));
        busRepository.save(new Bus(3, 10, "John Doe", "Los Angeles", "San Jose", busThreePassengers));
        return "Busses successfully added";
    }

    @GetMapping("/getAllPassengers/{busNnumber}")
    public List<Passenger> getAllPassengerTickets(@PathVariable String busNnumber) {
        List<Passenger> passengers = passengerRepository.findAll();
        List<Passenger> busPassengers = new ArrayList<>();
        for (Passenger passenger : passengers) {
            if (String.valueOf(passenger.getTicket().getBusNumber()).equals(busNnumber)) {
                busPassengers.add(passenger);
            }
        }
        ;
        return busPassengers;
    }

    @GetMapping("/deleteAllTickets/")
    public String deleteAll() {
        ticketRepository.deleteAll();
        return "Tickets successfully deleted";
    }
    @GetMapping("/deleteAllPassenger/")
    public String deleteAllPassenger() {
        passengerRepository.deleteAll();
        return "Passengers successfully deleted";
    }
    /** 
     * @return String
     */
    @GetMapping(value = "/populatePassenger/")
    public String populatePassengers() {

        return "Passengers successfully added";
    }


}
