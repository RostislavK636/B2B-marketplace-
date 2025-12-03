package com.b2b.seller;

import com.b2b.registration.RegistrationRequest;
import org.springframework.stereotype.Service;

import java.util.List;

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

    public List<Seller> getAllSellers() {
        return sellerRepository.findAll();
    }
}