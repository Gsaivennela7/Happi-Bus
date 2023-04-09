package com.example.happibusbackend.repository;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.example.happibusbackend.model.Account;
import java.util.Optional;

@Repository
public interface AccountRepository extends MongoRepository<Account,ObjectId>{
    Optional<Account> findByUserId(int userId);
}