package com.hurios.huriosbackend.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.hurios.huriosbackend.dto.PaymentDtos;
import com.hurios.huriosbackend.entity.*;
import com.hurios.huriosbackend.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

/**
 * Servicio para procesar pagos y crear ventas
 */
@Service
public class PaymentService {

    @Autowired
    private SaleRepository saleRepository;

    @Autowired
    private SaleItemRepository saleItemRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ObjectMapper objectMapper;

    /**
     * Procesa un pago, crea la venta, descuenta el stock y guarda los items
     */
    @Transactional
    public PaymentDtos.ProcessPaymentResponse processPayment(
            PaymentDtos.ProcessPaymentRequest request,
            String userEmail
    ) {
        // 1. Buscar el usuario
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        // 2. Validar stock disponible para todos los productos
        for (PaymentDtos.OrderItem item : request.getItems()) {
            Product product = productRepository.findById(item.getProductId())
                    .orElseThrow(() -> new RuntimeException("Producto no encontrado: " + item.getProductId()));

            if (product.getStock() == null || product.getStock() < item.getQuantity()) {
                throw new RuntimeException("Stock insuficiente para el producto: " + product.getName());
            }
        }

        // 3. Crear la venta (Sale)
        Sale sale = new Sale();
        sale.setUser(user);

        // Información del checkout
        PaymentDtos.CheckoutInfo info = request.getCheckoutInfo();
        sale.setFullName(info.getFullName());
        sale.setPhone(info.getPhone());
        sale.setDocumentType(info.getDocumentType());
        sale.setDni(info.getDni());
        sale.setCompanyName(info.getCompanyName());
        sale.setRuc(info.getRuc());
        sale.setCompanyAddress(info.getCompanyAddress());
        sale.setDeliveryMethod(info.getDeliveryMethod());
        sale.setDeliveryAddress(info.getDeliveryAddress());
        sale.setDeliveryDistrict(info.getDeliveryDistrict());
        sale.setDeliveryReference(info.getDeliveryReference());

        // Información del pago
        sale.setPaymentMethod(request.getPaymentMethod());
        
        // Serializar paymentDetails a JSON string
        try {
            String paymentDetailsJson = objectMapper.writeValueAsString(request.getPaymentDetails());
            sale.setPaymentDetails(paymentDetailsJson);
        } catch (Exception e) {
            sale.setPaymentDetails("{}");
        }

        // Montos
        sale.setSubtotal(request.getTotalPrice());
        sale.setShippingCost(request.getShippingCost());
        sale.setTotal(request.getFinalTotal());
        sale.setStatus("CONFIRMADO");
        sale.setCreatedAt(LocalDateTime.now());
        sale.setUpdatedAt(LocalDateTime.now());

        // Guardar la venta primero
        sale = saleRepository.save(sale);

        // 4. Crear los items y descontar stock
        for (PaymentDtos.OrderItem orderItem : request.getItems()) {
            Product product = productRepository.findById(orderItem.getProductId())
                    .orElseThrow(() -> new RuntimeException("Producto no encontrado"));

            // Crear SaleItem
            SaleItem saleItem = new SaleItem();
            saleItem.setSale(sale);
            saleItem.setProduct(product);
            saleItem.setQuantity(orderItem.getQuantity());
            saleItem.setUnitPrice(orderItem.getPrice());
            saleItem.setSubtotal(orderItem.getQuantity() * orderItem.getPrice());

            // Agregar a la venta
            sale.addItem(saleItem);

            // Descontar stock
            int newStock = product.getStock() - orderItem.getQuantity();
            product.setStock(newStock);
            productRepository.save(product);
        }

        // Guardar los items (ya están asociados via cascade)
        sale = saleRepository.save(sale);

        // 5. Retornar respuesta exitosa
        return new PaymentDtos.ProcessPaymentResponse(
                true,
                "Pago procesado exitosamente",
                sale.getId()
        );
    }

    /**
     * Obtener ventas de un usuario
     */
    public List<Sale> getUserSales(String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        return saleRepository.findByUserId(user.getId());
    }

    /**
     * Obtener todas las ventas (admin)
     */
    public List<Sale> getAllSales() {
        return saleRepository.findAll();
    }

    /**
     * Obtener una venta por ID
     */
    public Sale getSaleById(Long id) {
        return saleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Venta no encontrada"));
    }
}
