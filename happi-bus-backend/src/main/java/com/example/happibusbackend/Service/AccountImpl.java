package com.example.happibusbackend.Service;

import com.example.happibusbackend.repository.AccountRepository;
import com.example.happibusbackend.model.Account;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AccountImpl {


    @Autowired
    AccountRepository accountRepository;


    public void createAccount(Account acc){
        accountRepository.save(acc);
    }


}
