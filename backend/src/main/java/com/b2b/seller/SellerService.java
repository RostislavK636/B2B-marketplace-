package com.b2b.seller;

import com.b2b.registration.RegistrationRequest;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class SellerService {

    private final SellerRepository sellerRepository;

    public SellerService(SellerRepository sellerRepository) {
        this.sellerRepository = sellerRepository;
    }

    public Seller signUpSeller(RegistrationRequest registrationRequest) {
        Seller seller = Seller.builder()
                .name(registrationRequest.getName())
                .surname(registrationRequest.getSurname())
                .email(registrationRequest.getEmail())
                .phoneNumber(registrationRequest.getPhoneNumber())
                .password(registrationRequest.getPassword())
                .company(registrationRequest.getCompany())
                .taxpayerId(registrationRequest.getTaxpayerId())
                .products(new ArrayList<>())
                .build();

        return sellerRepository.save(seller);
    }

    public List<Seller> getAllSellers() {
        return sellerRepository.findAll();
    }

    public Seller getSellerById(Long sellerId) {
        return sellerRepository.findById(sellerId)
                .orElseThrow(() -> new IllegalStateException("seller not found"));
    }

    public void deleteAllSellers() {
        sellerRepository.deleteAll();
    }
}