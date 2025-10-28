package com.hurios.huriosbackend.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

/**
 * Entidad Sale: representa una venta/pedido realizado por un usuario
 */
@Entity
@Table(name = "sales")
public class Sale {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    // Información personal del comprador
    @Column(name = "full_name", nullable = false)
    private String fullName;

    @Column(nullable = false)
    private String phone;

    // Tipo de comprobante: dni o factura
    @Column(name = "document_type", nullable = false)
    private String documentType;

    @Column(name = "dni")
    private String dni;

    @Column(name = "company_name")
    private String companyName;

    @Column(name = "ruc")
    private String ruc;

    @Column(name = "company_address")
    private String companyAddress;

    // Método de entrega: pickup o delivery
    @Column(name = "delivery_method", nullable = false)
    private String deliveryMethod;

    @Column(name = "delivery_address")
    private String deliveryAddress;

    @Column(name = "delivery_district")
    private String deliveryDistrict;

    @Column(name = "delivery_reference")
    private String deliveryReference;

    // Método de pago: card o yape
    @Column(name = "payment_method", nullable = false)
    private String paymentMethod;

    // Detalles del método de pago (encriptado o parcial)
    @Column(name = "payment_details", columnDefinition = "TEXT")
    private String paymentDetails;

    // Montos
    @Column(name = "subtotal", nullable = false)
    private Double subtotal;

    @Column(name = "shipping_cost", nullable = false)
    private Double shippingCost;

    @Column(name = "total", nullable = false)
    private Double total;

    // Estado del pedido
    @Column(name = "status", nullable = false)
    private String status = "PENDIENTE"; // PENDIENTE, CONFIRMADO, ENVIADO, ENTREGADO, CANCELADO

    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(name = "updated_at")
    private LocalDateTime updatedAt = LocalDateTime.now();

    // Relación one-to-many con SaleItem
    @OneToMany(mappedBy = "sale", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<SaleItem> items = new ArrayList<>();

    // Helper method to add items
    public void addItem(SaleItem item) {
        items.add(item);
        item.setSale(this);
    }

    // Getters y setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getDocumentType() { return documentType; }
    public void setDocumentType(String documentType) { this.documentType = documentType; }

    public String getDni() { return dni; }
    public void setDni(String dni) { this.dni = dni; }

    public String getCompanyName() { return companyName; }
    public void setCompanyName(String companyName) { this.companyName = companyName; }

    public String getRuc() { return ruc; }
    public void setRuc(String ruc) { this.ruc = ruc; }

    public String getCompanyAddress() { return companyAddress; }
    public void setCompanyAddress(String companyAddress) { this.companyAddress = companyAddress; }

    public String getDeliveryMethod() { return deliveryMethod; }
    public void setDeliveryMethod(String deliveryMethod) { this.deliveryMethod = deliveryMethod; }

    public String getDeliveryAddress() { return deliveryAddress; }
    public void setDeliveryAddress(String deliveryAddress) { this.deliveryAddress = deliveryAddress; }

    public String getDeliveryDistrict() { return deliveryDistrict; }
    public void setDeliveryDistrict(String deliveryDistrict) { this.deliveryDistrict = deliveryDistrict; }

    public String getDeliveryReference() { return deliveryReference; }
    public void setDeliveryReference(String deliveryReference) { this.deliveryReference = deliveryReference; }

    public String getPaymentMethod() { return paymentMethod; }
    public void setPaymentMethod(String paymentMethod) { this.paymentMethod = paymentMethod; }

    public String getPaymentDetails() { return paymentDetails; }
    public void setPaymentDetails(String paymentDetails) { this.paymentDetails = paymentDetails; }

    public Double getSubtotal() { return subtotal; }
    public void setSubtotal(Double subtotal) { this.subtotal = subtotal; }

    public Double getShippingCost() { return shippingCost; }
    public void setShippingCost(Double shippingCost) { this.shippingCost = shippingCost; }

    public Double getTotal() { return total; }
    public void setTotal(Double total) { this.total = total; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }

    public List<SaleItem> getItems() { return items; }
    public void setItems(List<SaleItem> items) { this.items = items; }
}
