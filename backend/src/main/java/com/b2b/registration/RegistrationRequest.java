package com.b2b.registration;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class RegistrationRequest {

    private String name;
    private String surname;
    private String email;
    private String phoneNumber;
    private String password;
    private String company;
    private String taxpayerId;

}