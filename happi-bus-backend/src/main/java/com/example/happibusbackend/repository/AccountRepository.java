package com.example.happibusbackend.repository;

import com.example.happibusbackend.model.Account;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AccountRepository extends MongoRepository<Account,Integer> {

    public List<Account> findByUserId(int userId);
}
