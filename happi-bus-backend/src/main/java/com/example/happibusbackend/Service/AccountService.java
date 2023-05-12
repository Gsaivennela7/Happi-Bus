package com.example.happibusbackend.Service;

import com.example.happibusbackend.model.Photo;
import com.mongodb.BasicDBObject;
import com.mongodb.DBObject;
import com.mongodb.client.gridfs.model.GridFSFile;
import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.gridfs.GridFsOperations;
import org.springframework.data.mongodb.gridfs.GridFsTemplate;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.data.mongodb.core.query.Query;
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



    public List<Account> allAccounts(){
        return accountRepository.findAll();
    }
    public String createAccount(Account acc, MultipartFile upload) throws IOException {


        String fieldId = uploadImage(upload, acc);
        accountRepository.save(acc);
        return fieldId;
    }

    public String uploadImage(MultipartFile upload, Account acc) throws IOException{
        //create dbobject

        DBObject metadata = new BasicDBObject();
        metadata.put("photoSize", upload.getSize());
        metadata.put("accountId", acc.getaccountId());
        Object fileId = gridtemplate.store(upload.getInputStream(),String.valueOf(acc.getaccountId()),upload.getContentType(),metadata);
                return fileId.toString();

    }

    public Photo downloadFile(String id) throws IOException {

        GridFSFile gridFSFile = gridtemplate.findOne( new Query(Criteria.where("_id").is(id)) );

        Photo loadFile = new Photo();

        if (gridFSFile != null && gridFSFile.getMetadata() != null) {
            loadFile.setPhotoName( gridFSFile.getFilename() );


            loadFile.setPhotoType( gridFSFile.getMetadata().get("_contentType").toString() );

            loadFile.setPhotoSize( gridFSFile.getMetadata().get("fileSize").toString() );

            loadFile.setPhoto(IOUtils.toByteArray(gridOp.getResource(gridFSFile).getInputStream()) );
        }

        return loadFile;
    }
}
