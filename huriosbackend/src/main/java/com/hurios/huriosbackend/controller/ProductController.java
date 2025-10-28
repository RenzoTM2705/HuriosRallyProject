package com.hurios.huriosbackend.controller;

import com.google.common.base.Preconditions;
import com.google.common.base.Strings;
import com.hurios.huriosbackend.entity.Product;
import com.hurios.huriosbackend.repository.ProductRepository;
import com.hurios.huriosbackend.service.ValidationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
import java.util.Optional;

/**
 * ProductController - controlador sencillo y seguro para productos.
 * - Devolvemos ResponseEntity<Object> para poder enviar Product o Map de error.
 * - @CrossOrigin permite peticiones desde el frontend en dev (ajusta el origen).
 */
@RestController
@RequestMapping("/products")
@CrossOrigin(origins = "http://localhost:5173") // <-- ajusta al puerto de tu frontend
public class ProductController {

    // Declaramos dependencias
    private final ProductRepository productRepository;
    private final ValidationService validationService;

    // Inyección por constructor
    public ProductController(ProductRepository productRepository, ValidationService validationService) {
        this.productRepository = productRepository;
        this.validationService = validationService;
    }

    // GET /products -> lista de todos los productos
    @GetMapping
    public ResponseEntity<?> all() {
        return ResponseEntity.ok(productRepository.findAll());
    }

    // GET /products/{id} -> detalle del producto por id
    @GetMapping("/{id}")
    public ResponseEntity<Object> getProducto(@PathVariable Long id) {
        Optional<Product> maybe = productRepository.findById(id);

        if (maybe.isPresent()) {
            // devolvemos 200 OK con el producto
            return ResponseEntity.ok(maybe.get());
        }

        // si no existe, devolvemos 404 con un objeto JSON explicativo
        return ResponseEntity.status(404).body(
            Map.of("error", "Producto no encontrado")
        );
    }

    // GET /products/search?q=query -> buscar productos por nombre
    @GetMapping("/search")
    public ResponseEntity<?> search(@RequestParam(required = false) String q) {
        if (q == null || q.trim().isEmpty()) {
            return ResponseEntity.ok(productRepository.findAll());
        }
        
        // Buscar productos cuyo nombre contenga la query (case insensitive)
        return ResponseEntity.ok(
            productRepository.findAll().stream()
                .filter(p -> p.getName().toLowerCase().contains(q.toLowerCase()))
                .toList()
        );
    }

    // PUT /products/{id}/add-stock -> agregar stock a un producto existente
    @PutMapping("/{id}/add-stock")
    public ResponseEntity<?> addStock(
            @PathVariable Long id,
            @RequestBody Map<String, Integer> body) {
        
        Optional<Product> maybe = productRepository.findById(id);
        if (maybe.isEmpty()) {
            return ResponseEntity.status(404).body(
                Map.of("error", "Producto no encontrado")
            );
        }

        Integer quantity = body.get("quantity");
        if (quantity == null || quantity <= 0) {
            return ResponseEntity.badRequest().body(
                Map.of("error", "La cantidad debe ser mayor a 0")
            );
        }

        Product product = maybe.get();
        int currentStock = product.getStock() != null ? product.getStock() : 0;
        product.setStock(currentStock + quantity);
        productRepository.save(product);

        return ResponseEntity.ok(Map.of(
            "message", "Stock actualizado correctamente",
            "newStock", product.getStock()
        ));
    }

