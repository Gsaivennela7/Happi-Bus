package com.example.happibusbackend.controller;

import com.example.happibusbackend.Service.AccountService;
import com.example.happibusbackend.model.Account;
import com.example.happibusbackend.model.Bus;
import com.example.happibusbackend.repository.AccountRepository;
import com.example.happibusbackend.repository.BusRepository;
import com.example.happibusbackend.repository.PassengerRepository;
import com.example.happibusbackend.repository.TicketRepository;
import com.mongodb.client.MongoClients;

import jakarta.servlet.http.HttpSession;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
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
import java.util.ArrayList;
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
@CrossOrigin(origins = { "http://localhost:19006" })
@RequestMapping("/account")
public class AccountController {

    @Autowired
    AccountService accImpl;

    @Autowired
    private MongoTemplate mongoTemplate;

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private TicketRepository ticketRepository;

    @Autowired
    private PassengerRepository passengerRepository;

    @Autowired
    private BusRepository busRepository;

    private static AtomicInteger ID_GENERATOR = new AtomicInteger(1000);

    @GetMapping("/getAllAccounts")
    public ResponseEntity<List<Account>> getAllAccounts() {
        return new ResponseEntity<List<Account>>(accountRepository.findAll(), HttpStatus.OK);
    }

    @PostMapping("/uploadFile")
    public String handleFileUpload(@RequestParam("file") MultipartFile file) {

        return "Successfully uploaded file";
    }

    @PostMapping("/addAccount")
    public ResponseEntity<?> addAccount(@RequestParam("file") MultipartFile file, @RequestParam String firstName,
            @RequestParam String email,
            @RequestParam String lastName, @RequestParam String password) throws IOException, IOException {

        Account acc = new Account();

        acc.setPassword(password);
        acc.setFirstName(firstName);
        acc.setLastName(lastName);
        acc.setEmail(email);
        acc.setAccountId(ID_GENERATOR.getAndIncrement());

        System.out.println(password);
        System.out.println(firstName);
        System.out.println(lastName);
        System.out.println(email);
        System.out.println(file);

        return new ResponseEntity<>(accImpl.createAccount(acc, file), HttpStatus.OK);

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

    @GetMapping("/getAllTicket/{accountId}")
    public List<Ticket> getAllPassengerTickets(@PathVariable String accountId) {
        List<Ticket> tickets = ticketRepository.findAll();
        List<Ticket> accountTickets = new ArrayList<>();
        List<Passenger> passengers = findPassenger(Integer.parseInt(accountId));
        if (passengers.size() > 0) {
            for (Ticket ticket : tickets) {
                for (Passenger pass : passengers) {
                    if (String.valueOf(ticket.getPassengerId()).equals(String.valueOf(pass.getPassengerId()))) {
                        accountTickets.add(pass.getTicket());
                    }
                }
            }
        }

        return accountTickets;
    }

    private List<Passenger> findPassenger(int accountId) {
        List<Passenger> accountPassengers = new ArrayList<>();
        List<Passenger> passengers = passengerRepository.findAll();
        for (Passenger passenger2 : passengers) {
            if (String.valueOf(passenger2.getAccountId()).equals(String.valueOf(accountId))) {
                accountPassengers.add(passenger2);
            }
        }
        return accountPassengers;
    }
    private Ticket newTicketToPassenger(String destination, String arrival_time_eta, String departure, String departure_time, String busNumber, String status, int price, int passengerId){
        Ticket newTicket = new Ticket(destination, arrival_time_eta, departure, departure_time, busNumber, status, price);
        newTicket.setPassengerId(passengerId);
        ticketRepository.save(newTicket);
        return newTicket;
    }
    private Account findAccountForPassenger(String accountId){
         // link the ticket to passenger object then link passenger to the account
         Account temp = new Account();
         List<Account> accounts = accountRepository.findByAccountId(Integer.parseInt(accountId));
         for (Iterator<Account> iter = accounts.iterator(); iter.hasNext();) {
             Account element = iter.next();
             if (String.valueOf(element.getaccountId()).equals(String.valueOf(accountId))) {
                 temp = element;
                 break; // exit loop when the account is found
             }
         }
        return temp;
    }
    private Passenger addPassengerToAccount(int passengerId, String accountId, Account temp, Ticket newTicket){
        Passenger newPassenger = new Passenger(passengerId, temp.getaccountId(), temp.getFirstName(), temp.getLastName(), newTicket);
        newPassenger.setAccountId(Integer.parseInt(accountId));
        passengerRepository.save(newPassenger);
        return newPassenger;
    }

    private void addPassengerToTheBus(Passenger passenger, String busNumber){
        ArrayList<Bus> busses = (ArrayList<Bus>) busRepository.findAll();
        ArrayList<Passenger> busPassengers = new ArrayList<>();
        ObjectId id = null;
        for (Bus bus : busses) {
            if (String.valueOf(bus.getBusNumber()).equals(busNumber)){
               /* busPassengers = new ArrayList<>(bus.getPassengers());
                bus.addNewPassenger(passenger);
                for (int i = 0 ; i < bus.getPassengers().size(); i++){
                    busPassengers.add(passenger);
                }       */ 
                id = bus.getId();
     
                break;
            }
        }
        
        Query query = new Query();
        query.addCriteria(Criteria.where("id").is(id));
        mongoTemplate.updateFirst(query, new Update().push("passengers", passenger), Bus.class);
        
 
    }
    @PostMapping(value = "/addTicket/{accountId}")
    public Passenger checkout(@RequestBody Ticket ticket, @PathVariable String accountId, HttpSession session)
            throws Exception {

        int passengerId = ID_GENERATOR.getAndIncrement();
        // Create the ticket object
        String destination = ticket.getDestination();
        String arrival_time_eta = ticket.getArrival_time_eta();
        String departure = ticket.getDeparture();
        String departure_time = ticket.getDeparture_time();
        String busNumber = ticket.getBusNumber();
        String status = ticket.getStatus();
        int price = ticket.getPrice();

        //create new ticket
        Ticket newTicket = newTicketToPassenger(destination, arrival_time_eta, departure, departure_time, busNumber, status, price, passengerId);
        // link the ticket to passenger object then link passenger to the account
        Account temp = findAccountForPassenger(accountId);
        //Add set passenger accountId
        Passenger newPassenger = addPassengerToAccount(passengerId, accountId, temp, newTicket);
        //Add passenger to the bus
        addPassengerToTheBus(newPassenger, busNumber);

        return newPassenger;
    }

}
