package com.b2b.registration;

import com.b2b.seller.Seller;
import com.b2b.seller.SellerService;
import org.springframework.stereotype.Service;

@Service
public class RegistrationService {

    private final SellerService sellerService;

    public RegistrationService(SellerService sellerService) {
        this.sellerService = sellerService;
    }

    public Seller register(RegistrationRequest registrationRequest) {
        return sellerService.signUpSeller(registrationRequest);
    }
}