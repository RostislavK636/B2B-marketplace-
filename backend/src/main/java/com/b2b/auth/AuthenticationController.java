package com.b2b.auth;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("api/v1/auth")
public class AuthenticationController {

    @GetMapping
    public ResponseEntity<?> auth(HttpServletRequest request) {
        HttpSession session = request.getSession(false);

        if (session == null || session.getAttribute("sellerId") == null) {
            return ResponseEntity.ok(Map.of(
                    "authenticated", false,
                    "message", "not authenticated"
            ));
        }

        Long sellerId = (Long) session.getAttribute("sellerId");

        return ResponseEntity.ok(Map.of(
                "authenticated", true,
                "userId", sellerId,
                "message", "authenticated"
        ));
    }
}