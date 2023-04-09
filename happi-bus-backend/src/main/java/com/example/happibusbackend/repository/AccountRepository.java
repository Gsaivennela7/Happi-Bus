package com.example.happibusbackend.repository;

import com.example.happibusbackend.model.Account;
import org.bson.types.ObjectId;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AccountRepository extends MongoRepository<Account, ObjectId> {

    public List<Account> findByUserId(int userId);
}
