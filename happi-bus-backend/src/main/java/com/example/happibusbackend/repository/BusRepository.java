package com.example.happibusbackend.repository;

import java.util.Optional;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.example.happibusbackend.model.Bus;

@Repository
public interface BusRepository extends MongoRepository<Bus, ObjectId>{
    Optional<Bus> findByBusNumber(int busNumber);
}
