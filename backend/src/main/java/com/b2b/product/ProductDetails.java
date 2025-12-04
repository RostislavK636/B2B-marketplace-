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
public class ProductDetails {

    @Id
    @SequenceGenerator(
            name = "product_details_sequence",
            sequenceName = "product_details_sequence"
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "product_details_sequence"
    )
    private Long id;
    private String size;
    private String weight;
    private Long minimumOrderStartsFrom;
    private String material;
    private String color;
    private String loadCapacity;
}