    // PUT /products/{id} -> actualizar un producto (nombre, descripción, imagen)
    @PutMapping("/{id}")
    public ResponseEntity<?> updateProduct(@PathVariable Long id, @RequestBody Map<String, Object> body) {
        Optional<Product> maybe = productRepository.findById(id);
        if (maybe.isEmpty()) {
            return ResponseEntity.status(404).body(
                Map.of("error", "Producto no encontrado")
            );
        }

        try {
            Product product = maybe.get();
            
            // Actualizar nombre si se proporciona
            String name = (String) body.get("name");
            if (name != null && !name.trim().isEmpty()) {
                try {
                    validationService.validateProductName(name);
                    product.setName(name.trim());
                } catch (IllegalArgumentException e) {
                    return ResponseEntity.badRequest().body(
                        Map.of("error", e.getMessage())
                    );
                }
            }
            
            // Actualizar descripción si se proporciona
            String description = (String) body.get("description");
            if (description != null) {
                product.setDescription(description.trim().isEmpty() ? null : description.trim());
            }
            
            // Actualizar precio si se proporciona
            Object priceObj = body.get("price");
            if (priceObj != null) {
                Double price;
                if (priceObj instanceof Number) {
                    price = ((Number) priceObj).doubleValue();
                } else {
                    try {
                        price = Double.parseDouble(priceObj.toString());
                    } catch (NumberFormatException e) {
                        return ResponseEntity.badRequest().body(
                            Map.of("error", "El precio debe ser un número válido")
                        );
                    }
                }
                if (price <= 0) {
                    return ResponseEntity.badRequest().body(
                        Map.of("error", "El precio debe ser mayor a 0")
                    );
                }
                product.setPrice(price);
            }
            
            // Actualizar imageUrl si se proporciona
            String imageUrl = (String) body.get("imageUrl");
            if (imageUrl != null) {
                product.setImageUrl(imageUrl.trim().isEmpty() ? null : imageUrl.trim());
            }
            
            // Actualizar category si se proporciona
            String category = (String) body.get("category");
            if (category != null) {
                product.setCategory(category.trim().isEmpty() ? null : category.trim());
            }
            
            // Guardar cambios
            Product updatedProduct = productRepository.save(product);
            
            return ResponseEntity.ok(updatedProduct);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(
                Map.of("error", "Error al actualizar el producto: " + e.getMessage())
            );
        }
    }

    // DELETE /products/{id} -> eliminar un producto
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteProduct(@PathVariable Long id) {
        Optional<Product> maybe = productRepository.findById(id);
        if (maybe.isEmpty()) {
            return ResponseEntity.status(404).body(
                Map.of("error", "Producto no encontrado")
            );
        }

        try {
            productRepository.deleteById(id);
            return ResponseEntity.ok(Map.of(
                "message", "Producto eliminado correctamente",
                "id", id
            ));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(
                Map.of("error", "Error al eliminar el producto: " + e.getMessage())
            );
        }
    }

    // POST /products -> crear un nuevo producto
    @PostMapping
    public ResponseEntity<?> createProduct(@RequestBody Map<String, Object> body) {
        try {
            // Validar campos requeridos usando Guava
            String name = (String) body.get("name");
            
            // Validar nombre con ValidationService
            try {
                validationService.validateProductName(name);
            } catch (IllegalArgumentException e) {
                return ResponseEntity.badRequest().body(
                    Map.of("error", e.getMessage())
                );
            }

            Object priceObj = body.get("price");

            // Crear nuevo producto
            Product product = new Product();
            product.setName(name.trim());
            
            // Convertir price a Double
            Double price;
            if (priceObj instanceof Number) {
                price = ((Number) priceObj).doubleValue();
            } else {
                try {
                    price = Double.parseDouble(priceObj.toString());
                } catch (NumberFormatException e) {
                    return ResponseEntity.badRequest().body(
                        Map.of("error", "El precio debe ser un número válido")
                    );
                }
            }
            product.setPrice(price);

            // Campos opcionales
            String description = (String) body.get("description");
            if (description != null && !description.trim().isEmpty()) {
                product.setDescription(description.trim());
            }

            String imageUrl = (String) body.get("imageUrl");
            if (imageUrl != null && !imageUrl.trim().isEmpty()) {
                product.setImageUrl(imageUrl.trim());
            }

            // Category (opcional)
            String category = (String) body.get("category");
            if (category != null && !category.trim().isEmpty()) {
                product.setCategory(category.trim());
            }

            // Stock inicial (por defecto 0)
            Object stockObj = body.get("stock");
            if (stockObj != null) {
                Integer stock;
                if (stockObj instanceof Number) {
                    stock = ((Number) stockObj).intValue();
                } else {
                    try {
                        stock = Integer.parseInt(stockObj.toString());
                    } catch (NumberFormatException e) {
                        stock = 0;
                    }
                }
                product.setStock(stock);
            } else {
                product.setStock(0);
            }

            // Guardar producto
            Product savedProduct = productRepository.save(product);

            return ResponseEntity.ok(savedProduct);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(
                Map.of("error", "Error al crear el producto: " + e.getMessage())
            );
        }
    }
}
