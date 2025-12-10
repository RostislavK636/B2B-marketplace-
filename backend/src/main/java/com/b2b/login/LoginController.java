package com.b2b.login;

import com.b2b.seller.Seller;
import com.b2b.seller.SellerService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("api/v1/login")
public class LoginController {

    private final SellerService sellerService;

    public LoginController(SellerService sellerService) {
        this.sellerService = sellerService;
    }

    @PostMapping
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest, HttpServletRequest request) {
        try {
            Optional<Seller> optionalSeller = sellerService.findSellerByEmail(loginRequest.getEmail());

            if (optionalSeller.isEmpty()) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(Map.of(
                                "success", false,
                                "message", "false email or password"
                        ));
            }

            Seller seller = optionalSeller.get();

            if (!seller.getPassword().equals(loginRequest.getPassword())) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(Map.of(
                                "success", false,
                                "message", "UNAUTHORIZED"
                        ));
            }

            HttpSession session = request.getSession(true);
            session.setAttribute("sellerId", seller.getId());
            session.setAttribute("sellerEmail", seller.getEmail());;
            session.setMaxInactiveInterval(60 * 60);

            return ResponseEntity.ok(Map.of(
                    "success", true,
                    "message", "log in",
                    "sellerId", seller.getId(),
                    "sellerEmail", seller.getEmail()
            ));

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of(
                            "success", false,
                            "message", "eternal server error"
                    ));
        }
    }
}