package com.hurios.huriosbackend.controller; // ajusta si tu package es otro

// Imports necesarios
import com.hurios.huriosbackend.entity.Product;               // entidad Product
import com.hurios.huriosbackend.repository.ProductRepository; // repo JPA
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

    // 1) Declaramos el atributo del repositorio con un nombre claro
    private final ProductRepository productRepository;

    // 2) Inyección por constructor (Spring lo autoconstruirá)
    public ProductController(ProductRepository productRepository) {
        this.productRepository = productRepository;
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
}
