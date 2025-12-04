package com.b2b.product;

import org.springframework.stereotype.Service;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public void saveProduct(ProductSaveRequest productSaveRequest) {
        Product product = Product.builder()
                .name(productSaveRequest.getName())
                .averageRating(productSaveRequest.getAverageRating())
                .numberOfReviews(productSaveRequest.getNumberOfReviews())
                .availability(productSaveRequest.getAvailability())
                .description(productSaveRequest.getDescription())
                .productPriceRanges(productSaveRequest.getProductPriceRanges())
                .seller(productSaveRequest.getSeller())
                .productDetails(productSaveRequest.getProductDetails())
                .detailedDescription(productSaveRequest.getDetailedDescription())
                .build();

        productRepository.save(product);
    }
}