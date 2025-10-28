package com.hurios.huriosbackend.service;

import com.google.common.base.Preconditions;
import com.google.common.base.Strings;
import org.springframework.stereotype.Service;

import java.util.regex.Pattern;

/**
 * ValidationService - Servicio centralizado de validaciones usando Google Guava
 */
@Service
public class ValidationService {

    private static final Pattern EMAIL_PATTERN = Pattern.compile("^[A-Za-z0-9+_.-]+@(.+)$");
    private static final Pattern PHONE_PATTERN = Pattern.compile("^[0-9]{9}$");

    /**
     * Validar que el email no sea nulo o vacío y tenga formato válido
     */
    public void validateEmail(String email) {
        Preconditions.checkArgument(
            !Strings.isNullOrEmpty(email), 
            "El email no puede estar vacío"
        );
        Preconditions.checkArgument(
            EMAIL_PATTERN.matcher(email).matches(),
            "El email no tiene un formato válido: %s", email
        );
    }

    /**
     * Validar que la contraseña cumpla con los requisitos mínimos
     */
    public void validatePassword(String password) {
        Preconditions.checkArgument(
            !Strings.isNullOrEmpty(password),
            "La contraseña no puede estar vacía"
        );
        Preconditions.checkArgument(
            password.length() >= 8,
            "La contraseña debe tener al menos 8 caracteres"
        );
    }

    /**
     * Validar nombre de producto
     */
    public void validateProductName(String name) {
        Preconditions.checkArgument(
            !Strings.isNullOrEmpty(name),
            "El nombre del producto no puede estar vacío"
        );
        Preconditions.checkArgument(
            name.length() >= 3,
            "El nombre del producto debe tener al menos 3 caracteres"
        );
        Preconditions.checkArgument(
            name.length() <= 100,
            "El nombre del producto no puede exceder 100 caracteres"
        );
    }

    /**
     * Validar precio de producto
     */
    public void validatePrice(Double price) {
        Preconditions.checkNotNull(price, "El precio no puede ser nulo");
        Preconditions.checkArgument(
            price > 0,
            "El precio debe ser mayor a 0: %s", price
        );
        Preconditions.checkArgument(
            price <= 999999.99,
            "El precio no puede exceder 999,999.99"
        );
    }

    /**
     * Validar stock de producto
     */
    public void validateStock(Integer stock) {
        if (stock != null) {
            Preconditions.checkArgument(
                stock >= 0,
                "El stock no puede ser negativo: %s", stock
            );
        }
    }

    /**
     * Validar ID (debe ser positivo)
     */
    public void validateId(Long id) {
        Preconditions.checkNotNull(id, "El ID no puede ser nulo");
        Preconditions.checkArgument(
            id > 0,
            "El ID debe ser mayor a 0: %s", id
        );
    }

    /**
     * Validar teléfono (formato peruano)
     */
    public void validatePhone(String phone) {
        if (!Strings.isNullOrEmpty(phone)) {
            Preconditions.checkArgument(
                PHONE_PATTERN.matcher(phone).matches(),
                "El teléfono debe tener 9 dígitos: %s", phone
            );
        }
    }

    /**
     * Validar que un string no esté vacío después de trim
     */
    public String validateAndTrimString(String value, String fieldName) {
        if (Strings.isNullOrEmpty(value)) {
            return null;
        }
        String trimmed = value.trim();
        Preconditions.checkArgument(
            !trimmed.isEmpty(),
            "%s no puede estar vacío después de eliminar espacios", fieldName
        );
        return trimmed;
    }

    /**
     * Validar rango de valores numéricos
     */
    public void validateRange(Number value, Number min, Number max, String fieldName) {
        Preconditions.checkNotNull(value, "%s no puede ser nulo", fieldName);
        Preconditions.checkArgument(
            value.doubleValue() >= min.doubleValue(),
            "%s debe ser mayor o igual a %s", fieldName, min
        );
        Preconditions.checkArgument(
            value.doubleValue() <= max.doubleValue(),
            "%s debe ser menor o igual a %s", fieldName, max
        );
    }

    /**
     * Validar que una cantidad sea positiva
     */
    public void validatePositiveQuantity(Integer quantity, String fieldName) {
        Preconditions.checkNotNull(quantity, "%s no puede ser nulo", fieldName);
        Preconditions.checkArgument(
            quantity > 0,
            "%s debe ser mayor a 0: %s", fieldName, quantity
        );
    }

    /**
     * Normalizar email (trim y lowercase)
     */
    public String normalizeEmail(String email) {
        if (Strings.isNullOrEmpty(email)) {
            return null;
        }
        return email.trim().toLowerCase();
    }

    /**
     * Sanitizar string (remover espacios extras y normalizar)
     */
    public String sanitizeString(String value) {
        if (Strings.isNullOrEmpty(value)) {
            return null;
        }
        // Reemplazar múltiples espacios por uno solo y hacer trim
        return value.trim().replaceAll("\\s+", " ");
    }
}
