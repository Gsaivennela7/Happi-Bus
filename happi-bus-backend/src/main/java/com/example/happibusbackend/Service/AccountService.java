package com.example.happibusbackend.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.happibusbackend.model.Account;
import com.example.happibusbackend.repository.AccountRepository;

import java.util.List;
import java.util.Optional;

@Service
public class AccountService {
    @Autowired
    private AccountRepository accountRepository;

    public List<Account> allGyms(){
        return accountRepository.findAll();
    }
    public void createAccount(Account acc){
        accountRepository.save(acc);
    }
}
