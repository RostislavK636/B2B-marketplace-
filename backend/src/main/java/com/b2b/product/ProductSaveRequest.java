package com.b2b.product;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ProductSaveRequest {

    private String name;
    private Long availability;
    private String description;
    private List<ProductPriceRange> productPriceRanges;
    private ProductDetails productDetails;
    private String detailedDescription;
}