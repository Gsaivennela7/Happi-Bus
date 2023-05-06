package com.example.happibusbackend.repository;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import com.example.happibusbackend.model.Account;

import java.util.List;


@Repository
public interface AccountRepository extends MongoRepository<Account,ObjectId>{
    List<Account> findByAccountId(int accountId);
    List<Account> findByEmail(String email);
}