package com.example.happibusbackend.Service;

import com.mongodb.BasicDBObject;
import com.mongodb.DBObject;
import com.mongodb.client.gridfs.model.GridFSFile;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.gridfs.GridFsOperations;
import org.springframework.data.mongodb.gridfs.GridFsTemplate;
import org.springframework.stereotype.Service;

import com.example.happibusbackend.model.Account;
import com.example.happibusbackend.repository.AccountRepository;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
public class AccountService {
    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    GridFsOperations gridOp;

    @Autowired
    GridFsTemplate gridtemplate;

    public List<Account> allGyms(){
        return accountRepository.findAll();
    }
    public void createAccount(Account acc){
        accountRepository.save(acc);
    }

    public String uploadImage(MultipartFile upload) throws IOException{
        //create dbobject
        DBObject metadata = new BasicDBObject();
        metadata.put("photoSize", upload.getSize());
        Object fileId = gridtemplate.store(upload.getInputStream(),upload.getOriginalFilename(),upload.getContentType(),metadata);
                return fileId.toString();

    }





}
