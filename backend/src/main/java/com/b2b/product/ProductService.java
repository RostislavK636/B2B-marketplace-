package com.b2b.product;

import com.b2b.seller.SellerService;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    private final ProductRepository productRepository;
    private final SellerService sellerService;

    public ProductService(ProductRepository productRepository, SellerService sellerService) {
        this.productRepository = productRepository;
        this.sellerService = sellerService;
    }

    public void saveProduct(ProductSaveRequest productSaveRequest, Long sellerId) {
        Product product = Product.builder()
                .name(productSaveRequest.getName())
                .averageRating(0F)
                .numberOfReviews(0L)
                .availability(productSaveRequest.getAvailability())
                .description(productSaveRequest.getDescription())
                .productPriceRanges(productSaveRequest.getProductPriceRanges())
                .seller(sellerService.getSellerById(sellerId))
                .productDetails(productSaveRequest.getProductDetails())
                .detailedDescription(productSaveRequest.getDetailedDescription())
                .build();

        productRepository.save(product);
    }



    @Transactional
    public List<Product> getAllProducts(Long sellerId) {
        return productRepository.findBySellerId(sellerId);
    }

    public void deleteAllProducts() {
        productRepository.deleteAll();
    }
}