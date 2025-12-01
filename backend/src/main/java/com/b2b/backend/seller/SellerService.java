package com.b2b.backend.seller;

import com.b2b.backend.registration.RegistrationRequest;
import org.springframework.stereotype.Service;

@Service
public class SellerService {

    private final SellerRepository sellerRepository;

    public SellerService(SellerRepository sellerRepository) {
        this.sellerRepository = sellerRepository;
    }

    public void signUpSeller(RegistrationRequest registrationRequest) {
        Seller seller = Seller.builder()
                .name(registrationRequest.getName())
                .surname(registrationRequest.getSurname())
                .email(registrationRequest.getEmail())
                .phoneNumber(registrationRequest.getPhoneNumber())
                .password(registrationRequest.getPassword())
                .company(registrationRequest.getCompany())
                .taxpayerId(registrationRequest.getTaxpayerId())
                .build();

        sellerRepository.save(seller);
    }
}