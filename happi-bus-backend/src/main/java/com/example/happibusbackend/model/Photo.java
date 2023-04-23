package com.example.happibusbackend.model;

import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@NoArgsConstructor
@Getter@Setter
public class Photo {

    private String photoName;
    private String photoType;

    private String photoSize;

    private byte[] photo;



}
