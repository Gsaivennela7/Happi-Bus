package com.example.happibusbackend.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.happibusbackend.model.Ticket;
import com.example.happibusbackend.repository.TicketRepository;


@RestController
@CrossOrigin(origins = {"http://localhost:19006"})
@RequestMapping("/ticket")
public class TicketController {
    @Autowired
    private TicketRepository ticketRepository;

    //get all the tickets on sale
    @GetMapping("/getTicketsOnSale/")
    public List<Ticket> getAllActivity() {
        //find all the tickets in the repository
        List<Ticket> tickets = ticketRepository.findAll();
        List<Ticket> ticketsOnSale = new ArrayList<>();
        for (Ticket ticket : tickets) {
            //checks if the tickets are on sale
            if (ticket.getStatus().equals("On Sale")){
                ticketsOnSale.add(ticket);
            }
        };
        //provide the tickets without sale if there is no sale
        return (ticketsOnSale.size() <= 0) ? tickets : ticketsOnSale;
    }
}
