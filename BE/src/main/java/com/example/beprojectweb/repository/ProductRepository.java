package com.example.beprojectweb.repository;


import com.example.beprojectweb.entity.Category;
import com.example.beprojectweb.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ProductRepository extends JpaRepository<Product, Long> {
    boolean existsProductByProductName(String productName);

    int countByCategory(Category category);

    Optional<Product> findByProductName(String productName);

    @Query(value = "SELECT * FROM product ORDER BY product_id LIMIT :limit OFFSET :offset", nativeQuery = true)
    List<Product> findProductsWithLimitOffset(@Param("limit") int limit, @Param("offset") int offset);

    List<Product> findProductByProductNameContainingIgnoreCase(String productName);
}
