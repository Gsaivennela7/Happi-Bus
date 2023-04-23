package com.example.happibusbackend.repository;

import java.util.Optional;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.example.happibusbackend.model.Ticket;

@Repository
public interface TicketRepository extends MongoRepository<Ticket, ObjectId>{
    Optional<Ticket> findByTicketId(int ticketId);
}