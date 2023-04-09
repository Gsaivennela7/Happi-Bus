package com.example.happibusbackend.repository;

import java.util.Optional;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.example.happibusbackend.model.Passenger;

@Repository
public interface PassengerRepository extends MongoRepository<Passenger, ObjectId>{
    Optional<Passenger> findByPassengerId(int passengerId);
}