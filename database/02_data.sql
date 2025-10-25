-- ================================
-- 🎯 HURIOS RALLY - DATOS DE EJEMPLO
-- ================================
-- Script para insertar productos de ejemplo
-- Ejecutar después del schema (01_schema.sql)

USE huriosdb;

-- Limpiar datos existentes (opcional)
-- DELETE FROM products;
-- ALTER TABLE products AUTO_INCREMENT = 1;

-- ================================
-- 📦 INSERTAR PRODUCTOS DE EJEMPLO
-- ================================

INSERT INTO products (name, description, price, stock, image_url) VALUES
('Asiento Carguero', 'Asiento Carguero de color negro para moto', 49.90, 12, '/assets/imgs/asiento_carguero.webp'),

('Corona con Ruster', 'conjunto de repuestos para sistemas de transmisión de vehículos', 89.50, 15, '/assets/imgs/corona_con_ruster.webp'),

('Filtros de Aire', 'Filtro de aire diseñado para capturar la suciedad del exterior', 49.00, 8, '/assets/imgs/filtros_de_aire_universal.webp'),

('Guardafango Delantero', 'Protector para llanta delantera', 39.90, 5, '/assets/imgs/guardafango_delantero.webp'),

('Llanta para Furgon', 'Llanta de caucho de 6PR', 49.90, 12, '/assets/imgs/llanta.webp'),

('Mascara Invicta Moderna', 'Mascara para moto lineal color rojo & negro', 89.50, 15, '/assets/imgs/mascara_invicta_moderna.webp'),

('Tanque para Carguero', 'Ideal para furgon || Color azul', 49.00, 8, '/assets/imgs/tanque_carguero.webp'),

('Tubo de Escape', 'Reduce el ruido y las emisiones contaminantes', 39.90, 5, '/assets/imgs/tubo_de_escape.webp');

-- ================================
-- ✅ VERIFICAR DATOS INSERTADOS
-- ================================

-- Mostrar todos los productos
SELECT * FROM products;

-- Mostrar conteo total
SELECT COUNT(*) as total_productos FROM products;

-- Mostrar productos ordenados por precio
SELECT id, name, price, stock FROM products ORDER BY price DESC;