package com.b2b.backend.registration;

import com.b2b.backend.seller.SellerService;
import org.springframework.stereotype.Service;

@Service
public class RegistrationService {

    private final SellerService sellerService;

    public RegistrationService(SellerService sellerService) {
        this.sellerService = sellerService;
    }

    public void register(RegistrationRequest registrationRequest) {
        sellerService.signUpSeller(registrationRequest);
    }
}