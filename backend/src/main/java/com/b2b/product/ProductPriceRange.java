package com.b2b.product;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class ProductPriceRange {

    @Id
    @SequenceGenerator(
            name = "product_price_range_sequence",
            sequenceName = "product_price_range_sequence"
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "product_price_range_sequence"
    )
    private Long id;
    private Long initialQuantity;
    private Long finalQuantity;
    private Long pricePerRange;
}