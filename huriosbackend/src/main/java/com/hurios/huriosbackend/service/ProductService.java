// src/main/java/com/hurios/huriosbackend/service/ProductService.java
package com.hurios.huriosbackend.service;

import com.hurios.huriosbackend.entity.Product;
import com.hurios.huriosbackend.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * ProductService: lógica simple de lectura de productos
 */
@Service
public class ProductService {
    private final ProductRepository repo;
    public ProductService(ProductRepository repo) { this.repo = repo; }

    public List<Product> findAll() { return repo.findAll(); }

    public Optional<Product> findById(Long id) { return repo.findById(id); }
}
