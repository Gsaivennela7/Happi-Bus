package com.example.happibusbackend.controller;

import com.example.happibusbackend.Service.AccountService;
import com.example.happibusbackend.model.Account;
import com.example.happibusbackend.repository.AccountRepository;
import com.example.happibusbackend.repository.PassengerRepository;
import com.example.happibusbackend.repository.TicketRepository;

import jakarta.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.time.LocalDateTime;
import java.util.Iterator;
import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;

import javax.crypto.spec.PBEKeySpec;

import com.example.happibusbackend.model.Passenger;
import com.example.happibusbackend.model.Ticket;

/**
 *
 */
@RestController
@CrossOrigin(origins = {"http://localhost:19006"})
@RequestMapping("/account")
public class AccountController {

    @Autowired
    AccountService accImpl;

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private TicketRepository ticketRepository;

    @Autowired
    private PassengerRepository passengerRepository;

    private static AtomicInteger ID_GENERATOR = new AtomicInteger(1000);


    @GetMapping("/getAllAccounts")
    public ResponseEntity<List<Account>> getAllAccounts() {
        return new ResponseEntity<List<Account>>(accountRepository.findAll(), HttpStatus.OK);
    }
    @PostMapping("/addAccount")
    public ResponseEntity<?> addAccount(@RequestParam("file")MultipartFile file, @RequestParam String firstName, @RequestParam String email,
                                        @RequestParam String lastName,@RequestParam String password,@RequestParam int Id
                                        ) throws IOException, IOException{

        Account acc = new Account();
        acc.setPassword(password);
        acc.setFirstName(firstName);
        acc.setLastName(lastName);
        acc.setEmail(email);
        return new ResponseEntity<>(accImpl.createAccount(acc,file), HttpStatus.OK);

    }
    private static String convertByteArrayToHexString(byte[] arrayBytes) {
        StringBuffer stringBuffer = new StringBuffer();
        for (int i = 0; i < arrayBytes.length; i++) {
            stringBuffer.append(Integer.toString((arrayBytes[i] & 0xff) + 0x100, 16)
                    .substring(1));
        }
        return stringBuffer.toString();
    }

    @PostMapping(value = "/login/")
    public Account getAccount(@RequestBody Account account, HttpSession session) throws Exception {
        String email = account.getEmail();
        String password = account.getPassword();
        Account temp = null;
        List<Account> accounts = accountRepository.findByEmail(email);
        for (Iterator<Account> iter = accounts.iterator(); iter.hasNext();) {
            Account element = iter.next();
            if (element.getPassword().equals(password)) {
                temp = element;
                try {
                    String dateAndTime = LocalDateTime.now() + "";
                    MessageDigest digest = MessageDigest.getInstance("MD5");
                    byte[] hashedBytes = digest.digest(dateAndTime.getBytes("UTF-8"));
                    String sessionId = convertByteArrayToHexString(hashedBytes);
                    temp.setSessionId(sessionId);
                    session.setAttribute(sessionId, temp);
                } catch (NoSuchAlgorithmException | UnsupportedEncodingException ex) {
                    throw new Exception("Could not generate hash from String");
                }
                break;
            }
        }
        System.out.println("Loggin in " + email);
        return temp;
    }

    @GetMapping("/logout")
    public void logout(@RequestBody Account acc) {

    }


//    @PostMapping("/upload")
//    public ResponseEntity<?> upload(@RequestParam("file")MultipartFile file) throws IOException, IOException {
//        return new ResponseEntity<>(accImpl.uploadImage(file), HttpStatus.OK);
//    }



    @PostMapping(value = "/addTicket/{accountId}")
    public Passenger checkout(@RequestBody Ticket ticket, @PathVariable String accountId, HttpSession session) throws Exception {
       
        //Create the ticket object
        int ticketId = ticket.getTicketId();
        String destination = ticket.getDestination();
        String arrival_time_eta = ticket.getArrival_time_eta();
        String departure_time = ticket.getDeparture_time();
        String busNumber = ticket.getBusNumber();
        String status = ticket.getStatus();
        int price = ticket.getPrice();

        Ticket newTicket = new Ticket(ticketId, destination, arrival_time_eta, departure_time, busNumber, status, price); 
        ticketRepository.save(newTicket);
      

        //link the ticket to passenger object then link passenger to the account 
        Account temp = new Account();
        List<Account> accounts = accountRepository.findByAcountId(Integer.parseInt(accountId));
        for (Iterator<Account> iter = accounts.iterator(); iter.hasNext();) {
            Account element = iter.next();
            if (String.valueOf(element.getAcountId()).equals(String.valueOf(accountId))){
               temp = element; break; // exit loop when the account is found
            } 
        }

        int passengerId = ID_GENERATOR.getAndIncrement();
        Passenger newPassenger = new Passenger(passengerId, temp.getAcountId(), temp.getFirstName(), temp.getLastName(), newTicket);
        passengerRepository.save(newPassenger);

        return newPassenger;
    }

}
