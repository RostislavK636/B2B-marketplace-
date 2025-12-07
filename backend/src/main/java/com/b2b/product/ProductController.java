package com.b2b.product;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("api/v1/products")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @PostMapping
    public ResponseEntity<?> saveProduct(@RequestBody ProductSaveRequest productSaveRequest, HttpServletRequest httpServletRequest) {
        HttpSession session = httpServletRequest.getSession(false);
        Long sellerId = (Long) session.getAttribute("sellerId");

        productService.saveProduct(productSaveRequest, sellerId);

        return ResponseEntity.ok(Map.of(
                "message", "product added",
                "success", true
        ));
    }
}