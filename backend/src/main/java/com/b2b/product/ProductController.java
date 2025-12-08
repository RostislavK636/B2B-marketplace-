package com.b2b.product;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
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

    @Transactional(readOnly = true)
    @GetMapping
    public List<Product> getAllProducts(HttpServletRequest httpServletRequest) {
        HttpSession session = httpServletRequest.getSession(false);
        Long sellerId = (Long) session.getAttribute("sellerId");

        return productService.getAllProducts(sellerId);
    }

    @DeleteMapping
    public void deleteAllProducts() {
        productService.deleteAllProducts();
    }
}