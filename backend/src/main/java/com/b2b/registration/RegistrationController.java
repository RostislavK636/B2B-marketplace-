package com.b2b.registration;

import com.b2b.seller.Seller;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("api/v1/registration")
public class RegistrationController {

    private final RegistrationService registrationService;

    public RegistrationController(RegistrationService registrationService) {
        this.registrationService = registrationService;
    }

    @PostMapping
    public ResponseEntity<?> register(@RequestBody RegistrationRequest registrationRequest, HttpServletRequest httpServletRequest) {
        Seller registered = registrationService.register(registrationRequest);

        HttpSession session = httpServletRequest.getSession(true);
        session.setAttribute("sellerId", registered.getId());
        session.setMaxInactiveInterval(60 * 60);

        return ResponseEntity.ok(Map.of(
                "success", true,
                "message", "seller has been registered",
                "sellerId", registered.getId()
        ));
    }
}