-- Script para crear las tablas de ventas (sales y sale_items)
-- Ejecutar este script en tu base de datos MySQL

-- Tabla: sales
CREATE TABLE IF NOT EXISTS sales (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    
    -- Información personal del comprador
    full_name VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    
    -- Tipo de comprobante
    document_type VARCHAR(20) NOT NULL, -- 'dni' o 'factura'
    dni VARCHAR(8),
    company_name VARCHAR(255),
    ruc VARCHAR(11),
    company_address VARCHAR(500),
    
    -- Método de entrega
    delivery_method VARCHAR(20) NOT NULL, -- 'pickup' o 'delivery'
    delivery_address VARCHAR(500),
    delivery_district VARCHAR(100),
    delivery_reference TEXT,
    
    -- Método de pago
    payment_method VARCHAR(20) NOT NULL, -- 'card' o 'yape'
    payment_details TEXT,
    
    -- Montos
    subtotal DOUBLE NOT NULL,
    shipping_cost DOUBLE NOT NULL,
    total DOUBLE NOT NULL,
    
    -- Estado del pedido
    status VARCHAR(20) NOT NULL DEFAULT 'PENDIENTE', -- PENDIENTE, CONFIRMADO, ENVIADO, ENTREGADO, CANCELADO
    
    -- Timestamps
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    -- Foreign key
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    
    -- Índices
    INDEX idx_user_id (user_id),
    INDEX idx_status (status),
    INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla: sale_items
CREATE TABLE IF NOT EXISTS sale_items (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    sale_id BIGINT NOT NULL,
    product_id BIGINT NOT NULL,
    
    quantity INT NOT NULL,
    unit_price DOUBLE NOT NULL,
    subtotal DOUBLE NOT NULL,
    
    -- Foreign keys
    FOREIGN KEY (sale_id) REFERENCES sales(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE RESTRICT,
    
    -- Índices
    INDEX idx_sale_id (sale_id),
    INDEX idx_product_id (product_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Verificar las tablas creadas
SHOW TABLES LIKE 'sale%';

-- Ver estructura de la tabla sales
DESCRIBE sales;

-- Ver estructura de la tabla sale_items
DESCRIBE sale_items;
