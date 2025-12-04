package com.b2b.product;

import com.b2b.seller.Seller;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@Getter
@AllArgsConstructor
public class ProductSaveRequest {

    private String name;
    private Float averageRating;
    private Long numberOfReviews;
    private Long availability;
    private String description;
    private List<ProductPriceRange> productPriceRanges;
    private Seller seller;
    private ProductDetails productDetails;
    private String detailedDescription;
}