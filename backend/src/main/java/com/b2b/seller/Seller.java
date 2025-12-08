package com.b2b.seller;

import com.b2b.product.Product;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.SequenceGenerator;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Seller {

    @Id
    @SequenceGenerator(
            name = "seller_sequence",
            sequenceName = "seller_sequence"
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "seller_sequence"
    )
    private Long id;
    private String name;
    private String surname;
    private String email;
    private String phoneNumber;
    private String password;
    private String company;
    private String taxpayerId;
    @OneToMany(
            mappedBy = "seller",
            cascade = CascadeType.ALL,
            fetch = FetchType.LAZY,
            orphanRemoval = true
    )
    @JsonIgnore
    private List<Product> products;
}