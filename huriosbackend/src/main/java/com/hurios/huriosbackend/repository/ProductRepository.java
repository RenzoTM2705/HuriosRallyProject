// src/main/java/com/hurios/huriosbackend/repository/ProductRepository.java
package com.hurios.huriosbackend.repository;

import com.hurios.huriosbackend.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    // aquí puedes añadir consultas personalizadas si las necesitas luego
}
