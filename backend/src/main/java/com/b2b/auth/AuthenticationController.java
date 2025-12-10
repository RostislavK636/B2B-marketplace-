package com.b2b.auth;

import com.b2b.seller.Seller;
import com.b2b.seller.SellerService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("api/v1/auth")
public class AuthenticationController {

    private final SellerService sellerService;

    public AuthenticationController(SellerService sellerService) {
        this.sellerService = sellerService;
    }

    @GetMapping
    public ResponseEntity<?> auth(HttpServletRequest httpServletRequest) {
        HttpSession session = httpServletRequest.getSession(false);

        if (session == null || session.getAttribute("sellerId") == null) {
            return ResponseEntity.ok(Map.of(
                    "authenticated", false,
                    "message", "not authenticated"
            ));
        }

        Long sellerId = (Long) session.getAttribute("sellerId");

        Seller seller = sellerService.getSellerById(sellerId);

        return ResponseEntity.ok(Map.of(
                "authenticated", true,
                "sellerId", sellerId,
                "sellerEmail", seller.getEmail(),
                "message", "authenticated"
        ));
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest request) {
        HttpSession session = request.getSession(false);

        if (session != null) {
            session.invalidate();
        }

        return ResponseEntity.ok(Map.of(
                "success", true,
                "message", "logout"
        ));
    }
}